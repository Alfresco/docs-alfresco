---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco
option: search
---

# Setting Solr properties

The Solr page shows the properties for using Solr with Alfresco.

1.  Open the Admin Console, and then click **Solr**.

2.  On the Solr page, click **Edit**.

    You see the Edit: Solr page.

3.  To activate index tracking, select the **Tracking Enabled** checkbox.

    This option enables Solr to connect to the Alfresco server, and to track and index updates. When reading the tracking information, compare the "from Transaction" with the "to Transaction" details. If they are the same, then the tracker does not have anything to do. To check the last transaction ID in the repository, use the following query to the database:

    ```
    select max(id) from alf_transaction;
    ```

    The result will match the “from Transaction” value in the log if Solr is up to date.

4.  Change the General properties.

    |Property|Example setting|What is it?|
    |--------|---------------|-----------|
    |**Solr Hostname**|localhost|This specifies the host name on which the Solr server is running.|
    |**Solr Port \(non-SSL\)**|8080|This specifies the port number.|
    |**Solr SSL Port**|8443|This specifies the SSL port number.|

5.  Change the Main store properties.

    |Property|Example setting|What is it?|
    |--------|---------------|-----------|
    |**Index Lag \(Seconds\)**|0 s|This specifies the tracker property to set the time \(in seconds\) that the Solr full text index is currently behind the repository updates.|
    |**Backup Cron Expression**|0 0 2 \* \* ?|Specifies a unix-like expression, using the same syntax as the cron command, that defines when backups occur.|
    |**Backup Location**| |This specifies the full-path location for the backup to be stored.|

6.  Change the Archive Store properties.

    |Property|Example setting|What is it?|
    |--------|---------------|-----------|
    |**Index Lag \(Seconds\)**|0 s|This specifies the tracker property to set the time \(in seconds\) that the Solr full text index is currently behind the repository updates.|
    |**Backup Cron Expression**|0 0 2 \* \* ?|Specifies a unix-like expression, using the same syntax as the cron command, that defines when backups occur.|
    |**Backup Location**| |This specifies the full-path location for the backup to be stored.|

7.  When you've finished changing the properties, click **Save**.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Managing search](../concepts/adminconsole-search.md)

