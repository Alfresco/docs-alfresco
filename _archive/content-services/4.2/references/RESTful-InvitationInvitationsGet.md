---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# List invitations

Get a collecton of a site web invitations.

`GET /alfresco/service/api/sites/{shortname}/invitations?inviteeUserName={inviteeUserName?}&invitationType={invitationType?}`



With no parameters, returns all open invitations for this web site.

With inviteeUserName, returns all open invitations for this web site and invitee.

With invitationType, returns all open invitations of the specified type \(Either NOMINATED or MODERATED\).

Returns a JSON element



The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Invitation](../references/RESTful-Invitation.md)

