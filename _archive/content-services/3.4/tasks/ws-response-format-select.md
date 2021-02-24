---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, response format]
---

# Selecting a response format

There are several ways for a client to explicitly select a response format: URL extension, URL query parameter, and Accept header.

The URL extension approach simply requires the URL to end with the format of the response to select, such as `<webscript url>.<format>`.

Sometimes, a web script URL can not support the format extension approach as the URL may naturally end with an extension anyway. For example, web script URL paths that refer to folder and file names in the content repository already have the extension inherited from the file name. For these scenarios, it is possible to explicitly select the response format via the URL query parameter, such as `<webscript url>?format=<format>`.

Each format actually maps to a MIME type, which is set on the HTTP response allowing a client to process or render the response appropriately. The Web Script Framework provides a registry of formats where the commonly used MIME types are mapped as follows:

-   html =\> text/html
-   text =\> text/plain
-   xml =\> text/xml
-   atom =\> application/atom+xml
-   rss =\> application/rss+xml
-   json =\> application/json

Another approach to selecting a response format is to use the HTTP Accept header, as defined by RFC 2616 section 14. A client uses an Accept header to specify a prioritized list of preferred MIME types for the response. When the Web Script Framework accepts an HTTP request with an Accept header, it responds with the response format that most closely matches the highest priority preference.

**Note:** RFC 2616 \([http://www.ietf.org/rfc/rfc2616.txt](http://www.ietf.org/rfc/rfc2616.txt)\) is the specification for the Hypertext Transfer Protocol – HTTP/1.1.

Web browsers typically provide an Accept header on all their HTTP requests, but most HTTP clients offer some way of specifying an Accept header.

If a client does not explicitly request a specific response format, the web script uses its predefined default response format.

Refer to the following instructions to explicitly select a response format. Each option uses the Hello User sample web script.

-   To use the URL extension approach, type one of the following statements in your command line to explicitly select either HTML or JSON:

    -   `curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser.json"`
    -   `curl –uadmin:admin "http://localhost:8080/alfresco/service/hellouser.html"`
-   To explicitly select the response format for the Hello User web script using the URL query parameter, type one of the following statements in your command line:

    -   `curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser?format=json"`
    -   `curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser?format=html"`
-   To use an Accept header when invoking the Hello User web script to select the response format, type the following in your command line:

    -   `curl -uadmin:admin -H "Accept: text/html" "http://localhost:8080/alfresco/service/hellouser"`

**Parent topic:**[Creating a Hello User web script with authentication](../tasks/ws-hello-user-create.md)

**Related information**  


[Creating a hello user web script with authentication](ws-hello-user-create.md)

