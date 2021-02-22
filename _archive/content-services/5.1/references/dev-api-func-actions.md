---
author: Alfresco Documentation
---

# Actions

Actions are units of work that can be carried out on a node. Usually they are fired by Rules, so that, for example, when a piece of content is added \(or removed\) from a specific folder, it is transformed, tagged, or processed in some way.

|Information|Actions|
|-----------|-------|
|Java API|This API exposes the [ActionService](dev-services-action.md) that can be used to create and execute Repository actions. For more info see the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/action/ActionService.html).|
|JavaScript API|In JavaScript actions can be managed via the [Actions API](API-JS-Actions.md). Use the root object `actions`.|
|Alfresco REST API|Not Available. However, you could implement a custom Repository [Web script](dev-extension-points-webscripts.md) that invokes the Action via either the Java API or the JavaScript API.|
|CMIS REST API|Not Available|
|Mobile SDK \(iOS\)|Not Available|
|Mobile SDK \(Android\)|Not Available|
|More Information|-   [Actions platform extension point documentation](dev-extension-points-actions.md).
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[By Function](../concepts/dev-api-by-function.md)

