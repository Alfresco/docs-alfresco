---
author: Alfresco Documentation
---

# Request URL format for Alfresco Cloud

Each request to Alfresco cloud is a URL with a specific format.

This is an example of a request URL for CMIS 1.1

```

   https://api.alfresco.com/yourcompany.com/public/cmis/versions/1.0/atom/content?id=a99ae2db-0e40-4fb6-bf67-3f331a358cfc
```

This is an example of a request URL for CMIS 1.0

```

   https://api.alfresco.com/yourcompany.com/public/cmis/versions/1.1/atom/content?id=a99ae2db-0e40-4fb6-bf67-3f331a358cfc
```

Each request URL is made up of the following elements:

1.  The protocol, which will always be `https`
2.  The hostname. This will always be `api.alfresco.com`.
3.  Your network id, for example `yourcompany.com`.
4.  The API you want to call. In this case it is the public Alfresco CMIS API identified as `/public/cmis`.
5.  `/versions/n`. This specifies the version of the CMIS API you are using. `1.1` or `1.0`.
6.  The CMIS binding. Alfresco supports the `atom` binding for the CMIS 1.0 protocol, and both the `atom` and `browser` bindings for the CMIS 1.1 protocol.
7.  The CMIS method itself. In this case the request is to get the content of a CMIS document with a specific ID.

**Parent topic:**[Request URL format](../../../pra/1/concepts/cmis-request-url-format.md)

