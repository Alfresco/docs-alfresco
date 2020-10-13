---
title: Install Transform Service
---

This release provides two main options for deployment: using the distribution zip, or using containerized deployment (as in previous Transform Service releases).

The Transform Service zip can be applied when installing Alfresco Content Services using the distribution zip.

The Transform Service is also deployed as part of the Alfresco Content Services containerized deployment, using Docker images that are packaged in Helm charts. These charts are a deployment template which can be used as the basis for your specific deployment needs.

> **Important:** The deployment of the Transform Service with Alfresco Content Services on AWS, such as Amazon EKS (Elastic Kubernetes Service), is only recommended for customers with a good knowledge of Alfresco Content Services, and strong competencies in AWS and containerized deployment.

The following diagram shows how Alfresco Content Services and the components of the Transform Service interact when deployed using Docker Compose.

![Docker Compose Deployment Overview]({% link transform-service/images/docker-compose-components.png %})

The following diagram shows how Alfresco Content Services and the components of the Transform Service interact when deployed using Helm charts.

![ACS Helm Deployment Overview]({% link transform-service/images/helm-components.png %})

## Prerequisites for using Transform Service

There are a number of software requirements for deploying Transform Service.

The Transform Service is only deployed as part of Alfresco Content Services for containerized deployments.

However, this is not the case if you're installing Alfresco Content Services using the distribution zip. Review the requirements below for your chosen deployment method.

## Non-containerized deployment

### Requirements for using the distribution zip

Before you can use the Transform Service zip, you need to install the software requirements listed in [Supported platforms]({% link transform-service/latest/support/index.md %}).

Follow the linked pages in the Alfresco Content Services documentation, starting from [Installing using distribution zip](LINK). See [Supported Platforms](LINK) for the supported versions of each component.

## Installing with zip

Use these instructions to install Transform Service using the distribution zip to an instance of Alfresco Content Services.

The Transform Service distribution zip file includes all the files required to provide the Transform Service capabilities. Ensure that you've installed the prerequisites before continuing, for more see [Install Transform Service]({% link transform-service/latest/install/index.md %}).

1. Browse to the [Alfresco Support Portal](http://support.alfresco.com/){:target="_blank"} and download alfresco-transform-service-distribution-1.3.x.zip.

2. Extract the zip file into a system directory; for example, `<installLocation>/`.

    In this directory you'll see the following content including three runnable JAR files:

* alfresco-shared-file-store-controller-x.y.z.jar
* alfresco-transform-core-aio-boot-x.y.z.jar
* alfresco-transform-router-1.3.x.jar
* README.md

3. Start Active MQ.

    For example, run the following command from the ActiveMQ installation directory:

    ```bash
    bin/activemq start
    ```

    For more information on installing and configuring ActiveMQ, see [Configuring ActiveMQ](LINK).

    Check the output to ensure that it starts successfully.

    Make a note of the TCP URL, with example format `tcp://server:port`, where server is the host name of the server where ActiveMQ is installed. This is used in later steps.

    Alfresco Content Services uses ActiveMQ for message queuing with various products, including the Transform Service.

4. Start the Shared File Store controller:

    ```java
    java -DfileStorePath=/path/to/your/AlfrescoFileStore
     -jar alfresco-shared-file-store-controller-x.y.z.jar
    ```

    Check the output to ensure that it starts successfully.

    By default, files are stored in `fileStorePath=/tmp/Alfresco`. This can be modified using the `fileStorePath` parameter as shown in the above example.

    The Shared File Store allows components such as the repository, and the Transform Service to share a common place to store and retrieve files, for example, to enable transforms from an input source file to an output target file.

5. Start the all-in-one Transform Core Engine Spring Boot app:

    ```java
    java -DPDFRENDERER_EXE="<alfresco-pdf-renderer_installation_dir>/alfresco-pdf-renderer" 
     -DLIBREOFFICE_HOME="<libreoffice_installation_dir>" 
     -DIMAGEMAGICK_ROOT="<imagemagick_installation_dir>" 
     -DIMAGEMAGICK_DYN="<imagemagick_installation_dir>/lib" 
     -DIMAGEMAGICK_EXE="<imagemagick_installation_dir>/bin/convert" 
     -DACTIVEMQ_URL=failover:(tcp://server:61616)?timeout=3000
     -DFILE_STORE_URL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file
     -jar alfresco-transform-core-aio-boot-x.y.z.jar
    ```

    > **Note:** You may need to change the paths depending on your operating system.

    Check the output to ensure that it starts successfully.

    The all-in-one core T-Engine combines the five T-Engines (i.e. LibreOffice, ImageMagick, Alfresco PDF Renderer, Tika, and Misc) into one single engine. All functionality that's available in the five T-Engines is available in the all-in-one core T-Engine. The command-line options provide the paths to the installation locations and the URL of the messaging broker.

6. Start the Transform Router Spring Boot app:

    ```java
    java -DCORE_AIO_URL=http://localhost:8090 
     -DCORE_AIO_QUEUE=org.alfresco.transform.engine.aio.acs 
     -DACTIVEMQ_URL=failover:(tcp://server:61616)?timeout=3000 
     -DFILE_STORE_URL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file
     -jar alfresco-transform-router-1.3.x.jar
    ```

    Check the output to ensure that it starts successfully.

    The Transform Router allows simple (single-step) and pipeline (multi-step) transforms that are passed to the Transform Engines. The command-line options provide the router with the required data for T-Engines, queuing, and file-store URL.

7. Set the following properties in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

    ```bash
    # ActiveMQ properties:
    messaging.broker.url=failover:(tcp://server:61616)?timeout=3000
    messaging.broker.username=$MQUSER
    messaging.broker.password=$MQPASS
  
    # Shared File Store properties:
    sfs.url=http://localhost:8099
    sfs.endpoint=${sfs.url}/alfresco/api/-default-/private/sfs/versions/1/file
  
    # Transform Router property:
    transform.service.url=http://localhost:8095/
  
    # Transform Core properties:
    localTransform.core-aio.url=http://transform-core-aio:8090/
    alfresco-pdf-renderer.url=http://transform-core-aio:8090/
    jodconverter.url=http://transform-core-aio:8090/
    img.url=http://transform-core-aio:8090/
    tika.url=http://transform-core-aio:8090/
    transform.misc.url=http://transform-core-aio:8090/
    ```

    This overrides the default properties provided by Alfresco Content Services.

    > **Note:** Any changes to `alfresco-global.properties` require you to restart Alfresco Content Services to apply the updates. See the Alfresco Content Services documentation [Using the alfresco-global.properties file](LINK) for more.

8. Check that the [configuration]({% link transform-service/latest/config/index.md %}) is set up correctly for your environment.

9. Restart Alfresco Content Services.

10. Ensure that the environment is up and running:

    1.Check the logs for Alfresco Content Services startup.

    2.Monitor ActiveMQ by accessing the Web Console, e.g. `http://localhost:8161/admin/`.

    3.Temporarily enable `TransformDebug` in the repository if you want to see detailed debug log entries.

    4.Navigate to Digital Workspace or Share, and upload a file (such as a `.jpg`, `.png`, `.docx` etc.).

* Check the logs to see the metadata and work performed for the uploaded file. These should be available in the Spring Boot apps:
  * `alfresco-transform-router`
  * `alfresco-transform-core-aio`

Files should also be available in the specified path for the `alfresco-shared-file-store`. However, these files will only temporarily appear in the Shared File Store until explicitly deleted by the repository and/or expired and cleaned up.

## Containerized deployments

Use this information to quickly start up Alfresco Content Services (including Transform Service) using Docker Compose.
The images are downloaded directly from [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"}, or [Quay.io](https://quay.io/){:target="_blank"} are for a limited trial of the Enterprise version of Alfresco Content Services that goes into read-only mode after 2 days. For a longer (30-day) trial, get the Alfresco Content Services [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}.

> **Note:** A [Quay.io](https://quay.io/) account is needed to pull the Docker images that are needed for the Transform Service.

* `alfresco/alfresco-transform-router`

The other images are available in DockerHub:

* `alfresco/alfresco-pdf-renderer`
* `alfresco/alfresco-imagemagick`
* `alfresco/alfresco-libreoffice`
* `alfresco/alfresco-tika`
* `alfresco/alfresco-transform-misc`
* `alfresco/alfresco-shared-file-store`
* `alfresco/alfresco-transform-core-aio`

## Installing with docker

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

## Installing with Helm Charts on AWS

Use this information to deploy Alfresco Content Services (including the Transform Service) using Helm charts by running a Kubernetes cluster on Amazon Web Services (AWS). These charts are a deployment template which can be used as the basis for your specific deployment needs.

The Helm charts are provided as a reference that can be used to build deployments in AWS. If you're a System administrator, ensure that data persistence, backups, log storage, and other system-level functions have been configured to meet your needs.

You'll need your [Quay.io](https://quay.io){:target="_blank"} account credentials to access the Docker images. If you don't already have these credentials, contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

Here is a summary of the steps required:

1. Set up your Kubernetes cluster on AWS.
2. Install the Kubernetes Dashboard to manage your Kubernetes cluster.
3. Set up Alfresco Content Services on the Kubernetes cluster, including creating file storage.
4. To access the images in [Quay.io](https://quay.io/){:target="_blank"}, you'll need to generate a pull secret and apply it to your cluster.
5. Deploy Alfresco Content Services.

    > **Note:** Remember to pass the name of the secret as an extra `--set` argument in the `helm install` command.

6. Check the status of your deployment.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/tree/support/SP/4.N){:target="_blank"} GitHub project documentation for the prerequisites and detailed setup:

* [Deploying with Helm charts on AWS using Kops](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/helm-deployment-aws_kops.md){:target="_blank"}
* [Deploying with Helm charts on AWS using EKS](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/helm-deployment-aws_eks.md){:target="_blank"}