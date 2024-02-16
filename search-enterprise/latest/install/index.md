---
title: Overview
---

Alfresco Search Enterprise 4.0 consists of Alfresco Content Services, Elasticsearch Server, and the Elasticsearch connector. Use this information to install the Elasticsearch connector, which can be deployed using either JAR files, Docker Compose, or Helm.

## Prerequisites

* Alfresco Content Services 23.1 that includes Alfresco ActiveMQ, Alfresco Transform Service, and Database, for more see [Install overview]({% link content-services/latest/install/index.md %}).
* Elasticsearch 7.17.x - any version between 7.10.x and 7.17.x inclusive, is compatible. It may be used as a standard managed service or can be installed with the default configuration, for more see [Install Elasticsearch server](#install-elasticsearch-server).
* Elasticsearch Connector 4.0

See the [Supported platforms]({% link search-enterprise/latest/support/index.md %}) for more.

## Configure Subsystem in Repository

You must first activate and configure the Search Services subsystem in Content Services by using either the `TOMCAT_HOME>/shared/classes/alfresco-global.properties` file or the [Repository Admin Web Console]({% link content-services/latest/admin/admin-console.md %}).

Add the following lines to the configuration file `alfresco-global.properties` to enable the Elasticsearch Search subsystem.

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

These configuration properties are used by Content Services to communicate with the Elasticsearch server. In the example above a plain HTTP connection is configured, but Alfresco Repository also supports communication with Elasticsearch server using Basic Authentication and the HTTPs protocol, for more see [Subsystem]({% link search-services/latest/config/index.md %}).

If using the Repository Admin Web Console select `Repository Services > Search Service` and set the properties from that web page, see below.

![console]({% link search-enterprise/images/alfresco_repo_web_console.png %})

> **Note:** In Content Services 7.1, the `Test Connection` button will fail if your Elasticsearch server does not include the "alfresco" index. You are however still able to `Save` your configuration and the index will be created automatically.

## Install using JAR files

Use this information to install the Elasticsearch connector on the same machine as Content Services using JAR files.

1. Download the `alfresco-elasticsearch-connector-distribution-4.0.0.zip` file from [Hyland Community](https://community.hyland.com/){:target="_blank"} and extract it.  

2. Verify all the required services are available:

* Alfresco ActiveMQ, by default `nio://activemq:61616`
* Alfresco Shared FileStore endpoint, by default http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/
* Alfresco Database, by default `localhost:5432`
* Elasticsearch server, by default http://elasticsearch:9200

Once you have extracted the Elasticsearch connector zip file you install the Alfresco re-indexing app, and then the Alfresco live indexing app.

### Alfresco Re-indexing app

The Elasticsearch connector *Live Indexing* component listens to messages from ActiveMQ. This means some initial information from Alfresco Repository must be indexed using the *Re-indexing* component. The *Re-indexing* component can also be used to index a pre-populated Alfresco Repository.

1. Generate a JSON mapping of namespace to prefix, for your deployed content models.
  
    To help you build the JSON file you can use [Alfresco Model Namespace-Prefix Mapping](https://github.com/AlfrescoLabs/model-ns-prefix-mapping){:target="_blank"}.

2. Copy the [JAR deployment](https://github.com/AlfrescoLabs/model-ns-prefix-mapping/releases/download/1.0.0/model-ns-prefix-mapping-1.0.0.jar){:target="_blank"} file for this module to your local Alfresco Repository deployment, for detailed information on how to deploy a Simple JAR Alfresco Repository see [Simple Module (JAR)](https://docs.alfresco.com/content-services/latest/develop/extension-packaging/#simplemodule){:target="_blank"}.

3. Once installed, the JSON mapping file can be obtained by using `http://localhost:8080/alfresco/s/model/ns-prefix-map`, see the Simplified response:

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

4. Save this content in a new file named `reindex.prefixes-file.json`.

5. Run the re-indexing application from the command line by passing the already generated JSON file and details for the Database and Elasticsearch servers.

> **Note:** Due to this application providing default values for Alfresco Repository Database username and password, it's strongly recommended you set these credentials using the command line. This ensures database credentials won't be stored in the server filesystem.

```java
java -jar alfresco-elasticsearch-reindexing-4.0.0-app.jar \
--alfresco.reindex.jobName=reindexByIds \
--spring.elasticsearch.rest.uris=http://localhost:9200 \
--spring.datasource.url=jdbc:postgresql://localhost:5432/alfresco \
--spring.datasource.username=alfresco \
--spring.datasource.password=alfresco \
--alfresco.reindex.prefixes-file=file:reindex.prefixes-file.json \
--alfresco.acceptedContentMediaTypesCache.baseurl=http://localhost:8090/transform/config \
--spring.activemq.broker-url=nio://localhost:61616
```

When completed successfully you will see:  

```text
o.s.batch.core.step.AbstractStep         : Step: [reindexByIdsStep] executed in 4s952ms
o.a.r.w.ElasticsearchRepoEventItemWriter : Total indexed documents:: 845
o.a.r.listeners.JobLifecycleListener     : Current Status: COMPLETED
```

Once the program has been executed, the existing Alfresco Repository nodes are available in Search Enterprise.

> **Note:** Additional use cases are be covered in the [Administer]({% link search-enterprise/latest/admin/index.md %}) documentation.

### Alfresco Live Indexing app

The Elasticsearch connector *Live Indexing* app can be started from the command line as a standard Spring Boot application.

1. Start the Live Indexing app.

```java
java -jar alfresco-elasticsearch-live-indexing-4.0.0-app.jar
```

If your services are deployed on a different server or port the following parameters can be used.

```java
java -jar alfresco-elasticsearch-live-indexing-4.0.0-app.jar \
--spring.activemq.broker-url=nio://localhost:61616 \
--spring.elasticsearch.rest.uris=http://localhost:9200 \
--alfresco.sharedFileStore.baseUrl=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file/ \
--alfresco.acceptedContentMediaTypesCache.baseurl=http://localhost:8090/transform/config \
--elasticsearch.indexName=alfresco
```

If required additional memory may be assigned to these services using the default JVM options. For instance, to start the Elasticsearch connector with 2 GB of RAM.

```java
java -Xmx2G -jar alfresco-elasticsearch-live-indexing-4.0.0-app.jar
```

By default, the Elasticsearch connector is started using port 8080. This port can be changed using the default Spring Boot command line parameter `server.port`. For instance, to start the Elasticsearch Connector using port `8083`.

```java
java -jar alfresco-elasticsearch-live-indexing-4.0.0-app.jar --server.port=8083
```

Once all services are up and running the Elasticsearch index will be populated and search queries will work as expected when using supported Alfresco applications such as Alfresco Digital Workspace.

## Install using Docker Compose

Use this information to quickly start up the Elasticsearch connector using Docker compose. Due to the limited capabilities of Docker compose, this deployment method is only recommended for development and test environments. You can perform the Docker compose deployment using the source code or downloading the distribution zip file. Both of these methods produce the same `docker-compose.yaml` file needed when deploying Content Services.

> **Note:** The Docker compose file provided is only for test and development purposes.

### Prerequisites

* [Docker](https://docs.docker.com/install/){:target="_blank"}
  * This allows you to run Docker images and Docker compose on a single computer.
* [Docker compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

  > **Note:** The Elasticsearch connector Docker images from Quay.io are only for Enterprise customers. You need credentials to be able to pull these images from Quay.io. Alfresco customers can request their credentials by logging a ticket at [Alfresco Support](https://community.hyland.com/){:target="_blank"}{:target="_blank"}.

### Using source code

Create the Docker compose file using the source code.

1. Retrieve the Elasticsearch connector source code with a Git client using SSH:

    ```bash
    git clone git@github.com:Alfresco/alfresco-elasticsearch-connector.git
    ```

2. Move to the folder where you cloned the project and build it using Maven:

    ```bash
    cd alfresco-elasticsearch-connector
    mvn clean install -DskipTests
    ```

    The Docker compose file is created in the `alfresco-elasticsearch-connector-distribution/src/main/resources/docker-compose` folder.

3. Move to the Docker compose folder in the distribution module:

    ```bash
    cd /alfresco-elasticsearch-connector-distribution/src/main/resources/docker-compose
    ```

### Using distribution zip

Create the Docker compose file using the distribution zip file.

1. Download the `alfresco-elasticsearch-connector-distribution-4.0.0.zip` file from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

2. Unzip the distribution zip file into a folder:

    ```bash
    unzip alfresco-elasticsearch-connector-distribution-*.zip -d alfresco-elasticsearch-connector-distribution
    ```

3. Move to the Docker compose folder in the distribution folder:

    ```bash
    cd alfresco-elasticsearch-connector-distribution/docker-compose
    ```

### Deployment steps

Deploy the Docker compose file you created.

1. Log in to Quay.io using your credentials:

    ```bash
    $ docker login https://quay.io
    ```

2. Deploy Alfresco Content Services. The `docker-compose.yml` you generated includes the Repository, ADW, Postgres, Transform Service, ActiveMQ, Alfresco Elasticsearch Connector, Elasticsearch, and Kibana.

    ```bash
    $ docker-compose up --build --force-recreate
    ```

The command downloads the images and fetches all the dependencies, then creates each container, and starts the system.

Wait for the logs to show the following message:

```bash
alfresco_1 | 05-Sep-2021 13:36:37.893 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 148870 ms
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

Log in as the administrator with the default username and password.

> **Note:** Remember to run the Alfresco Re-indexing app as described above in order to add existing Alfresco Repository nodes to the Elasticsearch server.

### Alternative deployment

By default, the Docker compose template deploys the Elasticsearch connector services individually:

* `live-indexing-mediation` the service manages ActiveMQ messages from Alfresco Repository and Alfresco Transform Service
* `live-indexing-content` the service indexes content in Search Enterprise
* `live-indexing-metadata` the service indexes metadata in Search Enterprise
* `live-indexing-path` the service indexes path queries in Search Enterprise

The `docker-compose.yml` file you generated includes:

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

live-indexing-path:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-path:${LIVE_INDEXING_PATH_TAG}
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
```

Alternatively, you can use the all-in-one Docker image for the Elasticsearch connector named `alfresco-elasticsearch-live-indexing` that includes every service:

```bash
live-indexing:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
        ALFRESCO_SHAREDFILESTORE_BASEURL: http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/
```

> **Note:** If the Elasticsearch server is available on your environment, `elasticsearch` and `kibana` services can be removed from the `docker-compose.yml` file. You can adjust the references to the `elasticsearch` service in your Docker compose file to use your Elasticsearch deployment.

## Install using Helm

Use this information to install the the Elasticsearch connector using Helm. The deployment of the Content Services stack for Kubernetes using Helm is available at [Alfresco Content Services Containerized Deployment](https://github.com/Alfresco/acs-deployment){:target="_blank"}.

Depending on where you want to install Content Services you must follow the appropriate instructions for the Kubernetes cluster, for more see [Docker Desktop](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/docker-desktop-deployment.md){:target="_blank"} or [AWS EKS](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/eks-deployment.md){:target="_blank"}.

To replace Search Services with the Elasticsearch Connector you must configure the [values.yaml](https://github.com/Alfresco/acs-deployment/blob/master/helm/alfresco-content-services/values.yaml){:target="_blank"} file and set the `alfresco-elasticsearch-connector.enabled` property to `true` and `alfresco-search.enabled` to `false`.

The Elasticsearch Connector will start four new Kubernetes deployments for live indexing:

* **Mediation:** must be always a single node. It orchestrates events from Alfresco Repository.
* **Metadata:** is responsible for indexing node metadata.
* **Content:** indexes content.
* **Path:** indexes the path of a node.

Additionally, a Kubernetes job will be started to reindex existing content in Search Enterprise. It is recommended you only run this job at the initial startup. You can enable or disable the setting in the `alfresco-elasticsearch-connector.reindexing.enabled` property file by using `true` or `false`.

To deploy Content Services with the Elasticsearch connector:

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

If you are using Docker Desktop locally, you must set `antiAffinity` to `soft` and it is recommended you reduce the Elasticsearch server resources:

```docker
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

When the system is up and running, you can access the Kibana console using port forwarding:

```bash
 kubectl port-forward service/acs-kibana 5601:5601 -n alfresco
```

and then you can access the console http://localhost:5601/app/kibana.

If you need access to the Elasticsearch server directly you have to perform the same operation:

```bash
 kubectl port-forward service/elasticsearch-master 9200:9200 -n alfresco
```

and then you can access the server http://localhost:9200/.

More properties that can be used to configure the chart are available [here](https://github.com/Alfresco/acs-deployment/tree/master/helm/alfresco-content-services/charts/alfresco-elasticsearch-connector/README.md){:target="_blank"}.

## Install Elasticsearch server

The Elasticsearch connector uses a standard Elasticsearch server. No additional plugin is required.

Other alternatives may be selected for your Elasticsearch installation, for more see [Installing Elastic Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){:target="_blank"}. Alternatively, a managed service from [Elasticsearch](https://www.elastic.co/elasticsearch/service){:target="_blank"} or [Amazon AWS](https://aws.amazon.com/elasticsearch-service/){:target="_blank"} can be used.

Both Alfresco Repository and the Elasticsearch connector support communication with the Elasticsearch server using HTTP or HTTPs protocol with or without HTTP Basic Authentication.

> **Note:** The Elasticsearch server does not require any additional software from Alfresco in order to be used by Alfresco Search Enterprise 4.0.
