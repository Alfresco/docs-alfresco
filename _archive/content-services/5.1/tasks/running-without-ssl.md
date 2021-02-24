---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Solr certificate authentication

Alfresco uses SSL and X509 certificate authentication to secure communication between the repository server and the Solr server. In this communication, SSL not only provides encryption, it is also used for authentication. Follow these steps to turn off SSL and deactivate authentication between the Alfresco repository and the Solr server.

When you install Alfresco, port 8443 is automatically configured for SSL communication between Solr and the Alfresco repository. It is recommended that you configure the Tomcat connector to use SSL and a certificate in the <TOMCAT\_HOME\>/conf/server.xml file as shown below:

```
clientAuth="want"
```

For more information, see [Secure Sockets Layer \(SSL\) and the Alfresco repository](../concepts/configure-ssl-intro.md).

The X509 client authentication allows users to authenticate to Alfresco with certificates rather than with a username and password.

To disable Solr <--\> Alfresco SSL communication, follow the steps below:

1.  For Solr, set the `alfresco.secureComms` property in the solrcore.properties file.

    You can either set this property to `none` or `https`.

    -   Setting the `alfresco.secureComms` property to `none` or commenting it out will turn off the SSL and X509 authentication.
    -   Setting the `alfresco.secureComms` property to `https` will turn on the SSL and X509 authentication.
    **Note:** There are multiple solrcore.properties files. Make sure that each of these files must have the same value for `alfresco.secureComms` property.

2.  For alfresco, set the `solr.secureComms` property in the alfresco-global.properties file.

    You can either set this property to `none` or `https`.

    -   Setting the `solr.secureComms` property to `none` or commenting it out will turn off the SSL and X509 authentication.
    -   Setting the `solr.secureComms` property to `https` will turn on the SSL and X509 authentication.

**Changes from Alfresco One 5.0**

The web.xml file for both Alfresco and Solr 4 now has a new servlet filter, `X509AuthFilter`. This filter enforces SSL and X509 authentication. When the `alfresco.secureComms` and `solr.secureComms` properties are set to `https`, the `X509AuthFilter` does the following:

-   Verifies that the X509 certificate is present in the request. If the cert is not present in the request, it may be due to one of the following reasons:
    -   Non-ssl port being used.
    -   Client did not send a certificate, or
    -   Server did not request the client certificate
-   Validates that the certificate dates are valid at that time.
-   The `X509AuthFilter` filter contains an optional `init` parameter called `cert-contains`. If present, the `X509AuthFilter` verifies that the X509 Subject \(distinguished name\) of the certificate contains that string.
    -   If any of these checks fail, the `X509AuthFilter` filter will respond with a `http 403` error message.
    -   If the settings described Step1 and Step2 are set to `none` or commented out, the `X509AuthFilter` filter will not enforce X509 authentication.

The `X509AuthFilter` has been mapped to specific paths. For Solr, all URLs will be protected by the `X509AuthFilter`. For Alfresco, only specific URLs in the web.xml file are protected.

The following URLs are mapped for Alfresco:

```
<web-app xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee

http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd" version="2.4">

 <display-name>Alfresco</display-name>
 <description>Alfresco</description>
...

 <filter>
   <filter-name>X509AuthFilter</filter-name>
   <filter-class>...</filter-class>
 </filter> 

...

 <filter-mapping>
   <filter-name>X509AuthFilter</filter-name>
   <url-pattern>/service/api/solr/*</url-pattern>
 </filter-mapping>
 
 <filter-mapping>
   <filter-name>X509AuthFilter</filter-name>
   <url-pattern>/s/api/solr/*</url-pattern>
 </filter-mapping>
 
 <filter-mapping>
   <filter-name>X509AuthFilter</filter-name>
   <url-pattern>/wcservice/api/solr/*</url-pattern>
 </filter-mapping>
 
 <filter-mapping>
   <filter-name>X509AuthFilter</filter-name>
   <url-pattern>/wcs/api/solr/*</url-pattern>
 </filter-mapping>

...

</web-app>
```

Note that the web.xml file no longer contain the `<security-constraint>` section.

The X509 authentication only takes place on a port that is configured for both SSL and user authentication. Different application servers will configure this port in different ways. Besides configuring SSL, user authentication must also be configured for the certificate to be made available to the `X509AuthFilter`.

If you decide to turn-off SSL and deactivate authentication between Alfresco repository and the Solr server, you need to protect your environment. For more information, see [Configuring SSL for a production environment](configure-ssl-prod.md).

**Parent topic:**[Solr security](../concepts/solrsecurity-intro.md)

