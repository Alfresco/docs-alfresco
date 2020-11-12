---
title: Install using containers
nav: false
---

Containers can only be used to install Process Services for trial, testing and development purposes. This is done using Docker for Desktop.

## Install with Docker

Process Services and Process Services Administrator can be deployed using separate Docker containers.

The Docker images for Process Services are available on [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"}.

To download the images from Docker Hub, use the following commands:

```bash
docker pull alfresco/process-services:1.9.0
```

```bash
docker pull alfresco/process-services-admin:1.9.0
```

>**Note:** If a tag isn't supplied then the latest version will be downloaded.

To run the containers locally using Docker for Desktop, use the following commands specifying a port for them to map to:

```bash
docker run -p {port}:8080 alfresco/process-services
```

```bash
docker run -p {port}:8080 alfresco/process-services-admin
```

For example, to run Process Services Administrator on port 8095 use the following:

```bash
docker run -p 8095:8080 alfresco/process-services-admin
```

Once the containers have started up, visit the following URLs to access the applications:

* `http://localhost:{port}/activiti-app`
* `http://localhost:{port}/activiti-admin`

For example `http://localhost:8095/activiti-admin` if running the Administrator application on port 8095.

>**Note:** Docker for Desktop is not a production environment.

It is possible to override the default environment variables for Process Services and Process Services Administrator, 
see next sections.

### Configure Process Services variables

It is possible to override the default variable values used by the Docker container.

There are three options for specifying your own variables during a Docker deployment:

* Mount your own `activiti-app.properties` and optionally an `activiti-identity-service.properties` file in `/usr/local/tomcat/lib` using Docker volumes.
* Specifying environment variables for each properties file that points to an accessible location such as an S3 bucket:

    * Use the `EXTERNAL_ACTIVITI_APP_PROPERTIES_FILE` environment variable for an `activiti-app.properties` file.
    * Use the `EXTERNAL_ACTIVITI_IDENTITY_SERVICE_PROPERTIES_FILE` environment variable for an `activiti-identity-service.properties` file.
        >**Note:** If you choose this option, the files will be automatically downloaded into the contextual folder.
* Configure the environment variables in the Docker container by overriding the default values.

Variables that correspond to the `activiti-app.properties` file:

|Property|Description|
|--------|-----------|
|ACTIVITI_DATASOURCE_DRIVER|The JDBC driver used to connect to the database. The default is `org.h2.Driver`. |
|ACTIVITI_HIBERNATE_DIALECT|The dialect that Hibernate uses that is specific to the database type. The default is `org.hibernate.dialect.H2Dialect`. |
|ACTIVITI_LICENSE_MULTI_TENANT|Set whether the license used is a multi-tenant one or not. The default is `false`. |
|ACTIVITI_DATASOURCE_URL|The location of the database that will be used. The default is `jdbc:h2:mem:db1;DB_CLOSE_DELAY=1000`. |
|ACTIVITI_DATASOURCE_USERNAME|The username to access the database with. The default is `alfresco`. |
|ACTIVITI_DATASOURCE_PASSWORD|The password for the `ACTIVITI_DATASOURCE_USERNAME` user. The default is `alfresco`. |
|ACTIVITI_ADMIN_EMAIL|The email address for the default administrator user. The default is `admin@app.activiti.com`. |
|ACTIVITI_ADMIN_PASSWORD_HASH|The hashed password for `ACTIVITI_ADMIN_EMAIL` user. The default is ``. |
|ACTIVITI_CORS_ENABLED|Sets whether Cross Origin Resource Sharing (CORS) is enabled or not. The default is `true`. |
|ACTIVITI_CORS_ALLOWED_ORIGINS|The host origins allowed in CORS requests. The default is `*`. |
|ACTIVITI_CORS_ALLOWED_METHODS|The HTTP request methods allowed for CORS requests. The default is `GET,POST,HEAD,OPTIONS,PUT,DELETE`. |
|ACTIVITI_CORS_ALLOWED_HEADERS|The headers that can be set in CORS requests. The default is `Authorization,Content-Type,Cache-Control,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-CSRF-Token`. |
|ACTIVITI_CSRF_DISABLED|Sets whether Cross Site Request Forgery is disabled or not. The default is `true`. |
|ACTIVITI_ES_SERVER_TYPE|Set this to rest to enable the REST client implementation. The default is `rest`. |
|ACTIVITI_ES_DISCOVERY_TYPE| Set how the Elasticsearch client is discovered, for example `unicast`. |
|ACTIVITI_ES_DISCOVERY_HOSTS| Set the host for the Elasticsearch client, for example `localhost:9300`. |
|ACTIVITI_ES_CLUSTER_NAME| The cluster name of the Elasticsearch client, for example `elasticsearch`. |

Variables that correspond to the `activiti-identity-service.properties` file:

|Property|Description|
|--------|-----------|
|IDENTITY_SERVICE_ENABLED|Sets whether the Identity Service is enabled or not. The default is `false`. |
|IDENTITY_SERVICE_REALM|The name of the realm used by the Identity Service. The default is `alfresco`. |
|IDENTITY_SERVICE_SSL_REQUIRED|Sets whether communication to and from the Identity Service is over HTTPS or not. The default is `none`. |
|IDENTITY_SERVICE_RESOURCE|The Client ID for Process Services within the Identity Service realm. The default is `alfresco`. |
|IDENTITY_SERVICE_PRINCIPAL_ATTRIBUTE|The attribute used to populate `UserPrincipal` with. This needs to be set to `email` for Process Services to authenticate with the Identity Service. |
|IDENTITY_SERVICE_ALWAYS_REFRESH_TOKEN|Sets whether the token is refresh for every request to the Identity Service or not. The default is `true`. |
|IDENTITY_SERVICE_AUTODETECT_BEARER_ONLY|Allows for unauthorized access requests to be redirected to the Identity Service sign in page. The default is `true`. |
|IDENTITY_SERVICE_TOKEN_STORE|The location of where the account information token is stored. The default is `session`. |
|IDENTITY_SERVICE_ENABLE_BASIC_AUTH|Sets whether basic authentication is allowed is supported by the adapter. The default is `true`. |
|IDENTITY_SERVICE_PUBLIC_CLIENT|Sets whether the adapter sends credentials for the client to the Identity Service. It will not send the credentials if this is set to `true`. |
|IDENTITY_SERVICE_AUTH|Sets the authentication URL for the Identity Service. The `localhost` value and port number need to be replaced with the DNS or address used for the deployment, for example `http://localhost:8080/auth`. |
|IDENTITY_CREDENTIALS_SECRET|The secret key for the client if the access type is not `public`. |

#### Configure Process Services Administrator variables

It is possible to override the default variable values used by the Docker container.

There are three options for specifying your own variables during a Docker deployment:

* Mount your own `activiti-admin.properties` file in `/usr/local/tomcat/lib` using Docker volumes
* Use the environment variable `ACTIVITI_ADMIN_EXTERNAL_PROPERTIES_FILE` to point to an accessible location such as an S3 bucket:

    ```yaml
    environment:
      ACTIVITI_ADMIN_EXTERNAL_PROPERTIES_FILE: https://your-s3-bucket.com/activiti-admin.properties
    ```

* Configure the environment variables in the Docker container by overriding the default values:

|Property|Description|
|--------|-----------|
|ACTIVITI_ADMIN_DATASOURCE_URL|The URL of the datasource to use, for example `jdbc:h2:tcp://localhost/activiti-admin`.|
|ACTIVITI_ADMIN_DATASOURCE_USERNAME|The user to connect to the datasource with.|
|ACTIVITI_ADMIN_DATASOURCE_PASSWORD|The password of the user to connect to the datasource with.|
|ACTIVITI_ADMIN_DATASOURCE_DRIVER|The JDBC driver used to connect to the database for Process Services Administrator. The default is `org.h2.Driver`. |
|ACTIVITI_ADMIN_HIBERNATE_DIALECT|The dialect that Hibernate uses that is specific to the database type for the Process Services Administrator. The default is `org.hibernate.dialect.H2Dialect`. |
|ACTIVITI_ADMIN_REST_APP_HOST|The location of the Administrator API. This should be set to the DNS name of the deployment. The default is `localhost`. |
|ACTIVITI_ADMIN_REST_APP_PORT|The port for the Administrator API. The default is `80`. |
|ACTIVITI_ADMIN_REST_APP_USERNAME|The default user for the Admin API. The default is `admin@app.activiti.com`. |
|ACTIVITI_ADMIN_REST_APP_PASSWORD|The default password for the Admin API. The default is `admin`. |
