---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Setting Alfresco SSO with client certificates

This topic describes how to set up Alfresco SSO with client certificates.

1.  Setup Apache as proxy server in front of Alfresco and configure it to use SSL as described in [Configuring SSL for a production environment](configure-ssl-prod.md).

2.  Activate external authentication as described in [Configuring external authentication](../concepts/auth-external-intro.md).

3.  To extend the SSL configuration in httpd.conf to request client authentication and forward the user name as HTTP header, add this configuration to the `<VirtualHost>` node:

    ```
    SSLVerifyClient         require
    SSLCACertificateFile    /path/to/your/enterprise-CA.pem
    RequestHeader           append  X-Alfresco-Remote-User  "%{SSL_CLIENT_S_DN_Email}e"
    ```

    This will accept all client certificates that have been signed by the CA identified by the certificate stored in `enterprise-CE.pem`. It will use the email address stored in this certificate as the user name in Alfresco.


**Parent topic:**[Configuring external authentication](../concepts/auth-external-intro.md)

