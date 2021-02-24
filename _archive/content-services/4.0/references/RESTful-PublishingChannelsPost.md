---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create a publishing channel

Create a new publishing channel using the supplied information.

`POST /alfresco/service/api/publishing/channels`



-   **channelType**

    mandatory - the type of delivery channel to create

-   **siteId**

    mandatory - the Share site with which the new delivery channel is to be associated

-   **channelName**

    mandatory - the name of the new delivery channel


Returns three pieces of informtation:

-   **channelId**

    the identifier of the new publishing channel

-   **pollUrl**

    The URL to poll to discover whether the channel has been authorised

-   **authoriseUrl**

    The URL to send the user to in order for them to authorise access to the channel

-   **authCallbackUrl**

    The URL to return the channel authorisation details to

-   **authRedirectUrl**

    The URL to which the channel service provider will redirect the user upon authorisation


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Publishing](../references/RESTful-Publishing.md)

