---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Synchronizing user account status

Use this information to synchronize the enabled or disabled user status property LDAP with Alfresco after an LDAP sync.

Different LDAP directories store data in different formats. For example, Active Directory has an attribute called `userAccountControl` where the second bit \(`0x2`\) is an [`ACCOUNTDISABLE` flag](https://support.microsoft.com/en-gb/kb/305144), Oracle Directory Server has an attribute called `pwdAccountLockedTime`, and LDAP systems derived from Netscape Directory Server \(NDS\) have a `nsAccountLock` attribute.

The values of these attributes need to be mapped onto a boolean property on the `cm:person` node. To do this, configure the attributes as follows:

1.  Open the <classpathRoot\>/alfresco-global.properties file.
2.  For all directory servers, add the following properties:

    ```
    synchronization.externalUserControl=true
    synchronization.externalUserControlSubsystemName=
    ```

    |Property Name|Description|Example|
    |-------------|-----------|-------|
    |synchronization.externalUserControl|Specifies if the users can be enabled. It set to `true`, the enables or disabled user status can be synchronized from an LDAP directory. If set to `false` \(default setting\), the users have to be explicitly disabled in Alfresco.|`false`|
    |synchronization.externalUserControlSubsystemName|Specifies the authentication subsystem that will handle the external user status.|`ldap1`|

    For all directory servers, the value of the `synchronization.externalUserControlSubsystemName` property must match the value from the authentication chain. For example, if your authentication chain looks like:

    ```
    authentication.chain=ldap1:ldap-ad
    ```

    then you need to set the `synchronization.externalUserControlSubsystemName` property as:

    ```
    synchronization.externalUserControlSubsystemName=ldap1
    ```

3.  For other LDAP implementations, you need to set two additional properties: `ldap.synchronization.userAccountStatusProperty` and `ldap.synchronization.disabledAccountPropertyValue`. To determine the name and the value of these properties see the specific LDAP implementation documentation.

    For example:

    -   For OpenLDAP, add the following properties to the alfresco-global.properties file:

        ```
        ldap.synchronization.userAccountStatusProperty=pwdAccountLockedTime
        ldap.synchronization.disabledAccountPropertyValue=000001010000Z
        ```

        **Note:** Make sure you activate and configure the password policy \(ppolicy\) overlay. For more information, see [Password Policies](http://www.openldap.org/doc/admin24/overlays.html).

    -   For Oracle, add the following properties to the alfresco-global.properties file:

        ```
        ldap.synchronization.userAccountStatusProperty=ds-pwp-account-disabled
        ldap.synchronization.disabledAccountPropertyValue=true
        ```

    -   In addition to the above properties, for Netscape Directory Server systems \(Oracle, Red Had, 389 DS\), add the following properties to the alfresco-global.properties file:

        ```
        ldap.synchronization.userAccountStatusProperty=nsAccountLock
        ldap.synchronization.disabledAccountPropertyValue=true
        ```

        **Note:** The `nsAccountLock` attribute is an operational attribute and may require some additional configuration depending on the directory server used.


**Parent topic:**[Configuring LDAP](../concepts/auth-ldap-intro.md)

