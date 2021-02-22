---
author: [Alfresco Documentation, Alfresco Documentation]
---

# TaggingService

It is possible to tag \(a text label\) any content, including folders, in Alfresco. This service provides an API for creating, deleting, and adding tags, and other tag management methods.

|Information|TaggingService|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Tags are simple text labels that are attached to a piece of content. Each piece of content can have multiple tags. Folders also have a TagScope object which encapsulates information about the tags used on content in that folder. The [JavaScript TagScope](API-JS-TaggingService-tagScope.md) object provides a simple illustration of what a TagScope represents. The TagScope object contains an array that lists Tags in count order. There are methods to find out how many times a particualr tag is used.|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/tagging/TaggingService.html)|
|Java example|```

               
// Get tags applied to node 

List<String> tags = taggingService.getTags(nodeRef);               
               
            
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

