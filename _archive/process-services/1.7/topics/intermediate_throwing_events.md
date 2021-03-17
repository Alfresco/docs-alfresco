# Intermediate throwing events

An intermediate throw event is used to explicitly throw an event of a certain type.

Currently, two types are supported:

-   The **none intermediate throwing event**. No event is thrown. This is mainly used as a marker in the process definition \(for example to attach execution listeners that are used to indicate somehow that some state in the process has been reached\).

-   The **signal intermediate throwing event**. Throws a signal event that will be caught by boundary signal events or intermediate signal catch events listening to that particular signal event.


An intermediate event is displayed as two concentric circles which may contain an icon. If present, the icon shows the type of intermediate event. A throwing none event contains no icon.

**Parent topic:**[BPMN editor](../topics/bpmn_editor.md)

