---
title: Supported platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Content Services.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please contact [Support](https://support.alfresco.com){:target="_blank"}.

{% capture six-two-two %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 7.6 x64 | |
| Windows Server 2019 | |
| Windows Server 2016 | |
| Amazon Linux | |
| CentOS 7 x64| |
| Ubuntu 18.04 | |
| SUSE 12.0 SP1 x64 |
|  |  |
| **Databases** | |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2017 | `mssql-jdbc-7.2.2.jre11.jar` |
| Oracle 19c | |
| Oracle 18c | |
| Oracle 12c | `OJDBC8.jar – 12.2.0.1` or `OJDBC7.jar – 12.1.0.2` |
| PostgreSQL 11.7 | `Postgresql-42.2.14.jar` |
| PostgreSQL 11.4 | `Postgresql-42.2.6.jar` |
| PostgreSQL 10.9 | `Postgresql-42.2.1.jar` |
| MariaDB 10.2.18 | `mariadb-java-client-2.2.5.jar` |
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.15.8 | |
| | |
| **Application servers** | |
| Tomcat 8.5.43 | |
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
| OpenJDK 11.0.1 | |
| Oracle JDK 11.0.1 | |
| | |
| **Third party integrations** | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| MS Office 2013 | |
| | |
| **Services** | |
| Alfresco Governance Services 3.4.1 | |
| Alfresco Governance Services 3.4.0 | |
| Alfresco Governance Services 3.3.1 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.3 | |
| Alfresco Desktop Sync 1.10 | |
| Alfresco Desktop Sync 1.9 | |
| Alfresco Desktop Sync 1.8 | |
| Alfresco Desktop Sync 1.7 | |
| Alfresco Desktop Sync 1.6 | |
| Alfresco Transform Service 1.5 | |
| Alfresco Transform Service 1.4 | |
| Alfresco Transform Service 1.3 | |
| Alfresco Document Transformation Engine 2.2.2 | |
| Alfresco Media Management 1.4.3 | |
| Alfresco Media Management 1.4.2 | |
| Alfresco Search and Insight Engine 2.0 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search and Insight Engine 1.4 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search Services 2.0 | |
| Alfresco Search Services 1.4 | |
| Alfresco Federation Services 2.0 | |
| Alfresco Federation Services 1.1 | |
| Alfresco Federation Services 1.0 | |
| Identity Service 1.3 | Alfresco Content Services 6.2 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| SAML Module for Alfresco Content Services 1.2.1 | |
| Alfresco Intelligence Services 1.2 | |
| Alfresco Content Connector for AWS S3 3.1 | Only compatible with Alfresco Media Management 1.4.2 or above. |
| Alfresco Content Connector for AWS S3 3.0 | |
| Alfresco Content Connector for Azure 1.2 | |
| Alfresco Content Connector for Azure 1.1 | |
| Alfresco Content Connector for AWS Glacier 2.1 | Only compatible with Alfresco Content Connector for AWS S3 3.1 or above. |
| Alfresco Content Connector for AWS Glacier 2.0 | Only compatible with Alfresco Content Connector for AWS S3 3.0 and below. |
| Alfresco Content Connector for EMC Centera 2.2.1 | |
| Alfresco Content Connector for Salesforce 2.3 | |
| Alfresco Content Connector for Salesforce 2.2 | |
| Alfresco Content Connector for Salesforce 2.1 | |
| Alfresco Content Connector for SAP applications 5.2 | |
| Alfresco Content Connector for SAP applications 5.1 | |
| Alfresco Content Connector for SAP applications 5.0 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Content Connector for SAP Cloud 1.1 | |
| Alfresco Content Connector for SAP Cloud 1.0 | |
| Alfresco Collaboration Connector for Microsoft 365 1.0 | |
| Alfresco Outlook Integration 2.7 | |
| Alfresco Office Services 1.3.2 | |
| Alfresco Office Services 1.3 | |
| Alfresco Google Docs Integration 3.2 | |
| Alfresco Enterprise Viewer 3.3 | |
| Alfresco Enterprise Viewer 3.2 | |
| Alfresco Content Accelerator 3.4 | |
| Alfresco Content Services SDK 4 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 2.0 | |
| Alfresco Digital Workspace 1.6 | |
| Alfresco Digital Workspace 1.5 | |
| Alfresco Digital Workspace 1.4 | |
| Alfresco Digital Workspace 1.3 | |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Application Development Framework (ADF) 3.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Mobile Workspace 1.4 | |
| | |
| **Components** | |
| ImageMagick v7.0.10 | |
| VMWare ESXi | Support from ESXi 5.0 (as long as the ESXi version supports the guest OS) |
| LibreOffice v6.3.5 | |

{% endcapture %}
{% capture six-two-one %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 7.6 x64 | |
| Windows Server 2019 | |
| Windows Server 2016 | |
| Amazon Linux | |
| CentOS 7 x64| |
| Ubuntu 18.04 | |
| SUSE 12.0 SP1 x64 |
| | |
| **Databases** | |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2017 | `mssql-jdbc-7.2.2.jre11.jar` |
| Oracle 19c | |
| Oracle 18c | |
| Oracle 12c | `OJDBC8.jar – 12.2.0.1` or `OJDBC7.jar – 12.1.0.2` |
| PostgreSQL 11.4 | `Postgresql-42.2.6.jar` |
| PostgreSQL 10.9 | `Postgresql-42.2.1.jar` |
| MariaDB 10.2.18 | `mariadb-java-client-2.2.5.jar` |
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.15.8 | |
| | |
| **Application servers** | |
| Tomcat 8.5.43 | |
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
| OpenJDK 11.0.1 | |
| Oracle JDK 11.0.1 | |
| | |
| **Third party integrations** | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| MS Office 2013 | |
| | |
| **Services** | |
| Alfresco Governance Services 3.4.1 | |
| Alfresco Governance Services 3.3.1 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.3 | |
| Alfresco Sync Service 3.2 | |
| Alfresco Desktop Sync 1.10 | |
| Alfresco Desktop Sync 1.9 | |
| Alfresco Desktop Sync 1.8 | |
| Alfresco Desktop Sync 1.7 | |
| Alfresco Desktop Sync 1.6 | |
| Alfresco Desktop Sync 1.5 | |
| Alfresco Desktop Sync 1.4 | |
| Alfresco Desktop Sync 1.3 | |
| Alfresco Transform Service 1.2 | |
| Alfresco Transform Service 1.1 | |
| Alfresco Document Transformation Engine 2.2.2 | |
| Alfresco Search and Insight Engine 2.0 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search and Insight Engine 1.4 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search Services 2.0 | |
| Alfresco Search Services 1.4 | |
| Alfresco Federation Services 2.0 | |
| Alfresco Federation Services 1.1 | |
| Alfresco Federation Services 1.0 | |
| Identity Service 1.3 | Alfresco Content Services 6.2 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| Identity Service 1.2 | Alfresco Content Services 6.2 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| Identity Service 1.1 | Alfresco Content Services 6.2 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| SAML Module for Alfresco Content Services 1.2.0 | |
| Alfresco Intelligence Services 1.1 | |
| Alfresco Content Connector for AWS S3 3.1 | Only compatible with Alfresco Media Management 1.4.2 or above. |
| Alfresco Content Connector for AWS S3 3.0 | |
Alfresco Content Connector for Azure 1.1 | |
| Alfresco Content Connector for Azure 1.0 | |
| Alfresco Content Connector for AWS Glacier 2.1 | Only compatible with Alfresco Content Connector for AWS S3 3.1 or above. |
| Alfresco Content Connector for AWS Glacier 2.0 | Only compatible with Alfresco Content Connector for AWS S3 3.0 and below. |
| Alfresco Content Connector for EMC Centera 2.2.1 | |
| Alfresco Content Connector for Salesforce 2.2 | |
| Alfresco Content Connector for Salesforce 2.1 | |
| Alfresco Content Connector for SAP applications 5.2 | |
| Alfresco Content Connector for SAP applications 5.1 | |
| Alfresco Content Connector for SAP applications 5.0 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Content Connector for SAP Cloud 1.1 | |
| Alfresco Content Connector for SAP Cloud 1.0 | |
| Alfresco Outlook Integration 2.7 | |
| Alfresco Outlook Integration 2.6.1 | |
| Alfresco Office Services 1.3 | |
| Alfresco Google Docs Integration 3.2 | |
| Alfresco Google Docs Integration 3.1 | |
| Alfresco Enterprise Viewer 3.3 | |
| Alfresco Enterprise Viewer 3.2 | |
| Alfresco Content Accelerator 3.4 | |
| Alfresco Content Services SDK 4 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 1.6 | |
| Alfresco Digital Workspace 1.5 | |
| Alfresco Digital Workspace 1.4 | |
| Alfresco Digital Workspace 1.3 | |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Application Development Framework (ADF) 3.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| | |
| **Components** | |
| ImageMagick v7.0.7 | |
| VMWare ESXi | Support from ESXi 5.0 (as long as the ESXi version supports the guest OS) |
| LibreOffice v6.3.5 | |

{% endcapture %}
{% capture six-two-zero %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 7.6 x64 | |
| Windows Server 2019 | |
| Windows Server 2016 | |
| Amazon Linux | |
| CentOS 7 x64| |
| Ubuntu 18.04 | |
| SUSE 12.0 SP1 x64 |
| | |
| **Databases** | |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2017 | `mssql-jdbc-7.2.2.jre11.jar` |
| Oracle 19c | |
| Oracle 18c | |
| Oracle 12c | `OJDBC8.jar – 12.2.0.1` or `OJDBC7.jar – 12.1.0.2` |
| PostgreSQL 11.4 | `Postgresql-42.2.6.jar` |
| PostgreSQL 10.9 | `Postgresql-42.2.1.jar` |
| MariaDB 10.2.18 | `mariadb-java-client-2.2.5.jar` |
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Message brokers** | |
| ActiveMQ v5.15.8 | |
| | |
| **Application servers** | |
| Tomcat 8.5.43 | |
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
| OpenJDK 11.0.1 | |
| Oracle JDK 11.0.1 | |
| | |
| **Third party integrations** | |
| MS Office 2016 | Microsoft Office for Mac does not support Kerberos authentication. |
| MS Office 2013 | |
| | |
| **Services** | |
| Alfresco Governance Services 3.3.0 | |
| Alfresco Governance Services 3.2 | |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.3 | |
| Alfresco Sync Service 3.2 | |
| Alfresco Desktop Sync 1.10 | |
| Alfresco Desktop Sync 1.9 | |
| Alfresco Desktop Sync 1.8 | |
| Alfresco Desktop Sync 1.7 | |
| Alfresco Desktop Sync 1.6 | |
| Alfresco Desktop Sync 1.5 | |
| Alfresco Desktop Sync 1.4 | |
| Alfresco Desktop Sync 1.3 | |
| Alfresco Transform Service 1.1 | |
| Alfresco Document Transformation Engine 2.2.2 | |
| Alfresco Media Management 1.4.0 | |
| Alfresco Search and Insight Engine 1.4 | Search and Insight Engine 1.4 is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search Services 1.4 | |
| Alfresco Federation Services 2.0 | |
| Alfresco Federation Services 1.1 | |
| Alfresco Federation Services 1.0 | |
| Identity Service 1.2 | Alfresco Content Services 6.2 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| Identity Service 1.1 | Alfresco Content Services 6.2 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| SAML Module for Alfresco Content Services 1.2.0 | |
| Alfresco Intelligence Services 1.1 | |
| Alfresco Content Connector for AWS S3 3.1 | Only compatible with Alfresco Media Management 1.4.2 or above. |
| Alfresco Content Connector for AWS S3 3.0 | |
| Alfresco Content Connector for Azure 1.0 | |
| Alfresco Content Connector for AWS Glacier 2.1 | Only compatible with Alfresco Content Connector for AWS S3 3.1 or above. |
| Alfresco Content Connector for AWS Glacier 2.0 | Only compatible with Alfresco Content Connector for AWS S3 3.0 and below. |
| Alfresco Content Connector for EMC Centera 2.2.1 | |
| Alfresco Content Connector for Salesforce 2.1 | |
| Alfresco Content Connector for SAP applications 5.2 | |
| Alfresco Content Connector for SAP applications 5.1 | |
| Alfresco Content Connector for SAP applications 5.0 | |
| Alfresco Content Connector for SAP Cloud 1.2 | |
| Alfresco Content Connector for SAP Cloud 1.1 | |
| Alfresco Content Connector for SAP Cloud 1.0 | |
| Alfresco Outlook Integration 2.7 | |
| Alfresco Outlook Integration 2.6.1 | |
| Alfresco Office Services 1.3 | |
| Alfresco Google Docs Integration 3.1 | |
| Alfresco Enterprise Viewer 3.3 | |
| Alfresco Enterprise Viewer 3.2 | |
| Alfresco Content Accelerator 3.4 | |
| Alfresco Content Services SDK 4 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 1.6 | |
| Alfresco Digital Workspace 1.5 | |
| Alfresco Digital Workspace 1.4 | |
| Alfresco Digital Workspace 1.3 | |
| Alfresco Application Development Framework (ADF) 4.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| Alfresco Application Development Framework (ADF) 3.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| | |
| **Components** | |
| ImageMagick v7.0.7 | |
| VMWare ESXi | Support from ESXi 5.0 (as long as the ESXi version supports the guest OS) |
| LibreOffice v6.1.6 | |

{% endcapture %}

{% include tabs.html tableid="supported-platforms" opt1="6.2.2" content1=six-two-two opt2="6.2.1" content2=six-two-one opt3="6.2.0" content3=six-two-zero %}
