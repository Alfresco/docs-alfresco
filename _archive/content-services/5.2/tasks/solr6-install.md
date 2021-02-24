---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
---

# Installing and configuring Solr 6 with SSL enabled

Use this information to install Alfresco Search Services with Solr 6 with SSL enabled.

This task assumes that you are using Alfresco Content Services 5.2.7 with clustering enabled.

1.  Download and unzip the Solr 6 distribution, alfresco-search-services-1.2.x.zip to a preferred location.

2.  To secure access to Alfresco Search Services, you must create a new set of keystores and keys.

    1.  Generate secure keys specific to your Alfresco installation. For more information, see [Generating secure keys for Solr communication](generate-keys-solr4.md).

    2.  Create a new keystore directory at alfresco-search-services/solrhome.

    3.  In the production environment, copy your custom keystore and truststore to the alfresco-search-services/solrhome/keystore directory.

    4.  Update the SSL-related system properties.

        If you are using a Windows-based platform, update the alfresco-search-services/solr.in.cmd file as:

        ```
        set SOLR_SSL_KEY_STORE=<solr>\keystore\ssl.repo.client.keystore
        set SOLR_SSL_KEY_STORE_PASSWORD=kT9X6oe68t
        set SOLR_SSL_TRUST_STORE=<solr>\keystore\ssl.repo.client.truststore
        set SOLR_SSL_TRUST_STORE_PASSWORD=kT9X6oe68t
        set SOLR_SSL_NEED_CLIENT_AUTH=true
        set SOLR_SSL_WANT_CLIENT_AUTH=false
        ```

        If you are using a Linux-based platform, update the alfresco-search-services/solr.in.sh file as:

        ```
        SOLR_SSL_KEY_STORE=<solr>/keystore/ssl.repo.client.keystore
        SOLR_SSL_KEY_STORE_PASSWORD=kT9X6oe68t
        SOLR_SSL_TRUST_STORE=<solr>/keystore/ssl.repo.client.truststore
        SOLR_SSL_TRUST_STORE_PASSWORD=kT9X6oe68t 
        SOLR_SSL_NEED_CLIENT_AUTH=true 
        SOLR_SSL_WANT_CLIENT_AUTH=false
        ```

3.  Update the alfresco-search-services/solrhome/conf/shared.properties file.

    -   If you use several languages across your organization, you **must** enable cross-language search support in all fields, by adding the following:

        ```
        alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
        alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
        alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext 
        ```

4.  \(Optional\) If you want to install Solr 6 on a separate machine, check the following before starting Solr 6:

    1.  Set the values of environment variables, such as `SOLR_SOLR_HOST` and `SOLR_SOLR_PORT`, in the alfresco-search-services/solr.in.sh file \(Linux-based platform\) or alfresco-search-services/solr.in.cmd file \(Windows-based platform\).

    2.  Set the values of environment variables, such as `SOLR_ALFRESCO_HOST` and `SOLR_ALFRESCO_PORT`, in the alfresco-search-services/solr.in.sh file \(Linux-based platform\) or alfresco-search-services/solr.in.cmd file \(Windows-based platform\).

        See [Solr 6 externalized configuration](../concepts/external-properties-solr6.md).

5.  \(Optional\) Update the alfresco-search-services/solrhome/conf/shared.properties file.

    -   Unlike Solr 4, suggestion is disabled by default for Solr 6. If you want to enable suggestion, add the following:

        ```
        alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
        alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title 
        alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description 
        alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
        ```

    **Note:** The spell check functionality does not work with Solr 6 as suggestion is disabled for scalability purpose.

6.  To configure the Solr 6 cores, set the following options:

    -   Before creating the alfresco and archive cores:
        -   Set `alfresco.secureComms=https` in alfresco-search-services/solrhome/templates/rerank/conf/solrcore.properties.
        -   Copy the custom keystores to the alfresco-search-services/solrhome/templates/rerank/conf directory.

            ```
            ssl.repo.client.keystore
            ssl.repo.client.truststore
            ssl-keystore-passwords.properties
            ssl-truststore-passwords.properties
            ```

    -   If the alfresco and archive cores already exist, ensure that `alfresco.secureComms` is set to `https` for both the cores. For example:
        -   alfresco-search-services/solrhome/alfresco/conf/solrcore.properties
        -   alfresco-search-services/solrhome/archive/conf/solrcore.properties
7.  For running a single instance of Solr 6, use the following option:

    ```
    ./solr/bin/solr start -a "-Djavax.net.ssl.keyStoreType=JCEKS -Djavax.net.ssl.trustStoreType=JCEKS -Dsolr.ssl.checkPeerName=false -Dcreate.alfresco.defaults=alfresco,archive"
    ```

    **Note:** The `-Dcreate.alfresco.defaults=alfresco,archive` command automatically creates the `alfresco` and `archive` cores. Therefore, you should only start Solr 6 with `-Dcreate.alfresco.defaults=alfresco,archive` the first time you are running Solr 6.

    **Note:** To ensure that Solr 6 connects using IPv6 protocol instead of IPv4, add `-Djava.net.preferIPv6Addresses=true` to the Solr 6 startup parameters.

    **Note:** You should run this application as a dedicated user. For example, you can create a Solr user.

    The default port used is 8983.

    The command line parameter, `-a` passes additional JVM parameters, for example, system properties using `-D`.

    Once your Solr 6 is up and running, you should see a message like:

    ```
    Waiting up to 180 seconds to see Solr running on port 8983 [\]  
    Started Solr server on port 8983 (pid=24289). Happy searching!
    ```

    To stop all instances of Solr 6, use:

    ```
    ./solr/bin/solr stop
    ```

    The Solr 6 logs are stored in the alfresco-search-services/logs/solr.log file, by default. This can be configured in solr.in.sh \(for Linux\) or solr.in.cmd \(for Windows\) using `SOLR_LOGS_DIR`.

    You have successfully created an `alfresco` core and an `archive` core. To verify, in a browser, navigate to the Solr URL, [https://localhost:8983/solr](https://localhost:8983/solr). In the Solr Admin UI, select the core selector drop-down list and verify that both the `alfresco` and `archive` cores are present in the list.

    Allow a few minutes for Solr 6 to start indexing.

8.  When the Solr 6 index is updated, you must enable the Solr 6 subsystem and disable the Solr  4 subsystem.

    1.  Go to **Admin Console \> Repository Services \> Search Service** and select **Solr 6** from the **Search Service In Use** list.

    2.  Disable Solr 4 tracking in the alfresco/solr4/workspace-SpacesStore/conf/solrcore.properties file.

        ```
        enable.alfresco.tracking=false
        ```

    3.  To remove the Solr 4 web application and indexes, stop the Tomcat server which is running Solr 4.

    4.  Remove the <ALFRESCO\_HOME\>/tomcat/webapps/solr4 directory and the <ALFRESCO\_HOME\>/tomcat/webapps/solr4.war file.

    5.  Remove the <ALFRESCO\_HOME\>/tomcat/conf/Catalina/localhost/solr4.xml file.

    6.  Finally, remove the Solr 4 indexes.


If you are not using sharded Solr 6, go to the **Admin Console \> Search Service Sharding** page and:

-   Deselect **Dynamic Shard Instance Registration**.
-   Select **Purge at Startup**.

**Parent topic:**[Installing and configuring Solr 6](../concepts/solr6-install-config.md)

**Related information**  


[Solr 6 backup](solr6-backup.md)

