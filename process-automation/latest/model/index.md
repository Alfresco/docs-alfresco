---
title: Modeling overview
---

Modeling is used to create the templates for automating content-based business processes.

## Modeling Application

The Modeling Application is where all models are created and edited. They are stored in projects that can be [deployed by the Admin Application]({% link process-automation/latest/admin/release.md %}#deployment) when the templates are complete.

The Modeling Application is accessed using the `/modeling` URL, for example `https://alfresco.com/modeling`.

## Models

Models are the components that make up a [project]({% link process-automation/latest/model/projects.md %}). The types of model available to use within a project are:

* [Processes]({% link process-automation/latest/model/processes/index.md %}) are the collection of components that are used to build and represent business processes using [BPMN 2.0 specification](https://www.omg.org/spec/BPMN/2.0/){:target="_blank"}.
* [Forms]({% link process-automation/latest/model/forms.md %}) are used to capture data into specially designed field types such as text, date, file uploads and multiple choice radio buttons. They are filled in by users of an application.
* [Authentications]({% link process-automation/latest/model/authentication.md %}) are used when your system requires access to external REST services.
* [Connectors]({% link process-automation/latest/model/connectors/index.md %}) are used to handle interactions with external systems as part of a process. This includes actions such as retrieving, generating, updating and storing content in the Content Services repository, sending emails and utilizing services such as AWS Comprehend, Textract, Rekognition and Lambda functions.
* [Decision tables]({% link process-automation/latest/model/decisions.md %}) are used to manage business decisions within process workflows.
* [User interfaces]({% link process-automation/latest/model/interfaces.md %}) set the end user interface for users to interact with content, tasks and processes for the project.
* [Files]({% link process-automation/latest/model/files.md %}) are a collection of files that can be used within the application. A file can be an image or a script.
* [Scripts]({% link process-automation/latest/model/scripts.md %}) are used to execute a custom script as part of a process
* [Triggers]({% link process-automation/latest/model/triggers.md %}) are used to define a set of event criteria. When the event criteria specified in the trigger is met, the event is published and an action containing a payload is kicked off.
* [Content models]({% link process-automation/latest/model/content-models.md %}) describe how data should be stored in the repository and the metadata that can be associated to the content and folders within that model.
* [Data models]({% link process-automation/latest/model/data-models.md %}) allow you to describe objects your application is handling. You can define the standard data structure you will use in your application using JSON schema.
