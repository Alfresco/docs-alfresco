---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
option: [web script, HTTP client]
---

# Tunneling HTTP methods

Not all clients can issue all HTTP methods. In the most severe case, a client may be restricted to GET and POST only. In this situation, the Web Script Framework provides a mechanism for tunneling any HTTP method through a POST method. This is achieved by setting an override header named `X-HTTP-Method-Override` on the HTTP request whose value is the method name to invoke.

For example, to invoke the Hello World web script through an HTTP POST but inform the Web Script Framework to really perform a GET, you would type the following in the command line:

-   `curl -d "" -H "X-HTTP-Method-Override:GET" http://localhost:8080/alfresco/s/hello`

**Note:** cURL’s `–d` parameter informs cURL to perform an HTTP POST. The complete cURL manual can be found at [http://curl.haxx.se/docs/manual.html](http://curl.haxx.se/docs/manual.html).

In really unfortunate circumstances, some clients do not even support HTTP headers; therefore, the Web Script Framework also supports a query parameter named `alf_method` for representing the method to override.

For the equivalent of the override header, but expressed as a query parameter, you would type the following in the command line:

-   `curl -d "" http://localhost:8080/alfresco/s/hello?alf_method=GET`

Tunneling HTTP methods is a last resort that should be used only when no other workaround is available. Each HTTP method has its own characteristics such as how it is cached, which HTTP clients and intermediaries expect. When tunneling these methods through HTTP POST, those expectations can no longer be met.

**Note:** If both the override header and query parameter are specified in the HTTP request, then the header takes precedence over the query parameter.

Method overrides are also supported when issuing HTTP GET requests through the `alf_method` query parameter. This is particularly useful for testing some non-GET methods via the web browser.

**Parent topic:**[Working with client limitations](../concepts/ws-client-limitations.md)

