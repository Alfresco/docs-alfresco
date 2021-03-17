---
author: Alfresco Documentation
---

# Web script description language reference

Web script description language XML reference and description of advanced options.

This section of the documentation describes the web script description language.

-   **[webscript](../references/api-wsdl-webscript.md)**  
The `webscript` element in a web descriptor file provides the root XML element. The `webscript` element is required.
-   **[shortname](../references/api-wsdl-shortname.md)**  
The `shortname` element in a web descriptor file provides a human readable name for the web script. The `shortname` element is required.
-   **[description](../references/api-wsdl-description.md)**  
The `description` element in a web descriptor file provides documentation for the web script. The `description` element is optional.
-   **[url](../references/api-wsdl-url.md)**  
The `url` element represents a URI template to which the web script is bound. Variants of the URI template which specify a format do not need to be registered, however, specifying them is useful for documentation purposes. There must be at least one `url` element, but there can be several.
-   **[format](../references/api-wsdl-format.md)**  
The `format` element controls how the content-type of the response can be specified via the URI. The `format` element is optional.
-   **[authentication](../references/api-wsdl-authentication.md)**  
The `authentication` element specifies the level of authentication required to run the web script. The `authentication` element is optional.
-   **[transaction](../references/api-wsdl-transaction.md)**  
The `transaction` element specifies the transaction level required to run the web script. The `transaction` element is optional.
-   **[family](../references/api-wsdl-family.md)**  
The `family` element allows a web script developer to categorize their web scripts. Any value may be assigned to family and any number of families may be assigned to the web script, providing a freeform tagging mechanism. The web script index provides views for navigating web scripts by family. The family tag can be repeated if the script belongs to multiple families. The `family` element is optional.
-   **[cache](../references/api-wsdl-cache.md)**  
The `cache` element specifies the required caching level. The `cache` element is optional.
-   **[negotiate](../references/api-wsdl-negotiate.md)**  
The `negotiate` element associates an Accept header MIME type to a specific web script format of response. The mandatory value specifies the format while the mandatory attribute, `accept`, specifies the MIME type. Content Negotiation is enabled with the definition of at least on `negotiate` element. The `negotiate` element can be specified zero or more times.
-   **[lifecycle](../references/api-wsdl-lifecycle.md)**  
The `lifecycle` element allows a web script developer to indicate the development status of a web script. Typically, web scripts start out in a draft state while being developed or tested, are promoted to production quality for widespread use, and finally retired at the end of their life. The `lifecycle` element is optional.
-   **[formdata](../references/api-wsdl-formdata.md)**  
The `formdata` element ... The `formdata` element is optional.
-   **[args](../references/api-wsdl-args.md)**  
The `args` element represents a list of arguments passed to the web script. This are listed for documentation purposes. The `args` element is optional.
-   **[responses](../references/api-wsdl-responses.md)**  
The `responses` element represents a collection of response types for the web script. The `responses` element is optional.
-   **[requests](../references/api-wsdl-requests.md)**  
The `requests` element represents a collection of request types for the web script. The `requests` element is optional.

**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

