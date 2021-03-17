---
author: [Alfresco Documentation, Alfresco Documentation]
source: Community web scripts
audience: 
category: Web Scripts
option: [web script, root objects]
---

# Root objects

The following are some of the many root objects available to web scripts.

-   **`args`**

    A map of query parameter values indexed by query parameter name


-   **`argsM`**

    A map of multi-valued query parameters, where each key is an argument name and each value is an array containing all respective argument values, even if only one is supplied

-   **`headers`**

    A map of request header values indexed by header name


-   **`headersM`**

    A map of multi-valued request headers, where each key is a header name and each value is an array containing all respective header values, even if only one is supplied


-   **`url`**

    Provides access to the web script URI, or parts of the URI, that triggered the web script


-   **`guest`**

    A Boolean indicating if the web script is executing as a ‘‘Guest’’ user


-   **`webscript`**

    A description of the web script currently being executed


-   **`server`**

    A description of the web script container hosting the web script


-   **`date`**

    The date and time the web script was invoked


**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

