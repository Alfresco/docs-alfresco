---
title: Administer Outlook Integration
nav: false
---

This section contains information related to administration of the Outlook Integration.

## Using SAML SSO with Outlook Integration {#usingsaml}

Use this information to set up SAML Single Sign-On (SSO) for Alfresco Content Services authentication with the Outlook Integration.

* Check the requirements in [Prerequisites]({% link saml-module/latest/install/index.md %}#Prerequisites)
* Install the Alfresco SAML module - [Install with Zip]({% link saml-module/latest/install/index.md %})
* Configure the Alfresco SAML module - [Configure SAML SSO]({% link saml-module/latest/config/index.md %})
  * On the server-side, you'll need to enforce SAML authentication for REST API, using one of the methods described in [Configure SAML SSO]({% link saml-module/latest/config/alfresco.md %}). For example, you can set `saml.sp.isEnforced=true` in the `alfresco-global.properties` file.
  * Enable SAML in Outlook clients using one of the following options: [using the client configuration XML]({% link microsoft-outlook/2.9/config/index.md %}#advanced-configuration) or [using the command line]({% link microsoft-outlook/2.9/install/index.md %}#installunattendedmode).

>**Note:** If you install the Outlook client manually without specifying the SAML authentication type, you won't be able to see or select the SAML option.

Once you've installed the Outlook client and completed the configuration, you should see the SAML authentication radio button in the Outlook plugin configuration. To see this option, open Microsoft Outlook, and in the **Alfresco Client** tab select **Configure** to view the client configuration:

![Alfresco client configuration in Outlook]({% link microsoft-outlook/images/Outlook-connection-saml.png %})

### Additional steps needed when using AD FS with SAML SSO and Outlook

>**Note:** The following steps assume you've already [Configured Active Directory]({% link saml-module/latest/config/adfs.md %}) (AD FS) identity provider (IdP)

When AD FS is used to authenticate the Outlook Integration, you'll need to check the following settings in the IDP server:

1. Log in to AD FS as the administrator, and go to **Authentication Policies**.
2. Select **Edit Global Authentication Policy**.
3. In the **Intranet** tab, click the check box next to **Forms Authentication**.

This avoids the display of a "white page" in the login page.
