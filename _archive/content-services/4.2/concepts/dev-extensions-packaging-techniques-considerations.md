---
author: Alfresco Documentation
---

# Considerations

The following considerations should be taken into account when considering the packaging technique to be used for your extension.

## Classes which are intended to be extended

Should you be building an Alfresco extension that you plan to redistribute, and you want to allow the consumers to modify your extension, it will need to be placed in the extension folder and not the web-extension folder. If consumers want to extend your extension, their customizations will go in web-extension folder which will load after the customization you placed in the extension folder.

## Alfresco configuration files

Filenames on the classpath must be unique as only the last one will be used. For example, if you have multiple JARs with a web-client-config-custom.xml file in the alfresco/extension directory the class loader will load the last one it finds, which in turn, will result in unpredictable behavior. Furthermore, you cannot guarantee the order in which files will be found.

You can have multiple web-client-config-custom.xml files present in the system by placing them in the JAR file's META-INF folder.

## JSF configuration files

Unfortunately, to override JSF configuration differs depending on what you want to override. For whatever reason, JSF has a first one wins policy for navigation rules and a last one wins policy for managed beans.

We therefore provide hooks for JSF configuration at the start and the end of JSF initialization. To hook in at the beginning, for example to override a navigation rule, create a faces-config.xml and package the file within a JAR within the META-INF directory. To hook in at the end, create a faces-config-custom.xml file and copy it to the WEB-INF directory of the Alfresco web application, this should replace the empty placeholder file.

As a guide the table below shows which file JSF config should go to:

|Override|File and Location|
|--------|-----------------|
|Overriding navigation rules|faces-config.xml in META-INF|
|Overriding managed beans|faces-config-custom.xml in WEB-INF|
|New navigation rules|Either|
|New managed beans|Either|

**Parent topic:**[Packaging techniques](../concepts/dev-extensions-packaging-techniques.md)

