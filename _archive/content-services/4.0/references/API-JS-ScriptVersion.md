---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JS API]
option: [API Versions, ScriptVersion]
---

# Script Version Object

The Versions ScriptNode API provides methods that may return `ScriptVersion` objects, for example `getVersion()`. ScriptVersion objects have the following properties.

## Properties

-   **`createdDate`**

    A read-only property representing the date at which the version was created

-   **`creator`**

    A read-only property representing the user name of the person who created the version

-   **`label`**

    A read-only property representing the version label

-   **`type`**

    A read-only property representing the version type \(MAJOR, MINOR\)

-   **`description`**

    A read-only property representing the description \(history comment\) of the version

-   **`nodeRef`**

    A read-only property representing the node reference of the document that was versioned

-   **`node`**

    A read-only property representing the node as it was versioned


**Parent topic:**[Versions API](../references/API-JS-Versions.md)

