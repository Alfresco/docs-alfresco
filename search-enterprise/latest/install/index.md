---
title: Overview
---

**Alfresco Search Enterprise 3.0** is deployed using the following components:

* Alfresco Content Services 7.1.0, that includes Alfresco ActiveMQ, Alfresco Transform Service and Database
* Alfresco Elasticsearch Connector 3.0.0
* Elasticsearch server 7.10, that may be used as a standard managed service or that may be installed with default configuration

> **Note:** The Elasticsearch server does not require any additional software from Alfresco in order to be used by Alfresco Search Enterprise 3.0

Use this information to deploy the Alfresco Elasticsearch Connector.

To use Alfresco Search Enterprise 3.0 is also required to deploy ACS 7.1 and Elasticsearch server 7.10. Details on these deployments are available in [Alfresco Docs](https://docs.alfresco.com/content-services/latest/install/) and [Elasticsearch Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){:target="_blank"}.

There are two main options for deploying Alfresco Elasticsearch Connector: using containerized deployment or using the distribution JAR application. Alfresco Elasticsearch Connector is designed to be deployed using Docker images that are packaged in Helm charts or Docker Compose. This is the recommended deployment approach.

The following points cover different installation alternatives for Alfresco Elasticsearch Connector:

* [Install using JAR Distribution app](#install-using-jar-distribution-app)
* [Install using Docker Compose](#install-using-docker-compose)
* [Install using Helm (k8s)](#install-using-helm)
* [Install Elasticsearch server](#install-elasticsearch-server)

Additionally, Alfresco Repository must be configured in order to use Elasticsearch as Search Subsystem (named `elasticsearch`).

> **Note:** Note that standard Elasticsearch 7.10 server is also required. You can use a local Elasticsearch server deployment, or perform a new installation of the product. Additionally, when using Docker Compose templates from Alfresco, the Elasticsearch server and Kibana application are included as default services.

## Install using JAR Distribution app

Use this information to install Alfresco Elasticsearch Connector on the same machine as Alfresco Content Services.

This task assumes you have installed Alfresco Content Services 7.1 or above.

### Prerequisites and supported platforms

* JDK 11 or OpenJDK 11
* Elasticsearch server 7.10.1
* Alfresco Content Services 7.1

### Configuring the Search Enterprise subsystem in Alfresco Repository

The activation and configuration of the Search Services subsystem can be done by using either the `TOMCAT_HOME>/shared/classes/alfresco-global.properties` file or the [Repository Admin Web Console](https://docs.alfresco.com/content-services/latest/admin/admin-console/).

Add the following lines to the configuration file `alfresco-global.properties` to enable Elasticsearch Search subsystem.

```bash
# Set the Elasticsearch subsystem
index.subsystem.name=elasticsearch
# Elasticsearch index properties
elasticsearch.indexName=alfresco
elasticsearch.createIndexIfNotExists=true
# Elasticsearch server properties
elasticsearch.host=localhost
elasticsearch.port=9200
elasticsearch.baseUrl=/
```

These configuration properties are used by Alfresco Content Services to talk to Elasticsearch server. In the sample above, a plain HTTP connection is configured, but Alfresco Repository also supports communication with Elasticsearch server using Basic Authentication and HTTPs protocol. Details to enable these options are described in the [Configuration]({% link search-services/latest/config/index.md %}) section.

In order to set the configuration properties from the [Repository Admin Web Console](https://docs.alfresco.com/content-services/latest/admin/admin-console/) just choose `Repository Services > Search Service` option and set the properties in that web page.

![console]({% link search-enterprise/images/alfresco_repo_web_console.png %})

> **Note:** In ACS 7.1.0, `Test Connection` button would fail if your Elasticsearch server does not include "alfresco" index. However you are still able to `Save` your configuration and the index will be created automatically.

### Obtaining the Alfresco Elasticsearch Connector JAR applications

Browse to [Alfresco Nexus Internal Group Repositories](https://nexus.alfresco.com/nexus/#view-repositories;internal~browsestorage){:target="_blank"} and download:

* `alfresco-elasticsearch-live-indexing-3.0.0-app.jar` file from `org/alfresco/alfresco-elasticsearch-live-indexing` folder

* `alfresco-elasticsearch-reindexing-3.0.0-app.jar` file from `org/alfresco/alfresco-elasticsearch-reindexing` folder

> **Note:** Since we need to use private (Enterprise-only) artifacts from Alfresco Nexus, you need credentials to be able to download these artifacts from Alfresco Nexus. Alfresco customers can request their credentials by logging a ticket at [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

Verify that all the required services are available:

* Elasticsearch server, by default living in http://elasticsearch:9200
* Alfresco ActiveMQ, as part of ACS 7.1 deployment, by default living in `nio://activemq:61616`
* Alfresco Shared FileStore endpoint, as part of ACS 7.1 deployment, by default living in http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/
* Alfresco Database using PostgresSQL engine, as part of ACS 7.1 deployment, by default living in `localhost:5432`

### Alfresco Re-Indexing app

Since Alfresco Elasticsearch Connector *Live Indexing* component is listening to messages from ActiveMQ, some initial information from Alfresco Repository needs to be indexed using the *Re-Indexing* component. This *Re-Indexing* component can be also used to index a pre-populated Alfresco Repository.

Before running this application, it's required to get a JSON mapping of namespace to prefix for deployed content models. You may use the following project to build this JSON file:

[Alfresco Model Namespace-Prefix Mapping](https://github.com/AlfrescoLabs/model-ns-prefix-mapping){:target="_blank"}

Copy the [JAR deployment](https://github.com/AlfrescoLabs/model-ns-prefix-mapping/releases/download/1.0.0/model-ns-prefix-mapping-1.0.0.jar){:target="_blank"} file for this module from to your local Alfresco Repository deployment. You can find instructions on how to deploy a Simple JAR Alfresco Repository module in [Simple Module (JAR)](https://docs.alfresco.com/content-services/2.0/develop/extension-packaging/#simplemodule){:target="_blank"}.

Once this module is installed, JSON mapping file can be obtained using following URL:

http://localhost:8080/alfresco/s/model/ns-prefix-map

Simplified response:

```json
{
  "prefixUriMap": {
    "http://www.alfresco.org/model/custommodelmanagement/1.0": "cmm",
    "http://www.alfresco.org/model/datalist/1.0": "dl",
    "http://www.alfresco.org/model/emailserver/1.0": "emailserver",
    "http://www.alfresco.org/model/action/1.0": "act",
    "http://www.alfresco.org/model/system/1.0": "sys",
    "http://www.alfresco.org/model/cmis/1.0/cs01": "cmis",
    "http://www.alfresco.org/model/bpm/1.0": "bpm",
    "http://www.alfresco.org/model/dictionary/1.0": "d",
    "http://www.alfresco.org/model/linksmodel/1.0": "lnk",
    "http://www.alfresco.org/model/workflow/invite/moderated/1.0": "imwf",
    "http://www.alfresco.org/model/workflow/invite/nominated/1.0": "inwf",
    "http://www.alfresco.org/model/content/1.0": "cm",
    "http://www.alfresco.org/model/content/smartfolder/1.0": "smf",
    "http://www.alfresco.org/model/cmis/custom": "cmiscustom",
    "http://www.alfresco.org/model/site/1.0": "st",
    "http://www.alfresco.org/model/application/1.0": "app",
    "http://www.alfresco.org/model/imap/1.0": "imap",
    "http://www.alfresco.org/model/aos/1.0": "aos",
    "custom.model": "custom",
    "": ""
  }
}
```

Save this content in a new file named `reindex.prefixes-file.json`.

Re-indexing application can be run from command line, passing the already generated JSON file and details for DB and Elasticsearch servers. Since this application is providing default values for Alfresco Repository Database username and password, it's strongly recommended to set this credentials by using the command line. By using this approach, database credentials won't be stored in server filesystem persistently.

```java
java -jar alfresco-elasticsearch-reindexing-3.0.0-app.jar \
--alfresco.reindex.jobName=reindexByIds \
--spring.elasticsearch.rest.uris=http://localhost:9200 \
--spring.datasource.url=jdbc:postgresql://localhost:5432/alfresco \
--spring.datasource.username=alfresco \
--spring.datasource.password=alfresco \
--alfresco.reindex.prefixes-file=file:reindex.prefixes-file.json
o.s.batch.core.step.AbstractStep         : Step: [reindexByIdsStep] executed in 4s952ms
o.a.r.w.ElasticsearchRepoEventItemWriter : Total indexed documents:: 845
o.a.r.listeners.JobLifecycleListener     : Current Status: COMPLETED
```

Once the program has being executed, existing Alfresco Repository nodes will be available in Elasticsearch.

> **Note:** Additional use cases for this application will be covered in the [Indexing](Indexing) section.

### Alfresco Live Indexing app

Alfresco Elasticsearch Connector *Live Indexing* can be started from command line as a standard Spring Boot application.

```java
java -jar alfresco-elasticsearch-live-indexing-3.0.0-app.jar
```

If your services are deployed on a different server or port, following parameters can be used.

```java
java -DSPRING_ELASTICSEARCH_REST_URIS=http://localhost:9200 \
 -DSPRING_ACTIVEMQ_BROKERURL=nio://localhost:61616 \
 -DALFRESCO_SHAREDFILESTORE_BASEURL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file/ \
 -jar alfresco-elasticsearch-live-indexing-3.0.0-app.jar
```

Additional memory may be assigned to thes services using default JVM options. For instance, the next command will start Alfresco Elasticsearch Connector with 2 GB of RAM.

```java
java -Xmx2G -jar alfresco-elasticsearch-live-indexing-3.0.0-app.jar
```

By default, Alfresco Elasticsearch Connector is started listening to port 8080. This port can be changed using default Spring Boot command line parameter `server.port`. Following command will run Alfresco Elasticsearch Connector service listening to port 8083.

```java
java -jar alfresco-elasticsearch-live-indexing-3.0.0-app.jar --server.port=8083
```

Once every service is up & running, Elasticsearch index should be populated and search queries would work as expected when using an Alfresco UI application like [Alfresco Digital Workspace](https://docs.alfresco.com/adw/concepts/welcome-adw.html) or [Alfresco Content Application](https://github.com/Alfresco/alfresco-content-app){:target="_blank"}.

## Install using Docker Compose

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

## Install using Helm

Deployment of ACS Stack for Kubernetes using Helm is available in [https://github.com/Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment)

Depending on where do you want to install Alfresco Content Services (ACS) , you need to follow the corresponding guide, for instance this is the one for a Kubernetes cluster based on [Docker Desktop](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/docker-desktop-deployment.md) and this other for a Kubernetes cluster based on [AWS EKS](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/eks-deployment.md).

In order to replace Alfresco Search Services with Alfresco Elasticsearch Connector you need to set the `alfresco-elasticsearch-connector.enabled` property to `true` and `alfresco-search.enabled` to `false` in [requirements.yaml](https://github.com/Alfresco/acs-deployment/blob/master/helm/alfresco-content-services/requirements.yaml).

The Alfresco Elasticsearch Connector will start **4 new Kubernetes deployment** for live indexing:

* **Mediation**, must be always a single node, it orchestrates events from Alfresco Repository.
* **Metadata**, it is responsible for indexing node metadata.
* **Content**, it is in charge of indexing content.
* **Path**, this application indexes the path of a node

Additionally, a **Kubernetes job** will be started in order to reindex existing contents in Elasticsearch. It's recommended to run this job only at the first startup.

You can enable or disable it setting the `alfresco-elasticsearch-connector.reindexing.enabled` property to `true` or `false`.

To deploy Alfresco with Elasticsearch Connector you can use the command below:

 ```bash
 helm install acs alfresco/alfresco-content-services \
 --values esc_values.yaml \
 --set externalPort="80" \
 --set externalProtocol="http" \
 --set externalHost="localhost" \
 --set global.alfrescoRegistryPullSecrets=my-registry-secrets \
 --set repository.replicaCount=1 \
 --set transformrouter.replicaCount=1 \
 --set pdfrenderer.replicaCount=1 \
 --set imagemagick.replicaCount=1 \
 --set libreoffice.replicaCount=1 \
 --set tika.replicaCount=1 \
 --set transformmisc.replicaCount=1 \
 --set postgresql-syncservice.resources.requests.memory="500Mi" \
 --set postgresql-syncservice.resources.limits.memory="500Mi" \
 --set postgresql.resources.requests.memory="500Mi" \
 --set postgresql.resources.limits.memory="500Mi" \
 --set alfresco-search.resources.requests.memory="1000Mi" \
 --set alfresco-search.resources.limits.memory="1000Mi" \
 --set share.resources.limits.memory="1500Mi" \
 --set share.resources.requests.memory="1500Mi" \
 --set repository.resources.limits.memory="2500Mi" \
 --set repository.resources.requests.memory="2500Mi"\
 --timeout 10m0s \
 --namespace=alfresco
 ```

If you are using *Docker Desktop* locally, you have to set `antiAffinity` to `soft` and it is recommended to reduce Elasticsearch resources:

```
 elasticsearch:
   enabled: true
   antiAffinity: "soft"

   # Shrink default JVM heap.
   esJavaOpts: "-Xmx128m -Xms128m"

   # Allocate smaller chunks of memory per pod.
   resources:
     requests:
       cpu: "100m"
       memory: "512M"
     limits:
       cpu: "1000m"
       memory: "512M"

   # Request smaller persistent volumes.
   volumeClaimTemplate:
     accessModes: [ "ReadWriteOnce" ]
     storageClassName: "hostpath"
     resources:
       requests:
         storage: 100M
```

When the system is up and running, you can access to the Kibana console using port forward:

```bash
 kubectl port-forward service/acs-kibana 5601:5601 -n alfresco
```

and then visiting http://localhost:5601/app/kibana#.

If you need to access to Elasticsearch directly you have to perform the same operation:

```bash
 kubectl port-forward service/elasticsearch-master 9200:9200 -n alfresco
```

and then visiting http://localhost:9200/.

Properties that can be used to configure the chart are available [here](https://github.com/Alfresco/acs-deployment/tree/master/helm/alfresco-content-services/charts/alfresco-elasticsearch-connector/README.md)
 

## Install Elasticsearch server

Alfresco Elasticsearch Connector uses a standard Elasticsearch 7.10 server. No additional plugin is required.

Different alternatives may be selected for your Elasticsearch installation, as described in [Elasticsearch official documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){:target="_blank"}. Alternatively, a managed service from [Elasticsearch](https://www.elastic.co/elasticsearch/service) or [Amazon AWS](https://aws.amazon.com/elasticsearch-service/){:target="_blank"} can be used.

Alfresco Repository and Alfresco Elasticsearch Connector support communication with Elasticsearch server using HTTP or HTTPs protocol with or without HTTP Basic Authentication.
