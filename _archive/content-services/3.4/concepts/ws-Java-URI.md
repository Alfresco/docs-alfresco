---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [java-backed web script, APi/Script, Folder Listing, uri]
---

# Parsing the URI

Your Folder Listing web script defines the following URI template with one URI-path token and one query parameter token: `<uri>/javadir/{folderpath}?verbose={verbose?}</uri>`

To extract the values provided for the `{folderpath}` and `{verbose}` tokens, the following Java code is used:

```
. . .
String verboseArg = req.getParameter("verbose");
Boolean verbose = Boolean.parseBoolean(verboseArg);
Map<String, String> templateArgs = req.getServiceMatch().getTemplateVars();
String folderPath = templateArgs.get("folderpath");
. . .
```

Access to the request that invoked the web script is through the `req` parameter of the `executeImpl()` method. This parameter encapsulates everything about the request, including its URI, query parameters, and header values. In particular, the `getParameter()` method of the request provides access to query parameters, which your web script uses to retrieve the value of the verbose flag. If the query parameter is not specified on the URI, the returned value is null.

Access to tokens specified in the URI path is also through the `req` parameter. A map of all URI-path token values indexed by token name is provided by `req.getServiceMatch().getTemplateVars()`. Your web script uses this map to retrieve the value of the folderpath token. URI-path token values are never null.

Imagine a client has made the following URI request: `/javadir/Company%20Home?verbose=true`

The resulting value of `verbose` is true and the value of `folderpath` is `Company Home`.

**Parent topic:**[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)

