---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [JavaScript, API/Script]
keyword: [JavaScript API, Scripting API]
---

# Scripting API

The Alfresco JavaScript API provides a rich set of scriptable Java objects.Many root-scope objects are provided by default, such as access to the user home folder, company home folder, WCM web projects, search, People API, and logging functionality. You can also configure additional root-scope objects for use with your own scripts.

 

-   **[Root objects](../references/API-JS-rootscoped.md)**  
The JavaScript API provides a number of root objects which are available from your JavaScript code.
-   **[ScriptNode Object API](../references/API-JS-ScriptNode.md)**  
In JavaScript code various parts of the underlying system can be conveniently exposed as objects of type `ScriptNode`. For example, the `companyhome`, `userhome`, `document`, `space`, and `person` objects are best represented as objects of type `ScriptNode`. The ScriptNode API provides access to properties and methods for manipulating this type of object.
-   **[Search API](../references/API-JS-Search.md)**  
The Search API provides direct access to repository level search results and Saved Search results through the `search` root scope object.
-   **[People API](../references/API-JS-People.md)**  
The People API provides access to Alfresco people and groups.
-   **[Actions API](../references/API-JS-Actions.md)**  
The Actions API provides a root level `actions` object that allows invocation of Alfresco actions registered with the repository.
-   **[ScriptAction API](../references/API-JS-ScriptAction.md)**  
A ScriptAction represents an Alfresco action registered within the repository.
-   **[Logging API](../references/API-JS-Logging.md)**  
A root level `logger` object provides the following methods to help debug scripts.
-   **[Session API](../references/API-JS-Session.md)**  
A root level `session` object is provided to access the current logged in user session ticket as a string value.
-   **[Classification API](../references/API-JS-Classification.md)**  
The Classification API has two parts: manipulating classifications, and manipulating the categories they contain.
-   **[AVM API](../references/API-JS-AVM.md)**  
The Alfresco Versioning Machine \(AVM\) API provides access to Web Content Management \(WCM\) stores and their associated file and folder nodes. A WCM project is divided into "stores" such as the staging store and various user sandbox stores and the child nodes of these stores.
-   **[WCM Web Projects](../references/API-JS-WCM-Web-Projects.md)**  
A root level `webprojects` object provides script access to WCM functionality.
-   **[Utility methods](../references/API-JS-Utility.md)**  
A root level `utils` object is provided as a library of helper methods that are missing from generic JavaScript.

**Parent topic:**[Alfresco Repository JavaScript API](../concepts/API-JS-intro.md)

