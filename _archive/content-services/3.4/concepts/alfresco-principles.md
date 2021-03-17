---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Architecture, Overview]
keyword: [architecture, principles, ]
---

# Guiding design principles

Alfresco's founding engineers designed a product to support modern ECM requirements based on principles that are still in use today.

## Support ECM requirements

Alfresco architecture supports the requirements of Enterprise Content Management \(ECM\) applications, such as Document Management \(DM\), Web Content Management \(WCM\), Records Management \(RM\), Digital Asset Management \(DAM\), and Search. Each of these disciplines has unique and overlapping characteristics so the design of each Alfresco capability is not done in isolation but in the context of the whole system.

## Simple, simple, simple

Alfresco aims to be as simple as possible to develop against, customize, deploy, and use. The simplest and probably most widely deployed ECM solution is the shared document drive: the Alfresco architecture is driven by the desire to be as simple as a shared drive.

## Scaling to the enterprise

Every service and feature of Alfresco is designed up front to scale in terms of size of data set, processing power, and number of users.

## Modular approach

Alfresco architecture takes a modular approach in which capabilities are bundled into modules whose implementation may be replaced if required, or not included at all. Cross-cutting concerns are encapsulated through Aspect-Oriented Programming \(AOP\) techniques, allowing for fine-tuning and optimization of an ECM solution.

## Incorporating best-of-breed libraries

Where possible, Alfresco incorporates best-of-breed third-party libraries. The open source nature of Alfresco lends itself to integrating with the wealth of available open source libraries. This is done whenever it is more profitable to integrate than build or whenever expertise is better provided in another project rather than in-house.

## Environment independence

Alfresco ECM does not dictate the environment upon which it depends, allowing choice in the operating system, database, application server, browser, and authentication system to use when deploying Alfresco. ECM is less about the application and more about the services embedded within an application. You can choose how to package Alfresco — for example, as a web application, an embedded library, or portlet.

## Solid core

The heart of Alfresco ECM is implemented in Java. This decision was driven by the wealth of available Java libraries, monitoring tools, and enterprise integrations. Java is also a trusted runtime for many enterprises wishing to deploy applications in their data centers. Each Alfresco capability is implemented as a black-box Java service tested independently and tuned appropriately.

## Scriptable extensions

Extensions will always need to be created for custom solutions and there are many custom solutions versus the single Alfresco core. Therefore, Alfresco extension points are developed using JVM-based scripting languages, allowing a much wider pool of developers to build extensions versus those that can contribute to the Alfresco core. Extensions are packaged entities, allowing for the growth of a library of third-party reusable extensions.

## Standards-based approach

The Alfresco architecture always complies with standards where applicable and advantageous. Primary concerns are to reduce lock-in, improve integration possibilities, and hook into the ecosystems built around the chosen standards.

## Architecture of participation

The Alfresco architecture promotes a system designed for community contribution. In particular, the architecture principles of a solid core, modularity, standards compliance, simplicity of development, and scriptable extensions encourage contribution of plug-ins and custom ECM solutions. Participation complements the open source approach to the development of Alfresco and fosters growth of the Alfresco community. As the community grows, the quality of self service improves, as well as the quality of feedback to Alfresco. This, in turn, enhances Alfresco and creates the ultimate feedback loop.

**Parent topic:**[Overview](../concepts/system-about.md)

