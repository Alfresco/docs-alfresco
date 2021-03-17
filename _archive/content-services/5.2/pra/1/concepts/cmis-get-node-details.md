---
author: Alfresco Documentation
---

# Getting information on a node

You can get information on a specific node in the repository by using its `id`. The resulting AtomPub XML document describes the node. You can tailor the information returned by providing HTML parameters.

## URL format

Here is an example of a URL to retrieve information on a specific node in an Alfresco Content Services on-premise instance:

```
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/id?id=5dba1525-44a6-45ed-a42e-4a155a3f0539
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way. See the [CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.0/os/cmis-spec-v1.0.html) for more details.

## Parameters

You can add the following optional HTTP parameters to the URL:

|Parameter|Optional?|Default value|Description|
|---------|---------|-------------|-----------|
|filter|Yes|Repository specific|A comma-separated list of query names that defines which properties must be returned by the repository.|
|includeAllowableActions|Yes|false|A boolean value. A value of `true` specifies that the repository must return the allowable actions for the node.|
|includeRelationships|Yes|IncludeRelationships.NONE|The relationships in which the node participates that must be returned in the response.|
|renditionFilter|Yes|cmis:none|A filter describing the set of renditions that must be returned in the response.|
|includePolicyIds|Yes|false|A boolean value. A value of `true` specifies the repository must return the policy ids for the node.|
|includeAcl|Yes|false|A boolean value. A value of `true` specifies the repository must return the Access Control List \(ACL\) for the node.|

**Parent topic:**[Getting Started](../../../pra/1/concepts/cmis-getting-started.md)

