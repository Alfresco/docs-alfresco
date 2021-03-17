# Spring Beans

Another option is to use a Spring bean. It is possible to use a `delegateExpression` on a service task that resolves at run-time to an instance of `org.activiti.engine.delegate.JavaDelegate`. Alternatively, and probably more useful, is to use a general Spring bean. The application automatically scans all beans in the `com.activiti.extension.bean` package. For example:

```
package com.activiti.extension.bean;

import org.activiti.engine.impl.pvm.delegate.ActivityExecution;
import org.springframework.stereotype.Component;

@Component("helloWorldBean")
public class HelloWorldBean {

        public void sayHello(ActivityExecution execution) {
                System.out.println("Hello from " + this);
                execution.setVariable("var3", " from the bean");
        }


}
```

Build a jar with this class, and add it to the classpath. To use this bean in a service task, set the `expression` property to `${helloWorldBean.sayHello(execution)}`.

It is possible to define custom configuration classes \(using the Spring Java Config approach\) if this is needed \(for example when sharing dependencies between delegate beans, complex bean setup, etc.\). The application automatically scans for configuration classes in the **package com.activiti.extension.conf;** package. For example:

```
package com.activiti.extension.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomConfiguration {

        @Bean
        public SomeBean someBean() {
                return new SomeBean();
        }

}
```

Which can be injected in the bean that will be called in a service task:

```
package com.activiti.extension.bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.activiti.extension.conf.SomeBean;

@Component("helloWorldBeanWithInjection")
public class HelloWorldBeanWithInjection {

        @Autowired
        private SomeBean someBean;

        public void sayHello() {
                System.out.println(someBean.getValue());
        }

}
```

To get the current user, it is possible to use the `com.activiti.common.security.SecurityUtils` helper class.

**Bean Whitelisting**

By default, you can specify any Spring bean for use in an expression. While this provides ease of use \(since any beans you develop will be automatically scanned for as described above\), it also increases the possibilities of misuse and security threats. To help prevent these issues from happening, you can whitelist Spring beans by making the following changes:

1.  Open the <InstallLocation\>/tomcat/lib/activiti-app.properties file.
2.  Locate and set `beans.whitelisting.enabled` to true.

    ```
    beans.whitelisting.enabled=true
    ```

    **Note:** If this property is missing from the activiti-app.properties file, beans whitelisting is disabled.

3.  To whitelist Spring beans, use the following configuration setting:

    ```
    activiti-app/WEB-INF/classes/activiti/beans-whitelist.conf
    ```


**Example usage of bean whitelisting:**

To use a `userCount` variable in a **Display Text**field, **$\{userCount\}**, add the following line in the Expression property within a Service Task:

```
${execution.setVariable('userCount', userService.getUserCount())}
```

If `beans.whitelisting.enabled` is set to false or the property is missing, the process is completed and the **Display Text** field should show the value of the `usercount` variable.

To complete the process successfully using bean whitelisting, you must set `beans.whitelisting.enabled` to true and add the bean name to beans-whitelist.conf:

```
# list bean names that should be whitelisted
   userService
```

**Note:** All beans declared in `com.activiti.extension.bean` are considered as whitelisted.

**Note:** This note applies to users of Alfresco Process Services version 1.6.0 to 1.6.2 inclusive as well as apps published in these versions. Whitelisting for publish tasks is exempt from version 1.6.3. If you wish to use tasks that publish to Box, Google Drive or Alfresco and have enabled bean whitelisting, the following beans need to be explicitly whitelisted in beans-whitelist.conf:

-   repositoryService
-   formRepository
-   objectMapper
-   relatedContentService
-   relatedContentProcessor
-   historyService
-   alfrescoMetadataProcessor

**Service Task Class Whitelisting**

This provides an alternative to bean whitelisting that enables more fine-grained control over what a developer can execute. For example, you can configure which patterns you allow to be executed using expressions.

You can also whitelist full class names or package patterns such as 'com.activiti.\*'.

To whitelist service task classes, do the following:

1.  Open the <InstallLocation\>/tomcat/lib/activiti-app.properties file.
2.  Locate and set `service.task.class.whitelisting.enabled` to true.

    ```
    class.whitelisting.enabled=true
    ```

    **Note:** If this property is missing from the activiti-app.properties file, service task whitelisting is disabled.

3.  **This step applies only to users of Alfresco Process Services version 1.6.0 to 1.6.2 inclusive as well as apps published in these versions. Whitelisting for publish tasks is exempt from version 1.6.3.** To use Alfresco, Box or Google drive to publish tasks with service task whitelisting enabled, add the following entries to activiti-app/WEB-INF/classes/activiti/whitelisted-classes.conf:
    -   com.activiti.runtime.activiti.bean.BoxStepActivityBehavior
    -   com.activiti.runtime.activiti.bean.GoogleDriveStepActivityBehavior
    -   com.activiti.runtime.activiti.KickstartAlfrescoPublishDelegate
    -   com.activiti.runtime.activiti.KickstartAlfrescoCloudPublishDelegate

**Whitelisting Scripting Languages**

To whitelist scripting languages that, for example, might be used in script tasks such as JavaScript, juel and groovy, add the script types in activiti-app/WEB-INF/classes/activiti/whitelisted-scripts.conf:

```
#Here you can specify which script types are allowed to be executed
javascript
js
ecmascript
groovy
juel
```

**Note:** Whitelisting configuration affects any type of script execution whether this involves script tasks or any other situation in which a script might be used. Also note that this is verified at runtime. If a scripting language is not whitelisted the related task or activity will not run.

**Class whitelisting in JavaScript**

You can also configure whitelisting for JavaScript classes that are available for use in JavaScript. The following steps show you how to do this. They are, however, only applicable where you have enabled secure scripting for JavaScript. This will be the case if you have set the property `javascript.secure-scripting.enabled` to true:

```
javascript.secure-scripting.enabled=true
```

1.  Open the <InstallLocation\>/tomcat/lib/activiti-app.properties file.
2.  Locate and set `javascript.secure-scripting.enable-class-whitelisting` to true.

    ```
    javascript.secure-scripting.enable-class-whitelisting = true
    ```

3.  To allow the execution of JavaScript classes, add them to activiti-app/WEB-INF/classes/activiti/javascript-whitelist-classes.conf:

    ```
    java.lang.System
    java.util.ArrayList
    org.apache.tomcat.util.log.SystemLogHandler
    ```


**Note:** The enablement of secure scripting for Java classes used in JavaScript is turned on when either the setting is missing from the properties file or commented out.

**Parent topic:**[Custom Logic](../topics/custom_logic.md)

