---
author: Alfresco Documentation
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

## JSR-168 Authenticator

JSR-168 Authenticator only works if running on the repo tier, and it does not work for web scripts running in the Share tier. Surf has support for JSR-168 portlets built-in.

-   **[Custom client authentication](../concepts/ws-custom-client-authentication.md)**  
HTTP Basic authentication is a method designed to allow a web browser or other client program to provide credentials in the form of a user name and password when making an HTTP request.

**Parent topic:**[Web Scripts](../concepts/ws-architecture.md)

**Related information**  


[Creating a Hello World web script](../tasks/ws-hello-world-create.md)

[Specifying user identity: HTTP Authentication, Tickets, Guest](../tasks/ws-specify-user-identity.md)

[Web script description markup for authentication](../references/api-wsdl-authentication.md)

