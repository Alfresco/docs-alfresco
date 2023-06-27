---
title: Supported platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Content Services 7.4.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please contact [Support](https://support.alfresco.com){:target="_blank"}.

{% capture seven-four-zero %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 8.6 x64 | |
| Red Hat Enterprise Linux 8.5 x64 | |
| Windows Server 2022 | |
| Windows Server 2019 | |
| Amazon Linux | v2 |
| CentOS 7.9 x64 | |
| CentOS 8.3 x64 | |
| Ubuntu 22.04 | |
| Ubuntu 20.04 | |
|  |  |
| **Databases** | |
| MySQL 8 | `mysql-connector-java-8.0.27.jar` |
| MS SQL Server 2019 | `mssql-jdbc-9.2.1.jre11.jar` |
| Oracle 19c | `Ojdbc8.jar – 19.11.0.0` |
| PostgreSQL 14.x | `Postgresql-42.3.2.jar` |
| PostgreSQL 13.x | `Postgresql-42.3.2.jar` |
| MariaDB 10.6 | |
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.17 | |
| ActiveMQ v5.16 | |
| | |
| **Application servers** | |
| Tomcat 9 | |
| | |
| **Clients** | |
| Windows 10 x64 | |
| Windows 7 x64 | |
| Mac OSX 10.12 | |
| | |
| **Browsers** | |
| Mozilla Firefox 86 | |
| Microsoft Edge Latest| |
| MS Internet Explorer 11 | |
| Chrome 89 | Includes Chromium edition. |
| Safari 14 | |
| | |
| **Java** | |
| OpenJDK 17.0.4 | |
| OpenJDK 11.0.13 | |
| Amazon Corretto 17 | |
| Amazon Corretto 11 | |
| | |
| **Third party integrations** | |
| Microsoft 365 | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| | |
| **Services** | |
| Alfresco Governance Services 7.4 | |
| Alfresco Process Services 2.3 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.9 | |
| Alfresco Desktop Sync 1.16 | |
| Alfresco Desktop Sync 1.15 | |
| Alfresco Transform Service 2.1 | |
| Alfresco Document Transformation Engine 2.3 | |
| Alfresco Search Enterprise 3.3 | For information about migrating from Alfresco Search and Insight Engine 2.0 or Alfresco Search Services 2.0, see the [Alfresco Search Enterprise 3.x upgrade page]({% link search-enterprise/latest/upgrade/index.md %}). |
| Alfresco Search and Insight Engine 2.0.7 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. |
| Alfresco Search Services 2.0.7 | |
| Identity Service 1.8 | |
| Alfresco Intelligence Services 1.5 | |
| Alfresco Content Connector for AWS S3 5.1 | Adds support for AWS Glacier using Cloud storage layer. |
| Alfresco Content Connector for Azure 3.2 | |
| Alfresco Content Connector for SAP applications 5.2.1 | |
| Alfresco Content Connector for Salesforce 2.4 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Collaboration Connector for Microsoft 365 2.0 | |
| Alfresco Collaboration Connector for Teams 2.0 | |
| Alfresco Outlook Integration 2.9 | |
| Alfresco Office Services 1.6 | |
| Alfresco Google Docs Integration 3.4 | |
| Alfresco Content Services SDK 5.2 | |
| Alfresco Content Services SDK 4.5 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.0 | |
| Alfresco Application Development Framework (ADF) 5.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Mobile Workspace 1.6 | |
| Alfresco Mobile Workspace 1.5 | |
| Alfresco Content Accelerator (ACA) 3.5.1 | |
| Alfresco Enterprise Viewer (AEV) 3.5.1 | |
| | |
| **Components** | |
| ImageMagick v7.1.0-16 | |
| LibreOffice v7.2.5 | |

{% endcapture %}

{% include tabs.html tableid="supported-platforms" opt1="7.4.0" content1=seven-four-zero %}
