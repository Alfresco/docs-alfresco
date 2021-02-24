---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, external, authentication]
---

# Configuring external authentication

The `external` authentication subsystem can be used to integrate Alfresco with any external authentication system.

The external authentication system can be integrated with your application server in such a way that the identity of the logged-in user is passed to servlets via the `HttpServletRequest.getRemoteUser()` method. As this is the standard way for application servers to propagate user identities to servlets, it should be compatible with a number of SSO solutions, including Central Authentication Service \(CAS\).

The subsystem also allows a proxy user to be configured, such that requests made through this proxy user are made in the name of an alternative user, whose name is carried in a configured HTTP request header. This allows, for example, the Share application and other Alfresco Surf applications to act as a client to an SSO-protected Alfresco application and assert the user name in a secure manner.

**Note:** Activating external authentication makes Alfresco accept external authentication tokens. Make sure that no untrusted direct access to Alfresco's HTTP or AJP ports is allowed.

-   **[External configuration properties](../concepts/auth-external-props.md)**  
The external subsystem supports the following properties.
-   **[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)**  
This section provides an overview on how to install and use Alfresco on a Red Hat Enterprise Linux server that uses a Central Authentication Service \(CAS\) server as a Single Sign-On \(SSO\) solution.

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

