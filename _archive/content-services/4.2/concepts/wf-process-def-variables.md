---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Variables

In an Alfresco Activiti process definition each property in the workflow task model corresponds to a variable available in your workflow.

For example the Alfresco supplied BPM task model defines the property **bpm:assignee**. To reference this property in your process definition you would specify the string **bpm\_assignee**. Note that the colon character is replaced by an underscore.

Variables in workflows exist at two levels; the process execution level and the task level. If you set the value of a variable in a task, the new value is not available at the process level. If you want to use a variable across tasks, or between a task and conditional flow, you need to copy the variable to the process execution level. Process level variables are available to tasks and sequence flows.

**Parent topic:**[Process definitions](../concepts/wf-process-def.md)

**Related information**  


[Activiti user guide](http://www.activiti.org/userguide/)

[Task model](wf-task-model.md)

