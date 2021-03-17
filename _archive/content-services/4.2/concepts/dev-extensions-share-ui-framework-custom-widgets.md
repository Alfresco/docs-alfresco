---
author: Alfresco Documentation
---

# Custom Share Widgets

This topic describes how to create a simple widget that is defined by its own template, CSS and localization resources.

Ideally you should have an understanding of the Dojo toolkit \(1.7+\) and the \(AMD\) pattern.

## Introduction

The Asynchronous Module Definition \(AMD\) pattern is a method of defining small JavaScript resources for which you can declare dependencies. Your AMD framework for example, Dojo or `require.js`, will be able to dynamically request those dependencies as they are identified. This can result in a large number of HTTP requests from the browser but this can be avoided by building resource *layers* containing multiple modules. Surf avoids this problem by dynamically performing dependency analysis to avoid both excessive HTTP requests and the necessity for a build. As well as the benefits of a well-defined dependency network, AMD also provides enhanced security by avoiding pollution of the global context so that the module code cannot easily be manipulated by malicious attacks.

## Modules and Packages

Each widget is considered a module and modules are located relative to the package in which they live. The package is defined as the first element in the module identifier \(MID\) so the `alfresco/logo/Logo` widget can be found in the `alfresco` package. Package locations are defined in the configuration used to bootstrap Dojo, but Surf will take care of that for you. The Surf `web-framework` configuration element defines the core packages of `dojo`, `dijit`, `dojox` and `surf`. Share augments these with the `alfresco` package. Look in the <webapps\>/share/WEB-INF/surf.xml file and you will see the following code:

```

   
   <dojo-pages>
      <bootstrap-file>/res/js/lib/dojo-1.8.3/dojo/dojo.js</bootstrap-file>
      <page-widget>alfresco/core/Page</page-widget>
      <base-url>/res/</base-url>
      <packages>
         <package name="dojo" location="js/lib/dojo-1.8.3/dojo"/>
         <package name="dijit" location="js/lib/dojo-1.8.3/dijit"/>
         <package name="dojox" location="js/lib/dojo-1.8.3/dojox"/>
         <package name="alfresco" location="js/alfresco"/>
      </packages>
   </dojo-pages>
   

```

-   `bootstrap-file` defines the version of Dojo to be used
-   `base-url` defines where all packages are relative to
-   `page-widget` is the name of the widget to use to construct the page
-   `packages` defines the map of packages

If you want to use your own package then this is where you define it.

## Creating Your First Widget

You will now see how to add a new widget to the `alfresco` package. Widgets in this package can be found under `<webapps>/share/js/alfresco`. Add a new folder called `blog` in that location and then add the following files:

MyWidget.js

```

         define(["dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./MyWidget.html",
   "alfresco/core/Core"], function(declare, _Widget, _Templated, template, Core) {
      return declare([_Widget, _Templated, Core], {
         cssRequirements: [{cssFile:"./MyWidget.css",mediaType:"screen"}],
         i18nScope: "BlogExamples",
         i18nRequirements: [{i18nFile: "./MyWidget.properties"}],
         templateString: template,
         buildRendering: function alfresco_blog_MyWidget__buildRendering() {
            this.greeting = this.message("greeting.label");
            this.inherited(arguments);
         }
      });
   });

      
```

MyWidget.html

```
<div class="blog-example-widget">${greeting}</div>
```

MyWidget.css

```
.blog-example-widget {
padding: 10px;
color: orange;
font-weight: bold;
}
```

MyWidget.properties

```
greeting.label=Hello
```

MyWidget\_fr.properties

```
greeting.label=Bonjour
```

Update the JavaScript controller of the WebScript described [in the previous topic](dev-extensions-share-page-creation.md) to the following:

```
model.jsonModel = {
widgets: [{
name: "alfresco/blog/MyWidget"
}
]};
```

Refresh the WebScripts and reload the page and you will see the custom widget displayed in English.

Switch your browser into the French locale and refresh and you will see the custom widget displayed in French.

Although your widget is made up of multiple files, all of them are linked together through the main JavaScript module that gets included in the JSON model of the page. The CSS and template is automatically pulled into the page and the correct i18n properties file is used for the requested locale \(and only the i18n properties of the browser locale are loaded into the page\).

This approach is particularly advantageous for complex pages with multiple widgets. Pages can be created from JSON models, using third-party widgets, without needing to be concerned with coding, localization and styling.

## Understanding the Code

The most important thing to understand in the JavaScript file is the mapping between each declared dependency \(in the array argument of the `define` function\) and the variable that it maps to in the callback function \(that is the second argument of the `define` function\).

The `define` function returns a module which is instantiated by the `declare` function. The declare function takes an array of modules to inherit from and an object that defines the module. It also helps to understand the standard Dojo widget lifecyle.

While use of the Dojo modules is optional, it contains many utilities and widgets that you can extend or include in your own code. Non-AMD dependencies can also be included in your widgets.

The breakdown of the example widget's attributes are:

-   `cssRequirements` - an array of CSS files to include in any page that uses the widget. You can specify multiple files and can specify different files for different media types. There is no need to include CSS files required by extended or mixed in widgets as Surf will automatically include them.
-   `i18nRequirements` - an array of the i18n properties files that the widget should have access to.
-   `i18nScope` - an identifier for where to store the properties in the page. This can be used to prevent widgets overriding each other's properties.
-   `templateString` - this should be set to the variable assigned with the HTML dependency \(as has been done in the example\). See the Dojo documentation for a more detailed explanation.
-   `buildRendering` - this is one of the Dojo widget lifecyle functions. The default implementation has been extended to get the localized message to set in the template.

## `alresco/core/Core`

One of the strengths of Dojo is its inheritance model. This allows your widget to directly extend another module and then *mixin* the capabilities of others. When you create a custom widget you should always mix in the `alfresco/core/Core` module. This module provides a number of useful functions and the one used in our example widget is the `message` function which is used to set the `greeting` attribute. This function will search through all the appropriate i18n scopes to try and map the supplied key to the translated message. If you do not mix in the `alfresco/core/Core` module then you will not be able to access the widgets i18n properties correctly.

## Suggested Further Reading

In addition to the linked articles, the following are recommended reading:

-   [Modern Dojo](http://dojotoolkit.org/documentation/tutorials/1.8/modern_dojo/)
-   [Modules](http://dojotoolkit.org/documentation/tutorials/1.7/modules/)
-   [Declare](http://dojotoolkit.org/documentation/tutorials/1.8/declare/)
-   [Templated](http://dojotoolkit.org/documentation/tutorials/1.8/templated/)

For jQuery developers the following links are recommended:

-   [Why Dojo?](http://dojotoolkit.org/reference-guide/1.7/quickstart/introduction/whydojo.html)
-   [Using query](http://dojotoolkit.org/documentation/tutorials/1.8/using_query/)
-   [DOM functions](http://dojotoolkit.org/documentation/tutorials/1.8/dom_functions/)

**Parent topic:**[Share extensions](../concepts/dev-extensions-share.md)

