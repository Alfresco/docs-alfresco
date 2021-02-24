---
author: Alfresco Documentation
---

# CMIS bindings

Clients can communicate with a CMIS repository using one of three protocol bindings: AtomPub, SOAP Web Services, and in CMIS 1.1, the Browser binding, which is the recommended binding to use. CMIS repositories provide a service endpoint, or URL, for each of these bindings.

## AtomPub binding

This RESTful binding is based on the [Atom Publishing Protocol](https://tools.ietf.org/html/rfc5023). Clients communicate with the repository by requesting the service document, which is obtained through a well-known URI. In Alfresco, the service document is at:

```
http://<hostname>:<port>/alfresco/api/-default-/public/cmis/versions/1.1/atom
      
```

## Web service binding

This binding is based on the [SOAP protocol](http://www.w3.org/TR/soap/) All services and operations defined in the CMIS domain model specification are present in the Web Services binding. You can get a summary of the CMIS services from Alfresco from the following URL:

```
http://<hostname>:<port>/alfresco/cmis
      
```

## Browser binding \(Recommended\)

From version 1.1 of the specification, CMIS provides a simpler [JSON-based](http://tools.ietf.org/html/rfc4627) binding. The [browser binding](cmis-1.1-browser-binding.md) is designed for web applications, and is easy to use with HTML and JavaScript. It uses just two verbs, GET and POST, and resources are referenced using simple and predictable URLs. You can get a summary of the repository information from Alfresco from the following URL:

```
http://<hostname>:<port>/alfresco/api/-default-/public/cmis/versions/1.1/browser
      
```

All three bindings are described fully in the [CMIS 1.1 specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html).

**Parent topic:**[CMIS basics](../../../pra/1/concepts/cmis-basics.md)

