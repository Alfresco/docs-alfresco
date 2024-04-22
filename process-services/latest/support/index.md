---
title: Supported platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Process Services 24.x.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please contact our Support team - submit a case via [Hyland Community]({% link support/latest/contact.md %}).

{% capture twenty-four-two %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 9 | |
| Red Hat Enterprise Linux 8.8 | |
| Windows Server 2022 | |
| Rocky Linux 9 | |
| Rocky Linux 8.8 | |
| CentOS 8 x64 | |
| CentOS 7 x64 | |
| Ubuntu 22.04 | |
| Amazon Linux 2 | |
| | |
| **Databases** | |
| MariaDB 10.6 | 3.1.4 |
| MySQL 8.0 | `mysql-connector-java-8.0.33.jar` |
| MS SQL Server 2022 | `mssql-jdbc-11.2.jar` |
| MS SQL Server 2019 | `mssql-jdbc-10.2.jar` |
| Oracle 19c | 21.7.0.0 |
| PostgreSQL 15.4 | `postgresql-42.5.1.jar` |
| PostgreSQL 14.9 | `postgresql-42.5.1.jar` |
| PostgreSQL 13.12 | `postgresql-42.5.1.jar` |
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Application servers** | |
| Tomcat 10 | |
| Jetty 12 | |
| | |
| **JDKs** | |
| OpenJDK 17 |  |
| Amazon Corretto 17 |  |
| | |
| **Browsers** | |
| Mozilla Firefox | |
| Microsoft Edge | Versions based on Chromium only |
| MS Internet Explorer 11 | |
| Chrome | |
| | |
| **Third party integrations** | |
| Elasticsearch 8.13.1 | |
| | |
| **Services** | |
| Alfresco Content Services 23.x |  |
| | |
| **Integrations** | |
| Identity Service 2.0 | For use with LDAP and SAML |
| Identity Service 1.2 | For use with LDAP and SAML |
| Identity Service 1.1 | For use with LDAP and SAML |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.4 |
| Alfresco Digital Workspace 4.3 | Requires Alfresco Process Services 2.4.2. |
| | |
| **Related components** | |
| VMWare ESXi 5.1.0 | For supported guest operating systems |
| Spring Boot 3.2.3 |
| Spring 6.1.4 |

{% endcapture %}

{% capture twenty-four-one %}

| Version | Notes |
| ------- | ----- |
| **Operating systems** | |
| Red Hat Enterprise Linux 9 | |
| Red Hat Enterprise Linux 8.8 | |
| Windows Server 2022 | |
| Rocky Linux 9 | |
| Rocky Linux 8.8 | |
| CentOS 8 x64 | |
| CentOS 7 x64 | |
| Ubuntu 22.04 | |
| Amazon Linux 2 | |
| | |
| **Databases** | |
| MariaDB 10.6 | 3.1.4 |
| MySQL 8.0 | `mysql-connector-java-8.0.33.jar` |
| MS SQL Server 2022 | `mssql-jdbc-11.2.jar` |
| MS SQL Server 2019 | `mssql-jdbc-10.2.jar` |
| Oracle 19c | 21.7.0.0 |
| PostgreSQL 15.4 | `postgresql-42.5.1.jar` |
| PostgreSQL 14.9 | `postgresql-42.5.1.jar` |
| PostgreSQL 13.12 | `postgresql-42.5.1.jar` |
| Amazon Aurora | Use of Amazon Aurora is supported only if it is configured to emulate one of the supported versions of PostgreSQL or MySQL listed above, and the listed JDBC driver is used. |
| | |
| **Application servers** | |
| Tomcat 10 | |
| Jetty 12 | |
| | |
| **JDKs** | |
| OpenJDK 17 |  |
| Amazon Corretto 17 |  |
| | |
| **Browsers** | |
| Mozilla Firefox | |
| Microsoft Edge | Versions based on Chromium only |
| MS Internet Explorer 11 | |
| Chrome | |
| | |
| **Third party integrations** | |
| Elasticsearch 7.13.2 | |
| | |
| **Services** | |
| Alfresco Content Services 23.x |  |
| | |
| **Integrations** | |
| Identity Service 1.2 | For use with LDAP and SAML |
| Identity Service 1.1 | For use with LDAP and SAML |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.3 | Requires Alfresco Process Services 2.4.2. |
| | |
| **Related components** | |
| VMWare ESXi 5.1.0 | For supported guest operating systems |

{% endcapture %}

{% include tabs.html tableid="supported-platforms" opt1="24.2" content1=twenty-four-two opt2="24.1" content2=twenty-four-one %}
