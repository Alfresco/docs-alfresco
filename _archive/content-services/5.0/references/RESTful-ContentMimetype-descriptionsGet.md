---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Return descriptions of all known mime types

Returns a list of all mime types, along with their descriptions, such as "MS Project" for "application/vnd.

`GET /alfresco/service/api/mimetypes/descriptions`

ms-project", and their normal file extensions. This information is retrieved from the Mimetype Service, based on the mimetype map\(s\) defined for the repository.

The web script description document specifies the following options:

|`json`|The default response format|
|`none`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Content](../references/RESTful-Content.md)

