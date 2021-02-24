---
author: Alfresco Documentation
---

# Custom Logic

Custom logic in a business process is often implemented using a JavaDelegate implementation or a Spring bean.

To build against a specific version of Alfresco Process Services, add the following dependency to your Maven *pom.xml* file:

```
<dependencies>
    <dependency>
        <groupId>com.activiti</groupId>
        <artifactId>activiti-app-logic</artifactId>
        <version>${suite.version}</version>
    </dependency>
</dependencies>
```

-   **[Java Delegates](../topics/java_delegates.md)**  
The simplest option is to create a class that implements the `org.activiti.engine.delegate.JavaDelegate` interface.
-   **[Spring Beans](../topics/spring_beans.md)**  
Another option is to use a Spring bean. It is possible to use a `delegateExpression` on a service task that resolves at run-time to an instance of `org.activiti.engine.delegate.JavaDelegate`. Alternatively, and probably more useful, is to use a general Spring bean. The application automatically scans all beans in the `com.activiti.extension.bean` package. For example:
-   **[Default Spring Beans](../topics/default_spring_beans.md)**  
Use the following sections for information about the default spring beans in Alfresco Process Services.
-   **[Hook points](../topics/hook_points.md)**  
A *hook point* is a place where custom logic can be added. Typically this is done by implementing a certain interface and putting the class implementing the interface on the classpath where it can be found by the classpath component scanning \(package `com.activiti.extension.bean` for example\).
-   **[Custom REST endpoints](../topics/custom_rest_endpoints.md)**  
It’s possible to add custom REST endpoints to the BPM Suite, both in the regular REST API \(used by the BPM Suite html/javascript UI\) and the *public* API \(using basic authentication instead of cookies\).
-   **[Custom rule expression functions](../topics/custom_rule_expression_functions.md)**  
The rule engine uses MVEL as an expression language. In addition to the build in MVEL expression functions there are some additional custom expression functions provided. These are accessible through the structured expression editor within the decision table editor.

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

