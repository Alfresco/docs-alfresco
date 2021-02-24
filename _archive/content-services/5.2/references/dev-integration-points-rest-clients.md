---
author: Alfresco Documentation
---

# REST Clients

A REST Client talks to Alfresco Content Services over HTTP and sends and receives information as JSON or XML.

|Information|REST Clients|
|-----------|------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Integration Architecture](../concepts/dev-platform-integration-arch.md)|
|Description|A REST client is any enterprise application, web client, desktop client, service etc. that wants to access repository content remotely over HTTP. The client can be written in any language that can make HTTP calls and process XML or JSON. So it is a very flexible integration point for bringing content management functionality into all existing applications in an enterprise. The main content management functionality for working with folders and files are provided by the [CMIS REST API](../pra/1/topics/cmis-welcome.md). When working with Alfresco Content Services-specific content such as tags, sites, and ratings the [REST API](../pra/1/topics/pra-welcome-aara.md) has to be used.

**Note**. If you are working in a remote client that is implemented in Java it make sense to use a Java lib that wraps the CMIS REST API. One such library is the Apache Chemistry [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java library.

|
|More Information|-   [Test Server and Resources](https://www.alfresco.com/cmis)

|
|Sample Code|CMIS REST: See [CMIS Getting started section](../pra/1/concepts/cmis-getting-started.md)Proprietary REST: See [Proprietary REST API Getting Started section](../pra/1/topics/pra-welcome-aara.md)

|

**Parent topic:**[Platform integration points](../concepts/dev-platform-integration-points.md)

