---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configure `mod_auth_cas`

This topic describes how to configure `mod_auth_cas`.

1.  Configure `mod_auth_cas` by creating a file /etc/httpd/conf.d/mod\_auth\_cas.conf with the following code. This ensures that Alfresco, Share and example applications are protected by CAS. Remember to edit the host name in `CASLoginURL` and `CASValidateURL` appropriately.

    ```
    LoadModule auth_cas_module modules/mod_auth_cas.so
    CASCookiePath /tmp/cas/
    CASLoginURL https://**rhel-CAS-112**/cas/login
    CASValidateURL https://rhel-CAS-112/cas/serviceValidate
    CASValidateServer Off
    CASDebug On
    CASCertificatePath /etc/pki/tls/certs
    
    <LocationMatch ^/alfresco/(?!service/|service$|webdav/|webdav$|s/|s$|scripts/|css/|images/).*>
    AuthType CAS
    AuthName "CAS"
    require valid-user
    CASScope /alfresco
    </LocationMatch>
    
    <Location /share>
    AuthType CAS   
    AuthName "CAS"
    require valid-user
    CASScope /share
    </Location>   
    
    <Location /examples>
    AuthType CAS 
    AuthName "CAS" 
    require valid-user
    CASScope /examples
    </Location>  
    ```

    **Note:** **rhel-CAS-112** is the DNS name of machine 1, the host where JASIG CAS is set up. This name must match the CN of the server certificate created in the [Set up Certificate Authority and issue Server and Client Certificates](setup-ca-modauthcas.md) topic.


**Parent topic:**[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)

