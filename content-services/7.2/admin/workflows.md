---
title: Create and manage workflows
---
Content Services comes with a set of predefined workflow definitions which can be used right out of the box.

## What's a workflow?

A workflow is a sequence of connected tasks applied to a document or other item of content. Each task can be performed by a person, a group, or automatically.

A workflow is not for external integration nor collecting, disseminating, or coordinating information not directly tied to a document or other item of content in Content Services. References in this overall documentation to terms like process, tasks, or other tooling are in the context of Content Services and as such capabilities are considered workflow.

For example, you might have a document that you needed reviewing and approving by a number of people. The sequence of connected tasks would be:

* Send an email to each reviewer asking them to review the document within a certain time
* Each reviewer reviews the document
* Each reviewer approves or rejects the document
* If enough reviewers approve, the task is completed successfully

Content Services workflows automate the process for you. Users can choose from five workflow definitions provided. You can also create your own workflow definitions for more complex workflows. The five supplied workflow definitions are:

| Definition | Description |
| ---------- | ----------- |
| Adhoc | Enables you to assign a task to a single user. |
| Group Review & Approve | Enables you to set up review and approval of content, assigning the workflow task to a single group. |
| Parallel Review & Approve | Enables you to set up review and approval of content, assigning the workflow task to multiple users. |
| Pooled Review & Approve | Enables you to set up review and approval of content, assigning the workflow task to multiple users. One user can take ownership of the task at a time, completing it or returning it to the pool to be claimed by another user associated with the task. |
| Review & Approve | Enables you to set up review and approval of content, assigning the workflow task to a single user. |

A graphical workflow modeler is often used to create a workflow. The following diagram shows a sample workflow taken from the workflow modeler running in Eclipse. The workflow consists of three tasks, a gate, and two events; start and end.

![wf-diag-workflow-1]({% link content-services/images/wf-diag-workflow-1.jpg %})

The workflow engine executes BPMN 2.0 process definitions. BPMN 2.0 (Business Process Model and Notation) is an open standard developed by the Object Management Group (OMG) to provide a notation that is easily understandable by all business users: business analysts designing processes, developers implementing technology to perform those processes, and, business people managing and monitoring those processes. BPMN creates a standardized bridge for the gap between the business process design and process.

Standard BPMN 2.0 process definition models can be exchanged between graphical editors, and executed on any BPMN 2.0 compliant engine. Be aware that if you use technology specific features in your definition, you'll not be able to use that workflow on a different technology. For example, if you define a workflow to work with Content Services, you'll not be able to run it on a TIBCO server.

The following image shows part of a BPMN 2.0 process definition:

![wf-process-definition]({% link content-services/images/wf-process-definition.jpg %})

## Workflow architecture

Content Services allows more than one workflow engine.

The following figure shows the high‐level architecture for workflow.

![wf-arch]({% link content-services/images/wf-arch.jpg %})

You can design workflow definitions using a graphical workflow designer that supports BPMN 2.0 or write the XML BPMN 2.0 process definition directly using an XML editor. Many workflow editors support BPMN 2.0 but might not understand some of the features of Content Services workflow. We recommend the use of the Activiti eclipse designer plug‐in for Eclipse that is Content Services-aware.

You can deploy a workflow using the Content Services Workflow Console, or by using a Spring Bean.

Content Services process definitions can include JavaScript, and this in turn can access content models in the repository so that you can provide your own specialized tasks for a workflow and access their properties. Process definitions have script node access which allows you to access objects in the repository, such as documents and folders. Your workflow can access and modify document objects, for example marking documents as approved, or signed off.

Content Services allows you to access your own Java Classes through the delegate handler to support automation in your workflows. The following diagram shows these features:

![wf-arch-2]({% link content-services/images/wf-arch-2.jpg %})

### Workflow instances

A workflow instance is a running instance of a workflow definition.

Once a workflow instance has been started, it can't be changed. If you change the underlying process definition, it'll be versioned. Any new workflow instance will reflect any changes to the workflow definition. Any old instances currently running will reference the old definition.

Workflow instances survive server restarts, so all user tasks will still be running if you stop and restart the server. Process and task execution variables also survive server restarts.

### Workflow artifacts

A workflow consists a number of artifacts.

The following diagram shows the artifacts and the relationship between them.

![wf-artifacts]({% link content-services/images/wf-artifacts.jpg %})

| Artifact | Description |
| -------- | ----------- |
| Process Definition | Activiti process definitions describe the events, activities (tasks) and gateways (choices) of a workflow. Tasks can be user tasks or script (system) tasks. User tasks are assigned to human performers (users). System tasks perform some kind of operation against the repository. Both are described and implemented in the Process Definition. |
| Task Model | The Task Model provides a description for each of the user tasks in the workflow. Each task description consists of:<br><br>Name and Title<br><br>Properties and Associations. For example, the information attached to the task<br><br>The description is used to drive the user interface dialog for viewing and managing the Task. Alfresco provides a Data Dictionary for describing types of object to store, view and edit. This mechanism is also used to describe Workflow Tasks. |
| Share Workflow UI | You can customize the presentation of Tasks to the user in Alfresco Share. Customizing allows:<br><br>Control over which Task properties are displayed<br><br>Control over which Task properties are read-only and required<br><br>Control over how each Task property is rendered in the forms. |
| Resource Bundle | *Optional*. A workflow resource bundle provides all the human-readable messages displayed in the user interface for managing the workflow. Messages include Task titles, task property names, task choices etc. Content Services supports full localization of Alfresco Share, including workflow. Therefore, the same Share resource bundle configuration extends to workflow too. |

## Workflow tools

There are a number of tools you'll need to design, execute, and monitor your workflows. Some of these are included and some you can obtain separately.

The following diagram shows the tools used in designing, executing, and monitoring a Content Services workflow:

![wf-tools]({% link content-services/images/wf-tools.jpg %})

| Workflow tool | Description |
| ------------- | ----------- |
| Activiti modeler | Allows business and information analysts to model a BPMN 2.0 compliant business process in a web browser. This allows business processes to be shared, and no client software is needed before you can start modeling. |
| Activiti designer | Is an Eclipse plugin, which enables a developer to enhance the model of the business process into a BPMN 2.0 process that can be executed on the Activiti process engine. You can also run unit tests, add Java logic, and create deployment artifacts with the Activiti Designer. |

### Workflow Console {#workflowconsole}

Use the Workflow Console in the Repo Admin Console to manage Activiti workflows, including testing of newly developed workflows. You can also debug current in-flight workflows.

1. Open the **Repo Admin Console**.

2. In the **Consoles** section, click **Workflow Console**. You see the **Workflow Console** page.

3. Perform the following commands as required for managing workflows:

    1. To output the contents of the file located at `<definitionClassPath>`, type show file `<definitionClassPath>`.

        where `<definitionClassPath>` is the class path to workflow definition file.

    2. To deploy workflow definitions to server, type `deploy <workflowEngine> <definitionClassPath>`.

        where `<workflowEngine>` is the name of workflow engine (Activiti) and `<definitionClassPath>` is the class path to workflow definition.

    3. To redeploy the last workflow definition, type redeploy.

    4. To list the latest deployed workflow definitions or display all workflow definitions (including previous versions) with the additional keyword `all`, type `show definitions [all]`.

    5. To use the workflow definition identified by `<workflowDefId>`, type `use definition [<workflowDefId>]`.

        If you use `use definition []` instead, the currently selected workflow definition is shown.

    6. To undeploy the latest version of the workflow definition identified by `<workflowDefId>`, type `undeploy definition <workflowDefId>`.

        This will also terminate and remove all in-flight workflows associated with the definition.

        If multiple versions of the definition exist, you'll need to undeploy each version in turn to remove the definition completely or issue the `undeploy definition name` command.

    7. To undeploy all versions of a workflow definition, type undeploy definition name `<workflowName>`.

        Just like `undeploy definition`, all in-flight workflows associated with each version are terminated.

4. Perform the following commands as required for managing variables:

    The following variables are defined automatically when the console starts. They may be deleted or modified.

    * `var bpm:package package 1` (test package of one document)
    * `var bpm:assignee person admin` (test assignee who is admin)
    1. To show all defined variables, type `var`.

    2. To define or update a variable, type `var <varName>[*]=<varValue>`.

        where:

        * `<varName>` is the variable name
        * `[*]` defines a collection (if specified)
        * `<varValue>` is the variable value (comma-separated list of values)

        ```javascript
        var bpm:assignee*=admin,fred
        var wf:notifyMe=true
        ```

    3. To define or update a (`cm:person`) node ref variable, type `var <varName>[*] person <varValue>`.

        where:

        * `<varName>` is the variable name
        * `[*]` defines a collection (if specified)
        * `<varValue>` is the variable value (comma-separated list of values)

        ```javascript
        var bpm:assignee* person admin,fred
        ```

    4. To define or update a (`usr:authorityContainer`) node ref variable, type `var <varName>[*] group <varValue>`.

        where:

        * `<varName>` is the variable name
        * `[*]` defines a collection (if specified)
        * `<varValue>` is the variable value (comma-separated list of values)

        ```javascript
        var bpm:groupAssignee group GROUP_Engineering
        ```

    5. To define or update a (`bpm:workflowPackage`) node ref variable, type `var <varName> package <itemCount>`.

        ```javascript
        var bpm:package package 4
        ```

        A new workflow package is created containing `<itemCount>` content items.

    6. To delete an existing variable, type `var <varName>=`.

5. Perform the following commands as required for managing workflows:

    1. To start a new workflow using the currently selected workflow definition, type `start [<varName[=varValue>]]*`.

        ```javascript
        start bpm:assignee=david wf:predefined
        ```

    2. To display a list of active workflows for the currently selected workflow definition, type `show workflows [all]`.

        This command display a list of all workflows (latest and previous versions of process definitions) when used with the additional keyword `all`.

    3. To use the specified `<workflowId>`, type `use workflow <workflowId>`.

    4. To describe the specified `<workflowId>`, type `desc workflow <workflowId>`.

    5. To display the workflow paths for the specified `<workflowId>`, type `show paths [<workflowId>]`.

        If `<workflowId>` is omitted, the paths for the currently started workflow are shown.

    6. To describe the specified `<pathId>`, type `desc path <pathId>`.

        This command includes the list of properties associated with the path.

    7. To display all available transitions for the specified `<workflowId>`, type `show transitions [<workflowId>]`.

        If `<workflowId>` is omitted, the transitions for the currently started workflow are shown.

    8. To signal transition on specified `<pathId>`, type `signal <pathId> [<transitionName>]`.

        If `<transitionName>` is omitted, the default transition is taken.

    9. To fire an event of custom `eventtype` against the specified path, type `event <pathId> <eventtype>`.

    10. To end (cancel) the specified `<workflowId>`, type `end workflow <workflowId>`.

    11. To force deletion of the specified `<workflowId>`, type `delete workflow <workflowId>`.

    12. To force deletion of all in-flight workflows, type `delete all workflows`.

6. Perform the following commands as required for managing workflow timers:

    1. To display a list of active timers for the currently selected workflow definition, type `show timers [all]`.

        This command displays a list of all timers when used with the additional keyword `all`.

7. Perform the following commands as required for managing tasks:

    1. To list tasks assigned to the currently selected user, type `show my tasks`.

    2. To list tasks completed by the currently selected user, type `show my completed`.

    3. To list tasks in a pool for the currently selected user, type `show my pooled`.

    4. To list the tasks associated with the specified workflow `<pathId>`, type `show tasks [<pathId>]`.

        If `<pathId>` is omitted, the tasks associated with the currently selected workflow path are shown.

    5. To describe the task identified by `<taskId>` user, type `desc task <taskId>`.

    6. To update the state of the specified `<taskId>`, type `update task <taskid> [<varName[=varValue>]]*`.

        Task properties are provided as name/value pairs or references to pre-defined variables.

    7. To end the task identified by `<taskId>`, type `end task <taskId> [<transitionName>]`.

        If `<transitionName>` is omitted, the default transition is taken.

    8. To query for tasks, type `query task [predicate]*`.

        If no predicates are provided, all in-progress tasks are returned (across all active workflows).

### Enable workflow process engines {#enableprocessengines}

Content Services workflows run on an embedded Activiti workflow engine. Use Process Engines in the Repo Admin Console to enable Activiti workflows and to edit properties.

1. Open the **Repo Admin Console**.

2. In the **Repository Services** section, click **Process Engines**.

    You see the **Process Engines** page.

3. View the Activiti Workflow Engine properties:

    | Property | Description |
    | -------- | ----------- |
    | Activiti Workflow Enabled | Displays the state of the Activiti workflow engine. This workflow engine is enabled by default. When using only new workflows, you do not need to change any of the settings on this page. |
    | Process Definitions Visible | Specifies whether the Activiti process definitions are available to users, for example `enabled`. |

    The other items show the Activiti engine status details:

    | Status | Description |
    | ------ | ----------- |
    | Currently Running Process Instances | Specifies the number of Activiti process definitions running in the system, for example `0`.|
    | Currently Running Task Instances | Specifies the number of Activiti-defined tasks running in the system, for example `0`. |
    | Process Definitions Deployed | Specifies the number of Activiti process definitions deployed, for example `1`. |

4. For creating your own, more complex workflow definitions, click the **Activiti Workflow Console** link.

5. Click **Save** to apply the changes you've made to the properties.

    If you do not want to save the changes, click **Cancel**.

### Activiti Workflow Console

The Activiti Workflow Console is a web based user interface that allows administration of workflow artifacts.

With the Activiti Workflow Console you can:

* View process definitions
* Manage deployments; deploy, view versions, and delete versions
* Manage process instances
* View task variables
* Examine the process database

To start the Activiti Workflow Console:

1. Launch the [Repo Admin Console]({% link content-services/7.2/admin/admin-console.md %}#launch-admin-console)
2. In the **Repository Services** section, click **Process Engines**
3. In the bottom right panel, click **Activiti Workflow Console**

## Process definitions

You create an Activiti process definition in Content Services using the BPMN 2.0 standard.

The following diagram shows a simple process definition and highlights the terminology used in BPMN 2.0.

![wf-process-definition-diag]({% link content-services/images/wf-process-definition-diag.jpg %})

The underlying definition is an xml file. The root element of the BPMN 2.0 schema is the definitions element, which can contain multiple process definitions. The following image show an empty process definition:

![wf-process-definition-diag-2]({% link content-services/images/wf-process-definition-diag-2.jpg %})

A definitions element contains at least `xmlns` and `targetNamespace` declarations. The `targetNamespace` is an arbitrary string specified by you, and is useful for categorizing process definitions. The process element has two attributes:

| Attribute | Description |
| --------- | ----------- |
| id | *Required*. Maps to the key property of an Activiti `ProcessDefinition` object. The id is used to uniquely identify this process definition, for example when configuring the user interface, or in the Activiti workflow console. |
| name | *Optional*. Maps to the name property of a `ProcessDefinition`. The workflow engine itself does not use this property, but it is used in Alfresco Share for displaying the name in a user interface, so you should specify a name. |

The `BPMNDiagram` element specifies the diagram interchange information for this process. The graphical design tool you use generates this information. This element won't appear when you're creating BPMN 2.0 process definition manually. The interchange information is used to re‐create the diagram both in another graphical designer and in the run‐time environment. Only one diagram is allowed per file, even though there might be more than one process definition.

### Events

An event models something that happens during the lifetime of a process. In a diagram, an event is always visualized as a circle.

There are several types of events defined by BPMN 2.0, of which two always exist in a definition:

| Event | Description |
| ----- | ----------- |
| startEvent | Indicates where a process starts. A start event is triggered by the arrival of a message or similar trigger such as the expiration of a timer. |
| endEvent | Models the end process or subprocess. When process execution arrives in an end event, a result is thrown. |

Events are described in detail in the Activiti user guide.

### Sequence flows

A sequence flow is the connector between two elements of a process.

After an element is visited during process execution, all outgoing sequence flows will be followed. So by default two outgoing sequence flows will create two separate, parallel paths of execution. This behavior can be modified. Sequence flows are described in detail in the Activiti user guide.

### Tasks

The integration of Activiti in Content Services provides three types of tasks in a process definition.

| Task type | Description |
| --------- | ----------- |
| userTask | Describes work to be done by a human actor. When process execution arrives at a user task, a new task is created in the task list of the user or group assigned to that task. |
| scriptTask | Describes an automatic activity. When a process execution arrives at the script task, the corresponding script is executed. |
| mailTask | Similar to a script task, but specifically set up to send an email. |

### Gateways

A gateway is used to model concurrency in a process. It is used to control the flow of execution, or in BPMN 2.0 terminology, the tokens of execution.

A gateway is capable of consuming or generating tokens. It is graphically visualized as a diamond shape, with an icon inside. The icon describes the type of gateway. Gateways are described in detail in the Activiti user guide.

* [Parallel gateways](#parallelgw): Models a fork into multiple paths of execution, or a join of multiple incoming paths of execution.
* [Exclusive gateways](#exclusivegw): Also known as an XOR gateway, this is used to model a decision in a process definition.

#### Parallel gateways {#parallelgw}

A parallel gateway, models a fork into multiple paths of execution, or a join of multiple incoming paths of execution.

| Gateway behavior | Description |
| ---------------- | ----------- |
| fork | All outgoing sequence flows are followed in parallel, creating one concurrent execution for each sequence flow. |
| join | All concurrent executions arriving at the parallel gateway wait at the gateway until execution has completed for each of the incoming sequence flows. The process then continues. |

A parallel gateway can have both fork and join behavior, if there are multiple incoming and outgoing sequence flows for the same parallel gateway. In this case, the gateway will first join all the incoming sequence flows, before splitting into multiple concurrent paths of execution.

A parallel gateway does not evaluate conditions. If conditions are defined on the sequence flow connected with the parallel gateway, they're ignored.

The following diagram shows a definition with two parallel gateways.

![wf-parallel-diag]({% link content-services/images/wf-parallel-diag.jpg %})

The first gateway forks the flow of execution, generating two tokens for two review tasks. When these two tasks are completed, the second parallel gateway joins the two execution. Since there is only one outgoing sequence flow, no concurrent paths of execution will be created, and only the quality assurance task will be active.

Note that a parallel gateway does not need to be 'balanced'. You do not need to specify a matching number of incoming/outgoing sequence flows for corresponding parallel gateways.

#### Exclusive gateways {#exclusivegw}

An exclusive gateway, or XOR gateway is used to model a decision in a process definition.

When the execution of a workflow arrives at this gateway, all outgoing sequence flows are evaluated in the order in which they're defined. The sequence flow whose condition evaluates to true, is selected for propagating the token flow.

Note that the semantics of an outgoing sequence flow:

* In general in BPMN 2.0, all sequence flows whose conditions evaluate to true are selected to continue in a parallel way. When using an exclusive gateway, only one sequence flow is selected.
* When multiple sequence flows have conditions which evaluate to true, only the first one defined is selected to continue the process.
* If no sequence flow can be selected, an exception will be thrown. To ensure a sequence flow will always be selected, have no condition on one of your flows. No condition will always evaluate to true.

The following diagram shows an exclusive gateway that will choose one sequence flow based on the value of a property, in this example, the invoice amount. Only two flows have conditions on them going to CFO Approval and Finance Director Approval. The last sequence flow has no condition, and will be selected by default if the other conditional flows evaluate to false.

![wf-exclusive-diag]({% link content-services/images/wf-exclusive-diag.jpg %})

### Variables

In a process definition each property in the workflow task model corresponds to a variable available in your workflow.

For example, the Content Services supplied BPM task model defines the property `bpm:assignee`. To reference this property in your process definition you would specify the string `bpm_assignee`. Note that the colon character is replaced by an underscore.

Variables in workflows exist at two levels; the process execution level and the task level. If you set the value of a variable in a task, the new value is not available at the process level. If you want to use a variable across tasks, or between a task and conditional flow, you need to copy the variable to the process execution level. Process level variables are available to tasks and sequence flows.

### Node objects

In a process definition, repository node references and associations are represented as node objects in Activiti BPMN 2.0. A node object is an object‐oriented view of an item in the repository. It provides accessors for retrieving and setting properties and traversing associations, and methods for performing alfresco actions such as checkin, checkout, and transforms.

The following variables are set by the start task in your process definition, and are accessible after the start task completes:

| Variable | Description |
| -------- | ----------- |
| bpm_workflowDescription | Description for this in‐flight workflow. |
| bpm_workflowDueDate | Due date for the workflow. |
| bpm_workflowPriority | Priority for the workflow. |
| bpm_package | A Repository Node with aspect `bpm:workflowPackage` representing the Workflow package containing content being routed through the workflow. |
| bpm_context | A Repository Node of type `cm:folder` representing the folder in which the workflow was started. |

There are some special node objects available in the process definition, that are not part of the task model:

| Variable | Description |
| -------- | ----------- |
| initiator | A Repository Node of type `cm:person` representing the person who initiated the workflow. |
| initiatorhome | A Repository Node of type `cm:space` representing the home folder of the person who initiated the workflow. |
| companyhome | A Repository Node of type `cm:space` representing the company home root folder. |

### Listeners

Listeners are an Activiti extension to BPMN 2.0 that implement hook points inside a process definition which are triggered by events during workflow execution. There are two type of listeners, task and execution.

Execution listeners can be configured on the process itself, as well as activities and transitions. Task listeners can only be configured on user tasks.

Listeners enable you to run your own code in the workflow. This can be Javascript or a call to a Java class. The following diagram shows the events in a process definition where you can configure a listener.

![wf-process-definition-listeners]({% link content-services/images/wf-process-definition-listeners.jpg %})

Listeners are described in detail in the Activiti user guide.

#### Task listeners

A task listener must be added to a process definition within a user task. Note that the listener is a child of the BPMN 2.0 `extensionElements` element and is in the activiti namespace since a task listener is an Activiti BPMN 2.0 extension.

The following diagram shows an XML fragment from a process definition that contains Content Services-specific task listener.

![wf-task-listener]({% link content-services/images/wf-task-listener.jpg %})

Listeners are described in detail in the Activiti user guide.

#### Execution listeners

Execution listeners are invoked at point in the process outside of user tasks.

There are three events available:

|Event|Description|
|-----|-----------|
|start|Invoked at the beginning of process execution, before the start event.|
|end|Invoked at the end of the process execution, after the end event.|
|take|Invoked when a sequence flow is invoked.|

The code shows an example of an execution listener to be invoked at the beginning of the process execution.

![wf-execution-listener]({% link content-services/images/wf-execution-listener.jpg %})

Listeners are described in detail in the Activiti user guide.

## Task model

The task model is a description of each task in a workflow. It defines attributes associated with that task. A user interface component can use this description to automatically generate an interface suitable for displaying the task information, in addition to initializing a newly created task instance.

The client configuration allows for customization of the UI component that is used for presenting workflow‐related information to the user and taking inputs from the user. Content Services uses resource bundles to select the text that displays. Resource bundles allow language-specific strings to be used to display information about a workflow or task. The following diagram shows the relationship between the process definition and the task model on the server, and the client configurations and resource bundle in the client.

![wf-task-model]({% link content-services/images/wf-task-model.jpg %})

When creating workflows you'll need to create the process definition using the graphical designer, create a task model to define your specific metadata items required on a task, and optionally look at customizing the user interface to support the custom task model that you've defined. Using a resource bundle is optional.

Content Services ships with two default workflow models that support the default set of process definitions.

|Workflow Model|Description|
|--------------|-----------|
|bpmModel.xml|Is the basic workflow content model|
|workflowModel.xml|Contains more detailed task types and specializes the basic task types from the BPM model|

![wf-task-model-2]({% link content-services/images/wf-task-model-2.jpg %})

The task model is important when considering user interfaces, as the properties from task types are the only properties which can be shown to the user. The following diagram shows how a review task, which is of type `wf:activitiReviewTask` maps to the user interface. The property list in the background is taken from the Activiti workflow explorer.

![wf-task-model-3]({% link content-services/images/wf-task-model-3.jpg %})

### Specify the task type

Each task in a process definition must correspond to a type in the task model. These tasks have properties which the workflow and user interface can use to present and gather information from the user, change the behavior of the workflow, and monitor the workflow. Tasks interact with the form system to display the forms that the user sees in Alfresco Share.

You specify the task type using the `formKey` attribute on a `userTask` element. If you're developing your BPMN from scratch you can specify this in your XML. If you're using the Activiti designer you can specify it under the main configuration for a task.

![wf-task-model-4]({% link content-services/images/wf-task-model-4.jpg %})

## Set up Activiti designer

To create process definitions using a graphical user interface you'll need to set up the Activiti designer.

### Install Eclipse

If you do not already have an instance of Eclipse running on your workstation, you'll need to install one.

1. Download the latest version of [Eclipse](https://www.eclipse.org/downloads/) for your platform.
2. Follow the installation instructions on linked to on the download page.
3. To run Eclipse, follow the advice in the release notes, `readme_eclipse.html`.

You now have a running eclipse instance in which you can install the Activiti designer plugin.

### Install Activiti designer

Activiti supplies an Eclipse plugin, the Activiti designer, that can be used to graphically model, test and deploy BPMN 2.0 processes.

Follow these steps to install the plugin.

1. Start Eclipse.

2. In the eclipse menu bar, click **Help > Install New Software**.

3. Click **Add**.

    The **Add Repository** dialog is displayed.

4. Fill in the name field with ActivitiBPMN 2.0 designer, and fill in the location field with the following URL:

    ```http
    https://www.activiti.org/designer/update/
    ```

5. Click **OK**.

6. Click **Next** and accept any license agreement check boxes, and then click **Finish**.

    Eclipse will install the latest version of the Activiti designer eclipse plugin.

## Deploy task model

You deploy your workflow task model using the Spring "Workflow Deployer" bean. The bean can be used in conjunction with Content Services configuration extension mechanism to deploy custom made workflows and models.

In the following example configuration we are deploying a process definition `adHocModel.bpmn2.0.xml`) and a workflow content model `adHocModel.bpmn2.0.xml`. In both properties, the “location” is the classpath location of the XML file.

```xml
   <bean id="myworkflows.workflowBootstrap" parent="workflowDeployer">
   <property name="models">
      <list>
         <-- Task Model associated with above process definition -->
         <value>alfresco/workflow/adhocModel.xml</value>
      </list>
   </property>
   <property name="workflowDefinitions">
      <props>
         <prop key="engineId">activiti</prop>
         <prop key="location">alfresco/extension/adHocModel.bpmn2.0.xml</prop>
         <prop key="mimetype">text/xml</prop>
         <prop key="redeploy">false</prop>
      </props>
   </property>
</bean>
```

## Deploy process definition

You can deploy a process definition from the Activiti workflow console or you can deploy it manually using a spring bean.

If you use manual deployment, the Content Services server must be shut down. Process definitions will be deployed when Content Services starts.
