---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# `postActivity`

The Post Activity object type provides methods to post activities.

**Parent topic:**[Activities service](../references/API-JS-Activities.md)

## `postActivity(activityType,siteId,appTool,jsonActivityData)`

`postActivity(activityType,siteId,appTool,jsonActivityData)`

This method posts a custom activity type.

### Parameters

-   **activityType**

    Required


-   **siteId**

    Required parameter to get site members and to apply feed controls


-   **appTool**

    Optional parameter. If set, then feed controls can be applied.


-   **jsonActivityData**

    Required


### `postActivity(activityType,siteId,appTool,nodeRef)`

`postActivity(activityType,siteId,appTool,nodeRef)`

This method posts a predefined activity type and looks up activity data asynchronously including name, displayPath, typeQName, firstName \(of posting user\), lastName \(of posting user\).

#### Parameters

-   **activityType**

    Required


-   **siteId**

    Required parameter to get site members \(and to apply feed controls\)


-   **appTool**

    Optional parameter \(if set, then feed controls can be applied\)


-   **nodeRef**

    Required


### `postActivity(activityType,siteId,appTool,nodeRef,beforeName)`

`postActivity(activityType,siteId,appTool,nodeRef,beforeName)`

This method posts a predefined activity type, for example, for checked out nodeRef or renamed nodeRef

#### Parameters

-   **activityType**

    Required


-   **siteId**

    Required parameter to get site members \(and to apply feed controls\)


-   **appTool**

    Optional parameter \(if set, then feed controls can be applied\)


-   **nodeRef**

    Required


-   **beforeName**

    The name of the node prior to the name change


### `postActivity(activityType,siteId,appTool,nodeRef,name,typeQName,parentNodeRef)`

`postActivity(activityType,siteId,appTool,nodeRef,name,typeQName,parentNodeRef)`

This method posts a predefined activity, for example, for the deleted nodeRef.

#### Parameters

-   **activityType**

    Required


-   **siteId**

    Required parameter to get site members \(and to apply feed controls\)


-   **appTool**

    Optional parameter \(if set, then feed controls can be applied\)


-   **nodeRef**

    Required. Do not use for deleted, or about to be deleted nodeRef.

-   **name**

    Optional. The name of name.

-   **typeQName**

    Optional. The type of node.

-   **parentNodeRef**

    Optional. Used to look up path/displayPath


