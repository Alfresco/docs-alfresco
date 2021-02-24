---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, Hello User]
---

# How Hello User works

The sample web script required user level authentication in its hellouser.get.desc.xml descriptor file. This indicated to the Web Script Framework that prior to invoking the web script, a user has to first log in.

By default, the Web Script Framework initiates the login process through HTTP Basic authentication, which informs the web browser to display a login box for the user to enter their user name and password. Upon successful authentication, which is performed by the Alfresco content application server, the web script is invoked. Otherwise, the process stops and the invocation of the web script fails.

Having found the hellouser.get.html.ftl response template, the Web Script Framework renders its result back to the web browser. The template, which is now running as an authenticated user, has access to special Alfresco content application server objects. In this case, the template renders the name of the authenticated user through the object `${person.properties.userName}`.

**Note:** HTTP Basic authentication is a method designed to allow a web browser or other client program to provide credentials in the form of a user name and password when making an HTTP request.

**Parent topic:**[Creating a Hello User web script with authentication](../tasks/ws-hello-user-create.md)

**Related information**  


[Creating a Hello User web script with authentication](../tasks/ws-hello-user-create.md)

