---
title: Manage Digital Workspace
---

Learn how to run the Digital Workspace in your local development environment from the source code and manage it from a developer perspective.

## Prerequisites and requirements

* Alfresco Content Services - Enterprise Edition:
  * Open your browser and check everything starts up correctly:

    ```bash
    http://localhost:8080/alfresco
    ```

* `Node.js` 18.x

## Clone and launch the front-end application

Once Content Services is up and running, you must make the source code of the project available locally in your development environment. If you're an Alfresco customer or partner, you can get a local copy of the project by opening a request in [Hyland Community](https://community.hyland.com/tskb){:target="_blank"}.

1. In the `alfresco-apps` directory, create a file named `.env` with the following content.

    Enter the Content Services URL as the `APP_CONFIG_ECM_HOST` value.

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

    > **Note:** The Digital Workspace 4.4.x uses the Content Application version 4.4.x.

2. Run the following commands to start the application:

    ```bash
    npm ci
    npm start content-ee
    ```

    The application is available at `http://localhost:4200`. Use the Content Services credentials to log in.

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

## Build, promote, test

The Digital Workspace is a standard Angular application, and its lifecycle follows the same principles and best practices of any other standard Angular application. Use this information to learn how to install it using different distributions, how to add or remove unwanted modules, how to promote the application for use in different environments, and how to test it.

1. In a command prompt, enter:

    ```bash
    npm install
    ```

    There are two distributions available to run with the Digital Workspace:

    | Distribution | Description |
    | ------------ | ----------- |
    | `content-ee` | *Default.* The Digital Workspace with the Process Services extension |

2. Select the command to start the application:

    ```bash
    npm start <content-ee> [prod]
    ```

    > **Note:** For the Alfresco Content Application or any other ADF-based application, the command is `npm start`.

3. Select the command to build the application:

    ```bash
    npm run build <content-ee|content-apa> [prod]
    ```

    > **Note:** For the Alfresco Content Application or any other ADF-based application, the command is `npm run build`.

    Once the build has finished a new folder called `dist` is created inside the root directory of the project. Inside the `dist` directory there is a collection of files that represent the distribution of your application.

## Remove modules before building

To remove any modules from the distribution, access the `apps/content-ee/src/app/extensions.module.ts` file and remove the ones that are not needed.

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

## Promote to a different environment

The compiled application is available as a collection of files in the `dist` directory. If you want to use the application in a different environment all you need to do is copy the files over to your new server.

## Testing

Unit tests on the Content Application or the Digital Workspace are developed and executed using Karma - for more see [Karma](https://karma-runner.github.io/latest/index.html){:target="_blank"}.

Unit tests are developed in files with extension `specs.ts`. Almost every component has a related `specs.ts` file stored directly in the same folder as the component. A unit test can look like:

```java
it('...description...', () => {
    // Source code.
});
```

## Troubleshooting and support

Ask questions in the Application Development Framework section of the [Alfresco Forum](https://hub.alfresco.com/t5/application-development/ct-p/developing){:target="_blank"} or in the Alfresco [Gitter Discussions](https://gitter.im/Alfresco/alfresco-ng2-components){:target="_blank"}.

If you're an Alfresco customer or partner, you can also request support in [Hyland Community](https://community.hyland.com/tskb){:target="_blank"}.
