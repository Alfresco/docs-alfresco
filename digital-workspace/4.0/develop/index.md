---
title: Front-end app development overview
---

You can develop with and adapt the Digital Workspace or integrate your own solutions. To do this you can use the Digital Workspace extensions or create a custom app using the Alfresco Application Development Framework (ADF). The Digital Workspace is a fully supported application that is available to customers and partners working with **Alfresco Content Services - Enterprise Edition**.

If your project uses **Alfresco Content Services - Community Edition** or other open source components you must use Alfresco Content Application instead of the Digital Workspace. The Content Application is a free, open source example of an application created using the Application Development Framework, and its use is not supported by Alfresco support.

![Develop front-end]({% link digital-workspace/images/develop-front-end.png %}){:height="259px" width="536px"}

## Front-end experience

Front-end applications are a subset of client interactions, and Alfresco provides an Angular-based Application Development Framework for creating them. The backend services provided by Alfresco products use a REST API foundation layer for all client interactions of the platform.

### Front-end applications

The Application Development Framework is an open source project that defines a set of services and visual components that you can use to create bespoke end-user applications. The framework is not an end-user application itself, but it enables you to create your own applications.

The image explains the relationship between the front-end applications and backend Alfresco services, i.e. the Digital Workspace, the Content Application, and the Application Development Framework.

![Development options]({% link digital-workspace/images/develop-arch.png %}){:height="455px" width="536px"}

## Development options

The following options are provided to start developing a front-end for Alfresco depending on the customization required. We have open source and enterprise applications if the customization is minimal. However, if you need to develop very comprehensive extensions, you can use the Application Development Framework.

* Enterprise customers can use the Digital Workspace as a starting point.
  * See [Deploy Alfresco Digital Workspace]({% link digital-workspace/4.0/develop/deploy.md %}#deploy-adw) for more details.
  * To develop extensions, see [Digital Workspace extensions]({% link digital-workspace/4.0/develop/extensions.md %}) or create a custom app using the Alfresco [Application Development Framework (ADF)]({% link digital-workspace/4.0/develop/deploy.md %})

* Community customers can use the [Content Application](https://alfresco-content-app.netlify.app/#/){:target="_blank"} as a starting point.
  * See [Deploy Alfresco Content App]({% link digital-workspace/4.0/develop/deploy.md %}#deploy-aca) for more details.
  * To develop extensions, see [Content App extensions]({% link digital-workspace/4.0/develop/extensions.md %}).

* Customers that require extensive customizations can use the Application Development Framework as a starting point.
  * See [Generate and deploy an ADF App]({% link digital-workspace/4.0/develop/deploy.md %}#deploy-adf) for more details.

## Mobile development

Native mobile frameworks and applications are provided by Alfresco. You can access the Mobile Workspace code in the following GitHub repositories:

* [Android](https://github.com/alfresco/alfresco-mobile-workspace-android){:target="_blank"}
* [iOS](https://github.com/alfresco/alfresco-mobile-workspace-ios){:target="_blank"}
