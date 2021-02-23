---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, ldap-ad subsystem, authentication]
---

# Example: authentication and synchronization with two ldap-ad subsystems

This example uses one Active Directory server and shows authentication as well as user registry export \(synchronization\) from two ldap-ad subsystems.

The two ldap-ad subsystems used are ad1 and ad2. Both these subsystems use the same Active Directory server but different locations within it \(search bases\).

1.  Add the following properties to the alfresco-global.properties file.

    ```
    authentication.chain=alfinst:alfrescoNtlm,ad1:ldap-ad,ad2:ldap-ad
    ntlm.authentication.sso.enabled=false
    ```

2.  Create the properties files to configure ad1:

    ```
    mkdir <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\ldap-ad\ad1
    
    cd /d <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\ldap-ad\ad1
    
    copy <installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\subsystems\
    Authentication\ldap-ad\*.properties
    
    ```

    A single file called ldap-ad-authentication.properties now appears in the ad1 directory. You can edit this file to define your LDAP set up.

    The following lines show the set of properties you will typically need to edit and how you might set them for a domain controller for a fictitious domain called `domain.com` for ldap-ad subsystem ad1.

    ```
    ldap.authentication.allowGuestLogin=false
    ldap.authentication.userNameFormat=%s@domain.com
    ldap.authentication.java.naming.provider.url=ldap://domaincontroller.domain.com:389
    ldap.authentication.defaultAdministratorUserNames=Administrator,alfresco
    ldap.synchronization.java.naming.security.principal=alfresco@domain.com
    ldap.synchronization.java.naming.security.credentials=secret
    ldap.synchronization.groupSearchBase=ou=ad1,ou=Alfresco\
    ,dc=domain,dc=com
    ldap.synchronization.userSearchBase=ou=ad1,ou=Alfresco,dc=domain,dc=com
    ```

3.  Create the properties files to configure ad2:

    ```
    mkdir <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\ldap-ad\ad2
    
    cd /d <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\ldap-ad\ad2
    
    copy <installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\subsystems\
    Authentication\ldap-ad\*.properties
    
    ```

    A single file called `ldap-ad-authentication.properties` now appears in your ad2 directory. You can edit this file to define your LDAP set up.

    The following lines show the set of properties you will typically need to edit and how you might set them for a domain controller for a fictitious domain called `domain.com` for ldap-ad subsystem ad2.

    ```
    ldap.authentication.allowGuestLogin=false
    ldap.authentication.userNameFormat=%s@domain.com
    ldap.authentication.java.naming.provider.url=ldap://domaincontroller.domain.com:389
    ldap.authentication.defaultAdministratorUserNames=Administrator,alfresco
    ldap.synchronization.java.naming.security.principal=alfresco@domain.com
    ldap.synchronization.java.naming.security.credentials=secret
    ldap.synchronization.groupSearchBase=ou=ad2,ou=Alfresco\
    ,dc=domain,dc=com
    ldap.synchronization.userSearchBase=ou=ad2,ou=Alfresco,dc=domain,dc=com
    ```


**Parent topic:**[Configuring LDAP](../concepts/auth-ldap-intro.md)

