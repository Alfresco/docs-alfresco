---
title: Surf Widgets Extension Point
---

The Share web application is built up of a main menu, pages, and dashlets. The pages and dashlets are mainly processed 
on the server side as web scripts. When client side processing is needed in the form of browser JavaScript and CSS then 
this is contained in Widgets. The Surf Widgets uses the Yahoo UI library as JavaScript framework and widget library. 
These widgets will eventually be replaced by Aikau Widgets.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

We are going to look at implementing a custom Surf widget. To do this we will implement a very simple Hello World Dashlet 
that uses a Surf Widget.

Creating a Surf Dashlet is the same thing as creating a Surf Web Script. Before continuing read through the 
[Surf Web Scripts section]({% link content-services/7.2/develop/share-ext-points/web-scripts.md %}). The Dashlet will contain a Button that when clicked 
shows a message. The click handler and pop-up message will be handled by the Surf widget.

The finished Dashlet will look something like this:

![dev-extensions-share-user-dashboard-helloworld-dashlet]({% link content-services/images/dev-extensions-share-user-dashboard-helloworld-dashlet.png %})

When the user clicks the "Click Me!" button it will display a message in grey that fades away. If you hover over the 
Dashlet it will show a "?" for help in the toolbar. It will also be possible to resize the Dashlet. The Web Script 
controller looks like this:

```javascript
// Dashlet widgets
var widgets = [];

// Main component
widgets.push({
    id: "HelloWorld",
    name: "MyCompany.dashlet.HelloWorld",
    options: {
        componentId: instance.object.id
    }
});

// Resizer
widgets.push({
    id : "DashletResizer",
    name : "Alfresco.widget.DashletResizer",
    initArgs : ["\"" + args.htmlid + "\"","\"" + instance.object.id + "\""],
    useMessages: false
});

// Title bar actions
var actions = [];
actions.push({
    cssClass: "help",
    bubbleOnClick:
    {
        message: msg.get("dashlet.help")
    },
    tooltip: msg.get("dashlet.help.tooltip")
});
widgets.push({
    id : "DashletTitleBarActions",
    name : "Alfresco.widget.DashletTitleBarActions",
    useMessages : false,
    options : {
        actions: actions
    }
});

model.widgets = widgets;   
```

The controller will put together a list of Spring Surf widgets that we can use. The first one is called 
`MyCompany.dashlet.HelloWorld` and this is the custom widget that we need to implement.

Here is the implementation of the Hello World widget:

```javascript
/**
 * MyCompany root namespace.
 *
 * @namespace MyCompany
 */
if (typeof MyCompany == "undefined" || !MyCompany) {
    var MyCompany = {};
}

/**
 * MyCompany dashlet namespace.
 *
 * @namespace MyCompany.dashlet
 */
if (typeof MyCompany.dashlet == "undefined" || !MyCompany.dashlet) {
    MyCompany.dashlet = {};
}

/**
 * Sample Hello World dashboard component.
 *
 * @namespace MyCompany.dashlet
 * @class MyCompany.dashlet.HelloWorld
 * @author
 */
(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;

    /**
     * Alfresco Slingshot aliases
     */
    var $html = Alfresco.util.encodeHTML,
        $combine = Alfresco.util.combinePaths;


    /**
     * Dashboard HelloWorld constructor.
     *
     * @param {String} htmlId The HTML id of the parent element
     * @return {MyCompany.dashlet.HelloWorld} The new component instance
     * @constructor
     */
    MyCompany.dashlet.HelloWorld = function HelloWorld_constructor(htmlId) {
        return MyCompany.dashlet.HelloWorld.superclass.constructor.call(this, "MyCompany.dashlet.HelloWorld", htmlId);
    };

    /**
     * Extend from Alfresco.component.Base and add class implementation
     */
    YAHOO.extend(MyCompany.dashlet.HelloWorld, Alfresco.component.Base,
        {
            /**
             * Object container for initialization options
             *
             * @property options
             * @type object
             */
            options: {},

            /**
             * Fired by YUI when parent element is available for scripting
             *
             * @method onReady
             */
            onReady: function HelloWorld_onReady() {
                this.widgets.testButton = Alfresco.util.createYUIButton(this, "testButton", this.onButtonClick);
            },

            /**
             * Button click event handler
             *
             * @method onButtonClick
             */
            onButtonClick: function HelloWorld_onButtonClick(e) {
                Alfresco.util.PopupManager.displayMessage(
                    {
                        text: "Button clicked in Hello World Dashlet!"
                    });
            }
        });
})();   
```

This widget will create a YUI button and attach it to the element in the UI with the `testButton` id. The UI markup 
looks like this in the Web Script template:

```xml
<#-- JavaScript Dependencies -->
<@markup id="js">
    <@script type="text/javascript" src="${url.context}/res/components/dashlets/helloworld.js" group="dashlets"/>
</@>

<#-- Stylesheet Dependencies
<@markup id="css">
    <@link rel="stylesheet" type="text/css" href="${url.context}/res/components/dashlets/helloworld.css" group="dashlets"/>
</@>
-->

<#-- Widget creation -->
<@markup id="widgets">
    <@createWidgets group="dashlets"/>
</@>

<@markup id="html">
    <@uniqueIdDiv>
        <#assign el = args.htmlid?html>
        <#assign dashboardconfig=config.scoped['Dashboard']['dashboard']>

        <div class="dashlet">
            <div class="title">
            ${msg("hello.world.dashletTitle")}
            </div>
            <div class="body">
                <button id="${el}-testButton">${msg('hello.world.buttonLabel')}</button>
            </div>
        </div>
    </@>
</@>
```

Now, to create a Dashlet Web Script you also need a descriptor, which is defined in XML and looks something like this:

```xml
<webscript>
    <shortname>Hello World</shortname>
    <description>Hello World Dashlet</description>
    <family>dashlet</family>
    <url>/components/dashlets/helloworld</url>
</webscript>   
```

Here we are not using any custom client side CSS. Instead we use out-of-the-box styling. In the markup you will see 
references to i18n labels such `${msg("hello.world.buttonLabel")}`. These messages are defined in the Web Script properties 
file as follows:

```text
hello.world.dashletTitle=Hello World
hello.world.buttonLabel=Click Me!
```

## Customizing Surf Widget instantiation {#customizesurfwidgetinit}

Use this information to understand the mechanisms behind customizing widget instantiation. It is possible to customize 
any part of Share by making changes to the Surf libraries and Share web scripts.

### Original implementation

The original implementations of the Share web scripts that instantiated client-side widgets have a common pattern:

1.  The widget is instantiated (sometimes it is assigned to a variable).
2.  The `${args.htmlid}` property is almost always passed as a single instantiation argument.
3.  A `.setOptions(..)` function call is chained to the instantiation call. The argument to this call is a single JavaScript object containing all the options to apply to the widget.
4.  A `.setMessages(..)` function call is chained to the result of the `.setOptions(..)` call

The main variables in this process are:

1.  The fully-qualified name of the widget instantiated
2.  The name of the variable that the widget is ultimately assigned to
3.  The options applied to the widget

Not all web scripts are coded this way:

1.  Not all assign the widget to a variable
2.  Not all widgets are instantiated with a String as the sole argument
3.  Not all widgets have additional options applied to them
4.  Not all widgets have messages applied to them

A template JavaScript object that encapsulated all the metadata that represented the instantiation of a single widget 
and created a custom FreeMarker directive `<@createWidgets/>` that could process this object structure and output the 
JavaScript code that would perform the instantiation.

There are many web scripts, most commonly those that create dashlets, that instantiate more than one widget. Therefore 
any custom directive developed in the future would need to be able to process multiple metadata objects. Due to this 
the controller always adds the metadata objects to a list in the FreeMarker model.

So for example, if the following objects were constructed and set in the model:

```javascript
widgets: [
   {
      name: "Alfresco.Widget1",
      assignTo: "w1",
      initArgs: [ "x", "y" ],
      useMessages: true,
      useOptions: true,
      options: {
         option1: "one",
         option2: two
      }
   },
   {
      name: “Alfresco.Widget2”
   },
   {
      name: “Alfresco.Widget3”,
      useOptions: false,
      useMessages: false
   }
]
```

This would result in the following JavaScript output:

```xml
<script type="text/javascript">
   var w1 = new Alfresco.Widget1("w", "y").setMessages(${messages}).setOptions({
   option1: "one",
   option2: "two"
   });
   new Alfresco.Widget2(${args.htmlId}).setMessages(${messages});
   new Alfresco.Widget3(${args.htmlId});
</script>

```

In the example it has been possible to control exactly how each widget is instantiated:

* `Alfresco.Widget1` has explicitly set all properties.
* `Alfresco.Widget2` has taken all defaults.
* `Alfresco.Widget3` has taken some defaults but has elected not to set options or messages.

Here is a list of the properties that can be set on widget instantiation:

* `name`: The fully qualified name of the JavaScript widget to be instantiated.
* `assignTo (optional)`: The name of the variable to assign to. Used if additional JavaScript is required to access the widget after instantiation. This can then be used in the post-instantiation JavaScript code.
* `initArgs(optional)`: The majority of widgets take just the unique id assigned to the outer `<div>` element of the HTML fragment, but this can be changed by providing alternative arguments. This is limited to String values.
* `useMessages (optional: defaults to true)`: Indicates that the i18n messages associated with the WebScript should be passed to the widget by the `.setMessages()` function call.
* `useOptions (optional: defaults to true)`: Indicates that the options object should be passed to the widget by the `.setOptions()` function call.
* `options (optional: defaults to the empty object)`: An object containing all the options to pass to the widget in the `.setOptions()` function call.

### 4.2 style markup

The following code is from `documentlist.get.html.ftl` and illustrates how the 4.2 markup is used. All of the web script 
rendered components will adopt this template to introduce greater consistency.

```xml
<#include "include/documentlist.lib.ftl" />
<#include "../form/form.dependencies.inc">

<@markup id="css">
   <#-- CSS Dependencies -->
   <@link rel="stylesheet" href="${url.context}/res/components/documentlibrary/documentlist.css" group="documentlibrary"/>
</@>

<@markup id="js">
   <#-- JavaScript Dependencies -->
   <@script type="text/javascript" src="${url.context}/res/components/documentlibrary/documentlist.js" group="documentlibrary"/>
</@>

<@markup id="widgets">
   <@createWidgets group="documentlibrary"/>
</@>

<@uniqueIdDiv>
   <@markup id="html">
      <@documentlistTemplate/>
   </@>
</@>
```

The template is divided into six separate `<@markup>` directives:

1. `css` declares the CSS files required for the web script
2. `js` declares the JavaScript files required for the web script
3. `widgets` is used for instantiating all the client-side JavaScript widgets
4. `html` defines the HTML fragment that acts as the placeholder for the widget to anchor to.

By introducing a greater number of `<@markup>`directives into the template we make it easier to make finer-grained 
changes to the template; for example, to remove, replace or add new dependencies or to modify the HTML fragment.

### Directives

There are four directives being used in the templates that replace the `<@script>` macro that was used in previous 
versions of Share.

Surf is able to process dependencies added using the `*.html.ftl` files by virtue of the extensibility model. Whereas 
before it would process all of the `*.head.ftl` WebScript files to gather all the required CSS and JavaScript dependencies 
before generating the page output, the `<@script>` and `<@link>` directives add content into previously processed directives. 
This facility will ultimately allow us to disable this double-pass processing to improve page rendering performance 
(although at the moment it is still enabled for backwards compatibility).

The `<@createWidgets>` directive is used to generate all of the JavaScript required to instantiate the client-side 
widgets defined in the model setup by the web script's controller (`documentlist.get.js`) which contains the following code:

```javascript
<import resource="classpath:/alfresco/site-webscripts/org/alfresco/components/documentlibrary/include/documentlist.lib.js">

doclibCommon();

function main()
{

   var documentList = {
      id : "DocumentList",
      name : "Alfresco.DocumentList",
      options : {
         siteId : (page.url.templateArgs.site != null) ? page.url.templateArgs.site : "",
         containerId : template.properties.container != null ? template.properties.container : "documentLibrary",
         rootNode : model.rootNode != null ? model.rootNode : "null",
         usePagination : args.pagination != null ? args.pagination : false,
         sortAscending : model.preferences.sortAscending != null ? model.preferences.sortAscending : true,
         sortField : model.preferences.sortField != null ? model.preferences.sortField : "cm:name",
         showFolders : model.preferences.showFolders != null ? model.preferences.showFolders : true,
         simpleView : model.preferences.simpleView != null ? model.preferences.simpleView : "null",
         viewRendererName : model.preferences.viewRendererName != null ? model.preferences.viewRendererName : "detailed",
         viewRendererNames : model.viewRendererNames != null ? model.viewRendererNames : ["simple", "detailed"],
         highlightFile : page.url.args["file"] != null ? page.url.args["file"] : "",
         replicationUrlMapping : model.replicationUrlMapping != null ? model.replicationUrlMapping : "{}",
         repositoryBrowsing : model.repositoryBrowsing != null,
         useTitle : model.useTitle != null ? model.useTitle : true,
         userIsSiteManager : model.userIsSiteManager != null ? model.userIsSiteManager : false
      }
   };

   if (model.repositoryUrl != null)
   {
      documentList.options.repositoryUrl = model.repositoryUrl;
   }
   
   model.widgets = [documentList];
}

main();
```

The call to `doclibCommon()` defined in the `documentlist.lib.js` library file implements the basic controller setup and 
the remainder of the code defines the metadata object to instantiate the `Alfresco.DocumentList` widget.

To sum it up, widget instantiation metadata is set in the JavaScript controller and rendered using a custom directive 
into the FreeMarker template.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/site-webscripts` (Untouched by re-deployments and upgrades)
* `tomcat/webapps/share/components` (when web resources are included you need to put them directly into the exploded webapp, this is **NOT** recommended.)

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/alfresco/web-extension/site-webscripts/{custom path}`
* `aio/share-jar/src/main/resources/META-INF/resources/share-jar/components` (when web resources such as CSS and JS are included)

## Sample Code

* [Custom Surf Pages, Surf Dashlets, and Surf Web Scripts](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-surf-dashlet-and-page-share){:target="_blank"}

## Tutorials

* [Customizing Surf Widget Instantiation]({% link content-services/7.2/tutorial/share/doclib.md %}#customizesurfwidget)

## Alfresco Developer Blogs

* [Display pop-up a message every time that a Document Library filter is changed](https://hub.alfresco.com/t5/alfresco-content-services-blog/customizing-share-javascript-widget-instantiation-part-1/ba-p/292916){:target="_blank"}
* [The technique behind customizing Share widgets](https://hub.alfresco.com/t5/alfresco-content-services-blog/customizing-share-javascript-widget-instantiation-part-2/ba-p/292988){:target="_blank"}
* [Referencing JavaScript objects declared in the FreeMarker template in the widget instantiation metadata](https://hub.alfresco.com/t5/alfresco-content-services-blog/customizing-share-javascript-widget-instantiation-part-3/ba-p/293009){:target="_blank"}
* [More on FreeMarker directives affecting widget instantiation](https://hub.alfresco.com/t5/alfresco-content-services-blog/customizing-share-javascript-widget-instantiation-part-4/ba-p/292998){:target="_blank"}
