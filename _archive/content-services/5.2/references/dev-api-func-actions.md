---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Actions

Actions are units of work that can be carried out on a node. Usually they are fired by Rules, so that, for example, when a piece of content is added \(or removed\) from a specific folder, it is transformed, tagged, or processed in some way.

|Information|Actions|
|-----------|-------|
|Java API|This API exposes the [ActionService](dev-services-action.md) that can be used to create and execute Repository actions. For more info see the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/action/ActionService.html).|
|JavaScript API|In JavaScript actions can be managed via the [Actions API](API-JS-Actions.md). Use the root object `actions`.|
|Alfresco ReST API|The Alfresco ReST API has endpoints to list available repository actions and for executing actions. See the API Explorer Action Reference docs [here](https://api-explorer.alfresco.com/api-explorer/#/actions).|
|CMIS ReST API|Not Available|
|Mobile SDK \(iOS\)|Not Available|
|Mobile SDK \(Android\)|Not Available|
|More Information|-   [Actions platform extension point documentation](dev-extension-points-actions.md).
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Using the APIs by Function](../concepts/dev-api-by-function.md)

