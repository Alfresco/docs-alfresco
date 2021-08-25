---
title: Installation options
---

There are several options for installing Search and Insight Engine:

* Using the distribution zip (with or without mutual TLS)
* Using Docker Compose

## Install with mutual TLS (zip)

Use this information to install Search and Insight Engine on the same machine as Alfresco Content Services with mutual TLS.

Mutual TLS is used for authentication between the Repository and Search and Insight Engine.

This task assumes you have:

* Installed Alfresco Content Services 6.1 or below, with clustering enabled
* Set the following properties in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

    ```text
    index.subsystem.name=solr6
    solr.secureComms=https
    solr.port.ssl=8983
    ```

> **Important:** Alfresco strongly recommends you use firewalls and other infrastructure means to ensure the Search and Insight Engine server is not accessible from anything other than trusted hosts and/or users, and only on the ports needed for Search and Insight Engine.

1. Browse to the [Alfresco Support Portal](https://support.alfresco.com/){:target="_blank"} and download `alfresco-insight-engine-distribution-1.1.x.zip`.

2. Extract the Search and Insight Engine distribution.

    By default, the contents of `alfresco-insight-engine-distribution-1.1.x.zip` are decompressed in a root folder as `/alfresco-insight-engine`.

3. If you use several languages across your organization, you **must** enable cross-language search support in all fields. To do this update the `alfresco-insight-engine/solrhome/conf/shared.properties` file:

    ```bash
    alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
    alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
    alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
    ```

4. (Optional) Suggestion is disabled by default. To enable suggestion update the `alfresco-insight-engine/solrhome/conf/shared.properties` file.

    ```bash
    alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
    alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title
    alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description
    alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
    ```

    > **Note:** The spell check functionality does not work with Search and Insight Engine when suggestion is enabled.

5. To secure access to Search and Insight Engine, you must create a new set of keystores and keys.

    1. Generate secure keys specific to your Alfresco installation. For more information, see [Secure keys]({% link insight-engine/1.1/config/keys.md %}#generate-secure-keys-for-ssl-communication).

    2. Create a new keystore directory at `alfresco-insight-engine/solrhome`.

    3. In the production environment, copy your custom keystore and truststore to the `alfresco-insight-engine/solrhome/keystore` directory.

    4. Update the SSL-related system properties by replacing `<SOLR_HOME> with alfresco-insight-engine/solrhome`, and set your keystore and truststore passwords.

        (Windows) update the `alfresco-insight-engine/solr.in.cmd` file:

        ```bash
        set SOLR_SSL_KEY_STORE=<SOLR_HOME>\keystore\ssl.repo.client.keystore
        set SOLR_SSL_KEY_STORE_PASSWORD=password
        set SOLR_SSL_TRUST_STORE=<SOLR_HOME>\keystore\ssl.repo.client.truststore
        set SOLR_SSL_TRUST_STORE_PASSWORD=password
        set SOLR_SSL_NEED_CLIENT_AUTH=true
        set SOLR_SSL_WANT_CLIENT_AUTH=false
        ```

        (Linux) update the `alfresco-insight-engine/solr.in.sh` file:

        ```bash
       SOLR_SSL_KEY_STORE=<SOLR_HOME>/keystore/ssl.repo.client.keystore
       SOLR_SSL_KEY_STORE_PASSWORD=password
       SOLR_SSL_TRUST_STORE=<SOLR_HOME>/keystore/ssl.repo.client.truststore
       SOLR_SSL_TRUST_STORE_PASSWORD=password 
       SOLR_SSL_NEED_CLIENT_AUTH=true 
       SOLR_SSL_WANT_CLIENT_AUTH=false
       ```

    5. Set the `SOLR_PORT` environment variable:

        (Windows) update the `alfresco-insight-engine/solr.in.cmd` file:

        ```bash
        set SOLR_PORT=8983
        ```

        (Linux) update the `alfresco-insight-engine/solr.in.sh` file:

        ```bash
        SOLR_PORT=8983
        ```

6. (Optional) If you want to install Search and Insight Engine on a separate machine, set the `SOLR_SOLR_HOST` and `SOLR_ALFRESCO_HOST` environment variables before starting Search and Insight Engine, for more see [Configuring Search and Insight Engine]({% link insight-engine/1.1/config/index.md %}#search-and-insight-engine-externalized-configuration).

    (Windows) update the `alfresco-insight-engine/solr.in.cmd` file:

    ```bash
    set SOLR_SOLR_HOST=localhost
    ```

    ```bash
    set SOLR_ALFRESCO_HOST=localhost
    ```

    (Linux) update the `alfresco-insight-engine/solr.in.sh` file:

    ```bash
    SOLR_SOLR_HOST=localhost
    ```

    ```bash
    SOLR_ALFRESCO_HOST=localhost
    ```

7. To configure the Solr6 cores, set the following:

    * Before creating the alfresco and archive cores:
        * Set `alfresco.secureComms=https` in `alfresco-insight-engine/solrhome/templates/rerank/conf/solrcore.properties`.
        * Copy the custom keystores to the `alfresco-insight-engine/solrhome/keystore` directory.

            ```bash
            ssl-repo-client.keystore
            ssl-repo-client.truststore
            ssl-keystore-passwords.properties
            ssl-truststore-passwords.properties
            ```

    * If the alfresco and archive cores already exist, ensure that `alfresco.secureComms` is set to `https` for both the cores. For example:
        * `alfresco-insight-engine/solrhome/alfresco/conf/solrcore.properties`
        * `alfresco-insight-engine/solrhome/archive/conf/solrcore.properties`
8. For running a single instance of Search and Insight Engine (i.e. not sharded), use the following commands:

    > **Note:** You should run this application as a dedicated user. For example, you can create a Solr user.

    ```bash
    cd alfresco-insight-engine
    ./solr/bin/solr start -a "-Djavax.net.ssl.keyStoreType=JCEKS -Djavax.net.ssl.trustStoreType=JCEKS -Dsolr.ssl.checkPeerName=false -Dcreate.alfresco.defaults=alfresco,archive"
    ```

    > **Note:** The `-Dcreate.alfresco.defaults=alfresco,archive` command automatically creates the `alfresco` and `archive` cores. Therefore, you should only start Search and Insight Engine with `-Dcreate.alfresco.defaults=alfresco,archive` the first time you run Search and Insight Engine. In addition, to ensure that Search and Insight Engine connects using the IPv6 protocol instead of IPv4, add `-Djava.net.preferIPv6Addresses=true` to the startup parameters.

    The default port used is 8983.

    The command line parameter, `-a` passes additional JVM parameters, for example, system properties using `-D`.

    Once Search and Insight Engine is up and running, you should see a message like:

    ```text
    Waiting up to 180 seconds to see Solr running on port 8983 []  
    Started Solr server on port 8983 (pid=24289). Happy searching!
    ```

    To stop all instances of Search and Insight Engine, use:

    ```bash
    ./solr/bin/solr stop
    ```

    The logs are stored in the `alfresco-insight-engine/logs/solr.log` file, by default. This can be configured in `solr.in.sh` (for Linux) or `solr.in.cmd` (for Windows) using `SOLR_LOGS_DIR`.

    You have successfully created an `alfresco` core and an `archive` core. To verify, in a browser, navigate to the Solr URL, [https://localhost:8983/solr](https://localhost:8983/solr).

    In the Solr Admin UI, select the core selector drop-down list and verify that both the `alfresco` and `archive` cores are present.

    Allow a few minutes for Search and Insight Engine to start indexing.

If you are not using sharded Search and Insight Engine:

1. Access the **Admin Console > Search Service Sharding** page.
2. Deselect **Dynamic Shard Instance Registration**.
3. Select **Purge at Startup**.

## Install without mutual TLS (zip)

Use this information to install Search and Insight Engine on the same machine as Alfresco Content Services without mutual TLS.

Mutual TLS is used for authentication between the Repository and Search and Insight Engine. Without mutual TLS, internal APIs on both sides will be exposed without any form of authentication, giving full access to the repository data. In such a setup, you need to make sure that external access to these APIs is blocked, for example, with a front-end reverse proxy. See [Adding a reverse proxy in front of Content Services]({% link content-services/6.1/install/zip/tomcat.md %}#adding-a-reverse-proxy-in-front-of-content-services) for more.

This task assumes you have:

* Installed Alfresco Content Services 6.1 or above
* Set the following properties in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

    ```text
    index.subsystem.name=solr6
    solr.secureComms=https
    solr.port.ssl=8983
    ```

> **Important:** Alfresco strongly recommends you use firewalls and other infrastructure means to ensure the Search and Insight Engine server is not accessible from anything other than trusted hosts and/or users, and only on the ports needed for Search and Insight Engine.

1. Browse to the [Alfresco Support Portal](https://support.alfresco.com/){:target="_blank"} and download `alfresco-insight-engine-distribution-1.1.0.zip`.

2. Extract the Search and Insight Engine distribution.

    By default, the contents of `alfresco-insight-engine-distribution-1.1.0.zip` are decompressed in a root folder as `/alfresco-insight-engine`. See [Search and Insight Engine directory structure]({% link insight-engine/1.1/config/index.md %}#search-and-insight-engine-directory-structure) for more details.

3. Configure HTTP.

    1. Open `solrhome/templates/rerank/conf/solrcore.properties`.

    2. Replace `alfresco.secureComms=https` with:

        ```bash
        alfresco.secureComms=none
        ```

        This ensures that the Solr cores are created in plain HTTP mode.

        Alternatively, you can add this configuration in the system properties (using `-D`) when starting Solr. For example, add the following to the startup parameters in step 7.

        ```bash
        -Dalfresco.secureComms=none
        ```

    See [Setting up Solr sharding]({% link insight-engine/1.1/config/sharding/create.md %}#core-templates) for a brief description of the out-of-the-box Solr core templates.

4. If you use several languages across your organization, you **must** enable cross-language search support in all fields. To do this add the following to the `alfresco-insight-engine/solrhome/conf/shared.properties` file:

    ```bash
    alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
    alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
    alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
    ```

5. (Optional) Suggestion is disabled by default. To enable suggestion update the `alfresco-insight-engine/solrhome/conf/shared.properties` file.

    ```bash
    alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
    alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title
    alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description
    alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
    ```

    > **Note:** The spell check functionality works with Search and Insight Engine when suggestion is enabled.

6. (Optional) If you want to install Search and Insight Engine on a separate machine, set the `SOLR_SOLR_HOST` and `SOLR_ALFRESCO_HOST` environment variables before starting Search and Insight Engine, for more see [Configuring Search and Insight Engine]({% link insight-engine/1.1/config/index.md %}#search-and-insight-engine-externalized-configuration).

    (Windows) update the `alfresco-insight-engine`/`solr.in.cmd` file:

    ```bash
    set SOLR_SOLR_HOST=localhost
    ```

    ```bash
    set SOLR_ALFRESCO_HOST=localhost
    ```

    (Linux) update the alfresco-insight-engine/solr.in.sh file:

    ```bash
    SOLR_SOLR_HOST=localhost
    ```

    ```bash
    SOLR_ALFRESCO_HOST=localhost
    ```

7. To start Search and Insight Engine with all the default settings, use the following command:

    > **Note:** You should run this application as a dedicated user. For example, you can create a Solr user.

    ```bash
    ./solr/bin/solr start -a "-Dcreate.alfresco.defaults=alfresco,archive"
    ```

    The command line parameter, `-a` passes additional JVM parameters, for example, system properties using `-D`.

    > **Note:** The `-Dcreate.alfresco.defaults=alfresco,archive` command automatically creates the `alfresco` and `archive` cores. Therefore, you should only start Search and Insight Engine with `-Dcreate.alfresco.defaults=alfresco,archive` the first time you run Search and Insight Engine. In addition, to ensure that Search and Insight Engine connects using the IPv6 protocol instead of IPv4, add `-Djava.net.preferIPv6Addresses=true` to the startup parameters.

    Once Search and Insight Engine is up and running, you should see a message similar to the following:

    ```bash
    Waiting up to 180 seconds to see Solr running on port 8983 []  
    Started Solr server on port 8983 (pid=24289). Happy searching!
    ```

    To stop the currently running Search and Insight Engine instance, use:

    ```bash
    ./solr/bin/solr stop
    ```

    The logs are stored in the `alfresco-insight-engine/logs/solr.log` file, by default. This can be configured in `solr.in.sh` (for Linux) or `solr.in.cmd` (for Windows) using `SOLR_LOGS_DIR`.

    You have successfully created an `alfresco` core and an `archive` core. To verify, in a browser, navigate to the Solr URL, [http://localhost:8983/solr](http://localhost:8983/solr). In the Solr Admin UI, select the core selector drop-down list and verify that both the `alfresco` and `archive` cores are present.

    Allow a few minutes for Search and Insight Engine to start indexing.

8. Go to **Admin Console > Repository Services > Search Service** and verify that:

    1. You see the Solr 6 option in the **Search Service In Use** list.

    2. Under **Main (Workspace) Store Tracking Status**, the **Approx Transactions to Index** is **0**.

## Install with Docker Compose

Use this information to start up Alfresco Content Services 6.1 or below and Search and Insight Engine 1.1 using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.

### Prerequisites

* [Docker](https://docs.docker.com/install/){:target="_blank"}
  * This allows you to run Docker images and Docker Compose on a single computer.

* [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

* Access to [Quay](https://quay.io/){:target="_blank"}
  * Docker requires access to certain images which are stored on Quay. You need to use the correct credentials provided by Alfresco to access these images. Contact [Alfresco Support](mailto:support@alfresco.com){:target="_blank"} to request the credentials.

> **Note:** Make sure the following ports are free on your computer: `5432`, `8080`, `8082`, `8083`. These ports are set in the `docker-compose.yml` file.

1. Download the latest Alfresco Content Services `docker-compose.yml` file by accessing the [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"} page.

2. Save the file in a local folder.

3. Edit the file and change the Solr 6 service. Add a # prefix to Alfresco Search Services so it is commented out.

    ```yaml
        solr6:
            #image: alfresco/alfresco-search-services:1.3.x
            image: quay.io/alfresco/insight-engine:1.1.x
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

    > **Note:** If you want to use the Apache Zeppelin visualization interface with Search and Insight Engine you have to deploy it using Docker Compose along with Alfresco Content Services, you cannot install it manually. See [Building Reports and Dashboards]({% link insight-engine/1.1/using/index.md %}#Install with Docker Compose) for the additional container information you need to add to your `docker-compose.yml` file.

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
    * Try allocating more memory resources. As advised in `docker-compose.yml` set it to at least 16 GB. To adjust the memory, in Docker, go to **Preferences** (or **Settings**) > **Advanced** > **Memory**. Once you have adjusted the memory make sure you restart Docker and wait for the process to finish before continuing.
    * Go back to step 6 and retry the deployment.
8. Open your browser and check everything starts up correctly:

    * Alfresco: `http://localhost:8082/alfresco`
    * Share: `http://localhost:8080/share`
    * Solr: `http://localhost:8083/solr`

        > **Note:** When you access the solr url you will see the version of Search and Insight Engine that is installed.
