---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: upgrade general process
---

# Upgrading Alfresco general procedure

This section describes the procedure for upgrading from a previous version of Alfresco. The process involves a new installation of the Alfresco binaries and configuration, and an in-place upgrade of a copy of the repository.

In-place upgrade of the Alfresco binaries and configuration is not recommended. Creating a new installation ensures that if anything goes wrong during the upgrade, the original \(not upgraded\) system is still intact and available for immediate restart.

These steps assume that you have an existing Alfresco installation \(alfresco-v.1\) with the following settings:

|File Name|Properties|
|---------|----------|
|alfresco-global.properties|dir.root=/alfresco-v.1/alf\_data db.url=url<v.1\>|
|solrcore.properties|data.dir.root=/alfresco-v.1/solr/myindexes|

1.  Install the new version of Alfresco.

    1.  Shut down your existing Alfresco instance.

    2.  Back up your existing Alfresco repository \(alfresco-v.1\) and the database. See [Backing up the Alfresco repository](../concepts/backup-intro.md).

        **Note:** Back up any configuration overrides from the <extension\> directory.

    3.  Use the setup wizard/installer to install the new version \(alfresco-v.2\) of Alfresco into a different directory from the existing installation. See [Installing Alfresco using setup wizard](../concepts/installs-eval-intro.md).

        For example, the new Alfresco installation will have the following settings:

        ```
        In alfresco-global.properties:
        dir.root=/alfresco-v.2/alf_data
        db.url=url<v.2>
        
        In solrcore.properties:
        data.dir.root:/alfresco-v.2/solr/myindexes
        ```

    4.  Install the new version \(alfresco-v.2\) of the Alfresco using the setup wizard/installer in a different directory to the existing installation. See [Installing Alfresco using setup wizard](../concepts/simpleinstalls-community-intro.md).

2.  Validate the new Alfresco One 5.0 installation to check that it is working correctly.

    1.  Configure the new installation with a new repository and database \(not the existing one\).

    2.  [Start Alfresco](alfresco-start.md) and validate that the system works correctly.

    For more information, see [Validating the upgrade](upgrade-validate.md).

3.  Apply all customizations to the new Alfresco One 5.0 installation.

    1.  [Stop](alfresco-stop.md) the Alfresco server.

    2.  [Remove](../concepts/remove-apps-install.md) any unwanted applications.

    3.  [Modify](../concepts/modify-alf-apps.md) Alfresco applications.

    4.  Install the required AMP files. See [installing an Alfresco Module Package](amp-install.md).

    5.  Do not copy the files. Copy only the override settings so that you will not overwrite the new extension files in the upgraded version.

    6.  [Start](alfresco-start.md) the Alfresco server.

        Monitor the startup log messages for information on the status of the upgrade. If any issue\(s\) occur in the logs during startup, you need to rollback the whole repository to fix the issue\(s\) and then try again.

    7.  Fully [test](../concepts/up-single-test.md) the working and configuration of your customizations.

    8.  [Stop](alfresco-stop.md) the Alfresco server.

4.  Restore production data.

    1.  Remove all the files and directories under the contentstore directory of the new installation. Also, delete the database.

    2.  Delete the files in the two Solr `alfrescoModels` directories, and the indexes in the two directories \(solr/workspace/ and solr/archive/\) of the new installation.

    3.  Restore the backup of the indexes, contentstore directory, files, and database from your previous Alfresco installation into the new installation. See [restoring production data](restore-prod-data.md).

    4.  [Start](alfresco-start.md) the Alfresco server.

        If any issue\(s\) occur in the logs during startup, you need to rollback the whole repository to fix the issue\(s\) and then try again.

5.  Once you are happy with the upgraded system, remove the old Alfresco installation and repository.


**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

**Related information**  


[Troubleshooting an upgrade](troubleshoot-upgrade.md)

