---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [JavaScript, API/Script]
keyword: [Javascript API, createPaging]
---

# `createPaging`

`createPaging` methods are used to build a `ScriptPagingDetails` object from the parameters supplied.

**Parent topic:**[Utility methods](../references/API-JS-Utility.md)

## `createPaging(maxItems, skipCount)`

Builds a `ScriptPagingDetails` object from the supplied parameters.

### Parameters

-   **maxItems**

    An integer value which sets the maximum number of results to return.

-   **skipCount**

    The number of results to skip.


### Returns

Returns a `ScriptPagingDetails` object.

## `createPaging(maxItems, skipCount, queryExecutionId)`

Builds a `ScriptPagingDetails` object from the supplied parameters.

### Parameters

-   **maxItems**

    An integer value which sets the maximum number of results to return.

-   **skipCount**

    The number of results to skip.

-   **queryExecutionId**

    Reserved for future use.


### Returns

Returns a `ScriptPagingDetails` object.

## `createPaging(args)`

Returns a `ScriptPagingDetails` object built from the supplied Args object. The Args object contains a map of parameters which must use their standard names, such as `maxItems`, and `skipCount`.

### Parameters

-   **args**

    A map containing the parameters \(using their standard names\) and their corresponding values.


### Returns

Returns a `ScriptPagingDetails` object.

