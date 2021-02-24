---
author: [Alfresco Documentation, Alfresco Documentation]
---

# ContentService

A service for accessing and transforming content.

|Information|ContentService|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The ContentService provides an API for accessing and transforming content. You may want to read the content associated with a node, or transform the content from one format to another, for example from .ppt to .pdf. Methods provided by the API includes functionality to: -   Get obtainable transformers \(to convert one mimetype to another\)
-   Get a suitable reader for a content type. The returned ContentReader will have a getContent method to actually read the content to a specified file.
-   Get a suitable writer for a content type. The returned ContentWriter will have a putContent method to write the content to a specified file.
-   Transform content from one mimetype to another.
-   Get a transformer suitable for transforming images.
-   Utility methods \(for example to check size of content and free space in the content store\).

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/ContentService.html)|
|Java example|```

                  
// Read data associated with a content NodeRef (plain text)

ContentReader reader = contentService.getReader(nodeRef, ContentModel.PROP_CONTENT);

// Reading the data content of a NodeRef (binary)

ContentReader reader = contentService.getReader(nodeRef, ContentModel.PROP_CONTENT);
InputStream originalInputStream = reader.getContentInputStream();
ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
final int BUF_SIZE = 1 << 8; //1KiB buffer
byte[] buffer = new byte[BUF_SIZE];
int bytesRead = -1;
while((bytesRead = originalInputStream.read(buffer)) > -1) {
 outputStream.write(buffer, 0, bytesRead);
}
originalInputStream.close();
byte[] binaryData = outputStream.toByteArray();

// Writing data to a node's content

ContentWriter writer = contentService.getWriter(nodeRef, ContentModel.PROP_CONTENT, true);
writer.putContent(new ByteArrayInputStream(content));

// Writing a file's data to a node's content

ContentWriter writer = contentService.getWriter(nodeRef, ContentModel.PROP_CONTENT, true);
writer.setLocale(CONTENT_LOCALE);
File file = new File("c:/temp/images/BigCheese1.bmp");
writer.setMimetype("image/bmp");
writer.putContent(file);

// Transforming a PPT to PDF (also works for other file formats)

ContentReader pptReader = contentService.getReader(pptNodeRef, ContentModel.PROP_CONTENT);
ContentWriter pdfWriter = contentService.getWriter(pdfNodeRef, ContentModel.PROP_CONTENT, true);
ContentTransformer pptToPdfTransformer =
    contentService.getTransformer(MimetypeMap.MIMETYPE_PPT, MimetypeMap.MIMETYPE_PDF);
pptToPdfTransformer.transform(pptReader, pdfWriter);

/**
 * Creates a new content node setting the content provided.
 *
 * @param  parent   the parent node reference
 * @param  name     the name of the newly created content object
 * @param  text     the content text to be set on the newly created node
 * @return NodeRef  node reference to the newly created content node
 */
 
private NodeRef createContentNode(NodeRef parent, String name, String text)
{

    // Create a map to contain the values of the properties of the node
        
    Map<QName, Serializable> props = new HashMap<QName, Serializable>(1);
    props.put(ContentModel.PROP_NAME, name);  

    // use the node service to create a new node
    NodeRef node = this.nodeService.createNode(
                        parent, 
                        ContentModel.ASSOC_CONTAINS, 
                        QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, name),
                        ContentModel.TYPE_CONTENT, 
                        props).getChildRef();
                        
    // Use the content service to set the content onto the newly created node
    ContentWriter writer = this.contentService.getWriter(node, ContentModel.PROP_CONTENT, true);
    writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
    writer.setEncoding("UTF-8");
    writer.putContent(text);
    
    // Return a node reference to the newly created node
    return node;
} 


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

