---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Features not supported in a multi-tenant environment

There are some features and components that are not supported in a multi-tenant production environment.

Using multi-tenancy you can configure multiple, independent tenants on a single Alfresco instance. However, multi-tenancy is not supported in the following methods and features:

-   Alfresco Desktop Sync
-   Alfresco Records Management 2.5
-   Smart Folders
-   Content replication
-   Encrypted Content Store
-   Document Transformation Engine
-   EMC Centera Connector
-   Web Quick Start
-   Alfresco Mobile Applications \(they use the default tenant and can't switch between tenants\)
-   Alfresco Outlook Integration
-   Alfresco Media Management
-   Alfresco Analytics
-   Enterprise to Cloud Sync

Multi-tenancy is also not supported for the following methods:

-   CIFS
-   LDAP, NTLM and authentication methods other than `alfresco`
-   Inbound email
-   IMAP

**Parent topic:**[Setting up multi-tenancy](../concepts/mt-intro.md)

