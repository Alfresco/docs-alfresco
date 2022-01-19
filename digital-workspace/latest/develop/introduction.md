---
title: Introducing ADW
---

The Alfresco Digital Workspace (alias ADW) is the general-purpose application developed and provided by Alfresco to all the customers and partners. ADW is supported and enhanced through regular releases and it supports content use cases as well as content-centric process use cases.

You may consider adopting ADW if you are facing use cases closed to a generic usage and needs. In this section you will learn how to run it locally and manage it from a development perspective.

In this section you will learn how to create and manage ADW from a development perspective and below you can find the available tutorials on the most common and requested tasks.

## How to run ADW from the source code

In this tutorial you are going to learn how to launch Alfresco Digital Workspace (alias ADW) on your development environment, starting from the source code, with the purpose to have a first experience with the development principles.

Check you have the required prerequisites, for more see <Link to pre reqs section>.

## Cloning and launching the front-end application

Once the environment is properly configured, the next step is to have available the source code of the project, locally into your development environment. If you are an Alfresco customer or partner, you can get a local copy of the project by raising a request into the Alfresco Support Portal.

Once done, enter the alfresco-digital-workspace folder and create a file named .env with the following content (put the ACS URL as value).

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

Run npm install and then npm start content-ee to get the application up and running. The application will be available at the URL http://localhost:4200 and the credentials are the ones required by ACS.

Congratulations! You now have the Alfresco Digital Workspace running in development mode into your development environment.

Troubleshooting and support
If you have any issue, don’t worry! There is an entire community available to help you.

In case of problems raise a question into the Alfresco Forum (Application Development Framework section) or connect with the developers into the Alfresco Gitter channel. Being an Alfresco customer or partner you can also raise a request for support into the Alfresco Support Portal.

Conclusion
In this tutorial you learned how to launch Alfresco Digital Workspace (alias ADW) on your development environment, starting from the source code, with the purpose to have a first experience with the development principles.

## How to debug, test, build and promote ADW (and ADF-based applications)

In this tutorial you are going to learn how to debug, test, build and promote the Alfresco Digital Workspace (aka ADW). Being an application built using the Alfresco Development Framework (aka ADF), what is described here for ADW is mostly valid also for any other ADF-based application. Differences and common commands will be described as part of this tutorial.

Being a standard Angular application, the lifecycle and the tasks described for ADW are following the same principles, tooling and best practices of any other standard Angular application. We are not going to detail here what is widely described for Angular based applications (for example for what concern the debugging) but we are going to point on third party content and best practices.

Installing
Applications and distributions
Starting
Testing
Debugging
Building
Building without one or more extensions
Promoting in a different environment
Conclusions
Installing
The command to be used is the same of any Angular application

npm install
Applications and distributions
As part of the ADW distribution there are three different distributions to be run:

content-ce (Open Source Alfresco Content Application)

content-ee (Alfresco Digital Workspace with Alfresco Process Services extension)

content-ee-cloud (Alfresco Digital Workspace with Alfresco Process Automation extension)

The default distribution for ADW is set to be content-ee.

For the Alfresco Content Application (aka ACA) or any other ADF-based application, the is always one distribution and no need to specify it at build level.

Starting
The following command is valid for ADW.

npm start <content-ce|content-ee|content-ee-cloud> [prod]
For ACA or any other ADF-based application the command is simply npm start.

Testing
The following command is valid for ADW.

npm run build <content-ce|content-ee|content-ee-cloud> [prod]
For ACA or any other ADF-based application the command is simply npm run build.

Unit tests on ACA and ADW are developed and executed using Karma. If you want to learn more about the available unit tests and maybe develop one (or some), you can check directly in the source code as an example.

Unit tests are developed in files with extension specs.ts. Almost every component has a relatedspecs.ts file stored directly in the same folder where the component lives. A unit test lloks like the following piece of source code.

it('...descrioption...', () => {
    // Source code.
});
You can refer to the  Karma documentation and tutorials for further details on how to develop your own tests.

Debugging
The debugging strategy for ADW, ACA or any other ADF-based application does not differ from what is recommended for any standard Angular application. Please refer to the dedicated content or documentation for further details.

Building
The following command is valid for ADW.

npm run build <content-ce|content-ee|content-ee-cloud> [prod]
For ACA or any other ADF-based application the command is simply npm run build.

Once the build succeeds, a new folder named dist is created inside the project root. Inside of it, you will find a collection of files representing the distribution of your application.

Building without one or more extensions
To exclude any of the bundled extensions from the distribution, you simply need to remove the imported module representing the extension, from the imports.

In case of ADW, update the apps/content-ee/src/app/extensions.module.ts file and remove one or more modules from the imports, as shown below.

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

Promoting in a different environment
Once built, the compiled ADF-based application is available as a collection of files directly in the dist folder. The promotion of the distribution of the application in a different environment can be done simply by copying the files in the target server.

Also in this case, nothing differs from a standard Angular application and the same tips and best practices can be followed.

Conclusions
In this content you learned the most common and basic tasks for ADW and any ADF-based application.
