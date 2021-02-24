---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Remove Solr from an Alfresco installation

This topic describes the process for removing Solr search subsystem from a standard Alfresco installation.

After installing Alfresco via the installer, Solr is automatically installed and activated. If you want to use the [Transactional metadata query](../concepts/intrans-metadata.md) feature or the Lucene search subsystem instead of the Solr search subsystem, you must remove Solr from the Alfresco installation.

**Note:** In this topic, the Solr search subsystem will be removed and the Lucene search subsystem will be used. Also, it is assumed that the Lucene search subsystem has not been used before.

1.  Configure Alfresco to use the Lucene search subsystem or noindex search system instead of the Solr search subsystem.

    1.  Enter the following URL in a browser window:

        ```
        http://<your-host-name>:8080/alfresco/service/enterprise/admin
        ```

        Where `<your-host-name>` is the host name where you are running the Alfresco server.

        An Authentication Required prompt displays, showing the IP address or name and the port number of the Alfresco server.

    2.  Enter your Alfresco user name and password.

        Your user name and password must be for an account with administrator permissions.

        The Admin Console displays in a browser window. The first page you see is the [System Summary](../concepts/adminconsole-systemsummary.md).

    3.  In the Repository Services section, click Search Service.

        You see the Search Service page.

        This page enables you to manage your search service.

    4.  In the **Search Service** section, select **Lucene** from the **Search Service In Use** list.

    5.  In the **Lucene Properties** section, select **FULL** from the **Index Recovery Mode** list. Since there is no existing index, you must build an index from the beginning.

    6.  In the **Lucene Properties** section, check the directory path specified in **Index Directory**. This specifies the location of the new Lucene index. To change this default directory location, you will have to edit the Lucene index configuration properties. See [Full text search configuration properties for Solr and Lucene indexes](../concepts/search-fts-config.md).

    7.  Click **Save**.

        This step may take some time as your Lucene index is being built from scratch. You cannot use the search service during this time.

    8.  Once complete, select either **AUTO** or **VALIDATE** from the **Index Recovery Mode** list in the **Lucene Properties** section.

        This is because you do not want to rebuild the Lucene index again the next time you start Alfresco.

    9.  In the **Search Service** section, select **No Index** from the **Search Service In Use** list.

    10. Click **Save**.

        You are now using another search subsystem.

2.  Stop the Tomcat server.

3.  Remove Solr or just the data, in case you want to use Solr at a later date.

    To remove Solr, use the following command:

    ```
    Delete <Install dir>\solr
    ```

    To remove the data only, use the following command:

    ```
    delete <Install dir>\solr\archive
    delete <Install dir>\solr\archive-SpacesStore\alfrescoModels\*.xml
    delete <Install dir>\solr\workspace
    delete <Install dir>\solr\workspace-SpacesStore\alfrescoModels\*.xml
    ```

4.  Configure Tomcat so that it does not run the Solr application.

    Use either the `delete` or `move` command:

    ```
    delete <Install dir>\tomcat\conf\Catalina\localhost\solr.xml
    ```

    OR

    ```
    move <Install dir>\tomcat\conf\Catalina\localhost\solr.xml
    ```

5.  Restart the Tomcat server.


**Parent topic:**[Remove any unwanted applications](../concepts/remove-apps-install.md)

