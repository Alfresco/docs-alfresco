---
title: Creating and managing workflows
---
Content Services comes with a set of predefined workflow definitions which can be used right out of the box.

## What is‘ a workflow?

A workflow is a sequence of connected tasks applied to a document or other item of content. Each task can be performed 
by a person, a group, or automatically.

A workflow is not for external integration nor collecting, disseminating, or coordinating information not directly tied 
to a document or other item of content in Content Services. References in this overall documentation to terms 
like process, tasks, or other tooling are in the context of Content Services and as such capabilities are 
considered workflow.

For example, you might have a document that you needed reviewing and approving by a number of people. The sequence of 
connected tasks would be:

* Send an email to each reviewer asking them to review the document within a certain time
* Each reviewer reviews the document
* Each reviewer approves or rejects the document
* If enough reviewers approve, the task is completed successfully

Content Services workflows automate the process for you. Users can choose from five workflow definitions provided. 
You can also create your own workflow definitions for more complex workflows. The five supplied workflow definitions are:

|Workflow definition|Description|
|-------------------|-----------|
|Adhoc|Enables you to assign a task to a single user|
|Group Review & Approve|Enables you to set up review and approval of content, assigning the workflow task to a single group.|
|Parallel Review & Approve|Enables you to set up review and approval of content, assigning the workflow task to multiple users.|
|Pooled Review & Approve|Enables you to set up review and approval of content, assigning the workflow task to multiple users. One user can take ownership of the task at a time, completing it or returning it to the pool to be claimed by another user associated with the task.|
|Review & Approve|Enables you to set up review and approval of content, assigning the workflow task to a single user.|

A graphical workflow modeler is often used to create a workflow. The following diagram shows a sample workflow taken from 
the workflow modeler running in Eclipse. The workflow consists of three tasks, a gate, and two events; start and end.

![wf-diag-workflow-1]({% link content-services/images/wf-diag-workflow-1.jpg %})

The workflow engine executes BPMN 2.0 process definitions. BPNM 2.0 (Business Process Model and Notation) is an open 
standard developed by the Object Management Group (OMG) to provide a notation that is easily understandable by all 
business users: business analysts designing processes, developers implementing technology to perform those processes, 
and, business people managing and monitoring those processes. BPMN creates a standardized bridge for the gap between 
the business process design and process.

Standard BPMN 2.0 process definition models can be exchanged between graphical editors, and executed on any BPMN 2.0 
compliant engine. Be aware that if you use technology specific features in your definition, you will not be able to use 
that workflow on a different technology. For example, if you define a workflow to work with Content Services, 
you will not be able to run it on a TIBCO server.

The following image shows part of a BPMN 2.0 process definition:

![wf-process-definition]({% link content-services/images/wf-process-definition.jpg %})

## Workflow architecture

Content Services allows more than one workflow engine.

The following figure shows the high‐level architecture for workflow.

![wf-arch]({% link content-services/images/wf-arch.jpg %})

You can design workflow definitions using a graphical workflow designer that supports BPMN 2.0 or write the XML BPMN 2.0 
process definition directly using an XML editor. Many workflow editors support BPMN 2.0 but might not understand some of 
the features of Content Services workflow. We recommend the use of the Activiti eclipse designer plug‐in for 
Eclipse that is Content Services-aware.

You can deploy a workflow using the Content Services Workflow Console, or by using a Spring Bean.

Content Services process definitions can include JavaScript, and this in turn can access content models in the 
repository so that you can provide your own specialized tasks for a workflow and access their properties. 
Process definitions have script node access which allows you to access objects in the repository, such as documents 
and folders. Your workflow can access and modify document objects, for example marking documents as approved, or signed off.

Content Services allows you to access your own Java Classes through the delegate handler to support automation 
in your workflows. The following diagram shows these features:

![wf-arch-2]({% link content-services/images/wf-arch-2.jpg %})

### Workflow instances

A workflow instance is a running instance of a workflow definition.

Once a workflow instance has been started, it can not be changed. If you change the underlying process definition, 
it will be versioned. Any new workflow instance will reflect any changes to the workflow definition. Any old instances 
currently running will reference the old definition.

Workflow instances survive server restarts, so all user tasks will still be running if you stop and restart the server. 
Process and task execution variables also survive server restarts.

### Workflow artifacts

A workflow consists a number of artifacts.

The following diagram shows the artifacts and the relationship between them.

![wf-artifacts]({% link content-services/images/wf-artifacts.jpg %})

|Workflow artifact|Description|
|-----------------|-----------|
|Process Definition|Activiti process definitions describe the events, activities (tasks) and gateways (choices) of a workflow. Tasks can be user tasks or script (system) tasks. User tasks are assigned to human performers (users). System tasks perform some kind of operation against the repository. Both are described and implemented in the Process Definition.|
|Task Model|The Task Model provides a description for each of the user tasks in the workflow. Each task description consists of:<br><br>Name and Title<br><br>Properties and Associations. For example, the information attached to the task<br><br>The description is used to drive the user interface dialog for viewing and managing the Task. Alfresco provides a Data Dictionary for describing types of object to store, view and edit. This mechanism is also used to describe Workflow Tasks.|
|Share Workflow UI|You can customize the presentation of Tasks to the user in Alfresco Share. Customizing allows:<br><br>Control over which Task properties are displayed<br><br>Control over which Task properties are read-only and required<br><br>Control over how each Task property is rendered in the forms|
|Resource Bundle (optional)|A workflow resource bundle provides all the human-readable messages displayed in the user interface for managing the workflow. Messages include Task titles, task property names, task choices etc. Content Services supports full localization of Alfresco Share, including workflow. Therefore, the same Share resource bundle configuration extends to workflow too.|

## Workflow tools

There are a number of tools you will need to design, execute, and monitor your workflows. Some of these are included 
and some you can obtain separately.

The following diagram shows the tools used in designing, executing, and monitoring an Alfresco Content Services workflow:

![wf-tools]({% link content-services/images/wf-tools.jpg %})

|Workflow tool|Description|
|-------------|-----------|
|Activiti modeler|Allows business and information analysts to model a BPMN 2.0 compliant business process in a web browser. This allows business processes to be shared, and no client software is needed before you can start modeling.|
|Activiti designer|Is an Eclipse plugin, which enables a developer to enhance the model of the business process into a BPMN 2.0 process that can be executed on the Activiti process engine. You can also run unit tests, add Java logic, and create deployment artifacts with the Activiti Designer.|

### The Workflow Console {#workflowconsole}

Use the Workflow Console in the Repo Admin Console to manage Activiti workflows, including testing of newly 
developed workflows. You can also debug current in-flight workflows.

1.  Open the **Repo Admin Console**.

2.  In the **Consoles** section, click **Workflow Console**. You see the **Workflow Console** page.

3.  Perform the following commands as required for managing workflows:

    1.  To output the contents of the file located at `<definitionClassPath>`, type show file `<definitionClassPath>`.

        where `<definitionClassPath>` is the class path to workflow definition file.

    2.  To deploy workflow definitions to server, type `deploy <workflowEngine> <definitionClassPath>`.

        where `<workflowEngine>` is the name of workflow engine (Activiti) and `<definitionClassPath>` is the class path to workflow definition.

    3.  To redeploy the last workflow definition, type redeploy.

    4.  To list the latest deployed workflow definitions or display all workflow definitions (including previous versions) with the additional keyword `all`, type `show definitions [all]`.

    5.  To use the workflow definition identified by `<workflowDefId>`, type `use definition [<workflowDefId>]`.

        If you use `use definition []` instead, the currently selected workflow definition is shown.

    6.  To undeploy the latest version of the workflow definition identified by `<workflowDefId>`, type `undeploy definition <workflowDefId>`.

        This will also terminate and remove all in-flight workflows associated with the definition.

        If multiple versions of the definition exist, you will need to undeploy each version in turn to remove the definition completely or issue the `undeploy definition name` command.

    7.  To undeploy all versions of a workflow definition, type undeploy definition name `<workflowName>`.

        Just like `undeploy definition`, all in-flight workflows associated with each version are terminated.

4.  Perform the following commands as required for managing variables:

    The following variables are defined automatically when the console starts. They may be deleted or modified.

    * `var bpm:package package 1` (test package of one document)
    * `var bpm:assignee person admin` (test assignee who is admin)
    1.  To show all defined variables, type `var`.

    2.  To define or update a variable, type `var <varName>[*]=<varValue>`.

        where:

        * `<varName>` is the variable name
        * `[*]` defines a collection (if specified)
        * `<varValue>` is the variable value (comma-separated list of values)
        
        ```javascript
        var bpm:assignee*=admin,fred
        var wf:notifyMe=true
        ```

    3.  To define or update a (`cm:person`) node ref variable, type `var <varName>[*] person <varValue>`.

        where:

        * `<varName>` is the variable name
        * `[*]` defines a collection (if specified)
        * `<varValue>` is the variable value (comma-separated list of values)
        
        ```javascript
        var bpm:assignee* person admin,fred
        ```

    4.  To define or update a (`usr:authorityContainer`) node ref variable, type `var <varName>[*] group <varValue>`.

        where:

        * `<varName>` is the variable name
        * `[*]` defines a collection (if specified)
        * `<varValue>` is the variable value (comma-separated list of values)
        
        ```javascript
        var bpm:groupAssignee group GROUP_Engineering
        ```

    5.  To define or update a (`bpm:workflowPackage`) node ref variable, type `var <varName> package <itemCount>`.

        ```javascript
        var bpm:package package 4
        ```

        A new workflow package is created containing `<itemCount>` content items.

    6.  To delete an existing variable, type `var <varName>=`.

5.  Perform the following commands as required for managing workflows:

    1.  To start a new workflow using the currently selected workflow definition, type `start [<varName[=varValue>]]*`.

        ```javascript
        start bpm:assignee=david wf:predefined
        ```

    2.  To display a list of active workflows for the currently selected workflow definition, type `show workflows [all]`.

        This command display a list of all workflows (latest and previous versions of process definitions) when used with the additional keyword `all`.

    3.  To use the specified `<workflowId>`, type `use workflow <workflowId>`.

    4.  To describe the specified `<workflowId>`, type `desc workflow <workflowId>`.

    5.  To display the workflow paths for the specified `<workflowId>`, type `show paths [<workflowId>]`.

        If `<workflowId>` is omitted, the paths for the currently started workflow are shown.

    6.  To describe the specified `<pathId>`, type `desc path <pathId>`.

        This command includes the list of properties associated with the path.

    7.  To display all available transitions for the specified `<workflowId>`, type `show transitions [<workflowId>]`.

        If `<workflowId>` is omitted, the transitions for the currently started workflow are shown.

    8.  To signal transition on specified `<pathId>`, type `signal <pathId> [<transitionName>]`.

        If `<transitionName>` is omitted, the default transition is taken.

    9.  To fire an event of custom `eventtype` against the specified path, type `event <pathId> <eventtype>`.

    10. To end (cancel) the specified `<workflowId>`, type `end workflow <workflowId>`.

    11. To force deletion of the specified `<workflowId>`, type `delete workflow <workflowId>`.

    12. To force deletion of all in-flight workflows, type `delete all workflows`.

6.  Perform the following commands as required for managing workflow timers:

    1.  To display a list of active timers for the currently selected workflow definition, type `show timers [all]`.

        This command displays a list of all timers when used with the additional keyword `all`.

7.  Perform the following commands as required for managing tasks:

    1.  To list tasks assigned to the currently selected user, type `show my tasks`.

    2.  To list tasks completed by the currently selected user, type `show my completed`.

    3.  To list tasks in a pool for the currently selected user, type `show my pooled`.

    4.  To list the tasks associated with the specified workflow `<pathId>`, type `show tasks [<pathId>]`.

        If `<pathId>` is omitted, the tasks associated with the currently selected workflow path are shown.

    5.  To describe the task identified by `<taskId>` user, type `desc task <taskId>`.

    6.  To update the state of the specified `<taskId>`, type `update task <taskid> [<varName[=varValue>]]*`.

        Task properties are provided as name/value pairs or references to pre-defined variables.

    7.  To end the task identified by `<taskId>`, type `end task <taskId> [<transitionName>]`.

        If `<transitionName>` is omitted, the default transition is taken.

    8.  To query for tasks, type `query task [predicate]*`.

        If no predicates are provided, all in-progress tasks are returned (across all active workflows).

### Enabling workflow process engines {#enableprocessengines}

Alfresco Content Services workflows run on an embedded Activiti workflow engine. Use Process Engines in the 
Repo Admin Console to enable Activiti workflows and to edit properties.

1.  Open the **Repo Admin Console**.

2.  In the **Repository Services** section, click **Process Engines**.

    You see the **Process Engines** page.

3.  View the Activiti Workflow Engine properties:

    |Activiti Workflow Engine property|Example setting|What is it?|
    |---------------------------------|---------------|-----------|
    |Activiti Workflow Enabled|enabled|Displays the state of the Activiti workflow engine. This workflow engine is enabled by default. When using only new workflows, you do not need to change any of the settings on this page.|
    |Process Definitions Visible|enabled|Specifies whether the Activiti process definitions are available to users.|

    The other items show the Activiti engine status details:

    |Activiti Workflow Engine status|Example setting|What is it?|
    |-------------------------------|---------------|-----------|
    |Currently Running Process Instances|0|Specifies the number of Activiti process definitions running in the system.|
    |Currently Running Task Instances|0|Specifies the number of Activiti-defined tasks running in the system.|
    |Process Definitions Deployed|1|Specifies the number of Activiti process definitions deployed.|

4.  For creating your own, more complex workflow definitions, click the **Activiti Workflow Console** link.

5.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.

### The Activiti workflow console

The ActivitiWorkflow Console is a web based user interface that allows administration of workflow artifacts.

With the ActivitiWorkflow Console you can:

* View process definitions
* Manage deployments; deploy, view versions, and delete versions
* Manage process instances
* View task variables
* Examine the process database

To start the Activiti workflow console:

1.  Launch the [Repo Admin Console]({% link content-services/latest/admin/admin-console.md %}#launchadminconsole)
2.  In the **Repository Services** section, click **Process Engines**
3.  In the bottom right panel, click **Activiti Workflow Console**

## Process definitions

You create an Activiti process definition in Alfresco Content Services using the BPMN 2.0 standard.

The following diagram shows a simple process definition and highlights the terminology used in BPMN 2.0.

![wf-process-definition-diag]({% link content-services/images/wf-process-definition-diag.jpg %})

The underlying definition is an xml file. The root element of the BPMN 2.0 schema is the definitions element, which can 
contain multiple process definitions. The following image show an empty process definition:

![wf-process-definition-diag-2]({% link content-services/images/wf-process-definition-diag-2.jpg %})

A definitions element contains at least `xmlns` and `targetNamespace` declarations. The `targetNamespace` is an arbitrary 
string specified by you, and is useful for categorizing process definitions. The process element has two attributes:

|Attribute|Description|
|---------|-----------|
|id|Is required and maps to the key property of an Activiti `ProcessDefinition` object. The id is used to uniquely identify this process definition, for example when configuring the user interface, or in the Activiti workflow console.|
|name|Is optional and maps to the name property of a `ProcessDefinition`. The workflow engine itself does not use this property, but it is used in Alfresco Share for displaying the name in a user interface, so you should specify a name.|

The `BPMNDiagram` element specifies the diagram interchange information for this process. The graphical design tool you 
use generates this information. This element will not appear when you are creating BPMN 2.0 process definition manually. 
The interchange information is used to re‐create the diagram both in another graphical designer and in the run‐time environment. 
Only one diagram is allowed per file, even though there might be more than one process definition.

### Events

An event models something that happens during the lifetime of a process. In a diagram, an event is always visualized 
as a circle.

There are several types of events defined by BPMN 2.0, of which two always exist in a definition:

|Event|Description|
|-----|-----------|
|startEvent|Indicates where a process starts. A start event is triggered by the arrival of a message or similar trigger such as the expiration of a timer.|
|endEvent|Models the end process or subprocess. When process execution arrives in an end event, a result is thrown.|

Events are described in detail in the Activiti user guide.

### Sequence flows

A sequence flow is the connector between two elements of a process.

After an element is visited during process execution, all outgoing sequence flows will be followed. So by default two 
outgoing sequence flows will create two separate, parallel paths of execution. This behavior can be modified. 
Sequence flows are described in detail in the Activiti user guide.

### Tasks

The integration of Activiti in Alfresco Content Services provides three types of tasks in a process definition.

|Task type|Description|
|---------|-----------|
|userTask|Describes work to be done by a human actor. When process execution arrives at a user task, a new task is created in the task list of the user or group assigned to that task.|
|scriptTask|Describes an automatic activity. When a process execution arrives at the script task, the corresponding script is executed.|
|mailTask|Is similar to a script task, but is specifically set up to send an email.|

### Gateways

A gateway is used to model concurrency in a process. It is used to control the flow of execution, or in BPMN 2.0 
terminology, the tokens of execution.

A gateway is capable of consuming or generating tokens. It is graphically visualized as a diamond shape, with an icon inside. 
The icon describes the type of gateway. Gateways are described in detail in the Activiti user guide.

* [Parallel gateways](#parallelgw): A parallel gateway, models a fork into multiple paths of execution, or a join of multiple incoming paths of execution.
* [Exclusive gateways](#exclusivegw): An exclusive gateway, or XOR gateway is used to model a decision in a process definition.

#### Parallel gateways {#parallelgw}

A parallel gateway, models a fork into multiple paths of execution, or a join of multiple incoming paths of execution.

|Gateway behavior|Description|
|----------------|-----------|
|fork|All outgoing sequence flows are followed in parallel, creating one concurrent execution for each sequence flow.|
|join|All concurrent executions arriving at the parallel gateway wait at the gateway until execution has completed for each of the incoming sequence flows. The process then continues.|

A parallel gateway can have both fork and join behavior, if there are multiple incoming and outgoing sequence flows 
for the same parallel gateway. In this case, the gateway will first join all the incoming sequence flows, 
before splitting into multiple concurrent paths of execution.

A parallel gateway does not evaluate conditions. If conditions are defined on the sequence flow connected with the 
parallel gateway, they are ignored.

The following diagram shows a definition with two parallel gateways.

![wf-parallel-diag]({% link content-services/images/wf-parallel-diag.jpg %})

The first gateway forks the flow of execution, generating two tokens for two review tasks. When these two tasks are 
completed, the second parallel gateway joins the two execution. Since there is only one outgoing sequence flow, 
no concurrent paths of execution will be created, and only the quality assurance task will be active.

Note that a parallel gateway does not need to be 'balanced'. You do not need to specify a matching number of 
incoming/outgoing sequence flows for corresponding parallel gateways.

#### Exclusive gateways {#exclusivegw}

An exclusive gateway, or XOR gateway is used to model a decision in a process definition.

When the execution of a workflow arrives at this gateway, all outgoing sequence flows are evaluated in the order in 
which they are defined. The sequence flow whose condition evaluates to true, is selected for propagating the token flow.

Note that the semantics of an outgoing sequence flow:

* In general in BPMN 2.0, all sequence flows whose conditions evaluate to true are selected to continue in a parallel way. When using an exclusive gateway, only one sequence flow is selected.
* When multiple sequence flows have conditions which evaluate to true, only the first one defined is selected to continue the process.
* If no sequence flow can be selected, an exception will be thrown. To ensure a sequence flow will always be selected, have no condition on one of your flows. No condition will always evaluate to true.

The following diagram shows an exclusive gateway that will choose one sequence flow based on the value of a property, 
in this example, the invoice amount. Only two flows have conditions on them going to CFO Approval and 
Finance Director Approval. The last sequence flow has no condition, and will be selected by default if the other 
conditional flows evaluate to false.

![wf-exclusive-diag]({% link content-services/images/wf-exclusive-diag.jpg %})

### Variables
### Node objects
### Listeners
#### Task listeners
#### Execution listeners

## Task model](../concepts/wf-task-model.md)
### Specifying the task type](../concepts/wf-specifying-task-type.md)

## Setting up Activiti designer](../topics/wf-activiti-designer-setup.md)
### Installing Eclipse](../tasks/wf-install-eclipse.md)
### Installing Activiti designer](../tasks/wf-install-activiti-designer.md)

## Deploying the task model](../topics/wf-deploy-taskmodel.md)

## Deploying a process definition](../topics/wf-intro-deploy-pd.md)