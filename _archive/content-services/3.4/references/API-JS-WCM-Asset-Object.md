---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# WCM Asset Object API

The WCM Asset Object API returns Asset objects that represent individual file or folder assets within the sandbox.

-   **[rename](../references/API-JS-rename.md)**  
``rename(newName)``
-   **[move](../references/API-JS-movePath.md)**  
``move(newPath)``

**Parent topic:**[WCM Web Projects](../references/API-JS-WCM-Web-Projects.md)

## Properties

The following properties are available:

-   **`creator`**

    The user ID of the creator of the asset


-   **`createdDate`**

    The asset creation date


-   **`fileSize`**

    The size of the file \(in bytes\)


-   **`name`**

    The asset name


-   **`path`**

    The absolute path of the asset not relative to webApp


-   **`isFile`**

    Determines if this asset is a file


-   **`isFolder`**

    Determines if this asset is a folder


-   **`isDeleted`**

    Determines if this asset is deleted


-   **`isLocked`**

    Determines if this asset is locked


-   **`lockOwner`**

    The owner of the lock on the asset

-   **`createdDateAsISO8601`**

    The asset creation date supplied as a string in ISO8601 format

-   **`modifier`**

    The user ID of the modifier of the asset

-   **`modifiedDate`**

    The date when the asset was last modified

-   **`modifiedDateAsISO8601`**

    The date when the asset was modified \(as a string in ISO8601 format\)


