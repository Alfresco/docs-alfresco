---
title: Solr troubleshooting for SSL configurations
---
When you have an Alfresco Content Services installation that requires an SSL configuration, you might encounter connection issues.

If Solr search and/or the Solr tracking is not working properly, you might see this message on the Tomcat console:

```bash
Aug 22, 2011 8:19:21 PM org.apache.tomcat.util.net.jsse.JSSESupport handShake
WARNING: SSL server initiated renegotiation is disabled, closing connection 
```

This message indicates that one side of the SSL connections is trying to renegotiate the SSL connection. This form of negotiation was found to be susceptible to man-in-the-middle attacks and it was disabled in the Java JSEE stack until a fix could be applied.

Refer to the following link for more information: [https://www.oracle.com/technetwork/java/javase/documentation/tlsreadme2-176330.html](https://www.oracle.com/technetwork/java/javase/documentation/tlsreadme2-176330.html). 

Refer also to the following links: 

* [https://www.gremwell.com/enabling_ssl_tls_renegotiation_in_java](https://www.gremwell.com/enabling_ssl_tls_renegotiation_in_java)
* [https://tomcat.apache.org/tomcat-6.0-doc/config/http.html](https://tomcat.apache.org/tomcat-6.0-doc/config/http.html)

If your version of Java does not have the fix, you need to re-enable renegotiation by performing the following steps: 

1. Add the `-Dsun.security.ssl.allowUnsafeRenegotiation=true` option to `JAVA_OPTS`.
2. Add the `allowUnsafeLegacyRenegotiation="true"` option to the Tomcat SSL connector.
