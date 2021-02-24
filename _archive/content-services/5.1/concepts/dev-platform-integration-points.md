---
author: Alfresco Documentation
---

# Platform integration points

The Alfresco platform features a number of integration points that can be used to integrate web clients, desktop clients, enterprise services, and applications with Alfresco.

The following table lists platform integration points and links to relevant documentation.

|Integration point|Description|
|-----------------|-----------|
|[REST Clients](../references/dev-integration-points-rest-clients.md)|Most of the remote integrations will use the [REST API](../pra/1/topics/pra-welcome.md). By using the REST API the client code can be written in any language that can make HTTP calls and that can process XML or JSON.|
|[Java Clients](../references/dev-integration-points-java-clients.md)|If the remote client is written in Java, then it might make sense to wrap the REST API in a Java library for convenience and easier usage. The Apache Chemistry [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java library can be used for most operations, except to manage Alfresco specific content such as sites, tags, and ratings.|
|[Aikau Clients](../references/dev-integration-points-aikau-clients.md)|If you are looking at the out-of-the-box Alfresco Share web client, and there are too many changes needed to turn it into the web client that you want, then you can build a new content management UI with the [Aikau](https://github.com/Alfresco/Aikau) framework and content widgets.|

-   **[REST Clients](../references/dev-integration-points-rest-clients.md)**  
A REST Client talks to Alfresco over HTTP and sends and receives information as JSON or XML.
-   **[Java Clients](../references/dev-integration-points-java-clients.md)**  
A Java Client talks to Alfresco remotely with Java code using a library such as OpenCMIS.
-   **[Aikau Clients](../references/dev-integration-points-aikau-clients.md)**  
An Aikau Client uses ready made content widgets to display content from the Alfresco Repository.

**Parent topic:**[Platform integrations](../concepts/dev-platform-integrations.md)

