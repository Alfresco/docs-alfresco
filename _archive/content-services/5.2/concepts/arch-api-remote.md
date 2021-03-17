---
author: Alfresco Documentation
---

# Remote APIs

The Remote API is primarily used to build ECM solutions against the content application server.

There are three main remote APIs:

1.  Alfresco Content Services API
2.  CMIS API
3.  Repository REST API \(Deprecated\)

The Alfresco Content Services API was introduced with version 4.x. It provides the main remote API, and is the recommended API for developing remote client applications to work across on-premise deployments. It comprises two sub-APIs, the Alfresco Content Services REST API for gaining access to Alfresco Content Services-specific functionality such as sites, and a standard CMIS API for repository manipulation and management. SDKs such as the Mobile SDK for Android and the Mobile SDK for iOS both use the services of the Alfresco Content Services API.

CMIS provides a standardized set of common services for working with content repositories. CMIS is not language-specific, it does not dictate how a repository works, and it does not seek to incorporate every feature of every repository. Alfresco Content Services provides an implementation of CMIS Web service and RESTful bindings, as well as a CMIS client API for use in Surf and other environments.

The Repository REST API provides access to the core repository functionality using a RESTful approach. This is useful where the developer does not want to, or have a need to, write custom web scripts, and is developing a client-side application. This API can be thought of as a ready-built collection of web scripts that can be called from any client capable of making REST requests and receiving the associated responses.

For more information about the APIs and their support status see the [API overview page](dev-api-overview.md).

**Parent topic:**[APIs](../concepts/api-about.md)

**Related information**  


[About CMIS](../pra/1/topics/cmis-welcome.md)

