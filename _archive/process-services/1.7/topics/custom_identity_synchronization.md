# Custom identity synchronization

Alfresco Process Services needs user, group, and membership information in its database. The main reason is performance \(for example quick user/group searches\) and data consistency \(for example models are linked to users through foreign keys\). In the Process Services logic, this is typically referred to as Identity Management \(IDM\).

Out of the box, all IDM data is stored directly in the database. So when you create a user or group as a tenant administrator, the data ends up in the database tables.

However, typically, the users/groups of a company are managed in a centralized data store such as LDAP \(or Active Directory\). Process Services can be configured to connect to such a server and synchronize the IDM data to the database table.

See [External Identity Management \(LDAP/Active Directory\)](externalIdentityManagement.md#) for more information on how to set this up. The basic idea behind it is that the LDAP server will periodically be polled and the IDM data in the database tables will be synchronized: created, updated or deleted depending on what the LDAP server returns and what currently is in the database tables.

This section describes what is needed to have a similar synchronization of IDM data coming from another source. The `com.activiti.service.idm.LdapSyncService` responsible for synchronizing IDM data from an LDAP/Active Directory store, uses the same hook points as the ones described below and can thus be seen as an advanced example.

-   **[Example implementation](../topics/customIdmExample.md)**  
Create a simple example synchronization service that demonstrates clearly the concepts and classes to be used. In this example, use a simple text file to represent our *external IDM source*. The *users.txt* looks as follows \(each line is a user and user data is separated by semi-colons\):
-   **[Synchronization on boot](../topics/synchronization_on_boot.md)**  
On a first boot, all users/groups must sync for the first time, otherwise nobody would be able to log in. The LDAP synchronization logic does this automatically. When creating a custom synchronization service, a custom `BootstrapConfigurer` can be used to do the same thing:
-   **[Synchronization log entries](../topics/synchronization_log_entries.md)**  
When a synchronization is executed, a log is kept. This log contains all information about the synchronization: users/groups that are created, updates of existing users/groups, membership additions/deletions and so on.
-   **[Custom authentication](../topics/custom_authentication.md)**  
When using a custom external IDM source, you may need to authenticate against that source \(For example, LDAP\).

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

