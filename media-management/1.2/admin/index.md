---
title: Administering Media Management
---

This information helps you to monitor and administer Alfresco Media Management.

If you are backing up and restoring Media Management, use the standard Alfresco guidance: [Back up and restore](#LINK content-services/6.0/admin/backup-restore.md).

## Monitoring Media Management

You can monitor the flow of media events from the Alfresco repository through ActiveMQ and system logs.

1. Check the health of ActiveMQ, particularly that the following events are occurring:

    * **Topics > alfresco.health.contentservices** shows that heartbeats are being sent
    * **Queues > alfresco.transform.request.image, alfresco.transform.reply.image, alfresco.transform.request.video, and alfresco.transform.reply.video** are showing messages enqueuing and dequeuing
    ActiveMQ provides a web console:

    ```json
    http://localhost:8161/admin/
    ```

    where `localhost` is the name of the Alfresco server.

    You can also check the ActiveMQ log, which is located in `activemq/data/activemq.log` where `activemq` is the name of directory where you installed ActiveMQ.

    By default, subscribers are set to Active Durable Topic Subscribers to ensure that if ActiveMQ fails, messages are not lost.

    >**Note:** For technical reasons, Topics **> Messages Dequeued** never decrements. Do not monitor this queue.

2. Check the content services node log to monitor what is being transformed:

    * Port 8889 is reserved for the content services node. `http://localhost:8889/healthcheck` shows the last transformation after startup (but before any transformations). You should see:

        ```json
        {"FFmpeg":{"healthy":true},"ImageMagick":{"healthy":true},"deadlocks":{"healthy":true}}
        ```

        and after a transformation request:

        ```json
        {"FFmpeg":{"healthy":true,"message":"lastRequest: \"6075f46f-de9c-4232-aa78-d3ed1280a371\""},"ImageMagick":{"healthy":true},"deadlocks":{"healthy":true}}
        ```

    * Check the log, which is located in `remote-node/logs/content-services-node.log`, where `remote-node` is the name of directory that you unzipped when you installed Media Management.
    * You can change the log level of the content services node in the remote-node/config.yml file.
3. Check `alfresco.log`, after setting the log level to `debug`, for any errors.

4. Use the `log4j.properties.sample` file to add loggers to your `tomcat/webapps/alfresco/WEB-INF/classes/alfresco/module/org_alfresco_mm_repo/log4j.properties` file.

    A `log4j.properties.sample` file is provided in the Media Management installation zip. This file contains loggers that you can add to your Alfresco `log4j.properties` file to trace and debug your Media Management workflow.

## Admin Tools for Media Management

Administrators can view information about transformations and add publishing channels in the Admin Tools option of the Share menu bar.

1. Select **Admin Tools** on the Share toolbar, to see a list of tools on the left of the page.
2. The **Tools > Application** section lists the themes available. Media Management provides a black background (a dark theme) for Share. For more see [Using an Alfresco dark site theme]({% link media-management/1.2/using/config.md %}#using-an-alfresco-dark-theme) for more information.
3. The **Content Publishing > Channel Manager** section lists the channels that are configured for users to publish media (for example, CloudFront). Use this guidance to add a new publishing channel: [Configuring a CloudFront publishing channel]({% link media-management/1.2/config/index.md %}#configuring-a-cloudfront-publishing-channel).
4. The **Transformations** section lists the installed transformers and their status. Select Transformer FFmpeg to see information on whether the transformer is available, and the version of FFmpeg that is installed with the options configured.
