---
author: Alfresco Documentation
---

# `getPeople`

`getPeople()` methods get the collection of people stored in the repository.

**Parent topic:**[People API](../references/API-JS-People.md)

## `getPeople(filter)`

`getPeople(filter)` get the collection of people stored in the repository.

An optional filter query may be provided by which to filter the people collection. Space separates the query terms, for example "john bob" will find all users whose first or second names contain the strings "john" or "bob".

CAUTION:

This method is deprecated in version 4.0

### Parameters

-   **filter**

    This is a query string by which to filter the collection of people. If `null` then all people stored in the repository are returned.


### Returns

Returns a collection of people objects as a JavaScript array.

### Example

## `getPeople(filter, maxResults)`

`getPeople(filter, maxResults)` get the collection of people stored in the repository.

An optional filter query may be provided by which to filter the people collection. Space separates the query terms, for example "john bob" will find all users whose first or second names contain the strings "john" or "bob".

### Parameters

-   **filter**

    This is a query string by which to filter the collection of people. If `null` then all people stored in the repository are returned.

-   **maxResults**

    The maximum number of results to return. Returns all results if this value is set to be less than or equal to zero.


### Returns

Returns a collection of people objects as a JavaScript array.

### Example

The following snippet would return all users whose first or last names contained the string “fred”. The results are limited to a maximum of 10 results:

```

    model.users = people.getPeople("fred", 10);    
        
```

## `getPeople(filter, maxResults, sortBy, sortAsc)`

`getPeople(filter, maxResults, sortBy, sortAsc)` get the collection of people stored in the repository.

An optional filter query may be provided by which to filter the people collection. Space separates the query terms, for example "john bob" will find all users whose first or second names contain the strings "john" or "bob". This method supports sorting by specifying `sortBy` and `sortAsc` parameters.

### Parameters

-   **filter**

    This is a query string by which to filter the collection of people. If `null` then all people stored in the repository are returned.

-   **maxResults**

    The maximum number of results to return. Returns all results if this value is set to be less than or equal to zero.

-   **sortBy**

    The field for sorting.

-   **sortAsc**

    Set to true to sort results in ascending order.


### Returns

Returns a collection of people objects as a JavaScript array.

### Example

The following snippet would return all users whose first or last names contained the string “fred”, sorted in ascending order on `lastName`. The results are limited to a maximum of 10 results:

```

    model.users = people.getPeople("fred", 10, "lastName", true);    
        
```

