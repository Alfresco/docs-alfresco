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
| Authentication type | *Required.* Select the type of authentication, for example `Basic`. There are three types of authentication you can use, `Basic`, `Client credentials`, and `Bearer token`. |
| Secured | *Optional.* When selected, credentials are defined during deployment time, or de-select the checkbox to provide them during modeling time. These credentials are used when contacting the external API. |
| Clientid | *Required.* When using Client credentials authentication, enter the client id, for example `Client-1`. |
| Client secret | *Required.* When using Client credentials authentication, enter the client secret for the API, for example `client.secret`. |
| Endpoint| *Required.* When using Client credentials authentication, enter the end point of the server, for example `client.endpoint`. The endpoint entered is validated before you can save the authentication. |
| Scope | *Required.* When using Client credentials authentication, enter one or more scope values that make up part of the API account you want to access, for example `api.account.one`. The scope entered is validated before you can save the authentication. |
| Token | *Required.* When using Bearer token authentication, enter the bearer token for the API, for example `bearer-token`. |

 > **Note:** All the configuration parameters can be overridden at deployment time.

## Create authentication

To create authentication:

1. Sign into the Modeling Application and open a project.

2. Click the **+** next to Authentications.

3. Enter a name for the authentication.

   Optionally, enter a description for the authentication.

4. Select an authentication type from the dropdown list.

   Optionally, deselect **Secured** so you can enter a username and password that is used when contacting the API.

## Authentication

The following is an authentication created using Basic authentication and a username and password.

![Authentication]({% link process-automation/images/authentication.png %})
