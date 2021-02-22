# Creating your first process

In Process Services, you create a process models to represent a series of tasks in your business process. This tutorial guides you through creating a simple process model.

The process you are modeling here is a simplified business project lifecycle. Each project has a name, type, due date, and documents associated with it. Each project is started, and then reviewed to determine if it should be accepted on to the project list, or rejected.

1.  From your landing page, click the **App Designer** app tile.
2.  Click the **Create Process** Button.

    The Create a new business process model dialog appears.

3.  Give your new process model a name.

    For example, **First Process**.

4.  In the Editor type drop-down, select the Step editor.
5.  Click **Create new model**.

    The Step editor is displayed.

    The first step, Process start, is already added to your process. You are going to set the process to start by having the user complete a form.

6.  Click on the Process start step.

    It expands to allow you to change the step.

    If you have some forms in your Forms library, they will be listed here, and you can pick one, but in this tutorial we will create a new form.

7.  Click on the Start form box.
8.  Click **Create form**.

    The Create a new form dialog appears. The form you create now is part of this process model and is not available in your forms library for use in other process models. If you want to create a form you can reuse in other process models you can do so from the Forms page.

9.  Give the new form a name.

    For example, `Start form`.

10. Click **Create new form**.

    The Form Editor is displayed. Design the form by dragging and dropping the field types from the palette to the Form Editor. You can hover over each field in the Design area, and click the pencil icon to edit the field properties, or to remove the field from the form. Each field type offers different options. You can also add a display label in the process to reference a value entered in a field by a user in a running process. You can also define if the field is mandatory for the form to be completed. In this tutorial, you just give labels to the fields.

11. Drag and drop the required fields from the palette to the canvas on the right-hand side.

    From the screen shot you can see your form has four fields.

    1.  A Text field for the project name.
    2.  A Date field for the project’s start date.
    3.  A group of three Radio buttons to select the project type.
    4.  An Attach control to allow the user to store project documents.
12. Click the **Save** icon to save your form.

    You are back in the Step editor.

13. Clicking the + icon below the Process start box to add the first step in your process.

    You need to add a Human step that can be used to assign a task to a user.

14. Select the Human step and fill in a name in the step box just created.

    For this tutorial, use the name `Review project`.

    The Human step allows you to select who the task should be assigned to. You can assign the person who initiated the process, a single named user, a set of candidate users, or depending on the type of your account, a group of users. When a task is assigned to a group or a list of candidate users, all of those users can see the task in their task list, and will need to claim it in order to complete the task. For this tutorial, you will assign all tasks to the process initiator, that’s you, so you can run the process and see the tasks yourself.

15. You need to create a form to allow review comments before we create the next step in the process.
    1.  On the Form tab for the Review project step, create a new form called `decide`.
    2.  Add a Multiline text field and name it **Review comment**.
    3.  Select the Outcomes tab and choose the Use custom outcomes for this form option, and add two outcomes: Accept and Reject.
    4.  Save the form, and return to the step editor.
16. Add a Choice step by clicking the + icon below the Review Project step.

    This step allows you to take a different action depending on the outcome selected in the associated form.

    You can add more choices by clicking on the + icon in the middle of the Choice step. For this tutorial, we only need two based on your accept and reject outcomes.

17. Click on the First choice box. A dialog allows you to select a condition based on existing form fields or outcomes. For this tutorial, set the First choice to a Form outcome. Choose the `decide` form from the drop-down list of those already added to the process, and then select it to be Equals, to the value Accept.
18. Click on the Second choice box, and repeat the last step, this time choosing the value Reject.
19. You need to add a task to be done if a project review is accepted.
    1.  Under the First choice click the + icon.
    2.  Add a Human step with the name `Update project list`.
20. You need to add a task to be done if a project review is rejected.
    1.  Under the Second choice click the + icon.
    2.  Add a Human step with the name `Inform project leader of rejection`.
    3.  Since the process should stop after rejection, add an End process step under the `Inform project leader of rejection` step.
21. Add a final step after the accept/reject choice step to display the project details by clicking the + icon at the bottom of the step diagram.
    1.  Add a Human step with the name `Show Project Details`.
    2.  On the Form tab for this step, create a new form. Drag a Display text field to the canvas, and enter a text message to display.

        The text can contain references to values for forms in the process. In addition, there is a helper drop-down list from which a form field reference can be selected. It is inserted at the current cursor position in the text.

    3.  Save the form.

        The step editor is displayed.

22. Save your completed process model.

    Your process is listed in the Process tab as a thumbnail of the process. You can edit any process from the list by clicking the BPMN Editor button in the top right corner of the thumbnail. You can see additional information about a model by clicking on the thumbnail itself or the Show Details button in the top right corner of the thumbnail. This takes you to the Details page for the process model. Here, you can see a read-only preview of the model and the actions you can perform on it.


Now that you have created a process, you need to create your first app so you can publish and deploy your process model.

**Parent topic:**[Process Services Landing Page](../concepts/Landing-page.md)

