---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: upgrade general process
---

# Upgrading Alfresco

This section describes the manual upgrade procedure. The procedure involves a new installation of the Alfresco binaries and configuration, and an in-place upgrade of a copy of the repository. In-place upgrade of the Alfresco binaries and configuration is not recommended.

Before starting an upgrade:

-   Ensure that you have backed up your production environment, for example, back up your database and content store \(alf\_data directory\).

    For Lucene, the following directories must be backed up from the dir.root directory:

    -   contentstore directory
    -   lucene-indexes directory
    -   contentstore.deleted directory \(optional\)
-   If you are upgrading from Alfresco version 3.4.x to 4.0.x, ensure that Lucene subsystem is enabled for the duration of the upgrade.
-   If you have any customizations \(for example, AMPs\) in your existing Alfresco installation, recompile all Java code against the new version of Alfresco and regression test against the new version of Alfresco.
-   When you upgrade Alfresco with Oracle, the alfresco user needs more privileges than connect and resource. At minimum, the alfresco user should have permission to delete objects. A safer option is to give a `sysdba` role for the upgrade process only. After the upgrade, this role should be removed.

**Note:** You must perform a test upgrade using a backup copy of the repository before attempting to upgrade your production environment. Therefore it is important that your backups are up-to-date.

1.  Validate your platform is still on the supported stacks for the new version of Alfresco. See [Supported stacks](../concepts/alf3-supported-stacks.md).

2.  Shut down your existing Alfresco instance, including any virtualization servers and File System Receivers. Alfresco runtimes may be left running and upgraded at a later time using this same process.

3.  Perform a cold back up of your repository. See [Backing up the Alfresco repository](../concepts/backup-intro.md).

4.  Back up any configuration overrides from the <extension\> directory.

    **Note:** Do not copy the files. Copy only the override settings so that you will not overwrite the new extension files in the upgraded version.

5.  Download and install the new version of the Alfresco WAR in a different directory to the existing installation. See [Installing Alfresco](../concepts/ch-install.md).

6.  Validate the new installation to check that it is working correctly. See [Validating the upgrade](upgrade-validate.md).

    1.  Configure the new installation with a new repository \(not the existing one\).

    2.  Start Alfresco and validate that the system works correctly.

    3.  Shut down Alfresco.

    4.  *Note: This is an optional step. If you decide to perform it, Alfresco recommends that you do everything mentioned in this step*. Remove all the files, directories, and indexes from the contentstore directory. Also, delete and recreate the database.

7.  Manually apply your backed up configuration override settings into the relevant new override files in the <extension\> directory. Ensure that you do not overwrite the new extension files. See [Configuring the installation](upgrade-config.md).

8.  Deploy your customizations into the new Alfresco instance.

9.  Restart the Alfresco server for the configuration changes to take place. Monitor the startup log messages for information on the status of the upgrade. See [Starting the Alfresco server](alfresco-start.md).

10. Fully test the working and configuration of your customizations. 

11. Shut down Alfresco.

12. Delete the Lucene indexes that were backed up earlier.

13. Remove files from your existing repository.

14. Restore the backup into the new repository \(choose `index.recovery.mode=AUTO` for Lucene indexes\). 

15. Start Alfresco.

16. Once you are happy with the upgraded system, remove the old Alfresco installation and repository.


**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

