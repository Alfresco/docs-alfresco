# Intermediate catching events

An intermediate catching event is a step in the process where the process needs to wait for a specific trigger \(in BPMN this is described as *catching* semantics\).

An intermediate event is displayed as two concentric circles containing an icon. The icon shows the type of intermediate event:

![image](../images/bpmn.intermediate-catch-events.png)

Conceptually, the intermediate catch events are close to the boundary events, with that exception they don’t define a scope \(the activity\) for when the event is active. An intermediate catch event is active as long as the trigger hasn’t happened. A boundary event on the other hand can be destroyed if the activity completed.

All the supported intermediate catch events are configured similar to their boundary event counterparts.

**Parent topic:**[BPMN editor](../topics/bpmn_editor.md)

