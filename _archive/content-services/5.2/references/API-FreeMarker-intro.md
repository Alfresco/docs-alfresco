---
author: Alfresco Documentation
---

# FreeMarker API

FreeMarker templates can be used to generate the view component of the Model-View-Controller \(MVC\) pattern.

The Repository FreeMarker Template API lets you render output using the FreeMarker template engine. This is the full list of public APIs that compose the Repository FreeMarker Template API.

**Important:** Objects that are available to scripts running in the repository context are explained here. They are not available to scripts running in the Alfresco Share context.

-   **[Template usage](../concepts/API-FreeMarker-arch.md)**  
Templates are used widely in Alfresco Content Services to render the view of a MVC pattern.
-   **[Template files](../concepts/API-FreeMarker-tfiles.md)**  
Template files can be stored on the classpath or within the repository store.
-   **[Template models](../concepts/API-FreeMarker-models.md)**  
Template models provide data which can be used by the template to generate an output view.
-   **[Default model objects](../references/API-FreeMarker-defaultmodel.md)**  
The default model provides a number of common objects useful for most templates. These are generally known as root objects.
-   **[Default model methods](../references/API-FreeMarker-defaultmodelmethods.md)**  
Custom template methods can be added to the FreeMarker language for use on template pages. The default model provides the following methods:
-   **[TemplateNode API](../references/API-FreeMarker-TemplateNode.md)**  
`TemplateNode` objects and any subsequent child node objects provide access to the common Alfresco Content Services concepts, such as properties, aspects, and associations. The following template API is provided. `TemplateNode` extends `BasePermissionsNode`.
-   **[Classification API](../references/API-FreeMarker-Classification.md)**  
The `classification` object provides read access to classifications and root categories.
-   **[Current Date](../references/API-FreeMarker-CurrentDate.md)**  
The date object returns the current date.
-   **[JSP Page](../concepts/API-FreeMarker-JSPpage.md)**  
Custom JSP pages can be written to render templates.
-   **[People API](../references/API-FreeMarker-People.md)**  
The People API provides basic user and group query and inspection capabilities.
-   **[VersionHistoryNode API](../references/API-FreeMarker-VersionHistoryNode.md)**  
The `VersionHistoryNode` is an extension of the `BaseContentNode` type. The `versionHistory` property of the `TemplateNode` object returns a sequence of `VersionHistoryNode` objects that represent the version history for the document.
-   **[Workflow API](../references/API-FreeMarker-Workflow.md)**  
The `workflow` root object provides read access to the in-progress and finished tasks for the current user. It also provides a function to look up a single task by its task ID. The functions described mostly return `WorkflowTaskItem` objects.

**Parent topic:**[API Reference](../concepts/dev-reference-guide.md)

