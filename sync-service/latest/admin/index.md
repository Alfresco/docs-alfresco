---
title: Administration overview
---

This information provides an overview of the Sync Service, and helps you to monitor and administer it.

## Sync Service architecture

With Alfresco Desktop Sync, users can sync content between their desktop and the repository. Use this information to find out more about the components of the Sync Service and the flow of information between the repository and the desktop during the synchronization process.

> **Important:** Desktop Sync will replicate content on local desktops for users with the appropriate access. If replication outside the repository is not allowed by your content policy you should not deploy Desktop Sync.

> **Important:** Desktop Sync can't synchronize content that appears in Smart Folders.

The Sync Service synchronizes files between the desktop and the repository using web services. The application currently synchronizes files in the document library of any site a user has access to. Because the content is synchronized automatically between both sides, the users can easily share information between devices. This allows for easy, automatic updates and backup of your data. Share automatically recognizes the updates made to the content via the device and adopts them by synchronizing the data.

### Components of Desktop Sync

The main components of the Desktop Sync application are:

1. **Repository**: This is the repository where the files, indexes, and database resides.
2. **Active MQ**: This is where the Alfresco repository writes messages about changes to the files, folders, subscriptions and device registrations.
3. **Sync Service:** This service keeps a record of all the changes. It manages a set of devices and computes the differences between the copy that all devices have of content, and the content that Alfresco repository has of the content.
4. **Device**: This specifies the desktop with which the user interacts. It receives and adds content from/to the repository directly.

![Desktop Sync components]({% link sync-service/images/sync-process.png %})

### Information flow

The synchronization process is based on the concept that the repository will publish messages when events happen that may be of interest to the clients. The clients then request the relevant events and use the information to stay in sync with the repository.

The Alfresco repository communicates any changes made to the files, folders, subscriptions and device registrations via a queue. The Sync Service reads the messages in the queue and persists the changes in the database. It determines and records whether the device copy of a particular file differs from the repository. The device makes a `GET` change service request to the Sync Service to get an update on any resources that have changed since the device was last synced. The Sync Service communicates the changes (if any) to the device. The device then uses CMIS and the changed data from the Sync Service to bring the client and the repository in sync.

The desktop can register and synchronize content directly to the repository.

## Desktop Sync process

When you log in to Desktop Sync for the first time, your device gets registered using the REST API in the repository Sync AMP. This creates an association in the repository between the person node and the device node.

Furthermore, when you subscribe to a folder, this creates an association representing the node that you have subscribed to.

The repository sends events to an ActiveMQ topic when:

* a device is registered or de-registered
* a node subscription is created or removed
* a node is added
* a node is removed
* a node is renamed
* a node is moved
* node content is changed
* node Permissions are changed
* User / Group is added to new or existing group
* User / Group is removed from a group
* a node is checked out, checked in and cancelled checked out
* a file / Folder is classified (requires Alfresco Records Management/Alfresco Governance Services)
* a file is declared as Record (requires Alfresco Records Management/Alfresco Governance Services)

> **Important:** If ActiveMQ is unavailable, the Alfresco instance will become read-only and no transactions will be committed.

The synchronization service consumes the events from the topic and persists them to the synchronization server PostgreSQL database. This is transactional - so if Postgres is down or unavailable, the events will remain in the ActiveMQ topic and the synchronization service will retry until the events have been successfully persisted to the database.

When a user subscribes to a folder in the repository, the Desktop Sync client performs a tree-walk against the repository (using the CMIS API). The folder structure and content is synced to the Desktop Sync client device. The Desktop Sync client will then poll the synchronization service for changes every 5 minutes, by default. Changes on the device will trigger a poll of the synchronization service for changes. The synchronization service responds with a set of events that represent what has changed in that folder since the last poll request. Based on that, the client determines what changes need to be pushed to the repository, what changes need to be pulled from the repository and which content is in conflict.

Note that the synchronization service doesn't store any authentication information, instead it proxies (and caches for a configurable period of time) authentication from Desktop Sync client poll requests to the repository authentication APIs.

> **Note:** In this release of Sync Service, the Desktop Sync clients support SAML authentication with the Identity Service. Desktop Sync also supports basic authentication with Alfresco Content Services where Identity Service is not being used.

## Limit folder synchronization

If you're an IT administrator, you can prevent folders being synchronized from the repository to Desktop Sync clients. This allows you to have granular control over the content that your Desktop Sync users can access on their desktops.

The main stages for this configuration are: create a custom model with an associated aspect, create a folder rule in Alfresco Share to automatically apply the aspect to new content, add the aspect to existing content, and then update the configuration in Alfresco Content Services.

1. Create a custom model from the **Model Manager** in Alfresco Share **Admin Tools**.

    Follow the steps in [Creating a new model]({% link content-services/latest/config/models.md %}#create-a-content-model).

    Note that you don't need to create a property for the custom model.

2. Click the model name to start creating an associated aspect.

    Follow the steps for [Creating new aspects]({% link content-services/latest/config/models.md %}#custom-types-aspects-and-properties).

    Add a **Display Label** for the aspect so you can identify it in Alfresco Share later.

3. Activate the custom model.

    1. Click **<< Show Models** to return to the list of models.

    2. Click **Actions** and then select **Activate**.

    The status is now **Active**. Active models can be used by your end users, and any custom aspects defined within the model can be applied to folders and files.

4. Access a site in the repository and view the folder within that site that you don't want to be synced.

    For example, you may choose not to sync the **documentLibrary** folder.

5. Create a folder rule that applies the aspect to newly created and updated content.

    Follow the steps in [Defining rules for a folder]({% link content-services/latest/using/content/rules.md %}#defining-rules-for-a-folder).

    Make sure you select the **Rule applies to subfolders** check box, so that the new aspect is automatically applied to new content added to the current folder and subfolders.

    See [Folder rules]({% link content-services/latest/using/content/rules.md %}) for more details.

6. Update the following property in `alfresco-global.properties` to include your custom model and aspect:

    ```bash
    dsync.filter.aspects=cm:workingcopy, ${dsync.filter.aspects.smartFolder}, <your_model>:<your_aspect>
    ```

    where:

    * `<your_model>` specifies the model name created in step 1
    * `<your_aspect>` specifies the aspect name created in step 2

7. Restart Alfresco Content Services.

> **Note:** Apply the new aspect to all existing content in the folder, and subfolders. Adding an aspect manually to existing folders doesn't cascade the extra functionality down the hierarchy. See [Applying aspects]({% link content-services/latest/using/content/files-folders.md %}#applyaspects) for more details.

> **Important:** Applying this property after users have synchronized folders and files won't automatically remove their existing synced content.

## Back up and restore Sync Service

The approach to backup and restore is to ensure that the repository is backed up before the Sync Service, so that a subsequent restore can simply remove any tracked repository changes that occurred after the repository backup.

1. To perform a backup of your Sync Service database, follow these steps:

    1. Backup your repository database. See [Back up and restore]({% link content-services/latest/admin/backup-restore.md %}).

    2. After you have successfully backed up the repository, wait for a couple of minutes to ensure that the synchronization server has correctly tracked the repository after the repository backup.

    3. Alternatively, ensure that all undelivered events in the event queue, `Consumer.<guid>.alfresco.repo.event2` have been delivered such that `Messages Dequeued == Number Of Pending Messages`. Here, `guid` is the synchronization server id, which can be determined from the `syncServiceIdCheck` in the health check response, `https://localhost:9090/alfresco/healthcheck`.

    4. Backup your synchronization service database using your database vendor's backup/restore tools.

2. To perform a restore, follow these steps:

    1. Use the ActiveMQ console to check that all the events in the event queue, `Consumer.<guid>.alfresco.repo.event2` have been consumed. Using the ActiveMQ console, you can either:

        * Remove any undelivered events in the Virtual Topic, `alfresco.repo.event2` and associated queue, `Consumer.<guid>.alfresco.repo.event2`.
        * Delete the Virtual Topic, `alfresco.repo.event2` and associated queue, `Consumer.<guid>.alfresco.repo.event2`.

        Here, `guid` is the synchronization server id, which can be determined from the `syncServiceIdCheck` in the health check response, `https://localhost:9090/alfresco/healthcheck`.

        Note that the Virtual Topic and associated queue will be recreated automatically.

    2. Restore the repository database. See [Back up and restore the repository]({% link content-services/latest/admin/backup-restore.md %}).

    3. Restore the Sync Service database using your database vendor's backup/restore tools.

    4. Restart the Sync Service with the following additional command line parameter:

        ```bash
        -Drecover=<repo admin username>:<repo admin password>
        ```

        The Sync Service will ensure that it and the repository are in sync during bootstrap, before becoming available for requests.
