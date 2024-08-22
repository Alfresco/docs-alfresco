---
title: Supported platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Content Services.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please [contact Support]({% link support/latest/contact.md %}).

> **Note:** To get the latest security fixes and updates for the Alfresco integrations and applications listed below, use the latest Service Pack for the listed product version. See the Alfresco Software Downloads page in [Hyland Community](https://community.hyland.com/customer-portal/downloads/alfresco){:target="_blank"} for the latest Service Pack versions.

{% capture seven-two-two %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 8.5 x64 | |
| Red Hat Enterprise Linux 8.4 x64 | |
| Red Hat Enterprise Linux 8.2 x64 | |
| Windows Server 2019 | |
| Amazon Linux | v2 |
| CentOS 7.9 x64 | |
| CentOS 8.3 x64 | |
| Ubuntu 20.04 | |
| Ubuntu 18.04 | |
|  |  |
| **Databases** | |
| MySQL 8 | `mysql-connector-java-8.0.27.jar` |
| MySQL 5.7.28 | `mysql-connector-java-5.1.49-bin.jar` |
| MS SQL Server 2019 | `mssql-jdbc-9.2.1.jre11.jar` |
| MS SQL Server 2017 | Microsoft JDBC Driver `7.2.2.jre11` for SQL Server. See [JDBC Driver](https://docs.microsoft.com/en-us/sql/connect/jdbc/system-requirements-for-the-jdbc-driver?view=sql-server-ver15){:target="_blank"} for supported versions. |
| Oracle 19c | `Ojdbc8.jar – 19.11.0.0` |
| PostgreSQL 13.3 | `Postgresql-42.3.2.jar` |
| PostgreSQL 12.7 | |
| PostgreSQL 12.4 | `Postgresql-42.2.18.jar` |
| PostgreSQL 11.12 | |
| PostgreSQL 11.7 | |
| MariaDB 10.6 | |
| MariaDB 10.5 | `MariaDB Connector/J 2.7.2` |
| MariaDB 10.4 | `MariaDB Connector/J 2.7.1`|
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.16.1 | |
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
| OpenJDK 11.0.13 | |
| Amazon Corretto 11 | |
| | |
| **Third party integrations** | |
| Microsoft 365 | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| Keycloak 24.0 | Enable `Exclude Issuer from Authentication Response` - see [Authentication]({% link content-services/7.2/admin/auth-sync.md %}#enable-configuration-for-keycloak) |
| | |
| **Services** | |
| Alfresco Governance Services 7.2 | |
| Alfresco Process Services 2.4 | Enable `Exclude Issuer from Authentication Response` - see [Configure authentication]({% link process-services/2.4/config/authenticate.md %}#properties) for details. |
| Alfresco Process Services 2.3 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.11 | |
| Alfresco Desktop Sync 1.18 | |
| Alfresco Transform Service 4.1 | |
| Alfresco Document Transformation Engine 2.4 | |
| Alfresco Search Enterprise 3.1 | For information about migrating from Alfresco Search and Insight Engine 2.0 or Alfresco Search Services 2.0, see the [Alfresco Search Enterprise 3.x upgrade page]({% link search-enterprise/latest/upgrade/index.md %}). |
| Alfresco Search and Insight Engine 2.0.3 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. |
| Alfresco Search Services 2.0.3 | |
| Alfresco Federation Services 2.1 | |
| Alfresco Intelligence Services 1.4 | |
| Alfresco Content Connector for AWS S3 5.1 | |
| Alfresco Content Connector for Azure 3.1 | |
| Alfresco Content Connector for Salesforce 2.4 | |
| Alfresco Content Connector for SAP applications 5.3 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Collaboration Connector for Microsoft 365 2.0 | |
| Alfresco Collaboration Connector for Teams 1.1 | |
| Alfresco Outlook Integration 2.9 | |
| Alfresco Office Services 1.4 | |
| Alfresco Google Docs Integration 3.3 | |
| Alfresco Events SDK for Out-of-Process Events 6.2 | |
| Alfresco In-Process SDK 4.8 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.4 | |
| Alfresco Control Center 7.5 | |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Mobile Workspace 1.8 | |
| Alfresco Content Accelerator (ACA) 3.6 | |
| Alfresco Enterprise Viewer (AEV) 3.6 | |
| | |
| **Components** | |
| ImageMagick v7.1.0-16 | |
| LibreOffice v7.2.5 | |

{% endcapture %}

{% capture seven-two-one %}

> **Note:** Information for this Service Pack is provided for reference only. Please use the latest Service Pack.

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 8.5 x64 | |
| Red Hat Enterprise Linux 8.4 x64 | |
| Red Hat Enterprise Linux 8.2 x64 | |
| Windows Server 2019 | |
| Amazon Linux | v2 |
| CentOS 7.9 x64 | |
| CentOS 8.3 x64 | |
| Ubuntu 20.04 | |
| Ubuntu 18.04 | |
|  |  |
| **Databases** | |
| MySQL 8 | `mysql-connector-java-8.0.27.jar` |
| MySQL 5.7.28 | `mysql-connector-java-5.1.49-bin.jar` |
| MS SQL Server 2019 | `mssql-jdbc-9.2.1.jre11.jar` |
| MS SQL Server 2017 | Microsoft JDBC Driver `7.2.2.jre11` for SQL Server. See [JDBC Driver](https://docs.microsoft.com/en-us/sql/connect/jdbc/system-requirements-for-the-jdbc-driver?view=sql-server-ver15){:target="_blank"} for supported versions. |
| Oracle 19c | `Ojdbc8.jar – 19.11.0.0` |
| PostgreSQL 13.3 | `Postgresql-42.3.2.jar` |
| PostgreSQL 12.7 | |
| PostgreSQL 12.4 | `Postgresql-42.2.18.jar` |
| PostgreSQL 11.12 | |
| PostgreSQL 11.7 | |
| MariaDB 10.6 | |
| MariaDB 10.5 | `MariaDB Connector/J 2.7.2` |
| MariaDB 10.4 | `MariaDB Connector/J 2.7.1`|
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.16.1 | |
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
| OpenJDK 11.0.13 | |
| Amazon Corretto 11 | |
| | |
| **Third party integrations** | |
| Microsoft 365 | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| | |
| **Services** | |
| Alfresco Governance Services 7.2 | |
| Alfresco Process Services 2.4 | |
| Alfresco Process Services 2.3 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.11.1 | Additional compatibility testing was done with ACS 7.1, 7.2, 7.3, and 7.4. |
| Alfresco Sync Service 3.8 | |
| Alfresco Sync Service 3.7 | |
| Alfresco Sync Service 3.6 | |
| Alfresco Desktop Sync 1.18 | |
| Alfresco Desktop Sync 1.17 | |
| Alfresco Desktop Sync 1.16 | |
| Alfresco Desktop Sync 1.15 | |
| Alfresco Desktop Sync 1.14 | |
| Alfresco Desktop Sync 1.13 | |
| Alfresco Desktop Sync 1.12 | |
| Alfresco Desktop Sync 1.11 | |
| Alfresco Desktop Sync 1.10 | |
| Alfresco Desktop Sync 1.9 | |
| Alfresco Transform Service 2.1.1 | Additional compatibility testing was done with ACS 7.1, 7.2, 7.3, and 7.4. |
| Alfresco Transform Service 2.0 | |
| Alfresco Transform Service 1.5.2 | |
| Alfresco Document Transformation Engine 2.4 | |
| Alfresco Search Enterprise 3.1 | For information about migrating from Alfresco Search and Insight Engine 2.0 or Alfresco Search Services 2.0, see the [Alfresco Search Enterprise 3.x upgrade page]({% link search-enterprise/latest/upgrade/index.md %}). |
| Alfresco Search and Insight Engine 2.0.3 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. |
| Alfresco Search Services 2.0.3 | |
| Alfresco Federation Services 2.1 | |
| Identity Service 1.8 | The Identity Service is sunset from September 1, 2024. We recommend using Keycloak with the latest Service Pack instead of the Identity Service. |
| Identity Service 1.7 | The Identity Service is sunset from September 1, 2024. We recommend using Keycloak with the latest Service Pack instead of the Identity Service. |
| SAML Module for Alfresco Content Services 1.2.3 | |
| Alfresco Intelligence Services 1.4.4 | |
| Alfresco Intelligence Services 1.4.2 | |
| Alfresco Content Connector for AWS S3 5.1 | |
| Alfresco Content Connector for AWS S3 5.0 | Adds support for AWS Glacier using Cloud storage layer. |
| Alfresco Content Connector for Azure 3.1 | |
| Alfresco Content Connector for Azure 3.0 | |
| Alfresco Content Connector for Salesforce 2.3.4 and later | |
| Alfresco Content Connector for SAP applications 5.3 | |
| Alfresco Content Connector for SAP applications 5.2 | |
| Alfresco Content Connector for SAP applications 5.1.1 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Collaboration Connector for Microsoft 365 1.1.3 | |
| Alfresco Collaboration Connector for Teams 1.1 | |
| Alfresco Outlook Integration 2.9 | |
| Alfresco Office Services 1.4.1 | |
| Alfresco Google Docs Integration 3.3 | |
| Alfresco Google Docs Integration 3.2.2 | |
| Alfresco Content Services SDK 5.1 | |
| Alfresco Content Services SDK 4.4 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.4 | |
| Alfresco Digital Workspace 3.0 | |
| Alfresco Digital Workspace 2.9 | |
| Alfresco Digital Workspace 2.8 | |
| Alfresco Digital Workspace 2.7 | |
| Alfresco Control Center 7.5 | |
| Alfresco Control Center 7.4 | |
| Alfresco Control Center 7.3 | |
| Alfresco Control Center 7.2 | |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Mobile Workspace 1.8 | |
| Alfresco Mobile Workspace 1.7 | |
| Alfresco Mobile Workspace 1.6 | |
| Alfresco Mobile Workspace 1.5 | |
| Alfresco Mobile Workspace 1.4 | |
| Alfresco Mobile Workspace 1.2 | |
| Alfresco Content Accelerator (ACA) 3.6 | |
| Alfresco Content Accelerator (ACA) 3.4.5 | |
| Alfresco Enterprise Viewer (AEV) 3.6 | |
| Alfresco Enterprise Viewer (AEV) 3.3.6 | |
| | |
| **Components** | |
| ImageMagick v7.1.0-16 | |
| LibreOffice v7.2.5 | |

{% endcapture %}

{% capture seven-two-zero %}

> **Note:** Information for this Service Pack is provided for reference only. Please use the latest Service Pack.

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 8.4 x64 | |
| Red Hat Enterprise Linux 8.2 x64 | |
| Windows Server 2019 | |
| Amazon Linux | v2 |
| CentOS 7.9 x64 | |
| CentOS 8.3 x64 | |
| Ubuntu 20.04 | |
| Ubuntu 18.04 | |
|  |  |
| **Databases** | |
| MySQL 8 | `mysql-connector-java-8.0.27.jar` |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2019 | `mssql-jdbc-9.2.1.jre11.jar` |
| MS SQL Server 2017 | Microsoft JDBC Driver `7.2.2.jre11` for SQL Server. See [JDBC Driver](https://docs.microsoft.com/en-us/sql/connect/jdbc/system-requirements-for-the-jdbc-driver?view=sql-server-ver15){:target="_blank"} for supported versions. |
| Oracle 19c | `Ojdbc8.jar – 19.11.0.0` |
| PostgreSQL 13.3 | `Postgresql-42.3.2.jar` |
| PostgreSQL 12.7 | |
| PostgreSQL 12.4 | `Postgresql-42.2.18.jar` |
| PostgreSQL 11.12 | |
| PostgreSQL 11.7 | |
| MariaDB 10.6 | |
| MariaDB 10.5 | `MariaDB Connector/J 2.7.2` |
| MariaDB 10.4 | `MariaDB Connector/J 2.7.1`|
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.16.1 | |
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
| OpenJDK 11.0.13 | |
| Amazon Corretto 11 | |
| | |
| **Third party integrations** | |
| Microsoft 365 | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| | |
| **Services** | |
| Alfresco Governance Services 7.2 | |
| Alfresco Process Services 2.4 | |
| Alfresco Process Services 2.3 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.11.1 | Additional compatibility testing was done with ACS 7.1, 7.2, 7.3, and 7.4. |
| Alfresco Sync Service 3.8 | |
| Alfresco Sync Service 3.7 | |
| Alfresco Sync Service 3.6 | |
| Alfresco Desktop Sync 1.18 | |
| Alfresco Desktop Sync 1.17 | |
| Alfresco Desktop Sync 1.16 | |
| Alfresco Desktop Sync 1.15 | |
| Alfresco Desktop Sync 1.14 | |
| Alfresco Desktop Sync 1.13 | |
| Alfresco Desktop Sync 1.12 | |
| Alfresco Desktop Sync 1.11 | |
| Alfresco Desktop Sync 1.10 | |
| Alfresco Desktop Sync 1.9 | |
| Alfresco Transform Service 2.1.1 | Additional compatibility testing was done with ACS 7.1, 7.2, 7.3, and 7.4. |
| Alfresco Transform Service 2.0 | |
| Alfresco Transform Service 1.5.2 | |
| Alfresco Document Transformation Engine 2.4 | |
| Alfresco Search Enterprise 3.1 | For information about migrating from Alfresco Search and Insight Engine 2.0 or Alfresco Search Services 2.0, see the [Alfresco Search Enterprise 3.x upgrade page]({% link search-enterprise/latest/upgrade/index.md %}). |
| Alfresco Search and Insight Engine 2.0.3 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. |
| Alfresco Search Services 2.0.3 | |
| Alfresco Federation Services 2.1 | |
| Identity Service 1.8 | The Identity Service is sunset from September 1, 2024. We recommend using Keycloak with the latest Service Pack instead of the Identity Service. |
| Identity Service 1.7 | The Identity Service is sunset from September 1, 2024. We recommend using Keycloak with the latest Service Pack instead of the Identity Service. |
| SAML Module for Alfresco Content Services 1.2.2 | |
| Alfresco Intelligence Services 1.4.4 | |
| Alfresco Intelligence Services 1.4.2 | |
| Alfresco Content Connector for AWS S3 5.1 | |
| Alfresco Content Connector for AWS S3 5.0 | Adds support for AWS Glacier using Cloud storage layer. |
| Alfresco Content Connector for Azure 3.1 | |
| Alfresco Content Connector for Azure 3.0 | |
| Alfresco Content Connector for Salesforce 2.3.4 and later | |
| Alfresco Content Connector for SAP applications 5.3 | |
| Alfresco Content Connector for SAP applications 5.2 | |
| Alfresco Content Connector for SAP applications 5.1.1 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Collaboration Connector for Microsoft 365 1.1.1 | |
| Alfresco Collaboration Connector for Teams 1.0 | |
| Alfresco Outlook Integration 2.9 | |
| Alfresco Office Services 1.4.1 | |
| Alfresco Google Docs Integration 3.3 | |
| Alfresco Google Docs Integration 3.2.2 | |
| Alfresco Content Services SDK 5.1 | |
| Alfresco Content Services SDK 4.4 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.4 | |
| Alfresco Digital Workspace 3.0 | |
| Alfresco Digital Workspace 2.9 | |
| Alfresco Digital Workspace 2.8 | |
| Alfresco Digital Workspace 2.7 | |
| Alfresco Control Center 7.5 | |
| Alfresco Control Center 7.4 | |
| Alfresco Control Center 7.3 | |
| Alfresco Control Center 7.2 | |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Mobile Workspace 1.8 | |
| Alfresco Mobile Workspace 1.7 | |
| Alfresco Mobile Workspace 1.6 | |
| Alfresco Mobile Workspace 1.5 | |
| Alfresco Mobile Workspace 1.4 | |
| Alfresco Mobile Workspace 1.2 | |
| Alfresco Content Accelerator (ACA) 3.6 | |
| Alfresco Content Accelerator (ACA) 3.4.5 | |
| Alfresco Enterprise Viewer (AEV) 3.6 | |
| Alfresco Enterprise Viewer (AEV) 3.3.6 | |
| | |
| **Components** | |
| ImageMagick v7.1.0-16 | |
| LibreOffice v7.2.5 | |

{% endcapture %}

{% include tabs.html tableid="supported-platforms" opt1="7.2.2" content1=seven-two-two opt2="7.2.1 (reference only)" content2=seven-two-one opt3="7.2.0 (reference only)" content3=seven-two-zero %}
