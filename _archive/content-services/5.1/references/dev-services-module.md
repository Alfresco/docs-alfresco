---
author: [Alfresco Documentation, Alfresco Documentation]
---

# ModuleService

A service to control and provide information about the currently-installed modules.

|Information|ModuleService|
|-----------|-------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|A module is an extension to Alfresco that is developed with a particular project structure and packaging. Modules can be registered and loaded as part of the boot process. In the Repository Admin Tools \(Enterprise version\) you can [view the currently installed Modules](../concepts/dev-modules.md). The ModuleService provides functionality to programmatically start up and shut down modules, and get module information.|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
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
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

