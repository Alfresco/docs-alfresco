---
title: Configure Salesforce Connector
---

This page describes how to configure the Salesforce Connector for use with Single Sign On (SSO).

Here, you'll use the Identity Service with Salesforce and Alfresco Content Services. There are two parts to this configuration - first configure SSO for the Salesforce Connector, and then configure your Salesforce domain to use the Identity Service as SSO.

## SSO prerequisites {#prereqs}

Before you begin ensure you've installed the following - see the [Supported platforms]({% link salesforce/latest/support/index.md %}) page for specific versions:

* [Alfresco Content Services]({% link content-services/latest/install/index.md %})
* [Alfresco Content Connector for Salesforce]({% link salesforce/latest/install/index.md %})
* [Identity Service]({% link identity-service/latest/install/index.md %})

There are two parts to this configuration: [configure SSO between Content Services and the Salesforce Connector](#sso-alfresco) and [configure SSO for Salesforce](#sso-salesforce)

## Configure SSO in Alfresco products {#sso-alfresco}

To configure Single Sign On (SSO) between Content Services and the Salesforce Connector, you must add your Identity Service URL to `JAVA_OPTS`, and also configure your `X-Frame-Options` and `Content Security Policy` in the Identity Service.

Ensure you have the [prerequisites](#prereqs) installed and configured first.

1. Stop Alfresco Content Services.

2. Set `JAVA_OPTS=%JAVA_OPTS% -Dsfdc.config.trustedOrigins=<Identity Service URL>` in:

    For Linux based users: `<TOMCAT_HOME>/bin/catalina.sh`

    For Microsoft Windows users: `<TOMCAT_HOME>/bin/catalina.bat`

3. Navigate to your Identity Service and log in as an Administrator.

4. Log in to the Administration Console.

5. Select the **Alfresco** realm from the drop list on the top left.

6. Go to **Realm Settings > Security Defenses** tab.

7. Add `ALLOW-FROM <Your Salesforce URL>` to the **X-Frame-Options** field.

8. Add `frame-src 'self' <Your Salesforce URL>` to the **Content-Security-Policy** field.

    > **Note:** `<Your Salesforce URL>` can take two different forms:
    >
    > * For the Classic view, the URL will take the form `visual.force.com`.
    > * For the Lightning view, the URL will take the form `lightning.force.com`.

## Configure SSO for Salesforce {#sso-salesforce}

To configure Single Sign On (SSO) for use with Salesforce you must create a new authentication provider in Salesforce, create a Salesforce domain, configure a Custom Logout URL for Salesforce, and update the Apex Code.

Ensure you have the [prerequisites](#prereqs) installed and configured first, and have also [configured SSO in Alfresco products](#sso-alfresco).

1. To create an authentication provider, navigate to Salesforce and log in as an Administrator.

2. Go to **Setup Tab > Identity > Auth. Providers** and click **New**.

3. Select **OpenID Connect** from the **Provider Type** drop down list.

    The table represents the fields on the **Auth. Provider Edit** window.

    |Auth. Provider create fields|Value/Description|
    |----------------------------|-----------------|
    |Provider Type|OpenID Connect|
    |Name|Enter a name for the authentication service.|
    |URL Suffix|Automatically filled in based on the name you enter.|
    |Consumer Key|To find this key go to Identity Service > **Alfresco Realm > Clients** and the client ID you have configured for Alfresco Content Services. The key is usually `alfresco`.|
    |Consumer Secret|1. Go to the Identity Service > **Alfresco Realm > Realm Settings > Keys Tab**.<br>2. Click **Public key** next to the algorithm that has one.<br>3. Copy and paste the key.|
    |Authorize Endpoint URL|1. Go to the Identity Service > **Alfresco Realm > Realm Settings**.<br>2. Click the link in the **Endpoints** field.<br>3. Copy and paste the JSON output into a reader to make it more readable.<br>4. Find the value for `authorization_endpoint`.<br>5. Copy and paste the value.<br><br>**Note:** Keep the JSON file because it will be used to find other URLs for other fields.|
    |Token Endpoint URL|1. Find the value for `token_endpoint` in the JSON file.<br>2. Copy and paste the value.|
    |User Info Endpoint URL|1. Find the value for `userinfo_endpoint` in the JSON file.<br>2. Copy and paste the value.|
    |Token Issuer|1. Find the value for `issuer` in the JSON file.<br>2. Copy and paste the value.|
    |Default Scopes|OpenID email<br><br>**Note:** See [Use the Scope URL Parameter](https://help.salesforce.com/articleView?id=sso_provider_addl_params_scope.htm&type=5){:target="_blank"} for more on the use of OpenID.|
    |Send access token in header|Selected|
    |Send client credentials in header|Not Selected|
    |Include Consumer Secret in API Responses|Selected|
    |Custom Error URL|Leave Empty|
    |Custom Logout URL|Leave Empty<br><br>**Note:** The Custom Logout URL will be configured later on in the configuration steps.|
    |Registration Handler|Select an existing Registration Handler for your provider or click **Automatically create a registration handler template**.<br><br>**Note:** Creating a template will require modification by your Salesforce team for it to  work for your use case and provider.|
    |Execute Registration As|Select an Admin user.|
    |Portal|None|
    |Icon URL|***Optional.*** Enter a URL where an image can be found.|

4. Enter your information in the fields and click **Save**.

5. To create your domain go back to **Setup Tab > Company Settings > My Domain**.

6. Enter the name of the domain you want to use and click **Check Availability**.

7. Click **Register Domain** if it's available.

    You will see a notice that tells you the domain is registering. This process may take 60 minutes.

8. Once the domain is registered you can test it. Use the **Login** button to log in and test the domain.

9. Click **Deploy to Users** to deploy your domain.

10. Click **Edit** under the **Authentication Configuration** heading.

11. Select the Auth. Provider service you have created under the **Authentication Service** heading and click **Save**.

12. To add your **Custom Logout URL** copy your domain name as it appears next to **Your domain name is**.

13. Go back to **Setup Tab > Identity > Auth. Providers** and edit the authentication provider you created earlier.

14. Paste your domain URL into the **Custom Logout URL** field.

15. Navigate to the JSON file you used earlier and find the value of `end_session_endpoint` and also paste it into the **Custom Logout URL** field.

16. Add `?redirect_uri=` between your domain URL and the `end_session_endpoint` value and click **Save**.

    It should take the form of `end_session_endpoint?redirect_uri=<Your domain>`.

### Customize Registration Handler {#configure-handler}

Configuring the registration handler should be completed by someone with an understanding of Apex, Salesforce SSO, and your identity provider. Below is a sample approach for a simplified implementation using the default template. This should not be used for production as it may not meet your specific needs. We encourage testing to validate that your registration handler is configured correctly. This is not a definitive guide on how to customize the registration handler.

1. To update the Apex code, in the newly created Auth. Providers window click the link next to **Registration Handler** to open the **Apex classes** window.

2. Click **Edit** and change the generate Global Class name to something more meaningful to you such as *`IdentityServiceRegistrationHandler`*.

    The generated name will be something like *`AutocreatedRegHandler1624989012775`*.

3. Comment out all references to the method `canCreateUser(Auth.UserData data)`.

    If the method references are not commented out, you will not be able to log in through your provider because a new user will not be created. The method is `false` by default.

4. In the `createUser` method, change the value of the string `@myorg.com` to be the email domain as specified in your identity provider within the section where  a standard user object is instantiated. To do this within the Apex code:

    * Find `u.username = data.username + '@myorg.com'` and add your domain instead.
    * If your providers username is formated as an email address, change the line to be `u.username = data.username`.

> **Note:** In the example above, a new Salesforce user is created at login through your provider. If you are attempting to match an existing Salesforce user, the same `createUser` method is called, but the Registration Handlers Apex code should be updated to use some combination of identifiable values from your provider to query Salesforce to find user values to identify, and return an existing user instead of attempting to create a new user.

> **Note:** You can configure the Apex code in lots of different ways to suit your organization. See the Salesforce documentation for more information:
>
> * [What is Apex?](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro_what_is_apex.htm){:target="_blank"}.
> * [Setup SSO for your users](https://developer.salesforce.com/docs/atlas.en-us.externalidentityImplGuide.meta/externalidentityImplGuide/external_identity_accept_identity_from_existing_provider.htm){:target="_blank"}.
> * [RegistrationHandler Interface](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_auth_plugin.htm){:target="_blank"}.

## Configure a Salesforce Community

To configure access to Salesforce Community you must add the internal Salesforce users to the `GROUP_SALESFORCE_MODERATORS` group in Alfresco Content Services.
Internal Salesforce users added to this group will be allowed to share content externally to Community Members. Users not added to this group will not be granted access to share content externally.

> **Note:** Support for Salesforce Community is only available when using Alfresco Cloud (PaaS).

1. Log in to Alfresco Content Services as an administrator and click **Admin Tools**.

2. Click **Groups** under **Users and Groups**.

3. Select **Show System Groups** on the top right.

4. Click **Browse** and select `GROUP_SALESFORCE_MODERATORS`.

5. Click the **Add User** icon.

    You are presented with the **Add User** window.

6. Search for the administrator user you want to add.

7. Click the **Add** button next to the user.

You will see the user you have added will appear in the middle column.

### Add trustedOrigin configuration for Salesforce Communities

Add the `sfdc.config.trustedOrigins` property to allow the connector to be displayed within a Salesforce Community page, for example, `alfresco-content-connector.my.site.com`. This property accepts multiple values, where each value is separated by the pipe character, `|`, for example, `alfresco-content-connector.my.site.com|alfresco-sales.my.site.com`.

1. Stop Alfresco Content Services.

2. Set `JAVA_OPTS=%JAVA_OPTS% -Dsfdc.config.trustedOrigins=<Community domain name>` in:

    For Linux based users: `<TOMCAT_HOME>/bin/catalina.sh`

    For Microsoft Windows users: `<TOMCAT_HOME>/bin/catalina.bat`

    Example: `-Dsfdc.config.trustedOrigins=alfresco-content-connector.my.site.com`
