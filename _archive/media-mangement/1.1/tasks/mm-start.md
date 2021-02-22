---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Starting Media Management

You need to start up ActiveMQ, your content services node, the repository and Alfresco Share.

Ensure that you have installed the required external and internal software before installing Alfresco Media Management. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) and [Installing Media Management](mm-install.md) for more information.

For information on how to set up ActiveMQ and the content services node to start automatically, see [Running Media Management automatically](../concepts/mm-run-auto.md).

For more information on advanced ActiveMQ settings, see [Configuring advanced settings in ActiveMQ](http://docs.alfresco.com/5.1/concepts/activemq-config.html).

1.  Navigate to the activemq/bin directory where activemq is the name of the directory where you installed ActiveMQ. Start ActiveMQ using the command:

    ```
    ./activemq start
    ```

    ```
    activemq start
    ```

    ActiveMQ is used by the repository to queue event notifications as they are generated.

    You can check that ActiveMQ is working correctly through the ActiveMQ web interface here: http://localhost:8161/admin/index.jsp, where localhost is the Alfresco server.

2.  From the remote-node directory, launch your content services node using the following command:

    ```
    java -jar content-services-node-x.x.x.jar server config.yml
    ```

    where `x.x.x` is the version of the JAR file. If there is no command line output or error messages, then the node has started successfully. If ImageMagick or FFmpeg are not correctly installed, the node will not start.

3.  Start your Alfresco server, and log in to Share.


**Parent topic:**[Installing and configuring Media Management](../concepts/mm-install-overview.md)

