---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, authenticate]
---

# Authenticating web scripts

You can invoke a web script without first authenticating, that is, without specifying a user name and password as identification. This is rare when interacting with the Alfresco content application server as access to or management of content in the content repository is usually restricted to particular people or groups of people.

To support restricted access, a web script can specify its authentication requirements. There are four levels of required authentication:

-   **None**

    The web script does not require any authentication to be invoked.


-   **Guest**

    The web script may be invoked by a guest user of the Alfresco content application server.


-   **User**

    The web script must be invoked by a named user known to the Alfresco content application server.


-   **Admin**

    The web script must be invoked by a named user who is an administrator of the Alfresco content application server.


An authenticated web script has access to all the services of the Alfresco content application server and thus can perform any operation, although it still adheres to the permissions of the authenticated user.

-   **[Specifying user identity](../tasks/ws-specify-user-identity.md)**  
There are several options for specifying the user with which to invoke a web script: HTTP Basic authentication, Alfresco Ticket, or as a Guest.
-   **[Custom client authentication](../concepts/ws-custom-client-authentication.md)**  
HTTP Basic authentication is a method designed to allow a web browser or other client program to provide credentials in the form of a user name and password when making an HTTP request.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

**Related information**  


[Creating a Hello World web script](../tasks/ws-hello-world-create.md)

