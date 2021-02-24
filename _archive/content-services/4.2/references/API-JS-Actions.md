---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, Actions API, JavaScript API]
option: JavaScript API Actions
---

# Actions API

The Actions API provides a root level `actions` object that allows invocation of Alfresco actions registered with the repository.

## Properties

The following Action object properties are available to use within scripts:

|Action Object Property|Read/write|Description|
|----------------------|----------|-----------|
|registered|Read-only|An array of strings representing the actions available.|

-   **[create](../references/API-JS-create.md)**  
`create(name)` - returns the `ScriptAction` object with the name specified.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

