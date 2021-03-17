# Synchronization log entries

When a synchronization is executed, a log is kept. This log contains all information about the synchronization: users/groups that are created, updates of existing users/groups, membership additions/deletions and so on.

To access the log entries, an HTTP REST call can be done:

```
GET /api/enterprise/idm-sync-log-entries
```

Which returns a result like this \(only an initial synchronization happened here\):

```
[{"id":1,"type":"initial-ldap-sync","timeStamp":"2015-10-16T22:00:00.000+0000"}]
```

This call uses the following url parameters:

-   *tenantId*: Defaults to the `tenantId` of the users

-   *start* and *size*: Used for getting paged results back instead of one \(potentially large\) list.


Note that this call can only be done by a *tenant administrator*, or *tenant manager* in a multi-tenant setup.

We can now get the detailed log for each sync log entry, by taking an id from the previous response:

```
GET /api/enterprise/idm-sync-log-entries/{id}/logfile
```

This returns a .log file that contains for our example implementation

```
created-user: created user John Lennon (email=john.lennon@thebeatles.com) (dn=jlennon)
added-capability: added capability tenant-mgmt to user jlennon
created-user: created user Ringo Starr (email=ringo.starr@thebeatles.com) (dn=rstarr)
created-user: created user George Harrison (email=george.harrison@beatles.com) (dn=gharrison)
created-user: created user Paul McCartney (email=paul.mccartney@beatles.com) (dn=pmccartney)
created-group: created group beatles
added-user-to-group: created group membership of user jlennon for group beatles
added-user-to-group: created group membership of user rstarr for group beatles
added-user-to-group: created group membership of user gharrison for group beatles
added-user-to-group: created group membership of user pmccartney for group beatles
created-group: created group singers
added-user-to-group: created group membership of user jlennon for group singers
added-user-to-group: created group membership of user pmccartney for group singers
```

**Parent topic:**[Custom identity synchronization](../topics/custom_identity_synchronization.md)

