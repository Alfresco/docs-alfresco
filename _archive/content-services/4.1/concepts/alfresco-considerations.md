---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Overview
keyword: environment
---

# Designing your application

While Alfresco can scale from small solutions to an enterprise-wide infrastructure, you must consider how to configure Alfresco and which tools and interfaces to use to develop your content application.

Here are some key areas to consider when developing your content application:

## What is your audience?

To choose the right deployment choices for Alfresco, determine who your audience is and where they need to access content. Alfresco fits in user environments and provides services invisibly to a broad range of end users. Alfresco also integrates with enterprise portals and applications where users access content as part of another solution or application. There are also interfaces that allow users to configure rules and workflows without programming.

## How many users are you supporting?

An instance of Alfresco can easily handle dozens of users right out-of-the-box. However, when deploying your application to an entire enterprise, consider clustering and distribution options. You can run Alfresco as part of a single application or in a multi-tier environment clustered with many machines.

## Application architecture

Is your application standalone or part of a broader content infrastructure? If content is reused between applications, consider a remote repository from your application and application server. If absolute performance is important, consider integrating your application, repository, and database as a single application. If you have a distributed environment or parts of your content architecture are geographically distributed, consider either federation or synchronization options.

## Level of configuration and customization

How will your application be deployed, how will it be used, and how long can you expect to use it? Answers to these questions will help you determine whether you build a new application, customize one of the existing Alfresco applications, or configure the out-of-the-box applications. Configuration can be powerful, especially in configuring rules and actions or in adding out-of-the-box components. If you choose to customize, you can use web scripts, and avoid heavyweight development, or you can develop using a full Java environment using your favorite IDE. You can customize the Alfresco application or the content application server itself.

## Your IT environment

Alfresco supports most IT environments, but when developing and deploying your application consider your specifics; your operating system, database, language, and security requirements. Alfresco applications are written in Java and Java-based technologies to ensure they are as portable as possible. By using the Spring platform, Alfresco can integrate different caching technologies, security systems and authentication systems. Alfresco also supports other programming languages, allowing development using Java, PHP, .NET, or virtually any language that supports REST-based or web services-oriented programming.

## Support requirements

Consider how you are building and deploying your application, and what your support requirements are. The more mission critical or the more integrated into the enterprise your application is, the more you may need the Enterprise version. Alfresco is open source, so you can use the community version for free. If you are a small organization or small independent software developer, this lets you use content management without the expense of a large ECM system. However, to deploy your application in a production environment, the Enterprise version of Alfresco provides support and prompt bug fixing. If you are using proprietary databases or operating systems, the Enterprise version provides configurations on certified platforms that include different operating systems and databases.

**Parent topic:**[Programming with Alfresco](../concepts/programming-intro.md)

