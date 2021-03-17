# Choice step

A choice step enables you to start one of two or more sequences of substeps for your process, based on conditions.

Use the Name and Description fields in the choice step dialog to define the task for your task list.

When you select the Choices tab for a new choice step, it shows two choice boxes. You can use the + \(plus\) icon between them to add more choices. Click the choice box you to edit the choice and name it. You can also add from one of the following conditions:

-   **No condition**

    This choice runs its sub-steps if none of the other choices conditions are met. Note that only one of the choices in a choice step can specify this condition for the model to validate. This is the default.

-   **Form field**

    This choice runs its sub-steps if the value of a field in a form satisfies a conditional statement. If you click this option, the following options are available:

    -   Select a field in a form that is used in this process definition.

    -   Choose an operator from equal, not equal, less than, greater than, less than or equal to, greater than or equal to, empty, not empty.

    -   Specify a value. For example, select a radio button field named **direction** from a form, choose the **equals** operator, and type the value **Left**.

-   **Form outcome**

    This choice runs its substeps if the outcome of a form that matches the one specified for the choice is selected by the person assigned with the task. If you click this option, the following options are available:

    -   Select an outcome of a form used in this process definition.

    -   Choose an operator from equals or Not equals.

    -   Select a value of the outcome from the list. For example, select an outcome named **direction** from a form, choose the Equals operator, and choose the value **Turn left** from the drop-down list.


There are two steps that you can add at the end of a substep sequence in a choice step that change the flow of control in the process.

-   **[End process Step](../topics/end_process_step.md)**  
An end process step is available only when defining a substep within a choice step. You use an end process step to stop the process within a choice step in your process definition. Since this is a terminal step, no + \(plus\) icon appears after the step.
-   **[Goto step](../topics/goto_step.md)**  
 The Goto step is available only when defining a substep within a choice step. You use a goto step to jump to a named step within your process definition. Like the End process step, it is a terminal step and no + \(plus\) icon appears after it.

**Parent topic:**[Step editor](../topics/step_editor.md)

