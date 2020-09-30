# What's new in Alfresco Search and Insight Engine

See what's new in this Alfresco Search and Insight Engine 2.0 release.

-   [Alfresco Index Store removal](whats-new.md#1)
-   [Support for industry leading business intelligence tools](whats-new.md#2)
-   [Update to Keystore configuration](whats-new.md#3)
-   [FIX tool enhancements](whats-new.md#4)
-   [Improved control for Shard failures](whats-new.md#5)

![](../images/hr.png)

**Alfresco Index Store removal**

From Alfresco Search and Insight Engine 2.0 the Alfresco Index Store has been removed. For the implications of what this means for your installation, see the important note [Search and Insight Engine externalized configuration](../concepts/external-properties-solr.md)

![](../images/hr.png)

**Support for industry leading business intelligence tools**

We have enabled support for the CData ODBC Driver for Alfresco 2019. This means you can now use Microsoft Excel or Tableau to report on your data via ODBC connectivity.Previously you could only use Alfresco Insight Zeppelin. The CData ODBC Driver enables you to have real-time access to your data so you can run reports on the contents of the repository directly from your business intelligence tool. Currently we have tested Tableau and Microsoft Excel. For more information and how to install the CData ODBC Driver for Alfresco 2019 see the following documentation [CData ODBC Driver for Alfresco 2019](http://cdn.cdata.com/help/SJE/odbc/default.htm).

![](../images/hr.png)

**Update to Keystore configuration**

We have made significant improvements to how the Keystores are configured. We now store the configuration in JVM system properties instead of properties files. For more information on the changes see:

-   [Installing and configuring Search and Insight Engine with mutual TLS using the distribution zip](../tasks/solr-install.md)
-   [Setting up your certificates](../tasks/keys-setup.md)
-   [Solr configuration files](../concepts/solr-config-files.md)
-   [Keystore directory structure](../concepts/keystore-structure.md)
-   [Customizing certificate generation](../concepts/customize-keys.md)

> **Note:** The way Keystores were configured before Alfresco Search and Insight Engine 2.0 will still work but we don't recommend it because of security issues.

![](../images/hr.png)

**FIX tool enhancements**

We now allow the targeting of FIX operations in a particular timeframe and the cancellation of FIX actions. We have also created a dry run option to the FIX tool to allow you to analyse the effects of your changes before you commit anything.

-   For information on the new parameters `dryRun`, `fromTxCommitTime`, and `toTxCommitTime` see [Asynchronous Actions](../concepts/solr-admin-asynchronous-actions.md).
-   For information on the new parameter `maxScheduledTransactions` see [Solr core configuration properties](../concepts/solrcore-properties-file.md).

![](../images/hr.png)

**Improved control for Shard failures**

We have added new parameters that allow you to have greater control when certain shard failures occur and we've minimized the downtime you will experience in the event of single shard failure.

-   For information on the new parameters `search.solrShardRegistry.dbidRangeRefreshTimeoutInSeconds` and `alfresco.nodestate.tracker.cron` see [Solr core configuration properties](../concepts/solrcore-properties-file.md).

You can follow our latest updates at [Alfrescodocs](https://twitter.com/Alfrescodocs).

**Parent topic:**[Alfresco Search and Insight Engine](../concepts/search-insight-engine-overview.md)

