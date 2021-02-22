---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create Web site

Creates a new Web site based on the site preset and details provided.

`POST /alfresco/service/api/sites`



The following properties may be set.

-   **shortName**

    the shortName of the web site, mandatory, must be unique

-   **sitePreset**

    the sitePreset

-   **title**

    the title of the web site

-   **description**

    the description for the web site

-   **visibility**

    the site visibility, one of \(PUBLIC,MODERATED,PRIVATE\), defaults to PUBLIC


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Site](../references/RESTful-Site.md)

