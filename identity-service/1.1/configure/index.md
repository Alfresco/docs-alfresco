---
title: Configure Identity Service With External Identity Providers
---

It is possible to configure the Identity Service to use an existing identity provider using protocols such as SAML 2.0 or OAuth 2.0.

PingFederate and OpenLDAP are two commonly used identity providers and configuration steps have been provided for each use case:

## PingFederate

You can configure the Identity Service to use PingFederate as a Security Assertion Markup Language (SAML) identity provider. This allows you to authenticate with Alfresco applications using your existing credentials, so you can enjoy the benefits of Single Sign On (SSO).

There are three main stages to this configuration:

* Obtain your PingFederate parameters/settings
* Add SAML as an identity provider in the Identity Service
* Configure the PingFederate connection in the Identity Service

[Complete steps](https://github.com/Alfresco/alfresco-identity-service/blob/1.1.0/docs/config/ping-federate-example.md) for configuring PingFederate are available in the Alfresco/alfresco-identity-service GitHub project documentation.

## OpenLDAP

You can configure the Identity Service to use OpenLDAP as an LDAP identity provider (IdP), known as User Federation. This allows you to configure user synchronization between the Identity Service and OpenLDAP, so that users in the Identity Service are consistent with the users in the supported LDAP provider.

[Complete steps](https://github.com/Alfresco/alfresco-identity-service/blob/1.1.0/docs/config/openldap-example.md) for configuring OpenLDAP are available in the Alfresco/alfresco-identity-service GitHub project documentation.

Once an identity provider is configured, when a user attempts to authenticate against an Alfresco product they will be redirected to the sign in page for the Identity Service. By default, this sign in page has an Alfresco theme.
