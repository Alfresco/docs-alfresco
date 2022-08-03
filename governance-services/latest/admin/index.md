---
title: Administration of Governance Services
---

RM Admin Tools is where you configure the Records Management site.

The user who created the Records Management site is automatically made a member of the Records Management Administrator group. 
Other users can access different areas of the **RM Admin Tools** depending on the {% include tooltip.html word="capabilities" text="capabilities" %} given to the role that they're in.

## Opening Admin Tools

You can easily configure Governance Services using the Admin Tools.

> **Note:** The user who created the Governance Services site is automatically made a member of the Governance Services Administrator group. Other users can access different areas of the **Admin Tools** depending on the capabilities given to the role that they're in.

In a Governance Services site click **Admin Tools** to open the **Audit** page, with various other options available on the left-hand side. Click a tool to manage that part of your site.

## Audit

The Audit tool is used for external audits to demonstrate compliance to regulatory requirements, and for internal audits for 
process improvement.

It displays auditing information collected from the system to show whether business rules are being followed, and to ensure 
that any unauthorized activity can be identified and traced. This tool is especially important for systems that deal with 
classified information.

The Audit tool maintains a complete trace of all the actions on every record and cannot be altered. 
The information that is captured and stored includes:

* Any action on any record, folder, category, or the {% include tooltip.html word="fileplan" text="File Plan" %}
* The user who carried out the action
* The date and time of the action

The Audit tool displays by default when you access the RM Admin Tools.

### Running an audit

The Audit tool displays by default when you open the Records Management Console.

When you run an audit you can select to run a full audit or you can filter the results.

1. If you want to filter the audit results then choose from one or more of the following options:

    |Filter action|
    |-------------|
    |By default only the first 20 log entries are displayed. Use this option to select the number of displayed entries.|
    |Select from and to dates for actions to include in the audit.|
    |Click **Specify** and search for then select a user you want to audit, then click **Add**.|
    |Select an event type to audit. You can only select one event type.|

2. When you've selected the audit filters you want, click **Run Audit Report**.

    > **Note:** If you don't want to filter the results, then just click **Run Audit Report** without making any filter selections.

The most recent entries in the log (up to 20) display in chronological order. You can see who performed each event, the user's role, and when it was performed. You can also click a column header to sort the results.

> **Tip:** Click **Details** to see more information on a specific event.

### What's in an audit?

When you run an audit, you are provided with details of all the actions that have taken place in your Records Management site.

The type of action that is recorded in the audit log includes:

* Capture of all electronic records: file, declare, undeclared
* Re-categorization of an electronic record within the file plan: a move
* Any change to any {% include tooltip.html word="retentionschedule" text="retention schedule" %} (instructions): create, modify, destroy
* Any retention actions carried out by authorized roles: {% include tooltip.html word="cutoff" text="cut off" %}, retain, transfer, review, close folder, reopen folder
* The adding or removal of an object to a {% include tooltip.html word="fileplan" text="File Plan" %}
* Any change made to any metadata associated with File Plan or electronic records, for example, change to vital record indicator
* Amendment and deletion of metadata by a user
* Any internal or user event triggered by the system or by the user, for example, SUPERSEDED, GAO Audit, End of Fiscal Year, and so on
* Changes made to the access permissions
* Creation, amendment, or deletion of a user or group
* Changes made to the {% include tooltip.html word="capabilities" text="capabilities" %} (functional access permissions)
* Changes made to supplemental markings
* Export and import
* Deletion / destruction of records
* Changes to the auditing levels and settings
* Search operations carried out by users
* Creating or deleting a hold

### Stopping and starting the audit log

If you have an audit running then you can stop it and restart it later.

1. Click **Stop** in the Audit tool of the **Admin Tools** if you have an audit running.

    A dialog box prompts you to confirm the action.

2. Click **Yes**.

    The auditing tool stops capturing and storing the activity in the Records Management system.

3. To start the audit log again, click **Start**. When prompted, click **Yes** to confirm the action.

### Filing the audit log as a record

When you've run an audit log you then have the option to file it as a record.

1. When you've run an audit, click **File as Record** in the Audit tool of the RM Admin Tools.

2. Choose the destination folder for the audit record.

3. Click **OK**.

    A message confirms that the audit log has been filed as a record in the selected folder in the File Plan.

    > **Note:** You'll need to add any required metadata before the record can be completed.

4. Click **OK** to dismiss the message. You can also click **View Record** to display the audit report in the Records Management site.

### Exporting the audit log

You can export the audit log which is useful for archiving it regularly so that you can examine or analyze system activity.

When you export the audit log, this doesn't affect the audit log in the system.

When you've run an audit, click **Export** in the Audit tool of the RM Admin Tools. Depending on your browser you'll be prompted to open or save the file or it will be saved automatically. The exported audit log is an HTML file.

### Viewing the full log

You can view the full contents of the log file in a separate window. From there you can save an HTML version of the 
report on your computer or in the Records Management File Plan.

1. When you've run an audit, click **View Recent Log** in the Audit tool of the RM Admin Tools.

    A separate window opens displaying the audit log.

2. You can save the log report in one or both of the following ways:

    * Click **Export** to save the report to your computer.
    * Click **File as Record** to file the report in the File Plan.
    
    > **Note:** If you select **File as Record** you'll need to add any required metadata before the record can be completed.

3. Close the window.

### Clearing the audit log

If you've run an audit you can quickly clear it to delete all captured actions.

1. When you've run an audit, click **Clear Full Log** in the Audit tool of the RM Admin Tools.

    A message prompts you to confirm the action.

2. Click **Yes** to clear the audit log.

## Custom metadata

Records Management has default sets of metadata for records, record {% include tooltip.html word="category" text="categories" %}, record folders, and non-electronic documents.

You can also add custom metadata that you can associate with each of these different types of records management objects.

You can choose from text fields, date pickers, check boxes, and if you've set up a 
[list of values](#list-of-values), selection menus.

If required you can choose to make specific custom data mandatory, so that users have to include it when they are 
completing a record.

> **Note:** If you add mandatory metadata to a records management object type that already has existing instances, the newly mandatory metadata won't be applied to existing instances, as this could cause inconsistencies with the File Plan.

### Creating custom metadata

You can create custom metadata for record categories, record folders, records, and non-electronic documents. 
When you create custom metadata, you can't delete it.

1. Click **Custom Metadata** in the RM Admin Tools.

2. Select an option in the Object column: **Non-Electronic Document**, **Record**, **Record Category**, or **Record Folder**.

    The right column lists any custom metadata that's already been defined for the selected object.

3. Click **New**.

    The **New Metadata** page displays.

4. Type a name for the metadata in the **Name** field.

    This name is used as the label on the Edit Metadata page.

5. Select a data **Type**.

    The type can be of the following values:

    |Type|Description|
    |--------|---------------|
    |Text|Adds a text field to the Edit Metadata page. When you select this option, you can select the **Use selection list** check box, so instead of a text field there will be a selection menu of the list created with the [List of Values tool](#list-of-values).|
    |Check box|Adds a check box to the Edit Metadata page.|
    |Date|Adds a date field to the Edit Metadata page.|

    > **Note:** The **Use selection list** option is only available if a list has been created with the [List of Values tool](#list-of-values).

6. To configure this metadata field as a selection menu:

    1. Select the **Use selection list** check box.

    2. Select a list name from the menu.

7. Select the **Mandatory** check box to set this metadata to be mandatory on the Edit Metadata page.

    > **Note:** Mandatory metadata must be completed before a record can be set to completed.

8. Click **Create**.

The new metadata displays in the right column of the Custom Metadata page.

### Editing custom metadata

You can easily edit any custom metadata that you've set up.

1. Click **Custom Metadata** in the RM Admin Tools.

2. Select an option in the Object column: **Non-Electronic Document**, **Record**, **Record Category**, or **Record Folder**.

    The right column lists any custom metadata that's already been defined for the selected object.

3. Click **Edit** to the right of the metadata you want to work with.

    The Edit Metadata Property page displays.

4. Make the required changes then click **Save**.

    > **Note:** You can't edit the type (text, boolean or date) or the Mandatory option for existing custom metadata.

## Define roles

Records Management roles and {% include tooltip.html word="capabilities" text="capabilities" %} control what functionality is available to users.

Alfresco has several default roles that users and groups can be assigned to:

* Records Management Administrator
* Records Management Power User
* Records Management Records Manager
* Records Management Security Officer
* Records Management User

> **Note:** There are also In-Place Readers and In-Place Writers roles but you can't assign users or groups to these in the RM Admin Tools.

These are displayed when you open the Define Roles tool. You can create as many more roles as you need.

Capabilities control what each role can do in the Records Management system, and with nearly 60 unique capabilities to choose from, they can vary hugely between roles.

> **Tip:** The role of Records Management Administrator has all capabilities assigned to it, so take a look at this to see the full list of capabilities available.

You assign users and groups who will all require the same levels of functionality to a role (a user can be assigned to multiple roles at the same time). Assign users and groups to roles using the [Users and Groups tool](#users-and-groups). You can manage roles to change the capabilities that they have.

Capabilities don't conflict and are not hierarchical. A user can be granted a single capability and that capability will not grant any further capabilities. Any user can have zero or more capabilities within the system. A user that has no capabilities is effectively barred from the Records Management system.

> **Tip:** Remember that roles and capabilities are different to permissions, which are set against folders and categories directly in the File Plan.

### Viewing the capabilities for a role

All existing roles are displayed when you open the Define Roles tool.

1. Click **Define Roles** in the RM Admin Tools.

2. In the Roles column, select a role to view.

    The list of capabilities assigned to that role display in the Capabilities column.

3. Select another role to view its assigned capabilities.

### Adding new roles

There are five default Records Management roles, but you can add as many more as you need.

1. Click **Define Roles** in the RM Admin Tools.

2. Click **New Role**.

    The New Role page displays all available capabilities, which are organized into groups. You can choose individual items or an entire group to define the {% include tooltip.html word="category" text="categories" %} for the role you're creating.

3. Enter a name for the role.

4. Select the capabilities that you wish to apply to the role.

    1. To select an individual capability within a group, click the check box.

    2. To select a group of capabilities, click **Select All**.

        For example, to select all capabilities for controlling folders, click **Select All** for the Folder Control group.

    > **Note:** A new role should at a minimum be given the **View Records** capability so that it can at least view records in the File Plan.

5. Click **Create**.

The new role displays in the list of available roles. Now you can add users and groups to the role.

### Editing a role

You can edit a role whenever you need to make changes to its name or the capabilities it's been assigned.

1. Click **Define Roles** in the RM Admin Tools.

2. In the Roles column, select the role you want to edit.

3. Click **Edit Role**.

4. Edit the name and capabilities as required.

5. Click **Save**.

### Deleting a role

You can delete a role whenever you need to.

> **Important:** Once a role is deleted all users and groups in the role will no longer have access to Records Management.

1. Click **Define Roles** in the RM Admin Tools.

2. In the Roles column, select the role you want to delete.

3. Click **Delete Role**.

    A message prompts you to confirm the action.

4. Click **OK**.

## Email Mappings

One of the many ways that you can file data in the Records Management system is by storing inbound emails as records.

The IMAP protocol allows email applications that support IMAP to connect to and interact with Alfresco repositories 
directly from the mail application.

Alfresco has multiple maps between email headers and Alfresco metadata properties set up by default. 
You can view these with the Email Mappings tool.

This means that when an email is saved to Records Management, metadata from the email header is captured and mapped to 
metadata for the record.

For example, an email `Subject` heading is mapped by default to the Alfresco property `title`. 
This is displayed as in the Email Mappings tool as `messageSubject` to `cm:title`. 
The email header field `messageSubject` is on the left and is separated by the word “to”, 
which indicates that it is mapped to a property `cm:title`.

When you're viewing emails within the Records Management system, the `title` property shows the email’s `Subject` heading.

As well as the default mappings, you can also add your own or delete existing ones.

### Adding an email map

The pre-defined email mappings cover the most commonly used email headers. You can include additional email header 
mappings using the Email Mappings tool.

1. Click **Email Mappings** in the RM Admin Tools.

2. Type the email header field in the **Map** box or select one from the menu.

3. Click **Select** to select an Alfresco property name.

    You can select an Alfresco property or a custom property.

4. Click **Add**.

    The new mapping displays in the list of email mappings.

### Deleting an email map

You can delete an email map whenever it's no longer needed.

1. Click **Email Mappings** in the RM Admin Tools.

2. Browse the list to find the mapping you want to delete.

3. Click **Delete** then click **Yes** to confirm.

    This removes the mapping from the list.

## Events

The life cycle of a record is controlled by either time-based or event-based triggers that are set in the retention schedule. 
You can edit events and create entirely new ones. When you create an event, you can't delete it.

Events are triggered when actions occur on a record or folder, such as it being versioned, {% include tooltip.html word="cutoff" text="cut off" %}, {% include tooltip.html word="recordfolderclosed" text="closed" %}, superseded, 
or obsoleted. All events belong to one of the following event types:

* *Simple* - a standard Records Management event
* *Obsoleted* - an item is invalid or out of date and is generally not replaced
* *Superseded* - an item is invalid or out of date and is to be replaced with a current record
* *Cross Referenced Record Transferred* - a record that is cross referenced is transferred

The following default events are available in Records Management:

* Abolished - *Simple*
* All Allowances Granted Are Terminated - *Simple*
* Case Closed - *Simple*
* Case Complete - *Simple*
* No longer needed - *Simple*
* Obsolete - *Obsoleted*
* Redesignated - *Simple*
* Related Record Transferred to Inactive Storage - *Cross Referenced Record Transferred*
* Separation - *Simple*
* Study Complete - *Simple*
* Superseded - *Superseded*
* Training Complete - *Simple*
* WGI action complete - *Simple*

### Creating a new event

Records Management provides an extensive list of events, but it's easy to add to these.

1. Click **Events** in the RM Admin Tools.

2. Click **New Event**.

    The New Event page displays.

3. In the **Name** field, enter a name for the event.

4. In the **Type** field, select the event type from the following:

    * *Simple* - a standard Records Management event that must be manually completed by a user
    * *Obsoleted* - an event that is automatically completed when a record is obsoleted by another record based on their relationship
    * *Superseded* - an event that is automatically completed when a record is superseded by another record based on their relationship
    * *Cross Referenced Record Transferred* - an event that is automatically completed when a cross referenced record (based on their relationship) is transferred
    * *Versioned* - an event that is automatically completed when a record is versioned

5. Click **Save**.

The new event displays on the Events page.

### Editing an event

You can edit all events, whether they are system defaults or ones that you've created.

> **Note:** It's recommended that you don't edit events that are actively in use on your system.

1. Click **Events** in the RM Admin Tools.

2. Browse the list to find the event you want to edit.

3. Click **Edit**.

    The Edit Event page displays.

4. Change the details as necessary.

5. Click **Save**.

## List of values

When users edit metadata for folders and records, one of the field types available is a list of values.

Two predefined lists are provided with Records Management:

* *Supplemental Markings*: security categories that are recommended by the DoD 5015.2
* *Transfer Locations*: the names of your storage locations

> **Note:** These are available for both standard and {% include tooltip.html word="dod50152std" text="DoD 5015.2-STD" %} compliant File Plans.

You need to provide values for these lists so that users can select from them when they edit metadata. 
The recommended values for Supplemental Markings are Confidential, Restricted, Secret, Top Secret and Unclassified.

You can also set up new lists as needed, and you can use these lists when you [create custom metadata](#creating-custom-metadata).

Where the value is a text string, you can also enter the value using a list of values menu. For example, 
on the Edit Metadata page, you enter the value for the Mimetype field by selecting a value from the menu.

> **Important:** Administrators can see all security marks and other metadata when browsing the repository (for example, using the Node Browser).

### Creating a list of values

Creating a list is a two step process. First you create the empty list and then you edit it to add the values. 
Once you create a list, you cannot delete it.

1. Click **List of Values** in the RM Admin Tools.

2. Click **New List**.

    The New List dialog box displays.

3. In the **Name** field, enter a name for the list.

    > **Note:** The list name must be unique.

4. Click **OK**.

The name of the new list displays on the Lists page.

### Editing a list of values

Use the Edit feature to add and delete values for a list. You can also control the user and group access to 
the values in the list.

1. Click **List of Values** in the RM Admin Tools.

2. Locate the list you want to modify, and then click **Edit**.

    The Edit List page displays.

3. To add values to the list:

    1. In the empty field at the top of the page, type the new value.

    2. Click **Add**.

        The value name displays in the Values table.

    > **Note:** You can click **Delete** next to a value to remove it from the list.

4. To control the user and group access to the individual values in the list:

    1. In the Values table, click the value you want to set access for.

        The selected value is highlighted.

    2. On the right side of the page, click **Add**.

        The Add Access dialog box displays.

    3. In the search field, type the full or partial name of a user or group.

        You must enter at least three (3) characters.

    4. Click **Search**.

        A list of users and groups matching the search criteria displays.

    5. Click **Add** to the right of the user or group you want to have access to the selected value.

        The user or group displays in the right column. You can add as many users and groups as required.

    > **Note:** Only users that you give access to here will be able to see the value when they edit metadata.

5. When you have finished editing the values and access, click **Done** to save all changes.

### Renaming a list of values

If you need to rename a list of values then it's very easy to do.

1. Click **List of Values** in the RM Admin Tools.

2. Locate the list you want to rename, and then click **Rename**.

    The Rename List dialog box displays.

3. Edit the list name and then click **OK**.

The modified name displays on the Lists page.

## Relationships

In the File Plan you can create relationships between records.

There are two types of relationships that can be established between records:

* *Bi-directional* - a two-way relationship such as a cross-reference
* *Parent/Child* - a relationship where the child is dependant upon its parent, such as when the parent is superseded by the child

The names given to individual relationships are based on the different types of referencing, and are what makes each one unique.

You can see the default relationship types that are included in Records Management and you can create new and manage 
existing relationships.

### Creating a new relationship

The RM Admin Tools has several default relationships. You can add more relationships, but once you create a relationship 
you can't delete it.

1. Click **Relationships** in the RM Admin Tools.

2. Click **New Relationship**.

    The New Relationship page displays.

3. Select the relationship type:

    * Bi-directional
    * Parent/Child

4. If the relationship type is Bi-directional, complete the Label field, and if the relationship type is Parent/Child, complete the Source and Target fields.

    The values you enter display in the File Plan when a user creates the reference.

    > **Tip:** The existing default values give good examples of how to label relationships.

5. Click **Save**.

    The new relationship appears in the list.

### Editing a relationship

You can't delete relationships once they're created, but you can edit them.

1. Click **Relationships** in the RM Admin Tools.

2. Locate the relationship you want to modify, and then click **Edit**.

    The Edit Relationship page displays. You can't change the relationship type; only the field values can be modified.

3. Make the necessary changes:

    * If the relationship type is Bi-directional, edit the Label field.
    * If the relationship type is Parent/Child, edit the Source and Target fields.

4. Click **Save**.

## User Rights Report

The User Rights Report gives you a summary of the Records Management site users, groups, and roles.

The report is divided into three sections:

* *Users* - All users of the Records Management site, and the roles and groups they are a member of
* *Roles* - All roles in the Records Management site, and the users in those roles
* *Groups* - All groups that are members of the Records Management site, and the users in those groups

You can access the report by clicking **User Rights Report** in the RM Admin Tools.

## Users and groups

Alfresco users and groups are created by the Alfresco administrator using the Alfresco Share Admin Tools. 
You can then assign these users and groups to Records Management roles using the Users and Groups tool in the RM Admin Tools.

Once you've [assigned them to a role](#define-roles) they'll be able to use the level of Records Management 
functionality that role has been given.

> **Note:** There are some system groups that are generated by default, such as `site_swsdp_SiteManager`. These can't be assigned to a role.

### Adding users and groups to a role

Adding users and groups to a role gives them permission to use the level of Records Management functionality 
that role has been given.

1. Click **Users and Groups** in the RM Admin Tools.

    All existing roles are displayed. When you click on a role the groups and users assigned to that role are displayed.

2. Locate the role you want to add groups or users to and click on it.

    Existing groups and users assigned to the role are displayed.

3. Click **Add** next to Groups or Users, depending on which you want to add.

    The Add User or Add Group page displays.

4. Enter a search term and click **Search**.

    All users or groups matching your search are displayed.

5. Click **Add** next to the user or group that you want to add to the role.

    The new group users is added to the role.

    > **Note:** You can remove a group or user from a role at any time by selecting them and clicking **Remove** then **Yes** to confirm.
