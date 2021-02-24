---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Build and install `mod_auth_cas`

This topic describes how to build and install `mod_auth_cas` on machine 1.

1.  Use subversion to check out the latest `mod_auth_cas` source.

    ```
    cd /root
    svn co https://source.jasig.org/cas-clients/mod_auth_cas/tags/mod_auth_cas-1.0.9.1 mod_auth_cas-1.0.9.1
    cd mod_auth_cas-1.0.9.1
    ./configure; make; make install
    ```

2.  Create a directory for `mod_auth_cas` to store cookie data. Note that this must be writeable by the Apache user.

    ```
    mkdir /tmp/cas
    chown apache:apache /tmp/cas
    chmod 0700 /tmp/cas    
    ```


**Parent topic:**[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)

