---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
option: workflow
---

# Managing workflow

Alfresco workflows run on an embedded Activiti workflow engine.

-   Activiti is a lightweight workflow and Business Process Management \(BPM\) platform for business managers, developers, and system administrators. At its core is a BPMN 2.0 process engine for Java. Activiti is the default workflow engine in Alfresco.
-   In previous versions of Alfresco, a jBPM workflow engine was used, and is still shipped as part of Alfresco.

Alfresco recommends that you use the Activiti workflow engine for all new workflows. In a new Alfresco installation, jBPM is disabled by default.

For upgrades, you can also enable jBPM so that the existing migrated workflows can continue. That is, you can run the JBPM and Activiti engines side by side. However, the jBPM workflow definitions will be hidden by default, so you cannot start new jBPM workflows.

-   **[Viewing the workflow engine properties](../tasks/adminconsole-workflow.md)**  
The Workflow page shows the properties for the workflow engines.
-   **[Starting the Activiti workflow console](../tasks/adminconsole-workflow-activiti-console.md)**  
Alfresco provides the Activiti workflow console for managing Activiti based workflows and process definitions.

**Parent topic:**[Managing Alfresco using the Admin Console](../concepts/at-adminconsole.md)

