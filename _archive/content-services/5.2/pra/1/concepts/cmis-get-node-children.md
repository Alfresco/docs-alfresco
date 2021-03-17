---
author: Alfresco Documentation
---

# Getting the children of a node

You can get the children of a specific node in the repository by using its `id`. The resulting AtomPub XML document describes children of the node. You can tailor the information returned by providing HTML parameters. You can use this method to navigate a folder tree in the repository.

## URL format

Here is an example of a URL to retrieve the children of a specific node in an Alfresco on-premise instance:

```
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/children?id=5dba1525-44a6-45ed-a42e-4a1a1a3f0539
```

The response body is an AtomPub XML document which describes the child nodes in a standard way. See the [CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.0/os/cmis-spec-v1.0.html) for more details.

## Parameters

You can add the following optional HTTP parameters to the URL:

|Parameter|Optional?|Default value|Description|
|---------|---------|-------------|-----------|
|filter|Yes|Repository specific|A comma-separated list of query names that defines which properties must be returned by the repository.|
|orderBy|Yes|Repository specific|A comma-separated list of query names that defines the order of the results set. Each query name in the list must be followed by the string `ASC` or `DESC` to specify the direction of the order, ascending or descending.|
|includeAllowableActions|Yes|false|A boolean value. A value of `true` specifies that the repository must return the allowable actions for each node.|
|includeRelationships|Yes|IncludeRelationships.NONE|The relationships in which each node participates that must be returned in the response.|
|renditionFilter|Yes|cmis:none|A filter describing the set of renditions that must be returned in the response.|
|includePathSegment|Yes|false|A boolean value. A value of `true` returns a path segment in the response for each child object that can be used to construct that object's path.|
|maxItems|Yes|Repository specific|The maximum number of items to return in the response.|
|skipCount|Yes|0|The number of objects to skip over before returning any results.|

**Parent topic:**[Getting Started](../../../pra/1/concepts/cmis-getting-started.md)

