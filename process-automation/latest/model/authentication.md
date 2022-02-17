---
title: Authentication
--- 

Use Authentication when your system requires access to external REST services.

## Properties

The basic properties of creating authentication are:

| Property | Description |
| -------- | ----------- |
| Authentication name | *Required.* The name used to identify the authentication. The name must be in lowercase and be between one and 26 characters in length, for example `token1auth`. |
| Authentication description | *Optional.* A description of the authentication. This can be your identity provider, for example `Keycloak authentication used`. |
| Authentication type | *Required.* Select the type of authentication, for example `basic`. |
| Secured | *Optional.* When selected, credentials are defined during deployment time, or de-select the checkbox to provide them during modeling time. These credentials are used when contacting the external API. **Note:** All the configuration parameters can be overridden at deployment time. |

## Create authentication

To create authentication:

1. Sign into the Modeling Application and open a project.

2. Click the **+** next to Authentications.

3. Enter a name for the authentication.

   Optionally, enter a description for the authentication.

4. Select an authentication type from the dropdown list.

   **Note:** Basic authentication is the only authentication type currently supported.

   Optionally, deselect **Secured** so you can enter a username and password that is used when contacting the API.

## Authentication

The following is an authentication created using a username and password.

![Authentication]({% link process-automation/images/authentication.png %})
