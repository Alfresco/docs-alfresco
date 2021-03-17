---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: File System Transfer Receiver
---

# Configuring the File System Transfer Receiver

The File System Transfer Receiver transfers folders and content from an Alfresco core repository \(the DM\) to configured targets using the Transfer Service, for example, a remote file system.

The Transfer Service is accessible as a bean named `TransferService`, and it can be defined, along with other related beans, in the transfer-service-context.xml spring context file.

A file system transfer target is marked by specializing a normal transfer target to the type `trx:fileTransferTarget`. It allows you to specify which folder node corresponds to the root folder of the file system receiver by associating the transfer target with a folder \(the `trx:fileTransferRootFolder` association\).

It supports sync mode transfer, so it can also be used by the replication service. It includes an embedded Derby database to keep track of data \(NodeRef to file path mappings, for example\), and it runs as a web application in an embedded Tomcat 7 instance using the Web Script Framework and MyBatis.

-   **[Setting up the File System Transfer Receiver](../tasks/FSTR-install.md)**  
The File System Transfer Receiver is delivered as a compressed zip file.
-   **[Start File System Transfer Receiver](../tasks/FSTR-running.md)**  
This section describes how to start the File System Transfer Receiver.
-   **[File System Transfer Receiver launcher properties](../concepts/FSTR-launcher-props.md)**  
This section describes the properties that are available in the ftr-launcher.properties file.
-   **[File System Transfer Receiver custom properties](../concepts/FSTR-custom-props.md)**  
This section describes the properties that are available in the ftr-custom.properties file.
-   **[File System Transfer Receiver log file properties](../concepts/FSTR-log-props.md)**  
You can debug the File System Transfer Receiver issues using the log4jproperties file. This section describes the `log4j properties` that you can set.

**Parent topic:**[Administering](../concepts/ch-administering.md)

