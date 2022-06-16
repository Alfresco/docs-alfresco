---
title: Develop Digital Workspace
---

This development section uses the following prerequisites:

<What are they>

# Prerequisites and requirements

The first thing to do is to check the prerequisites and the requirements to run the front-end application directly into a development environment.

More in particular check that you have:

* Alfresco Content Services (alias ACS) Community or Enterprise edition up and running (identify the URL that will be required as configuration).
* The latest lts version of NodeJs.

# Cloning and launching the front-end application

Once the environment is properly configured, open a terminal and clone the following GitHub repository in a working folder.

`git clone https://github.com/Alfresco/alfresco-content-app.git`

Once done, enter the alfresco-content-app folder and create a file named .env with the following content (put the ACS URL as value).

`API_CONTENT_HOST="https://..."`

Run `npm install` and then `npm start` to get the application up and running. The application will be available at the URL <http://localhost:4200> and the credentials are the ones required by ACS.

Congratulations! You now have the Alfresco Content App running in development mode into your development environment.

## Troubleshooting and support

If you have any issue, don’t worry! There is an entire community available to help you.

In case of problems raise a question into the [Alfresco Forum](https://hub.alfresco.com/ "https://hub.alfresco.com/") (Application Development Framework section) or connect with the developers into the [Alfresco Gitter channel](https://alfresco.atlassian.net/wiki/spaces/PM/overview "https://alfresco.atlassian.net/wiki/spaces/PM/overview").

## Use the Enterprise stack instead of the Open Source

If you are an Alfresco Customer or an Official Partner, you might be interested in using the Enterprise stack instead of the Open Source introduced above. The changes to the tasks are not too many and you can try to do the same exercise with the following changes.

* Use ACS Enterprise Edition instead of the Community Edition.
* Use the `alfresco-digital-workspace-app` GitHub repository (this is a private repository so you may require to get a local copy of the project raising a request into the Alfresco Support Portal).
* Use the following `.env` file.

```text
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

* Run the application using `npm start content-ee`.

## Conclusion

In this tutorial you learned how to launch a fully-featured ADF-based application on your development environment, starting from the source code, with the purpose to have a first experience with the development principles and the best practices suggested to create front-end applications working on top of the Alfresco backend services. This is only the first success that you can do with the Alfresco technology. Continue to learn on how to develop front-end applications using Alfresco, in the following sections of the official documentation.

# Front end developer experience

The backend services provided by Alfresco products use a reliable REST API foundation layer for all client interactions on the platform. Front end applications are a subset of these clients interactions and Alfresco provides an Angular-based [Application Development Framework (ADF)](LINK) for creating them.

## Front end applications

The Application Development Framework defines a set of services and visual components that developers can use to create bespoke end-user applications. The framework is not an end-user application itself, but it enables developers to create their own applications and is available as an [open source project](LINK).

Alfresco provides two end user applications created using the Application Development Framework:

* [Digital Workspace](LINK) is a fully supported application available to customers and partners working with Enterprise editions of Alfresco products and services.

* [Content Application](LINK) is a free, open source example of an application created using the Application Development Framework.

The following image explains the relation between the front end applications and backend Alfresco services.

![Development options]({% link digital-workspace/images/develop-arch.png %})

> **Note**: Digital Workspace (DW), Content Application (ACA) and Application Development Framework (ADF).

### Options

One of the advantages of an open platform is that there are many options available to develop with.

As an example, a developer can avoid using the Application Development Framework entirely and use a completely different technology such as React to interact with the REST API layer.

The hybrid option also exists where a developer could use a selection of services and components from the Application Development Framework and then build their own set of custom components and services on top of these. Alternatively, a developer can use the Digital Workspace or Content Application and modify it through custom extensions and integrations.

### Cost vs effort

Despite the variety of options available, there are implications for each choice that need to be considered. There isn't a right or wrong approach but it's important to balance the option you choose against the time and effort required to implement it.

Alfresco has invested heavily in the Application Development Framework and its associated applications and plans to continue that investment. Enhancements, new features and bug fixes are some of the advantages to "staying sticky" with the front end Alfresco technology.

When developing customizations, the development, maintenance and work required to upgrade to newer versions of frameworks and applications is a factor to consider.

## Mobile development

Native mobile frameworks and applications are provided by Alfresco as standard and worth considering if mobile support is a requirement. Further details on the [Alfresco developer experience for mobile is available](LINK).

## Best Practices

As you learned in the previous sections, as a developer you have several options in developing front-end applications on top of the Alfresco Backend Services. In this section we would like to discuss some best practices to take into consideration for your technical decisions.

As general, but very important advice: the more you can reuse of the Alfresco technology (frameworks and applications) the more you will be supported by Alfresco in enhancements, bug fixes as well as additional features shipped through frequent releases.

Following this principle, the suggested approach in designing an Alfresco front-end application is to consider the ready-to-be-used applications as the first choice. In case they won’t meet the requirements, you can consider developing a few or some customizations to adjust or integrate the behavior (the so-called ADF Extensions). In case of complex customizations or if the application is too far from the requirements and expectations, a custom application is still an option under your consideration.

As already shared: there isn’t a right or wrong approach. The decision really depends on your preferences, the goals of your project and the use cases that you are facing (often also the end-users expectations). You need to balance the “option” with the “effort” (impacting the cost and time to market), ideally before starting the development.

In the picture below you can see drawn the decision process described above.

![Develop front end]({% link digital-workspace/images/develop-front-end.png %})

In case of projects adopting Community Editions or Open Source components, you can consider ACA as an alternative to ADW. Of course, if you will decide to follow this path, it will be done at your own risk considering that ACA is defined as an example of content application and it is not officially supported by Alfresco (but contributions to the project are welcome).

In the following sections every option described above will be introduced, providing further details to enable you on its adoption and implementation.

Introducing ADW (developer perspective)
The Alfresco Digital Workspace (alias ADW) is the general-purpose application developed and provided by Alfresco to all the customers and partners. ADW is supported and enhanced through regular releases and it supports content use cases as well as content-centric process use cases.

You may consider adopting ADW if you are facing use cases closed to a generic usage and needs. Into the dedicated section of the documentation you will learn how to run it locally and manage it from a development perspective.

The ADF/ADW extension mechanism
The ADF extension mechanism is a very powerful way to customize and ADF based application structured as required by the Nx Workspace dev tools for monorepos. The ADF extension mechanism is the suggested way to add, remove, change the behavior of an ADF based application. The ADF extension mechanism is fully applicable to ADW it is suggested to be used as best practice instead of direct changes to the source code of the application.

Customizations implemented through the ADF extension mechanism are more maintainable (modular and isolated from the core of the application) and allow an easier upgrade of the application.

You may consider adopting ADW and developing an extension if your use case is mainly covered by ADW, but some changes are required to meet the expectations and the requirements. In case of complex changes or relevant differences what would be required by ADW, a custom ADF based application can be considered as an alternative.

Into the dedicated section of the documentation you will learn how to create and manage an ADF/ADW extension from a development perspective.

Developing ADF based applications
In case ADW is too far from your expectations and the required customizations would be too complex for the existing structure of the ADW project, the development of a custom ADF based application is an option for your consideration.

The idea behind this approach is to provide the developer with a very basic (and almost “empty”) ADF based application that she/he can start enriching with features, behaviors and customizations in general. The creation of this basic ADF-based application is possible through a scaffolding tool called Yeoman, which makes this task very straightforward.

The promise is that in minutes you can create from scratch a working (but very basic) ADF based application in your development environment.

You may consider adopting an ADF-based application in case you want to benefit from the ADF services and visual components provided by the framework. Into the dedicated section of the documentation you will learn how to create and manage an ADF-based application created using the Alfresco Yeoman Generator, available for free as an Open Source project on GitHub.

About custom applications (non-ADF based)
If ADF does not fit into your requirements (for example because you want to use a different framework like React or Vue.js) the possibility of developing a custom application on top of the REST API layer provided by the Alfresco Backend Services, is still an option.

Of course in this case all the development effort and maintenance will be on your side.

Conclusion
In this section you learned some best practices to take into consideration for your technical decisions in developing a front-end application on top of the Alfresco Backend Services. After the introduction of some principles to support your choice, for each of the most relevant options has been provided some details for your consideration.
