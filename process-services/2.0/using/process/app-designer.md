---
title: Using the App Designer
---

Use the App Designer to create process models, forms, app definitions, and share your models and definitions with others. As you create items, they appear as tiles on their respective page. The Last Modified drop-down on the top-right enables you to sort the display order ranging from last modified, oldest first, name order, or reverse name order. Use the filter on the left to filter the list of displayed items. Additionally, if you are unable to find a specific process, use the search box to find more processes. If your processes require human input, then you will need forms to gather it.

![Kickstart App]({% link process-services/images/app-kickstart.png %})

You can filter the list of Business Process Models using the following options on the left:

* **My items** - View all your processes / app definitions / data models / stencils / reusable forms / reusable decision tables. The filter name changes based on the tab you are in. For example, in case of the Forms tab, it changes to My reusable forms and to My App definitions when you are in the Apps tab.
* **Shared with Me** - View items shared by others with you.
* **Shared with Others** - View items that you have shared with others.
* **Favorited** - View your favorite items.
* **Everyone’s** - View all processes regardless of who created them.

>**Note:** The **Everyone’s** filter is applicable for admin purposes only. You can’t use this option to allow others to reuse the model. To allow someone else to use this model, it has to be shared first.

The App Designer panel includes the following tabs:

* **Processes** - Provide tools for creating new processes, modifying existing processes, and importing processes from outside Process Services. If your account has the capability, you can also import existing models that are defined in BPMN 2.0 standard format.

>**Note:** If you haven’t created any processes yet, then you will see shortcuts for creating a process. You can use the simple [Step editor]({% link process-services/2.0/using/process/step.md %}), or the more powerful [BPMN editor]({% link process-services/2.0/using/process/bpmn.md %}). If you are not familiar with the BPMN 2.0 Business Process Model language, then the Step Editor is for you. However, if you’d like to create complex processes, then the BPMN Editor will let you use the full power of the language. It’s helpful if you’re familiar with BPMN 2.0 for using the BPMN Editor.

* **Forms** - Provide tools for creating new forms, and modifying existing forms. Filter the list of displayed forms using the options on the left. You can view all your forms, or just those shared by others with you, or those you have shared with others, or just those you have favorited. If you haven’t created any forms yet, then a new button called Create a new form now! will appear on the **Forms** tab.

* **Decision Tables** - List decision tables that can be used across processes. Decision tables are an easy way to define business rules.

* **Apps** - Create new apps, modify existing apps, and import apps from outside Process Services. You create an app to group one or more of your processes, so you manipulate them as one unit. You can make an app available for yourself and share it with others. An app can contain no process at all, which allows you to create simple task list.

* **Data Models** - Enable you to map your business data with a relational database or a custom API such as a customer database, patient database, and so on. You can create business objects to connect to an external database that can be accessed by all processes in your application.

* **Stencils** - A stencil is a palette consisting of both standard and customized controls that are common to the Step editor, BPMN editor, and Forms editor. When you create a process or a form, you can specify a specific stencil or use the default for the editor you are using.

    >**Note:** When editing a form in the form editor, you can change the existing stencil assigned to the form.

    1. Click the Form Stencils drop-down list in the upper right corner of the screen.
    2. Select a stencil from the list.
    3. The new stencil is assigned to the form and its controls appear in the form palette.

    >**Note:** When you change stencils and a field existing in the form canvas is not available in the new stencil, a validation error is displayed. To resolve this issue, remove the field from the form canvas.

## App Designer editor

Open the App Designer editor by clicking a process definition, reusable form, reusable decision table, app definition,
data models, or the stencils tab. The App Designer editor provides features such as copy, comment, delete, add to favorites, share with others, and export. You can also open the corresponding editor to make changes to the content, and perform actions specific to the item type. For example, you can publish an app definition or edit a process.

![Kickstart App Editor]({% link process-services/images/app-kickstart-editor-1.png %})

In the above example, the App Designer editor was opened for an app definition called publisher. The editor always displays the details of the selected item on the top panel along with a set of buttons on the top right. The right-most button opens the editor corresponding to the item displayed. So in the example, the right-most button opens the app editor. If a process definition created via the step editor is opened in the App Designer editor, then the App Editor would open the step editor.

## Create your first process

In Process Services, you create a process models to represent a series of tasks in your business process. This tutorial guides you through creating a simple process model.

The process you are modeling here is a simplified business project lifecycle. Each project has a name, type, due date, and documents associated with it. Each project is started, and then reviewed to determine if it should be accepted on to the project list, or rejected.

1. From your landing page, click the **App Designer** app tile.

2. Click the **Create Process** Button.

    The Create a new business process model dialog appears.

3. Give your new process model a name.

    For example, **First Process**.

4. In the Editor type drop-down, select the Step editor.

5. Click **Create new model**.

    The Step editor is displayed.

    The first step, Process start, is already added to your process. You are going to set the process to start by having the user complete a form.

6. Click on the Process start step.

    It expands to allow you to change the step.

    If you have some forms in your Forms library, they will be listed here, and you can pick one, but in this tutorial we will create a new form.

7. Click on the Start form box.

8. Click **Create form**.

    The Create a new form dialog appears. The form you create now is part of this process model and is not available in your forms library for use in other process models. If you want to create a form you can reuse in other process models you can do so from the Forms page.

9. Give the new form a name.

    For example, `Start form`.

10. Click **Create new form**.

    The Form Editor is displayed. Design the form by dragging and dropping the field types from the palette to the Form Editor. You can hover over each field in the Design area, and click the pencil icon to edit the field properties, or to remove the field from the form. Each field type offers different options. You can also add a display label in the process to reference a value entered in a field by a user in a running process. You can also define if the field is mandatory for the form to be completed. In this tutorial, you just give labels to the fields.

11. Drag and drop the required fields from the palette to the canvas on the right-hand side.

    From the screen shot you can see your form has four fields.

    1. A Text field for the project name.
    2. A Date field for the project’s start date.
    3. A group of three Radio buttons to select the project type.
    4. An Attach control to allow the user to store project documents.

12. Click the **Save** icon to save your form.

    You are back in the Step editor.

13. Clicking the + icon below the Process start box to add the first step in your process.

    You need to add a Human step that can be used to assign a task to a user.

14. Select the Human step and fill in a name in the step box just created.

    For this tutorial, use the name `Review project`.

    The Human step allows you to select who the task should be assigned to. You can assign the person who initiated the process, a single named user, a set of candidate users, or depending on the type of your account, a group of users. When a task is assigned to a group or a list of candidate users, all of those users can see the task in their task list, and will need to claim it in order to complete the task. For this tutorial, you will assign all tasks to the process initiator, that’s you, so you can run the process and see the tasks yourself.

15. You need to create a form to allow review comments before we create the next step in the process.
    1. On the Form tab for the Review project step, create a new form called `decide`.
    2. Add a Multiline text field and name it **Review comment**.
    3. Select the Outcomes tab and choose the Use custom outcomes for this form option, and add two outcomes: Accept and Reject.
    4. Save the form, and return to the step editor.

16. Add a Choice step by clicking the + icon below the Review Project step.

    This step allows you to take a different action depending on the outcome selected in the associated form.

    You can add more choices by clicking on the + icon in the middle of the Choice step. For this tutorial, we only need two based on your accept and reject outcomes.

17. Click on the First choice box. A dialog allows you to select a condition based on existing form fields or outcomes. For this tutorial, set the First choice to a Form outcome. Choose the `decide` form from the drop-down list of those already added to the process, and then select it to be Equals, to the value Accept.

18. Click on the Second choice box, and repeat the last step, this time choosing the value Reject.

19. You need to add a task to be done if a project review is accepted.
    1. Under the First choice click the + icon.
    2. Add a Human step with the name `Update project list`.

20. You need to add a task to be done if a project review is rejected.
    1. Under the Second choice click the + icon.
    2. Add a Human step with the name `Inform project leader of rejection`.
    3. Since the process should stop after rejection, add an End process step under the `Inform project leader of rejection` step.

21. Add a final step after the accept/reject choice step to display the project details by clicking the + icon at the bottom of the step diagram.
    1. Add a Human step with the name `Show Project Details`.
    2. On the Form tab for this step, create a new form. Drag a Display text field to the canvas, and enter a text message to display.

        The text can contain references to values for forms in the process. In addition, there is a helper drop-down list from which a form field reference can be selected. It is inserted at the current cursor position in the text.

    3. Save the form.

        The step editor is displayed.

22. Save your completed process model.

    Your process is listed in the Process tab as a thumbnail of the process. You can edit any process from the list by clicking the BPMN Editor button in the top right corner of the thumbnail. You can see additional information about a model by clicking on the thumbnail itself or the Show Details button in the top right corner of the thumbnail. This takes you to the Details page for the process model. Here, you can see a read-only preview of the model and the actions you can perform on it.

Now that you have created a process, you need to create your first app so you can publish and deploy your process model.

## Create your first app

You create a Process App to group together a number of process definitions so they are available to yourself or other users. A Process App is a container for handling a group of published processes and deploying them to a Process Engine.

This tutorial leads you through the steps required to create and use an app containing a single process definition.

1. Go to **App Designer > Apps** tab, and click **Create App**.

    The Create a new app definition dialog appears.

2. Enter a name for your app and click **Create a new app definition**.

    Use the name **My First App** for this tutorial.

3. Choose an icon and theme for your new app tile.

4. Click **Edit included models** and select a process(s) of your choice. In this case, select the published model from the [create your first process](#create-your-first-process) section.

5. Click **Save**, and select the **Publish** check box in the Save app definition dialog to save and publish your app.

    Publishing an app makes it available to everyone you’ve shared it with.

6. You can now add the app as a tile on your landing page.
    1. On the landing page, click on the last tile labeled with a + (plus) icon. The Add app to landing page dialog appears.
    2. Select **My First App** from the list of published apps and click **Deploy**.

        A new app tile is added to your Landing page.

Your app is now deployed and ready to be used.

## Start your first process

You start a process from the **Processes** tab of the **Task app** page. In this section, you are going to start and monitor the process you designed in the previous section. To start the process, first add a process to an app and deploy that app.

The following steps use the process model created in the [create your first process](#create-your-first-process) section, and the corresponding app created and deployed in the [create your first app](#create-your-first-app) section.

1. Go to the **Task App > Processes** tab, and click **Start**. button

    The form you created in the "Creating your first process" section is displayed. . Fill in the details on the form, and add any documents you need, and click **START PROCESS**.

    You are returned to the **Processes** page, which displays the process list with the process that you just started.

    On the **Processes** page, you can view running processes and see the current and completed tasks. You can also add comments that are available for anyone involved in the process.

2. Now that you have started the process, you should complete the tasks you defined in it. Go to the **Tasks** tab.

    The first step in the process is a task to review the project, and accept or reject it. Remember that when you created the first step in Step Editor, you specified that the task should be assigned to the process initiator. Since you started the process, you are the process initiator and this task is assigned to you.

3. Click **Show Details** or **Show Form**.

    At this stage you can add people, documents, and comments to the task.

4. Click **Show Form** to return to the form and then **Accept**.

    The Review Project task is complete and a new task, Update Project List is displayed. You defined this as a choice step in Step Editor, if the user choice was to accept the project.

5. Click **Complete** to go to the next step.

    The task that shows the details of the accepted project is displayed.

6. Click **Complete**.

    You have now completed all the tasks in the process and there are no tasks displayed for you in the Tasks tab. Now, if you click on the Processes tab, you’ll not see any running processes.

You have started your first process, performed the tasks assigned to you in that process, and completed a process successfully.

## Create a single task

As you have seen from previous sections, processes are made up of individual tasks. You can also create a single task 
for yourself or others and assign it for completion. This section guides you through the steps for creating and completing a single task.

In this example you will add a single task `Brush teeth` and complete the task yourself.

1. On the **Tasks** tab of the Task app page click the **CREATE TASK** button

    The **New task** dialog appears.

2. Give your new task a name, and optionally a description, and click **Create**.

    Your new task appears in the task list, and the task details are displayed in the right-hand panel.

    Now you have created a task you can alter the details such as the assignee and the Due date, involve others in the task, add a document and add comments to be shared with other collaborators in the task. For this simple task of `Brushing teeth`, you are just going to add a due date of `today`. . Click **Due date**.

    A date chooser drops down.

3. Click **Due today**.

    The Due date now has a timer displayed showing the number of hours before the end of the day. Many fields displayed in Process Services can accept user input when you click on them. The Assignee field the task is another example.

4. When you’ve brushed your teeth, click **Complete** in the task details area.

    The task is removed from the open task list.

5. By default, your task list displays only open tasks. That is why you no longer see the task you just completed. For completed tasks click the **COMPLETED TASKS** filter in the right-most column of the Tasks tab.

You have created and completed your first single task and used some of the filtering capabilities of the Task app.
