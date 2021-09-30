---
title: Event Gateway
---

The Event Gateway is a brand new Alfresco Component, introduced to improve the security of the [event mechanism]({% link content-services/latest/develop/oop-ext-points/events.md %}) 
and the [ReST API]({% link content-services/latest/develop/rest-api-guide/index.md %}). The Event Gateway relies on 
existing components that produces internal events flagged for external consumption. Those events are then consumed by 
the Event Gateway Service and routed to various destinations such as the queryable Event Store, Global Public Event Topic, 
subscription triggers, and the Event Archive.

## Developer deployment
The Event Gateway can be deployed in a developer environment with Docker Compose:

```text
# Using version 2 as 3 does not support resource constraint options (cpu_*, mem_* limits) for non swarm mode in Compose
version: "2"

services:
  alfresco-event-gateway:
    image: alfresco/alfresco-event-gateway-app:development
    environment:
      JAVA_TOOL_OPTIONS: "
                        -agentlib:jdwp=transport=dt_socket,address=*:8888,server=y,suspend=n
                         "
      JAVA_OPTS: "
                -Dspring.activemq.brokerUrl=tcp://activemq:61616
                -Dspring.datasource.url=jdbc:postgresql://postgres-event-gateway:5432/alfresco-event-gateway
                -Dspring.datasource.driverClassName=org.postgresql.Driver
                -Dspring.datasource.username=alfresco-event-gateway
                -Dspring.datasource.password=alfresco-event-gateway
                -Dspring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
                -Dspring.jpa.hibernate.ddl-auto=update
                -Dalfresco.event.gateway.publication.jms.broker.my-broker.broker-url=tcp://activemq:61616
                -Dkeycloak.auth-server-url=http://${HOST_IP}:8999/auth
                -Dcontent.service.url=http://alfresco:8080
                -Dmanagement.metrics.export.simple.enabled=true
                -Dmanagement.endpoint.metrics.enabled=true
                  "
    depends_on:
      - alfresco
      - alfresco-identity-service
    ports:
      - 7070:8080
      - 8888:8888

  postgres-event-gateway:
    image: postgres:13.1
    mem_limit: 512m
    environment:
      - POSTGRES_PASSWORD=alfresco-event-gateway
      - POSTGRES_USER=alfresco-event-gateway
      - POSTGRES_DB=alfresco-event-gateway
    command: postgres -c max_connections=300 -c log_min_messages=LOG
    ports:
      - 5433:5432

  alfresco:
    image: alfresco/alfresco-content-repository-community:7.1.0
    mem_limit: 1500m
    environment:
      # use 'export HOST_IP=xxx' for specifying the host ip before starting docker compose
      # the following line will produce the result using 'ifconfig'
      # export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
      # the following 2 lines will produce the result using 'ip address show'
      # The first line's output is "11.222.11.222/23"
      # export HOST_IP=$(ip address show | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | head -n 1 )
      # export HOST_IP=$(echo ${HOST_IP%/*})
      HOST_IP: ${HOST_IP}
      JAVA_TOOL_OPTIONS: "
                -Dencryption.keystore.type=JCEKS
                -Dencryption.cipherAlgorithm=DESede/CBC/PKCS5Padding
                -Dencryption.keyAlgorithm=DESede
                -Dencryption.keystore.location=/usr/local/tomcat/shared/classes/alfresco/extension/keystore/keystore
                -Dmetadata-keystore.password=mp6yc0UD9e
                -Dmetadata-keystore.aliases=metadata
                -Dmetadata-keystore.metadata.password=oKIWzVdEdA
                -Dmetadata-keystore.metadata.algorithm=DESede
                "
      JAVA_OPTS: "
                -Ddb.driver=org.postgresql.Driver
                -Ddb.username=alfresco
                -Ddb.password=alfresco
                -Ddb.url=jdbc:postgresql://postgres:5432/alfresco
                -Dsolr.host=solr6
                -Dsolr.port=8983
                -Dsolr.http.connection.timeout=1000
                -Dsolr.secureComms=none
                -Dsolr.base.url=/solr
                -Dindex.subsystem.name=solr6
                -Dshare.host=127.0.0.1
                -Dshare.port=8080
                -Dalfresco.host=localhost
                -Dalfresco.port=8080
                -Daos.baseUrlOverwrite=http://localhost:8080/alfresco/aos
                -Dmessaging.broker.url=\"failover:(nio://activemq:61616)?timeout=3000&jms.useCompression=true\"
                -Ddeployment.method=DOCKER_COMPOSE
                -DlocalTransform.core-aio.url=http://transform-core-aio:8090/
                -Dcsrf.filter.enabled=false
                -Dauthentication.chain=identity-service1:identity-service,alfrescoNtlm1:alfrescoNtlm
                -Dalfresco.restApi.basicAuthScheme=true
                -Didentity-service.enable-basic-auth=true
                -Didentity-service.authentication.validation.failure.silent=false
                -Didentity-service.auth-server-url=http://${HOST_IP}:8999/auth
                -Didentity-service.realm=alfresco
                -Didentity-service.resource=alfresco
                -XX:MinRAMPercentage=50 -XX:MaxRAMPercentage=80
                "

  transform-core-aio:
    image: alfresco/alfresco-transform-core-aio:2.5.2
    mem_limit: 1536m
    environment:
      JAVA_OPTS: " -XX:MinRAMPercentage=50 -XX:MaxRAMPercentage=80"
    ports:
      - 8090:8090

  share:
    image: alfresco/alfresco-share:7.1.0
    mem_limit: 1g
    environment:
      REPO_HOST: "alfresco"
      REPO_PORT: "8080"
      JAVA_OPTS: "
                -XX:MinRAMPercentage=50
                -XX:MaxRAMPercentage=80
                -Dalfresco.host=localhost
                -Dalfresco.port=8080
                -Dalfresco.context=alfresco
                -Dalfresco.protocol=http
                "

  postgres:
    image: postgres:13.1
    mem_limit: 512m
    environment:
      - POSTGRES_PASSWORD=alfresco
      - POSTGRES_USER=alfresco
      - POSTGRES_DB=alfresco
    command: postgres -c max_connections=300 -c log_min_messages=LOG
    ports:
      - 5432:5432

  solr6:
    image: alfresco/alfresco-search-services:2.0.2
    mem_limit: 2g
    environment:
      #Solr needs to know how to register itself with Alfresco
      - SOLR_ALFRESCO_HOST=alfresco
      - SOLR_ALFRESCO_PORT=8080
      #Alfresco needs to know how to call solr
      - SOLR_SOLR_HOST=solr6
      - SOLR_SOLR_PORT=8983
      #Create the default alfresco and archive cores
      - SOLR_CREATE_ALFRESCO_DEFAULTS=alfresco,archive
      #HTTP by default
      - ALFRESCO_SECURE_COMMS=none
    ports:
      - 8083:8983 #Browser port

  activemq:
    image: alfresco/alfresco-activemq:5.16.1
    mem_limit: 1g
    ports:
      - 8161:8161 # Web Console
      - 5672:5672 # AMQP
      - 61616:61616 # OpenWire
      - 61613:61613 # STOMP

  proxy:
    image: alfresco/alfresco-acs-nginx:3.1.1
    mem_limit: 128m
    environment:
      DISABLE_PROMETHEUS: "true"
      DISABLE_SYNCSERVICE: "true"
      DISABLE_ADW: "true"
    depends_on:
      - alfresco
    ports:
      - 8080:8080
    links:
      - alfresco
      - share

  alfresco-identity-service:
    image: quay.io/alfresco/alfresco-identity-service:1.5.0
    environment:
      - KEYCLOAK_USER=admin
      - KEYCLOAK_PASSWORD=admin
      - KEYCLOAK_IMPORT=/tmp/alfresco-realm.json
      - DB_VENDOR=h2
    volumes:
      - ./realms/alfresco-realm.json:/tmp/alfresco-realm.json
    ports:
      - 8999:8080
```

## Gateway API {#gateway-api}
The Event Gateway provides a ReST API with the following features:

* Creating a subscription - `POST /subscriptions`
* Getting a subscription - `GET /subscriptions/{id}`
* Update a subscription - `PATCH /subscriptions/{id}`

An out-of-process extension may create a subscription to receive certain types of events in a specific topic of an 
ActiveMQ broker.

To work with the Gateway ReST API Java Wrapper in your extension project, add this dependency to your project's POM:

```xml
<dependency>
    <groupId>org.alfresco</groupId>
    <artifactId>alfresco-event-gateway-api</artifactId>
    <version>5.1.0-SNAPSHOT</version>
</dependency>
```

### Creating a subscription {#gateway-api-create-sub}
The following code shows an example of how to create a subscription with a filter that only accepts [events of type]({% link content-services/latest/develop/oop-ext-points/events.md%}#acseventtypes) 
`org.alfresco.event.node.Created` and `org.alfresco.event.node.Updated`:

```java
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.alfresco.gateway.handler.SubscriptionsApi;
import org.alfresco.gateway.model.Filter;
import org.alfresco.gateway.model.Subscription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Sample {
  private static final Logger LOGGER = LoggerFactory.getLogger(Sample.class);
  
  public static void create(String[] args) {
    @Inject
    SubscriptionsApi subscriptionsApi;

    Map<String, String> config = new HashMap<>();
    config.put("broker-id", "my-broker"); // Id of the a broker in alfresco-event-gateway configuration
    config.put("destination", "topic:sample-topic"); // Name of the topic to which the gateway shall publish the events

    Filter filter = new Filter();
    filter.setType("event-type");
    // Comma-separated list of event types accepted by the filter
    filter.setConfig(Collections.singletonMap("event-types", "org.alfresco.event.node.Created,org.alfresco.event.node.Updated"));

    Subscription subscriptionRequest = new Subscription();
    subscriptionRequest.setType("jms-activemq");
    subscriptionRequest.setConfig(config);
    subscriptionRequest.setFilters(Collections.singletonList(filter));

    Subscription result = subscriptionsApi.createSubscription(subscriptionRequest);
    LOGGER.info("Created subscription with id: {}", result.getId());
  }
}
```

### Getting a subscription 
The following code shows an example of how to get a subscription by its id:

```java
import java.util.HashMap;
import java.util.Map;

import org.alfresco.gateway.handler.SubscriptionsApi;
import org.alfresco.gateway.model.Subscription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Sample {
  private static final Logger LOGGER = LoggerFactory.getLogger(Sample.class);

  public static void main(String[] args) {
    @Inject
    SubscriptionsApi subscriptionsApi;

    Subscription result = subscriptionsApi.getSubscription("my-subscription-id");
    LOGGER.info("Retrieved subscription: {}", result);
  }
}
```

### Updating a subscription
The following code shows an example of how to partially update a subscription:

```java
import java.util.HashMap;
import java.util.Map;

import org.alfresco.gateway.handler.SubscriptionsApi;
import org.alfresco.gateway.model.Subscription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Sample {
  private static final Logger LOGGER = LoggerFactory.getLogger(Sample.class);

  public static void main(String[] args) {
    @Inject
    SubscriptionsApi subscriptionsApi;

    Subscription subscription = subscriptionsApi.getSubscription("my-subscription-id");
    subscription.setStatus(Subscription.StatusEnum.ACTIVE);
    Subscription result = subscriptionsApi.partiallyUpdateSubscription(subscription);

    LOGGER.info("Updated subscription: {}", result);
  }
}
```