---
title: Project deployment
--- 

The **DevOps** section of the Admin Application is used to deploy projects and manage and upgrade applications.

## Project releases

The **Project Releases** section displays a list of all [released projects]({% link process-automation/latest/model/projects.md %}#release-a-project) created in the Modeling Application.

 > **Note**: If you can't find your project in the list, make sure it has been released.

To release a project:

1. Sign in to the Modeling Application.

2. Find or search for your project in the list of projects.

3. Select the **Release** action from the **Options** column for the project.

4. Enter a **Name** for the release and optionally add a **Comment**.

### Properties {#project-properties}

The properties for a released project are:

| Property | Description |
| -------- | ----------- |
| Project Name | Displays the release name of the project. |
| Created By | Displays which user released the project. |
| Created | The time lapsed since the version of the project was released. |
| Comment | Displays the comment entered when the new project was released. |
| Uploaded | An icon displays if the project was uploaded. |
| Latest project release | The version number of the project. |
| Actions | A list of actions that can be made against the released project: {::nomarkdown} <ul><li><b>Download</b> Bundles the project contents into a zipped folder to import it into a different environment.</li><li><b>Restore this release</b> Allows you to restore the release to this version. If you use this action the current models of the project will be replaced with those present in the release. If you want to preserve your current status you must create another release which you can restore it later.</li><li><b>Edit release</b> You can change the name of the release or update the comment made about it.</li></ul>{:/} |

### Deployment

After choosing to **Deploy** a released project, there are a number of configuration settings required depending on the contents of the project.

> **Note**: When a project is deployed, a [deployment descriptor](#deployment-descriptors) is created. Deployment descriptors can be exported from one environment and imported into another, for example between test and production. See the [deployment service architecture]({% link process-automation/latest/admin/architecture.md %}#deployment-service) for further details on the deployment process.

{% capture name %}

All projects require an application name for when they are deployed.

> **Reminder**: Projects are referred to as applications when they are deployed.

1. Provide an **Application Name** for the project. The name must be unique and must be in lowercase and between 1 and 26 characters in length. Alphanumeric characters and hyphens are allowed, however the name must begin with a letter and end alphanumerically, for example: `finance-application`.

2. Select which released version of the project to deploy.

{% endcapture %}
{% capture admin %}

All applications require at least one administrator to manage the application. Administrators have access to the [Process Admin]({% link process-automation/latest/admin/monitor.md %}) actions for an application.

Select a user or group to administer the application. The user or group must exist and cannot be set as a static value.

{% endcapture %}
{% capture user %}

The users selected for an application are those able to start process instances and tasks for it.

> **Note**: Any users or groups that were assigned to [user tasks]({% link process-automation/latest/model/processes/bpmn.md %}#user-task) using the **Identity** method will already be entered in this field.

Select the users and groups that can access the application. The users and groups must exist and cannot be set as static values.

{% endcapture %}
{% capture connector %}

> **Note**: This tab will not appear if there are no [connectors]({% link process-automation/latest/model/connectors/index.md %}) in the project being deployed.

Applications that contain connectors need to have their [configuration parameters]({% link process-automation/latest/model/connectors/index.md %}#configuration-parameters) set.

All parameters will appear as key value pairs and additional pairs can be added by clicking **Add config variable**.

Any default values, or values entered whilst modeling the project will be pre-filled but can still be updated.

{% endcapture %}
{% capture storage %}

The storage options are used to set the default location for where data related to a process is stored. This data includes content uploaded from [attach file fields]({% link process-automation/latest/model/forms.md %}#attach-file-fields) in forms, [generated documents]({% link process-automation/latest/model/connectors/generate.md %}), [signed documents]({% link process-automation/latest/model/connectors/docusign.md %}) and content edited using the [content connector]({% link process-automation/latest/model/connectors/content.md %}).

> **Note**: The default location set for the application storage will be used to store the content from the above actions if none of the target locations are set in their configuration. For example, if `targetFile`, `targetFolder`, `targetFolderId` and `targetFolderPath` are not set for the DocuSign connector, the signed document will be stored in the default storage location.

The options for the storage location are:

* **Store content in the following ACS site** can use an existing site in the repository to store the data or create a new one as part of the deployment process.

* **Store content in the folder with the following relative path** can store the application data in a specific folder rather than a site.

> **Important**: Connectors can read and write from files and folders outside of the default storage location, however the service accounts must be given explicit [permission]({% link process-automation/latest/model/connectors/index.md %}#permissions) to read and write to those files and folders.

> **Important**: Users filling in forms with an [attach file field]({% link process-automation/latest/model/forms.md %}#attach-file-fields) must be given explicit permission to the upload directory if it is outside of the default storage location for the application.

{% endcapture %}

{% include tabs.html tableid="deploy-steps" opt1="Application Name" content1=name opt2="Admin Access" content2=admin opt3="User Access" content3=user opt4="Connectors" content4=connector opt5="Storage" content5=storage %}

After clicking **Create** the deployment descriptor will be created and the application deployed, if **Deploy** was selected.

### Delete

You can delete a released project from the Admin App by selecting the three dots next to the project you want to delete and select **Delete**.

### Promote a project release from one environment to another

You can download a project release and then upload it to another environment. This is useful because you can test a new project release on a staging environment and then upload it to a production environment.

To upload a project release to another environment:

1. Navigate to the project where you want to download the project release.  

2. On the Releases window click the three dots next to the release you want to upload to another environment and then click **Download**.

    A zip file of the project release is created and downloads to your machine.

3. Navigate to the environment where you want to upload the project release.

4. Navigate to the project where you want to upload the project release.

5. Go to the Releases window and click the **Upload** icon.

6. Select the project release you created earlier.

Once you have uploaded the project release it will appear in the list of project releases you have on the Releases window.

## Deployment descriptors

The **Deployment Descriptors** section displays a list of all deployment descriptors in the environment. These are created by the [deployment service]({% link process-automation/latest/admin/architecture.md %}#deployment-service) whenever a project is deployed.

Deployment descriptors are fully configured projects that can be exported and imported between environments, for example between test and production.

### Properties {#deploy-properties}

The properties for deployment descriptors are:

| Property | Description |
| -------- | ----------- |
| Name | The name of the descriptor and the name that will be used for the application. |
| Status | The status of the descriptor. Once it has been created it will display as `DescriptorCreated`. |
| Created | The date and time the descriptor was created. |
| Modified | The date and time since the descriptor was last modified. |

### Export and import

Deployment descriptors can be exported as `.zip` files using the **Export Deployment Descriptor** option against a specific descriptor.

A previously exported deployment descriptor can be imported using the **Import** button in the **Deployment Descriptors** page.

> **Note**: A deployment descriptor cannot be imported if it uses the same name as a deployment descriptor that already exists.

## Application instances

The **Application Instances** section displays a list of all deployed applications, and applications currently in the process of being deployed. Applications can have their permissions updated.

> **Reminder:** Projects are referred to as applications when they are deployed.

### Properties {#application-properties}

The properties for application instances are:

| Property | Description |
| -------- | ----------- |
| Application name | The name of the application. |
| Project release | Number of the latest project release. |
| Runtime version | Version of software on which the application is running. |
| Updated | Date of the last update of the application. |
| Created | The time since the application was deployed. |
| Status | The status of the application. Once fully deployed it will display as `Running`. |
| Workspace | A link to the [user interface]({% link process-automation/latest/model/interfaces.md %}) for the application. |

### Undeploy

The **Undeploy** action removes a deployed application.

> **Important**: Undeploying an application will remove all data related to the application including processes and tasks. It is not possible to retrieve this data once an application has been undeployed.

### Manage permissions

The **Manage Permissions** option allows for additional users to be granted user or administrator access to an application without having to upgrade it.

### Monitoring

You can monitor the health of your installation by using the Monitoring dashboard. There is a dashboard for each deployed application.

To access the dashboard.

1. Log in to the Alfresco Admin App.

2. Expand **Devops** from the left pane and select **Application Instances**.

3. Click the three dots next to the application you want to monitor and select **Monitoring**.

You will see the Monitoring dashboard for the application. Services that are operational have a green dot. Services that are operational but may have some problems have a yellow dot. **Note:** Generally these problems fix automatically. Services that are not operating and require assistance have a red dot. Services that have an unknown state have a grey dot. To gain more insight into a service you can expand it to see more detailed information.

![monitoring dashboard]({% link process-automation/images/monitoring-dashboard.png %})

### Upgrade

Upgrading an application allows for a new version of a released project to be deployed to an existing application. Tasks and process instances that are in progress and based on a previous application version can still be completed, however any new ones started will use the new model definitions. An application can be upgraded to a released project version that is lower than the one currently deployed, however the application version will still increment.

> **Note:** The upgrade process is transactional, which means that if there is an error during the upgrade process the application is automatically rolled back to the previous stable version.

The version of an application is incremental and independent of the released project version, for example:

| Released project version | Application version |
| :----------------------: | :-----------------: |
| 1 | 1 |
| 2 | 2 |
| 4 | 3 |
| 5 | 4 |
| 3 | 5 |
| 10 | 6 |

The upgrade process displays the same configuration as [deploying](#deployment) an application. The only field that cannot be changed when upgrading is the application name.

To upgrade an application:

1. Log in to the Alfresco Admin App.

2. Expand **Devops** from the left pane and select **Application Instances**.

3. Click the three dots next to the application you want to upgrade.

4. Select **Upgrade**.

5. Select the details you want to upgrade and click **Upgrade**.

### Update runtime version

Regularly updating your application to the latest runtime version is a best practice.

To update the runtime version:

1. Log in to the Alfresco Admin App.

2. Expand **Devops** from the left pane and select **Application Instances**.

3. Click the three dots next to the application you want to update.

4. Select **Update runtime version**.

### Logs

You can view Deployment Service Logs, Runtime Bundle Logs, and Process Storage Logs to help understand any errors you may be having with your installation. The Deployment Service Logs are always available because they belong to a shared service. The logs use different blue highlighting to indicate the app being viewed. The Runtime Bundle Logs and the Storage Logs are unavailable if the app is not deployed correctly.

To view the logs:

1. Log in to the Alfresco Admin App.

2. Expand **Devops** from the left pane and select **Application Instances**.

3. Click the three dots next to the application you want review.

4. Select **Logs** and then the logs you want to view.

The log text is color coded. White indicates no issue. Yellow indicates a warning, and Red indicates an error.

### Development configuration

If local development is enabled, you can see the variables required for it, such as a client id, after clicking **Development configuration**.