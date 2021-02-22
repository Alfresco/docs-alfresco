---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: workflow
---

# Node objects

In a process definition, repository node references and associations are represented as node objects in Activiti BPMN 2.0. A node object is an object‐oriented view of an item in the repository. It provides accessors for retrieving and setting properties and traversing associations, and methods for performing alfresco actions such as checkin, checkout, and transforms.

The following variables are set by the start task in your process definition, and are accessible after the start task completes:

-   **bpm\_workflowDescription**

    Description for this in‐flight workflow.

-   **bpm\_workflowDueDate**

    Due date for the workflow.

-   **bpm\_workflowPriority**

    Priority for the workflow.

-   **bpm\_package**

    A Repository Node with aspect **bpm:workflowPackage** representing the Workflow package containing content being routed through the workflow.

-   **bpm\_context**

    A Repository Node of type **cm:folder** representing the folder in which the workflow was started.


The are some special node objects available in the process definition, that are not part of the task model:

-   **initiator**

    A Repository Node of type **cm:person** representing the person who initiated the workflow.

-   **initiatorhome**

    A Repository Node of type **cm:space** representing the home folder of the person who initiated the workflow.

-   **companyhome**

    A Repository Node of type **cm:space** representing the company home root folder.


**Parent topic:**[Process definitions](../concepts/wf-process-def.md)

**Related information**  


[Activiti user guide](http://www.activiti.org/userguide/)

