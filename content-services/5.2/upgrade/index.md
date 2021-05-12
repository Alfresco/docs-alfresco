---
title: Upgrade
---

Use this information for upgrading from a version of Alfresco Content Services to a later version, for applying a Service Pack, or for upgrading the search subsystem.

Before performing an upgrade or applying a Service Pack, make sure you check the recommended upgrade path and the prerequisites checklist. As a part of upgrade, you need to validate and test to ensure that Alfresco upgrade was successful.

For upgrading from a previous version of Alfresco Content Services to a later version, see [Upgrading Alfresco Content Services](#upgrading-alfresco-content-services).

-   **[Alfresco Content Services upgrade paths](#upgrade-paths)**  
When you upgrade Alfresco Content Services, it is recommended that you follow a structured upgrade path between versions.
-   **[Upgrading from Alfresco Community Edition](#upgrading-from-alfresco-community-edition)**  
Any GA (General Availability) release of Alfresco Community Edition can be upgraded to the latest version of Alfresco Content Services that includes the same Content Repository version family.
-   **[Upgrade guide](#upgrade-guide)**  
Use this information to upgrade Alfresco Content Services on a single instance and in a distributed and clustered environment.
-   **[Upgrade prerequisites checklist](#upgrade-prerequisites-checklist)**  
This checklist describes the requirements and prerequisites necessary to begin planning for upgrading an existing version to Alfresco Content Services 5.2.7.
-   **[Upgrading Alfresco Content Services](#upgrading-alfresco-content-services)**  
Use this procedure to upgrade from a previous version of Alfresco Content Services. The process involves a new installation of the Alfresco Content Services binaries and configuration, and an in-place upgrade of a copy of the repository. Use this procedure to upgrade from a previous version of Alfresco Content Services.
-   **[Applying a Service Pack](#applying-a-service-pack)**  
Service packs of Alfresco Content Services are constrained in what they can contain in order to make the application process as safe as possible.
-   **[New Alfresco Content Services configuration properties](#new-alfresco-content-services-configuration-properties)**  
Alfresco Content Services 5.2.7 provides a range of new properties for configuring your installation, along with their default settings. These properties can be set in the `alfresco-global.properties` file.
-   **[Upgrading search](#upgrading-search)**  
Use this information to migrate the search subsystem during an upgrade to 5.2.7.
-   **[Validating an upgrade](#validating-an-upgrade)**  
Once you have upgraded, follow these steps to validate the new installation.
-   **[Testing an upgrade](#testing-an-upgrade)**  
Testing an upgrade checks that Alfresco Content Services is successfully upgraded and is working as expected after the upgrade.
-   **[Restoring production data](#restoring-production-data)**  
Use this information to restore production data.

## Upgrade paths {#upgrade-paths}

When you upgrade Alfresco Content Services, it is recommended that you follow a structured upgrade path between versions.

The following diagram shows the upgrade paths for major versions:

![]({% link content-services/images/upgrade-path-5-2.png %})

The upgrade path recommendations are:

-   Direct upgrades to Alfresco Content Services 5.2.7 are supported from only 4.1.x and later, with the latest Service Pack applied.
-   See [Upgrading from Alfresco Community Edition](#upgrading-from-alfresco-community-edition) for guidance on upgrades from Alfresco Community Edition.
-   Upgrades from Alfresco 4.x using Lucene require migration to Solr 1.4 before being able to upgrade to Alfresco 5.0 with Solr 1.4. Once Alfresco 5.0 and Solr 1.4 are running, then migration to 5.0 with Solr 4 will complete the upgrade. See [Upgrading search subsystems]({% link content-services/5.2/upgrade/index.md %}#upgrading-search) for more information.
-   Upgrades from Alfresco 3.x require the latest service pack of version 4.x before upgrading to version 5.1, and then upgrading to 5.2.7.
-   Upgrades from Alfresco 2.2.x require the service pack 2.2.8 to be applied first, followed by the latest service pack of version 3.4.x, and then the latest service pack of version 4.x before being able to upgrade to 5.0.

> **Note:** If you are upgrading from an earlier release that is not shown on this diagram, contact Alfresco Support for assistance.

## Upgrading from Alfresco Community Edition

Any GA (General Availability) release of Alfresco Community Edition can be upgraded to the latest version of Alfresco Content Services that includes the same Content Repository version family.

The following table shows the upgrade path for major versions:

|From Community|To Enterprise|
|--------------|-------------|
|Alfresco Community Edition 201602 GA|Alfresco One 5.1.0|
|Alfresco Community Edition 201701 GA|Alfresco Content Services 5.2.0|
|Alfresco Community Edition 201707 GA|Alfresco Content Services 5.2.2|

Please contact Alfresco Support for upgrade advice that's specific to your environment.

> **Note:** When migrating from Community to Enterprise it is advisable to validate the Community source version to Enterprise target version that you're planning, and whether that path has been tested, or if an alternative path is advised. In some cases, the latest version of Community may supersede the current Enterprise version, and may require that you wait until the next Enterprise version of the service pack line is available.

You can then follow the upgrade path to Alfresco Content Services to upgrade to the most current release. See [Alfresco Content Services upgrade paths](#upgrade-paths) for more information.

## Upgrade guide

Use this information to upgrade Alfresco Content Services on a single instance and in a distributed and clustered environment.

Follow this checklist when upgrading or clustering an installation of Alfresco Content Services. For detailed step-by-step instructions for upgrading see [Upgrading Alfresco Content Services](#upgrading-alfresco-content-services).

When upgrading Alfresco Content Services, in order to configure distribution and clustering optimally, contact [Alfresco Consulting](http://www.alfresco.com/services/consulting) or your Alfresco certified partner.

-   **[Upgrading on a single instance](#upgrading-on-a-single-instance)**  
Use this information to upgrade a single instance of Alfresco Content Services.
-   **[Upgrading in a distributed environment](#upgrading-in-a-distributed-environment)**  
Use this information to understand how to upgrade Alfresco Content Services in a distributed environment.

### Upgrading on a single instance

Use this information to upgrade a single instance of Alfresco Content Services.

The main stages involved in upgrading and configuring are shown in the diagram. These include preparing your system for upgrade, installing as an out-of-box application, configuring it based on your requirements, restoring production data, and finally, testing and getting familiar with Alfresco Content Services.

Each of these main stages consist of sub-steps, as shown in the diagram, which displays the sub-steps that need to be performed in order to complete each main stage.

> **Note:** Note that the steps shown in the diagrams have a colour code. For example, Restoring production data stage consists of three sub-steps: Stop the Alfresco Content Services server, restore production data, and start the server.

> **Note:** We recommend that you upgrade in a test environment before you upgrade it in your production environment. This allows you to address any problems during the upgrade process more effectively. You can also verify that applications and scripts work properly before upgrading your production environment. In addition, you can assess the time that it takes to upgrade the database, to finalize your upgrade plan.

To get started quickly with upgrading a single instance, follow the process shown.

![]({% link content-services/images/singleupgrade.png %})

### Upgrading in a distributed environment

Use this information to understand how to upgrade Alfresco Content Services in a distributed environment.

The main stages involved in installing Alfresco Content Services in a cluster are shown in the diagram. You must upgrade and configure your data on a single node first and then on the second node, and so on.

The main steps involved in the upgrading process include preparing your system for upgrade, [Upgrading on a single instance](#upgrading-on-a-single-instance), installing on node 2, restoring production data, and finally, testing and getting familiar with Alfresco Content Services. Repeat the last three steps on all the other nodes in your system in series.

Each of these main stages consist of sub-steps, as shown in the diagram, which displays the sub-steps that need to be performed in order to complete each main stage.

> **Note:** Note that the steps shown in the diagrams have a colour code. For example, Restoring production data stage consists of three sub-steps: Stop the Alfresco Content Services server, restore production data, and start the server.

> **Note:** Make sure you do not install and configure all the nodes in parallel. Follow in the installation process in series for all the nodes in your system.

> **Note:** We recommend that you upgrade in a test environment before you upgrade it in your production environment. This allows you to address any problems during the upgrade process more effectively. You can also verify that applications and scripts work properly before upgrading your production environment. In addition, you can assess the time that it takes to upgrade the database, to finalize your upgrade plan.

To get started quickly with upgrading Alfresco Content Services in a distributed environment, follow this process:

![]({% link content-services/images/disupgrade.png %})

## Upgrade prerequisites checklist

This checklist describes the requirements and prerequisites necessary to begin planning for upgrading an existing version to Alfresco Content Services 5.2.7.

Before starting an upgrade:

-   Validate your requirements.
    -   Validate your platform is still on the supported stacks for the new version of Alfresco Content Services. See [Supported stacks](https://www.alfresco.com/services/subscription/supported-platforms){:target="_blank"}.
    -   Validate the [software requirements]({% link content-services/5.2/install/index.md %}#software-requirements).
    -   Validate the [language support]({% link content-services/5.2/install/index.md %}#language-support).
    -   Validate the [architecture]({% link content-services/5.2/install/index.md %}#validating-the-architecture).
    -   Validate the [environment]({% link content-services/5.2/install/index.md %}#validating the environment).
    -   Validate the [application of Service Pack](#applying-a-service-pack).
-   [Backup your production data]({% link content-services/5.2/admin/backup-restore.md %}#backing-up-and-restoring-the-repository).
    -   You must perform a test upgrade using a backup copy of the repository before attempting to upgrade your production environment. Therefore, it is important that your backups are up-to-date.
    -   Ensure that you have backed up your production environment, for example, back up your database and content store (alf_data directory).
-   If you are upgrading to Alfresco Content Services 5.2.7, migrating from your existing search subsystem to the Solr 4 search subsystem ensures that you have access to the full search capabilities. For more information, see the [Solr 4 migration documentation]({% link content-services/5.2/upgrade/index.md %}#upgrading search).
-   If you have any customizations (for example, AMPs) in your existing installation, recompile all Java code against the new version of Alfresco Content Services and regression test against this new version.
-   When you upgrade Alfresco Content Services with Oracle, the user needs more privileges than connect and resource. At minimum, the user should have permission to delete objects. A safer option is to give a `sysdba` role for the upgrade process only. After the upgrade, this role should be removed.

### Database considerations

Large repositories require some additional consideration during an upgrade, such as optimization of the database and adding optional indices to the database for metadata queries.

Two important aspects to consider when upgrading a large repository are:

1.  Transactional metadata query is a feature that requires the creation of new indices. For large repositories, this process may take a long time. See [Transactional metadata query]({% link content-services/5.2/admin/search.md %}#transactional-metadata-query) for more details.
2.  After restoring the production data of large repositories and creating the indices, refer to [Database validation - Maintenance and Tuning]({% link content-services/5.2/config/databases.md %}#validating-your-database) to ensure optimal performance.

    After applying the patches, check that the logs show no warnings or issues with the database. If the indices could not be created, some queries may run very slow.

## Upgrading Alfresco Content Services

Use this procedure to upgrade from a previous version of Alfresco Content Services. The process involves a new installation of the Alfresco Content Services binaries and configuration, and an in-place upgrade of a copy of the repository. Use this procedure to upgrade from a previous version of Alfresco Content Services.

In-place upgrade of the binaries and configuration is not recommended. Creating a new installation ensures that if anything goes wrong during the upgrade, the original (not upgraded) system is still intact and available for immediate restart.

These steps assume that you have an existing Alfresco Content Services installation (alfresco-v.1) with the following settings:

|File Name|Properties|
|---------|----------|
|alfresco-global.properties|`dir.root=/alfresco-v.1/alf_data db.url=url<v.1>`|
|solrcore.properties|`data.dir.root=/alfresco-v.1/solr/myindexes`|

1.  Install the new version of Alfresco Content Services.

    1.  Shut down your existing instance.

    2.  Back up your existing repository (alfresco-v.1) and the database. See [Backing up and restoring the repository]({% link content-services/5.2/admin/backup-restore.md %}#backing-up-and-restoring-the-repository).

        > **Note:** Back up any configuration overrides from the `<extension>` directory.

    3.  Use the setup wizard/installer to install the new version (alfresco-v.2) into a different directory from the existing installation. See [Installing using setup wizards]({% link content-services/5.2/install/index.md %}#installing-using-setup-wizards).

        For example, the new Alfresco installation will have the following settings:

        ```text
        In alfresco-global.properties:
        dir.root=/alfresco-v.2/alf_data
        db.url=url<v.2>
        
        In solrcore.properties:
        data.dir.root:/alfresco-v.2/solr/myindexes
        ```

2.  Validate the new 5.2.7 installation to check that it is working correctly.

    1.  Configure the new installation with a new repository and database (not the existing one).

    2.  [Start the server]({% link content-services/5.2/admin/index.md %}#starting-the-alfresco-content-services-server) and validate that the system works correctly.

    For more information, see [Validating the upgrade]({% link content-services/5.2/upgrade/index.md %}#validating-the-upgrade).

3.  Apply all customizations to the new 5.2.7 installation.

    1.  [Stop]({% link content-services/5.2/upgrade/index.md %}#upgrading-on-a-single-instance) the server.

    2.  [Remove]({% link content-services/5.2/install/index.md %}#tailoring-your-installation) any unwanted applications.

    3.  [Modify]({% link content-services/5.2/config/index.md %}#customizing-applications) applications.

    4.  Install the required AMP files. See [Installing an Alfresco Module Package]({% link content-services/5.2/install/index.md %}#installing-an-alfresco-module-package).

    5.  Do not copy the files. Copy only the override settings so that you will not overwrite the new extension files in the upgraded version.

    6.  [Start]({% link content-services/5.2/admin/index.md %}#starting-the-alfresco-content-services-server) the Alfresco server.

        Monitor the startup log messages for information on the status of the upgrade. If any issue(s) occur in the logs during startup, you need to rollback the whole repository to fix the issue(s) and then try again.

    7.  Fully [test](#testing-an-upgrade) the working and configuration of your customizations.

    8.  [Stop]({% link content-services/5.2/admin/index.md %}#stopping-the-alfresco-content-services-server) the server.

4.  Restore production data.

    1.  Remove all the files and directories under the `contentstore` directory of the new installation. Also, delete the database.

    2.  Delete the files in the two Solr `alfrescoModels` directories, and the indexes in the two directories (`solr/workspace/` and `solr/archive/`) of the new installation.

    3.  Restore the backup of the indexes, `contentstore` directory, files, and database from your previous installation into the new installation. See [restoring production data](#restoring-production-data).

    4.  [Start]({% link content-services/5.2/admin/index.md %}#starting-the-alfresco-content-services-server) the server.

        If any issue(s) occur in the logs during startup, you need to rollback the whole repository to fix the issue(s) and then try again.

5.  If you are happy with the upgraded system, remove the old installation and repository.

6.  [Optional] Perform this additional step only if you have configured multi-tenancy and are upgrading.

    If upgrading to the latest version, your existing MT sample extension files are no longer relevant and must be deleted. It is also recommended that you backup your existing MT files.

    1.  Take a backup of the following three existing MT extension files and delete them from the existing MT extension directory:

        -   `alfresco/extension/mt/mt-context.xml` to `alfresco/extension/mt/mt-context.xml`
        -   `alfresco/extension/mt/mt-admin-context.xml` to `alfresco/extension/mt/mt-admin-context.xml`
        -   `alfresco/extension/mt/mt-contentstore-context.xml` to `alfresco/extension/mt/mt-contentstore-context.xml`
7.  [Optional] Perform this step if you are working in a clustered environment:

    1.  Shut down all nodes in the cluster.

    2.  Perform steps 1 to 5 on each additional node in turn, ensuring that each node starts fully before restarting the next one.

        You need to copy the database once only as it is upgraded by the first node that is upgraded. The other nodes detect it has been upgraded and skip the database upgrade step.

        > **CAUTION:**
        >
        > In a clustered environment, when the cloned nodes are restarted with a cluster license, the nodes may try to join the existing production cluster and point to a cloned database instead of the production cluster database. This can lead to corrupted data.
        >
        > **Cause**: It occurs because the cloned node contains the cluster id from production and tries to join that cluster.
        >
        > **Solution**: To avoid the problem you should ensure any cloned nodes required for upgrade testing are network isolated from the production nodes.

## Applying a Service Pack

Service packs of Alfresco Content Services are constrained in what they can contain in order to make the application process as safe as possible.

When applying a Service Pack, it is recommended you follow the [repository upgrade process](#upgrading-alfresco-content-services). This ensures a consistent environment after the upgrade and provides a clean method of roll-back, if necessary. For some service packs, administrators might prefer to upgrade each component of the repository manually. This information explains how to do that in a supported manner.

You can selectively upgrade the components of your installation to match the versions listed in the `VERSIONS.md` file. This file is contained in the Alfresco Content Services distribution zip for the Service Pack.

The `VERSION.md` file lists the following recommended components for Alfresco Content Services:

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

### Best practices for applying service packs

-   Read all related documentation

    Use the VERSION.md file along with the [Supported Platforms Matrix]({% link content-services/5.2/support/index.md %}) and [Upgrading Alfresco Content Services](#upgrading-alfresco-content-services) to apply selective component upgrades.

-   Create a backup of your system

    Make sure that you have a working backup of your system. Backups help you to restore the server to a previous working installation.

-   Apply all the recommended updates

    You should use supported versions for each of the components in use and upgrade all items in a service pack, whenever possible.

-   Update the test installation for various components (for example, the Operating Systems, Databases, Applications, Java, Alfresco applications, modules, and applications)

    Service packs must be tested on a non-production environment prior to being deployed to production. This will help to gauge the impact of such changes.

-   Apply the update to production environment and deploy.

## New Alfresco Content Services configuration properties

Alfresco Content Services 5.2.7 provides a range of new properties for configuring your installation, along with their default settings. These properties can be set in the `alfresco-global.properties` file.

-   **authentication.protection.enabled=true**

    Specifies if the login protection feature is enabled or disabled.

-   **authentication.protection.limit=10**

    Specifies the number of attempts after which the user id becomes protected.

-   **authentication.protection.periodSeconds=6**

    Specifies the protection period after which a valid login attempt can be done.

-   **content.metadataExtracter.pdf.overwritePolicy=PRAGMATIC**

    Specifies the default overwrite policy for `PdfBoxMetadataExtracter`.

-   **content.transformer.retryOn.different.mimetype=true**

    Enables transformation retrying if the file mimetype differs the file extension. This property is ignored if `transformer.strict.mimetype.check` is true as these transformations will not take place.

-   **dir.contentstore.bucketsPerMinute=0**

    Splits the data into a maximum number of buckets within the minute. The default value is zero, which means all the content created within the same minute will live in the same folder in the content store. If a value is specified, the content will be distributed into sub folders based on the second in which it was created. For example, dir.contentstore.bucketsPerMinute=6.

-   **system.api.discovery.enabled=true**

    Specifies if the detailed version information about the repository should be returned from the Discovery REST API. The default value is true and it returns a successful response. If this property is set to false, Discovery is disabled for the system and the server returns a `501 Not Implemented` error code.

-   **transformer.strict.mimetype.check=true**

    Checks that the declared mimetype (of the node) is the same as the derived mimetype of the content before a transformation takes place. Only files in the repository (not intermediate files in a transformer pipeline) are checked.

-   **system.workflow.comment.property.max.length=4000**

    Specifies the max length that a comment on a task can have. It replaces the `system.workflow.jbpm.comment.property.max.length` property, which has been deprecated in Alfresco Content Services 5.2.7.

-   **spaces.quickshare.link_expiry_actions.childname=app:quick_share_link_expiry_actions**

    Specifies the name of the folder which will be created (if it doesn't already exist) under the Data Dictionary in Alfresco Share to serve as a container for all the expiry actions nodes.

-   **system.quickshare.expiry_date.enforce.minimum.period=DAYS**

    By default, the difference between the quick share expiry date and the current time must be at least 1 day (24 hours). This can be changed to at least 1 hour or 1 minute for testing purposes. For example, if you set the value to `MINUTES`, the service will calculate the difference between NOW and the given expiry date in terms of minutes, and check for the difference to be greater than 1 minute.

-   **system.remove-jbpm-tables-from-db.ignored=true**

    Removes all jBPM tables from the database. If set to false, it runs the script to delete the tables.

    > **Note:** The jBPM workflow engine was deprecated and all associated workflows were removed in Alfresco One 5.0. Any unused data will be removed when the `jbpm_` tables are removed. The Activiti BPM engine data in the `act_` tables is completely unaffected.

    In Alfresco Content Services 5.2.7, by default, the tables and the unused data still remains. In the future releases of Alfresco Content Services, the tables will be removed.

The properties to dynamically map Alfresco stores to a Solr 6 instance where the index for a store resides are:

```text
solr6.store.mappings=solrMappingAlfresco,solrMappingArchive
solr6.store.mappings.value.solrMappingAlfresco.httpClientFactory=solrHttpClientFactory
solr6.store.mappings.value.solrMappingAlfresco.baseUrl=/solr/alfresco
solr6.store.mappings.value.solrMappingAlfresco.protocol=workspace
solr6.store.mappings.value.solrMappingAlfresco.identifier=SpacesStore
solr6.store.mappings.value.solrMappingArchive.httpClientFactory=solrHttpClientFactory
solr6.store.mappings.value.solrMappingArchive.baseUrl=/solr/archive
solr6.store.mappings.value.solrMappingArchive.protocol=archive
solr6.store.mappings.value.solrMappingArchive.identifier=SpacesStore
```

## Upgrading search

Use this information to migrate the search subsystem during an upgrade to 5.2.7.

> **Important:** The Lucene search subsystem is not available in 5.2.7.

> **Important:** During an upgrade, Solr 4 needs to reindex the entire repository. While reindexing is in progress, you may use Solr 1 for basic search functionality - new functionality enabled by Solr 4 (such as filtered searches) will not be available, and you may encounter other issues with search capabilities.

This information describes the migration path of the following two examples:

-   Upgrading from Alfresco Content Services 4.x with Lucene to Alfresco Content Services 5.2.7 with Solr 4
-   Upgrading from Alfresco Content Services 4.x with Solr 1.4 to Alfresco Content Services 5.2.7 with Solr 4

-   **[Issues to consider before upgrading search](#issues-to-consider-before-upgrading-search)**  
Before beginning an upgrade of the search subsystems, there are some important issues you should consider.
-   **[Upgrading from Lucene to Solr 4 search](#upgrading-from-lucene-to-solr-4-search)**  
Older versions of Alfresco Content Services use the Lucene search server. You can upgrade from Alfresco Content Services 4.x with the Lucene search server to Alfresco Content Services 5.2.7 with the Solr 4 search server.
-   **[Upgrading from Solr 1.4 to Solr 4 search](#upgrading-from-solr-1.4-to-solr-4-search)**  
Use this information to upgrade from Alfresco Content Services 4.x with the Solr 1.4 search server to Alfresco Content Services 5.2.7 with the Solr 4 search server.



### Issues to consider before upgrading search

Before beginning an upgrade of the search subsystems, there are some important issues you should consider.

**Setup wizard installation**

Alfresco Content Services uses the Solr 1 search subsystem only during the upgrade process. When upgrading to using the setup wizards, you should install both the Solr 1 and Solr 4 search subsystems. If you wish to minimize the necessary downtime of the search subsystem while the Solr 4 indexes are being build, you must run Solr 1. Once the Solr 4 indexes are up to date, you must enable the Solr 4 subsystem and disable the Solr 1 subsystem.

> **Note:** Note that when you have both the subsystems, you will need more memory. So, you might consider installing them as separate web applications on separate Tomcat instances.

> **Note:** You do not have to use the Solr 1 search service during the upgrade process. Instead, you can let Solr 4 build its indexes, but during this time, any search carried out might return incomplete results. This is because only those documents that have been indexed are available for searching. Set the `NoIndex` option to avoid incomplete and/or misleading results. For more information, see [transactional metadata query]({% link content-services/5.2/admin/search.md %}#transactional-metadata-query).

**Solr 4 suggester configuration**

Alfresco Content Services uses the suggester component in Solr to provide users with automatic suggestions for query terms.

-   With new Alfresco Content Services 5.2.7 installations, the suggester is enabled for the workspace store, by default.
-   If you are upgrading to Alfresco Content Services 5.2.7 with Solr 4, before building the new index, we recommend that you disable the suggester property in the `<solrRootDir>/workspace-SpacesStore/conf/solrcore.properties` file:

    ```text
    solr.suggester.enabled=false
    ```

    This is because on a low specification system, building the suggester can cause CPU and IO load issues, which can affect other operations. When the Solr 4 index is up to date, the `solr.suggester.enabled` property can be reset to `true`.

    The Solr 4 suggester holds a view of the index. Normally, there is only one live view of the index. An old view can exist for a few seconds or minutes until all the running queries are complete. If there are two or more live views of the index, index tracking will not run. This only happens while the suggester is being build and if the process of building the suggester is slow. To solve this issue, you can configure how often the suggester will run, if it is enabled.

An out-of-the-box Alfresco Content Services application allows you to use three word phrase suggestions across the repository. Suggestions are not limited by permissions. To limit the scope, you can configure the suggester to use single words or two word phrases by changing schema.xml before you rebuild the index.

### Upgrading from Lucene to Solr 4 search

Older versions of Alfresco Content Services use the Lucene search server. You can upgrade from Alfresco Content Services 4.x with the Lucene search server to Alfresco Content Services 5.2.7 with the Solr 4 search server.

> **Note:** This documentation refers to **Solr 1.4** search subsystem as **Solr**.

1.  For versions prior to Alfresco Content Services 4.x, upgrade to 4.x and continue to use the Lucene search subsystem as before.

2.  Install and configure Solr on Alfresco Content Services 4.x to track the repository.

    For more information, see [Installing and configuring Solr]({% link content-services/5.2/admin/search.md %}#installing-and-configuring-solr).

3.  Monitor progress using the `SUMMARY` report.

    ```http
    [http://localhost:8080/solr/admin/cores?action=SUMMARY&wt=xml](http://localhost:8080/solr/admin/cores?action=SUMMARY&wt=xml) 
    ```

4.  When the Solr index is updated as reported by the `SUMMARY` report, enable the Solr subsystem and disable the Lucene subsystem.

5.  Follow the instructions for [upgrading from Solr to Solr 4 search](#upgrading-from-solr-1.4-to-solr-4-search).

### Upgrading from Solr 1.4 to Solr 4 search

Use this information to upgrade from Alfresco Content Services 4.x with the Solr 1.4 search server to Alfresco Content Services 5.2.7 with the Solr 4 search server.

To determine the current search server, navigate to the Search Manager page at **Alfresco Share Admin Console > Repository Services > Search Service**. Select the search subsystem from the **Search Service In Use** list.

Follow the steps to migrate from Alfresco Content Services 4.x with Solr 1.4 search service to Alfresco Content Services 5.2.7 with Solr 4 search service.

1.  Upgrade to Alfresco Content Services 5.2.7 and continue to use the Solr 1.4 search service as before.

    For information on migrating the Solr 1.4 indexes with Alfresco Content Services 4.x to Solr 1.4 with Alfresco Content Services 5.2.7, see [Upgrading Solr 1.4 search service](#upgrading-the-solr-1.4-search-service).

2.  Configure Solr 4 to track the repository. For details, see [Installing and Configuring Solr 4]({% link content-services/5.2/admin/search.md %}#installing-and-configuring-solr).

3.  While Solr 4 builds its indexes, you can monitor progress using the `SUMMARY` report.

    ```http
    [http://localhost:8080/solr4/admin/cores?action=SUMMARY&wt=xml](http://localhost:8080/solr4/admin/cores?action=SUMMARY&wt=xml) 
    ```

    For details, see the [Unindexed Solr Transactions]({% link content-services/5.2/admin/search.md %}#unindexed-solr-transactions) topic.

4.  Optionally, you can use the Solr Admin Web interface to view Solr configuration details, run queries, and analyze document fields.

    1.  Open the FireFox **Certificate Manager** by selecting **Firefox > Preferences... > Advanced > Certificates > View Certificates > Your Certificates**.

    2.  Import the browser keystore `browser.p12` that is located in your `<ALFRESCO_HOME>/alf_data/keystore` directory.

    3.  Enter the password `alfresco`.

        A window displays showing that the keystore has been imported successfully. The **Certificate Manager** now contains the imported keystore with the repository certificate under the **Your Certificates** tab.

    4.  Close the **Certificate Manager** by clicking **OK**.

    5.  In the browser, navigate to a Solr URL.

        For example, use [http://localhost:8080/solr](http://localhost:8080/solr) for Solr and [http://localhost:8080/solr4](http://localhost:8080/solr) for Solr 4.

        The browser displays an error message window to indicate that the connection is untrusted. This is due to the Alfresco certificate not being tied to the server IP address. In this case, view the certificate and confirm that it is signed by the Alfresco Certificate Authority.

    6.  Expand **I understand the risks**.

    7.  Select **Add Exception**.

    8.  Click **View**.

        This displays the certificate.

    9.  Confirm that the certificate was issued by Alfresco Certificate Authority, and then confirm the **Security Exception**.

    Access to Solr 1.4/Solr 4 is then granted. The Solr Admin page is displayed. It is divided into two parts.

    The left-side of the screen is a menu under the Solr logo that provides navigation through various screens. The first set of links are for system-level information and configuration and provide access to Logging, Core Admin and Java Properties. At the end of this information is a list of Solr cores configured for this instance of Alfresco Content Services.

    The center of the screen shows the detail of the Solr core selected, such as statistics, summary report, and so on.

5.  Monitor the progress of both the Solr 1.4 and Solr 4.0 subsystems via the JMX client or the `SUMMARY` report.

    > **Important:** Do not use the Alfresco Share **Admin Console** tool to monitor the status of the subsystems as it will change the subsystem used for query. Only use the JMX client.

6.  When the index is updated as reported by the `SUMMARY` report, you can use the `REPORT` option and check the following:

    -   In the `REPORT` option, node count should match the number of live nodes in the repository (assuming nothing is changing and the index is updated). The index contains a document for failed nodes, so failures need to be considered separately.
    -   Any missing transactions; if there are issues, use the `FIX` option.

        ```http
        [http://localhost:8080/solr4/admin/cores?action=FIX](http://localhost:8080/solr4/admin/cores?action=FIX)
        ```

        For more information, see the [Troubleshooting Solr Index]({% link content-services/5.2/admin/search.md %}#troubleshooting-solr-index) topic.

    -   Find errors with specific nodes using `DOC_TYPE:ErrorNode` option.

        ```http
        [https://localhost:8446/solr4/alfresco/afts?q=DOC_TYPE:ErrorNode](https://localhost:8446/solr4/alfresco/afts?q=DOC_TYPE:ErrorNode) 
        ```

    -   If there are any issues, use the `REINDEX` option with the relevant node id.

        ```http
        [http://localhost:8080/solr4/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4](http://localhost:8080/solr4/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4) 
        ```

        For more information, see the [Troubleshooting Solr Index]({% link content-services/5.2/admin/search.md %}#troubleshooting-solr-index) topic.

7.  When the Solr 4 index is updated, you must enable the Solr 4 subsystem and disable the Solr 1.4 subsystem.

8.  *(Optional)* To decommission (now redundant) Solr 1.4, follow the steps below:

    1.  Stop the Solr 1.4 search service.

    2.  Delete the solr directory from `<ALFRESCO_HOME>/tomcat/webapps`.

    3.  Delete the solr.xml file from `<ALFRESCO_HOME>tomcat/conf/Catalina/localhost`.

    4.  Delete the solr directory from `<ALFRESCO_HOME>/alf_data`.

#### Upgrading the Solr 1.4 search service {#upgrading-the-solr-1.4-search-service}

To upgrade to the Solr 1.4 search service, whilst the Solr 4 indexes are being built, you must transition from a previous version of Alfresco Content Services (for example, version 4.2.x) with the Solr 1.4 search service to Alfresco Content Services 5.2.7 with the Solr 1.4 search service.

1.  Install Alfresco Content Services 5.2.7 with both the Solr 1.4 and Solr 4 search services.

2.  From your old Solr 1.4 installation, copy all the indexes to the new Solr 1.4 installation.

    1.  Copy the alf_data/solr/workspace/SpacesStore/index directory from the old Solr 1.4 installation to the alf_data/solr/workspace/SpacesStore/index directory of the new Solr 1.4 installation.

    2.  Copy the alf_data/solr/archive/SpacesStore/index directory from the old Solr 1.4 installation to the alf_data/solr/archive/SpacesStore/index directory of the new Solr 1.4 installation.

3.  Reapply the configuration changes made to the `solrcore.properties` file of the old Solr 1.4 installation to the solrcore.properties file of the new Solr 1.4 installation.

    1.  Reapply the changes made to the `alf_data/solr/workspace-SpacesStore/conf/solrcore.properties` file from the old Solr 1.4 installation to the `alf_data/solr/workspace-SpacesStore/conf/solrcore.properties` file of the new Solr 1.4 installation.

    2.  Reapply the changes made to the `alf_data/solr/archive-SpacesStore/conf/solrcore.properties` file from the old Solr 1.4 installation to the `alf_data/solr/archive-SpacesStore/conf/solrcore.properties` file of the new Solr 1.4 installation.

4.  Ensure that your Alfresco Content Services 5.2.7 instance is set to use Solr 1.4 search service during this process.

To validate that your old Solr 1.4 indexes and configuration changes are correctly copied over to the new Solr 1.4 installation, follow these steps:

1.  Run Alfresco Content Services 4.x with the old Solr 1.4 installation, and then run Alfresco Content Services 5.2.7 with the new Solr 1.4 installation.
2.  Generate and save the SUMMARY report for both the old and the new Solr indexes.
3.  Compare the two SUMMARY reports to ensure that both have the same number of nodes, transactions, and ACLs.

## Validating an upgrade

Once you have upgraded, follow these steps to validate the new installation.

1.  Restart the Alfresco Content Services server.

    The configuration overrides ensure the server immediately directs data to the appropriate locations.

2.  Monitor the startup log messages for information on the status of the upgrade.

3.  Validate the new installation using a blank repository.

4.  Configure the new installation with a new repository (not the existing one).

5.  Verify the database connection details and data folder locations are set according to the environment in which the server is running.

6.  Start Alfresco Content Services and validate the system works correctly.

7.  Shut down Alfresco Content Services.

8.  When you are certain the new installation is thoroughly validated, remove the old installation and repository.

## Testing an upgrade

Testing an upgrade checks that Alfresco Content Services is successfully upgraded and is working as expected after the upgrade.

### Test and familiarize after upgrading

You have successfully upgraded. Now test that the core features and functionalities that you intend to use work as expected.

Here are some of the tips to help you familiarize yourself.

> **Note:** We recommend that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

-   Check if the roles users had in the previous version are still valid in the new upgraded version.
-   Check if your data or document in the previous version are available in the new upgraded version.

### Test the Alfresco Content Services server after customizing an upgrade

There are a number of tests that you can perform after customizing an upgrade.

-   Make sure that the server is up and running.
-   Make sure that the errors in the alfresco.log file. are checked and understood.

### Test and familiarize after upgrading and configuring

You have successfully upgraded and configured Alfresco Content Services. Now make sure that the features and customizations you have added are operational.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

-   Check if the users or groups created previously, still exist.
-   Check if all the dashboards created previously, still exist.
-   Check if the folders in the document library that were created prior to the upgrade, still exist.

### Test and familiarize after upgrading in a cluster

You have successfully upgraded and configured Alfresco Content Services in a distributed/clustered environment. Now make sure that the features and customizations you have added are operational.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

-   Check that various components are communicating with each other.
-   For a clustered upgrade, check if one node is down, check if the request is forwarded to the next available node.

### Test and familiarize after upgrading and configuring in a cluster

You have successfully upgraded and configured Alfresco Content Services in a distributed/clustered environment. Now make sure that the features and customizations you have added are operational.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

-   Check if the users or groups created previously, still exist.
-   Check if all the dashboards created previously, still exist.
-   Check if the folders in the document library that were created prior to the upgrade, still exist.
-   Check if clustering is working properly by running the [cluster validation tool]({% link content-services/5.2/admin/cluster.md %}#managing-members-of-a-cluster) in the Admin Console.

## Restoring production data

Use this information to restore production data.

The `dir.root` directory is defined in the `alfresco-global.properties` file. By default, this directory is named `alf_data` and is located within the directory where Alfresco Content Services is installed.

1.  Restore the backup into the new repository.

    If Solr is being used, put the following directories from your backup to the dir.root directory on a new instance.

    -   contentstore directory
    -   solr/workspace directory (optional)
    -   solr/archive directory (optional)
    -   contentstore.deleted directory

    Some of the above mentioned directories are optional. This is because if the indexes are not copied over from the previous installation, Solr will query Alfresco Content Services and rebuild its index in background after the startup. It may take more time to rebuild indexes on large repositories. Applications will be accessible during reindex process.

2.  Point the new deployment to the old database via the `db.*` properties in `alfresco-global.properties` by providing the JDBC URL, database name, login credentials, and any other relevant configuration options. Remember to specify the relevant JDBC driver into your application server's classpath.
