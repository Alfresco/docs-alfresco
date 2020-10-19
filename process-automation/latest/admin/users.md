---
title: Users and groups
---

The **Identity** section of the Admin Application is used to create and manage users, groups and their roles.

## Users

The **Users** section displays the current list of users in the system.

### Properties {#user-properties}

The properties for users are:

| Property | Description |
| -------- | ----------- |
| ID | A unique identifier for the user. This is system generated and cannot be changed. |
| Username | A username for the user that they will be known by in Process Automation. |
| Email | An email address associated to the user. |
| First Name | The first name of the user. |
| Last Name | The last name of the user. |

### Add a user

To add a user:

1. Sign into the Admin Application.

2. Expand the **Identity** section and select **Users**.

3. Click the **Add User** button.

4. Fill in the properties for a user and click **Save**.

Once the user has been created, **Edit** the user to assign groups and roles to the user and reset a user's password.

> **Note**: A `Username` cannot be changed once a user has been created.

## Groups

The **Groups** section displays the current list of groups in the system.

Groups are used to quickly assign multiple roles to users and for logically assigning permissions to applications with. They can also be used to create group assignments for [user tasks]({% link process-automation/latest/model/processes/bpmn.md %}#user-task).

### Properties {#group-properties}

The properties for groups are:

| Property | Description |
| -------- | ----------- |
| ID | A unique identifier for the group. This is system generated and cannot be changed. |
| Name | A name to identify the group with.

### Add a group

To add a group:

1. Sign into the Admin Application.

2. Expand the **Identity** section and select **Groups**.

3. Click the **Add Group** button.

4. Give a name to the group and click **Save**.

Once the group has been created, **Edit** the group to assign roles to it.

## Roles

The **Roles** section displays the current list of roles in the system.

Roles are used to provide access to the Modeling Application and different areas of the Admin Application.

The roles available are:

| Role | Description |
| ---- | ----------- |
| ACTIVITI_ADMIN | Provides access to the Admin Application. Users with this role will be able to see the **Process Admin** section for applications that they have been given administrator access to when an application was [deployed]({% link process-automation/latest/admin/release.md %}#deployment). |
| ACTIVITI_DEVOPS | Provides access to the Admin Application. Users with this role will be able to see the [**DevOps**]({% link process-automation/latest/admin/release.md %}) section in order to deploy and manage deployed projects. |
| ACTIVITI_IDENTITY | Provides access to the Admin Application. Users with this role will be able to see the **Identity** section and manage users, groups and roles. |
| ACTIVITI_MODELER | Provides access to the [Modeling Application]({% link process-automation/latest/model/index.md %}). Users with this role will be able to model and release projects. |
| ACTIVITI_USER | Users require this role to be given user access to an application. |
