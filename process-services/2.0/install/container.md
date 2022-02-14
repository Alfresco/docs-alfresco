---
title: Install using containers
---

There are two options for installing Process Services using containers:

* For trials, testing and development it's recommended to deploy with Docker for Desktop.
* For production environments, there's a reference Helm chart available for installation into a Kubernetes cluster.

> **Note:** See the [Deployment and Containerization Support Policy]({% link support/latest/policies/deployment.md %}) for information regarding the supportability of Docker images and Helm charts.

## Install with Docker

Process Services and Process Services Administrator can be deployed using separate Docker containers.

The Docker images for Process Services are available on [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"}.

To download the images from Docker Hub, use the following commands:

```bash
docker pull alfresco/process-services:2.0.x
```

```bash
docker pull alfresco/process-services-admin:2.0.x
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
|ACTIVITI_CORS_ALLOWED_ORIGINS|The host origins allowed in CORS requests. There is not a default value set. You can't use `*`.|
|ACTIVITI_CORS_ALLOWED_ORIGIN_PATTERNS| The host origin patterns allowed in CORS requests. The default is `*` but you can also use a pattern.|
|ACTIVITI_CORS_ALLOWED_METHODS|The HTTP request methods allowed for CORS requests. The default is `GET,POST,HEAD,OPTIONS,PUT,DELETE`. |
|ACTIVITI_CORS_ALLOWED_HEADERS|The headers that can be set in CORS requests. The default is `Authorization,Content-Type,Cache-Control,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-CSRF-Token`. |
|ACTIVITI_CSRF_DISABLED|Sets whether Cross Site Request Forgery is disabled or not. The default is `true`. |
|ACTIVITI_ES_SERVER_TYPE|Set this to rest to enable the REST client implementation. The default is `rest`. |
|ACTIVITI_ES_REST_CLIENT_ADDRESS|The IP address of the Elasticsearch instance. The default is `localhost`. |
|ACTIVITI_ES_REST_CLIENT_PORT|The port to contact Elasticsearch through. The default is `9200`. |
|ACTIVITI_ES_REST_CLIENT_SCHEMA|Sets whether the connection to Elasticsearch uses http or https. The default is `http`. |
|ACTIVITI_ES_REST_CLIENT_AUTH_ENABLED|Sets whether authentication is enabled for the REST connection to Elasticsearch. The default is `false`. |
|ACTIVITI_ES_REST_CLIENT_USERNAME|The username of the Elasticsearch user. The default is `admin`. |
|ACTIVITI_ES_REST_CLIENT_PASSWORD|The password for the Elasticsearch user. The default is `esadmin`. |
|ACTIVITI_ES_REST_CLIENT_KEYSTORE|The keystore used to encrypt the connection to the Elasticsearch instance. |
|ACTIVITI_ES_REST_CLIENT_KEYSTORE_TYPE|The type of keystore used for encrypting the Elasticsearch connection data. The default is `jks`. |
|ACTIVITI_ES_REST_CLIENT_KEYSTORE_PASSWORD|The password for the keystore used encrypting the Elasticsearch connection data. |

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
|IDENTITY_SERVICE_USE_BROWSER_BASED_LOGOUT|Sets whether signing out of Process Services calls the Identity Service `logout URL`. If set to `true`, set the **Admin URL** to `https://{server}:{port}/activiti-app/` under the client settings in the Identity Service management console. |

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
|ACTIVITI_ADMIN_DATASOURCE_DRIVER|The JDBC driver used to connect to the database for Process Services Administrator. The default is `org.h2.Driver`. |
|ACTIVITI_ADMIN_HIBERNATE_DIALECT|The dialect that Hibernate uses that is specific to the database type for the Process Services Administrator. The default is `org.hibernate.dialect.H2Dialect`. |
|ACTIVITI_ADMIN_REST_APP_HOST|The location of the Administrator API. This should be set to the DNS name of the deployment. The default is `localhost`. |
|ACTIVITI_ADMIN_REST_APP_PORT|The port for the Administrator API. The default is `80`. |
|ACTIVITI_ADMIN_REST_APP_USERNAME|The default user for the Admin API. The default is `admin@app.activiti.com`. |
|ACTIVITI_ADMIN_REST_APP_PASSWORD|The default password for the Admin API. The default is `admin`. |

## Install on Amazon EKS

Use the following information as a reference guide to deploy Process Services on Amazon's Elastic Container Service for Kubernetes (Amazon EKS).

**Important:** Deployment on AWS such as with Amazon EKS, is only recommended for customers with a good knowledge of Process Services, and strong competencies in AWS and containerized deployment.

There are several prerequisites for deploying on Amazon EKS using Helm charts:

* An Amazon EKS environment. See [Amazon's EKS getting started Guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html){:target="_blank"} as a reference point.
* A Kubernetes namespace configured for Process Services.
* Helm and Tiller configured in the Kubernetes cluster. See [Helm's quickstart guide](https://docs.helm.sh/using_helm/#quickstart-guide){:target="_blank"} for reference.

Use the following steps to deploy Process Services, Process Services Administrator, Process Workspace, a Postgres database and optionally the [Identity Service]({% link identity-service/1.2/index.md %}):

1. Create a Kubernetes secret to access images in Quay.

    1. Sign into Quay.io with your credentials using the following command:

        ```bash
        docker login quay.io
        ```

    2. Generate a base64 value for your `dockercfg` using one of the following commands:

        ```bash
        # Linux
        cat ~/.docker/config.json | base64
        ```

        ```bash
        # Windows
        base64 -w 0 ~/.docker/config.json
        ```

    3. Create a file called `secrets.yaml` and add the following content to it, using your base64 string from the previous step as the `.dockerconfigjson` value:

        ```yaml
        apiVersion: v1
        kind: Secret
        metadata:
          name: quay-registry-secret
        type: kubernetes.io/dockerconfigjson
        data:
          .dockerconfigjson: <your-base64-string>
        ```

    4. Upload your `secrets.yaml` file to the namespace you are deploying into using the following command:

        ```bash
        kubectl create -f <file-location>/secrets.yaml --namespace=$NAMESPACE
        ```

2. Create a Kubernetes secret for the Process Services license file with the following command:

    ```bash
    kubectl create secret generic licenseaps --from-file=./activiti.lic
    --namespace=$NAMESPACE
    ```

3. Add the Alfresco Kubernetes repository to Helm with the following command:

    ```bash
    helm repo add alfresco-stable https://kubernetes-charts.alfresco.com/stable
    ```

4. [Update the properties](#helm-properties) for the Process Services chart.

5. **(Optional)**: To enable the Identity Service:

    1. Enable the Identity Service in the `alfresco-infrastructure` section of the `values.yaml`:

        ```text
        alfresco-identity-service:
        enabled: true
        ```

    2. Set the Process Services environment variable `IDENTITY_SERVICE_ENABLED` to `true`.

    3. Set the Process Services environment variable `IDENTITY_SERVICE_AUTH` to `http://$DNS/auth`.

    4. Ensure the Identity Service settings for Process Workspace are set in the [properties](#helm-properties).

6. Deploy the chart using a command similar to the following:

    ```bash
    helm install alfresco-stable/alfresco-process-services --set dnsaddress="http://$DNS" --namespace=$NAMESPACE --set license.secretName=licenseaps
    ```

The applications will be available at the following URLs:

* Process Services: `http://$DNS/activiti-app`
* Process Services Administrator: `http://$DNS/activiti-admin`
* Process Workspace: `http://$DNS/`
* Identity Service administrator console: `http://$DNS/auth/admin`

>**Note:** To change the context paths of any of the applications, edit the ingress paths:

```yaml
ingress:
    path: /activiti-app
```

### Helm properties

The following information details the properties that can be set for Process Services when deploying via Helm on Amazon's Elastic Container Service for Kubernetes (Amazon EKS).

The following properties can be configured in the `values.yaml` file or overridden as environment variables:

|Property|Description|
|--------|-----------|
|ACTIVITI_DATASOURCE_DRIVER|The JDBC driver used to connect to the database. The default is `org.postgresql.Driver`. |
|ACTIVITI_HIBERNATE_DIALECT|The dialect that Hibernate uses that is specific to the database type. The default is `org.hibernate.dialect.PostgreSQLDialect`. |
|ACTIVITI_LICENSE_MULTI_TENANT|Set whether the license used is a multi-tenant one or not. The default is `false`. |
|ACTIVITI_DATASOURCE_URL|The location of the database that will be used. |
|ACTIVITI_DATASOURCE_USERNAME|The username to access the database with. The default is `alfresco`. |
|ACTIVITI_DATASOURCE_PASSWORD|The password for the `ACTIVITI_DATASOURCE_USERNAME` user. The default is `alfresco`. |
|ACTIVITI_CORS_ENABLED|Sets whether Cross Origin Resource Sharing (CORS) is enabled or not. The default is `true`. |
|ACTIVITI_CORS_ALLOWED_ORIGINS|The host origins allowed in CORS requests. There is not a default value set. You can't use `*`.|
|ACTIVITI_CORS_ALLOWED_ORIGIN_PATTERNS| The host origin patterns allowed in CORS requests. The default is `*` but you can also use a pattern.|
|ACTIVITI_CORS_ALLOWED_METHODS|The HTTP request methods allowed for CORS requests. The default is `GET,POST,HEAD,OPTIONS,PUT,DELETE`. |
|ACTIVITI_CORS_ALLOWED_HEADERS|The headers that can be set in CORS requests. The default is `Authorization,Content-Type,Cache-Control,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-CSRF-Token`. |
|ACTIVITI_CSRF_DISABLED|Sets whether Cross Site Request Forgery is disabled or not. The default is `true`. |
|ACTIVITI_ES_SERVER_TYPE|Set this to rest to enable the REST client implementation. The default is `rest`. |
|ACTIVITI_ES_REST_CLIENT_ADDRES|The IP address of the REST client. The default is `localhost`. |
|ACTIVITI_ES_REST_CLIENT_PORT|The port to contact Elasticsearch through. The default is `9200`. |
|ACTIVITI_ES_REST_CLIENT_SCHEMA|Sets whether the connection to Elasticsearch uses http or https. The default is `http`. |
|ACTIVITI_ES_REST_CLIENT_AUTH_ENABLED|Sets whether authentication is enabled for the REST connection to Elasticsearch. The default is `false`. |
|ACTIVITI_ES_REST_CLIENT_USERNAME|The username of the Elasticsearch user. The default is `admin`. |
|ACTIVITI_ES_REST_CLIENT_PASSWORD|The password for the Elasticsearch user. The default is `esadmin`. |
|ACTIVITI_ES_REST_CLIENT_KEYSTORE|The keystore used to encrypt the connection to the Elasticsearch instance. |
|ACTIVITI_ES_REST_CLIENT_KEYSTORE_TYPE|The type of keystore used for encrypting the Elasticsearch connection data. The default is `jks`. |
|ACTIVITI_ES_REST_CLIENT_KEYSTORE_PASSWORD|The password for the keystore used encrypting the Elasticsearch connection data. |
|ACTIVITI_ADMIN_DATASOURCE_DRIVER|The JDBC driver used to connect to the database for Process Services Administrator. The default is `org.postgresql.Driver`. |
|ACTIVITI_ADMIN_HIBERNATE_DIALECT|The dialect that Hibernate uses that is specific to the database type for the Process Services Administrator. The default is `org.hibernate.dialect.PostgreSQLDialect`. |
|ACTIVITI_ADMIN_EMAIL|The email address for the default administrator user. The default is `admin@app.activiti.com`. |
|ACTIVITI_ADMIN_PASSWORD_HASH|The hashed password for `ACTIVITI_ADMIN_EMAIL` user. |
|ACTIVITI_ADMIN_REST_APP_HOST|The location of the Administrator API. This should be set to the DNS name of the deployment. The default is `localhost`. |
|ACTIVITI_ADMIN_REST_APP_PORT|The port for the Administrator API. The default is `80`. |
|ACTIVITI_ADMIN_REST_APP_USERNAME|The default user for the Admin API. The default is `admin@app.activiti.com`. |
|ACTIVITI_ADMIN_REST_APP_PASSWORD|The default password for the Admin API. The default is `admin`. |
|BASE_PATH|The base path of Process Workspace. This needs to match the setting of the ingress path if it is changed. The default is `/`. |
|APP_CONFIG_AUTH_TYPE|The authentication method for Process Workspace. The default is `OAUTH`. |
|APP_CONFIG_BPM_HOST|The location of Process Services. The default is `http://DNS`. |
|APP_CONFIG_OAUTH2_HOST|The URL used to authenticate Process Workspace with against the Identity Service. The default is `http://DNS/auth/realms/alfresco`. |
|APP_CONFIG_OAUTH2_CLIENTID|The client configured in the Identity Service for Process Workspace. The default is `activiti`. |
|APP_CONFIG_OAUTH2_REDIRECT_LOGIN|The redirect for sign in that Process Workspace will use when configured with Identity Service. This will normally match `BASE_PATH`. The default is `/`. |
|APP_CONFIG_OAUTH2_REDIRECT_LOGOUT|The redirect for sign out that Process Workspace will use when configured with Identity Service. This will normally match `BASE_PATH`. The default is `/`. |
|APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI|The silent redirect used by Process Workspace if a user is already authenticated. The default is `http://DNS/process-workspace/assets/silent-refresh.html`. |
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
|IDENTITY_CREDENTIALS_SECRET|The secret key for the client if the access type is not `public`. |
|IDENTITY_SERVICE_AUTH|Sets the authentication URL for the Identity Service. The `localhost` value and port number need to be replaced with the DNS or address used for the deployment. The default is `http://localhost:8080/auth`. |
|IDENTITY_SERVICE_USE_BROWSER_BASED_LOGOUT|Sets whether signing out of Process Services calls the Identity Service `logout URL`.If set to `true`, set the **Admin URL** to `https://{server}:{port}/activiti-app/` under the client settings in the Identity Service management console. The default is `true`. |
