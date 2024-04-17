---
title: Deploy front-end applications
---

Use the example to launch a front-end application that sits on top of the Alfresco backend services. The example uses the Alfresco Content Services - Community Edition version of the front-end application. You can repeat the same exercise with the Alfresco Content Services - Enterprise Edition.

## Deploy Alfresco Content App {#deploy-aca}

To develop a front-end application using the Alfresco Community Edition (the open source version), use the Content App as a starting point.

### Prerequisites {#prereqs-aca}

* Deploy Alfresco Community Edition and make sure it's accessible from your browser:

    ```bash
    http://localhost:8080/alfresco
    ```

* `Node.js` 18.x

### Deploy Content App

Deploy the Content App using the following steps:

1. Open a command prompt and clone the following GitHub repository to a working directory:

    ```bash
    git clone https://github.com/Alfresco/alfresco-content-app.git
    ```

2. Navigate to the `alfresco-content-app` directory and create a file named `.env` with the following content:

    ```bash
    APP_CONFIG_ECM_HOST="http://localhost:8080"
    APP_CONFIG_PLUGIN_AOS=false
    APP_CONFIG_PLUGIN_CONTENT_SERVICE=true
    ```

    > **Note:** Enter your Alfresco Content Services URL as the `APP_CONFIG_ECM_HOST` value.

3. Run the following commands to start the application:

    ```bash
    npm install
    npm start
    ```
  
    The application is available at `http://localhost:4200` and you must use the Alfresco Content Services credentials.

The Alfresco Content App should be running in development mode in your development environment.

## Deploy Alfresco Digital Workspace {#deploy-adw}

If you're an Alfresco customer or official partner, you can use the Enterprise application instead of the open source software. To develop an Alfresco front-end application, make sure the required software is available on your system.

### Prerequisites {#prereqs-enterprise}

* Deploy ACS Enterprise Edition and make sure it's accessible from your browser:

    ```bash
    http://localhost:8080/alfresco
    ```

* `Node.js` 18.x

### Deploy Digital Workspace

Deploy Digital Workspace using the following steps:

1. Request a local copy of the `alfresco-apps` GitHub repository project from [Hyland Community](https://community.hyland.com/tskb){:target="_blank"}.

    There are two distributions available to run with the Digital Workspace:

    | Distribution | Description |
    | ------------ | ----------- |
    | `content-ee` | *Default.* The Digital Workspace with the Process Services extension |

    > **Note:** This project uses the monorepo structure with several monorepo apps.

2. Create the following `.env` file.

    ```bash
    BASE_URL="http://localhost:8080"
    APP_CONFIG_ECM_HOST="http://localhost:8080"
    APP_CONFIG_PROVIDER="ECM"
    APP_CONFIG_AUTH_TYPE="BASIC"
    APP_CONFIG_PLUGIN_AOS=false
    APP_CONFIG_PLUGIN_CONTENT_SERVICE=true
    APP_CONFIG_PLUGIN_PROCESS_SERVICE=false
    APP_CONFIG_PLUGIN_AI_SERVICE=false
    ```

    > **Note:** The Digital Workspace 4.4.x uses the Content Application version 4.4.x.

3. Open a command prompt and run the following command to install all third-party dependencies:

    ```bash
    npm ci
    ```

4. Run the application:

    ```bash
    npm start  content-ee
    ```

    The application is available at `http://localhost:4200` and you must use the Alfresco Content Services credentials to log in.

    The configuration provided for the sample above is the minimal required for your development environment to locally test the Alfresco Repository, but additional environment variables are available.

    ```bash
    # App config settings
    APP_CONFIG_BPM_HOST="<url>"
    APP_CONFIG_ECM_HOST="<url>"
    APP_CONFIG_OAUTH2_HOST="<url>"
    APP_CONFIG_IDENTITY_HOST="<url>"
    APP_CONFIG_PROVIDER="ALL"
    APP_CONFIG_AUTH_TYPE="OAUTH"
    APP_CONFIG_OAUTH2_CLIENTID="alfresco"
    APP_CONFIG_OAUTH2_IMPLICIT_FLOW=true
    APP_CONFIG_OAUTH2_SILENT_LOGIN=true
    APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI="{protocol}//{hostname}{:port}/assets/silent-refresh.html"
    APP_CONFIG_OAUTH2_REDIRECT_LOGIN=/
    APP_CONFIG_OAUTH2_REDIRECT_LOGOUT=/
    APP_CONFIG_APPS_DEPLOYED="[{"name": "simpleapp"}]"
    APP_CONFIG_LANDING_PAGE="/personal-files"

    # CONTENT RELATED
    APP_CONFIG_PLUGIN_PROCESS_SERVICE=true
    APP_CONFIG_PLUGIN_AI_SERVICE=true
    APP_CONFIG_PLUGIN_AOS=true
    APP_CONFIG_PLUGIN_CONTENT_SERVICE=true
    APP_CONFIG_CUSTOM_MODELED_EXTENSION = "{}"

    # CONTENT - MICROSOFT PLUGIN RELATED
    APP_CONFIG_PLUGIN_MICROSOFT_ONLINE=true
    APP_CONFIG_MICROSOFT_ONLINE_OOI_URL="<url>"
    APP_CONFIG_MICROSOFT_ONLINE_CLIENTID="<clientid>"
    APP_CONFIG_MICROSOFT_ONLINE_AUTHORITY="<url>"
    APP_CONFIG_MICROSOFT_ONLINE_REDIRECT="<url>"

    # CONTENT - MICROSOFT INTEGRATION TEST RELATED
    MICROSOFT_USER_INITIALS="<user-initials>"
    MICROSOFT_EMAIL="<email>"
    MICROSOFT_USER2_INITIALS="<user-initials>"
    MICROSOFT_EMAIL2="<email>"
    MICROSOFT_PASSWORD="<password>"
    MOO_LOGIN_URL="<url>"
    ```

## Generate and deploy an ADF App {#deploy-adf}

You can develop a custom ADF application that adds features, behaviors, and customizations. Using the [Yeoman](https://yeoman.io/){:target="_blank"} scaffolding tool you can quickly create applications for testing in your development environment. The [Yeoman Generator for Alfresco ADF Applications](https://github.com/Alfresco/generator-alfresco-adf-app){:target="_blank"} is available for free as an open source project on GitHub.

Below are the available tutorials on the most common and requested tasks about developing ADF based applications. To build, debug, test, or troubleshoot the Alfresco Digital Workspace and ADF-based applications see [Manage Digital Workspace]({% link digital-workspace/latest/develop/manage.md %}).

### Prerequisites {#prereqs-adf}

* Deploy ACS Enterprise Edition and make sure it's accessible from your browser:

    ```bash
    http://localhost:8080/alfresco
    ```

* `Node.js` 18.x

> **Note:** All Angular development is done using the Typescript language.

### Generate the app

1. To ensure you have Yeoman installed, open a command prompt and enter:

    ```bash
    yo --version
    ```

    If this is not already installed, run:

    ```shell
    npm install -g yo
    ```

   > **Note:** If you're on Linux or MacOS, you might need to run the following commands using `sudo`.

2. Install the latest version of the Alfresco Yeoman Generator ADF App:

    ```shell
    npm install -g generator-alfresco-adf-app@latest
    ```

3. Install the Angular CLI:

    ```shell
    npm install -g @angular/cli
    ```

    Angular CLI makes it easy to create components, libraries, and more. You can check what version of the installed version Angular CLI you have installed by using the `ng v` command in the terminal.

4. Generate the application:

    ```shell
    yo alfresco-adf-app
    ```

5. Enter a name and choose **Content Services** as the application blueprint and then enter `Y` to install the dependencies.

    The Yeoman generator creates a new project and installs all dependencies required for your application.

    > **Note:** The Yeoman generator creates a new directory for your project. You must work within this directory.

6. To configure the application to work with Content Services, open the `proxy.conf.js` file in a code editor.

7. Modify `"target": "http://localhost:8080"` so that it matches your Content Services URL and then save the file.

    You don't need `/alfresco` at the end of the target URL. For example, if you've launched Alfresco Content Services using Docker Compose, your Alfresco Content Services repository might be available at `http://localhost:8080/alfresco`. In this case, your `proxy.conf.json` file might look like:

    ```json
    module.exports = {
        "/alfresco": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true
        }
    };
    ```

    > **Note:** If you're running an online trial, the Content Services URL is provided in the welcome email.

    For the online trial, the `proxy.conf.json` file might look like:

    ```json
    module.exports = {
        "/alfresco": {
        "target": "https://xyz.trials.alfresco.com",
        "secure": false,
        "changeOrigin": true
        }
    };
   ```

### Start the app

1. Start the application:

    ```bash
    npm start
    ```

    A browser window will automatically open up at `http://localhost:4200`.

2. Click the key icon in the side navigation to log in.

    > **Note:** If you're running an online trial, the Content Services login credentials are provided in the welcome email.

You can browse, upload, and preview documents in the repository with this application.

## Troubleshooting and support

Ask questions in the Application Development Framework section of the [Alfresco Forum](https://hub.alfresco.com/t5/application-development/ct-p/developing){:target="_blank"} or in the Alfresco [Gitter Discussions](https://gitter.im/Alfresco/alfresco-ng2-components){:target="_blank"}.

If you're an Alfresco customer or partner, you can also request support in [Hyland Community](https://community.hyland.com/tskb){:target="_blank"}.
