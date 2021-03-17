# MimetypeService

Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.

|Information|MimetypeService|
|-----------|---------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Alfresco ECM supportes numerous mimetypes OOTB. However, it is also possible to add your own custom mimetypes. The MimetypeService provides an API for managing mimetypes. For example, you can obtain a list of current mimetypes, mimetype extensions, and guess mimetypes using a specified file and content reader.|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/repository/MimetypeService.html)|
|Java example|```

                  
// Using mimetype service when writing content

ContentWriter contentWriter = contentService.getWriter(node, ContentModel.PROP_CONTENT, true);

contentWriter.setMimetype(mimetypeService.guessMimetype(filename));

contentWriter.putContent(field.getInputStream());                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Mimetype platform extension point documentation](dev-extension-points-mimetypes.md)

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

