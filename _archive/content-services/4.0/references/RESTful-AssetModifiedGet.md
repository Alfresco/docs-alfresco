---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get modified assets within the specified sandbox.

Get the modified \(added, deleted, updated\) details of an asset within an author's sandbox.

`GET /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/modified`

`GET /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/modified?webApp={webApp?}`



If a folder has been added then only the folders's properties are returned \(not folder plus assets within that new folder\).

If the optional webApp argument is specified then returns the modified assets within that web app.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Asset](../references/RESTful-Asset.md)

