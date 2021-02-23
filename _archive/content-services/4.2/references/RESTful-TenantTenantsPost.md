---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create tenant

Create a tenant.

`POST /alfresco/service/api/tenants`



The repository must be in Multi-Tenant mode \(1st tenant created\).

You must have "administrator" privileges to create a tenant.

-   **tenantDomain**

    mandatory

-   **tenantAdminPassword**

    mandatory

-   **tenantContentStoreRoot**

    optional


The web script description document specifies the following options:

|`json`|The default response format|
|`admin`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Tenant](../references/RESTful-Tenant.md)

