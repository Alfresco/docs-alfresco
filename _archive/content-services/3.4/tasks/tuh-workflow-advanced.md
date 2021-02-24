---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Implementing an advanced workflow

Advanced workflow allows you to attach workflow directly to a content item and then assign the content to another user for review. With advanced workflow, the workflow tasks are managed in the dashboard.

Alfresco includes two preconfigured workflows: Adhoc Task \(for assigning a task to a colleague\) and Review & Approve \(for setting up review and approval of content\).

1.  Navigate to the space containing the content item you want to add to a workflow.

2.  Click ![Menu](../images/im-menu.png) for the content of interest and click **Start Advanced Workflow**.

3.  In Step One, Choose Workflow, select the workflow you want to define: **Adhoc Task** or **Review & Approve**.

4.  Click **Next**.

5.  In Step Two, Workflow Options, specify the workflow options.

    -   To define an Adhoc Task workflow:
        -   In the **Description** box, describe what you want the recipient to do, such as Please review the attached file.
        -   In the **Priority** list, select the required priority.
        -   To specify a **Due Date**, click **None** to display the date controls and select the desired date. Click **Today** to select the current date; click **None** to remove the due date.
        -   Optionally, select **Notify Me** to receive a notification when the task is complete.
        -   For **Assign To**, click **Select…** and use the search feature provided to locate the desired user. Click to select the user to assign the task to and click **OK**.
    -   To define a Review & Approve workflow:
        -   In the **Description** box, describe what you want the recipient to do, such as Please review the attached file.
        -   In the **Review Priority** list, select the required priority.
        -   To specify a **Review Due Date**, click **None** to display the date controls and select the desired date. Click **Today** to select the current date; click **None** to remove the due date.
        -   For **Reviewer**, click **Select…** and use the search feature provided to locate the desired user. Click to select the user who will be responsible for the review and click **OK**.
6.  In the **Resources** pane, click **Add Resource** to add more content items to create a content set to assign to the specified user.

    1.  Use the search feature provided to locate content items.

    2.  In the results list, click to select the content item to add. Use SHIFT to select multiple, consecutive items from the list and use CTRL to select multiple, non-consecutive items.

    3.  Click **Add to List** to add the selected content items to the **Resources** list.

7.  Click **Next**.

8.  In Step Three, Summary, click **Finish** to create the specified workflow.

    You return to the space where you started. Click ![View Details](../images/im-viewdetails.png) **\(View Details\)** for the content item to see the newly attached workflow in the **Workflows** pane.


**Parent topic:**[Working with workflows](../concepts/cuh-workflow-intro.md)

