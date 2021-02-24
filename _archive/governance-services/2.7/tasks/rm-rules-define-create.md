---
author: Alfresco Documentation
audience: [, ]
category: 
option: 
---

# Creating a rule

You can create rules for a category or folder, in much the same way that you might apply rules to your emails.

**Note:** If a category/folder already has rules applied to it \(indicated by the ![](../images/rules-icon.png) icon\) you can add new rules to it by [adding to a set of rules](http://docs.alfresco.com/5.2/tasks/library-folder-rules-new.html).

**Note:** If a category/folder already has rules applied to it \(indicated by the ![](../images/rules-icon.png) icon\) you can add new rules to it by [adding to a set of rules](http://docs.alfresco.com/community/tasks/library-folder-rules-new.html).

1.  Click **Manage Rules** when you're in the folder or category you want to set rules for in the File Plan.

    **Tip:** You can also hover over a folder or category in the File Plan and click **More** then **Manage Rules**.

2.  Click **Create Rules**.

3.  Enter a name and a description \(optional\) for the rule.

4.  Select when the rule will be triggered:

    -   **Items are created or enter this folder**: The rule will be applied to content that gets added to this category/folder. This includes any item that is copied to, created in, or uploaded to the folder.
    -   **Items are updated**: When an item in this folder is modified, the rule will be applied to it.
    -   **Items are deleted or leave this folder**: The rule will be applied to content that is moved out of the category/folder or deleted.
    **Note:** A rule can have more than one event, condition, and action. Click the + or - icons to add or remove rows.

5.  Select if the rule will be applied **If the following apply**, **If the following don't apply**, or both.

    Here are 3 examples of conditions that you could apply to trigger a rule:

    -   The rule is applied if the record title contains the word 'urgent' \(**If the following apply**\)
    -   The rule is applied if the record title does not contain the word 'urgent' \(**If the following don't apply**\)
    -   The rule is applied if the record title contains the word 'urgent', unless the record was created before a specified date \(**If the following apply** and **If the following don't apply**\)
6.  Select criteria for which content the rule will apply to, and remember that you can use the + and - icons to add and remove extra criteria.

    **Note:** Selecting **Show more** on these menus displays the Select property screen where you can select additional properties. Click the folders on the left of the screen to show the properties they contain on the right of the screen. Selecting **Show in menu** selects that property and adds it to all criteria menus when setting up the current rule.

7.  Select the action you want performed when the conditions are met.

    When you've selected an action you might need to select further options, for example if you select to reject items click **Reject** to specify a reason.

    **Tip:** If you select **File to**, **Copy to**, or **Move to** you need specify a destination Record Folder. You can click **Select** to choose an existing folder, or you can type in a Record Folder Location, for example */category/category/folder*, or a combination of the two. Select the **Create Full Path to Folder** option to ensure that the specified path is created if it doesn't already exist. It won't be created if it doesn't fit the File Plan structure.

    There are also extensive [autocomplete options](../references/rm-rules-substitutions.md).

    If you select **Execute script** then scripts are only available if they've been set up by your Alfresco administrator in Repository \> Data Dictionary \> Records Management \> Records Management Scripts.

8.  Select additional options:

    -   **Turn off rule**: Switch off the rule.
    -   **Rule applies to subfolders**: Apply the rule to this category and all its subcategories and subfolders.
    -   **Run rule in background** Lets you continue working while the rule is running. You can also select an action to run if there's a problem with the rule with the rule. These actions are the same as the Execute script action, and are set up by your Alfresco administrator.
9.  Click **Create**, or **Create and Create Another** to save this rule and start creating another.


-   **[Rules autocomplete options](../references/rm-rules-substitutions.md)**  
If you type part of a record property at any place in the path then autocomplete options are displayed.

**Parent topic:**[Defining rules for a category or folder](../concepts/rm-rules-define.md)

