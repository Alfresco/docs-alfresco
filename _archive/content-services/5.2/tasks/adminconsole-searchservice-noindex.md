---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring No Index search service

Use this information to configure the No Index search service.

If you use the **No Index** service, you only have the [transactional metadata query](../concepts/intrans-metadata.md) functionality available until you build your Solr 4 indexes. Full text search will not be available during this time.

1.  Open the Admin Console. For more information, see [Launching the Admin Console](adminconsole-open.md)

2.  In the Repository Services section, click **Search Service**.

    You see the Search Service page.

3.  In the **Search Service** section, select **No Index** from the **Search Service In Use** list.

4.  Set the No Index search service properties:

    |No Index service property|Example setting|What is it?|
    |-------------------------|---------------|-----------|
    |**Content Tracking Enabled**|Yes|This specifies that Solr can still track with No Index search enabled. This setting can be used to disable Solr tracking by separate Solr instance\(s\) configured to track this server.|
    |**CMIS Query**|Use database if possible|This specifies the default mode which defines if and when the database should be used to support a subset of the CMIS Query Language.|
    |Alfresco**Full Text Search**|Use database if possible|This specifies the default mode which defines if and when the database should be used to support a subset of the Alfresco Full Text Search.|

5.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Working with the Search Service](../concepts/adminconsole-searchservice.md)

