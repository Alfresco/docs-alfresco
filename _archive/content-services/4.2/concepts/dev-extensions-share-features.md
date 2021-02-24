---
author: Alfresco Documentation
---

# Updated UI framework in 4.2

This topic describes the updated UI framework features for 4.2.

## Goals

The main purpose of the updated UI framework is to provide a library of widgets that can be easily assembled into a web application for accessing an Alfresco repository. The aim is not to replace Share but it was necessary to migrate away from its original implementation, which was based around the Surf paradigms of templates, components and web scripts, towards a solution that provided for rapid development and customization.

While Share continues to be based primarily on the [YUI library](http://yuilibrary.com/), the updated UI framework is based around the [Dojo library](http://dojotoolkit.org/). Share however uses the updated framework to implement the title bar.

The main goals of the UI framework are:

-   Provide a library of fine-grained, decoupled widgets that completely encapsulate all of their function, styling and localization behaviour
-   To make it easy to unit test those widgets across multiple browsers
-   To reduce the complexity of Surf rendered pages by removing Page, Template and Component configurations and replacing them with pages defined by an easily customisable JSON model in the JavaScript controller of a single web script
-   To be able to dynamically build pages both for and within the running UI and render them without restarting any servers
-   To provide a foundation on which our business partners and customers can build their own solutions

## Building on Previous Work

Those of you that have been following the changes in Share from version 4.0 to 4.2 will have noticed significant enhancements to the Surf framework and the deliberate refactoring of logic from the FreeMarker template into the JavaScript controller of the Share WebScripts. Improvements to page load performance have also been achieved by reducing HTTP requests through the following methods:

-   Using [MD5 checksums](dev-extensions-share-surf-checksums.md) to allow browsers to safely cache resources indefinitely
-   [Dynamically aggregating](dev-extensions-share-aggregate-dependencies.md) JavaScript and CSS dependencies into fewer resources
-   [Encoding images](dev-extensions-share-css-data-image-support.md) directly into CSS files.

All of these features are leveraged in the improvements and this makes it easier to produce faster, more reliable pages, in less time for the Alfresco Share and the Alfresco in the Cloud web applications.

## Zero Build

An important enhancement is a zero build approach. Surf is able to dynamically analyse the JSON model that defines the page being rendered and resolve all JavaScript dependencies that are then compressed and written into a single JavaScript resource that simulates a built Dojo layer. Surf caches all the dependency relationships as it finds them so it never traverses a dependency path a second time. It also caches the individual layers it generates so although the very first page rendered after server start up may take a few seconds to render, subsequent page rendering is much faster.

## Encapsulation

When you render a web you are normally expected to take care of the styling via separately referenced CSS files. For example, you might import a theme style sheet for the framework that you are using.

In the updated UI framework, each widget can optionally define its own CSS resources, including the ability to specify different resources for different media types. If that widget is used on a page then Surf will automatically include those CSS resources within a single aggregated CSS resource loaded on the page. The same principle is applied to localization files so the use of a widget ensures that its National Language Support \(NLS\) properties automatically built into a JavaScript resource loaded on the page. Widgets can scope their message bundles to ensure that there are no collisions and the core message handling function is smart enough to work through all of the message scopes in a widgets ancestry to ensure that the most specific message is displayed.

## Cross JavaScript Library Support

Although Share was originally built using YUI2 , JQuery plugins have also been introduced and Share will not be restricted to using Dojo. The UI framework is designed to easily support widgets provided by other libraries and by design it is possible to swap out Dojo widgets for those provided by other libraries. A mechanism exists for wrapping our existing YUI2-centric widgets to that they can be referenced in the JSON model for the page. The Calendar of any Share Site uses a combination of the YUI2, JQuery and Dojo libraries.

## Continued Extensibility

One of Share's greatest strengths is its ability to be easily customized. This is something that has been enhanced over the last few releases. A significant improvement was to make it easier to [customize the client-side widgets that are instantiated](dev-extensions-share-widget-customization.md) on each page by customizing the JavaScript controller of a Component's web script. It is also possible to customize the numerous fine-grained widgets that comprise a page or Component. Widgets can be reconfigured, added or removed easily and because the widgets are decoupled \(such that they do not rely on the existence of other widgets\) making changes will not cause any errors.

## Updated UI framework use in Share

These new capabilities have been used to build a header bar to accompany the "Light" theme that arrived in 4.2 Community. However, this is the first step along a longer path towards larger improvements of Alfresco Share. Our library of widgets currently only consists of the handful required to construct our header \(but already allow you to build your own header or customize the default one without writing a line of JavaScript, CSS or HTML\) but as new capabilities are added to Share this widget library will continue to grow.

**Parent topic:**[Share extensions](../concepts/dev-extensions-share.md)

