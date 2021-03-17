---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
option: [Admin Console, open]
---

# Upgrading from Solr 4 to Solr 6 search

Use this information to upgrade from Alfresco One 5.1 with the Solr 4  search index server to Alfresco Content Services 5.2.7  with the Solr 6 search index server.

To determine the current search server, navigate to the Search Manager  page at **Alfresco Share Admin Console \> Repository Services \> Search Service**. Select  the search subsystem from the **Search Service In Use** list.

 Follow the steps to migrate from Alfresco One 5.x with Solr 4 search service to Alfresco Content Services 5.2.7 with Solr 6 search service.

1.  Upgrade to Alfresco Content Services 5.2.7  and continue to use the Solr 4 search service as before.

2.  Install and configure Solr 6 to track the repository. For more information, see [Installing and Configuring Solr 6](solr6-install-withoutSSL.md).

3.  While Solr 6 builds its indexes, you can monitor progress using the `SUMMARY` report.

    ```
    [http://localhost:8080/solr6/admin/cores?action=SUMMARY&wt=xml](http://localhost:8080/solr4/admin/cores?action=SUMMARY&wt=xml) 
    ```

    For details, see the [Unindexed Solr  Transactions](../concepts/solr-unindex.md) topic.

4.  Optionally, you can use the Solr Admin Web interface to view Solr configuration details, run queries, and analyze document fields.

    1.  Open the FireFox **Certificate Manager** by selecting **Firefox \> Preferences... \> Advanced \> Certificates \> View Certificates \> Your Certificates**.

    2.  Import the browser keystore `browser.p12` that is located in your <ALFRESCO\_HOME\>/alf\_data/keystore directory.

    3.  Enter the password `alfresco`.

        A window displays showing that the keystore has been imported successfully. The **Certificate Manager** now contains the imported keystore with the Alfresco repository certificate under the **Your Certificates** tab.

    4.  Close the **Certificate Manager** by clicking **OK**.

    5.  In the browser, navigate to a Solr URL.

        For example, use [http://localhost:8080/solr4](http://localhost:8080/solr) for Solr 4 and [http://localhost:8080/solr6](http://localhost:8080/solr) for Solr 6.

        The browser displays an error message window to indicate that the connection is untrusted. This is due to the Alfresco certificate not being tied to the server IP address. In this case, view the certificate and confirm that it is signed by the Alfresco Certificate Authority.

    6.  Expand **I understand the risks**.

    7.  Select **Add Exception**.

    8.  Click **View**.

        This displays the certificate.

    9.  Confirm that the certificate was issued by Alfresco Certificate Authority, and then confirm the **Security Exception**.

    Access to Solr 6 is granted. The Solr Admin page is displayed. It is divided into two parts.

    The left-side of the screen is a menu under the Solr logo that provides navigation through various screens. The first set of links are for system-level information and configuration and provide access to Logging, Core Admin and Java Properties. At the end of this information is a list of Solr cores configured for this instance of Alfresco.

    The center of the screen shows the detail of the Solr core selected, such as statistics, summary report, and so on.

    ![](../images/solr-webapp.png)

5.  Monitor the progress of both the Solr 4 and Solr 6 subsystems via the JMX client or the `SUMMARY` report.

6.  When the index is updated as reported by the `SUMMARY` report, you can use the `REPORT` option and check the following:

    -   In the `REPORT` option, node count should match the number of live nodes in the repository \(assuming nothing is changing and the index is updated\). The index contains a document for failed nodes, so failures need to be considered separately.
    -   Any missing transactions; if there are issues, use the `FIX` option.

        ```
        [http://localhost:8080/solr6/admin/cores?action=FIX](http://localhost:8080/solr4/admin/cores?action=FIX)
        ```

        For more information, see the [Troubleshooting Solr Index](../concepts/solr-index-fix.md) topic.

    -   Find errors with specific nodes using `DOC_TYPE:ErrorNode` option.

        ```
        [https://localhost:8446/solr6/alfresco/afts?q=DOC\_TYPE:ErrorNode](https://localhost:8446/solr4/alfresco/afts?q=DOC_TYPE:ErrorNode) 
        ```

    -   If there are any issues, use the `REINDEX` option with the relevant node id.

        ```
        [
        http://localhost:8080/solr6/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4](http://localhost:8080/solr4/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4) 
        ```

        For more information, see the [Troubleshooting Solr Index](../concepts/solr-index-fix.md) topic.

7.  When the Solr 6 index is updated, you must enable the Solr 6 subsystem and disable the Solr  4 subsystem.

    1.  Go to **Admin Console \> Repository Services \> Search Service** and select **Solr 6** from the **Search Service In Use** list.

    2.  Disable Solr 4 tracking in the alfresco/solr4/workspace-SpacesStore/conf/solrcore.properties file.

        ```
        enable.alfresco.tracking=false
        ```

    3.  To remove the Solr 4 web application and indexes, stop the Tomcat server which is running Solr 4.

    4.  Remove the <ALFRESCO\_HOME\>/tomcat/webapps/solr4 directory and the <ALFRESCO\_HOME\>/tomcat/webapps/solr4.war file.

    5.  Remove the <ALFRESCO\_HOME\>/tomcat/conf/Catalina/localhost/solr4.xml file.

    6.  Finally, remove the Solr 4 indexes.

8.  *\(Optional\)* To decommission \(now redundant\) Solr 4, follow the steps below:

    1.  Stop the Solr 4 search service.

    2.  Delete the solr directory from <ALFRESCO\_HOME\>/tomcat/webapps.

    3.  Delete the solr.xml file from <ALFRESCO\_HOME\>tomcat/conf/Catalina/localhost.

    4.  Delete the solr directory from <ALFRESCO\_HOME\>/alf\_data.


**Parent topic:**[Configuring Alfresco Search Services with Solr 6](../concepts/solr6-home.md)

