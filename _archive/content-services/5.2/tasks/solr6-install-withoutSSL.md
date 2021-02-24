---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
---

# Installing and configuring Solr 6 without SSL

Use this information to install Alfresco Search Services with Solr 6 on the same machine as Alfresco without SSL.

This task assumes that you have:

-   Installed Alfresco Content Services 5.2.7. See [Installing using setup wizards](../concepts/installs-eval-intro.md).
-   Set the following properties in the alfresco-global.properties file:

    ```
    index.subsystem.name=solr6
    solr.secureComms=none
    solr.port=8983
    ```


1.  Download and unzip the Solr 6 distribution, alfresco-search-services-1.2.x.zip to a preferred location.

    By default, the contents of alfresco-search-services-1.2.x.zip are decompressed in a root folder as /alfresco-search-services.

2.  Update the alfresco-search-services/solrhome/conf/shared.properties file.

    -   If you use several languages across your organization, you **must** enable cross-language search support in all fields, by adding the following:

        ```
        alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
        alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
        alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext 
        ```

3.  \(Optional\) If you want to install Solr 6 on a separate machine, check the following before starting Solr 6:

    1.  Set the values of environment variables, such as `SOLR_SOLR_HOST` and `SOLR_SOLR_PORT`, in the alfresco-search-services/solr.in.sh file \(Linux-based platform\) or alfresco-search-services/solr.in.cmd file \(Windows-based platform\).

    2.  Set the values of environment variables, such as `SOLR_ALFRESCO_HOST` and `SOLR_ALFRESCO_PORT`, in the alfresco-search-services/solr.in.sh file \(Linux-based platform\) or alfresco-search-services/solr.in.cmd file \(Windows-based platform\).

        See [Solr 6 externalized configuration](../concepts/external-properties-solr6.md).

4.  \(Optional\) Update the alfresco-search-services/solrhome/conf/shared.properties file.

    -   Unlike Solr 4, suggestion is disabled by default for Solr 6. If you want to enable suggestion, add the following:

        ```
        alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
        alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title 
        alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description 
        alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
        ```

    **Note:** The spell check functionality does not work with Solr 6 as suggestion is disabled for scalability purpose.

5.  To start Solr 6 with all the default settings, use the following command:

    ```
    ./solr/bin/solr start -a "-Dcreate.alfresco.defaults=alfresco,archive"
    ```

    This command automatically creates the `alfresco` and the `archive` cores.

    The command line parameter, `-a` passes additional JVM parameters, for example, system properties using `-D`.

    **Note:** The `-Dcreate.alfresco.defaults=alfresco,archive` command automatically creates the `alfresco` and `archive` cores. Therefore, you should only start Solr 6 with `-Dcreate.alfresco.defaults=alfresco,archive` the first time you are running Solr 6.

    **Note:** You should run this application as a dedicated user. For example, you can create a Solr user.

    **Note:** To ensure that Solr 6 connects using IPv6 protocol instead of IPv4, add `-Djava.net.preferIPv6Addresses=true` to the Solr 6 startup parameters.

    Once your Solr 6 is up and running, you should see a message like:

    ```
    Waiting up to 180 seconds to see Solr running on port 8983 [\]  
    Started Solr server on port 8983 (pid=24289). Happy searching!
    ```

    To stop the currently running Solr 6 instance, use:

    ```
    ./solr/bin/solr stop
    ```

    The Solr 6 logs are stored in the alfresco-search-services/logs/solr.log file, by default. This can be configured in solr.in.sh.

    You have successfully created an `alfresco` core and an `archive` core. To verify, in a browser, navigate to the Solr URL, [http://localhost:8983/solr](http://localhost:8983/solr). In the Solr Admin UI, select the core selector drop-down list and verify that both the `alfresco` and `archive` cores are present in the list.

    Allow a few minutes for Solr 6 to start indexing.

6.  Go to **Admin Console \> Repository Services \> Search Service** and verify that:

    1.  You see the Solr 6 option in the **Search Service In Use** list.

    2.  Under **Main \(Workspace\) Store Tracking Status**, the **Approx Transactions to Index** is **0**.

7.  Decommission Solr 4.

    1.  Disable Solr 4 tracking in the alfresco/solr4/workspace-SpacesStore/conf/solrcore.properties file.

        ```
        enable.alfresco.tracking=false
        ```

    2.  To remove the Solr 4 web application and indexes, stop the Tomcat server which is running Solr 4.

    3.  Remove the <ALFRESCO\_HOME\>/tomcat/webapps/solr4 directory and the <ALFRESCO\_HOME\>/tomcat/webapps/solr4.war file.

    4.  Remove the <ALFRESCO\_HOME\>/tomcat/conf/Catalina/localhost/solr4.xml file.

    5.  Finally, remove the Solr 4 indexes.


**Parent topic:**[Installing and configuring Solr 6](../concepts/solr6-install-config.md)

**Related information**  


[Solr 6 subsystem](../concepts/solr6-subsystem.md)

[Solr 6 backup](solr6-backup.md)

