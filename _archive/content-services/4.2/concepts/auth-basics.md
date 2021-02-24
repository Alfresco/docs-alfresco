---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Authentication and Security, Authentication, Developer]
keyword: [overview, authentication]
---

# External authentication basics

Use this information to understand the differences between external authentication and Single Sign-On \(SSO\), and for Microsoft SharePoint Protocol support limitations.

## What is external authentication?

The external authentication subsystem can be used to integrate Alfresco with any external authentication system. External authentication is set with the `authentication.chain` parameter in your `alfresco-global.properties` file to use the `external` authentication subsystem.

The external authentication system can be integrated with your application server in such a way that the identity of the logged-in user is passed to servlets by using the `HttpServletRequest.getRemoteUser()` method. As this is the standard way for application servers to propagate user identities to servlets, it should be compatible with a number of SSO solutions, including Central Authentication Service \(CAS\).

The subsystem also allows a proxy user to be configured, such that requests made through this proxy user are made in the name of an alternative user, whose name is carried in a configured HTTP request header. This allows, for example, the Share application and other Alfresco Surf applications to act as a client to an SSO-protected Alfresco application and assert the user name in a secure manner.

**Note:** Activating external authentication makes Alfresco accept external authentication tokens. Make sure that no untrusted direct access to Alfresco's HTTP or AJP ports is allowed.

Here are two scenarios where external authentication is configured with Alfresco and Share. In both scenarios, an HTTP or HTTPS request is sent to an authentication proxy. If authentication is OK, the proxy passes the request to Share using the AJP protocol.

In the first scenario, the Share endpoint-url \(http://localhost:8080/alfresco/wcs\) sends the request directly to Alfresco using HTTP and a User Header. No certificate is used and the `external.authentication.proxyUserName` is blank:

```
external.authentication.proxyUserName=
```

Alfresco trusts the header \(defined by `external.authentication.proxyHeader`\) sent by Share. This scenario is typically used if you want to prohibit direct access to Alfresco and enforce using the proxy, for example, by using firewall rules to the proxy.

![A client uses either an HTTP or HTTPS protocol to an authentication proxy.  If authentication is OK,            the proxy passes the request to Share using the AJP protocol.             The Share endpoint-url (http://localhost:8080/alfresco/wcs) sends the request directly to the Alfresco layer using HTTP and a user header.            No certificate is used and the external.authentication.proxyUserName is blank. Alfresco trusts the header (defined by external.authentication.proxyHeader) sent by Share.](../images/external-direct.png)

In the second scenario, the Share endpoint-url \(http://your.server.com/alfresco/wcs\) sends the request back to Apache, using HTTP and a User Header \(defined by `external.authentication.proxyHeader`\), and a certificate. `external.authentication.proxyUserName` is set:

```
external.authentication.proxyUserName=alfresco-system
```

Apache uses the certificate to check that the request is coming from Share with the correct user \(that is, the value of `external.authentication.proxyUserName`\) and forwards the request to Alfresco. This scenario is typically used to allow direct access to Alfresco, using HTTPS and the originator \(the proxy\) sends a client certificate when establishing the SSL tunnel.

![A client uses either an HTTP or HTTPS protocol to an authentication proxy.  If authentication is OK,            the proxy passes the request to Share using the AJP protocol.             The Share endpoint-url (http://localhost:8080/alfresco/wcs) sends the request back to           Apache, using HTTP and a User Header (defined by         external.authentication.proxyHeader), and a certificate.         external.authentication.proxyUserName is         set. Apache uses         the certificate to check that the request is coming from Share with the correct user (that         is, the value of external.authentication.proxyUserName and forwards the         request to Alfresco.](../images/external-indirect.png)

[Default authentication chain](auth-subsystem-defaultauth.md) and [Configuring external authentication](auth-external-intro.md) provide more information on the parameter and the external authentication subsystem.

Using the `external` authentication subsystem means that:

-   The complexity of authentication moves to an external software layer \(a proxy\). Alfresco listens to the authenticated user name that it receives using a custom HTTP header, or it reads the CGI REMOTE\_USER variable that can be passed using the AJP protocol. [Configuring external authentication](../tasks/adminconsole-directorymgt-external.md) provides more information on configuring the `external` authentication subsystem.
-   Most of the responsibility for authentication is not controlled by Alfresco, but controlled by the external software layer. Unless there is a problem when the authenticated user name is transmitted to Alfresco, the issue is located in the external software layer. In these cases, work with your proxy vendor or implementer of the authentication proxy to resolve the issue.

## How is Single-Sign On \(SSO\) related to external authentication?

SSO is a property of an authentication scheme. You can use more than one method to set up SSO. For example:

-   If you are using Kerberos, you can use either the `kerberos` authentication subsystem, or the `external` authentication subsystem with a proxy that handles Kerberos authentication.
-   If you are using NTLM, you can use either the `alfrescoNtlm` or `passthru` authentication subsystems, or the `external` authentication subsystem with a proxy that handles NTLM authentication.
-   If you are using CAS, you must use the `external` authentication subsystem with a proxy that handles CAS authentication.

In summary, external authentication and SSO are not interdependent: you can set up external authentication that is not SSO \(for example, using an Apache proxy with a `mod_auth_basic` setting\), and you can set up an SSO system that is not using the `external` authentication subsystem \(for example, using the `kerberos` authentication subsystem\).

See [Authentication subsystem types](auth-subsystem-types.md) for a listing of the authentication subsystems and the features that they support.

## How is Microsoft SharePoint support related to external authentication?

There are some limitations when using Microsoft SharePoint support with the Alfresco `external` authentication subsystem. External authentication can work well when using a web browser client, but not when using the MS Office client. This is because no authentication information is sent with the file URL, and MS Office does not store authentication information, so starts a new authentication process.

An example of this is when using CAS. CAS authenticates using an HTML form and a web browser that follows an HTTP redirect. The web authentication works correctly, but MS Office authentication will not work because it does not permit completion of the form. This problem is caused by the limited set of authentication protocols that MS Office supports.

MS Office supports the following authentication mechanisms:

-   HTTP Basic
-   HTTP Digest
-   NTLM
-   Kerberos

NTLM and Kerberos can be used in an SSO environment.

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

