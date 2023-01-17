---
title: Configure a Process Services action
---

Use this information to install and configure an AMP for linking Content Services to Alfresco Process Services (APS).

When Content Services and Process Services are linked, a [folder rule action]({% link content-services/7.2/using/content/rules.md %}#ruleactions) can be configured that starts a Process Services process when a document is added into the folder. This is called an APS action.

## Prerequisites

To configure an APS action there are several prerequisites that must be met:

* Content Services installed.
* Process Services installed.
* Content Services and Process Services using a common LDAP database to sync users from.

> **Note:** If Content Services and Process Services do not sync their uses against a single LDAP database then an APS action will never work. See [configure LDAP for Content Services]({% link content-services/7.2/admin/auth-sync.md %}#configure-ldap) and [configure LDAP for Process Services]({% link process-services/latest/config/authenticate.md %}#ldap-and-active-directory) for information on configuring LDAP.

## Install the AMP

To install the APS action AMP:

1. Visit [Hyland Community](https://community.hyland.com/){:target="_blank"} and download the APS action zip bundle.

2. Unzip the bundle and place the `aps-action-share-7.0.0.amp` to the Content Services `amps_share` directory.

3. Run the `apply_amps.bat` file from the `bin` directory to install the AMP.

4. Check the output from the `.bat` file to ensure the installation was successful.

5. Restart the Content Services server.

## Configure the repository in Process Services

To configure the repository in Process Services:

1. Sign into Process Services as an administrator.

2. Open up the [Identity Management]({% link process-services/latest/using/process/index.md %}#identity-management) section and select **Tenants** > **Alfresco Repositories**.

3. Create a repository connection:

    | Field | Description |
    | ----- | ----------- |
    | Name | *Required.* A name for the repository connection. |
    | Alfresco tenant | *Optional.* The tenant to use for the connection. The default value is `-default-`. |
    | Repository base URL | *Required.* The base URL of Content Services, for example `http://127.0.0.1:8080/alfresco/`. |
    | Share base URL | *Required.* The base URL of Share, for example `http://127.0.0.1:8080/share/`. |
    | Alfresco version | *Required.* The version of Content Services used. This must initially be configured as `5.2`, even if using a later version of Content Services. |
    | Authentication | *Required.* The authentication method to use. Select `Enable Share Connector` checkbox. |
    | Secret | *Required.* The common secret used for communication between Content Services and Process Services. The default value us `activiti-share-connector-secret`. This must match the property `activiti.secret` set in Content Services. |

4. Save the connection.

5. Inspect the connection in the list. If the `ID` is `1` and the default values do not need to be updated then this step is complete. If the `ID` is not set to `1` then stop Content Services and Process Services and update the following two files with the `ID` showing in the repository list:

    * In `tomcat/shared/classes/alfresco-global.properties` in Content Services add a line for `activiti.alfrescoRepositoryName=alfresco-<ID>` where `<ID>` was the ID displayed in Process Services, for example `alfresco-1002`.
    * In `tomcat/lib/activiti-app.properties` in Process Services update the property `integration.login.alfresco-1.secret` where `1` is replaced with the ID displayed in Process Services, for example `integration.login.alfresco-1002.secret`.

### Enable review process app

To enable the bundled **Review Processes** app in Process Services, add the following into the `<InstallLocation\>/lib/activiti-app.properties` and restart Process ServicesL

```bash
app.review-workflows.enabled=true
```

## Configure Content Services properties

Content Services needs properties set in the `tomcat/shared/classes/alfresco-global.properties` file that point to the Process Services installation and enable the use of APS actions:

| Property | Description |
| -------- | ----------- |
| activiti.domain | The domain that Process Services is running on, for example `example-aps.com`. |
| activiti.baseUrl | The base URL of the Process Services installation. |
| activiti.secret | The common secret Content Services and Process Services use for communication. The default value is `activiti-share-connector-secret`. This value must match the `Secret` value set in Process Services when configuring a repository connection. |
| activitiRepoConnector.enabled | Set this to `true` to enable the use of APS actions. |
