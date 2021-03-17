# None start event

A start event with an unspecified trigger. BPMN 2.0 refers to this as a none start event. It is visualized as a circle with no icon.

![image](../images/bpmn.none-start-event.png)

A none start event can have a *start form*. If so, the start form will be displayed when selecting the process definition from the *processes* list. Note that a process instance is not started until the start form is submitted. A none start event without a form will simply have a button displayed to start the process instance.

**Note:**

A subprocess always has a none start event.

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
|Execution listeners

|Execution listeners configured for this element instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.

|
|Process Initiator

|The process variable in which the user ID of the initiator of this instance should be stored.

|
|Form key

|A key that provides a reference to a form. This property is available for compatibility with Alfresco Process Services community, but should not be used directly when using Forms. Use the *Referenced form* property instead.

|
|Referenced form

|A form reference.

|
|Form properties

|A form definition with a list of form properties. Form properties are the way forms are defined in the community version of Alfresco Process Services. Configuring them has no impact on the rendered form in the Alfresco Process Services, the *Referenced form* property should be used instead.

|

**Parent topic:**[Start events](../topics/start_events.md)

