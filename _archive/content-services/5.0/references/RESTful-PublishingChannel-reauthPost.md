---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Reauthorise the specified publishing channel

Initiate an attempt to reauthorise the specified publishing channel.

`POST /alfresco/service/api/publishing/channels/{store_protocol}/{store_id}/{node_id}/reauthorise`



Response status may be:

-   **200**

    The body of the response contains the necessary information to continue the reauthorisation process

-   **400**

    invalid data received from caller

-   **404**

    the specified channel cannot be found


Returns three pieces of informtation:

-   **channelId**

    the identifier of the publishing channel

-   **authoriseUrl**

    The URL to send the user to in order for them to authorise access to the channel

-   **authCallbackUrl**

    The URL to return the channel authorisation details to

-   **authRedirectUrl**

    The URL that the channel service provider will try to redirect the user to


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Publishing](../references/RESTful-Publishing.md)

