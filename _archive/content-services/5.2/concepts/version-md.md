---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Alfresco Server, Administration, Configuration]
---

# Applying a Service Pack

Service packs of Alfresco Content Services are constrained in what they can contain in order to make the application process as safe as possible.

When applying a Service Pack, it is recommended you follow the [repository upgrade process](../tasks/upgrade-process.md). This ensures a consistent environment after the upgrade and provides a clean method of roll-back, if necessary. For some service packs, administrators might prefer to upgrade each component of the repository manually. This information explains how to do that in a supported manner.

You can selectively upgrade the components of your installation to match the versions listed in the VERSIONS.md file. This file is contained in the Alfresco Content Services distribution zip for the Service Pack.

The VERSION.md file lists the following recommended components for Alfresco Content Services:

-   Alfresco applications
-   Alfresco modules and integrations
-   Microsoft Office Suite
-   Utility applications
-   Operating Systems
-   Databases
-   Database Connectors
-   Applications Servers
-   Client Operating Systems
-   Client browsers
-   Java

**Best practices for applying service packs**

-   Read all related documentation

    Use the VERSION.md file along with the [Supported Platforms Matrix](supported-platforms-ACS.md) and [Upgrading Alfresco Content Services](../tasks/upgrade-process.md) to apply selective component upgrades.

-   Create a backup of your system

    Make sure that you have a working backup of your system. Backups help you to restore the server to a previous working installation.

-   Apply all the recommended updates

    You should use supported versions for each of the components in use and upgrade all items in a service pack, whenever possible.

-   Update the test installation for various components \(for example, the Operating Systems, Databases, Applications, Java, Alfresco applications, modules, and applications\)

    Service packs must be tested on a non-production environment prior to being deployed to production. This will help to gauge the impact of such changes.

-   Apply the update to production environment and deploy.

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

**Related information**  


[Working with content in a library](../tasks/alf-war-install.md)

