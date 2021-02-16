---
title: Install Transform Service
---

The Transform Service is deployed as part of the Alfresco Content Services deployment, using Docker images that are packaged in Helm charts. These charts are a deployment template which can be used as the basis for your specific deployment needs.

> **Important:** The deployment of the Transform Service with Content Services on AWS, such as Amazon EKS (Elastic Kubernetes Service), is only recommended for customers with a good knowledge of Content Services, and strong competencies in AWS and containerized deployment.

The following diagram shows how Content Services and the components of the Transform Service interact when deployed using Docker Compose.

![Docker Compose Deployment Overview]({% link transform-service/images/1-0-docker-compose-components.png %})

The following diagram shows how Content Services and the components of the Transform Service interact when deployed using Helm charts.

![ACS Helm Deployment Overview]({% link transform-service/images/helm-components.png %})

## Prerequisites

There are a number of software requirements for deploying Transform Service.

The Transform Service is only deployed as part of Content Services for containerized deployments.

### Containerized deployments

The images downloaded directly from [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"}, or [Quay.io](https://quay.io/){:target="_blank"} are for a limited trial of the Enterprise version of Content Services that goes into read-only mode after 2 days. For a longer (30-day) trial, get the Content Services [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}.

> **Note:** A [Quay.io](https://quay.io/) account is needed to pull the following Docker images that are needed for the Transform Service.
>
> * `quay.io/alfresco-transform-router`
> * `quay.io/alfresco-pdf-renderer`
> * `quay.io/alfresco-imagemagick`
> * `quay.io/alfresco-libreoffice`
> * `quay.io/alfresco-tika`

The other images are available in DockerHub:

* `alfresco/alfresco-shared-file-store`

#### Software requirements (Helm)

To use the Content Services deployment (including the Transform Service), you need to install the following software:

* [AWS CLI](https://github.com/aws/aws-cli#installation){:target="_blank"} - the command line interface for Amazon Web Services.
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/){:target="_blank"} - the command line tool for Kubernetes.
* [Helm](https://github.com/helm/helm#install){:target="_blank"} - the tool for installing and managing Kubernetes applications.
  * There are Helm charts that allow you to deploy Content Services with Transform Service in a Kubernetes cluster, for example, on AWS.
* [Kops](https://github.com/kubernetes/kops#installing){:target="_blank"} - this helps you to manage a Kubernetes cluster.

See [Install with Helm charts]({% link transform-service/1.0/install/index.md %}#install-with-helm-charts) for more details.

#### Software requirements (Docker)

> **Note:** (Recommended for evaluations only)

* [Docker](https://docs.docker.com/install/){:target="_blank"} (latest stable version)
  * This allows you to run Docker images and `docker-compose` on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

> **Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose.

See [Install with Docker Compose]({% link transform-service/1.0/install/index.md %}#install-with-docker-compose) for more details.

## Install with Helm charts

Use this information to deploy Content Services (including the Transform Service) using Helm charts by running a Kubernetes cluster on Amazon Web Services (AWS). These charts are a deployment template which can be used as the basis for your specific deployment needs.

The Helm charts are provided as a reference that can be used to build deployments in AWS. If you're a System administrator, ensure that data persistence, backups, log storage, and other system-level functions have been configured to meet your needs.

You'll need your [Quay.io](https://quay.io){:target="_blank"} account credentials to access the Docker images. If you don't already have these credentials, contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

Here is a summary of the steps required:

1. Set up your Kubernetes cluster on AWS.
2. Install the Kubernetes Dashboard to manage your Kubernetes cluster.
3. Set up Content Services on the Kubernetes cluster, including creating file storage.
4. To access the images in [Quay.io](https://quay.io/){:target="_blank"}, you'll need to generate a pull secret and apply it to your cluster.
5. Deploy Content Services.
6. Check the status of your deployment.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment){:target="_blank"} GitHub project documentation for the prerequisites and detailed setup.

## Install with Docker Compose

Use this information to quickly start up Content Services (including Transform Service) using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is only recommended for development and test environments.

To check which branch tag corresponds to a specific Content Services release, review the [release versions](https://github.com/Alfresco/acs-deployment/blob/support/SP/2.N/docs/helm-chart-releases.md){:target="_blank"} page in GitHub. Choose a version from the left column that corresponds to the required Content Services version you want to deploy.

   > **Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose, using the links provided.

1. Clone the project locally, and then change directory to the project folder:

   ```bash
    git clone --branch x.y.z https://github.com/Alfresco/acs-deployment.git
    cd acs-deployment/docker-compose
    ```

    > **Note:** Replace the version number `x.y.z` with the tag that matches the Content Services version you want to deploy. For example, if you want Content Services 6.1, then select tag `2.0.0`.

    > **Note:** Make sure that exposed ports are open on your host computer. Check the `docker-compose.yml` file to determine the exposed ports - refer to the `host:container` port definitions. You'll see they include 5432, 8080, 8083 and others.

2. Log in to Quay.io using your credentials:

    ```bash
    docker login https://quay.io
    ```

    You'll need your [Quay.io](https://quay.io){:target="_blank"} account credentials to access the Docker images. If you don't already have these credentials, contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

3. Deploy Content Services, including the repository, Share, Postgres database, Search Services, and Transform Service:

    ```bash
    docker-compose up
    ```

    This downloads the images, fetches all the dependencies, creates each container, and then starts the system:

    ```bash
    Creating network "docker-compose_default" with the default driver
    Creating docker-compose_postgres_1              ... done
    Creating docker-compose_share_1                 ... done
    Creating docker-compose_tika_1                  ... done
    Creating docker-compose_shared-file-store_1     ... done
    Creating docker-compose_digital-workspace_1     ... done
    Creating docker-compose_solr6_1                 ... done
    Creating docker-compose_activemq_1              ... done
    Creating docker-compose_alfresco_1              ... done
    Creating docker-compose_libreoffice_1           ... done
    Creating docker-compose_imagemagick_1           ... done
    Creating docker-compose_alfresco-pdf-renderer_1 ... done
    Creating docker-compose_proxy_1                 ... done
    Creating docker-compose_transform-router_1      ... done
    ```

    As an alternative, you can also start the containers in the background by running `docker-compose up -d`.

4. Wait for the logs to show messages:

    ```bash
    alfresco_1 | 2019-02-21 11:50:46,000  WARN ... The Alfresco Content Services license will expire in 2 days.
    alfresco_1 | 2019-02-21 11:50:50,341  INFO ... Starting 'Transformers' subsystem, ID: [Transformers, default]
    alfresco_1 | 2019-02-21 11:50:50,600  INFO ... Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
    ```

    If you encounter errors whilst the system is starting up:

    * Stop the session (by using `CONTROL+C`).
    * Remove the container using `--rmi all`. This option also removes the images created by docker-compose up, and the images used by any service. You can use this, for example, if any containers fail and you need to remove them.
    * Try allocating more memory resources, as advised in `docker-compose.yml`. For example, in Docker, change the memory setting in **Preferences** (or **Settings**) > **Advanced** > **Memory**, to at least 6 GB. Make sure you restart Docker and wait for the process to finish before continuing.
    * Go back to step 3 and start the deployment again.

    > **Note:** Although 16 GB is the required minimum memory setting, keep in mind that 6 GB is much lower than the required minimum, and may need to be adapted for your environment.

5. Open your browser and check everything starts up correctly:

    | Service | Endpoint |
    | ------- | -------- |
    | Administration and REST APIs | `http://localhost:8080/alfresco` |
    | Share | `http://localhost:8080/share` |
    | Alfresco Digital Workspace | `http://localhost:8080/workspace` |
    | Search administration | `http://localhost:8083/solr` |

6. Log in as the `admin` user. Enter the default administrator password `admin`.

You can use a number of commands to check that the system started correctly, see below.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/tree/support/SP/2.N){:target="_blank"} GitHub project documentation for the prerequisites and detailed setup: [Deploying using Docker Compose](https://github.com/Alfresco/acs-deployment/blob/support/SP/2.N/docs/docker-compose-deployment.md){:target="_blank"}.

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

        ```bash
               Container                                 Repository                         ...     Size
        ----------------------------------------------------------------------------------------------------
        docker-compose_activemq_1                alfresco/alfresco-activemq                   ...   447 MB
        docker-compose_alfresco-pdf-renderer_1   quay.io/alfresco/alfresco-pdf-renderer       ...   625 MB
        docker-compose_alfresco_1                alfresco/alfresco-content-repository         ...   1.02 GB
        docker-compose_digital-workspace_1       quay.io/alfresco/alfresco-digital-workspace  ...   27.1 MB
        docker-compose_imagemagick_1             quay.io/alfresco/alfresco-imagemagick        ...   698 MB
        docker-compose_libreoffice_1             quay.io/alfresco/alfresco-libreoffice        ...   1.46 GB
        docker-compose_postgres_1                postgres                                     ...   274 MB
        docker-compose_proxy_1                   quay.io/alfresco/alfresco-acs-nginx          ...   16.9 MB
        docker-compose_share_1                   alfresco/alfresco-share                      ...   681 MB
        docker-compose_shared-file-store_1       alfresco/alfresco-shared-file-store          ...   435 MB
        docker-compose_solr6_1                   alfresco/alfresco-search-services            ...   900 MB
        docker-compose_tika_1                    quay.io/alfresco/alfresco-tika               ...   743 MB
        docker-compose_transform-router_1        quay.io/alfresco/alfresco-transform-router   ...   574 MB
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
    Stopping docker-compose_transform-router_1      ... done
    Stopping docker-compose_proxy_1                 ... done
    Stopping docker-compose_activemq_1              ... done
    Stopping docker-compose_alfresco-pdf-renderer_1 ... done
    Stopping docker-compose_solr6_1                 ... done
    Stopping docker-compose_alfresco_1              ... done
    Stopping docker-compose_share_1                 ... done
    Stopping docker-compose_digital-workspace_1     ... done
    Stopping docker-compose_libreoffice_1           ... done
    Stopping docker-compose_shared-file-store_1     ... done
    Stopping docker-compose_imagemagick_1           ... done
    Stopping docker-compose_tika_1                  ... done
    Stopping docker-compose_postgres_1              ... done
    ```

5. Alternatively, you can open a new terminal window, change directory to the `docker-compose` folder, and run:

    ```bash
    docker-compose down
    ```

    This stops the running services, as shown in the previous example, and removes them from memory:

    ```bash
    Stopping docker-compose_transform-router_1      ... done
    ...
    Stopping docker-compose_postgres_1              ... done
    Removing docker-compose_transform-router_1      ... done
    ...
    Removing docker-compose_postgres_1              ... done
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
