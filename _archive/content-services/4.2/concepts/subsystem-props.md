---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: subsystem properties
---

# Subsystem properties

A subsystem declares default values for all the properties it requires in one or more .properties files in its subsystem directory.

For example, there could be a mysubsystem.properties file, containing the following:

```
ooo.user=${dir.root}/oouser
```

Place holders are used for system-wide properties, such as `dir.root` in the -context.xml and .propertiesfiles, as the child application context will recursively expand place holders for its own properties and all the place holders recognized by its parent.

Properties files in the subsystem directory declare the configuration parameters and provide default values where these have not been supplied elsewhere. These files should not be edited in order to configure the subsystem.

Use the following methods to modify the subsystem properties:

-   Subsystems and all their composite properties show under the `Alfresco:Type=Configuration` tree in JConsole.
-   See [Modifying global properties](../tasks/global-props-config.md) for more information on how to configure a prepackaged subsystem.
-   `-D` options

**Parent topic:**[Configuring Alfresco subsystems](../concepts/subsystem-intro.md)

