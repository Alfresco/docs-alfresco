---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring the File System Transfer Receiver

The File System Transfer Receiver transfers folders and content from an Alfresco core repository \(the DM\) to configured targets using the Transfer Service, for example, a remote file system.

The Transfer Service is accessible as a bean named `TransferService`, and it can be defined, along with other related beans, in the transfer-service-context.xml spring context file.

You'll need to create new transfer targets for content replication, and manually change the type of the transfer target folder to the type `trx:fileTransferTarget`. This allows you to specify which folder node corresponds to the root folder of the file system receiver by associating the transfer target with a folder \(i.e. the `trx:fileTransferRootFolder` association\). See [Creating a new transfer target for file system content replication](../tasks/FSTR-transfertarget.md) for more.

It supports sync mode transfer, so it can also be used by the replication service. It includes an embedded Derby database to keep track of data \(NodeRef to file path mappings, for example\), and it runs as a web application in an embedded Tomcat 7 instance using the Web Script Framework and MyBatis.

-   **[Setting up the File System Transfer Receiver](../tasks/FSTR-install.md)**  
The File System Transfer Receiver is delivered as a compressed zip file.
-   **[Start File System Transfer Receiver](../tasks/FSTR-running.md)**  
Use this information to start the File System Transfer Receiver.
-   **[File System Transfer Receiver launch properties](../concepts/FSTR-launcher-props.md)**  
The launch properties for the File System Transfer Receiver are available in the ftr-launcher.properties file.
-   **[File System Transfer Receiver custom properties](../concepts/FSTR-custom-props.md)**  
The custom properties for the File System Transfer Receiver are available in the ftr-custom.properties file.
-   **[File System Transfer Receiver log file properties](../concepts/FSTR-log-props.md)**  
You can debug the File System Transfer Receiver issues using the log4jproperties file. This information describes the `log4j properties` that you can set.
-   **[Creating a new transfer target for file system content replication](../tasks/FSTR-transfertarget.md)**  
The transfer service stores files that control and monitor the operation of the transfer service in the **Transfers** space in the Data Dictionary.

**Parent topic:**[Importing and transferring files](../concepts/import-transfer.md)

