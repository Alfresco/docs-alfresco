---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Working with proxies and clustering

Use this information to know about the limitations and recommendations when SAML SSO works with Alfresco behind a proxy.

Make sure that the IdP is accessible by the client applications. At a minimum, configure the `alfresco.host`, `alfresco.port`, and `alfresco.protocol` properties to use the correct values of the proxy server. For more information, see [sysAdmin subsystem properties](http://docs.alfresco.com/5.2/concepts/sysadmin-subsystem-props.html). For deploying Alfresco with a reverse proxy, see [Deploying Alfresco with a different context path](http://docs.alfresco.com/5.2/tasks/deploy-contextpath.html).

The limitations that apply to using web scripts with ticket authentication also applies to clustering for SAML usage. Make sure you have set up your load balancer correctly.

**Recommendation for proxy:**

In a production environment, for REST API and AOS, implement a setup with a reverse proxy in front of Alfresco. This reverse proxy is configured to block all API requests except those that you want to be let through, for example, CMIS. Such a setup needs to allow these requests:

-   /alfresco/service/saml/-default-/aos/authenticate
-   /alfresco/service/saml/-default-/aos/authenticate-response
-   /alfresco/service/saml/-default-/rest-api/authenticate
-   /alfresco/service/saml/-default-/rest-api/authenticate-response

**Parent topic:**[SAML SSO REST API service provider usage guidelines](../concepts/develop-saml.md)

