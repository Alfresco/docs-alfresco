---
author: Alfresco Documentation
---

# Audit filters

Audit data can be controlled by using audit filters. Audit filters provide a fine grain of control over which events are audited.

**Audit data producers** call `AuditComponent.recordAuditValues(rootPath, auditMap)` once for each event to be audited. Filters are applied to reject events so that their values are never used by **audit configurations**. The `rootPath` identifies the data producer and the `auditMap` is the event data. The `rootPath` value and keys in the map represent a tree structure.

If you are using the Tomcat web application server, add the additional properties \(audit filters\) to the ./tomcat/shared/classes/alfresco-global.properties file.

-   **[Creating new audit filters](../concepts/audit-example-filter.md)**  
Audit filters are essentially global properties that specify a way of filtering audit events by specifying regular expression to include or exclude audit events. Audit filters are typically added to alfresco-global.properties.
-   **[Redirected properties](../concepts/audit-redirected-props.md)**  
It is possible for one property to reference another property.
-   **[Debugging audit filters](../concepts/audit-debug-info.md)**  
The PropertyAuditFilter provides log4j debug information \(in the alfresco.log file\) when it rejects values. Turning on this debugger can generate large volumes of output.

**Parent topic:**[Auditing](../concepts/audit-intro.md)

