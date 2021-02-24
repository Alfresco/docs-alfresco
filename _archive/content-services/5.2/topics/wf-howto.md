---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Creating and managing workflows

Alfresco Content Services comes with a set of predefined workflow definitions which can be used right out of the box. For more complex requirements, you can also create, deploy, and manage your own workflows.

-   **[What is a workflow?](../concepts/wf-whatis-workflow.md)**  
A workflow is a sequence of connected tasks applied to a document or other item of content. Each task can be performed by a person, a group, or automatically.
-   **[Workflow architecture](../concepts/wf-architecture.md)**  
 Alfresco Content Services allows more than one workflow engine.
-   **[Workflow tools](../concepts/wf-tools.md)**  
 There are a number of tools you will need to design, execute, and monitor your workflows. Some of these are included and some you can obtain separately.
-   **[Process definitions](../concepts/wf-process-def.md)**  
 You create an Activiti process definition in Alfresco Content Services using the BPMN 2.0 standard.
-   **[Task model](../concepts/wf-task-model.md)**  
 The task model is a description of each task in a workflow. It defines attributes associated with that task. A user interface component can use this description to automatically generate an interface suitable for displaying the task information, in addition to initializing a newly created task instance.
-   **[Setting up Activiti designer](../topics/wf-activiti-designer-setup.md)**  
To create process definitions using a graphical user interface you will need to set up the Activiti designer.
-   **[Deploying the task model](../topics/wf-deploy-taskmodel.md)**  
You deploy your workflow task model using the Spring "Workflow Deployer" bean. The bean can be used in conjunction with Alfresco Content Services configuration extension mechanism to deploy custom made workflows and models.
-   **[Deploying a process definition](../topics/wf-intro-deploy-pd.md)**  
You can deploy a process definition from the Activiti workflow console or you can deploy it manually using a spring bean.

**Parent topic:**[Administering](../concepts/ch-administering.md)

