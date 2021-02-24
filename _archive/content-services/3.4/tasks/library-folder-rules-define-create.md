---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Creating a new rule from scratch

The **Create Rules** option for a folder with no defined rules enables you to create your own rule set from scratch.

This task assumes you are in the Document Library page component of the desired site and you have selected the **Manage Rules** option for a folder with no existing rules.

1.  Click **Create Rule**.

    The New Rule page appears.

2.  Enter a name \(required\) and description \(optional\) for the rule.

3.  Specify the event\(s\) to trigger the rule:

    -   **Items are created or enter this folder**: The rule is applied to content arriving in the folder, which includes a content item being copied to, created in, or uploaded to the folder.
    -   **Items are updated**: The rule is applied to a content item when it is modified within that folder.
    -   **Items are deleted or leave this folder**: The rule is applied to content leaving the folder, which includes a content item being moved out of or deleted from the folder.
    **Note:** You can specify multiple events. Use the icons to the right of the fields to add and remove options.

4.  Specify the rule conditions.

    You can use inclusive \(if\) conditions, exclusive \(unless\) conditions, or a combination of the two. Define any number of conditions per rule.

    1.  Select the check box for the type of condition you wish to create: **If all criteria are met** or **Unless all criteria are met**.

    2.  Select the desired condition from the list provided.

        **Note:** Click **Show More** to display the additional properties available. On the Select property page, navigate the Aspects and Types folders in the left pane, selecting the desired property on the right. Click **All** in the left pane to display all available properties. Select the **Show in menu** check box to display the related item in all condition lists for the current rule.

        For selections other than **All Items**, one or more controls \(for example, a list, text box, date field, or button\) is displayed where you provide values for the selected condition.

    3.  Specify the value\(s\) for the condition.

    4.  Use the icons to the right of the fields to add and remove conditions as necessary.

5.  Specify the action\(s\) to be performed when the rule is triggered.

    Define any number of actions per rule.

    1.  Select the desired action from the list provided.

        Depending on your selection, one or more controls \(for example, a list, text box, date field, or button\) is displayed where you provide values for the selected action.

    2.  Specify the value\(s\) for the action.

    3.  Use the icons to the right of the fields to add and remove conditions as necessary.

    **Note:** On this page, the symbol ![](../images/im-missinginfo.png) to the left of a condition or action indicates required information is missing. You must correct this in order to create the rule.

6.  Specify additional options for the rule as desired:

    -   **Disable rule** disables the rule so that it will not be invoked.
    -   **Run rule in background** enables the user to continue working while the rule actions are being performed; when run in the background, the results may not appear immediately.
    -   **Rule applies to subfolders** applies the rule being created to the current folder as well as its current and future subfolders.
    -   **If error occurs run script** runs the selected script in the event that the rule action does not run successfully; this applies only to rules configured to run in the background.
7.  Click **Create**.

    **Note:** If you intend to immediately create another rule, click **Create and Create Another**. This creates the rule specified and clears the fields so you can create another rule for the same folder.


**Parent topic:**[Defining rules for a folder](../tasks/library-folder-rules-define.md)

**Related information**  


[Entering a site](dashboard-site-enter.md)

[Accessing the Document Library page component](library-access.md)

[Browsing the library](library-browse.md)

[Defining rules for a folder](library-folder-rules-define.md)

