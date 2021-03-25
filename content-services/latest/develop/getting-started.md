---
title: Getting started developing
---

If this is the first time developing extensions for Content Services it might seem a bit daunting at the start. However,
if you are a Java developer you should be able to quickly get up to speed on the platform. Content Services is implemented 
in Java and most of the extension points use Java.

It's a good idea to start your developer journey by reading through the 
[Software Architecture]({% link content-services/latest/develop/software-architecture.md %}) section, this will
get you up to speed on the different components of the platform, and how they work together. It will also introduce you to 
the different types of extensions that can be implemented.

There are two types of extensions that can be built, in-process extensions and out-of-process extensions. In-process 
extensions consist of custom code that is run together with the product code in the same process. With out-of process 
extensions the custom code runs in a separate process. Traditionally it has been all in-process extensions. But in 
Content Services version 7.0 a shift has been made towards out-of-process extensions.

There are a number of reasons why out-of-process extensions are the preferred way to go these days:

* **Easier Upgrades**: Product upgrades are much more straight forward as the custom code is not running together with the 
product code. When custom code runs embedded you need to port all the custom code to the new version of the product before 
you can upgrade. That might not be an easy task, and if there has been major changes to the new product version it could 
be an extensive project. When all customizations live in external processes you can be much more confident that the upgrade 
will be successful and that it can be done on time. Out-of-process extensions are usually not affected by an upgrade as 
they use standard ReST APIs and event types. 
* **Stability and Security**: When customizations are embedded in the product code it's much more likely that the
stability of the product is compromised, and it's also more problematic to protect against security threats. 
* **Less complexity**: Developing customizations out-of-process, separate from the product code, will make it less complex 
as you don't have to think about the impact custom code might have on the product code. In the past it was 
also common for product code to be changed, making it very complex with simple upgrades impossible.  
* **Language choice**: When developing in-process extensions Java has to be used as the product is implemented in Java. 
With out-of-process extensions it is possible to use other languages, which might fit the development team better, resulting 
in increased productivity.  
* **Start/Stop requirement**: With in-process extensions you always have to stop the content server when installing a new 
version of the customization. This might not be a problem for smaller installations but in many cases it is not possible
to stop the service for a couple of hours. With out-of-process extensions you can upgrade the customizations completely 
separately and there is no need to stop the content server.  
* **Product support**: Product support sometimes have problems figuring out where a problem lies, in the product code or 
in the custom code. If they are separated it's much easier to see where the problem is and respond appropriately.

You can see why developing out-of-process extensions is the way to go, for more info see [SDK 5]({% link content-services/latest/develop/oop-sdk.md %}). 
However, there are certain customizations that still has to be done in-process, such as implementing a content model. 
Because of this it's useful to be familiar with both ways of developing customizations. Designing and implementing a 
content model is usually the first thing that needs to be done in most content management projects. So make sure to read 
through the [content model extension point]({% link content-services/latest/develop/repo-ext-points/content-model.md %}) 
documentation and then walk through the [content model tutorial]({% link content-services/latest/tutorial/platform/content-model.md %}). 
By implementing a content model you will get familiar with the in-process extension model and the associated 
[SDK 4]({% link content-services/latest/develop/sdk.md %}).

When you have the custom content model in place, providing types and aspects related to the project domain (i.e. finance,
healthcare, manufacturing etc), then you can move on with the logic and the user interface that will manipulate and present the 
content based on the custom content model. 

TODO:

Notes:

For the User Interface bit use Alfresco Application Development Framework

If workflow is needed use the Process Services product...





  

