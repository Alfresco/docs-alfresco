---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Cancel invitation

Cancel an open invitation.

`DELETE /alfresco/service/api/sites/{shortname}/invitations/{invitationId}`



Canceling an invitation immediatly stops the invitation. This is different to rejecting an invitation, which will result in the invitation workflow continuing to a normal but rejected conclusion. In particular, the approver or invitee are not notified if an invitation is canceled.

Only a site manager may cancel an nominated invitation.

A site manager or the invitee may cancel a moderated invitation.

Returns 200, STATUS\_OK on success.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Invitation](../references/RESTful-Invitation.md)

