---
title: Single Sign On (SSO) Guide
---

This documentation describes the configuration required to setup Single Sign On (SSO) capabilities for Alfresco products. Single Sign On refers to the ability for users to access Alfresco Share, the Alfresco Digital Workspace, and Alfresco Process Services in a single browser session by signing in only once to any of the applications.

## Before you begin

See the [supported platforms]({% link identity-service/1.6/support/index.md %}) for the combinations of products and versions that are supported for SSO.

## Authentication types

There are different authentication methods that can be used to configure SSO with. Each of these has additional prerequisites and detailed configuration steps:

* Kerberos
* LDAP
* SAML

## Post-configuration

The following are items to be aware of after configuring SSO:

* The Alfresco Process Services Administrator Application is not covered by SSO and is accessed using basic authentication.

* If not using a Microsoft device and browser, users will be prompted to enter their credentials again when editing documents in Microsoft Office utilizing Alfresco Office Services (AOS).

* User permissions need to be managed in individual products. For example, deactivating a user in Alfresco Content Services will not stop the same user from accessing Alfresco Process Services.
