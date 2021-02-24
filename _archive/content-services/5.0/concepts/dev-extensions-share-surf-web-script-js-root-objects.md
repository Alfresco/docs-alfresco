---
author: Alfresco Documentation
---

# Surf Web Script JavaScript Root Objects

A number of JavaScript root objects are available when you are implementing a controller for a Surf Web Script, such as `page` and `remote`. Sometimes you might have custom Java code that you want to call from JavaScript controllers, this is possible by adding custom JavaScript root objects.

|Extension Point|Surf Web Script JavaScript Root Objects|
|---------------|---------------------------------------|
|Architecture Information|-   [Share Architecture](dev-extensions-share-architecture-extension-points.md)

|
|Description|It is possible to create and add custom script API's implemented in Java and accessible as root objects in JavaScript. This provides an integration point for Alfresco extensions to provide custom JavaScript API's where appropriate.

 In order to implement a custom JavaScript API it is recommended that you develop a POJO \(Plain Old Java Object\) that extends the base class

```
org.alfresco.repo.processor.BaseProcessorExtension
```

. The public methods of your class will be those that will be accessible from JavaScript.

 Let's implement a custom root object that can print text to the log \(i.e. tomcat/logs/catalina.out\) :

```
package org.alfresco.training.jscript;
import org.alfresco.repo.processor.BaseProcessorExtension;

public class CustomProcessorExtension extends BaseProcessorExtension {
 public void log2StdOut(String text) {
  System.out.println(text);
 }
}   
```

 This class needs to be defined as a Spring Bean with parent set to `baseJavaScriptExtension`:

```
<bean id="org.alfresco.training.customRootObject" class="org.alfresco.training.jscript.CustomProcessorExtension" parent="baseJavaScriptExtension">
    <property name="extensionName"   value="custom" />
</bean>   
```

 The `extensionName` property is used to configure what root object name you want to use in the JavaScript controllers.

 The new `myLogger` root object can now be used in the JavaScript controller as follows:

```
custom.log2StdOut("Hello World!");   
```

|
|Deployment - App Server|JavaScript root object implementations does not lend themselves very well to be manually installed in an application server.[Build a Repository AMP](../tasks/alfresco-sdk-tutorials-amp-archetype.md) instead.

|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-amp-archetype.md)|-   repo-amp/src/main/java - put the implementation class for the root object somewhere under this directory \(**Note** that root object implementations should be include in a Repo AMP as it is to be part of the Alfresco Repository \(alfresco.war\)\)
-   repo-amp/src/main/amp/config/alfresco/module/repo-amp/context/service-context.xml - put the root object Spring bean here.


|
|More Information|-   [Root Object Reference](../references/APISurf-rootscoped.md) \(Have a look at what root objects are already there\)

|
|Tutorials| |
|Alfresco Developer Blogs| |

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

