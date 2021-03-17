# Business rule task

A Business rule task executes one or more rules. It is mainly there for compatibility with Alfresco Process Services community. Alfresco recommends that you use Decision tables. See LINKHERE for more information.

A business rule is depicted as a rounded rectangle with a table icon in the top-left corner.

![image](../images/bpmn.business-rule-task.png)

|Property|Description|
|--------|-----------|
|Id

|A unique identifier for this element.

|
|Name

|A name for this element.

|
|Documentation

|A description of this element.

|
|Rules

|A comma-separated list of rules to include or exclude in this task.

|
|Input variables

|A comma-separated list of process variables to be used as input variables to your rules.

|
|Exclude

|If you check Exclude only rules that you have not specified in Rules will be executed. If the Exclude is unchecked, only the rules you have specified in Rules will be executed.

|
|Result variable

|The name of a process variable in your process definition in which to store the result of this task. the result variable is returned as a list of objects. If you do not specify a result variable name, the default name `org.activiti.engine.rules.OUTPUT` is used.

|
|Asynchronous

|\(Advanced\) Define this task as asynchronous. This means the task will not be executed as part of the current action of the user, but later. This can be useful if it’s not important to have the task immediately ready.

|
|Exclusive

|\(Advanced\) Define this task as exclusive. This means that, when there are multiple asynchronous elements of the same process instance, none will be executed at the same time. This is useful to solve race conditions.

|
|Execution listeners

|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.

|
|Multi-Instance type

|Determines if this task is performed multiple times and how. For more information on multi-instance, see the Developer Guide. The possible values are:

 -   ****None****

The task is performed once only.

-   ****Parallel****

The task is performed multiple times, with each instance potentially occurring at the same time as the others.

-   ****Sequential****

The task is performed multiple times, one instance following on from the previous one.


|
|Cardinality \(Multi-instance\)

|The number of times the task is to be performed.

|
|Collection \(Multi-instance\)

|The name of a process variable which is a collection. For each item in the collection, an instance of this task will be created.

|
|Element variable \(Multi-instance\)

|A process variable name which will contain the current value of the collection in each task instance.

|
|Completion condition \(Multi-instance\)

|A multi-instance activity normally ends when all instances end. You can specify an expression here to be evaluated each time an instance ends. If the expression evaluates to true, all remaining instances are destroyed and the multi-instance activity ends.

|
|Is for compensation

|If this activity is used for compensating the effects of another activity, you can declare it to be a compensation handler. For more information on compensation handlers see the Developer Guide.

|

**Parent topic:**[Activities](../topics/activities.md)

