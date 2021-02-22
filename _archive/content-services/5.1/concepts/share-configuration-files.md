---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library, EXIF renderer source code]
---

# Share configuration files

Share can be configured through a number of configuration files.

The main Share configuration file is share-config.xml. This can be found in a default installation at tomcat/webapps/share/WEB-INF/classes/alfresco/share-config.xml. While it is possible to change configuration through direct changes to this file this is not recommended as any customizations will be lost if the Share WAR is re-exploded, or you install a new version of Alfresco.

To get around this issue it is advisable to make configuration changes to a file outside of the Share WAR. This can be done through the file share-config-custom.xml, which can be found at tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml in the default Alfresco installation. Any changes made here will be applied once the changes have been saved, and Alfresco restarted. Further, your configuration changes can be saved between reinstalls and if the Share WAR re-explodes at any point your configuration file will be unaffected.

**Note:** If you are overriding a configuration section, you must apply the `replace="true"` attribute to replace the existing Alfresco configuration.

It should also be noted that it is possible to package a share-config-custom.xml file in a JAR or AMP. In this way you can have multiple share-config-custom.xml files packaged in JARs or AMPs if necessary. JARs will be loaded from the classpath, for example ./tomcat/shared/lib. AMPs will be applied to the Share WAR file.

CAUTION:

The order in which multiple share-config-custom.xml files are applied is not guaranteed in the case where multiple files override the same section of configuration.

Another key Share configuration file is slingshot-application-context.xml which can be found at ﻿tomcat/webapps/share/WEB-INF/classes/alfresco/slingshot-application-context.xml in the default Alfresco installation. This loads a number of other configuration files:

```

  
﻿    <!-- Spring Web Scripts -->
    <value>classpath:org/springframework/extensions/webscripts/spring-webscripts-config.xml</value>
    <value>classpath:META-INF/spring-webscripts-config-custom.xml</value>
    <value>jar:*!/META-INF/spring-webscripts-config-custom.xml</value>
    
    <!-- Alfresco Surf -->
    <value>classpath:org/springframework/extensions/surf/spring-surf-config.xml</value>
    <value>classpath:org/springframework/extensions/surf/spring-surf-config-remote.xml</value>
    <value>classpath:META-INF/spring-surf-config-custom.xml</value>
    <value>jar:*!/META-INF/spring-surf-config-custom.xml</value>
    
    <!-- Surf Autowire Support -->
    <value>webapp:WEB-INF/surf.xml</value>

    <!-- Common form config -->
    <value>classpath:alfresco/form-config.xml</value>
    
    <!-- Share default config -->
    <value>classpath:alfresco/share-config.xml</value>
    
    <!-- Share help url config -->
    <value>classpath:alfresco/share-help-config.xml</value>
    
    <!-- Share form config -->
    <value>classpath:alfresco/share-form-config.xml</value>
    
    <!-- Share Document Library config -->
    <value>classpath:alfresco/share-documentlibrary-config.xml</value>

    <!-- Share Data List form config -->
    <value>classpath:alfresco/share-datalist-form-config.xml</value>

    <!-- Share workflow form config -->
    <value>classpath:alfresco/share-workflow-form-config.xml</value>
    
    <!-- Share CMIS config -->
    <value>classpath:alfresco/share-cmis-config.xml</value>

    <!-- Share Security config -->
    <value>classpath:alfresco/share-security-config.xml</value>

    <!-- Share custom config -->
    <value>classpath:alfresco/web-extension/share-config-custom.xml</value>
    <value>jar:*!/META-INF/share-config-custom.xml</value>
    <value>classpath:alfresco/web-extension/share-config-custom-dev.xml</value>
    <value>jar:*!/META-INF/share-config-custom-dev.xml</value>
  
  

```

Note that the custom configuration files are loaded last, so that they can override existing configuration.

CAUTION:

Note that the configuration files with the same base filename must have different effective paths in order to be loaded. For example, if you tried to load classes/alfresco/web-extension/share-config-custom.xml and WEB-INF/classes/alfresco/web-extension/share-config-custom.xml, only one of them would be loaded, as these both have the effective path alfresco/web-extension/share-config-custom.xml. Note that where files are loaded from multiple JAR files, such as through `<value>jar:*!/META-INF/share-config-custom.xml</value>`, they have different effective paths, and so multiple configuration files with the same base filename can be successfully loaded in this case.

## Configuration files

The following table summarizes the main Share configuration files:

|Configuration file|Description|Location|
|------------------|-----------|--------|
|share-config.xml|Default Share configuration file.|classpath:alfresco|
|slingshot-application-context.xml|Spring beans file which also loads various configuration files.|tomcat/webapps/share/WEB-INF/classes/alfresco|
|share-form-config.xml|Default configuration for the `cm:content` and `cm:folder` forms.|classpath:alfresco|
|share-datalist-form-config.xml|Default configuration for datalists.|classpath:alfresco|
|share-documentlibrary-config.xml|Default configuration for the document library, my files, shared files and repository pages.|classpath:alfresco|
|share-workflow-config.xml|Default configuration file for the Activiti Workflow forms.|classpath:alfresco|

**Parent topic:**[Configuring Alfresco Share](../concepts/share-configuring-intro.md)

