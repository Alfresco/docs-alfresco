---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Update a WCM asset.

Update a WCM Asset, you can rename or move an asset.

`PUT /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/assets/{path}`

`PUT /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/assets/{path}?webApp={webApp?}`



JSON Input properties

-   **name**

    optional rename this file or folder to this new name

-   **path**

    optional move this file or folder to this path. The destination folder must already exist.


JSON Return data:

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Asset](../references/RESTful-Asset.md)

