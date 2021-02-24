---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring a Brightcove publishing channel

Configure a publishing channel to allow you upload and manipulate content in the Brightcove Content Delivery Network \(CDN\).

Ensure that you have installed the required external and internal software before configuring the transformer. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) and [Installing Media Management](mm-install.md) for more information. Make sure you have your Zencoder account set up.

1.  Start Alfresco Share and click Admin Tools from the toolbar, and Content Publishing \> Channel Manager.

    The Channel Manager section lists the channels that are configured for users to publish media. Channels available include Brightcove and CloudFront.

2.  Click New and the Brightcove channel type.

    A Channel Authentication screen is displayed.

3.  Enter your Brightcove credentials in the User Name and Password fields.

    You can use a write token in the Password field on the Channel Authentication screen. The User Name field is ignored.

    [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens) provides information on how to identify your write token.

    A new channel is created.

4.  You can edit the user groups and permissions \(using the Permissions option\), or reauthorize with new credentials or delete the channel.

    Additionally, if you click the icon for the channel you created, an Edit Channel window appears. From this window you can:

    -   Edit the name of the channel
    -   Create Multiple Renditions: select whether to allow renditions for a variety of encoding rates and dimensions
    -   Publish Description: select whether a node's description field is passed to Brightcove
    -   Publish Tags: select whether a node's tags are passed to Brightcove
    -   Additional Tags: define a comma separated list of Brightcove tags to be added to all published nodes
    Further options are detailed in the [Brightcove API documentation](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html).


**Parent topic:**[Configuring publishing channels for Media Management](../concepts/mm-config-publish-channels.md)

