---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Services, API/Script, JavaScript API]
option: [JavaScript API, Services API]
---

# Services API

This section describes the Alfresco JavaScript Services API, which provides an interface to core Alfresco services that can be accessed from web scripts.

The JavaScript Services API provides an interface from web scripts to a number of core Alfresco services including:

-   Activities service
-   Authority service
-   Rendition service
-   Site service
-   Tagging service
-   Thumbnail service
-   Workflow service

Each of these services APIs is described in the following sections.

-   **[Activities service](../references/API-JS-Activities.md)**  
Activities refer to updates to content within a site, including uploaded files, blogs, discussions, calendars, and the team wiki. The methods available for the Activities service are grouped into the `Post activity` and `Feed controls`object types.
-   **[Authority service](../references/API-JS-AuthorityService.md)**  
Authority is a general term to describe a group, user, or role. The authority service provides the following methods to retrieve groups. The authority service makes the `groups` root object available.
-   **[Rendition service](../references/API-JS-RenditionService.md)**  
A rendition is an alternative representation of a content node. Renditions are derived from their source nodes and are usually updated automatically when their source node is updated.
-   **[Site service](../references/API-JS-SiteService.md)**  
A site is a collaborative area for a unit of work or a project. Sites are created in Share, and manipulated in various ways directly using the UI or through web scripts or the REST API.
-   **[Tagging service](../references/API-JS-TaggingService.md)**  
A tag is a non-hierarchical keyword or term assigned to a piece of information. The root object used to access these services is `taggingService`.
-   **[Thumbnail service](../references/API-JS-ThumbnailService.md)**  
A thumbnail is a transformation of content into a specified destination MIME type. This is most commonly an image of a particular size, but can also be other things, for example, a Flash rendition. The Thumbnail service transforms and maintains this thumbnail.
-   **[Workflow service](../references/API-JS-WorkflowService.md)**  
The Workflow JavaScript API lets you access Alfresco advanced workflows from within JavaScript.

**Parent topic:**[Alfresco Repository JavaScript API reference](../concepts/API-JS-intro.md)

