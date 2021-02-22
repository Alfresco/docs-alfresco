---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
keyword: FSTR
---

# File System Transfer Receiver launcher properties

This section describes the properties that are available in the ftr-launcher.properties file.

|Property|Description|
|--------|-----------|
|`ftr.tomcat.baseDir=`|Specifies the base directory in which the embedded Tomcat web application server is installed. This can either be an absolute path or a path relative to where the server is being started from. The default value of `${user.dir}` means that the Tomcat base directory is taken to be the user's current working directory.|
|`ftr.tomcat.portNum=`|Specifies the port number on which the FSTR Tomcat web application server is to listen. The default is 9090.|

**Parent topic:**[Configuring the File System Transfer Receiver](../concepts/FSTR-intro.md)

