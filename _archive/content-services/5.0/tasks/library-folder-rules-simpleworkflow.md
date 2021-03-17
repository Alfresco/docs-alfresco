---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Creating a simple workflow

You can set up rules to trigger a simple workflow that's made up of review and approval steps. When an item enters a folder with this type of rule applied, it will have additional actions available.

You configure the rule to specify the user actions and flow of the content between folders. You can also add complexity to a simple workflow by creating rules for other folders and passing content around from location to location.

For example, you could set up rules to create a simple workflow that manages content as follows:

-   Users can approve content added to the **Drafts** folder.
-   On approval, the content is moved to a **Pending Approval** folder.
-   Managers can approve the content in this folder.
-   On approval, the content is moved to the **Published** folder. If the content is rejected it's moved back to **Drafts**.

**Note:** When you create a rule for a folder, it applies to all content items that are added to that folder after the creation of the rule. Content items residing in the folder before the rule is created are not affected by the rule. However, you can use the **Run Rules** actions to ensure the new rules apply to the existing content.

1.  Hover over a folder with no rules applied and click **More** then **Manage Rules**.

2.  Click **Create Rules**.

3.  Enter a name and description \(optional\) for the rule.

4.  Select when the rule will be triggered:

    -   **Items are created or enter this folder**: The rule will be applied to content that gets added to this folder. This includes any item that is copied to, created in, or uploaded to the folder.
    -   **Items are updated**: When an item in this folder is modified, the rule will be applied to it.
    -   **Items are deleted or leave this folder**: The rule will be applied to content that is moved out of the folder or deleted.
    **Note:** A rule can have more than one event, condition, and action. Click the + or - to add or remove rows

5.  Select if the rule will be applied **If all criteria are met**, **Unless all criteria are met**, or both.

    Here are 3 examples of conditions that you could apply to trigger a rule:

    -   The rule is applied if the item title contains the word 'urgent' \(**If all criteria are met**\)
    -   The rule is applied if the item title does not contain the word 'urgent' \(**Unless all criteria are met**\)
    -   The rule is applied if the item title contains the word 'urgent', unless the item was created before a specified date \(**If all criteria are met** and **Unless all criteria are met**\)
6.  Select criteria for which content the rule will apply to, and remember that you can use the + and - icons to add and remove extra criteria.

    **Note:** Selecting **Show more** on the criteria menu gives you additional properties to choose from. Use the folders on the Select property page to search properties, then select a property on the right of the page. Selecting **Show in menu** shows the property in all condition lists for the current rule.

7.  Select **Add simple workflow** as the action.

8.  To include an approval step in the workflow click **Approve** and provide details.

    1.  Enter an Action Label.

        This will be displayed as a new additional option available for relevant content. If you don't change the label then a new **Approve** option will be available for relevant items in this folder.

    2.  Select to **copy** or **move** approved content and click **Select** to set where it will be copied or moved to.

    3.  Click **OK**.

9.  To include a rejection step in the workflow select the check box and click **Reject**, then provide details.

    1.  Enter an Action Label.

        This will be displayed as a new additional option available for relevant content. If you don't change the label then a new **Reject** option will be available for relevant items in this folder.

    2.  Select to **copy** or **move** rejected content and click **Select** to set where it will be copied or moved to.

    3.  Click **OK**.

10. Select additional options:

    -   **Disable rule**: Switch off the rule.
    -   **Rule applies to subfolders**: Apply the rule to this folder and all its subfolders.
    -   **Run rule in background** Lets you continue working while the rule is running. You can also select an action to run if an error occurs with the rule. These actions are set up by your Alfresco Administrator.
11. Click **Create**, or **Create and Create Another** to save this rule and start creating another.


In the **Document Library** the symbol ![](../images/im-rules-simpleworkflow.png) to the left of an item indicates that a simple workflow has been applied to it. The approve and reject actions \(with their defined labels\) appear in the action list for these items.

**Parent topic:**[Defining rules for a folder](../tasks/library-folder-rules-define.md)

