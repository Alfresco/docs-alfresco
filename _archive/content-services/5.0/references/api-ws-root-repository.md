---
author: Alfresco Documentation
---

# Root objects available in repository tier web scripts

This information lists root objects additionally available when scripts are running in the repository tier context. These objects provide access to repository services.

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`roothome`|Object|The repository root node \(only available if access is authenticated\)|
|`companyhome`|Object|The company home folder object \(only available if access is authenticated\)|
|`person`|Object|The person node of the currently authenticated user \(only available if user is authenticated\)|
|`userhome`|Object|The user home folder \(only available if access is authenticated\)|
|`search`|Object|A host object providing access to Lucene \(Solr\) and Saved Search results. See the [Search API](API-JS-Search.md).|
|`people`|Object|A host object providing access to people and groups. See the [People API](API-JS-People.md).|
|`actions`|Object|A host object providing invocation of registered Alfresco Actions. See the [Actions API](API-JS-Actions.md).|
|`session`|Object|Session related information such as the current authentication ticket. See the [Session API](API-JS-Session.md).|
|`classification`|Object|Access to the root elements of the Classification API. See the [Classification API](API-JS-Classification.md).|
|`utils`|Object|Access to a library of useful helper functions not provided as part of generic JavaScript. See the [Utility methods](API-JS-Utility.md).|
|`workflow`|Object|Start workflows and access them, control in-progress workflows. See the [Workflow API](API-JS-WorkflowService.md).|

**Note:** A full list of root objects is available in the [root objects section of the JavaScript API Reference](API-JS-rootscoped.md).

**Parent topic:**[Web scripts reference](../concepts/ws-reference.md)

