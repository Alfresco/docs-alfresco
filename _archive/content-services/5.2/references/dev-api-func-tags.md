---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Tags

Tags are simple text labels that are attached to a piece of content, such as a folder or a file. Each piece of content can have multiple tags. Folders also have a TagScope object which encapsulates information about the tags used on content in that folder. The TagScope object contains an array that lists Tags in count order. There are methods to find out how many times a particular tag is used.

|Information|Tags|
|-----------|----|
|Java API|To manage content tags use the [TaggingService](dev-services-tagging.md), see also the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/tagging/TaggingService.html).|
|JavaScript API|Use the `taggingService` root object, for more info see the [Tagging JavaScript API Documentation](API-JS-TaggingService.md)|
|Alfresco REST API|The Alfresco ReST API supports managing tags, see the [Tags REST API User Guide](../concepts/dev-api-by-language-alf-rest-add-remove-tags-on-node.md).|
|CMIS ReST API|Not Available|
|Mobile SDK \(iOS\)|The [TaggingService](http://docs.alfresco.com/mobile_sdk/ios/references/services/AlfrescoTaggingService.html) is exposed. The [Model](http://docs.alfresco.com/mobile_sdk/ios/references/model/Model.html) also exposes [the Tag data structure](http://docs.alfresco.com/mobile_sdk/ios/references/model/AlfrescoTag.html).|
|Mobile SDK \(Android\)|The [TaggingService](http://docs.alfresco.com/mobile_sdk/android/references/client_api/services/TaggingService.html) is exposed. The [Model](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/ClientAPI-Model.html) also exposes [the Tag data structure](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/Tag.html).|
|More Information|None|

**Parent topic:**[Using the APIs by Function](../concepts/dev-api-by-function.md)

