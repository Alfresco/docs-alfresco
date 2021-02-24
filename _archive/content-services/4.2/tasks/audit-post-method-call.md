---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
keyword: [audit, post method call]
---

# Using values that have changed in a post method call

When using the `org.alfresco.repo.audit.AuditMethodInterceptor` Data Producer, which generates audit data for all public service API calls, it is sometimes useful to be able to audit before and after values in a 'post' call application, or to include values from before the call.

For example, the `nodeName` data extractor may only be called on a node that exists, so calling it after a delete has no effect.

The output of 'pre' call applications is available to 'post' call applications, which can be seen in the following example. The example shows auditing the deletion of nodes and includes the node name. The `nodeName` is evaluated in the 'pre' call application and copied in the 'post' call application.

```
<?xml version='1.0' encoding='UTF-8'?>
<Audit
  xmlns="http://www.alfresco.org/repo/audit/model/3.2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.alfresco.org/repo/audit/model/3.2 alfresco-audit-3.2.xsd" >

  <DataExtractors>
    <DataExtractor name="simpleValue" registeredName="auditModel.extractor.simpleValue"/>
    <DataExtractor name="nodeNameValue" registeredName="auditModel.extractor.nodeName"/>
  </DataExtractors>

  <PathMappings>
    <PathMap source="/alfresco-api/pre/NodeService/deleteNode" target="/preDelete" />
    <PathMap source="/alfresco-api/post/NodeService/deleteNode" target="/postDelete" />
  </PathMappings>

  <Application name="PreCallDataDelete" key="preDelete">
    <RecordValue key="nodeName" dataExtractor="nodeNameValue" dataSource="/preDelete/args/nodeRef" dataTrigger="/preDelete/args/nodeRef" />
  </Application>

  <Application name="PostDelete" key="postDelete">
    <RecordValue key="error" dataExtractor="simpleValue" dataSource="/postDelete/error" dataTrigger="/postDelete/error" />
    <AuditPath key="deleteDetails">
      <RecordValue key="deletedNodeRef" dataExtractor="simpleValue" dataSource="/postDelete/args/nodeRef" dataTrigger="/postDelete/args/nodeRef" />
      <RecordValue key="nodeName" dataExtractor="simpleValue" dataSource="/postDelete/preCallData/preDelete/nodeName" dataTrigger="/postDelete/preCallData/preDelete/nodeName" />
    </AuditPath>
  </Application>

</Audit>
        
```

**Note:** The `dataSource` attribute of the final `<RecordValue>` element includes the output path of the 'pre' call application \("`preDelete/nodeName`"\). This is prefixed by `preCallData/` much like the `args/` prefix for method arguments. To avoid 'pre' call applications from generating audit records themselves, rather than just generating output for the 'post' call applications, give them a name that starts with `PreCallData`.

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

