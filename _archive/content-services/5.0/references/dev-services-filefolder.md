# FileFolderService

Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders in Alfresco.

|Information|FileFolderService|
|-----------|-----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The FileFolderService provides methods for dealing with Files and Folders. Operations include: -   Copy a file or folder
-   Create a file or folder
-   Delete a file or folder
-   Get Readers and Writers for a file
-   List files and folders \(with paged results\)

 The methods typically work with a NodeRef for the node that represents the target file or folder.

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/model/FileFolderService.html)|
|Java example|```

                  
// Creating a PDF (or other document)

QName contentQName = QName.createQName("{http://www.alfresco.org/model/content/1.0}content");
FileInfo pdfInfo = fileFolderService.create(directory, filename, contentQName);
NodeRef pdf = pdfInfo.getNodeRef();


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

