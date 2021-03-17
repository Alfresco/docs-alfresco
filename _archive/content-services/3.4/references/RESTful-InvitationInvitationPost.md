---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create invitation for web site

Create a new invitation for this web site.

`POST /alfresco/service/api/sites/{shortname}/invitations`



For a Nominated Invitation, where an existing site member nominates someone else who is possibly not yet an alfresco user to become a member of this web site.

For an existing user, the invitee is identified by inviteeUserName. For a user who does not have a userName a new account will be generated based upon inviteeFirstName, inviteeLastName and inviteeEmail

if inviteeUserName is specified then inviteeFirstName, inviteeLastName and inviteeEmail are ignored.

-   **invitationType**

    mandatory - "NOMINATED"

-   **inviteeFirstName**

    optional

-   **inviteeLastName**

    optional

-   **inviteeEmail**

    optional

-   **inviteeUserName**

    optional

-   **serverPath**
-   **acceptURL**
-   **rejectURL**
-   **inviteeRoleName**

    mandatory what role to be given on this web site


For a Moderated Invitation, where an existing user wants to be made a member of a moderated web site.

-   **invitationType**

    mandatory - "MODERATED"

-   **inviteeUserName**

    optional who wants to be invited to this web site?

-   **inviteeComments**

    mandatory \(but can be blank\) why do they want membership to this site ?

-   **inviteeRoleName**

    mandatory what role to be given on this web site


Returns HTTPStatus.Created \(201\) if an invitation is created.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Invitation](../references/RESTful-Invitation.md)

