---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# Sandbox Object API

The Sandbox Object API has various properties and methods.

-   **[deleteSandbox](../references/API-JS-deleteSandbox.md)**  
``deleteSandbox()``
-   **[submitAll](../references/API-JS-submitAll.md)**  
``submitAll(submitLabel,submitComment)``
-   **[submitAllWebApp](../references/API-JS-submitAllWebApp.md)**  
``submitAllWebApp(webApp,submitLabel,submitComment)``
-   **[submitAssets](../references/API-JS-submitAssets.md)**  
``submitAssets(files, submitLabel, submitComment)``
-   **[submit](../references/API-JS-submit.md)**  
``submit(files, submitLabel, submitComment)``
-   **[revertAll](../references/API-JS-revertAll.md)**  
``revertAll()``
-   **[revert](../references/API-JS-revert.md)**  
``revert(files)``
-   **[revertAssets](../references/API-JS-revertAsssets.md)**  
``revertAssets(assets)``
-   **[revertAllWebApp](../references/API-JS-revertAllWebApp.md)**  
``revertAllWebApp(revertAllWebApp)``
-   **[getModifiedAssets](../references/API-JS-getModifiedAssets.md)**  
``getModifiedAssets()``
-   **[getModifiedAssetsWebApp](../references/API-JS-getModifiedAssetsWebApp.md)**  
``getModifiedAssetsWebApp(webApp)``
-   **[getAssetWebApp](../references/API-JS-getAssetWebApp.md)**  
``getAssetWebApp(webApp,path)``
-   **[getAsset](../references/API-JS-getAsset.md)**  
``getAsset()``

**Parent topic:**[WCM Web Projects](../references/API-JS-WCM-Web-Projects.md)

## Properties

The Sandbox Object API has the following properties:

-   **`name`**

    The name of the sandbox


-   **`sandboxref`**

    A unique reference of the sandbox


-   **`creator`**

    The creator of the sandbox


-   **`storeNames`**

    The store names


-   **`isStagingSandbox`**

    Determines if this is a staging sandbox


-   **`createdDateAsISO8601`**

    The date the sandbox was created in ISO8601 format


