---
title: Configure ActiveMQ
---

Content Services requires ActiveMQ for message queuing. ActiveMQ is also used by various other products.

The standard ActiveMQ installation runs with a basic configuration. You can configure and extend ActiveMQ based on your requirements.

For information about installing ActiveMQ for your specific product, see:

* [Alfresco Media Management]({% link media-management/latest/install/index.md %})
* [Alfresco Sync Service]({% link sync-service/latest/install/options.md %})
* [Alfresco Transform Service]({% link transform-service/latest/install/index.md %})

For more advanced configuration, such as security, transport connectors, or memory settings, see [Configure advanced settings for ActiveMQ](#advanced).

## Set up ActiveMQ

Set up Apache ActiveMQ to enable message queuing. If you already have an ActiveMQ instance connected to Content Services, you don't need to perform these step.

If you don't already have an ActiveMQ instance, [install ActiveMQ](https://activemq.apache.org/installation.html){:target="_blank"} and follow the steps below.

See [supported platforms]({% link content-services/7.2/support/index.md %}) for supported versions.

1. Stop the server.

2. Define the location of ActiveMQ in your `alfresco-global.properties` file:

    ```bash
    messaging.broker.url=failover:(tcp://server:61616)?timeout=3000
    ```

    where `server` is the host name of the server where ActiveMQ is installed.

    When you set up ActiveMQ, the Content Services events and messaging subsystems are set to start up automatically.

    Any changes to `alfresco-global.properties` require you to restart Content Services to apply the changes.

## Configure advanced settings for ActiveMQ {#advanced}

Some modules require setting up and configuring ActiveMQ to enable high-performance clustering and authentication.

### Clustering

ActiveMQ should be clustered to achieve fault tolerance and reliable high performance load balancing of messages. The default URL configuration for both the repository and your module must use the fail over transport. For more information, see [ActiveMQ - clustering](http://activemq.apache.org/clustering.html){:target="_blank"}.

### Security

You can secure the repository - ActiveMQ - your module's topic and queue communication using authentication, authorization, and SSL encryption. For more information, see [ActiveMQ - security](https://activemq.apache.org/security.html){:target="_blank"} and [ActiveMQ - using SSL](https://activemq.apache.org/how-do-i-use-ssl.html){:target="_blank"}.

For example, to configure authentication, add the following code snippet under the `broker` element in `sync/activemq/apache-activemq-5.15.8/confactivemq.xml`:

```xml
<broker>
..
  <plugins>
     <simpleAuthenticationPlugin>
         <users>
            <authenticationUser username="system" password="manager" groups="users,admins"/>
            <authenticationUser username="user" password="password" groups="users"/>
            <authenticationUser username="guest" password="password" groups="guests"/>
         </users>
     </simpleAuthenticationPlugin>

     <authorizationPlugin>
         <map>
            <authorizationMap>
               <authorizationEntries>
                   <authorizationEntry topic="Consumer.*.VirtualTopic.alfresco.repo.events.nodes>" read="users"
                    write="users" admin="users"/>
                   <authorizationEntry topic="ActiveMQ.Advisory.>" read="guests,users"
                   write="guests,users" admin="guests,users"/>
                   <authorizationEntry topic="VirtualTopic.alfresco.repo.events.nodes" read="guests,users"
                    write="guests,users" admin="guests,users"/>
               </authorizationEntries>
            </authorizationMap>
         </map>
     </authorizationPlugin>
  </plugins>
..
</broker>
```

This configures ActiveMQ to use basic authentication (username and password) and limit access to the your module's topic `Consumer.*.VirtualTopic.alfresco.repo.events.nodes`. Both the repository and sync service will have to provide a username and password. It it fails, an exception will be shown in the repository and the sync service logs.

Here's an example of the exception in the repository log:

```text
Caused by: java.lang.SecurityException: User name [null] or password is invalid.
at
org.apache.activemq.security.SimpleAuthenticationBroker.authenticate(SimpleAuthenticationBroker.java:103)
at
org.apache.activemq.security.SimpleAuthenticationBroker.addConnection(SimpleAuthenticationBroker.java:71)
at
org.apache.activemq.broker.BrokerFilter.addConnection(BrokerFilter.java:98)
at
org.apache.activemq.broker.MutableBrokerFilter.addConnection(MutableBrokerFilter.java:103)
```

Here's an example of the exception in the sync service log:

```text
ERROR [2016-03-16 16:07:21.251] [Camel (alfrescoServiceCamelContext) thread #3 -
JmsConsumer[Consumer.074f6b96-685b-4a03-959f-7e77793f1ce2.VirtualTopic.alfresco.repo.events.nodes]]
org.apache.camel.component.jms.DefaultJmsMessageListenerContainer - Could not refresh JMS Connection
for destination
'Consumer.074f6b96-685b-4a03-959f-7e77793f1ce2.VirtualTopic.alfresco.repo.events.nodes?consumer.prefetchSize=3000'
- retrying in 5000 ms. Cause: User name [null] or password is invalid.
```

The module's ActiveMQ username and password can be set using the properties, `messaging.username` and `messaging.password`. The repository ActiveMQ username and password can be set using the properties `messaging.broker.username` and `messaging.broker.password`.

Additionally, enable SSL to provide secure communication of events. See [ActiveMQ - HTTP and HTTPS Transports](https://activemq.apache.org/http-and-https-transports-reference.html){:target="_blank"}.
