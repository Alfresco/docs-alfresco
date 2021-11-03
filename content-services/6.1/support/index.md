---
title: Supported platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Content Services.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please contact [Support](https://support.alfresco.com){:target="_blank"}.

{% capture six-one-one %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 7.4 x64 | |
| Windows Server 2016 | |
| Amazon Linux | |
| CentOS 7 x64| |
| Ubuntu 18.04 | |
| SUSE 12.0 SP1 x64 |
|  |  |
| **Databases** | |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2017 | Microsoft JDBC Driver 7.0 or 7.1 for SQL Server. |
| Oracle 19c | |
| Oracle 18c | |
| Oracle 12c | `OJDBC8.jar – 12.2.0.1` or `OJDBC7.jar – 12.1.0.2`  |
| PostgreSQL 11.4 | `Postgresql-42.2.6.jar` |
| PostgreSQL 10.9 | `Postgresql-42.2.1.jar` |
| MariaDB 10.2.18 | `mariadb-java-client-2.2.5.jar` |
| Amazon Aurora | `mariadb-java-client-2.2.5.jar` |
| | |
| **Message brokers** | |
| ActiveMQ v5.15.6 | |
| | |
| **Application servers** | |
| Tomcat 8.5.34 | |
| | |
| **Clients** | |
| Windows 10 | |
| Windows 7 x64 | |
| Mac OSX 10.12 | |
| | |
| **Browsers** | |
| Mozilla Firefox | |
| Microsoft Edge | Whilst we don't expect issues with the Chromium Edition of Microsoft Edge on this version of Content Services, please note that we have only tested, certified, and support it's use from Content Services 6.2.1. |
| MS Internet Explorer 11 | |
| Chrome | |
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
| Alfresco Governance Services 3.2 | To use Governance Services with Search and Insight Engine you must use Governance Services 3.2 or above with Content Services 6.1.1 or later. |
| Alfresco Governance Services 3.1 | Search and Insight Engine cannot be used with Governance Services 3.1.0 or earlier. |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.1.2 | |
| Alfresco Desktop Sync 1.6 | |
| Alfresco Desktop Sync 1.5 | |
| Alfresco Desktop Sync 1.4 | |
| Alfresco Desktop Sync 1.3 | |
| Alfresco Desktop Sync 1.2 | |
| Alfresco Desktop Sync 1.1.1 | |
| Alfresco Transform Service 1.0 | |
| Alfresco Document Transformation Engine 2.2.2 | |
| Alfresco Media Management 1.3 | |
| Alfresco Search and Insight Engine 1.4 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search and Insight Engine 1.1 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search and Insight Engine 1.0 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search Services 1.4 | |
| Alfresco Search Services 1.3.0.5 | |
| Alfresco Federation Services 2.0 | |
| Alfresco Federation Services 1.1 | |
| Alfresco Federation Services 1.0 | |
| Identity Service 1.3 | Content Services 6.1.1 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| Identity Service 1.2 | Content Services 6.1.1 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| Identity Service 1.1 | Content Services 6.1.1 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| Identity Service 1.0 | Content Services 6.1.1 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| SAML Module for Alfresco Content Services 1.1.1 | |
| Alfresco Intelligence Services 1.0 | |
| Alfresco Content Connector for AWS S3 2.3 | |
| Alfresco Content Connector for AWS S3 2.2.1 | |
| Alfresco Content Connector for AWS Glacier 1.0 | |
| Alfresco Content Connector for EMC Centera 2.2.1 | |
| Alfresco Content Connector for Salesforce 2.1 | |
| Alfresco Content Connector for SAP applications 5.1 | |
| Alfresco Content Connector for SAP applications 5.0 | |
| Alfresco Outlook Integration 2.7 | |
| Alfresco Outlook Integration 2.6 | |
| Alfresco Outlook Integration 2.5.1 | |
| Alfresco Office Services 1.3 | |
| Alfresco Google Docs Integration 3.1 | |
| Alfresco Enterprise Viewer 3.3 | |
| Alfresco Enterprise Viewer 3.2 | |
| Alfresco Content Accelerator 3.4 | |
| Alfresco Content Services SDK 4 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 1.4 | |
| Alfresco Digital Workspace 1.3 | |
| Alfresco Digital Workspace 1.2 | |
| Alfresco Digital Workspace 1.1 | |
| Alfresco Digital Workspace 1.0 | |
| Alfresco Application Development Framework (ADF) 3.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| | |
| **Components** | |
| ImageMagick v7.0.7 | |
| VMWare ESXi | Support from ESXi 5.0 (as long as the ESXi version supports the guest OS) |
| LibreOffice v6.1.6 | |

{% endcapture %}
{% capture six-one-zero %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 7.4 x64 | |
| Windows Server 2016 | |
| Amazon Linux | |
| CentOS 7 x64| |
| Ubuntu 18.04 | |
| SUSE 12.0 SP1 x64 |
| | |
| **Databases** | |
| MySQL 5.7.23 | `mysql-connector-java-5.1.40-bin.jar` |
| MS SQL Server 2017 | Microsoft JDBC Driver 7.0 or 7.1 for SQL Server. |
| Oracle 12c | `OJDBC8.jar – 12.2.0.1` or `OJDBC7.jar – 12.1.0.2` |
| PostgreSQL 10.9 | `Postgresql-42.2.1.jar` |
| MariaDB 10.2.18 | `mariadb-java-client-2.2.5.jar` |
| Amazon Aurora | `mariadb-java-client-2.2.5.jar` |
| | |
| **Message brokers** | |
| ActiveMQ v5.15.6 | |
| | |
| **Application servers** | |
| Tomcat 8.5.34 | |
| | |
| **Clients** | |
| Windows 10 | |
| Windows 7 x64 | |
| Mac OSX 10.12 | |
| | |
| **Browsers** | |
| Mozilla Firefox | |
| Microsoft Edge | Whilst we don't expect issues with the Chromium Edition of Microsoft Edge on this version of Content Services, please note that we have only tested, certified, and support it's use from Content Services 6.2.1. |
| MS Internet Explorer 11 | |
| Chrome | |
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
| Alfresco Governance Services 3.2 | To use Governance Services with Search and Insight Engine you must use Governance Services 3.2 or above with Content Services 6.1.1 or later. |
| Alfresco Governance Services 3.1 | Search and Insight Engine cannot be used with Governance Services 3.1.0 or earlier. |
| | |
| **Integrations** | Check the individual documentation on prerequisites and supported platforms for each integration. |
| Alfresco Sync Service 3.1.0 | |
| Alfresco Desktop Sync 1.6 | |
| Alfresco Desktop Sync 1.5 | |
| Alfresco Desktop Sync 1.4 | |
| Alfresco Desktop Sync 1.3 | |
| Alfresco Desktop Sync 1.2 | |
| Alfresco Desktop Sync 1.1.1 | |
| Alfresco Transform Service 1.0 | |
| Alfresco Document Transformation Engine 2.2.1 | |
| Alfresco Search and Insight Engine 1.4 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search and Insight Engine 1.1 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search and Insight Engine 1.0 | Search and Insight Engine is compatible with Java 11 as long as you run Zeppelin in a Java 8 runtime. You can do this either in a VM or separate Java 8 based server. Nb. Java 11.0.9.1 and other four part Java versions are not currently compatible due to a bug in Jetty. |
| Alfresco Search Services 1.4 | |
| Alfresco Search Services 1.3.0.5 | |
| Alfresco Federation Services 2.0 | |
| Alfresco Federation Services 1.1 | |
| Alfresco Federation Services 1.0 | |
| Identity Service 1.1 | Content Services 6.1.0 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| Identity Service 1.0 | Content Services 6.1.0 supports the use of CMIS and authentication with the v1 REST APIs using the Identity Service. ADF and other modules are not currently supported for authentication. |
| SAML Module for Alfresco Content Services 1.1.1 | |
| Alfresco Intelligence Services 1.0 | |
| Alfresco Content Connector for AWS S3 2.3 | |
| Alfresco Content Connector for AWS S3 2.2.1 | |
| Alfresco Content Connector for AWS Glacier 1.0 | |
| Alfresco Content Connector for EMC Centera 2.2.1 | |
| Alfresco Content Connector for Salesforce 2.1 | |
| Alfresco Content Connector for SAP applications 5.1 | |
| Alfresco Content Connector for SAP applications 5.0 | |
| Alfresco Outlook Integration 2.7 | |
| Alfresco Outlook Integration 2.6 | |
| Alfresco Outlook Integration 2.5.1 | |
| Alfresco Office Services 1.2.2 | |
| Alfresco Google Docs Integration 3.1 | |
| Alfresco Enterprise Viewer 3.3 | |
| Alfresco Enterprise Viewer 3.2 | |
| Alfresco Content Accelerator 3.4 | |
| Alfresco Content Services SDK 4 | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 1.4 | |
| Alfresco Digital Workspace 1.3 | |
| Alfresco Digital Workspace 1.2 | |
| Alfresco Digital Workspace 1.1 | |
| Alfresco Digital Workspace 1.0 | |
| Alfresco Application Development Framework (ADF) 3.x | Some API functionality may be available only in the latest Alfresco Content Services release. |
| | |
| **Components** | |
| ImageMagick v7.0.7 | |
| VMWare ESXi | Support from ESXi 5.0 (as long as the ESXi version supports the guest OS) |
| LibreOffice v5.4.6 | |

{% endcapture %}

{% include tabs.html tableid="supported-platforms" opt1="6.1.1" content1=six-one-one opt2="6.1.0" content2=six-one-zero %}
