---
author: Alfresco Documentation
---

# Share configuration files

Share can be configured through configuration files. This topic looks at the key configuration files available.

The main Share configuration file is share-config.xml. This can be found in a default installation at tomcat/webapps/share/WEB-INF/classes/alfresco/share-config.xml. While it is possible to change configuration through direct changes to this file this is not recommended as any customizations will be lost if the Share WAR is re-exploded, or you install a new version of Alfresco. To get around this issue it is advisable to make configuration changes to a file outside of the Share WAR. This can be done through the file share-config-custom.xml, which can be found at tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml in the default Alfresco installation. Any changes made here will be applied, and can be saved between reinstalls and the Share WAR exploding.

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
    
    <!-- Spring Surf -->
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

**Parent topic:**[Customizing Alfresco Share](../concepts/share-customizing-intro.md)

