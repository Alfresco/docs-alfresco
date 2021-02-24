---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Adding users to a site

Site managers can quickly add users to a site.

You can add any user, either internal to your organization or an external user.

**Note:** External users can only be added if your Alfresco administrator has [enabled the external users panel](share-enable-external-user.md).

1.  Click ![Invite to Site](../images/invite-to-site-icon.png) in the site you want to add users to, or click **Add Users** in the Site Members dashlet.

    **Tip:** You can also open the Add Users page directly from the Site Members page.

    **Important:** You must be a site manager to add a user.

2.  Enter a search term such as a user name and click **Search**.

    **Tip:** You need to enter at least one character. The search is not case sensitive.

    **Note:** If you don't see any users then try a different search term and check that your Alfresco administrator has [created users](../concepts/admintools-users-intro.md).

3.  Click **Select** for each user you want to add.

4.  Set the site role for each user, or use **Set all roles to** to assign the same role to all users. This controls what the user can do in the site.

    **Tip:** See [User roles and permissions](../references/permissions_share.md) for more about site roles.

    Once you've selected site roles for all the users you've selected, the **Add Users** button will be switched on.

5.  Click **Add Users**.

    A message displays showing the number of users you've added. All these users receive an email notification and can now use the site. You can continue to add more users as required.

    **Note:** This feature is disabled if your installation doesn't support inviting new users. Talk to your system administrator about enabling this feature with the `notification.email.siteinvite` property. See [Outbound SMTP configuration properties](../concepts/email-outboundsmtp-props.md) for more information.


**Parent topic:**[Managing site members](../concepts/members-manage.md)

