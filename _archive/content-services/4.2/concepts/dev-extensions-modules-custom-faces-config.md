---
author: Alfresco Documentation
---

# Adding Custom Faces Configuration

It is possible to add custom faces configuration to a module.

Custom JSF configuration should be located in the module JAR file, in the META-INF directory.

Override JSF configuration differs depending on what is to be overridden. JSF has a first one wins policy for navigation rules and a last one wins policy for managed beans.

For this reason hooks are provided for JSF configuration at the start and the end of JSF initialization. To hook in at the beginning, that is to override a navigation rule, create a faces-config.xml and package the file within a JAR within the META-INF folder. To hook in at the end, in order to override a managed bean, create a faces-config-custom.xml file and copy it to the WEB-INF folder of the Alfresco web application.

As a guide, the table below shows which file the JSF configuration should go to:

|Override|File and Location|
|--------|-----------------|
|Overriding navigation rules|faces-config.xml in META-INF|
|Overriding managed beans|faces-config-custom.xml in WEB-INF|
|New navigation rules|Either|
|New managed beans|Either|

**Parent topic:**[Modules](../concepts/dev-extensions-modules-intro.md)

