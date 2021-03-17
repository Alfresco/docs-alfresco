# Paging

It is possible to use paging when connecting to an LDAP server \(some even mandate this\).

To enable paging when fetching users or groups, set following properties:

```
ldap.synchronization.paging.enabled=true
ldap.synchronization.paging.size=500
```

By default, paging is disabled.

**Parent topic:**[Synchronization](../topics/synchronization.md)

