---
title: Administer Outlook Integration
---

This section contains information related to administration of the Outlook Integration.

## Using SAML SSO with Outlook Integration {#usingsaml}

Use this information to set up SAML Single Sign-On (SSO) authentication for Alfresco Content Services with the Outlook Integration.

> **Note:** With the deprecation of the SAML Module for Alfresco Content Services, the configuration to enable SAML has been moved to Identity Service. Outlook Integration uses the OpenId Connect protocol to manage the authentication against the Identity Service, while the Identity Service handles the SAML-related part depending on the configuration of the SAML provider.

See the [Identity Service documentation]({% link identity-service/latest/tutorial/sso/saml.md %}) for details.

### Prerequisites

* Identity Service needs to be installed and configured to be used with an Alfresco Content Services instance.
* A SAML Identity Provider (IdP) like Active Directory Federation Services (AD FS) needs to be configured for Identity Service:
  * See steps 3 - 5 of the [Identity Service SAML guide]({% link identity-service/latest/tutorial/sso/saml.md %}).
* Outlook Integration needs to be able to reach the Identity Service and the SAML IdP to handle authentication.

Once you've installed the Outlook client and completed the configuration, you should see the OIDC authentication radio button in the Outlook plugin
configuration.

To see this option, open Microsoft Outlook, and in the **Alfresco Client** tab select **Configure** to view the client configuration:

![Alfresco client configuration in Outlook]({% link microsoft-outlook/images/2-10-Outlook-connection-saml.png %})

## Configuration in Identity Service

### Valid Redirect URIs

The OpenId Connect authentication in Outlook Integration uses an embedded browser in combination with the `authorization_code` grant type to authenticate the user against the Identity Service. Extracting the authentication tokens is done within the embedded browser while the redirect happens. As the token extraction is happening within the embedded browser, Outlook Integration does not need to open a web server or a listener on a specific port. It requires an arbitrary URL the Outlook client can be redirected to by the Identity Service after a successful login.

As per the default configuration, a specific loopback address `https://127.0.0.1:6543/OutlookCallback` is defined. This address must be added in the Identity Service - **Valid Redirect URIs** section for the OpenId Connect client that is used.

You can change the redirect URI, if needed. It just needs to match the valid redirect URIs.

### Refresh Tokens

Outlook integration relies on refresh tokens from the Identity Service to automatically retrieve new AccessToken/RefreshToken pairs while Outlook is open. This reduces the number of times for a re-authentication against the SAML IdP.

To ensure this works, the configured OpenId Connect client must provide refresh tokens with the authentication response. To do this, set the following configuration parameters in the Identity Service.

### (Optional) Set up an OpenId Connect Client for Outlook Integration

1. Create a new OpenId Connect client for the realm that is used:
   1. Client authentication: `Off`.
   2. Authorization: `Off`.
   3. Authentication flow: enable `Standard flow`.
2. Specify a valid redirect URI.

> **Note:** Although this step is optional, it is possible to use the default Alfresco client. Setting up a specific OpenId Connect client for Outlook is the preferred way.

Make sure the client specific settings match the server-side configuration.

## Configuration in Alfresco Outlook Integration

The Outlook clients initiates the authentication process directly against the Identity Service server. Therefore, you must configure the IDS configuration parameters on the client-side to match the system environment:

* Authentication Server URL
* Realm
* Client ID
* Redirect URL

Details about the configuration parameters are in the [configuration]({% link microsoft-outlook/2.10/config/index.md %}) page.

> **Note:** To allow the use of the SAML provider without additional user interaction, you must force the use of the SAML provider. See [Identity Service documentation]({% link identity-service/latest/tutorial/sso/saml.md %}#step-5-optional-enforcing-saml) for
details.

## Single Sign-On (SSO)

SSO requires that the SAML IdP and the environment is set up properly. If SSO is not working and a form-based authentication dialog is shown, you may need to extend the list of allowed agents for Windows Integration Authentication on the Active Directory Federation Services side with `Trident/7.0`.
