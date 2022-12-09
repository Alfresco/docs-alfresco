---
title: Authentication
--- 

Use Authentication when your system requires access to external REST services.

## Properties

The basic properties of creating authentication are:

| Property | Description |
| -------- | ----------- |
| Authentication name | *Required.* The name used to identify the authentication. The name must be in lowercase and be between one and 26 characters in length, for example `token1auth`. |
| Authentication description | *Optional.* A description of the authentication, for example `Basic authentication used`. |
| Authentication type | *Required.* Select the type of authentication, for example `Basic`. There are three types of authentication you can use, `Basic`, `Client credentials`, and `Bearer token`. |
| Secured | *Optional.* When selected, credentials are defined during deployment time, or de-select the checkbox to provide them during modeling time. These credentials are used when contacting the external API. |
| Clientid | *Required.* When using Client credentials authentication, enter the client id, for example `Client-1`. |
| Client secret | *Required.* When using Client credentials authentication, enter the client secret for the API, for example `client.secret`. |
| Endpoint| *Required.* When using Client credentials authentication, enter the end point of the server, for example `client.endpoint`. The endpoint entered is validated before you can save the authentication. |
| Scope | *Required.* When using Client credentials authentication, enter one or more scope values that make up part of the API account you want to access, for example `api.account.one`. The scope entered is validated before you can save the authentication. |
| Token | *Required.* When using Bearer token authentication, enter the bearer token for the API, for example `bearer-token`. |

 > **Note**
 >
 > All the configuration parameters can be overridden at deployment time.

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

## Upgrade authentication for deployed application

You can upgrade the authentication of your deployed application.

To upgrade your authentication:

1. Expand the **Devops** section on the left of the Admin App and then select **Application Instances**.

2. For the application you want to upgrade, click the three dots on the right of the last column and then select **Upgrade**.

3. Select the version you want to upgrade to from the **Upgrade** dropdown list.

   If you select a different version of the application that does not have the same configuration as the currently deployed one, you will optionally be able to enter new authentication details further in this process.

4. If you want user's to receive an email each time a process assigns them a task, select **Enable user task mail notifications** and then select the **Authentications** tab.

5. Select **Change the authentication values** to change the current authentication values and then click **Upgrade**.

   If you are upgrading to a different version of the application to the currently deployed one, the **Change the authentication values** check box will not be visible. Instead, you will be required to re-enter the authentication details of the authentication assigned to the version of the application you are upgrading to.

6. Click **Upgrade**.

   **Important:** For your authentications that are not secure i.e. you did not select the **Secured** check box when the authentication was created, the configuration values already set in the Modeling Application will be automatically applied during the upgrade process. For your authentications that are secure i.e. you did select the **Secured** check box when the authentication was created, you must must re-enter the authentication values on the **Authentications** tab when performing the upgrade.

## Delete authentication

To delete an authentication:

1. Sign into the Modeling App and open the project that contains the authentication you want to delete.

2. Expand the **Authentications** section on the left.

3. Select the authentication you want to delete.

4. click the three dots and then select **Delete**.

5. You will see **Deleting the authentication may affect your project if this authentication is already in use**. Click **Confirm** if you still want to delete the authentication.
