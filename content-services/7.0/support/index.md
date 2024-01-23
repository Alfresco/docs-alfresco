---
title: Supported platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Content Services 7.0.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please contact [Support](https://support.alfresco.com){:target="_blank"}.

{% capture seven-zero-one %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 8.2 x64 | |
| Red Hat Enterprise Linux 7.7 x64 | |
| Red Hat Enterprise Linux 7.6 x64 | |
| Windows Server 2019 | |
| Amazon Linux | v1 and v2 |
| CentOS 8 x64 | |
| CentOS 7 x64 | |
| Ubuntu 20.04 | |
| Ubuntu 18.04 | |
| SUSE 15.0 |
| SUSE 12.0 SP1 x64 |
|  |  |
| **Databases** | |
| MySQL 8 | `mysql-connector-java-8.0.22.jar` |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2019 | `mssql-jdbc-8.4.1.jre11.jar` |
| MS SQL Server 2017 | Microsoft JDBC Driver `7.2.2.jre11` for SQL Server. See [JDBC Driver](https://docs.microsoft.com/en-us/sql/connect/jdbc/system-requirements-for-the-jdbc-driver?view=sql-server-ver15){:target="_blank"} for supported versions. |
| Oracle 19c | `Ojdbc8.jar – 12.2.0.1` |
| Oracle 12c | `Ojdbc8.jar – 12.2.0.1` |
| PostgreSQL 13.1 |`Postgresql-42.2.19.jar`|
| PostgreSQL 12.4 |`Postgresql-42.2.18.jar` |
| PostgreSQL 11.7 | `Postgresql-42.2.6.jar` |
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
| Safari 11 | |
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
| Alfresco Governance Services 3.5 | |
| Alfresco Process Services 2.0 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.7 | |
| Alfresco Sync Service 3.6 | |
| Alfresco Sync Service 3.5 | |
| Alfresco Sync Service 3.4 | |
| Alfresco Desktop Sync 1.13.0 | |
| Alfresco Desktop Sync 1.12 | |
| Alfresco Desktop Sync 1.11 | |
| Alfresco Desktop Sync 1.10 | |
| Alfresco Desktop Sync 1.9 | |
| Alfresco Desktop Sync 1.8 | |
| Alfresco Desktop Sync 1.7 | |
| Alfresco Transform Service 1.4 | |
| Alfresco Transform Service 1.3.2 | |
| Alfresco Document Transformation Engine 2.4 | |
| Alfresco Document Transformation Engine 2.3 | |
| Alfresco Search and Insight Engine 2.0 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. |
| Alfresco Search Services 2.0 | |
| Alfresco Federation Services 2.1 | |
| Alfresco Federation Services 2.0 | |
| Identity Service 1.5 | Alfresco Content Services 7.0 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| Identity Service 1.4 | Alfresco Content Services 7.0 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| SAML Module for Alfresco Content Services 1.2.2 | |
| Alfresco Intelligence Services 1.3 | |
| Alfresco Content Connector for AWS S3 4.0 | |
| Alfresco Content Connector for Azure 2.0 | |
| Alfresco Content Connector for AWS Glacier 2.1 | Only compatible with Alfresco Content Connector for AWS S3 3.1 or above. |
| Alfresco Content Connector for Salesforce 2.3 | |
| Alfresco Content Connector for Salesforce 2.2.1 | |
| Alfresco Content Connector for SAP applications 5.3 | |
| Alfresco Content Connector for SAP applications 5.2 | |
| Alfresco Content Connector for SAP applications 5.1 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Content Connector for SAP Cloud 1.1 | |
| Alfresco Content Connector for SAP Cloud 1.0 | |
| Alfresco Collaboration Connector for Microsoft 365 1.1 | |
| Alfresco Outlook Integration 2.9 | |
| Alfresco Outlook Integration 2.8 | |
| Alfresco Office Services 1.4 | |
| Alfresco Google Docs Integration 3.2.1 | |
| Alfresco Enterprise Viewer 3.3.1 | |
| Alfresco Content Accelerator 3.4.3 | |
| Alfresco Content Services SDK 5 | |
| Alfresco Content Services SDK 4.2 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 2.6 | |
| Alfresco Digital Workspace 2.5 | |
| Alfresco Digital Workspace 2.4 | |
| Alfresco Digital Workspace 2.3 | |
| Alfresco Digital Workspace 2.2 | |
| Alfresco Digital Workspace 2.1 | |
| Alfresco Application Development Framework (ADF) 5.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Mobile Workspace 1.8 | |
| Alfresco Mobile Workspace 1.7 | |
| Alfresco Mobile Workspace 1.6 | |
| Alfresco Mobile Workspace 1.5 | |
| Alfresco Mobile Workspace 1.4 | |
| Alfresco Mobile Workspace 1.2 | |
| Alfresco Mobile Workspace 1.1 | |
| Alfresco Mobile Workspace 1.0 | |
| | |
| **Components** | |
| ImageMagick v7.0.10 | |
| LibreOffice v6.3.5 | |

{% endcapture %}
{% capture seven-zero-zero %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 8.2 x64 | |
| Red Hat Enterprise Linux 7.7 x64 | |
| Red Hat Enterprise Linux 7.6 x64 | |
| Windows Server 2019 | |
| Amazon Linux | v1 and v2 |
| CentOS 8 x64 | |
| CentOS 7 x64 | |
| Ubuntu 20.04 | |
| Ubuntu 18.04 | |
| SUSE 15.0 |
| SUSE 12.0 SP1 x64 |
|  |  |
| **Databases** | |
| MySQL 8 | `mysql-connector-java-8.0.22.jar` |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2019 | `mssql-jdbc-8.4.1.jre11.jar` |
| MS SQL Server 2017 | Microsoft JDBC Driver `7.2.2.jre11` for SQL Server. See [JDBC Driver](https://docs.microsoft.com/en-us/sql/connect/jdbc/system-requirements-for-the-jdbc-driver?view=sql-server-ver15){:target="_blank"} for supported versions. |
| Oracle 19c | `Ojdbc8.jar – 12.2.0.1` |
| Oracle 12c | `Ojdbc8.jar – 12.2.0.1` |
| PostgreSQL 13.1 |`Postgresql-42.2.19.jar`|
| PostgreSQL 12.4 |`Postgresql-42.2.18.jar` |
| PostgreSQL 11.7 | `Postgresql-42.2.6.jar` |
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
| Safari 11 | |
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
| Alfresco Governance Services 3.5 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.7 | |
| Alfresco Sync Service 3.6 | |
| Alfresco Sync Service 3.5 | |
| Alfresco Sync Service 3.4 | |
| Alfresco Desktop Sync 1.13.0 | |
| Alfresco Desktop Sync 1.12 | |
| Alfresco Desktop Sync 1.11 | |
| Alfresco Desktop Sync 1.10 | |
| Alfresco Desktop Sync 1.9 | |
| Alfresco Desktop Sync 1.8 | |
| Alfresco Desktop Sync 1.7 | |
| Alfresco Transform Service 1.4 | |
| Alfresco Transform Service 1.3.2 | |
| Alfresco Document Transformation Engine 2.4 | |
| Alfresco Document Transformation Engine 2.3 | |
| Alfresco Search and Insight Engine 2.0 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search Services 2.0 | |
| Alfresco Federation Services 2.1 | |
| Alfresco Federation Services 2.0 | |
| Identity Service 1.4 | Alfresco Content Services 7.0 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| SAML Module for Alfresco Content Services 1.2.1 | |
| Alfresco Intelligence Services 1.3 | |
| Alfresco Content Connector for AWS S3 4.0 | |
| Alfresco Content Connector for Azure 2.0 | |
| Alfresco Content Connector for AWS Glacier 2.1 | Only compatible with Alfresco Content Connector for AWS S3 3.1 or above. |
| Alfresco Content Connector for Salesforce 2.3 | |
| Alfresco Content Connector for Salesforce 2.2.1 | |
| Alfresco Content Connector for SAP applications 5.3 | |
| Alfresco Content Connector for SAP applications 5.2 | |
| Alfresco Content Connector for SAP applications 5.1 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Content Connector for SAP Cloud 1.1 | |
| Alfresco Content Connector for SAP Cloud 1.0 | |
| Alfresco Collaboration Connector for Microsoft 365 1.1 | |
| Alfresco Outlook Integration 2.9 | |
| Alfresco Outlook Integration 2.8 | |
| Alfresco Office Services 1.4 | |
| Alfresco Google Docs Integration 3.2.1 | |
| Alfresco Enterprise Viewer 3.3.1 | |
| Alfresco Content Accelerator 3.4.3 | |
| Alfresco Content Services SDK 5 | |
| Alfresco Content Services SDK 4.2 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 2.6 | |
| Alfresco Digital Workspace 2.5 | |
| Alfresco Digital Workspace 2.4 | |
| Alfresco Digital Workspace 2.3 | |
| Alfresco Digital Workspace 2.2 | |
| Alfresco Digital Workspace 2.1 | |
| Alfresco Application Development Framework (ADF) 5.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Mobile Workspace 1.8 | |
| Alfresco Mobile Workspace 1.7 | |
| Alfresco Mobile Workspace 1.6 | |
| Alfresco Mobile Workspace 1.5 | |
| Alfresco Mobile Workspace 1.4 | |
| Alfresco Mobile Workspace 1.2 | |
| Alfresco Mobile Workspace 1.1 | |
| Alfresco Mobile Workspace 1.0 | |
| | |
| **Components** | |
| ImageMagick v7.0.10 | |
| LibreOffice v6.3.5 | |

{% endcapture %}

{% include tabs.html tableid="supported-platforms" opt1="7.0.1" content1=seven-zero-one opt2="7.0.0" content2=seven-zero-zero %}
