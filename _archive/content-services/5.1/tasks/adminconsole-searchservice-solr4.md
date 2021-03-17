---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the Solr 4 search service

The topic describes the properties for configuring the Solr 4 search service.

1.  Open the Admin Console.

2.  In the Repository Services section, click **Search Service**.

    You see the Search Service page.

3.  In the **Search Service** section, select **Solr 4** from the **Search Service In Use** list.

    **Important:** The Solr 1 option should be used only for migration to Solr 4.

4.  Set the Solr 4 search service properties:

    |Solr search property|Example setting|What is it?|
    |--------------------|---------------|-----------|
    |**Content Tracking Enabled**|Yes|This specifies that Solr 4 can still track with the No Index search enabled. This setting can be used to disable Solr 4 tracking by separate Solr instance\(s\) configured to track this server.|
    |**Solr Port \(Non-SSL\)**|8080|This specifies the application server's http port \(non-secure\) on which Solr 4 is running. This is only used if Solr 4 is configured to run without secure communications.|
    |**Solr base URL**|/solr4|This specifies the base URL for the Solr 4 web application.|
    |**Solr Hostname**|localhost|This specifies the hostname on which the Solr 4 server is running. Use localhost if running on the same machine.|
    |**Solr SSL Port**|8443|This specifies the application server's https port on which Solr 4 is running.|
    |**Auto Suggest Enabled**|0|This specifies that the Solr 4 auto-suggest feature is enabled. This feature presents suggestions of popular queries as a user types their query into the search box or text box.|
    |**Indexing in Progress**|No|This specifies if Solr 4 is currently indexing outstanding transactions.|
    |**Last Indexed Transaction**|17|This specifies the transaction ID most recently indexed by Solr 4.|
    |**Approx Index Time Remaining**|0 Seconds|This specifies the estimated time that Solr 4 will take to complete indexing the current outstanding transactions.|
    |**Disk Usage \(GB\)**|0.001748|This specifies the disk space used by the latest version of the Solr 4 index. Allow at least double this value for background indexing management.|
    |**Index Lag**|0 s|This specifies the time that indexing is currently behind the repository updates.|
    |**Approx Transactions to Index**|0|This specifies the estimated number of outstanding transactions that require indexing.|
    |**Memory Usage \(GB\)**|0|This specifies the current memory usage. The value may vary due to transient memory used by background processing.|
    |**Indexing in Progress**|No|This specifies if Solr 4 is currently indexing outstanding transactions.|
    |**Last Indexed Transaction**|17|This specifies the transaction ID most recently indexed by Solr 4.|
    |**Approx Index Time Remaining**|0 Seconds|This specifies the estimated time that Solr 4 will take to complete indexing the current outstanding transactions.|
    |**Disk Usage \(GB\)**|0.000034|This specifies the disk space used by the latest version of the Solr 4 index. Allow at least double this value for background indexing management.|
    |**Index Lag**|0 s|This specifies the time that indexing is currently behind the repository updates.|
    |**Approx Transactions to Index**|0|This specifies the estimated number of outstanding transactions that require indexing.|
    |**Memory Usage \(GB\)**|0|This specifies the current memory usage. The value may vary due to transient memory used by background processing. The value does not include Lucene related caches.|
    |**Backup Location** \(Main Store\)|$\{dir.root\}/solr4Backup/alfresco|This specifies the location where the index backup for the main WorkspaceStore is stored on the Solr 4 server.|
    |**Backup Cron Expression** \(Main Store\)|0 0 2 \* \* ?|This specifies a unix-like expression, using the same syntax as the cron command, that defines when backups occur. The default value is 0 0 2 \* \* ? meaning the backup is performed daily at 02.00.|
    |**Backups To Keep** \(Main Store\)|3|This specifies the number of backups to keep \(including the latest backup\).|
    |**Backup Location** \(Archive Store properties\)|$\{dir.root\}/solr4Backup/archive|This specifies the location where the index backup for ArchiveStore is stored on the Solr 4 server.|
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

