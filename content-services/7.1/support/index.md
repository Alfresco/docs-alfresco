---
title: Supported platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Content Services 7.1.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please [contact Support]({% link support/latest/contact.md %}).

{% capture seven-one-one %}

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
| **Container Orchestration** | |
| Kubernetes 1.27 | Tested with [ACS Helm chart](https://alfresco.github.io/acs-deployment/helm/alfresco-content-services/README.html) 8.1.0 |
| Amazon EKS 1.26 | Tested with [ACS Helm chart](https://alfresco.github.io/acs-deployment/helm/alfresco-content-services/README.html) 8.1.0 |
|  |  |
| **Databases** | |
| MySQL 8 | `mysql-connector-java-8.0.22.jar` |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2019 | `mssql-jdbc-8.4.1.jre11.jar` |
| MS SQL Server 2017 | Microsoft JDBC Driver `7.2.2.jre11` for SQL Server. See [JDBC Driver](https://docs.microsoft.com/en-us/sql/connect/jdbc/system-requirements-for-the-jdbc-driver?view=sql-server-ver15){:target="_blank"} for supported versions. |
| Oracle 12c | `Ojdbc8.jar – 12.2.0.1` |
| Oracle 19c | `Ojdbc8.jar – 19.3.0.0` |
| PostgreSQL 13.3 | `Postgresql-42.2.19.jar` |
| PostgreSQL 12.7 | |
| PostgreSQL 12.4 | `Postgresql-42.2.18.jar` |
| PostgreSQL 11.12 | |
| MariaDB 10.6 | |
| MariaDB 10.5 | `MariaDB Connector/J 2.7.2` |
| MariaDB 10.4 | `MariaDB Connector/J 2.7.1`|
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.16 | |
| | |
| **Application servers** | |
| Tomcat 9 | |
| | |
| **Clients** | |
| Windows 10 | |
| Windows 7 x64 | |
| Mac OSX 10.12 | |
| | |
| **Browsers** | |
| Mozilla Firefox | |
| Microsoft Edge | |
| MS Internet Explorer 11 | |
| Chrome | Includes Chromium edition. |
| Safari 14 | |
| | |
| **Java** | |
| OpenJDK 11.0.7 | |
| Amazon Corretto 11 | |
| | |
| **Third party integrations** | |
| Microsoft 365 | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| | |
| **Services** | |
| Alfresco Governance Services 7.1 | |
| Alfresco Process Services 2.0.1 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.11.1 | Additional compatibility testing was done with ACS 7.1, 7.2, 7.3, and 7.4. |
| Alfresco Sync Service 3.7 | |
| Alfresco Sync Service 3.6 | |
| Alfresco Sync Service 3.5 | |
| Alfresco Desktop Sync 1.13.0 | |
| Alfresco Desktop Sync 1.12 | |
| Alfresco Desktop Sync 1.11 | |
| Alfresco Desktop Sync 1.10 | |
| Alfresco Desktop Sync 1.9 | |
| Alfresco Desktop Sync 1.8 | |
| Alfresco Transform Service 2.1.1 | Additional compatibility testing was done with ACS 7.1, 7.2, 7.3, and 7.4. |
| Alfresco Transform Service 1.5.1 | |
| Alfresco Document Transformation Engine 2.4 | |
| Alfresco Document Transformation Engine 2.3 | |
| Alfresco Search Enterprise 3.0 | For information about migrating from Alfresco Search and Insight Engine 2.0 or Alfresco Search Services 2.0, see the [Alfresco Search Enterprise 3.0 upgrade page]({% link search-enterprise/3.0/upgrade/index.md %}). |
| Alfresco Search and Insight Engine 2.0 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. |
| Alfresco Search Services 2.0 | |
| Alfresco Federation Services 2.1 | |
| Identity Service 1.7 | |
| Identity Service 1.6 | |
| SAML Module for Alfresco Content Services 1.2.2 | |
| Alfresco Intelligence Services 1.4 | |
| Alfresco Content Connector for AWS S3 4.1 | |
| Alfresco Content Connector for Azure 2.1 | |
| Alfresco Content Connector for AWS Glacier 2.2 | |
| Alfresco Content Connector for Salesforce 2.3 | |
| Alfresco Content Connector for SAP applications 5.3 | |
| Alfresco Content Connector for SAP applications 5.2 | |
| Alfresco Content Connector for SAP applications 5.1 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Collaboration Connector for Microsoft 365 1.1.1 | |
| Alfresco Collaboration Connector for Teams 1.1 | |
| Alfresco Collaboration Connector for Teams 1.0 | |
| Alfresco Outlook Integration 2.9 | |
| Alfresco Outlook Integration 2.8.1 | |
| Alfresco Office Services 1.4 | |
| Alfresco Google Docs Integration 3.2.2 | |
| Alfresco Google Docs Integration 3.2.1 | |
| Alfresco Enterprise Viewer 3.3.5 | |
| Alfresco Content Accelerator 3.4.4 | |
| Alfresco Content Services SDK 5.1 | |
| Alfresco Content Services SDK 4.3 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.4 | |
| Alfresco Digital Workspace 2.6 | |
| Alfresco Digital Workspace 2.5 | |
| Alfresco Digital Workspace 2.4 | |
| Alfresco Application Development Framework (ADF) 5.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Mobile Workspace 1.8 | |
| Alfresco Mobile Workspace 1.7 | |
| Alfresco Mobile Workspace 1.6 | |
| Alfresco Mobile Workspace 1.5 | |
| Alfresco Mobile Workspace 1.4 | |
| Alfresco Mobile Workspace 1.2 | |
| Alfresco Mobile Workspace 1.1 | |
| | |
| **Components** | |
| ImageMagick v7.1.0-16 | |
| LibreOffice v7.0.6 | |

{% endcapture %}
{% capture seven-one-zero %}

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
| MySQL 8 | `mysql-connector-java-8.0.22.jar` |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2019 | `mssql-jdbc-8.4.1.jre11.jar` |
| MS SQL Server 2017 | Microsoft JDBC Driver `7.2.2.jre11` for SQL Server. See [JDBC Driver](https://docs.microsoft.com/en-us/sql/connect/jdbc/system-requirements-for-the-jdbc-driver?view=sql-server-ver15){:target="_blank"} for supported versions. |
| Oracle 12c | `Ojdbc8.jar – 12.2.0.1` |
| Oracle 19c | `Ojdbc8.jar – 19.3.0.0` |
| PostgreSQL 13.3 | `Postgresql-42.2.19.jar` |
| PostgreSQL 12.7 | |
| PostgreSQL 12.4 | `Postgresql-42.2.18.jar` |
| PostgreSQL 11.12 | |
| MariaDB 10.6 | |
| MariaDB 10.5 | `MariaDB Connector/J 2.7.2` |
| MariaDB 10.4 | `MariaDB Connector/J 2.7.1`|
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.16 | |
| | |
| **Application servers** | |
| Tomcat 9 | |
| | |
| **Clients** | |
| Windows 10 | |
| Windows 7 x64 | |
| Mac OSX 10.12 | |
| | |
| **Browsers** | |
| Mozilla Firefox | |
| Microsoft Edge | |
| MS Internet Explorer 11 | |
| Chrome | Includes Chromium edition. |
| Safari 14 | |
| | |
| **Java** | |
| OpenJDK 11.0.7 | |
| Amazon Corretto 11 | |
| | |
| **Third party integrations** | |
| Microsoft 365 | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| | |
| **Services** | |
| Alfresco Governance Services 7.1 | |
| Alfresco Process Services 2.0.1 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.11.1 | Additional compatibility testing was done with ACS 7.1, 7.2, 7.3, and 7.4. |
| Alfresco Sync Service 3.7 | |
| Alfresco Sync Service 3.6 | |
| Alfresco Sync Service 3.5 | |
| Alfresco Desktop Sync 1.13.0 | |
| Alfresco Desktop Sync 1.12 | |
| Alfresco Desktop Sync 1.11 | |
| Alfresco Desktop Sync 1.10 | |
| Alfresco Desktop Sync 1.9 | |
| Alfresco Desktop Sync 1.8 | |
| Alfresco Transform Service 2.1.1 | Additional compatibility testing was done with ACS 7.1, 7.2, 7.3, and 7.4. |
| Alfresco Transform Service 1.5.1 | |
| Alfresco Transform Service 1.4.1 | |
| Alfresco Document Transformation Engine 2.4 | |
| Alfresco Document Transformation Engine 2.3 | |
| Alfresco Search Enterprise 3.1 | For information about migrating from Alfresco Search and Insight Engine 2.x or Alfresco Search Services 2.x, see the [Alfresco Search Enterprise 3.1 upgrade page]({% link search-enterprise/latest/upgrade/index.md %}). |
| Alfresco Search Enterprise 3.0 | For information about migrating from Alfresco Search and Insight Engine 2.0 or Alfresco Search Services 2.0, see the [Alfresco Search Enterprise 3.0 upgrade page]({% link search-enterprise/3.0/upgrade/index.md %}). |
| Alfresco Search and Insight Engine 2.0 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. |
| Alfresco Search Services 2.0 | |
| Alfresco Federation Services 2.1 | |
| Identity Service 1.8 | |
| Identity Service 1.7 | |
| Identity Service 1.6 | |
| SAML Module for Alfresco Content Services 1.2.2 | |
| Alfresco Intelligence Services 1.4 | |
| Alfresco Content Connector for AWS S3 4.1 | |
| Alfresco Content Connector for Azure 2.1 | |
| Alfresco Content Connector for AWS Glacier 2.2 | |
| Alfresco Content Connector for Salesforce 2.3 | |
| Alfresco Content Connector for SAP applications 5.3 | |
| Alfresco Content Connector for SAP applications 5.2 | |
| Alfresco Content Connector for SAP applications 5.1 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Collaboration Connector for Microsoft 365 1.1.1 | |
| Alfresco Collaboration Connector for Teams 1.0 | |
| Alfresco Outlook Integration 2.9 | |
| Alfresco Outlook Integration 2.8.1 | |
| Alfresco Office Services 1.4 | |
| Alfresco Google Docs Integration 3.2.1 | |
| Alfresco Enterprise Viewer 3.3.5 | |
| Alfresco Content Accelerator 3.4.4 | |
| Alfresco Content Services SDK 5.1 | |
| Alfresco Content Services SDK 4.3 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.4 | |
| Alfresco Digital Workspace 2.6 | |
| Alfresco Digital Workspace 2.5 | |
| Alfresco Digital Workspace 2.4 | |
| Alfresco Application Development Framework (ADF) 5.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Mobile Workspace 1.8 | |
| Alfresco Mobile Workspace 1.7 | |
| Alfresco Mobile Workspace 1.6 | |
| Alfresco Mobile Workspace 1.5 | |
| Alfresco Mobile Workspace 1.4 | |
| Alfresco Mobile Workspace 1.2 | |
| Alfresco Mobile Workspace 1.1 | |
| | |
| **Components** | |
| ImageMagick v7.0.10 | |
| LibreOffice v7.0.6 | |

{% endcapture %}

{% include tabs.html tableid="supported-platforms" opt1="7.1.1" content1=seven-one-one opt2="7.1.0" content2=seven-one-zero %}
