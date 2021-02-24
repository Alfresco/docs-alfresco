# Boundary events

You use boundary events to handle an event associated with an activity. A boundary event is always attached to an activity.

While the activity the boundary event is attached to *is active* \(meaning the process instance execution is currently executing it right there\), the boundary event is listening for a certain type of trigger. When the event is caught, the activity is either interrupted and the sequence flow going out of the event is followed \(interrupting behavior\) or a new execution is created from the boundary event \(non-interrupting behavior\).

-   **[Boundary timer event](../topics/boundary_timer_event.md)**  
A boundary timer event puts a timer on the activity it is defined on. When the timer fires, the sequence flow going out the boundary event is followed.
-   **[Boundary error event](../topics/boundary_error_event.md)**  
A boundary error event catches an error that is thrown within the boundaries of the activity the event is based on and continues process execution from the event.
-   **[Boundary signal event](../topics/boundary_signal_event.md)**  
A boundary signal event listens to a signal being fired \(from within the process instance or system-wide\) while the activity upon which the event is defined is active.
-   **[Boundary message event](../topics/boundary_message_event.md)**  
A boundary message event listens to a message being received while the activity upon which the event is defined is active.
-   **[Boundary cancel and compensation event](../topics/boundary_cancel_and_compensation_event.md)**  


**Parent topic:**[BPMN editor](../topics/bpmn_editor.md)

