# Starting a workflow in Alfresco Share

This tutorial walks you through the steps required to run your first process as a workflow from Alfresco Share using the **My Activiti Tasks** dashlet.

All process definitions that you deploy to Apps in Alfresco Process Services are available to you in Alfresco Share. This section assumes that you have deployed the first process workflow using the app-creating-process tutorial described in [Administering](adminGuide.md). If not, follow the tutorial to deploy the workflow.

1.  Go to the Alfresco Share dashboard, [http://localhost:8090/share](http://localhost:8090/share).

    You run a process as a workflow.

2.  In your **My Workflow Tasks** dashlet, click **Start Workflow**.

    The Start Workflow dialog appears.

    Note that the alphabetical list of process definitions includes your first process.

3.  Select your **First Process**.

    The workflow is initiated and the page now displays the form for the start task in this workflow, just like it does in Process Services.

4.  Fill in the form.

    Note that when you click **Select a file** for the project files, a dialog to choose a file for Share appears to select files from the Alfresco Content Services repository.

5.  Click **Start process** to start the workflow.

    The My Workflow page now displays the active and completed tasks in your workflow.

6.  Click the **Review project** task.

    The My tasks page is displayed.

7.  Add a review comment and click **Accept** to continue with the next step in the workflow, and continue until you have completed all tasks in the workflow.

You have run a process definition as a workflow in Share. My tasks, My workflows pages, and the associated Process Services for this Share site can all be accessed from the **Tasks** menu.

**Parent topic:**[Using the Share Connector demo](../topics/using_the_share_connector_demo.md)

