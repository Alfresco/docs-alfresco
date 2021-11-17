---
title: Files
---

Any type of file can be uploaded and used within a project. The file you upload will usually be an image or a script, and the script can contain a template for use within the modelling application.

## Properties

The basic properties of a file are:

| Property | Description |
| -------- | ----------- |
| File name | *Required.* The name of the file. Must be in lowercase and between 1 and 26 characters in length. Alphanumeric characters and hyphens are allowed, however the name must begin with a letter and end alphanumerically, for example `order-template`. |
| File description | *Optional.* A description of what the file should be used for, for example `A template for orders to follow`. |
| Private | *You must select either 'Private' or 'Public'*. Private files are only available within a Docker container and are specified using the `FILES_PATH` environment variable. For example, you could use the file as an email template. |
| Public | *You must select either 'Private' or 'Public'*. Public files can be used within a Docker container and are specified using the `FILES_PATH` environment variable and they can also be accessed using HTTP. For example, customizing the Digital Workspace logo. |

## Create a file

To create a file:

1. Sign into the Modeling Application and open a project.

2. Click the **NEW** dropdown.

3. The **Create > File** and **Upload > File** options both require a file to be uploaded into the Modeling Application. Alternatively use the **+** or **Upload** buttons next to **Files** in the left-hand menu.

4. Enter a name and optional description.

## File modeling

The **File Editor** only allows a file to be renamed or uploaded and the **Metadata** contains the properties related to the file, such as its mimetype.

Once a file has been uploaded and given a name, it can be used in a process definition as a [process variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type `file`. 

## Actions

The actions that can be run against a file are:

| Action | Description |
| ------ | ----------- |
| Download file | Download the file. |
| Validate | Run validation against the file. Any errors can be seen in the log history at the bottom of the Modeling Application and are flagged in a pop-up box. |
| Save | Save any changes made to the file. |
| Delete | Delete the file. |
