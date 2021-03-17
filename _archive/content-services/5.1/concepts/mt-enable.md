---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Enabling multi-tenancy

In Alfresco, the multi-tenancy feature is pre-configured out-of-the-box, although it is not enabled by default.

When you install Alfresco, multi-tenancy is disabled. The multi-tenancy feature is automatically enabled when the first tenant is created.

**Note:** Only an Administrator user can create tenants.

**Note:** If you have pre-existing user logins with syntax `<name>@<domain>`, you should not create a tenant with that domain name. This will break the login functionality of the existing users with logins `<name>@<domain>`.

However, if you wish to disable multi-tenancy, you need to delete all the tenants. See [Managing tenants](../tasks/mt-config.md) for more information.

**Parent topic:**[Setting up multi-tenancy](../concepts/mt-intro.md)

