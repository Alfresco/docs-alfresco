---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Surf API
audience: 
category: API
option: newPage
---

# `newPage`

`newPage` - these methods create and return a new Page object instance.

**Parent topic:**[sitedata](../references/APISurf-sitedata.md)

## `newPage`

`newPage` - this method creates and returns a new Page object instance.

### Returns

Returns a `ScriptModelObject` representing the new Page instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## `newPage(String id)`

`newPage(String id)` - this method creates and returns a new Page object instance.

### Parameters

-   **id**

    A string representing the page instance id.


### Returns

Returns a `ScriptModelObject` representing the new Page instance.

## `newPage(String id, String title, String description)`

`newPage(String id, String title, String description)` - this method creates and returns a new Page object instance.

### Parameters

-   **id**

    The id of the page instance.

-   **title**

    The title of the page instance.

-   **description**

    The description of the page instance.


### Returns

Returns a `ScriptModelObject` representing the new Page instance.

## `newPage(String id, String title, String titleId, String description, String descriptionId)`

`newPage(String id, String title, String titleId, String description, String descriptionId)` - this method creates and returns a new Page object instance.

### Parameters

-   **id**

    The id of the page instance.

-   **title**

    The title of the page instance.

-   **titleId**

    The message bundle key used to look up the title of the page instance.

-   **description**

    The description of the page instance.

-   **descriptionId**

    The message bundle key used to look up the description of the page instance.


### Returns

Returns a `ScriptModelObject` representing the new Page instance.

