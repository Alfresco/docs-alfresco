---
title: Administer Federation Services
---

The following diagram shows the architecture of Alfresco Federation Services:

![Architecture Diagram]({% link federation-services/images/architecture-diagram.png %})

# Logging

Federation Services logging allows a user to access and set the log levels of all Federation Services classes.

## Accessing and Updating the Logging File

Federation Services logging is set in the following file:

`[Federation Services folder]\WEB-INF\classes\log4j.properties`

You can set the log level of all Federation Services classes by changing the following:

`log4j.logger.com.simflofy = debug, 3sixty-admin`

Replace debug with another valid options:

| Level | Description |
| ---|--- |
| ALL | All levels including custom levels. |
| DEBUG | Designates fine-grained informational events that are most useful to debug an application. |
| ERROR | Designates error events that might still allow the application to continue running. |
| FATAL | Designates very severe error events that will presumably lead the application to abort. |
| INFO | Designates informational messages that highlight the progress of the application at coarse-grained level. |
| OFF | The highest possible rank and is intended to turn off logging. |
| TRACE | Designates finer-grained informational events than the DEBUG. |
| WARN | Designates potentially harmful situations. |
  
In production Federation Services suggests setting logging to the ERROR level.

You'll notice there are other entries, these entries will override the com.simflofy setting for the specific packages they reference.

**For example**:

`log4j.logger.com.simflofy.connectors.sharepoint = trace, 3sixty-admin`
`log4j.additivity.com.simflofy.connectors.sharepoint = false`

This sets the SharePoint connector logging to trace. The second line is necessary to prevent double-logging.

## Federation Services Admin Log View

To get a basic view of the log file, the Logging page can be found under the Admin Menu

This page uses the global property `simflofy.admin.log.path`, with a default value of `${catalina.base}/logs/3sixty-admin.log`.

To modify this value edit `simflofy-global.properties` in the `3sixty-admin/WEB-INF/classes` directory, for example:

`simflofy.admin.log.path=/my/log/directory/logs/3sixty-admin.log`

On this page the user can download the complete 3sixty-admin.log, as well as filter the last 5000 lines of the log file:

| Level | Logs |
| ---|--- |
| Info | Info, Error |
| Debug | Info, Error, Debug |
| Trace | All |
| Error | Error only |
  
You can also set the value simflofy.max.log.size to prevent performance issues. Default is 10 MB. KB and GB are also valid sizes.

## Log Levels

On the **Log Levels** page you can add or remove [log appenders](https://dzone.com/articles/log-appender-what-is-it-and-why-would-you-use-it){:target="_blank"}. Both of which are temporary. There is a list of all available connectors if you wish to modify the logging level for an individual connector.

# Admin Properties

The Admin Properties section of Federation Services Admin allows a user to Configure the following Global, Analysis, and Internal Audits Properties. Once changes have been made to any of the properties use the **Update Configuration** button to save the changes to the properties file.

## Global Properties

* Initialise Database on start-up. This will rebuild the database indexes as well as add or rename the connectors - this is the same as setting simflofy.initialize.mongo=true.
* Import database items - this is the same as setting simflofy.initialize.bootstrap=true
* Run various patches which will update the items in the database from 2.X to 3.X forms - this is the same as setting simflofy.initialize.update=true
* Enter the Full Discovery UI URL where these changes are to take place. Example: https://localhost:8080/Federation Services-discovery

Check the boxes and or set the intervals for the properties you want to update and use the update configuration button to push the changes to your Federation Services System.

## Analysis

The Analysis section of Federation Services Admin allows a user to set the following analysis tools for their Federation Services system.

* Turn on the ability to Collect Data
* Allow users to generate Scheduled Reports
* Set time Interval between job check status
* Set Time between Schedule Status checks
* Set time of delay before the data collections service begins checking collection schedules

Check the boxes for the properties you want to set and use the update configuration button to push the changes to your Federation Services System.

## Internal Audits

By default, internal auditing is turned off. To turn auditing on check the box for Internal audits. Here you can choose to **Track All Internal Audits** by checking the Track all Audits box, or you can **Track Internal Audits by Type** by checking the box next to each action type you would like to audit.

List of available Audit types:

mappings, repository, job, job group, license, output, authentication, view, user, search, content search, widget, template, configuration, license

### Overview

The internal audit table displays internal audits, each with a name, type, action, user, org, date, and a description. By default, the audits are sorted by descending order on the date column (most recent audits show at the top). All the other columns except the Date column can be sorted alphabetically if you click on the header. The Date column is sorted by date and time. An up arrow indicates that the column is sorted in ascending order while a down arrow indicates that the column is sorted in descending order.

A system admin will be able to see audits from all orgs while org admins will be able to see only their orgs audits.

### Global Search Bar

The global search bar filters the audits based on input. It searches every column and if a column has the same input then that row is displayed. The search is not case-sensitive.

Below the table you will find search bars and select inputs. These allow you to filter audits by column. The Name, User, and Description columns can be filtered by user input while theType, Action, and Org columns can be filtered by selecting an option from the drop-down. The search input is not case-sensitive and does not need to be an exact match.

By default all audits are selected. You can use multiple column filters to get more precise results.

The input does not have to be an exact match, for example if I want to get all audits that contain the word Filesystem then you could just enter File into the search bar.

An example of filtering by column is shown below. Here we are filtering on the first three columns, Name, Type, and Action.

### Pagination

Pagination works with the shown number of entries selector to determine how many audits are on each page. By default, the page is set to the first page. Clicking the next tab will go to the next page while clicking the previous tab will bring you to the previous tab (if applicable). You can also click on a number to bring you to a certain page.

### Date Range Picker

The date range picker allows you to look at audits from within a certain time period. By default, the date range is set from 7 days ago to the current time.

Clicking on the calendar icon will bring up the current dates month and year. You can select a day on this month, or you can go to a different month by using the back arrow which goes to the previous month, or the forward arrow which goes to the next month.

Alternatively, you can just enter the date manually by selecting in the text field and entering a date and time that follows the format dd/mm/YYYY h:mm.

Ex. 12/23/2011 12:03 PM would be a valid date and time

### Displayed Number of Entries

You can change the amount of audit are displayed using the number of entries selector. By default, the number of entries is set to 10. You can change the number of entries per page by clicking on the selector and selecting a different value. The options are 10, 25, 50, and 100.

### Configuration

Internal auditing is set in the Admin Properties. By default, auditing is turned off. To turn auditing on check the box for Internal audits. Here you can choose to **Track All Internal Audits** by checking the Track all Audits box, or you can **Track Internal Audits by Type** by checking the box next to each action type you would like to audit.

List of available Audit types:

* job
* conn
* auth
* mappings
* mappingGroup
* view
* user
* search
* cs
* widget
* jobgroup
* taskgroup
* template
* config
* license
* widgetDefinition
* jobSchedule
* dataSet
* contentReport
* usergroup
* instance
* jobHistory
* organization
* eventConfiguration

### My Internal Audit

This page is available under the **Audit Reports** menu and will display a version of this page with information limited to the current user.

By default, the audits are sorted by descending order on the date column (most recent audits show at the top). All the other columns except the Date column can be sorted alphabetically if you click on the header. The Date column is sorted by date and time. An up arrow indicates that the column is sorted in ascending order while a down arrow indicates that the column is sorted in descending order.

# Configuration Tools

Federation Services's configuration tool allows for easy import/export of all configurations in Federation Services. This is great for backups or for bootstrapping Federation Services with common configurations.

**Export Configurations**

Through the User Interface on the left-hand menu under the Admin section select Configuration Tools.

Click on the Export button.

Select all the configuration you wish to export from the list.

Select Export Configuration. This will trigger the download of a JSON file that contains all the selected configuration.

**Import Configuration**

Access the Configuration Tools menu from the Admin panel on the left-hand menu. Click on the Import button.

Click Choose File and select the exported JSON file from

Click Import.

## Admin Tools

In the Admin Tools (Configuration Tools) Page users can import configurations, export configurations, export configs by job, manage patches and reset configurations.

### Export Configuration

Through the User Interface on the left-hand menu under the **Admin** section select **Admin Tools**.

Click on the **Export** button.

Select all the configuration you wish to export from the list.

Hit **Export Configuration**. This will trigger the download of a JSON file that contains all the selected configuration.

### Import Configuration

Access the **Configuration Tools** menu from the Admin panel on the left-hand menu. Click on the **Import** button.

Click **Choose File** and select the exported JSON file from

Click **Import**.

# Licenses

The **Licenses** page allows for management of your License Keys. You can add a new License key, or reactivate previously entered keys. The details of each key are listed, including the associated MAC Address, Documents Allowed, Documents Used, End Date and which key is in use.

**Add a License Key**

To add a license key simply paste the key into the text box labelled License Key and click Add License Key. You can only have one active license at a time.

**Reactivate a License Key**

To reactivate a license key or adding a new license key copy the key and put it into the License Key text box, then click Add License Key. If the key already exists then it will be activated and the old key will be set to inactive.

# Users

Users can be created within Federation Services for user authentication and authorization. From the User page in the Admin section you can conduct the following actions.

* View users that have access to Federation Services. Their first and last name. Email address login user name and their role.
* Create, edit, delete or disable users.
* View users by organization.
* Manage active sessions to see who is currently logged in. From here you can end all sessions as well. For example if you need to make updates to the system.
* And you can use the search field to narrow down the list of users displayed by name, email, login, or role

**Creating New Users**

To create new users click on the **Create New User** button. On the **Edit User** page fill in the following details for the user you are creating:

* First and Last Name
* Email address
* Login user name
* Chose a Federation Services Role
* Chose a Federation Role
* Add a password. This can be changed by the user at any time by accessing their profile information

## List of User Role Definitions

**Federation Services Admin**

* **Discovery Only**: This user does not have access to the Federation Services Admin UI, and can only log in to Discovery
* **Monitor**: Can **monitor** the execution of jobs, run reports, view job details. This is a READ ONLY user.
* **Executor**: Can **execute** jobs, run reports, view job details
* **Manager**: Can **create, run, and update** jobs and reports for the given Tenant.
* **Org Admin**: Can **create, update, execute and delete** jobs, users and reports for a given Tenant.
* **Federation Services Admin**: This user is the Federation Services Root user, with all capabilities on the system, for all tenants.

**Discovery**

* **Discovery User**: Can log in to Discovery but cannot edit or delete views or alter configuration
* **Discovery Admin**: Full access to basic federation features.

# User Groups

User groups are collections of users. They can be used as part of View Level Permissions.

* While adding users you will be able to see their first name, last name, login and role.
* Federation Services Admins will be able to see all users
* Organization Admins will only be able to see users from their organization.
* Includes the ability to search all users

# Themes

Theming gives an admin the ability to customise the Logo and Top bar colour as well as customise Lead Text sections throughout the application. Each organization may have a separate theme that can be set up by that organisations' admin. This is done in two parts. First, the Logo and Top bar colour, through the themes' page under the applications' admin section. Second, the Lead Text Sections, through the editing of a messages.properties file.

**Theme Fields**

* **Browser Title**: The title that's displayed in the header
* **Reset Browser Title**: Check to reset the browser title
* **Browser Favicon**: Chose your Brand Logo file. Logos are selected through the choose file prompt
* **Reset Favicon**: Check the box to reset
* **Top Bar Colour**: The Top Bar colour is selected through the colour picker prompt.

After selections, click Save. After page reloads, the changes will have taken effect.

# Active Jobs

The Active Jobs page shows the jobs that are currently running. Sometimes jobs can get stuck in the RUNNING state.

**Fixing Stuck Jobs**

If a job is running and the **Abort** does not stop the job in an appropriate amount of time, the job can be killed manually through an Admin page.

Under Active Jobs, look for your **Job ID** and click on the **Kill Job** button. It will look like a small trash can.

Once the job is killed, you will need to fully restart the job to run it again. Running errors may only produce undesired results.

# Connectors

The **Connectors** page shows the available Connector types with the option to Activate or Deactivate any given connector. Custom Connectors will be listed here as well.

# Organisation

The Organization page shows the different Organisation used within the Federation Services platform for multi-tenancy. It will display the Organization name, short name, the status (Active/Inactive) which notes whether an organization is enabled, and also provide a link to search their users. 

##  Overview

The Organization page shows the different Organisation used within the Federation Services platform for multi-tenancy. It will display the Organization name, short name, the status (Active/Inactive) which notes whether an organization is enabled, and also provide a link to search their users.

By default, Federation Services has one organization, based on configuration in the global properties.

**Tip:** This page assumes **simflofy.multi.tenant** is set to true in your global properties

In multi-tenant mode, a user with the Federation Services Admin role will have access to the **Organisation** page under the **Admin** menu. This page will display all the current tenants in your Federation Services. It will display whether an organization is enabled, and also provide a link to search their users.

### Creating an Organization

When clicking on **Create New Organization** a pop-up will appear with the following fields

* **Organization Name**: The name for your new organization
* **Organizational Key**: The org key that will follow the @ after users names. This cannot be changed after the organization has been creation.
* **Organization Database**: This will be created and populated on submission. It cannot be changed after the organization has been creation.

The Key and Database fields cannot contain spaces or of the following characters

`!@#$%^&*()+=-[]\';,./{}|":<>?`

Clicking **Continue** will take you to the org edit screen, but the org will not be created yet. You will be presented with a list of products available on your license, which you can activate for the new organization. This can be changed at any time to remove access to certain connectors and features.

Upon clicking **Save** in this page, the organization will be added to the database and a standard initialisation will be performed (generation of Mongo indexes, adding the enabled connectors, and loading the bootstrap).

Users under non-global organisations will need to log in with

`usersname@orgkey`

# About Federation Services

On the About page users can find the version and build information for the installed version of Federation Services.