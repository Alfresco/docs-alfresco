---
author: Alfresco Documentation
---

# Invoking web scripts

A common client for invoking web scripts is a web browser, as many content rich applications are web applications. The web browser also provides an easy and convenient client for testing web scripts while developing them.

However, the web browser is not the exclusive client from which to invoke a web script. Any client capable of sending HTTP requests and receiving HTTP responses can be used. A good example is the cURL client that has full support for the HTTP protocol and is often used for testing the various capabilities of web scripts.

Although a client can use HTTP directly to invoke web scripts, the Web Script Framework also provides many helpers for invoking web scripts from environments that do not know HTTP. This allows the invocation of a web script using a mechanism that is natural to the calling environment and to the developer who knows the calling environment.

For example, helpers are provided that allow the following clients to naturally invoke web scripts:

-   **Surf** allows the invocation of a web script as if it were a Surf component, for example to create a Share dashlet
-   **JSR-168 portal** allows the invocation of a web script as if it were a JSR-168 portlet
-   **JSF page** allows the invocation of a web script as if it were a tag library

A carefully developed web script can be used from multiple environments without the need to change its implementation. For example, a web script for displaying your Alfresco Content Services checked-out documents can be used standalone directly in a web browser, as a portlet in a JSR-168 portal, or as a dashlet in Alfresco Share.

**Parent topic:**[Repository-tier web scripts](../concepts/ws-overview.md)

