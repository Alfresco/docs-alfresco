---
author: Alfresco Documentation
---

# Developing Client Applications

This section of the documentation looks at building client applications for Alfresco.

There are two main APIs that can be used:

1.  Alfresco One API \(also known previously as the Alfresco Public API\)
2.  Repository REST API

**Note:** Developers are encouraged to use the Alfresco One API where possible, as it is the preferred approach to developing client applications.

-   **[Alfresco One API](../pra/1/topics/pra-welcome.md)**  
 The Alfresco One API lets you access content in an on-premise Alfresco repository, and in Alfresco cloud, from your own applications. The API is RESTful, which means each call is an HTTP request, so you don't even need a programming language to try it out. You can just type a URL address in a web browser. It consists of two parts, the standard CMIS API, which lets you manage and access content, and the new Alfresco One REST API which lets you manage Alfresco's additional features such as ratings and comments, that are not covered by the CMIS standard.
-   **[Alfresco Repository REST API reference](../references/RESTful-intro.md)**  
The Repository REST API lets your client application remotely communicate with the Alfresco content application server using HTTP-based resource-oriented interfaces. This is the full list of the publicly available web scripts that compose the RESTful API. The web scripts are organized by package.

**Parent topic:**[Developing](../concepts/dev-for-developers.md)

