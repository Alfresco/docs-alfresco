---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# File System Transfer Receiver launch properties

The launch properties for the File System Transfer Receiver are available in the ftr-launcher.properties file.

This file contains the Tomcat base directory and the port number to startup on.

|Property|Description|
|--------|-----------|
|`ftr.tomcat.baseDir=`|Specifies the base directory in which the embedded Tomcat web application server is installed. This can either be an absolute path or a path relative to where the server is being started from. The default value of `${user.dir}` means that the Tomcat base directory is taken to be the user's current working directory.|
|`ftr.tomcat.portNum=`|Specifies the port number on which the FSTR Tomcat web application server is to listen. The default is 9090.|

**Parent topic:**[Configuring the File System Transfer Receiver](../concepts/FSTR-intro.md)

