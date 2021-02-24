---
author: [Alfresco Documentation, Alfresco Documentation]
---

# FileFolderService

Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders in Alfresco.

|Information|FileFolderService|
|-----------|-----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The `FileFolderService` provides methods for dealing with Files and Folders. This class is an abstraction of the [NodeService](dev-services-node.md) class, which you should look at if you want more control when creating folder and file nodes.

With the `FileFolderService` class the following type of operations are available:

-   Create a file or folder
-   Copy a file or folder
-   Move a file or folder
-   Delete a file or folder
-   Get Readers and Writers for a file
-   List files and folders \(with paged results\)

The methods typically work with a `NodeRef` for the node that represents the target file or folder.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/model/FileFolderService.html)|
|Java example|The following example uses the `FileFolderService` to create a folder and then a file in this new folder.

The example code is executed inside a [Web Script](dev-extension-points-webscripts.md) so it will automatically be part of a transaction using the `RetryingTransactionHelper`, same thing if the code was executed from a [Repo Action](dev-extension-points-actions.md).

```
import org.alfresco.model.ContentModel;
import org.alfresco.repo.content.MimetypeMap;
import org.alfresco.repo.nodelocator.CompanyHomeNodeLocator;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.model.FileExistsException;
import org.alfresco.service.cmr.model.FileInfo;
import org.alfresco.service.cmr.repository.ContentWriter;
import org.alfresco.service.cmr.repository.NodeRef;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * A Web Script that uses the FileFolderService to create a folder and a file.
 *
 * @author martin.bergljung@alfresco.com
 */
public class FileFolderServiceTestWebScript extends DeclarativeWebScript {
    private static Log logger = LogFactory.getLog(FileFolderServiceTestWebScript.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        Map<String, Object> model = new HashMap<String, Object>();

        String message = "Your 'FileFolderServiceTestWebScript' Web Script was called ";

        FileInfo newFolderInfo = null;
        try {
            newFolderInfo = createFolder("Some Folder");
            message += "and a folder was created: " + newFolderInfo;
        } catch (FileExistsException fee) {
            message += "and there was a problem creating a folder: " + fee.getMessage();
        }

        if (newFolderInfo != null) {
            FileInfo newFileInfo = null;
            try {
                newFileInfo = createFile(newFolderInfo,"some.txt", "Some text content...");
                message += ", a text file was then created in this folder: " + newFileInfo;
            } catch (FileExistsException fee) {
                message += ", there was a problem creating a file in the new folder: " + fee.getMessage();
            }
        }

        logger.info(message);

        model.put("message", message);

        return model;
    }

    /**
     * Create a folder under the /Company Home folder.
     *
     * @param folderName the name of the folder
     * @return a FileInfo object with data about the new folder, such as NodeRef
     */
    private FileInfo createFolder(String folderName) throws FileExistsException {

        // Get a NodeRef for /Company Home folder
        NodeRef parentFolderNodeRef = serviceRegistry.getNodeLocatorService().getNode(
                CompanyHomeNodeLocator.NAME, null, null);

        // Create the folder under /Company Home
        FileInfo folderInfo = serviceRegistry.getFileFolderService().create(
                parentFolderNodeRef, folderName, ContentModel.TYPE_FOLDER);

        return folderInfo;
    }

    /**
     * Create a file under the passed in folder.
     *
     * @param folderInfo the folder that the file should be created in
     * @param filename the name of the file
     * @param fileTxt the content of the file
     * @return a FileInfo object with data about the new file, such as NodeRef
     */
    private FileInfo createFile(FileInfo folderInfo, String filename, String fileTxt) throws FileExistsException {

        // Create the file under passed in folder, the file will be empty to start with
        FileInfo fileInfo = serviceRegistry.getFileFolderService().create(
                folderInfo.getNodeRef(), filename, ContentModel.TYPE_CONTENT);

        // Get the NodeRef for the new file from the FileInfo object
        NodeRef newFileNodeRef = fileInfo.getNodeRef();

        // Add some content to the file
        ContentWriter writer = serviceRegistry.getFileFolderService().getWriter(newFileNodeRef);
        writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
        writer.setEncoding("UTF-8");
        writer.putContent(fileTxt);

        return fileInfo;
    }
}
```

We use the `ServiceRegistry` to get to the `FileFolderService`. The `ServiceRegistry` bean is injected into the Web Script controller bean as follows:

```
<bean id="webscript.alfresco.tutorials.filefolderservicetest.get"
		  class="org.alfresco.training.platformsample.FileFolderServiceTestWebScript"
		  parent="webscript">
	<property name="serviceRegistry">
		<ref bean="ServiceRegistry" />
	</property>
</bean>
```

**Note** how we catch the `FileExistsException` to deal with the situations when the folder or file already exists. This is a runtime exception so we are not forced to deal with it, but it's good practice to catch it and display a nice message to the end user.

If we complete the Web Script with a descriptor and template as follows:

/extension/templates/webscripts/alfresco/tutorials/**filefolderservicetest.get.desc.xml:**

```
<webscript>
    <shortname>FileFolderService Test Sample Webscript</shortname>
    <description>Uses the FileFolderService to create a folder and a file</description>
    <url>/sample/filefolderservicetest</url>
    <authentication>user</authentication>
    <format default="html"></format>
    <lifecycle>sample</lifecycle>    
</webscript>
  
```

/extension/templates/webscripts/alfresco/tutorials/**filefolderservicetest.get.html.ftl:**```
Message: '${message}'
```

Then, the first time we execute the Web Script \([http://localhost:8080/alfresco/s/sample/filefolderservicetest](http://localhost:8080/alfresco/s/sample/filefolderservicetest)\) we will get a response looking something like this:

*Message: 'Your 'FileFolderServiceTestWebScript' Web Script was called and a folder was created: FileInfo\[name=Some Folder, isFolder=true, nodeRef=workspace://SpacesStore/91b0932a-5056-4607-a1bd-849ec655d16e\], a text file was then created in this folder: FileInfo\[name=some.txt, isFolder=false, nodeRef=workspace://SpacesStore/5b17ba0a-b0b5-4df1-bd37-91098cac7263\]'*

If we now run the Web Script again, when the folder and file exist, the following response is returned:

*Message: 'Your 'FileFolderServiceTestWebScript' Web Script was called and there was a problem creating a folder: 00270021 File or folder Some Folder already exists'*

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

