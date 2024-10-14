---
title: Administer Federation Services
---

The following diagram shows the architecture of Alfresco Federation Services:

![Architecture Diagram]({% link federation-services/images/architecture-diagram.png %}){:height="395px" width="384px"}

## Configuration Tools

Federation Services's configuration tool allows for easy import/export of all configurations in Federation Services. This is great for backups or for bootstrapping Federation Services with common configurations.

### Admin Tools

In the **Admin Tools > Configuration Tools** page, users can import configurations, export configurations, export configs by job, manage patches and reset configurations.

#### Export Configuration

Using the left-hand menu in the UI:

1. Select **Admin Tools** under the **Admin** section.
2. Click on the **Export** button.
3. Select all the configuration you wish to export from the list.
4. Hit **Export Configuration**.

   This will trigger the download of a JSON file that contains all the selected configuration.

#### Import Configuration

Using the left-hand menu in the UI:

1. Access the **Configuration Tools** menu from the Admin panel on the left-hand menu.
2. Click on the **Import** button.
3. Click **Choose File** and select the exported JSON file from.
4. Click **Import**.

## Licenses

The **Licenses** page allows for management of your License Keys. You can add a new License key, or reactivate previously entered keys. The details of each key are listed, including the associated MAC Address, Documents Allowed, Documents Used, End Date and which key is in use.

### Add a License Key

To add a license key simply paste the key into the text box labelled License Key and click Add License Key. You can only have one active license at a time.

### Reactivate a License Key

To reactivate a license key or add a new license key, copy the key and put it into the `License Key` text box, then click **Add License Key**. If the key already exists then it will be activated and the old key will be set to inactive.

## Users

Users can be created within Federation Services for user authentication and authorization. From the User page in the Admin section you can conduct the following actions.

* View users that have access to Federation Services. Their first and last name. Email address login user name and their role.
* Create, edit, delete or disable users.
* View users by organization.
* Manage active sessions to see who is currently logged in. From here you can end all sessions as well. For example, if you need to make updates to the system.
* You can use the search field to narrow down the list of users displayed by name, email, login, or role.

### Creating New Users

To create new users click on the **Create New User** button. On the **Edit User** page fill in the following details for the user you are creating:

* First and Last Name
* Email address
* Login user name
* Chose a Federation Services Role
* Chose a Federation Role
* Add a password. This can be changed by the user at any time by accessing their profile information

### List of User Role Definitions

#### Federation Services Admin

* **Discovery Only**: This user does not have access to the Federation Services Admin UI, and can only log in to Discovery
* **Monitor**: Can **monitor** the execution of jobs, run reports, view job details. This is a READ ONLY user.
* **Executor**: Can **execute** jobs, run reports, view job details
* **Manager**: Can **create, run, and update** jobs and reports for the given Tenant.
* **Org Admin**: Can **create, update, execute and delete** jobs, users and reports for a given Tenant.
* **Federation Services Admin**: This user is the Federation Services Root user, with all capabilities on the system, for all tenants.

#### Discovery

* **Discovery User**: Can log in to Discovery but cannot edit or delete views or alter configuration.
* **Discovery Admin**: Full access to basic federation features.

## User Groups

User groups are collections of users. They can be used as part of View Level Permissions.

* While adding users you will be able to see their first name, last name, login and role.
* Federation Services Admins will be able to see all users.
* Organization Admins will only be able to see users from their organization.
* Includes the ability to search all users.

## Themes

Theming gives an admin the ability to customise the Logo and Top bar colour as well as customise Lead Text sections throughout the application. Each organization may have a separate theme that can be set up by that organisations' admin. This is done in two parts. First, the Logo and Top bar colour, through the themes' page under the applications' admin section. Second, the Lead Text Sections, through the editing of a messages.properties file.

### Theme Fields

* **Browser Title**: The title that's displayed in the header
* **Reset Browser Title**: Check to reset the browser title
* **Browser Favicon**: Chose your Brand Logo file. Logos are selected through the choose file prompt
* **Reset Favicon**: Check the box to reset
* **Top Bar Colour**: The Top Bar colour is selected through the colour picker prompt.

After selections, click Save. After page reloads, the changes will have taken effect.

## Active Jobs

The Active Jobs page shows the jobs that are currently running. Sometimes jobs can get stuck in the RUNNING state.

### Fixing Stuck Jobs

If a job is running and the **Abort** does not stop the job in an appropriate amount of time, the job can be killed manually through an Admin page.

Under Active Jobs, look for your **Job ID** and click on the **Kill Job** button. It will look like a small trash can.

Once the job is killed, you will need to fully restart the job to run it again. Running errors may only produce undesired results.

## Connectors

The **Connectors** page shows the available Connector types with the option to Activate or Deactivate any given connector. Custom Connectors will be listed here as well.

## Organization

The Organization page shows the different Organisations used within the Federation Services platform for multi-tenancy. It will display the Organization name, short name, the status (Active/Inactive) which notes whether an organization is enabled, and also provide a link to search their users.

By default, Federation Services has one organization, based on configuration in the global properties.

> **Tip:** This page assumes `simflofy.multi.tenant` is set to `true` in your global properties.

In multi-tenant mode, a user with the Federation Services Admin role will have access to the **Organisation** page under the **Admin** menu. This page displays all the current tenants in your Federation Services. It will display whether an organization is enabled, and also provide a link to search their users.

#### Creating an Organization

When clicking on **Create New Organization** a pop-up will appear with the following fields

* **Organization Name**: The name for your new organization
* **Organizational Key**: The org key that will follow the @ after users names. This cannot be changed after the organization has been creation.
* **Organization Database**: This will be created and populated on submission. It cannot be changed after the organization has been creation.

The Key and Database fields cannot contain spaces or of the following characters:

```text
!@#$%^&*()+=-[]\';,./{}|":<>?
```

Clicking **Continue** will take you to the org edit screen, but the org will not be created yet. You will be presented with a list of products available on your license, which you can activate for the new organization. This can be changed at any time to remove access to certain connectors and features.

Upon clicking **Save** in this page, the organization will be added to the database and a standard initialisation will be performed (generation of Mongo indexes, adding the enabled connectors, and loading the bootstrap).

Users under non-global organisations will need to log in with:

```text
usersname@orgkey
```

## About Federation Services

On the **About** page users can find the version and build information for the installed version of Federation Services.
