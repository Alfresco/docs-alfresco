---
title: Getting started in developing
---

If this is the first time developing extensions for Content Services it might seem a bit daunting at the start. However,
if you are a Java developer you should be able to quickly get up to speed on the platform. Content Services is implemented 
in Java and most of the extension points use Java.

It's a good idea to start your developer journey by reading through the 
[Software Architecture]({% link content-services/6.1/develop/software-architecture.md %}) section, as this will
get you up to speed on the different components of the platform, and how they work together. It will also introduce you to 
the different types of [extensions]({% link content-services/6.1/develop/overview-ext-points.md %}) that can be implemented.

Designing and implementing a content model is usually the first thing that needs to be done in most content management 
projects. So make sure to read through the [Content model extension point]({% link content-services/6.1/develop/repo-ext-points/content-model.md %}) 
documentation and then walk through the [content model tutorial]({% link content-services/6.1/tutorial/platform/content-model.md %}). 
By implementing a content model you will get familiar with the in-process extension model and the associated 
[SDK 4]({% link content-services/6.1/develop/sdk.md %}).

When you have the custom content model in place, providing types and aspects related to the project domain (i.e. finance,
healthcare, manufacturing etc.), then you can move on and implement the business logic and the user interface with the 
Alfresco [Application Development Framework (ADF)](https://www.alfresco.com/abn/adf/docs/){:target="_blank"}. 
ADF is based on Angular, and it provides a number of components that can be aggregated to create the user interface 
you need for your domain.

If you need to implement business processes that will process the content in domain specific ways, then have a look at 
[Alfresco Process Services]({% link process-services/latest/index.md %}).
