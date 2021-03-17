---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: inviteNominated
---

# `inviteNominated` \(new user\)

`inviteNominated\(inviteeFirstName, inviteeLastName, inviteeEmail, inviteeRole, acceptUrl, rejectUrl\)` this method creates a new nominated invitation to this web site for a new user who may not already be an Alfresco user.

## Parameters

-   **inviteeFirstName**

    A string representing the invited user's first name.

-   **inviteeLastName**

    A string representing the invited user's last name.

-   **inviteeEmail**

    A string representing the invited user's email address.

-   **inviteeRole**

    A string representing the invited user's role, for example: Manager, Collaborator, Contributor, Consumer.

-   **acceptUrl**

    A string representing the URL corresponding to acceptance of the invitation.

-   **rejectUrl**

    A string representing the URL corresponding to rejection of the invitation.


## Returns

A `ScriptInvitation` object.

**Parent topic:**[Site object](../references/API-JS-Site.md)

