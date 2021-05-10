---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring a CloudFront publishing channel

Configure a publishing channel to allow you upload and manipulate content in the Amazon CloudFront Content Delivery Network \(CDN\).

Ensure that you have installed the required external and internal software before configuring the transformer. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) and [Installing Media Management](mm-install.md) for more information. Make sure you have your Amazon S3 account set up.

1.  Start Alfresco Share and click Admin Tools from the toolbar, and Content Publishing \> Channel Manager.

    The Channel Manager section lists the channels that are configured for users to publish media. Channels available include Brightcove and CloudFront.

2.  Click New and the CloudFront channel type.

    A Channel Authentication screen is displayed.

3.  Enter your AWS credentials in the User Name and Password fields.

    Use your S3 access key in the User Name field, and your S3 secret key in the Password field.

    A new channel is created.

4.  You can edit the user groups and permissions \(using the Permissions option\), or reauthorize with new credentials or delete the channel.

    Additionally, if you click the icon for the channel you created, an Edit Channel window appears. From this window you can perform these actions:

    -   Edit the name of the channel
    -   S3 Bucket Name: define the Amazon S3 bucket that is used for the channel \(mandatory field\)
    -   S3 Path: define the Amazon S3 path
    -   S3 Region: define the Amazon S3 region
    -   Distribution Domain Name: define the preferred domain name for distribution
    You can create channels for different S3 buckets, paths or distribution domain names; for example, a campaign-specific channel for Marketing, and a web channel for final website content.


**Parent topic:**[Configuring publishing channels for Media Management](../concepts/mm-config-publish-channels.md)

