---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Upgrade prerequisites checklist

This checklist describes the requirements and prerequisites necessary to begin planning for upgrading an existing Alfresco version to Alfresco One 4.2.

Before starting an upgrade:

-   Validate your requirements.
    -   Validate your platform is still on the supported stacks for the new version of Alfresco. See [Supported platforms](alf3-supported-stacks.md).
    -   Validate the [software requirements](prereq-install.md).
    -   Validate the [language support](language-support.md).
    -   Validate the [architecture](../tasks/configuration-checklist-arch.md).
    -   Validate the [environment](../tasks/configuration-checklist-env.md).
-   [Backup your production data](backup-intro.md).
    -   You must perform a test upgrade using a backup copy of the repository before attempting to upgrade your production environment. Therefore, it is important that your backups are up-to-date.

    -   Ensure that you have backed up your production environment, for example, back up your database and content store \(alf\_data directory\).

-   If you are upgrading from a version of Alfresco earlier than 4.0.x using the installer, you need to set the following properties in alfresco-global.properties before starting Alfresco:

    ```
    system.workflow.engine.jbpm.enabled=true
    system.workflow.engine.jbpm.definitions.visible=true
    ```

-   If you have any customizations \(for example, AMPs\) in your existing Alfresco installation, recompile all Java code against the new version of Alfresco and regression test against the new version of Alfresco.
-   When you upgrade Alfresco with Oracle, the Alfresco user needs more privileges than connect and resource. At minimum, the Alfresco user should have permission to delete objects. A safer option is to give a `sysdba` role for the upgrade process only. After the upgrade, this role should be removed.

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

