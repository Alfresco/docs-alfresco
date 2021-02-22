---
author: Alfresco Documentation
---

# `inviteNominated` \(existing user\)

`inviteNominated\(inviteeUserName, inviteeRole, acceptUrl, rejectUrl\)` creates a new nominated invitation to this web site for an existing user.

## Parameters

-   **inviteeUserName**

    A string representing the invitee's user name.

-   **inviteeRole**

    A string representing the invited user's role, for example: Manager, Collaborator, Contributor, Consumer.

-   **acceptUrl**

    A string representing the URL corresponding to acceptance of the invitation.

-   **rejectUrl**

    A string representing the URL corresponding to rejection of the invitation.


## Returns

A `ScriptInvitation` object.

**Parent topic:**[Site object](../references/API-JS-Site.md)

