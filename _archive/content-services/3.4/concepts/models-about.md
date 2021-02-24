---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Alfresco Share, Alfresco Share, Programming model]
keyword: Surf, Share
---

# Alfresco programming models

A number of programming models are available for building an application using the Alfresco content application server.

-   The simplest model for non-programmers is to use out-of-the-box components of the Alfresco Share application and the Rules and Actions model, a set of conditions and actions to take on content based on those conditions. You can define rules and actions using a wizard and perform actions such as converting content, moving content, or executing a simple JavaScript snippet.
-   Web scripts let you perform more sophisticated processing without complex programming. The Alfresco Content Management Interoperability Services \(CMIS\) implementation and Lotus Quickr integrations were built using web scripts. By using JavaScript to build these data services, it is easy to create new services in Alfresco. To build new user interfaces or extensions to Alfresco Share, you can also use web scripts by using a web templating language like FreeMarker. Most of Alfresco Share was built using web scripts.
-   To use Java to build applications or extend Alfresco Share, you can use the many tools associated with Java that were used to build the Alfresco system. Surf, the web runtime framework, lets you extend Alfresco Share and build web applications. Because Alfresco Share was built using Surf, you can build your own extensions as a combination of Java programming and web scripts, or with Java alone. You can also use Java to access or even replace whole pieces of Alfresco, content application server, or Alfresco Share by using the Spring platform. You can use the source code as an example for rewriting pieces and using Spring beans and configuration to extend or replace functionality in Alfresco.
-   To write applications that use Alfresco but are portable to other ECM systems, you can use Content Management Interoperability Services \(CMIS\), the OASIS standard for accessing content repositories.

**Parent topic:**[Overview](../concepts/system-about.md)

