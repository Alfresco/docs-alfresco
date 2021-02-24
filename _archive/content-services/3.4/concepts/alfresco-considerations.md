---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Overview
keyword: environment
---

# Environment considerations

While Alfresco can scale from small solutions to enterprise-wide infrastructure, it is best to ensure that Alfresco is configured correctly and the solution is programmed with the most appropriate tools and interfaces when developing a content application.

Here are some key areas to consider when developing a content application:

## Audience

To choose the right deployment choices for Alfresco, determine who your audience is and where they need to access content. Alfresco fits within user environments and provides services invisibly to a broad range of end users. Alfresco also integrates with enterprise portals and applications where users access content as part of another solution or application. There are also interfaces that allow users to configure rules and workflows without programming.

## Number of users

How many users do you need to support? Alfresco can easily handle dozens of users, however, to deploy to an entire enterprise you may want to consider clustering and distribution options. You can run Alfresco as part of a single application or in a multi-tier environment clustered with many machines.

## Architecture

Is this application standalone or part of a broader content infrastructure? If content is reused between applications, consider a remote repository from your application and application server. If absolute performance is important, perhaps integrate your application, repository, and database as a single application. If you are in a distributed environment or parts of your content architecture are geographically distributed, consider either federation or synchronization options.

## Level of configuration or customization

How will your application be deployed, how will it be used, and how long can you expect to use it? Answers to these questions will help you determine whether you want to build a new application, customize one of the existing Alfresco applications, or simply configure the out-of-the-box applications. Configuration can be very powerful, especially in configuring rules and actions or in adding out-of-the-box components. If you choose to customize, you can script using web scripts, thus avoiding heavyweight development, or you can develop using a full Java environment using your favorite IDE. You can customize the Alfresco application or the content application server itself.

## Enterprise IT environment

Alfresco supports most IT environments, but consider your specifics \(such as operating system, database, language, security requirements\) when developing and deploying your application. Alfresco applications are written in Java and Java-based technologies to ensure they are as portable as possible. By using the Spring platform, Alfresco can integrate different caching technologies and security and authentication systems. Alfresco supports different languages, allowing development using Java, PHP, .NET, or virtually any language that supports REST-based or web services-oriented programming.

## Support requirements

Consider how you are building and deploying your application, and what your support requirements are based upon these activities. The more mission critical or the more integrated into the enterprise, the more you may need the Enterprise version. Alfresco is open source, so you can use it for free. If you are a small organization or small independent software developer, this lets you use content management without the expense of a large ECM system. However, to deploy your application in a production environment, the Enterprise version of Alfresco provides support and prompt bug fixing. Also, if you are running with proprietary databases or operating systems, the Enterprise version provides configurations on certified platforms that include different operating systems and databases.

**Parent topic:**[Customizing and extending](../concepts/ch-customize.md)

