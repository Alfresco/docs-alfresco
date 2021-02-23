---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Admin password in default authentication

This topic explains how the password for the Admin user is used by the default authentication system.

The Admin password for default authentication is set as a part of the initial bootstrap. This is located in config\\alfresco\\bootstrap\\alfrescoUserStore.xml. The password is MD4 encoded, as required by NTLM.

**How to reset the Admin password**

If you happen to lose or forget the password for the Admin user, you can reset the password within the database using any one of the following ways:

-   If you know the password of at least one user, then:

1.  Assign Admin rights to this known user by adding the following line in the alfresco-global.properties file.

    ```
    alfresco_user_store.adminusername=username
    ```

    where, `username` is the user name of the user whose password is known.

2.  Restart the repository.
3.  Log in as the known user.
4.  Reset the Admin user's password.
5.  Reset the configuration.

-   You can reset the Admin password without knowing any user password by following the steps below:

1.  Configure the authentication component to accept all logins using `org.alfresco.repo.security.authentication.SimpleAcceptOrRejectAllAuthenticationComponentImpl`.
2.  Login as a user with Admin rights.
3.  Reset the Admin user's password.
4.  Revert the configuration.

-   You can also change the password directly in the database with the following instructions \(for version 3.1 or later\):

1.  Run the following command to find out the identifying parameters for how the Admin password is stored. Check that you have only one row in the output.

    ```
    SELECT anp1.node_id,
           anp1.qname_id,       
           anp1.string_value       
    FROM alf_node_properties anp1  
       INNER JOIN alf_qname aq1 ON aq1.id = anp1.qname_id   
       INNER JOIN alf_node_properties anp2 ON anp2.node_id = anp1.node_id    
       INNER JOIN alf_qname aq2 ON aq2.id = anp2.qname_id                    
    WHERE aq1.local_name = 'password'
    AND aq2.local_name = 'username'
    AND anp2.string_value = 'admin'
    ```

    The output shows the current MD4 hashed password for the Admin user. Here's an example output:

    ```
    +---------+----------+----------------------------------+
    | node_id | qname_id | string_value |                     
    +---------+----------+----------------------------------+
    | 4 | 10 | 209c6174da490caeb422f3fa5a7ae634 |                
    +---------+----------+----------------------------------+
    1 row in set (0.00 sec)
    ```

2.  To update the password, use the following command:

    ```
    UPDATE alf_node_properties  
     SET string_value='209c6174da490caeb422f3fa5a7ae634'
     WHERE  
     node_id=THENODEIDABOVE
     and
     qname_id=THEQNAMEVALUEABOVE
    ```

    where you need to replace `THENODEIDABOVE` and `THEQNAMEVALUEABOVE` with the result values of `node_id` and `qname_id`, obtained in the previous step. In this example, it is `4` and `10`, respectively.

    **Note:** Ensure that you use appropriate `AND` conditions in the `UPDATE` query.

    **Note:** The hashed password you use in the `UPDATE` statement must be in lower case. If you use a hash tool that returns a string with uppercase letters, change them all to lowercase.

3.  Restart Alfresco.

**Parent topic:**[Setting up Alfresco authentication and security](../concepts/auth-intro.md)

