---
title: Folder rules
---

In the Digital Workspace you can define folder rules to manage your content automatically, in the same way email clients use rules to filter messages and incoming spam. Rules dictate how content entering, leaving, or currently residing in a folder is managed. When you define a rule, it only applies to new content added to the folder. Items that were in the folder before the rule was defined aren't affected by it.

> **Note:** Even if a folder doesn't have its own rules, it could have inherited rules from a parent folder.

There are three parts to a folder rule:

* The event that triggers the rule.
* The conditions the content has to meet.
* The action performed on the content.

The events that can trigger a rule are:

* A content item arrives in the folder.
* A content item leaves the folder (it's moved or deleted).
* A content item in the folder is modified.

Here are some examples of how you can use rules to automate repetitive tasks:

* Content with certain criteria that enter a folder can be linked to a category.
* Content with certain criteria that enter a folder can have aspects added, or removed.
* Content with certain criteria that enter a folder can execute a script.

## Creating a rule

You can create rules for a folder within the Digital Workspace.

1. Right click a folder in the Digital Workspace and select **Manage rules**.

2. Click the **Create rule** button.

3. Enter a name and a description for the rule.

4. Select when the rule will be triggered:

    * **Items are created or enter this folder**: The rule will be applied to content that gets added to the folder. This includes any item that is copied to, created in, or uploaded to the folder.
    * **Items are updated**: When an item in this folder is modified, the rule will be applied to it.
    * **Items are deleted or leave this folder**: The rule will be applied to content that is moved out of the folder or deleted.

    > **Note:** A rule can have more than one trigger.

5. Select if the rule will be applied using **If**, **NOT If**, or both. You can also add a condition group.

    Here are some examples of conditions that you could apply to trigger a rule:

    * The rule is applied if the record title contains the word 'urgent' (**If**).
    * The rule is applied if the record title does not contain the word 'urgent' (**NOT If**).
    * The rule is applied if the record title contains the word 'urgent', unless the record was created before a specified date (**If** and **NOT If**).

6. Select criteria for which content the rule will apply to.

7. Select the actions performed when the conditions are met, and any other sub action required for that specific action.

    For example, if you select **Move**, you must also enter a location in the **Destination folder** field.

8. Select additional options:

    * **Run rule in background**: Lets you continue working while the rule is running. You can also select an action to run if there's a problem with the rule.
    * **Rule applies to subfolders**: Apply the rule to this folder and all its subfolders.
    * **Disable rule**: Switch off the rule.

9. Click **Create** to save the rule.

The folder rule created will immediately start managing your content.
