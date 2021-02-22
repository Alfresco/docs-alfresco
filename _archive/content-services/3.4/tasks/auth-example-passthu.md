---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, pass-through, passthru, authentication]
---

# Example: customizing the pass-through subsystem

The authentication capabilities offered by the ldap-ad subsystem type cannot support CIFS and NTLM authentication. Instead, you would have to use form-based login for all users, and only Alfresco internal users could access CIFS. This is the compromise you would have to make if the directory server did not support any other authentication protocol. But for Active Directory, which also supports NTLM and Kerberos authentication, you can overcome this limitation by using either the Pass-through or the Kerberos subsystem types.

The Pass-through subsystem supports SSO, CIFS, and password authentication against a Windows domain server using the NTLM v1 protocol. Many prefer Kerberos for its enhanced security and you could consider it as an alternative.

1.  Append an instance of passthru to the authentication chain.

2.  Name the instance passthru1, and declare it by changing the `authentication.chain` property in alfresco-global.properties as follows:

    `alfresco.authentication.authenticateCIFS=false`

    **Note:** Functions such as NTLM SSO and CIFS authentication can only be targeted at a single subsystem instance in the authentication chain. This is a restriction imposed by the authentication protocols themselves. For this reason, Alfresco targets these ‘direct’ authentication functions at the first member of the authentication chain that has them enabled. By disabling CIFS in alfinst earlier, passthru1 has a chance to handle CIFS authentication for its larger user base. SSO is also left disabled in alfinst, which means that you can enable it in passthru1.

3.  Stop ldap1 from performing authentication.

    You can leave that to passthru1, which will be authenticating against the same server using more secure protocols. This leaves the ldap1 user registry export capabilities still active, which you still rely on for account synchronization.

4.  Edit the `ldap.authentication.active` property in the ldap-ad-authentication.properties file located in your ldap1 directory as follows:

    `ldap.authentication.active=false`

5.  Create the properties files to configure passthru1.

    ```
    mkdir <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\passthru\passthru1
    
    cd /d <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\passthru\passthru1
    
    copy <installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\subsystems\
    Authentication\passthru\*.properties
    
    ```


After running the previous commands, two separate properties files should appear in your passthru1 directory. These are:

-   passthru-authentication-context.properties
-   ntlm-filter.properties

Using a similar distinction to the alfrescoNtlm subsystem type, passthru-authentication-context.properties contains properties relating to core authentication capabilities, whereas ntlm-filter.properties groups those properties relating to automatic sign on. Unlike the alfrescoNtlm subsystem type, SSO is enabled by default in passthru subsystems so there is no need to edit ntlm-filter.properties.

The following lines show the set of properties you would need to edit and how to set them:

```
passthru.authentication.servers=DOMAIN1\\host1.com,DOMAIN2\\host2.com,host1.com 
passthru.authentication.domain=# Leave blank
passthru.authentication.guestAccess=false
passthru.authentication.defaultAdministratorUserNames=Administrator,alfresco
```

The following list is a summary of the settings that have been changed:

-   `passthru.authentication.servers` — A comma-separated list of domain controller host names, each prefixed by the name of the NetBIOS domain they correspond to and a double backslash. The last member of the list should be a host name without a domain prefix, and this host will be used when a client does not include a domain name in an authentication request.
-   `passthru.authentication.domain` — A property that is a less-reliable alternative to `passthru.authentication.servers` and should be left empty.
-   `passthru.authentication.defaultAdministratorUserNames` — A list of user IDs who should be given Alfresco administrator privileges by default. Additional users can be made administrators by another administrator if they add those users to the ALFRESCO\_ADMINISTRATORS group.

-   **[Applying the Pass-through example](../tasks/auth-example-passthrudemo.md)**  


**Parent topic:**[Configuring pass-through](../concepts/auth-passthru-intro.md)

