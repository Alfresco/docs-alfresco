---
title: Introducing the Alfresco Digital Workspace
---

The Alfresco Digital Workspace is the general-purpose application developed and provided by Alfresco to all the customers and partners. The Alfresco Digital Workspace is supported and enhanced through regular releases and utilizes content and content-centric process use cases.

You may consider adopting the Alfresco Digital Workspace if you are implementing use cases closed to a generic usage and needs. In this section, you will learn how to run the Alfresco Digital Workspace locally and manage it from a development perspective. Below you can find the available tutorials on the most common and requested tasks.

## Run the Alfresco Digital Workspace from the source code

Learn how to launch the Alfresco Digital Workspace on your development environment, start from the source code, and gain your experience with the Alfresco Digital Workspace development principles.
<!-- Should this link point to index or developadfapp? -->
Check you have the [required prerequisites](https://docs.alfresco.com/digital-workspace/latest/develop/developadfapp).

## Cloning and launching the front-end application

Once the environment is properly configured, the next step is to have the source code of the project available locally in the development environment. If you are an Alfresco customer or partner, you can get a local copy of the project by opening a request in the [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin).

<!-- Do we want the rest of this section as a procedural list?-->
In the `alfresco-apps` folder, create a file named `.env` with the following content (put the Alfresco Content Services URL as value).

```
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

Run `npm ci` and then `npm start content-ee` to get the application up and running. The application will be available at the URL `http://localhost:4200` and the credentials are the ones required by Alfresco Content Services.

The Alfresco Digital Workspace should be running in development mode in the development environment.

## How to build, promote, test, and debug the Alfresco Digital Workspace

In this tutorial, you are going to learn how to build, promote, test, and debug the Alfresco Digital Workspace. As an application built using the Alfresco Development Framework (ADF), the process for the Alfresco Digital Workspace is similar for other ADF-based application. Differences and common commands will be described as part of this tutorial.

Being a standard Angular application, the lifecycle and the tasks described for the Alfresco Digital Workspace are following the same principles, tooling, and best practices of any other standard Angular application.

### Installing

In command line, enter `npm install`, as with any Angular application.

### Applications and distributions

As part of the the Alfresco Digital Workspace distribution there are different distributions to be run:

* `content-ee` (Alfresco Digital Workspace with Alfresco Process Services extension)

* `content-ee-apa` (Alfresco Digital Workspace with Alfresco Process Automation extension)

The default distribution for the Alfresco Digital Workspace is set as `content-ee`.

For any ADF-based application, such as the Alfresco Content Application, there is always one distribution and no need to specify it at build level.

### Starting

The following command is valid for the Alfresco Digital Workspace.

`npm start <content-ee|content-ee-apa> [prod]`

For the Alfresco Content Application or any other ADF-based application the command is `npm start`.

### Building

The following command is valid for the Alfresco Digital Workspace.

`npm run build <content-ee|content-apa> [prod]`

For the Alfresco Content Application or any other ADF-based application the command is `npm run build`.

Once the build succeeds, a new folder named `dist` is created inside the project root. Inside the `dist` folder, is a collection of files representing the distribution of your application.

### Building without one or more extensions

To exclude any of the bundled extensions from the distribution, remove the imported module representing the extension from the imports.

In case of the Alfresco Digital Workspace, update the `apps/content-ee/src/app/extensions.module.ts` file and remove one or more modules from the imports, as shown below.

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

Once built, the compiled ADF-based application is available as a collection of files directly in the `dist` folder. The promotion of the distribution of the application in a different environment can be done by copying the files in the target server.

Nothing differs from a standard Angular application, and the same tips and best practices can be followed.

### Testing

Unit tests on the Alfresco Content Application and the Alfresco Digital Workspace are developed and executed using Karma. For information on configuring your system to use Karma, see the **Index** page on the Karma site or their GitHub project. Check the source code or refer to the Karma documentation and tutorials for further details on how to develop tests.

Build the Alfresco Digital Workspace using the command:

`npm run build <content-ee|content-apa> [prod]`

For ADF-based applications, such as the Alfresco Content Application, the command is `npm run build`.

Unit tests are developed in files with extension `specs.ts`. Almost every component has a related `specs.ts` file stored directly in the same folder as the component. A unit test looks like the following piece of source code.

```java
it('...description...', () => {
    // Source code.
});
```

### Debugging

The debugging strategy for the Alfresco Digital Workspace, or any other ADF-based application, does not differ from recommended standard Angular applications. Refer to the dedicated content or documentation for further details.

### Troubleshooting and support

Search and post questions in the [Alfresco Forum (Application Development Framework section)](https://hub.alfresco.com/t5/application-development/ct-p/developing) or connect with the developers into the connect with the developers in Gitter Discussions available in the [Alfresco Builder Network](https://www.alfresco.com/abn/adf/). Being an Alfresco customer or partner you can also request support into the [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin).
