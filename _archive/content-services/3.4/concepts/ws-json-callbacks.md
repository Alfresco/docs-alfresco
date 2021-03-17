---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
option: [web script, JSON callback]
---

# JSON callbacks

Web scripts that provide JSON responses are often invoked directly from within a web browser via the `XMLHttpRequest` object. This is a technique popularly known as AJAX. For security reasons, solutions like these may run into cross-domain issues, a restriction that requires you to proxy your requests on the server side. Typically, to work around these issues, public services, such as Yahoo! JSON Services, provide a callback mechanism.

**Note:** A full description of the JSON callback mechanism can be found at [﻿ Using JSON](https://developer.yahoo.com/javascript/json.html) on the Yahoo! Developer Network.

Web scripts also provide this mechanism, which wraps the JSON response text in parentheses and a function name of your choosing. A callback is invoked by adding the following URL query parameter to the web script request:

-   `alf_callback=<function>`

The `function` parameter specifies the name of a client-side JavaScript function to invoke.

-   **[Using the JSON callback](../tasks/ws-json-callbacks-using.md)**  
Creating a callback example simply involves creating an HTML page that invokes the Hello User web script with a callback that displays the JSON response in an alert box.
-   **[Understanding how the JSON callback works](../tasks/ws-json-callbacks-explain.md)**  
The easiest way to understand the callback example is to invoke the Hello User web script directly and interrogate the response.

**Parent topic:**[Working with client limitations](../concepts/ws-client-limitations.md)

