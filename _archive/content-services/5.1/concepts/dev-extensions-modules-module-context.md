---
author: Alfresco Documentation
---

# Module context file

If a module uses Spring beans it requires a module context file. This is used to load the Spring configuration for the module.

A module is initialized when the Alfresco repository loads the root Spring configuration for that module.

A module's root Spring configuration must be placed in the package `alfresco/module/<module_id>` and should be called module-context.xml.

When the module service is initialized, all the module-context.xml configurations found are loaded, thus initializing the installed modules ready for use.

The module-context.xml file is a standard Spring configuration file and typically new beans will be defined, custom content models and client configuration specified and data loaded or patched.

In a complex module the configuration can be split up into smaller Spring configurations which are included by module-context.xml.

**Note:** The property `executeOnceOnly`, the default value of which is true, tells the system how many times to execute your module. If you want your module to run every time Alfresco is started, set `executeOnceOnly` to false.

**Parent topic:**[Extension packaging - modules](../concepts/dev-modules.md)

