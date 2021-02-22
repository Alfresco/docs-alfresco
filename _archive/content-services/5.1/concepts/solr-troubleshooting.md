---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Solr troubleshooting for SSL configurations

When you have an Alfresco installation that requires an SSL configuration, you might encounter connection issues.

If Solr search and/or the Solr tracking is not working properly, you might see this message on the Tomcat console:

```
Aug 22, 2011 8:19:21 PM org.apache.tomcat.util.net.jsse.JSSESupport handShake
WARNING: SSL server initiated renegotiation is disabled, closing connection 
```

This message indicates that one side of the SSL connection is trying to renegotiate the SSL connection. This form of negotiation was found to be susceptible to man-in-the-middle attacks and it was disabled in the Java JSEE stack until a fix could be applied.

Refer to the following link for more information: [http://www.oracle.com/technetwork/java/javase/documentation/tlsreadme2-176330.html](http://www.oracle.com/technetwork/java/javase/documentation/tlsreadme2-176330.html). 

Refer also to the following links: [http://www.gremwell.com/enabling\_ssl\_tls\_renegotiation\_in\_java](http://www.gremwell.com/enabling_ssl_tls_renegotiation_in_java) and [http://tomcat.apache.org/tomcat-6.0-doc/config/http.html](http://tomcat.apache.org/tomcat-6.0-doc/config/http.html).

If your version of Java does not have the fix, you need to re-enabled renegotiation by performing the following steps: 

1.  Add the `-Dsun.security.ssl.allowUnsafeRenegotiation=true` option to JAVA\_OPTS.
2.  Add the `allowUnsafeLegacyRenegotiation="true"` option to the Tomcat SSL connector.

**Parent topic:**[Solr monitoring and troubleshooting](../concepts/solr-monitor-troubleshoot.md)

