---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Channel Authorisation Form

Used to post back credentials to publish to a channel.

`POST /alfresco/service/api/publishing/channels/{store_protocol}/{store_id}/{node_id}/authform`

Returns a JSON object with one text property: "authStatus". This property has one of three values: "AUTHORISED", "RETRY", or "UNAUTHORISED". The RETRY status indicates that the last authorisation attempt failed, but the user may retry at least once more.

The web script description document specifies the following options:

|`html`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Publishing](../references/RESTful-Publishing.md)

