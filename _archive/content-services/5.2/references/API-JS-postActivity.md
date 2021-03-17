---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: postActivity
---

# `postActivity`

The `postActivity` methods enable the posting of activities.

**Parent topic:**[Activities service](../references/API-JS-Activities.md)

## `postActivity(activityType, siteId, appTool, jsonActivityData)`

`postActivity(activityType, siteId, appTool, jsonActivityData)` posts a custom activity type.

### Parameters

-   **activityType**

    Required. Activity type name specified in package format, for example `org.alfresco.calendar.event-created`.

-   **siteId**

    Required parameter to get site members and to apply feed controls.

-   **appTool**

    Optional parameter. The application id or component id generating the activity, for example `calendarComponent`. If set, then feed controls can be applied.

-   **jsonActivityData**

    Required. The activity data, which can be accessed by the activity templates.


### Returns

void

### Example

```

activities.postActivity("org.alfresco.calendar.event-created", "mysite1", "calendarComponent", '{ "item1" : 123 }');        
        
```

## `postActivity(activityType, siteId, appTool, nodeRef)`

`postActivity(activityType, siteId, appTool, nodeRef)` this method posts a predefined activity type and looks up activity data asynchronously including name, displayPath, typeQName, firstName \(of posting user\), lastName \(of posting user\).

### Parameters

-   **activityType**

    Required. Activity type name specified in package format, for example `org.alfresco.calendar.event-created`.

-   **siteId**

    Required parameter to get site members and to apply feed controls.

-   **appTool**

    Optional parameter. The application id or component id generating the activity, for example `calendarComponent`. If set, then feed controls can be applied.

-   **nodeRef**

    Required. This allows the activity service to look up some generic data for the node.


## `postActivity(activityType, siteId, appTool, nodeRef, beforeName)`

`postActivity(activityType, siteId, appTool, nodeRef, beforeName)` this method posts a predefined activity type, for example, for checked out nodeRef or renamed nodeRef

### Parameters

-   **activityType**

    Required. Activity type name specified in package format, for example `org.alfresco.calendar.event-created`.

-   **siteId**

    Required parameter to get site members and to apply feed controls.

-   **appTool**

    Optional parameter. The application id or component id generating the activity, for example `calendarComponent`. If set, then feed controls can be applied.

-   **nodeRef**

    Required. This allows the activity service to look up some generic data for the node.

-   **beforeName**

    The name of the node prior to the name change.


## `postActivity(activityType,siteId,appTool,nodeRef,name,typeQName,parentNodeRef)`

`postActivity(activityType,siteId,appTool,nodeRef,name,typeQName,parentNodeRef)` this method posts a predefined activity, for example, for the deleted nodeRef.

### Parameters

-   **activityType**

    Required. Activity type name specified in package format, for example `org.alfresco.calendar.event-created`.

-   **siteId**

    Required parameter to get site members and to apply feed controls.

-   **appTool**

    Optional parameter. The application id or component id generating the activity, for example `calendarComponent`. If set, then feed controls can be applied.

-   **nodeRef**

    Required. This allows the activity service to look up some generic data for the node.

-   **name**

    Optional. The name of node.

-   **typeQName**

    Optional. The type of node.

-   **parentNodeRef**

    Optional. Used to look up path/displayPath


