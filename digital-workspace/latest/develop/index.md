---
title: Develop Digital Workspace
---

The Alfresco Digital Workspace is the general-purpose application developed and provided by Alfresco to all the customers and partners. The Alfresco Digital Workspace is supported and enhanced through regular releases and utilizes content and content-centric process use cases.

### Best Practices

The suggested approach in designing an Alfresco front-end application is to consider the ready-to-be-used applications as the first choice. You may consider adopting the Alfresco Digital Workspace if you are implementing generic usage and needs. Use the Application Development Framework Extensions or customizations to adjust or integrate solutions.

For projects adopting Community Editions or Open Source components, consider Alfresco Content Application as an alternative to Alfresco Digital Workspace. Alfresco Content Application is defined as an example of content application, and it is not officially supported by Alfresco (but contributions to the project are welcome).

In the picture below, you can see drawn the decision process described above.

![Develop front-end]({% link digital-workspace/images/develop-front-end.png %})

## Front-end developer experience

The backend services provided by Alfresco products use a REST API foundation layer for all client interactions on the platform. Front-end applications are a subset of client interactions, and Alfresco provides an Angular-based Application Development Framework for creating them.

### Front-end applications

The Application Development Framework is an Open Source project that defines a set of services and visual components that developers can use to create bespoke end-user applications. The framework is not an end-user application itself, but it enables developers to create their own applications.

Alfresco provides the end-user application created using the Application Development Framework:

* [Digital Workspace](https://www.alfresco.com/ecm-software/alfresco-digital-workspace) is a fully supported application available to customers and partners working with Enterprise editions of Alfresco products and services.
* [Content Application](https://alfresco-content-app.netlify.app/#/) is a free, open source example of an application created using the Application Development Framework.

The following image explains the relationship between the front-end applications and backend Alfresco services: Digital Workspace (DW), Content Application (ACA) and Application Development Framework (ADF).

![Development options]({% link digital-workspace/images/develop-arch.png %})

### Options

A hybrid option exists using both the Application Development Framework and custom components and services. Alternatively, a developer can use the Digital Workspace and modify it through custom extensions and integrations.

### Mobile development

Native mobile frameworks and applications are provided by Alfresco as standard. Find the Mobile Workspace code at the following github repositories for [Android](https://github.com/alfresco/alfresco-mobile-workspace-android) or [iOS](https://github.com/alfresco/alfresco-mobile-workspace-ios).

## Build a Front-end application

Launch a fully-featured, front-end application on a development environment. Use the source code, with the purpose to gain experience with development principles and  best practices suggested to create front-end applications working on top of the Alfresco backend services.

The stack chosen for this initial task is the Open Source version of the front-end application. In the bonus section, repeat the same exercise with the Enterprise version (available for Alfresco customers and partners only).

### Prerequisites and requirements

To develop an Alfresco front-end application, make sure the required software is available on your system:

* Alfresco Content Services Community edition.
  * Open your browser and check everything starts up correctly:

  ```bash
  Alfresco: http://localhost:8080/alfresco
  ```

* The latest **LTS** version of Node.js available on their site Home or Downloads section.

### Cloning and launching the front-end application

Once the environment is properly configured, open a terminal and clone the following GitHub repository in a working folder.

`git clone https://github.com/Alfresco/alfresco-content-app.git`

Once done, enter the `alfresco-content-app` folder and create a file named `.env` with the following content (put the Alfresco Content Services URL as value).

```bash
APP_CONFIG_ECM_HOST="http://localhost:8080"
APP_CONFIG_PLUGIN_AOS=false
APP_CONFIG_PLUGIN_CONTENT_SERVICE=true
```

Run `npm install` and then `npm start` to get the application up and running. The application will be available at the URL `http://localhost:4200` and the credentials are the ones required by Alfresco Content Services.

The Alfresco Content App should be running in development mode in your development environment.

## Bonus section: Enterprise stack development

If you are an Alfresco Customer or an Official Partner, you can use the Enterprise stack instead of the Open Source introduced above. Required steps are:

* Use Alfresco Content Services Enterprise Edition instead of the Community Edition.
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

Note that ADW 2.8.0 is using ACA 2.10.0, but you may use a different one depending on the ADW version.

ADW   | ACA
2.0.0 | 2.2.0
2.1.0 | 2.3.0
2.2.0 | 2.4.0
2.3.0 | 2.5.0
2.4.0 | 2.6.0
2.5.0 | 2.7.0
2.6.0 | 2.8.0
2.8.0 | 2.10.0

* Run `npm ci` and then run the application using `npm start content-ee`. The application will be available at the URL `http://localhost:4200` and the credentials are the ones required by Alfresco Content Services.

The environment configuration provided for the sample above is the minimal required to test locally Alfresco Repository, but additional environment variables are available.

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

## Troubleshooting and support

Ask questions in the Application Development Framework section of the [Alfresco Forum](https://hub.alfresco.com/t5/application-development/ct-p/developing) or in the Alfresco [Gitter Discussions](https://gitter.im/Alfresco/alfresco-ng2-components). Being an Alfresco customer or partner you can also request support in the [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin).

## Conclusion

In this tutorial you learned how to launch a fully-featured ADF-based application on your development environment, starting from the source code, with the purpose to have a first experience with the development principles and the best practices suggested to create front-end applications working on top of the Alfresco backend services. This is only the first success that you can do with the Alfresco technology. Continue to learn on how to develop front-end applications using Alfresco, in the following sections of the official documentation.
