---
title: Install using Docker Compose
---

Use this information to quickly deploy Governance Services using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.

## Prerequisites and supported platforms

* [Docker](https://docs.docker.com/install/)
  * This allows you to run Docker images and Docker Compose on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/)
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

> **Note:** Make sure that the following ports are free on your computer: 5432, 8080, 8082, 8083. These ports are set in the `docker-compose.yml` file.

## Installation steps

1. Download the Alfresco Community Edition [docker-compose.yml](https://raw.githubusercontent.com/Alfresco/acs-deployment/master/docker-compose/community-docker-compose.yml) file from GitHub.

2. Save the file in a local folder.

3. Edit the file and change the following two services:

    Add a `#` prefix to the Alfresco Content Repository and Alfresco Share Docker image locations so they are commented out, and add the Alfresco Governance image locations:

    ```text
    services:
        alfresco:
            #image: alfresco/alfresco-content-repository-community:23.1.0
            image: alfresco/alfresco-governance-repository-community:23.1.0
            ... 
    ```

    ```text
        share:
            #image: alfresco/alfresco-share:23.1.0
            image: alfresco/alfresco-governance-share-community:23.1.0
            ... 
    ```

4. In the command prompt change directory to the location of the `docker-compose.yml` file and deploy Governance Services using the following command:

   ```bash
    $ docker-compose up
   ```

   This downloads the images, fetches all the dependencies, creates each container, and then starts the system. If you downloaded the project and changes were made to the project settings, any new images will be pulled before the system starts.

   As an alternative, you can also start the containers in the background by running:

   ```bash
    $ docker-compose up -d
   ```

5. Wait for the logs to complete.

    ```text
    ...
    alfresco_1  | 02-Nov-2023 13:59:36,469 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
    alfresco_1  | 02-Nov-2023 13:59:36,469 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
    alfresco_1  | 02-Nov-2023 13:59:36,903 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 226026 ms
    ```

    If you encounter errors whilst the system is starting up:

    * Stop the session (by using `CONTROL+C`).
    * Remove the container (using the `--rmi all` option). For example:

       ```bash
       $ docker-compose down --rmi all
       ```

    * Try allocating more memory resources, as advised in `docker-compose.yml`. For example, in Docker, change the memory setting in **Preferences** (or **Settings**) > **Advanced** > **Memory**, to at least 6 GB. Make sure you restart Docker and wait for the process to finish before continuing.
    * Go back and retry the deployment.

    > **Note:** Although 16 GB is the required minimum memory setting, keep in mind that 6 GB is much lower than the required minimum, and may need to be adapted for your environment.

6. Open your browser and check everything starts up correctly:

    * Share: `http://localhost:8080/share`

Final step before you can start with Records Management is to [create the Records Management site]({% link governance-services/community/install/create-rm-site.md %}).
