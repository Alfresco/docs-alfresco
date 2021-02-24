---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Inviting users to a site

Invitations allows you to invite both internal and external users to join the current site. This is a multi-part process where you select the users to invite, assign a role to each user, and then issue the invitations. The available user roles are Manager, Collaborator, Contributor, and Consumer.

This task assumes you are in the Members page component of the desired site.

1.  Click **People** beneath the banner if this page is not already selected.

2.  Click **Invite People**.

    **Note:** The **Invite** link on the banner is a shortcut to this page.

3.  Search for and add internal users.

    1.  In the **Search for People** box, type the full or partial name of the user you want to invite. You must enter a minimum of one \(1\) character. The search is not case sensitive.

    2.  Click **Search**.

        The application displays a list of all users matching the specified search criteria.

    3.  Click **Add** to the right of a user in this list.

        The user appears in the **Invite Users** box.

4.  Add an external user.

    1.  In the **Add External Users** box, type the **First Name** and **Last Name** of the external user you are inviting to the site.

    2.  In the **Email** box, type the email address of the external user.

        This is the email address through which the invitation will be extended.

    3.  Click **Add**.

        The user appears in the **Invite Users** list.

    **Note:** This feature is disabled if your installation doesn't support inviting new users. Talk to your system adminstrator about enabling this feature with the `notification.email.siteinvite` property. See [OutboundSMTP configuration properties](../concepts/email-outboundsmtp-props.md) for more information.

5.  In the **Invite Users** box, specify a role for each user.

    -   To set the role for an individual user, click **Select Role** to the right of the user and click the desired role.
    -   To set the same role for all users in the list, click **Set All Roles to** at the top of the list and click the desired role.
6.  Click **Invite** beneath the **Invite Users** box to extend invitations to all users displayed in the list.


Each user in the **Invite Users** box receives an email invitation from **invites@alfresco.com**. The users have the option to accept or reject the invitation to become a member of the site.

**Parent topic:**[Viewing site members](../tasks/members-view.md)

**Related information**  


[Entering a site](dashboard-site-enter.md)

[Accessing the Members page component](members-page-access.md)

