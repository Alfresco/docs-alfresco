---
title: Using Identity Management
---

These are operations to manage tenants, groups and users. This is useful for example to bootstrap environments 
with the correct identity data.

## Tenants tab

Use the Tenants tab for creating new tenants, and modifying existing tenants.

By default, the details of the currently selected tenant are displayed. You can edit the name of the current tenant 
and configure various settings as follows:

* **Logo** - Add or update your existing logo.

* **Events** - A log of management events for the tenant.

* **Alfresco repositories** - Configure your on-premise repositories. See *Create Alfresco repository*.

* **Endpoints** - Configure your RESTful endpoints and Basic Authentication for endpoints.

* **Data sources** - Register your data sources for using in Data Model.

* **Document templates** - Upload a Microsoft Word (.docx) file that can be used as a template in processes.

* **Email templates** - Create new custom email templates, view or edit the existing templates (both standard and custom). For information on creating custom templates, see next section about Custom email templates.

* **Config** - Configure settings for Box metadata support, validate decision table expressions, and enable or disable the option for involved users to edit forms. In addition, you can define the minimum length for the password, and the date format for forms (for example, *D-M-YYYY*).

### Custom email templates

Create custom email templates to send an email to the assigned user of a user task after the task is assigned to them.

Custom email templates can be created centrally or within an application when it is being designed.

Templates can contain process and task variables using the format `${title}` where the variable is called `title`.

The following predefined variables can also be used depending on the `assignment` of the [user task]({% link process-services/latest/using/process/bpmn.md%}#user-task):

|Assignment|Variable|
|----------|--------|
|Single User Task|`taskCreator`, `taskName`, `taskDirectUrl`, `homeUrl`|
|Group Task|`groupName`, `taskName`, `taskDirectUrl`, `homeUrl`|
|Candidate User Task|`taskName`, `taskDirectUrl`, `homeUrl`|

>**Note:** If a process or task variable uses the same name as a predefined variable, the value of the process or task variable takes precedence in the template.

The following is an example of a custom email template using variables:

```text
A ${taskName} has been assigned to ${userName} for approval by ${dateDue}. 
        
If a response is not received within ${sla} it will be automatically approved. 
```

Custom email templates can be created at the tenant level or per application:

**Tenant level custom email template**:

>**Note:** Users require the **Administration of tenant of this group** permission to manage email templates.

1.  Navigate to **Identity Management** > **Tenants** > **Email templates**.
2.  Select **Create new email template** on the **Custom email templates** tab.
3.  Write and save a new custom email template with a name, subject and email body.

Existing custom templates can managed, edited and deleted in the same location.

**Application level custom email template**:

1.  Add a user task to a process and check the **Allow email notifications** property for it.
2.  Select the **Custom template** property in the same user task.
3.  Write and save a new custom email template with a name, subject and email body.

## Users tab

The users tab provides tools for managing users. The current users are displayed on the right panel. 
You can select from the list of users and use **Select an action** to change details, status, account type, password, 
and primary group of the user. In addition, you can create a new user, or filter the list of current users by status, 
account type, email or name, and company.

## Capabilities tab

Use the Capabilities tab for managing the capabilities and groups of users that are available for this tenant.

There are two types of groups:

* **Capability groups** - Groups that can be granted with variety of capabilities.

* **Organization groups** - Functional groups that reflect the structure of your organization.


The following capability groups are available by default:

* **Analytics-users** - Access the Analytics app to view reports.

* **Superusers** - Administration of tenant of this group gives full administration rights for the current tenant to the selected group.

* **App Designer** - Access to App Designer app that allows you to design and publish process definitions.


In addition, an Administrator can grant to the following capabilities to any of the capabilities groups:

* Access Analytics app

* Access App Designer app

* Access the REST API

* Access to all tenants' models

* Administration of tenant of this group

* Publish app to user dashboard

* Upload license

You create and delete capabilities groups, add and remove users to and from a group, and add and remove capabilities 
to and from all users in a group.

## Organization tab

Use the Organization tab to create functional groups that reflect the structure of your organization. 
Groups are used to grant access to apps or tasks. You can also add and remove users to and from a group, 
and create subgroups within a group.

**Create a group**

1.  Click **Create group**.
2.  Enter a name, for example *Group 1* and *Group 2*.
3.  Click **Save**.

```text
Group 1

Group 2
```

Result: *Group 1* and *Group 2* have been created as groups.

**Create a subgroup**

1.  Select a group, for example *Group 1*.
2.  Click **Create subgroup**.
3.  Enter a name, for example *Group 1.1*.
4.  Click **Save**.

```text
Group 1 
    Group 1.1

Group 2
```

Result: *Group 1.1* has been created as a subgroup of *Group 1*.

**Add an existing group**

1.  Select a group, for example *Group 2*.
2.  Click **add existing group**.
3.  Enter an existing group name, for example *Group 1.1*.
4.  Select the group from the dropdown menu.

```text
Group 1 

Group 2 
    Group 1.1
```

Result: *Group 1.1* has been moved from being a subgroup of *Group 1* to *Group 2*.

Another example:

1.  Select a group, for example *Group 1*.
2.  Click **add existing group**.
3.  Enter an existing group name, for example *Group 2*.
4.  Select the group from the dropdown menu.

```text
Group 1 
    Group 2 
        Group 1.1            
```

Result: *Group 2* has been added as a subgroup of *Group 1* and *Group 1.1* persists as a subgroup of *Group 2*.

**Delete a group**

1.  Select a group to delete, for example *Group 1*.
2.  Click the delete button (trashcan icon).
3.  Click the delete button again.

```text
Group 1 (deactivated)
    Group 2 (deactivated)
        Group 1.1 (deactivated)
```

Result: *Group 1* has now been deleted.

>**Note:** When you first click the delete button a group, it will be deactivated, until all its tasks are complete. To delete the group completely, click the delete button a second time. When you delete a group, this will delete all its subgroups.

**Add users to a group**

1.  Select a group to add users to.
2.  Search for a user to add, for example *user1*.
3.  Select the user from dropdown menu.

|Email|Name|
|-----|----|
|user1@app.activiti.com|user1|

Result: *user1* has been added to the group.

**Assign a group manager**

1.  Select a group to assign a manager to.
2.  Click **select user** next to Group manager.
3.  Search for a user to appoint as manager, for example *user2*.
4.  Select the user from the dropdown menu.

Result: *user2* has been appointed as the group manager.

>**Note:** All changes made in the Organization tab are listed in the [Tenants tab](#tenants-tab) under Events.
