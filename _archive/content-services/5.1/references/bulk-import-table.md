---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration]
---

# Bulk Import tool fields and values

The Bulk Import tool has a number of entry and display fields that are displayed in the user interface, but also referenced in the status.xml file that is used if you are programming a bulk import. The labels, fields, possible values and a summary of each entry is explained in this information.

|Field label \(from Bulk Import status web page\)|Field entry \(from status.xml file\)|Possible values|Summary|
|------------------------------------------------|------------------------------------|---------------|-------|
|Current status|`<CurrentStatus>Idle</CurrentStatus>`|Idle \| In Progress|Status of the bulk import|
|Successful|`<ResultOfLastExecution>Yes</ResultOfLastExecution>`|Yes \| No \| n/a|Result of the bulk import|
|Batch Size|`<batchSize>20</batchSize>`|Numeric|The batch size \(number of directories and files to import at a time\) specified for the bulk import|
|Number of threads|`<numThreads>4</numThreads>`|Numeric|The number of threads specified for the bulk import|
|Source Directory|`<SourceDirectory>importdirectory</SourceDirectory>`|Alphanumeric|The absolute path of the filesystem directory being imported|
|Target Space|`<TargetSpace>/Company Home</TargetSpace>`|Alphanumeric|The path of the Alfresco space where the content is being loaded, starting with /Company Home|
|Start Date|`<StartDate>2014-05-15 01:30:11.912PM</StartDate>`|Date and timestamp|Start of the bulk import. Format is YYYY-MM-DD HH:MM:SS.sss AM \| PM|
|End Date|`<EndDate>2014-05-15 01:30:12.009PM</EndDate>`|Date and timestamp|End of the bulk import. Format is YYYY-MM-DD HH:MM:SS.sss AM \| PM|
|Duration|`<DurationInNS>0d 0h 0m 0s 96.941ms</DurationInNS>`|Alphanumeric|Time taken for the bulk import to complete. Format is xd xh xm xxs xx.xxxms where x is a number|
|Number of Completed Batches|`<CompletedBatches>0</CompletedBatches>`|Numeric|Number of batches completed in the bulk import|
|Source \(read\) Statistics|`<SourceStatistics>`|
|Scanned: Folders|`<FoldersScanned>0</FoldersScanned>`|Numeric|Number of source folders scanned|
|Scanned: Files|`<FilesScanned>0</FilesScanned>`|Numeric|Number of source files scanned|
|Scanned: Unreadable|`<UnreadableEntries>0</UnreadableEntries>`|Numeric|Number of unreadable source files|
|Read: Content|`<ContentFilesRead>0</ContentFilesRead>`|Numeric|Amount of source content read. Format is numeric with size of content in parentheses|
|Read: Metadata|`<MetadataFilesRead>0</MetadataFilesRead>`|Numeric|Amount of source metadata read. Format is numeric with size of metadata in parentheses|
|Read: Content Versions|`<ContentVersionFilesRead>0</ContentVersionFilesRead>`|Numeric|Source content versions read. Format is numeric with size of content versions in parentheses|
|Read: Metadata Versions|`<MetadataVersionFilesRead>0</MetadataVersionFilesRead>`|Numeric|Source metadata versions read. Format is numeric with size of metadata versions in parentheses|
|Throughput|N/A|Numeric|Number of entries scanned per second, number of files read per second, and size of data read per second|
|Target \(write\) Statistics|`<TargetStatistics>`|
|Space Nodes: \# Created|`<SpaceNodesCreated>0</SpaceNodesCreated>`|Numeric|Number of target space nodes created|
|Space Nodes: \# Replaced|`<SpaceNodesReplaced>0</SpaceNodesReplaced>`|Numeric|Number of target space nodes replaced|
|Space Nodes: \# Skipped|`<SpaceNodesSkipped>0</SpaceNodesSkipped>`|Numeric|Number of target space nodes skipped|
|Space Nodes: \# Properties|`<SpacePropertiesWritten>0</SpacePropertiesWritten>`|Numeric|Number of properties written for target space nodes|
|Content Nodes: \# Created|`<ContentNodesCreated>0</ContentNodesCreated>`|Numeric|Number of target content nodes created|
|Content Nodes: \# Replaced|`<ContentNodesReplaced>0</ContentNodesReplaced>`|Numeric|Number of target content nodes replaced|
|Content Nodes: \# Skipped|`<ContentNodesSkipped>0</ContentNodesSkipped>`|Numeric|Number of target content nodes skipped|
|Content Nodes: \# Data Written|`<ContentBytesWritten>0</ContentBytesWritten>`|Numeric|Amount of target content node data written|
|Content Nodes: \# Properties|`<ContentPropertiesWritten>0</ContentPropertiesWritten>`|Numeric|Number of properties written for target content nodes|
|Content Versions: \# Created|`<ContentVersionsCreated>0</ContentVersionsCreated>`|Numeric|Number of target content versions created|
|Content Versions: \# Data Written|`<ContentVersionsBytesWritten>0</ContentVersionsBytesWritten>`|Numeric|Amount of target content version data written|
|Content Versions: \# Properties|`<ContentVersionsPropertiesWritten>0</ContentVersionsPropertiesWritten>`|Numeric|Number of properties written for target content versions|
|Throughput \(write\)|N/A|Numeric|Number of nodes scanned per second and size of data written per second|
|Error Information From Last Run|`<ErrorInformation>`|
|File that failed|`<FileThatFailed>n/a</FileThatFailed>`|Alphanumeric|The name of the file that failed during the bulk import|
|Exception|`<Exception>exceptionLog</Exception>`|Alphanumeric|The stack trace of the exception that occurred during the bulk import|

**Parent topic:**[Importing with the Bulk Import tool](../concepts/bulk-import-importing.md)

