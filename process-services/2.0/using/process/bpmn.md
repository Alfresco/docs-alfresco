---
title: Using the BPMN Editor 
---

With the BPMN editor you can create process definitions using the capabilities of BPMN 2.0. You build your process by dragging and dropping from a palette of grouped components to a canvas on which your process diagram is built.

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

When you open the BPMN editor to create a new process definition, the canvas already contains a Start Event. Clicking on any event on the canvas frames the event icon with a dotted line and reveals a number of controls.

The controls below the icon allow you to delete the BPMN object, or change in to another object in the same group. For example, you can change a Start event to a Start timer event. The controls to the right of the icon allow you to specify the next object type in the process. The list presented includes only those object types that are valid in the sequence after the current object. In addition, there are controls that allow you to create flows connecting other existing events in your diagrams, and to annotate the event.

There are two ways of adding BPMN objects to your process:

* Use the controls that appear when you click on a current object icon. Using this method will create a valid connector between the current event icon and the new event icon.

* Drag and drop an object icon from the palette. In this case you add flows to the current event icons in the process yourself by picking the icons from the palette.

The following object groups are shown in a collapsible list in the palette. The groups consist of all the objects available in the BPMN 2.0 specification, and additional Process Services extensions such as the Publish to Alfresco task, Publish to Box, Publish to Google Drive.

## Start events

A start event indicates where a process starts. You can define a start event in one of the following ways:

* [Start on no specific trigger](#none-start-event)
* [Start at specific time intervals](#start-timer-event)
* [Start when a specific signal is raised](#start-signal-event)
* [Start on the arrival of a message](#start-message-event)
* [Start as a result of an error](#start-error-event)

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

A timer start event initiates a process instance at specific time. You can use it both for processes which must start only once and for processes that must start in repeated time intervals.

It is visualized as a circle with a clock icon.

![bpmn.timer-start-event]({% link process-services/images/bpmn.timer-start-event.png %})

Note that a process instance started by a timer start event can’t have a start form, as it is started by the system. Similarly, it does not have a process initiator like a *none start event*. As such when assigning tasks later on in the process definition, keep in mind that the assignment *'assigned to process initiator'* will not work.

>**Note:** A subprocess can’t have a timer start event.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this instance.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Time Cycle|A timer cycle defined in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} format, for example: `R3/PT10H`.|
|Time Date in ISO-8601|A point in time defined as an [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} date, for example: `2015-04-12T20:20:32Z`.|
|Time Duration|A period of time defined as an [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} duration, for example: `PT5M`.|

### Start signal event

A signal start event starts a process instance using a named signal. The signal is fired from a process instance using the intermediary signal throw event (or programmatically through the java or REST API). In both cases, a process instance for any process definitions that have a signal start event with the same name are started. You can select a synchronous or asynchronous start of the process instances.

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

A message start event starts a process instance using a named message. It is mainly used for starting process instances from external systems.

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

An activity describes a single item of work to be performed in a process. Process Services provides some Activity types that are additional to those described in the BPMN 2.0 specification.

The types of activities are:

* [User task](#user-task)
* [Service task](#service-task)
* [Script task](#script-task)
* [Business rule task](#business-rule-task)
* [Receive task](#receive-task)
* [Manual task](#manual-task)
* [Mail task](#mail-task)
* [Camel task](#camel-task)
* [Mule task](#mule-task)
* [REST call task](#rest-call-task)
* [Generate document task](#generate-document-task)
* [Decision task](#decision-task)
* [Store entity task](#store-entity-task)

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
|Email template|The template of the email to use when **Allow email notifications** is enabled. A custom email template can be selected from a list available to the tenant, or a new custom template created for the application. See [custom templates]({% link process-services/2.0/using/process/index.md %}#custom-email-templates) for instructions on creating a template.|
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

Use a service task to invoke an external Java class or execute an expression (for example to call a Spring bean).

A service task is visualized as a rounded rectangle with a cog icon inside.

![bpmn.service-task]({% link process-services/images/bpmn.service-task.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element instance.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Class|The name of the Java class that implements your service task. Your class must implement `JavaDelegate` or `ActivityBehavior`. For more information on methods of invoking Java logic from a service task see the Developer Guide|
|Expression|An expression that either executes logic in the expression itself (for example `${execution.setVariable(myVar, someValue)}`) or calls a method on a bean known by the Activiti engine (for example `${someBean.callMethod}`). You can pass parameters (like the current `execution`) to the method in the expression. For more information on methods of invoking Java logic from a service task see the Developer Guide.|
|Delegate expression||
|Class fields|Field extensions for the service task.|
|Result variable name|The name of a process variable in your process definition in which to store the result of this service task. This is only valid when using an `expression`.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. For more information on multi-instance, see the Developer documentation. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|

For a service task it is recommended to make them asynchronous. For example, suppose a service task is called after the user completes a form. When the service task is synchronous, the logic will be executed during the completion action of the user. This means the user has to wait until this logic is finished to have the UI refreshed. Often, this is not needed or wanted. By making the service task asynchronous, the UI will be refreshed when the task is completed. The logic will be executed later.

### Script task

A script task defines a JavaScript script or other script language (JSR-223 compatible language) that is executed when a process instance executes this step.

A script task is visualized as a rounded rectangle with a paper icon inside.

![bpmn.script-task]({% link process-services/images/bpmn.script-task.png %})

|Property|Description|
|--------|-----------|
|Script format|The [JSR-223](http://jcp.org/en/jsr/detail?id=223) name of the scripting engine your script is written for. By default, Process Services supports **javascript** and **groovy** formats.|
|Script|The actual script that will be executed.|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Variables|In the script, it is possible to set new process variables (using `execution.setVariable(myVariable, myValue)`), however these won’t show up automatically in dropdowns later on (like the sequence flow condition builder, forms, etc.). To make them show up, configure this property with the variables that are set or exported by this script task.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Multi-Instance type|Determines if this task is performed multiple times and how. For more information on multi-instance, The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|

### Business rule task

A Business rule task executes one or more rules.

Business rule tasks are mainly there for compatibility with the community product Activiti. Alfresco recommends that you use [Decision tables]({% link process-services/2.0/using/process/rules.md %}) with Process Services

A business rule is depicted as a rounded rectangle with a table icon in the top-left corner.

![bpmn.business-rule-task]({% link process-services/images/bpmn.business-rule-task.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Rules|A comma-separated list of rules to include or exclude in this task.|
|Input variables|A comma-separated list of process variables to be used as input variables to your rules.|
|Exclude|If you check Exclude only rules that you have not specified in Rules will be executed. If the Exclude is unchecked, only the rules you have specified in Rules will be executed.|
|Result variable|The name of a process variable in your process definition in which to store the result of this task. the result variable is returned as a list of objects. If you do not specify a result variable name, the default name `org.activiti.engine.rules.OUTPUT` is used.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. For more information on multi-instance, see the Developer Guide. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|

### Receive task

A Receive Task waits for the arrival of an external trigger. This trigger is sent programmatically (via Java or REST API). For process to process triggering, use the signal events.

A receive task is visualized as a rounded rectangle with an envelope icon in the top-left corner.

![bpmn.receive-task]({% link process-services/images/bpmn.receive-task.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Variables|When the API is used to trigger the continuation of the process instance, a set of variables can be passed. However, these won’t appear automatically in drop-down lists later (like the sequence flow condition builder, forms, and so on.). To make them appear, this property needs to be configured with those variables that are set or exported by the script task.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. For more information on multi-instance, see the Developer Guide. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|

### Manual task

A Manual Task defines a task that is external to Process Services. You use it to model work done which the Process Engine does not know of. A manual task is handled as a pass-through activity, the Process Engine automatically continues the process from the instant process execution arrives at a manual task activity.

![bpmn.manual-task]({% link process-services/images/bpmn.manual-task.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|

### Mail task

You can enhance your business process with this automatic mail service task that sends emails to one or more recipients. The task supports normal email features such as cc lists, bcc lists, and HTML content.

The mail task is depicted as a rounded rectangle with an envelope icon in the top-left corner.

![bpmn.mail-task]({% link process-services/images/bpmn.mail-task.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|To|The recipient of the e-mail. You can specify multiple recipients in a comma-separated list. When using a fixed value, this can be an expression. It is also possible, like with the user task, to use the **Identity store** option here to pick users that are known in the system or to reference people that were selected in form fields prior to this email task.|
|From|The sender’s email address. If you do not specify this, the default configured system-wide setting **from** address is used. This can be an expression.|
|Subject|The subject of this email. This can be an expression.|
|Cc|The cc list for this email. You can specify multiple recipients in a comma-separated list. This can be an expression.|
|Bcc|The bcc list for this email. You can specify multiple recipients in a comma-separated list. This can be an expression.|
|Text|The text content of this email. You can specify this as well as HTML to support email clients that do not support rich content. The client will fall back to this text-only alternative.|
|Html|The HTML content of this email.|
|Charset|The charset for this email. By default UTF8 will be used.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|

### Camel task

You use the Camel task to send messages to, and receive messages from Apache Camel.

A camel task is visualized as a rounded rectangle with a camel icon in the top-left corner.

![bpmn.camel-task]({% link process-services/images/bpmn.camel-task.png %})

You can find more information on Apache Camel [here](http://camel.apache.org/){:target="_blank"}. Note that Camel is by default not installed and would need to be added by the system admin.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Camel context|A camel context definition. If you do not specify a context, the default Camel context is used.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|

### Mule task

Use the Mule task to send messages to the Mule ESB (Enterprise Service Bus).

A mule task is visualized as a rounded rectangle with the Mule logo in the top-left corner.

![bpmn.mule-task]({% link process-services/images/bpmn.mule-task.png %})

You can find more information on [Mule ESB here](https://www.mulesoft.com/resources/esb/what-mule-esb){:target="_blank"}. Note that Mule is by default not installed and would need to be added by the system admin.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Endpoint url|The Mule endpoint you want to send your message to.|
|Language|The language you want to use to evaluate the payloadExpression, for example [juel](http://juel.sourceforge.net).|
|Payload expression|An expression for the message’s payload.|
|Result variable|The name of the variable to store the result of the invocation.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|

### REST call task

The rest call task is used to communicate with a REST endpoint. The endpoint can be defined in the process definition, or it can be defined company-wide by an administrator. In the latter case, a logical name is all that is needed.

A rest call task is visualized as a rounded rectangle with a rocket icon the top-left corner.

![bpmn.rest-call-task]({% link process-services/images/bpmn.rest-call-task.png %})

Note that the REST call task always is executed asynchronously.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Endpoint|Defines which REST endpoint to call. It is an endpoint defined company-wide by the administrator (simply select a logical name in the dropdown) or a URL. You can also use a previously defined form fields or variables to build up the URL.<br><br>Use the **Test** button to test the end-point.<br><br> ![]({% link process-services/images/endpoint.png %})<br><br>If the request mapping (see next property) contains key/value properties or a JSON template, you will be prompted to provide test values for the parameters before the endpoint is tested.<br><br>![]({% link process-services/images/endpoint-check.png %})|
|Request mapping|Allows to construct the actual request. HTTP GET represents the URL parameters whereas POST/PUT is the JSON body that is created when the request is sent. You can also use fixed values, form fields, or variables defined prior to this activity.<br><br>![]({% link process-services/images/requestmapping.png %})<br><br>For nested or complex request bodies for POST requests, you can specify a JSON Template which is evaluated at run-time.<br><br>![]({% link process-services/images/request-mapping.png %})<br><br>The JSON editor provides syntax highlighting and will highlight any JSON syntax errors on the line number indicator.|
|Response mapping|Maps the JSON response from the REST endpoint to process variables. You can use a nested notation (for example `prop1.prop2.prop3`) for mapping values. The mapped response values can be used as variables in further steps of the process.|

### Generate document task

The Generate document task generates a document in Word or PDF format and stores the reference to the document as a process variable. The document is based on a (Word) template that describes how the document needs to be rendered, using process variables and various constructs (such as if-clauses and loops).

See [Document Templates]({% link process-services/2.0/develop/dev-ext.md %}#document-templates) in the Developing section for how to modify the template for the Generate document task.

A Generate document task appears as a rounded rectangle with a document icon on the top-left corner.

![bpmn.generate-document-task]({% link process-services/images/bpmn.generate-document-task.png %})

|Property|Description|
|--------|-----------|
|ID|A unique identifier for this task element.|
|Name|A name for this task element.|
|Documentation|A description of this task element.|
|Template|The template which is used to generate the document. It can be uploaded as part of the process definition, or can be defined company-wide by an administrator and reused by multiple process definitions.|
|Output format|The document output format will be either PDF or Word.|
|Document variable|This is the process variable in which the reference to the generated document is stored.|
|File name|The name of the document that will be created by the task.|
|Additional data source names|A comma separated list of data sources the document will use as the source of the expressions.|
|Additional data source expressions|A comma separated list of expressions to be included in the document.|

### Decision task

You use a decision task to select a decision table while designing your process model. A decision table enables you to define a set of business rules that will be applied when it’s executed. See the [business rules]({% link process-services/2.0/using/process/rules.md %}) section for more information.

A decision task is depicted as a rounded rectangle with a table icon the top-left corner.

![bpmn.decision-task]({% link process-services/images/bpmn.decision-task.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Reference decision table|Defines the actual decision table that will be executed. The decision table can be part of the process definition (a so-called **embedded** decision table) or defined on itself (a so-called **reusable** decision table).|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|
|Is for compensation|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.|

### Store Entity task

Use the Store entity task to update data models or entities with process values such as variables or form fields. The updated entities can then be mapped to variables and used while creating processes.

![storeentity]({% link process-services/images/storeentity.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Attribute mapping|Attributes mapped for this element instance. Click to invoke the Change value for "Attribute Mapping" dialog, where you can map entities or Data Models with form fields and variables used in your process. See the [Data Models]({% link process-services/2.0/using/process/models.md %}) section for more details.|

## Structural components

You use structural components to group multiple components in a sub process to reuse in a parent process definition,
and to embed and call other process definitions from inside your own process.

The types of structural components are:

* [Sub-process](#sub-process)
* [Collapsed sub-process](#collapsed-sub-process)
* [Event sub-process](#event-sub-process)
* [Call activity](#call-activity)

### Sub-process

A sub process is a single activity that contains activities, gateways, and events which form a process. A sub process is completely embedded inside a parent process.

A sub-process is visualized as a rounded rectangle:

![bpmn.embedded-subprocess]({% link process-services/images/bpmn.embedded-subprocess.png %})

You can use a sub process to create a new scope for events. Events that are thrown during execution of the sub process, can be caught by [Boundary events](#boundary-events) on the boundary of the sub process, creating a scope for that event limited to just the sub process.

Sub-processes must have the following characteristics:

* A sub process has exactly one none start event. No other start event types are permitted. A sub process must have at least one end event.
* Sequence flow cannot cross sub process boundaries.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|

### Collapsed sub-process

You use a collapsed sub-process to add an existing process from your available process definitions as a sub-process to the process definition you are currently editing.

When you drag a collapsed sub-process from the palette to your canvas, and click on the Referenced Subprocess property, you are presented with a visual list of the process definitions you have access to. You can choose from the list, and the chosen process will be added to the current process definition. Note the process chosen must have exactly one none start event, and no other start event type, and it must have at least one end event.

Note that during process instance execution, there is no difference between a collapsed or embedded sub-process. They both share the full process instance context (unlike a [call activity](#call-activity)).

Note that when you click on the plus icon in a collapsed sub-process, the BPMN editor will open the referenced sub-process definition.

A collapsed sub-process is visualized as a rounded rectangle with a plus icon inside.

![bpmn.collapsed-subprocess]({% link process-services/images/bpmn.collapsed-subprocess.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element instance.|
|Referenced Subprocess|The process definition this collapsed sub-process contains.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|

### Event sub-process

An event sub-process is a sub-process that is triggered by an event. You can use an event sub-process in your main process, or in any sub-process.

The event sub-process start event defines the event to be handled by the sub-process, so the type of start event you use must have an event associated with it – none start events are not supported but the event sub-processes. Your event sub-process can be started by a start message event, start signal event or a start error event. The subscription to the start event is created when the scope, process instance or sub-process, hosting the event sub-process is created. The subscription is removed when the scope is destroyed.

Your event sub-process does not have any incoming or outgoing sequence flows. An event sub-process is triggered by an event, so there can be no incoming sequence flow.

The best way to look at an event subprocess is as a *method* or *routine* that is called when something happens, and handle it appropriately.

An event sub-process is visualized like a sub-process with a dashed border.

![bpmn.event-subprocess]({% link process-services/images/bpmn.event-subprocess.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|

### Call activity

A call activity is used to execute another process definition as part of the current process instance.

The main difference between a sub-process and a call activity is that the call activity does not share context with
the process instance. Process variables are explicitly mapped between the process instance and the call activity.

A call activity is visualized as a rounded rectangle with a thick border.

![bpmn.call-activity]({% link process-services/images/bpmn.call-activity.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Called element|This is the identifier of the process definition that should be called.|
|In parameters|Configures the process variables that are mapped into the called process instance when it’s executed. It’s possible to copy values directly (using the **source** attribute) or with an expression (using the **source expression** attribute) in a **target** variable of the called process instance.|
|Out parameters|Configures the process variables that are mapped from the called process instance into the parent process instance.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Execution listeners|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.|
|Multi-Instance type|Determines if this task is performed multiple times and how. The possible values are:<br><br>**None**<br><br>The task is performed once only.<br><br>**Parallel**<br><br>The task is performed multiple times, with each instance potentially occurring at the same time as the others.<br><br>**Sequential**<br><br>The task is performed multiple times, one instance following on from the previous one.|
|Cardinality (Multi-instance)|The number of times the task is to be performed.|
|Collection (Multi-instance)|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.|
|Element variable (Multi-instance)|A process variable name which will contain the current value of the collection in each task instance.|
|Completion condition (Multi-instance)|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.|

## Gateways

You use gateways to control the flow of execution in your process.

In order to explain how Sequence Flows are used within a Process, BPMN 2.0 uses the concept of a token. Tokens traverse sequence flows and pass through the elements in the process. The token is a theoretical concept
used to explain the behavior of Process elements by describing how they interact with a token as it “traverses” the structure of the Process. Gateways are used to control how tokens flow through sequence flows as they converge and diverge in a process.

As the term gateway suggests, it is a gating mechanism that either allows or prevents passage of a token through the gateway. As tokens arrive at a gateway, they can be merged together on input and/or split apart on output from the gateway.

A gateway is displayed as a diamond, with an icon inside. The icon depicts the type of gateway.

The types of gateway are:

* [Exclusive gateway](#exclusive-gateway)
* [Parallel gateway](#parallel-gateway)
* [Inclusive gateway](#inclusive-gateway)
* [Event based gateway](#event-based-gateway)

### Exclusive gateway

You use an exclusive gateway to model a decision in your process. When execution arrives at an exclusive gateway, the outgoing sequence flows are evaluated in the order in which they are defined. The first sequence flow whose condition evaluates to true, or which does not have a condition set, is selected and the process continues.

An exclusive gateway is visualized as a diamond shape with an X inside.

![bpmn.exclusive-gateway]({% link process-services/images/bpmn.exclusive-gateway.png %})

Note that if no sequence flow is selected, an exception will be thrown.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Flow order|Select the order in which the sequence flow conditions are evaluated. The first sequence flow that has a condition that evaluates to true (or has no condition) will be selected to continue.|

### Parallel gateway

You use a parallel gateway to model concurrency in a process. It allows you to fork multiple outgoing paths of execution or join multiple incoming paths of execution.

A parallel gateway is visualized as a diamond shape with a plus icon:

![bpmn.parallel-gateway]({% link process-services/images/bpmn.parallel-gateway.png %})

In a fork, all outgoing sequence flows are followed in parallel, which creates one concurrent execution for each sequence flow.

In a join, all concurrent executions arriving at the parallel gateway wait at the gateway until an execution has arrived for every incoming sequence flow. Then the process continues past the joining gateway. Note that the gateway simply waits until the required number of executions has been reached and does not check if the executions are coming from different incoming sequence flow.

A single parallel gateway can both fork and join, if there are multiple incoming and outgoing sequence flow. The gateway will first join all incoming sequence flows, before splitting into multiple concurrent paths of executions.

>**Note**. Unlike other gateways, the parallel gateway does not evaluate conditions. Any conditions defined on the sequence flow connected with the parallel gateway are ignored.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced)Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|

### Inclusive gateway

You use an inclusive to join and fork multiple sequence flows based on conditions.

Like an exclusive gateway you can define conditions on outgoing sequence flows and the inclusive gateway will evaluate them, but an inclusive gateway can take more than one sequence flow, like the parallel gateway.

All outgoing sequence flow conditions are evaluated. Every sequence flow with a condition that evaluates to true, is followed in parallel, creating one concurrent execution for each sequence flow.

The join behavior for an inclusive gateway is more complex than the parallel gateway counterparts. All concurrent executions arriving at the inclusive gateway wait at the gateway until executions that *can* reach the inclusive gateway have reached the inclusive gateway. To determine this, all current executions of the process instance are evaluated, checking if there is a path from that point in the process instance to the inclusive gateway. (ignoring any conditions on the sequence flow). When one such execution is found, the inclusive gateway join behavior does not activate.

An inclusive gateway is visualized as a diamond shape with a circle icon inside:

![bpmn.inclusive-gateway]({% link process-services/images/bpmn.inclusive-gateway.png %})

Note that an inclusive gateway can have both fork and join behavior, in which case there are multiple incoming and outgoing sequence flows for the same inclusive gateway. The gateway will join all incoming sequence flows that have a process token, before splitting into multiple concurrent paths of executions for the outgoing sequence flows that have a condition that evaluates to true.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element instance.|
|Name|A name for this element instance.|
|Documentation|A description of this element instance.|
|Asynchronous|(Advanced) Define this task as asynchronous. That is, the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. That is, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Flow order|Select the order in which the sequence flow conditions are evaluated. This is of less importance as for the exclusive gateway, as all outgoing sequenceflow conditions will be evaluated anyway.|

### Event based gateway

You use an event gateway to route process flow based on events.

Each outgoing sequence flow of the event gateway must be connected to an intermediate catching event. When process execution reaches an event gateway execution is suspended, and for each outgoing sequence flow, an event subscription is created. The flow for the event that occurs first, will be followed.

Outgoing sequence flows connect to an event gateway are never "executed", but they do allow the process engine to determine which events an execution arriving at an event-based gateway needs to subscribe to. The following restrictions apply to event gateways:

* The gateway must have two or more outgoing sequence flows.
* An event-based gateway can only be followed by intermediate catching events. Receive tasks after an event gateway are not supported by Process Services.
* An intermediate catching event connected to an event gateway must have a single incoming sequence flow.

An event gateway is visualized as a diamond shape with a plus icon inside. Unlike the parallel gateway, the plus icon is not colored black inside:

![bpmn.event-gateway]({% link process-services/images/bpmn.event-gateway.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element instance.|
|Name|A name for this element instance.|
|Documentation|A description of this element instance.|
|Asynchronous|(Advanced) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.|
|Exclusive|(Advanced) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.|
|Flow order|Select the order in which the sequence flow conditions are evaluated.|

## Boundary events

You use boundary events to handle an event associated with an activity. A boundary event is always attached to an activity.

While the activity the boundary event is attached to *is active* (meaning the process instance execution is currently executing it right there), the boundary event is listening for a certain type of trigger. When the event is caught, the activity is either interrupted and the sequence flow going out of the event is followed (interrupting behavior) or a new execution is created from the boundary event (non-interrupting behavior).

The types of boundary event are:

* [Boundary timer event](#boundary-timer-event)
* [Boundary error event](#boundary-error-event)
* [Boundary signal event](#boundary-signal-event)
* [Boundary message event](#boundary-message-event)
* [Boundary cancel and compensation event](#boundary-cancel-and-compensation-event)

### Boundary timer event

A boundary timer event puts a timer on the activity it is defined on. When the timer fires, the sequence flow going out the boundary event is followed.

A boundary timer event is visualized as a circle with a clock icon inside:

![bpmn.boundary-timer]({% link process-services/images/bpmn.boundary-timer.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Cancel activity|Defines if the boundary event interrupts the activity is defined upon or not.|
|Time Cycle|A timer cycle defined in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} format, for example: `R3/PT10H`.|
|Time Date in ISO-8601|A point in time defined as an [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} date, for example: `2015-04-12T20:20:32Z`.|
|Time Duration|A period of time defined as a [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} duration, for example: `PT5M`.|

### Boundary error event

A boundary error event catches an error that is thrown within the boundaries of the activity the event is based on and continues process execution from the event.

A boundary error event is always interrupting.

A boundary timer event is visualized as a circle with a lightning icon inside:

![bpmn.boundary-error]({% link process-services/images/bpmn.boundary-error.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Error reference|The identifier of the error to catch.|

### Boundary signal event

A boundary signal event listens to a signal being fired (from within the process instance or system-wide) while the activity upon which the event is defined is active.

A boundary signal event is visualized as a circle with a triangle icon inside:

![bpmn.boundary-signal]({% link process-services/images/bpmn.boundary-signal.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Signal reference|The signal to listen to. Signals are defined on the root process definition level and are linked with this property.|

### Boundary message event

A boundary message event listens to a message being received while the activity upon which the event is defined is active.

A boundary message event is visualized as a circle with an envelope icon inside:

![bpmn.boundary-message]({% link process-services/images/bpmn.boundary-message.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Message reference|The message to listen to. Messages are defined on the root process definition level and are linked with this property.|

### Boundary cancel and compensation event

The boundary cancel and compensation event are currently experimental features. See [http://activiti.org/userguide/index.html#bpmnBoundaryCancelEvent](https://www.activiti.org/5.x/userguide/index.html#bpmnBoundaryCancelEvent){:target="_blank"} for more information on them.

## Intermediate catching events

An intermediate catching event is a step in the process where the process needs to wait for a specific trigger (in BPMN this is described as *catching* semantics).

An intermediate event is displayed as two concentric circles containing an icon. The icon shows the type of intermediate event:

![bpmn.intermediate-catch-events]({% link process-services/images/bpmn.intermediate-catch-events.png %})

Conceptually, the intermediate catch events are close to the boundary events, with that exception they don’t define a scope (the activity) for when the event is active. An intermediate catch event is active as long as the trigger hasn’t happened. A boundary event on the other hand can be destroyed if the activity completed.

All the supported intermediate catch events are configured similar to their boundary event counterparts.

## Intermediate throwing events

An intermediate throw event is used to explicitly throw an event of a certain type.

Currently, two types are supported:

* The **none intermediate throwing event**. No event is thrown. This is mainly used as a marker in the process definition (for example to attach execution listeners that are used to indicate somehow that some state in the process has been reached).
* The **signal intermediate throwing event**. Throws a signal event that will be caught by boundary signal events or intermediate signal catch events listening to that particular signal event.

An intermediate event is displayed as two concentric circles which may contain an icon. If present, 
the icon shows the type of intermediate event. A throwing none event contains no icon.

## End events

You use an end event to signify the end of a process or sub-process, or the end of a path in a process or sub-process.

In a subprocess or process instance, only when all executions have reached an end event will the subprocess be continued or the whole process instance ended.

An end event is displayed as thick black circle which may contain an icon. If present, the icon shows the type of end event. A none end event has no icon.

The types of end event are:

* [None end event](#none-end-event)
* [Error end event](#error-end-event)
* [Terminate end event](#terminate-end-event)
* [Cancel end event](#cancel-end-event)

### None end event

A none end event ends the current path of execution.

![bpmn.none-end-event]({% link process-services/images/bpmn.none-end-event.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this event.|

### Error end event

You use the end error event to throw an error and end the current path of execution.

![bpmn.error-end-event]({% link process-services/images/bpmn.error-end-event.png %})

The error can be caught by an intermediate boundary error event that matches the error. If no matching boundary error event is found, an exception will be thrown

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this instance.|
|Error reference|The error identifier. This is used to find a matching catching boundary error event. If the name does not match any defined error, then the error is used as the error code in the thrown exception.|

### Terminate end event

When a terminate end event is reached, the current process instance or sub-process will be terminated. Conceptually, when an execution arrives in a terminate end event, the first scope (process or sub-process) will be determined and ended. Note that in BPMN 2.0, a sub-process can be an embedded sub-process, call activity, event sub-process or transaction sub-process. This rule applies in general, for example, when there is a multi-instance call activity or embedded subprocess, only that instance will be ended, the other instances and the process instance are not affected.

![bpmn.terminate-end-event]({% link process-services/images/bpmn.terminate-end-event.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this.|

### Cancel end event

The cancel end event ends the current path of execution and throws a cancel event that can be caught on the boundary of a transaction subprocess.

![bpmn.cancel-end-event]({% link process-services/images/bpmn.cancel-end-event.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Execution listeners|Execution listeners configured for this.|

## Swimlanes

You use swimlanes to display activities in your process divided by business function or participant group. A process definition can have one swimlane diagram containing one pool, which in turn contains one or more lanes. The pool represents the whole process, and each lane corresponds to a business function or participant group.

For example, the process of selling a book consists of several activities: ordering a book, processing the order, shipping the book, and reading the book. However, the activities are performed by participants in different groups: by the customer, by the sales department, by the warehouse, or store. In the following diagram, process definitions have one pool called Sell a book with three lanes: Customer, Sales, and Store. The process sequence flow moves between lanes in the pool as the order progresses.

![bpmn.swimlanes.png]({% link process-services/images/bpmn.swimlanes.png %})

When you drag a pool to your process diagram, it creates an unnamed pool containing one unnamed lane. You can add lanes by dragging a lane icon from the palette to the canvas. When you hover over the name box of the pool, the whole pool border turns green, indicating the lane will be added to the pool when you release the mouse button.

## Artifacts

You use artifacts to provide additional information about the process. The BPMN editor supports the text annotation artifact which associates additional text to an element in your process, or to the process itself. The text does not influence the execution of a process and is provided by the process designer to give information to the user of the process.

**Text annotation**

You can set the following properties in the property sheet:

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element instance|
|Name|A name for this element instance|
|Documentation|A description of this element instance|
|Text|The text you want to display in your annotation|

## Alfresco Content Services actions

Use this section for actions specific to Alfresco Content Services content store:

* Publish to Alfresco task - upload content to Alfresco Repository
* Retrieve Alfresco Properties - fetch metadata (properties) for content in the Alfresco Repository
* Update Alfresco Properties - update metadata (properties) for content in the Alfresco Repository
* Call Alfresco Action - invoke a Repository Action

### Publish to Alfresco task / Box / Google Drive

The publish task enables you to publish items that were created or modified during process instance execution to a content store. Currently, the following content stores are supported:

* Alfresco Content Services
* Box
* Google Drive

A publish task is depicted as a rounded rectangle with the icon of the content store on the top-left corner.

![bpmn.publish-task.png]({% link process-services/images/bpmn.publish-task.png %})

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Alfresco / Box / Google Drive Content|Configures what content to publish. You can select a previously defined form field or all the content that was updated during the process instance execution.|
|Alfresco / Box / Google Drive Destination|Configures where the content will be published to. You can publish the content using the process initiator or a specific user (this is important when it comes to permissions in the content store).|

### Retrieve Alfresco Properties

The Retrieve Alfresco Properties option enables you to retrieve content-specific properties from Alfresco Content Services and map it to a form field or variable, for example properties of a document. You can retrieve document information after a document is added or referenced via the Attachment form field in Share Connector.

|Property|Description|
|--------|-----------|
|Id|A unique identifier for this element.|
|Name|A name for this element.|
|Documentation|A description of this element.|
|Alfresco properties|Retrieves Alfresco Content Services properties for content stored in the form editor or variable, and allows mapping them.|

### Update Alfresco Properties

The Update Alfresco Properties option enables you to update content-specific properties in Alfresco Content Services via a form field or variable. For example, you can update properties of a document linked from Alfresco Content Services via a form attachment field, or process variable.

The Properties sheet displays the same fields as Retrieve Alfresco properties, except that is used for updating properties rather than retrieving.

### Call Alfresco Action

See this [documentation]({% link process-services/2.0/using/process/step.md %}#call-alfresco-action).
