---
title: The Alfresco Development Framework/Alfresco Digital Workspace extension mechanism
---

The Alfresco Development Framework (ADF) extension mechanism is a powerful way to customize an ADF based application structured as required by the Nx Workspace developer tools for monorepos. The ADF extension mechanism is the suggested way to add, remove, and change the behavior of an ADF based application. The ADF extension mechanism is fully applicable to the Alfresco Digital Workspace, and it is suggested to be used as best practice instead of direct changes to the source code of the application.

Customizations implemented through the ADF extension mechanism are more maintainable (modular and isolated from the core of the application) and allow an easier upgrade of the application.

Use the Alfresco Digital Workspace and develop an extension if your use case is mainly covered by the Alfresco Digital Workspace, but some changes are required to meet the expectations and the requirements. In case of complex changes, a custom ADF based application is an alternative.

## How to create an extension for the Alfresco Digital Workspace

The Alfresco Digital Workspace extension mechanism is the suggested way to customize the supported front-end application, and this tutorial is supposed to be the foundation for content to share with customers and partners. This tutorial describes how to develop a “hello word” extension for the Alfresco Digital Workspace.
<!-- check this link, should it be /developadfapp ? -->
Check you have the [required prerequisites](https://docs.alfresco.com/digital-workspace/latest/develop/developedapp).

### Creating the Alfresco Digital Workspace extension

The creation of an Alfresco Digital Workspace extension is straightforward following the Nx Workspace developer tools for monorepos.

Install `nx` cli globally.

`npm install -g nx`

From the root folder of the ADW project, use the following command to create a new extension called `my-extension`.

`nx g @nrwl/angular:lib my-extension`

Look at the Nx Tutorial / Create Libraries for further details about this Angular command and feature. During the execution of the command above leave the default values for the options, if you are not sure.

In the `libs/my-extension` path you will find the following structure:

* The `src folder` contains all the typescript source code
* The `index.ts` file defines all the inclusions of the extension
* The `lib/my-extension.module.ts` file defines the module class for the extension
* The `README.md` file contains documentation
* Other files for testing and configuration

### Developing the basics of the Alfresco Digital Workspace extension

After the `my-extension` is created, add the configuration to the extension module by editing the `./libs/my-extension/src/lib/my-extension.module.ts` file as described below.

```java
// Add the following import to the page.

import { provideExtensionConfig } from '@alfresco/adf-extensions';

// Add providers as described below.

NgModule({
  imports: [CommonModule],
  providers: [
    provideExtensionConfig(['my-extension.json'])
  ]
})
export class MyExtensionModule {}
```

For configuration, program the extension to add an item to the "new" button on the top left of the landing page of the Alfresco Digital Workspace.

To create the proper configuration, create the folder below in the described path.

`libs/my-extension/assets`

Once done, create the file `libs/my-extension/assets/my-extension.json` with the following content.

```json
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

This example adds a “BYE BYE WORLD!” option to the existing “new” button, implementing the logout from the session of the Alfresco Digital Workspace application. To learn more about customizing the Content Application, see the [documentation](https://alfresco-content-app.netlify.app/#/extending/). To learn more about ADF, visit [ADF Tutorials](https://www.alfresco.com/abn/adf/).

### Making the extension as part of the Alfresco Digital Workspace application
After the Alfresco Digital Workspace extension is created, check that the `tsconfig.base.json` file includes the link to the `libs/my-extension/src/index.ts` file as part of the paths item. These are default paths set during the creation of the extension, but it is helpful to verify the paths during troubleshooting.

Add the extension module to the application by editing the `apps/content-ee/src/app/extensions.module.ts` file as described below.

```java
// Add the following import to the page.

import { MyExtensionModule } from '@alfresco-dbp/my-extension';

@NgModule({
    imports: [
        ...,
        MyExtensionModule,
    ],
})
export class AppExtensionsModule {}
```

Edit the configuration file `angular.json` so the extension is visible from the Alfresco Digital Workspace app through a public URL as described below.

// Add to 'projects/content-ee/targets/build/options/assets' array.
...
{
  "input": "libs/my-extension/assets",
  "output": "/assets/plugins/",
  "glob": "my-extension.json"
},
...
```

## Running the Alfresco Digital Workspace with the extension included

To launch the Alfresco Digital Workspace, run the following command from a terminal.

```shell
npm start content-ee
```

What you should see is a new item in “new” button on the top left of the landing page for the Alfresco Digital Workspace, implementing the logout from the current session. Below the screenshot describing what it should look like.

![Development options]({% link digital-workspace/images/adw-extension-new-button.png %})


## Install an existing extension for the Alfresco Digital Workplace

The Alfresco Digital Workspace extension mechanism is the suggested way to customize the ADF-based front-end applications and this tutorial should help in this relevant task to manage extensions.

### Prerequisites

The starting point for this tutorial is the availability of a tested and working the Alfresco Digital Workspace extension as well as the full repository of the Alfresco Digital Workspace. This tutorial has been written with the following versions of the software:

* Alfresco Digital Workspace version 2.8.0
* Alfresco Content Services 7.2.0
* NodeJs version 14
* Chrome Version 87

It is assumed that the existing Alfresco Digital Workspace extension is named `my-extension` and its structure is compliant with the content and structure of the `projects/my-extension` path described in the tutorial here.

### Installing the Alfresco Digital Workspace extension

The idea behind this task is to create a brand new Alfresco Digital Workspace extension with the same name of the existing one, and replace its content to reach the described goal.

From the root folder of the Alfresco Digital Workspace project, launch the command below from a terminal. Please be sure that you are going to use the same name as the existing extension (in this case `my-extension`).

`nx g @nrwl/angular:lib my-extension`

Once done, delete the full content of the `libs/my-extension` folder and replace it with the source code of the existing Alfresco Digital Workspace extension.

### Making the extension as part of the Alfresco Digital Workspace application

Now that the Alfresco Digital Workspace extension is developed in its initial version, let's add the extension module to the list of the ones used by the application. To complete the task you can follow the same task described for the tutorial named **Create an extension for the Alfresco Digital Workspace**  ([“Making the extension as part of the Alfresco Digital Workspace application“](#making-the-extension-as-part-of-the-alfresco-digital-workspace-application)).

### Running the Alfresco Digital Workspace with the extension included

Launch the Alfresco Digital Workspace, run the following command from a terminal.

`npm start content-ee`

What you should see is a new item in “new” button on the top left of the landing page for the Alfresco Digital Workspace, implementing the logout from the current session. Below the screenshot describing what it should look like.

![ADW Extension New Button]({% link digital-workspace/images/adw-extension-new-button.png %})

## Add a page view and menu item in the Alfresco Digital Workspace using an extension

In this tutorial, you are going to learn how to create an extension for the Alfresco Digital Workspace, developing a new page and a new menu item linking to it. This is an example of the various thing that you could do as a developer, to customize the Alfresco Digital Workspace and any extendible ADF-based application.

### Prerequisites

The starting point for this tutorial is the availability of a tested and working Alfresco Digital Workspace extension as well as the full repository of the Alfresco Digital Workspace. This tutorial has been written with the following versions of the software:

* Alfresco Digital Workspace version 2.8.0
* Alfresco Content Services 7.2.0
* NodeJs version 14
* Chrome Version 87

The existing Alfresco Digital Workspace extension is named `my-extension` and its structure is compliant with the content and structure of the `projects/my-extension` path described in the tutorial here.

### Creating a new page as part of the extension

Before any configuration of the extension and the application, create a new component showing a “hello world” message as part of a layout. Name the component `MyFirstPageComponent`. It will be stored as part of the extension.

To develop the component, create the `libs/my-extension/src/lib/my-first-page` folder and the `my-first-page.component.ts` file into it, with the following content.

```java
import { Component, } from '@angular/core';

@Component({
    selector: 'my-first-page',
    template: "<h1>HELLO WORLD!</h1>"
    })
export class MyFirstPageComponent {}
```

Once done, edit the `my-extension.json` file in the `libs/my-extension/assets` folder and add the following JSON to the route array.

```json
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
    ],
    "rules": []
}
```

To declare the component identifier directly into the extension’s module. For that purpose edit the `libs/my-extension/src/lib/my-extension.module.ts` updating the following content.


```java
// Add the following imports.
import { ExtensionService } from '@alfresco/adf-extensions';
import { MyFirstPageComponent } from './my-first-page/my-first-page.component';

// Change the NgModule as follows.

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

This is all that you have to do if you want to add a new route (URI related to a page layout) to the application through the extension. To test that everything is working properly, you can launch the `npm start content-ee` command and point the browser to http://localhost:4200/#my-first-page.

### Creating the menu item as part of the extension

To add a new menu item pointing to the page above, edit the `my-extension.json` file in the `libs/my-extension/assets` folder and add the following JSON to the features element.

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

![ADW Extension New Library]({% link digital-workspace/images/adw-extension-new-library.png %})
