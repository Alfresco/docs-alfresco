---
title: User interfaces
---

The user interfaces (UI) section sets an end-user interface for users to interact with content, tasks and processes for the project using the [Alfresco Digital Workspace]({% link process-automation/latest/using/index.md %}).

## Properties

The basic properties of a user interface are:

| Property | Description |
| -------- | ----------- |
| UI name | *Required.* The name of the interface. Must be in lowercase and between 1 and 26 characters in length. Alphanumeric characters and hyphens are allowed, however the name must begin with a letter and end alphanumerically, for example `order-template`. |
| UI description | *Optional.* A description of what the interface should be used for, for example `A template for orders to follow.` |

## Create a user interface

To create a user interface:

1. Sign into the Modeling Application and open a project.

2. Click the **NEW** dropdown.

3. Select how to create the interface:

    * **Create > UI** creates a new, empty user interface.

    * **Upload > UI** allows for uploading an existing user interface into the Modeling Application.

    Alternatively use the **+** or **Upload** buttons next to **UI** in the left-hand menu.

4. Enter a name and optional description.

## User interface modeling

Once a user interface has been created, set the type to `content` to deploy the Digital Workspace with the application. This can be accessed by users once a project has been [deployed]({% link process-automation/latest/admin/release.md %}#deployment) using the format `ui/<name>`, for example `https://alfresco.com/finance-project/ui/content-app`.

> **Note**: An instance of Digital Workspace will be deployed with each application that can only start processes created within that same application. Only users assigned [user access]({% link process-automation/latest/admin/release.md %}#deploy-steps/user) to the application will be able to access the interface.

## Custom user interfaces

Custom user interfaces can be [developed](LINK) with the [Application Development Framework](LINK) and deployed as part of the project.

## Actions

The actions that can be run against an interface are:

| Action | Description |
| ------ | ----------- |
| Download UI | Download the JSON for the interface. |
| Validate | Run validation against the interface. Any errors can be seen in the log history at the bottom of the Modeling Application and are flagged in a pop-up box. |
| Save | Save any changes made to the interface. |
| Delete | Delete the interface. |
