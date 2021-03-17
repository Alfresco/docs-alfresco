---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
option: [web script components, URI template]
---

# URI template

A URI template is a URI containing tokens that may be substituted with actual values. Tokens may represent values to query parameters or values within the URI path where the syntax for expressing a token is \{`<token name>`\}.

An example of specifying a URI with two query parameters — one named “a” and the other named “b” is: `/add?a={a}&amp;b={b}`

**Note:** The query parameter delimiter “&” must be expressed as '&amp;' in web script descriptor documents, as “&” has special meaning within XML.

A client can generate the URI for invoking this web script when given the URI template and values for a and b. For example, if a is set to 1. and b is set to 2, the resulting URI is:`/add?a=1&b=2`

Query parameter tokens can indicate that the parameter is optional through the convention of appending a ‘?’ to the token name. For example, to indicate that the query parameter ‘b’ is optional, the URI template becomes: `/add?a={a}&amp;b={b?}`

Although you may mark parameters as optional, it is only a convention and the Web Script Framework does not enforce mandatory query parameters. This responsibility is given to the web script developer. An example of specifying a URI path with embedded tokens — one named ‘user’ and the other named ‘profilekind’ is: `/user/{user}/profile/{profilekind}`

Any URI that matches the URI template will invoke the web script that defines it. A match is made when:

-   All static parts of the URI template match the URI
-   All tokens within the URI template have been given values by the URI

For example, the following URIs match:

`/user/joe/profile/public`

`/user/fred/profile/full`

But the following URIs do not match:

`/user/profile/public`

`/user/joe/profile`

The value of a token in a URI path may itself have multiple path segments. For example, the following URI specifies the user value `joe/smith` and matches the previous URI template: `/user/joe/smith/profile/public`

When a URI request is made, the Web Script Framework locates the associated web script by finding the closest matching URI template for the URI. For example, consider that two web scripts each define their own similar URIs:

-   Web script A defines the URI template:`/a/b`
-   Web script B defines the URI template: `/a/{z}`

The URI`/a/b` invokes web script A, while the URI `/a/c`invokes web script B. Matching of static parts of the URI template takes precedence over matching a token value. The same token name may appear multiple times in a single URI template. Although rare, it is worth knowing the implications on matching to a web script. Consider the following URI template where the ‘user’ token is specified twice: `/user/{user}/profile/{user}`

For a match to occur, the value provided for each same named token must be the same.

This URI matches: `/user/joe/profile/joe`

But this URI does not match: `/user/joe/profile/fred`

Web script developers have access to the value provided for each token in both the controller script and response template.

**Parent topic:**[Web Script Framework](../concepts/ws-framework.md)

