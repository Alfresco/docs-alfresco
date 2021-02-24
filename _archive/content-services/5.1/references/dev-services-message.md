---
author: [Alfresco Documentation, Alfresco Documentation]
---

# MessageService

Provides methods to access the Locale of the current thread and to get Localised strings. These strings may be loaded from resource bundles deployed in the Repository.

|Information|MessageService|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|This service provides functionality around Internationalization \(i18n\). It provides facilities to: -   Get and set the locale
-   Register and unregister resource bundles

 All user displayed strings that originate in the repository should be externalised into resource bundles to ensure that the repository is fully localisable. Examples of strings requiring extraction include:

 -   Descriptive display labels used by a client
-   Error messages

 Extracted strings should be gathered into resource bundles by functional area. This enables functional areas to remain distinct within the repository.

 The base bundle should be named by functional area and have the .properties extension. All base bundles should be in US English.

 If a message needs to be parameterised the Java MessageFormatter style should be used.

 The IDs used in the resource bundles should be scoped by functional area to avoid clashes \(this is important since at runtime the contents of the various resource bundles in combined, any names clashes will result in message values being overwritten\).

 A resource bundle can be placed anywhere in the source tree, but in general repository resource bundles should be placed in the `alfresco.messages` package found in the config directory.

 Example resource bundle contents:

 ```

# User displayed string for the rule service functional area

ruleservice.error=There has been an error executing rule {0}.
ruleservice.confimation_all=All rules have been executed.

```

 Before a resource bundle can be used by the repository it must be registered. Suitable methods are provided by the service to support this.

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/i18n/MessageService.html)|
|Java example|You can see an example of use of the MessageService in the [invite sender implementation](https://github.com/Alfresco/community-edition/blob/master/projects/repository/source/java/org/alfresco/repo/invitation/site/InviteSender.java). The messages are [located here](https://github.com/Alfresco/community-edition/blob/master/projects/repository/config/alfresco/messages/invitation-service.properties).|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

