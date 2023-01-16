---
title: Getting started in developing
---

If this is the first time developing extensions for Content Services it might seem a bit daunting at the start. However,
if you are a Java developer you should be able to quickly get up to speed on the platform. Content Services is implemented 
in Java and most of the extension points use Java.

It's a good idea to start your developer journey by reading through the 
[Software Architecture]({% link content-services/7.2/develop/software-architecture.md %}) section, as this will
get you up to speed on the different components of the platform, and how they work together. It will also introduce you to 
the different types of extensions that can be implemented.

There are two types of [extensions]({% link content-services/7.2/develop/overview-ext-points.md %}) that can be built: in-process extensions and out-of-process extensions.

* **In-Process Extensions** consist of custom code that is run together 
with the product code in the same process.
* With **Out-of-Process Extensions** the custom code runs in a separate process. 
Traditionally it has been all in-process extensions. But in Content Services 7.0, a shift has been made towards out-of-process extensions.

There are a number of reasons why out-of-process extensions are the preferred way to go these days:

* **Easier upgrades**: Product upgrades are much more straight forward as the custom code is not running together with the 
product code. When custom code runs embedded you need to port all the custom code to the new version of the product before 
you can upgrade. That might not be an easy task, and if there have been major changes to the new product version it could 
be an extensive project. When all customizations live in external processes you can be much more confident that the upgrade 
will be successful and that it can be done on time. Out-of-process extensions are usually not affected by an upgrade as 
they use standard ReST APIs and event types. 
* **Stability and security**: When customizations are embedded in the product code it's much more likely that the
stability of the product is compromised, and it's also more problematic to protect against security threats. 
* **Less complexity**: Developing customizations out-of-process, i.e. separate from the product code, will make it less complex 
as you don't have to think about the impact custom code might have on the product code. In the past it was 
also common for product code to be changed, making it very complex, and simple upgrades were almost impossible.  
* **Language choice**: When developing in-process extensions Java has to be used as the product is implemented in Java. 
With out-of-process extensions it is possible to use other languages, which might fit the development team better, resulting 
in increased productivity.  
* **Start/stop requirement**: With in-process extensions you always have to stop the content server when installing a new 
version of the customization. This might not be a problem for smaller installations but in many cases it is not possible
to stop the service for a couple of hours. With out-of-process extensions you can upgrade the customizations completely 
separately and there is no need to stop the content server.  
* **Product support**: Product support sometimes have problems figuring out where a problem lies, in the product code or 
in the custom code. If they are separated it's much easier to see where the problem is and respond appropriately.
* **Development speed**: When developing out-of-process extensions the code-change -> test roundtrip is faster as you don't 
have to restart Content Services to see the impact of a code change. This is a major benefit to the developers.  

You can see why developing out-of-process extensions is the way to go. See [SDK 5]({% link content-services/7.2/develop/oop-sdk.md %}) for more information. 
However, there are certain customizations that still have to be done in-process, such as implementing a content model. 
Because of this it's useful to be familiar with both ways of developing customizations. Designing and implementing a 
content model is usually the first thing that needs to be done in most content management projects. So make sure to read 
through the [Content model extension point]({% link content-services/7.2/develop/repo-ext-points/content-model.md %}) 
documentation and then walk through the [content model tutorial]({% link content-services/7.2/tutorial/platform/content-model.md %}). 
By implementing a content model you will get familiar with the in-process extension model and the associated 
[SDK 4]({% link content-services/7.2/develop/sdk.md %}).

When you have the custom content model in place, providing types and aspects related to the project domain (i.e. finance,
healthcare, manufacturing etc.), then you can move on and implement the business logic using [SDK 5 event handling and ReST API libraries]({% link content-services/7.2/develop/oop-sdk.md %}) 
and the user interface with the Alfresco [Application Development Framework (ADF)](https://www.alfresco.com/abn/adf/docs/){:target="_blank"}. 
ADF is based on Angular and it provides a number of components that can be aggregated to create the user interface 
you need for your domain.

If you need to implement business processes that will process the content in domain specific ways, then have a look at [Alfresco Process Services]({% link process-services/latest/index.md %}).
