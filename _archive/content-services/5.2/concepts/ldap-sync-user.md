---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Synchronizing user account status

Use this information to synchronize the enabled or disabled Active Directory user status after an LDAP sync.

Different LDAP directories store data in different formats. For example, Active Directory has an attribute called `userAccountControl` where the second bit \(`0x2`\) is an [`ACCOUNTDISABLE` flag](https://support.microsoft.com/en-gb/kb/305144), Oracle Directory Server has an attribute called `pwdAccountLockedTime`, and LDAP systems derived from Netscape Directory Server \(NDS\) have a `nsAccountLock` attribute.

The values of these attributes need to be mapped onto a boolean property on the `cm:person` node. To do this, configure the attributes as follows:

1.  Download the [default-synchronization.properties](https://github.com/Alfresco/alfresco-repository/blob/af2e069b2eabcd5433cee39d83ec06bad6fc69a0/src/main/resources/alfresco/subsystems/Synchronization/default/default-synchronization.properties) file.
2.  Open the <classpathRoot\>/alfresco-global.properties file.
3.  Add one of these entries to your configuration, depending on the directory server used.

    For example:

    -   For LDAP-AD, add the following properties to the alfresco-global.properties file.

        ```
        synchronization.externalUserControl=true
        synchronization.externalUserControlSubsystemName=ldap1
        ```

    -   For OpenLDAP, add the following properties to the alfresco-global.properties file:

        ```
        synchronization.externalUserControl=true
        synchronization.externalUserControlSubsystemName=ldap1
        ldap.synchronization.userAccountStatusProperty=pwdAccountLockedTime
        ldap.synchronization.disabledAccountPropertyValue=000001010000Z
        ```

    -   For Netscape Directory Server systems \(Oracle, Red Had, 389 DS\), add the following properties to the alfresco-global.properties file:

        ```
        synchronization.externalUserControl=true
        synchronization.externalUserControlSubsystemName=ldap1
        ldap.synchronization.userAccountStatusProperty=nsAccountLock
        ldap.synchronization.disabledAccountPropertyValue=true
        ```

4.  Copy this file into the <extension\> directory.
5.  Read the above mentioned property from LDAP and set it in `ldap.synchronization.userAccountStatusProperty`. For example:

    ```
    ldap.synchronization.userAccountStatusProperty=nsAccountLock
    ```

6.  The next configuration is how to process the value of that property into a boolean true/false value. To do that there is an adapter bean *userAccountStatusInterpreter* that is plugged into the *userRegistry* bean via spring.

    This configuration parameter `ldap.synchronization.userAccountStatusInterpreter` can either be `ldapadUserAccountStatusInterpreter` or `ldapUserAccountStatusInterpreter`. This setting instructs the system how to process the value for `ldap.synchronization.userAccountStatusProperty`.

    -   For LDAP-AD:

        ```
        ldap.synchronization.userAccountStatusInterpreter=ldapadUserAccountStatusInterpreter
        ```

    -   For non-AD LDAP:

        ```
        ldap.synchronization.userAccountStatusInterpreter=ldapUserAccountStatusInterpreter
        ```


**Parent topic:**[Configuring LDAP](../concepts/auth-ldap-intro.md)

