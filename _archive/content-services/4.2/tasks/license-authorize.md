---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Authorize users

Registered users are authorized the first time they login to Alfresco unless they are Alfresco administrators, in which case they are pre-authorized.

When the user first logs in to Alfresco using their user name and password, the login mechanism validates the login credentials. If the system is within the license limit, the user can successfully login to Alfresco, otherwise the login attempt fails and the user remains in the *Never Authorized* state. Periodically, the Authorization Audit Service job runs to check usage conforms to the license limit. The period at which the Authorization Audit Service job runs is set to default values in repository.properties as follows:

```

# Configuration of the Authorization Audit trigger                                                                                                                   
# By default every second day of the week at 03:00                                                                                                                   
authorization.audit.day=2
authorization.audit.hour=3
authorization.audit.minute=0        
      
```

These properties can be overridden in alfresco-global.properties.

To authorize an administrative user, follow the steps below:

1.  Click **Admin Tools**, and then click **Groups**.

2.  On the **Groups** page, click **Browse**.

    The leftmost pane shows all the top-level user groups.

3.  From the user groups list, click `ALFRESCO_ADMINISTRATORS`.

4.  To add a user, click the **Add User** icon. Using the search feature provided, locate the user you want to add to the selected group. Click **Add** to the right of the user.

    The individual user is added as a child to the `ALFRESCO_ADMINISTRATORS` group.

5.  On the **Admin Tools** page, click **Users**.

    The **User Search** page displays a list of all users along with their authorisation status. The authorization state of the user added to the `ALFRESCO_ADMINISTRATORS` group has changed from `Never Authorized` to `Authorized`.


**Note:** To enable an Alfresco administrator to perform the administrative tasks, members of the `ALFRESCO_ADMINSTRATORS` permissions group are automatically authorised, if they are not already authorised.

**Parent topic:**[Alfresco user licensing](../concepts/license-process.md)

**Related information**  


[Creating a new user](admintools-user-create.md#four)

