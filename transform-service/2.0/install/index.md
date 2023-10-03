---
title: Install Transform Service
---

This release provides two main options for deployment: 

* [Distribution zip](#prereq-non-containerized-deploy) - The Transform Service zip can be applied when installing 
  Alfresco Content Services using the distribution zip. For an overview of components, see the first picture on this 
  [page]({% link transform-service/2.0/index.md %}). 
* [Containerized deployment(Docker or Kubernetes)](#containerized-deployments). The Transform Service is also deployed 
  as part of the Content Services containerized deployment using Docker images that are referenced from Helm charts. 
  These charts are a deployment template that can be used as the basis for your specific deployment needs.
  For an overview of components, see the second picture on this [page]({% link transform-service/2.0/index.md %}).
  
>**Note:** Deployment of Transform Service with Content Services on AWS, such as Amazon EKS (Elastic Kubernetes Service), 
>is recommended only for customers with a good knowledge of Content Services, and strong competencies in AWS and 
>containerized deployment.

## Prerequisites
There are a number of software requirements for installing the Transform Service.

The Transform Service is only deployed by default as part of Content Services for containerized deployments.

However, this is not the case if you're installing Content Services using the distribution zip. 
See [Supported platforms]({% link transform-service/2.0/support/index.md %}) for more information.

### Containerized deployments {#containerized-deployments}
The images downloaded directly from [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"}, or 
[Quay.io](https://quay.io/){:target="_blank"} are for a limited trial of the Enterprise version of Content Services that 
goes into read-only mode after 2 days. For a longer (30-day) trial, get the Alfresco Content Services 
[Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}.

> **Note:** A [Quay.io](https://quay.io/) account is needed to pull the Docker images that are needed for the Transform Service:
>
> * `quay.io/alfresco/alfresco-transform-router`
> * `quay.io/alfresco/alfresco-shared-file-store`

The Transform Core Engine (T-Engine) Docker Image is also used by Alfresco Content Services Community Edition, so it is 
available in Docker Hub:

* `alfresco/alfresco-transform-core-aio`

#### Software requirements (Helm)
To use the Content Services deployment (including the Transform Service), you need to install the following software:

* [AWS CLI](https://github.com/aws/aws-cli#installation){:target="_blank"} - the command line interface for Amazon Web Services.
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/){:target="_blank"} - the command line tool for Kubernetes.
* [Helm](https://github.com/helm/helm#install){:target="_blank"} - the tool for installing and managing Kubernetes applications.
  * There are Helm charts that allow you to deploy Content Services with Transform Service in a Kubernetes cluster, for example, on AWS.

See [Install with Helm charts]({% link transform-service/2.0/install/index.md %}#install-with-helm-charts) for more details.

#### Software requirements (Docker)
This is recommended for evaluations only (i.e. test and development environments).

* [Docker](https://docs.docker.com/install/){:target="_blank"} (latest stable version)
  * This allows you to run Docker images and `docker-compose` on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it 
    separately after you've installed Docker.

>**Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose.

See [Install with Docker Compose]({% link transform-service/2.0/install/index.md %}#install-with-docker-compose) for more details.

### Non-containerized deployment {#prereq-non-containerized-deploy}
Before installing Transform Service from the distribution ZIP file, 
[install Alfresco Content Services using distribution ZIP]({% link content-services/latest/install/zip/index.md %}).
This will also install the ActiveMQ message broker, which is used by the Transform Service.

In a non-containerized environment you need to install the following software before installing Transform Service:

* LibreOffice: see [Install LibreOffice](#install-libreoffice)
* ImageMagick: see [Install ImageMagick](#install-imagemagick)
* alfresco-pdf-renderer: see [Install alfresco-pdf renderer](#install-pdf-renderer)
* Exiftool: see [Install Exiftool](#install-exiftool)

You can install the third-party software used by the Transform Service independently.

#### Install LibreOffice {#install-libreoffice}
With the Transform Service, you can transform a document from one format to another, for example, a text file to a PDF 
file. To access these transformation facilities, you must install LibreOffice.

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

If LibreOffice doesn't start up normally with Transform Service, test it manually, for example, by running this startup script:

```bash
start ex. {installdir}/libreoffice/scripts/libreoffice_ctl.sh start
status ex. {installdir}/libreoffice/scripts/libreoffice_ctl.sh status
```

If you receive errors that indicate that a library is missing, work with your system administrator to add the missing 
library or its equivalent from your configured repositories.

#### Install ImageMagick {#install-imagemagick}
To enable image manipulation in Transform Service, you must install and configure ImageMagick. Transform Service uses 
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
Transform Service uses `alfresco-pdf-renderer` for creating document thumbnails and previews. Use this information to 
install `alfresco-pdf-renderer` on your system.

>**Note:** The `alfresco-pdf-renderer` executable file is platform-specific. You can download the binaries from our Nexus repository.

* For Windows:
    * Download [alfresco-pdf-renderer-1.1-win64.tgz](https://artifacts.alfresco.com/nexus/content/groups/public/org/alfresco/alfresco-pdf-renderer/1.1/alfresco-pdf-renderer-1.1-win64.tgz).
    * Browse to the location of your saved file and extract the archive to a location of your choice.
    * Note down the exe path: `<alfresco-pdf-renderer_installation_dir>/alfresco-pdf-renderer`.

* For Linux:
    * Download [alfresco-pdf-renderer-1.1-linux.tgz](https://nexus.alfresco.com/nexus/service/local/repositories/releases/content/org/alfresco/alfresco-pdf-renderer/1.1/alfresco-pdf-renderer-1.1-linux.tgz).
    * Browse to the location of your saved file and extract the archive to a location of your choice.
    * Note down the exe path: `<alfresco-pdf-renderer_installation_dir>/alfresco-pdf-renderer`.

#### Install ExifTool {#install-exiftool}
Transform Service uses the [ExifTool](https://exiftool.org/){:target="_blank"} for metadata extraction. It is used by 
Apache Tika for extracting image metadata if the auto-detect parser is enabled, which automatically figures out what 
kind of content you have, then calls the appropriate parser for you.

Download version 12.25 of the ExifTool from [Alfresco Nexus Server](https://nexus.alfresco.com/nexus/service/local/repositories/thirdparty/content/org/exiftool/image-exiftool/12.25/image-exiftool-12.25.tgz){:target="_blank"}

See this [ExifTool page](https://exiftool.org/install.html){:target="_blank"} for installation instructions.

The steps to install are:

* Download exiftool
* Unzip exiftool
* ExifTool needs to then be installed globally

Example installation based on a downloaded `image-exiftool-12.25.tgz` file:

Create a new directory named `exiftool` under your Alfresco installation, such as `/usr/local/acs72` directory.

```bash
$ sudo mkdir /usr/local/acs72/exiftool
```

Extract `~/Downloads/image-exiftool-12.25.tgz` and copy the contents of `~/Downloads/Image-ExifTool-12.25` into the 
`/usr/local/acs72/exiftool/` directory:

```bash
$ sudo tar -xvf ~/Downloads/image-exiftool-12.25.tgz --directory ~/Downloads/
$ sudo cp -R ~/Downloads/Image-ExifTool-12.25/* /usr/local/acs72/exiftool/
```

Export the `exiftool` directory to the `PATH` variable:

```bash
export PATH=$PATH:/usr/local/acs72/exiftool
```

Update the file permissions for `/usr/local/acs72/exiftool` directory:

```bash
$ sudo chgrp -R Alfresco /usr/local/acs72/exiftool
$ sudo chmod -R 755 /usr/local/acs72/exiftool
```

## Install with Helm charts
Use this information to deploy Content Services (including the Transform Service) using Helm charts by running a 
Kubernetes cluster on Amazon Web Services (AWS). These charts are a deployment template which can be used as the basis 
for your specific deployment needs.

The Helm charts are provided as a reference that can be used to build deployments in AWS. If you're a System administrator, 
ensure that data persistence, backups, log storage, and other system-level functions have been configured to meet your needs.

You'll need your [Quay.io](https://quay.io){:target="_blank"} account credentials to access the Docker images. If you 
don't already have these credentials, contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

Here is a summary of the steps required:

1. Set up your Kubernetes cluster on AWS.
2. Install the Kubernetes Dashboard to manage your Kubernetes cluster.
3. Set up Content Services on the Kubernetes cluster, including creating file storage.
4. To access the images in [Quay.io](https://quay.io/){:target="_blank"}, you'll need to generate a pull secret and apply it to your cluster.
5. Deploy Content Services.

    > **Note:** Remember to pass the name of the secret as an extra `--set` argument in the `helm install` command.

6. Check the status of your deployment.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/){:target="_blank"} GitHub project 
documentation for the prerequisites and detailed setup:

* [Deploying with Helm charts on AWS using EKS](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/helm-deployment-aws_eks.md){:target="_blank"}

## Install with Docker Compose
Use this information to quickly start up Content Services (including Transform Service) using Docker Compose. Due to the 
limited capabilities of Docker Compose, this deployment method is only recommended for development and test environments.

To check which branch tag corresponds to a specific Content Services release, review the 
[released versions](https://github.com/Alfresco/acs-deployment#versioning){:target="_blank"} in GitHub. Choose a version 
from the left column that corresponds to the required Content Services version you want to deploy.

   > **Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose, using the links provided.

1. Clone the project locally, and then change directory to the project folder:

   ```bash
    git clone --branch x.y.z https://github.com/Alfresco/acs-deployment.git
    cd acs-deployment/docker-compose
    ```

    > **Note:** Replace the version number `x.y.z` with the tag that matches the Content Services version you want to 
    > deploy. For example, if you want Content Services 7.3.0, then select tag `v5.3.0`.

    > **Note:** Make sure that exposed ports are open on your host computer. Check the `docker-compose.yml` file to 
    > determine the exposed ports - refer to the `host:container` port definitions. You'll see they include 5432, 8080, 
    > 8083 and others.

2. Log in to Quay.io using your credentials:

    ```bash
    docker login https://quay.io
    ```

    You'll need your [Quay.io](https://quay.io){:target="_blank"} account credentials to access the Docker images. If 
    you don't already have these credentials, contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.
   
3. (OPTIONAL) Make sure the Docker Compose file uses the following versions of Transform Router, Transform Core AIO T-Engine, and Shared file store:

   ```yaml
   transform-router:
     mem_limit: 512m
     image: quay.io/alfresco/alfresco-transform-router:2.0.0
     environment:
       JAVA_OPTS: " -XX:MinRAMPercentage=50 -XX:MaxRAMPercentage=80"
       ACTIVEMQ_URL: "nio://activemq:61616"
       CORE_AIO_URL: "http://transform-core-aio:8090"
       FILE_STORE_URL: "http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file"
     ports:
       - "8095:8095"
     links:
       - activemq

   transform-core-aio:
     image: alfresco/alfresco-transform-core-aio:3.0.0
     mem_limit: 1536m
     environment:
       JAVA_OPTS: " -XX:MinRAMPercentage=50 -XX:MaxRAMPercentage=80"
       ACTIVEMQ_URL: "nio://activemq:61616"
       FILE_STORE_URL: "http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file"
     ports:
       - "8090:8090"
     links:
       - activemq
   
   shared-file-store:
     image: quay.io/alfresco/alfresco-shared-file-store:2.0.0
     mem_limit: 512m
     environment:
       JAVA_OPTS: " -XX:MinRAMPercentage=50 -XX:MaxRAMPercentage=80"
       scheduler.content.age.millis: 86400000
       scheduler.cleanup.interval: 86400000
     ports:
       - "8099:8099"
     volumes:
       - shared-file-store-volume:/tmp/Alfresco/sfs
   ```

4. Deploy Content Services, including the repository, Share, Postgres database, Search Services, and Transform Service:

    ```bash
    docker-compose up
    ```

    This downloads the images, fetches all the dependencies, creates each container, and then starts the system:

    ```bash
    Creating network "docker-compose_default" with the default driver
    Creating docker-compose-digital-workspace-1 ... done
    Creating docker-compose-solr6-1             ... done
    Creating docker-compose-shared-file-store-1 ... done
    Creating docker-compose-sync-service-1      ... done
    Creating docker-compose-alfresco-1          ... done
    Creating docker-compose-share-1             ... done
    Creating docker-compose-postgres-1          ... done
    Creating docker-compose-activemq-1          ... done
    Creating docker-compose-proxy-1              ... done
    Creating docker-compose-transform-router-1   ... done
    Creating docker-compose-transform-core-aio-1 ... done
    Attaching to docker-compose-digital-workspace-1, docker-compose-shared-file-store-1, docker-compose-alfresco-1,
    ```

    As an alternative, you can also start the containers in the background by running `docker-compose up -d`.

5. Wait for the logs to show messages:

    ```bash
    ...
    docker-compose-alfresco-1 | ... INFO  [service.descriptor.DescriptorService] [main] Alfresco license: Creating time limited trial license
    docker-compose-alfresco-1 | ... WARN  [repo.usage.RepoUsageMonitor] [main] The Alfresco Content Services license will expire in 2 days.
    ...
    docker-compose-alfresco-1 | ... INFO ... Starting 'Transformers' subsystem, ID: [Transformers, default]
    docker-compose-alfresco-1 | ... INFO ... Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
    ```

    If you encounter errors whilst the system is starting up:

    * Stop the session (by using `CONTROL+C`).
    * Remove the container using `--rmi all`. This option also removes the images created by docker-compose up, and the images used by any service. You can use this, for example, if any containers fail and you need to remove them.
    * Try allocating more memory resources, as advised in `docker-compose.yml`. For example, in Docker, change the memory setting in **Preferences** (or **Settings**) > **Advanced** > **Memory**, to at least 8GB. Make sure you restart Docker and wait for the process to finish before continuing.
    * Go back to step 5 in the initial Docker Compose instructions to start the deployment again.

    > **Note:** You'll need a machine with at least 13GB of memory to distribute among the Docker containers.

6. Open your browser and check everything starts up correctly:

    | Service | Endpoint |
    | ------- | -------- |
    | Administration and REST APIs | `http://localhost:8080/alfresco` |
    | Share | `http://localhost:8080/share` |
    | Digital Workspace | `http://localhost:8080/workspace` |
    | Search Services administration (see [this page]({% link content-services/latest/install/containers/docker-compose.md %}) for info on how to login)| `http://localhost:8083/solr` |
    | Transform Router configuration | `http://localhost:8095/transform/config` |
    | ActiveMQ Admin Web Console | `http://localhost:8161/admin` |

7. Log in as the `admin` user. Enter the default administrator password `admin`.

You can use a number of commands to check that the system started correctly, see below.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/tree/master/docs/docker-compose) GitHub project 
documentation for the prerequisites and detailed setup.

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
        Container                             Repository                                     Tag                        Image Id         Size
        ---------------------------------------------------------------------------------------------------------------------------------------
        docker-compose-activemq-1             alfresco/alfresco-activemq                     5.17.1-jre11-rockylinux8   0cd1a9629a85     632MB
        docker-compose-alfresco-1             quay.io/alfresco/alfresco-content-repository   7.3.0                      13fbb0267e48     1.3GB
        docker-compose-control-center-1       quay.io/alfresco/alfresco-admin-app            7.6.0                      f64bca8ae242     44.6MB
        docker-compose-digital-workspace-1    quay.io/alfresco/alfresco-digital-workspace    3.1.0                      5842196a4fb4     576MB
        docker-compose-postgres-1             postgres                                       14.4                       e09e90144645     376MB
        docker-compose-proxy-1                alfresco/alfresco-acs-nginx                    3.4.2                      f9c4519b7920     23.5MB
        docker-compose-share-1                quay.io/alfresco/alfresco-share                7.3.0                      e77a380ab703     720MB
        docker-compose-shared-file-store-1    quay.io/alfresco/alfresco-shared-file-store    2.0.0                      32d64489f2b6     607MB
        docker-compose-solr6-1                alfresco/alfresco-search-services              2.0.5                      936f6335d2e5     920MB
        docker-compose-sync-service-1         quay.io/alfresco/service-sync                  3.8.0                      0418d131e179     629MB
        docker-compose-transform-core-aio-1   alfresco/alfresco-transform-core-aio           3.0.0                      c97305a9232a     1.69GB
        docker-compose-transform-router-1     quay.io/alfresco/alfresco-transform-router     2.0.0                      c084269f2c47     597MB       
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
        docker container logs docker-compose-share-1
        ```

        You can add an optional parameter `--tail=25` before `<container-name>` to display the last 25 lines of the 
        logs for the selected container.

        ```bash
        docker container logs --tail=25 docker-compose-share-1
        ```

        Check for a success message:

        ```bash
        Successfully retrieved license information from Alfresco.
        ```

    Once you've tested the services, you can clean up the deployment by stopping the running services.

4. Stop the session by using `CONTROL+C` in the same window as the running services:

    ```bash
    ^CGracefully stopping... (press Ctrl+C again to force)
    Stopping docker-compose-transform-core-aio-1 ... done
    Stopping docker-compose-transform-router-1   ... done
    Stopping docker-compose-proxy-1              ... done
    Stopping docker-compose-sync-service-1       ... done
    Stopping docker-compose-shared-file-store-1  ... done
    Stopping docker-compose-postgres-1           ... done
    Stopping docker-compose-activemq-1           ... done
    Stopping docker-compose-share-1              ... done
    Stopping docker-compose-solr6-1              ... done
    Stopping docker-compose-alfresco-1           ... done
    Stopping docker-compose-digital-workspace-1  ... done
    ```

5. Alternatively, you can open a new terminal window, change directory to the `docker-compose` folder, and run:

    ```bash
    docker-compose down
    ```

    This stops the running services, as shown in the previous example, and removes them from memory:

    ```bash
    Stopping docker-compose-transform-core-aio-1 ... done
    ...
    Stopping docker-compose-digital-workspace-1  ... done
    Removing docker-compose-transform-core-aio-1 ... done
    ...
    Removing docker-compose-digital-workspace-1  ... done
    Removing network docker-compose_default
    ```

6. You can use a few more commands to explore the services when they're running. Change directory to `docker-compose` 
   before running these:

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

        The `--rmi all` option also removes the images created by `docker-compose up`, and the images used by any service. 
        You can use this, for example, if any containers fail and you need to remove them.

See the [Docker documentation](https://docs.docker.com/){:target="_blank"} for more on getting started with Docker and using Docker.

## Install with zip
Use these instructions to install the Transform Service using the distribution zip and connect it to an instance of 
Alfresco Content Services.

The Transform Service distribution zip file includes all the files required to provide the transformation and 
metadata extraction capabilities. Ensure that you've installed the [prerequisites](#prereq-non-containerized-deploy) 
before continuing.

1. Browse to [Hyland Community](https://community.hyland.com/){:target="_blank"} and download 
   `alfresco-transform-service-distribution-2.0.x.zip`.

2. Extract the zip file into a system directory; for example, `<installLocation>/`.

    In this directory you'll see the following content including three runnable JAR files:

    * `alfresco-shared-file-store-controller-2.0.x.jar`
    * `alfresco-transform-core-aio-boot-3.0.x.jar`
    * `alfresco-transform-router-2.0.x.jar`
    * `README.md`
    * IPTC Content Model (needs to be bootstrapped into Alfresco Content Services for IPTC Metadata extraction to work, 
      unless you are using Alfresco Content Services version 7.1.0+. See [Supported platforms]({% link transform-service/2.0/support/index.md %}) 
      for more information.

3. Start Active MQ.

    For example, run the following command from the ActiveMQ installation directory:

    ```bash
    bin/activemq start
    ```

    For more information on installing and configuring ActiveMQ, see [Configure ActiveMQ]({% link content-services/latest/config/activemq.md %}).

    Check the output to ensure that it starts successfully.

    Make a note of the TCP URL, with example format `tcp://server:port`, where server is the host name of the server 
    where ActiveMQ is installed. This is used in later steps.

    Content Services uses ActiveMQ for message queuing with various products, including the Transform Service.

4. Start the Shared File Store (SFS) controller:

    ```java
    java -DfileStorePath=/path/to/your/AlfrescoFileStore -Dscheduler.contract.path=/path/to/tempdir/scheduler.json
     -jar alfresco-shared-file-store-controller-2.0.x.jar
    ```

    Check the output to ensure that it starts successfully.

    By default, files are stored in `fileStorePath=/tmp/Alfresco`. This can be modified using the `fileStorePath` 
    parameter as shown in the above example.

    The SFS allows components such as the repository, and the Transform Service to share a common place to 
    store and retrieve files, for example, to enable transforms from an input source file to an output target file.
   
    >**Note:** Adding the scheduler contract path property to SFS startup is only required if running Windows.

5. Start the all-in-one Transform Core Engine Spring Boot app:

    ```java
    java -DPDFRENDERER_EXE="<alfresco-pdf-renderer_installation_dir>/alfresco-pdf-renderer"
       -DLIBREOFFICE_HOME="<libreoffice_installation_dir>"
       -DIMAGEMAGICK_ROOT="<imagemagick_installation_dir>"
       -DIMAGEMAGICK_DYN="<imagemagick_installation_dir>/lib"
       -DIMAGEMAGICK_EXE="<imagemagick_installation_dir>/bin/convert"
       -DACTIVEMQ_URL=failover:(tcp://server:61616)?timeout=3000
       -DFILE_STORE_URL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file
       -jar alfresco-transform-core-aio-boot-3.0.x.jar
    ```

    > **Note:** LibreOffice, ImageMagick and Alfresco PDF Renderer binaries needs to be installed on the server where the all-in-one core T-Engine is setup. See the [Prerequisites](#prereq-non-containerized-deploy) for more details. You may need to change the paths depending on your operating system.

    For example:

    ```java
    java -DPDFRENDERER_EXE="/usr/local/acs72/alfresco-pdf-renderer/alfresco-pdf-renderer" \
       -DLIBREOFFICE_HOME="/usr/local/acs72/libreoffice" \
       -DIMAGEMAGICK_ROOT="/usr/local/acs72/imagemagick" \
       -DIMAGEMAGICK_DYN="/usr/local/acs72/imagemagick" \
       -DIMAGEMAGICK_EXE="/usr/local/acs72/imagemagick/convert" \
       -DIMAGEMAGICK_CODERS="/usr/local/acs72/imagemagick/modules-Q16HDRI/coders" \
       -DIMAGEMAGICK_CONFIG="/usr/local/acs72/imagemagick/config-Q16HDRI" \
       -DACTIVEMQ_URL=failover:(tcp://localhost:61616)?timeout=3000 \
       -jar /usr/local/acs72/bin/alfresco-transform-core-aio-boot-3.0.0.jar
    ```

    Check the output to ensure that it starts successfully.

    The all-in-one core T-Engine combines the five T-Engines (i.e. LibreOffice, ImageMagick, Alfresco PDF Renderer, 
    Tika, and Misc) into one single engine. All functionality that's available in the five T-Engines is available in the 
    all-in-one core T-Engine. The command-line options provide the paths to the installation locations and the URL of the 
    messaging broker.

6. Start the Transform Router Spring Boot app:

    ```java
    java -DCORE_AIO_URL=http://localhost:8090
     -DCORE_AIO_QUEUE=org.alfresco.transform.engine.aio.acs
     -DACTIVEMQ_URL=failover:(tcp://server:61616)?timeout=3000
     -DFILE_STORE_URL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file
     -jar alfresco-transform-router-2.0.x.jar
    ```

    Check the output to ensure that it starts successfully.

    The Transform Router allows simple (single-step) and pipeline (multi-step) transforms that are passed to the 
    Transform Engines. The command-line options provide the router with the required data for T-Engines, queuing, 
    and file-store URL.

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

    > **Note:** Any changes to `alfresco-global.properties` require you to restart Alfresco Content Services to apply 
    > the updates. See the Content Services documentation [Using alfresco-global.properties]({% link content-services/latest/config/index.md%}#using-alfresco-globalproperties) 
    > for more information.

8. Check that the [configuration]({% link transform-service/2.0/config/index.md %}) is set up correctly for your environment.

9. Restart Alfresco Content Services.

10. Ensure that the environment is up and running:

    1. Check the logs for Content Services startup.

    2. Monitor ActiveMQ by accessing the Web Console, e.g. `http://localhost:8161/admin/`.

    3. Temporarily enable `TransformDebug` in the repository if you want to see detailed debug log entries.

    4. Navigate to Digital Workspace or Share, and upload a file (such as a `.jpg`, `.png`, `.docx` etc.).

    5. Check the logs to see the metadata and work performed for the uploaded file. These should be available in the Spring Boot apps:

        * `alfresco-transform-router`
        * `alfresco-transform-core-aio`

Files should also be available in the specified path for the `alfresco-shared-file-store`. However, these files will 
only temporarily appear in the Shared File Store until explicitly deleted by the repository and/or expired and cleaned up.
