---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script components, web script file locations]
---

# File locations

Web script component files are located in the file system within the Java classpath or in the Alfresco content repository.

The Web Script Framework searches for web scripts in the following order:

-   In the content repository under the folder **/Company Home/Data Dictionary/Web Scripts Extensions**
-   In the content repository under the folder **/Company Home/Data Dictionary/Web Scripts**
-   In the classpath under the folder**/alfresco/extension/templates/webscripts**
-   In the classpath under the folder **/alfresco/templates/webscripts**

Placing web scripts in the classpath lets you package and deploy them with other extensions that comprise your solution. You can install them using standard Alfresco tools without having to upload them into the content repository. However, it may not be as convenient to edit them while developing them as if they were located in the Alfresco content repository where you can easily edit them using Alfresco Explorer or Share. You can also export and import web scripts in the content repository using the ACP \(Alfresco Content Package\) mechanism.

**Note:** For a default installation of Alfresco, the classpath is located at **<installLocation\>/tomcat/shared/classes/alfresco/extension**

A single Alfresco content application server may contain hundreds of web scripts, each implemented with multiple files. To help manage all these web scripts, the Web Script Framework lets you organize web script component files into a hierarchical folder or package structure, similar to a Java package construct. Typically, the package name follows the reverse domain name pattern. For example, Alfresco’s web scripts are all located in a folder named **org/alfresco**, which is reserved by Alfresco.

**Parent topic:**[Web Script Framework](../concepts/ws-framework.md)

