---
title: Integrating AEV with Alfresco Application Development Framework
---

AEV can also be integrated with an existing ADF application.

1. Install Alfresco Enterprise Viewer as per the install guide (either as part of the Alfresco Tomcat or as a separate Tomcat/Java application server).

1. Update or fork the existing document preview action to open a link in an IFrame to the Alfresco Enterprise Viewer external link using the nodeId as parameter.

1. If on a separate application server, update the proxy rules for your ADF application to ensure the Alfresco Enterprise Viewer external link may be accessed without CORS errors.
