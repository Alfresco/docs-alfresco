---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: Sandbox Object API
---

# Sandbox Object API

The Sandbox Object API has the following properties and methods.

## Properties

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


-   **[deleteSandbox](../references/API-JS-deleteSandbox.md)**  
`deleteSandbox()` deletes the sandbox.
-   **[submitAll](../references/API-JS-submitAll.md)**  
`submitAll(submitLabel,submitComment)` submits the modified items directly to staging bypassing any workflows that may have been configured for the web project.
-   **[submitAllWebApp](../references/API-JS-submitAllWebApp.md)**  
`submitAllWebApp(webApp,submitLabel,submitComment)` submits the modified items for the specified `webApp` directly to staging bypassing any workflows that may have been configured for the web project.
-   **[submitAssets](../references/API-JS-submitAssets.md)**  
`submitAssets(files, submitLabel, submitComment)` submits the specified assets directly to staging, bypassing any workflows that may have been configured for the web project.
-   **[submit](../references/API-JS-submit.md)**  
`submit(files, submitLabel, submitComment)` submits the specified paths directly to staging bypassing any workflows that may have been configured for the web project.
-   **[revertAll](../references/API-JS-revertAll.md)**  
`revertAll()` reverts the modified items.
-   **[revert](../references/API-JS-revert.md)**  
`revert(files)` reverts the specified paths.
-   **[revertAssets](../references/API-JS-revertAsssets.md)**  
`revertAssets(assets)` reverts the specified assets.
-   **[revertAllWebApp](../references/API-JS-revertAllWebApp.md)**  
`revertAllWebApp(revertAllWebApp)` reverts the modified items for the specified web application within the sandbox.
-   **[getModifiedAssets](../references/API-JS-getModifiedAssets.md)**  
`getModifiedAssets()` gets the modified assets within the sandbox.
-   **[getModifiedAssetsWebApp](../references/API-JS-getModifiedAssetsWebApp.md)**  
`getModifiedAssetsWebApp(webApp)` gets the modified assets for the specified `webApp` within the sandbox.
-   **[getAssetWebApp](../references/API-JS-getAssetWebApp.md)**  
`getAssetWebApp(webApp,path)` gets the asset. The path is relative to `webApp`.
-   **[getAsset](../references/API-JS-getAsset.md)**  
`getAsset()` gets the asset.

**Parent topic:**[WCM Web Projects](../references/API-JS-WCM-Web-Projects.md)

