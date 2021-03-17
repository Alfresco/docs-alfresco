---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create a new WCM asset.

Create a new WCM Asset in the specified path and sandbox.

`POST /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/assets/{path}`

`POST /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/assets/{path}?webApp={webApp?}`



If the optional webApp argument is specified then the path is relative to the webapp.

If webApp is not specified then the path is will be absolute e.g. /www/avm\_webapps/ROOT

JSON Input values

-   **name**

    mandatory name of this asset

-   **type**

    mandatory "file" or "folder"

-   **content**

    optional, string content of the new file, this is a convenience method, normally content is added via the file upload which gives greater control over the content.


JSON Return value:

```
 
    data:The newly created asset in JSON format.
  
```

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Asset](../references/RESTful-Asset.md)

