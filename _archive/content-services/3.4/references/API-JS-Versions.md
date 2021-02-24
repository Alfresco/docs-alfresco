---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JS API]
option: API Versions
---

# Versions API

The Versions ScriptNode API provides several methods and properties for managing and retrieving the versions of a document.

-   **[getVersion](../references/API-JS-getVersion.md)**  
`getVersion(label)`
-   **[createVersion](../references/API-JS-createVersion.md)**  
`createVersion(history, major)`

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

## Properties

The Versions ScriptNode API has the following properties:

-   **`isVersioned`**

    A read-only Boolean property for determining if the document is versioned


-   **`versionHistory`**

    A read-only property for listing all versions of the document in descending \(version created\) date order


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


