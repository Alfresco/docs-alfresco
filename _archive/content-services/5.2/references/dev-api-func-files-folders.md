---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Files and Folders

Files \(Documents\) and Folders \(Containers\) are fundamental units within the repository. Developers often search for specific files and folders and process them. In addition Rules can be set on Folders that fire Actions when files are added or removed from a Folder.

|Information|Files and Folders|
|-----------|-----------------|
|Java API|This API exposes the [FileFolderService](dev-services-filefolder.md) as a way of managing folders and files. For more info see the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/model/FileFolderService.html). To search for folders and files use the [SearchService](dev-services-search.md), see also the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/search/SearchService.html) \(note. `FileFolderService` contains `search` methods that are deprecated\).|
|Repository JavaScript API|In JavaScript there are many objects and methods for working with files and folders. For example, the `companyhome` root object has a `children` property that returns child nodes. See the [JavaScript API Documentation](API-JS-Scripting-API.md) for more information.|
|Alfresco ReST API|The Alfresco ReST API can be used to manage folders, files, comments, etc. See the [Managing Folders and Files ReST API documentation.](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md).|
|CMIS ReST API|The preferred way to access folders and files in Alfresco is via the Alfresco ReST API. However, if your requirements are to use an open standard, then have a look at [OASIS Content Management Interoperability Services \(CMIS\)](https://www.oasis-open.org/committees/cmis/). See the [CMIS Getting Started](../pra/1/concepts/cmis-getting-started.md) section to get going with the CMIS ReST API. This information covers the ATOM binding where you work with XML. If you prefer to work with JSON, then have a look at the [Browser binding](../pra/1/concepts/cmis-1.1-intro.md) available in CMIS 1.1.If you are developing a remote client in Java and want to use CMIS, then have a look at the [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java Library.

|
|Mobile SDK \(iOS\)|The Mobile SDK [Model](http://docs.alfresco.com/mobile_sdk/ios/references/model/Model.html) includes classes for dealing with [Documents](http://docs.alfresco.com/mobile_sdk/ios/references/model/AlfrescoDocument.html) and [Folders](http://docs.alfresco.com/mobile_sdk/ios/references/model/AlfrescoFolder.html). There is also a [DocumentFolder Service](http://docs.alfresco.com/mobile_sdk/ios/references/services/AlfrescoDocumentFolderService.html).|
|Mobile SDK \(Android\)|The Mobile SDK [Model](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/ClientAPI-Model.html) includes classes for dealing with [Documents](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/Document.html) and [Folders](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/Folder.html). There is also a [DocumentFolder Service](http://docs.alfresco.com/mobile_sdk/android/references/client_api/services/DocumentFolderService.html).|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Using the APIs by Function](../concepts/dev-api-by-function.md)

