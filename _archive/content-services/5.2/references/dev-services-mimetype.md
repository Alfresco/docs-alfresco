---
author: [Alfresco Documentation, Alfresco Documentation]
---

# MimetypeService

Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.

|Information|MimetypeService|
|-----------|---------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Alfresco Content Services supports numerous mimetypes out-of-the-box. However, it is also possible to add your own custom mimetypes. The MimetypeService provides an API for managing mimetypes. For example, you can obtain a list of current mimetypes, mimetype extensions, and guess mimetypes using a specified file and content reader.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/MimetypeService.html)|
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

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

