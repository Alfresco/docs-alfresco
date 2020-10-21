---
title: Overview
---




The three areas to develop and extend in Process Automation are:

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
    | API_HOST |
    | API_CONTENT_HOST |
    | API_PROCESS_HOST |
    | OAUTH_HOST |
    | IDENTITY_HOST |
    | APP_CONFIG_APPS_DEPLOYED | The name of the deployed application to extend the Digital Workspace against. The name is set when the application is deployed, for example `invoice-approval-application`. |

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
        "host": "https://.../auth/realms/alfresco",
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

6. To develop the interface locally, CORS will need to be bypassed. Edit the `proxy.conf.js`:

    ```js
    module.exports = {
        "/auth/admin/realms/...": {
            "target": "https://...",
            "secure": false,
            "pathRewrite": {
                "^/auth/admin/realms/...": ""
            },
            "changeOrigin": true,
            "logLevel": "debug"
        },

        "/auth/realms/...": {
            "target": "...",
            "secure": false,
            "pathRewrite": {
                "^/auth/realms/...": ""
            },
            "changeOrigin": true,
            "logLevel": "debug"
        },

        "/": {
            "target": "...",
            "secure": false,
            "changeOrigin": true,
            "logLevel": "debug"
        },

        "/alfresco": {
            "target": "...",
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
    * The name of the application to update.
    * The environment the application is deployed in.
    * When the application should be updated with the new interface.

## Custom form fields

To include custom form fields within a form, the [form field customizations](https://www.alfresco.com/abn/adf/docs/user-guide/aae-extensions/){:target="_blank"} must be included in the [customization of Digital Workspace](#extend-the-digital-workspace) or the [development of a custom user interface](#develop-a-custom-user-interface).

> **Note**: The custom field can be [included in a form]({% link process-automation/latest/model/forms.md %}#custom-form-widgets) before the custom interface has been deployed.
