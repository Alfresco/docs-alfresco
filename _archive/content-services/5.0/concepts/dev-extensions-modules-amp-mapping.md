---
author: Alfresco Documentation
---

# AMP to WAR mapping

When an AMP file is to be deployed it is applied to the target WAR file using the Module Management Tool. This is a convenient way of applying a number of files to a variety of directories within the target WAR's exploded directory structure. When the AMP is applied, the default mappings can be applied to map from the module directory structure to the exploded WAR directory structure. Custom mappings can also be applied.

By default the module directories, and their sub-directories, are mapped into the target WAR file using the Module Management Tool \(MMT\), as indicated in the following table. Any of the specified directories can be empty or missing if not required by the module.

|Directory|Description|AMP to WAR file mapping|
|---------|-----------|-----------------------|
|/config|Typically contains Spring configuration and UI configuration. Files are organized in a directory structure that reflects the Java package structure of the application. XML import files or ACPs can also be conveniently located here. Any content that needs to be on the Tomcat classpath can be located here.

 Modules also require a module-context.xml file, which is a Spring configuration file. This is located in the directory alfresco\_module\_<moduleId\>.

|./tomcat/webapps/<target\_webapp\>/WEB-INF/classes|
|/config/alfresco/extension/templates/webscripts|Server-side repository-tier web scripts can be located here.

|./tomcat/webapps/<target\_webapp\>/WEB-INF/classes/alfresco/extension/templates/webscripts|
|/config/alfresco/web-extension/templates/webscripts|Server-side web-tier web scripts can be located here.

|./tomcat/webapps/<target\_webapp\>/WEB-INF/classes/alfresco/web-extension/templates/webscripts|
|/lib|Any JAR files required by the module are located here.|./tomcat/webapps/<target\_webapp\>/WEB-INF/lib|
|/licenses|If the module requires any third party JARs that specify certain licenses, then those licenses can be located here.|./tomcat/webapps/<target\_webapp\>/WEB-INF/licenses|
|/web/jsp|This directory should contain any custom or modified JSPs that are required by the module.|./tomcat/webapps/<target\_webapp\>/jsp|
|/web/css|This directory should contain any CSS style sheets required by the module.|./tomcat/webapps/<target\_webapp\>/css|
|/web/images|This directory contains any images required by the module.|./tomcat/webapps/<target\_webapp\>/images|
|/web/scripts|Client-side JavaScript files are located here.|./tomcat/webapps/<target\_webapp\>/scripts|
|module.properties|The module.properties file is required to be present in the AMP file. It contains metadata about the module, most importantly the `id` and `version` of the module that the AMP file contains.|./tomcat/webapps/<target\_webapp\>/WEB-INF/classes/alfresco/module/module\_id/module.properties|
|file-mapping.properties|It is possible to customize the way the AMP file contents is mapped into the target WAR file by the MMT. This is achieved with the file-mapping.properties file. If this file is not present then the default mapping will be used.|Not mapped - drives the mapping process.|

**Parent topic:**[Modules \(AMPs\)](../concepts/dev-extensions-modules-intro.md)

