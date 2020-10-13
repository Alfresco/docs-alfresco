---
title: Install Docker Compose
---

Use this information to quickly start up Alfresco Content Services (including Transform Service) using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is only recommended for development and test environments.

Since we need to use private (Enterprise-only) Docker images from Quay.io, you need credentials to be able to pull those images from Quay.io. Alfresco customers can request their credentials by logging a ticket at [https://support.alfresco.com/](https://support.alfresco.com/).

To deploy Alfresco Content Services using `docker-compose`, download and install [Docker](https://docs.docker.com/install/){:target="_blank"}, then follow the steps below.

To check which branch tag corresponds to a specific Alfresco Content Services release, review the [release versions](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/helm-chart-releases.md){:target="_blank"} page in GitHub. Choose a version from the left column that corresponds to the required Alfresco Content Services version you want to deploy.

1. Clone the project locally, and then change directory to the project folder:

    ```bash
    git clone --branch x.y.z https://github.com/Alfresco/acs-deployment.git
    cd acs-deployment/docker-compose
    ```

    > **Note:** Replace the version number `x.y.z` with the tag that matches the Alfresco Content Services version you want to deploy. For example, if you want Alfresco Content Services 6.2.2, then select tag `4.1.0`.
    > **Note:** Make sure that exposed ports are open on your host computer. Check the `docker-compose.yml` file to determine the exposed ports - refer to the `host:container` port definitions. You'll see they include 5432, 8080, 8083 and others.

2. Log in to Quay.io using your credentials:

    ```bash
    docker login https://quay.io
    ```

    You'll need your [Quay.io](https://quay.io){:target="_blank"} account credentials to access the Docker images. If you don't already have these credentials, contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

3. Deploy Alfresco Content Services, including the repository, Share, Postgres database, Search Services, and Transform Service:

    ```bash
    docker-compose up
    ```

    This downloads the images, fetches all the dependencies, creates each container, and then starts the system:

    ```bash
    Creating docker-compose_digital-workspace_1  ... done
    Creating docker-compose_alfresco_1           ... done
    Creating docker-compose_activemq_1           ... done
    Creating docker-compose_share_1              ... done
    Creating docker-compose_solr6_1              ... done
    Creating docker-compose_shared-file-store_1  ... done
    Creating docker-compose_sync-service_1       ... done
    Creating docker-compose_postgres_1           ... done
    Creating docker-compose_proxy_1              ... done
    Creating docker-compose_transform-router_1   ... done
    Creating docker-compose_transform-core-aio_1 ... done
    Attaching to docker-compose_digital-workspace_1, docker-compose_shared-file-store_1, docker-compose_alfresco_1,
    ```

    As an alternative, you can also start the containers in the background by running `docker-compose up -d`.

4. Wait for the logs to show messages:

    ```bash
       alfresco_1 | 2020-07-06 11:50:46,808  WARN ... The Alfresco Content Services license will expire in 2 days.
       alfresco_1 | 2020-07-06 11:50:50,938  INFO ... Starting 'Transformers' subsystem, ID: [Transformers, default]
       alfresco_1 | 2020-07-06 11:50:50,371  INFO ... Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
        ```

    If you encounter errors whilst the system is starting up:

    * Stop the session (by using `CONTROL+C`).
    * Remove the container using `--rmi all`. This option also removes the images created by docker-compose up, and the images used by any service. You can use this, for example, if any containers fail and you need to remove them.
    * Try allocating more memory resources, as advised in `docker-compose.yml`. For example, in Docker, change the memory setting in **Preferences** (or **Settings**) \> **Advanced** \> **Memory**, to at least 6 GB. Make sure you restart Docker and wait for the process to finish before continuing.
    * Go back to step [3] and start the deployment again.
    > **Note:** Although 16 GB is the required minimum memory setting, keep in mind that 6 GB is much lower than the required minimum, and may need to be adapted for your environment.

5. Open your browser and check everything starts up correctly:

    |Service|Endpoint|
    |-------|--------|
    |Administration and REST APIs|`http://localhost:8080/alfresco`|
    |Share|`http://localhost:8080/share`|
    |Digital Workspace|`http://localhost:8080/workspace`|
    |Search Services administration|`http://localhost:8083/solr`|
    |Transform Router configuration|`http://localhost:8095/transform/config`|
    |ActiveMQ Admin Web Console|`http://localhost:8161/admin`|

6. Log in as the `admin` user. Enter the default administrator password `admin`.

You can use a number of commands to check that the system started correctly, see below.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/tree/support/SP/4.N) GitHub project documentation for the prerequisites and detailed setup: [Deploying using Docker Compose](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/docker-compose-deployment.md){:target="_blank"}.

## Checking system start up

Use this information to verify that the system started correctly, and to clean up the deployment.

1. Open a new terminal window.

2. Change directory to the `docker-compose` folder that you created in the deployment steps.

3. Verify that all the services started correctly.

    1. List the images and additional details:

        ```bash
        docker-compose images
        ```

        You should see a list of the services defined in your `docker-compose.yaml` file:

        ```bash
             Container                                 Repository                           ...     Size
        ----------------------------------------------------------------------------------------------------
        docker-compose_activemq_1             alfresco/alfresco-activemq                    ...   545.9 MB
        docker-compose_alfresco_1             alfresco/alfresco-content-repository          ...   1.324 GB
        docker-compose_digital-workspace_1    quay.io/alfresco/alfresco-digital-workspace   ...   34.35 MB
        docker-compose_postgres_1             postgres                                      ...   312.5 MB
        docker-compose_proxy_1                alfresco/alfresco-acs-nginx                   ...   20.42 MB
        docker-compose_share_1                alfresco/alfresco-share                       ...   867.6 MB
        docker-compose_shared-file-store_1    alfresco/alfresco-shared-file-store           ...   777.8 MB
        docker-compose_solr6_1                alfresco/alfresco-search-services             ...   1.022 GB
        docker-compose_sync-service_1         quay.io/alfresco/service-sync                 ...   809.7 MB
        docker-compose_transform-core-aio_1   alfresco/alfresco-transform-core-aio          ...   1.707 GB
        docker-compose_transform-router_1     quay.io/alfresco/alfresco-transform-router    ...   729.8 MB
        ```

    2. List the running containers:

        ```bash
        docker-compose ps
        ```

        You should see a list of the services defined in the `docker-compose.yaml` file.

    3. View the log files for each service `<service-name>`, or container `<container-name>`:

        ```bash
        docker-compose logs <service-name>
        docker container logs `<container-name>`
        ```

        For example, to check the logs for Share, run any of the following commands:

        ```bash
        docker-compose logs share
        docker container logs docker-compose_share_1
        ```

        You can add an optional parameter `--tail=25` before `<container-name>` to display the last 25 lines of the logs for the selected container.

        ```bash
        docker container logs --tail=25 docker-compose_share_1
        ```

        Check for a success message:

        ```bash
        Successfully retrieved license information from Alfresco.
        ```

    Once you've tested the services, you can clean up the deployment by stopping the running services.

4. Stop the session by using `CONTROL+C` in the same window as the running services:

    ```bash
    ^CGracefully stopping... (press Ctrl+C again to force)
    Stopping docker-compose_transform-core-aio_1 ... done
    Stopping docker-compose_transform-router_1   ... done
    Stopping docker-compose_proxy_1              ... done
    Stopping docker-compose_sync-service_1       ... done
    Stopping docker-compose_shared-file-store_1  ... done
    Stopping docker-compose_postgres_1           ... done
    Stopping docker-compose_activemq_1           ... done
    Stopping docker-compose_share_1              ... done
    Stopping docker-compose_solr6_1              ... done
    Stopping docker-compose_alfresco_1           ... done
    Stopping docker-compose_digital-workspace_1  ... done
    ```

5. Alternatively, you can open a new terminal window, change directory to the `docker-compose` folder, and run:

    ```bash
    docker-compose down
    ```

    This stops the running services, as shown in the previous example, and removes them from memory:

    ```bash
    Stopping docker-compose_transform-core-aio_1 ... done
    ...
    Stopping docker-compose_digital-workspace_1  ... done
    Removing docker-compose_transform-core-aio_1 ... done
    ...
    Removing docker-compose_digital-workspace_1  ... done
    Removing network docker-compose_default
    ```

6. You can use a few more commands to explore the services when they're running. Change directory to `docker-compose` before running these:

    1. Stop all the running containers:

        ```bash
        docker-compose stop
        ```

    2. Restart the containers (after using the `stop` command):

        ```bash
        docker-compose restart
        ```

    3. Starts the containers that were started with `docker-compose up`:

        ```bash
        docker-compose start
        ```

    4. Stop all running containers, and remove them and the network:

        ```bash
        docker-compose down [--rmi all]
        ```

        The `--rmi all` option also removes the images created by `docker-compose up`, and the images used by any service. You can use this, for example, if any containers fail and you need to remove them.

See the [Docker documentation](https://docs.docker.com/){:target="_blank"} for more on getting started with Docker and using Docker.
