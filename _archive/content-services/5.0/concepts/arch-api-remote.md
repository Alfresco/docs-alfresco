---
author: Alfresco Documentation
---

# Remote APIs

The Remote API is primarily used to build ECM solutions against the Alfresco content application server.

There are three main remote APIs:

1.  Alfresco One API
2.  Repository REST API
3.  CMIS API

The Alfresco One API was introduced with Alfresco 4.x, and was present in the public cloud version of Alfresco. It provides the main remote API, and is the recommended API for developing remote client applications to work across cloud, on-premise and hybrid deployments of Alfresco. It comprises two sub-APIs, the Alfresco One REST API for gaining access to Alfresco-specific functionality such as Sites, and a standard CMIS API for repository manipulation and management. Alfresco SDKs such as the Mobile SDK for Android and the Mobile SDK for iOS both use the services of the Alfresco One API.

The Repository REST API provides a RESTful interface to the repository for client applications. If you have an HTTP client you can communicate with Alfresco. It is also easy to use with AJAX-oriented web clients. Alfresco Share remotely communicates with the Alfresco content application server exclusively through the Repository REST API. The Repository REST API is implemented via web scripts.

CMIS provides a standardized set of common services for working with content repositories. CMIS is not language-specific, it does not dictate how a content repository works, and it does not seek to incorporate every feature of every content repository. Alfresco provides an implementation of CMIS Web service and RESTful bindings, as well as a CMIS client API for use in Alfresco Surf and other environments.

**Parent topic:**[APIs](../concepts/api-about.md)

**Related information**  


[About CMIS](../pra/1/topics/cmis-welcome.md)

