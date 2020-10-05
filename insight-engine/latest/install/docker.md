---
title: Installing using Docker compose
---
# Deploying Search and Insight Engine using Docker Compose

Use this information to start up Alfresco Content Services 6.2 or above and Alfresco Search and Insight Engine 2.0 using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.

**Prerequisites**

* [Docker](https://docs.docker.com/install/)
  * This allows you to run Docker images and Docker Compose on a single computer.

* [Docker Compose](https://docs.docker.com/compose/install/)
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

* Access to [Quay](http://www.quay.io)
  * Docker requires access to certain images which are stored on Quay. You need to use the correct credentials provided by Alfresco to access these images. Contact [Alfresco Support](mailto:support@alfresco.com) to request the credentials.

> **Note:** Make sure the following ports are free on your computer: 5432, 8080, 8082, 8083. These ports are set in the docker-compose.yml file.

1. Download the latest Alfresco Content Services docker-compose.yml file by accessing the [trial download page](https://www.alfresco.com/platform/content-services-ecm/trial/download).

2. Save the file in a local folder.

3. Edit the file and change the Solr 6 service. Add a \# prefix to Alfresco Search Services so it is commented out.

    ```yaml
        solr6:
            #image: alfresco/alfresco-search-services:2.0.0
            image: quay.io/alfresco/insight-engine:2.0.0
            mem_limit: 2500m
            environment:
                #Solr needs to know how to register itself with Alfresco
                    - SOLR_ALFRESCO_HOST=alfresco
                    - SOLR_ALFRESCO_PORT=8080
                #Alfresco needs to know how to call solr
                    - SOLR_SOLR_HOST=solr6
                    - SOLR_SOLR_PORT=8983
                #Create the default alfresco and archive cores
                    - SOLR_CREATE_ALFRESCO_DEFAULTS=alfresco,archive
                    - "SOLR_JAVA_MEM=-Xms2g -Xmx2g"
            ports:
                - 8083:8983 #Browser port
    ```

    > **Note:** If you want to use the Apache Zeppelin visualization interface with Search and Insight Engine you have to deploy it using Docker Compose along with Alfresco Content Services, you cannot install it manually. See [Deploy Alfresco Insight Zeppelin using Docker Compose](deploying-apache-zeppelin.md) for the additional container information you need to add to your docker-compose.yml file.

4. Save the file.

5. Log in to Quay using the following command:

    ```yaml
    $ docker login quay.io
                login against server at https://quay.io/v1/
                Username: <<Quay.io Credential Username>>
                Password: <<Quay.io Credential Password>>
    ```

6. Change directory to the location of the `docker-compose.yml` file and deploy Alfresco Content Services and Search and Insight Engine using the following command:

    ```bash
    docker-compose up
    ```

    This downloads the images, fetches all the dependencies, creates each container, and then starts the system. If you downloaded the project and changes were made to the project settings, any new images will be pulled from Quay before the system starts.

7. Wait for the logs to complete.

    If you encounter errors while the system is starting up:

    * Stop the session (by using `CONTROL+C`).
    * Remove the container (using the `--rmi all` option): For example `docker-compose down --rmi all`.
    * Try allocating more memory resources. As advised in docker-compose.yml set it to at least 16 GB. To adjust the memory, in Docker, go to **Preferences** (or **Settings**) > **Advanced** > **Memory**. Once you have adjusted the memory make sure you restart Docker and wait for the process to finish before continuing.
    * Go back to step 6 and retry the deployment.
8. Open your browser and check everything starts up correctly:

    * Alfresco: `http://localhost:8082/alfresco`
    * Share: `http://localhost:8080/share`
    * Solr: `http://localhost:8083/solr`

        > **Note:** When you access the solr url you will see the version of Search and Insight Engine that is installed.
