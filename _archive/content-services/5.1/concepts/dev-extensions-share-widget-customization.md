---
author: Alfresco Documentation
---

# Customizing Surf Widget instantiation

Use this information to understand the mechanisms behind customizing widget instantiation.

## Introduction

It is possible to customize any part of Share by making changes to the Surf libraries and Share web scripts.

## Original implementation

The original implementations of the Share web scripts that instantiated client-side widgets have a common pattern:

1.  The widget is instantiated \(sometimes it is assigned to a variable\).
2.  The `${args.htmlid}` property is almost always passed as a single instantiation argument.
3.  A `.setOptions(..)` function call is chained to the instantiation call. The argument to this call is a single JavaScript object containing all the options to apply to the widget.
4.  A `.setMessages(..)` function call is chained to the result of the `.setOptions(..)` call

The main variables in this process are:

1.  The fully-qualified name of the widget instantiated
2.  The name of the variable that the widget is ultimately assigned to
3.  The options applied to the widget

Not all WebScripts are coded this way:

1.  Not all assign the widget to a variable
2.  Not all widgets are instantiated with a String as the sole argument
3.  Not all widgets have additional options applied to them
4.  Not all widgets have messages applied to them

A template JavaScript object that encapsulated all the metadata that represented the instantiation of a single widget and created a custom FreeMarker directive `<@createWidgets/>` that could process this object structure and output the JavaScript code that would perform the instantiation.

There are many web scripts, most commonly those that create dashlets, that instantiate more than one widget. Therefore any custom directive developed in the future would need to be able to process multiple metadata objects. Due to this the controller always adds the metadata objects to a list in the FreeMarker model.

So for example, if the following objects were constructed and set in the model:

```

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

```

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

-   `Alfresco.Widget1` has explicitly set all properties.
-   `Alfresco.Widget2` has taken all defaults.
-   `Alfresco.Widget3` has taken some defaults but has elected not to set options or messages.

Here is a list of the properties that can be set on widget instantiation:

-   **name**

    The fully qualified name of the JavaScript widget to be instantiated.

-   **assignTo \(optional\)**

    The name of the variable to assign to. Used if additional JavaScript is required to access the widget after instantiation. This can then be used in the post-instantiation JavaScript code.

-   **initArgs\(optional\)**

    The majority of widgets take just the unique id assigned to the outer <div\> element of the HTML fragment, but this can be changed by providing alternative arguments. This is limited to String values.

-   **useMessages \(optional: defaults to true\)**

    Indicates that the i18n messages associated with the WebScript should be passed to the widget by the `.setMessages()` function call.

-   **useOptions \(optional: defaults to true\)**

    Indicates that the options object should be passed to the widget by the `.setOptions()` function call.

-   **options \(optional: defaults to the empty object\)**

    An object containing all the options to pass to the widget in the `.setOptions()` function call.


## 4.2 style markup

The following code is from documentlist.get.html.ftl and illustrates how the 4.2 markup is used. All of the web script rendered components will adopt this template to introduce greater consistency.

```

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

1.  `css` declares the CSS files required for the web script
2.  `js` declares the JavaScript files required for the web script
3.  `widgets` is used for instantiating all the client-side JavaScript widgets
4.  `html` defines the HTML fragment that acts as the placeholder for the widget to anchor to.

By introducing a greater number of `<@markup>`directives into the template we make it easier to make finer-grained changes to the template; for example, to remove, replace or add new dependencies or to modify the HTML fragment.

## Directives

There are four directives being used in the templates that replace the `<@script>` macro that was used in previous versions of Share.

Surf is able to process dependencies added using the \*.html.ftl files by virtue of the extensibility model. Whereas before it would process all of the \*.head.ftl WebScript files to gather all the required CSS and JavaScript dependencies before generating the page output, the `<@script>` and `<@link>` directives add content into previously processed directives. This facility will ultimately allow us to disable this double-pass processing to improve page rendering performance \(although at the moment it is still enabled for backwards compatibility\).

The `<@createWidgets>` directive is used to generate all of the JavaScript required to instantiate the client-side widgets defined in the model setup by the web script's controller \(documentlist.get.js\) which contains the following code:

```

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

The call to `doclibCommon()` defined in the `documentlist.lib.js` library file implements the basic controller setup and the remainder of the code defines the metadata object to instantiate the `Alfresco.DocumentList` widget.

## Summary

Widget instantiation metadata is set in the JavaScript controller and rendered using a custom directive into the FreeMarker template.

**Parent topic:**[Surf Widgets](../concepts/dev-extensions-share-surf-widgets.md)

