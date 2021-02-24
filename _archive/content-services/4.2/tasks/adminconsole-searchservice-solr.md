---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the Solr search service

The topic describes the properties for configuring the Solr search service.

1.  Open the Admin Console.

2.  In the Repository Services section, click **Search Service**.

    You see the Search Service page.

3.  In the **Search Service** section, select **Solr** from the **Search Service In Use** list.

4.  Set the Solr search service properties:

    |Solr service property|Example setting|What is it?|
    |---------------------|---------------|-----------|
    |**Content Tracking Enabled**|Yes|This specifies that Solr can still track with the No Index search enabled. This setting may be used to disable Solr tracking by separate Solr instance\(s\) configured to track this server.|
    |**Solr Port \(Non-SSL\)**|8080|This specifies the application server's http port \(non-secure\) on which Solr is running. This is only used if Solr is configured to run without secure communications.|
    |**Solr Hostname**|localhost|This specifies the hostname on which the Solr server is running. Use localhost if running on the same machine.|
    |**Solr SSL Port**|8443|This specifies the application server's https port on which Solr is running.|
    |**Indexing in Progress**|No|This specifies if Solr is currently indexing outstanding transactions.|
    |**Last Indexed Transaction**|18|This specifies the transaction ID most recently indexed by Solr.|
    |**Approx Index Time Remaining**|0 Seconds|This specifies the estimated time that Solr will take to complete indexing the current outstanding transactions.|
    |**Index Lag**|0 s|This specifies the time that indexing is currently behind the repository updates.|
    |**Approx Transactions to Index**|0|This specifies the estimated number of outstanding transactions that require indexing.|
    |**Indexing in Progress**|No|This specifies if Solr is currently indexing outstanding transactions.|
    |**Last Indexed Transaction**|18|This specifies the transaction ID most recently indexed by Solr.|
    |**Approx Index Time Remaining**|0 Seconds|This specifies the estimated time that Solr will take to complete indexing the current outstanding transactions.|
    |**Index Lag**|0 s|This specifies the time that indexing is currently behind the repository updates.|
    |**Approx Transactions to Index**|0|This specifies the estimated number of outstanding transactions that require indexing.|
    |**Backup Location** \(Main Store\)|$\{dir.root\}/solrBackup/alfresco|This specifies the location where the index backup for the main WorkspaceStore is stored on the Solr server.|
    |**Backup Cron Expression** \(Main Store\)|0 0 2 \* \* ?|This specifies a unix-like expression, using the same syntax as the cron command, that defines when backups occur. The default value is 0 0 2 \* \* ? meaning the backup is performed daily at 02.00.|
    |**Backups To Keep** \(Main Store\)|3|This specifies the number of backups to keep \(including the latest backup\).|
    |**Backup Location** \(Archive Store properties\)|$\{dir.root\}/solrBackup/archive|This specifies the location where the index backup for ArchiveStore is stored on the Solr server.|
    |**Backup Cron Expression** \(Archive Store properties\)|0 0 4 \* \* ?|This specifies a unix-like expression, using the same syntax as the cron command, that defines when backups occur. The default value is 0 0 4 \* \* ? meaning the backup is performed daily at 04.00.|
    |**Backups To Keep** \(Archive Store properties\)|3|This specifies the number of backups to keep \(including the latest backup\).|
    |
    |**CMIS Query**|Use database if possible|This specifies the default mode which defines if and when the database should be used to support a subset of the CMIS Query Language.|
    |**Alfresco Full Text Search**|Use database if possible|This specifies the default mode which defines if and when the database should be used to support a subset of the Alfresco Full Text Search.|

5.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Working with the Search Service](../concepts/adminconsole-searchservice.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

