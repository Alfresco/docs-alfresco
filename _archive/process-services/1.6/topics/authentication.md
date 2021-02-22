# Authentication

To enable authentication via LDAP or AD, set the following property:

```
ldap.authentication.enabled=true
```

In some organizations, a case insensitive log in is allowed with the LDAP ID. By default, this is disabled. To enable, set following property to `false`.

```
ldap.authentication.casesensitive=false
```

Next, a property `ldap.authentication.dnPattern` can be set:

```
ldap.authentication.dnPattern=uid={0},ou=users,dc=alfresco,dc=com
```

However, if the users are in structured folders \(organizational units for example\), a direct pattern cannot be used. In this case, leave the property either empty or comment it out. Now, a query will be performed using the `ldap.synchronization.personQuery` \(see below\) with the `ldap.synchronization.userIdAttributeName` to find the user and their distinguished \(DN\) name. That DN will then be used to sign in.

When using Active Directory, two additional properties need to be set:

```
ldap.authentication.active-directory.enabled=true
ldap.authentication.active-directory.domain=alfresco.com
```

The first property enables Active Directory support and the second property is the domain of the user ID \(that is, userId@domain\) to sign in using Active Directory.

If the domain does not match with the rootDn, it is possible to set is explicitly:

```
ldap.authentication.active-directory.rootDn=DC=somethingElse,DC=com
```

And also the filter that is used \(which defaults to a userPrincipalName comparison\) can be changed:

```
ldap.authentication.active-directory.searchFilter=(&(objectClass=user)(userPrincipalName={0}))
```

**Parent topic:**[External Identity Management \(LDAP/Active Directory\)](../topics/externalIdentityManagement.md)

