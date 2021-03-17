---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Managing the authentication chain

Use these instructions to add and configure the authentication chain.

1.  Open the Admin Console.

2.  In the Directories section, click **Directory Management**.

    You see the Directory Management page.

3.  In the **Authentication Chain** section, specify the name of the new directory in the **Name:** field.

4.  Specify the authentication subsystem type from the **Type:** menu.

    **Note:** If you have an **External** authentication type, the relevant directory will always appear as the first item in the chain.

5.  Click **Add**.

    The new authentication chain appears in the table.

    The Authentication Chain table has the following fields:

    -   Order: Use the up and down arrows to reorder the authentication chain.
    -   Name: Specifies the name of the authentication chain.
    -   Type: Specifies the authentication subsystem type, such as OpenLDAP, Active Directory, Passthru, Kerberos, and External.
    -   Enables: Specifies if authentication is enabled or not.
    -   Synchronized: Specifies if the authentication chain is synchronized or not.
    -   Actions: Enables you to perform specific actions on the selected authentication chain, such as:
        -   Edit: Enables you to configure the authentication directories. See [Managing authentication directories](../concepts/adminconsole-directorymgt-cp.md) for more information.
        -   Test: Enables you to run an authentication test. To process the test request, you need a valid user name and password.
        -   Reset: Enables you to reset the directory to its initial settings or default values. You will lose all changes you have made to this directory since it was created.
        -   Remove: Removes the directory from the authentication chain list.
        -   Test synchronize: Enables you to check if synchronization is configured correctly.
    **Note:** You can only edit a directory after it has been added and saved. If you have not yet saved the entry, the only option available is Remove.

6.  To manage the synchronization of Alfresco with all the user registries \(LDAP servers\) in the authentication chain, click **Synchronization Settings**.

    You see the Synchronization Settings page. See [Synchronization Settings](adminconsole-directorymgt-ss.md) for more information.

7.  To start the user directory sync of all users and groups, click **Run Synchronize**.

8.  Click **Save** to apply the changes you have made to the authentication chain.

    If you do not want to save the changes, click **Cancel**.


-   **[Managing authentication directories](../concepts/adminconsole-directorymgt-cp.md)**  
The authentication subsystem support certain properties that can be configured to integrate the subsystem with Alfresco. This topic describes how to manage the various subsystems using their configuration properties.
-   **[Managing synchronization settings](../tasks/adminconsole-directorymgt-ss.md)**  
The synchronization settings manage the synchronization of Alfresco with all the user registries \(LDAP servers\) in the authentication chain. This topic describes how to configure the synchronization subsystem.

**Parent topic:**[Managing authentication directories](../concepts/adminconsole-directorymgt.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

