---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Inviting people to a site

The site manager can invite both internal and external users to join the site.

1.  Click ![Invite to Site](../images/invite-to-site-icon.png) in the site you want to invite people to, or click **Invite** in the Site Members dashlet.

    **Tip:** You can also invite people directly from the Members page.

    **Important:** You must be a manager to send invitations.

2.  Search for and add internal users.

    1.  In the Search for People box, type the full or partial name of the user you want to invite.

        You must enter a minimum of one \(1\) character. The search is not case sensitive.

    2.  Click **Search**.

    3.  Click **Add** to the right of the user you want to invite.

        The user is added to the Invite Users box.

3.  Add an external user.

    1.  In the Add External Users box, type the first and last name of the person you want to invite. This will be someone who does not have an Alfresco user account.

    2.  In the **Email** box enter the email address you want to send the invitation to.

    3.  Click **Add**.

        The user is added to the **Invite Users** list.

    **Note:** This feature is disabled if your installation doesn't support inviting new users. Talk to your system administrator about enabling this feature with the `notification.email.siteinvite` property. See [OutboundSMTP configuration properties](../concepts/email-outboundsmtp-props.md) for more information.

    **Note:** External users are a way for users without Alfresco Administrator permissions to add a user to Alfresco. When they accept the invite they will have the same access as a standard user, and will be counted against licensing.

4.  In the Invite Users box, specify a role for each user.

    -   To set the role for an individual user, click **Select Role** to the right of the user and select a role.
    -   To set the same role for all users in the list, click **Set All Roles to** at the top of the list and select a role.
    **Note:** You can click **back to Site Members** to return to the Search for Site Members page without sending any invitations.

5.  Click **Invite** to send the invitations.

    **Note:** To send and receive site invitations the appropriate options have to be set for outbound emails. Only the system administrator can configure these settings. If you receive a failure notification, contact your system administrator.


Each user in the Invite Users box receives an email invitation from **invites@alfresco.com**. The users can accept or reject the invitation.

**Parent topic:**[Managing site members](../concepts/members-manage.md)

