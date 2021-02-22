# Start message event

A message start event starts a process instance using a named message. It is mainly used for starting process instances from external systems.

It is depicted as a circle with an envelope icon inside. The envelope is white inside.

![image](../images/bpmn.message-start-event.png)

When you deploy a process definition with one or more message start events, consider the following points:

-   The name of the message start event must be unique across the whole process definition. Alfresco Process Services will throw an exception on deployment of a process definition with two or more message start events that reference the same message or with two or more message start events that reference messages with the same name.

-   The name of the message start event must be unique across all deployed process definitions. Alfresco Process Services will throw an exception on deployment of a process definition with one or more message start events that reference a message with the same name as a message start event already deployed in a different process definition.

-   When a new version of a process definition is deployed, the message subscriptions of the previous version are canceled. This is also true for message events that are not present in the new version.


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
|Message reference

|The name of the message that initiates this event. Note that messages are configured on the root level of the process instance and then linked to the message start event via this property. To configure it, deselect any other element and click the *'Message definitions'* property.

|

**Parent topic:**[Start events](../topics/start_events.md)

