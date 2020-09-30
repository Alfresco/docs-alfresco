---
title: BPMN editor 
---

With the BPMN editor you can create process definitions using the capabilities of BPMN 2.0. You build your process by 
dragging and dropping from a palette of grouped components to a canvas on which your process diagram is built.

![BPMN Editor]({% link process-services/images/app-bpmn-editor-1.png %})

The BPMN editor is structured into several areas:

* **Palette**

    On the left side of BPMN editor is the palette, which consists of collapse-able groups of BPMN objects.

* **Canvas**

    On the right side of BPMN editor is the canvas, where the BPMN objects can be added to create a process model.

* **Properties sheet**

    Below the canvas is the properties sheet, which shows the properties of the selected BPMN object on the canvas, or if no BPMN object is selected, the properties of the process itself. You can click on any of the properties to modify its value. The property sheet is collapse-able to allow you more screen space to view your process diagram.

* **Toolbar**

    The toolbar is displayed on the top with a set of grouped command icons. You can save and validate your model, delete selected elements in the diagram, cut, copy and paste selected elements, undo and redo the last action, zoom the process diagram, eliminate crossing connector lines by adding and removing bend-points, view the BPMN editor tour, and provide feedback to the Process Services team.

    When you first use the BPMN editor, a short guided tour runs showing you the components of the editor and running through the initial steps involved in creating a process definition. You can rerun the tour at any time by clicking the icon in the toolbar.


When you open the BPMN editor to create a new process definition, the canvas already contains a Start Event. 
Clicking on any event on the canvas frames the event icon with a dotted line and reveals a number of controls.

The controls below the icon allow you to delete the BPMN object, or change in to another object in the same group. 
For example, you can change a Start event to a Start timer event. The controls to the right of the icon allow you to 
specify the next object type in the process. The list presented includes only those object types that are valid in 
the sequence after the current object. In addition, there are controls that allow you to create flows connecting 
other existing events in your diagrams, and to annotate the event.

There are two ways of adding BPMN objects to your process:

* Use the controls that appear when you click on a current object icon. Using this method will create a valid 
connector between the current event icon and the new event icon.

* Drag and drop an object icon from the palette. In this case you add flows to the current event icons in the 
process yourself by picking the icons from the palette.


The following object groups are shown in a collapsible list in the palette. The groups consist of all the objects 
available in the BPMN 2.0 specification, and additional Process Services extensions such as the 
Publish to Alfresco task, Publish to Box, Publish to Google Drive.

## Start events

A start event indicates where a process starts. You can define a start event in one of the following ways:

* Start on the arrival of a message
* Start at specific time intervals
* Start as a result of an error
* Start when a specific signal is raised
* Start on no specific trigger

In the XML representation, the type start event is specified as a sub-element.

Start events are always catching: a start event waits until a specific trigger occurs.

### None start event

A start event with an unspecified trigger. BPMN 2.0 refers to this as a none start event. It is visualized as a circle with no icon.

![bpmn.none-start-event]({% link process-services/images/bpmn.none-start-event.png %})

A none start event can have a *start form*. If so, the start form will be displayed when selecting the process definition from the *processes* list. Note that a process instance is not started until the start form is submitted. A none start event without a form will simply have a button displayed to start the process instance.

>**Note:** A subprocess always has a none start event.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this element instance. An execution listener is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Process Initiator|The process variable in which the user ID of the initiator of this instance should be stored.|
|Form key|A key that provides a reference to a form. This property is available for compatibility with Activiti, but should not be used directly when using Forms. Use the `Referenced form` property instead.|
|Referenced form|A form reference.|
|Form properties|A form definition with a list of form properties. Form properties are the way forms are defined in the community version of Process Services. Configuring them has no impact on the rendered form in the Process Services, the `Referenced form` property should be used instead.|

### Start timer event

A timer start event initiates a process instance at specific time. You can use it both for processes which must 
start only once and for processes that must start in repeated time intervals.

It is visualized as a circle with a clock icon.

![bpmn.timer-start-event]({% link process-services/images/bpmn.timer-start-event.png %})

Note that a process instance started by a timer start event can’t have a start form, as it is started by the system. 
Similarly, it does not have a process initiator like a *none start event*. As such when assigning tasks later on in 
the process definition, keep in mind that the assignment *'assigned to process initiator'* will not work.

>**Note:** A subprocess can’t have a timer start event.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this instance.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Time Cycle|A timer cycle defined in [http://en.wikipedia.org/wiki/ISO_8601](http://en.wikipedia.org/wiki/ISO_8601) format, for example: `R3/PT10H`.|
|Time Date in ISO-8601|A point in time defined as a [http://en.wikipedia.org/wiki/ISO_8601](http://en.wikipedia.org/wiki/ISO_8601) date, for example: `2015-04-12T20:20:32Z`.|
|Time Duration|A period of time defined as a [http://en.wikipedia.org/wiki/ISO_8601](http://en.wikipedia.org/wiki/ISO_8601) duration, for example: `PT5M`.|

### Start signal event

A signal start event starts a process instance using a named signal. The signal is fired from a process instance 
using the intermediary signal throw event (or programmatically through the java or REST API). 
In both cases, a process instance for any process definitions that have a signal start event with the same name are started. 
You can select a synchronous or asynchronous start of the process instances.

A signal start event is visualized as a circle with a triangle inside. The triangle is white inside.

![bpmn.signal-start-event]({% link process-services/images/bpmn.signal-start-event.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Signal reference|The name of the signal that initiates this event. Note that signal references are configured on the root level of the process instance and then linked to the signal start event via this property. To configure it, deselect any other element and click the **Signal definitions** property.|

### Start message event

A message start event starts a process instance using a named message. It is mainly used for starting 
process instances from external systems.

It is depicted as a circle with an envelope icon inside. The envelope is white inside.

![bpmn.message-start-event]({% link process-services/images/bpmn.message-start-event.png %})

When you deploy a process definition with one or more message start events, consider the following points:

* The name of the message start event must be unique across the whole process definition. Process Services will throw an exception on deployment of a process definition with two or more message start events that reference the same message or with two or more message start events that reference messages with the same name.
* The name of the message start event must be unique across all deployed process definitions. Process Services will throw an exception on deployment of a process definition with one or more message start events that reference a message with the same name as a message start event already deployed in a different process definition.
* When a new version of a process definition is deployed, the message subscriptions of the previous version are canceled. This is also true for message events that are not present in the new version.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this instance. An execution listener is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Message reference|The name of the message that initiates this event. Note that messages are configured on the root level of the process instance and then linked to the message start event via this property. To configure it, deselect any other element and click the **Message definitions** property.|

### Start error event

An error start event triggers an event Sub-Process. An error start event can’t be used for starting a process instance.

It is visualized as a circle with lightning icon inside. The icon is white inside.

![bpmn.error-start-event]({% link process-services/images/bpmn.error-start-event.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Error reference|The name of the error that initiates this event. This reference needs to match the error identifier thrown by the event that throws the particular error.|

## Activities

An activity describes a single item of work to be performed in a process. Process Services provides some Activity 
types that are additional to those described in the BPMN 2.0 specification.

An activity is always visualized as a rectangle with rounded corners.

### User task

A user task enables you to model work to be done by a human actor. When process execution arrives at a user task in 
the process definition, it creates a new task in the task list of the assignee or assignees defined in the task.

A user task is depicted as a rounded rectangle with a user icon on the top-left corner.

![bpmn.user-task]({% link process-services/images/bpmn.user-task.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Assignment|Configures to who this task should be assigned. It is possible to use **Fixed Values** (advanced usage: these are Process Services expressions, for example by invoking a class or Spring bean) or use the **Identity Store** option. It is recommended to use **Identity Store** to select groups and users in the system:<br><br>**Assigned to process initiator**<br><br>The user that started the process instance will be the assignee of this task.<br><br>**Assigned to process initiator’s (primary) group manager**<br><br>The group manager of the user that started the process instance will be the assignee of this task.<br><br>**Assigned to single user**<br><br>A single user who will be the assignee of the task. This user will see the task in their **Involved tasks** task list. It is possible to reference a user that was selected in a previous form field (tab **Form field**).<br><br>**Assigned to group manager**<br><br>The group manager of the user will be the assignee of the task. Only users that have a primary group defined will have a group manager. To define a primary group, go to **Identity Management** > **Users** > **Select an action** > **Change primary group**.<br><br>**Candidate users**<br><br>One or more users as the **candidate(s)** of the group. The task will show up in their **Queued tasks** task list. The task is not yet assigned to them. They first have to **claim** the task, which will make that one user the assignee. The other users won’t see that task in a task list anymore. It is possible to reference users that were selected in a previous form field (tab **Form field**).<br><br>**Candidate groups**<br><br>One or more groups whose members will be the **candidate** of the group. The task will show up in their **Queued tasks** task list. The task is not yet assigned to them. They first have to **claim** the task, which will make that one user the assignee. The other users won’t see that task in a task list anymore. It is possible to reference groups that were selected in a previous form field (tab **Form field**).<br><br>**Allow process initiator to complete task**<br><br>When checked, the user that started the process instance (process initiator) can complete the task. This is checked by default.|
|Referenced form|Allows to configure or create the form for this task. This form (also called _task form) will be rendered when the task is shown in the task list of the user. A user task typically always has a form defined.|
|Form key|This is a property that exists for compatibility with the community version. When working with task lists and forms, do not set this property.|
|Form properties|This is a property that exists for compatibility with Process Services community. When using Process Services to work with task lists and forms, do not set this property.|
|Due date|Allows to configure a due date for the task. In the task list, tasks can be sorted by due date to see which tasks are needed to be completed the soonest. The possible ways of configuring are:<br><br>**No due date**<br><br>This is the default value.<br><br>**Expression definition (Advanced)**<br><br>Uses an Process Services expression to resolve the due date (for example, this expression could call a Spring bean).<br><br>**Fixed duration after task creation**<br><br>Allows to configure an amount of time, starting from the creation of the task.<br><br>**Based on field**<br><br>Allows to configure the due date based on a previous field in the process instance, by adding or subtracting a certain amount of time.<br><br>**Based on variable**<br><br>Allows to configure the due date based on a variable previously declared in the process instance, by adding or subtracting a certain amount of time.|
|Allow email notifications|When enabled, an email will be sent to the assignee when the task is assigned to them.|
|Email template|The template of the email to use when **Allow email notifications** is enabled. A custom email template can be selected from a list available to the tenant, or a new custom template created for the application. See [custom templates](TODO:custom_email_templates.md) for instructions on creating a template.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be created as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listener lets you execute Java code or evaluate an expression when an event occurs during process execution.|
|Multi-Instance type|Determines if this task is performed multiple times and how. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.<br><br>|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|(Used with Multi-Instance type) The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|

### Service task
### Script task
### Business rule task
### Receive task
### Manual task
### Mail task
### Camel task
### Mule task
### Rest call task
### Generate document task
### Decision task
### Store Entity task
## Structural components
### Sub-process
### Collapsed sub-process
### Event sub-process
### Call activity
## Gateways
### Exclusive gateway
### Parallel gateway
### Inclusive gateway
### Event based gateway
## Boundary events
### Boundary timer event
### Boundary error event
### Boundary signal event
### Boundary message event
### Boundary cancel and compensation event
## Intermediate catching events
## Intermediate throwing events
## End events
### None end event
### Error end event
### Terminate end event
### Cancel end event
## Swimlanes
## Artifacts
## Alfresco Content Services actions
### Publish to Alfresco task / Box / Google Drive
### Retrieve Alfresco Properties
### Update Alfresco Properties
### Call Alfresco Action
