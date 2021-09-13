---
title: Install the Alfresco Collaboration Connector for Teams
---

The Alfresco Collaboration Connector for Teams can be installed using a distribution zip.

## Prerequisites

There are a number of software requirements for installing the Alfresco Collaboration Connector for Teams:

### Alfresco requirements

See the [Supported Platforms]({% link microsoft-teams/latest/support/index.md %}) for more information.

### Microsoft Teams requirements

In order to use the Alfresco Collaboration Connector for Teams, you will need a Microsoft Teams client.

The Teams Client is available as a [webapp](https://teams.microsoft.com/){:target="_blank"}, desktop client and also as 
an app for both iOS and Android. 

>**Note**: Minor differences between clients exists.

It is also required to register a single-page application (SPA) in your organizations Microsoft Azure Active Directory.

## Register a single-page application (SPA)

A single-page application needs to be registered in your Microsoft Azure Active Directory to complete the installation 
and configuration of the Alfresco Collaboration Connector for Teams.

1. Sign in to the [Microsoft Azure Portal](https://portal.azure.com/){:target="_blank"} as an administrator for your organization.

2. Select the **Azure Active Directory** service, followed by **App registrations** from the side menu and choose to 
   create a **New Registration**.

3. Enter a display name. This will be the user facing display name for the application and will be visible in each 
   user's OneDrive under the **Apps** folder.

   >**Note:** Do not add spaces at the start of the name, otherwise the integration will fail.

4. Select **Accounts in this organizational directory only**.

5. Select **Single-page application SPA** under the **Redirect URI** heading and add a redirect URI using your 
   Content Services HTTPS endpoint, for example `https://<my.domain>`.

6. Click **Register**.

    Once you have completed these steps your app registration will have an **Application (client) ID** and a 
    **Directory (tenant) ID** assigned to it.

    >**Note:** These IDs are required when installing and configuring the Digital Workspace.

    ![Azure ID screenshot]({% link microsoft-teams/images/azure-ids.png %})

7. Select **API permissions** from the left menu and click **Add a permission** and then select **Microsoft Graph**.

8. Select **Delegated permissions** and search for **Files.ReadWrite.All** in the **Select permissions** search box.

9. Expand **Files** and select **Files.ReadWrite.All** and then click **Add permissions**.
 
10. Select **Grant admin consent for `<your-app-name>`**.

## Installation
The installation of Alfresco Collaboration Connector for Teams involves a number of steps, starting with the installation
of Alfresco Content Services, Alfresco Identity Service, and Alfresco Digital Workspace.

### Installing Content Services including UI
Install [Alfresco Content Services]({% link content-services/latest/install/index.md %}), 
[Alfresco Digital Workspace]({% link digital-workspace/latest/install/index.md %}), and
[Alfresco Identity Service]({% link identity-service/latest/install/index.md %}). 
   
All software should be exposed as "https" via proxy/gateway. 

The following secure endpoints should be available when this step is complete:

* `https://{my.domain}/alfresco`
* `https://{my.domain}/workspace`
* `https://{my.domain}/auth`

### Add MS Teams Service to your deployment 
Add the Microsoft Teams service exposed via proxy/gateway, eg. `https://{my.domain}/ms-teams-service`.

### Microsoft Azure Bot Registration (including OAuth)
To register the Microsoft Azure Bot and configure the OAuth connection to the Alfresco Digital Workspace (ADW) follow 
these steps:

1. Sign in to the [Microsoft Azure Portal](https://portal.azure.com/){:target="_blank"}

2. Register the Microsoft Azure Bot
   
   * Click **Create a resource** to start Azure bot registration
   * Type `azure bot` in the search input field and choose the **Azure Bot** item.
   * Click **Create**
   * In the **Bot handle** field type a unique name for your Bot (cannot be changed later on).
   * Select desired subscription and resource group.
   * Click **Change plan**
   * Select **Free**
   * Let Azure create a *Microsoft App ID* for you.
   * Click **Review and Create** (optionally you can add tags to your Bot).
   * If all pre-checks pass click **Create**.
   * Azure will deploy your registration. When complete, click on **Go to resource**.
   * Go to the **Configuration** (vertical) tab and set **Messaging endpoint** to 
     `<service_base_url>/<server.servlet.context-path>/api/messages` 
     >**Note**: `<server.servlet.context-path>` is related to what is set in `application-default.yml` under `context path`. 
     >For example: Messaging endpoint: `https://ms-teams-integration.dev.alfresco.me/ms-teams-service/api/messages`
   * Copy your *Microsoft App ID*. For example: `9af7ae3a-1798-4de7-a992-c3ac489e5324` 
     This will be used throughout the documentation and referred to as `MS_APP_ID`.
     
3. Configure the OAuth connection to the ADW
   
   Click on **Add OAuth Connection Settings**, a window will appear on the right side of the screen.

   A full example on how to set up all the values can be found in the following table:

   |Property|Description|Value|
   |--------|-----------|-----|
   |Name|The name of your connection|Your name for the connection.|
   |Service Provider|Identity provider type|From the drop-down list, select `Oauth 2 Generic Provider`|
   |Client ID|Identity provider app ID|Typically: `alfresco`|
   |Client secret|OAuth client secret (if client access is not public), otherwise this field must be filled but the value is irrelevant|random string|
   |Scope List Delimiter|The character to use between scope values (often a space or comma)|, `<enter comma>`|
   |Authorization URL Template|Authorization endpoint URL|`https://<your_alfresco_base_path>/auth/realms/alfresco/protocol/openid-connect/auth`|
   |Authorization URL Query String|The query string to append to the authorization URL, templated with any wanted parameters: `{ClientId} {ClientSecret} {RedirectUrl} {Scopes} {State}`|`?client_id={ClientId}&redirect_uri={RedirectUrl}&scope={Scopes}&response_type=code&state={State}`|
   |Token URL Template|Token endpoint URL|`https://<your_alfresco_base_path>/auth/realms/alfresco/protocol/openid-connect/token`|
   |Token URL Query String Template|Body to send for the token exchange|? `<enter question mark>`|
   |Token Body Template|Body to send for the token exchange|`code={Code}&grant_type=authorization_code&redirect_uri={RedirectUrl}&client_id={ClientId}&client_secret={ClientSecret}`|
   |Refresh URL Template|Token refresh endpoint URL|`https://<your_alfresco_base_path>/auth/realms/alfresco/protocol/openid-connect/token`|
   |Refresh URL Query String Template|The query string to append to the refresh URL, templated with any wanted parameters: `{ClientId} {ClientSecret} {RedirectUrl} {Scopes} {State}`|? `<enter question mark>`|
   |Refresh Body Template|Body to send with the token refresh|`refresh_token={RefreshToken}&redirect_uri={RedirectUrl}&grant_type=refresh_token&client_id={ClientId}&client_secret={ClientSecret}`|
   |Token Exchange URL|Used for SSO in Azure AD v2 |Leave blank|
   |Scopes|Comma separated list of the API permissions you granted earlier to the Azure AD authentication app|openid|

4. Test the ADW Connection

   * Click on your newly created connection and then click **test connection**.
   * If it was successful, then you will be redirected to the ADW login page:

   ![ADW login dialog]({% link microsoft-teams/images/adw-login-page.png %})

   * Once successfully logged in, you should see:

   ![ADW login success]({% link microsoft-teams/images/adw-login-success.png %})

5. Retrieve bot Secret

Notes:

if you already had a secret but you have lost it, skip this section and head over to "Already had a secret"
This secret is important. It will be the secret that you provide in your .env file later. It is not to be confused with the Oath client secret used above.
In the top-most search bar type in ‘vault’ and click on ‘Key vaults’.

Click on item with name starting with bot-secrets-*

Choose ‘Secrets’ (vertical) tab.

See this message

The operation "List" is not enabled in this key vault's access policy.

Go to ‘Access Policies’ (vertical tab) and click on ‘Add Access Policy’:

The easiest way to add it is to choose from a template (‘Configure from template’) named ‘Key, secret, & certificate Management’ (or choose from other, or configure manually). You also need to add a principal responsible for this policy.

Don’t forget to ‘Save’ Access policies settings. After that you should be able to access data on ‘Secrets’ (vertical) tab.

Choose the secret that relates to your bot

Click ‘Show Secret Value’ button on bottom of the screen and copy the secret value for reference.





If it was successful, you will be redirected to your login page, such as:
   * Register Azure Bot
   * Copy App Id & App Password (client secret value)
   * Configure Bot Url (to https://my.domain.test/ms-teams-service/api/messages
   * Configure OAuth (to https://my.domain.test/auth etc ... lots here)
   * Test OAuth Connection



2. Browse to the [Alfresco Support Portal](http://support.alfresco.com/){:target="_blank"}, 
   download `alfresco-onedrive-integration-1.x.x.zip` and extract the contents:

    * `onedrive-springboot-1.x.x.jar`
    * `alfresco-ooi-content-model.xml`
    * `README.md`

2. Start the Alfresco Collaboration Connector for Teams spring boot app:

    ```bash
    java -Dalfresco.base-url=https://<my-alfresco-url> -jar onedrive-springboot-1.x.x.jar
    ```

    Where the `alfresco.base-url` is the base URL of the Content Services installation in the format 
    `https://<domain>:<port>/`. For example, `https://mydomain.com/`


3. Login to Alfresco Share as an administrator and place the `alfresco-ooi-content-model.xml` into the 
   `Data Dictionary/Models` folder. Click **Edit Properties** on the file and check the **Model Active** box.

4. Expose the Alfresco Collaboration Connector for Teams service to your proxy, for example using NGINX:

    ```text
    location /ooi-service/ {
            proxy_pass http://ooi-service:9095;

            # If using an external proxy / load balancer (for initial redirect if no trailing slash)
            absolute_redirect off;  
    ```

5. Configure the Digital Workspace using its `app.config.json` file and set the following properties:

    | Property | Description |
    | -------- | ----------- |
    | microsoftOnline | *Required.* Enable the Alfresco Collaboration Connector for Teams plugin by setting the value to `true`. |
    | msonline.msHost | *Required.* The full URL of the Alfresco Collaboration Connector for Teams service, for example `https://<app-server-name>/ooi-service/api/-default-/private/office-integration/versions/1/edit-sessions/`, where `<app-server-name>` is the external web address. |
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

Installations using Docker Compose should only be used for development and test environments. To run the Alfresco Collaboration Connector for Teams using Docker Compose, you can either utilize the [Alfresco Content Services download trial]({% link content-services/latest/install/containers/docker-compose.md %}) or use an existing installation of Content Services.

> **Note**: To access the Docker images for the Alfresco Collaboration Connector for Teams, access to [Quay.io](https://quay.io/){:target="_blank"} is required. Alfresco customers can request Quay.io credentials by logging a ticket with [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

1. Download the Content Services download trial `docker-compose.yml` following the [initial steps]({% link content-services/latest/install/containers/docker-compose.md %}).

2. Edit the `docker-compose.yml` to include the settings for the Alfresco Collaboration Connector for Teams image and update the settings for the Digital Workspace to include the environment variables to run the 365 Connector:

    ```yaml
    ooi-service:
        image: quay.io/alfresco/alfresco-ooi-service:1.1.0
        mem_limit: 768m
        environment:
            JAVA_OPTS: "
              -Xms256m -Xmx512m
              -Dalfresco.base-url=http://alfresco:8080
              "
        ports:
            - 9095:9095

    digital-workspace:
        image: quay.io/alfresco/alfresco-digital-workspace:2.0.0-adw
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
    | APP_CONFIG_PLUGIN_MICROSOFT_ONLINE | *Required.* Enable the Alfresco Collaboration Connector for Teams plugin by setting the value to `'true'`. |
    | APP_CONFIG_MICROSOFT_ONLINE_OOI_URL | *Required.* The full URL of the Alfresco Collaboration Connector for Teams service, for example `https://<app-server-name>/ooi-service/api/-default-/private/office-integration/versions/1/edit-sessions/`, where `<app-server-name>` is the external web address. |
    | APP_CONFIG_MICROSOFT_ONLINE_CLIENTID | *Required.* The **Application (client) ID** produced when [registering a single-page application](#register-a-single-page-application-spa) in your organization's Microsoft Azure Active Directory. |
    | APP_CONFIG_MICROSOFT_ONLINE_AUTHORITY | *Required.* The **Directory (tenant) ID** produced when [registering a single-page application](#register-a-single-page-application-spa) in your organization's Microsoft Azure Active Directory appended to the Microsoft Online portal address, for example `https://login.microsoftonline.com/ca8490603-2g01-4l8j-8522-fyh4234579f6`. |
    | APP_CONFIG_MICROSOFT_ONLINE_REDIRECT | *Required.* The URL of the Digital Workspace to redirect to. |

3. Expose the Alfresco Collaboration Connector for Teams service to override the default NGINX proxy configuration in the `docker-compose.yml` file:

    Replace:

    ```yaml
    proxy:
        image: alfresco/alfresco-acs-nginx:3.0.1
        mem_limit: 128m
        depends_on:
          - alfresco
          - digital-workspace
        ports:
          - 8080:8080
        links:
          - digital-workspace
          - alfresco
          - share
    ```

    with:

    ```yaml
    proxy:
        image: nginx:stable-alpine
        mem_limit: 256m
        depends_on:
          - alfresco
          - digital-workspace
        ports:
          - 8080:8080
        links:
          - digital-workspace
          - alfresco
          - share
          - ooi-service
        volumes:
          - ./nginx.conf:/etc/nginx/nginx.conf
    ```

4. If you want to add an additional location, add the following to your local copy of the `nginx.conf`:

    ```bash
    location /ooi-service/ {
                proxy_pass http://ooi-service:9095;

                # If using an external proxy / load balancer (for initial redirect if no trailing slash)
                absolute_redirect off;
            }
    ```

5. Make the folder containing the `docker-compose.yml` your working directory.

6. Sign into Quay.io: `docker login quay.io`.

7. Run the command `docker-compose up` to start the Docker containers.

8. Browse to the [Alfresco Support Portal](http://support.alfresco.com/){:target="_blank"}, download `alfresco-onedrive-integration-1.x.x.zip` and extract the contents.

9. Log into the Digital Workspace as an administrator and place the `alfresco-ooi-content-model.xml` into the `Data Dictionary/Models` folder. View the details of the file, select the **Edit** option and check the **Model Active** box.


Either way, it's important that the Alfresco integration endpoints are exposed via SSL (ie. https).
This required for both our "ms-teams-service" endpoint (ie. our implementation of the Microsoft Bot) as well as OAuth etc. (edited)

Jan Vonka  33 minutes ago
The way we dev/test internally is not the same as the potential install steps of a customer (which will depend on their chosen method for ACS).
I suggest following previous examples of connectors / integrations (at least until there is a better ways) ... ie. link to ACS and then give some example / reference to the incremental steps.
eg.
https://docs.alfresco.com/microsoft-365/latest/install/ (edited)

Jan Vonka  22 minutes ago
Pseudo high-level steps:
Install ACS, ADW & IDS (exposed as "https" via proxy/gateway), eg.
https://my.domain.test/alfresco
https://my.domain.test/workspace
https://my.domain.test/auth
Add MS Teams Service to your deployment (expose via proxy/gateway), eg.
https://my.domain.test/ms-teams-service
Configure Microsoft side - ie. Azure Bot Registration
Register Azure Bot
Copy App Id & App Password (client secret value)
Configure Bot Url (to https://my.domain.test/ms-teams-service/api/messages
Configure OAuth (to https://my.domain.test/auth etc ... lots here)
Test OAuth Connection
Update MS Teams Service config including:
Note: document exact config property names whether -D options or system env variables:
Bot App Id / App Password
OAuth Connection Name
Alfresco Base Url (eg. https://my.domain.test)
Workspace Context (eg. if not /workspace)
....
restart MS Teams Service
Create a Teams App Manifest zip
Edit our "manifest.json" example and set App Id and DomainUrl (eg. https://my.domain.test)
Create Zip (without folders) with manifest.json and two icon files
In Teams Client (eg. webapp / desktop) use "Upload Custom App" to (side-load) the Teams App Manifest - to test the integration
Test everything end-to-end :microsoft: :alfresco: :rocket:
Bonus: Microsoft Teams Admin configures as an org-wide Teams App (so that end-users can skip 6)
(edited)

Jan Vonka  10 minutes ago
Above high-level pseudo steps generally apply to any deployment environment ...
ie. irrespective of whether:
containerised (eg. :docker: compose or :helm: / :kubernetes:)
non-containerised (eg. zip or :ansible: )