# Batch insert

It is possible to tweak the *batch size* when doing an LDAP sync.

The *insert* batch size limits the amount of data being inserted in one transaction \(for example, 100 users per transactions are inserted\). By default, this is 5. The *query* batch size is used when data is fetched from the Alfresco Process Services database \(for example, fetching users to check for deletions when doing a full sync\).

```
ldap.synchronization.db.insert.batch.size=100
ldap.synchronization.db.query.batch.size=100
```

**Parent topic:**[Synchronization](../topics/synchronization.md)

