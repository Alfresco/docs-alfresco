---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# File upload

Upload file content and meta-data into repository.

`POST /alfresco/service/api/upload`



HTML form data

-   filedata, \(mandatory\) HTML type file
-   siteid
-   containerid
-   uploaddirectory
-   updatenoderef
-   filename
-   description
-   contenttype
-   majorversion
-   overwrite
-   thumbnails

Return content

-   nodeRef

Return status: STATUS\_OK \(200\)

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Upload](../references/RESTful-Upload.md)

