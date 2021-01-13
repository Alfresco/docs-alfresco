---
title: Upgrade Content Services
---

Use this information to upgrade from a version of Content Services to a later version, apply a Service Pack, or upgrade the search subsystem.

Before performing an upgrade or applying a Service Pack, make sure you check the recommended upgrade path and the prerequisites checklist. As a part of upgrade, you need to validate and test to ensure that the Alfresco upgrade was successful.

To upgrade from a previous version of Content Services to a later version, see [upgrade process](#upgrade-process).

## Upgrade paths

When you upgrade Content Services, it's recommended that you follow a structured upgrade path between versions.

The following diagram shows the upgrade paths for major versions:

![Upgrade paths to 6.2]({% link content-services/images/upgrade-path-6-2.png %})

The upgrade path recommendations are:

* Direct upgrades to Content Services 6.2 are supported from only 5.1.x and later, with the latest Service Pack applied.
* Content Services 6.2 introduces changes that require new releases of all modules. To upgrade to 6.2, you also need to update any of the module artifacts to which you're entitled. See [Supported platforms]({% link content-services/latest/support/index.md %}) for more details on the associated versions.
* You must upgrade to Alfresco Search Services 1.4 before upgrading the repository to 6.2. See [Upgrade Search Services](https://docs.alfresco.com/search-enterprise/concepts/search-upgrade.html)(#LINK) for more information.
  * Upgrades from Content Services 5.2 must first upgrade from Solr 4 to Alfresco Search Services, and then upgrade to 6.2.
  * Upgrades from Alfresco 5.1 need to first stop at 5.2 to upgrade search to Alfresco Search Services, and then upgrade to 6.2.

> **Note:** If you're upgrading from an earlier release that's not shown on this diagram, contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"} for assistance.

## Upgrade from Alfresco Community Edition

Any GA (General Availability) release of Alfresco Community Edition can be upgraded to the latest version of Content Services that includes the same repository version family.

The following table shows the upgrade path for major versions:

| From Community | To Enterprise |
| -------------- | ------------- |
| Community Edition 201806 GA | Content Services 6.0.0 |
| Community Edition 201901 GA | Content Services 6.1.0 |
| Community Edition 201911 GA | Content Services 6.2.0 |

Please contact Alfresco Support for upgrade advice that's specific to your environment.

> **Note:** When migrating from Community to Enterprise it's advisable to validate the Community source version to Enterprise target version that you're planning, and whether that path has been tested, or if an alternative path is advised. In some cases, the latest version of Community may supersede the current Enterprise version, and may require that you wait until the next Enterprise version of the service pack line is available.

You can then follow the [upgrade path](#upgrade-paths) to Content Services to upgrade to the most current release.

## Upgrade process

Use this procedure to upgrade from a previous version of Content Services using the distribution zip. The process involves a new installation of the Content Services binaries and configuration, and an in-place upgrade of a copy of the repository.

In-place upgrade of the binaries and configuration isn't recommended. Creating a new installation ensures that if anything goes wrong during the upgrade, the original (not upgraded) system is still intact and available for immediate restart.

These steps assume that you've got an existing Content Services installation (`alfresco-v.1`) with the following settings:

| File Name | Properties |
| --------- | ---------- |
| alfresco-global.properties | dir.root=/alfresco-v.1/alf_data db.url=url<v.1\> |
| solrcore.properties | data.dir.root=/alfresco-v.1/solr/myindexes |

1. Install the new version of Content Services using the distribution zip.

    1. Shut down your existing instance.

    2. [Back up your existing repository](#LINK-concepts/backup-intro.md) (`alfresco-v.1`) and the database.

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

2. Validate the new 6.2 installation to check that it's working correctly.

    1. Configure the new installation with a new repository and database (not the existing one).

    2. [Start the server]({% link content-services/latest/install/zip/additions.md %}#start-server) and [validate](#validate-upgrade) that the system works correctly.

3. Apply all customizations to the new 6.2 installation.

    1. [Stop]({% link content-services/latest/install/zip/additions.md %}#stop-server) the server.

    2. [Remove]({% link content-services/latest/install/zip/tomcat.md %}#tailor-your-installation) any unwanted applications.

    3. [Modify](#LINK-config-concepts/modify-alf-apps) applications.

    4. Install the required AMP files. See [Installing an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

    5. Don't copy the files. Copy only the override settings, so that you won't overwrite the new extension files in the upgraded version.

    6. [Start]({% link content-services/latest/install/zip/additions.md %}#start-server) the server.

        Monitor the startup log messages for information on the status of the upgrade. If any issues occur in the logs during startup, you'll need to rollback the whole repository to fix the issue and then try again.

    7. Fully [test](#test-after-customizing-upgrade) your customizations and configuration.

    8. [Stop]({% link content-services/latest/install/zip/additions.md %}#stop-server) the server.

4. Restore production data.

    1. Remove all the files and directories under the `contentstore` directory of the new installation. Also, delete the database.

    2. Delete the files in the two Solr `alfrescoModels` directories, and the indexes in the two directories (`solr/workspace/` and `solr/archive/`) of the new installation.

    3. Restore the backup of the indexes, `contentstore` directory, files, and database from your previous installation into the new installation. See [Restore production data](#restore-production-data).

    4. [Start]({% link content-services/latest/install/zip/additions.md %}#start-server) the server.

        If any issue(s) occur in the logs during startup, you need to rollback the whole repository to fix the issue(s) and then try again.

5. If you're happy with the upgraded system, remove the old installation and repository.

6. (Optional) Perform this additional step only if you've configured multi-tenancy and are upgrading.

    If upgrading to the latest version, your existing multi-tenancy (MT) sample extension files are no longer relevant and must be deleted. It's also recommended that you backup your existing MT files.

    1. Take a backup of the following three existing MT extension files and delete them from the existing MT extension directory:

        * `alfresco/extension/mt/mt-context.xml` to `alfresco/extension/mt/mt-context.xml`
        * `alfresco/extension/mt/mt-admin-context.xml` to `alfresco/extension/mt/mt-admin-context.xml`
        * `alfresco/extension/mt/mt-contentstore-context.xml` to `alfresco/extension/mt/mt-contentstore-context.xml`

7. (Optional) Perform this step if you're working in a clustered environment:

    1. Shut down all nodes in the cluster.

    2. Perform steps 1 to 5 on each additional node in turn, ensuring that each node starts fully before restarting the next one.

        You need to copy the database once only, as it's upgraded by the first node that's upgraded. The other nodes detect it's been upgraded and skip the database upgrade step.

        > **CAUTION:**

        In a clustered environment, when the cloned nodes are restarted with a cluster license, the nodes may try to join the existing production cluster, and point to a cloned database instead of the production cluster database. This can lead to corrupted data.

        > **Cause**: This occurs because the cloned node contains the cluster id from production and tries to join that cluster.

        > **Solution**: To avoid this problem, you should ensure any cloned nodes required for upgrade testing are network isolated from the production nodes.

## Validate upgrade

Once you've upgraded, follow these steps to validate the new installation.

1. Restart the Content Services server.

    The configuration overrides ensure the server immediately directs data to the appropriate locations.

2. Monitor the startup log messages for information on the status of the upgrade.

3. Validate the new installation using a blank repository.

4. Configure the new installation with a new repository (not the existing one).

5. Verify the database connection details and data folder locations are set according to the environment in which the server is running.

6. Start Content Services and validate the system works correctly.

7. Shut down Content Services.

8. When you are certain the new installation is thoroughly validated, remove the old installation and repository.

## Test upgrade

Testing an upgrade checks that Content Services is successfully upgraded and working as expected after the upgrade.

### Test after upgrade

You've successfully upgraded. Now test that the core features that you intend to use work as expected.

Here are some of the tips to help you familiarize yourself.

> **Note:** We recommend that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

* Check if the roles that users had in the previous version are still valid in the new upgraded version.
* Check if your data or documents in the previous version are available in the new upgraded version.

### Test after customizing upgrade

There are a number of tests that you can perform after customizing an upgrade.

* Make sure that the server is up and running.
* Make sure that the errors in the `alfresco.log` file are checked and understood.

### Test after upgrade and configuration

You've successfully upgraded and configured Content Services. Now make sure that the features and customizations you've added work as expected.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

* Check if the users or groups created previously still exist.
* Check if all the dashboards created previously still exist.
* Check if the folders in the document library that were created prior to the upgrade still exist.

### Test after cluster upgrade

You've successfully upgraded and configured Content Services in a distributed/clustered environment. Now make sure that the features and customizations you've added work as expected.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

* Check that various components are communicating with each other.
* For a clustered upgrade, check that if one node is down, then the request is forwarded to the next available node.

### Test after cluster upgrade and configuration

You've successfully upgraded and configured Content Services in a distributed/clustered environment. Now make sure that the features and customizations you've added work as expected.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

* Check if the users or groups created previously still exist.
* Check if all the dashboards created previously still exist.
* Check if the folders in the document library that were created prior to the upgrade still exist.
* Check if clustering is working properly by running the [cluster validation tool](#LINK-tasks/adminconsole-reposerverclustering) in the Admin Console.

## Restore production data

The `dir.root` directory is defined in the `alfresco-global.properties` file. By default, this directory is named `alf_data` and located within the directory where Content Services is installed.

1. Restore the backup into the new repository.

    If Solr is being used, put the following directories from your backup to the `dir.root` directory on a new instance.

    * `contentstore` directory
    * `solr/workspace` directory (optional)
    * `solr/archive` directory (optional)
    * `contentstore.deleted` directory

    Some of the above mentioned directories are optional. This is because if the indexes are not copied over from the previous installation, Solr will query Content Services and rebuild its index in background after start up. It may take more time to rebuild indexes on large repositories. Applications will be accessible during the reindex process.

2. Point the new deployment to the old database using the `db.*` properties in the `alfresco-global.properties` file by providing the JDBC URL, database name, log in credentials, and any other relevant configuration options.

    Remember to specify the relevant JDBC driver into your application server's classpath.
