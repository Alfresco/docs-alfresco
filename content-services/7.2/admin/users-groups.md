---
title: Manage users and groups
---

Before you can set up any security you need users and groups to work with. Use this information to administer your users and groups in Content Services.

> **Note:** The Content Services repository would normally be connected to a directory service to sync users and groups into the database, see [Setting up authentication and sync]({% link content-services/7.2/admin/auth-sync.md %})

> **Note:** You can also test an alternative way of managing users and groups using containerized deployment. See [Alfresco Control Center]({% link content-services/7.2/admin/control-center.md %}).

## Manage users

The **Users** tool in the Share **Admin Tools** lets you create and manage the user accounts.

See also Users tool [video tutorial]({% link content-services/7.2/tutorial/video/index.md %}#create-users)

### Create new user

Create user accounts with the **Users** option.

1. Click **Admin Tools**, and then click **Users**.

    You'll see the **User Search** page.

2. Click **New User**.

    The **New User** page appears. Fields marked with an asterisk (*) are required.

3. Complete all the required user fields.

    | Field | Description |
    | ----- | ----------- |
    | First Name | Type the first name of the new user. |
    | Email | Type an email address that the user will use for receiving notification emails. |
    | User Name | Type a user name for the new user. |
    | Password | Type a password for the user account.<br><br>**Note:** Enter a minimum of five characters otherwise you'll not be able to see the **Create User** button. |
    | Verify Password | Repeat the password. Make sure that you type the same password you typed in the **Password** field. |

4. Add the user to existing user groups:

    1. In the search box, type the full or partial name of a group.

        You must enter a minimum of one (1) character. The search is not case sensitive.

    2. Click **Search**.

    3. In the list of returned results, click **Add** to the right of each group you want the user to be added to.

        The groups appear beneath the **Groups** list. Click a group to remove it.

    4. Perform additional searches as necessary to locate and add more groups.

5. In the **Quota** box, specify the maximum space available for this user and select the appropriate unit (GB, MB, or KB).

    This information is not required. When no quota is provided, the user has no space limitations.

    Content quotas are disabled by default. You can change the default setting by adding the following property to the `alfresco-global.properties` file: `system.usages.enabled=true`.

6. Click **Create User**.

    > **Note:** The create buttons are not available until you complete all the required fields. If you didn't type in matching passwords, you'll see a message to say that the password fields do not match.

    If you intend to immediately create another user, click **Create and Create Another**. This creates the user account specified and clears the fields without returning you to the User Search page.

### Upload multiple users

Use the Users tool to upload externally created users from within a comma-separated (CSV) file.

When initially setting up the accounts for your users, it can be time consuming to create multiple users individually. Content Services lets you create these users by uploading a file that contains the list of all your users. The file needs to contain the names and other details, separated by commas.

You can create this file, either from a text file or from a Microsoft Office spreadsheet. You need to create the file using named headings and the following order:

```text
User Name,First Name,Last Name,E-mail Address,,Password,Company,Job Title,Location,Telephone,Mobile,
Skype,IM,Google User Name,Address,Address Line 2,Address Line 3,Post Code,Telephone,Fax,Email
```

You don't need values for all the headings for each users. For example, the following sample shows the content of a CSV file using Microsoft Excel:

![sample_csv_file]({% link content-services/images/sample_csv_file.png %})

> **Note:** If the value for **Password** is blank, then the user will get a random password, and it'll be disabled. For the password to be enabled, the administrator must set a password for that user.

Save the file as a `.csv` file, which you can then upload.

![sample_csv_txt]({% link content-services/images/sample_csv_txt.png %})

1. Click **Admin Tools**, and then click **Users**.

    You'll see the **User Search** page.

2. Click **Upload User CSV File**.

3. Locate and upload the CSV file:

    1. Click the Select file(s) to upload icon.

    2. Browse for the CSV file containing the users.

        The CSV file has an extension of .csv.

    3. Select the file, and then click **Open**.

    4. Click **Upload File(s)**.

    The users from the CSV file are uploaded and you see the **Upload Results** page showing the list of user names and status. An email will be sent to the user informing them of their new user account.

### Search for and view user account

The User Search tool lets you locate any user and view that user's account information.

1. Click **Admin Tools**, and then click **Users**.

    You see the **User Search** page.

2. In the search box, enter the full or partial name of the user.

    The search is not case sensitive.

3. Click **Search**.

    In the results table, you can click the column headings to sort the results.

    In the first column, a green dot indicates the user account is currently enabled; a red dot indicates the account is disabled.

4. Click the name of a user to show the related user profile and account details.

You see the **User Profile** page. From here you can edit or delete the user account.

### Edit user account

Edit a user account to change a user's personal information, group affiliation, quota, and password.

1. Click **Admin Tools**, and then click **Users**.

    You'll see the **User Search** page.

2. Search for a user, and then select the user.

3. On the **User Profile** page, click **Edit User**.

    The **Edit User** page appears.

4. Edit the user's personal details as necessary: **First Name** and **Email**.

5. Edit the groups to which this user belongs:

    1. To add a user to a group, use the search field provided to locate a group. Click **Add** to the right of each group you want the user to be a part of. The groups the user belongs to display beneath the **Groups** list.

    2. To remove a user from a group, simply click the group you want to remove beneath the **Groups** list.

6. Provide or edit the **Quota**, which indicates the maximum space available for this user. Select the appropriate unit.

7. Change the password, if necessary.

8. Click **Use Default** to reset the user's picture to the default image.

9. Click **Save Changes**.

### Delete user account

Delete a user account to remove the user from the system.

> **Note:** Deleting a user removes their permissions from the repository. If you create a user with the same `userid` as a previously deleted user, the new user gets access to the original user's files but not their permissions as they're removed upon user deletion.

1. Click **Admin Tools**, and then click **Users**.

    You see the **User Search** page.

2. Search for a user, and then select the user.

3. On the **User Profile** page, click **Delete User**.

    A message prompts you to confirm that you want to delete the user account.

4. Click **Delete**.

### Disable user account

Use this information to disable a user account.

> **Note:** A disabled user can still log in to Alfresco using external authentication.

You perform this task as part of editing a user account.

1. Click **Admin Tools**, and then click **Users**.

    You see the **User Search** page.

2. Search for a user, and then select the user.

3. On the **User Profile** page, click **Edit User**.

    You see the **Edit User** page.

4. Click **Disable Account**.

    A check mark indicates the account for the current user will be disabled.

5. Click **Save Changes**.

    On the **User Profile** page, the Account Status shows as **Disabled**. On the **User Search** page, the user displays in the search results list with a red dot, indicating the account is disabled.

### Change user's password

You can change a user's password as part of editing the user account.

1. Click **Admin Tools**, and then click **Users**.

    You see the **User Search** page.

2. Search for a user, and then select the user.

3. On the **User Profile** page, click **Edit User**.

    You see the **Edit User** page.

4. Enter and confirm the new password for this user in the **New Password** and **Verify Password** boxes.

    The password is case sensitive.

5. Click **Save Changes**.

### Manage user's group membership

Within a user account, you can manage the user's membership in existing user groups. You can edit a user account at any time to add and remove the user from groups.

1. Click **Admin Tools**, and then click **Users**.

    You see the **User Search** page.

2. Search for a user, and then select the user.

3. On the **User Profile** page, click **Edit User**.

    You see the **Edit User** page.

4. Edit the groups to which this user belongs:

    1. To add a user to a group, use the search field provided to locate the group. Click **Add** to the right of each group you want the user to be a part of. The groups the user belongs to show beneath the **Groups** list.

    2. To remove a user from a group, simply click the group you want to remove beneath the **Groups** list.

5. Click **Save Changes**.

## Manage groups

The **Groups** tool in the Share **Admin Tools** lets you create and manage user groups.

See also Groups tool [video tutorial]({% link content-services/7.2/tutorial/video/index.md %}#create-groups).

### Browse user groups

The Groups page contains a multi-paned panel that lets you navigate the hierarchy of user groups.

1. Click **Admin Tools**, and then click **Groups**.

2. On the **Groups** page, click **Browse**.

    The leftmost pane displays all top-level user groups.

3. To view all groups, including the system groups, select the **Show System Groups** check box, and then click **Browse**.

    System groups are created in the background, for example, when you create a site. You can show these groups so that you can edit the **Display Name**, add users, or delete the group.

4. Click a group to display its contents in the panel directly to the right.

    The content can be subgroups and/or individual users. Text at the bottom of this panel indicates the number of groups and users that belong to the selected group.

5. As you browse the group structure, a navigation path is displayed at the top of the panel indicating your selections stemming from the initial pane. Click any link in this path to step back to that selection.

6. To browse a different group, click the first link in the navigation path to return to the top-level groups, then select a new group to browse.

### Search for group

The Search feature enables you to locate any user group, regardless of where it exists in the group hierarchy. Once located, you can edit or delete the group.

1. Click **Admin Tools**, and then click **Groups**.

2. In the search box, type the full or partial identifier, not display name.

    The search is not case sensitive.

3. Click **Search**.

    In the results table, click the column headings to sort the results as required.

### Create new group

Use the **Groups** tool to create both top level user groups and subgroups within existing groups.

1. Click **Admin Tools**, and then click **Groups**.

2. On the **Groups** page, click **Browse**.

    The leftmost pane displays all top-level user groups.

3. Navigate to the user group where you want to create the new group.

    * To create a top-level group, click the **New Group** icon at the top of the initial pane.
    * To create a subgroup, browse the group structure to locate the parent group. Select this group and then click the **New Subgroup** icon at the top of the pane immediately to the right.

    The **New Group** page appears. Fields marked with an asterisk (*) are required.

4. Complete the required fields.

    | Field | Description |
    | ----- | ----------- |
    | Identifier | This is a name that the system uses to identify the group. Once you've created the group, you can't change this identifier. |
    | Display Name | This is the group name that shows when you manage groups and also is the name shown to members of this group. |

5. Click **Create Group**.

    If you intend to immediately create another group at the same level, click **Create and Create Another**. This creates the group specified and clears the fields without returning you to the Groups page.

### Edit existing group

Edit a user group to change the group's display name. Once created, you can't edit the group's identifier.

1. Click **Admin Tools**, and then click **Groups**.

2. On the **Groups** page, click **Browse**.

    The leftmost pane shows all the top-level user groups.

3. Navigate the group structure or use the search feature to locate the user group you want to edit.

    The search is not case sensitive.

4. Position the cursor over a group to display its available actions, and then click the **Edit Group** icon.

5. Edit the group's **Display Name**.

6. Click **Save Changes**.

### Delete an existing group

Delete a user group to remove it from the system.

1. Click **Admin Tools**, and then click **Groups**.

2. On the **Groups** page, click **Browse**.

    The leftmost pane shows all the top-level user groups.

3. Navigate the group structure or use the search feature to locate the user group you want to delete.

    You must enter a minimum of one (1) character. The search is not case sensitive.

4. Position the cursor over a group to display its available actions.

5. Click the **Delete Group** icon.

    A message prompts you to confirm the deletion.

6. Click **Delete**.

### Manage group membership

To populate a user group, you can add both individual users and existing user groups.

1. Click **Admin Tools**, and then click **Groups**.

2. On the **Groups** page, click **Browse**.

    The leftmost pane shows all the top-level user groups.

3. Navigate the group structure to locate the user group you want to work with. Click a user group to select it.

4. Using the icons in the pane directly to the right of where you selected the group, perform the required action:

    1. To add a user, click the **Add User** icon. Using the search feature provided, locate the user you want to add to the selected group. Click **Add** to the right of the user.

    2. To add a group, click the **Add Group** icon. Using the search feature provided, locate the group you want to add to the selected group. Click **Add** to the right of the user.

    The individual user or group is added as a child to the group selected in the panel.
