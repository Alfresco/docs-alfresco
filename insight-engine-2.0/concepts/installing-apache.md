# Building reports and dashboards

Alfresco Search and Insight Engine comes with a number of out-of-the box reports and a dashboard builder with pre-configured reports based on Alfresco Insight Zeppelin. Alfresco Insight Zeppelin is a web-based notebook that enables data-driven, interactive data analytics, data visualization, and collaborative documents using SQL.

To use the reports and dashboard builder, you need to install Alfresco Insight Zeppelin using one of the following installation methods:

-   Docker Compose see [Deploy Alfresco Insight Zeppelin using Docker Compose](../tasks/deploying-apache-zeppelin.md)
-   Manual installation see [Deploy Alfresco Insight Zeppelin using a distribution zip](../tasks/deploying-apache-zeppelin-zip.md)

**Note:** For this version of Alfresco Search and Insight Engine, cluster mode is not supported.

Use `http://localhost:9090/zeppelin` to access Alfresco Insight Zeppelin user interface.

For information on Alfresco Insight Zeppelin user Interface see [Explore Apache Zeppelin UI](https://zeppelin.apache.org/docs/0.8.1/quickstart/explore_ui.html).

For more information on using Alfresco Insight Zeppelin see [Alfresco Insight Zeppelin reports and notes](apache-zeppelin-dashboards-reports.md).

-   **[Deploy Alfresco Insight Zeppelin using Docker Compose](../tasks/deploying-apache-zeppelin.md)**  
You can deploy Alfresco Insight Zeppelin by inserting the container details into the same Docker Compose file that you use for deploying Alfresco Content Services 6.2 and Alfresco Search and Insight Engine.
-   **[Deploy Alfresco Insight Zeppelin using a distribution zip](../tasks/deploying-apache-zeppelin-zip.md)**  
Use this information to manually install Alfresco Insight Zeppelin using a distribution zip.
-   **[Alfresco Insight Zeppelin reports and notes](../concepts/apache-zeppelin-dashboards-reports.md)**  
 Alfresco Insight Zeppelin lets you create reports using SQL. The reports can be put together to make a dashboard.
-   **[Other business intelligence tools](../concepts/business-intelligence-tools.md)**  
In addition to using Alfresco Insight Zeppelin for reporting you can also use any application that supports ODBC connectivity.

**Parent topic:**[Alfresco Search and Insight Engine](../concepts/search-insight-engine-overview.md)

