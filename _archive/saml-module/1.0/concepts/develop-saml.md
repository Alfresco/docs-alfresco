---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# SAML SSO REST API service provider usage guidelines

This information is intended for developers or system administrator to create applications that interact with Alfresco.

**Prerequisite and assumptions**

To get started, you'll need the following:

-   Install Alfresco with the SAML SSO module. See [SAML Single Sign-On \(SSO\) for Alfresco One](saml-overview.md) for general installation instructions, supported versions of Alfresco, and supported IdPs.
-   Access to an IdP that supports the SAML 2.0 protocol and that is configured properly.

The instructions in the example below assume that you have Alfresco running locally on port 8080 \(`http://localhost:8080/alfresco`\). Currently, the SAML module in Alfresco does not support user provisioning. So the user IDs have to be created in Alfresco and in the IdP before trying to authenticate the users with SAML in Alfresco or in your custom application.

**Service description \(and limitations\)**

Alfresco offers a configurable mode for interacting with the SAML support. As an administrator, you can go to `http://localhost:8080/alfresco/s/enterprise/admin/admin-saml` to see the configured SPs that Alfresco exposes for interacting with various Alfresco functionality and components. Out of the box, the SAML module for Alfresco provides the following SPs:

-   Share
-   REST API
-   AOS

In this example, we will discuss the REST API SP in details. This is the recommended SP configuration to use for interacting with the Alfresco Public REST APIs. For more information, see [REST API](http://docs.alfresco.com/5.1/pra/1/topics/pra-welcome.html) and [CMIS REST API](http://docs.alfresco.com/5.1/pra/1/topics/cmis-welcome.html).

You can configure the SAML SSO required properties for REST API either from the [Admin Console UI](../tasks/saml-restapi-console.md) or using the [properties files](../tasks/saml-config-props-restapi.md), or using the [JMX beans](../references/saml-jmx-beans-api.md).

When using JMX beans, there are two additional properties that you can update in the JMX console. These properties are: `saml.sp.outcome.establishSession` and `saml.sp.outcome.provideTicket`. Alfresco recommends the use of the ticket based pattern to ensure authentication for REST API. Avoid using session \(cookie based\), so `saml.sp.outcome.establishSession` should be set to `false`.

**General usage information**

The initial REST API SP use cases are targeting clients that leverage CMIS, the Mobile SDK, and the Public REST API. These clients should all be able to manage the [SAML dance](develop-saml.md#3) through the IdP HTTP POST binding \(requires browser capabilities\). Different IdPs support different SAML bindings and may have small peculiarities when working with them.

**Steps to authenticate users in your app using Alfresco SAML REST API SP**

1.  Configure the REST API SP either by using the Alfresco [Admin Console UI](../tasks/saml-restapi-console.md) or using [JMX beans](../references/saml-jmx-beans-api.md).
2.  To check if the SAML protocol is enabled \(or enforced\) in your Alfresco server, make a call to:

    ```
    http://localhost:8080/alfresco/service/saml/-default-/rest-api/enabled
    ```

    where:

    -   `-default-` is the tenant name
    -   `rest-api` is the id of your SAML REST API SP
    This web script is documented at:

    ```
    http://localhost:8080/alfresco/s/script/org/alfresco/repository/authentication/saml/service-provider/enabled.get
    ```

    The web script will return JSON with the information about the REST API SP:

    ```
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

3.  To start the SAML authentication protocol \(also known as SAML dance\), your application will have to open an embedded browser \(such as, webkit\) and point it to:

    ```
    http://localhost:8080/alfresco/service/saml/-default-/rest-api/authenticate
    ```

    This process also generates the callback URL which the IdP will use after the user has logged in. See [Step 4](develop-saml.md#4) and [Step 5](develop-saml.md#5). The URL gets built using the `alfresco.host`, `alfresco.port`, and `alfresco.protocol` properties. Your application will need to know about the values of these properties. See [Step 4](develop-saml.md#4).

    You can find the description here:

    ```
    http://localhost:8080/alfresco/s/script/org/alfresco/repository/authentication/saml/service-provider/authenticate.get
    ```

    This web script returns an HTML page that has an embedded form which automatically submits and redirects to the configured IdP login page.

4.  Enter the credentials of your application and click the **Login** button on the IdP page in the embedded browser. This will submit and redirect back to an Alfresco web script:

    ```
    http://localhost:8080/alfresco/service/saml/-default-/rest-api/authenticate-response
    ```

    In this POST operation, the Alfresco repository will receive a SAML message from the IdP containing an assertion about the identity of the user. The repository will then verify the message and check if the user is authorized for the repository. If successful, it responds with the following JSON:

    ```
    {
        "entry":
        {
            "id":"TICKET_81c0bd117a3804f26efc7c8aa645918d05f2598b",
            "userId":"test"
        }
    }
    ```

    Your application should monitor the embedded browser you started in [Step 4](develop-saml.md#3) to detect when it hits this final URL:

    ```
    http://localhost:8080/alfresco/service/saml/-default-/rest-api/authenticate-response
    ```

    Pick up the ticket from the JSON response and close the browser. You now have an Alfresco ticket to talk to the REST APIs. For more information, see http://localhost:8080/alfresco/s/script/org/alfresco/repository/authentication/saml/service-provider/authenticate-response.post.

5.  Using this Alfresco ticket, you can talk to any Alfresco API. For more information, see [Specifying user identity](http://docs.alfresco.com/5.2/tasks/ws-specify-user-identity.html).

    You can pass the ticket as `alf_ticket` query parameter in the URL. For example to get a list of sites use:

    ```
    http://localhost:8080/alfresco/s/api/sites?alf_ticket=TICKET_97990b0a1c9152282b715a31bf365b41a3e21f01
    ```

    For CMIS, you can also invoke any API and use the special name `ROLE_TICKET` as username and your ticket as password.

6.  You can initiate a Single-Log-Out from the IdP to invalidate your ticket and sign the user out of all services through the IdP. As with the login dance, you need to embed a browser again and navigate it to:

    ```
    http://localhost:8080/alfresco/service/saml/-default-/rest-api/logout-request?alf_ticket=<your-ticket>
    ```

    The repository will respond with an HTML page containing a form that gets submitted to the IdP automatically. The IdP will then sign out the user and ultimately respond with an HTML page containing a form that is submitted back to this repository URL:

    ```
    http://localhost:8080/alfresco/service/saml/-default-/rest-api/logout-response
    ```

    In this POST operation, the repository will receive a SAML message from the IdP containing the logout status. On success, the repository will invalidate the ticket and respond with an empty JSON message:

    ```
    {"entry":{}}
    ```

    The logout from Alfresco \(SP initiated\) should be done during the first call to `/logout-request`, as the last redirect to `/logout-response` doesn't have an assertion to tell which user was logged out. So, Alfresco relies on the cookie to match the logout response to the correct user.


**General Alfresco REST API information**

From Alfresco Content Services 5.2 onwards, there is a comprehensive API Explorer that should help you build applications faster, more securely, and consistently. For more information, see [https://api-explorer.alfresco.com/api-explorer/](https://api-explorer.alfresco.com/api-explorer/) and [https://github.com/Alfresco/rest-api-explorer](https://github.com/Alfresco/rest-api-explorer) projects.

For Alfresco One 5.1 and previous versions, see [What does a request look like?](http://docs.alfresco.com/5.1/pra/1/concepts/pra-request.html).

**Enforcing SAML**

You can configure the REST API service provider in Alfresco to enforce SAML authentication. In this case, the REST API will no longer accept any authentication by username and password. The only way to invoke the APIs is by using an Alfresco ticket \(as described above\). All endpoints to receive such a ticket by username and password are disabled. This means that the only way to get a valid ticket to use with the REST API is through the SAML login API \(SAML dance\). So, all the applications using the REST API \(like Share\) will have to use SAML. The enforce option is ignored if SAML is disabled for the REST API.

**Administration Console**

Although both the Alfresco Admin Console and REST API use web scripts, it is excluded from the SAML enforcement. The Administrator is still able to access the Admin Console by using the username and password. This exclusion is performed based on the family of the web script \(`<family>AdminConsole</family>`\) or based on a whitelist of web script IDs. If you have to add additional web scripts to this whitelist, you can do so by setting the property `saml.authenticator.bypass.script.pattern` to a Java Pattern matching web script IDs in alfresco-global.properties.

**Example in Java SE \(with Java FX\)**

See [https://github.com/andrei-rebegea/hello-alfresco-saml-api-client-demo](https://github.com/andrei-rebegea/hello-alfresco-saml-api-client-demo).

**Example in Android**

See [https://gitlab.alfresco.com/mobile/android-saml-testing-app](https://gitlab.alfresco.com/mobile/android-saml-testing-app) and [https://git.alfresco.com/Platform/alfresco-saml-module/wikis/SAMLAndroidApp](https://git.alfresco.com/Platform/alfresco-saml-module/wikis/SAMLAndroidApp).

-   **[Working with single page web applications](../concepts/saml-web-apps.md)**  
When calling APIs on the repository directly from the browser, you may run into CSRF and CORS issues.
-   **[Working with proxies and clustering](../concepts/saml-cluster.md)**  
Use this information to know about the limitations and recommendations when SAML SSO works with Alfresco behind a proxy.

**Parent topic:**[SAML Single Sign-On \(SSO\) for Alfresco Content Services 1.0.3](../concepts/saml-overview.md)

