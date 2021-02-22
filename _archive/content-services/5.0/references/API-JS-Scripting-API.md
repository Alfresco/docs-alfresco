---
author: Alfresco Documentation
---

# Scripting API

The Alfresco JavaScript API provides a rich set of scriptable Java objects.

Many root-scope objects are provided by default, such as access to the user home folder, company home folder, search, People API, and logging functionality. You can also configure additional root-scope objects for use with your own scripts.

-   **[ScriptNode API](../references/API-JS-ScriptNode.md)**  
In JavaScript code various parts of the underlying system can be conveniently exposed as objects of type `ScriptNode`. For example, the `companyhome`, `userhome`, `document`, `space`, and `person` objects are best represented as objects of type `ScriptNode`. The ScriptNode API provides access to properties and methods for manipulating this type of object.
-   **[Actions API](../references/API-JS-Actions.md)**  
The actions API provides a root level `actions` object that allows invocation of Alfresco actions registered with the repository.
-   **[Classification API](../references/API-JS-Classification.md)**  
The Classification API has two parts: manipulating classifications, and manipulating the categories they contain.
-   **[Logging API](../references/API-JS-Logging.md)**  
A root level `logger` object provides a number of methods to help debug scripts.
-   **[People API](../references/API-JS-People.md)**  
The People API provides access to Alfresco people and groups.
-   **[ScriptAction API](../references/API-JS-ScriptAction.md)**  
A ScriptAction represents an Alfresco action registered within the repository.
-   **[Search API](../references/API-JS-Search.md)**  
The Search API provides direct access to repository level search results and Saved Search results through the `search` root scope object.
-   **[Session API](../references/API-JS-Session.md)**  
A root level `session` object is provided to access the servelt web session.
-   **[SessionTicket API](../references/API-JS-SessionTicket.md)**  
A root level `sessionticket` object is provided to access the current logged in user session ticket as a string value.
-   **[Utility methods](../references/API-JS-Utility.md)**  
A root level `utils` object is provided as a library of helper methods that are missing from generic JavaScript.

**Parent topic:**[Alfresco Repository JavaScript API reference](../concepts/API-JS-intro.md)

