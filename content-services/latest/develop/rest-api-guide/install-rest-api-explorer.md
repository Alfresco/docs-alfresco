---
title: Install the ReST API Explorer
---

Information about Alfresco ReST API Explorer and how to install it and getting going with it.

## Introduction

The Alfresco ReST API v1 is described in the OpenAPI specification format (formerly Swagger specification). This is 
good as lots of different tools can read this format, and you can also use the specification to generate ReST API clients 
in different languages, such as Java.

Alfresco uses the Alfresco ReST API OpenAPI specification to provide an [API Explorer](https://github.com/Alfresco/rest-api-explorer){:target="_blank"}, 
so you can easily read about all the APIs and try them out. The API Explorer comes in the format of a WAR file that 
needs to be installed (dropped) into your ACS installation.

If you just want to have a look at the latest API Explorer, then you can use an online version of it available here: 
[https://api-explorer.alfresco.com/api-explorer/](https://api-explorer.alfresco.com/api-explorer/){:target="_blank"}

## Installing

Most likely you would want to install the API Explorer into your local ACS installation. You can find the 
Alfresco API Explorer WAR file in [Alfresco’s Nexus repository](https://artifacts.alfresco.com/nexus/#nexus-search;quick~api-explorer){:target="_blank"}. 
Pick the version that closest matches your ACS installation.

To install the WAR file follow one of two approaches. If you are using a trial version of ACS then you follow the first 
approach described below. If you are using the [Alfresco SDK]({% link content-services/latest/develop/sdk.md %}) 
you would want to follow the second approach. The main difference between the two is that the first one will lead to 
loss of the data that you are working with as the ACS trial Docker Compose file does not use volumes 
(i.e. it does not store data externally but instead inside the container).

### Installing the WAR file into an ACS Trial environment 

>**IMPORTANT!** you will lose your data/content when you do this)

1.  Create a directory somewhere for Repository extension files and copy the War file there

    Now, copy the WAR file, for example `api-explorer-6.2.0.war` into this new directory. Then rename the file to `api-explorer.war`.

2.  Create a `Dockerfile` for the new custom Repository Docker Image

    As a developer you are most likely running ACS 6.x via a Docker Compose file, either via trial or SDK. The `Dockerfile` 
    will be based on the Repository Image that is used in the `docker-compose.xml` file. Have a look in it and you should see 
    that it starts with defining the Alfresco Repository Docker image:
    
    ```text
    version: "2"
    
    services:
       alfresco:
           image: alfresco/alfresco-content-repository:6.2.0
           ...
    ```
    
    With this information we know what Docker Image to base our custom Repo Docker Image on. Create a `Dockerfile` in the same directory as the WAR file and have it look like this:
    
    ```text
    FROM alfresco/alfresco-content-repository:6.2.0
      
    ARG TOMCAT_DIR=/usr/local/tomcat
    
    # Copy the ReST API Explorer into the Tomcat Webapps directory
    COPY api-explorer.war $TOMCAT_DIR/webapps/
    ```
    
    What this `Dockerfile` will do is build a custom Repository Docker image that is based on the out-of-the-box Alfresco Repository Docker image that you are using. It will then copy in the `api-explorer.war` into the `tomcat/webapps` directory where it will be picked up and deployed.

3.  Build the custom Alfresco Repository Docker image

    When we got the Dockerfile completed we just need to build the custom Docker image as follows, standing in the directory with all the files:
    
    ```bash
    repo mbergljung$ docker build -t alf-repo-custom:1.0 .
    Sending build context to Docker daemon  954.4kB
    Step 1/3 : FROM alfresco/alfresco-content-repository:6.2.0
     ---> 5439a493ee0a
    Step 2/3 : ARG TOMCAT_DIR=/usr/local/tomcat
     ---> Using cache
     ---> cf2a1261adf4
    Step 3/3 : COPY api-explorer.war $TOMCAT_DIR/webapps/
     ---> Using cache
     ---> 52f10e1f00d6
    Successfully built 1766782c545a
    Successfully tagged alf-repo-custom:1.0
    ```
    
    Check that you got the custom Docker image:
    
    ```bash
    repo mbergljung$ docker image ls |grep alf-
    alf-repo-custom                                                  1.0                                          1766782c545a        About a minute ago   1.16GB
    ```

4.  Update the `docker-compose.xml` file to use the new custom image

    Open up the `docker-compose.xml` file and change it so the Repository service is based on the custom Docker Image we just created. It should now look something like this:
    
    ```text
    version: "2"
    
    services:
        alfresco:
            image: alf-repo-custom:1.0
            ...
    ```

5.  Restart ACS

    We have made changes only to the Repository container, also known as the **alfresco** Docker Compose service, but we need to remove and restart all containers so data is in sync (basically we are starting over with an empty repository). After we have created our own Docker Image for the Alfresco Repository container and configured Docker Compose with it we can restart as follows by doing **Ctrl-C** out of the log, this will stop all containers, we then remove them, followed by starting it up again:
    
    ```bash
    ^CGracefully stopping... (press Ctrl+C again to force)
    Stopping acs62_alfresco-pdf-renderer_1 ... done
    ...
    
    acs61 mbergljung$ docker-compose rm 
    Going to remove acs62_alfresco-pdf-renderer_1, acs62_transform-router_1, acs62_libreoffice_1, acs62_tika_1, acs62_imagemagick_1, acs62_proxy_1, acs62_share_1, acs62_postgres_1, acs62_digital-workspace_1, acs62_alfresco_1, acs62_activemq_1, acs62_solr6_1, acs62_shared-file-store_1
    Are you sure? [yN] y
    Removing acs62_alfresco-pdf-renderer_1 ... done
    ...
    
    acs61 mbergljung$ docker-compose up 
    Creating acs62_alfresco-pdf-renderer_1 ... done 
    ...           
    ```

### Installing the WAR file into an Alfresco SDK AIO project

1.  Copy API Explorer WAR file into the SDK project

    Copy the `api-explorer-6.2.0.war` into the `aio/aio-platform-docker/src/main/docker` AIO SDK directory. Then rename the file to `api-explorer.war`.

2.  Open up the platform/repository Docker file and add the command to copy the `api-explorer.war` into `tomcat/webapps`

    The platform (repository) `Dockerfile` is located in the `aio/aio-platform-docker/src/main/docker` AIO SDK directory. Add the following COPY command at the end of this file:
    
    ```text
    ...    
    # Copy the ReST API Explorer into the Tomcat Webapps directory
    COPY api-explorer.war $TOMCAT_DIR/webapps/
    ```
    
    What this Dockerfile will do is build a custom Repository Docker image that is based on the out-of-the-box Alfresco Repository Docker image that you are using. After it has copied in all the extensions, config files, license etc it will finish by copying in the `api-explorer.war` into the `tomcat/webapps` directory where it will be picked up and deployed.

3.  Restart the platform/repository container

    We have changed only the platform/repository, so it is enough to just restart this container:
    
    ```bash
    acs61-aio mbergljung$ ./run.sh reload_acs
    Killing docker_acs62-aio-acs_1 ... done
    Going to remove docker_acs61-aio-acs_1
    Removing docker_acs62-aio-acs_1 ... done
    ...
    ```

>**Note**. this does not remove any content or metadata.

### Accessing the API Explorer

You should now be able to access the API Explorer at [http://localhost:8080/api-explorer](http://localhost:8080/api-explorer/#/){:target="_blank"}:

![dev-api-by-language-alf-rest-api-explorer-1]({% link content-services/images/dev-api-by-language-alf-rest-api-explorer-1.png %})

## Getting started

You make API requests by sending a URL using one of five HTTP API methods, GET, POST, PUT, DELETE, and OPTIONS. Here's 
an example of a URL to get all sites in a local Alfresco installation:

```http
http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites
```

You can use the ReST API Explorer to make this request:

* In your web browser, navigate to `[http://localhost:8080/api-explorer/#!/sites/listSites](http://localhost:8080/api-explorer/#!/sites/listSites)`. You'll see full documentation for the **GET /sites** API method, including the query and body parameter formats, and the expected and error response schemas.
* At the end of the description you'll see the **Try it out!** button. Press it now.

You've just made your first Alfresco ReST API request. You will see the request URL you've just invoked, the 
corresponding Curl command, the JSON response body that the Alfresco repository has returned, the HTTP response code, 
and the response headers: 

![dev-api-by-language-alf-rest-api-explorer-2]({% link content-services/images/dev-api-by-language-alf-rest-api-explorer-2.png %})

Note this call returns a list of site `entries`. All lists returned by the Alfresco ReST API are of this format.
