---
title: Supported platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Content Services.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please [contact Support]({% link support/latest/contact.md %}).

> **Note:** To get the latest security fixes and updates for the Alfresco integrations and applications listed below, use the latest Service Pack for the listed product version. See the Alfresco Software Downloads page in [Hyland Community](https://community.hyland.com/customer-portal/downloads/alfresco){:target="_blank"} for the latest Service Pack versions.

{% capture twenty-three-two %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 9.x x64 | |
| Red Hat Enterprise Linux 8.8 x64 | |
| Windows Server 2022 | |
| Amazon Linux | v2 |
| CentOS 7.9 x64 | |
| Ubuntu 22.04 | |
| Rocky Linux 9.x | |
| Rocky Linux 8.8 | |
|  |  |
| **Databases** | |
| MySQL 8 | `mysql-connector-java-8.0.30.jar` |
| MS SQL Server 2022 | `mssql-jdbc-11.2.0.jre17.jar` |
| MS SQL Server 2019 | `mssql-jdbc-9.2.1.jre11.jar` |
| Oracle 19c | `Ojdbc11.jar` – 19.3 |
| PostgreSQL 15.x | `Postgresql-42.6.0.jar` |
| PostgreSQL 14.x | `Postgresql-42.3.2.jar` |
| PostgreSQL 13.x | `Postgresql-42.3.2.jar` |
| MariaDB 10.6 | `MariaDB Connector/J 2.7.2` |
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.18 | |
| | |
| **Application servers** | |
| Tomcat 10.1.x | |
| | |
| **Clients** | |
| Windows 11 | |
| Windows 10 x64 | |
| Windows 8.1 x64 | |
| Windows 7 x64 | |
| Mac OSX 10.12 | |
| | |
| **Browsers** | |
| Mozilla Firefox 86 | |
| Microsoft Edge Latest| |
| Chrome 89 | Includes Chromium edition. |
| Safari 15 | |
| | |
| **Java** | |
| OpenJDK 17 | |
| Amazon Corretto 17 | |
| | |
| **Third party integrations** | |
| Microsoft 365 | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| Keycloak 21.1.2 | Use this Keycloak version and Alfresco Keycloak Theme 0.3.5 as an alternative to Identity Service 2.0.0 |
| | |
| **Services** | |
| Alfresco Governance Services 23.2 | |
| Alfresco Process Services 24.1 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 5.0 | |
| Alfresco Desktop Sync 1.18 | |
| Alfresco Transform Service 4.1 | |
| Alfresco Document Transformation Engine 2.4 | |
| Alfresco Search Enterprise 4.0 | For information about migrating from Alfresco Search and Insight Engine 2.0 or Alfresco Search Services 2.0, see the [Alfresco Search Enterprise upgrade page]({% link search-enterprise/latest/upgrade/index.md %}). |
| Alfresco Search and Insight Engine 2.0 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. |
| Alfresco Search Services 2.0 | |
| Alfresco Federation Services 3.3 | |
| Alfresco Intelligence Services 3.1 | |
| Alfresco Content Connector for AWS S3 6.1 | Adds support for AWS Glacier using Cloud storage layer. |
| Alfresco Content Connector for Azure 5.0 | |
| Alfresco Content Connector for Salesforce 3.1 | |
| Alfresco Content Connector for SAP Applications 6.0 | |
| Alfresco Content Connector for SAP Cloud 2.0 | |
| Alfresco Collaboration Connector for Microsoft 365 2.0 | |
| Alfresco Collaboration Connector for Teams 2.0 | |
| Alfresco Outlook Integration 3.0 | |
| Alfresco Office Services 2.0 | |
| Alfresco Google Docs Integration 4.1 | |
| Alfresco Events SDK for Out-of-Process Events 6.2 | |
| Alfresco In-Process SDK 4.8 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.4 | |
| Alfresco Mobile Workspace 1.9 | |
| Alfresco Control Center 8.4 | |
| Alfresco Application Development Framework (ADF) 6.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Content Accelerator 4.0 | |
| Alfresco Enterprise Viewer 4.0 | |
| | |
| **Components** | |
| ImageMagick v7.1.0-16 | |
| LibreOffice v7.2.5 | |

{% endcapture %}

{% capture twenty-three-one %}

> **Note:** Information for this Service Pack is provided for reference only. Please use the latest Service Pack.

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 9.x x64 | |
| Red Hat Enterprise Linux 8.8 x64 | |
| Windows Server 2022 | |
| Amazon Linux | v2 |
| CentOS 7.9 x64 | |
| Ubuntu 22.04 | |
| Rocky Linux 9.x | |
| Rocky Linux 8.8 | |
|  |  |
| **Databases** | |
| MySQL 8 | `mysql-connector-java-8.0.30.jar` |
| MS SQL Server 2022 | mssql-jdbc-11.2.0.jre17.jar |
| MS SQL Server 2019 | `mssql-jdbc-9.2.1.jre11.jar` |
| Oracle 19c | `Ojdbc11.jar` – 19.3 |
| PostgreSQL 15.x | `Postgresql-42.6.0.jar` |
| PostgreSQL 14.x | `Postgresql-42.3.2.jar` |
| PostgreSQL 13.x | `Postgresql-42.3.2.jar` |
| MariaDB 10.6 | `MariaDB Connector/J 2.7.2` |
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.18 | |
| | |
| **Application servers** | |
| Tomcat 10.1.x | |
| | |
| **Clients** | |
| Windows 11 | |
| Windows 10 x64 | |
| Windows 8.1 x64 | |
| Windows 7 x64 | |
| Mac OSX 10.12 | |
| | |
| **Browsers** | |
| Mozilla Firefox 86 | |
| Microsoft Edge Latest| |
| Chrome 89 | Includes Chromium edition. |
| Safari 15 | |
| | |
| **Java** | |
| OpenJDK 17 | |
| Amazon Corretto 17 | |
| | |
| **Third party integrations** | |
| Microsoft 365 | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| | |
| **Services** | |
| Alfresco Governance Services 23.1 | |
| Alfresco Process Services 24.1 | |
| Alfresco Process Services 2.4.2 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 5.0 | |
| Alfresco Sync Service 4.0 | |
| Alfresco Desktop Sync 1.18 | |
| Alfresco Desktop Sync 1.17 | |
| Alfresco Desktop Sync 1.16 | |
| Alfresco Transform Service 4.1 | |
| Alfresco Transform Service 4.0 | |
| Alfresco Document Transformation Engine 2.4 | |
| Alfresco Search Enterprise 4.0 | For information about migrating from Alfresco Search and Insight Engine 2.0 or Alfresco Search Services 2.0, see the [Alfresco Search Enterprise upgrade page]({% link search-enterprise/latest/upgrade/index.md %}). |
| Alfresco Search and Insight Engine 2.0.8 and later | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. |
| Alfresco Search Services 2.0.8 and later | |
| Alfresco Federation Services 3.2 | |
| Alfresco Federation Services 3.1 | |
| Keycloak 21.1.2 | Use this Keycloak version and Alfresco Keycloak Theme 0.3.5 as an alternative to Identity Service 2.0.0. |
| Identity Service 2.0 | The Identity Service is sunset from September 1, 2024. We recommend using Keycloak with the latest Service Pack instead of the Identity Service. |
| Alfresco Intelligence Services 3.1.3 | |
| Alfresco Intelligence Services 3.1 | |
| Alfresco Content Connector for AWS S3 6.0 | Adds support for AWS Glacier using Cloud storage layer. |
| Alfresco Content Connector for Azure 5.0.1 | |
| Alfresco Content Connector for Azure 4.0 | |
| Alfresco Content Connector for Azure 3.2.1 | |
| Alfresco Content Connector for Salesforce 3.1 | |
| Alfresco Content Connector for Salesforce 3.0 | |
| Alfresco Content Connector for SAP Applications 6.0 | |
| Alfresco Content Connector for SAP Cloud 2.0 | |
| Alfresco Collaboration Connector for Microsoft 365 2.0.x | |
| Alfresco Collaboration Connector for Teams 2.0.x | |
| Alfresco Outlook Integration 3.0 | |
| Alfresco Office Services 2.0 | |
| Alfresco Google Docs Integration 4.1 | |
| Alfresco Google Docs Integration 4.0 | |
| Alfresco Content Services SDK 6.2 | |
| Alfresco Content Services SDK 6.1 | |
| Alfresco Content Services SDK 6.0 | |
| Alfresco Content Services SDK 4.8 | |
| Alfresco Content Services SDK 4.7 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.4 | |
| Alfresco Digital Workspace 4.3 | |
| Alfresco Mobile Workspace 1.9 | |
| Alfresco Control Center 8.4 | |
| Alfresco Control Center 8.3 | |
| Alfresco Application Development Framework (ADF) 6.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Content Accelerator 4.0 | |
| Alfresco Enterprise Viewer 4.0 | |
| | |
| **Components** | |
| ImageMagick v7.1.0-16 | |
| LibreOffice v7.2.5 | |

{% endcapture %}

{% include tabs.html tableid="supported-platforms" opt1="23.2" content1=twenty-three-two opt2="23.1 (reference only)" content2=twenty-three-one %}
