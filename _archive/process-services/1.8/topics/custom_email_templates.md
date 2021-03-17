---
author: Alfresco Documentation
---

# Custom email templates

Use Custom email templates to create your own set of templates for Alfresco Process Services. You can use a custom template when creating human tasks in your process. This is particularly useful if you want to send a customized email notification as part of your process.

You can also include values from a range of predefined variables. These are listed in the following table.

|Assignment|Variable Name|
|----------|-------------|
|Single User Task|`taskCreator`, `taskName`, `taskDirectUrl`, `homeUrl`|
|Group Task|`groupName`, `taskName`, `taskDirectUrl`, `homeUrl`|
|Candidate User Task|`taskName`, `taskDirectUrl`, `homeUrl`|

**Prerequisites**:

-   In IDM, create a user and assign the **Administration of tenant of this group** capability.

-   Make sure to create users with valid email addresses as that will be needed for sending email notifications.


**To create a new custom email template:**

1.  Go to the **Identity Management** app, click **Tenants** \> **Email templates**. The email template page appears.
2.  From the **Custom email templates** tab, click **Create new email template**. The Create new email template dialog appears.
3.  The new template appears on the Custom email templates list.

You can edit and delete an existing custom template by selecting the edit \(pencil\) and delete \(bin\) icons in the Email Templates respectively. Once an email template is created, you can search it by entering a string for matching email templates.

Alternatively, you can also create a custom email template within the App Designer editor when adding or editing a human step in a process.

**To create a custom email template via the **App Designer** Editor:**

1.  Go to **App Designer** \> **Processes**, and create a new process with a human task or edit a human task in an existing process. Make sure to create a form or reference an existing form with the step.
2.  In the Human step, check **Allow email notifications** and then select **Custom template**.
3.  Type a Subject, and Email content for your template, and then click **Save**. A new custom email is created.

**Note:** Ensure that you don’t give an existing name to your new template, otherwise an error *Name already taken* is displayed.

**To use a custom email template in the process**:

1.  Go to **App Designer** \> **Processes**, and create a process with at least two human steps.
2.  In the **Human step** dialog \> **Details** tab, check **Allow email notifications**.
3.  In **Email**, select **Email template**, and then the custom template that you created in the above section \(Create a new custom email template section\).

**To complete a task using custom emails**:

1.  Create a new app for the email process that you created above and then publish it.
2.  Access the newly deployed App from the main Alfresco Process Services page.
3.  Start a new process and access your tasks.
4.  Click **Complete** to complete the required tasks.

Your task is completed and custom emails are sent to the assigned user of the task.

**Parent topic:**[Tenants tab](../topics/tenants_tab.md)

