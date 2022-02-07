---
title: Supported Platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Content Services.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please contact our Support team [https://support.alfresco.com](https://support.alfresco.com){:target="_blank"}.

**Operating Systems**

|Server|5.2.0|5.2.1|5.2.2|5.2.3|5.2.4|5.2.5|5.2.6|5.2.7|Comment|
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|-------|
|Red Hat Enterprise Linux 7.3 x64|✓|✓|✓|✓|✓|✓|✓|✓| |
|Red Hat Enterprise Linux 7.2 x64|✓|✓|✓|✓|✓|✓|✓|✓| |
|Windows Server 2016| | |✓|✓|✓|✓|✓|✓| |
|Windows Server 2012 R2 x64|✓|✓|✓|✓|✓|✓|✓|✓| |
|CentOS 7 x64|✓|✓|✓|✓|✓|✓|✓|✓| |
|Ubuntu 16.04 LTS x64|✓|✓|✓|✓|✓|✓|✓|✓| |
|SUSE 12.0 SP1 x64|✓|✓|✓|✓|✓|✓|✓|✓| |
|Oracle Solaris 11.3 x64|✓|✓|✓|✓|✓|✓|✓|✓| |

**Databases**

|Database|5.2.0|5.2.1|5.2.2|5.2.3|5.2.4|5.2.5|5.2.6|5.2.7|Comment|
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|-------|
|MySQL 5.7.17|✓|✓|✓|✓|✓|✓|✓|✓|mysql-connector-java-5.1.42.jar|
|MS SQL Server 2016|✓|✓|✓|✓|✓|✓|✓|✓|See [JDBC Driver supported versions](https://docs.microsoft.com/en-us/sql/connect/jdbc/system-requirements-for-the-jdbc-driver){:target="_blank"}|
|MS SQL Server 2014|✓|✓|✓|✓|✓|✓|✓|✓|See [JDBC Driver supported versions](https://docs.microsoft.com/en-us/sql/connect/jdbc/system-requirements-for-the-jdbc-driver){:target="_blank"}|
|Oracle 12c| |✓|✓|✓|✓|✓|✓|✓|Ojdbc7.jar – 12.1.0.2|
|Oracle 12c|✓| | | | | | | |Ojdbc7.jar – 12.1.0.1|
|PostgreSQL 11.4|✓|✓|✓|✓|✓|✓|✓|✓|Postgresql-9.4-1211.jre.jar / Postgresql-42.2.12.jar|
|PostgreSQL 9.5.21|✓|✓|✓|✓|✓|✓|✓|✓|Postgresql-9.4-1211.jre.jar / Postgresql-42.2.12.jar|
|PostgreSQL 9.4.4|✓|✓|✓|✓|✓|✓|✓|✓|Postgresql-9.4-1211.jre.jar|
|IBM DB2 10.5|✓|✓|✓|✓|✓|✓|✓|✓|IBM Data Server Driver for JDBC and SQLJ (JCC Driver)|
|MariaDB 10.1.x| | | | | |✓|✓|✓|mariadb-java-client-2.2.5.jar|
|MariaDB 10.1.x| |✓|✓|✓|✓| | | |mariadb-java-client-2.0.1.jar|
|MariaDB 10.1.x|✓| | | | | | | |mysql-connector-java-5.1.39.jar|
|Amazon Aurora|✓|✓|✓|✓|✓|✓|✓|✓|mysql-connector-java-5.1.42.jar|

**Application servers**

|Applications server|5.2.0|5.2.1|5.2.2|5.2.3|5.2.4|5.2.5|5.2.6|5.2.7|Comment|
|-------------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|-------|
|Tomcat 7.0.82|✓|✓|✓|✓|✓|✓|✓|✓|Do not use v7.0.70 - see MNT-16664|
|JBoss 6.4.0 EAP|✓|✓|✓|✓|✓|✓|✓|✓| |
|Oracle WebLogic Server 12.2.1.2|✓|✓|✓|✓|✓|✓|✓|✓| |
|IBM WebSphere 8.5.5.15|✓|✓|✓|✓|✓|✓|✓|✓|“Classic”, not “Liberty”|

**Note:** Solr 4 is supported only on Tomcat. Solr 6 is powered by a Jetty server, and so is not supported on another application server.

**Clients**

|Client operating system|5.2.0|5.2.1|5.2.2|5.2.3|5.2.4|5.2.5|5.2.6|5.2.7|Comment|
|-----------------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|-------|
|Windows 10|✓|✓|✓|✓|✓|✓|✓|✓| |
|Windows 8.1 X64|✓|✓|✓|✓|✓|✓|✓|✓| |
|Windows 7|✓|✓|✓|✓|✓|✓|✓|✓| |
|Mac OSX 10.12|✓|✓|✓|✓|✓|✓|✓|✓| |

**Client browsers**

|Browser|5.2.0|5.2.1|5.2.2|5.2.3|5.2.4|5.2.5|5.2.6|5.2.7|Comment|
|-------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|-------|
|Mozilla Firefox|✓|✓|✓|✓|✓|✓|✓|✓| |
|MS Internet Explorer 11|✓|✓|✓|✓|✓|✓|✓|✓| |
|Microsoft Edge|✓|✓|✓|✓|✓|✓|✓|✓|Whilst we don't expect issues with the Chromium Edition of Microsoft Edge on these versions of Alfresco Content Services, please note that we have only tested, certified, and support it's use from Alfresco Content Services 6.2.1.|
|Chrome|✓|✓|✓|✓|✓|✓|✓|✓| |
|Safari 9|✓|✓|✓|✓|✓|✓|✓|✓| |

**Java**

|JRE|5.2.0|5.2.1|5.2.2|5.2.3|5.2.4|5.2.5|5.2.6|5.2.7|Comment|
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|-------|
|Oracle JRE 1.8.0\_111|✓|✓|✓|✓|✓|✓|✓|✓| |
|Oracle JRE 1.8.0\_121| | |✓|✓|✓|✓|✓|✓| |
|Oracle JRE 1.8.0\_131| | | | | |✓|✓|✓| |
|Oracle JRE 1.8.0\_151| | | | | | |✓|✓| |
|IBM SDK 8|✓|✓|✓|✓|✓|✓|✓|✓|IBM WebSphere 8.5.5.10|
|Amazon Corretto 8| | | | | | | |✓| |

**Third Party Integrations**

|Integration|5.2.0|5.2.1|5.2.2|5.2.3|5.2.4|5.2.5|5.2.6|5.2.7|Comment|
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|-------|
|MS Office 2016|✓|✓|✓|✓|✓|✓|✓|✓|Microsoft Office for Mac does not support Kerberos authentication|
|MS Office 2013|✓|✓|✓|✓|✓|✓|✓|✓| |
|MS Office 2011|✓|✓|✓|✓|✓|✓|✓|✓|Microsoft Office for Mac does not support Kerberos authentication|
|MS Office 2010|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Content Connector for Salesforce 2.0|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Kofax Integration 2.0|✓|✓|✓|✓|✓|✓|✓|✓|Kofax 10|
|Alfresco Content Connector for AWS S3 2.1|✓|✓|✓|✓|✓|✓|✓|✓|Media Management 1.1 supported|
|Alfresco Content Connector for AWS S3 2.0|✓|✓|✓|✓|✓|✓|✓|✓|Media Management is not supported|
|Alfresco S3 Connector 1.3|✓|✓| | | | | | |Media Management 1.0 supported|
|Alfresco Content Connector for EMC Centera 2.1|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Content Connector for SAP applications 5.1| |✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Content Connector for SAP applications 5.0| |✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Google Docs Integration 3.0|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Outlook Integration 2.4|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Outlook Integration 2.2|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Outlook Integration 2.1|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Content Services SDK 3|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Application Development Framework (ADF) 2.x|✓|✓|✓|✓|✓|✓|✓|✓|Some API functionality may be available only in the latest Alfresco Content Services release.|

**Modules**

|Module name|5.2.0|5.2.1|5.2.2|5.2.3|5.2.4|5.2.5|5.2.6|5.2.7|Comment|
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|-------|
|Alfresco Governance Services 2.7.2| | | | |✓|✓|✓|✓| |
|Alfresco Governance Services 2.7.1| | | | |✓|✓|✓|✓| |
|Alfresco Governance Services 2.7| |✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Governance Services 2.6.3| | | | | | | |✓| |
|Alfresco Governance Services 2.6.2| | | | |✓|✓|✓|✓| |
|Alfresco Governance Services 2.6.1| | | | |✓|✓|✓|✓| |
|Alfresco Governance Services 2.6| |✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Records Management 2.5.4| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Records Management 2.5.3| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Records Management 2.5.2| |✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Records Management 2.5.1|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Sync Service 2.2 \*| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Sync Service 2.1 \*|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Desktop Sync 1.8 \*| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Desktop Sync 1.7 \*| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Desktop Sync 1.6 \*| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Desktop Sync 1.5 \*| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Desktop Sync 1.4 \*| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Desktop Sync 1.3 \*| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Desktop Sync 1.2 \*| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Desktop Sync 1.1 \*| | |✓|✓|✓|✓|✓|✓| |
|Alfresco Desktop Sync 1.0 \*|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Media Management 1.1|✓|✓|✓|✓|✓|✓|✓|✓|If you intend to use Media Management and the S3 Connector on the same Alfresco Content Services 5.2.x install, you must use Media Management 1.1 and S3 Connector 2.1.|
|Alfresco Media Management 1.0|✓|✓|✓|✓|✓|✓|✓|✓|If you intend to use Media Management and the S3 Connector on the same Alfresco Content Services 5.2.x install, you must use Media Management 1.0 and S3 Connector 1.3.|
|Alfresco Document Transformation Engine 2.1|✓|✓|✓|✓|✓|✓|✓|✓|Document Transformation Engine versions earlier than 2.1.6 are not supported on Alfresco Content Services 5.2.6. See [Installing GhostScript and pdf2swf]({% link content-services/5.2/install/index.md %}#installing-ghostscript-and-pdf2swf) for GhostScript supported version and installation instructions.|
|Alfresco Document Transformation Server 2.0|✓|✓| | | | | | | |
|Alfresco Office Services 1.1|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Search Services 1.3|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Search Services 1.2|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Search Services 1.1|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Search Services 1.0|✓|✓|✓|✓|✓|✓|✓|✓| |
|SAML Single Sign-On (SSO) for Alfresco Content Services 1.0|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Enterprise Viewer 3.3|✓|✓|✓|✓|✓|✓|✓|✓| |
|Alfresco Enterprise Viewer 3.2|✓|✓|✓|✓|✓|✓|✓|✓| |

- \* Alfresco Desktop Sync will replicate content on local desktops for users with the appropriate access. If replication outside the repository is not allowed by your content policy you should not deploy Alfresco Desktop Sync. In addition:
- Alfresco Desktop Sync 1.1 and 1.2 do not support Smart Folders.
- Alfresco Desktop Sync 1.0 does not support Smart Folders and Alfresco Records Management or Alfresco Governance Services. If Alfresco Governance Services controlled content is synced, note that moving, renaming or hiding of declared records may not be reflected on the desktop client.

**Related components**

|Component name|5.2.0|5.2.1|5.2.2|5.2.3|5.2.4|5.2.5|5.2.6|5.2.7|Comment|
|--------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|-------|
|ImageMagick v7.0.5|✓|✓|✓|✓|✓|✓|✓|✓| |
|VMWare ESXi|✓|✓|✓|✓|✓|✓|✓|✓|Support from ESXi 5.0 (as long as the ESXi version supports the guest OS)|
|LibreOffice v6.1.6| | | | | | |✓|✓| |
|LibreOffice v5.2.1.2|✓|✓|✓|✓|✓|✓| | | |
