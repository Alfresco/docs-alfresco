---
title: Install the Alfresco Collaboration Connector for Teams
---

The Alfresco Collaboration Connector for Teams can be installed using a distribution zip.

## Prerequisites
There are a number of software requirements for installing the Alfresco Collaboration Connector for Teams:

### Alfresco requirements
See the [Supported Platforms]({% link microsoft-teams/latest/support/index.md %}) for more information.

### Microsoft Teams requirements
Proper registration of an Azure Bot along with OAuth configuration is needed, this can be done before the MS Teams 
connector installation. However, there is no need to register SPA for MS Teams connector.

It is also required to register a single-page application (SPA) in your organizations Microsoft Azure Active Directory.

In order to use the Alfresco Collaboration Connector for Teams, you will need a Microsoft Teams client.

The Teams Client is available as a [webapp](https://teams.microsoft.com/){:target="_blank"}, desktop client and also as
an app for both iOS and Android.

>**Note**: Minor differences between clients exists.

## Installation
The installation of Alfresco Collaboration Connector for Teams involves a number of steps, starting with the installation
of Alfresco Content Services, Alfresco Identity Service, and Alfresco Digital Workspace.

### Install Content Services including UI
Install [Alfresco Content Services]({% link content-services/latest/install/index.md %}),
[Alfresco Digital Workspace]({% link digital-workspace/latest/install/index.md %}), and
[Alfresco Identity Service]({% link identity-service/latest/install/index.md %}).

All software should be exposed as "https" via proxy/gateway.

The following secure endpoints should be available when this step is complete:

* `https://{my.domain}/alfresco`
* `https://{my.domain}/workspace`
* `https://{my.domain}/auth`

### Register a single-page application (SPA) ************************TODO
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

### Microsoft Azure Bot Registration (including OAuth)
Microsoft Teams and Azure services can interact with Teams Extensions and Bots hosted outside of Azure only when they 
are registered in Azure. See more in [MS official docs](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart-registration)

>**Note.** The payment plan is subject to your choice (below it says to change the plan to 'Free', but that is not necessary.

To register the [Microsoft Azure Bot](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart-registration?view=azure-bot-service-4.0&tabs=csharp){:target="_blank"}
and configure the OAuth connection to the Alfresco Digital Workspace (ADW) follow these steps:

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
     We later refer to this secret app identifier as `MS_BOT_APP_ID`.

3. Configure the OAuth connection to the ADW

   Click on **Add OAuth Connection Settings**, a window will appear on the right side of the screen.

   A full example on how to set up all the values can be found in the following table:

   |Property|Description|Value|
   |--------|-----------|-----|
   |Name|The name of your connection|Your name for the connection.|
   |Service Provider|Identity provider type|From the drop-down list, select `Oauth 2 Generic Provider`|
   |Client ID|Identity provider app ID|Typically: `alfresco` - when changed must be reflected in `microsoft.app.oauth.connection-name` app property|
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
   
     ![ADW login success]({% link microsoft-teams/images/adw-login-successful.png %})
   
5. Retrieve bot Secret
   
   If you already had a [bot secret](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0#managing-bot-resources){:target="_blank"}
   but lost it, then skip this section and proceed directly to **6. Already had a bot secret**.

   This secret is important. It will be the secret that you provide in your `.env` file later. It is not to be confused
   with the Oath client secret used above.

   * In the top-most search bar type in `vault` and click on [**Key vaults**](https://docs.microsoft.com/en-us/azure/key-vault/general/overview){:target="_blank"}.
   * Click on the item with a name starting with `bot-secrets-*`.
   * Choose **Secrets** (vertical) tab.
   * The following message is displayed: *The operation "List" is not enabled in this key vault's access policy.*
   * Go to **Access Policies** (vertical tab) and click on **Add Access Policy**
   * The easiest way to add it is to choose from a template (‘Configure from template’) named ‘Key, secret, & certificate Management’
     (or choose from other, or configure manually). You also need to add a principal responsible for this policy.
   * Don’t forget to **Save** Access policies settings.
   * You should now be able to access data on **Secrets** (vertical) tab.
   * Choose the secret that relates to your bot.
   * Click **Show Secret Value** button on bottom of the screen and copy the secret value for reference. We later refer to this secret as `MS_BOT_APP_CLIENT_SECRET_VALUE`.
   
6. Already had a bot secret? (OPTIONAL)
   
   * Go to [Microsoft Azure Portal](https://portal.azure.com/#home){:target="_blank"}
   * Click on your bot name.
   * Configuration.
   * Click **Manage in > Microsoft App ID (Manage)**.
   * Click **new client secret**. Note, if one already exists delete it unless you already have the value, because you can not get it again.
   * Give it a description, such as "My secret".
   * Click **add**.
   * Now your secret value should be visible. Copy and keep it safe as you only get one chance to see its value.
   
### Install Collaboration Connector for Teams with zip
The Alfresco Collaboration Connector for Teams zip file includes all the files required to install the connector.

1. Browse to the [Alfresco Support Portal](http://support.alfresco.com/){:target="_blank"}, download `alfresco-ms-teams-integration-distribution-1.x.x.zip` and extract the contents:

   * `alfresco-ms-teams-integration-distribution-1.x.x.jar`
   * README.md
   
2. Start the Spring Boot app:

    ```java
    java -Dmicrosoft.app.id=<MS_BOT_APP_ID> -Dmicrosoft.app.password=<MS_BOT_APP_CLIENT_SECRET_VALUE> -Dalfresco.base-url=https://<ACS_BASE_URL> -Dalfresco.digital-workspace.context-path=<ADW_CONTEXT_PATH> -jar alfresco-ms-teams-integration-distribution-1.x.x.jar
    ```

   Where:
   * `MS_BOT_APP_ID` is the Azure Bot application identifier created when registering the Azure bot earlier on, looks something like `9af7ae3a-1798-4de7-a992-c3ac489e5324`
   * `MS_BOT_APP_CLIENT_SECRET_VALUE` is the Azure Bot secret created when registering the Azure bot earlier on, looks something like `je~IY13A~t8~r5Lt.9W.2cTJjlPVD5BmEx`
   * `ACS_BASE_URL` is the base URL of the Content Services installation in the format `<domain>:<port>`. For example, `mydomain.com/`
   * `ADW_CONTEXT_PATH` is the Alfresco Digital Workspace context path in the Content Services installation, usually `/workspace`

   >**Note.** if OAuth Connection name is set different from `alfresco`, then specify this with parameter `-Dmicrosoft.app.oauth.connection-name` 
   
3. Expose Collaboration Connector for Teams via proxy/gateway, eg. `https://{my.domain}/ms-teams-service`.

### Create a Teams App Manifest zip
---
Installation of MS Teams Extensions needs a ZIPped manifest file.  
A sample one is placed in `teamsManifest` directory inside distribution ZIP.  
Not many changes to the sample are needed to create a manifest proper for customer organization.  
In particular, following entries need to be replaced with customer specific values:  
`<MS_APP_ID>`  
`<YOUR_DOMAIN_URL>`

Customer may want to change several other entries (short/full names or descriptions) but it is not recommended.
***
​
Edit our `manifest.json` example and set App Id and DomainUrl (eg. https://my.domain.test)
Create Zip (without folders) with `manifest.json` and two icon files
​

### Integration test ???
​
****IS THIS JUST SOME TESTING?****
---
This is explaining how end-user can add the MS Teams Connector to MS Teams Client.  
However, I would say that we should advise to install connector globally by MS Teams administrator so that end-user activity is not needed.
***
​
In Teams Client (eg. webapp / desktop) use "Upload Custom App" to (side-load) the Teams App Manifest - to test the integration
​
A Microsoft Teams Admin can configure an org-wide Teams App (so that end-users can skip this step)
