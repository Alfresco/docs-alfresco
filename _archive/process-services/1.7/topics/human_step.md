# Human step

A human step is a task to be completed by a user. You choose who to assign the task to, provide a form for that user to complete, define a due date for the task, and set a timer. If a timer is triggered, it will allow Alfresco Process Services to take an action related to the task, such as reassign it to another user and so on.

The Human step dialog is divided into four tabs:

-   Details tab

-   Form tab

-   Due date tab

-   Timer tab


**Details tab**

|Property|Description|
|--------|-----------|
|Id

|A unique identifier for this element

|
|Name

|A name for the task.

|
|Documentation

|A description of the task.

|
|Assignment

|Configure to who this task should be assigned. You can assign the task to one of the following assignees:

 -   **Assigned to process initiator**

The user that started the process instance, which could be you, or a user you have shared the process definition with. The process initiator is the default assignee.

-   **Assigned to process initiator’s \(primary\) group manager**

The group manager of the user that started the process instance.

-   **Assigned to single user**

When selected, an additional Assignee field is displayed enabling you to search for a single user or select someone using an email address. If that person is not currently an Alfresco Process Services user, they will receive an invite.

-   **Assigned to group manager**

When selected, an additional Group field is displayed enabling you to search for a group manager or select a form field \(providing you have defined a form\). Only users that have a primary group defined will have a group manager. You can define a primary group via **Identity Management** \> **Users** \> **Select an action** \> **Change primary group**.

-   **Candidate users**

When selected, an additional Candidates field is displayed enabling you to add one or more candidates. You can add Alfresco Process Services users or select someone using an email address. If that person is not currently an Alfresco Process Services user, they will receive an invite. All of the selected candidates are eligible to complete the task. The task will show up in their *Queued tasks* task list. The task is not assigned until they have claimed it, which will make the user the assignee.

-   **Candidate groups**

When selected, an additional Groups field is displayed enabling you to add one or more groups of Alfresco Process Services users. The task will show up in their *Queued tasks* task list. The task is not assigned until they’ve claimed it. The other users won’t see that task in a task list anymore.

-   **Allow process initiator to complete a task**

When checked, the user that started the process instance \(process initiator\) can complete the task. This is checked by default. This option is available only for Candidate Groups, Candidate Users, and Assign to single user options.


|

**Form tab**

You can select a form to display when the task runs. You can select an existing form, or create a new one. Forms that you create here while designing your process definition are accessible to steps in this process definition only. Forms that you have designed in the Forms tab of the Alfresco Process Services app can be reused by any process definition owned by someone you have shared the form with. Both types of form are listed in the chooser dialog. You can filter the available list of forms by entering text in the Filter box.

**Due date tab**

If you specify a Due date, then the time remaining until that date will be displayed in the task details when the process is running. If the task is not completed in that time, then the amount of time since the due date is displayed. You have the following options for setting a due date:

-   **No due date for this task**

    This is the default value.

-   **Fixed duration after creation**

    Specifies a Due date in years, months, days, hours, minutes and seconds after the task is started.

-   **Based on field**

    Select a date field from a list of those available in forms of this process definition. You can add or subtract a specified amount of time in years, months, days, hours, minutes and seconds from the value of the chosen date field to create a Due date.

-   **Based on variable**

    Select a variable from the list of those available in forms of this process. You can add or subtract a specified amount of time in years, months, days, hours, minutes and seconds from the value of the chosen date field to create a Due date.


**Timer tab**

Timer is similar to Due date, except you specify a time after which some action will be performed on the task by Alfresco Process Services. You can also specify an action for the task to be taken when the timer completes.

You have three options for setting a timer:

-   **No action**

    This is the default value.

-   **Reassign task**

    You specify another assignee in exactly the same way as you specify the original assignee on the Details tab. When the timer completes, the task is assigned to the specified user, candidates users, or candidate groups.

-   **Keep task**

    When you specify Keep task, a new Timer date reached substep appears inside the current step with the + icon underneath it. You can add one or more subtasks inside this step by clicking this icon. When the timer completes, the task remains active, and the first substep becomes active too. The process continues running substeps as each substep is completed. Note that when you specify substeps here, the list of steps available now includes a **Go to** step. This allows you to choose one of the main process steps to run after this one.

-   **End task**

    When you specify End task, a new Timer date reached substep appears inside the current step with the + icon underneath it. You can add one or more subtasks inside this step by clicking this icon. When the timer completes, the task ends, and the first substep becomes active. The process continues running substeps as each substep is completed. Note that when you specify substeps here, the list of steps available now includes a Goto step. This allows you to choose one of the main process steps to run after this one.

-   **End the process**

    When the timer completes, all active tasks in the process are canceled and the process ends.


**Parent topic:**[Step editor](../topics/step_editor.md)

