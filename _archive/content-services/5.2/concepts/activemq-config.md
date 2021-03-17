---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
---

# Configuring advanced settings for ActiveMQ

Some modules require setting up and configuring ActiveMQ to enable high-performance clustering and authentication.

**Clustering**

ActiveMQ should be clustered to achieve fault tolerance and reliable high performance load balancing of messages. The default URL configuration for both the repository and your module must use the fail over transport. For more information, see [ActiveMQ - clustering](http://activemq.apache.org/clustering.html).

**Security**

You can secure the repository - ActiveMQ - your module's topic and queue communication using authentication, authorization, and SSL encryption. For more information, see [ActiveMQ - security](http://activemq.apache.org/security.html) and [ActiveMQ - using SSL](http://activemq.apache.org/how-do-i-use-ssl.html).

For example, to configure authentication, add the following code snippet under the `broker` element in sync/activemq/apache-activemq-5.13.1/confactivemq.xml:

```
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

This configures ActiveMQ to use basic authentication \(username and password\) and limit access to the your module's topic `Consumer.*.VirtualTopic.alfresco.repo.events.nodes`. Both the repository and sync service will have to provide a username and password. It it fails, an exception will be shown in the repository and the sync service logs.

Here's an example of the exception in the repository log:

```
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

```
ERROR [2016-03-16 16:07:21.251] [Camel (alfrescoServiceCamelContext) thread #3 - 
JmsConsumer[Consumer.074f6b96-685b-4a03-959f-7e77793f1ce2.VirtualTopic.alfresco.repo.events.nodes]]
org.apache.camel.component.jms.DefaultJmsMessageListenerContainer - Could not refresh JMS Connection 
for destination
'Consumer.074f6b96-685b-4a03-959f-7e77793f1ce2.VirtualTopic.alfresco.repo.events.nodes?consumer.prefetchSize=3000' 
- retrying in 5000 ms. Cause: User name [null] or password is invalid.
```

The module's ActiveMQ username and password can be set using the properties, `messaging.username` and `messaging.password`. The repository ActiveMQ username and password can be set using the properties `messaging.broker.username` and `messaging.broker.password`.

Additionally, enable SSL to provide secure communication of events. See [ActiveMQ - HTTP and HTTPS Transports](http://activemq.apache.org/http-and-https-transports-reference.html).

**Parent topic:**[Configuring ActiveMQ](../concepts/activemq-overview.md)

