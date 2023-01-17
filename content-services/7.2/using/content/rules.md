---
title: Folder rules
---

In the library you can define folder rules to manage your content automatically. You can come up with many creative solutions to make sure specific content processes are automated all without you having to do the work yourself.

Rules dictate how content entering, leaving, or currently residing in a folder is managed.

There are three parts to a content rule:

* The event that triggers the rule
* The conditions the content has to meet
* The action performed on the content

The events that can trigger a rule are:

* A content item arrives in the folder
* A content item leaves the folder (it's moved or deleted)
* A content item in the folder is modified

Here are some examples of how you can use rules to automate repetitive tasks:

* All files placed in the *Drafts* folder are versioned
* All files placed in the *Drafts* folder become part of a simple workflow
* All files placed in the *Completed* folder that have the tag *final* will be moved to the folder *Archived*
* All GIF files placed in the *Images* folder will be transformed to PNG files
* All presentation documents placed in the *Published* folder will be transformed to Flash and copied to the *Assets* folder

## Defining rules for a folder

Use folder rules to manage your files automatically. There are two ways to define rules: create your own rules or link to rules already created for a different folder.

When you define a rule, it only applies to new content added to the folder. Files that were in the folder before the rule was defined aren't affected by it. You can manually apply the folder rules with the **Run Rules** action.

> **Note:** Even if the folder doesn't have its own rules, it could have inherited rules from a parent folder. A message on the Rules page lets you know if this is the case.

### Creating a rule {#createrule}

You can create rules for a folder, in much the same way that you might apply rules to your emails.

> **Note:** If a folder already has rules applied to it (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) you can add new rules to it by [adding a set of rules](#addtosetofrules).

1. Hover over a folder with no rules applied and click **More** then **Manage Rules**.

2. Click **Create Rules**.

3. Enter a name and a description (optional) for the rule.

4. Select when the rule will be triggered:

    * **Items are created or enter this folder**: The rule will be applied to content that gets added to this folder. This includes any item that is copied to, created in, or uploaded to the folder.
    * **Items are updated**: When an item in this folder is modified, the rule will be applied to it.
    * **Items are deleted or leave this folder**: The rule will be applied to content that is moved out of the folder or deleted.

    > **Note:** A rule can have more than one event, condition, and action. Click the + or - to add or remove rows.

5. Select if the rule will be applied **If all criteria are met**, **Unless all criteria are met**, or both.

    Here are 3 examples of conditions that you could apply to trigger a rule:

    * The rule is applied if the item title contains the word 'urgent' (**If all criteria are met**)
    * The rule is applied if the item title does not contain the word 'urgent' (**Unless all criteria are met**)
    * The rule is applied if the item title contains the word 'urgent', unless the item was created before a specified date (**If all criteria are met** and **Unless all criteria are met**)

6. Select criteria for which content the rule will apply to, and remember that you can use the + and - icons to add and remove extra criteria.

    > **Note:** Selecting **Show more** on the criteria menu gives you additional properties to choose from. Use the folders on the Select property page to search properties, then select a property on the right of the page. Selecting **Show in menu** shows the property in all condition lists for the current rule.

7. Select the [rule action](#ruleactions) you want performed when the conditions are met.

    When you've selected an action you then need to select further options, for example if you select to copy or move items click **Select** to specify where the content will be copied or moved to.

    > **Note:** The **Copy** option copies items in the folder only, not the contents of any sub-folders. Select the additional **Deep Copy** option if you want to also copy sub-folders and their contents. The ![missing info]({% link content-services/images/im-missinginfo.png %}) icon indicates where any required information is missing from your condition or action.

8. Select additional options:

    * **Disable rule**: Switch off the rule.
    * **Rule applies to subfolders**: Apply the rule to this folder and all its subfolders.
    * **Run rule in background** Lets you continue working while the rule is running. You can also select an action to run if an error occurs with the rule. These actions are set up by your Alfresco administrator.

9. Click **Create**, or **Create and Create Another** to save this rule and start creating another.

### Rule actions {#ruleactions}

When you're setting up a rule in Alfresco Share there are lots of default actions available.

Selected actions are performed on files that meet the criteria of the event and conditions that you've selected.

Actions don't apply to files in subfolders, unless the **Rule applies to subfolders** option is selected before a rule is created.

> **Note:** Additional rule actions are available with modules such as Alfresco Records Management, or if they've been set up by your Alfresco administrator.

|Action|What the action does|
|------|--------------------|
|**Execute script**|Runs a custom JavaScript script from the Data Dictionary/Scripts folder. There are a number of sample scripts available. The list can vary depending on how Content Services is configured for your organization.|
|**Copy**|Creates copies of files in the location of your choice. Select the additional **Deep Copy** option if you want to also copy sub-folders and their contents.|
|**Move**|Moves all files and subfolders to the location of your choice.|
|**Check in**|Files that are currently checked out will be checked in. For example, they will be checked in before being moved to another folder. Select **Options** to choose whether they will be checked in as minor or major versions.|
|**Check out**|Checks out files automatically, with a working copy created in the location of your choice.|
|**Link to category**|Links files or folders to a category of your choice, such as a region or classification. See [Tagging and categorizing content]({% link content-services/7.2/using/content/manage.md %}#tagcategorizecontent) for more information.|
|**Add aspect**|Adds a property aspect to files, to give it additional behaviors or properties. See [About Aspects]({% link content-services/7.2/config/repository.md %}#about-aspects) for more information.|
|**Remove aspect**|Removes a property aspect from files, to remove functionality or properties. See [About Aspects]({% link content-services/7.2/config/repository.md %}#about-aspects) for more information.|
|**Add simple workflow**|Adds files to a workflow. By default there is an approval task. You can also click to add a reject task. You can click on **Approve** and **Reject** to rename the steps and to select a location to copy and move approved/rejected files to. See [Tasks and workflows](#createsimpleworkflow) for more information.|
|**Send email**|When files and subfolders are added you can select to send notifications by email. Click **Message** to select recipients and add the message of your choice.|
|**Transform and copy content**|When applicable, add copies of files, in the format of your choice, to another location. For example you can generate a copy of a Word document in PDF format in a different folder.|
|**Transform and copy image**|When applicable, add copies of image files, in the format of your choice, to another location. For example you can generate a copy of a GIF file in PNG format in a different folder.|
|**Extract common metadata fields**|Embedded metadata is extracted from files and added to the file properties. Microsoft Office document properties, LibreOffice, and a number of other formats are supported.|
|**Import**|ZIP and ACP files are automatically unpacked. Select a location where the unpacked files will be placed.|
|**Specialise type**|When applicable, changes a file's content type. For example, changes a standard file into a policy document and adds the appropriate metadata for that content type. See [Changing the content type]({% link content-services/7.2/using/content/files-folders.md %}#changetype) for more information.|
|**Increment Counter**|Automatically increments the value of a number (integer) property. This will generally only be used by Alfresco administrators.|
|**Set property value**|Select a property and then enter a default value. Files with that property will have it changed to the entered value.|
|**Embed properties as metadata in content**|Embeds file properties directly into the binary file as metadata. The information contained in those files can help in searching and workflows.|
|**Start Process**|You can use this action to create a folder rule in Share that triggers an Alfresco Process Services process. See [Configuring the APS Action]({% link content-services/7.2/config/action.md %}) and [Start Process action details](#startprocessactiondetails) for more information.|

### Linking to an existing rule set

The **Link to Rule Set** option lets you reuse an existing rule set that's already defined for another folder.

> **Note:** If a folder already has linked rules applied (rules are indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) you can link to new rules by [linking to a different rule set](#linktodifferentruleset).

1. Hover over a folder with no rules applied and click **More** then **Manage Rules**.

2. Click **Link to Rule Set**.

3. Find the folder you want to use.

    Select the site then select a folder. Check the rules listed to make sure you're linking to the correct folder.

    > **Note:** Locations that you don't have permission to access are disabled.

4. Click **Link**.

    > **Note:** You can click **View Rule Set** to view the rule details or **Change** to select a different rule to link to.

5. Click **Done**.

### Creating a simple workflow {#createsimpleworkflow}

You can set up rules to trigger a simple workflow that's made up of review and approval steps. When an item enters a folder with this type of rule applied, it will have additional actions available.

You configure the rule to specify the user actions and flow of the content between folders. You can also add complexity to a simple workflow by creating rules for other folders and passing content around from location to location.

For example, you could set up rules to create a simple workflow that manages content as follows:

* Users can approve content added to the **Drafts** folder.
* On approval, the content is moved to a **Pending Approval** folder.
* Managers can approve the content in this folder.
* On approval, the content is moved to the **Published** folder. If the content is rejected it's moved back to **Drafts**.

> **Note:** When you create a rule for a folder, it applies to all content items that are added to that folder after the creation of the rule. Content items residing in the folder before the rule is created are not affected by the rule. However, you can use the **Run Rules** actions to ensure the new rules apply to the existing content.

1. Hover over a folder with no rules applied and click **More** then **Manage Rules**.

2. Click **Create Rules**.

3. Enter a name and description (optional) for the rule.

4. Select when the rule will be triggered:

    * **Items are created or enter this folder**: The rule will be applied to content that gets added to this folder. This includes any item that is copied to, created in, or uploaded to the folder.
    * **Items are updated**: When an item in this folder is modified, the rule will be applied to it.
    * **Items are deleted or leave this folder**: The rule will be applied to content that is moved out of the folder or deleted.

    > **Note:** A rule can have more than one event, condition, and action. Click the + or - to add or remove rows

5. Select if the rule will be applied **If all criteria are met**, **Unless all criteria are met**, or both.

    Here are 3 examples of conditions that you could apply to trigger a rule:

    * The rule is applied if the item title contains the word 'urgent' (**If all criteria are met**)
    * The rule is applied if the item title does not contain the word 'urgent' (**Unless all criteria are met**)
    * The rule is applied if the item title contains the word 'urgent', unless the item was created before a specified date (**If all criteria are met** and **Unless all criteria are met**)

6. Select criteria for which content the rule will apply to, and remember that you can use the + and - icons to add and remove extra criteria.

    > **Note:** Selecting **Show more** on the criteria menu gives you additional properties to choose from. Use the folders on the Select property page to search properties, then select a property on the right of the page. Selecting **Show in menu** shows the property in all condition lists for the current rule.

7. Select **Add simple workflow** as the action.

8. To include an approval step in the workflow click **Approve** and provide details.

    1. Enter an Action Label.

        This will be displayed as a new additional option available for relevant content. If you don't change the label then a new **Approve** option will be available for relevant items in this folder.

    2. Select to **copy** or **move** approved content and click **Select** to set where it will be copied or moved to.

    3. Click **OK**.

9. To include a rejection step in the workflow select the check box and click **Reject**, then provide details.

    1. Enter an Action Label.

        This will be displayed as a new additional option available for relevant content. If you don't change the label then a new **Reject** option will be available for relevant items in this folder.

    2. Select to **copy** or **move** rejected content and click **Select** to set where it will be copied or moved to.

    3. Click **OK**.

10. Select additional options:

    * **Disable rule**: Switch off the rule.
    * **Rule applies to subfolders**: Apply the rule to this folder and all its subfolders.
    * **Run rule in background** Lets you continue working while the rule is running. You can also select an action to run if an error occurs with the rule. These actions are set up by your Alfresco administrator.

11. Click **Create**, or **Create and Create Another** to save this rule and start creating another.

In the **Document Library** the symbol ![simple workflow]({% link content-services/images/im-rules-simpleworkflow.png %}) to the left of an item indicates that a simple workflow has been applied to it. The approve and reject actions (with their defined labels) appear in the action list for these items.

### Start Process action details {#startprocessactiondetails}

The Start Process action allows you to create a folder rule in Alfresco Share that triggers an Alfresco Process Services process. To access the Perform Action section of the rule definition, select **Start Process** and then click the **Options** button.

![Start Process Options fields]({% link content-services/images/aps-action.png %})

* **Process definition**: Select the process model from Process Services that you want to use from the drop down list. The drop down list will include the Process Services review processes and any other custom ones that have been created in the Process Services apps that you have access to.
* **Process name**: Enter a custom name you want to give for the process instance when the rule triggers.
* **Additional form fields**: The drop down list displays the mandatory fields contained in the Start form that is attached to the process. You can select Additional form fields and define values for them.
* **Value**: Enter the desired values for the additional form fields that you selected. Values must be provided for any mandatory fields in the Start Form of the selected process. Values for other fields in the Start form are optional.

Important notes on the usage of the Start Process action:

* To create a rule using the Start Process action in Content Services you must also be a user in Process Services.
* To perform content actions in a folder that has a Process Services action rule defined, a user must be a Content Services and Process Services user.
* The Start Process action is designed to work with "Create" events only. It cannot be used for "Update" events.
* When creating a rule for Start Process action, the criteria for “Content of type or sub-type” must be set to “Content”.
* Assignees assigned to an action must be Process Services users.
* When designing Process Services processes to be triggered from Content Services, the process definition should have a Start form that contains an Attach File field named 'content'.
* Process Services processes which are triggered from a Process Services action, and their related Tasks, can only be managed through Process Services related interfaces and not through Alfresco Share.

## Working with a set of rules

You can easily view and maintain the individual rules that makes up the rule set. You can add, edit, and delete rules, make a rule inactive, and change the run order. You can also manually run rules.

You can create many rules to form a full set of rules, and then apply multiple rules to folders.

When you select the **Manage Rules** action for a folder with defined rules, the Rules page is split into two.

The left side of the page lists the rules that make up the rule set. If the folder inherits rules from a parent folder, those rules appear here too. The rules run in the order they're listed. Inherited rules are always run first.

A check mark to the left of the rule means it's active.

Selecting an individual rule in this list displays its details on the right side of the page.

See [Troubleshooting rules and actions]({% link content-services/7.2/admin/troubleshoot.md %}#troubleshoot-rules-and-actions) for information about resolving problems with rules.

### Adding to a set of rules {#addtosetofrules}

A set of rules can include any number of individual rules, and you can add new rules to a folder as you need.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. Click **New Rule**.

    On the New Rule page you can add a new rule to a set of rules in exactly the same way as the first time you created a rule, see [creating a rule](#createrule).

After creating the last rule you return to the Rules page. Any new rules created are added at the end of the rule set.

### Editing a rule

You might need to revisit your rules from time to time and make some changes to keep them current. If you don’t want to use a specific rule anymore but think you might need it again in the future, you can just disable it.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. On the left side of the page, click the rule you want to edit.

    > **Note:** This will be shown in the rule summary on the right side of the page. You can't edit linked or inherited rules here; that has to be done in the folder where they were created.

3. Click **Edit**.

4. Make your changes. You can edit any of the rule details: name, description, rule definition, and options.

5. Click **Save**.

### Deleting a rule

When a folder has a rule applied that you don't need anymore, you can delete the individual rule.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. On the left side of the page, click the rule you want to delete.

    If you might want to use the rule again, consider disabling it instead. Edit the rule to do that.

    > **Note:** You can't delete linked or inherited rules here; that has to be done in the folder where they were created.

3. Click **Delete**.

4. When you're asked to confirm the deletion, click **Delete**.

### Reordering the rules in the rule set

As part of managing your rule set you can pick the order in which the rules are run. If your folder has inherited rules, those are always run first in the order they're listed. Any rules marked as inactive are simply skipped.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. On the left side of the page drag and drop rules to where you want them in the list.

    > **Note:** You can't reorder linked or inherited rules here; that has to be done in the folder where they were created. Click **Reset** to return the rule set to its last saved order.

3. Click **Save**.

### Switching off inherited rules

If a folder is inheriting rules from a parent folder, you can easily switch them on and off as needed.

Switching inherited rules on and off works at an individual folder level, and will not affect any other folders.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and then **Manage Rules**.

    If a folder has inherited rules these are displayed on the left side of the page.

2. Click **Inherit Rules**.

    Any inherited rules are switched off for the folder and **Don't Inherit Rules** is shown. You can click **Don't Inherit Rules** to switch inherited rules back on for the folder.

### Manually running rules

When you create or edit a rule set, the rules aren't automatically applied to the existing folder items. You can manually run the rules at any time to apply them to all content. Only the items that meet the conditions will be affected.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. Click **Run Rules**.

3. Choose how you want to run the rules:

    * **Run rules for this folder**
    * **Run rules for this folder and its subfolders**

    A message lets you know when the rules have run.

## Working with linked rules

When a folder has linked rules there are less editing options than when it has its own set of rules. You can either link to a different rule set or you can break the link completely.

When you select the **Manage Rules** action for a folder with linked rules, the Rules page shows the name and path of the folder whose rule set is being referenced.

> **Note:** The folder might also inherit rules from a parent folder. A message lets you know if this is the case.

Changes to the rule set have to be done in the folder where the rules were originally defined. It's easy to get to the Rules page for the source folder: just click **View Rule Set**.

### Linking to a different rule set {#linktodifferentruleset}

If you want to change the rules you're linked to, you can easily link to a different rule set.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. Click **Change**.

    > **Note:** This option only shows if the folder has linked rules.

3. Select the site then select a folder.

    You can only select locations you have permission to access.

4. Click **Link**.

    This breaks the link to the original rule set and links you to the new one.

5. Click **Done**.

### Breaking the link to a rule set

If you don't need your rules anymore, breaking the link is just a single click away. This leaves the folder without any rules.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. Click **Unlink**.

    > **Note:** This option only shows if the folder has linked rules.

    The link between the current folder and the linked rules is now broken.
