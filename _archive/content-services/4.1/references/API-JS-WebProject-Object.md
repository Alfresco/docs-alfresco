---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: WebProjects Object API API
---

# WebProjects Object API

The WCM `webprojects` object API returns `WebProject` objects that represent individual web projects.

## Properties

-   **`name`**

    The name of the web project

-   **`title`**

    The display name for the web project

-   **`description`**

    A description of the web project

-   **`isTemplate`**

    Determines if the web project is a template

-   **`webProjectRef`**

    A unique reference for the web project


-   **[getRoles](../references/API-JS-getRoles.md)**  
`getRoles()` gets the roles for a web project.
-   **[save](../references/API-JS-save.md)**  
`save()` updates a web project.
-   **[deleteWebProject](../references/API-JS-deleteWebProject.md)**  
`deleteWebProject()` deletes a web project and all contents.
-   **[addMembership](../references/API-JS-addMembership.md)**  
`addMembership(userName, role)` adds the specified user with the specified role to the web project.
-   **[removeMembership](../references/API-JS-removeMembership.md)**  
`removeMembership(userName)` removes the specified user from a web project.
-   **[listMembers](../references/API-JS-listMembers.md)**  
`listMembers()` lists the members of this project.
-   **[createSandbox](../references/API-JS-createSandbox.md)**  
`createSandbox(userName)` creates a user sandbox. It does nothing if the user already has a sandbox.

**Parent topic:**[WCM Web Projects](../references/API-JS-WCM-Web-Projects.md)

