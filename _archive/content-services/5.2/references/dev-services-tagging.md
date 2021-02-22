---
author: [Alfresco Documentation, Alfresco Documentation]
---

# TaggingService

It is possible to tag \(a text label\) any content, including folders. This service provides an API for creating, deleting, and adding tags, and other tag management methods.

|Information|TaggingService|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Tags are simple text labels that are attached to a piece of content. Each piece of content can have multiple tags. Folders also have a TagScope object which encapsulates information about the tags used on content in that folder. The [JavaScript TagScope](API-JS-TaggingService-tagScope.md) object provides a simple illustration of what a TagScope represents. The TagScope object contains an array that lists Tags in count order. There are methods to find out how many times a particualr tag is used.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/tagging/TaggingService.html)|
|Java example|```

               
// Get tags applied to node 

List<String> tags = taggingService.getTags(nodeRef);               
               
            
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

