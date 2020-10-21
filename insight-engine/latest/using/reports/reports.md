---
title: Reports and dashboards
---

Insight Zeppelin lets you create reports using SQL. The reports can be put together to make a dashboard. You can also use other business intelligence tools.

## Insight Zeppelin

> **Note:** Before upgrading Insight Zeppelin ensure you backup your notes first. Then once the upgrade is complete you can re-import them. See [Export/Import Insight Zeppelin Notes](#export/import-insight-zeppelin-notes)

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

![]({% link insight-engine/images/exampledashboard1.png %})

## Other business intelligence tools

In addition to using Insight Zeppelin for reporting you can also use any application that supports ODBC connectivity.

The CData ODBC Driver for Alfresco 2019 enables you to have real-time access to your data so you can run reports on the contents of the repository. Currently Alfresco has tested Tableau and Microsoft Excel. For more information and how to install the CData ODBC Driver see the following documentation [CData ODBC Driver for Alfresco 2019](http://cdn.cdata.com/help/SJE/odbc/default.htm).

## Export/Import Insight Zeppelin Notes

Before upgrading Search and Insight Engine ensure you export each individual Insight Zeppelin note so you can reimport them after the upgrade. If you don't do this your notes will be lost as they do not carry over during the upgrade.

> **Note:** When importing an Insight Zeppelin note you may need to set its note permissions again.

Use these steps to export and import your Insight Zeppelin notes.

1. Go to Insight Zeppelin.

2. On the Welcome to Zeppelin home page access a note.

3. Click the **Export this note** button.

4. Return to the Welcome to Zeppelin home page and repeat the procedure for all your notes.

5. Once the upgrade is complete return to the Welcome to Zeppelin home page.

6. Click **Import note**.

7. Click **Select JSON file** and select the note you want to reimport.

    If you want to reimport the note with a different name you can enter it into the **Import as** field.

8. Repeat the procedure for all your notes.