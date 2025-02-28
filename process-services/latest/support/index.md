---
title: Supported platforms
---

Here is a list of the individual components that have been through the complete Alfresco Quality Assurance and Certification activities for Alfresco Process Services.

Choose a combination of products to build your own Supported Stack. If anything is unclear then please [contact Support]({% link support/latest/contact.md %}).

> **Note:** To get the latest security fixes and updates for the Alfresco integrations and applications listed below, use the latest Service Pack for the listed product version. See the Alfresco Software Downloads page in [Hyland Community](https://community.hyland.com/customer-portal/downloads/alfresco){:target="_blank"} for the latest Service Pack versions.

{% capture twenty-four-two %}

> **Note:** Information for this Service Pack is provided for reference only. Please use the latest Service Pack.

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
| **Container Orchestration** | |
| Kubernetes 1.29 | Tested with [APS Helm chart](https://github.com/Alfresco/alfresco-process-services-deployment) |
| Amazon EKS 1.28 | Tested with [APS Helm chart](https://github.com/Alfresco/alfresco-process-services-deployment) |
|  |  |
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
| OpenJDK 17 | |
| Amazon Corretto 17 | |
| | |
| **Browsers** | |
| Mozilla Firefox | |
| Microsoft Edge | Versions based on Chromium only |
| MS Internet Explorer 11 | |
| Chrome | |
| | |
| **Third party integrations** | |
| Elasticsearch 8.13.1 | |
| Keycloak 21.1.2 | |
| | |
| **Services** | |
| Alfresco Content Services 23.x | |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.4 | |
| | |
| **Related components** | |
| VMWare ESXi 5.1.0 | For supported guest operating systems |
| Spring Boot 3.2.3 | |
| Spring 6.1.4 | |

{% endcapture %}

{% capture twenty-four-one %}

> **Note:** Information for this Service Pack is provided for reference only. Please use the latest Service Pack.

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
| Elasticsearch 7.17.18 | |
| | |
| **Services** | |
| Alfresco Content Services 23.x |  |
| | |
| **Integrations** | |
| Identity Service 1.2 | The Identity Service is sunset from September 1, 2024. We recommend using Keycloak with the latest Service Pack instead of the Identity Service. For use with LDAP and SAML |
| Identity Service 1.1 | The Identity Service is sunset from September 1, 2024. We recommend using Keycloak with the latest Service Pack instead of the Identity Service. For use with LDAP and SAML |
| | |
| **Applications** | |
| Alfresco Digital Workspace 4.3 | Requires Alfresco Process Services 2.4.2. |
| | |
| **Related components** | |
| VMWare ESXi 5.1.0 | For supported guest operating systems |

{% endcapture %}

{% include tabs.html tableid="supported-platforms" opt1="24.2 (reference only)" content1=twenty-four-two opt2="24.1 (reference only)" content2=twenty-four-one %}
