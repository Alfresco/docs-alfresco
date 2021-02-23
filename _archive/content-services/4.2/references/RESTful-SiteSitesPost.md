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



Note: this method only creates a site at the repository level, it does not create a fully functional site. It should be considered for internal use only at the moment. Currently, creating a site programmatically needs to be done in the Share context, using the create-site module. Further information can be found at the address http://your\_domain:8080/share/page/index/uri/modules/create-site.post within your Alfresco installation.

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

-   **type**

    the type of site to create, optional


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Site](../references/RESTful-Site.md)

