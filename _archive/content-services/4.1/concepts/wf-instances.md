---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: workflow
---

# Workflow instances

A workflow instance is a running instance of a workflow definition.

Once a workflow instance has been started, it can not be changed. If you change the underlying process definition, it will be versioned. Any new workflow instance will reflect any changes to the workflow definition. Any old instances currently running will reference the old definition.

Workflow instances survive Alfresco server restarts, so all user tasks will still be running if you stop and restart the server. Process and task execution variables also survive Alfresco server restarts.

**Parent topic:**[Workflow Architecture](../concepts/wf-architecture.md)

