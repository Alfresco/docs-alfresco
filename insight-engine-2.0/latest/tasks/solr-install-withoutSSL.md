# Installing and configuring Search and Insight Engine without mutual TLS using the distribution zip

Use this information to install Alfresco Search and Insight Engine on the same machine as Alfresco Content Services without mutual TLS.

Mutual TLS is used for authentication between the Repository and Search and Insight Engine. Without mutual TLS, internal APIs on both sides will be exposed without any form of authentication, giving full access to the repository data. In such a setup, you need to make sure that external access to these APIs is blocked, for example, with a front-end reverse proxy. See [Adding a reverse proxy](https://docs.alfresco.com/6.1/concepts/reverse-proxy.html) for more.

This task assumes you have:

-   Installed Alfresco Content Services 6.2 or above, see [Supported Platforms and Languages](https://www.alfresco.com/services/subscription/supported-platforms).
-   Set the following properties in the <TOMCAT\_HOME\>/shared/classes/alfresco-global.properties file:

    ```
    index.subsystem.name=solr6
    solr.secureComms=none
    solr.port=8983
    ```


**Important:** Alfresco strongly recommends you use firewalls and other infrastructure means to ensure the Search and Insight Engine server is not accessible from anything other than trusted hosts and/or users, and only on the ports needed for Search and Insight Engine.

1.  Browse to the [Alfresco Support Portal](http://support.alfresco.com) and download alfresco-insight-engine-distribution-2.0.x.zip.

2.  Extract the Search and Insight Engine distribution.

    By default, the contents of alfresco-insight-engine-distribution-2.0.x.zip are decompressed in a root folder as /alfresco-insight-engine. See [Search and Insight Engine directory structure](../concepts/solr-directories.md) for more details.

3.  Configure HTTP.

    1.  Open `solrhome/templates/rerank/conf/solrcore.properties`.

    2.  Replace `alfresco.secureComms=https` with:

        ```
        alfresco.secureComms=none
        ```

        This ensures that the Solr cores are created in plain HTTP mode.

        Alternatively, you can add this configuration in the system properties \(using `-D`\) when starting Solr. For example, add the following to the startup parameters in step [7](solr-install-withoutSSL.md#startup):

        ```
        -Dalfresco.secureComms=none
        ```

    See [Core templates](../concepts/solr-core-templates.md) for a brief description of the out-of-the-box Solr core templates.

4.  If you use several languages across your organization, you **must** enable cross-language search support in all fields. To do this add the following to the alfresco-insight-engine/solrhome/conf/shared.properties file:

    ```
    alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
    alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
    alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
    ```

5.  \(Optional\) Suggestion is disabled by default. To enable suggestion update the alfresco-insight-engine/solrhome/conf/shared.properties file.

    ```
    alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
    alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title 
    alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description 
    alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
    ```

    **Note:** The spell check functionality works with Search and Insight Engine when suggestion is enabled.

6.  \(Optional\) If you want to install Search and Insight Engine on a separate machine, set the `SOLR_SOLR_HOST` and `SOLR_ALFRESCO_HOST` environment variables before starting Search and Insight Engine, for more see [Search and Insight Engine externalized configuration](../concepts/external-properties-solr.md).

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

7.  To start Search and Insight Engine with all the default settings, use the following command:

    ```
    ./solr/bin/solr start -a "-Dcreate.alfresco.defaults=alfresco,archive"
    ```

    The command line parameter, `-a` passes additional JVM parameters, for example, system properties using `-D`.

    **Note:** The `-Dcreate.alfresco.defaults=alfresco,archive` command automatically creates the `alfresco` and `archive` cores. Therefore, you should only start Search and Insight Engine with `-Dcreate.alfresco.defaults=alfresco,archive` the first time you run Search and Insight Engine.

    **Note:** You should run this application as a dedicated user. For example, you can create a Solr user.

    **Note:** To ensure that Search and Insight Engine connects using the IPv6 protocol instead of IPv4, add `-Djava.net.preferIPv6Addresses=true` to the startup parameters.

    Once Search and Insight Engine is up and running, you should see a message similar to the following:

    ```
    Waiting up to 180 seconds to see Solr running on port 8983 [\]  
    Started Solr server on port 8983 (pid=24289). Happy searching!
    ```

    To stop the currently running Search and Insight Engine instance, use:

    ```
    ./solr/bin/solr stop
    ```

    The logs are stored in the alfresco-insight-engine/logs/solr.log file, by default. This can be configured in solr.in.sh \(for Linux\) or solr.in.cmd \(for Windows\) using `SOLR_LOGS_DIR`.

    You have successfully created an `alfresco` core and an `archive` core. To verify, in a browser, navigate to the Solr URL, [http://localhost:8983/solr](http://localhost:8983/solr). In the Solr Admin UI, select the core selector drop-down list and verify that both the `alfresco` and `archive` cores are present.

    Allow a few minutes for Search and Insight Engine to start indexing.

8.  Go to **Admin Console \> Repository Services \> Search Service** and verify that:

    1.  You see the Solr 6 option in the **Search Service In Use** list.

    2.  Under **Main \(Workspace\) Store Tracking Status**, the **Approx Transactions to Index** is **0**.


**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

