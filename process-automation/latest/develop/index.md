---
title: Develop Process Automation
---

The custom development of Process Automation is restricted to four areas:

* Communicating with external systems from an application.
* Extend the Digital Workspace interface for end users.
* Develop a custom user interface using the Application Development Framework (ADF).
* Implementing custom form fields.

## External systems communication

Communication with an external system should use the [REST connector]({% link process-automation/latest/model/connectors/rest.md %}) or the [Lambda connector]({% link process-automation/latest/model/connectors/aws.md %}#lambda).

> **Important**: The REST service and the AWS Lambda account and function need to be hosted outside of the Alfresco hosted environment.

Both connectors can send and return JSON payloads from a process. The REST connector can also be configured as a [trigger]({% link process-automation/latest/model/triggers.md %}#webhooks) for webhooks.

## Extend the Digital Workspace

The default [end user interface]({% link process-automation/latest/model/interfaces.md %}) provided with Process Automation is the [Alfresco Digital Workspace]({% link digital-workspace/latest/index.md %}).

> **Note**: The Digital Workspace can be extended to customize the branding and components. If your requirement is to customize large parts of the Digital Workspace then consider [developing a custom user interface](#develop-a-custom-user-interface) instead.

### Setup

To start developing Digital Workspace customizations:

1. Request the source code from [Support](https://myalfresco.force.com/support/){:target="_blank"}.

2. Unzip the source code into your development environment and create a `.env` file in the root folder.

3. Insert the following contents in the `.env` file:

    ```bash
    # GENERAL
    AUTH_TYPE="OAUTH"
    PROVIDER="ALL"
    LOG_LEVEL="TRACE"
    ACA_BRANCH="develop"

    # ADW + APA
    API_HOST="https://..."
    API_CONTENT_HOST="https://..."
    API_PROCESS_HOST="https://..."
    OAUTH_HOST="https://..."
    IDENTITY_HOST="https://..."

    PLUGIN_PROCESS_SERVICE=true

    APP_CONFIG_APPS_DEPLOYED="[{"name": "..."}]"
    ```

4. Update the contents of the `.env` file with the following:

    | Property | Description |
    | -------- | ----------- |
    | API_HOST | The API host for the environment in the format `https://alfresco.com`. |
    | API_CONTENT_HOST | The API host for the content services in the format `https://alfresco.com`. |
    | API_PROCESS_HOST | The API host for the process services in the format `https://alfresco.com`. |
    | OAUTH_HOST | The authentication host in the format `https://alfresco.com/auth/realms/alfresco`. |
    | IDENTITY_HOST | The identity service host in the format `https://alfresco.com/auth/realms/alfresco`. |
    | APP_CONFIG_APPS_DEPLOYED | The name of the deployed application to extend the Digital Workspace against. The name is set when the application is deployed, for example `[{"name": "invoice-approval-application"}]`. |

5. Run the following command from the root of your local Digital Workspace: `npm run start content-en-cloud`.

6. Your local Digital Workspace is now connected to your hosted Process Automation application and can be extended, tested and debugged.

### Develop

The Digital Workspace is built using the Application Development Framework. There are a set of [content components](https://www.alfresco.com/abn/adf/docs/content-services/){:target="_blank"} and a set of [process components](https://www.alfresco.com/abn/adf/docs/process-services-cloud/){:target="_blank"} that can be extended.

> **Note**: Process Automation uses the Process Services **Cloud** components.

### Upload

Once the extended Digital Workspace has been fully customized and tested it can be deployed.

1. Remove the `.env` file from your source code.

2. Upload your source code to your Alfresco S3 bucket.

    > **Note**: Please contact [Support](https://myalfresco.force.com/support/){:target="_blank"} if you do not have the details of this bucket.

3. Raise a [Support request](https://myalfresco.force.com/support/){:target="_blank"} with this information:

    * A link to the source code in S3.
    * The name of the application to update.

        > **Note**: This should match what is configured in the `app.config.json` for the interface.

    * The environment the application is deployed in.
    * When the application should be updated with the new interface.

## Develop a custom user interface

The [Application Development Framework (ADF)](https://www.alfresco.com/abn/adf/docs/){:target="_blank"} can be used to develop a custom [end user interface]({% link process-automation/latest/model/interfaces.md %}) from scratch.

### Setup {#custom-setup}

The Yeoman generator can be used to develop custom user interfaces for Process Automation.

1. Clone the [Yeoman generator project](https://github.com/Alfresco/generator-alfresco-adf-app/){:target="_blank"}.

2. Open `apps/utils.js` and remove the following two templates from being excluded:

    ```js
    const excludedTemplates = ['adf-cli-activiti-template', 'adf-cli-activiti-acs-template'];
    ```

3. Run the following command from the root of the project: `yo alfresco-adf-app`.

    1. Give the project a name.
    2. Select the option **Content and Process Services with Activiti** to develop an application using process and content components, or **Process Services with Activiti** if developing only with process components.
    3. Install any required dependencies.

4. Configure the security in the `app.config.json` of the generated application:

    ```json
    "$schema": "../node_modules/@alfresco/adf-core/app.config.schema.json",
        "ecmHost": "http://{hostname}{:port}",
        "bpmHost": "http://{hostname}{:port}",
        "identityHost": "https://{hostname}{:port}/auth/realms/alfresco",
        "providers": "ALL",
        "appName": "invoice-approval-application",
        "application": {
            "name": "Alfresco ADF Application"
        },

    "authType": "OAUTH",
    "oauth2": {
        "host": "https://{hostname}/auth/realms/alfresco",
        "clientId": "invoice-approval-application",
        "scope": "openid",
        "secret": "",
        "implicitFlow": true,
        "silentLogin": true,
        "redirectSilentIframeUri": "{protocol}//{hostname}{:port}/assets/silent-refresh.html",
        "redirectUri": "/",
        "redirectUriLogout": "/"
    },
    ```

5. Add the property `"alfresco-deployed-apps"` to the `app.config.json` with the name of the deployed application you are developing an interface for. For example, `"alfresco-deployed-apps": [{"name":"invoice-approval-application"}]`.

6. To develop the interface locally, CORS will need to be bypassed. Edit the `proxy.conf.js` replacing the `{hostname}` and `{realm}` with those relevant to your environment and realm:

    ```js
    module.exports = {
        "/auth/admin/realms/{realm}": {
            "target": "https://{hostname}",
            "secure": false,
            "pathRewrite": {
                "^/auth/admin/realms/{realm}": ""
            },
            "changeOrigin": true,
            "logLevel": "debug"
        },

        "/auth/realms/...": {
            "target": "https://{hostname}",
            "secure": false,
            "pathRewrite": {
                "^/auth/realms/{realm}": ""
            },
            "changeOrigin": true,
            "logLevel": "debug"
        },

        "/": {
            "target": "https://{hostname}",
            "secure": false,
            "changeOrigin": true,
            "logLevel": "debug"
        },

        "/alfresco": {
            "target": "https://{hostname}",
            "secure": false,
            "changeOrigin": true
        }
    }
    ```

### Develop {#custom-develop}

There are a set of [content components](https://www.alfresco.com/abn/adf/docs/content-services/){:target="_blank"} and a set of [process components](https://www.alfresco.com/abn/adf/docs/process-services-cloud/){:target="_blank"} that can be used to develop the custom user interface with. The content components can only be used if you selected the option **Content and Process Services with Activiti** when generating the application.

> **Note**: Process Automation uses the Process Services **Cloud** components.

### Upload {#custom-upload}

Once the custom interface has been fully developed and tested it can be deployed.

1. Upload your source code to your Alfresco S3 bucket.

    > **Note**: Please contact [Support](https://myalfresco.force.com/support/){:target="_blank"} if you do not have the details of this bucket.

2. Raise a [Support request](https://myalfresco.force.com/support/){:target="_blank"} with this information:

    * A link to the source code in S3.
    * The name of the application to update 

        > **Note**: This should match what is configured in the `app.config.json` for the interface.

    * The environment the application is deployed in.
    * When the application should be updated with the new interface.

## Custom form fields

To include custom form fields within a form, the [form field customizations](https://www.alfresco.com/abn/adf/docs/user-guide/aae-extensions/){:target="_blank"} must be included in the [customization of Digital Workspace](#extend-the-digital-workspace) or the [development of a custom user interface](#develop-a-custom-user-interface).

> **Note**: The custom field can be [included in a form]({% link process-automation/latest/model/forms.md %}#custom-form-widgets) before the custom interface has been deployed.

## REST API to cleanup historical data

You can clean up historical data by using specific keys as input paramaters.

| Property | Description |
| -------- | ----------- |
| `historicRetentionDays` | *Required.* The number of days to retain any completed or cancelled processes. |
| `processDefinitionKeys` | *Optional.* A list of process definition keys to clean up. If omitted, all current process definitions are queried from the database and applied to delete the criteria. The default is `null`. |
| `limitSize` | *Optional.* A parameter that specifies the delete query size limit for performance. The default is `1000` rows. |
| `schemaPrefix` | *Optional.* A parameter that specifies the schema prefix, i.e. `public`. The default is an empty string. |
| `async` | *Optional.* A parameter that specifies the job execution strategy via the task executor. The default is true. |

For example:

`POST /v1/admin/batch/jobs/executions/cleanup-query-process-instance-history-job`

```json
{
  "historicRetentionDays": 10,
  "processDefinitionKeys": ["ConnectorProcess", "HeadersConnectorProcess"],
  "limitSize": 100,
  "schemaPrefix": "public",
  "async": true
}
```