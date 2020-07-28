---
title: Deploying using Docker Compose
---

Use this information to quickly start up Alfresco Content Services using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.

To deploy Alfresco Content Services using docker-compose, download and install [Docker](https://docs.docker.com/install/){:target="_blank"}, then follow the steps below.

1. Download the `docker-compose.yml` file by accessing the Alfresco Content Services [trial download page](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}, which will give you an initial 30-day license.

    If you already have a system up and running, and would like to extend the trial license period, you can [download the license](https://www.alfresco.com/platform/content-services-ecm/trial/docker){:target="_blank"} and apply it directly to the running system. See [Uploading a license]() for more.

    > **Note**: Make sure that exposed ports are open on your host computer. Check the `docker-compose.yml` file to determine the exposed ports - refer to the `host:container` port definitions. You'll see they include 5432, 8080, 8083 and others.

2. Save the `docker-compose.yml` file in a local folder.

    For example, you can create a folder `acs-trial`.

3. Change directory to the location of your `docker-compose.yml` file.

4. Log in to Quay.io using your credentials:

    ```bash
    docker login quay.io
    ```

    Alfresco customers can request Quay.io credentials by logging a ticket with [Alfresco Support](https://support.alfresco.com/){:target="_blank"}. These credentials are required to pull private (Enterprise-only) Docker images from Quay.io.

5. Deploy Alfresco Content Services, including the repository, Share, Postgres database, Search Services, etc.:

    ```bash
    docker-compose up
    ```

    This downloads the images, fetches all the dependencies, creates each container, and then starts the system:

    ```bash
    ...
    Creating acs-trial_digital-workspace_1  ... done
    Creating acs-trial_alfresco_1           ... done
    Creating acs-trial_activemq_1           ... done
    Creating acs-trial_share_1              ... done
    Creating acs-trial_solr6_1              ... done
    Creating acs-trial_shared-file-store_1  ... done
    Creating acs-trial_sync-service_1       ... done
    Creating acs-trial_postgres_1           ... done
    Creating acs-trial_proxy_1              ... done
    Creating acs-trial_transform-router_1   ... done
    Creating acs-trial_transform-core-aio_1 ... done
    Attaching to acs-trial_digital-workspace_1, acs-trial_shared-file-store_1, acs-trial_alfresco_1,    acs-trial_sync-service_1, 
    ...
    ...
    ```

    Note that the name of each container begins with the folder name you created in step 2.

    As an alternative, you can also start the containers in the background by running docker-compose up -d.

6. Wait for the logs to complete, showing messages:

    ```bash
    ...
    alfresco_1 | 2020-07-06 11:50:46,808  WARN ... The Alfresco Content Services license will expire in 2 days.
    ...
    alfresco_1 | 2020-07-06 11:50:50,938  INFO ... Starting 'Transformers' subsystem, ID: [Transformers, default]
    alfresco_1 | 2020-07-06 11:50:50,371  INFO ... Startup of 'Transformers' subsystem, ID: [Transformers, default]     complete
    ...
    ```

    If you encounter errors whilst the system is starting up:

    * Stop the session by using `CONTROL+C`, or alternatively, stop and restart using:

        ```bash
        docker-compose down && docker-compose build --no-cache && docker-compose up
        ```

    * Remove the containers (using the `--rmi all` option):

        ```bash
        docker-compose down --rmi all
        ```

    * Try allocating more memory resources, as advised in `docker-compose.yml`. For example, in Docker, change the memory   setting in **Preferences** (or **Settings**) > **Advanced** > **Memory**, to at least 6 GB. Make sure you restart Docker and wait for the process to finish before continuing.

    * Go back to step 5 (above) to start the deployment again.

    > **Note:** Although 16 GB is the required minimum memory setting, keep in mind that 6 GB is much lower than the required minimum, and may need to be adapted for your environment.

7. Open your browser and check everything starts up correctly: 

    | Service | Endpoint |
    | ------- | -------- |
    | Administration and REST APIs | `http://localhost:8080/alfresco` |
    | Share | `http://localhost:8080/share` |
    | Digital Workspace | `http://localhost:8080/workspace` |
    | Search Services administration | `http://localhost:8083/solr` |
    | Sync Service healthcheck | `http://localhost:9090/alfresco/healthcheck` |

8. Log in as the admin user. Enter the default administrator password `admin`.

You can use a number of commands to check that the system started correctly. See [Checking system start up]() for more.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/tree/support/SP/4.N){:target="_blank"} GitHub project documentation for the prerequisites and detailed setup: [Deploying using Docker Compose](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/docker-compose-deployment.md){:target="_blank"}.

In this project, you can use the `docker-compose.yml` file following the documentation for standard installations, or [customize the file](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/customising-deployment.md){:target="_blank"} to apply settings as appropriate to your specific deployment environment.
