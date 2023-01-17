---
title: Customization guidelines
---

Although it's possible to change and mount files/folders into existing Docker images the recommended approach is to create new custom Docker images.

Installing AMPs also requires the creation of a custom image, this guide describes the steps required to install AMP files into Alfresco Content Repository and Alfresco Share images. These custom images can then be deployed using docker-compose.

This process requires some familiarity with [Docker](https://www.docker.com/){:target="_blank"} and specifically [Dockerfile commands](https://docs.docker.com/engine/reference/builder/){:target="_blank"}.

## Setting up

1. Clone the repository and change directory to `acs-deployment`:

    ```bash
    git clone https://github.com/Alfresco/acs-deployment.git
    cd acs-deployment
    ```

2. Switch to the `docker-compose` directory, then create subdirectories to hold the AMP files and Dockerfiles:

    ```bash
    cd docker-compose && \
    mkdir -p repository/amps share/share_amps && \
    touch repository/Dockerfile share/Dockerfile
    ```

3. Copy your Alfresco AMP files to the newly created `repository/amps` directory and copy your Share AMP files to the newly created `share/share_amps` directory.

## Create custom repository image

You now need to install the AMP files into the Alfresco Content Repository image.

1. The `docker-compose` folder contains a file for each main code line of Content Services. Examine the relevant Docker Compose file for the version you want to apply the AMPs to.

    For example, to apply AMPs to the latest version of 7.2, take a look at the `docker-compose.yml` file.

2. Take note of the image and tag used for the **alfresco** service in the Docker Compose file you chose.

    For example, if you're using `docker-compose.yml`, you'll find on [line 15](https://github.com/Alfresco/acs-deployment/blob/master/docker-compose/docker-compose.yml#L15){:target="_blank"}:

    ```bash
    quay.io/alfresco/alfresco-content-repository:7.2.0
    ```

3. Add the following Docker commands to the `repository/Dockerfile` file and save it. Make sure that you change the image name and tag to match the above step:

    ```Dockerfile
    FROM quay.io/alfresco/alfresco-content-repository:7.2.0

    # Customize container: install amps

    ARG ALF_GROUP=Alfresco
    ARG TOMCAT_DIR=/usr/local/tomcat

    USER root

    ADD ./amps/*.amp ${TOMCAT_DIR}/amps/

    RUN java -jar ${TOMCAT_DIR}/alfresco-mmt/alfresco-mmt*.jar install \
        ${TOMCAT_DIR}/amps ${TOMCAT_DIR}/webapps/alfresco -directory -nobackup -verbose

    # Restore permissions
    RUN chgrp -R ${ALF_GROUP} ${TOMCAT_DIR}/webapps && \
        find ${TOMCAT_DIR}/webapps -type d -exec chmod 0750 {} \; && \
        find ${TOMCAT_DIR}/webapps -type f -exec chmod 0640 {} \; && \
        find ${TOMCAT_DIR}/shared -type d -exec chmod 0750 {} \; && \
        find ${TOMCAT_DIR}/shared -type f -exec chmod 0640 {} \; && \
        chmod -R g+r ${TOMCAT_DIR}/webapps && \
        chgrp -R ${ALF_GROUP} ${TOMCAT_DIR}

    USER alfresco
    ```

    > **Note:** In the example RUN Docker command, the Alfresco MMT JAR is run with `-directory`, `-nobackup` and `-verbose` options. Make sure these options are suitable for your requirements. See the [Alfresco MMT documentation]({% link content-services/7.2/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) for more.

4. Build the image, making sure you give the image an appropriate name and tag, so you can easily identify it later.

    In the example, replace `myregistrydomain/my-custom-alfresco-content-repository:7.2` and `myregistrydomain/my-custom-alfresco-content-repository:latest` with your own Docker registry, image name, and tag:

    ```bash
    docker build repository -t myregistrydomain/my-custom-alfresco-content-repository:7.2 -t myregistrydomain/my-custom-alfresco-content-repository:latest
    ```

    Once the image build is complete, you should see success messages:

    ```text
    Successfully built 632eda3ea296
    Successfully tagged myregistrydomain/my-custom-alfresco-content-repository:7.2
    Successfully tagged myregistrydomain/my-custom-alfresco-content-repository:latest
    ```

5. Replace the image used by the **alfresco** service in the Docker Compose file you chose in step 1.

    For example, replace `image: quay.io/alfresco/alfresco-content-repository:7.2.0` with `image: myregistrydomain/my-custom-alfresco-content-repository:7.2`:

6. Save the file.

## Create custom Alfresco Share image

Let's repeat the process for the Alfresco Share image.

1. Take note of the image and tag used for the **share** service in the Docker Compose file you chose in the previous section.

    For example, if you're using `docker-compose.yml`, you'll find on [line 93](https://github.com/Alfresco/acs-deployment/blob/master/docker-compose/docker-compose.yml#L93){:target="_blank"}:

    ```bash
    quay.io/alfresco/alfresco-share:7.2.0
    ```

2. Add the following Docker commands to the `share/Dockerfile` file and save it. Make sure you change the image name and tag to match the above step:

    ```Dockerfile
    FROM quay.io/alfresco/alfresco-share:7.2.0

    ARG TOMCAT_DIR=/usr/local/tomcat

    ADD ./share_amps/*.amp ${TOMCAT_DIR}/amps_share/

    RUN java -jar ${TOMCAT_DIR}/alfresco-mmt/alfresco-mmt*.jar install \
        ${TOMCAT_DIR}/amps_share ${TOMCAT_DIR}/webapps/share -directory -nobackup -verbose
    ```

    > **Note:** In the example RUN docker command, `alfresco-mmt jar` is run with `-directory`, `-nobackup` and `-verbose` options. Make sure these options are suitable for your requirements. See the [Alfresco MMT documentation]({% link content-services/7.2/develop/extension-packaging.md %}#using-the-module-management-tool-mmt).

3. Build the image, making sure you give the image an appropriate name and tag, so you can easily identify it later.

    In the following command, replace `myregistrydomain/my-custom-alfresco-share:7.2` and `myregistrydomain/my-custom-alfresco-share:latest` with your own Docker registry, image name and tag:

    ```bash
    docker build share -t myregistrydomain/my-custom-alfresco-share:7.2 -t myregistrydomain/my-custom-alfresco-share:latest
    ```

    Once the image build is complete, you should see success messages:

    ```text
    Successfully built 6d5ee67935da
    Successfully tagged myregistrydomain/my-custom-alfresco-share:7.2
    Successfully tagged myregistrydomain/my-custom-alfresco-share:latest
    ```

4. Replace the image used by the **share** service in the Docker Compose file you chose in the previous section.

    For example, replace `image: quay.io/alfresco/alfresco-share:7.2.0` with `image: myregistrydomain/my-custom-alfresco-share:7.2`

5. Save the file.

## Start the system

You've now built two custom images, one for the Alfresco Content Repository and one for Alfresco Share, and added them to your `docker-compose.yml` services.

You can start your custom `docker-compose.yml` file using the following command:

```bash
docker-compose -f <your-modified-docker-compose.yml> up
```

You'll find more information in the following pages:

* Docker Compose - [start up, configure, and troubleshoot]({% link content-services/7.2/install/containers/docker-compose.md %})
* Advanced configuration example - [building a custom image with configuration](https://github.com/Alfresco/acs-packaging/blob/master/docs/create-custom-image-using-existing-docker-image.md#applying-amps-that-require-additional-configuration-advanced){:target="_blank"}.
