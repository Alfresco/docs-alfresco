---
title: Install using Docker Compose
---

Use this information to quickly start up Content Services using Docker Compose.

> **Note:** While Docker Compose is often used for production deployments, the Docker Compose file provided is recommended for development and test environments only. Customers are expected to adapt this file to their own requirements, if they intend to use Docker Compose to deploy a production environment.

To deploy Content Services using Docker Compose, download and install [Docker](https://docs.docker.com/install/){:target="_blank"}, then follow the steps below. Make sure that you've reviewed the [prerequisites]({% link content-services/latest/install/containers/index.md %}#prerequisites) before continuing.

1. Download the `docker-compose.yml` file by accessing the Content Services [Download Trial](https://www.hyland.com/en/resources/alfresco-ecm-download){:target="_blank"} page, which will give you a 30-day license.

    If you already have a valid license file for Content Services 23.1, you can apply it directly to the running system. See [Uploading a new license]({% link content-services/latest/admin/license.md %}) for more details.

    > **Note:** Make sure that exposed ports are open on your host computer. Check the `docker-compose.yml` file to determine the exposed ports - refer to the `host:container` port definitions. You'll see they include 5432, 8080, 8083 and others.

    > **Note:** The Download Trial is usually updated to the most recent version of Content Services. The latest published version on our website is labelled *Version 23.1.1 - November 2023*.

2. Save the `docker-compose.yml` file in a local folder.

    For example, you can create a folder `acs_trial`.

3. Change directory to the location of your `docker-compose.yml` file.

4. Log in to Quay.io using your credentials:

    ```bash
    docker login quay.io
    ```

    Alfresco customers can request Quay.io credentials by logging a ticket with [Alfresco Support](https://support.alfresco.com/){:target="_blank"}. These credentials are required to pull private (Enterprise-only) Docker images from Quay.io.

5. Deploy Content Services, including the repository, Share, Postgres database, Search Services, etc.:

    ```bash
    docker-compose up
    ```

    This downloads the images, fetches all the dependencies, creates each container, and then starts the system:

    ```text
    ...
    Creating network "acs_trial_default" with the default driver
    Creating volume "acs_trial_shared-file-store-volume" with default driver
    Creating acs_trial_control-center_1     ... done
    Creating acs_trial_activemq_1           ... done
    Creating acs_trial_sync-service_1       ... done
    Creating acs_trial_solr6_1              ... done
    Creating acs_trial_digital-workspace_1  ... done
    Creating acs_trial_share_1              ... done
    Creating acs_trial_postgres_1           ... done
    Creating acs_trial_alfresco_1           ... done
    Creating acs_trial_shared-file-store_1  ... done
    Creating acs_trial_proxy_1              ... done
    Creating acs_trial_transform-router_1   ... done
    Creating acs_trial_transform-core-aio_1 ... done
    Attaching to acs_trial_postgres_1, acs_trial_control-center_1, acs_trial_sync-service_1, acs_trial_share_1, acs_trial_digital-workspace_1, acs_trial_alfresco_1, acs_trial_solr6_1,    acs_trial_activemq_1, acs_trial_shared-file-store_1, acs_trial_proxy_1, acs_trial_transform-router_1, acs_trial_transform-core-aio_1
    ...
    ```

    Note that the name of each container begins with the folder name you created in step 2.

    As an alternative, you can also start the containers in the background by running `docker-compose up -d`.

6. Wait for the logs to complete, showing messages:

    ```bash
    ...
    alfresco_1 | ...  INFO  ... Starting 'Transformers' subsystem, ID: [Transformers, default]
    alfresco_1 | ...  INFO  ... Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
    ...
    ```

    See [Troubleshooting](#troubleshooting) if you encounter errors whilst the system is starting up.

7. Open your browser and check everything starts up correctly:

    | Service | Endpoint |
    | ------- | -------- |
    | Administration and REST APIs | `http://localhost:8080/alfresco` |
    | Digital Workspace | `http://localhost:8080/workspace` |
    | Share | `http://localhost:8080/share` |
    | Search Services administration | `http://localhost:8083/solr` |
    | Sync Service health check | `http://localhost:9090/alfresco/healthcheck` |
    | Admin Console | `http://localhost:8080/alfresco/s/enterprise/admin` |

    If Docker is running on your local machine, the IP address will be just `localhost`.

    If you're still using the [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/){:target="_blank"}, you'll need to switch to [Docker Desktop](https://docs.docker.com/install/){:target="_blank"} as Docker Toolbox is deprecated.

    For more information on Search Services administration, see [Search Services administration](#search-services-administration)

8. Log in as the `admin` user. Enter the default administrator password `admin`.

## Search Services administration

To get to the Solr Admin UI it’s necessary to add a header with a secret.

For Safari:

1. Go to **Develop > Show Web Inspector > Sources**.
2. Click on the **+** next to *Local Overrides* and select **Local Overrides…**.
3. Configure URL with regular expression, using Solr host and port (e.g `http://localhost:8983/solr/*`), and add the `X-Alfresco-Search-Secret` header with the secret value.

For Chrome, FireFox, Opera, and Edge:

1. Install the ModHeader extension.
2. Add the `X-Alfresco-Search-Secret` header with the secret value, as seen in the image. <br/><br/>![Modheader]({% link content-services/images/modheader.png %}){:width="460" height="380px"}

## Check system start up

Use this information to verify that the system started correctly, and to clean up the deployment.

1. Open a new terminal window.

2. Change directory to the `docker-compose` folder that you created in the deployment steps.

3. Verify that all the services started correctly.

    1. List the images and additional details:

        ```bash
        docker-compose images
        ```

        You should see a list of the services defined in your `docker-compose.yml` file (below are the tags used in the latest 23.x release):

        ```text
        Container                        Repository                                                     Tag                       Image Id       Size
        ------------------------------------------------------------------------------------------------------------------------------------------------
        acs_trial-activemq-1              alfresco/alfresco-activemq                                   5.18-jre11-rockylinux8    c983f8c439f4   645 MB
        acs_trial-alfresco-1              quay.io/alfresco/alfresco-content-repository                 23.2.1                    d543f50c8a7b   1.12 GB
        acs_trial-control-center-1        quay.io/alfresco/alfresco-control-center                     8.4.1                     65e05f14d4a3   43.6 MB
        acs_trial-digital-workspace-1     quay.io/alfresco/alfresco-digital-workspace                  4.4.1                     42bf20815997   47.8 MB
        acs_trial-elasticsearch-1         elasticsearch                                                7.10.1                    558380375f1a   774 MB
        acs_trial-postgres-1              postgres                                                     14.4                      e09e90144645   376 MB
        acs_trial-proxy-1                 alfresco/alfresco-acs-nginx                                  3.4.2                     f9c4519b7920   23.4 MB
        acs_trial-search-1                quay.io/alfresco/alfresco-elasticsearch-live-indexing        4.0.1                     cfd3f6ef7139   596 MB
        acs_trial-search-reindexing-1     quay.io/alfresco/alfresco-elasticsearch-reindexing           4.0.1                     e5eb14f75825   602 MB
        acs_trial-share-1                 quay.io/alfresco/alfresco-share                              23.2.1                    2692e8fa81e3   691 MB
        acs_trial-shared-file-store-1     quay.io/alfresco/alfresco-shared-file-store                  4.1.1                     b0e701edeb6a   540 MB
        acs_trial-sync-service-1          quay.io/alfresco/service-sync                                4.0.1                     cb8e65443e11   719 MB
        acs_trial-transform-core-aio-1    alfresco/alfresco-transform-core-aio                         5.1.1                     ab05c7e4d20a   1.65 GB
        acs_trial-transform-router-1      quay.io/alfresco/alfresco-transform-router                   4.1.1                     fe8db4219e45   564 MB
        ```

    2. List the running containers:

        ```bash
        docker-compose ps
        ```

        You should see a list of the services defined in the `docker-compose.yml` file.

    3. View the log files for each service `<service-name>`, or container `<container-name>`:

        ```bash
        docker-compose logs <service-name>
        docker container logs <container-name>
        ```

        For example, to check the logs for Share, run any of the following commands:

        ```bash
        docker-compose logs share
        docker container logs acs_trial-share-1
        ```

        You can add an optional parameter `--tail=25` before `<container-name>` to display the last 25 lines of the logs for the selected container.

        ```bash
        docker-compose logs --tail=25 share
        docker container logs --tail=25 acs_trial-share-1
        ```

        Check for a success message:

        ```text
        Successfully retrieved license information from Alfresco.
        ```

    Once you've tested the services, you can clean up the deployment by stopping the running services.

4. Stop the session by using `CONTROL+C` in the same window as the running services:

    ```text
    Gracefully stopping... (press Ctrl+C again to force)
    Container acs_trial-transform-router-1   ... Stopped
    Container acs_trial-proxy-1              ... Stopped
    Container acs_trial-transform-core-aio-1 ... Stopped
    Container acs_trial-postgres-1           ... Stopped
    Container acs_trial-alfresco-1           ... Stopped
    Container acs_trial-shared-file-store-1  ... Stopped
    Container acs_trial-share-1              ... Stopped
    Container acs_trial-sync-service-1       ... Stopped
    Container acs_trial-control-center-1     ... Stopped
    Container acs_trial-digital-workspace-1  ... Stopped
    Container acs_trial-activemq-1           ... Stopped
    ```

5. Alternatively, you can open a new terminal window, change directory to the `docker-compose` folder, and run:

    ```bash
    docker-compose down
    ```

    This stops the running services, as shown in the previous example, and removes them from memory:

    ```text
    Container acs_trial-transform-core-aio-1 ... Stopping
    Container acs_trial-sync-service-1       ... Stopping
    Container acs_trial-proxy-1              ... Stopping
    Container acs_trial-search-1             ... Stopping
    Container acs_trial-search-reindexing-1  ... Stopping
    Container acs_trial-shared-file-store-1  ... Stopping
    Container acs_trial-transform-router_1   ... Stopping
    Container acs_trial-postgres-1           ... Stopping
    Container acs_trial-activemq-1           ... Stopping
    Container acs_trial-elasticsearch-1      ... Removed
    Container acs_trial-control-center-1     ... Removed
    Container acs_trial-alfresco-1           ... Removed
    Container acs_trial-digital-workspace-1  ... Removed
    Container acs_trial-share-1              ... Removed
    Network acs_trial_default                ... Removed
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

        ```bash
        docker-compose down --rmi all
        ```

        ```text
        Container acs_trial-transform-core-aio-1                           Removed
        Container acs_trial-transform-router-1                             Removed
        Container acs_trial-search-reindexing-1                            Removed
        Container acs_trial-proxy-1                                        Removed
        Container acs_trial-search-1                                       Removed
        Container acs_trial-sync-service-1                                 Removed
        Container acs_trial-postgres-1                                     Removed
        Container acs_trial-elasticsearch-1                                Removed
        Container acs_trial-activemq-1                                     Removed
        Container acs_trial-share-1                                        Removed
        Container acs_trial-digital-workspace-1                            Removed
        Container acs_trial-alfresco-1                                     Removed
        Container acs_trial-control-center-1                               Removed
        Image quay.io/alfresco/service-sync:4.0.1                          Removed
        ...                               
        Image quay.io/alfresco/alfresco-content-repository:23.2.1          Stopping                               
        ...
        Network acs_trial_default                                           Stopping
        ```

See the [Docker documentation](https://docs.docker.com/){:target="_blank"} for more on using Docker.

### Deployment project in GitHub

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment){:target="_blank"} GitHub project for more details.

* In this project, you'll find several Docker Compose files. The default `docker-compose.yml` file contains the latest work-in-progress deployment scripts, and installs the latest *development* version of Content Services.
* To deploy a specific released version of Content Services, several *major.minor* Docker Compose files are provided in the `docker-compose` folder of the project.
* To modify your development environment, for example to change or mount files in the existing images, you'll have to create new custom Docker images (recommended approach). The same approach applies if you want to install AMP files into the repository and Share images. See the [Customization guidelines]({% link content-services/latest/install/containers/customize.md %}) for more.

Using one of the Docker Compose - Enterprise files in this project deploys the following system:

![Docker Compose - Enterprise]({% link content-services/images/compose-enterprise.png %}){:width="460" height="380px"}

## Configure

The Docker Compose file provides some default configuration. This section lists the full set of environment variables exposed by each of the containers in the deployment.

### Alfresco Content Repository (alfresco)

| Property | Description |
| -------- | ----------- |
| JAVA_TOOL_OPTIONS | Adding this environment variable, allows to set sensitive values (like passwords) that are not passed as arguments to the Java Process. |
| JAVA_OPTS | A set of properties that are picked up by the JVM inside the container. Any Content Services property can be passed to the container using the format `-Dproperty=value` (e.g. `-Ddb.driver=org.postgresql.Driver`). |

### Alfresco Share (share)

| Property | Description |
| -------- | ----------- |
| JAVA_OPTS | A set of properties that are picked up by the JVM inside the container |
| REPO_HOST | Share needs to know how to register itself with Alfresco. The default value is `localhost` |
| REPO_PORT | Share needs to know how to register itself with Alfresco. The default value is `8080` |
| CSRF_FILTER_REFERER | CSRF Referrer |
| CSRF_FILTER_ORIGIN | CSRF Origin |
| USE_SSL | Enables ssl use if set to `true`. The default value is `false` |

### Alfresco Digital Workspace (digital-workspace)

| Property | Description |
| -------- | ----------- |
| BASE_PATH | The default value is `./` |
| APP_CONFIG_OAUTH2_HOST | The address of the Identity Service including the realm name configured |
| APP_CONFIG_AUTH_TYPE | The authentication type. To use Single Sign-on mode you must change this property to OAUTH. The default value is `BASIC` |
| APP_CONFIG_OAUTH2_CLIENTID | The name of the client configured for Digital Workspace |
| APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI | The address that Digital Workspace uses to refresh authorization tokens |
| APP_CONFIG_OAUTH2_REDIRECT_LOGIN | The URL to redirect to after a user is successfully authenticated |
| APP_CONFIG_OAUTH2_REDIRECT_LOGOUT | The URL to redirect to after a user successfully signs out |
| APP_BASE_SHARE_URL | Base Share URL. For example `{protocol}//{hostname}{:port}/workspace/#/preview/s` |
| AUTH_TYPE | The authentication type. To use Single Sign-on mode you must change this property to OAUTH. The default value is `BASIC` |
| PROVIDER | The default value is `ALL` |
| ENVIRONMENT_SUFFIX | Only for Process Cloud instance. The default value is `_CLOUD` |
| API_HOST |  |
| API_CONTENT_HOST |  |
| API_CONTENT_HOST_LOCAL | The default value is `http://localhost:8080` |
| API_PROCESS_HOST |  |
| OAUTH_HOST |  |
| IDENTITY_HOST | The address of the Identity Service including the realm name configured. |
| E2E_HOST | The default value is `http://localhost` |
| E2E_PORT | The default value is `80` |
| API_HOST_CLOUD |  |
| API_CONTENT_HOST_CLOUD |  |
| API_PROCESS_HOST_CLOUD |  |
| OAUTH_HOST_CLOUD |  |
| IDENTITY_HOST_CLOUD |  |
| E2E_HOST_CLOUD | The default value is `http://localhost` |
| E2E_PORT_CLOUD | The default value is `4200` |
| APP_CONFIG_APPS_DEPLOYED | The name of the deployed application (e.g. `"[{"name": "<the name of the deployed application>"}]"`) |

### Alfresco Content App (content-app)

This app is deployed by default only with the Community Compose file, `community-docker-compose.yml`.

| Property | Description |
| -------- | ----------- |
| BASE_PATH | The default value is `./` |
| APP_CONFIG_PROVIDER | BPM/ECM/ALL. The default value is `ECM` |
| APP_CONFIG_AUTH_TYPE | The authentication type. To use Single Sign-on mode you must change this property to OAUTH. The default value is `BASIC` |
| APP_CONFIG_BPM_HOST | BPM Host address. The default value is `{protocol}//{hostname}{:port}` |
| APP_CONFIG_ECM_HOST | ECM Host address. The default value is `{protocol}//{hostname}{:port}` |
| APP_CONFIG_IDENTITY_HOST | |
| APP_CONFIG_OAUTH2_HOST | The address of the Identity Service including the realm name configured. The default value is `{protocol}//{hostname}{:port}/auth/realms/alfresco` |
| APP_CONFIG_OAUTH2_CLIENTID | The name of the client configured for Content App. The default value is `alfresco` |
| APP_CONFIG_OAUTH2_IMPLICIT_FLOW | The default value is `true` |
| APP_CONFIG_OAUTH2_SILENT_LOGIN | The default value is `true` |
| APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI | The address that Content App uses to refresh authorization tokens. The default value is `{protocol}//{hostname}{:port}/assets/silent-refresh.html` |
| APP_CONFIG_OAUTH2_REDIRECT_LOGIN | The URL to redirect to after a user is successfully authenticated. The default value is `./` |
| APP_CONFIG_OAUTH2_REDIRECT_LOGOUT | The URL to redirect to after a user successfully signs out. The default value is `./` |
| APP_BASE_SHARE_URL | Base Share URL. The default value is `${APP_CONFIG_ECM_HOST}/#/preview/s` |
| APP_CONFIG_PLUGIN_AOS | Enables AOS plugin. The default value is `true` |
| APP_CONFIG_PLUGIN_CONTENT_SERVICE | Enable Content Service plugin. The default value is `true` |
| APP_EXTENSIONS_IGNORE_REFS | Plugins references to exclude |

### Alfresco Control Center (control-center)

| Property | Description |
| -------- | ----------- |
| BASE_PATH | The default value is `./` |
| APP_CONFIG_AUTH_TYPE | The authentication type. To use Single Sign-on mode you must change this property to OAUTH. The default value is `BASIC` |
| APP_CONFIG_PROVIDER | Config provider. The default value is `ECM` |

### Alfresco Search Services (solr6)

| Property | Description |
| -------- | ----------- |
| SOLR_ALFRESCO_HOST | Solr needs to know how to register itself with Alfresco. The default value is `alfresco` |
| SOLR_ALFRESCO_PORT | Solr needs to know how to register itself with Alfresco. The default value is `8080` |
| SOLR_SOLR_HOST | Alfresco needs to know how to call solr. The default value is `solr6` |
| SOLR_SOLR_PORT | Alfresco needs to know how to call solr. The default value is `8983` |
| SOLR_CREATE_ALFRESCO_DEFAULTS | Create the default alfresco and archive cores. The default value is `alfresco,archive` |
| SOLR_OPTS | Options to pass when starting the Java process. |
| SOLR_HEAP | The Java heap assigned to Solr. The default value is `2g` |
| SOLR_JAVA_MEM | The exact memory settings for Solr. Note that SOLR_HEAP takes precedence over this. The default value is `-Xms2g -Xmx2g` |
| MAX_SOLR_RAM_PERCENTAGE | The percentage of available memory (an integer value) to assign to Solr. Note that SOLR_HEAP and SOLR_JAVA_MEM take precedence over this. The default value is `2` |
| SEARCH_LOG_LEVEL | The root logger level (`ERROR`, `WARN`, `INFO`, `DEBUG` or `TRACE`). The default value is `INFO` |
| ENABLE_SPELLCHECK | Whether spellchecking is enabled or not (`true` or `false`). |
| DISABLE_CASCADE_TRACKING | Whether cascade tracking is enabled or not (`true` or `false`). Disabling cascade tracking will improve performance, but result in some feature loss (such as path queries). |
| ALFRESCO_SECURE_COMMS | Whether communication with the repository is secured (`https` or `none`). See [Alfresco Search Services implementation](https://github.com/Alfresco/InsightEngine/blob/master/search-services/README.md){:target="_blank"} for more details. The default value is `none` |
| SOLR_SSL_KEY_STORE | Path to SSL key store. See [Alfresco Search Services Docker Compose](https://github.com/Alfresco/InsightEngine/blob/master/search-services/README.md#use-alfresco-search-services-docker-image-with-docker-compose){:target="_blank"} steps for more details. |
| SOLR_SSL_KEY_STORE_PASSWORD | Password for key store. See [Alfresco Search Services Docker Compose](https://github.com/Alfresco/InsightEngine/blob/master/search-services/README.md#use-alfresco-search-services-docker-image-with-docker-compose){:target="_blank"} steps for more details. |
| SOLR_SSL_KEY_STORE_TYPE | Key store type. See [Alfresco Search Services Docker Compose](https://github.com/Alfresco/InsightEngine/blob/master/search-services/README.md#use-alfresco-search-services-docker-image-with-docker-compose){:target="_blank"} steps for more details. The default value is `JCEKS` |
| SOLR_SSL_TRUST_STORE | Path to SSL trust store. See [Alfresco Search Services Docker Compose](https://github.com/Alfresco/InsightEngine/blob/master/search-services/README.md#use-alfresco-search-services-docker-image-with-docker-compose){:target="_blank"} steps for more details. |
| SOLR_SSL_TRUST_STORE_PASSWORD | Password for trust store. See [Alfresco Search Services Docker Compose](https://github.com/Alfresco/InsightEngine/blob/master/search-services/README.md#use-alfresco-search-services-docker-image-with-docker-compose){:target="_blank"} steps for more details. |
| SOLR_SSL_TRUST_STORE_TYPE | Trust store type. See [Alfresco Search Services Docker Compose](https://github.com/Alfresco/InsightEngine/blob/master/search-services/README.md#use-alfresco-search-services-docker-image-with-docker-compose){:target="_blank"} steps for more details. The default value is `JCEKS` |
| SOLR_SSL_NEED_CLIENT_AUTH | This variable is used to configure SSL (`true` or `false`). See [Alfresco Search Services Docker Compose](https://github.com/Alfresco/InsightEngine/blob/master/search-services/README.md#use-alfresco-search-services-docker-image-with-docker-compose){:target="_blank"} steps for more details. |
| SOLR_SSL_WANT_CLIENT_AUTH | This variable is used to configure SSL (`true` or `false`). See [Alfresco Search Services Docker Compose](https://github.com/Alfresco/InsightEngine/blob/master/search-services/README.md#use-alfresco-search-services-docker-image-with-docker-compose){:target="_blank"} steps for more details. |

### Alfresco Transform Router (transform-router)

| Property | Description |
| -------- | ----------- |
| JAVA_OPTS | A set of properties that are picked up by the JVM inside the container. |
| ACTIVEMQ_URL | ActiveMQ URL (in this case, the name of the container is used). The default value is `nio://activemq:61616` |
| ACTIVEMQ_USER | ActiveMQ user. The default value is `admin` |
| ACTIVEMQ_PASSWORD | ActiveMQ password. The default value is `admin` |
| TRANSFORM_REQUEST_QUEUE | The default value is `org.alfresco.transform.t-request.acs` |
| TRANSFORM_REPLY_QUEUE | The default value is `org.alfresco.transform.t-reply.acs` |
| TRANSFORM_ENGINE_REPLY_QUEUE | The default value is `org.alfresco.transform.engine.t-reply.acs` |
| JMS_LISTENER_CONCURRENCY | The default value is `1-10` |
| IMAGEMAGICK_URL | URL for the ImageMagick T-Engine. |
| PDF_RENDERER_URL | URL for the PDF Renderer T-Engine. |
| LIBREOFFICE_URL | URL for the LibreOffice T-Engine. |
| TIKA_URL | URL for the Tika T-Engine. |
| MISC_URL | URL for the Miscellaneous T-Engine. |
| CORE_AIO_URL | URL for the All-In-One T-Engine. |
| FILE_STORE_URL | URL for the Shared File Store. |
| IMAGEMAGICK_QUEUE | Name of the queue used by the ImageMagick T-Engine. The default value is `org.alfresco.transform.engine.imagemagick.acs` |
| PDF_RENDERER_QUEUE | Name of the queue used by the PDF Renderer T-Engine. The default value is `org.alfresco.transform.engine.alfresco-pdf-renderer.acs` |
| LIBREOFFICE_QUEUE | Name of the queue used by the LibreOffice T-Engine. The default value is `org.alfresco.transform.engine.libreoffice.acs` |
| TIKA_QUEUE | Name of the queue used by the Tika T-Engine. The default value is `org.alfresco.transform.engine.tika.acs` |
| MISC_QUEUE | Name of the queue used by the Miscellaneous T-Engine. The default value is `org.alfresco.transform.engine.misc.acs` |
| CORE_AIO_QUEUE | Name of the queue used by the All-In-One Core T-Engine. The default value is `org.alfresco.transform.engine.aio.acs` |
| TRANSFORMER_ENGINE_PROTOCOL | This value can be one of the following (http, jms). The default value is `jms` |
| TRANSFORMER_ROUTES_FILE_LOCATION | The default value is `transformer-pipelines.json` |
| MAX_TRANSFORM_RETRIES | The default value is `3` |
| INITIAL_RETRY_TIMEOUT | The default value is `10000` |
| INCREASE_RETRY_TIMEOUT | The default value is `10000` |
| MAX_IN_MEMORY_SIZE |  Double default limit to 512KiB. The default value is `524288` |
| HOSTNAME | The default value is `t-router` |

### Alfresco Transform Core AIO (transform-core-aio)

| Property | Description |
| -------- | ----------- |
| JAVA_OPTS | A set of properties that are picked up by the JVM inside the container. |
| ACTIVEMQ_URL | ActiveMQ URL (in this case, the name of the container is used). |
| FILE_STORE_URL | Shared file store URL (in this case, the name of the container is used). |
| TRANSFORM_ENGINE_REQUEST_QUEUE | Name of the queue. The default value is `org.alfresco.transform.engine.aio.acs` |
| PDFRENDERER_EXE | Location of the PDF Renderer binary. The default value is `/usr/bin/alfresco-pdf-renderer` |
| LIBREOFFICE_HOME | Location of the LibreOffice installation. The default value is `/opt/libreoffice7.2` |
| IMAGEMAGICK_ROOT | Location of the ImageMagick installation. The default value is `/usr/lib64/ImageMagick-7.0.10` |
| IMAGEMAGICK_DYN | Location of the ImageMagick dynamic libraries. The default value is `/usr/lib64/ImageMagick-7.0.10/lib` |
| IMAGEMAGICK_EXE | Location of the ImageMagick binary. The default value is `/usr/bin/convert` |
| IMAGEMAGICK_CODERS | Location of the ImageMagick coders folder |
| IMAGEMAGICK_CONFIG | Location of the ImageMagick configuration folder |

### Alfresco Shared File Store (shared-file-store)

| Property | Description |
| -------- | ----------- |
| JAVA_OPTS | A set of properties that are picked up by the JVM inside the container. |
| fileStorePath | Shared File Store content storing path. The default value is `/tmp/Alfresco` |
| scheduler.contract.path | Cleanup Scheduler contract path. The default value is `/tmp/scheduler.json` |
| scheduler.content.age.millis | Content retention period. The default value is `86400000` |
| scheduler.cleanup.interval | Cleanup Scheduler interval. The default value is `86400000` |

### Alfresco Sync Service (sync-service)

| Property | Description |
| -------- | ----------- |
| JAVA_OPTS | A set of properties that are picked up by the JVM inside the container. Any Sync Service property can be passed to the container using the following format `-Dproperty=value` (for example, `-Dsql.db.username=alfresco`). <br><br>For a complete list of properties that can be passed through `JAVA_OPTS` environment variable, check Alfresco Sync Service [configuration]({% link sync-service/latest/config/index.md %}) |

### Alfresco Proxy (proxy)

| Property | Description |
|--------- | ----------- |
| ADW_URL | Digital Workspace URL inside network. The default value is `http://digital-workspace` |
| CONTROL_CENTER_URL | Control Center URL inside network. The default value is `http://control-center` |
| REPO_URL | Repository URL inside network. The default value is `http://alfresco:8080` |
| SHARE_URL | Share URL inside network. The default value is `http://share:8080` |
| SYNCSERVICE_URL | Sync service URL inside network. The default value is `http://sync-service:9090` |
| ACCESS_LOG | Sets the `access_log` value. Set to `off` to switch off logging. |
| USE_SSL | Enables ssl use if set to `true`. The default value is `false` |
| DOMAIN | Set domain value for ssl certificate. |

## Customize

To customize the Docker Compose deployment, for example applying AMPs, we recommend following the best practice of creating your own custom Docker image(s). The [Customization guidelines]({% link content-services/latest/install/containers/customize.md %}) walks you through this process.

## Cleanup

To bring the system down and cleanup the containers run the following command:

```bash
docker-compose down
```

## Troubleshooting

1. If you have issues running `docker-compose up` after deleting a previous Docker Compose cluster, try replacing step 5 in the initial Docker Compose instructions with:

    ```bash
    docker-compose down && docker-compose build --no-cache && docker-compose up
    ```

2. If you're having issues running `docker-compose up` on Windows environments due to unavailable or reserved ports, and get errors such as: `bind: An attempt was made to access a socket in a way forbidden by its access permissions` which means that the Windows NAT (WinNAT) service has reserved the port range that Docker Compose is trying to use.

    To remedy this issue, run the following in a terminal:

    ```bash
    net stop winnat
    docker-compose up
    net start winnat
    ```

3. Stop the session by using `CONTROL+C`.

4. Remove the containers (using the `--rmi all` option):

    ```bash
    docker-compose down --rmi all
    ```

5. Try allocating more memory resources to Docker, as advised in `docker-compose.yml`.

    For example, in Docker, change the memory setting in **Preferences** (Mac) or **Settings** (Windows) > **Resources** > **Advanced** > **Memory** to at least 13 GB. If you make changes, click **Apply & Restart** and wait for the process to finish before continuing.

    Go back to step 5 in the initial Docker Compose instructions to start the deployment again.

When using *Linux* as Docker host, all the memory in the computer is available to Docker Compose. So no additional actions are required.

When using [Docker with Windows Subsystem for Linux (WSL) 2 Backend](https://docs.docker.com/desktop/windows/wsl/){:target="_blank"} in *Windows*, use the `.wslconfig` file to increase the `memory` available for Docker Compose.

> **Note:** In order to deploy onto Docker Desktop you need to allocate at least 13 GB (preferably 16 GB) to the
> Docker Engine on the **Resources** tab in Docker Desktop's preferences pane as shown in the screenshot below. This
> is required because insufficient memory will cause containers to exit without warning.

![Docker Desktop Resources]({% link content-services/images/docker-desktop-resources.png %})

## Reference

The table below shows the location of the publicly available `Dockerfile` for the containers used in the Community deployment.

| Container | Dockerfile location |
| --------- | --------------------|
| alfresco | [https://github.com/Alfresco/acs-packaging/blob/master/docker-alfresco/Dockerfile](https://github.com/Alfresco/acs-packaging/blob/master/docker-alfresco/Dockerfile){:target="_blank"} |
| share | [https://github.com/Alfresco/share/blob/master/packaging/docker/Dockerfile](https://github.com/Alfresco/share/blob/master/packaging/docker/Dockerfile){:target="_blank"} |
| content-app | [https://github.com/Alfresco/alfresco-content-app/blob/master/Dockerfile](https://github.com/Alfresco/alfresco-content-app/blob/master/Dockerfile){:target="_blank"} |
| solr6 | [https://github.com/Alfresco/SearchServices/blob/master/search-services/packaging/src/docker/Dockerfile](https://github.com/Alfresco/SearchServices/blob/master/search-services/packaging/src/docker/Dockerfile){:target="_blank"}  |
| <nobr>transform-core-aio</nobr> | [https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-core-aio/alfresco-transform-core-aio-boot/Dockerfile](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-core-aio/alfresco-transform-core-aio-boot/Dockerfile){:target="_blank"} |
| activemq | [https://github.com/Alfresco/alfresco-docker-activemq/blob/master/Dockerfile](https://github.com/Alfresco/alfresco-docker-activemq/blob/master/Dockerfile){:target="_blank"} |
| proxy | [https://github.com/Alfresco/acs-ingress/blob/master/Dockerfile](https://github.com/Alfresco/acs-ingress/blob/master/Dockerfile){:target="_blank"} |
