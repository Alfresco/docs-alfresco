---
title: Introduction to Aikau
---

There are a number of updated UI framework features that were introduced in Alfresco One 4.2 and further expanded in later versions of Content Services. The updated UI framework goes by the name of Aikau.

## Goals

The main purpose of Aikau is to provide a library of widgets that can be easily assembled into a web application for
accessing a repository. The aim is not to replace Share but it was necessary to migrate away from its original
implementation, which was based around the Surf paradigms of pages, templates, components and web scripts, towards a
solution that provided for rapid development and customization.

While Share continues to be based primarily on the [YUI library](https://clarle.github.io/yui3/){:target="_blank"}, Aikau is based around
the [Dojo library](https://dojotoolkit.org/){:target="_blank"}.

The main goals of Aikau are:

* Provide a library of fine-grained, decoupled widgets that completely encapsulate all of their function, styling and localization behavior.
* To make it easy to unit test those widgets across multiple browsers.
* To reduce the complexity of Surf rendered pages by removing Page, Template and Component configurations and replacing them with pages defined by an easily customizable JSON model in the JavaScript controller of a single web script.
* To be able to dynamically build pages both for and within the running UI and render them without restarting any servers.
* To provide a foundation on which our business partners and customers can build their own solutions.

## Building on previous work

Between versions 4.0 to 4.2 there were significant enhancements to the Surf framework and deliberate refactoring of logic
from the FreeMarker template into the JavaScript controller of the Share web scripts. Improvements to page load
performance were achieved by reducing HTTP requests through the following methods:

* Using [MD5 checksums]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#surf-checksums) to allow browsers to safely cache resources indefinitely
* [Dynamically aggregating]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#aggregate) JavaScript and CSS dependencies into fewer resources
* [Encoding images]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#css) directly into CSS files.

All of these features are leveraged in the improvements and this makes it easier to produce faster, more reliable pages,
in less time for Alfresco Share web applications.

## Zero build

An important enhancement is a zero build approach. Surf is able to dynamically analyze the JSON model that defines the
page being rendered and resolve all JavaScript dependencies that are then compressed and written into a single JavaScript
resource that simulates a built Dojo layer. Surf caches all the dependency relationships as it finds them so it never
traverses a dependency path a second time. It also caches the individual layers it generates so although the very first
page rendered after server start up can take a few seconds to render, subsequent page rendering is much faster.

## Encapsulation

When you render a web you are normally expected to take care of the styling by using separately referenced CSS files.
For example, you might import a theme style sheet for the framework that you are using.

In the updated UI framework, each widget can optionally define its own CSS resources, including the ability to specify
different resources for different media types. If that widget is used on a page then Surf will automatically include
those CSS resources within a single aggregated CSS resource loaded on the page. The same principle is applied to
localization files so the use of a widget ensures that its National Language Support (NLS) properties automatically
built into a JavaScript resource loaded on the page. Widgets can scope their message bundles to ensure that there are
no collisions and the core message handling function is smart enough to work through all of the message scopes in a
widgets ancestry to ensure that the most specific message is displayed.

## Cross JavaScript library support

Although Share was originally built using YUI2, JQuery plugins have also been introduced and it can not be restricted
to using Dojo. The UI framework is designed to easily support widgets provided by other libraries and by design it is
possible to swap out Dojo widgets for those provided by other libraries. A mechanism exists for wrapping our existing
YUI2-centric widgets to that they can be referenced in the JSON model for the page. The Calendar of any Share site uses
a combination of the YUI2, JQuery and Dojo libraries.

## Continued extensibility

One of Share's greatest strengths is its ability to be easily customized. This is something that has been enhanced over
the last few releases. A significant improvement was to make it easier to
[customize the client-side widgets that are instantiated]({% link content-services/7.2/develop/share-ext-points/surf-widgets.md %}#customizesurfwidgetinit)
on each page by customizing the JavaScript controller of a Component's web script. It is also possible to customize
the numerous fine-grained widgets that comprise a page or Component. Widgets can be reconfigured, added or removed
easily and because the widgets are decoupled (such that they do not rely on the existence of other widgets) making
changes will not cause any errors.

## Aikau use in Share

The library of Aikau widgets continues to grow. The following components are already implemented using Aikau:

* Header
* Live Search
* Filtered Search Page
* Search Management Page
* Site Management Page
* Analytics and Reporting Widgets
* Page Creator
* Document List Prototype

## Aikau GitHub project

Aikau is available as an open-source [project on GitHub](https://github.com/Alfresco/Aikau){:target="_blank"}.

## Aikau Tutorial

A comprehensive Aikau tutorial is [available on GitHub](https://github.com/Alfresco/Aikau/tree/master/tutorial/chapters/About.md){:target="_blank"}.

## Aikau widget library documentation

The documentation for the Aikau widget library can be found [on the Developer web site](http://dev.alfresco.com/resource/docs/aikau-jsdoc/){:target="_blank"}.
