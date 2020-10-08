---
title: Install Process Services
---

There are several options for installing Process Services and its associated applications.

The applications available to deploy are:

* Process Services - including workflow engine and Activiti App UI.
* Process Services Administrator - the Activiti Admin UI.
* Process Workspace - the new Process Services UI.

The following methods are available to deploy Process Services:

* Using containerized deployment
* Installing with setup Wizards
* Manual installtion

## Install using containers

There are several options for installing Process Services using containers:

* For trials, testing, tutorials, dev work etc it's recommended to deploy with **Docker for Desktop**.
* For production environments, there's a reference **Helm chart** available for installation into Kubernetes cluster

See the [containerization support policy](TODO_LINK:https://docs.alfresco.com/support/concepts/su-containerization-policy.html) for information regarding the supportability of Docker images and Helm charts.

### Container concepts

Process Services container installation introduces a number of concepts.

You can start Process Services from a number of Docker images. These images are available in 
the [Docker Hub](https://hub.docker.com) and [Quay](https://quay.io/) repositories. 
However, starting individual Docker containers based on these images, and configuring them to work together might 
not be the most productive way to get up and running.

There are **Helm charts** available to deploy Process Services in a Kubernetes cluster, for example, on Amazon Web Services (AWS). 
These charts are a deployment template which can be used as the basis for your specific deployment needs. 
The Helm charts are undergoing continual development and improvement and should not be used "as-is" for a production deployment, 
but should help you save time and effort deploying Process Services for your organization.

The following is a list of concepts and technologies that you'll need to understand as part of installing Process Services using containers. 
If you know all about Docker, then you can skip this part.

**Virtual Machine Monitor (Hypervisor)**

A Hypervisor is used to run other OS instances on your local host machine. Typically it's used to run a different OS 
on your machine, such as Windows on a Mac. When you run another OS on your host it is called a guest OS, 
and it runs in a Virtual Machine (VM).

**Image**

An image is a number of layers that can be used to instantiate a container. This could be, for example, Java and Apache Tomcat. 
You can find all kinds of Docker images on the public repository [Docker Hub](https://hub.docker.com/). 
There are also private image repositories (for things like commercial enterprise images), such as the one Alfresco 
uses called [Quay](https://quay.io/).

**Container**

An instance of an image is called a container. If you start this image, you have a running container of this image. 
You can have many running containers of the same image.

**Docker**

Docker is one of the most popular container platforms. [Docker](https://www.docker.com/) provides functionality for 
deploying and running applications in containers based on images.

**Dockerfile**

A **Dockerfile** is a script containing a successive series of instructions, directions, and commands which are run to 
form a new Docker image. Each command translates to a new layer in the image, forming the end product. 
The Dockerfile replaces the process of doing everything manually and repeatedly. When a Dockerfile finishes building, 
the end result is a new image, which you can use to start a new Docker container.

**Difference between containers and virtual machines**

It's important to understand the difference between using containers and using VMs. Here's a picture 
from [What is a Container | Docker](https://www.docker.com/what-container):

![vm-vs-container]({% link process-services/images/vm-vs-container.png %})

The main difference is that when you run a container, you are not starting a complete new OS instance. 
This makes containers much more lightweight and quicker to start. A container also takes up much less space on your 
hard-disk as it doesn't have to ship the whole OS.

### Install with Docker

Process Services and Process Services Administrator can be deployed using separate Docker containers.

The Docker images for Process Services are available on [Docker Hub](https://hub.docker.com/u/alfresco/).

To download the images from Docker Hub, use the following commands:

```bash
docker pull alfresco/process-services:1.11.0
```

```bash
docker pull alfresco/process-services-admin:1.11.0
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

#### Configure Process Services

It is possible to override the default variable values used by the Docker container.

There are three options for specifying your own variables during a Docker deployment:

* Mount your own `activiti-app.properties` and optionally an `activiti-identity-service.properties` file in `/usr/local/tomcat/lib` using Docker volumes
* Specifying environment variables for each properties file that points to an accessible location such as an S3 bucket:
    * Use the `EXTERNAL_ACTIVITI_APP_PROPERTIES_FILE` environment variable for an `activiti-app.properties` file
    * Use the `EXTERNAL_ACTIVITI_IDENTITY_SERVICE_PROPERTIES_FILE` environment variable for an `activiti-identity-service.properties` file
        >**Note:** If you choose this option, the files will be automatically downloaded into the contextual folder.
* Configure the environment variables in the Docker container by overriding the default values.

**For variables that correspond to the `activiti-app.properties` file:**

|Property|Description|Default value|
|--------|-----------|-------------|
|ACTIVITI_DATASOURCE_DRIVER|The JDBC driver used to connect to the database.|`org.h2.Driver`|
|ACTIVITI_HIBERNATE_DIALECT|The dialect that Hibernate uses that is specific to the database type.|`org.hibernate.dialect.H2Dialect`|
|ACTIVITI_LICENSE_MULTI_TENANT|Set whether the license used is a multi-tenant one or not.|`false`|
|ACTIVITI_DATASOURCE_URL|The location of the database that will be used.|`jdbc:h2:mem:db1;DB_CLOSE_DELAY=1000`|
|ACTIVITI_DATASOURCE_USERNAME|The username to access the database with.|`alfresco`|
|ACTIVITI_DATASOURCE_PASSWORD|The password for the `ACTIVITI_DATASOURCE_USERNAME` user.|`alfresco`|
|ACTIVITI_ADMIN_EMAIL|The email address for the default administrator user.|`admin@app.activiti.com`|
|ACTIVITI_ADMIN_PASSWORD_HASH|The hashed password for `ACTIVITI_ADMIN_EMAIL` user.|``|
|ACTIVITI_CORS_ENABLED|Sets whether Cross Origin Resource Sharing (CORS) is enabled or not.|`true`|
|ACTIVITI_CORS_ALLOWED_ORIGINS|The host origins allowed in CORS requests.|`*`|
|ACTIVITI_CORS_ALLOWED_METHODS|The HTTP request methods allowed for CORS requests.|`GET,POST,HEAD,OPTIONS,PUT,DELETE`|
|ACTIVITI_CORS_ALLOWED_HEADERS|The headers that can be set in CORS requests.|`Authorization,Content-Type,Cache-Control,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-CSRF-Token`|
|ACTIVITI_CSRF_DISABLED|Sets whether Cross Site Request Forgery is disabled or not.|`true`|
|ACTIVITI_ES_SERVER_TYPE|Set this to rest to enable the REST client implementation.|`rest`|
|ACTIVITI_ES_REST_CLIENT_ADDRESS|The IP address of the Elasticsearch instance.|`localhost`|
|ACTIVITI_ES_REST_CLIENT_PORT|The port to contact Elasticsearch through.|`9200`|
|ACTIVITI_ES_REST_CLIENT_SCHEMA|Sets whether the connection to Elasticsearch uses http or https.|`http`|
|ACTIVITI_ES_REST_CLIENT_AUTH_ENABLED|Sets whether authentication is enabled for the REST connection to Elasticsearch.|`false`|
|ACTIVITI_ES_REST_CLIENT_USERNAME|The username of the Elasticsearch user.|`admin`|
|ACTIVITI_ES_REST_CLIENT_PASSWORD|The password for the Elasticsearch user.|`esadmin`|
|ACTIVITI_ES_REST_CLIENT_KEYSTORE|The keystore used to encrypt the connection to the Elasticsearch instance.|``|
|ACTIVITI_ES_REST_CLIENT_KEYSTORE_TYPE|The type of keystore used for encrypting the Elasticsearch connection data.|`jks`|
|ACTIVITI_ES_REST_CLIENT_KEYSTORE_PASSWORD|The password for the keystore used encrypting the Elasticsearch connection data.|``|

**For variables that correspond to the `activiti-identity-service.properties` file:**

|Property|Description|Default value|
|--------|-----------|-------------|
|IDENTITY_SERVICE_ENABLED|Sets whether the Identity Service is enabled or not.|`false`|
|IDENTITY_SERVICE_REALM|The name of the realm used by the Identity Service.|`alfresco`|
|IDENTITY_SERVICE_SSL_REQUIRED|Sets whether communication to and from the Identity Service is over HTTPS or not.|`none`|
|IDENTITY_SERVICE_RESOURCE|The Client ID for Process Services within the Identity Service realm.|`alfresco`|
|IDENTITY_SERVICE_PRINCIPAL_ATTRIBUTE|The attribute used to populate `UserPrincipal` with. This needs to be set to `email` for Process Services to authenticate with the Identity Service.|`email`|
|IDENTITY_SERVICE_ALWAYS_REFRESH_TOKEN|Sets whether the token is refresh for every request to the Identity Service or not.|`true`|
|IDENTITY_SERVICE_AUTODETECT_BEARER_ONLY|Allows for unauthorized access requests to be redirected to the Identity Service sign in page.|`true`|
|IDENTITY_SERVICE_TOKEN_STORE|The location of where the account information token is stored.|`session`|
|IDENTITY_SERVICE_ENABLE_BASIC_AUTH|Sets whether basic authentication is allowed is supported by the adapter.|`true`|
|IDENTITY_SERVICE_PUBLIC_CLIENT|Sets whether the adapter sends credentials for the client to the Identity Service. It will not send the credentials if this is set to `true`.|`true`|
|IDENTITY_SERVICE_AUTH|Sets the authentication URL for the Identity Service. The `localhost` value and port number need to be replaced with the DNS or address used for the deployment.|`http://localhost:8080/auth`|
|IDENTITY_CREDENTIALS_SECRET|The secret key for the client if the access type is not `public`.|``|
|IDENTITY_SERVICE_USE_BROWSER_BASED_LOGOUT|Sets whether signing out of Process Services calls the Identity Service `logout URL`. If set to `true`, set the **Admin URL** to `https://{server}:{port}/activiti-app/` under the client settings in the Identity Service management console.|`true`|

#### Configure Process Services Administrator

It is possible to override the default variable values used by the Docker container.

There are three options for specifying your own variables during a Docker deployment:

* Mount your own `activiti-admin.properties` file in `/usr/local/tomcat/lib` using Docker volumes
* Use the environment variable `ACTIVITI_ADMIN_EXTERNAL_PROPERTIES_FILE` to point to an accessible location such as an S3 bucket:
    ```text
    environment:
      ACTIVITI_ADMIN_EXTERNAL_PROPERTIES_FILE: https://your-s3-bucket.com/activiti-admin.properties
    ```
* Configure the environment variables in the Docker container by overriding the default values:

|Property|Description|Default value|
|--------|-----------|-------------|
|ACTIVITI_ADMIN_DATASOURCE_DRIVER|The JDBC driver used to connect to the database for Process Services Administrator.|`org.h2.Driver`|
|ACTIVITI_ADMIN_HIBERNATE_DIALECT|The dialect that Hibernate uses that is specific to the database type for the Process Services Administrator.|`org.hibernate.dialect.H2Dialect`|
|ACTIVITI_ADMIN_REST_APP_HOST|The location of the Administrator API. This should be set to the DNS name of the deployment.|`localhost`|
|ACTIVITI_ADMIN_REST_APP_PORT|The port for the Administrator API.|`80`|
|ACTIVITI_ADMIN_REST_APP_USERNAME|The default user for the Admin API.|`admin@app.activiti.com`|
|ACTIVITI_ADMIN_REST_APP_PASSWORD|The default password for the Admin API|`admin`|

### Install on Amazon EKS

Use the following information as a reference guide to deploy Process Services on Amazon's Elastic Container Service 
for Kubernetes (Amazon EKS).

**Important:** Deployment on AWS such as with Amazon EKS, is only recommended for customers 
with a good knowledge of Process Services, and strong competencies in AWS and containerized deployment.

There are several prerequisites for deploying on Amazon EKS using Helm charts:

* An Amazon EKS environment. See [Amazon's EKS getting started Guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html) as a reference point.
* A Kubernetes namespace configured for Process Services.
* Helm and Tiller configured in the Kubernetes cluster. See [Helm's quickstart guide](https://docs.helm.sh/using_helm/#quickstart-guide) for reference.

Use the following steps to deploy Process Services, Process Services Administrator, Process Workspace, 
a Postgres database and optionally the [Identity Service](TODO_LINK:https://docs.alfresco.com/identity/concepts/identity-overview.html):

1.  Create a Kubernetes secret to access images in Quay.

    1.  Sign into Quay.io with your credentials using the following command:

        ```bash
        docker login quay.io
        ```

    2.  Generate a base64 value for your dockercfg using one of the following commands:

        ```bash
        # Linux
        cat ~/.docker/config.json | base64
        ```

        ```bash
        # Windows
        base64 -w 0 ~/.docker/config.json
        ```

    3.  Create a file called `secrets.yaml` and add the following content to it, using your base64 string from the previous step as the `.dockerconfigjson` value:

        ```text
        apiVersion: v1
        kind: Secret
        metadata:
          name: quay-registry-secret
        type: kubernetes.io/dockerconfigjson
        data:
          .dockerconfigjson: <your-base64-string> 
        ```

    4.  Upload your `secrets.yaml` file to the namespace you are deploying into using the following command:

        ```bash
        kubectl create -f <file-location>/secrets.yaml --namespace=$NAMESPACE
        ```

2.  Create a Kubernetes secret for the Process Services license file with the following command:

    ```bash
    kubectl create secret generic licenseaps --from-file=./activiti.lic
    --namespace=$NAMESPACE
    ```

3.  Add the Alfresco Kubernetes repository to Helm with the following command:

    ```bash
    helm repo add alfresco-stable https://kubernetes-charts.alfresco.com/stable
    ```

4.  [Update the properties](#helm-properties) for the Process Services chart.

5.  **(Optional)**: To enable the Identity Service:

    1.  Enable the Identity Service in the `alfresco-infrastructure` section of the `values.yaml`:

        ```text
        alfresco-identity-service:
        enabled: true
        ```

    2.  Set the Process Services environment variable `IDENTITY_SERVICE_ENABLED` to `true`.

    3.  Set the Process Services environment variable `IDENTITY_SERVICE_AUTH` to `http://$DNS/auth`.

    4.  Ensure the Identity Service settings for Process Workspace are set in the [properties](#helm-properties).

6.  Deploy the chart using a command similar to the following:

    ```bash
    helm install alfresco-stable/alfresco-process-services --set dnsaddress="http://$DNS" --namespace=$NAMESPACE --set license.secretName=licenseaps
    ```

The applications will be available at the following URLs:

* Process Services: `http://$DNS/activiti-app`
* Process Services Administrator: `http://$DNS/activiti-admin`
* Process Workspace: `http://$DNS/`
* Identity Service administrator console: `http://$DNS/auth/admin`

>**Note:** To change the context paths of any of the applications, edit the ingress paths:

```text
ingress:
    path: /activiti-app
```

#### Helm properties

The following information details the properties that can be set for Process Services when deploying via Helm on 
Amazon's Elastic Container Service for Kubernetes (Amazon EKS).

The following properties can be configured in the `values.yaml` file or overridden as environment variables:

|Property|Description|Default value|
|--------|-----------|-------------|
|ACTIVITI_DATASOURCE_DRIVER|The JDBC driver used to connect to the database.|`org.postgresql.Driver`|
|ACTIVITI_HIBERNATE_DIALECT|The dialect that Hibernate uses that is specific to the database type.|`org.hibernate.dialect.PostgreSQLDialect`|
|ACTIVITI_LICENSE_MULTI_TENANT|Set whether the license used is a multi-tenant one or not.|`false`|
|ACTIVITI_DATASOURCE_URL|The location of the database that will be used.|``|
|ACTIVITI_DATASOURCE_USERNAME|The username to access the database with.|`alfresco`|
|ACTIVITI_DATASOURCE_PASSWORD|The password for the `ACTIVITI_DATASOURCE_USERNAME` user.|`alfresco`|
|ACTIVITI_CORS_ENABLED|Sets whether Cross Origin Resource Sharing (CORS) is enabled or not.|`true`|
|ACTIVITI_CORS_ALLOWED_ORIGINS|The host origins allowed in CORS requests.|`*`|
|ACTIVITI_CORS_ALLOWED_METHODS|The HTTP request methods allowed for CORS requests.|`GET,POST,HEAD,OPTIONS,PUT,DELETE`|
|ACTIVITI_CORS_ALLOWED_HEADERS|The headers that can be set in CORS requests.|`Authorization,Content-Type,Cache-Control,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-CSRF-Token`|
|ACTIVITI_CSRF_DISABLED|Sets whether Cross Site Request Forgery is disabled or not.|`true`|
|ACTIVITI_ES_SERVER_TYPE|Set this to rest to enable the REST client implementation.|`rest`|
|ACTIVITI_ES_REST_CLIENT_ADDRES|The IP address of the REST client.|`localhost`|
|ACTIVITI_ES_REST_CLIENT_PORT|The port to contact Elasticsearch through.|`9200`|
|ACTIVITI_ES_REST_CLIENT_SCHEMA|Sets whether the connection to Elasticsearch uses http or https.|`http`|
|ACTIVITI_ES_REST_CLIENT_AUTH_ENABLED|Sets whether authentication is enabled for the REST connection to Elasticsearch.|`false`|
|ACTIVITI_ES_REST_CLIENT_USERNAME|The username of the Elasticsearch user.|`admin`|
|ACTIVITI_ES_REST_CLIENT_PASSWORD|The password for the Elasticsearch user.|`esadmin`|
|ACTIVITI_ES_REST_CLIENT_KEYSTORE|The keystore used to encrypt the connection to the Elasticsearch instance.|``|
|ACTIVITI_ES_REST_CLIENT_KEYSTORE_TYPE|The type of keystore used for encrypting the Elasticsearch connection data.|`jks`|
|ACTIVITI_ES_REST_CLIENT_KEYSTORE_PASSWORD|The password for the keystore used encrypting the Elasticsearch connection data.|``|
|ACTIVITI_ADMIN_DATASOURCE_DRIVER|The JDBC driver used to connect to the database for Process Services Administrator.|`org.postgresql.Driver`|
|ACTIVITI_ADMIN_HIBERNATE_DIALECT|The dialect that Hibernate uses that is specific to the database type for the Process Services Administrator.|`org.hibernate.dialect.PostgreSQLDialect`|
|ACTIVITI_ADMIN_EMAIL|The email address for the default administrator user.|`admin@app.activiti.com`|
|ACTIVITI_ADMIN_PASSWORD_HASH|The hashed password for `ACTIVITI_ADMIN_EMAIL` user.|``|
|ACTIVITI_ADMIN_REST_APP_HOST|The location of the Administrator API. This should be set to the DNS name of the deployment.|`localhost`|
|ACTIVITI_ADMIN_REST_APP_PORT|The port for the Administrator API.|`80`|
|ACTIVITI_ADMIN_REST_APP_USERNAME|The default user for the Admin API.|`admin@app.activiti.com`|
|ACTIVITI_ADMIN_REST_APP_PASSWORD|The default password for the Admin API|`admin`|
|BASE_PATH|The base path of Process Workspace. This needs to match the setting of the ingress path if it is changed.|`/`|
|APP_CONFIG_AUTH_TYPE|The authentication method for Process Workspace.|`OAUTH`|
|APP_CONFIG_BPM_HOST|The location of Process Services.|`http://DNS`|
|APP_CONFIG_OAUTH2_HOST|The URL used to authenticate Process Workspace with against the Identity Service.|`http://DNS/auth/realms/alfresco`|
|APP_CONFIG_OAUTH2_CLIENTID|The client configured in the Identity Service for Process Workspace.|`activiti`|
|APP_CONFIG_OAUTH2_REDIRECT_LOGIN|The redirect for sign in that Process Workspace will use when configured with Identity Service. This will normally match `BASE_PATH`.|`/`|
|APP_CONFIG_OAUTH2_REDIRECT_LOGOUT|The redirect for sign out that Process Workspace will use when configured with Identity Service. This will normally match `BASE_PATH`.|`/`|
|APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI|The silent redirect used by Process Workspace if a user is already authenticated.|`http://DNS/process-workspace/assets/silent-refresh.html`|
|IDENTITY_SERVICE_ENABLED|Sets whether the Identity Service is enabled or not.|`false`|
|IDENTITY_SERVICE_REALM|The name of the realm used by the Identity Service.|`alfresco`|
|IDENTITY_SERVICE_SSL_REQUIRED|Sets whether communication to and from the Identity Service is over HTTPS or not.|`none`|
|IDENTITY_SERVICE_RESOURCE|The Client ID for Process Services within the Identity Service realm.|`alfresco`|
|IDENTITY_SERVICE_PRINCIPAL_ATTRIBUTE|The attribute used to populate `UserPrincipal` with. This needs to be set to `email` for Process Services to authenticate with the Identity Service.|`email`|
|IDENTITY_SERVICE_ALWAYS_REFRESH_TOKEN|Sets whether the token is refresh for every request to the Identity Service or not.|`true`|
|IDENTITY_SERVICE_AUTODETECT_BEARER_ONLY|Allows for unauthorized access requests to be redirected to the Identity Service sign in page.|`true`|
|IDENTITY_SERVICE_TOKEN_STORE|The location of where the account information token is stored.|`session`|
|IDENTITY_SERVICE_ENABLE_BASIC_AUTH|Sets whether basic authentication is allowed is supported by the adapter.|`true`|
|IDENTITY_SERVICE_PUBLIC_CLIENT|Sets whether the adapter sends credentials for the client to the Identity Service. It will not send the credentials if this is set to `true`.|`true`|
|IDENTITY_CREDENTIALS_SECRET|The secret key for the client if the access type is not `public`.|``|
|IDENTITY_SERVICE_AUTH|Sets the authentication URL for the Identity Service. The `localhost` value and port number need to be replaced with the DNS or address used for the deployment.|`http://localhost:8080/auth`|
|IDENTITY_SERVICE_USE_BROWSER_BASED_LOGOUT|Sets whether signing out of Process Services calls the Identity Service `logout URL`.If set to `true`, set the **Admin URL** to `https://{server}:{port}/activiti-app/` under the client settings in the Identity Service management console.|`true`|

## Other installation methods

There are several options for installing Process Services without using containers, 
it depends on the environment you are deploying in:

* For trials, testing, tutorials, dev work etc it's recommended to install using a **setup wizard**
* For production environments it is recommended that you **install manually**

### Install manually

To install Process Services and the administrator application manually, download the relevant 
Web Application Archive (WAR) files.

It is recommended that you install the administrator application in a separate container to Process Services 
in a production environment. It is possible to install the two applications in the same web container, 
however separate containers allows them to be managed in isolation from one another.

The download files are available from the [support portal](https://support.alfresco.com).

#### Installing Process Services manually

Use these instructions to install the Process Services application using the WAR file.

Ensure you have read the [supported platforms]({% link process-services/latest/support/index.md %}) to confirm that your web container 
and database combination is supported before commencing with installation.

1.  Install your web container and database.

    >**Note:** The following steps use Tomcat and MySQL for examples.

2.  Create a schema for the `activiti-app` application. The default name is `activiti`

    In MySQL:

    ```bash
    CREATE DATABASE activiti DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
    ```

3.  Create a user and password. This example will use `alfresco/alfresco`

    In MySQL:

    ```bash
    CREATE USER 'alfresco'@'localhost' IDENTIFIED BY 'alfresco';
    ```

4.  Grant full privileges on the schema to this new user.

    In MySQL:

    ```bash
    GRANT ALL ON activiti.* TO 'alfresco'@'localhost';
    ```

5.  Edit the `activiti-app.properties` file supplied with the WAR file.

    1.  Uncomment the correct properties for the database you have installed.

    2.  Update the values for the schema and credentials created in the previous steps and check that the `hibernate.dialect` property matches your chosen database type.

        For example:

        ```text
        datasource.driver=com.mysql.jdbc.Driver
        datasource.url=jdbc:mysql://127.0.0.1:3306/activiti?characterEncoding=UTF-8
        datasource.username=alfresco
        datasource.password=alfresco
        hibernate.dialect=org.hibernate.dialect.MySQLDialect
        ```

        >**Note:** Example syntax is provided in the `activiti-app.properties` file for other database types.

        **Important:** Ensure that the driver for your database is on the classpath of the web application.

    3.  Set a location for the file content to be at using `contentstorage.fs.rootFolder`.

    4.  Set a location for the search and analytics indexes using `elastic-search.data.path`.

6.  Ensure that the driver for your database is on the classpath of your web container.

    For Tomcat and MySQL:

    Copy the MySQL java connector jar to `<Tomcat install location>/lib`

7.  Copy the `activiti-app.war` and `activiti-app.properties` files to your web container.

    For Tomcat:

    * `<Tomcat install location>/webapps/activiti-app.war`
    * `<Tomcat install location>/lib/activiti-app.properties`
    
8.  Start up your web container.

    For Tomcat:

    * On Linux or MacOS run `<Tomcat install location>\\bin\\catalina.sh`
    * On Windows run `<Tomcat install location>/bin/catalina.bat`
    
9.  Enter `http://localhost:8080/activiti-app` into a browser to begin using Process Services.

After installing you will need to [apply a valid license file](#install-license) to your installation.

#### Installing the Process Services Administrator manually

Use these instructions to install Process Services Administrator using the WAR file.

Ensure you have read the [supported platforms]({% link process-services/latest/support/index.md %}) to confirm that your 
web container and database combination is supported before commencing with installation.

1.  Install your web container and database.

    >**Note:** The following steps use Tomcat and MySQL for examples.

2.  Create a schema for the `activiti-admin` application. The default name is `activitiadmin`

    In MySQL:

    ```bash
    CREATE DATABASE activitiadmin DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
    ```

3.  Create a user and password. This example will use `alfresco/alfresco`

    **Important:** You do not need to complete this step if you use the same user you created when [installing Process Services](#installing-process-services-manually) and can skip to the next step.

    In MySQL:

    ```bash
    CREATE USER 'alfresco'@'localhost' IDENTIFIED BY 'alfresco';
    ```

4.  Grant full privileges on the schema to this new user.

    In MySQL:

    ```bash
    GRANT ALL ON activitiadmin.* TO 'alfresco'@'localhost';
    ```

5.  Edit the `activiti-admin.properties` file supplied with the main Process Services WAR file download.

    1.  Uncomment the correct properties for the database you have installed.

    2.  Update the values for the schema and credentials created in the previous steps and check that the `hibernate.dialect` property matches your chosen database type.

        For example:

        ```text
        datasource.driver=com.mysql.jdbc.Driver
        datasource.url=jdbc:mysql://127.0.0.1:3306/activitiadmin?characterEncoding=UTF-8
        datasource.username=alfresco
        datasource.password=alfresco
        hibernate.dialect=org.hibernate.dialect.MySQLDialect
        ```

        >**Note:** Example syntax is provided in the `activiti-admin.properties` file for other database types.

6.  Copy the `activiti-admin.war` and `activiti-admin.properties` files to your web container.

    For Tomcat:

    * `<Tomcat install location>/webapps/activiti-admin.war`
    * `<Tomcat install location>/lib/activiti-admin.properties`

7.  Start up your web container.

    For Tomcat:

    * On Linux or MacOS run `<Tomcat install location>\bin\catalina.sh`
    * On Windows run `<Tomcat install location>/bin/catalina.bat`
    
8.  Enter `http://localhost:8080/activiti-admin` into a browser to begin using Process Services Administrator.

After installing you will need to [apply a valid license file](#install-license) to your installation.

#### Installing Process Services Workspace

You can install Process Workspace using a Web Application Archive (WAR) file or by deploying the files manually 
into your web container.

To install Process Workspace from a WAR file, visit the [support portal](https://support.alfresco.com) and download 
the latest version of `process-workspace.war`.

Move the `process-workspace.war` file into your web container and restart the server.

Using Tomcat as an example, this would be the `/webapps` folder.

Alternatively, you can manually deploy Process Workspace into your web container using the following steps:

1.  Download the latest [supported version]({% link process-services/latest/support/index.md %}) (see *Integrated services*) of Process Workspace from [artifacts.alfresco.com](https://artifacts.alfresco.com/nexus/).

    >**Note:** Located in the **activiti-enterprise-releases** repository under **/com/alfresco/alfresco-process-services-workspace**.

2.  Download and unzip the .tgz file.

3.  Move the `dist` folder contained in the unzipped folder into your web container.

    >**Note:** For Tomcat this is the `/webapps` folder.

4.  Restart your web server.

> **Important:** Note that the URL for Process Workspace will be generated from the name of the folder you deploy into your web container. To change this:
>
> 1.  Rename the folder in your preferred development environment (IDE).
> 2.  Restart your web server.
> 3.  Navigate to Process Workspace in a browser using the format: `http://{host}:{port}/{folder-name}`
>
> For example, if you renamed the `dist` folder to `process-workspace` and deployed locally on port 8080 this would be: `http://localhost:8080/process-workspace`

### Install using setup wizards

There are setup wizards available for Linux, macOS and Windows operating systems.

The setup wizards are evaluation copies that are useful for trials and experimentation. The h2 database provided with 
them is not suitable for use in a production environment.

The setup wizards install their own Apache Tomcat container for Process Services, an h2 database and all 
prerequisite software for Process Services to run on your chosen operating system.

#### Using the Linux setup wizard

Use these instructions to install Process Services on Linux.

A setup wizard should not be used in a production environment.

1.  Download the Linux setup wizard from your trial email.

2.  Locate the bin you just downloaded and run the following command against it to update its permissions:

    ```bash
    chmod 777 <installer file name>
    ```

3.  Run the setup wizard using the following command:

    ```bash
    ./<installer file name>
    ```

4.  Read and accept the **License Agreement**.

5.  Use the default **Installation Directory** or choose your own.

6.  Select an **Installation Profile**.

7.  Complete the installation.

    >**Note:** A message will appear displaying the default credentials and URL to use.

8.  Navigate to your installation directory and run the following command to start the application:

    ```bash
    ./start-process-services.sh
    ```

    >**Note:** The default installation location is `/home/{user}/alfresco/process-services-{version}`

9.  Enter `http://localhost:8080/activiti-app` into a browser once the application has started to begin using Process Services.

    >**Note:** Use the default credentials to log in. View the `process-services-readme.txt`, by default found in `/home/{user}/alfresco/process-services-{version}`, if you can't remember them.

10. Install the administrator application:

    1.  Rename the file `activiti-admin.war.undeployed` found in `/home/{user}/alfresco/process-services-{version}/tomcat/webapps` to `activiti-admin.war`

    2.  Stop and restart Tomcat.

    3.  Navigate to `http://localhost:8080/activiti-admin` once the application has started back up.

After installing you will need to [apply a valid license file](#install-license) to your installation.

#### Using the macOS setup wizard

Use these instructions to install Process Services on a Mac.

A setup wizard should not be used in a production environment.

1.  Download the Mac setup wizard from your trial email.

2.  Locate the dmg you just downloaded using **Finder** and double click it.

3.  Double click the Alfresco logo to launch the setup wizard.

    >**Note:** Click **Open** if you are prompted about opening files from the internet.

4.  Read and accept the **License Agreement**.

5.  Use the default **Installation Directory** or choose your own.

6.  Select an **Installation Profile**.

7.  Complete the installation.

    >**Note:** A message will appear displaying the default credentials and URL to use.

8.  Navigate to your installation directory and double click the **StartProcessServices** application.

    >**Note:** The default installation location is `Applications\alfresco\process-services-{version}`

9.  Enter `http://localhost:8080/activiti-app` into a browser once the application has started to begin using Process Services.

    >**Note:** Use the default credentials to log in. View the `process-services-readme.txt`, by default found in `Applications\alfresco\process-services-{version}`, if you can't remember them.

10. Install the administrator application:

    1.  Rename the file `activiti-admin.war.undeployed` found in `Applications\alfresco\process-services-{version}\tomcat\webapps` to `activiti-admin.war`

    2.  Stop and start Tomcat via the **Terminal** or by closing and re-opening the **StartProcessServices** application.

    3.  Navigate to `http://localhost:8080/activiti-admin` once the application has started back up.

After installing you will need to [apply a valid license file](#install-license) to your installation.

#### Using the Windows setup wizard

Use these instructions to install Process Services on Windows.

A setup wizard should not be used in a production environment.

1.  Download the Windows setup wizard from your trial email.

2.  Locate the exe you just downloaded and double click it to launch the setup wizard.

3.  Read and accept the **License Agreement**.

4.  Use the default **Installation Directory** or choose your own.

5.  Select an **Installation Profile**.

6.  Complete the installation.

    >**Note:** A message will appear displaying the default credentials and URL to use.

7.  Navigate to your installation directory and double click the **StartProcessServices** application.

    >**Note:** The default installation location is `C:\Program Files\alfresco\process-services-{version}`

8.  Enter `http://localhost:8080/activiti-app` into a browser once the application has started to begin using Process Services.

    >**Note:** Use the default credentials to log in. View the `process-services-readme.txt`, by default found in `C:\Program Files\alfresco\process-services-{version}`, if you can't remember them.

9.  Install the administrator application:

    1.  Rename the file `activiti-admin.war.undeployed` found in `C:\Program Files\alfresco\process-services-{version}\tomcat\webapps` to `activiti-admin.war`

    2.  Stop and start Tomcat via the **Command Line** or by closing and re-opening the **StartProcessServices** application.

    3.  Navigate to `http://localhost:8080/activiti-admin` once the application has started back up.

After installing you will need to [apply a valid license file](#install-license) to your installation.

### Install license

A valid license file is required to run Process Services.

A license file can be obtained from support or a link is provided via email to download a temporary (30-day) 
license if you signed up for a free trial.

Logging into Process Services as an administrator will display a notification if a license is not currently valid. 
The notifications are displayed when:

* No valid license file can be found
* A license file has expired or is not valid until a date in the future
* The current license file is close to expiring

#### Uploading a license file

There are two methods for uploading a license file to Process Services.

To upload a license through the user interface:

1.  Click the **UPLOAD LICENSE** button or use the top menu **Administrator** > **Upload license**

2.  Browse to, or drag your `activiti.lic` file into the pop-up.

Alternatively, you can manually move the `activiti.lic` file into the web container.

For example using Tomcat: `<Tomcat install location>\lib\`
