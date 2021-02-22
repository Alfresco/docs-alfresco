---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, URI]
---

# Parsing the web script URI

A web script is invoked when a URI is requested that matches one of the URI templates defined by the web script. The web script may need to access the requested URI to allow it to extract arguments that may have been passed in as URI query parameters or embedded as values in the URI path.

Your Folder Listing web script defines the following URI template with one URI-path token and one query parameter token: `<uri>/dir/{folderpath}?verbose={verbose?}</uri>`

To extract the values provided for the `{folderpath}` and `{verbose}` tokens, your Folder Listing controller script uses the following JavaScript:

```
...
var verbose = (args.verbose == "true" ? true : false);
var folderpath
...
```

The `args` root object is a special object provided by the Web Script Framework to all controller scripts. It represents a map of the URI query-parameter values indexed by their name. In this case, the controller script is extracting the `verbose` query parameter. If the query parameter is not specified on the URI, the returned value is null.

The `url.templateArgs` root object is another special object provided by the Web Script Framework. It represents a map of all values provided for tokens in the URI path, indexed by token name. In this case, the controller script is extracting the value for the `folderpath` token. URI-path values are never null.

Imagine a client has made the following URI request: `/dir/Company%20Home?verbose=true`

The resulting value of `verbose` is true and the value of `folderpath` is `Company Home`.

**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

