---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
keyword: [audit, Records Management]
---

# Locating the audit code

This section describes the location of audit code.

1.  For DEBUG logging, to see which data is being produced, rejected, or recorded, enable DEBUG for:

    ```
    log4j.logger.org.alfresco.repo.audit.AuditComponentImpl=DEBUG
    ```

2.  For JUnit code, the unit test code demonstrates use of the Audit APIs and configuration:

    ```
    org.alfresco.repo.audit.AuditComponentTest
    ```

    -   alfresco-audit-test-authenticationservice.xml: This is used by the test to capture both successful and unsuccessful login attempts in the audit data.
    -   `testAuditAuthenticationService`: This demonstrates the use of the `auditSearch` method.
3.  For Records Management \(DOD5015\) and auditing, the module pulls in audit data from the '`AuthenticationService`' but adds more data around the individual actions that take place during Records Management processes.

    ```
    org.alfresco.module.org_alfresco_module_dod5015.audit.*
    ```

    -   `RecordsManagementAuditServiceImpl$RMAuditTxnListener`: This transaction listener generates Records Management-specific data for events \(it is a `Data Producer`\). It generates node property deltas.
    -   config/alfresco/module/org\_alfresco\_module\_dod5015/audit/rm-audit.xml: This defines how the data produced by the `AuthenticationService` and the Records Management module is persisted. There are some custom `DataGenerator`s and `DataRecorder`s.
    -   `RecordsManagementAuditServiceImpl.getAuditTrailImpl`: This method demonstrates how the Records Management use-case searches the audit data. Further query extensions are required to extend the search filters available using the `auditQuery` API.

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

