---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Creating a new user

Create user accounts with the **Users** option.

1.  Click **Admin Tools**, and then click **Users**.

    You'll see the User Search page.

2.  Click **New User**.

    The New User page appears. Fields marked with an asterisk \(\*\) are required.

3.  Complete all the required user fields.

    |Field|What is it?|
    |-----|-----------|
    |**First Name**|Type the first name of the new user.|
    |**Email**|Type an email address that the user will use for receiving Alfresco notification emails.|
    |**User Name**|Type a user name for the new user.|
    |**Password**|Type a password for the user account. **Note:** Enter a minimum of five characters otherwise you'll not be able to see the **Create User** button.

|
    |**Verify Password**|Repeat the password. Make sure that you type the same password you typed in the **Password** field.|

4.  Add the user to existing user groups:

    1.  In the search box, type the full or partial name of a group.

        You must enter a minimum of one \(1\) character. The search is not case sensitive.

    2.  Click **Search**.

    3.  In the list of returned results, click **Add** to the right of each group you want the user to be added to.

        The groups appear beneath the Groups list. Click a group to remove it.

    4.  Perform additional searches as necessary to locate and add more groups.

5.  In the **Quota** box, specify the maximum space available for this user and select the appropriate unit \(GB, MB, or KB\).

    This information is not required. When no quota is provided, the user has no space limitations.

    Content quotas are disabled by default. You can change the default setting by adding the following property to the alfresco-global.properties file: `system.usages.enabled=true`. 

6.  Click **Create User**.

    **Note:** The create buttons are not available until you complete all the required fields. If you didn't type in matching passwords, you'll see a message to say that the password fields do not match.

    If you intend to immediately create another user, click **Create and Create Another**. This creates the user account specified and clears the fields without returning you to the User Search page.


**Parent topic:**[Managing users](../concepts/admintools-users-intro.md)

