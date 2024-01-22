---
title: Control Center
---

Alfresco Control Center is being developed to allow the administration of multiple Alfresco applications from a single, modern interface. It will provide admin functions that are currently only available in Alfresco Share, and will eventually allow the full administration of Alfresco Content Services and Alfresco Governance Services without needing to use the Share application.

The initial release focussed on the basic minimum requirements to configure Content Services (Enterprise Edition) - the creation of users and groups of users. Additional functionality will be added in future releases.

## Overview

The Control Center is provided as a Docker image for containerized deployment. It is recommended for evaluations only (i.e. test and development environments), and accessed using the `/admin` URL.

When you expand the **User Management** section, you can access the following functionality:

* A **Users** section used to manage your users.
* A **Groups** section used to manage the groups to which your users may be added.

> **Note:** This provides an alternative way of managing users and groups in [Share Admin Tools]({% link content-services/latest/admin/share-admin-tools.md %}).

When you expand the **Content Structuring** section, you can access the following functionality:

* A **Tags** section used to manage tags for your content.
* A **Categories** section used to manage categories for your content.

## Prerequisites

There are a number of software requirements for installing the Control Center. These are the same as for deploying [Alfresco Content Services]({% link content-services/latest/install/containers/docker-compose.md %}#prerequisites). However, the same details are provided here for easy reference.

### Containerized deployment

The images downloaded directly from [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"}, or [Quay.io](https://quay.io/){:target="_blank"} are for a limited trial of the Enterprise version of Content Services that goes into read-only mode after 2 days. For a longer (30-day) trial, get the Alfresco Content Services [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}.

> **Note:** A [Quay.io](https://quay.io/){:target="_blank"} account is needed to pull the Docker images that are needed:
>
> * `quay.io/alfresco/alfresco-control-center`

> **Note:** Alfresco customers can request Quay.io credentials by logging a support ticket via [Hyland Community](https://community.hyland.com//){:target="_blank"}. These credentials are required to pull private (Enterprise-only) Docker images from Quay.io.

#### Software requirements (Docker)

* [Docker](https://docs.docker.com/install/){:target="_blank"} (latest stable version)
  * This allows you to run Docker images and `docker-compose` on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

> **Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose.

## Deployment

These steps describe how to quickly start up Content Services (including Control Center) using Docker Compose.

> **Note:** While Docker Compose is often used for production deployments, the Docker Compose file provided is recommended for development and test environments only. Customers are expected to adapt this file to their own requirements, if they intend to use Docker Compose to deploy a production environment.

To deploy Content Services using Docker Compose, download and install [Docker](https://docs.docker.com/install/){:target="_blank"}, then follow the steps below. Make sure that you've reviewed the [prerequisites](#prerequisites) before continuing.

1. Download the `docker-compose.yml` file by accessing the Content Services [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"} page, which will give you a 30-day license.

    If you already have a valid license file for Content Services 7.4, you can apply it directly to the running system. See [Uploading a new license]({% link content-services/latest/admin/license.md %}) for more details.

    > **Note:** Make sure that exposed ports are open on your host computer. Check the `docker-compose.yml` file to determine the exposed ports - refer to the `host:container` port definitions. You'll see they include 5432, 8080, 8083 and others.

    > **Note:** The Download Trial is usually updated for the most recent version of Content Services. The latest published version on our website is labelled *Version 7.4 - May 2023*.

2. Save the `docker-compose.yml` file in a local folder.

3. Log in to Quay.io using your credentials:

    ```bash
    docker login quay.io
    ```

    Alfresco customers can request Quay.io credentials by logging a support ticket via [Hyland Community](https://community.hyland.com/){:target="_blank"}. These credentials are required to pull private (Enterprise-only) Docker images from Quay.io.

4. Deploy Content Services, including the repository, Share, Postgres database, Search Services, etc.:

    ```bash
    docker-compose up
    ```

    This downloads the images, fetches all the dependencies, creates each container, and then starts the system.

    As an alternative, you can also start the containers in the background by running `docker-compose up -d`.

5. Wait for the logs to complete.

    See [Troubleshooting](#troubleshooting) if you encounter errors whilst the system is starting up.

6. Open your browser and check everything starts up correctly:

    | Service | Endpoint |
    | ------- | -------- |
    | Control Center | `http://localhost:8080/admin` |
    | Digital Workspace | `http://localhost:8080/workspace` |
    | Share | `http://localhost:8080/share` |
    | Administration and REST APIs | `http://localhost:8080/alfresco` |

    If Docker is running on your local machine, the IP address will be just `localhost`.

    If you're still using the [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/){:target="_blank"}, you'll need to switch to [Docker Desktop](https://docs.docker.com/install/){:target="_blank"} as Docker Toolbox is deprecated.

7. Log in to the Control Center as the `admin` user. Enter the default administrator password `admin`.

## Manage users

The **User Management** section of the application is used to create and manage users, and groups. Expand the section to see the two main areas the Control Center covers: **Users** and **Groups**.

The **Users** section displays the current list of users in the system.

### Properties {#user-properties}

The properties for users are:

| Property | Description |
| -------- | ----------- |
| Id / Username | A unique identifier (username) for the user. <br><br>**Note:** A `Username` cannot be changed once a user has been created. |
| Email | An email address associated to the user. |
| First Name | The first name of the user. |
| Last Name | The last name of the user. |
| Password | The password for the user account. <br><br>**Note:** Enter a minimum of eight characters otherwise you won't be able to click the **Create** button. |
| Verify password | Re-enter the password for the user. Make sure that you type the same password you typed in the **Password** field. |
| Enabled | Select the checkbox to enable the user. |

### Add a user

To add a user:

1. Sign into the application.

2. Expand the **User Management** section and select **Users**.

3. Click the **Add User** icon to display the **Add User** page.

4. Fill in the properties for a user and click **Create**.

    All fields marked with an asterisk (*) are required.

    > **Note:** The create button isn't available until you complete all the required fields. If you didn't type in matching passwords, you'll see a message to say that the password fields do not match.

Once the user has been created, click the vertical ellipsis (**&vellip;**) at end of the row to access more options, or use the search field on the toolbar to search for users:

* **View** the user to assign them to one or more groups.
* **Edit** the user details, including resetting their password.
* **Search** for any user and view that user's account information. In the search box, enter the full or partial name of the user (at least 3 characters).

## Manage groups

The **Groups** section displays the current list of groups in the system.

Groups are used to create both top level user groups and subgroups within existing groups.

### Properties {#group-properties}

The properties for groups are:

| Property | Description |
| -------- | ----------- |
| Group ID | Enter a unique identifier for the group. <br><br>**Note:** The `Group ID` cannot be changed once a group has been created. |
| Name | A name to identify the group. |

### Add a group

To add a group:

1. Sign into the application.

2. Expand the **User Management** section and select **Groups**.

3. Click the **Add Group** icon to display the **Add Group** page.

4. Give a name to the group and click **Create**.

Once the group has been created, click the vertical ellipsis (**&vellip;**) at end of the row to access more options, or use the search field on the toolbar to search for groups:

* **Create subgroup** to create subgroups from the parent group.
* **Edit group details** to change the group name.
* **Delete group** to remove the group from your system.
* **Search** for a group. In the search box, enter the full or partial name (at least 3 characters).

> **Note:** You can only modify the group `Name` once a group has been created.

## Tags

A tag is a marker that you can assign to related content to help categorize it. This makes it easier to view related content. You can create tags in the Control Center that can be used in the Digital Workspace. For example, you may create tags called **proposal-one**, and  **proposal-two** to help you identify all the content that has been created for two different versions of a design. In the Digital Workspace you can search your content that has specific tags.
For more on their use in the Digital Workspace, see [Tags]({% link content-services/latest/using/content/tags-categories.md %}#tags).

To create a tag:

1. Log into the Control Center.

2. Expand **Content Structuring** in the left pane and then select **Tags**.

3. Click the **Create** button on the top right.

4. Click the **+** symbol and enter a **Name** for the new tag.

    Each tag created in the Control Center must be unique. When you enter a name for a new tag, the Control Center provides a list of existing tags with similar names. You can check if the tag that you want to create has already been created. If the name for the tag already exists you must create it with another unique name.

5. Click **Create: your-tag-name** and then click **Save**.

    You can create more than one tag during this process. To do this continue by clicking the **+** symbol again to add another tag to the list. After adding all the tags you need to the list, click **Save** to create them.

The tag list automatically refreshes and you can see the new tag you created. If you click the three dots on the right hand side of your tag you are able to **Edit** or **Delete** it.  

> **Note:** Deleting a tag removes it from all the files it has been assigned to in the Digital Workspace.

## Categories

A category is a group of files, or other categories, that all relate to a project or concept. Content can be a part of more than one category, for example, a category called **Language** may include a language file called **English**, and the file may also exist within a category called **Country**. For more on their use in the Digital Workspace, see [Categories]({% link content-services/latest/using/content/tags-categories.md %}#categories)

To create a root level category:

1. Log into the Control Center.

2. Expand **Content Structuring** in the left pane and then select **Categories**.

3. Click the **Create** button on the top right.

4. Click the **+** symbol and enter a **Name** for the new category.

    You can create more than one category during this process. To do this continue by clicking the **+** symbol again to create another category and then click **Save**.

The category tree automatically refreshes and you can see the new category you created. If you click the three dots on the right hand side of your category you are able to **Create a subcategory**, **Edit** it, or **Delete** it.  

A category name does not need to be unique to the Control Center, it only needs to be unique within the level it sits in within the Control Center.

## Security Controls

You can add Security Controls to files and folders so that only users with the required security level can view or access them.
These security controls are created and configured using the Control Center and are applied to your files or folders from within the Digital Workspace. The Security Controls you create are made up of Controls created in the Control Center which are in turn made up of one or more Security Marks. You can create as many Security Marks that you require within the different Controls. The names of the Controls and Security Marks you create will be unique to your organization.

There are three different ways you can configure your Controls:

* **All** = Users must have all Security Marks from the group that are applied to a file to see that file.

    Example: A Security Group named Training contains Security Marks of Media and Data Handling. To see a file marked as both Media or Data Handling, a user must have both Media and Data Handling clearance.

* **Any** = Users must have at least one of the Security Marks from the group that are applied to a file to see that file.

    Example: A Security Group named Nationality contains Security Marks of UK, US, and Aus. To see a file marked as UK and US, a user must have UK and / or US clearance.

* **Hierarchical** = Security Marks are ranked in the order they're created. The mark created first in a security group has the greatest clearance, the one created last the least clearance.

    Example: The predefined Classification group has marks of Top Secret, Secret, and Classified. To see a file classified as Secret, the user must have Secret or Top Secret clearance.

## Security Controls in the Control Center

Use this example to create an **All** Control in the Control Center called Training that has three Security Marks, **Media**, **Data handling**, and **Backend management**.

> **Important:** All Security Marks you create are visible to all users within the Digital Workspace.

### Create Controls and Security Marks

Use the Control Center to create Controls.

1. Log into the Control Center as an administrator.

2. Expand the **Security** entry in the left pane and then click **Security Controls**.

    You can view and edit all of your Controls from here.

3. Click **Create New Control**.

4. Enter `Training` in the **Control Name** field.

5. Select **All** from the **Configuration** drop-down list.

    You can see from the example diagram the user has `Mark 2` security rights. When **All** is selected from the **Configuration** drop-down list it means they can only access files or directories that only have `Mark 2` Security Marks assigned to them.

6. Click the **+** symbol next to Security Marks.

7. Enter `Media` into the new row.

8. Click the **+** symbol again next to Security Marks.

9. Enter `Data handling` into the new row.

10. Click the **+** symbol again next to Security Marks.

11. Enter `Backend management` into the new row and then click **Save**.

You have created a new Control called Training that has three Security Marks. The Security Marks will be visible and useable within the Digital Workspace.

![security-controls]({% link digital-workspace/images/security-controls.png %})

## Troubleshooting

1. If you have issues running `docker-compose up` after deleting a previous Docker Compose cluster, try replacing step 4 in the initial Docker Compose instructions with:

    ```bash
    docker-compose down && docker-compose build --no-cache && docker-compose up
    ```

2. If you're having issues running `docker-compose up` on Windows environments due to unavailable or reserved ports, and get errors such as: `bind: An attempt was made to access a socket in a way forbidden by its access permissions` which means that the Windows NAT (WinNAT) service has reserved the port range that Docker Compose is trying to use.

    To remedy this issue, run the following in a terminal:

    ```bash
    net stop winnat
    docker-compose up
    net start winnat
    ```

3. Stop the session by using `CONTROL+C`.

4. Remove the containers (using the `--rmi all` option):

    ```bash
    docker-compose down --rmi all
    ```

5. Try allocating more memory resources, as advised in `docker-compose.yml`.

    For example, in Docker, change the memory setting in **Preferences** (or **Settings**) **Resources** > **Advanced** > **Memory** to at least 13 GB. Make sure you restart Docker and wait for the process to finish before continuing.

    Go back to step 4 in the initial Docker Compose instructions to start the deployment again.

> **Note:** You'll need a machine with at least 13 GB of memory to distribute among the Docker containers.
