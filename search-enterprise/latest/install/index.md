---
title: Overview
---

This information helps you to deploy Alfresco Elasticsearch Connector, including how to deploy it at scale. 

In order to use **Alfresco Search Enterprise v3.0** is also required to deploy ACS 7.0 and Elasticsearch server 7.10. Details on these deployments are available in [Alfresco Docs](https://docs.alfresco.com/6.2/concepts/master-deploy.html) and [Elasticsearch Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html). 

There are two main options for deploying Alfresco Elasticsearch Connector: using containerized deployment or using the distribution JAR application. However, Alfresco Elasticsearch Connector is designed to be deployed using Docker images that are packaged in Helm charts or Docker Compose. This is the recommended deployment approach.

The following points cover different installation alternatives for Alfresco Elasticsearch Connector:

* Install using JAR Distribution app
* Install using Docker Compose
* Install using Kubernetes and Helm

Additionally, Alfresco Repository must be configured in order to use Elasticsearch as Search Subsystem.

>> Note that standard Elasticsearch 7.10 server is also required. You can use a local Elasticsearch server deployment, or perform a new installation of the product. Additionally, when using Docker Compose templates from Alfresco, the Elasticsearch server and Kibana application are included as default services.

### Install using JAR Distribution app

Use this information to install Alfresco Elasticsearch Connector on the same machine as Alfresco Content Services.

This task assumes you have installed Alfresco Content Services 7.0 or above.

**Prerequisites and supported platforms**

* JDK 11 or OpenJDK 11
* Elasticsearch server 7.10.1
* Alfresco Content Services 7.0

**Configuring the Search Services subsystem in Alfresco Repository**

The activation and configuration of the Search Services subsystem can be done by using either the `TOMCAT_HOME>/shared/classes/alfresco-global.properties` file or the Repository Admin Web Console.

Add the following lines to the configuration file `alfresco-global.properties` to enable Elasticsearch Search subsystem.

```bash
# Set the Elasticsearch subsystem
index.subsystem.name=elasticsearch

# Elasticsearch server properties
elasticsearch.host=localhost
elasticsearch.port=9200
elasticsearch.baseUrl=/
```

These configuration properties are used by Alfresco Content Services to talk to Elasticsearch server. In the sample above, a plain HTTP connection is configured, but Alfresco Repository also supports communication with Elasticsearch server using Basic Authentication and HTTPs protocol. Details to enable these options are described in **Configuration** section.

**Obtaining the Alfresco Elasticsearch Connector JAR application**

Browse to [Alfresco Nexus Enterprise and Public Releases Repositories](https://nexus.alfresco.com/nexus/#view-repositories;private~browsestorage) and download `alfresco-elasticsearch-live-indexing-1.0.0-app.jar` file from `org/alfresco/alfresco-elasticsearch-live-indexing` folder.

>> Since we need to use private (Enterprise-only) artifacts from Alfresco Nexus, you need credentials to be able to download these artifacts from Alfresco Nexus. Alfresco customers can request their credentials by logging a ticket at [Alfresco Support](https://support.alfresco.com/).

Verify that all the required services are available:

* Elasticsearch server, by default living in http://elasticsearch:9200
* Alfresco ActiveMQ, as part of ACS 7.0 deployment, by default living in `nio://activemq:61616`
* Alfresco Shared FileStore endpoint, as part of ACS 7.0 deployment, by default living in http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/

Alfresco Elasticsearch Connector can be started from command line as a standard Spring Boot application.

```
$ java -jar alfresco-elasticsearch-live-indexing-1.0.0-app.jar
```

If your services are deployed on a different server or port, following parameters can be used.

```
$ java -DSPRING_ELASTICSEARCH_REST_URIS=http://localhost:9200
 -DSPRING_ACTIVEMQ_BROKERURL=nio://localhost:61616
 -DALFRESCO_SHAREDFILESTORE_BASEURL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file/
 -jar alfresco-elasticsearch-live-indexing-1.0.0-app.jar
```

Additional memory may be assigned to this service using default JVM options. For instance, the next command will start Alfresco Elasticsearch Connector with 2 GB of RAM.

```java
$ java -Xmx2G -jar alfresco-elasticsearch-live-indexing-0.29-app.jar
```

By default, Alfresco Elasticsearch Connector is started listening to port 8080. This port can be changed using default Spring Boot command line parameter `server.port`. Following command will run Alfresco Elasticsearch Connector service listening to port 8083.

```
$ java -jar alfresco-elasticsearch-live-indexing-0.29-app.jar --server.port=8083
```

Once every service is up & running, Elasticsearch index should be populated and search queries would work as expected when using an Alfresco UI application like [Alfresco Digital Workspace](https://docs.alfresco.com/adw/concepts/welcome-adw.html) or [Alfresco Content Application](https://github.com/Alfresco/alfresco-content-app).

### Install using Docker Compose

Use this information to quickly start up Alfresco Elasticsearch Connector using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is only recommended for development and test environments.

>> Since we need to use private (Enterprise-only) Docker images from Quay.io, you need credentials to be able to pull those images from Quay.io. Alfresco customers can request their credentials by logging a ticket at https://support.alfresco.com/.

**Prerequisites and supported platforms**

* [Docker](https://docs.docker.com/install/) (latest stable version)
  * This allows you to run Docker images and docker-compose on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/)
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

**Deployment using Docker Compose**

Getting the code using a Git client using SSH:

```
$ git clone git@github.com:Alfresco/alfresco-elasticsearch-connector.git
```

Build the project using Maven:

```
$ cd alfresco-elasticsearch-connector
$ mvn clean install -DskipTests
```

Docker Compose template will be created in `src/docker` folder.

```
$ cd src/docker
```

Log in to Quay.io using your credentials:

```
$ docker login https://quay.io
```

Deploy Alfresco Content Services. This `docker-compose.yml` file includes the Repository, ADW, Postgres, Transform Service, ActiveMQ, Alfresco Elasticsearch Connector, Elasticsearch and Kibana.

```
$ docker-compose up --build --force-recreate
```

This command downloads the images, fetches all the dependencies, creates each container, and then starts the system.

Wait for the logs to show messages:

```
...
alfresco_1 | 05-Jan-2021 13:36:37.893 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 148870 ms
```

If you encounter errors whilst the system is starting up:

* Stop the session (by using `CONTROL+C`).
* Try allocating more memory resources, as advised in `docker-compose.yml`. For example, in Docker, change the memory setting in `Preferences (or Settings) > Advanced > Memory`, to at least 16 GB.
* Make sure you restart Docker and wait for the process to finish before continuing.

Open your browser and check everything starts up correctly:

* Administration and REST APIs http://localhost:8080/alfresco
* Alfresco Digital Workspace (UI) http://localhost:8080/workspace
* ActiveMQ Admin Web Console http://localhost:8161/admin
* Elasticsearch server http://localhost:9200
* Kibana http://localhost:5601

Log in as the `admin` user with credentials `admin`.

**Alternative deployment**

By default, Docker Compose template deploys Alfresco Elasticsearch Connector services individually:

* `live-indexing-mediation` service manages ActiveMQ messages from Alfresco Repository and Alfresco Transform Service
* `live-indexing-content` service indexes Content in Elasticsearch
* `live-indexing-metadata` service indexes Metadata in Elasticsearch

Following lines are provided by default in generated `docker-compose.yml` file:

```
live-indexing-mediation:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-mediation:${LIVE_INDEXING_MEDIATION_TAG}
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616

live-indexing-content:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-content:${LIVE_INDEXING_CONTENT_TAG}
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
        ALFRESCO_SHAREDFILESTORE_BASEURL: http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/

live-indexing-metadata:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-metadata:${LIVE_INDEXING_METADATA_TAG}
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
```

Alternativelly, you can use the all-in-one Docker Image for the Alfresco Elasticsearch Connector named `alfresco-elasticsearch-live-indexing` that includes every service:

```
live-indexing:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
        ALFRESCO_SHAREDFILESTORE_BASEURL: http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/
```

If Elasticsearch server is available on your environment, `elasticsearch` and `kibana` services can be removed from `docker-compose.yml` provided file. You may adjust the references to `elasticsearch` service in Docker Compose in order to use your Elasticsearch deployment.

### Install using Kubernetes and Helm

Kubernetes deployment is not yet supported.

### Install Elasticsearch server

Alfresco Elasticsearch Connector uses a standard Elasticsearch 7.10 server. No additional plugin is required.

Different alternatives may be selected for your Elasticsearch installation, as described in [Elasticsearch official documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html). Alternatively, a managed service from [Elasticsearch](https://www.elastic.co/elasticsearch/service) or [Amazon AWS](https://aws.amazon.com/elasticsearch-service/) can be used.

Alfresco Repository and Alfresco Elasticsearch Connector support communication with Elasticsearch server using HTTP or HTTPs protocol with or without HTTP Basic Authentication.

This section describes how to run Alfresco Enterprise Search 3.0 at scale.

The following services are required:

* Alfresco Content Repository includes a Tomcat server deploying `alfresco.war` application
* Alfresco Database is used to store metadata and other relevant information for Alfresco Content Repository
* Alfresco Transform Service includes a Spring Boot application with several transformation services (ImageMagick, LibreOffice, PDF Renderer and LibreOffice)
* Alfresco Shared File Store includes a Spring Boot application serving transformed files by Alfresco Transform Service
* Alfresco Elasticsearch Connector includes a Spring Boot application with several indexing services (mediation, metadata and content)
* Alfresco ActiveMQ is a message-oriented middleware (MOM) sharing messages between Alfresco Content Repository, Alfresco Elasticsearch Connector and Alfresco Transform Service
* Elasticsearch is a search and analytics engine that stores indexed metadata and content

## Identifying critical paths

In order to identify the services used for the different features provided by Alfresco Enterprise Search 3.0, critical paths should be reviewed:

* Indexing metadata and permissions
* Indexing content
* Searching metadata and content

![Elastic Search Flows]({% link search-enterprise/images/elasticsearch-flows.png %})#

**Metadata and Permissions**

Every time a node is created or updated in Content Repository, new messages with metadata and permissions are sent to ActiveMQ. Elasticsearch Connector is consuming these and send the indexing requests to Elasticsearch server.

**Content**

Every time a content node is created or updated in Content Repository, new messages are sent to ActiveMQ. Elasticsearch Connector is consuming these messages from ActiveMQ and creates new transformation messages back in ActiveMQ. Content Repository consumes the transformation messages and offloads the transformation of documents into plain text to the Transform Service. Once the transformation has been performed, Content Repository produces a transformation complete message in ActiveMQ and uploads the plain text file to Shared File Store. Elasticsearch Connector is consuming the messages and downloads the extracted text from Shared File Store. Then the document's text is sent for indexing to Elasticsearch server.

**Searching metadata and content**

Searching operations are handled by Content Repository REST API. Depending on the search syntax used (only AFTS is currently supported), Content Repository translates the search query to Elasticsearch REST API language and sends the search request to Elasticsearch.

## Metadata indexing performance

Inappropriately configured or deployed system can result in a significant delay between the time when documents are created or updated in Content Repository and when they appear in search results (indexed in Elasticsearch).

The following information describes how to identify bottlenecks in the system's performance and recommendations to mitigate those for metadata only indexing scenario.

**Alfresco Repository**

Alfresco Repository is updating the database the document's metadata in the database and producing messages to `alfresco.repo.event2` ActiveMQ topic. The rate of created or updated documents depends on the Content Repository cluster performance.

Recommendations:

* Increase resources for the server if CPU load or memory consumption is high.
* Increase database pool if no connections are available.
* Increase the number of threads if no threads are available.
* Increase the number of Content Repository nodes in the cluster

**Database**

The database is being updated to create new nodes or to modify existing ones. Additionally, the queries are executed in the database to populate metadata for returned entities in REST API responses for search queries. These operations are mainly related to `ALF_NODE` and `ALF_NODE_PROPERTIES` tables.

Recommendations:

* Increase resources for the server if CPU load or memory consumption is high.
* Regularly update statistics for `ALF_NODE` and `ALF_NODE_PROPERTIES` tables to optimise query planner performance.

**Alfresco Elasticsearch Connector**

This service is consuming messages from ActiveMQ topic `alfresco.repo.event2` and producing / consuming ActiveMQ messages from queue `metadata.event`.

Recommendations:

* Always use a pool of connections to ActiveMQ (`spring.activemq.pool.enabled` set to true with `spring.activemq.pool.max-connections` sized)
* Increase the number of consumers for `live-indexing-mediation` component if messages enqueued count is significantly greater than messages dequeued for ActiveMQ topic `alfresco.repo.event2`
* Increase the number of consumers for `live-indexing-metadata` component if messages enqueued count is significantly greater than messages dequeued for ActiveMQ queue `metadata.event`

**ActiveMQ**

ActiveMQ is transporting messages from Content Repository and Elasticsearch Connector. It is also used for Content Repository to Transform Service communication.

Recommendations:

* Increase resources for the server if CPU load or memory consumption is high.

**Elasticsearch**

Elasticsearch server is getting indexing requests from Elasticsearch Connector. If all the other services are working as expected, an increment in messages enqueued without dequeuing operation for queue `metadata.event` may indicate Elasticsearch server requires more resources. Slow responses for search queries can also indicate the insufficient resource for the server.

Recommendations:

* Increase resources for the server if CPU load or memory consumption is high.
* Increase resources for the server if ingestion rate is decreasing with higher volumes of data.

## Permissions indexing performance



## Content indexing performance



## Searching performance


