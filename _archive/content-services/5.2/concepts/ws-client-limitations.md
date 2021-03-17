---
author: Alfresco Documentation
---

# Working with client limitations

Not all HTTP clients are equivalent in their capabilities. Many clients have limitations that mean certain HTTP features are not supported. Rather than dismiss those clients and reduce the scope of where web scripts can be invoked, the Web Script Framework provides helpers for working around those limitations.

These helpers include:

-   Tunneling HTTP methods
-   Forcing a successful HTTP response
-   Using JSON callbacks

-   **[Tunneling HTTP methods](../concepts/ws-tunneling-http-methods.md)**  
Not all clients can issue all HTTP methods. In the most severe case, a client might be restricted to GET and POST only. In this situation, the Web Script Framework provides a mechanism for tunneling any HTTP method through a POST method. This is achieved by setting an override header named `X-HTTP-Method-Override` on the HTTP request whose value is the method name to invoke.
-   **[Forcing success response status](../concepts/ws-forcing-success.md)**  
Not all clients can gracefully handle non-success HTTP response codes, such as the Adobe Flash runtime player, which is the runtime for Adobe Flex applications.
-   **[JSON callbacks](../concepts/ws-json-callbacks.md)**  
Web scripts that provide JSON responses are often invoked directly from within a web browser by using the `XMLHttpRequest` object. This is a technique popularly known as AJAX. For security reasons, solutions like these can run into cross-domain issues, a restriction that requires you to proxy your requests on the server side. Typically, to work around these issues, public services, such as Yahoo! JSON Services, provide a callback mechanism.

**Parent topic:**[Repository-tier web scripts](../concepts/ws-overview.md)

