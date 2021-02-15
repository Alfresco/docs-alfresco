---
title: Repository Admin Console
---

The Repository Admin Console application gives you control over the management and settings of the Community Edition environment.

You'll find help text on the Admin Console pages to assist you with setting up the repository. See how to [launch the Admin Console](#launch-admin-console) directly.

## Overview

The Admin Console is a standalone console for managing the administration of the repository.

The Admin Console is a tool comprising separate pages that identify a particular administrative activity or feature:

* System Summary: [View System Summary](#systemsummary)
* Consoles:
  * Model and Messages: [Managing models using the Admin Console]({% link content-services/community/develop/repo-ext-points/content-model.md %})
  * Workflow: [The Workflow Console]({% link content-services/community/admin/workflows.md %}#workflowconsole)
* Support Tools:
  * Node Browser: [Using the Node Browser]({% link content-services/community/admin/troubleshoot.md %}#using-the-node-browser)

The links provide more information on configuring these activities.

You can use the Admin Console as your main tool to help you manage your production environment. It is a simple alternative to manually setting properties in the `alfresco-global.properties` file.

The settings that you choose in the Admin Console take precedence over any setting that you add in the `alfresco-global.properties` file.

## Launch Admin Console

The Repository Admin Console runs externally to the user interface and therefore you launch the application independently. This allows you to run the Admin Console without the need to run Alfresco Share.

Ensure that the Community Edition server is running.

1. Enter the following URL in a browser window:

    ```http
    http://<your-host-name>:<alfresco-port>/alfresco/s/admin
    ```

    Where `<your-host-name>` is the host name where you're running the Community Edition server and `<alfresco-port>` is the port number on which the server is running (by default, the port number is `8080`).

    An **Authentication Required** prompt displays, showing the IP address or name and the port number of the server.

2. Enter your user name and password.

    Your user name and password must be for an account with administrator permissions. The default administrator user name and password is `admin`.

    The Admin Console displays in a browser window. The title bar shows the host name and its IP address.

    You will remain logged into the Admin Console for the duration of the browser session. If you close the browser window completely and then connect to the Admin Console using the URL, you'll be prompted to enter your account details again.

    A useful starting point in the Admin Console is the [System Summary](#systemsummary) page, which gives an overview of which settings are enabled or disabled.

## View System Summary {#systemsummary}

System Summary in the Admin Console gives information on the status of the repository, including the general system information.

There are no actions or entry fields on the System Summary page. This page is a high-level overview of the setting you've chosen or are set as default on the repository.

The overview is divided into the following sections:

* Repository information
* System information

### Repository information

The Repository Information summary shows the repository-related details of the installation. This information is useful for confirming the installation details, such as version number, version label, schema, and repository identifier.

### System Information

The System Information summary shows the general details of the installation. This information is useful for confirming the installation details, Java installation details, the host operating system specification and memory details.
