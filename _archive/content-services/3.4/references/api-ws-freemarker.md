---
author: [Alfresco Documentation, Alfresco Documentation]
source: Community web scripts
audience: 
category: [API/Script, Web Script]
keyword: [response template, freemarker]
---

# FreeMarker methods

The FreeMarker template language supports the notion of a method, which encapsulates an action to perform on a set of input parameters and may return an output value.

Although FreeMarker provides many methods of its own, it also allows the registration of custom methods. The Web Script Framework provides the following methods specifically for developers of web script response templates.

-   **`absurl(url)`**

    Returns an absolute URL representation of the passed URL. Useful when rendering links within Atom \(and similar formats\).


-   **`xmldate(date)`**

    Returns an ISO8601-formatted result of the passed date. Useful when rendering dates within XML.

-   **`scripturl(queryString)`**

    Returns a URL that references this web script. The passed `queryString` is added to the URL. System arguments such as `guest` and `format` are automatically added. This method is particularly useful for protection against the runtime environment within which the web script is executing. In some environments, such as a Portal, the URL may be encoded.


-   **`clienturlfunction(funcName)`**

    Generates a client-side JavaScript function that can generate a URL back to this web script.


-   **`argreplace(argString, argName, argValue, ...)`**

    Replaces the specified `argName` with `argValue` or adds `argName` if it does not exist in `argString`.


-   **`encodeuri(uriString)`**

    Encodes the string into URL-safe form.


**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

