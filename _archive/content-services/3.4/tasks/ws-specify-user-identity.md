---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, authenticate, user identity]
---

# Specifying user identity

There are several options for specifying the user with which to invoke a web script: HTTP Basic authentication, Alfresco Ticket, or as a Guest.

HTTP Basic authentication allows you to specify your user name and password within an HTTP request. A request to a web script can include the user name and password of the Alfresco user to authenticate as, meaning the client does not have to ask for them. The cURL client supports this feature.

You can specify an Alfresco Ticket instead of an explicit user name and password. A ticket represents a pre-authenticated user who has already performed the login process. Tickets can be programmatically established via the pre-built Login web script.

A final option enables you to specify that a web script be executed as an Alfresco guest. Guests are not named users, so do not need to log in; however, they may be restricted in what they can see or do in the Alfresco content repository.

Refer to the following instructions to specify user identity. Each option uses the Hello User sample web script.

-   For HTTP Basic authentication, type the following in your command line: curl –uadmin:admin "http://localhost:8080/alfresco/service/hellouser"

    This informs cURL to invoke the URL defined by your Hello User web script as the user admin, which returns Hello admin.

    When comparing this to invoking the Hello User web script through the web browser, you can see that the cURL client did not subsequently ask for the user name and password, whereas the web browser did.

    **Note:** Upon successful authentication, a client may remember that the current session is authenticated, thus requiring the authentication process to be initiated only once. For example, a user already logged in using the current web browser session won’t be asked to log in again.

-   To specify an Alfresco Ticket, type the following in your command line to log in: curl "http://localhost:8080/alfresco/service/api/login?u=admin&pw=admin"

    This informs cURL to invoke the URL defined by the Login web script, which returns XML similar to the following:

    ```
    <?xml version="1.0" encoding="URF-8"?>
    <ticket>TICKET_0a748bc2543f2b271dc4cb9955c11a042cad72cd</ticket>
    ```

    1.  With a ticket established, it is possible to invoke other web scripts with that ticket, indicating to the Web Script Framework to execute the web script as the user represented by the ticket. This is achieved by adding the following URL query parameter to the web script URL: `alf_ticket=<ticket>`

    2.  To execute the Hello User web script with a ticket, type the following in your command line, substituting the ticket with the value returned from your web script login: `curl "http://localhost:8080/alfresco/service/hellouser?alf_ticket=TICKET_0a748bc2543f2b271dc4cb9955c11a042cad72cd"`

-   For Guest invocation, add the following URL query parameter to the web script URL: guest=true

    Remember, guests can only invoke web scripts that require Guest authentication; they cannot invoke User or Admin required web scripts. To invoke the Hello User web script as guest, type the following in your command line: `curl "http://localhost:8080/alfresco/service/hellouser?guest=true"`

    You might expect this to respond with a polite greeting, but instead you will receive a 401 error message stating that the Hello User web script requires user authentication and a guest has attempted access.


**Parent topic:**[Authenticating web scripts](../concepts/ws-authenticating.md)

**Related information**  


[Creating a hello user web script with authentication](ws-hello-user-create.md)

