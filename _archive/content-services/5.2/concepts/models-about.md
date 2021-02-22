---
author: Alfresco Documentation
---

# Programming models

A number of programming models are available for building an application using the content application server.

-   The simplest model for non-programmers is to use out-of-the-box components of the Alfresco Share application and the Rules and Actions model, a set of conditions and actions to take on content based on those conditions. You can define rules and actions using a wizard and perform actions such as converting content, moving content, or executing a simple JavaScript snippet.
-   Web scripts let you perform more sophisticated processing without complex programming. The Content Management Interoperability Services \(CMIS\) implementation was built using web scripts. By using JavaScript to build these data services, it is easy to create new services. To build new user interfaces or extensions to Share, you can also use web scripts by using a web templating language like FreeMarker. Most of Share was built using web scripts.
-   To use Java to build applications or extend Share, you can use the many tools associated with Java that were used to build the system. Surf, the web runtime framework, lets you extend Share and build web applications. Because Share was built using Surf, you can build your own extensions as a combination of Java programming and web scripts, or with Java alone. You can also use Java to access or even replace whole pieces of Alfresco Content Services, content application server, or Share by using the Spring platform. You can use the source code as an example for rewriting pieces and using Spring beans and configuration to extend or replace functionality in Alfresco Content Services.
-   To write applications that use Alfresco Content Services but are portable to other ECM systems, you can use Content Management Interoperability Services \(CMIS\), the OASIS standard for accessing content repositories.

**Parent topic:**[Alfresco Content Services architecture overview](../concepts/alfresco-arch-about.md)

