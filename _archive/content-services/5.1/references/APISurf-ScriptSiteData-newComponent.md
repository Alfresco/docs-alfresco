---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Surf API
audience: 
category: API
option: newComponent
---

# `newComponent`

`newComponent` - these methods create and return a new Component object instance. The scope, region and sourceId parameters should be set before the object is persisted.

**Parent topic:**[sitedata](../references/APISurf-sitedata.md)

## `newComponent`

`newComponent` - this method creates and returns a new Component object instance. The scope, region and sourceId parameters should be set before the object is persisted.

### Returns

Returns a `ScriptModelObject` representing the new Component instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## `newComponent(String componentTypeId)`

`newComponent(String componentTypeId)` - this method creates and returns a new Component object instance. The scope, region and sourceId parameters should be set before the object is persisted.

### Parameters

-   **componentTypeId**

    A string representing the component type ID.


### Returns

Returns a `ScriptModelObject` representing the new Component instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## `newComponent(String scope, String regionId, String sourceId)`

`newComponent(String scope, String regionId, String sourceId)` - this method creates and returns a new Component object instance.

### Parameters

-   **scope**

    Scope, one of `global`, `template` or `page`.

-   **regionId**

    The ID of the region to bind to.

-   **sourceId**

    The source ID for the given scope.


### Returns

Returns a `ScriptModelObject` representing the new Component instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## `newComponent(String componentTypeId, String scope, String regionId, String sourceId)`

`newComponent(String componentTypeId, String scope, String regionId, String sourceId)` - this method creates and returns a new Component object instance.

### Parameters

-   **componentTypeId**

    A string representing the component type ID.

-   **scope**

    Scope, one of `global`, `template` or `page`.

-   **regionId**

    The ID of the region to bind to.

-   **sourceId**

    The source ID for the given scope.


### Returns

Returns a `ScriptModelObject` representing the new Component instance. The ID for the instance is generated using the Web Framework's random GUID generator.

