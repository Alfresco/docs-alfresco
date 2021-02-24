---
author: Alfresco Documentation
---

# Getting the service document

The capabilities available to your application from an instance of on-premise Alfresco or the Alfresco Cloud are described in a an AtomPub document returned when calling the base URL. The service document contains information on the repository, the CMIS methods that can be called on it, and the parameters for those methods.

## Getting the service document for an on-premise repository

To retrieve the service document use the HTTP GET method with this URL:

```

   https://localhost:8080/alfresco/api/cmis/versions/1.1/atom/
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way.

## Getting the service document for all networks

To retrieve the service document for the current authenticated user's networks in the Alfresco cloud, use the HTTP GET method with this URL:

```

   https://api.alfresco.com/cmis/versions/1.1/atom/
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way.

## Getting the service document for a specific network

To retrieve the service document for a specific network that the current authenticated user is a member of, use the HTTP GET method with a URL that specifies the network. For example this URL returns the service document for the `yourcompany.com` network.

```

   https://api.alfresco.com/yourcompany.com/public/cmis/versions/1.1/atom
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way. See the [CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html) for more details.

**Parent topic:**[Getting Started](../../../pra/1/concepts/cmis-getting-started.md)

