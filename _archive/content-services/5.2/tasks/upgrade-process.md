---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: upgrade general process
---

# Upgrading Alfresco Content Services

Use this procedure to upgrade from a previous version of Alfresco Content Services. The process involves a new installation of the Alfresco Content Services binaries and configuration, and an in-place upgrade of a copy of the repository. Use this procedure to upgrade from a previous version of Alfresco Content Services.

In-place upgrade of the binaries and configuration is not recommended. Creating a new installation ensures that if anything goes wrong during the upgrade, the original \(not upgraded\) system is still intact and available for immediate restart.

These steps assume that you have an existing Alfresco Content Services installation \(alfresco-v.1\) with the following settings:

|File Name|Properties|
|---------|----------|
|alfresco-global.properties|dir.root=/alfresco-v.1/alf\_data db.url=url<v.1\>|
|solrcore.properties|data.dir.root=/alfresco-v.1/solr/myindexes|

1.  Install the new version of Alfresco Content Services.

    1.  Shut down your existing instance.

    2.  Back up your existing repository \(alfresco-v.1\) and the database. See [Backing up and restoring the repository](../concepts/backup-intro.md).

        **Note:** Back up any configuration overrides from the <extension\> directory.

    3.  Use the setup wizard/installer to install the new version \(alfresco-v.2\) into a different directory from the existing installation. See [Installing using setup wizards](../concepts/installs-eval-intro.md).

        For example, the new Alfresco installation will have the following settings:

        ```
        In alfresco-global.properties:
        dir.root=/alfresco-v.2/alf_data
        db.url=url<v.2>
        
        In solrcore.properties:
        data.dir.root:/alfresco-v.2/solr/myindexes
        ```

2.  Validate the new 5.2.7 installation to check that it is working correctly.

    1.  Configure the new installation with a new repository and database \(not the existing one\).

    2.  [Start the server](alfresco-start.md) and validate that the system works correctly.

    For more information, see [Validating the upgrade](upgrade-validate.md).

3.  Apply all customizations to the new 5.2.7 installation.

    1.  [Stop](alfresco-stop.md) the server.

    2.  [Remove](../concepts/remove-apps-install.md) any unwanted applications.

    3.  [Modify](../concepts/modify-alf-apps.md) applications.

    4.  Install the required AMP files. See [Installing an Alfresco Module Package](amp-install.md).

    5.  Do not copy the files. Copy only the override settings so that you will not overwrite the new extension files in the upgraded version.

    6.  [Start](alfresco-start.md) the Alfresco server.

        Monitor the startup log messages for information on the status of the upgrade. If any issue\(s\) occur in the logs during startup, you need to rollback the whole repository to fix the issue\(s\) and then try again.

    7.  Fully [test](../concepts/testing-alfresco-upgrade.md#2) the working and configuration of your customizations.

    8.  [Stop](alfresco-stop.md) the server.

4.  Restore production data.

    1.  Remove all the files and directories under the contentstore directory of the new installation. Also, delete the database.

    2.  Delete the files in the two Solr `alfrescoModels` directories, and the indexes in the two directories \(solr/workspace/ and solr/archive/\) of the new installation.

    3.  Restore the backup of the indexes, contentstore directory, files, and database from your previous installation into the new installation. See [restoring production data](restore-prod-data.md).

    4.  [Start](alfresco-start.md) the server.

        If any issue\(s\) occur in the logs during startup, you need to rollback the whole repository to fix the issue\(s\) and then try again.

5.  If you are happy with the upgraded system, remove the old installation and repository.

6.  \[Optional\] Perform this additional step only if you have configured multi-tenancy and are upgrading.

    If upgrading to the latest version, your existing MT sample extension files are no longer relevant and must be deleted. It is also recommended that you backup your existing MT files.

    1.  Take a backup of the following three existing MT extension files and delete them from the existing MT extension directory:

        -   alfresco/extension/mt/mt-context.xml to alfresco/extension/mt/mt-context.xml
        -   alfresco/extension/mt/mt-admin-context.xml to alfresco/extension/mt/mt-admin-context.xml
        -   alfresco/extension/mt/mt-contentstore-context.xml to alfresco/extension/mt/mt-contentstore-context.xml
7.  \[Optional\] Perform this step if you are working in a clustered environment:

    1.  Shut down all nodes in the cluster.

    2.  Perform steps 1 to 5 on each additional node in turn, ensuring that each node starts fully before restarting the next one.

        You need to copy the database once only as it is upgraded by the first node that is upgraded. The other nodes detect it has been upgraded and skip the database upgrade step.

        CAUTION:

        In a clustered environment, when the cloned nodes are restarted with a cluster license, the nodes may try to join the existing production cluster and point to a cloned database instead of the production cluster database. This can lead to corrupted data.

        **Cause**: It occurs because the cloned node contains the cluster id from production and tries to join that cluster.

        **Solution**: To avoid the problem you should ensure any cloned nodes required for upgrade testing are network isolated from the production nodes.


**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

**Related information**  


[New Alfresco Content Services configuration properties](../concepts/repository-properties.md)

[Troubleshooting an upgrade](troubleshoot-upgrade.md)

