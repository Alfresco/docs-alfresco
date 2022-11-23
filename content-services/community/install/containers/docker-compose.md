---
title: Install using Docker Compose
---

Use this information to quickly start up Community Edition using Docker Compose.

> **Note:** While Docker Compose is often used for production deployments, the Docker Compose file provided is recommended for development and test environments only. Customers are expected to adapt this file to their own requirements, if they intend to use Docker Compose to deploy a production environment.

To deploy Community Edition using Docker Compose, download and install [Docker](https://docs.docker.com/install/){:target="_blank"}, then follow the steps below. Make sure that you've reviewed the [prerequisites]({% link content-services/community/install/containers/index.md %}#prerequisites) before continuing.

1. Clone the project locally, and change directory to the project's `docker-compose` folder:

    ```bash
    git clone https://github.com/Alfresco/acs-deployment.git
    cd acs-deployment/docker-compose
    ```

    > **Note:** Make sure that exposed ports are open on your host computer. Check the `docker-compose.yml` file to determine the exposed ports - refer to the `host:container` port definitions. You'll see they include 5432, 8080, 8083 and others.

2. Deploy Community Edition, including the repository, Share, Postgres database, Search Services, etc.:

    ```bash
    docker-compose -f community-docker-compose.yml up
    ```

    This downloads the images, fetches all the dependencies, creates each container, and then starts the system:

    ```text
    ...
    ⠿ Network docker-compose_default                 Created        ...        0.2s
    ⠿ Container docker-compose-alfresco-1            Created        ...        1.7s
    ⠿ Container docker-compose-postgres-1            Created        ...        1.8s
    ⠿ Container docker-compose-share-1               Created        ...        1.7s
    ⠿ Container docker-compose-activemq-1            Created        ...        1.8s
    ⠿ Container docker-compose-transform-core-aio-1  Created        ...        1.7s
    ⠿ Container docker-compose-solr6-1               Created        ...        1.8s
    ⠿ Container docker-compose-content-app-1         Created        ...        1.7s
    ⠿ Container docker-compose-proxy-1               Created        ...        0.1s
    Attaching to docker-compose-activemq-1, docker-compose-alfresco-1, docker-compose-content-app-1, docker-compose-postgres-1, docker-compose-proxy-1, docker-compose-share-1, docker-compose-solr6-1, docker-compose-transform-core-aio-1
    d
    ...
    ```

    Note that the name of each container begins with the folder name you created in step 2.

    As an alternative, you can also start the containers in the background by running `docker-compose up -d`.

3. Wait for the logs to complete, showing messages:

    ```bash
    ...
    docker-compose-alfresco-1            | 2022-07-27 09:17:20,649  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-3] Starting 'Transformers' subsystem, ID: [Transformers, default]
    docker-compose-alfresco-1            | 2022-07-27 09:17:20,930  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-3] Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
    ...
    ```

    See [Troubleshooting](#troubleshooting) if you encounter errors whilst the system is starting up.

4. Open your browser and check everything starts up correctly:

    | Service | Endpoint |
    | ------- | -------- |
    | Administration and REST APIs | `http://localhost:8080/alfresco` |
    | Share | `http://localhost:8080/share` |
    | Alfresco Content App | `http://localhost:8080/content-app` |
    | Search Services administration | `http://localhost:8083/solr` |

    If Docker is running on your local machine, the IP address will be just `localhost`.

    If you're still using the [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/){:target="_blank"}, you'll need to switch to [Docker Desktop](https://docs.docker.com/install/){:target="_blank"} as Docker Toolbox is deprecated.

5. Log in as the `admin` user. Enter the default administrator password `admin`.

## Check system start up

Use this information to verify that the system started correctly, and to clean up the deployment.

1. Open a new terminal window.

2. Change directory to the `docker-compose` folder that you created in the deployment steps.

3. Verify that all the services started correctly.

    1. List the images and additional details:

        ```bash
        docker-compose images
        ```

        You should see a list of the services defined in your `docker-compose.yaml` file:

        ```text
        Container                             Repository                                       Tag                        Image Id        Size  
        ----------------------------------------------------------------------------------------------------------------------------------------
        docker-compose-activemq-1             alfresco/alfresco-activemq                       5.17.1-jre11-rockylinux8   0cd1a9629a85    631.6MB
        docker-compose-alfresco-1             alfresco/alfresco-content-repository-community   7.3.0                      b377cd61b11c    1.165GB
        docker-compose-content-app-1          alfresco/alfresco-content-app                    3.1.0                      e5dc9193309f    45.18MB
        docker-compose-postgres-1             postgres                                         14.4                       e09e90144645    376.1MB
        docker-compose-proxy-1                alfresco/alfresco-acs-nginx                      3.4.2                      f9c4519b7920    23.45MB
        docker-compose-share-1                alfresco/alfresco-share                          7.3.0                      e77a380ab703    720.4MB
        docker-compose-solr6-1                alfresco/alfresco-search-services                2.0.5                      936f6335d2e5    919.5MB
        docker-compose-transform-core-aio-1   alfresco/alfresco-transform-core-aio             3.0.0                      c97305a9232a    1.687GB
        ```

    2. List the running containers:

        ```bash
        docker-compose ps
        ```

        You should see a list of the services defined in the `docker-compose.yaml` file.

    3. View the log files for each service `<service-name>`, or container `<container-name>`:

        ```bash
        docker-compose logs <service-name>
        docker container logs <container-name>
        ```

        For example, to check the logs for Share, run any of the following commands:

        ```bash
        docker-compose logs share
        docker container logs docker-compose_share_1
        ```

        You can add an optional parameter `--tail=25` before `<container-name>` to display the last 25 lines of the logs for the selected container.

        ```bash
        docker-compose logs --tail=25 share
        docker container logs --tail=25 docker-compose_share_1
        ```

        Check for a success message:

        ```text
        Successfully retrieved license information from Alfresco.
        ```

    Once you've tested the services, you can clean up the deployment by stopping the running services.

4. Stop the session by using `CONTROL+C` in the same window as the running services:

    ```text
    ^CGracefully stopping... (press Ctrl+C again to force)
    [+] Running 8/8
     ⠿ Container docker-compose-transform-core-aio-1  Stopped    ...
     ⠿ Container docker-compose-solr6-1               Stopped    ...
     ⠿ Container docker-compose-postgres-1            Stopped    ...
     ⠿ Container docker-compose-proxy-1               Stopped    ...
     ⠿ Container docker-compose-activemq-1            Stopped    ...
     ⠿ Container docker-compose-alfresco-1            Stopped    ...
     ⠿ Container docker-compose-share-1               Stopped    ...
     ⠿ Container docker-compose-content-app-1         Stopped    ...
    ```

5. Alternatively, you can open a new terminal window, change directory to the `docker-compose` folder, and run:

    ```bash
    docker-compose down
    ```

    This stops the running services, as shown in the previous example, and removes them from memory:

    ```text
    ...
    ⠿ Container docker-compose-transform-core-aio-1  Removed    ...
    ⠿ Container docker-compose-solr6-1               Removed    ...
    ⠿ Container docker-compose-postgres-1            Removed    ...
    ⠿ Container docker-compose-proxy-1               Removed    ...
    ⠿ Container docker-compose-activemq-1            Removed    ...
    ⠿ Container docker-compose-alfresco-1            Removed    ...
    ⠿ Container docker-compose-share-1               Removed    ...
    ⠿ Container docker-compose-content-app-1         Removed    ...
    ⠿ Network docker-compose_default                 Removed    ...
    ...
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
        docker-compose down --rmi all
        ```

        The `--rmi all` option also removes the images created by `docker-compose up`, and the images used by any service. You can use this, for example, if any containers fail and you need to remove them:

        ```text
        ...
        ⠿ Container docker-compose-solr6-1                              Removed        ...        10.6s
        ⠿ Container docker-compose-transform-core-aio-1                 Removed        ...        1.6s
        ⠿ Container docker-compose-proxy-1                              Removed        ...        10.4s
        ⠿ Container docker-compose-postgres-1                           Removed        ...         0.5s
        ⠿ Container docker-compose-activemq-1                           Removed        ...        10.7s
        ⠿ Container docker-compose-share-1                              Removed        ...        10.7s
        ⠿ Container docker-compose-alfresco-1                           Removed        ...         1.3s
        ⠿ Network docker-compose_default
        ⠿ Image alfresco/alfresco-activemq:5.17.1-jre11-centos7         Removed        ...
        ...
        ```

See the [Docker documentation](https://docs.docker.com/){:target="_blank"} for more on using Docker.

### Deployment project in GitHub

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment){:target="_blank"} GitHub project for more details.

* In this project, you’ll find several Docker Compose files. The default `docker-compose.yml` file contains the latest work-in-progress deployment scripts, and installs the latest *development* version of Content Services.
* To deploy a specific released version of Content Services, several *major.minor* Docker Compose files are provided in the `docker-compose` folder of the project.
* To modify your development environment, for example to change or mount files in the existing images, you’ll have to create new custom Docker images (recommended approach). The same approach applies if you want to install AMP files into the repository and Share images. See the [Customization guidelines](https://github.com/Alfresco/acs-deployment/blob/master/docs/docker-compose/examples/customisation-guidelines.md){:target="_blank"} for more.

Using the Community Compose file in this project deploys the following system:

![Docker Compose - Community]({% link content-services/images/compose-community.png %}){:width="750" height="346px"}

## Cleanup

To bring the system down and cleanup the containers run the following command:

```bash
docker-compose down
```

## Troubleshooting

1. If you have issues running `docker-compose up` after deleting a previous Docker Compose cluster, try replacing step 2 in the initial Docker Compose instructions with:

    ```bash
    docker-compose down && docker-compose build --no-cache && docker-compose -f community-docker-compose.yml up
    ```

    > **Note:** Make sure that the `docker-compose up` part of the command uses the format you chose in step 2.

2. Stop the session by using `CONTROL+C`.

3. Remove the containers (using the `--rmi all` option):

    ```bash
    docker-compose down --rmi all
    ```

4. Try allocating more memory resources, as advised in `docker-compose.yml`.

    For example, in Docker, change the memory setting in **Preferences** (or **Settings**) **Resources** > **Advanced** > **Memory** to at least 8GB. Make sure you restart Docker and wait for the process to finish before continuing.

    Go back to step 2 in the initial Docker Compose instructions to start the deployment again.

> **Note:** You'll need a machine with at least 13GB of memory to distribute among the Docker containers.
