---
title: Control Center
---

Alfresco Control Center is being developed to allow the administration of multiple Alfresco applications from a single, modern interface. It will provide admin functions that are currently only available in Alfresco Share and will eventually allow the full administration of Alfresco Content Services and Alfresco Governance Services without needing to use the Share application.

The initial release focusses on the basic minimum requirements to configure Content Services - the creation of users and groups of users. Additional functionality will be added in future releases.

## Overview

The Control Center is provided as a Docker image for containerized deployment. It is recommended for evaluations only (i.e. test and development environments), and accessed using the `/admin` URL.

Expand the **Identity** section to see the two main areas the Control Center covers:

* A **Users** section used to manage your users.
* A **Groups** section used to manage the groups to which your users may be added.

> **Note:** This provides an alternative way of managing users and groups in [Share Admin Tools]({% link content-services/latest/admin/share-admin-tools.md %})

## Prerequisites

There are a number of software requirements for installing the Control Center.

### Containerized deployment

The images downloaded directly from [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"}, or [Quay.io](https://quay.io/){:target="_blank"} are for a limited trial of the Enterprise version of Content Services that goes into read-only mode after 2 days. For a longer (30-day) trial, get the Alfresco Content Services [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}.

> **Note:** A [Quay.io](https://quay.io/){:target="_blank"} account is needed to pull the Docker images that are needed:
>
> * `quay.io/alfresco/alfresco-admin-app`

> **Note:** Alfresco customers can request Quay.io credentials by logging a ticket with [Alfresco Support](https://support.alfresco.com/){:target="_blank"}. These credentials are required to pull private (Enterprise-only) Docker images from Quay.io.

#### Software requirements (Docker)

* [Docker](https://docs.docker.com/install/){:target="_blank"} (latest stable version)
  * This allows you to run Docker images and `docker-compose` on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

> **Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose.

See [Install with Docker Compose]({% link content-services/latest/install/containers/docker-compose.md %}) for more details.

## Install Content Services using Docker Compose

These steps describe how to install Control Center to an instance of Content Services using Docker Compose.

> **Note:** While Docker Compose is often used for production deployments, the Docker Compose file provided is recommended for development and test environments only. Customers are expected to adapt this file to their own requirements, if they intend to use Docker Compose to deploy a production environment.

To deploy Content Services using Docker Compose, download and install [Docker](https://docs.docker.com/install/){:target="_blank"}, then follow the steps below. Make sure that you've reviewed the [prerequisites](#prerequisites) before continuing.

1. Download the `docker-compose.yml` file by accessing the Content Services [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"} page, which will give you a 30-day license.

    If you already have a valid license file for Content Services 7.2, you can apply it directly to the running system. See [Uploading a new license]({% link content-services/latest/admin/license.md %}) for more details.

    > **Note:** Make sure that exposed ports are open on your host computer. Check the `docker-compose.yml` file to determine the exposed ports - refer to the `host:container` port definitions. You'll see they include 5432, 8080, 8083 and others.

    > **Note:** The Download Trial is usually updated for *major.minor* versions of Content Services. The latest published version on our website is labelled *Version 7.2 - March 2022)*.

2. Save the `docker-compose.yml` file in a local folder.

3. Log in to Quay.io using your credentials:

    ```bash
    docker login quay.io
    ```

    Alfresco customers can request Quay.io credentials by logging a ticket with [Alfresco Support](https://support.alfresco.com/){:target="_blank"}. These credentials are required to pull private (Enterprise-only) Docker images from Quay.io.

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
    | Control Center | `http://localhost:8080/admin` <!--CHECK--> |
    | Administration and REST APIs | `http://localhost:8080/alfresco` |
    | Share | `http://localhost:8080/share` |
    | Digital Workspace | `http://localhost:8080/workspace` |
    | Search Services administration | `http://localhost:8083/solr` |
    | Sync Service health check | `http://localhost:9090/alfresco/healthcheck` |

    If Docker is running on your local machine, the IP address will be just `localhost`.

    If you're using the [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/){:target="_blank"}, run the following command to find the IP address:

    ```bash
    docker-machine ip
    ```

7. Log in to the Control Center as the `admin` user. Enter the default administrator password `admin`.

To continue, go to the [Manage Users](#manage-users) section.

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

> **Note:** You'll need a machine with at least 13GB of memory to distribute among the Docker containers.

## Manage users

The **Identity** section of the application is used to create and manage users, and groups.

The **Users** section displays the current list of users in the system.

### Properties {#user-properties}

The properties for users are:

| Property | Description |
| -------- | ----------- |
| ID | A unique identifier for the user. This is system generated and cannot be changed. |
| Username | **Mandatory.** A username for the user. |
| Email | An email address associated to the user. |
| First Name | The first name of the user. |
| Last Name | The last name of the user. |
| Password | The password for the user account. <br><br>**Note:** Enter a minimum of eight characters otherwise you won't be able to see the **Create** button. |
| Verify password | Re-enter the password for the user. Make sure that you type the same password you typed in the **Password** field. |
| Enabled | Select the checkbox to enable the user. |

### Add a user

To add a user:

1. Sign into the application.

2. Expand the **Identity** section and select **Users**.

3. Click the **Add User** button.

4. Fill in the properties for a user and click **Create**.

    All fields marked with an asterisk (*) are required.

Once the user has been created, **Edit** the user to assign groups to the user and reset a user's password.

> **Note:** A `Username` cannot be changed once a user has been created.

## Manage groups

The **Groups** section displays the current list of groups in the system.

Groups are used to create both top level user groups and subgroups within existing groups, and to quickly assign users.

### Properties {#group-properties}

The properties for groups are:

| Property | Description |
| -------- | ----------- |
| Group ID | Enter a unique identifier for the group. |
| Name | A name to identify the group.

### Add a group

To add a group:

1. Sign into the application.

2. Expand the **Identity** section and select **Groups**.

3. Click the **Add Group** button.

4. Give a name to the group and click **Save**.

Once the group has been created, **Edit** the group to assign users to it. You also have the option to:

* Edit a group to assign users to the group, or to edit the group name.
* Delete a group to remove the group from your system.
