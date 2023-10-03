---
title: Install Transform Service
---

This release provides two main options for deployment: using the distribution zip, or using containerized deployment.

The Transform Service zip can be applied when installing Alfresco Content Services using the distribution zip.

The Transform Service is also deployed as part of the Content Services containerized deployment using Docker images that are packaged in Helm charts. These charts are a deployment template that can be used as the basis for your specific deployment needs.

> **Note:** Deployment of Transform Service with Content Services on AWS, such as Amazon EKS (Elastic Kubernetes Service), is recommended only for customers with a good knowledge of Content Services, and strong competencies in AWS and containerized deployment.

The following diagram shows how Content Services and the components of the Transform Service interact when deployed using Docker Compose.

![Docker Compose Deployment Overview]({% link transform-service/images/docker-compose-components.png %})

The following diagram shows how Content Services and the components of the Transform Service interact when deployed using Helm charts.

![ACS Helm Deployment Overview]({% link transform-service/images/helm-components.png %})

## Prerequisites

There are a number of software requirements for installing Transform Service.

The Transform Service is only deployed as part of Content Services for containerized deployments.

However, this is not the case if you're installing Content Services using the distribution zip. See [Supported platforms]({% link transform-service/1.3/support/index.md %}) for more information.

### Containerized deployments

The images downloaded directly from [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"}, or [Quay.io](https://quay.io/){:target="_blank"} are for a limited trial of the Enterprise version of Content Services that goes into read-only mode after 2 days. For a longer (30-day) trial, get the Alfresco Content Services [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}.

> **Note:** A [Quay.io](https://quay.io/) account is needed to pull the Docker images that are needed for the Transform Service:
>
> * `alfresco/alfresco-transform-router`

The other images are available in DockerHub:

* `alfresco/alfresco-shared-file-store`
* `alfresco/alfresco-transform-core-aio`

#### Software requirements (Helm)

To use the Content Services deployment (including the Transform Service), you need to install the following software:

* [AWS CLI](https://github.com/aws/aws-cli#installation){:target="_blank"} - the command line interface for Amazon Web Services.
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/){:target="_blank"} - the command line tool for Kubernetes.
* [Helm](https://github.com/helm/helm#install){:target="_blank"} - the tool for installing and managing Kubernetes applications.
  * There are Helm charts that allow you to deploy Content Services with Transform Service in a Kubernetes cluster, for example, on AWS.

See [Install with Helm charts]({% link transform-service/1.3/install/index.md %}#install-with-helm-charts) for more details.

#### Software requirements (Docker)

This is recommended for evaluations only (i.e. test and development environments).

* [Docker](https://docs.docker.com/install/){:target="_blank"} (latest stable version)
  * This allows you to run Docker images and `docker-compose` on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

> **Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose.

See [Install with Docker Compose]({% link transform-service/1.3/install/index.md %}#install-with-docker-compose) for more details.

### Non-containerized deployment {#prereq-non-containerized-deploy}
Before installing Transform Services from the distribution ZIP file, [install Alfresco Content Services using distribution ZIP]({% link content-services/latest/install/zip/index.md %}).
This will also install the message broker ActiveMQ, which is used by Transform Services.

In a non-containerized environment you need to install the following software before installing Transform Services:

* LibreOffice: see [Install LibreOffice](#install-libreoffice)
* ImageMagick: see [Install ImageMagick](#install-imagemagick)
* alfresco-pdf-renderer: see [Install alfresco-pdf renderer](#install-pdf-renderer)

You can install the third-party software used by Transform Services independently.

#### Install LibreOffice {#install-libreoffice}
In Transform Services, you can transform a document from one format to another, for example, a text file to a PDF file.
To access these transformation facilities, you must install LibreOffice.

1. Browse to the LibreOffice download site: [LibreOffice download site](https://www.libreoffice.org/download/download/){:target="_blank"}
2. Download the latest (stable) version of LibreOffice for your platform.
3. When prompted, specify a download destination.
4. Browse to the location of your downloaded file, and install the application.
5. Change the installation directory to:
    * (Windows) `c:\Alfresco\LibreOffice`
    * (Linux) `/opt/alfresco/LibreOffice`
      If you're installing LibreOffice on Linux, you also need a number of libraries to be installed. See [Install Linux libraries](#install-linux-libraries) for more.

##### Install Linux libraries {#install-linux-libraries}
Use this information to install Linux libraries manually on supported Linux distributions, such as Ubuntu, SUSE and Red Hat.

LibreOffice requires the following libraries to be installed on your system:
* libfontconfig
* libICE
* libSM
* libXrender
* libXext
* libXinerama
* libcups
* libGLU
* libcairo2
* libgl1-mesa-glx

If the required libraries are missing, you'll get a warning message. You can install them using your preferred package
manager from the command line. Note that the file names for the Linux libraries may vary by distribution.

For Red Hat Enterprise Linux/CentOS, you can run:

```bash
cd <libre-install-dir>/LibreOffice_*.*.*.*_Linux_x86-64_rpm/RPMS/
```

```bash
sudo yum localinstall *rpm
```

For Ubuntu:

```bash
cd <libre-install-dir>/LibreOffice_*.*.*.*_Linux_x86-64_rpm/RPMS/
```

```bash
sudo dpkg -i *deb
```

If LibreOffice doesn't start up normally with Transform Services, test it manually, for example, by running this startup script:

```bash
start ex. {installdir}/libreoffice/scripts/libreoffice_ctl.sh start
status ex. {installdir}/libreoffice/scripts/libreoffice_ctl.sh status
```

If you receive errors that indicate that a library is missing, work with your system administrator to add the
missing library or its equivalent from your configured repositories.

#### Install ImageMagick {#install-imagemagick}
To enable image manipulation in Transform Services, you must install and configure ImageMagick. Transform Services uses
ImageMagick to manipulate images for previewing.

1. Check if ImageMagick is already installed on your system.
   Use the ImageMagick convert command to check that you have the right software installed on your machine. This command is usually located in `/usr/bin`: `install Image`.
2. If the ImageMagick software isn't available on your system, download and install the appropriate package for your platform.
   To download ImageMagick, browse to [ImageMagick download website](https://www.imagemagick.org/script/download.php){:target="_blank"}.
   > **Note:** In next steps, you'll make changes to the Content Services configuration files to enable the manually installed ImageMagick application. These steps can only be performed after Content Services has been installed.

The following table lists example of how to set the paths to different things when starting Transform Core AIO later on:

|Property|Description|
   |--------|-----------|
|img.root| Windows: `img.root=C:\\ImageMagick`<br>Linux: `img.root=/ImageMagick`<br><br>**Note:** Don't include a slash (`/`) at the end of the path, i.e. `/ImageMagick/`.|
|img.dyn|Windows: `img.dyn=${img.root}\\lib` <br>Linux: `img.dyn=${img.root}/lib`|
|img.exe|Windows: `img.exe=${img.root}\\convert.exe` <br>Linux: `img.exe=${img.root}/bin/convert`|
|img.coders|Windows: `img.coders=${img.root}\\modules\\coders` <br>Linux: `img.coders=${img.root}/modules/coders`|
|img.config|Windows: `img.config=${img.root}\\config` <br>Linux: `img.config=${img.root}/config`|
|img.url|Windows: `img.url=${img.root}\\url` <br>Linux: `img.url=${img.root}/url`|

> **Note:** Test that you're able to convert a PDF using the command: `convert filename.pdf[0] filename.png`

#### Install alfresco-pdf-renderer {#install-pdf-renderer}
Transform Services uses `alfresco-pdf-renderer` for creating document thumbnails and previews. Use this information to
install `alfresco-pdf-renderer` on your system.

>**Note:** The `alfresco-pdf-renderer` executable file is platform-specific.

The `alfresco-pdf-renderer` binaries are available in the Alfresco Content Services distribution zip.

* For Windows:
    * Extract the file `alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-win64.tgz` to a location of your choice.
    * Browse to the location of your saved file and extract the archive.
    * Note down the exe path: `<alfresco-pdf-renderer_installation_dir>/alfresco-pdf-renderer`

* For Linux:
    * Extract the file `alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-linux.tgz` to a location of your choice.
    * Browse to the location of your saved file and extract the archive.
    * Note down the exe path: `<alfresco-pdf-renderer_installation_dir>/alfresco-pdf-renderer`

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

    > **Note:** Remember to pass the name of the secret as an extra `--set` argument in the `helm install` command.

6. Check the status of your deployment.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/){:target="_blank"} GitHub project documentation for the prerequisites and detailed setup:

* [Deploying with Helm charts on AWS using EKS](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/helm-deployment-aws_eks.md){:target="_blank"}

## Install with Docker Compose

Use this information to quickly start up Content Services (including Transform Service) using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is only recommended for development and test environments.

To check which branch tag corresponds to a specific Content Services release, review the [release versions](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/helm-chart-releases.md){:target="_blank"} page in GitHub. Choose a version from the left column that corresponds to the required Content Services version you want to deploy.

   > **Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose, using the links provided.

1. Clone the project locally, and then change directory to the project folder:

   ```bash
    git clone --branch x.y.z https://github.com/Alfresco/acs-deployment.git
    cd acs-deployment/docker-compose
    ```

    > **Note:** Replace the version number `x.y.z` with the tag that matches the Content Services version you want to deploy. For example, if you want Content Services 7.0.0, then select tag `v5.0.0`.

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
    Creating docker-compose_digital-workspace_1 ... done
    Creating docker-compose_solr6_1             ... done
    Creating docker-compose_shared-file-store_1 ... done
    Creating docker-compose_sync-service_1      ... done
    Creating docker-compose_alfresco_1          ... done
    Creating docker-compose_share_1             ... done
    Creating docker-compose_postgres_1          ... done
    Creating docker-compose_activemq_1          ... done
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
    * Try allocating more memory resources, as advised in `docker-compose.yml`. For example, in Docker, change the memory setting in **Preferences** (or **Settings**) > **Advanced** > **Memory**, to at least 8GB. Make sure you restart Docker and wait for the process to finish before continuing.
    * Go back to step 5 in the initial Docker Compose instructions to start the deployment again.

    > **Note:** You'll need a machine with at least 13GB of memory to distribute among the Docker containers.

5. Open your browser and check everything starts up correctly:

    | Service | Endpoint |
    | ------- | -------- |
    | Administration and REST APIs | `http://localhost:8080/alfresco` |
    | Share | `http://localhost:8080/share` |
    | Digital Workspace | `http://localhost:8080/workspace` |
    | Search Services administration | `http://localhost:8083/solr` |
    | Transform Router configuration | `http://localhost:8095/transform/config` |
    | ActiveMQ Admin Web Console | `http://localhost:8161/admin` |

6. Log in as the `admin` user. Enter the default administrator password `admin`.

You can use a number of commands to check that the system started correctly, see below.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/tree/support/SP/4.N) GitHub project documentation for the prerequisites and detailed setup: [Deploying using Docker Compose](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/docker-compose-deployment.md){:target="_blank"}.

### Check system start up

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
        Container                             Repository                                     Tag         Image Id       Size  
        ------------------------------------------------------------------------------------------------------------------------
        docker-compose_activemq_1             alfresco/alfresco-activemq                     5.15.8      80350f7a9820   545.9 MB
        docker-compose_alfresco_1             quay.io/alfresco/alfresco-content-repository   7.0.0       835dbb204129   1.076 GB
        docker-compose_digital-workspace_1    quay.io/alfresco/alfresco-digital-workspace    2.0.0-adw   b360030b24f9   35.65 MB
        docker-compose_postgres_1             postgres                                       11.7        028e3a6bd9eb   283 MB  
        docker-compose_proxy_1                alfresco/alfresco-acs-nginx                    3.0.1       4f0b84bc5ba0   20.42 MB
        docker-compose_share_1                quay.io/alfresco/alfresco-share                7.0.0       059352863557   868.2 MB
        docker-compose_shared-file-store_1    alfresco/alfresco-shared-file-store            0.10.0      56ff9f67200d   776.7 MB
        docker-compose_solr6_1                alfresco/alfresco-search-services              2.0.1       a98e3e14aefd   1.148 GB
        docker-compose_sync-service_1         quay.io/alfresco/service-sync                  3.4.0       ab5f9ad0ede1   801.9 MB
        docker-compose_transform-core-aio_1   alfresco/alfresco-transform-core-aio           2.3.6       92c19ace0938   1.707 GB
        docker-compose_transform-router_1     quay.io/alfresco/alfresco-transform-router     1.3.1       b91dd1045459   729.5 MB
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

## Install with zip
Use these instructions to install Transform Service using the distribution zip and connect it to an instance of
Alfresco Content Services.

The Transform Services distribution zip file includes all the files required to provide the transformation and
metadata extraction capabilities. Ensure that you've installed the [prerequisites](#prereq-non-containerized-deploy)
before continuing.

1. Browse to [Hyland Community](https://community.hyland.com/){:target="_blank"} and download `alfresco-transform-service-distribution-1.3.x.zip`.

2. Extract the zip file into a system directory; for example, `<installLocation>/`.

    In this directory you'll see the following content including three runnable JAR files:

    * `alfresco-shared-file-store-controller-x.y.z.jar`
    * `alfresco-transform-core-aio-boot-x.y.z.jar`
    * `alfresco-transform-router-1.3.x.jar`
    * `README.md`

3. Start Active MQ.

    For example, run the following command from the ActiveMQ installation directory:

    ```bash
    bin/activemq start
    ```

    For more information on installing and configuring ActiveMQ, see [Configure ActiveMQ]({% link content-services/latest/config/activemq.md %}).

    Check the output to ensure that it starts successfully.

    Make a note of the TCP URL, with example format `tcp://server:port`, where server is the host name of the server where ActiveMQ is installed. This is used in later steps.

    Content Services uses ActiveMQ for message queuing with various products, including the Transform Service.

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

    > **Note:** LibreOffice, ImageMagick and Alfresco PDF Renderer binaries needs to be installed on the server where the all-in-one core T-Engine is setup. See the [Prerequisites](#prereq-non-containerized-deploy) for more details. You may need to change the paths depending on your operating system.

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
    sfs.endpoint=${sfs.url}/alfresco/api/-default-/private/sfs/versions/1

    # Transform Router properties:
    transform.service.enabled=true
    transform.service.url=http://<Transform Service host>:8095/

    # Transform Core properties:
    localTransform.core-aio.url=http://<Transform Service host>:8090/
    ```

    This overrides the default properties provided by Content Services.

    > **Note:** Any changes to `alfresco-global.properties` require you to restart Content Services to apply the updates. See the Content Services documentation [Using alfresco-global.properties]({% link content-services/latest/config/index.md%}#using-alfresco-globalproperties) for more information.

8. Check that the [configuration]({% link transform-service/1.3/config/index.md %}) is set up correctly for your environment.

9. Restart Content Services.

10. Ensure that the environment is up and running:

    1.Check the logs for Content Services startup.

    2.Monitor ActiveMQ by accessing the Web Console, e.g. `http://localhost:8161/admin/`.

    3.Temporarily enable `TransformDebug` in the repository if you want to see detailed debug log entries.

    4.Navigate to Digital Workspace or Share, and upload a file (such as a `.jpg`, `.png`, `.docx` etc.).

* Check the logs to see the metadata and work performed for the uploaded file. These should be available in the Spring Boot apps:
  * `alfresco-transform-router`
  * `alfresco-transform-core-aio`

Files should also be available in the specified path for the `alfresco-shared-file-store`. However, these files will only temporarily appear in the Shared File Store until explicitly deleted by the repository and/or expired and cleaned up.
