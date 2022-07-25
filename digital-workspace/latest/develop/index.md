---
title: Develop Digital Workspace
---

You can develop with and adapt the Digital Workspace or integrate your own solutions. To do this you can use the [Digital Workspace extensions]({% link digital-workspace/latest/develop/extension-mechanism.md %}) or create a custom app using the [Application Development Framework]({% link digital-workspace/latest/develop/developadfapp.md %}). The Digital Workspace is a fully supported application that is available to customers and partners working with **Alfresco Content Services - Enterprise Edition**. If your project uses **Alfresco Content Services - Community Edition** or other open source components you must use [Alfresco Content Application](https://alfresco-content-app.netlify.app/#/) instead of the Digital Workspace. The Content Application is a free, open source example of an application created using the Application Development Framework, and its use is not supported by Alfresco support.

![Develop front-end]({% link digital-workspace/images/develop-front-end.png %})

## Front-end experience

Front-end applications are a subset of client interactions, and Alfresco provides an Angular-based Application Development Framework for creating them.The backend services provided by Alfresco products use a REST API foundation layer for all client interactions of the platform.

### Front-end applications

The Application Development Framework is an Open Source project that defines a set of services and visual components that you can use to create bespoke end-user applications. The framework is not an end-user application itself, but it enables you to create your own applications.

The image explains the relationship between the front-end applications and backend Alfresco services, i.e. the Digital Workspace, the Content Application, and the Application Development Framework.

![Development options]({% link digital-workspace/images/develop-arch.png %})

### Options

A hybrid option exists using both the Application Development Framework and custom components and services. Alternatively, you can use the Digital Workspace and modify it through custom extensions and integrations.

### Mobile development

Native mobile frameworks and applications are provided by Alfresco and you can access the Mobile Workspace code at the following github repositories, for [Android](https://github.com/alfresco/alfresco-mobile-workspace-android) or [iOS](https://github.com/alfresco/alfresco-mobile-workspace-ios).

## Build a Front-end application

Use the following example to launch a fully-featured front-end application. It allows you to gain insight into how to create front-end applications that work on top of the Alfresco backend services.
The example uses the open source version of the front-end application. You can repeat the same exercise with the Enterprise version.

### Prerequisites and requirements

To develop an Alfresco front-end application, make sure the required software is available on your system:

* Alfresco Content Services - Community Edition.
  * Open your browser and check everything starts up correctly:

  ```bash
  Alfresco: http://localhost:8080/alfresco
  ```

* The latest **LTS** version of `Node.js`.

### Cloning and launching the front-end application

Once the environment is properly configured, open a terminal and clone the following GitHub repository to a working folder.

`git clone https://github.com/Alfresco/alfresco-content-app.git`

Navigate to the `alfresco-content-app` folder and create a file named `.env` with the following content:

> **Note** Enter the Alfresco Content Services URL as the `APP_CONFIG_ECM_HOST` value.

```bash
APP_CONFIG_ECM_HOST="http://localhost:8080"
APP_CONFIG_PLUGIN_AOS=false
APP_CONFIG_PLUGIN_CONTENT_SERVICE=true
```

Run `npm install` and then `npm start` to get the application up and running. The application is available at `http://localhost:4200` and you must use the Alfresco Content Services credentials.

The Alfresco Content App should be running in development mode in your development environment.

## Enterprise stack development

If you are an Alfresco customer or official partner, you can use the Enterprise stack instead of the open source software. To develop an Alfresco front-end application, make sure the required software is available on your system:

* Alfresco Content Services - Enterprise Edition.
  * Open your browser and check everything starts up correctly:

  ```bash
  Alfresco: http://localhost:8080/alfresco
  ```

* Use the `alfresco-apps` GitHub repository.

  **Note:** Request a local copy of the project in the Alfresco Support Portal.

* Use the following `.env` file.

```bash
ACA_BRANCH="2.10.0"
BASE_URL="http://localhost:8080"
APP_CONFIG_ECM_HOST="http://localhost:8080"
APP_CONFIG_PROVIDER="ECM"
APP_CONFIG_AUTH_TYPE="BASIC"
APP_CONFIG_PLUGIN_AOS=false
APP_CONFIG_PLUGIN_CONTENT_SERVICE=true
APP_CONFIG_PLUGIN_PROCESS_SERVICE=false
APP_CONFIG_PLUGIN_AI_SERVICE=false
```

> **Note:** The Digital Workspace 2.9.x uses the Content Application version 2.10.0. Ensure you check the Digital Workspace documentation that matches your version because the Content Application version could be different.

* Run `npm ci` and then run the application using `npm start content-ee`. The application is available at `http://localhost:4200` and you must use the Alfresco Content Services credentials to log in.

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
ACA_BRANCH="develop"
APP_CONFIG_PLUGIN_PROCESS_SERVICE=true
APP_CONFIG_PLUGIN_AI_SERVICE=true
APP_CONFIG_PLUGIN_AOS=true
APP_CONFIG_PLUGIN_CONTENT_SERVICE=true
APP_CONFIG_CUSTOM_MODELED_EXTENSION = "{}"

# CONTENT - MICROSOT PLUGIN RELATED
APP_CONFIG_PLUGIN_MICROSOFT_ONLINE=true
APP_CONFIG_MICROSOFT_ONLINE_OOI_URL="<url>"
APP_CONFIG_MICROSOFT_ONLINE_CLIENTID="<clientid>"
APP_CONFIG_MICROSOFT_ONLINE_AUTHORITY="<url>"
APP_CONFIG_MICROSOFT_ONLINE_REDIRECT="<url>"

# CONTENT - MICROSOT INTEGRATION TEST RELATED
MICROSOFT_USER_INITIALS="<user-initials>"
MICROSOFT_EMAIL="<email>"
MICROSOFT_USER2_INITIALS="<user-initials>"
MICROSOFT_EMAIL2="<email>"
MICROSOFT_PASSWORD="<password>"
MOO_LOGIN_URL="<url>"
```

### Troubleshooting and support

Ask questions in the Application Development Framework section of the [Alfresco Forum](https://hub.alfresco.com/t5/application-development/ct-p/developing){:target="_blank"} or in the Alfresco [Gitter Discussions](https://gitter.im/Alfresco/alfresco-ng2-components){:target="_blank"}. If you are an Alfresco customer or partner you can also request support in the [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin){:target="_blank"}.
