---
title: Develop Digital Workspace
---

Launch a fully-featured, front-end application on a development environment. Use the source code, with the purpose to gain experience with development principles and  best practices suggested to create front-end applications working on top of the Alfresco backend services.

The stack chosen for this initial task is the Open Source version of the front-end application. In the bonus section, repeat the same exercise with the Enterprise version (available for Alfresco customers and partners only).

# Prerequisites and requirements

The first thing to do is to check the prerequisites and the requirements to run the front-end application directly into a development environment.

* Alfresco Content Services (ACS) Community edition up and running (identify the URL that will be required as configuration). 
* The latest Long Time Support (LTS) version of Node.js available on their site Home or Downloads section.
* A recent (and supported) version of a browser (see [here](digital-workspace\latest\develop\index.md) for further details).<!-- original GitHub link: https://github.com/Alfresco/alfresco-ng2-components#browser-support -->

# Cloning and launching the front-end application

Once the environment is properly configured, open a terminal and clone the following GitHub repository in a working folder.

`git clone https://github.com/Alfresco/alfresco-content-app.git`

Once done, enter the `alfresco-content-app` folder and create a file named `.env` with the following content (put the ACS URL as value).

```
APP_CONFIG_ECM_HOST="https://..."
APP_CONFIG_PLUGIN_AOS=false
```

Run `npm install` and then `npm start` to get the application up and running. The application will be available at the URL `http://localhost:4200` and the credentials are the ones required by ACS.
<!-- is this "Alfresco Content App" a reference to ACS or ACA-->
The Alfresco Content App should be running in development mode in your development environment.

## Troubleshooting and support

Ask questions in the Application Development Framework section of the [Alfresco Forum](https://hub.alfresco.com/t5/application-development/ct-p/developing) or in Gitter Discussions available in the [Alfresco Builder Network](https://www.alfresco.com/abn/adf/).

## Use the Enterprise stack instead of the Open Source

If you are an Alfresco Customer or an Official Partner, you can use the Enterprise stack instead of the Open Source introduced above. The changes to the steps are minimal and implement the above exercise with the following changes:

* Use ACS Enterprise Edition instead of the Community Edition.
* Use the `alfresco-digital-workspace-app` GitHub repository

  **Note:** Request a local copy of the project in the Alfresco Support Portal.
* Use the following `.env` file.

```text
    AUTH_TYPE="BASIC"
    PROVIDER="ECM"
    API_CONTENT_HOST="<https://...>"
    API_PROCESS_HOST="<https://...>"
    OAUTH_HOST="<https://.../auth/realms/alfresco>"
    E2E_HOST="<http://localhost:4200>"
    ADMIN_EMAIL="..."
    ADMIN_PASSWORD="..."
    ADF_PATH="../alfresco-ng2-components"
    ACA_BRANCH="develop"
    MAXINSTANCES=3
```

* Run the application using `npm start content-ee`.

<!-- ## Conclusion

In this tutorial you learned how to launch a fully-featured ADF-based application on your development environment, starting from the source code, with the purpose to have a first experience with the development principles and the best practices suggested to create front-end applications working on top of the Alfresco backend services. This is only the first success that you can do with the Alfresco technology. Continue to learn on how to develop front-end applications using Alfresco, in the following sections of the official documentation. --> 

# Front end developer experience

The backend services provided by Alfresco products use a reliable REST API foundation layer for all client interactions on the platform. Front end applications are a subset of these client interactions and Alfresco provides an Angular-based Application Development Framework (ADF) for creating them.

## Front end applications

The Application Development Framework defines a set of services and visual components that developers can use to create bespoke end-user applications. The framework is not an end-user application itself, but it enables developers to create their own applications and is available as an Open Source project.

Alfresco provides the end user application created using the Application Development Framework:

* [Digital Workspace](https://www.alfresco.com/ecm-software/alfresco-digital-workspace) is a fully supported application available to customers and partners working with Enterprise editions of Alfresco products and services.
<!-- I can't find this Content Application link, we also want to remove ACA 
* [Content Application](LINK) is a free, open source example of an application created using the Application Development Framework. -->

The following image explains the relation between the front end applications and backend Alfresco services. <!-- Digital Workspace (ADW), Content Application (ACA) and Application Development Framework (ADF). -->

![Development options]({% link digital-workspace/images/develop-arch.png %})

### Options

A hybrid option exists where a developer could use a selection of services and components from the Application Development Framework and then build their own set of custom components and services on top of these. Alternatively, a developer can use the Digital Workspace and modify it through custom extensions and integrations.

### Cost vs effort

Despite the variety of options available, there are implications for each choice that need to be considered. There isn't a right or wrong approach but it's important to balance the option you choose against the time and effort required to implement it.

Alfresco has invested heavily in the Application Development Framework, its associated applications, and plans to continue that investment. Enhancements, new features and bug fixes are some of the advantages to "staying sticky" with the front end Alfresco technology.

When developing customizations, the development, maintenance, and work required to upgrade to newer versions of frameworks and applications is a factor to consider.

## Mobile development

Native mobile frameworks and applications are provided by Alfresco as standard and worth considering if mobile support is a requirement. <!-- Cannot find mobile link. Further details on the [Alfresco developer experience for mobile is available](LINK). -->

## Introducing ADW (developer perspective)
The Alfresco Digital Workspace (ADW) is the general-purpose application developed and provided by Alfresco to all customers and partners. ADW is supported and enhanced through regular releases and it supports content use cases as well as content-centric process use cases.

### Best Practices

The more you can reuse of the Alfresco technology (frameworks and applications) the more you will be supported by Alfresco in enhancements, bug fixes, as well as additional features shipped through frequent releases.

The suggested approach in designing an Alfresco front-end application is to consider the ready-to-be-used applications as the first choice. In case they won’t meet the requirements, you can consider developing a few or some customizations to adjust or integrate the behavior using ADF Extensions. In case of complex customizations or if the application is too far from the requirements and expectations, a custom application is still an option.

The decision really depends on your preferences, the goals of your project and the use cases that you are facing (often also the end-users expectations). Balance the “option” with the “effort” (impacting the cost and time to market), ideally before starting the development.

In the picture below you can see drawn the decision process described above.

![Develop front end]({% link digital-workspace/images/develop-front-end.png %})
<!-- remove the below paragraph? 
In case of projects adopting Community Editions or Open Source components, you can consider ACA as an alternative to ADW. Of course, if you will decide to follow this path, it will be done at your own risk considering that ACA is defined as an example of content application and it is not officially supported by Alfresco (but contributions to the project are welcome).
-->

### The ADF/ADW extension mechanism
The ADF extension mechanism is a very powerful way to customize and ADF based application structured as required by the Nx Workspace dev tools for monorepos. The ADF extension mechanism is the suggested way to add, remove, and change the behavior of an ADF based application. The ADF extension mechanism is fully applicable to ADW it is suggested to be used as best practice instead of direct changes to the source code of the application.

Customizations implemented through the ADF extension mechanism are more maintainable (modular and isolated from the core of the application) and allow an easier upgrade of the application.

You may consider adopting ADW and developing an extension if your use case is mainly covered by ADW, but some changes are required to meet the expectations and the requirements. If complex changes or relevant differences would be required by ADW, consider a custom ADF based application.

### Developing ADF based applications

The creation of a basic ADF-based application is possible through a scaffolding tool called Yeoman. A simple ADF based application can be enriched with features, behaviors, and customizations using ADF services and visual components. 

### About custom applications (non-ADF based)
If ADF does not fit into your requirements (for example because you want to use a different framework like React or Vue.js), the possibility of developing a custom application on top of the REST API layer provided by the Alfresco Backend Services, is still an option. In this case, all the development effort and maintenance will be unsupported by Alfresco.