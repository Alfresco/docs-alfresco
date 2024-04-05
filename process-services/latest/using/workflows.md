---
title: Preconfigured workflows
---

Tasks and workflows help you keep track of the things you and other users need to do. You can create a standalone task or workflow, or you can attach a file to it.

A workflow is a process that controls a specific task, such as a document review. Each task can be assigned to one or more people when a workflow is being created. Workflow creators can select to automatically send a notification email to users that are assigned a task as part of the workflow, but whether an email is sent or not the task will be visible in the users My Tasks.

Once all the task actions required by a workflow have been finished, the workflow will move from active to completed status. At this point you’re free to delete the workflow.
Individual users manage their own tasks, and the person who created a workflow manages the workflow.

## Creating a tenant

You need to create a tenant before you can start creating workflows. 

To create a tenant, complete the following steps.

1. Log in as admin to Alfresco Process Services as the admin user.

2. Select **Identity Management**.

3. Select **Tenants**.

4. Select **Create tenant**.

      The **Create tenant** dialog box appears.

5. Enter the following details as per your requirements.

      * Enter the **Name** – The name of your tenant, for example, xxx.
      * Specify the **Maximum allowed users in this tenant** - This is set at 10 bBy default, it is set at 10.

6. Select the **Deploy preconfigured workflows** checkbox.

7. Add the details about the workflow owner including **First name**, **Last name**, **Email**, and **Password**. 

      You can also assign a workflow owner from the list of created users.

8. Click **Save**.

## Changing the owner of preconfigured workflow

The workflow app needs to be manually deleted before changing the owner of preconfigured workflow.

To change the owner of a preconfigured workflow, complete the following steps.

1. Log in to Alfresco Process Services.

2. Select **Identity Management**.

3. Select **Tenants**.

4. Select **Edit Tenant**.

5. Select a user as the owner of the workflow in the current tenant.

      You can choose a new user or the existing user.

6. Click **Save**.

## Configuring a preconfigured workflow

All users in a tenant can access the preconfigured workflows. The owner of the tenant is the only user that can make edits to the workflow process.

To configure a preconfigured workflow, complete the following steps.

1. Log in to Alfresco Process Services.

2. Select **App Designer**.

3. Select the preconfigured workflow that you want to change.

4. Make the edits and save them.

      The edited changes are now visible to all the users of the tenant.

## Creating a user

To create a user in a tenant, complete the following steps.

1. Log in to Alfresco Process Services.

2. Select **Identity Management**.

3. Select **User**.

4. Select **Create user**.

      The **Create user** window appears.

5. Enter the following details.

      * **Email** of the user.
	  * **Password** of the user.
      *	**First name** of the user.
      * **Last name** of the user.
	  * Select your **Tenant** from the drop-down list.
	  * Enter the **Company** name.
      * Select the **Status** and **Type**.

6. Click **Save**.

## Creating a group

To create a group in a tenant, complete the following steps.

1. Log in to Alfresco Process Services.

2. Select **Identity Management**.

3. Select **Organization**.

4. Select your tenant from the drop-down list.
 
      A workflow group will be visible by default. You can add other users to this group so they can have access to view the workflow.

5. Select **Create group**. Name your group and click **Save**.

6. Click **+ add users** to add users to your group.

## Starting a workflow

You can attach a workflow directly to one or more files. Starting a workflow generates a workflow task such as a review.

1. Log in to Alfresco Process Services.

2. Select **Task App**.

3. Click on the **+Start** button.

      The Start Workflow page opens.

4. Select a workflow from the Workflow list.

      The following preconfigured workflows are available:

	  * New Task: Assign a new task to yourself or another user.
	  * New Task (group): Assign a new task to a group.
	  * Review and Approve (group review): Set up review and approval of content, assigning the workflow task to a single group.
	  * Review and Approve (one or more reviewers): Request file approval from one or more users.
	  * Review and Approve (pooled review): Set up review and approval of content, assigning the workflow task to multiple users. One user can take ownership of the task at a   time, completing it or returning it to the pool to be claimed by another user associated with the task.
	  * Review and Approve (single reviewer): Set up review and approval of content, assigning the workflow task to a single user.

      The appropriate workflow form displays where you enter the details of the workflow task being initiated. Required fields are marked with an asterisk (*).

5. Enter details for the workflow in the General section.

      * In the **Message** field describe the task requirements, such as Please review the attached content. This should clearly explain to the user what they are expected to do. This text displays in My Tasks for the workflow task.
	  * Select a **Priority** setting for the task.
        > **Note:**  By default, the priority is set to **Medium**.
	  * Select a **Due** date for the task.

6. Select the user(s) or group to assign the task generated by the workflow to.

      You assign the task to either a user or a user group depending on the type of workflow selected.

	  * In the **Reviewers** section click **Select** and type the full or partial name of a user.
	  * Click the user that you want to add.
        > **Note:** You can select multiple users for the Send Document(s) For Review task.
      * Click **OK**.
	  * If your task is assigned to more than one person, complete the **Required Approval Percentage** field. Enter the percentage of reviewers that must approve the task before it can be marked as complete.

7. Select a file under **Items**, if required.

## Viewing workflows you started

You can view the full details of all workflows that you have started.

1. Click **Tasks** then **Workflows I've Started**.

    The Workflows I've Started page displays the workflows you have created. You can use the filters in the browsing pane to view a specific set of workflows.

2. Hover over the workflow you want to view and click **View History**.

    > **Note:** You can also click the workflow title.

    The Details page displays all information related to this workflow.

    * Click **View Current Tasks** at the top of the page to jump to the Current Tasks section which displays the tasks generated from the selected workflow. From here you can view ![view task]({% link content-services/images/ico-view-task.png %}) or edit ![configure]({% link content-services/images/ico-configure.png %}) a task.
    * Click the link in the Most Recently Completed Task section to view details on the last task completed as part of this workflow. This task also appears in the History section.
    * Look at completed tasks in the History section. Click a task to view its details.
    * Click an item in the Items list to see it in the file preview screen. Click your browser’s Back button to return to the Workflow Details page.
    * If you started the workflow you can click to **Cancel Workflow** to cancel an active workflow **Delete Workflow** to delete a completed workflow.

3. Click **Workflows I’ve Started** to return to the workflow list.

## Cancelling an active workflow

You can cancel an active workflow if you find you don’t need it anymore. This deletes all tasks related to the workflow.

1. On the **Workflows I’ve Started** page, make sure you’ve selected the Active view in the explorer pane.

2. Hover over the workflow you want to cancel and click **Cancel Workflow**.

      A message prompts you to confirm the action.

3. Click **Yes**.

      The selected workflow is cancelled and removed from the workflow list. All tasks related to the workflow are deleted, which removes them from the Active view on the My Tasks page. They are also removed from **My Tasks**.

## Deleting a completed workflow

Once you’re finished with a workflow, you can delete it to clear it from the workflow list. This also deletes all tasks associated with the workflow.

1. On the **Workflows I’ve Started** page, select the Completed view in the explorer pane.

2. Hover over a workflow and click **Delete Workflow**.

      A message prompts you to confirm the deletion.

3. Click **Yes**.

      The workflow is deleted and removed from the workflow list. The tasks related to the workflow are deleted, which removes them from the Completed view on the My Tasks page. They are also removed from My Tasks.

## Viewing tasks and workflows

You can view the details for an individual task or for the workflow that initiated a task.

1. Click **Tasks** then **Workflows I've Started**.

    > **Note:** You can also view and edit tasks from My Tasks.

2. On the My Tasks page, hover over a task and click an action:

    * **View Task**: Displays the task details
    * **View Workflow**: Displays the workflow details

    > **Note:** An icon (![pooled]({% link content-services/images/im-pooled.png %})) indicates a pooled task. Pooled tasks that can be claimed are marked as **Unassigned**.

3. Click the **Task Details** and **Workflow Details** options to move between the two page views.

    The Task Details page displays all information related to this task.

    * In the Items list, click an item to preview it in the library. Click your browser’s Back button to return to the Task Details page.
    * Click **Edit** to edit the task.

    The Workflow Details page displays the information for the workflow that generated this task.

    * Click **View Process Diagram** to display a graphical representation of the workflow. A red border highlights the current stage of the workflow. Click anywhere on the graphic to close it.
    * Click **View Current Tasks** at the top of the page to jump to the Current Tasks section which displays the tasks generated from the selected workflow. From here you can view ![view task]({% link content-services/images/ico-view-task.png %}) or edit ![configure]({% link content-services/images/ico-configure.png %}) a task.
    * Click the link in the Most Recently Completed Task section to view details on the last task completed as part of this workflow. This task also appears in the History section.
    * Look at completed tasks in the History section. Click a task to view it's details.
    * Click an item in the Items list to see it in the file preview screen. Click your browser’s Back button to return to the Workflow Details page.
    * If you started the workflow you can click to **Cancel Workflow** to cancel an active workflow.

## Managing tasks

Tasks assigned to you appear in two places: the My Tasks personal and the My Tasks page. Each task stays assigned to you until you complete or reassign it.

1. Click **Tasks** then **My Tasks**.

2. Hover over a task and click **Edit Task**.

    The Edit Task page appears displaying the task details. The actions available on this page depend on the task type.

    > **Note:** You can also access this page from My Tasks: click the **Edit Task** icon.

3. Manage the selected task in one or more of the following ways:

    * **Update**: If the task is in progress but not yet complete, you can change the task status and add a comment indicating your progress. Remember to click **Save and Close**. The task stays assigned to you.
    * **Reassign**: Click **Reassign** and use the search field provided to find a user. Click **Select** to the right of a user to reassign the task to that person.
    * **Approve or Reject**: When you're done with a task you can update the task status, add a comment indicating the work done, and then click either **Approve** or **Reject**. The task returns to the user who started the workflow and no longer appears in your task list.
    * **Claim**: Click **Claim** to take responsibility for a pooled task. This action is available only for pooled tasks that are unassigned.
    * **Release to Pool**: Click **Release to Pool** to place a task back in the pool. The task will appear in the task list as *Unassigned* and can be claimed by another user. This action is available only for pooled tasks that are currently owned by you.
    * **Add**: Click **Add** beneath the file list to locate and select files to add to the task. This action is available only for Adhoc tasks.
    * **Task Done**: When you complete a task it returns to the user who started the associated workflow. Click **Task Done** to finish a task. This removes it from your task list.

    When the selected action is complete you are redirected to an appropriate screen.
