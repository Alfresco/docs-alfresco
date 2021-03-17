---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, services access]
---

# Accessing Alfresco services

As well as model root objects, response templates have access to services provided by the Alfresco content application server, allowing a response template to directly query or navigate parts of the content repository or access the context within which the web script is executing, such as the currently authenticated user.

Although response templates can perform their own logic, this should not be encouraged. It is better to implement web script logic in controller scripts, allowing the response template to focus only on rendering the output. This allows the easy creation of multiple response templates, as logic does not have to be duplicated in each. It also means logic is encapsulated in one place, so changes to logic are centralized.

The Folder Listing web script first renders details about the Alfresco content application server:

`Alfresco ${server.edition} Edition v${server.version} : dir`

The `server` root object is a special object provided by the Web Script Framework, which represents the server within which the web script is executing. In this case, the response template simply accesses properties of the server.

There are many other root objects available to response templates.

**Parent topic:**[Creating a response template](../tasks/ws-respTemp-create.md)

**Related information**  


[Root objects](../references/api-ws-root.md)

