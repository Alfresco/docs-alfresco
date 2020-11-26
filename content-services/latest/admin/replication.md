---
title: Set up and manage content replication
---

You can automatically replicate folders and content between repositories using replication jobs. These jobs are controlled by the replication service, which finds content that needs to be replicated and then calls the transfer service to carry out the replication. Replication suits an environment where you're running multiple, separate instances of Content Services and then replicating a subset of the content between these servers.

Content replication is designed to assist geographically distributed deployments where performance may be affected by network latency or bandwidth limitations.

* Fast access by serving content from local servers
* High availability - removes the single point of failure

For network administrators replication provides:

* Reduced network overhead

By default, replicated content is read-only on the target repository. This ensures the integrity of the content is not compromised by uncontrolled updates. An option is provided in the Alfresco Share user interface for users to navigate to the content's source repository to make any updates.

The replication service controls content replication between different repositories. The replication service is responsible for persisting replication jobs that specify what is to be replicated, to where, and when. In addition, it monitors the status of currently executing replication jobs and enables replications to be canceled.

The replication service finds the nodes that need to be transferred, and then it delegates the transfer of content to the transfer service.

Replication jobs are managed in the Alfresco Share Admin Tools.

> **Note:** You can't run simultaneous replication jobs. If you send two replication jobs to a target repository at the same time, the first job received by the repository runs without issue. The second job attempts to run but fails with an error.

## Configure content replication

You can configure Content Services to replicate content between source and target repositories.

1. Shut down the server on the source and target repositories.

2. In the source repository, open the `alfresco-global.properties` file and make the following updates:

    Set the `replication.enabled` property to `true`:

    ```text
    replication.enabled=true
    ```

    > **Note:** If this line is not present in the `alfresco-global.properties` file or the value is set to `false`, you'll not be able to run any replication jobs. You might see this error message in Share:

    ![replicate]({% link content-services/images/replicate.png %})

    Alternatively, you can enable content replication from the Admin Console. See [Enabling the replication service](#enablereplication) for more information.

3. Save the file.

4. In the target repository, open the `alfresco-global.properties` file and make the following updates:

    1. Set the `transferservice.receiver.enabled` property to `true`:

        ```text
        transferservice.receiver.enabled=true
        ```

5. Save the file.

6. Restart both source and target repositories.

7. Configure the Alfresco Share URL to allow access to the source repository, as specified in [Opening locked content in the source repository](#openlockedcontentinsrcrepo).

8. Create a transfer target, as specified in [Creating a new transfer target for content replication](#createnewtransfertarget).

## Enable the Replication Service {#enablereplication}

The **Replication Service** in the Repo Admin Console displays the settings to enable or disable the replication service and to control permissions.

The replication service allows content to be replicated (transferred) between distinct Content Services repositories.

| Property | Description |
| -------- | ----------- |
| Replication Enabled | Enables or disables the ability to replicate content from this repository. |
| Replicate Read Only | Enables or disables the permission settings for replicas in the target repository. The default setting is `enabled`, which sets the replicas as read-only. Replicas are normally read-only to enforce integrity. This option should only be disabled for specific use cases. |

## Open locked content in the source repository {#openlockedcontentinsrcrepo}

For replication jobs, you must configure Content Services to open a locked node in the source repository, where it can be edited. This is configured by mapping the remote repository identifier (`repositoryId`) and the URL, which gives access the remote repository.

1. On the source repository, locate your current `repositoryId` in **Repo Admin Console > General > Repository Information**:

    ```http
    http://localhost:8080/alfresco/s/enterprise/admin/admin-repositoryinfo
    ```

2. On the target repository, save the `<web-extension>\share-config-custom.xml.sample` file as `<web-extension>\share-config-custom.xml`.

    1. Locate the following example configuration in your `<web-extension>\share-config-custom.xml` file:

        ```xml
         <config evaluator="string-compare" condition="Replication">
              <share-urls>
                    Example config entry:
                      <share-url repositoryId="622f9533-2a1e-48fe-af4e-ee9e41667ea4">http://new-york-office:8080/share/</share-url>
              </share-urls>
           </config>
        ```

    2. Uncomment the `<share-url>` element.

    3. Modify the `repositoryId` to match the value you located in step 1.

    4. Change the URL to point to `http://localhost:8080/share`.

    5. Save the `<web-extension>\share-config-custom.xml` file.

3. On the target repository, reload the configuration by refreshing the web scripts:

    ```http
    http://localhost:8080/share/service/index
    ```

## Create a new transfer target for content replication {#createnewtransfertarget}

The transfer service stores files that control and monitor the operation of the transfer service in the **Transfers** space in the **Data Dictionary**.

The **Transfer Target Groups** space contains the transfer target definitions that specify where transfers go to. There is a group level below the folder which is used to classify different sets of transfer targets. This folder contains a group called **Default Group**.

You can add transfer targets by creating new transfer folders.

1. In the source repository, create a new folder in **Company Home > Data Dictionary > Transfers > Transfer Target Groups > Default Group**.

    1. In the **New Folder** window specify a name, for example, Replica. You can add a title, and description of the new folder, if you wish.

        A rule defined on the **Default Group** folder specializes the type of any folder created in it.

        The type is set automatically by the folder rule to `trx:transferTarget`. This allows you add the required properties to define the replication target through the user interface.

    2. Click **Edit Properties** on your new folder (Replica).

    3. Specify the required properties:

        1. Specify the **Endpoint Host**, **Endpoint Port**, **Username** and **Password**.
        2. Click **Enabled** and **Save**.

    4. Enable the replication service in your `alfresco-global.properties` file:

        ```text
        replication.enabled=true
        ```

        and restart the source repository.

2. In the target repository, enable the replication server and content receiver in the `alfresco-global.properties` file:

    ```text
    replication.enabled=true
    transferservice.receiver.enabled=true
    ```

    and restart the target repository.

3. On the source repository, create a replication job to test the target setup.

    1. From the toolbar, click **Admin Tools** and select **Replication Jobs** from the menu.

    2. Click **Create Job**.

    3. Specify properties for **Name**, **Payload**, **Transfer Target**.

        Name is a new folder name; for example, `Replication Job`. Payload is the source content directory, and Transfer Target is the folder name that you set up in step 1 (Replica).

    4. Click **Enabled**.

    5. Click **Create Job**.

    6. Refresh the screen after a few minutes to see a status change.

4. Verify the replication job.

    Log in to Alfresco Share on the target repository, select a transferred file and click **Open in Source Repository** to check that content has replicated.

## Manage replication jobs {#managereplicationjobs}

The Replication Jobs tool in Alfresco Share Admin Tools enables you to create and manage jobs for content replication.

A replication job specifies the content to be replicated; the day and time the job is to be performed; and the target location for the replicated content.

The job is controlled by the Replication Service, and it calls the Transfer Service, which allows folders and content to be automatically copied between repositories. A replication job can be run according to a schedule or on-demand.

By default, any replicated content is read-only in the target repository. This ensures the integrity of the content is not affected by uncontrolled updates.

### View replication job

Select a replication job to view the job details and display the available actions.

1. Click **Admin Tools**, and then click **Replication Jobs**.

    The **Replication Jobs** page displays a summary of recently run jobs and a list of existing replication jobs. In this list, use the menu provided to sort the jobs by Status, Name, and Last Run Date.

2. In the **Jobs** section, click a job to view its details.

    The job appears highlighted in the list and its details appear on the right side of the page.

### Create new replication job

You can create any number of replication jobs to suit your needs.

1. Click **Admin Tools**, and then click **Replication Jobs**.

2. In the **Jobs** section, click **Create Job**.

    The **Create New Replication Job** page appears. Fields marked with an asterisk (*) are required.

3. Enter the details for the new replication job.

    1. Enter a **name** for the job, and enter a **description**, if required.

    2. In the **Payload** section, click **Select**.

        Navigate the repository and click **Add** to the right of each space that you want to include in the payload. This content will be replicated (copied) when the job is run. Click **OK**.

    3. In the **Transfer Target** section, click **Select**.

        Navigate the **Transfer Target Groups** and click **Select** to the right of the target. Click **OK**.

        > **Note:** Out of the box, one target group, **Default Group**, is available. Create additional target groups in **Data Dictionary > Transfers > Transfer Target Group**. A rule defined on the Transfer Target Groups folder specializes the type of any folder created within it.

        See [Creating a new transfer target for content replication](#createnewtransfertarget) for more information.

    4. Specify when you want the replication job to run.

        Select the **Schedule job** check box, then enter the date and time the job is to run. Specify the repeat period for this job.

    5. Select the **Enabled** check box to enable to replication job to run.

        > **Note:** You must enable a replication job for it to be run.

4. Click **Create Job**.

    The job created appears highlighted in the Jobs list. The job details appear on the right side of the page.

### Manage existing jobs

The **Replication Jobs** page in **Admin Tools** displays a list of all existing replication jobs.

For each job in this list, you can perform any of the following actions to manage and maintain the jobs:

* Run a job
* Cancel a job
* Edit a job
* Delete a job

#### Run replication job

The **Run Job** tool allows you to run a replication job. You can do this at any time. If a schedule is set for the job, it remains in place and will be run at the appropriate time.

1. Click **Admin Tools**, and then click **Replication Jobs**.

2. In the **Jobs** section, click the job that you want to run.

    The job appears highlighted in the list and its details appear on the right side of the page.

    > **Note:** For a job to be run, it must be enabled.

3. Click **Run Job**.

    The Status section on the right side of the page indicates that the job is running. The date and time the job started is displayed.

#### Cancel replication job

You can cancel a job that is currently running, regardless of whether it was started automatically (that is, it is a scheduled job) or manually.

1. Click **Admin Tools**, and then click **Replication Jobs**.

2. In the **Jobs** section, click the currently running job that you want to cancel.

    An icon (![admin-job-run]({% link content-services/images/admin-job-run.png %}){:height="18px" width="18px"}) to the left of the job name indicates a job is currently running.

    The Status section on the right side of the page indicates the start time of the selected job.

    > **Note:** If the job was already displayed, you might need to click **Refresh** to update the status.

3. Click **Cancel Job**.

    The job is stopped and a report is created.

#### Edit replication job

You can easily update existing replication jobs. In addition to changing the job details, you can use this feature to disable a job so that it won't be run.

1. Click **Admin Tools**, and then click **Replication Jobs**.

2. In the **Jobs** section, click the job you want to edit.

    The job appears highlighted in the list and its details appear on the right side of the page.

3. Click **Edit**.

    The **Edit Replication Job** page appears.

4. Edit the replication job as necessary. All job details—name, description, payload, transfer target, and schedule—are available for editing.

    Add and remove source items as necessary. Click **Remove** to the right of a single item to remove it. Click **Remove All** beneath the list to remove all items.

    Deselect the **Enabled** check box to prevent the job from being run.

5. Click **Save**.

    The main page displays the updated job details.

#### Delete replication job

If you no longer need a replication job, you can delete it from the Jobs list. If there is a chance you might need the job again, you might prefer to edit the job and simply disable it.

1. Click **Admin Tools**, and then click **Replication Jobs**.

2. In the **Jobs** section, click the job you want to delete.

    The job appears highlighted in the list and its details appear on the right side of the page.

3. Click **Delete**.

    A message prompts you to confirm the deletion of the selected job.

4. Click **Delete**.

    The selected job is deleted from the jobs list.

### View replication job reports

Two reports—local and remote—are available for each replication job run successfully.

The local report is the transfer report from the sending system, which manages the content being transferred to the receiving system. The local report details the speed at which the files were transferred and other related details.

The remote report is the transfer report from the receiving system. This report indicates whether files were created, updated, modified, or deleted as part of the transfer.

1. Click **Admin Tools**, and then click **Replication Jobs**.

2. In the **Jobs** section, click the job you want to view.

    The job appears highlighted in the list and its details appear on the right side of the page.

3. Select a report:

    * Click **View Local Report**.
    * Click **View Remote Report**.

    The selected report displays on the details page of the Repository Document Library.

## Alfresco System Receiver (ASR)

An Alfresco System Receiver (ASR) is a deployment of Content Services that uses Replication Jobs to transfer content from an authoring repository to a standard repository.

The repository receives content from the authoring environment, allowing the presentation tier to query the content to dynamically serve it.

To set up the ASR, use [Alfresco Replication Jobs](#managereplicationjobs). Replication jobs enables the content to be published from the authoring repository to the ASR in the delivery tier.

![ASR-arch]({% link content-services/images/ASR-arch.png %})

ASR is licensed separately and is limited to allow only an administrative user and a named user to search the content. It provides read-only system access.

ASR allows you to:

* Synchronize (or duplicate) all or part of the content tree to an additional server
* Choose the synchronization interval
* Provide read-only content

An ASR does not allow you to:

* Use Alfresco Share to manage the synchronized content
* Manage user accounts (a single generic account)
* Manage specific roles and rights (one user)

The following diagram shows an ASR as a content repository that is queried to publish a web project.

![ASR]({% link content-services/images/ASR.png %})

The ASR ensures that only the changes between versions are transmitted. The result of the deployment is a runtime version of the website.
