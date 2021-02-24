---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configure `mod_proxy_ajp`

This topic describes how to configure `mod_proxy_ajp` on machine 1.

1.  Configure `mod_proxy_ajp` by creating a file /etc/httpd/conf.d/mod\_proxy\_ajp.conf with the following code:

    ```
    LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
    
    LogLevel Debug
    
    ProxyPass /alfresco ajp://172.30.40.144:8009/alfresco
    ProxyPassReverse /alfresco ajp://172.30.40.144:8009/alfresco
    ProxyPass /share ajp://172.30.40.144:8009/share
    ProxyPassReverse /share ajp://172.30.40.144:8009/share
    ProxyPass /cas ajp://rhel-cas-112:8009/cas
    ProxyPassReverse /cas ajp://rhel-cas-112:8009/cas
    ```

    where 172.30.40.144 is machine 2, the Alfresco server.

    **Note:** Remember to configure `tomcatAuthentication=false` attribute for AJP connector in server.xml in Alfresco’s Tomcat.

2.  Now, configure `mod_ssl` by editing /etc/httpd/conf.d/ssl.conf by adding the following lines near the end, just before the closing `</VirtualHost>` tag in order to mount the CAS and examples applications on the HTTPS port. Note that we also switch on client certificate verification and set the `SSLCACertificatePath` so that our CA certificate will be trusted by Apache. We set the `SSLOptions` necessary to ensure that Apache forwards client certificate information to Tomcat.

    ```
    ProxyPass /cas ajp://rhel-cas-112:8009/cas
    ProxyPassReverse /cas ajp://rhel-cas-112:8009/cas
    
    ProxyPass /examples ajp://rhel-cas-112:8009/examples
    ProxyPassReverse /examples ajp://rhel-cas-112:8009/examples
    
    SSLVerifyClient optional
    SSLCACertificatePath /etc/pki/tls/certs/
    SSLOptions +StdEnvVars +ExportCertData
    ```


**Parent topic:**[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)

