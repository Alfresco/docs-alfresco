---
title: Projects
--- 

Projects are the top level component of the business process being modeled. They contain all of the logic for the models that make up the business process such as forms, processes, content models and connectors.

## Create a project

To create a project:

1. Sign into the Modeling Application.

2. Click the **NEW** dropdown.

3. Select how to create the project:

    * **Create Project** creates a new, empty project.

    * **Upload Project** allows for uploading an existing project `.zip` into the Modeling Application.

4. Enter a **Project name** and optional **Project description** if **Create Project** was chosen.

## Properties

The properties for a project are:

| Property | Description |
| -------- | ----------- |
| Project name | *Required.* A unique name for a project. Project names must be in lowercase and between 1 and 26 characters in length. Alphanumeric characters and hyphens are allowed, however the name must begin with a letter and end alphanumerically, for example: `project-4-a` |
| Project description | *Optional.* A short description of what the project is for. |

Once a project has been created or uploaded into the Modeling Application, the following properties are displayed:

| Property | Description |
| -------- | ----------- |
| Created | Displays how long ago the project was created. |
| Created By | Displays which user created the project. |
| Version | Displays the current version of the project. |
| Options | A list of actions that can be made against the project: {::nomarkdown}<ul><li><b>Edit</b> allows the project name and description to be updated.</li><li><b>Delete</b> removes the project.</li><li><b>Download</b> bundles the project contents into a zipped folder to import it into a different environment.</li><li><b>Collaborators</b> is for managing the project permissions.</li><li><b>Release</b> creates a new version of the project.</li><li><b>View Releases</b> shows the metadata related to each release of the project.</li></ul>{:/} |

## Collaborators

By default users can only view the projects they have created. The **Collaborators** option allows user access to be managed for individual projects. A collaborator can do anything the creator can do except for deleting the project.

To add a collaborator to a project:

1. Select the **Collaborators** option against a project.
2. Search for the user to add as a collaborator and click **Add**.

## Release a project

Projects are version controlled through the release action. When a project is first created its version will be set to 0 and will increment by 1 every time it is released.

> **Note**: A project must have been released in order to deploy it. Version 0 of a project can't be deployed.

To release a project:

1. Save any changes to the project components.
2. Navigate to the project list page of the Modeling Application.
3. Select the **Release** action from the  **Options** column for the project.

Selecting the **View Releases** option for a project displays the version history for the project.

## Validate a project

Validation is run when any model within a project is saved. The **Validate** option is available to all model types and can be run on demand using the tick in the top toolbar. Project level validation will be run against all models in the project.

Any validation errors in a model will be displayed in the log at the bottom of the screen. Expand the log by clicking on the bottom tool bar to view log details.

## Folder structure

When you download a project, the extracted zip file will contain a folder for each model type within the project.  

The following is an example of an exploded zip file of a project called *holiday*:

```bash
/holiday/
	/connectors/
		emailConnector.json
	/decision-tables/
		auto-approve-extensions.json
		auto-approve.xml
	/files/
		approval-policy.bin
		approval-policy-extensions.json	
	/forms/
		approval-form.json
	/processes/
		approve-extensions.json
		approve.bpmn.xml
		request-extensions.json
		request.bpmn20.xml
	/scripts/
		update-calendar.bin
		update-calendar-extensions.json
    /triggers/
		approval-email.json
	/ui/
		process.json
    /content-models/
        holiday-model.xml
        holiday-model-extensions.json
	holiday.json

```

### Files

File definitions are created and stored for each model in a project:

* `<connector-name>.json` is the format that connector definitions are stored in.  
* `<decision-table-name>.xml` is the format that decision table definitions are stored in.
* `<decision-table-name>-extensions.json` is the format that decision table UIDs are stored in.
* `<file-name>.bin` is the binary format that uploaded files are stored as.
* `<file-name>-extensions.json` is the format that stores the metadata for the associated uploaded file.
* `<form-name>.json` is the format that form definitions are stored in.
* `<process-definition-name>.bpmn20.xml` is the format that process definitions are stored in.
* `<process-definition-name>-extensions.json` is the format that stores the properties for BPMN elements that are outside the scope of the BPMN standard.
* `<script-name>.bin` is the binary format that scripts are stored as.
* `<script-name>-extensions.json` is the format that stores the metadata and variables for a script.
* `<trigger-name>.json` is the format that triggers are stored in.
* `<ui-name>.json` is the format that UI definitions are stored in for content or process.
* `<content-model-name>.xml` is the format the content model is stored in.
* `<content-model>-extensions.json` is that format that stores the content model metadata.
* `<project-name>.json` is the project manifest that stores the name and version of a project.
