---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: multi-tenancy manage tenants
---

# Managing tenants

The default Alfresco administrator user has access to the default environment and can be considered to be a "super tenant". The administrator can manage tenants using the Tenant Administration Console.

1.  Log in to Alfresco as the admin user and access: `http://localhost:8080/alfresco/faces/jsp/admin/tenantadmin-console.jsp`

2.  Perform the following as required:

    1.  To list all tenants and show their details, type show tenants.

    2.  To show details for a single tenant, type show tenant <tenant domain\>.

        This shows the status \(for example, whether it is enabled or disabled\) and the root content store directory.

    3.  To create a tenant, type create <tenant domain\> <tenant admin password\> \[<root contentstore dir\>\].

        For example, create zzz.com l3tm31n /usr/tenantstores/zzz

        This creates an empty tenant. By default the tenant will be enabled. It will have an administrator user called `admin@<tenant domain>` with the supplied password. All users that the administrator creates can login using `<username>@<tenant domain>`. The root of the content store directory can be optionally specified, otherwise it defaults to the repository default root content store \(as specified by the `dir.contentstore` property\). The default workflows are also be bootstrapped.

    4.  To enable a tenant, type enable <tenant domain\>.

        This enables the tenant so that it is active and available for new logins.

    5.  To disable a tenant, type disable <tenant domain\>.

        This disables the tenant so that it is inactive and prevents tenant login.


**Parent topic:**[Setting up Alfresco multi-tenancy](../concepts/mt-intro.md)

