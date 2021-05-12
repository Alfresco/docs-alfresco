---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring the Zencoder content transformer

Brightcove Zencoder is supported for remote video transcoding with Amazon S3. If you are using this transformer, configure your connection using alfresco-global.properties.

Ensure that you have installed the required external and internal software before configuring the transformer. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) and [Installing Media Management](mm-install.md) for more information. Make sure you have your Zencoder and S3 accounts set up.

1.  Stop the Alfresco server.

2.  Edit your alfresco-global.properties file to specify your Zencoder API key, S3 keys and S3 bucket information; for example:

    ```
    content.transformer.Zencoder.apiKey=MY-ZENCODER-KEY
    content.transformer.Zencoder.s3.accessKey=MY-AWS-KEY
    content.transformer.Zencoder.s3.secretKey=MY-AWS-SECRET
    content.transformer.Zencoder.s3.bucketName=MY-BUCKET-NAME
    content.transformer.Zencoder.s3.bucketLocation=EU 
    
    ```

    A sample alfresco-global.properties file is shipped in the root folder of the Media Management distribution zip, which defines custom properties. See [Configuring Media Management](mm-props-config.md) for the full list.

    You can find your Zencoder API key at [API](https://app.zencoder.com/api) and your S3 details in your AWS S3 settings.

    For more information on using Zencoder with S3, see [Using Zencoder with S3](https://app.zencoder.com/docs/guides/getting-started/working-with-s3).

3.  Start your Alfresco server to apply the changes.


**Parent topic:**[Configuring transformation services for Media Management](../concepts/mm-config-remote.md)

