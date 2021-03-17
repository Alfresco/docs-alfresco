---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Creating a new rule from scratch

Use the **Create Rules** option to set up rules for a folder, in much the same way that you might apply rules to your emails.

**Note:** If a folder already has rules applied to it \(indicated by the ![](../images/rules-icon.png) icon\) you can add new rules to it by following [Add a new rule](library-folder-rules-new.md).

1.  Hover over a folder with no rules applied and click ![Add Event icon](../images/AddEvent_icon.png) **More** then ![](../images/rules-icon.png) **Manage Rules**.

2.  Click **Create Rules**.

3.  Enter a name and a description \(optional\) for the rule.

4.  Select when the rule will be triggered:

    -   **Items are created or enter this folder**: The rule will be applied to content that gets added to this folder. This includes any item that is copied to, created in, or uploaded to the folder.
    -   **Items are updated**: When an item in this folder is modified, the rule will be applied to it.
    -   **Items are deleted or leave this folder**: The rule will be applied to content that is moved out of the folder or deleted.
    **Note:** A rule can have more than one event, condition, and action. Click the + or - to add or remove rows.

5.  Select if the rule will be applied **If all criteria are met**, **Unless all criteria are met**, or both.

    Here are 3 examples of conditions that you could apply to trigger a rule:

    -   The rule is applied if the item title contains the word 'urgent' \(**If all criteria are met**\)
    -   The rule is applied if the item title does not contain the word 'urgent' \(**Unless all criteria are met**\)
    -   The rule is applied if the item title contains the word 'urgent', unless the item was created before a specified date \(**If all criteria are met** and **Unless all criteria are met**\)
6.  Select rule conditions and values, and remember that you can use the + and - icons to add and remove extra conditions.

    **Note:** Selecting **Show more** gives you additional properties to choose from. Use the folders on the Select property page to search properties, then select a property on the right of the page. Selecting **Show in menu** shows the property in all condition lists for the current rule.

7.  Define the action you want performed when the conditions are met.

    When you select to copy or move items click **Select** to specify where the content will be copied or moved to.

    **Tip:** If you select **Copy**, you can also select the additional **Deep Copy** option which will copy across items from the folder and all its subfolders.

    **Note:** The ![](../images/im-missinginfo.png) icon indicates where any required information is missing from your condition or action.

8.  Select additional options:

    -   **Disable rule**: Switch off the rule.
    -   **Rule applies to subfolders**: Apply the rule to this folder and all its subfolders.
    -   **Run rule in background** Lets you continue working while the rule is running. You can also select an action to run if an error occurs with the rule.
9.  Click **Create**, or **Create and Create Another** to save this rule and start creating another.


**Parent topic:**[Defining rules for a folder](../tasks/library-folder-rules-define.md)

