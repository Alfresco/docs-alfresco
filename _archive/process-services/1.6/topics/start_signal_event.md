# Start signal event

A signal start event starts a process instance using a named signal. The signal is fired from a process instance using the intermediary signal throw event \(or programmatically through the java or REST API\). In both cases, a process instance for any process definitions that have a signal start event with the same name are started. You can select a synchronous or asynchronous start of the process instances.

A signal start event is visualized as a circle with a triangle inside. The triangle is white inside.

![image](../images/bpmn.signal-start-event.png)

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

|Execution listeners configured for this instance. An execution listeners is a piece of logic that is not shown in the diagram and can be used for technical purposes.

|
|Signal reference

|The name of the signal that initiates this event. Note that signal references are configured on the root level of the process instance and then linked to the signal start event via this property. To configure it, deselect any other element and click the *Signal definitions* property.

|

**Parent topic:**[Start events](../topics/start_events.md)

