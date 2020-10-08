---
title: Reports and other tools
---
Alfresco Insight Zeppelin lets you create reports using SQL. The reports can be put together to make a dashboard. You can also use other business intelligence tools.

## Insight Zeppelin

> **Note:** Before upgrading Alfresco Insight Zeppelin ensure you backup your notes first. Then once the upgrade is complete you can re-import them. See [Export/Import Alfresco Insight Zeppelin Notes](../tasks/search-insight-engine-upgrade-note.md).

This is a list of pre-configured reports:

* Repository reports
  * Total storage used in bytes
  * Total number of documents
  * Total folders
  * Count of documents by MIMEtype

* Site reports
  * Total documents by site
  * Total documents by site and MIMEtype
  * Total volume by site in bytes
  * Activity reports

* Count of content created per day in the last 60 days
  * Count of content modified per day in the last 60 days
  * New documents by user and site
  * Modified documents by user and site
  * Count of locked content by user
  * Top largest documents

The following image shows an example dashboard created using the pre-configured reports.

![](../images/exampledashboard1.png)

## Other business intelligence tools

In addition to using Alfresco Insight Zeppelin for reporting you can also use any application that supports ODBC connectivity.

The CData ODBC Driver for Alfresco 2019 enables you to have real-time access to your data so you can run reports on the contents of the repository. Currently Alfresco has tested Tableau and Microsoft Excel. For more information and how to install the CData ODBC Driver see the following documentation [CData ODBC Driver for Alfresco 2019](http://cdn.cdata.com/help/SJE/odbc/default.htm).