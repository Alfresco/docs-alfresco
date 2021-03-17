---
author: Alfresco Documentation
---

# Request URL format for Alfresco Cloud

Each request to Alfresco cloud is a URL with a specific format.

This is an example of a request URL

```

   https://api.alfresco.com/example.com/public/alfresco/versions/1/sites
```

Each request URL is made up of the following elements:-

1.  The protocol, which will always be `https`
2.  The hostname which will always be `api.alfresco.com`
3.  Your network id, which in this case is `yourcompany.com`
4.  The fixed path element `/public/`
5.  The API you want to call. You call the `workflow` API for methods acting on workflow entities such as Deployments, Process Definitions, Processes, and Tasks. You call the `alfresco` API for methods acting on all other entities. In this case it is the Alfresco REST API identified as `/public/alfresco`.
6.  `/versions/n`. This specifies the version of the API you are using. Currently `n` will always be `1`.
7.  The API method itself. In this case the request is for all instances of the entity type `sites`.

**Parent topic:**[Request URL format](../../../pra/1/concepts/pra-request-url-format.md)

