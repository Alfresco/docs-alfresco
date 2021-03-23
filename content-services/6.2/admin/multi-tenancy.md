---
title: Set up multi-tenancy
---

Content Services is designed to be used predominantly in a single instance, single-tenant (ST) environment where each tenant (for example, customer, company, or organization) runs a single instance that is installed on one server or across a cluster of servers.

For some limited specific use cases and only for our OEM customers, Content Services can be configured as a single-instance, multi-tenant environment supporting a limited set of multi-tenancy (MT) features. Multi-tenancy allows multiple, independent tenants to be hosted on a single instance, which can be installed either on a single server or across a cluster of servers.

The Content Services instance is logically partitioned such that it'll appear to each tenant that they're accessing a completely separate instance of the Alfresco repository. This can be useful for SaaS providers who make Content Services available to their customers under an OEM agreement. Enabling multi-tenancy will restrict what repository features can be used, as described in [Features not supported in a multi-tenant environment](#not-supported).

## Enable multi-tenancy

The multi-tenancy feature is pre-configured out-of-the-box, although it's not enabled by default.

When you install Content Services, multi-tenancy is disabled. The multi-tenancy feature is automatically enabled when the first tenant is created.

> **Note:** Only an Administrator user can create tenants.

> **Note:** If you have pre-existing user logins with syntax `<name>@<domain>`, you should not create a tenant with that domain name. This will break the login functionality of the existing users with logins `<name>@<domain>`.

However, if you wish to disable multi-tenancy, you need to delete all the tenants. See [Managing tenants](#managetenants) for more information.

## Manage tenants {#managetenants}

The default administrator user has access to the default environment and can be considered to be a "super tenant". Use the Tenant Console in the Admin Console to manage tenants.

1. Open the **Repo Admin Console**.

2. In the **Consoles** section, click **Tenant Console**.

    You see the **Tenant Console** page.

3. Perform the following as required:

    1. To list all tenants and show their details, type show tenants.

    2. To show details for a single tenant, type show tenant `<tenant domain>`.

        This shows the status (for example, whether it is enabled or disabled) and the root content store directory.

    3. To create a tenant, type `create <tenant domain> <tenant admin password> [<root contentstore dir>]`.

        For example, `create customer_tenant.com l3tm31n /usr/tenantstores/customer_tenant`

        This creates an empty tenant. By default the tenant will be enabled. It will have an administrator user called `admin@<tenant domain>` with the supplied password. All users that the administrator creates can log in using `<username>@<tenant domain>`. The root of the contentstore directory can be optionally specified. If it's not specified, or does not exist, the repository default root content store will be used (as specified by the `dir.contentstore` property).

        Tenant metadata is co-mingled but the binaries can be separated if, for example, multiple volumes are used to store groups of tenants.

    4. To enable a tenant, type enable `<tenant domain>`.

        This enables the tenant so that it is active and available for new logins.

    5. To disable a tenant, type disable `<tenant domain>`.

        This disables the tenant so that it is inactive and prevents tenant login.

> **Note:** If you have pre-existing user logins with syntax `<name>@<domain>`, you should not create a tenant with that domain name. This will break the login functionality of the existing users with logins `<name>@<domain>`.

## Multi-tenancy administration

When a tenant is created and enabled, the tenant administrator can access the administration features, like the Repo Admin Console, or the Share Admin Tools, within the context of their tenant domain.

For example, if a tenant/organization called acme is created, the tenant administrator can log in as `admin@acme` and create users such as `alice@acme`, and `bob@acme`.

The administration features available to the tenant administrator include:

* Manage system users (including user Usages and Quotas)
* Manage user groups
* Category management
* Export and import
* System information
* Node browser

For more information on administration, see [Using the Repo Admin Console]({% link content-services/6.2/admin/admin-console.md %}) and [Using the Share Admin Tools]({% link content-services/6.2/admin/share-admin-tools.md %}).

### Multi-tenancy implementation

To implement multi-tenancy, Content Services has been logically partitioned such that each tenant has access to their own set of tenant-specific stores. These stores are typically routed to their own physical root directory. This also means that indexes are partitioned, since Content Services maintains an index per store.

All related services are partitioned including node services, security services, workflow services, search and index services, and dictionary services. To support Alfresco Share in a multi-tenant environment, additional partitioned services include site services, activity services, invite services, and AVM services.

The metadata is logically partitioned within the database schema.

Logging enables nested diagnostic context (NDC). For a single tenant environment, the log output will show the user name context. For a multi-tenant environment, the log output also shows the tenant context.

* **Modules**

    Content Services supports the ability to pre-package AMPs (Alfresco Module Packages) into the Content Services WAR, which are installed into the default domain on start up. In a multi-tenant environment, the module is also installed into each tenant domain when the tenant is created or imported.

## Features not supported in a multi-tenant environment {#not-supported}

There are some features and components that are not supported in a multi-tenant production environment.

Using multi-tenancy you can configure multiple, independent tenants on a single Content Services instance. However, multi-tenancy is not supported in the following products and features:

* Alfresco Desktop Sync
* Alfresco Governance Services
* Smart Folders
* Content replication
* Encrypted Content Store
* Document Transformation Engine
* EMC Centera Connector
* Alfresco Mobile Applications (they use the default tenant and can't switch between tenants)
* Alfresco Outlook Integration
* Alfresco Media Management
* Activiti Workflow Console

Multi-tenancy is also not supported for the following methods:

* Any authentication methods other than `alfrescoNtlm`
* Inbound email
* IMAP
