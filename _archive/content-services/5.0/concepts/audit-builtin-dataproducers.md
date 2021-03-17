---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: audit
---

# Built-in data producers

The following are built-in data producers.

-   `org.alfresco.repo.audit.AuditMethodInterceptor`: Generates audit data for all public service API calls. Refer to the javadocs for the data structure.
-   `org.alfresco.repo.node.NodeAuditor`: Generates audit data for `beforeDeleteNode`

It is possible for any server-side component to pass data to the `auditComponent` bean.

To see what information is available to audit, enable the following logging:

```
log4j.logger.org.alfresco.repo.audit.inbound=DEBUG
```

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

