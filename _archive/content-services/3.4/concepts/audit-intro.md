---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# Auditing Alfresco

Alfresco provides the ability to audit activity. This section describes how Alfresco generates, stores, and retrieves auditing information.

**Note:** The auditing mechanism prior to Version 3.4.0 has been removed but the old tables remain in the system. You can access the previous audit data but any new audit data will be directed to the new tables. Any customizations of the auditing feature must be rewritten using the new configuration files. All SQL-based queries used previously must be replaced bu calls to the supplied APIs. The use of low-level SQL statements to retrieve data is not supported.

![](../images/auditing-arch.png)

The architecture of the auditing features comprises the following components:

Data Producers defines the components that produce data that might be audited. Data producers do not need to know anything about how the data is stored. Data is generated and sent to the `AuditComponent.recordAuditValues` component. The only requirement is that each packet of data is a *Map* of data keyed by logical path names, which are specific to the producers.

The **AuditService** search should be used for data retrieval; however, for completeness, the following tables are used:

-   Tables exclusive to the new audit \(*AlfrescoPostCreate-3.2-AuditTables.sql*\)
    -   `alf_audit_model`: Contains the record of the audit configuration files.
    -   `alf_audit_application`: Contains an entry for each logical application. There may be several audit applications defined in a single audit model.
    -   `alf_audit_entry`: Contains an entry for aach call to `AuditComponent.recordAuditValues`. There is a reference to a property.
-   Shared tables \(*AlfrescoPostCreate-3.2-PropertyValueTables.sql*\)
    -   `alf_prop_root`: Entry point for properties: shared values are fully indexed; arbitrarily-deep collections; quick data query and reconstruction.

-   **[Audit configuration and environment](../concepts/audit-config-env.md)**  
This section describes the configuration and environment settings for auditing.
-   **[Sample files](../concepts/audit-worked-samples.md)**  
Audit sample files are distributed in the <TOMCAT\_HOME\>/classes/alfresco/extension/audit directory.
-   **[Disabling auditing](../tasks/audit-config.md)**  
Auditing is enabled by default. To disable auditing permanently, use the setting in the global properties file.
-   **[Auditing examples](../concepts/audit-examples.md)**  
This section describes some auditing examples.
-   **[Audit configuration files](../concepts/audit-config-files.md)**  
This section describes the location and basic structure of the audit configuration files.
-   **[Built-in data producers](../concepts/audit-builtin-dataproducers.md)**  
The following are built-in data producers.
-   **[DataExtractors and DataGenerators](../concepts/audit-extract-gens.md)**  
This section provides a description of DataExtractors and DataGenerators.
-   **[Locating the audit code](../tasks/audit-builtin-dataprod.md)**  
This section describes the location of audit code.
-   **[Defining the audit application](../tasks/audit-application.md)**  
This section describes the audit applications.
-   **[Simple audit query](../tasks/audit-simple-query.md)**  
This section describes the a simple audit query example.
-   **[Advanced audit query](../tasks/audit-advanced-query.md)**  
This section describes the a advanced audit query example.
-   **[Understanding PathMappings](../tasks/audit-pathmappings.md)**  
To create an audit configuration file, it is necessary to know which data can be audited and how the data is mapped onto your application.
-   **[Audit recording values](../tasks/audit-recording-values.md)**  
The `RecordValue` element makes use of the `DataExtractor` definitions, but specifies when to be activated \(`dataTrigger`\) and where to get the data from \(`dataSource`\). Both the `dataTrigger` and `dataSource` attributes default to the path of the `RecordValue` element. Data is always written to the path where the `RecordValue` is declared. So, it is possible to trigger the `RecordValue` when a data path is present \(such as a `null` value\) and then to read a value from a completely different location.
-   **[Using values that have changed in a post method call](../tasks/audit-post-method-call.md)**  
When using the `org.alfresco.repo.audit.AuditMethodInterceptor` Data Producer, which generates audit data for all public service API calls, it is sometimes useful to be able to audit before and after values in a 'post' call application, or to include values from before the call.

**Parent topic:**[Administering](../concepts/ch-administering.md)

