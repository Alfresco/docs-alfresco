---
title: Manage the Digital Workspace
---

Learn how to run the Alfresco Digital Workspace locally and manage it from a development perspective.

## Run the Digital Workspace from the source code

To launch the Digital Workspace on your development environment you can start it from the source code.

### Prerequisites and requirements

* Alfresco Content Services - Enterprise Edition.
  * Open your browser and check everything starts up correctly:

  ```bash
  Alfresco: http://localhost:8080/alfresco
  ```

* The latest **LTS** version of `Node.js`.

## Cloning and launching the front-end application

Once Content Services is up and running you must make the source code of the project available locally in the development environment. If you are an Alfresco customer or partner, you can get a local copy of the project by opening a request in the [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin){:target="_blank"}.

In the `alfresco-apps` folder, create a file named `.env` with the following content.

> **Note** Enter the Alfresco Content Services URL as the `APP_CONFIG_ECM_HOST` value.

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

### Build, promote, test, and debug the Alfresco Digital Workspace

The Digital workspace is a standard Angular application and its lifecycle follows the same principles, and best practices of any other standard Angular application.

### Installing

In the command line, enter `npm install`.

### Applications and distributions

There are different distributions available to run with the Digital Workspace:

* `content-ee` (The Digital Workspace with the Process Services extension)

* `content-ee-apa` (The Digital Workspace with the Process Automation extension)

The default distribution for the Alfresco Digital Workspace is set to `content-ee`.

### Starting

In the command line, enter `npm start <content-ee|content-ee-apa> [prod]`.

> **Note:** For the Alfresco Content Application or any other ADF-based application the command is `npm start`.

### Building

In the command line, enter `npm run build <content-ee|content-apa> [prod]`.

> **Note:** For the Alfresco Content Application or any other ADF-based application the command is `npm run build`.

Once the build has finished, a new folder called `dist` is created inside the root folder of the project. Inside the `dist` folder, there is a collection of files that represent the distribution of your application.

### Remove modules before building

You can exclude unwanted modules from the distribution. For example, to remove any modules from the Digital Workspace access the `apps/content-ee/src/app/extensions.module.ts` file and remove any that are not needed.

```java
@NgModule({
    imports: [
        AosExtensionModule,
        AcaAboutModule,
        AcaSettingsModule,
        AiViewModule,
        RecordModule,
        ProcessServicesExtensionModule,
        ContentServicesExtensionModule,
        ExtensionsOrderExtensionModule,
    ],
})
export class AppExtensionsModule {}
```

### Promoting in a different environment

The compiled application is available as a collection of files in the `dist` folder. If you want to use the application in a different environment all you need to do is copy the files over to your new server.

### Testing

Unit tests on the Content Application or the Digital Workspace are developed and executed using Karma, for more see [Karma](https://karma-runner.github.io/latest/index.html){:target="_blank"}.

Unit tests are developed in files with extension `specs.ts`. Almost every component has a related `specs.ts` file stored directly in the same folder as the component. A unit test can look like:

```java
it('...description...', () => {
    // Source code.
});
```

### Debugging

The debugging strategy for the Digital Workspace, or any other ADF-based application, does not differ from recommended standard Angular applications.

### Troubleshooting and support

Ask questions in the Application Development Framework section of the [Alfresco Forum](https://hub.alfresco.com/t5/application-development/ct-p/developing){:target="_blank"} or in the Alfresco [Gitter Discussions](https://gitter.im/Alfresco/alfresco-ng2-components){:target="_blank"}. If you are an Alfresco customer or partner you can also request support in the [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin){:target="_blank"}.
