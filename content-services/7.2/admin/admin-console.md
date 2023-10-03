---
title: Repository Admin Console
---

The Repository Admin Console application gives you control over the management and settings of the Content Services environment.

You'll find help text on the Admin Console pages to assist you with setting up the repository. See how to [launch the Admin Console](#launch-admin-console) directly.

## Overview

The Admin Console is a standalone console for managing the administration of the repository.

The Admin Console is a tool comprising separate pages that identify a particular administrative activity or feature:

* System Summary: [Viewing the System Summary](#systemsummary)
* Consoles:
  * GoogleDocs: [Configuring Google Docs using Admin Tools]({% link google-drive/latest/config/index.md %}#configure-using-the-admin-console)
  * Model and Messages: [Managing models using the Admin Console]({% link content-services/7.2/develop/repo-ext-points/content-model.md %})
  * Workflow: [The Workflow Console]({% link content-services/7.2/admin/workflows.md %}#workflowconsole)
* Email Services:
  * Inbound Email: [Managing inbound emails]({% link content-services/7.2/config/email.md %})
  * Outbound Email: [Managing outbound emails]({% link content-services/7.2/config/email.md %})
* General:
  * License: [Uploading a new license]({% link content-services/7.2/admin/license.md %}#uploadlicense)
  * Repository Information: [Viewing Repository Information](#viewrepoinfo)
  * System Settings: [Configuring server administration settings]({% link content-services/7.2/config/repository.md %}#sysadmin)
* Repository Services:
  * Activities Feed: [Configuring the Activities Feed]({% link content-services/7.2/config/email.md %}#configure-activities-feed)
  * Repository Server Clustering: [Managing members of a cluster]({% link content-services/7.2/admin/cluster.md %}#managecluster)
  * Search Service Sharding: [Configuring sharding using the Admin Console]({% link insight-engine/latest/config/sharding/index.md %})
  * Process Engines: [Enabling workflow process engines]({% link content-services/7.2/admin/workflows.md %}#enableprocessengines)
  * Query Accelerator: [View and manage query set configuration files]({% link content-services/7.2/admin/query-accelerator.md %})
  * Replication Service: [Enabling the Replication Service]({% link content-services/7.2/admin/replication.md %}#enablereplication)
  * Search Service: [Configuring Search Services using Admin Console]({% link search-services/latest/config/index.md %}#configure-using-the-admin-console)
  * Subscription Service: [Enabling the Subscription Service]({% link content-services/7.2/config/email.md %}#enable-subscription-service)

    > **Note:** Use **Repository Services** to manage individual repository servers. This function can't be accessed through a load balancer.

* Support Tools:
  * Download JMX Dump: [JMX Settings]({% link content-services/7.2/admin/support-tools.md %}#jmxsettings)
  * Node Browser: [Using the Node Browser]({% link content-services/7.2/admin/troubleshoot.md %}#using-the-node-browser)
* Directory Management: [Managing authentication directories]({% link content-services/7.2/admin/auth-sync.md %}#manageauthdirs)
* Virtual File Systems:
  * File Servers: [Enabling file servers]({% link content-services/7.2/config/file-servers.md %})
  * IMAP Service: [Enabling the IMAP Service using the Admin Console]({% link content-services/7.2/config/email.md %}#configure-imap)

The links provide more information on configuring these activities.

You can use the Admin Console as your main tool to help you manage your production environment. It is a simple alternative to using a JMX console, or manually setting properties in the `alfresco-global.properties` file.

The settings that you choose in the Admin Console take precedence over any setting that you add in the `alfresco-global.properties` file.

## Launch Admin Console

The Repository Admin Console runs externally to the user interface and therefore you launch the application independently. This allows you to run the Admin Console without the need to run Alfresco Share.

Ensure that the Content Services server is running.

1. Enter the following URL in a browser window:

    ```http
    http://<your-host-name>:<alfresco-port>/alfresco/service/enterprise/admin
    ```

    Where `<your-host-name>` is the host name where you're running the Content Services server and `<alfresco-port>` is the port number on which the server is running (by default, the port number is `8080`).

    An **Authentication Required** prompt displays, showing the IP address or name and the port number of the server.

2. Enter your user name and password.

    Your user name and password must be for an account with administrator permissions. The default administrator user name and password is `admin`.

    The Admin Console displays in a browser window. The title bar shows the host name and its IP address.

    You will remain logged into the Admin Console for the duration of the browser session. If you close the browser window completely and then connect to the Admin Console using the URL, you'll be prompted to enter your account details again.

    A useful starting point in the Admin Console is the [System Summary](#systemsummary) page, which gives an overview of which settings are enabled or disabled.

## View System Summary {#systemsummary}

System Summary in the Admin Console shows an overview of the status of the repository, including the general system information, subsystem status, clustering settings, the current authentication chain, and details of which AMPs are applied to the system.

There are no actions or entry fields on the System Summary page. This page is a high-level overview of the setting you've chosen or are set as default on the repository.

The overview is divided into the following sections:

* System information
* File Systems
* Indexing Subsystem
* Repository Clustering
* Activities Feed
* Authentication
* Email
* Auditing Services
* Content Stores
* Alfresco Module Packages (AMPs)
* Users and Groups

### System Information

The System Information summary shows the general details of the installation. This information is useful for confirming the installation details, Java installation details, the host operating system specification and memory details.

### File Systems

The File Systems summary shows the settings from the File Servers page. See [Enabling File Servers]({% link content-services/7.2/config/file-servers.md %}) for more information.

### Indexing Subsystem

The Indexing Subsystem summary shows the settings from the Search Service page. See [Configuring Search Services]({% link search-services/latest/config/index.md %}) for more information.

### Repository Clustering

The Repository Clustering summary shows the settings from the Repository Server Clustering page. See [Repository Server Clustering]({% link content-services/7.2/admin/cluster.md %}#managecluster) for more information.

### Activities Feed

The Activities Feed summary shows the settings from the Activities Feed page. See [Setting the Activities Feed]({% link content-services/7.2/config/email.md %}#configure-activities-feed) for more information.

### Authentication

The Authentication summary shows the settings from the Directory Management page, in particular, the current authentication chain. See [Managing authentication directories]({% link content-services/7.2/admin/auth-sync.md %}#manageauthdirs) for more information.

### Email

The Email summary shows the settings from the Inbound Email and Outbound Email pages. See [Managing inbound and outbound emails]({% link content-services/7.2/config/email.md %}) for more information.

### Auditing Services

The Auditing Services summary indicates the status of auditing in Content Services.

### Content Stores

The Content Stores summary lists the location of the default content stores.

### Module Packages

The Module Packages summary identifies which modules have been applied to this instance of Content Services.

### Users and Groups

The Users and Groups summary shows the number of individual users and groups within the system.

## View Repository Information {#viewrepoinfo}

Repository Information in the Admin Console shows details of the repository as it was originally installed. It also shows the current Content Services version.

1. Open the **Admin Console**.

2. In the General section, click **Repository Information**.

    You see the **Repository Information** page showing the details of your installation.

## Customize Admin Console

The Admin Console displays the most common administration activities. You can customize the Admin Console to show different options, properties, and layout, or you can create completely new pages.
The Admin Console is composed of default administration pages. Each Admin Console page is a simple web script component built from a library of useful functions and macros that are imported into each Admin Console web script.

The JavaScript library functions do the background work for the Admin Console, retrieving the JMX MBean properties and then transferring them to flexible FreeMarker macros. The FreeMarker macros render the appropriate control for a JMX property automatically and consistently.

If no additional processing logic is required, the web script library functions automatically persist them back to the correct property.

JMX form-style pages are simple to build. Example pages that you can create include: Thread Dump, Active Sessions, Log4J settings, and Test Transforms.

### Admin Console example page

When you customize the Admin Console, you can use the example page as a starting point.

The Admin Console example page is called `admin-example` and contains comments to help you to understand the code.

The files that you use for working with the example Admin Console page are:

* [admin-example.get.js](http://dev.alfresco.com/resource/AlfrescoOne/5.1/configuration/alfresco/enterprise/webscripts/org/alfresco/enterprise/repository/admin/admin-example.get.js){:target="_blank"}
* [admin-example.get.html.ftl](http://dev.alfresco.com/resource/AlfrescoOne/5.1/configuration/alfresco/enterprise/webscripts/org/alfresco/enterprise/repository/admin/admin-example.get.html.ftl){:target="_blank"}
* [admin-example.get.desc.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.1/configuration/alfresco/enterprise/webscripts/org/alfresco/enterprise/repository/admin/admin-example.get.desc.xml){:target="_blank"}
* [admin-example.get.properties](http://dev.alfresco.com/resource/AlfrescoOne/5.1/configuration/alfresco/enterprise/webscripts/org/alfresco/enterprise/repository/admin/admin-example.get.properties){:target="_blank"}

See the [Web script components]({% link content-services/7.2/develop/reference/web-scripts-ref.md %}#wscomponents) section for more information on these files.

There are also additional properties files that contain the associated strings for localized content in the supported languages.

The following snippet shows the controller code from the `admin-example.get.js` file, which retrieves the `Subject`, `Issued`, and `RemainingDays` properties from the `License` JMX bean:

```javascript
<import resource="classpath:alfresco/enterprise/webscripts/.../admin-common.lib.js">
/* Repository Admin Console - Example GET method */
Admin.initModel(
   "Alfresco:Name=License",
   ["Subject", "Issued", "RemainingDays"],
   "admin-example"
);
```

The following snippet shows the template code from the `admin-example.get.html.ftl` file:

```xml
<#include "admin-template.ftl" />
<@page title="Example Page">
   <div class="column-left">
      <@section label="Some Values" />
      <@control attribute=attributes["Subject"] />
   </div>
   <div class="column-right">
      <@section label="More Values" />
      <@control attribute=attributes["Issued"] />
      <@control attribute=attributes["RemainingDays"] />
   </div>
</@page>
```

The resulting output from the `admin-example` web script displays the following:

![adminconsole-custom-example11]({% link content-services/images/adminconsole-custom-example11.png %})

The values from the License JMX bean are read-only. The template macros understand when the JMX beans are read-only, and therefore, display the text as read-only.

When the JMX beans are editable or if you want to show a different form field, add the following line to change the template:

```xml
<@attrtext attribute=attributes["Subject"] />
```

The resulting output then displays the following:

![adminconsole-custom-example2]({% link content-services/images/adminconsole-custom-example2.png %})
