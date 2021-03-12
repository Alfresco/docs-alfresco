---
title: Upgrade Community Edition
---

Use this information to upgrade from a version of Community Edition to a later version, apply a Service Pack, or upgrade the search subsystem.

Before performing an upgrade or applying a Service Pack, make sure you check the recommended upgrade path and the prerequisites checklist. As a part of upgrade, you need to validate and test to ensure that the Alfresco upgrade was successful.

Care should be taken when upgrading from any previous releases of Community Edition. There are some steps that should be reviewed and planned before you upgrade. Familiarize yourself with the guidance below and then plan your upgrade. In particular, ensure that the following steps are completed before you start:

* Ensure that you have a functional [backup of your Alfresco repository and database]({% link content-services/community/admin/backup-restore.md %}), before starting the upgrade process.
* Download and run the [Alfresco Extension Inspector](https://github.com/Alfresco/alfresco-extension-inspector/blob/master/README.md){:target="_blank"} to understand which customization or library items need to be reviewed or updated to support the upgrade.
* Review all new and deprecated features included in the Community Release Notes.
* Review and implement the new supported stack options, and update as necessary for the new deployment.

## Upgrade process

Use this procedure to upgrade from a previous version of Community Edition using the distribution zip. The process involves a new installation of the Community Edition binaries and configuration, and an in-place upgrade of a copy of the repository.

In-place upgrade of the binaries and configuration isn't recommended. Creating a new installation ensures that if anything goes wrong during the upgrade, the original (not upgraded) system is still intact and available for immediate restart.

These steps assume that you've got an existing Community Edition installation (`alfresco-v.1`) with the following settings:

| File Name | Properties |
| --------- | ---------- |
| alfresco-global.properties | `dir.root=/alfresco-v.1/alf_data`<br><br>`db.url=url<v.1>` |
| solrcore.properties | `data.dir.root=/alfresco-v.1/solr/myindexes` |

1. Install the new version of Community Edition using the distribution zip.

    1. Shut down your existing instance.

    2. [Back up your existing repository]({% link content-services/community/admin/backup-restore.md %}) (`alfresco-v.1`) and the database.

        > **Note:** Back up any configuration overrides from the `<extension>` directory.

    3. Install the new version (`alfresco-v.2`) into a different directory from the existing installation.

        For example, the new Alfresco installation will have the following settings:

        In `alfresco-global.properties`:

        ```bash
        dir.root=/alfresco-v.2/alf_data
        db.url=url<v.2>
        ```

        In `solrcore.properties`:

        ```bash
        data.dir.root:/alfresco-v.2/solr/myindexes
        ```

2. Validate the new installation to check that it's working correctly.

    1. Configure the new installation with a new repository and database (not the existing one).

    2. [Start the server]({% link content-services/community/install/zip/additions.md %}#start-server) and [validate](#validate-upgrade) that the system works correctly.

3. Apply all customizations to the new installation.

    1. [Stop]({% link content-services/community/install/zip/additions.md %}#stop-server) the server.

    2. [Remove]({% link content-services/community/install/zip/tomcat.md %}#tailor-your-installation) any unwanted applications.

    3. [Modify]({% link content-services/community/config/index.md %}#customize-applications) applications.

    4. Install the required AMP files. See [Installing an Alfresco Module Package]({% link content-services/community/install/zip/amp.md %}).

    5. Don't copy the files. Copy only the override settings, so that you won't overwrite the new extension files in the upgraded version.

    6. [Start]({% link content-services/community/install/zip/additions.md %}#start-server) the server.

        Monitor the startup log messages for information on the status of the upgrade. If any issues occur in the logs during startup, you'll need to rollback the whole repository to fix the issue and then try again.

    7. Fully [test](#test-after-customizing-upgrade) your customizations and configuration.

    8. [Stop]({% link content-services/community/install/zip/additions.md %}#stop-server) the server.

4. Restore production data.

    1. Remove all the files and directories under the `contentstore` directory of the new installation. Also, delete the database.

    2. Delete the files in the two Solr `alfrescoModels` directories, and the indexes in the two directories (`solr/workspace/` and `solr/archive/`) of the new installation.

    3. Restore the backup of the indexes, `contentstore` directory, files, and database from your previous installation into the new installation.

    4. [Start]({% link content-services/community/install/zip/additions.md %}#start-server) the server.

        If any issue(s) occur in the logs during startup, you need to rollback the whole repository to fix the issue(s) and then try again.

5. If you're happy with the upgraded system, remove the old installation and repository.

6. (Optional) Perform this additional step only if you've configured multi-tenancy and are upgrading.

    If upgrading to the latest version, your existing multi-tenancy (MT) sample extension files are no longer relevant and must be deleted. It's also recommended that you backup your existing MT files.

    1. Take a backup of the following three existing MT extension files and delete them from the existing MT extension directory:

        * `alfresco/extension/mt/mt-context.xml` to `alfresco/extension/mt/mt-context.xml`
        * `alfresco/extension/mt/mt-admin-context.xml` to `alfresco/extension/mt/mt-admin-context.xml`
        * `alfresco/extension/mt/mt-contentstore-context.xml` to `alfresco/extension/mt/mt-contentstore-context.xml`

## Validate upgrade

Once you've upgraded, follow these steps to validate the new installation.

1. Restart the Community Edition server.

    The configuration overrides ensure the server immediately directs data to the appropriate locations.

2. Monitor the startup log messages for information on the status of the upgrade.

3. Validate the new installation using a blank repository.

4. Configure the new installation with a new repository (not the existing one).

5. Verify the database connection details and data folder locations are set according to the environment in which the server is running.

6. Start Community Edition and validate the system works correctly.

7. Shut down Community Edition.

8. When you are certain the new installation is thoroughly validated, remove the old installation and repository.
