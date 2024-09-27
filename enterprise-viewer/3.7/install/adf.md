---
title: Integrate AEV with Alfresco Application Development Framework
---

AEV can also be integrated with an existing ADF application.

1. Install Enterprise Viewer as per the [installation guide]({% link enterprise-viewer/3.7/install/index.md %}) (either as part of the Alfresco Tomcat or as a separate Tomcat/Java application server).

2. Update or fork the existing document preview action to open a link in an IFrame to the Enterprise Viewer external link using the nodeId as parameter.

3. If on a separate application server, update the proxy rules for your ADF application to ensure the Enterprise Viewer external link may be accessed without CORS errors.
