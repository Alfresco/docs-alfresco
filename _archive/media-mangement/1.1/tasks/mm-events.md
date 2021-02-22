---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Monitoring Media Management

You can monitor the flow of media events from the Alfresco repository through ActiveMQ and system logs.

1.  Check the health of ActiveMQ, particularly that the following events are occurring:

    -   Topics \> alfresco.health.contentservices shows that heartbeats are being sent
    -   Queues\> alfresco.transform.request.image, alfresco.transform.reply.image, alfresco.transform.request.video, and alfresco.transform.reply.video are showing messages enqueuing and dequeuing
    ActiveMQ provides a web console here:

    ```
    http://localhost:8161/admin/
    ```

    where `localhost` is the name of the Alfresco server.

    You can also check the ActiveMQ log, which is located in activemq/data/activemq.log where activemq is the name of directory where you installed ActiveMQ.

    By default, subscribers are set to Active Durable Topic Subscribers to ensure that if ActiveMQ fails, messages are not lost.

    **Note:** For technical reasons, Topics \> Messages Dequeued never decrements. Do not monitor this queue.

2.  Check the content services node log to monitor what is being transformed:

    -   Port 8889 is reserved for the content services node. http://localhost:8889/healthcheck shows the last transformation after startup \(but before any transformations\). You should see:

        ```
        {"FFmpeg":{"healthy":true},"ImageMagick":{"healthy":true},"deadlocks":{"healthy":true}}
        ```

        and after a transformation request:

        ```
        {"FFmpeg":{"healthy":true,"message":"lastRequest: \"6075f46f-de9c-4232-aa78-d3ed1280a371\""},"ImageMagick":{"healthy":true},"deadlocks":{"healthy":true}}
        ```

    -   Check the log, which is located in remote-node/logs/content-services-node.log, where remote-node is the name of directory that you unzipped when you installed Media Management.
    -   You can change the log level of the content services node in the remote-node/config.yml file.
3.  Check alfresco.log, after setting the log level to `debug`, for any errors.

4.  Use the log4j.properties.sample file to add loggers to your tomcat/webapps/alfresco/WEB-INF/classes/alfresco/module/org\_alfresco\_mm\_repo/log4j.properties file.

    A log4j.properties.sample file is provided in the Media Management installation zip. This file contains loggers that you can add to your Alfresco `log4j.properties` file to trace and debug your Media Management workflow.


**Parent topic:**[Administering Media Management](../concepts/mm-admin.md)

