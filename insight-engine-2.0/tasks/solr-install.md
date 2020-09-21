# Installing and configuring Search and Insight Engine with mutual TLS using the distribution zip

Use this information to install Alfresco Search and Insight Engine on the same machine as Alfresco Content Services with mutual TLS.

Mutual TLS is used for authentication between the Repository and Alfresco Search and Insight Engine.

This task assumes you have:

-   Installed Alfresco Content Services 6.2 or above, with clustering enabled, see [Supported Platforms and Languages](https://www.alfresco.com/services/subscription/supported-platforms).
-   Set the following properties in the <TOMCAT\_HOME\>/shared/classes/alfresco-global.properties file:

    ```
    index.subsystem.name=solr6
    solr.secureComms=https
    solr.port=8983
    ```


**Important:** Alfresco strongly recommends you use firewalls and other infrastructure means to ensure the Alfresco Search and Insight Engine server is not accessible from anything other than trusted hosts and/or users, and only on the ports needed for Alfresco Search and Insight Engine.

1.  Browse to the [Alfresco Support Portal](http://support.alfresco.com) and download alfresco-insight-engine-2.0.x.zip.

2.  Extract the Alfresco Search and Insight Engine distribution.

    By default, the contents of alfresco-insight-engine-2.0.x.zip are decompressed in a root folder as /alfresco-insight-engine. See [Search and Insight Engine directory structure](../concepts/solr-directories.md) for more details.

3.  If you use several languages across your organization, you **must** enable cross-language search support in all fields. To do this update the alfresco-insight-engine/solrhome/conf/shared.properties file:

    ```
    alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
    alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
    alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext 
    ```

4.  \(Optional\) Suggestion is disabled by default. To enable suggestion update the alfresco-insight-engine/solrhome/conf/shared.properties file.

    ```
    alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
    alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title 
    alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description 
    alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
    ```

    **Note:** The spell check functionality does not work with Alfresco Search and Insight Engine when suggestion is enabled.

5.  To secure access to Alfresco Search and Insight Engine, you must create a new set of keystores and keys.

    1.  Generate secure keys specific to your Alfresco installation. For more information, see [Generating secure keys overview](../concepts/generate-keys-overview.md).

    2.  Create a new keystore directory at alfresco-insight-engine/solrhome.

    3.  In the production environment, copy your custom keystore and truststore to the alfresco-insight-engine/solrhome/keystore directory.

    4.  Update the SSL-related system properties by replacing <SOLR\_HOME\> with alfresco-insight-engine/solrhome, and set your keystore and truststore passwords.

        \(Windows\) update the alfresco-insight-engine/solr.in.cmd file:

        ```
        set SOLR_SSL_KEY_STORE=<SOLR_HOME>/keystore/ssl-repo-client.keystore
        set SOLR_SSL_KEY_STORE_PASSWORD=keystore
        set SOLR_SSL_KEY_STORE_TYPE=JCEKS
        set SOLR_SSL_TRUST_STORE=<SOLR_HOME>/keystore/ssl-repo-client.truststore
        set SOLR_SSL_TRUST_STORE_PASSWORD=truststore
        set SOLR_SSL_TRUST_STORE_TYPE=JCEKS
        set SOLR_SSL_NEED_CLIENT_AUTH=true
        set SOLR_SSL_WANT_CLIENT_AUTH=false
        ```

        \(Linux\) update the alfresco-insight-engine/solr.in.sh file:

        ```
        SOLR_SSL_KEY_STORE=<SOLR_HOME>/keystore/ssl-repo-client.keystore
        SOLR_SSL_KEY_STORE_PASSWORD=keystore
        SOLR_SSL_KEY_STORE_TYPE=JCEKS
        SOLR_SSL_TRUST_STORE=<SOLR_HOME>/keystore/ssl-repo-client.truststore
        SOLR_SSL_TRUST_STORE_PASSWORD=truststore
        SOLR_SSL_TRUST_STORE_TYPE=JCEKS
        SOLR_SSL_NEED_CLIENT_AUTH=true
        SOLR_SSL_WANT_CLIENT_AUTH=false
        ```

    5.  Set the `SOLR_PORT` environment variable:

        \(Windows\) update the alfresco-insight-engine/solr.in.cmd file:

        ```
        set SOLR_PORT=8983
        ```

        \(Linux\) update the alfresco-insight-engine/solr.in.sh file:

        ```
        SOLR_PORT=8983
        ```

6.  \(Optional\) If you want to install Alfresco Search and Insight Engine on a separate machine, set the `SOLR_SOLR_HOST` and `SOLR_ALFRESCO_HOST` environment variables before starting Alfresco Search and Insight Engine, for more see [Search and Insight Engine externalized configuration](../concepts/external-properties-solr.md).

    \(Windows\) update the alfresco-insight-engine/solr.in.cmd file:

    ```
    set SOLR_SOLR_HOST=localhost
    ```

    ```
    set SOLR_ALFRESCO_HOST=localhost
    ```

    \(Linux\) update the alfresco-insight-engine/solr.in.sh file:

    ```
    SOLR_SOLR_HOST=localhost
    ```

    ```
    SOLR_ALFRESCO_HOST=localhost
    ```

7.  To configure the Solr6 cores, set the following:

    -   Before creating the alfresco and archive cores:
        -   Set `alfresco.secureComms=https` in alfresco-insight-engine/solrhome/templates/rerank/conf/solrcore.properties.
        -   Copy the custom keystores to the alfresco-insight-engine/solrhome/keystore directory.

            ```
            ssl-repo-client.keystore
            ssl-repo-client.truststore
            ```

    -   If the alfresco and archive cores already exist, ensure that `alfresco.secureComms` is set to `https` for both the cores. For example:
        -   alfresco-insight-engine/solrhome/alfresco/conf/solrcore.properties
        -   alfresco-insight-engine/solrhome/archive/conf/solrcore.properties
8.  For running a single instance of Alfresco Search and Insight Engine \(i.e. not sharded\), use the following commands:

    ```
    cd alfresco-insight-engine
    ./solr/bin/solr start -a 
    "-Dcreate.alfresco.defaults=alfresco,archive \
    -Dsolr.ssl.checkPeerName=false \
    -Dsolr.allow.unsafe.resourceloading=true \
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

    **Note:** The `-Dcreate.alfresco.defaults=alfresco,archive` command automatically creates the `alfresco` and `archive` cores. Therefore, you should only start Alfresco Search and Insight Engine with `-Dcreate.alfresco.defaults=alfresco,archive` the first time you run Alfresco Search and Insight Engine.

    **Note:** To ensure that Alfresco Search and Insight Engine connects using the IPv6 protocol instead of IPv4, add `-Djava.net.preferIPv6Addresses=true` to the startup parameters.

    **Note:** You should run this application as a dedicated user. For example, you can create a Solr user.

    The default port used is 8983.

    The command line parameter, `-a` passes additional JVM parameters, for example, system properties using `-D`.

    Once Alfresco Search and Insight Engine is up and running, you should see a message like:

    ```
    Waiting up to 180 seconds to see Solr running on port 8983 [\]  
    Started Solr server on port 8983 (pid=24289). Happy searching!
    ```

    To stop all instances of Alfresco Search and Insight Engine, use:

    ```
    ./solr/bin/solr stop
    ```

    The logs are stored in the alfresco-insight-engine/logs/solr.log file, by default. This can be configured in solr.in.sh \(for Linux\) or solr.in.cmd \(for Windows\) using `SOLR_LOGS_DIR`.

    You have successfully created an `alfresco` core and an `archive` core. To verify, in a browser, navigate to the Solr URL, [https://localhost:8983/solr](https://localhost:8983/solr).

    **Note:** You need to install the browser.p12 certificate in your browser before accessing this URL.

    In the Solr Admin UI, select the core selector drop-down list and verify that both the `alfresco` and `archive` cores are present.

    Allow a few minutes for Alfresco Search and Insight Engine to start indexing.


If you are not using sharded Alfresco Search and Insight Engine:

1.  Access the **Admin Console \> Search Service Sharding** page.
2.  Deselect **Dynamic Shard Instance Registration**.
3.  Select **Purge at Startup**.

**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

