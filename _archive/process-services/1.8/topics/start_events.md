# Start events

A start event indicates where a process starts. You can define a start event in one of the following ways:

-   Start on the arrival of a message

-   Start at specific time intervals

-   Start as a result of an error

-   Start when a specific signal is raised

-   Start on no specific trigger


In the XML representation, the type start event is specified as a sub-element.

Start events are always catching: a start event waits until a specific trigger occurs.

-   **[None start event](../topics/none_start_event.md)**  
A start event with an unspecified trigger. BPMN 2.0 refers to this as a none start event. It is visualized as a circle with no icon.
-   **[Start timer event](../topics/start_timer_event.md)**  
 A timer start event initiates a process instance at specific time. You can use it both for processes which must start only once and for processes that must start in repeated time intervals.
-   **[Start signal event](../topics/start_signal_event.md)**  
A signal start event starts a process instance using a named signal. The signal is fired from a process instance using the intermediary signal throw event \(or programmatically through the java or REST API\). In both cases, a process instance for any process definitions that have a signal start event with the same name are started. You can select a synchronous or asynchronous start of the process instances.
-   **[Start message event](../topics/start_message_event.md)**  
A message start event starts a process instance using a named message. It is mainly used for starting process instances from external systems.
-   **[Start error event](../topics/start_error_event.md)**  
An error start event triggers an event Sub-Process. An error start event can’t be used for starting a process instance.

**Parent topic:**[BPMN editor](../topics/bpmn_editor.md)

