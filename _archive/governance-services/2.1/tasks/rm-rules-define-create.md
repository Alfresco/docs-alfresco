---
author: Alfresco Documentation
audience: [, ]
category: 
option: 
---

# Creating a rule

You can create rules for a category or folder, in much the same way that you might apply rules to your emails.

**Note:** If a category/folder already has rules applied to it \(indicated by the ![](../images/rules-icon.png) icon\) you can add new rules to it by [adding to a set of rules](http://docs.alfresco.com/4.3/tasks/library-folder-rules-new.html).

1.  Click **Manage Rules** when you're in the folder or category you want to set rules for in the File Plan.

    **Tip:** You can also hover over a folder or category in the File Plan and click **More** then **Manage Rules**.

2.  Click **Create Rules**.

3.  Enter a name and a description \(optional\) for the rule.

4.  Select when the rule will be triggered:

    -   **Items are created or enter this folder**: The rule will be applied to content that gets added to this category/folder. This includes any item that is copied to, created in, or uploaded to the folder.
    -   **Items are updated**: When an item in this folder is modified, the rule will be applied to it.
    -   **Items are deleted or leave this folder**: The rule will be applied to content that is moved out of the folder or deleted.
    **Note:** A rule can have more than one event, condition, and action. Click the + or - icons to add or remove rows.

5.  Select if the rule will be applied **If all criteria are met**, **Unless all criteria are met**, or both.

    Here are 3 examples of conditions that you could apply to trigger a rule:

    -   The rule is applied if the record title contains the word 'urgent' \(**If all criteria are met**\)
    -   The rule is applied if the record title does not contain the word 'urgent' \(**Unless all criteria are met**\)
    -   The rule is applied if the record title contains the word 'urgent', record the item was created before a specified date \(**If all criteria are met** and **Unless all criteria are met**\)
6.  Select criteria for which content the rule will apply to, and remember that you can use the + and - icons to add and remove extra criteria.

    **Note:** Selecting **Show more** on the criteria menu gives you additional properties to choose from. Use the folders on the Select property page to search properties, then select a property on the right of the page. Selecting **Show in menu** shows the property in all condition lists for the current rule.

7.  Select the action you want performed when the conditions are met.

    When you've selected an action you may need to select further options, for example if you select to freeze items click **Freeze** to specify a reason.

    **Tip:** If you select **File to**, you can also select the additional **Create Record Folder** option which create a new record folder to file records to.

    If you select **Execute script** then scripts are only available if they've been set up by your Alfresco administrator.

8.  Select additional options:

    -   **Disable rule**: Switch off the rule.
    -   **Rule applies to subfolders**: Apply the rule to this category and all its subfolders and categories.
    -   **Run rule in background** Lets you continue working while the rule is running. You can also select an action to run if an error occurs with the rule. These actions are set up by your Alfresco administrator.
9.  Click **Create**, or **Create and Create Another** to save this rule and start creating another.


**Parent topic:**[Defining rules for a category or folder](../concepts/rm-rules-define.md)

