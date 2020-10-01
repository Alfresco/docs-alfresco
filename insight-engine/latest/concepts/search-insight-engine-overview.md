---
title: Alfresco Search and Insight Engine 
---
Alfresco Search and Insight Engine is our new generation of analytics using Alfresco Search Services. It fully supports aspects, properties, ACLs, and Custom Metadata. It also supports SQL queries for reporting on the Solr data store using JDBC, and the dashboard comes pre-configured with some common reports.

Alfresco Insight Zeppelin is built on top of Apache Zeppelin 0.8.2 and comes bundled as a report builder. It is pre-configured to easily build custom reports with SQL, including against Custom Metadata. Alfresco Insight Zeppelin is the only supported visualization tool that works with Alfresco Search and Insight Engine.

Currently the following are not supported with Alfresco Search and Insight Engine 2.0:

-   Alfresco Process Services
-   Reporting on audit and activity feeds from Alfresco Content Services
-   Multi-tenancy

-   **[What's new in Alfresco Search and Insight Engine](../references/whats-new.md)**  

-   **[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)**  
Installing Alfresco Search and Insight Engine introduces additional features, including new sharding methods and sharding with SSL. Mutual TLS is not just used to encrypt data in transit, it is also used as an authentication mechanism between the repository and Search and Insight Engine.
-   **[Upgrading to Search and Insight Engine 2.0](../tasks/upgrade-sie.md)**  

-   **[Migrating Alfresco Search Services to Alfresco Search and Insight Engine](../concepts/search-insight-engine-upgrade-intro.md)**  
Use the following to migrate from Alfresco Content Services 6.2 with Alfresco Search Services to Alfresco Content Services 6.2 with Alfresco Search and Insight Engine. These instructions also cover upgrades from Alfresco Content Services 5.x with Alfresco Search Services to Alfresco Content Services 6.2 with Alfresco Search and Insight Engine.
-   **[Migrating from Search and Insight Engine to Search Services](../tasks/downgrade-insight-search.md)**  

-   **[Export/Import Alfresco Insight Zeppelin Notes](../tasks/search-insight-engine-upgrade-note.md)**  
Before upgrading Alfresco Search and Insight Engine ensure you export each individual Alfresco Insight Zeppelin note so you can reimport them after the upgrade. If you don't do this your notes will be lost as they do not carry over during the upgrade.
-   **[Search and Insight Engine SQL](../concepts/search-insight-engine-sql.md)**  
Alfresco Search and Insight Engine uses SQL queries to report on your data store.
-   **[Building reports and dashboards](../concepts/installing-apache.md)**  
Alfresco Search and Insight Engine comes with a number of out-of-the box reports and a dashboard builder with pre-configured reports based on Alfresco Insight Zeppelin. Alfresco Insight Zeppelin is a web-based notebook that enables data-driven, interactive data analytics, data visualization, and collaborative documents using SQL.
-   **[Administering Alfresco Search and Insight Engine](../concepts/search-admin.md)**  
This information helps you to monitor and administer Alfresco Search and Insight Engine.
-   **[Alfresco Search and Insight Engine Reference](../concepts/search-references.md)**  
Reference information for Alfresco Search and Insight Engine.
-   **[Copyright](../reuse/copyright.md)**  

-   **[Disclaimer](../reuse/disclaimer.md)**  


