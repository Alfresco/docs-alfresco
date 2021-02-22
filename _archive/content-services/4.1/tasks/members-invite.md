---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Inviting users to a site

The site manager can send invitations to both internal and external users to join the site.

This task assumes you are in the Members component of the desired site.

This is a multi-part process where you select the users to invite, assign a role to each user, and then issue the invitations. The available user roles are Manager, Collaborator, Contributor, and Consumer.

1.  Click **People** beneath the banner if this page is not already selected.

2.  Click **Invite People**.

    **Tip:** The **Invite** link on the banner is a shortcut to this page.

3.  Search for and add internal users.

    1.  In the **Search for People** box type the full or partial name of the user you want to invite.

        You must enter a minimum of one \(1\) character. The search is not case sensitive.

    2.  Click **Search**.

        The list displays all users matching the specified search criteria.

    3.  Click **Add** to the right of a user you want to send an invitation to.

        The user appears in the **Invite Users** box.

4.  Add an external user.

    1.  In the **Add External Users** box type the **First Name** and **Last Name** of the person you want to invite. This will be someone who does not have an Alfresco user account.

    2.  In the **Email** box provide an email address.

        This is the email address the invitation will be sent to.

    3.  Click **Add**.

        The user appears in the **Invite Users** list.

    **Note:** This feature is disabled if your installation doesn't support inviting new users. Talk to your system adminstrator about enabling this feature with the `notification.email.siteinvite` property. See [OutboundSMTP configuration properties](../concepts/email-outboundsmtp-props.md) for more information.

5.  In the **Invite Users** box specify a role for each user.

    -   To set the role for an individual user, click **Select Role** to the right of the user and click the desired role.
    -   To set the same role for all users in the list, click **Set All Roles to** at the top of the list and click the desired role.
    **Note:** Click **back to Site Members** to return to the Search for Site Members page without sending any invitations.

6.  Click **Invite** beneath the **Invite Users** box to extend invitations to all users displayed in the list.

    **Note:** In order to send and receive site invitations the appropriate options must be set for outbound emails. Only the system administrator can configure these settings. If you receive a failure notification after issuing the invitation contact your system administrator.


Each user in the **Invite Users** box receives an email invitation from **invites@alfresco.com**. The users can accept or reject the invitation.

**Parent topic:**[Viewing site members](../tasks/members-view.md)

