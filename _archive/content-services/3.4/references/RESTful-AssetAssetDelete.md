---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Delete the specified asset.

Delete the specified asset.

`DELETE /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/assets/{path}`

`DELETE /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/assets/{path}?webApp={webApp?}`



If the optional webApp argument is specified then the path is relative to the webapp e.g. /index.htm

If webApp is not specified then the path is will be absolute e.g. /www/avm\_webapps/ROOT/index.htm

Returns STATUS\_OK\(200\) for success.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Asset](../references/RESTful-Asset.md)

