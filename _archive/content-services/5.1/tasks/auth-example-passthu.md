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

1.  Edit the alfresco-global.properties file to specify your authentication method:

    1.  Append an instance of passthru to the authentication chain.

        Name the instance passthru1, and declare it by changing the `authentication.chain` property in as follows:

        ```
        alfresco.authentication.authenticateCIFS=false
        ```

        **Note:** Functions such as NTLM SSO and CIFS authentication can only be targeted at a single subsystem instance in the authentication chain. This is a restriction imposed by the authentication protocols themselves. For this reason, Alfresco targets these ‘direct’ authentication functions at the first member of the authentication chain that has them enabled. By disabling CIFS in alfinst earlier, passthru1 has a chance to handle CIFS authentication for its larger user base. SSO is also left disabled in alfinst, which means that you can enable it in passthru1.

    2.  Edit the `ldap.authentication.active` property in the alfresco-global.properties file as follows:

        ```
        ldap.authentication.active=false
        ```


-   **[Applying the Pass-through example](../tasks/auth-example-passthrudemo.md)**  


**Parent topic:**[Configuring pass-through](../concepts/auth-passthru-intro.md)

