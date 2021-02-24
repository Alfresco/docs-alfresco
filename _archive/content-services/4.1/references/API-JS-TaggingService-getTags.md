---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getTags
---

# `getTags`

`getTags()` these methods get all the tags available in a store.

**Parent topic:**[Tagging service](../references/API-JS-TaggingService.md)

## `getTags(store)`

`getTags(store)` gets tags from the specified store.

### Parameters

-   **store**

    A string designating the store to scan for tags.


### Returns

A string array containing the available tags.

### Example

The following code snippet would return all tags in the SpacesStore:

```

    model.tags = taggingService.getTags("workspace://SpacesStore");          
        
```

The following FreeMarker template code could then enumerate the tags:

```


<#list tags as t>  
  <p>${t}</p>
</#list>

```

## `getTags(store, filter)`

`getTags(store, filter)` gets tags from the specified store.

### Parameters

-   **store**

    A string designating the store to scan for tags.

-   **filter**

    A string used to filter the list of returned tags.


### Returns

A string array containing the available tags.

### Example

The following code snippet would return tags in the SpacesStore which contained the text “co”:

```

    model.tags = taggingService.getTags("workspace://SpacesStore", "co");          
        
```

