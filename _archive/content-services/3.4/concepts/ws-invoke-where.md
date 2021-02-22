---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, invoke]
---

# Invoking web scripts

A common client for invoking web scripts is a web browser, as many content rich applications are web applications. The web browser also provides an easy and convenient client for testing web scripts while developing them.

However, the web browser is not the exclusive client from which to invoke a web script. Any client capable of sending HTTP requests and receiving HTTP responses may be used. A good example is the cURL client that has full support for the HTTP protocol and is often used for testing the various capabilities of web scripts.

Although a client may use HTTP directly to invoke web scripts, the Web Script Framework also provides many helpers for invoking web scripts from environments that do not know HTTP. This allows the invocation of a web script using a mechanism that is natural to the calling environment and to the developer who knows the calling environment.

For example, helpers are provided that allow the following clients to naturally invoke web scripts:

-   **Alfresco Surf** allows the invocation of a web script as if it were a Surf component, for example to create a Share dashlet
-   **JSR-168 portal** allows the invocation of a web script as if it were a JSR-168 portlet
-   **JSF page** allows the invocation of a web script as if it were a tag library

A carefully developed web script may be used from multiple environments without the need to change its implementation. For example, a web script for displaying your Alfresco checked-out documents may be used standalone directly in a web browser, as a portlet in a JSR-168 portal, or as a dashlet in Alfresco Share.

-   **[Invoking a web script using cURL](../tasks/ws-curl.md)**  
When exploring or developing web scripts, a web browser can be limiting as a client. For example, it cannot perform any HTTP method other than GET without coding. You can use an alternative client called cURL \(http://curl.haxx.se/\), a command line tool that supports common protocols such as FTP and HTTP. cURL is a valuable web script debugging and testing tool.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

