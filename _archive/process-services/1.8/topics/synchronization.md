# Synchronization

The synchronization component will periodically query the IDM system and change the user and group database. There are two synchronization *modes*: full and differential.

Full synchronization queries **all** data from the IDM and checks every user, group, and membership to be valid. The resource usage is heavier than the differential synchronization in this type of synchronization and therefore, it is usually only triggered on the very first sync when Alfresco Process Services starts up and is configured to use an external IDM. This is so that all users and groups are available in the database.

**To enable full synchronization**:

The frequency in which it runs is set using a cron expression:

```
ldap.synchronization.full.enabled=true
ldap.synchronization.full.cronExpression=0 0 0 * * ?
```

Differential synchronization is *lighter*, in terms of performance, as it only queries the users and groups that have changed since the last synchronization. One downside is that it cannot detect deletions of users and groups. Consequently, a full synchronization needs to run periodically \(but less than a differential synchronization typically\) to account for these deletions.

```
ldap.synchronization.differential.enabled=true
ldap.synchronization.differential.cronExpression=0 0 */4 * * ?
```

Do note that all synchronization results are logged, both in the regular logging and in a database table named *IDM\_SYNC\_LOG*

The synchronization logic builds on two elements:

-   Queries that return the correct user/group/membership data

-   A mapping of LDAP attributes to attributes used within the Alfresco Process Services system


There are a lot of properties to configure, so do base your configuration on one of the two files in the *META-INF* folder, as these contain default values. You only need to add the specific properties to your custom configuration file if the default values are not appropriate.

-   **[Generic Synchronization settings](../topics/generic_synchronization_settings.md)**  
These are settings that are generic or shared between user and group objects. For each property, an example setting of a *regular* LDAP system \(that is, ApacheDS\) and Active Directory is shown.
-   **[User Synchronization Settings](../topics/user_synchronization_settings.md)**  

-   **[Group Synchronization Settings](../topics/group_synchronization_settings.md)**  

-   **[Adding users to an LDAP group](../concepts/adding_LDAP_users.md)**  
Active Directory sets a limit on the number of attributes stored in a group that are retrievable in a single query. To overcome this, you can use incremental retrieval of data. This involves limiting the number of attribute values in a single query. To reduce the number of times the query is required to contact the server, set the number of values requested as close, as possible, to the maximum.
-   **[Paging](../topics/paging.md)**  
 It is possible to use paging when connecting to an LDAP server \(some even mandate this\).
-   **[Batch insert](../topics/batch_insert.md)**  
 It is possible to tweak the *batch size* when doing an LDAP sync.

**Parent topic:**[External Identity Management \(LDAP/Active Directory\)](../topics/externalIdentityManagement.md)

