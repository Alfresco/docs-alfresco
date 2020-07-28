---
title: Alfresco Process Workspace
---

The Alfresco Process Workspace is accessed by end-users to provide them a view of in progress [process instances](../workspace/processes.md) and [tasks](../workspace/tasks.md). Users are able to create new process instances and tasks and assign [forms](../modeling/forms/README.md) to standalone tasks. Users are also able to claim tasks that require human input and view and manage their workload in a dashboard.

{% include media.html image="../workspace-elements.png" caption="Process Workspace section view" %}

To deploy an instance of the Process Workspace with an application, a [user interface definition](../modeling/interfaces.md) with the template `process` selected needs to be included in the project definition.

The URL to access it will be in the format: `gateway.{domain-name}/{application-name}/{ui-name}`.

To access the Process Workspace users require the `ACTIVITI_USER` role and to have been given user access to the application.

## About

The about page can be accessed via the UI or at the URL: `gateway.{domain-name}/{application-name}/{ui-name}/about` and shows the packages and package versions used in the application.

## Settings

You can view the application configuration of the Process Workspace by visiting the URL: `gateway.{domain-name}/{application-name}/{ui-name}/app.config.json`.
