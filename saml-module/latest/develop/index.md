---
title: Develop with the SAML Module
---

This information is intended for developers or system administrator to create applications that interact with Alfresco using the SAML Module.

## Prerequisites

* The SAML Module [installed]({% link saml-module/latest/install/index.md %}) and [configured]({% link saml-module/latest/config/index.md %}).

> **Note**: The examples below use Alfresco Content Services running locally on port 8080: `http://localhost:8080/alfresco`.

> **Note**: SAML in Alfresco does not support user provisioning. This means that user IDs have to be created in Alfresco Content Services and in the identity provider before trying to authenticate the users with SAML in Alfresco or in a custom application.

## Service description

Alfresco offers a configurable mode for interacting with the SAML support. As an administrator, you can go to `http://localhost:8080/alfresco/s/enterprise/admin/admin-saml` to see the configured service providers that Alfresco exposes for interacting with various Alfresco functionality and components.

In this example, we will discuss the REST API service provider in detail. This is the recommended service provider to use for interacting with the Alfresco Public REST APIs. For more information, see [REST API]({% link content-services/latest/develop/rest-api-guide/index.md %}).

If configuring SAML using JMX beans, there are two additional properties that you can update in the JMX console. These properties are: `saml.sp.outcome.establishSession` and `saml.sp.outcome.provideTicket`. The use of the ticket based pattern is recommended to ensure authentication for the REST API. It is also recommended to avoid using session (cookie based), so `saml.sp.outcome.establishSession` should be set to `false`.

## General usage information

The initial REST API use cases are targeting clients that leverage CMIS, the Mobile SDK, and the Public REST API. These clients should all be able to manage authenticate with SAML through the identity provider (IdP) HTTP POST binding (requires browser capabilities). Different IdPs support different SAML bindings and may have small differences when working with them.

### Authenticate users in an application using SAML via the REST API

1. [Configure the REST API]({% link saml-module/latest/config/alfresco.md %}#alfresco-rest-api).

2. Check if SAML is enabled (or enforced) in your setup by making a call to `http://localhost:8080/alfresco/service/saml/-default-/rest-api/enabled` where`-default-` is the tenant name and `rest-api` is the ID of your SAML REST API service provider.

    This web script is documented at:

    ```http
    http://localhost:8080/alfresco/s/script/org/alfresco/repository/authentication/saml/service-provider/enabled.get
    ```

    The web script will return a JSON object with the information:

    ```json
    {
        "entry":
        { 
          "isSamlEnabled": true,
          "isSamlEnforced": true,
          "idpDescription": ".....",
          "tenantDomain": "...."
        }
    }
    ```

3. To start the SAML authentication protocol, your application will have to open an embedded browser (such as webkit) and navigate to: `http://localhost:8080/alfresco/service/saml/-default-/rest-api/authenticate`

    This process generates the callback URL which the IdP will use after the user has logged in. The URL gets built using the `alfresco.host`, `alfresco.port`, and `alfresco.protocol` properties. Your application will need to know the values of these properties.

    You can find the description of the callback here:

    ```http
    http://localhost:8080/alfresco/s/script/org/alfresco/repository/authentication/saml/service-provider/authenticate.get
    ```

    This web script returns an HTML page that contains an embedded form which automatically submits and redirects to the configured IdP login page.

4. Enter the credentials of your application and click the **Login** button on the IdP page in the embedded browser. This will submit and redirect back to an Alfresco web script: `http://localhost:8080/alfresco/service/saml/-default-/rest-api/authenticate-response`

    In this POST operation, the Alfresco repository will receive a SAML message from the IdP containing an assertion about the identity of the user. The repository will then verify the message and check if the user is authorized for the repository. If successful, it responds with the following JSON:

    ```json
    {
        "entry":
        {
            "id":"TICKET_81c0bd117a3804f26efc7c8aa645918d05f2598b",
            "userId":"test"
        }
    }
    ```

    Your application should monitor the embedded browser you started to detect when it hits this final URL: `http://localhost:8080/alfresco/service/saml/-default-/rest-api/authenticate-response`

    Pick up the ticket from the JSON response and close the browser. You now have an Alfresco ticket to talk to the REST APIs. For more information, see: `http://localhost:8080/alfresco/s/script/org/alfresco/repository/authentication/saml/service-provider/authenticate-response.post`.

5. Using this Alfresco ticket, you can talk to any Alfresco API. For more information, see [Specifying user identity]({% link content-services/latest/tutorial/platform/web-scripts.md %}#specifying-user-identity).

    You can pass the ticket as the `alf_ticket` query parameter in the URL. For example to get a list of sites use: `http://localhost:8080/alfresco/s/api/sites?alf_ticket=TICKET_97990b0a1c9152282b715a31bf365b41a3e21f01`

    For CMIS, you can also invoke any API and use the special name `ROLE_TICKET` as the username and your ticket as the password.

6. You can initiate a Single-Log-Out from the IdP to invalidate your ticket and sign the user out of all services through the IdP. As with the login, you need to embed a browser again and navigate to: `http://localhost:8080/alfresco/service/saml/-default-/rest-api/logout-request?alf_ticket=<your-ticket>`

    The repository will respond with an HTML page containing a form that gets submitted to the IdP automatically. The IdP will then sign out the user and ultimately respond with an HTML page containing a form that is submitted back to this repository URL: `http://localhost:8080/alfresco/service/saml/-default-/rest-api/logout-response`

    In this POST operation, the repository will receive a SAML message from the IdP containing the logout status. On success, the repository will invalidate the ticket and respond with an empty JSON message:

    ```json
    {"entry":{}}
    ```

    > **Note**: The logout from Alfresco should be done during the first call to `/logout-request`, as the last redirect to `/logout-response` doesn't have an assertion to tell which user was logged out. So, Alfresco relies on the cookie to match the logout response to the correct user.

## General Alfresco REST API information

From Alfresco Content Services 6.2 onwards, there is a comprehensive API Explorer that should help you build applications faster, more securely, and consistently. For more information, see [https://api-explorer.alfresco.com/api-explorer/](https://api-explorer.alfresco.com/api-explorer/){:target="_blank"} and [https://github.com/Alfresco/rest-api-explorer](https://github.com/Alfresco/rest-api-explorer){:target="_blank"}.

## Enforcing SAML

You can configure the REST API service provider in Alfresco to enforce SAML authentication. In this case, the REST API will no longer accept any authentication by username and password. The only way to invoke the APIs is by using an Alfresco ticket (as described above). All endpoints to receive such a ticket by username and password are disabled. This means that the only way to get a valid ticket to use with the REST API is through the SAML login API. This means all applications using the REST API (such as Alfresco Share) will have to use SAML. The enforce option is ignored if SAML is disabled for the REST API.

## Administration Console

Although both the Alfresco Admin Console and REST API use web scripts, the Admin Console is excluded from SAML enforcement. The Administrator is still able to access the Admin Console by using a username and password. This exclusion is performed based on the family of the web script (`<family>AdminConsole</family>`) or based on a whitelist of web script IDs. If you have to add additional web scripts to this whitelist, you can do so by setting the property `saml.authenticator.bypass.script.pattern` to a Java pattern, matching web script IDs in `alfresco-global.properties`.

## Example in Java SE (with Java FX)

See [https://github.com/andrei-rebegea/hello-alfresco-saml-api-client-demo](https://github.com/andrei-rebegea/hello-alfresco-saml-api-client-demo).

## Example in Android

See [https://gitlab.alfresco.com/mobile/android-saml-testing-app](https://gitlab.alfresco.com/mobile/android-saml-testing-app).

## Single page web applications

When calling APIs on the repository directly from the browser, you may run into CSRF and CORS issues.

## Configure CSRF

The Application Development Framework (ADF) documentation contains some information on how to configure CSRF. For more information, see [Flag to disable csrf in the core and in the demo shell](https://github.com/Alfresco/alfresco-ng2-components/issues/819) and [Prerequisites for building and running apps with the Alfresco Application Development Framework](https://github.com/Alfresco/alfresco-ng2-components/blob/f575bc5f61210b1ce233fbdda6ab9cb37814abed/PREREQUISITES.md).

## Enable CORS in Alfresco

The web client for ADF will be loaded from a different web server than the one Alfresco runs on. This means that the Alfresco server needs to know that any request that comes in from this custom web client should be allowed access to the repository. This is done by enabling cross-origin resource sharing (CORS).

To enable CORS in the Alfresco server, do one of the following:

* Download and install the CORS module:

    1. Download the [CORS module](https://artifacts.alfresco.com/nexus/repository/releases/org/alfresco/enablecors/1.0/enablecors-1.0.jar){:target="_blank"}.
    2. Stop the Alfresco server.
    3. Add the enable CORS platform module JAR to the `<ALFRESCO_HOME>/modules/platform` directory.
    4. Restart the Alfresco server.

        > **Note:** By default the CORS filter that is enabled will allow any origin.

* Manually update the `web.xml` file

    1. Open `<ALFRESCO_HOME>/tomcat/webapps/alfresco/WEB-INF/web.xml`.
    2. Uncomment the following section:

        ```xml
        <filter-mapping>
            <filter-name>CORS</filter-name>
            <url-pattern>/api/*</url-pattern>
            <url-pattern>/service/*</url-pattern>
            <url-pattern>/s/*</url-pattern>
            <url-pattern>/cmisbrowser/*</url-pattern>
        </filter-mapping>
        ```

    3. Update `cors.allowOrigin` URL to `http://localhost:3000`. Make sure to use the URL that will be used by the web client.

## Proxies and clustering

There are a number of recommendations when running SAML for Alfresco behind a proxy.

Make sure that the IdP is accessible to the client applications. At a minimum, configure the `alfresco.host`, `alfresco.port`, and `alfresco.protocol` properties to use the correct values of the proxy server. For more information, see [sysAdmin subsystem properties]({% link content-services/latest/config/repository.md %}#sysadmin-props). For deploying Alfresco with a reverse proxy, see [Deploying Alfresco with a different context path]({% link content-services/latest/config/repository.md %}#deploy-contextpath).

The limitations that apply to using web scripts with ticket authentication also applies to clustering for SAML usage. Make sure you have set up your load balancer correctly.

### Recommendation for proxy

In a production environment, for the REST API and AOS, implement a setup with a reverse proxy in front of Alfresco. This reverse proxy is configured to block all API requests except those that you want to be let through, for example, CMIS. Such a setup needs to allow these requests:

* `/alfresco/service/saml/-default-/aos/authenticate`
* `/alfresco/service/saml/-default-/aos/authenticate-response`
* `/alfresco/service/saml/-default-/rest-api/authenticate`
* `/alfresco/service/saml/-default-/rest-api/authenticate-response`
