---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
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

The following is an example of output generated when a node is deleted from Alfresco Explorer:

```
15:55:26,590 User:admin DEBUG [repo.audit.inbound] 
Inbound audit values:
	/alfresco-node/beforeDeleteNode/node=workspace://SpacesStore/c4728f24-4a11-40f7-9062-315edf959d79
15:55:26,748 User:admin DEBUG [repo.audit.inbound] 
Inbound audit values:
	/alfresco-api/post/NodeService/deleteNode/no-error=null
	/alfresco-api/post/NodeService/deleteNode/args/nodeRef=workspace://SpacesStore/c4728f24-4a11-40f7-9062-315edf959d79
```

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

