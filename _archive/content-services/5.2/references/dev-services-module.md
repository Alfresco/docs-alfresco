---
author: [Alfresco Documentation, Alfresco Documentation]
---

# ModuleService

A service to control and provide information about the currently-installed modules.

|Information|ModuleService|
|-----------|-------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|A module is an extension to Alfresco Content Services that is developed with a particular project structure and packaging. Modules can be registered and loaded as part of the boot process. In Share Admin Tools, you can [view the currently installed Modules](../concepts/dev-modules.md). The ModuleService provides functionality to programmatically start up and shut down modules, and get module information.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/module/ModuleService.html)|
|Java example|```

                  
// Get all Modules

List<ModuleDetails> modules = moduleService.getAllModules();
loggerService.info(I18NUtil.getMessage(MSG_FOUND_MODULES, modules.size()));

for (ModuleDetails module : modules)
{
  Map<String, ModuleComponent> components = getComponents(module.getId());
  for (ModuleComponent component : components.values())
  {
      component.shutdown();
  }
}
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

