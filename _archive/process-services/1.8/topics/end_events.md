# End events

You use an end event to signify the end of a process or sub-process, or the end of a path in a process or sub-process.

In a subprocess or process instance, only when all executions have reached an end event will the subprocess be continued or the whole process instance ended.

An end event is displayed as thick black circle which may contain an icon. If present, the icon shows the type of end event. A none end event has no icon.

-   **[None end event](../topics/none_end_event.md)**  
 A none end event ends the current path of execution.
-   **[Error end event](../topics/error_end_event.md)**  
 You use the end error event to throw an error and end the current path of execution.
-   **[Terminate end event](../topics/terminate_end_event.md)**  
When a terminate end event is reached, the current process instance or sub-process will be terminated. Conceptually, when an execution arrives in a terminate end event, the first scope \(process or sub-process\) will be determined and ended. Note that in BPMN 2.0, a sub-process can be an embedded sub-process, call activity, event sub-process or transaction sub-process. This rule applies in general, for example, when there is a multi-instance call activity or embedded subprocess, only that instance will be ended, the other instances and the process instance are not affected.
-   **[Cancel end event](../topics/cancel_end_event.md)**  
The cancel end event ends the current path of execution and throws a cancel event that can be caught on the boundary of a transaction subprocess.

**Parent topic:**[BPMN editor](../topics/bpmn_editor.md)

