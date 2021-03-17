---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
keyword: FSTR
---

# File System Transfer Receiver custom properties

This section describes the properties that are available in the ftr-custom.properties file.

This file is used to configure the operation of FSTR. It contains the settings for the root directory, staging directory, derby database connection string, username, and password.

|Property|Description|
|--------|-----------|
|`fileTransferReceiver.stagingDirectory=`|The staging directory is where the FSTR will temporarily store the files that it receives from the source repository during a transfer. These files include the manifest file that describes the metadata of the nodes being transferred as well as the actual content files associated with those nodes. All of these files are staged in the directory referenced by this property prior to being moved to their correct location below the root directory. The default is `./ftr-staging`|
|`fileTransferReceiver.rootDirectory=`|Specifies the location of the directory on the local file system that is the top level of the transferred tree of nodes. A node that is a child of the nominated root node of the transfer in the source repository will be placed in the directory referenced by this property when it's transferred. The default it `./ftr-root`|
|`fileTransferReceiver.jdbcUrl=jdbc:``derby:./derbyDB;create=true;`

`user=alfresco;password=alfresco`

|The FSTR contains an embedded Apache Derby database that it uses to keep track of which nodes it receives and which file on the file system corresponds to which node. This property specifies the connection URL for this embedded database. It is unlikely that it will need to be changed.**Note:** Alfresco recommends that you do not store FSTR database on a network file system location, such as an NFS volume. The database must be on a local disk to ensure data integrity.

|
|`fileTransferReceiver.username=`|The user name that the source repository will have to declare when initiating a transfer to this FSTR. This property must correspond with the user name property stored on the transfer target in the source repository. The default is set to `admin`.|
|`fileTransferReceiver.password=`|The password that the source repository will have to declare when initiating a transfer to this FSTR. This property must correspond with the password property stored on the transfer target in the source repository. The default is set to `admin`.|

**Parent topic:**[Configuring the File System Transfer Receiver](../concepts/FSTR-intro.md)

