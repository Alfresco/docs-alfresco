---
title: Introducing ADW
---

The Alfresco Digital Workspace (ADW) is the general-purpose application developed and provided by Alfresco to all the customers and partners. ADW is supported and enhanced through regular releases and utilizes content and content-centric process use cases.

You may consider adopting ADW if you are implementing use cases closed to a generic usage and needs. In this section, you will learn how to run ADW locally and manage it from a development perspective. Below you can find the available tutorials on the most common and requested tasks.

## How to run ADW from the source code

In this tutorial, you are going to learn how to launch Alfresco Digital Workspace (ADW) on your development environment, start from the source code, and gain your first experience with ADW development principles.

Check you have the [required prerequisites](https://docs.alfresco.com/digital-workspace/latest/develop/developedapp).

## Cloning and launching the front-end application

Once the environment is properly configured, the next step is to have available the source code of the project, locally into your development environment. If you are an Alfresco customer or partner, you can get a local copy of the project by opening a request in the [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin).

Once done, enter the `alfresco-digital-workspace` folder and create a file named `.env` with the following content (put the ACS URL as value).

```text
AUTH_TYPE="BASIC"
PROVIDER="ECM"
API_CONTENT_HOST="https://..."
API_PROCESS_HOST="https://..."
OAUTH_HOST="https://.../auth/realms/alfresco"
E2E_HOST="http://localhost:4200"
ADMIN_EMAIL="..."
ADMIN_PASSWORD="..."
ADF_PATH="../alfresco-ng2-components"
ACA_BRANCH="develop"
MAXINSTANCES=3
```

Run `npm install` and then `npm start content-ee` to get the application up and running. The application will be available at the URL `http://localhost:4200` and the credentials are the ones required by ACS.

Congratulations! You now have the Alfresco Digital Workspace running in development mode into your development environment.

### Troubleshooting and support
If you have any issue, there is an entire community available to help you.

In the case of problems, search and then post a question in the [Alfresco Forum](https://hub.alfresco.com/) (Application Development Framework section) or connect with the developers into the [Alfresco Gitter channel](https://alfresco.atlassian.net/wiki/spaces/PM/overview). Being an Alfresco customer or partner you can also raise a request for support into the Alfresco Support Portal.

### Conclusion
In this tutorial, you learned how to launch Alfresco Digital Workspace (ADW) on your development environment, use the source code, and implemented ADW development principles.

## How to debug, test, build and promote ADW (and ADF-based applications)

In this tutorial, you are going to learn how to debug, test, build and promote the Alfresco Digital Workspace (aka ADW). Being an application built using the Alfresco Development Framework (ADF), what is described here for ADW is mostly valid also for any other ADF-based application. Differences and common commands will be described as part of this tutorial.

Being a standard Angular application, the lifecycle and the tasks described for ADW are following the same principles, tooling and best practices of any other standard Angular application. We are not going to detail here what is widely described for Angular based applications (for example for what concern the debugging) but we are going to point on third party content and best practices.

<!-- Debug navigation link menu -->
* [Installing](#Sec2Installing)
  * [Applications and distributions](#Sec2Applications)
  * [Starting](#Sec2Starting)
  * [Testing](#Sec2Testing)
  * [Debugging](#Sec2Debugging)
  * [Building](#Sec2Building)
  * [Building without one or more extensions](#Sec2Building2)
  * [Promoting in a different environment](#Sec2Promoting)
* [Conclusions](#Sec2Conclusions)

## Installing <a id='Sec2Installing'></a>
The command to be used is the same of any Angular application

`npm install`

### Applications and distributions <a id='Sec2Applications'></a>
As part of the ADW distribution there are three different distributions to be run:

* `content-ce` (Open Source Alfresco Content Application)

* `content-ee` (Alfresco Digital Workspace with Alfresco Process Services extension)

* `content-ee-cloud` (Alfresco Digital Workspace with Alfresco Process Automation extension)

The default distribution for ADW is set as `content-ee`.

For the Alfresco Content Application (ACA) or any other ADF-based application, there is always one distribution and no need to specify it at build level.

### Starting <a id='Sec2Starting'></a>
The following command is valid for ADW.

`npm start <content-ce|content-ee|content-ee-cloud> [prod]`

For ACA or any other ADF-based application the command is `npm start`.

### Testing <a id='Sec2Testing'></a>
The following command is valid for ADW.

`npm run build <content-ce|content-ee|content-ee-cloud> [prod]`
For ACA or any other ADF-based application the command is `npm run build`.

Unit tests on ACA and ADW are developed and executed using [Karma](https://karma-runner.github.io/). If you want to learn more about the available unit tests, and develop one (or some), check directly in the source code for an example.

Unit tests are developed in files with extension `specs.ts`. Almost every component has a related `specs.ts` file stored directly in the same folder as the component. A unit test looks like the following piece of source code.

```java
it('...description...', () => {
    // Source code.
});
```

Refer to the [Karma](https://karma-runner.github.io/) documentation and tutorials for further details on how to develop tests.

### Debugging <a id='Sec2Debugging'></a>
The debugging strategy for ADW, ACA, or any other ADF-based application does not differ from recommended standard Angular applications. Refer to the dedicated content or documentation for further details.

### Building <a id='Sec2Building'></a>
The following command is valid for ADW.

`npm run build <content-ce|content-ee|content-ee-cloud> [prod]`

For ACA or any other ADF-based application the command is `npm run build`.

Once the build succeeds, a new folder named `dist` is created inside the project root. Inside the `dist` folder, is a collection of files representing the distribution of your application.

### Building without one or more extensions <a id='Sec2Building2'></a>
To exclude any of the bundled extensions from the distribution, remove the imported module representing the extension from the imports.

In case of ADW, update the `apps/content-ee/src/app/extensions.module.ts` file and remove one or more modules from the imports, as shown below.

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

### Promoting in a different environment <a id='Sec2Promoting'></a>
Once built, the compiled ADF-based application is available as a collection of files directly in the `dist` folder. The promotion of the distribution of the application in a different environment can be done by copying the files in the target server.

Also in this case, nothing differs from a standard Angular application, and the same tips and best practices can be followed.

## Conclusions <a id='Sec2Conclusions'></a>
In this content, you learned the most common and basic tasks for ADW and any ADF-based application.
