---
author: Alfresco Documentation
---

# Auditing Tutorials

The various concepts described in this documentation can be tried out in these hands-on tutorials.

The tutorials here provide hands-on experience with auditing concepts.

-   **[Running a simple audit query](../tasks/audit-simple-query.md)**  
You can use or edit this simple audit query example.
-   **[Running an advanced audit query](../tasks/audit-advanced-query.md)**  
You can use or edit this advanced audit query example.
-   **[Example audit trail](../tasks/audit-content-example.md)**  
Use this example audit trail to understand more about auditing.
-   **[Understanding PathMappings](../tasks/audit-pathmappings.md)**  
To create an audit configuration file, it is necessary to know which data can be audited and how the data is mapped onto your application.
-   **[Audit record values](../tasks/audit-record-values.md)**  
The `RecordValue` element makes use of the `DataExtractor` definitions, but specifies when to be activated \(`dataTrigger`\) and where to get the data from \(`dataSource`\). Both the `dataTrigger` and `dataSource` attributes default to the path of the `RecordValue` element. Data is always written to the path where the `RecordValue` is declared. So, it is possible to trigger the `RecordValue` when a data path is present \(such as a `null` value\) and then to read a value from a completely different location.
-   **[Using values that have changed in a post method call](../tasks/audit-post-method-call.md)**  
When using the `org.alfresco.repo.audit.AuditMethodInterceptor` Data Producer, which generates audit data for all public service API calls, it is sometimes useful to be able to audit before and after values in a 'post' call application, or to include values from before the call.

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

