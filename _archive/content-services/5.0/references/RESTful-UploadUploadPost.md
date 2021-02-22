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
-   You must specify one of:
    -   destination \(the folder NodeRef where the node will be created\)
    -   updateNodeRef \(the NodeRef of an existing node that will be updated\)
    -   siteid and containerid \(the Site name and the container in that site where the document will be created\)
-   uploaddirectory - name of the folder \(either in the site container or the destination\) where the document will be uploaded. This folder must already exist
-   description - Description for a version update \(versionDescription\)
-   contenttype - The content type that this document should be specialised to
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

