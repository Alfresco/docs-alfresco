---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, ldap-ad subsystem, authentication]
---

# Example: authentication and synchronization with one ldap-ad subsystem

This example addresses the more advanced goal of delegating authentication responsibility to a centralized directory server. Most organizations maintain their user database in a directory server supporting the LDAP protocol, such as Active Directory or OpenLDAP.

When integrated with an LDAP server, Alfresco can delegate both the password checking and account setup to the LDAP server, thus opening up Alfresco to your entire enterprise. This avoids the need for an administrator to manually set up user accounts or to store passwords outside of the directory server.

To integrate Alfresco with a directory server, you simply need to include an instance of the ldap or ldap-ad subsystem types in the authentication chain. Both subsystem types offer exactly the same capabilities and should work with virtually any directory server supporting the LDAP protocol. Their only differences are the default values configured for their attributes. The ldap type is preconfigured with defaults appropriate for OpenLDAP, whereas ldap-ad is preconfigured with defaults appropriate for Active Directory.

There are two choices in this scenario: replace or add to the authentication chain.

-   Replace the authentication chain

    You could remove `alfinst` from the previous example and instead add an instance of `ldap-ad`. This would hand over all authentication responsibility to Active Directory and would mean that the built-in accounts, such as admin and guest, could not be used.

    In this scenario, it would be important to configure at least one user who exists in Active Directory as an administrator and enable the guest account in Active Directory, if guest access were required. Furthermore, because ldap-ad cannot support CIFS authentication \(as it requires an MD5 password hash exchange\), it would rule out use of the CIFS server for all users and the CIFS server would be disabled.

-   Add to the authentication chain

    You could instead supplement the existing capabilities of `alfinst` by inserting an `ldap-ad` instance before or after `alfinst` in the chain. This means that you could use the built-in accounts alongside those accounts in the directory server. Furthermore, the built-in accounts could access Alfresco through the CIFS server, since alfrescoNtlm is able to drive CIFS authentication.

    In this scenario, where you chose to position your ldap-ad instance in the chain determines how overlaps or collisions between user accounts are resolved. If an admin account existed in both Alfresco and Active Directory, then admin would be Alfresco if `alfinst` came first, or Active Directory if the ldap-ad instance came first.


This example uses an Active Directory server and configures an instance of the ldap-ad subsystem.

1.  This example uses the second option to append an instance of ldap-ad to the authentication chain. This instance name is ldap1 and is declared by changing the `authentication.chain` property in the alfresco-global.properties file. In addition to the `authentication.chain` property, you need to add the `ntlm.authentication.sso.enabled` property to the alfresco-global.properties file.

2.  Undo any previous modifications to alfinst and disable NTLM-based SSO.

    This is done because the ldap-ad and ldap subsystem types cannot participate in the NTLM handshake, so leaving SSO enabled would prevent any of the Active Directory users from logging in.

3.  Disable SSO by opening the alfresco-global.properties file in a text editor and editing the `ntlm.authentication.sso. enabled` property as follows:

    ```
    authentication.chain=alfinst:alfrescoNtlm,ldap1:ldap-ad
    
    ntlm.authentication.sso.enabled=false
    
    ldap.authentication.allowGuestLogin=false
    ldap.authentication.userNameFormat=%s@domain.com
    ldap.authentication.java.naming.provider.url=ldap://domaincontroller.domain.com:389
    ldap.authentication.defaultAdministratorUserNames=Administrator,alfresco
    ldap.synchronization.java.naming.security.principal=alfresco@domain.com
    ldap.synchronization.java.naming.security.credentials=secret
    ldap.synchronization.groupSearchBase=ou=Security Groups,ou=Alfresco\
    ,dc=domain,dc=com
    
    ldap.synchronization.userSearchBase=ou=User Accounts,ou=Alfresco,dc=domain,dc=com
    ```

    The large number of configurable properties for ldap-ad may alarm you. This demonstrates the flexibility of Alfresco’s LDAP infrastructure. Luckily, because ldap-ad already has sensible defaults configured for a typical Active Directory set up, there are only a few edits you must make to tailor the subsystem instance to your needs.

    The following list is a summary of the settings that have been changed:

    -   `ldap.authentication.allowGuestLogin` — Enables / disables unauthenticated access to Alfresco
    -   `ldap.authentication.userNameFormat` — A template that defines how Alfresco user IDs are expanded into Active Directory User Principal Names \(UPNs\) containing a placeholder `%`s, which stands for the unexpanded user ID. A UPN generally consists of the user’s account ID followed by an `@` sign and then the domain’s UPN suffix. You can check the appropriate UPN suffix for your domain by connecting to the directory with an LDAP browser, browsing to a user account, and looking at the value of the `userPrincipalName` attribute.
    -   `ldap.authentication.java.naming.provider.url` — An LDAP URL containing the host name and LDAP port number \(usually 389\) of your Active Directory server
    -   `ldap.authentication.defaultAdministratorUserNames` — A list of user IDs who should be given Alfresco administrator privileges by default. Another administrator can include more users as administrators by adding those users to the ALFRESCO\_ADMINISTRATORS group.
    -   `ldap.synchronization.java.naming.security.principal` — The UPN for an account with privileges to see all users and groups. This account is used by Alfresco to retrieve the details of all users and groups in the directory so that it can synchronize its internal user and authority database. Passwords are never compromised and remain in the directory server.
    -   `ldap.synchronization.java.naming.security.credentials` — The password for the previous account
    -   `ldap.synchronization.groupSearchBase` — The Distinguished Name \(DN\) of the Organizational Unit \(OU\) below which security groups can be found. You can determine the appropriate DN by browsing to security groups in an LDAP browser.
    -   `ldap.synchronization.userSearchBase` — The distinguished name \(DN\) of the Organizational Unit \(OU\) below which user accounts can be found. You can determine the appropriate DN by browsing to user accounts in an LDAP browser.

-   **[Applying the ldap-ad example](../tasks/auth-example-ldap-addemo.md)**  


**Parent topic:**[Configuring LDAP](../concepts/auth-ldap-intro.md)

