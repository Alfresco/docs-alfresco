---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: Tagging API
---

# Tagging service

A tag is a non-hierarchical keyword or term assigned to a piece of information. The root object used to access these services is `taggingService`.

You must enable the auditing service and the tag audit application for `taggingService` to function properly. Set `audit.enabled=true` and `audit.tagging.enabled=true` in the application configuration.

-   **[getTags](../references/API-JS-TaggingService-getTags.md)**  
`getTags()` these methods get all the tags available in a store.
-   **[getTag](../references/API-JS-TaggingService-getTag.md)**  
`getTag(store, tag)` returns a tag node for the specified store and tag.
-   **[createTag](../references/API-JS-TaggingService-createTag.md)**  
`createTag(store, tag)` creates a node representing the tag.
-   **[deleteTag](../references/API-JS-TaggingService-deleteTag.md)**  
`deleteTag(store, tag)` deletes the specified tag.
-   **[TagScope object](../references/API-JS-TaggingService-tagScope.md)**  
Tag Scope Object

**Parent topic:**[Services API](../references/API-JS-Services.md)

