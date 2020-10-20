---
title: Project deployment
--- 

The **DevOps** section of the Admin Application is used to deploy projects and manage and upgrade applications.

## Project releases

The **Project Releases** section displays a list of all [released projects]({% link process-automation/latest/model/projects.md %}#release-a-project) created in the Modeling Application.

> **Note**: If you can't find your project in the list, make sure it has been released. To release a project:
> 1. Sign into the Modeling Application.
> 2. Find or search for your project in the list of projects.
> 3. Select the **Release** action from the **Options** column for the project.

There are two options for deploying a released project. Both are available by selecting the options against a released project:

* **Create Deployment Descriptor** steps through the configuration for deploying a project, but stops short of actually deploying the project. This allows the descriptor to be exported from one environment and imported into another, for example between test and production. A deployment descriptor can be subsequently deployed.

* **Deploy** steps through the configuration for deploying a project and deploys the project into its own namespace.

> **Note**: Even if directly deploying a project, a deployment descriptor is still created.

### Properties {#project-properties}

The properties for a released project are:

| Property | Description |
| -------- | ----------- |
| Project Name | The name of the project as it appears in the Modeling Application. |
| Version | The latest version number of the released project. |
| Created By | The user that created the project. |
| Created | The time since the project `version` was released. |

### Deployment

After choosing to **Create Deployment Descriptor** or **Deploy** a released project, there are a number of configurations required depending on the contents of the project.

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

Select the users and groups that can access the application. The users and groups must exist and cannot be set as a static values.

{% endcapture %}
{% capture connector %}

> **Note**: If there are no [connectors]({% link process-automation/latest/model/connectors/index.md %}) in the project being deployed this tab will not show.

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

## Deployment descriptors

The **Deployment Descriptors** section displays a list of all deployment descriptors in the environment. These can be from creating a deployment descriptor from a project release, or from importing a deployment descriptor from another environment, for example from test to production.

Deployment descriptors are fully configured projects ready to be deployed into applications. Although no further configuration is required, they can still be updated before being deployed.

### Properties {#deploy-properties}

The properties for deployment descriptors are:

| Property | Description |
| -------- | ----------- |
| Name | The name of the descriptor and the name that will be used for the application. |
| Status | The status of the descriptor. Once it has been created it will display as `DescriptorCreated`. |
| Created | The date and time the descriptor was created. |
| Modified | The date and time since the descriptor was last modified. |

### Deploy a deployment descriptor

A deployment descriptor can be deployed if the project it was created from has not yet been deployed. The [configurations](#deployment) that were set when creating the descriptor can still be updated before deploying the application.

> **Note**: A deployment descriptor can only be used to deploy a single application. To deploy multiple instances of the same released project different names must be chosen when creating a descriptor or deploying it.

A deployment descriptor can only be deleted if it has not been deployed. If the descriptor has been deployed, the application must first be undeployed before the descriptor can be deleted.

### Export and import

Deployment descriptors can be exported as `.zip` files using the **Export Deployment Descriptor** option against a specific descriptor.

A previously exported deployment descriptor can be imported using the **Import** button in the **Deployment Descriptors** page.

> **Note**: A deployment descriptor cannot be imported if it uses the same name as a deployment descriptor that already exists.

## Application instances

The **Application Instances** section displays a list of all deployed applications, and applications currently in the process of being deployed. Applications can have their permissions updated

> **Reminder**: Projects are referred to as applications when they are deployed.

### Properties {#application-properties}

The properties for application instances are:

| Property | Description |
| -------- | ----------- |
| Name | The name of the application. |
| Version | The version of the application. **Note**: This is the application version related to [upgrading](#upgrade) an application and not the project version. |
| Created | The time since the application was deployed. |
| Status | The status of the application. Once fully deployed it will display as `Running`. |
| Content App | A link to the [user interface]({% link process-automation/latest/model/interfaces.md %}) for the application. |

### Upgrade

Upgrading an application allows for a new version of a released project to be deployed to an existing application. Tasks and process instances that are in progress and based on a previous application version can still be completed, however any new ones started will use the new model definitions.

> **Note**: An application can be upgraded to a released project version that is lower than the one currently deployed, however the application version will still increment.

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

### Manage permissions

The **Manage Permissions** option allows for additional users to be granted user or administrator access to an application without having to upgrade it.

### Undeploy

The **Undeploy** action removes a deployed application.

> **Important**: Undeploying an application will remove all data related to the application including processes and tasks. It is not possible to retrieve this data once an application has been undeployed.
