---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# SAML known issues and workarounds

Use this information for identifying any known issues while using SAML SSO in Alfresco and its workaround.

**Using Alfresco Content Services 5.2 with SAML SSO on WebLogic**

If you are using Alfresco Content Services 5.2 with SAML SSO on WebLogic, you must manually locate and remove \(or rename with a different extension\) the <installLocation\>/Oracle/Middleware/Oracle\_Home/wlserver/modules/com.oracle.weblogic.security.opensaml2.jar file.

***Cause:*** WebLogic provides a branched `opensaml` implementation of the libraries that is used by the Alfresco SAML SSO module. This implementation is incompatible with the SAML module.

***Troubleshooting:*** If there are conflicts between the SAML jars implementation provided by WebLogic and the Alfresco SAML module jars, the following message will appear in alfresco.log and SAML SSO for Alfresco will not work as expected.

```
...
java.lang.ClassNotFoundException: org.opensaml.soap.soap11.impl.BodyBuilder
	at weblogic.utils.classloaders.GenericClassLoader.findLocalClass(GenericClassLoader.java:1026)
...
```

***Solution:*** Remove the com.oracle.weblogic.security.opensaml2.jar file.

**Parent topic:**[SAML Single Sign-On \(SSO\) for Alfresco Content Services 1.0.3](../concepts/saml-overview.md)

