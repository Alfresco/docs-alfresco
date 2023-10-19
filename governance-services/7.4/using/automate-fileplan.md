---
title: Automating the File Plan
---

In the {% include tooltip.html word="fileplan" text="File Plan" %} you can define {% include tooltip.html word="category" text="category" %} and folder rules to manage your content automatically. You can come up with many creative solutions to make sure specific content processes are automated so you don't have to do the work yourself.

Rules dictate how content entering, leaving, or currently residing in a category or folder is managed.

There are three parts to a content rule:

* The event that triggers the rule
* The conditions the content has to meet
* The action performed on the content

The events that can trigger a rule are:

* A content item arrives in the folder
* A content item leaves the folder (it's moved or deleted)
* A content item in the folder is modified

Here are some examples of how you can use rules to automate repetitive tasks:

* All records without a record type placed in a category are associated with a specific record type
* All incomplete records placed in a folder are completed
* All records that are {% include tooltip.html word="cutoff" text="cut off" %} in a folder have the event Case Closed completed
* All folders created in a specific category are added to a File Plan

## Defining rules for a category or folder

Use rules to manage your File Plan content automatically. There are two ways to define rules: create your own rules or 
link to rules already created for a different category or folder.

When you define a rule, it only applies to new content added to the category/folder. Items that were in the 
category/folder before the rule was defined aren't affected by it. You can manually apply the category/folder 
rules with the **Run Rules** action.

If you create rules for a category, depending on the rule settings, they can apply to folders and categories created in 
the category, records placed in folders in the category, or both.

> **Note:** Even if a category/folder doesn't have its own rules, it could have inherited category/folder from a parent folder. A message on the Rules page lets you know if this is the case.

### Creating a rule

You can create rules for a category or folder, in much the same way that you might apply rules to your emails.

> **Note:** If a category/folder already has rules applied to it (indicated by the ![]({% link governance-services/images/rules-icon.png %}){:height="18px" width="18px"} icon) you can add new rules to it by [adding to a set of rules]({% link content-services/latest/using/content/rules.md %}).

1. Click **Manage Rules** when you're in the folder or category you want to set rules for in the File Plan.

    > **Tip:** You can also hover over a folder or category in the File Plan and click **More** then **Manage Rules**.

2. Click **Create Rules**.

3. Enter a name and a description (optional) for the rule.

4. Select when the rule will be triggered:

    * **Items are created or enter this folder**: The rule will be applied to content that gets added to this category/folder. This includes any item that is copied to, created in, or uploaded to the folder.
    * **Items are updated**: When an item in this folder is modified, the rule will be applied to it.
    * **Items are deleted or leave this folder**: The rule will be applied to content that is moved out of the category/folder or deleted.

    > **Note:** A rule can have more than one event, condition, and action. Click the + or - icons to add or remove rows.

5. Select if the rule will be applied **If the following apply**, **If the following don't apply**, or both.

    Here are 3 examples of conditions that you could apply to trigger a rule:

    * The rule is applied if the record title contains the word 'urgent' (**If the following apply**)
    * The rule is applied if the record title does not contain the word 'urgent' (**If the following don't apply**)
    * The rule is applied if the record title contains the word 'urgent', unless the record was created before a specified date (**If the following apply** and **If the following don't apply**)

6. Select criteria for which content the rule will apply to, and remember that you can use the + and - icons to add and remove extra criteria.

    > **Note:** Selecting **Show more** on these menus displays the Select property screen where you can select additional properties. Click the folders on the left of the screen to show the properties they contain on the right of the screen. Selecting **Show in menu** selects that property and adds it to all criteria menus when setting up the current rule.

7. Select the action you want performed when the conditions are met.

    When you've selected an action you might need to select further options, for example if you select to reject items click **Reject** to specify a reason.

    If you select **File to**, **Copy to**, **Move to**, **File Version as Record** or **File as Record** you can specify the location of where to store the record by entering a location in **Record Folder Location**, for example `/category/subcategory/folder`. Click **Select** to choose an existing folder or a combination of the two. Select **Create Full Path to Folder** to ensure the specified path is created if it doesn't already exist. It won't be created if it doesn't fit the File Plan structure.

    > **Note:** For **File Version as Record** and **File as Record** you don't have to select a destination folder and if you don't the created record can be found in the unfiled records area.

    There are also extensive [autocomplete options](#rules-autocomplete-options).

    If you select **Execute script** then scripts are only available if they've been set up by your Alfresco administrator in **Repository > Data Dictionary > Records Management > Records Management Scripts**.

    If you select **Worm Lock** you must have configured Amazon S3. For more information on WORM Lock see [Working with Amazon S3 WORM]({% link governance-services/7.4/using/worm.md %})

8. Select additional options:

    * **Turn off rule**: Switch off the rule.
    * **Rule applies to subfolders**: Apply the rule to this category and all its subcategories and subfolders.
    * **Run rule in background** Lets you continue working while the rule is running. You can also select an action to run if there's a problem with the rule with the rule. These actions are the same as the Execute script action, and are set up by your Alfresco administrator.

9. Click **Create**, or **Create and Create Another** to save this rule and start creating another.

#### Rules autocomplete options

If you type part of a record property at any place in the path then autocomplete options are displayed.

For example, if you type *rm* then you'll be offered options that include:

* Date filed `{node.rma:dateFiled}`
* Identifier `{node.rma:identifier}`
* Location `{node.rma:location}`

Records will be put into the File Plan based on each individual record property value.

So for example you could set a path of `/category/{node.rma:location}`. When the rule is run records with a Location property of `US` would be put in `/category/US`, and records with a Location property of `France` would be put in `/category/France`.

Date options set that part of the path to the date the rule is run. For example if it's run on `Monday` then:

* Short Day `{date.day.short} = Mon`
* Long Day `{date.day.long} = Monday`

By default  autocomplete options are based on the first two letters you type, and only five options for each type of suggestion are offered at a time. Type more letters to narrow down the displayed options.

> **Tip:** This can be configured in the properties file.

Available autocomplete options are:

* Last accessed = `node.cm:accessed`
* When created = `node.cm:created`
* Creator = `node.cm:creator`
* Description = `node.cm:description`
* Last modified = `node.cm:modified`
* Modifier = `node.cm:modifier`
* Name = `node.cm:name`
* Title = `node.cm:title`
* Date filed = `node.rma:dateFiled`
* Unique database ID = `node.rma:dbUniquenessId`
* Identifier = `node.rma:identifier`
* Location = `node.rma:location`
* Original = `node name node.rma:origionalName`
* Node ID = `node.sys:node-uuid`
* Store ID = `node.sys:store-identifier`
* Store protocol = `node.sys:store-protocol`
* Short Day (for example, Mon) = `date.day.short, date.day`
* Long Day (for example, Monday) = `date.day.long`
* Day Number (for example, 1) = `date.day.number`
* Day of Month (for example, 18) = `date.day.month`
* Day of Year (for example, 216) = `date.day.year`
* Short Month (for example, Jan) = `date.month.short`
* Month (for example, Jan) = `date.month`
* Long Month (for example, January) = `date.month.long`
* Month Number (for example, 01) = `date.month.number`
* Short Year (for example, 14) = `date.year.short`
* Year (for example, 14) = `date.year`
* Long Year (for example, 2014) = `date.year.long`
* Week of Year (for example, 31) = `date.year.week`

### Linking to an existing rule set

The **Link to Rule Set** option lets you reuse an existing rule set that's already defined for another category or folder.

> **Note:** If a category or folder already has linked rules applied (indicated by the ![]({% link governance-services/images/rules-icon.png %}){:height="18px" width="18px"} icon) you can link to new rules by [linking to a different rule set](#linking-to-a-different-rule-set).

1. Hover over a category/folder with no rules applied and click **More** then **Manage Rules**.

2. Click **Link to Rule Set**.

3. Find the category/folder you want to use.

    Select the site then select a folder. Check the rules listed to make sure you're linking to the correct folder.

    > **Note:** Locations that you don't have permission to access are disabled.

4. Click **Link**.

    > **Note:** You can click **View Rule Set** to view the rule details, or **Change** to select a different rule to link to.

5. Click **Done**.

## Working with a set of rules

You can easily view and maintain the individual rules that makes up the rule set. You can add, edit, and delete rules, make a rule inactive, and change the run order. You can also manually run rules.

You can create many rules to form a full set of rules, and then apply multiple rules to categories and folders.

When you select the **Manage Rules** action for a category/folder with defined rules, the Rules page is split into two.

The left side of the page lists the rules that make up the rule set. If the category/folder inherits rules from a parent category/folder, those rules appear here too. The rules run in the order they're listed. Inherited rules are always run first.

A check mark to the left of the rule means it's active.

Selecting an individual rule in this list displays its details on the right side of the page.

### Adding to a set of rules

A set of rules can include any number of individual rules, and you can add new rules to a category or folder as you need.

1. Click **Manage Rules** when you're in the folder or category in the File Plan you want to manage rules for.

    > **Tip:** You can also hover over a category/folder with rules applied (indicated by the ![]({% link governance-services/images/rules-icon.png %}){:height="18px" width="18px"} icon) and click **More** then **Manage Rules**.

2. Click **New Rule**.

    On the New Rule page you can add a new rule to a set of rules in exactly the same way as the first time you created a rule, see [creating a rule](#creating-a-rule).

After creating the last rule you return to the Rules page. Any new rules created are added at the end of the rule set.

### Editing a rule

You might need to revisit your rules from time to time and make some changes to keep them current. If you don’t want to use a specific rule anymore but think you might need it again in the future, you can just disable it.

1. Click **Manage Rules** when you're in the folder or category in the File Plan you want to edit rules for.

    > **Tip:** You can also hover over a category/folder with rules applied (indicated by the ![]({% link governance-services/images/rules-icon.png %}){:height="18px" width="18px"} icon) and click **More** then **Manage Rules**.

2. On the left side of the page, click the rule you want to edit.

    > **Note:** This will be shown in the rule summary on the right side of the page. You can't edit linked or inherited rules here; that has to be done in the category/folder where they were created.

3. Click **Edit**.

4. Make your changes. You can edit any of the rule details: name, description, rule definition, and options.

5. Click **Save**.

### Reordering the rules in the rule set

As part of managing your rule set you can pick the order in which the rules are run. If your category or folder has inherited rules, those are always run first in the order they're listed. Any rules marked as inactive are skipped.

1. Click **Manage Rules** when you're in the folder or category in the File Plan you want to reorder rules for.

    > **Tip:** You can also hover over a category/folder with rules applied (indicated by the ![]({% link governance-services/images/rules-icon.png %}){:height="18px" width="18px"} icon) and click **More** then **Manage Rules**.

2. On the left side of the page drag and drop rules to where you want them in the list.

    > **Note:** You can't reorder linked or inherited rules here; that has to be done in the folder where they were created. Click **Reset** to return the rule set to its last saved order.

3. Click **Save**.

### Turning off inherited rules

If a category or folder is inheriting rules from a parent category or folder, you can easily turn them on and off as needed.

Turning inherited rules on and off works at an individual category/folder level, and will not affect any other categories/folders.

1. Click **Manage Rules** when you're in the folder or category in the File Plan you want to switch off inherited rules for.

    > **Tip:** You can also hover over a category/folder with rules applied (indicated by the ![]({% link governance-services/images/rules-icon.png %}){:height="18px" width="18px"} icon) and click **More** then **Manage Rules**.

    If a category/folder has inherited rules these are displayed on the left side of the page.

2. Click **Inherit Rules**.

    Any inherited rules are turned off for the category/folder and **Don't Inherit Rules** is shown. You can click **Don't Inherit Rules** to turn inherited rules back on for the category/folder.

### Deleting a rule

When a category or folder has a rule applied that you don't need anymore, you can delete the individual rule.

1. Click **Manage Rules** when you're in the folder or category in the File Plan you want to delete rules for.

    > **Tip:** You can also hover over a category/folder with rules applied (indicated by the ![]({% link governance-services/images/rules-icon.png %}){:height="18px" width="18px"} icon) and click **More** then **Manage Rules**.

2. On the left side of the page, click the rule you want to delete.

    If you might want to use the rule again, consider disabling it instead. Edit the rule to do that.

    > **Note:** You can't delete linked or inherited rules here; that has to be done in the folder where they were created.

3. Click **Delete**.

4. When you're asked to confirm the deletion, click **Delete**.

## Working with linked rules

When a category or folder has linked rules there are less editing options than when it has its own set of rules. You can either link to a different rule set or you can break the link completely.

When you select the **Manage Rules** action for a category or folder with linked rules, the Rules page shows the name and path of the category/folder whose rule set is being referenced.

> **Note:** The category/folder might also inherit rules from a parent category/folder. A message lets you know if this is the case.

Changes to the rule set have to be done in the category/folder where the rules were originally defined. It's easy to get to the Rules page for the source category/folder: just click **View Rule Set**.

### Linking to a different rule set

If you want to change the rules you're linked to, you can easily link to a different rule set.

1. Click **Manage Rules** when you're in the folder or category in the File Plan you want to change linked rules for.

    > **Tip:** You can also hover over a category/folder with rules applied (indicated by the ![]({% link governance-services/images/rules-icon.png %}){:height="18px" width="18px"} icon) and click **More** then **Manage Rules**.

2. Click **Change**.

    > **Note:** This option only shows if the category/folder has linked rules.

3. Select the site then select a folder.

    You can only select locations you have permission to access.

4. Click **Link**.

    This breaks the link to the original rule set and links you to the new one.

5. Click **Done**.

### Breaking the link to a rule set

If you don't need your rules anymore, breaking the link is easy. This leaves the category/folder without any rules.

1. Click **Manage Rules** when you're in the folder or category in the File Plan you want to break a link to rules for.

    > **Tip:** You can also hover over a category/folder with rules applied (indicated by the ![]({% link governance-services/images/rules-icon.png %}){:height="18px" width="18px"} icon) and click **More** then **Manage Rules**.

2. Click **Unlink**.

    The link between the current category/folder and the linked rules is now broken.
