---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Upgrade prerequisites checklist

This checklist describes the requirements and prerequisites necessary to begin planning for upgrading an existing version to Alfresco Content Services 5.2.7.

Before starting an upgrade:

-   Validate your requirements.
    -   Validate your platform is still on the supported stacks for the new version of Alfresco Content Services. See [Supported stacks](https://www.alfresco.com/services/subscription/supported-platforms).
    -   Validate the [software requirements](prereq-install.md).
    -   Validate the [language support](language-support.md).
    -   Validate the [architecture](../tasks/configuration-checklist-arch.md).
    -   Validate the [environment](../tasks/configuration-checklist-env.md).
    -   Validate the [application of Service Pack](version-md.md).
-   [Backup your production data](backup-intro.md).
    -   You must perform a test upgrade using a backup copy of the repository before attempting to upgrade your production environment. Therefore, it is important that your backups are up-to-date.
    -   Ensure that you have backed up your production environment, for example, back up your database and content store \(alf\_data directory\).
-   If you are upgrading to Alfresco Content Services 5.2.7, migrating from your existing search subsystem to the Solr 4 search subsystem ensures that you have access to the full search capabilities. For more information, see the [Solr 4 migration documentation](search-migration.md).
-   If you have any customizations \(for example, AMPs\) in your existing installation, recompile all Java code against the new version of Alfresco Content Services and regression test against this new version.
-   When you upgrade Alfresco Content Services with Oracle, the user needs more privileges than connect and resource. At minimum, the user should have permission to delete objects. A safer option is to give a `sysdba` role for the upgrade process only. After the upgrade, this role should be removed.

-   **[Database considerations](../concepts/database-consideration.md)**  
Large repositories require some additional consideration during an upgrade, such as optimization of the database and adding optional indices to the database for metadata queries.

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

