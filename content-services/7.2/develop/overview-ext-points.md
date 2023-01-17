---
title: Overview of Extension Points
---

The Content Services product has always been very easy to extend and customize so it can manage content from 
different types of domains, such as healthcare, finance, government, insurance, and manufacturing. This is supported by 
so called *Extension Points*. An extension point is a supported interface that can be used to customize the product.

The extension points can be divided into Out-of-process extension points and In-process extension points.
 
## Out-of-process extension points
The new [event system]({% link content-services/7.2/develop/oop-ext-points/events.md %}) in Content Services 7 enables 
out-of-process extensions. To support the event system a [ReST API Java Wrapper]({% link content-services/7.2/develop/oop-ext-points/rest-api-java-wrapper.md %}) 
is provided for easy development of extensions from Java applications.

You should get familiar with the [SDK 5]({% link content-services/7.2/develop/oop-sdk.md %}) as it is 
the recommended way of developing out-of-process extensions.

## In-process extension points
The in-process extension points can be divided further into server side extensions for the Platform, also referred to as 
Repository, and UI extensions for the web client called Share. To get started see [Platform extensions overview]({% link content-services/7.2/develop/repo-ext-points/index.md %})
and [Share extensions overview]({% link content-services/7.2/develop/share-ext-points/index.md %}).

Also, you should get familiar with [SDK 4]({% link content-services/7.2/develop/sdk.md %}) as it is 
the recommended way of developing in-process extensions.

