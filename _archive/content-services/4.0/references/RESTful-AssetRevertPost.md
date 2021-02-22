---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Revert modified assets within the specified author sandbox.

Revert the modified \(added, deleted, updated\) assets contained within an author's sandbox.

`POST /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/reverter`

`POST /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/reverter?webApp={webApp?}`



If the optional webApp argument is specified then reverts the modified assets within that web app.

JSON data fileds

-   **all**

    boolean is this submit all? \(optional\)

-   **assets**

    array, of JSON objects containing a path property \(optional\). If the "all" option is true then this parameter is ignored

-   **paths**

    array, of String paths. If the "all" option is true then this parameter is ignored


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Asset](../references/RESTful-Asset.md)

