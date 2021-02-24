---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, authenticate, user identity]
---

# Custom client authentication

HTTP Basic authentication is a method designed to allow a web browser or other client program to provide credentials in the form of a user name and password when making an HTTP request.

If you are using the Alfresco checked-out documents web script as a JSR-168 portlet configured into your portal, when you launch the portal the portal itself asks you to log in. The web script needs to know who is authenticated, so the Web Script Framework communicates with the portal to determine the currently authenticated user. When the web script is rendered in the portal page, the web script is invoked as the portal user.

Behind the scenes, the Web Script Framework chooses the most appropriate option for specifying the user identity, either HTTP Basic authentication, ticket, or guest when invoking the web script. The same mechanism is used for Alfresco Share.

**Parent topic:**[Authenticating web scripts](../concepts/ws-authenticating.md)

