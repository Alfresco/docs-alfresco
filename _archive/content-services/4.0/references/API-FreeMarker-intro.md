---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Development
option: repository FreeMarker template API
---

# Alfresco Repository FreeMarker Template reference

The Repository FreeMarker Template API lets you render output using the FreeMarker template engine. This is the full list of public APIs that compose the Repository FreeMarker Template API.

-   **[Template framework architecture](../concepts/API-FreeMarker-arch.md)**  
Templates are widespread throughout Alfresco: they are used within the repository core to generate emails and activities, in the Explorer client to build custom views, at the remote REST API layer, and also as the default rendering mechanism for the web script and Surf frameworks.
-   **[Template files](../concepts/API-FreeMarker-tfiles.md)**  

-   **[Template models](../concepts/API-FreeMarker-models.md)**  
A model consists of a number of objects or hierarchy of objects from which a template file retrieves values that can be used to dynamically generate the output. The model is like the API for the template page: it provides the objects from which properties and values can be accessed.
-   **[TemplateNode API](../references/API-FreeMarker-TemplateNode.md)**  
`TemplateNode` objects and any subsequent child node objects provide access to the common Alfresco concepts, such as properties, aspects, and associations. The following template API is provided. `TemplateNode` extends `BasePermissionsNode`.
-   **[VersionHistoryNode API](../references/API-FreeMarker-VersionHistoryNode.md)**  
The `VersionHistoryNode` is an extension of the `BaseContentNode` type. The `versionHistory` property of the `TemplateNode` object returns a sequence of `VersionHistoryNode` objects that represent the version history for the document.
-   **[Classification API](../references/API-FreeMarker-Classification.md)**  
The `classification` object provides read access to classifications and root categories.
-   **[Workflow API](../references/API-FreeMarker-Workflow.md)**  
The `workflow` root object provides read access to the in-progress and finished tasks for the current user. It also provides a function to look up a single task by its task ID. The functions described mostly return `WorkflowTaskItem` objects.
-   **[People API](../references/API-FreeMarker-People.md)**  

-   **[Default Model Methods](../references/API-FreeMarker-defaultmodelmethods.md)**  
Custom template methods can be added to the FreeMarker language for use on template pages. The default model provides the following methods:
-   **[Current Date](../references/API-FreeMarker-CurrentDate.md)**  
The date object returns the current date.
-   **[JSP Page](../concepts/API-FreeMarker-JSPpage.md)**  
Custom JSP pages can be written to render templates.

**Parent topic:**[Alfresco API Reference](../concepts/API-intro-4.md)

