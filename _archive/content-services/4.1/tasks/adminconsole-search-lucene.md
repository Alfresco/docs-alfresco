---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco
option: search
---

# Setting Lucene properties

The Lucene page shows the properties for using Lucene with Alfresco.

1.  Open the Admin Console, and then click **Lucene**.

2.  On the Lucene page, click **Edit**.

    You see the Edit: Lucene page.

3.  Select the index recovery mode:

    |Property|Description|
    |--------|-----------|
    |VALIDATE|The default setting. Checks the first 1000 and last 1000 transactions in the database have been indexed. If not then a message will be logged and the server will stop. Also reports any stores which do not have an index present - if found the server will not start.|
    |AUTO|Checks the first 1000 transactions in the database have been indexed, and if not does a full index rebuild. Then checks the last 1000 transactions in the database have been indexed, and if not finds the last indexed transaction and indexes all subsequent transactions. Also reports any stores which do not have an index present - if found the server will not start.|
    |FULL|Forces a full reindex.|

4.  To activate content indexing, select the **Content Indexing Enabled** checkbox.

5.  To enable or disable in-transaction indexing, use the **Disable in Transaction Indexing** checkbox. This checkbox is not selected by default.

6.  Change the Lucene backup properties.

    |Property|Example setting|What is it?|
    |--------|---------------|-----------|
    |**Index Backup Directory**|<installLocation\>/alf\_data/backup-lucene-indexes|This specifies the default directory for Lucene index backups.|
    |**Backup Cron Expression**|0 0 3 \* \* ?|Specifies a unix-like expression, using the same syntax as the cron command, that defines when backups occur.|

7.  Change the Lucene advanced properties.

    |Property|Example setting|What is it?|
    |--------|---------------|-----------|
    |**Indexing Batch Size**|1000|Specifies the batch size for an index rebuild. Set it lower to trigger an index rebuild.|
    |**Max. Atomic Transformation Time**|20|Specifies that transformations of content that are likely to take longer than this time \(in ms\) will be done in the background. To force atomic content indexing, increase this value.|
    |**Missing Content Cron Expression**|\* \* \* \* \* ? 2099|Specifies a Quartz cron expression that defines when a job will run to try and re-index documents whose content has not been indexed.|
    |**Max. number of indexed tokens per document**|1000|Specifies the maximum number of tokens that will be indexed per document.|
    |**Max Merged Documents**|1000000|Specifies the maximum number of merged documents. This option applies to the merge process - the resulting index will be optimized.|
    |**Max. Merge Factor**|6|Specifies the maximum merge factor. This option applies to the merge process - the resulting index will be optimized.|

8.  When you've finished changing the properties, click **Save**.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Managing search](../concepts/adminconsole-search.md)

