# User Synchronization Settings

|Property|Description|LDAP Example|Active Directory Example|
|--------|-----------|------------|------------------------|
|*ldap.synchronization.userSearchBase*

|The user search base restricts the LDAP user query to a sub section of a tree on the LDAP server.

|*ou=users,dc=alfresco,dc=com*

|*ou=users,dc=alfresco,dc=com*

|
|*ldap.synchronization.personQuery*

|The query to select all objects that represent the users to import \(used in the \*full synchronization query\*ß\).

|*\(objectclass\\=inetOrgPerson\)*

|*\(&\(objectclass\\=user\)\(userAccountControl\\:1.2.840.113556.1.4.803\\:\\=512\)\)*

|
|*ldap.synchronization.personDifferentialQuery*

|The query to select objects that represent the users to import that have changed since a certain time \(used in the **differential synchronization query**\).

|||
|*ldap.synchronization.userIdAttributeName*

|The attribute name on people objects found in LDAP to use as the user ID in Alfresco

|uid

|cn

|
|*ldap.synchronization.userFirstNameAttributeName*

|The attribute on person objects in LDAP to map to the first name property of a user

|givenName

|givenName

|
|*ldap.synchronization.userLastNameAttributeName*

|The attribute on person objects in LDAP to map to the last name property of a user

|sn

|cn

|
|*ldap.synchronization.userEmailAttributeName*

|The attribute on person objects in LDAP to map to the email property of a user

|mail

|mail

|
|*ldap.synchronization.userType*

|The person type in the directory server.

|inetOrgPerson

|user

|

You can configure which users should be made administrators in the system. Delimit multiple entries with a ; \(Semi-colon\) as commas can’t be used.

**Notes**:

-   No trimming of spaces will be applied.

-   The property value must be an exact string match to the user DN value not an LDAP/AD query string.


```
ldap.synchronization.tenantAdminDn=uid=joram,ou=users,dc=alfresco,dc=com;uid=tijs,ou=users,dc=alfresco,dc=com
```

When using multi-tenancy, the administrator of all tenants can be configured as follows. Similar rules for delimiting apply as above.

**Note:** The property value must be an exact string match to the user DN value not an LDAP/AD query string.

```
ldap.synchronization.tenantManagerDn=uid=joram,ou=users,dc=alfresco,dc=com
```

It’s important to set at least 1 user with admin rights. Otherwise no user will be able to sign into the system and administer it.

**Parent topic:**[Synchronization](../topics/synchronization.md)

