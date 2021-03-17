---
author: [Alfresco Documentation, Alfresco Documentation]
---

# MessageService

Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded from resource bundles deployed in the repository.

|Information|MessageService|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The `MessageService` provides functionality around Internationalization \(i18n\). It provides facilities to:

-   Get a message based on a key from a localized properties file
-   Get and set the locale
-   Register and unregister resource bundles

All user displayed strings that originate in the repository should be externalised into resource bundles to ensure that the repository is fully localisable. Examples of strings requiring extraction include:

-   Descriptive display labels used by a client
-   Error messages

Extracted strings should be gathered into resource bundles by functional area. This enables functional areas to remain distinct within the repository.

The base bundle should be named by functional area and have the .properties extension. All base bundles should be in US English.

If a message needs to be parameterised the Java `MessageFormatter` style should be used.

The keys used in the resource bundles should be scoped by functional area to avoid clashes \(this is important since at runtime the contents of the various resource bundles is combined, any names clashes will result in message values being overwritten\).

A resource bundle can be placed anywhere in the source tree, but in general repository resource bundles should be placed in the `alfresco.messages` package.

Example resource bundle contents:

```
# User displayed string for the rule service functional area

ruleservice.error=There has been an error executing rule {0}.
ruleservice.confimation_all=All rules have been executed.
```

Before a resource bundle can be used by the repository it must be registered. Suitable methods are provided by the service to support this. And more commonly the `org.alfresco.i18n.ResourceBundleBootstrapComponent` class can be used as a Spring bean to register resource bundles.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Localization files: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/messages
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/i18n/MessageService.html)|
|Java example|The following example uses a Web Script to test registered resource bundles as follows: ```
import org.alfresco.service.ServiceRegistry;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * A Web Script that can be used to test the MessageService class.
 *
 * @author martin.bergljung@alfresco.com
 */
public class MessageServiceTestWebscript extends DeclarativeWebScript {
    private static Log logger = LogFactory.getLog(MessageServiceTestWebscript.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        String key = req.getParameter("key");
        String language = req.getParameter("language");
        Locale locale = Locale.forLanguageTag(language);

        Map<String, Object> model = new HashMap<String, Object>();

        String message = "Your 'MessageServiceTestWebscript' Web Script was called: <br/>";

        message += "Locale: " + locale.getDisplayName() + "<br/>";
        message += "Translation of " + key + ": " + this.serviceRegistry.getMessageService().getMessage(key, locale);

        logger.info(message);

        model.put("message", message);

        return model;
    }
}
```

This Web Script is called with two parameters, one specifies the resource string we want \(i.e. `key`\) and one specifies the language we want the resource string text in \(i.e. `language`\).

We then use the `ServiceRegistry` to get to the `MessageService`, and then the `getMessage` method is called to get the requested message in correct locale.

The `ServiceRegistry` bean is injected into the Web Script controller bean as follows:

```
<bean id="webscript.alfresco.tutorials.messageservicetest.get"
	  class="org.alfresco.training.platformsample.MessageServiceTestWebscript"
	  parent="webscript">
	<property name="serviceRegistry">
		<ref bean="ServiceRegistry" />
	</property>
</bean>
```

If we complete the Web Script with a descriptor and template as follows:

/extension/templates/webscripts/alfresco/tutorials/**messageservicetest.get.desc.xml:**

```
<webscript>
    <shortname>MessageService Test Sample Webscript</shortname>
    <description>Get a message for a specific key and language, uses the MessageService</description>
    <url>/sample/messageservicetest?key={key}&amp;language={language}</url>
    <authentication>user</authentication>
    <format default="html"></format>
    <lifecycle>sample</lifecycle>    
</webscript>
```

/extension/templates/webscripts/alfresco/tutorials/**messageservicetest.get.html.ftl:**```
${message} 
```

And add two resource files as follows:

platform-jar/src/main/resources/alfresco/module/platform-jar/messages**test-messages.properties:**

```
alfresco.tutorial.hello=Hello
```

platform-jar/src/main/resources/alfresco/module/platform-jar/messages**test-messages\_sv.properties:**```
alfresco.tutorial.hello=Hej
```

These two resource files can be loaded by defining the following Spring bean:

```
<bean id="org.alfresco.tutorial.test.i18nResourceBundles"
          class="org.alfresco.i18n.ResourceBundleBootstrapComponent">
    <property name="resourceBundles">
        <list>
            <value>alfresco.module.${project.artifactId}.messages.test-messages</value>
        </list>
    </property>
</bean>
```

Then we can call the Web Script with the following URL:

[http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=en](http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=en)

The response in the browser will look something like this:

*Your 'MessageServiceTestWebscript' Web Script was called:*

*Locale: English*

*Translation of alfresco.tutorial.hello: Hello*

If we call it with the other locale \(sv\) the response looks like this \([http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=sv](http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=sv)\):*Your 'MessageServiceTestWebscript' Web Script was called:*

*Locale: Swedish*

*Translation of alfresco.tutorial.hello: Hej*

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

