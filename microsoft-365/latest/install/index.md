---
title: Install the Microsoft 365 Connector
---

The Microsoft 365 Connector can be installed using Docker Compose or a distribution zip.

## Prerequisites

There are a number of software requirements for installing the Microsoft 365 Connector:

### Alfresco requirements

* Alfresco Content Services 6.2.2 or later.
* Alfresco Digital Workspace 2.0.0 or later.

See the [Supported Platforms]({% link microsoft-365/latest/support/index.md %}) for more information.

### Microsoft 365 requirements

In order to use the Microsoft 365 Connector, you will need a Microsoft 365 Business, Enterprise or Government subscription plan.

> **Note**: Personal subscription plans are not supported.

It is also required to register a single-page application (SPA) in your organizations Microsoft Azure Active Directory.

## Register a single-page application (SPA)

A single-page application needs to be registered in your Microsoft Azure Active Directory to complete the installation and configuration of the Microsoft 365 Connector.

1. Sign in to the [Microsoft Azure Portal](https://portal.azure.com/){:target="_blank"} as an administrator for your organization.

2. Select the **Azure Active Directory** service, followed by **App registrations** from the side menu and choose to create a **New Registration**.

3. Enter a display name. This will be the user facing display name for the application and will be visible in each user's OneDrive under the **Apps** folder.

    > **Note:** Do not add spaces at the start of the name, otherwise the integration will fail.

4. Select **Accounts in this organizational directory only**.

5. Select **Single-page application SPA** under the **Redirect URI** heading and add a redirect URI using your Content Services HTTPS endpoint, for example `https://<appservername>`.

6. Click **Register**.

    Once you have completed these steps your app registration will have an **Application (client) ID** and a **Directory (tenant) ID** assigned to it.

    > **Note:** These IDs are required when installing and configuring the Digital Workspace.

    ![Azure ID screenshot]({% link microsoft-365/images/azure-ids.png %})

7. Select **API permissions** from the left menu and click **Add a permission** and then select **Microsoft Graph**.

8. Select **Delegated permissions** and search for **Files.ReadWrite.All** in the **Select permissions** search box.

9. Expand **Files** and select **Files.ReadWrite.All** and then click **Add permissions**.
 
10. Select **Grant admin consent for `<your-app-name>`**.

## Install with zip

The Microsoft 365 connector zip file includes all the files required to install the connector.

1. Browse to the [Hyland Community](https://community.hyland.com/customer-portal/5097/downloads/alfresco){:target="_blank"}, download `alfresco-onedrive-integration-2.x.x.zip` and extract the contents:

    * `onedrive-springboot-2.x.x.jar`
    * `alfresco-ooi-content-model.xml`
    * README.md

2. Start the Microsoft 365 connector spring boot app:

    ```java
    java -Dalfresco.base-url=https://<my-alfresco-url> -jar onedrive-springboot-2.x.x.jar
    ```

    Where the `base-url` is the base URL of the Content Services installation in the format `<protocol><domain><port>`. For example, `https://mydomain.com/`

3. Log into Alfresco Share as an administrator and place the `alfresco-ooi-content-model.xml` into the `Data Dictionary/Models` folder. Click **Edit Properties** on the file and check the **Model Active** box.

4. Expose the Microsoft 365 connector service to your proxy, for example using NGINX:

    ```bash
    location /ooi-service/ {
            proxy_pass http://ooi-service:9095;

            # If using an external proxy / load balancer (for initial redirect if no trailing slash)
            absolute_redirect off;  
    ```

5. Configure the Digital Workspace using its `app.config.json` file and set the following properties:

    | Property | Description |
    | -------- | ----------- |
    | microsoftOnline | *Required.* Enable the Microsoft 365 connector plugin by setting the value to `true`. |
    | msonline.msHost | *Required.* The full URL of the Microsoft 365 Connector service, for example `https://<app-server-name>/ooi-service/api/-default-/private/office-integration/versions/1/edit-sessions/`, where `<app-server-name>` is the external web address. |
    | msonline.msClientId | *Required.* The **Application (client) ID** produced when [registering a single-page application](#register-a-single-page-application-spa) in your organization's Microsoft Azure Active Directory. |
    | msonline.msAuthority | *Required.* The **Directory (tenant) ID** produced when [registering a single-page application](#register-a-single-page-application-spa) in your organization's Microsoft Azure Active Directory appended to the Microsoft Online portal address, for example `https://login.microsoftonline.com/ca8490603-2g01-4l8j-8522-fyh4234579f6`. |
    | msonline.msRedirectUri | *Required.* The URL of the Digital Workspace to redirect to. |

    An example of the `app.config.json` is:

    ```json
        "plugins": {
            "microsoftOnline": "true"
        },
        "msOnline": {
            "msHost": "https://<appservername>/ooi-service/api/-default-/private/office-integration/versions/1/edit-sessions/",
            "msClientId": "6548946f3-f7a1-588a-9e68-d595b7b4ul99",
            "msAuthority": "https://login.microsoftonline.com/ca8490603-2g01-4l8j-8522-fyh4234579f6",
            "msRedirectUri": "https://<appservername>"
        },
    ```

6. Save the `app.config.json` and restart all services.

## Install using Docker Compose

Installations using Docker Compose should only be used for development and test environments. To run the Microsoft 365 Connector using Docker Compose, you can either utilize the [Alfresco Content Services download trial](https://www.hyland.com/en/resources/alfresco-ecm-download){:target="_blank"} or use an existing installation of Content Services.

> **Note**: To access the Docker images for the Microsoft 365 Connector, access to [Quay.io](https://quay.io/){:target="_blank"} is required. Alfresco customers can request Quay.io credentials by logging a ticket with [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

1. Download the Content Services download trial `docker-compose.yml` following the [initial steps]({% link content-services/latest/install/containers/docker-compose.md %}).

2. Edit the `docker-compose.yml` to include the settings for the Microsoft 365 Connector image and update the settings for the Digital Workspace to include the environment variables to run the 365 Connector:

    ```yaml
    ooi-service:
        image: quay.io/alfresco/alfresco-ooi-service:2.0.0
        mem_limit: 768m
        environment:
            JAVA_OPTS: "
              -Xms256m -Xmx512m
              -Dalfresco.base-url=http://alfresco:8080
              "
        ports:
            - 9095:9095

    digital-workspace:
        image: quay.io/alfresco/alfresco-digital-workspace:4.0.0
        mem_limit: 128m
        environment:
            BASE_PATH: ./
            APP_CONFIG_PLUGIN_MICROSOFT_ONLINE: 'true'
            APP_CONFIG_MICROSOFT_ONLINE_OOI_URL: https://<appservername>/ooi-service/api/-default-/private/office-integration/versions/1/edit-sessions/
            APP_CONFIG_MICROSOFT_ONLINE_CLIENTID: <client-id-guid-from-azure-app-registration>
            APP_CONFIG_MICROSOFT_ONLINE_AUTHORITY: https://login.microsoftonline.com/<tenant-id-guid-from-azure-app-registration>
            APP_CONFIG_MICROSOFT_ONLINE_REDIRECT: https://<appservername>
    ```

    | Variable | Description |
    | -------- | ----------- |
    | APP_CONFIG_PLUGIN_MICROSOFT_ONLINE | *Required.* Enable the Microsoft 365 connector plugin by setting the value to `'true'`. |
    | APP_CONFIG_MICROSOFT_ONLINE_OOI_URL | *Required.* The full URL of the Microsoft 365 Connector service, for example `https://<app-server-name>/ooi-service/api/-default-/private/office-integration/versions/1/edit-sessions/`, where `<app-server-name>` is the external web address. |
    | APP_CONFIG_MICROSOFT_ONLINE_CLIENTID | *Required.* The **Application (client) ID** produced when [registering a single-page application](#register-a-single-page-application-spa) in your organization's Microsoft Azure Active Directory. |
    | APP_CONFIG_MICROSOFT_ONLINE_AUTHORITY | *Required.* The **Directory (tenant) ID** produced when [registering a single-page application](#register-a-single-page-application-spa) in your organization's Microsoft Azure Active Directory appended to the Microsoft Online portal address, for example `https://login.microsoftonline.com/ca8490603-2g01-4l8j-8522-fyh4234579f6`. |
    | APP_CONFIG_MICROSOFT_ONLINE_REDIRECT | *Required.* The URL of the Digital Workspace to redirect to. |

3. Expose the Microsoft 365 Connector service to override the default NGINX proxy configuration in the `docker-compose.yml` file:

    Replace:

    ```yaml
    proxy:
        image: alfresco/alfresco-acs-nginx:3.3.0
        mem_limit: 128m
        depends_on:
            - alfresco
            - digital-workspace
            - control-center
        ports:
            - "8080:8080"
        links:
            - digital-workspace
            - alfresco
            - share
            - control-center
    ```

    with:

    ```yaml
    proxy:
        image: nginx:stable-alpine
        mem_limit: 256m
        depends_on:
            - alfresco
            - digital-workspace
            - control-center
        ports:
            - "8080:8080"
        links:
            - digital-workspace
            - alfresco
            - share
            - control-center
            - ooi-service
        volumes:
          - ./nginx.conf:/etc/nginx/nginx.conf
    ```

4. If you want to add an additional location, add the following to your local copy of the `nginx.conf`:

    ```text
    location /ooi-service/ {
                proxy_pass http://ooi-service:9095;

                # If using an external proxy / load balancer (for initial redirect if no trailing slash)
                absolute_redirect off;
            }
    ```

5. Make the folder containing the `docker-compose.yml` your working directory.

6. Sign into Quay.io: `docker login quay.io`.

7. Run the command `docker-compose up` to start the Docker containers.

8. Browse to the [Hyland Community](https://community.hyland.com/customer-portal/5097/downloads/alfresco){:target="_blank"}, download `alfresco-onedrive-integration-2.x.x.zip` and extract the contents.

9. Log into the Digital Workspace as an administrator and place the `alfresco-ooi-content-model.xml` into the `Data Dictionary/Models` folder. View the details of the file, select the **Edit** option and check the **Model Active** box.
