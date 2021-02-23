---
author: Alfresco Documentation
---

# `childFileFolders`

`childFileFolders` methods are used to obtain an array of child files and folders for the node.

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

## `childFileFolders()`

Returns an array of child files and folders for the node.

### Returns

Returns a JavaScript array of child file and folder nodes for the node. It automatically retrieves all sub-types of `cm:content` and `cm:folder`, and removes system type folders from the results.

### Example

`var nodes = node.childFileFolders();`

## `childFileFolders(files, folders)`

Returns an array of child files and folders for the node, and as modified by parameters.

### Parameters

-   **files**

    A boolean value which if set to true specifies that files extending from `cm:content` should be returned.

-   **folders**

    A boolean value which if set to true specifies that folders extending from `cm:folder` should be returned, ignoring sub-types of `cm:systemfolder`.


### Returns

Returns a JavaScript array of child file and folder nodes for the node. It automatically retrieves all sub-types of `cm:content` and `cm:folder`, and removes system type folders from the results.

### Example

`var nodes = node.childFileFolders(false, true); // don't return files`

## `childFileFolders(files, folders, ignoreTypes)`

Returns an array of child files and folders for the node, and as modified by parameters.

### Parameters

-   **files**

    A boolean value which if set to true specifies that files extending from `cm:content` should be returned.

-   **folders**

    A boolean value which if set to true specifies that folders extending from `cm:folder` should be returned, ignoring sub-types of `cm:systemfolder`.

-   **ignoreTypes**

    Can be set to filter nodes of the specified type or types from the results returned. The type is specified in either long or short QName string form, as a single string or as an array of strings to filter multiple types.


### Returns

Returns a JavaScript array of child file and folder nodes for the node. It automatically retrieves all sub-types of `cm:content` and `cm:folder`, and removes system type folders from the results.

### Example

`var nodes = node.childFileFolders(true, true, "cm:folder"); // ignore folders`

`var nodes = node.childFileFolders(true, true, ["cm:folder", "st:sites"]); // ignores folders and sites`

## `childFileFolders(files, folders, ignoreTypes, maxItems)`

Returns a `ScriptPagingNode` object containing child files and folders for the node, as well as information to control paging of results. Parameters can be used to filter results. It is also possible to limit the number of nodes returned in the results.

CAUTION:

This method is deprecated in version 4.0.

### Parameters

-   **files**

    A boolean value which if set to true specifies that files extending from `cm:content` should be returned.

-   **folders**

    A boolean value which if set to true specifies that folders extending from `cm:folder` should be returned, ignoring sub-types of `cm:systemfolder`.

-   **ignoreTypes**

    Can be set to filter nodes of the specified type or types from the results returned. The type is specified in either long or short QName string form, as a single string or as an array of strings to filter multiple types.

-   **maxItems**

    An integer value which sets the maximum number of results to return.


### Returns

Returns a `ScriptPagingNode` object. The results are limited to the number specified by `maxItems`.

### Example

```

    var nodeNames = new Array();
    var nodes = null;
    var maxItems = 10;

    var results = companyhome.childFileFolders(true, false, "st:sites", maxItems);

    nodes = results.getPage();
    
    for (var n in nodes){
        nodeNames.push(nodes[n]['name']);
    }
        
```

## `childFileFolders(files, folders, ignoreTypes, skipOffset, maxItems, requestTotalCountMax, sortProp, sortAsc, queryExecutionId)`

Returns child files and folders of the node.

### Parameters

-   **files**

    A boolean value which if set to true specifies that files extending from `cm:content` should be returned.

-   **folders**

    A boolean value which if set to true specifies that folders extending from `cm:folder` should be returned, ignoring sub-types of `cm:systemfolder`.

-   **ignoreTypes**

    Can be set to filter nodes of the specified type or types from the results returned. The type is specified in either long or short QName string form, as a single string or as an array of strings to filter multiple types.

-   **skipOffset**

    Number of items to skip. For example 0, or number of pages to skip \* size of page.

-   **maxItems**

    An integer value which sets the maximum number of items, the size of the page.

-   **requestTotalCountMax**

    Request total count \(up to a given max total count\) Note, if set to 0 then total count is not requested and the query may be able to optimise/cutoff for max items.

-   **sortProp**

    Optional sort property as a prefix QName string, for example `cm:name`. Also supports special content cases such as `cm:content.size` and `cm:content.mimetype`.

-   **sortAsc**

    A boolean value. If true nodes will be sorted in ascending order, if false nodes will be sorted in descending order.

-   **queryExecutionId**

    If paging then can pass back the previous query execution \(as a hint for possible query optimization\). Note this parameter is currently not used, it is reserved for future use.


### Returns

Returns a `ScriptPagingNode` containing child file and folder nodes for the node. It automatically retrieves all sub-types of `cm:content` and `cm:folder`, and removes system type folders from the results.

### Example

```

    var queryExecutionId = null; // reserved for future use

    var results;
    var nodeNames = new Array(); // just store file names in a list
    var resultsTrimmed = false;
    var nodes = null;

    // get files ordered by name (exclude folders and st:sites)
    results = companyhome.childFileFolders(true, false, "st:sites", 0, 100, 0, "cm:name", true, queryExecutionId);

    nodes = results.getPage();
    
    for (var n in nodes){
        nodeNames.push(nodes[n]['name']);
    }

    resultsTrimmed = results.hasMoreItems(); // did we get all possible child files/folders?

        
```

