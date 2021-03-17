---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, ldap-ad subsystem, authentication]
---

# Applying the ldap-ad example

This example demonstrates how you can further delegate authentication responsibility to Active Directory, but you still do not have the automatic sign-on and CIFS browsing capabilities that are available to internal Alfresco users.

1.  Restart the Alfresco server.

    If you watch the output from Tomcat in the alfresco.log in the installation directory, you will eventually see lines similar to the following:

    ```
    13:01:31,225 INFO  
    [org.alfresco.repo.management.subsystems.ChildApplicationContextFactory] 
    Starting 'Synchronization' subsystem, ID: [Synchronization, default]
    
    …
    
    13:01:49,084 INFO  
    [org.alfresco.repo.security.sync.ChainingUserRegistrySynchronizer] 
    Finished synchronizing users and groups with user registry 'ldap1'
    
    13:01:49,084 INFO  
    [org.alfresco.repo.security.sync.ChainingUserRegistrySynchronizer] 
    177 user(s) and 19 group(s) processed
    
    13:01:49,131 INFO  
    [org.alfresco.repo.management.subsystems.ChildApplicationContextFactory] 
    Startup of 'Synchronization' subsystem, ID: [Synchronization, default] complete
    
    ```

    This is output is from the Synchronization subsystem, which is another Alfresco subsystem responsible for synchronizing the Alfresco internal user and authority database with all user registries in the authentication chain. Since the authentication chain now provides a user registry, the Synchronization subsystem has some work to do when Alfresco starts up.

2.  From the example logs, notice that the Synchronization subsystem automatically created 177 users and 19 groups using attributes, such as email address and group memberships, retrieved from Active Directory through an LDAP query. This reduces the workload of the administrator user.

    **Note:** The Synchronization subsystem uses an incremental timestamp-based synchronization strategy, meaning that it only queries for changes since the last synchronization run. So after the first start up, further synchronization runs can be almost instantaneous. Because synchronization runs are also triggered by a scheduled nightly job and whenever an unknown user successfully authenticates, you should find that Alfresco always stays synchronized with hardly any effort.

    Now, if you enter the Alfresco Explorer URL: http://localhost:8080/alfresco/ into your browser, you can log in using the ID and password of any of the Active Directory users.

    **Important:** Passwords are validated through an LDAP bind operation on Active Directory in real time. Passwords for Active Directory users are not stored locally.

3.  Navigate to a user profile.

    Notice that attributes such as email address were populated automatically from Active Directory.


**Parent topic:**[Example: authentication and synchronization with one ldap-ad subsystem](../tasks/auth-example-oneldap-ad.md)

