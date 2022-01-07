---
title: Develop Digital Workspace
---

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