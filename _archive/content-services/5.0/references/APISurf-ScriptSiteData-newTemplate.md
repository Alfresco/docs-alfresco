---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Surf API
audience: 
category: API
option: newTemplate
---

# `newTemplate`

`newTemplate` - these methods create and return a new Template object instance.

**Parent topic:**[sitedata](../references/APISurf-sitedata.md)

## `newTemplate`

`newTemplate` - this method creates and returns a new Template object instance.

### Returns

Returns a `ScriptModelObject` representing the new Template instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## `newTemplate(String templateTypeId)`

`newTemplate(String templateTypeId)` - this method creates and returns a new Template object instance.

### Parameters

-   **templateTypeId**

    A string representing the id of the template type to be created.


### Returns

Returns a `ScriptModelObject` representing the new Template instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## `newTemplate(String templateTypeId, String title, String description)`

`newTemplate(String templateTypeId, String title, String description)` - this method creates and returns a new Template object instance.

### Parameters

-   **templateTypeId**

    A string representing the id of the template type to be created.

-   **title**

    The title of the template instance.

-   **description**

    The description of the template instance.


### Returns

Returns a `ScriptModelObject` representing the new Template instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## `newTemplate(String templateTypeId, String title, String titleId, String description, String descriptionId)`

`newTemplate(String templateTypeId, String title, String titleId, String description, String descriptionId)` - this method creates and returns a new Template object instance.

### Parameters

-   **templateTypeId**

    A string representing the id of the template type to be created.

-   **title**

    The title of the template instance.

-   **titleId**

    The message bundle key used to look up the title of the template instance.

-   **description**

    The description of the template instance.

-   **descriptionId**

    The message bundle key used to look up the description of the template instance.


### Returns

Returns a `ScriptModelObject` representing the new Template instance. The ID for the instance is generated using the Web Framework's random GUID generator.

