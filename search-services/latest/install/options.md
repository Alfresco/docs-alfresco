---
title: Installation options
---

You can install Search Services in two different ways using the distribution zip, the first is with mutual TLS, and the second is without mutual TLS (HTTP with secret word in request header).

> **Important:** From version 2.0, you cannot install Search Services without mutual TLS (plain HTTP) because it is no longer supported.

## Install with mutual TLS

Use this information to install Search Services on the same machine as Alfresco Content Services with mutual TLS.

Mutual TLS is used for authentication between the Repository and Search Services.

This task assumes you have:

* Installed Alfresco Content Services 6.2 or above, see [Supported platforms]({% link search-services/latest/support/index.md %}).
* Set the following properties in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

    ```text
    index.subsystem.name=solr6
    solr.secureComms=https
    solr.port=8983
    ```

> **Important:** Alfresco strongly recommends you use firewalls and other infrastructure means to ensure the Search Services server is not accessible from anything other than trusted hosts and/or users, and only on the ports needed for Search Services.

1. Download `alfresco-search-services-2.0.x.zip` from the [Hyland Community](https://community.hyland.com/){:target="_blank"} if you are an Alfresco Content Services Enterprise user, or from [Alfresco Community Edition](https://www.alfresco.com/products/community/download){:target="_blank"} if you are an Alfresco Content Services Community user.

2. Extract the Search Services distribution.

    By default, the contents of `alfresco-search-services-2.0.x.zip` are decompressed in a root folder as `/alfresco-search-services`. See [Search Services directory structure]({% link search-services/latest/config/index.md %}#search-services-directory-structure) for more details.

3. If you use several languages across your organization, you **must** enable cross-language search support in all fields. To do this update the `alfresco-search-services/solrhome/conf/shared.properties` file:

    ```bash
    alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
    alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
    alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
    ```

4. (Optional) Suggestion is disabled by default. To enable suggestion update the `alfresco-search-services/solrhome/conf/shared.properties` file.

    ```bash
    alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
    alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title
    alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description
    alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
    ```

    > **Note:** The spell check functionality does not work with Search Services when suggestion is enabled.

5. To secure access to Search Services, you must create a new set of keystores and keys.

    1. Generate secure keys specific to your Alfresco installation. For more information, see [Secure keys]({% link search-services/latest/config/keys.md %}#generate-secure-keys-for-ssl-communication).

    2. Create a new keystore directory at `alfresco-search-services/solrhome`.

    3. In the production environment, copy your custom keystore and truststore to the `alfresco-search-services/solrhome/keystore` directory.

    4. Update the SSL-related system properties by replacing `<SOLR_HOME> with alfresco-search-services/solrhome`, and set your keystore and truststore passwords.

        (Windows) update the `alfresco-search-services/solr.in.cmd` file:

        ```bash
        set SOLR_SSL_KEY_STORE=<SOLR_HOME>/keystore/ssl-repo-client.keystore
        set SOLR_SSL_KEY_STORE_PASSWORD=keystore
        set SOLR_SSL_KEY_STORE_TYPE=JCEKS
        set SOLR_SSL_TRUST_STORE=<SOLR_HOME>/keystore/ssl-repo-client.truststore
        set SOLR_SSL_TRUST_STORE_PASSWORD=truststore
        set SOLR_SSL_TRUST_STORE_TYPE=JCEKS
        set SOLR_SSL_NEED_CLIENT_AUTH=true
        set SOLR_SSL_WANT_CLIENT_AUTH=false
        ```

        (Linux) update the `alfresco-search-services/solr.in.sh` file:

        ```bash
        SOLR_SSL_KEY_STORE=<SOLR_HOME>/keystore/ssl-repo-client.keystore
        SOLR_SSL_KEY_STORE_PASSWORD=keystore
        SOLR_SSL_KEY_STORE_TYPE=JCEKS
        SOLR_SSL_TRUST_STORE=<SOLR_HOME>/keystore/ssl-repo-client.truststore
        SOLR_SSL_TRUST_STORE_PASSWORD=truststore
        SOLR_SSL_TRUST_STORE_TYPE=JCEKS
        SOLR_SSL_NEED_CLIENT_AUTH=true
        SOLR_SSL_WANT_CLIENT_AUTH=false
        ```

    5. Set the `SOLR_PORT` environment variable:

        (Windows) update the `alfresco-search-services/solr.in.cmd` file:

        ```bash
        set SOLR_PORT=8983
        ```

        (Linux) update the `alfresco-search-services/solr.in.sh` file:

        ```bash
        SOLR_PORT=8983
        ```

6. (Optional) If you want to install Search Services on a separate machine, set the `SOLR_SOLR_HOST` and `SOLR_ALFRESCO_HOST` environment variables before starting Search Services, for more see [Configuring Search Services]({% link search-services/latest/config/index.md %}#search-services-externalized-configuration).

    (Windows) update the `alfresco-search-services/solr.in.cmd` file:

    ```bash
    set SOLR_SOLR_HOST=localhost
    ```

    ```bash
    set SOLR_ALFRESCO_HOST=localhost
    ```

    (Linux) update the `alfresco-search-services/solr.in.sh` file:

    ```bash
    SOLR_SOLR_HOST=localhost
    ```

    ```bash
    SOLR_ALFRESCO_HOST=localhost
    ```

7. To configure the Solr6 cores, set the following:

    * Before creating the alfresco and archive cores:
        * Set `alfresco.secureComms=https` in `alfresco-search-services/solrhome/templates/rerank/conf/solrcore.properties`.
        * Copy the custom keystores to the `alfresco-search-services/solrhome/keystore` directory.

            ```bash
            ssl-repo-client.keystore
            ssl-repo-client.truststore
            ```

    * If the alfresco and archive cores already exist, ensure that `alfresco.secureComms` is set to `https` for both the cores. For example:
        * `alfresco-search-services/solrhome/alfresco/conf/solrcore.properties`
        * `alfresco-search-services/solrhome/archive/conf/solrcore.properties`
8. For running a single instance of Search Services use the following commands:

    > **Note:** You should run this application as a dedicated user. For example, you can create a Solr user.

    ```bash
    cd alfresco-search-services
    ./solr/bin/solr start -a
    "-Dcreate.alfresco.defaults=alfresco,archive
    -Dsolr.ssl.checkPeerName=false
    -Dsolr.allow.unsafe.resourceloading=true
    -Dssl-keystore.password=keystore
    -Dssl-keystore.aliases=ssl-alfresco-ca,ssl-repo-client
    -Dssl-keystore.ssl-alfresco-ca.password=keystore
    -Dssl-keystore.ssl-repo-client.password=keystore
    -Dssl-truststore.password=truststore
    -Dssl-truststore.aliases=ssl-alfresco-ca,ssl-repo,ssl-repo-client
    -Dssl-truststore.ssl-alfresco-ca.password=truststore
    -Dssl-truststore.ssl-repo.password=truststore
    -Dssl-truststore.ssl-repo-client.password=truststore" -f
    ```

    > **Note:** The `-Dcreate.alfresco.defaults=alfresco,archive` command automatically creates the `alfresco` and `archive` cores. Therefore, you should only start Search Services with `-Dcreate.alfresco.defaults=alfresco,archive` the first time you run Search Services. In addition, to ensure that Search Services connects using the IPv6 protocol instead of IPv4, add `-Djava.net.preferIPv6Addresses=true` to the startup parameters.

    The default port used is 8983.

    The command line parameter, `-a` passes additional JVM parameters, for example, system properties using `-D`.

    Once Search Services is up and running, you should see a message like:

    ```text
    Waiting up to 180 seconds to see Solr running on port 8983 []  
    Started Solr server on port 8983 (pid=24289). Happy searching!
    ```

    To stop all instances of Search Services, use:

    ```bash
    ./solr/bin/solr stop
    ```

    The logs are stored in the `alfresco-search-services/logs/solr.log` file, by default. This can be configured in `solr.in.sh` (for Linux) or `solr.in.cmd` (for Windows) using `SOLR_LOGS_DIR`.

    You have successfully created an `alfresco` core and an `archive` core. To verify, in a browser, navigate to the Solr URL, [https://localhost:8983/solr](https://localhost:8983/solr).

    > **Note:** You need to install the browser.p12 certificate in your browser before accessing this URL.

    In the Solr Admin UI, select the core selector drop-down list and verify that both the `alfresco` and `archive` cores are present.

    Allow a few minutes for Search Services to start indexing.

    > **Note:** The Admin Console is only available when you are using Alfresco Content Services Enterprise.

## Install without mutual TLS (HTTP with secret word in request header)

Use this information to install Search Services on the same machine as Alfresco Content Services without mutual TLS, using HTTP with a secret word in the request header. This means communication between the Repository and Search Services is protected by a shared secret that is passed in a configurable Request HTTP Header.

**Important:** This installation method is only supported when using Content Services 7.2 and above.

This task assumes you have:

* Installed Alfresco Content Services 7.2 or above.
* Set the following properties in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

    ```text
    index.subsystem.name=solr6
    solr.secureComms=secret
    solr.port=8983
    solr.sharedSecret=password
    ```

> **Important:** To ensure the security of your system specify your own custom secret word for the `solr.sharedSecret` property, than the one provided in the example.

1. Download `alfresco-search-services-2.0.x.zip` from the [Hyland Community](https://community.hyland.com/){:target="_blank"} if you are an Alfresco Content Services Enterprise user, or from [Alfresco Community Edition](https://www.alfresco.com/products/community/download){:target="_blank"} if you are an Alfresco Content Services Community user.

2. Extract the Search Services distribution.

    By default, the contents of `alfresco-search-services-2.0.x.zip` are decompressed in a root folder as `/alfresco-search-services`. See [Search Services directory structure]({% link search-services/latest/config/index.md %}#search-and-search-services-directory-structure) for more details.

3. Configure HTTP. Pass `alfresco.secureComms.secret` as a system property (using `-D` when starting Solr) by adding the startup parameters in step **7**:

       ```bash
        -Dalfresco.secureComms=secret
        -Dalfresco.secureComms.secret=password
        ```

        This ensures that the Solr cores are created in plain HTTP mode with the shared secret communication method. The property `alfresco.secureComms.secret` includes the same word used in the `solr.sharedSecret` property in the Repository configuration.

4. If you use several languages across your organization, you **must** enable cross-language search support in all fields. To do this add the following to the `alfresco-search-services/solrhome/conf/shared.properties` file:

    ```bash
    alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
    alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
    alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
    ```

5. (Optional) Suggestion is disabled by default. To enable suggestion update the `alfresco-search-services/solrhome/conf/shared.properties` file.

    ```bash
    alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
    alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title
    alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description
    alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
    ```

    > **Note:** The spell check functionality works with Search Services when suggestion is enabled.

6. (Optional) If you want to install Search Services on a separate machine, set the `SOLR_SOLR_HOST` and `SOLR_ALFRESCO_HOST` environment variables before starting Search Services, for more see [Configuring Search Services]({% link search-services/latest/config/index.md %}#search-services-externalized-configuration).

    (Windows) update the `alfresco-search-services`/`solr.in.cmd` file:

    ```bash
    set SOLR_SOLR_HOST=localhost
    ```

    ```bash
    set SOLR_ALFRESCO_HOST=localhost
    ```

    (Linux) update the alfresco-search-services/solr.in.sh file:

    ```bash
    SOLR_SOLR_HOST=localhost
    ```

    ```bash
    SOLR_ALFRESCO_HOST=localhost
    ```

7. To start Search Services with all the default settings, use the following command:

    ```bash
    ./solr/bin/solr start -a "-Dcreate.alfresco.defaults=alfresco,archive"
    ```

    The command line parameter, `-a` passes additional JVM parameters, for example, system properties using `-D`.

    > **Note:** The `-Dcreate.alfresco.defaults=alfresco,archive` command automatically creates the `alfresco` and `archive` cores. Therefore, you should only start Search Services with `-Dcreate.alfresco.defaults=alfresco,archive` the first time you run Search Services. In addition, you should run this application as a dedicated user. For example, you can create a Solr user. Finally, to ensure that Search Services connects using the IPv6 protocol instead of IPv4, add `-Djava.net.preferIPv6Addresses=true` to the startup parameters.

    Once Search Services is up and running, you should see a message similar to the following:

    ```bash
    Waiting up to 180 seconds to see Solr running on port 8983 []
    Started Solr server on port 8983 (pid=24289). Happy searching!
    ```

    To stop the currently running Search Services instance, use:

    ```bash
    ./solr/bin/solr stop
    ```

    The logs are stored in the `alfresco-search-services/logs/solr.log` file, by default. This can be configured in `solr.in.sh` (for Linux) or `solr.in.cmd` (for Windows) using `SOLR_LOGS_DIR`.

    You have successfully created an `alfresco` core and an `archive` core. To verify, in a browser, navigate to the Solr URL, [http://localhost:8983/solr](http://localhost:8983/solr). In the Solr Admin UI, select the core selector drop-down list and verify that both the `alfresco` and `archive` cores are present.

    Allow a few minutes for Search Services to start indexing.

8. Go to **Admin Console > Repository Services > Search Service** and verify that:

    1. You see the Solr 6 option in the **Search Service In Use** list.

    2. Under **Main (Workspace) Store Tracking Status**, the **Approx Transactions to Index** is **0**.
    
