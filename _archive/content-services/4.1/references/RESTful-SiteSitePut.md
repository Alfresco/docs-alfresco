---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Update Web site

Update the details of a Web site.

`PUT /alfresco/service/api/sites/{shortname}`

The following properties may be updated.

-   **title**

    the title of the web site

-   **description**

    the description for the web site

-   **visibility**

    the site visibility, one of \(PUBLIC,MODERATED,PRIVATE\)


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Site](../references/RESTful-Site.md)

