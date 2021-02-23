---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the Lucene search service

The topic describes the properties for configuring the Lucene search service.

1.  Open the Admin Console.

2.  In the Repository Services section, click **Search Service**.

    You see the Search Service page.

3.  In the **Search Service** section, select **Lucene** from the **Search Service In Use** list.

4.  Set the Lucene search service properties:

    |Lucene service property|Example setting|What is it?|
    |-----------------------|---------------|-----------|
    |**Content Indexing**|Yes|This enables Lucene based content indexing.|
    |**Index Directory**|<ALFRESCO\_HOME\>/alf\_data/lucene-indexes|This specifies the location where the index is stored on the Lucene server.|
    |**Content Tracking Enabled**|Yes|This specifies that Solr can still track with Lucene search enabled. This setting may be used to disable Solr tracking by separate Solr instance\(s\) configured to track this server.|
    |**Index Recovery Mode**|Yes|This specifies the index rebuild option, which can either be `Validate`, `Auto` or `Full`.|
    |**Index Backup Directory**|<ALFRESCO\_HOME\>/alf\_data/backup-lucene-indexes|This specifies the location where the index backup is stored on the Lucene server.|
    |**Backup Cron Expression**|0 0 3 \* \* ?|This specifies the unix-like expression, using the same syntax as the cron command, that defines when backups occur. The default value is 0 0 3 \* \* ? meaning the backup is performed daily at 03.00.|
    |**Advanced Lucene Settings**|-|Alfresco recommends that you do not change these settings.|
    |**CMIS Query**|Use database if possible|This specifies the default mode which defines if and when the database should be used to support a subset of the CMIS Query Language.|
    |**Alfresco Full Text Search**|Use database if possible|This specifies the default mode which defines if and when the database should be used to support a subset of the Alfresco Full Text Search.|

5.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Working with the Search Service](../concepts/adminconsole-searchservice.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

