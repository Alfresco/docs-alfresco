---
title: Install with Docker
---

Use this information to quickly start up Alfresco Elasticsearch Connector using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is only recommended for development and test environments.

> **Note:** Since we need to use private (Enterprise-only) Docker images from Quay.io, you need credentials to be able to pull those images from Quay.io. Alfresco customers can request their credentials by logging a ticket at [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

### Prerequisites and supported platforms

* [Docker](https://docs.docker.com/install/) (latest stable version)
  * This allows you to run Docker images and docker-compose on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/)
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

### Deployment using Docker Compose

You can perform the Docker Compose deployment using the source code or downloading the zip distribution.
Please pay attention, the provided Docker Compose file is only for test and development purposes.

### Using source code

Getting the code using a Git client using SSH:

```bash
git clone git@github.com:Alfresco/alfresco-elasticsearch-connector.git
```

Build the project using Maven:

```bash
cd alfresco-elasticsearch-connector
mvn clean install -DskipTests
```

Docker Compose template will be created in `alfresco-elasticsearch-connector-distribution/src/main/resources/docker-compose` folder.

Move to the docker-compose folder in the distribution module:

```bash
cd /alfresco-elasticsearch-connector-distribution/src/main/resources/docker-compose
```

### Using distribution zip

Download the latest [distribution zip](https://artifacts.alfresco.com/nexus/content/groups/internal/org/alfresco/alfresco-elasticsearch-connector-distribution){:target="_blank"}

Unzip the distribution zip in a folder:

```bash
unzip alfresco-elasticsearch-connector-distribution-*.zip -d alfresco-elasticsearch-connector-distribution
```

Move to the docker-compose folder in the distribution folder:

```bash
cd alfresco-elasticsearch-connector-distribution/docker-compose
```

### Common steps

Log in to Quay.io using your credentials:

```bash
$ docker login https://quay.io
```

Deploy Alfresco Content Services. This `docker-compose.yml` file includes the Repository, ADW, Postgres, Transform Service, ActiveMQ, Alfresco Elasticsearch Connector, Elasticsearch, and Kibana.

```bash
$ docker-compose up --build --force-recreate
```

This command downloads the images, fetches all the dependencies, creates each container, and then starts the system.

Wait for the logs to show messages:

```bash
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

> **Note:** Remember to run Alfresco Re-Indexing app as described above in order to add existing Alfresco Repository nodes to Elasticsearch server

### Alternative deployment

By default, the Docker Compose template deploys Alfresco Elasticsearch Connector services individually:

* `live-indexing-mediation` service manages ActiveMQ messages from Alfresco Repository and Alfresco Transform Service
* `live-indexing-content` service indexes Content in Elasticsearch
* `live-indexing-metadata` service indexes Metadata in Elasticsearch

Following lines are provided by default in generated `docker-compose.yml` file:

```bash
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

```bash
live-indexing:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
        ALFRESCO_SHAREDFILESTORE_BASEURL: http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/
```

> **Note:** If Elasticsearch server is available on your environment, `elasticsearch` and `kibana` services can be removed from the `docker-compose.yml` provided file. You may adjust the references to `elasticsearch` service in Docker Compose in order to use your Elasticsearch deployment.
