---
author: Alfresco Documentation
audience: 
category: Administration
option: upgrade general process
---

# Upgrading Alfresco general procedure

This section describes the manual upgrade procedure. The procedure involves a new installation of the Alfresco binaries and configuration, and an in-place upgrade of a copy of the repository. In-place upgrade of the Alfresco binaries and configuration is not recommended.

Before starting an upgrade:

-   Ensure that you have backed up your production environment, for example, back up your database and content store \(alf\_data directory\).

    If Solr is being used, only the following directories must be backed up from the dir.root directory:

    -   contentstore directory
    -   solr/workspace/ directory
    -   solr/archive/ directory 
    -   contentstore.deleted directory \(optional\)
-   If you are upgrading to Alfresco One 5.0, migrating from your existing search subsystem to the Solr 4 search subsystem ensures that you have access to the full search capabilities. For more information, see the [Solr 4 migration documentation](../concepts/search-migration.md).
-   If you are upgrading from a version of Alfresco earlier than 4.0.x using the installer, you need to set the following property in alfresco-global.properties before starting Alfresco:

    ```
    system.workflow.engine.jbpm.enabled=true
    ```

-   If you have any customizations \(for example, AMPs\) in your existing Alfresco installation, recompile all Java code against the new version of Alfresco and regression test against the new version of Alfresco.
-   When you upgrade Alfresco with Oracle, the Alfresco user needs more privileges than connect and resource. At minimum, the Alfresco user should have permission to delete objects. A safer option is to give a `sysdba` role for the upgrade process only. After the upgrade, this role should be removed.
-   If you are upgrading to Alfresco One 5.0, there are additional war files that you need to install that were not available in versions prior to 5.0. If you do not install these war files, you will encounter problems. See the /webapps section of [Installing the Alfresco WAR](alf-war-install.md#webapps) for information on the WAR files that you need.

**Note:** You must perform a test upgrade using a backup copy of the repository before attempting to upgrade your production environment. Therefore it is important that your backups are up-to-date.

1.  Validate your platform is still on the supported stacks for the new version of Alfresco. See [Supported stacks](../concepts/supported-stacks.md).

2.  Shut down your existing Alfresco instance.

3.  Perform a cold back up of your repository. See [Backing up the Alfresco repository](../concepts/backup-intro.md).

4.  Back up any configuration overrides from the <extension\> directory.

    **Note:** Do not copy the files. Copy only the override settings so that you will not overwrite the new extension files in the upgraded version.

5.  Download and install the new version of the Alfresco WAR in a different directory to the existing installation. See [Installing Alfresco](../concepts/master-ch-install.md).

6.  Download and install the new version of the Alfresco WAR in a different directory to the existing installation. See [Installing Alfresco](../concepts/ch-install.md).

7.  Validate the new installation to check that it is working correctly. See [Validating the upgrade](upgrade-validate.md).

    1.  Configure the new installation with a new repository \(not the existing one\).

    2.  Start Alfresco and validate that the system works correctly.

    3.  Shut down Alfresco.

    4.  *Note: This is an optional step that you can perform if you prefer to remove files, indexes and databases now, rather than in steps 13 to 15. If you decide to perform it, Alfresco recommends that you do everything mentioned in this step*. Remove all the files, directories, and indexes from the contentstore directory. Also, delete and recreate the database.

8.  Manually check your existing custom overrides or configurations in your original configuration file copies and only update/add those appropriate configurations or files to the newer version in the new extension files. See [Configuring the installation](upgrade-config.md).

9.  Deploy your customizations into the new Alfresco instance.

10. Restart the Alfresco server for the configuration changes to take place. Monitor the startup log messages for information on the status of the upgrade. See [Starting the Alfresco server](alfresco-start.md).

11. Fully test the working and configuration of your customizations.

12. Shut down Alfresco.

13. Delete the files in the two Solr `alfrescoModels` directories, and the indexes in the two directories \(solr/workspace/ and solr/archive/\) that were backed up earlier.

14. Remove all the files and directories under the contentstore directory.

15. Restore the backup of the indexes, contentstore directory and files and database into the new repository.

16. Start Alfresco.

17. Once you are happy with the upgraded system, remove the old Alfresco installation and repository.


**Related information**  


[Troubleshooting an upgrade](troubleshoot-upgrade.md)

