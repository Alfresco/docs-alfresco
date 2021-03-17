---
author: Alfresco Documentation
---

# AMP file format

The AMP file has a specific directory layout that contains the files that make up the extension. In addition it contains special files such as module-context.xml, module.properties and file-mapping.properties that control the behavior of the AMP.

## AMP file structure

The module package format is a compressed zip file. The AMP file has the following structure:

```

        
        /
        |_ /config
               |_ /alfresco
                        |
                        |_ /extension
                               |_ /templates
                                      |_ /webscripts
                        |              
                        |_ /web-extension
                               |_ /templates
                                      |_ /webscripts
                        |
                        |_ /module
                               |_ /module_id
                                      |_ module-context.xml
        |_ /lib
        |_ /licenses
        |_ /web
               |
               |_ /jsp
               |_ /css
               |_ /images
               |_ /scripts
        |_ module.properties
        |_ file-mapping.properties
        
      
```

-   **module**

    The module directory contains a directory using the module's ID. This ID provides a module namespace and should be unique. The convention is to use a reverse domain name \(with underscore as the separator\).

-   **module.properties**

    Required. This file stores module related properties such as the module's ID, version, title and description. Module dependencies and required Alfresco version can also be set in this file. This file is located in the root of the AMP structure.

-   **module-context.xml**

    Required. This is a Spring bean configuration file. All beans specified within this file will get initialized when Alfresco starts and loads the module. Beans that import content or initialize the module would be referenced here. Other required context files would be imported from this file too. This file is located in the directory config/alfresco/module/module\_id/.

-   **file-mapping.properties**

    The file-mapping.properties file is used when your module does not conform to the standard directory structure. The mapping file maps a directory in the module to a directory in the exploded web application directory. the property `include.default` \(which is true by default\) specifies whether the default mappings should be applied. You can apply the defaults and then apply your own specific mappings. If you set `include.default` to false, you will need to provide all the necessary mappings for your module. This file is located in the root of the module directory structure.

-   **config**

    This directory will be mapped into the /WEB-INF/classes directory in the WAR file. Generally your Spring and UI config will reside in the standard package structure within this directory.

    Resources that are used by your extension, such as XML import files or ACPs can also reside in here, as it can often be convenient to place such things on the classpath for loading from Spring.

    As a module developer, you will be required to provide a module-context.xml \(and optionally a module-disable-context.xml and module-uninstall-context.xml\) in the alfresco.module.<moduleId\> package. These will reside in the /config directory.

    You should place server-side webscripts here. AMP to war file mappings are:

    -   config/alfresco/templates/webscripts to $CATALINA\_HOME/webapps/alfresco/WEB-INF/classes/alfresco/templates/webscripts
    -   config/alfresco/extension/templates/webscripts to $CATALINA\_HOME/webapps/alfresco/WEB-INF/classes/alfresco/extension/templates/webscripts
    To be more specific /config/alfresco locates to $CATALINA\_HOME/webapps/alfresco/WEB-INF/classes/alfresco/

-   **lib**

    This directory will be mapped into /WEB-INF/lib. It should contain any JAR files that relate to your module.

-   **licenses**

    If your module includes any third-party JARs that require the inclusion of licenses that are not currently included in the standard repository WAR, then these should be placed here.

-   **/web/jsp**

    This directory should contain any custom or modified JSP's that relate to your module. The contents are mapped into the /jsp directory in the WAR file.

-   **/web/css**

    This directory should contain any CSS files that relate to your module. The contents are mapped into the /css directory in the WAR file.

-   **/web/images**

    Any images that relate to your module should be placed here. The contents are mapped into the /images directory in the WAR file.

-   **/web/scripts**

    JavaScript files that are used by the user interface should be placed here. The contents are mapped into the /scripts directory in the WAR file.

    Any folder structures found in any of these directories are mapped, as they are found, into the destination folders in the WAR.

    If a file already exists it is overridden in the WAR. When this happens a recoverable backup is saved by the Module Management Tool \(MMT\).


**Parent topic:**[Alfresco Module Package \(AMP\)](../concepts/dev-extensions-packaging-techniques-amps.md)

