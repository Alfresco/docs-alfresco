---
author: Alfresco Documentation
---

# JSON callbacks

Web scripts that provide JSON responses are often invoked directly from within a web browser by using the `XMLHttpRequest` object. This is a technique popularly known as AJAX. For security reasons, solutions like these can run into cross-domain issues, a restriction that requires you to proxy your requests on the server side. Typically, to work around these issues, public services, such as Yahoo! JSON Services, provide a callback mechanism.

**Note:** A full description of the JSON callback mechanism can be found at [http://developer.yahoo.com/javascript/json.html\#callbackparam](http://developer.yahoo.com/javascript/json.html#callbackparam) on the Yahoo! Developer Network.

Web scripts also provide this mechanism, which wraps the JSON response text in parentheses and a function name of your choosing. A callback is invoked by adding the following URL query parameter to the web script request:

-   `alf_callback=<function>`

The `function` parameter specifies the name of a client-side JavaScript function to invoke.

**Parent topic:**[Working with client limitations](../concepts/ws-client-limitations.md)

