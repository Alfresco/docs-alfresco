---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Process invite

Processes Inviter actions \('start' or 'cancel' invite\).

`GET /alfresco/service/api/invite/start?inviteeFirstName={inviteeFirstName}&inviteeLastName={inviteeLastName}&inviteeEmail={inviteeEmailAddress}&inviteeUserName={inviteeUserName?}&siteShortName={siteShortName}&inviteeSiteRole={inviteeSiteRole}&serverPath={serverPath}&acceptUrl={acceptUrl}&rejectUrl={rejectUrl}`

`GET /alfresco/service/api/invite/cancel?inviteId={inviteId}`

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Invite](../references/RESTful-Invite.md)

