---
title: SAML authentication
---

## SAML authentication

Starting from version 1.4, Alfresco Desktop Sync users can authenticate through a SAML identity provider.

The following prerequisites are required:

* Alfresco Content Services 6.2 or later
* Alfresco Sync Service 3.3 or later
* Identity Service 1.1 or later

SAML authentication in Desktop Sync clients (Windows and Mac) is automatically enabled if the 
Alfresco Content Services repository is configured to use the Identity Service.

See the Alfresco Sync Service documentation for [SAML configuration](TODO_LINK:https://docs.alfresco.com/syncservice/concepts/syncservice-saml-config.html) details.

Once users have entered the repository URL (shown in step 2 of [Setting up Desktop Sync]({% link desktop-sync/latest/install/index.md %}#setting-up-desktop-sync-on-windows) 
for Windows and [Setting up Desktop Sync]({% link desktop-sync/latest/install/index.md %}#setting-up-desktop-sync-on-mac) for Mac), 
they will be asked to enter their username and password into the SAML provider login page via their default browser.
