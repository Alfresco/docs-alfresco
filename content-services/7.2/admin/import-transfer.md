---
title: Import and transfer tools
---

Use this information to import files using the Bulk Import Tool, or transfer files using the File System Transfer Receiver (FSTR).

The Bulk Import tool provides a mechanism for Systems Administrators to import existing content in bulk into a repository from the Alfresco server's file system.

It (optionally) replaces existing content items if they already exist in the repository, but does not delete. It is not designed to fully synchronize the repository with the local file system.

The basic on-disk file/folder structure is preserved as it is in the repository. It is possible to load metadata for the files and spaces being ingested, as well as a version history for files (each version consists of content, metadata, or both).

There are two types of bulk import:

* **Streaming import**: this copies the source content into the repository content store.
* **In-place import**: Available in Enterprise Only, these files are assumed to already exist within the repository content store, so no copying is required. This can result in a significant improvement in performance.

There are a number of restrictions:

* Only one bulk import can be running at a time. This is enforced by the `JobLockService`.
* Access to the Bulk Import tool is restricted to Content Services administrators.
* There is a file name length limitation of 255 characters for imported files. This limitation reflects most file systems [limits](https://en.wikipedia.org/wiki/Comparison_of_file_systems#Limits).

### In-place bulk import

The in-place bulk import feature imports files that already exist within the repository content store. As no copying is required, this gives significant performance improvements.

Three assumptions are made when importing content `in-place`:

* The content is already at its initial repository location prior to import, as it'll be not be moved during the import.
* The in-place content must be within the tree structure of a registered content store, as defined by either:
  * The default `fileContentStore`
  * A filesystem-based store defined by the content store selector
* Steps have already been taken prior to import to ensure the content structure is well distributed.
  * The default `fileContentStore` distributes content, based on the import date (year/month/day/hour/minute). This avoids having thousands of files under the same root, which is inefficient both for the file system and for computing parent associations in Content Services (among other things).
  * It is recommended you keep immediate children to a few thousands at a maximum.
  * In order to choose an efficient distribution scheme, you should know that when m files are randomly distributed into n leaf folders, when `m >> n log n` the statistical maximum load of a leaf is `m/n + O(sqrt((m log n)/n))`.

In addition, the in-place bulk import provides support for [Managing the content store]({% link content-services/7.2/admin/content-stores.md %}#cs-selector). This allows you to select which store the content to import is to be found.

### Prepare file system

There are a number of tasks you must do to prepare the file system before you do the bulk import.

#### Metadata files

The Bulk Import tool has the ability to load metadata (types, aspects, and their properties) into the repository. This is done using "shadow" Java property files in XML format as it has good support for Unicode characters. These shadow properties files must have exactly the same name and extension as the file for which it describes the metadata, but with the suffix .metadata.properties.xml. For example, if there is a file called `IMG_1967.jpg`, the "shadow" metadata file is called `IMG_1967.jpg.metadata.properties.xml`.

These shadow files can also be used for directories. For example, if you have a directory called `MyDocuments`, the shadow metadata file is called `MyDocuments.metadata.properties.xml`.

The metadata file itself follows the usual syntax for Java XML properties files:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
   <entry key="key1">value1</entry>
   <entry key="key2">value2</entry>
    ...
</properties>
```

There are two special keys:

* Type contains the qualified name of the content type to use for the file or folder
* Aspects contains a comma-delimited list of the qualified names of the aspect(s) to attach to the file or folder

The remaining entries in the file are treated as metadata properties, with the key being the qualified name of the property and the value being the value of that property. Multi-valued properties are comma-delimited. However, these values are not trimmed so it's recommended you do not place a space character either before or after the comma, unless you want that in the value of the property.

Here is an example using `IMG_1967.jpg.metadata.properties.xml`:

```xml
 <?xml version="1.0" encoding="UTF-8"?>
 <!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
 <properties>
    <entry key="type">cm:content</entry>
    <entry key="aspects">cm:versionable,cm:dublincore</entry>
    <entry key="cm:title">A photo of a flower.</entry>
    <entry key="cm:description">A photo I took of a flower while walking around Bantry Bay.</entry>
    <entry key="cm:created">1901-01-01T12:34:56.789+10:00</entry>
    <!-- cm:dublincore properties -->
    <entry key="cm:author">Peter Monks</entry>
    <entry key="cm:publisher">Peter Monks</entry>
    <entry key="cm:contributor">Peter Monks</entry>
    <entry key="cm:type">Photograph</entry>
    <entry key="cm:identifier">IMG_1967.jpg</entry>
    <entry key="cm:dcsource">Canon Powershot G2</entry>
    <entry key="cm:coverage">Worldwide</entry>
    <entry key="cm:rights">Copyright (c) Peter Monks 2002, All Rights Reserved</entry>
    <entry key="cm:subject">A photo of a flower.</entry>
  </properties>
```

Additional notes on metadata loading:

* You can't create a new node based on metadata only, you must have a content file (even if zero bytes) for the metadata to be loaded. Even so, you can "replace" an existing node in the repository with nothing but metadata. Despite the confusing name, this won't replace the content; instead the new metadata is added.
* The metadata must conform to the type and aspect definitions configured in Content Services (including mandatory fields, constraints, and data types). Any violations will terminate the bulk import process.
* Associations between content items loaded by the tool are not yet nicely supported. Associations to objects that are already in the repository can be created using the NodeRef of the target object as the value of the property.
* Non-string data types (including numeric and date types) have not been exhaustively tested. Date values have been tested and do work when specified using ISO8601 format.
* Updating the aspects or metadata on existing content won't remove any existing aspects not listed in the new metadata file; this tool is not intended to provide a full file system synchronization mechanism.
* The metadata loading facility can be used to supplement content that's already in the repository, without having to upload that content again. To use this, create a "naked" metadata file in the same path as the target content file. The tool will match it up with the file in the repository and add the new aspect(s) and/or metadata to that file.

#### Version History files

The import tool also supports loading a version history for each file. To do this, create a file with the same name as the main file, but append it with a `v#` extension. For example:

```text
  IMG_1967.jpg.v1   <- version 1 content
  IMG_1967.jpg.v2   <- version 2 content
  IMG_1967.jpg      <- "head" (latest) revision of the content
```

This also applies to metadata files if you want to capture metadata history as well. For example:

```text
  IMG_1967.jpg.metadata.properties.xml.v1   <- version 1 metadata
  IMG_1967.jpg.metadata.properties.xml.v2   <- version 2 metadata
  IMG_1967.jpg.metadata.properties.xml      <- "head" (latest) revision of the metadata
```

Additional notes on version history loading:

* You can't create a new node based on a version history only. You must have a head revision of the file.
* Version numbers do not have to be contiguous. You can number your version files however you want, provided you use whole numbers (integers).
* The version numbers in your version files won't be used in Content Services. The version numbers in Content Services will be contiguous, starting at 1.0 and increasing by 1.0 for every version (so 1.0, 2.0, 3.0, and so on). Content Services doesn't allow version labels to be set to arbitrary values, and the bulk import doesn't provide any way to specify whether a given version should have a major or minor increment.
* Each version can contain a content update, a metadata update or both. You are not limited to updating everything for every version. If not included in a version, the prior version's content or metadata will remain in place for the next version.

The following example shows all possible combinations of content, metadata, and version files:

```text
  IMG_1967.jpg.v1                           <- version 1 content
  IMG_1967.jpg.metadata.properties.xml.v1   <- version 1 metadata
  IMG_1967.jpg.v2                           <- version 2 content
  IMG_1967.jpg.metadata.properties.xml.v2   <- version 2 metadata
  IMG_1967.jpg.v3                           <- version 3 content (content only version)
  IMG_1967.jpg.metadata.properties.xml.v4   <- version 4 metadata (metadata only version)
  IMG_1967.jpg.metadata.properties.xml      <- "head" (latest) revision of the metadata
  IMG_1967.jpg                              <- "head" (latest) revision of the content
```

### Import with the Bulk Import tool

You can bulk import by using the user interface, or with a program.

Content Services web scripts are used for bulk importing. If you choose to code the bulk import, code examples are provided to help you. In both cases, you can use the reference table to determine the fields and data that are required for a successful import.

If you need to troubleshoot or diagnose any issues with a bulk import, you can enable logging. To enable debugging for the Bulk Import tool, add the following command to the `log4j.properties` file before deployment:

```text
log4j.logger.org.alfresco.repo.bulkimport=DEBUG
```

Set the debug statements to at least INFO level:

```text
log4j.logger.org.alfresco.repo.batch.BatchProcessor=info
```

You can also enable logging for the transaction handler to identify any transactional issues during the import:

```text
log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=info
```

For more information about log4j, see [log4j.properties file]({% link content-services/7.2/develop/extension-packaging.md %}#log4jpropsfile).

#### Bulk import using the user interface {#bulkimportwithui}

The two types of bulk import (streaming and in-place) each have a user interface, which are implemented using web scripts.

Streaming bulk import is exposed in two web scripts:

1. A simple UI web script that can be used to set up the parameters for an import. This is an HTTP GET web script with a path of: `http://localhost:8080/alfresco/service/bulkfsimport`
2. An initiate web script that kicks off an import using parameters that are passed to it (for the source directory, target space, and so on). If you want to script or invoke the tool programmatically, this is the web script that you call. This is an HTTP POST web script with a path of: `http://localhost:8080/alfresco/service/bulkfsimport/initiate`

The UI web script presents the following simplified HTML form:

![bulk-upload-streaming]({% link content-services/images/bulk-upload-streaming.png %})

* The **Import directory** field is required and indicates the absolute file system directory to load the content and spaces from, in an OS-specific format. Note that this directory must be locally accessible to the server on which the Content Services instance is running. It must either be a local file system or a locally mounted remote file system (mounted using GFS, or similar).
* The **Target space (Path)** field is also required and indicates the target space to load the content into, as a path starting with `/Company Home`. The separator character is Unix-style `/`, regardless of the platform Content Services is running on. This field includes an AJAX auto-suggest feature, so you can type any part of the target space name, and an AJAX search is performed to find and display matching items.
* The **Target space (NodeRef)** field is an alternative to **Target space (Path)** and indicates the target NodeRef to load the content into.
* The **Disable rules** check box allows you to turn off rule processing during the bulk import.
* The **Replace existing files** option indicates whether to replace nodes that already exist in the repository (checked) or skip them (unchecked). Note that if versioning is enabled for a node, the node's existing content and metadata is preserved as the prior version and the new content and/or metadata will be written into the head revision.
* The **Batch Size** text field allows you to override the default batch size (the number of directories and files to import at a time, per transaction; defined by the property `bulkImport.batch.batchSize`) to use in the bulk import.
* The **Number of Threads** text field allows you to override the default number of threads (defined by the property `bulkImport.batch.numThreads`) to use in the bulk import.

In-place bulk import is exposed in a series of two web scripts:

1. A simple UI web script that can be used to set up the parameters for an import. This is an HTTP GET web script with a path of: `http://localhost:8080/alfresco/service/bulkfsimport/inplace`
2. An initiate web script that kicks off an import, using parameters that are passed to it (for the source directory, target space, and so on). If you want to script or programmatically invoke the tool, this is the web script that you call. This is an HTTP POST web script with a path of: `http://localhost:8080/alfresco/service/bulkfsimport/inplace/initiate`

The in-place UI web script presents the following simplified HTML form:

![bulk-upload-in-place]({% link content-services/images/bulk-upload-in-place.png %})

* The **Store-relative import directory path** field is required and indicates the file system path for loading content and spaces, relative to the content store, in an OS-specific format. Note that this directory must be locally accessible to the server the Content Services instance is running on - it must either be a local file system or a locally mounted remote file system (mounted using GFS, or similar). This directory must already be inside an existing content store.
* The **Content Store** field is the name of the store that holds the content, as defined within the storage configuration (content store selector or direct `fileContentStore`). The default store is by default named `default`. An autocomplete menu will assist in selecting the name as the first characters are entered. The **Up** and **Down** keyboards keys can be used to navigate the list, in addition to the mouse.
* The **Target repository path** field is also required and indicates the target space to load the content into, as a path starting with `/Company Home`. The separator character is Unix-style `/`, regardless of the platform Content Services is running on. This field includes an AJAX auto-suggest feature, so you can type any part of the target space name, and an AJAX search is performed to find and display matching items.
* The **Disable rules** option allows you to turn off rule processing during the bulk import.
* The **Batch Size** text field allows you to override the default batch size (the number of directories and files to import at a time, per transaction; defined by the property `bulkImport.batch.batchSize`) to use in the bulk import.
* The **Number of Threads** text field allows you to override the default number of threads (defined by the property `bulkImport.batch.numThreads`) to use in the bulk import.

The status web page is the same for both streaming and in-place import.

##### Bulk Filesystem Import Tool Status

The bulk import status web script returns status information on the current import (if one is in progress), or the status of the last import that was initiated. This web script has both HTML and XML views, allowing external programs to programmatically monitor the status of imports. This is an HTTP GET web script with a path of: `http://localhost:8080/alfresco/service/bulkfsimport/status`

The status web page is the same for both streaming and in-place import. The status is updated every five seconds when a bulk import has been initiated.

For more information about the fields and their meanings, see [Bulk Import tool fields and values](#import-tool-fieldsvals).

#### Bulk import using a program

Code examples show you how to complete a streaming bulk import and an in-place bulk import programmatically.

Streaming example:

```java
   UserTransaction txn = transactionService.getUserTransaction();
   txn.begin();

   AuthenticationUtil.setRunAsUser("admin");

   StreamingNodeImporterFactory streamingNodeImporterFactory = (StreamingNodeImporterFactory)ctx.getBean("streamingNodeImporterFactory");
   NodeImporter nodeImporter = streamingNodeImporterFactory.getNodeImporter(new File("importdirectory"));
   BulkImportParameters bulkImportParameters = new BulkImportParameters();
   bulkImportParameters.setTarget(folderNode);
   bulkImportParameters.setReplaceExisting(true);
   bulkImportParameters.setBatchSize(40);
   bulkImportParameters.setNumThreads(4);
   bulkImporter.bulkImport(bulkImportParameters, nodeImporter);

   txn.commit();
```

In-place example:

```java
   txn = transactionService.getUserTransaction();
   txn.begin();

   AuthenticationUtil.setRunAsUser("admin");

   InPlaceNodeImporterFactory inPlaceNodeImporterFactory = (InPlaceNodeImporterFactory)ctx.getBean("inPlaceNodeImporterFactory");
   NodeImporter nodeImporter = inPlaceNodeImporterFactory.getNodeImporter("default", "2011");
   BulkImportParameters bulkImportParameters = new BulkImportParameters();
   bulkImportParameters.setTarget(folderNode);
   bulkImportParameters.setReplaceExisting(true);
   bulkImportParameters.setBatchSize(150);
   bulkImportParameters.setNumThreads(4);
   bulkImporter.bulkImport(bulkImportParameters, nodeImporter);

   txn.commit();
```

For more information about the web scripts that you invoke to script a bulk import, see [Bulk importing using the user interface](#bulkimportwithui).

#### Fields and values {#import-tool-fieldsvals}

The Bulk Import tool has a number of entry and display fields that are shown in the user interface, but also referenced in the `status.xml` file that is used if you're programming a bulk import. The labels, fields, possible values and a summary of each entry is explained below.

|Field label (from Bulk Import status web page)|Field entry (from status.xml file)|Possible values|Summary|
|------------------------------------------------|------------------------------------|---------------|-------|
|Current status|`<CurrentStatus>Idle</CurrentStatus>`|Idle \| In Progress|Status of the bulk import|
|Successful|`<ResultOfLastExecution>Yes</ResultOfLastExecution>`|Yes \| No \| n/a|Result of the bulk import|
|Batch Size|`<batchSize>20</batchSize>`|Numeric|The batch size (number of directories and files to import at a time) specified for the bulk import|
|Number of threads|`<numThreads>4</numThreads>`|Numeric|The number of threads specified for the bulk import|
|Source Directory|`<SourceDirectory>importdirectory</SourceDirectory>`|Alphanumeric|The absolute path of the filesystem directory being imported|
|Target Space|`<TargetSpace>/Company Home</TargetSpace>`|Alphanumeric|The path of the Alfresco space where the content is being loaded, starting with `/Company Home`|
|Start Date|`<StartDate>2014-05-15 01:30:11.912PM</StartDate>`|Date and timestamp|Start of the bulk import. Format is YYYY-MM-DD HH:MM:SS.sss AM \| PM|
|End Date|`<EndDate>2014-05-15 01:30:12.009PM</EndDate>`|Date and timestamp|End of the bulk import. Format is YYYY-MM-DD HH:MM:SS.sss AM \| PM|
|Duration|`<DurationInNS>0d 0h 0m 0s 96.941ms</DurationInNS>`|Alphanumeric|Time taken for the bulk import to complete. Format is `xd xh xm xxs xx.xxxms` where `x` is a number|
|Number of Completed Batches|`<CompletedBatches>0</CompletedBatches>`|Numeric|Number of batches completed in the bulk import|
|Source (read) Statistics|`<SourceStatistics>`|
|Scanned: Folders|`<FoldersScanned>0</FoldersScanned>`|Numeric|Number of source folders scanned|
|Scanned: Files|`<FilesScanned>0</FilesScanned>`|Numeric|Number of source files scanned|
|Scanned: Unreadable|`<UnreadableEntries>0</UnreadableEntries>`|Numeric|Number of unreadable source files|
|Read: Content|`<ContentFilesRead>0</ContentFilesRead>`|Numeric|Amount of source content read. Format is numeric with size of content in parentheses|
|Read: Metadata|`<MetadataFilesRead>0</MetadataFilesRead>`|Numeric|Amount of source metadata read. Format is numeric with size of metadata in parentheses|
|Read: Content Versions|`<ContentVersionFilesRead>0</ContentVersionFilesRead>`|Numeric|Source content versions read. Format is numeric with size of content versions in parentheses|
|Read: Metadata Versions|`<MetadataVersionFilesRead>0</MetadataVersionFilesRead>`|Numeric|Source metadata versions read. Format is numeric with size of metadata versions in parentheses|
|Throughput|N/A|Numeric|Number of entries scanned per second, number of files read per second, and size of data read per second|
|Target (write) Statistics|`<TargetStatistics>`|
|Space Nodes: # Created|`<SpaceNodesCreated>0</SpaceNodesCreated>`|Numeric|Number of target space nodes created|
|Space Nodes: # Replaced|`<SpaceNodesReplaced>0</SpaceNodesReplaced>`|Numeric|Number of target space nodes replaced|
|Space Nodes: # Skipped|`<SpaceNodesSkipped>0</SpaceNodesSkipped>`|Numeric|Number of target space nodes skipped|
|Space Nodes: # Properties|`<SpacePropertiesWritten>0</SpacePropertiesWritten>`|Numeric|Number of properties written for target space nodes|
|Content Nodes: # Created|`<ContentNodesCreated>0</ContentNodesCreated>`|Numeric|Number of target content nodes created|
|Content Nodes: # Replaced|`<ContentNodesReplaced>0</ContentNodesReplaced>`|Numeric|Number of target content nodes replaced|
|Content Nodes: # Skipped|`<ContentNodesSkipped>0</ContentNodesSkipped>`|Numeric|Number of target content nodes skipped|
|Content Nodes: # Data Written|`<ContentBytesWritten>0</ContentBytesWritten>`|Numeric|Amount of target content node data written|
|Content Nodes: # Properties|`<ContentPropertiesWritten>0</ContentPropertiesWritten>`|Numeric|Number of properties written for target content nodes|
|Content Versions: # Created|`<ContentVersionsCreated>0</ContentVersionsCreated>`|Numeric|Number of target content versions created|
|Content Versions: # Data Written|`<ContentVersionsBytesWritten>0</ContentVersionsBytesWritten>`|Numeric|Amount of target content version data written|
|Content Versions: # Properties|`<ContentVersionsPropertiesWritten>0</ContentVersionsPropertiesWritten>`|Numeric|Number of properties written for target content versions|
|Throughput (write)|N/A|Numeric|Number of nodes scanned per second and size of data written per second|
|Error Information From Last Run|`<ErrorInformation>`|
|File that failed|`<FileThatFailed>n/a</FileThatFailed>`|Alphanumeric|The name of the file that failed during the bulk import|
|Exception|`<Exception>exceptionLog</Exception>`|Alphanumeric|The stack trace of the exception that occurred during the bulk import|

## Configure File System Transfer Receiver

The File System Transfer Receiver (FSTR) transfers folders and content from a Content Services core repository (the DM) to configured targets using the Transfer Service, for example, a remote file system.

The Transfer Service is accessible as a bean named `TransferService`, and it can be defined, along with other related beans, in the `transfer-service-context.xml` spring context file.

You'll need to create new transfer targets for content replication, and manually change the type of the transfer target folder to the type `trx:fileTransferTarget`. This allows you to specify which folder node corresponds to the root folder of the file system receiver by associating the transfer target with a folder (i.e. the `trx:fileTransferRootFolder` association). See [Create a new transfer target for file system content replication](#createnewtransfertargetforreplication) for more.

It supports sync mode transfer, so it can also be used by the replication service. It includes an embedded Derby database to keep track of data (`NodeRef` to file path mappings, for example), and it runs as a web application in an embedded Tomcat instance using the Web Script Framework and MyBatis.

### Set up

The File System Transfer Receiver is delivered as a compressed zip file.

1. Download the following file from the Support Portal:

    `alfresco-file-transfer-receiver-7.0.x.zip`

2. Extract the zip file into a relevant directory.

    The File System Transfer Receiver zip file extracts into the following directory structure:

    ```text
    classes
    lib
    webapps
    file-transfer-receiver.jar
    ```

    The following files are contained within the subdirectories.

    `/classes`

    ```text
    ftr-custom-context.xml
    ftr-custom.properties
    ftr-launcher-context.xml
    ftr-launcher.properties
    log4j.properties
    ```

    `/lib`

    ```text
    *various library files*
    ```

    `/webapps`

    ```text
    file-transfer-receiver.war
    ```

### Start {#startfstr}

Use this information to start the File System Transfer Receiver.

1. Ensure that you've expanded the File System Transfer Receiver zip file:

    `alfresco-file-transfer-receiver-7.0.x.zip`

2. To run the File System Transfer Receiver, enter the following command:

    ```bash
    java –jar file-transfer-receiver.jar
    ```

    You can navigate to `http://<FSTR-host-name>:<FSTR-port>/alfresco-ftr/service/index` to see if the FSTR is running. Information messages indicate that the web application server is starting.

### Launch properties

The launch properties for the File System Transfer Receiver are available in the `ftr-launcher.properties` file.

This file contains the Tomcat base directory and the port number to startup on.

| Property | Description |
| -------- | ----------- |
| ftr.tomcat.baseDir | Specifies the base directory in which the embedded Tomcat web application server is installed. This can either be an absolute path or a path relative to where the server is being started from. The default value of `${user.dir}` means that the Tomcat base directory is taken to be the user's current working directory. |
| ftr.tomcat.portNum | Specifies the port number on which the FSTR Tomcat web application server is to listen. The default is `9090`. |

### Custom properties

The custom properties for the File System Transfer Receiver are available in the `ftr-custom.properties` file.

This file is used to configure the operation of FSTR. It contains the settings for the root directory, staging directory, derby database connection string, username, and password.

| Property | Description |
| -------- | ----------- |
| fileTransferReceiver.stagingDirectory | The staging directory is where the FSTR will temporarily store the files that it receives from the source repository during a transfer. These files include the manifest file that describes the metadata of the nodes being transferred as well as the actual content files associated with those nodes. All of these files are staged in the directory referenced by this property prior to being moved to their correct location below the root directory. The default is `./ftr-staging`. |
| fileTransferReceiver.rootDirectory | Specifies the location of the directory on the local file system that is the top level of the transferred tree of nodes. A node that is a child of the nominated root node of the transfer in the source repository will be placed in the directory referenced by this property when it's transferred. The default it `./ftr-root`. |
| fileTransferReceiver.jdbcUrl=jdbc:<br><br>derby:./derbyDB;create=true;<br><br>user=alfresco;password=alfresco | The FSTR contains an embedded Apache Derby database that it uses to keep track of which nodes it receives and which file on the file system corresponds to which node. This property specifies the connection URL for this embedded database. It is unlikely that it'll need to be changed.<br><br>**Note:** It's recommended that you do not store FSTR database on a network file system location. The database must be on a local disk to ensure data integrity. |
| fileTransferReceiver.username | The user name that the source repository will have to declare when initiating a transfer to this FSTR. This property must correspond with the user name property stored on the transfer target in the source repository. The default is set to `admin`. |
| fileTransferReceiver.password | The password that the source repository will have to declare when initiating a transfer to this FSTR. This property must correspond with the password property stored on the transfer target in the source repository. The default is set to `admin`. |

### Log file properties

You can debug the File System Transfer Receiver issues using the `log4j.properties` file. This section describes the properties that you can set.

For example:

```text
log4j.logger.org.alfresco.repo.transfer.fsr=warn
log4j.logger.org.alfresco.repo.web.scripts.transfer=warn
```

### Create new transfer target for file system content replication {#createnewtransfertarget}

The transfer service stores files that control and monitor the operation of the transfer service in the `Transfers` space in the `Data Dictionary`.

The `Transfer Target Groups` space contains the transfer target definitions that specify where transfers go to. There is a group level below the folder which is used to classify different sets of transfer targets. This folder contains a group called `Default Group`.

You can add transfer targets by creating new transfer folders.

1. In the source repository, create a new folder in **Company Home > Data Dictionary > Transfers > Transfer Target Groups > Default Group**.

    1. In the **New Folder** window specify a name, for example, Replica. You can add a title and description, if you wish.

        A rule defined on the **Default Group** folder specializes the type of any folder created in it.

        The type is set automatically by the folder rule to `trx:transferTarget`. This allows you add the required properties to define the replication target through the user interface.

    2. Manually change the type of the folder. In the Folder Details page, select **Change Type**, and then choose **File Transfer Target** for this new type.

        This allows you to also set a **Root Folder** that's required by the File System Transfer Receiver system.

    3. Click **Edit Properties** on your new folder (Replica).

    4. Specify the required properties:

        1. Specify the **Endpoint Host**, **Endpoint Port**, **Username** and **Password**.
        2. Specify the rest of the properties to point to the FSTR server that you've setup using [Start File System Transfer Receiver](#startfstr).

            >**Note:** Here, you have the option to select the `Root folder`. Browse and select a sub-folder of the `Document Library` in the site from which you plan to transfer the files. For example, if you want to transfer some files from a folder called `folder1` in a site called `site1`, select that `folder1` as the `Root Folder` in the properties window.

        3. Click **Enabled** and **Save**.

    5. Enable the replication service in your `alfresco-global.properties` file:

        ```text
        replication.enabled=true
        ```

        and restart the source repository.

2. In the target repository, enable the replication server and content receiver in the `alfresco-global.properties` file:

    ```text
    replication.enabled=true
    transferservice.receiver.enabled=true
    ```

    and restart the target repository.

3. On the source repository, create a replication job to test the target setup.

    1. From the toolbar, click Admin Tools and select Replication Jobs from the menu.

    2. Click **Create Job**.

    3. Specify properties for Name, Payload, Transfer Target.

        Name is a new folder name; for example, Replication Job. Payload is the source content directory, and Transfer Target is the folder name that you set up in step 1 (Replica).

    4. Click **Enabled**.

    5. Click **Create Job**.

    6. Refresh the screen after a few minutes to see a status change.

4. Verify the replication job.

    Log in to Alfresco Share on the target repository, select a transferred file and click **Open in Source Repository** to check that content has replicated.
