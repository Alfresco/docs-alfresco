---
title: The ADF/ADW extension mechanism
---



The ADF extension mechanism is a powerful way to customize and ADF based application structured as required by the Nx Workspace dev tools for monorepos. The ADF extension mechanism is the suggested way to add, remove, change the behavior of an ADF based application. The ADF extension mechanism is fully applicable to ADW it is suggested to be used as best practice instead of direct changes to the source code of the application.

Customizations implemented through the ADF extension mechanism are more maintainable (modular and isolated from the core of the application) and allow an easier upgrade of the application.

You may consider adopting ADW and developing an extension if your use case is mainly covered by ADW, but some changes are required to meet the expectations and the requirements. In case of complex changes or relevant differences what would be required by ADW, a custom ADF based application can be considered as an alternative.

In this section you will learn how to create and manage an ADF/ADW extension from a development perspective and below you can find the available tutorials on the most common and requested tasks

## How to create your first extension for the Alfresco Digital Workspace (aka ADW)

The purpose of this tutorial is to describe how to develop a “hello word” extension for the Alfresco Digital Workspace (aka ADW). The ADW extension mechanism is the suggested way to customize the supported front-end application, and this tutorial is supposed to be the foundation for a content to share with customers and partners.

Check you have the required prerequisites, for more see <Link to pre reqs section>.

Creating the ADW extension
The creation of an ADW extension is straightforward following the Nx Workspace dev tools for monorepos.

From the root folder of the ADW project, use the following command to create a new extension called `my-extension`.

`nx g @nrwl/angular:lib my-extension`

You can have a look at the Nx Tutorial / Create Libs for further details about this angular command and feature. During the execution of the command above, you will be asked to choose some options. If it is your first time or you are not sure, feel free to leave the default values as an answer.

Once done, in the libs/my-extension path you will find the following structure:

src folder containing all the typescript source code. Very important is the index.ts file defining all the inclusions of the extension and the `lib/my-extension.module.ts` file defining the module class for the extension.

README.md file for documentation purposes as well as other files used for testing and configuration.

Developing the basics of the ADW extension
Now that the `my-extension` is created, let's add the proper configuration to the extension module. For this purpose, edit the `./libs/my-extension/src/lib/my-extension.module.ts` file changing what is described below.

// Add the following import to the page.

```text
import { provideExtensionConfig } from '@alfresco/adf-extensions';
```

// Add providers as described below.

```text
NgModule({
  imports: [CommonModule],
  providers: [
    provideExtensionConfig(['my-extension.json'])
  ]
})
export class MyExtensionModule {}
```

It's now time for the configuration of the brand new extension. For this purpose, you are going instruct the extension to add an item to the "new" button that you can see on the top left of the landing page of ADW.

To create the proper configuration, create the folder below in the described path.

libs/my-extension/assets
Once done, create the file libs/my-extension/assets/my-extension.json with the following content.

```java
{
  "$version": "1.0.0",
  "$id": "my.extension",
  "$name": "my adf extension",
  "$description": "my adf extension",
  "$license": "Apache-2.0",
  "actions": [],
  "features": {
    "create": [
      {
        "id": "my.extension.hello.world",
        "title": "BYE BYE WORLD! (Logout)",
        "order": 50,
        "actions": {
          "click": "LOGOUT"
        }
      }
    ]
  },
  "routes": [],
  "rules": []
}
```

This is a very basic example, adding a “bye bye world!” option to the existing “new” button, implementing the logout from the session of the ADW application. From here, you can enrich the capabilities of your extension following the documentation at https://alfresco-content-app.netlify.app/#/extending/.

Making the extension as part of the ADW application
Now that the ADW extension is developed in its initial version, let's check that the tsconfig.base.json file includes the link to the libs/my-extension/src/index.ts file as part of the paths item. Everything should be properly set up during the creation of the extension, but it worth a double-check if something went wrong.

Once done, let's add the extension module to the list of the ones used by the application. To complete the task, edit the apps/content-ee/src/app/extensions.module.ts file as described below.

// Add the following import to the page.

```text
import { MyExtensionModule } from '@alfresco-dbp/my-extension';

@NgModule({
    imports: [
        ...,
        MyExtensionModule,
    ],
})
export class AppExtensionsModule {}
```

Last but not least, let's instruct the configuration file for the extension to be visible from the ADW app through a public URL. To complete the task, edit the angular.json file as described below.

// Add to 'projects/content-ee/architect/build/options/assets' array.
...
{
  "input": "libs/my-extension/assets",
  "output": "/assets/plugins/",
  "glob": "my-extension.json"
},
...

## Running ADW with the extension included

Now that everything is properly developed, it’s time to launch ADW and see the result. To launch ADW, run the following command from a terminal.

```text
npm start content-ee
```

What you should see is a new item in “new” button on the top left of the landing page for ADW, implementing the logout from the current session. Below the screenshot describing what it should look like.

Conclusions
In this tutorial you learnt how to create your first ADW extension starting from the ADW source code stored in the GitHub repository. The purpose of this content is not to be exhaustive of all the possibilities provided by the ADW extension mechanism, but enable the developers in creating their own extensions as best practice for the customization of ADW.

## How to create your first extension for the Alfresco Content Application (aka ACS)

How to create your first extension for the Alfresco Content Application (aka ACA)
Created by Francesco Corti (Deactivated)
Last updated: Jan 11, 20214 min read6 people viewed6 people viewed
The purpose of this tutorial is to describe how to develop a “hello word” extension for the Alfresco Content Application (aka ACA). The ACA extension mechanism is the suggested way to customise the supported front-end application, and this tutorial is supposed to be the foundation for a content to share with customers and partners.

Prerequisites
Creating the ACA extension
Developing the basics of the ACA extension
Making the extension as part of the ACA application
Running ACA with the extension included
Conclusions
Prerequisites
The starting point for this tutorial is the availability of the full repository of the Alfresco Content Application (aka ACA) on your development environment (your laptop as an example). This tutorial has been written with the following versions of the software:

ACA version 2.2.0,

ACS 7.0.0-M3,

NodeJs version 14.15.2,

Chrome Version 87.0.4280.88.

Creating the ACA extension
As described here, the creation of an ADW extension is straightforward following the Nx Workspace dev tools for monorepos.

From the root folder of the ACA project, launch the command below from a terminal. As you can see, with the command below you are going to create a new extension named my-extension.

ng generate library my-extension
In case of errors, add the following line to the tsconfig.json file.
"compilerOptions": { "baseUrl": ".", "rootDir": "." }

Once done, in the projects/my-extension path you will find the following structure:

src folder containing all the typescript source code. Very important is the public-api.ts file defining all the inclusions of the extension and the lib/my-extension.module.ts file defining the module class for the extension.

README.md file for documentation purposes as well as other files used for testing and configuration.

To complete the creation, build the extension launching the following command.

ng build my-extension
Developing the basics of the ACA extension
Now that the my-extension is created, let's add the proper configuration to the extension module. For this purpose, edit the projects/my-extension/src/lib/my-extension.module.ts file changing what is described below.

// Add the import as described below.
import { ExtensionService } from '@alfresco/adf-extensions';

// Add the constructor as described below.
NgModule({...})
export class MyExtensionModule {
  constructor(extensions: ExtensionService) {
    extensions.setComponents({
        'my-extension.main.component': MyExtensionComponent,
    });
  }
}

It's now time for the configuration of the brand new extension. For this purpose, you are going instruct the extension to add a link that you can see on the left menu of the landing page of ACA.

To create the proper configuration, create the folder below in the described path.

projects/my-extension/assets
Once done, create the file projects/my-extension/assets/my-extension.json file with the following content.

```json
{
  "$schema": "../../../extension.schema.json",
  "$id": "my-extension",
  "$version": "1.0.0",
  "$vendor": "Your name or company name",
  "$name": "plugin1",
  "$description": "demo plugin",
  "$license": "MIT",

  "routes": [
    {
      "id": "my.extension.route",
      "path": "ext/my/route",
      "component": "my-extension.main.component"
    }
  ],

  "features": {
    "navbar": [
      {
        "id": "my.extension.nav",
        "items": [
          {
            "id": "my.extension.main",
            "icon": "extension",
            "title": "My Extension",
            "route": "my.extension.route"
          }
        ]
      }
    ]
  }
}
```

This is a very basic example, adding a “My Extension” item to the existing left menu, implementing a blank page containing “my-extension works!“ text appearing in the ACA landing page. From here, you can enrich the capabilities of your extension following the documentation at https://alfresco-content-app.netlify.app/#/extending/.

Making the extension as part of the ACA application
Now that the ACA extension is developed in its initial version, let's add the extension module to the list of the ones used by the application. To complete the task, edit the src/app/extensions.module.ts file as described below.

// Add the following import to the page.

```java
import { MyExtensionModule } from 'my-extension';

@NgModule({
    imports: [
        ...,
        MyExtensionModule
    ],
})
export class AppExtensionsModule {}
```

In addition, edit the `src/assets/app.extensions.json` file on the `$references` array.

```json
"$references": ["my-extension.json"],
Let's instruct the configuration file for the extension to be visible from the ACA app through a public URL. To complete the task, edit the angular.json file as described below.

// Add to 'src/app.config.json' array.
...
{
  "glob": "my-extension.json",
  "input": "projects/my-extension/assets",
  "output": "./assets/plugins"
},
...
Last but not least, edit the package.json file to allow the build of the extension, adding the following line to the scripts section.

{ ...
  "scripts": {
    ...,
    "build:my-extension": "ng build my-extension && cpr projects/my-extension/assets dist/my-extension/assets --deleteFirst"
  }, ...
}
```

Once done, create the build of the extension running the following command.

```text
npm install my-extension
```

Running ACA with the extension included
Now that everything is properly developed, it’s time to launch ADW and see the result. To launch ADW, run the following command from a terminal.

```text
npm start
```

What you should see is a new item in left menu of the landing page for ACA, implementing the route to a new page with the following content. Below the screenshot describing what it should look like.

Conclusions
In this tutorial you learnt how to create your first ACA extension starting from the ACA source code stored in the GitHub repository. The purpose of this content is not to be exhaustive of all the possibilities provided by the ACA extension mechanism, but enable the developers in creating their own extensions as best practice for the customization of ACA.

# How to install an existing extension for the Alfresco Content Application (aka ACA)

How to install an existing extension for the Alfresco Content Application (aka ACA)
The purpose of this tutorial is to describe how to install an existing extension for the Alfresco Content Application (aka ACA). The ACA extension mechanism is the suggested way to customise the ADF-based front-end applications and this tutorial should help in this relevant task to manage extensions.

Prerequisites
Installing the ACA extension
Making the extension as part of the ACA application
Running ACA with the extension included
Prerequisites
The starting point for this tutorial is the availability of a tested and working ACA extension as well as the full repository of the Alfresco Content Application (aka ACA). This tutorial has been written with the following versions of the software:

ACA version 2.2.0,

ACS 7.0.0-M3,

NodeJs version 14.15.2,

Chrome Version 87.0.4280.88.

In this tutorial it is assumed that the existing ACA extension is named my-extension and its structure is compliant with the content and structure of the projects/my-extension path described in the tutorial here.

Installing the ACA extension
The idea behind this task is to create a brand new ACA extension with the same name of the existing one, and replace its content to reach the described goal.

From the root folder of the ACA project, launch the command below from a terminal. Please be sure that you are going to use the same name as the existing extension (in this case my-extension).

```text
ng generate library my-extension
```

> **NOTE:** In case of errors, add the following line to the `tsconfig.json` file.
`"compilerOptions": { "baseUrl": ".", "rootDir": "." }`

Once done, delete the full content of the `projects/my-extension` folder and replace it with the source code of the existing ACA extension.

To complete the creation, build the extension launching the following command.

```text
ng build my-extension
```

In case of errors, add the following configuration to the `tsconfig.json` file.

`"compilerOptions": { ..., "allowSyntheticDefaultImports":true }`

Making the extension as part of the ACA application
Now that the ACA extension is developed in its initial version, let's add the extension module to the list of the ones used by the application. To complete the task you can follow the same task described for the tutorial named How to create your first extension for the Alfresco Content Application (aka ACA) (paragraph “Making the extension as part of the ACA application“). Once the extension is installed with success (npm install my-extension), the task can be considered as completed.

Running ACA with the extension included
Now that everything is properly developed, it’s time to launch ACA and see the result. To launch ADW, run the following command from a terminal.

npm start
What you should see is a new item in left menu of the landing page for ACA, implementing the route to a new page with the following content. Below the screenshot describing what it should look like.

## To install an existing extension for the Alfresco Digital Workplace (aka ACA)

How to install an existing extension for the Alfresco Digital Workplace (aka ADW)
The purpose of this tutorial is to describe how to install an existing extension for the Alfresco Digital Workspace (aka ADW). The ADW extension mechanism is the suggested way to customise the ADF-based front-end applications and this tutorial should help in this relevant task to manage extensions.

Prerequisites
Installing the ADW extension
Making the extension as part of the ADW application
Running ADW with the extension included
Prerequisites
The starting point for this tutorial is the availability of a tested and working ADW extension as well as the full repository of the Alfresco Digital Workspace (aka ADW). This tutorial has been written with the following versions of the software:

ADW version 2.0.0,

ACS 7.0.0-M3 Enterprise Edition,

NodeJs version 14.15.2,

Chrome Version 87.0.4280.88.

In this tutorial it is assumed that the existing ADW extension is named my-extension and its structure is compliant with the content and structure of the projects/my-extension path described in the tutorial here.

Installing the ADW extension
The idea behind this task is to create a brand new ADW extension with the same name of the existing one, and replace its content to reach the described goal.

From the root folder of the ADW project, launch the command below from a terminal. Please be sure that you are going to use the same name as the existing extension (in this case my-extension).

nx g @nrwl/angular:lib my-extension
Once done, delete the full content of the libs/my-extension folder and replace it with the source code of the existing ADW extension.

Making the extension as part of the ADW application
Now that the ADW extension is developed in its initial version, let's add the extension module to the list of the ones used by the application. To complete the task you can follow the same task described for the tutorial named How to create your first extension for the Alfresco Digital Workspace (aka ADW)  (paragraph “Making the extension as part of the ADW application“).

Running ADW with the extension included
Now that everything is properly developed, it’s time to launch ADW and see the result. To launch ADW, run the following command from a terminal.

npm start content-ee
What you should see is a new item in “new” button on the top left of the landing page for ADW, implementing the logout from the current session. Below the screenshot describing what it should look like.

## How to add a page view and a menu item in ADW using an extension

In this tutorial you are going to learn how to create an extension for the Alfresco Digital Workspace (aka ADW), developing a new page and a new menu item linking to it. This is an example of the various thing that you could do as a developer, to customise ADW and any extendible ADF-based application.

Prerequisites
The starting point for this tutorial is the availability of a tested and working ADW extension as well as the full repository of the Alfresco Digital Workspace (aka ADW). This tutorial has been written with the following versions of the software:

ADW version 2.0.0,

ACS 7.0.0-M3 Enterprise Edition,

NodeJs version 14.15.2,

Chrome Version 87.0.4280.88.

In this tutorial it is assumed that the existing ADW extension is named my-extension and its structure is compliant with the content and structure of the projects/my-extension path described in the tutorial here.

Creating a new page as part of the extension
Before any configuration of the extension and the application, let’s create a new component showing a “hello world” message as part of a layout. For that purpose, the component will be created with the name MyFirstPageComponent and it will be stored as part of the extension.

To develop the component, create the libs/my-extension/src/lib/my-first-page folder and the my-first-page.component.ts file into it, with the following content.

import { Component, } from '@angular/core';

@Component({
    selector: 'my-first-page',
    template: "<h1>HELLO WORLD!</h1>"
    })
export class MyFirstPageComponent {}
This is one of the most simpler components that you can develop, as an example.

Once done, edit the my-extension.json file in the libs/my-extension/assets folder and add the following JSON to the route array.

```java
{
    ...,
    "routes": [
        {
            "id": "my.extension.myFirstPage",
            "path": "my-first-page",
            "parentRoute": "",
            "layout": "app.layout.main",
            "component": "my.extension.components.my-first-page",
            "auth": [
                "content-services.auth"
            ]
        }
    ]
}
```

To declare the component identifier directly into the extension’s module. For that purpose edit the libs/my-extension/src/lib/my-extension.module.ts updating the following content.

// Add the following imports.
```json
import { ExtensionService } from '@alfresco/adf-extensions';
import { MyFirstPageComponent } from './my-first-page/my-first-page.component';
```

// Change the NgModule as follows.

```java
@NgModule({
  ...,
  declarations: [MyFirstPageComponent]
})
export class MyExtensionModule {
  constructor(extensions: ExtensionService) {
    extensions.setComponents({
      'my.extension.components.my-first-page': MyFirstPageComponent,
    });
  }
}
```

This is all that you have to do if you want to add a new route (URI related to a page layout) to the application through the extension. To test that everything is working properly, you can launch the npm start content-ee command and point the browser to http://localhost:4200/#my-first-page.

Creating the menu item as part of the extension
To add a new menu item pointing to the page above, edit the `my-extension.json` file in the libs/my-extension/assets folder and add the following JSON to the features element.

```json
{
  ...
  "features": {
    ...,
    "navbar": [
      {
        "id": "app.navbar.primary",
        "items": [
          {
            "id": "app.navbar.libraries.menu",
            "children": [
              {
                "id": "app.navbar.libraries.all-libraries",
                "title": "My first page",
                "description": "My first page",
                "order": 400,
                "route": "my-first-page",
                "rules": {
                  "visible": "app.content-services.isEnabled"
                }
              }]
          }]
      }]
  },
  ...
}
```

Below you can see what the layout looks like.

<Add appropriate image>
