---
author: Alfresco Documentation
---

# `getPeoplePaging`

`getPeoplePaging()` method gets the collection of people stored in the repository.

## Parameters

-   **filter**

    This is a query string by which to filter the collection of people. If `null` then all people stored in the repository are returned.

-   **pagingRequest**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The field for sorting.

-   **sortAsc**

    Set to true to sort results in ascending order.


## Returns

Returns a collection of people objects as a JavaScript array, with Paging.

## Example

**Parent topic:**[People API](../references/API-JS-People.md)

