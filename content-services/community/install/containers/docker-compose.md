---
title: Install using Docker Compose
---

Use this information to quickly start up Community Edition using Docker Compose. 

> **Please Note:** While Docker Compose is often used for production deployments, the Docker Compose file provided here is recommended for development and test environments only. Customers are expected to adapt this file to their own requirements, if they intend to use Docker Compose to deploy a production environment. 

To deploy Community Edition using Docker Compose`, download and install [Docker](https://docs.docker.com/install/){:target="_blank"}, then follow the steps below. Make sure that you've reviewed the [prerequisites]({% link content-services/community/install/containers/index.md %}#prerequisites) before continuing.

1. Clone the project locally, change directory to the project folder, and switch to the release branch:

    ```bash
    git clone https://github.com/Alfresco/acs-deployment.git
    cd acs-deployment
    ```

    > **Note:** Make sure that exposed ports are open on your host computer. Check the `docker-compose.yml` file to determine the exposed ports - refer to the `host:container` port definitions. You'll see they include 5432, 8080, 8083 and others.

2. Save the `docker-compose.yml` file in a local folder.

    For example, you can create a folder `docker-compose`.

3. Change directory to the location of your `docker-compose.yml` file.

4. Deploy Community Edition, including the repository, Share, Postgres database, Search Services, etc.:

    ```bash
    docker-compose up
    ```

    This downloads the images, fetches all the dependencies, creates each container, and then starts the system:

    ```text
    ...
    Creating docker-compose_postgres_1              ... done
    Creating docker-compose_activemq_1              ... done
    Creating docker-compose_libreoffice_1           ... done
    Creating docker-compose_imagemagick_1           ... done
    Creating docker-compose_transform-misc_1        ... done
    Creating docker-compose_alfresco_1              ... done
    Creating docker-compose_solr6_1                 ... done
    Creating docker-compose_alfresco-pdf-renderer_1 ... done
    Creating docker-compose_tika_1                  ... done
    Creating docker-compose_share_1                 ... done
    Creating docker-compose_proxy_1                 ... done
    Attaching to docker-compose_alfresco-pdf-renderer_1, docker-compose_share_1, docker-compose_tika_1, docker-compose_al...
    ...
    ```

    Note that the name of each container begins with the folder name you created in step 2.

    As an alternative, you can also start the containers in the background by running `docker-compose up -d`.

5. Wait for the logs to complete, showing messages:

    ```bash
    ...
    alfresco_1 | 2019-10-28 09:50:50,388  INFO ... Starting 'Transformers' subsystem, ID: [Transformers, default]
    alfresco_1 | 2019-10-28 09:50.50,782  INFO ... Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
    ...
    ```

    See [Troubleshooting](#troubleshooting) if you encounter errors whilst the system is starting up.

6. Open your browser and check everything starts up correctly:

    | Service | Endpoint |
    | ------- | -------- |
    | Administration and REST APIs | `http://localhost:8080/alfresco` |
    | Share | `http://localhost:8080/share` |
    | Search Services administration | `http://localhost:8083/solr` |

    If Docker is running on your local machine, the IP address will be just `localhost`.

    If you're using the [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/){:target="_blank"}, run the following command to find the IP address:

    ```bash
    docker-machine ip
    ```

7. Log in as the `admin` user. Enter the default administrator password `admin`.

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
                Container                           Repository                              ...       Size
        --------------------------------------------------------------------------------------------------
        docker-compose_activemq_1                alfresco/alfresco-activemq                       ...   521 MB
        docker-compose_alfresco-pdf-renderer_1   alfresco/alfresco-pdf-renderer                   ...   670 MB
        docker-compose_alfresco_1                alfresco/alfresco-content-repository-community   ...   1.31 GB
        docker-compose_imagemagick_1             alfresco/alfresco-imagemagick                    ...   793 MB
        docker-compose_libreoffice_1             alfresco/alfresco-libreoffice                    ...   1.28 GB
        docker-compose_postgres_1                postgres                                         ...   298 MB
        docker-compose_proxy_1                   alfresco/acs-community-ngnix                     ...   19.5 MB
        docker-compose_share_1                   alfresco/alfresco-share                          ...   749 MB
        docker-compose_solr6_1                   alfresco/alfresco-search-services                ...   1.02e+03 MB
        docker-compose_tika_1                    alfresco/alfresco-tika                           ...   804 MB
        docker-compose_transform-misc_1          alfresco/alfresco-transform-misc                 ...   712 MB
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
    Stopping docker-compose_proxy_1                 ... done
    Stopping docker-compose_alfresco_1              ... done
    Stopping docker-compose_libreoffice_1           ... done
    Stopping docker-compose_imagemagick_1           ... done
    Stopping docker-compose_postgres_1              ... done
    Stopping docker-compose_solr6_1                 ... done
    Stopping docker-compose_alfresco-pdf-renderer_1 ... done
    Stopping docker-compose_tika_1                  ... done
    Stopping docker-compose_share_1                 ... done
    Stopping docker-compose_transform-misc_1        ... done
    Stopping docker-compose_activemq_1              ... done
    ```

5. Alternatively, you can open a new terminal window, change directory to the `docker-compose` folder, and run:

    ```bash
    docker-compose down
    ```

    This stops the running services, as shown in the previous example, and removes them from memory:

    ```text
    Stopping docker-compose_compose_proxy_1         ... done
    Stopping docker-compose_alfresco_1              ... done
    ...
    Removing docker-compose_proxy_1                 ... done
    Removing docker-compose_alfresco_1              ... done
    Removing docker-compose_libreoffice_1           ... done
    Removing docker-compose_imagemagick_1           ... done
    Removing docker-compose_postgres_1              ... done
    Removing docker-compose_solr6_1                 ... done
    Removing docker-compose_alfresco-pdf-renderer_1 ... done
    Removing docker-compose_tika_1                  ... done
    Removing docker-compose_share_1                 ... done
    Removing docker-compose_transform-misc_1        ... done
    Removing docker-compose_activemq_1              ... done
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

        The `--rmi all` option also removes the images created by `docker-compose up`, and the images used by any service. You can use this, for example, if any containers fail and you need to remove them:

        ```text
        Stopping docker-compose_proxy_1
        ...
        Removing docker-compose_proxy_1
        ...
        Removing network docker-compose_default
        Removing image alfresco/alfresco-content-repository-community:6.2.0-ga
        Removing image ...
        ```

See the [Docker documentation](https://docs.docker.com/){:target="_blank"} for more on using Docker.

### Deployment project in GitHub

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/){:target="_blank"} GitHub project for more details.

* In this project, you’ll find several Docker Compose files. The default `docker-compose.yml` file contains the latest work-in-progress deployment scripts, and installs the latest *development* version of Content Services.
* To deploy a specific released version of Content Services, several *major.minor* Docker Compose files are provided in the `docker-compose` folder of the project.
* To modify your development environment, for example to change or mount files in the existing images, you’ll have to create new custom Docker images (recommended approach). The same approach applies if you want to install AMP files into the repository and Share images. See the [Customization guidelines](https://github.com/Alfresco/acs-deployment/blob/master/docs/docker-compose/examples/customisation-guidelines.md){:target="_blank"} for more.

Using the Community Compose file in this project deploys the following system:

![Docker Compose - Community]({% link content-services/images/compose-community.png %}){:width="460" height="380px"}

## Cleanup

To bring the system down and cleanup the containers run the following command:

```bash
docker-compose down
```

## Troubleshooting

1. If you have issues running ```docker-compose up``` after deleting a previous Docker Compose cluster, try replacing step 4 in the initial Docker Compose instructions with:

    ```bash
    docker-compose down && docker-compose build --no-cache && docker-compose up
    ```

    > **Note:** Make sure that the `docker-compose up` part of the command uses the format you chose in step 4.

2. Stop the session by using `CONTROL+C`.

3. Remove the containers (using the `--rmi all` option):

    ```bash
    docker-compose down --rmi all
    ```

4. Try allocating more memory resources, as advised in `docker-compose.yml`.

    For example, in Docker, change the memory setting in **Preferences** (or **Settings**) **Resources** > **Advanced** > **Memory** to at least 8GB. Make sure you restart Docker and wait for the process to finish before continuing.

    Go back to step 4 in the initial Docker Compose instructions to start the deployment again.

> **Note:** Keep in mind that 8GB is much lower than the required minimum, and may need to be adapted for your environment. You'll need a machine with at least 13GB of memory to distribute among the Docker containers.
