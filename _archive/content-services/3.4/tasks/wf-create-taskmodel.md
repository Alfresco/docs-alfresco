---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: workflow create task model
---

# Creating a task model

Perform this task to create a task model, which is similar to a content model.

1.  Derive your model from the base task model:

    -   ```
<import uri="http://www.alfresco.org/model/bpm/1.0" prefix="bpm"/>
```

2.  For each `<task>` in the process definition, create a `<type>` in the task model. `<type name>` must be identical to `<task name>`:

    -   ```
<type name="wf:submitAdhocTask">
```

    -   ```
<type name="wf:adhocTask">
```

    -   ```
<type name="wf:completedAdhocTask">
```

3.  For each type, describe the properties:

    -   ```
<property name="wf:notifyMe">
```

4.  For each type, define aspects:

    -   ```
<aspect>bpm:assignee</aspect>
```

    **Note:** You do not need to create an association for `initiator`. `initiator` is a process instance variable that is available in any workflow. `initiator` is a repository node \(cm:person\) that represents the person who initiated the workflow.

5.  Add the details for properties and associations.


**Parent topic:**[Creating and managing workflows](../topics/wf-howto.md)

