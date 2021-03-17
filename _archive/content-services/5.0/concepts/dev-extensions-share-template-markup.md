---
author: Alfresco Documentation
---

# Template markup

This topic describes additional FreeMarker template directives.

## Introduction

In the [widget instantiation customization tutorial](../tasks/dev-extensions-share-tutorials-customizing-widget-instantiation.md) the documentlist.get.html.ftl and documentlist.get.js files were modified to instantiate a custom JavaScript widget that extends the default `Alfresco.DocumentList`. This is a fragment from the webview.get.html.ftl file:

```

<@markup id="widgets">
   <@inlineScript group="dashlets">var editDashletEvent = new YAHOO.util.CustomEvent("onDashletConfigure"); </@> 
   <@createWidgets group="dashlets"/> 
   <@inlineScript group="dashlets"> editDashletEvent.subscribe(webView.onConfigWebViewClick, webView, true); </@> 
</@>
```

Note that another new FreeMarker directive is being used: `<@inlineScript>` - this directive is used to demarcate sections of JavaScript to be included on the rendered HTML page but allows the specified script to be moved around the page or into aggregated generated resource files.

## Setting Object References

This extra code is required in this web script to create a custom event that is triggered when a user clicks on a button in the title bar. The `<@createWidgets>` directive is able to pass a reference to the `editDashletEvent` object by way of a special data structure that can be used when creating the instantiation metadata in the JavaScript controller.

The problem is that when creating the model it is impossible to distinguish between a primitive String and a String that is a reference to a JavaScript variable defined in the FreeMarker template, because the controller has no awareness of that variable \(the JavaScript controller is processed before the FreeMarker template\).

To work around this problem the webview.get.js controller sets a reference by including the following object to the widget's `options` metadata object:

```
eventOnClick: { _alfValue : "editDashletEvent", _alfType: "REFERENCE"},
```

When the `<@createWidgets>` directive encounters a JSON object with the attributes `_alfValue` and `_alfType`, and *only* those attributes, it converts that object into a variable reference instead of a String.

## Generated JavaScript

The source for the generated page will contain the following:

```

      <script>//<![CDATA[ var editDashletEvent = new YAHOO.util.CustomEvent("onDashletConfigure"); //]]></script> 
      <script type="text/javascript">//&lt;![CDATA[ var webView=new Alfresco.dashlet.WebView("page_x002e_component-1-2_x002e_site_x007e_site1_x007e_dashboard_x0023_default").setOptions({"webviewTitle":"","webviewURI":"/share/page/webview-default","isDefault":true,"webviewHeight":"","componentId":"page.component-1-2.site~site1~dashboard#default"}).setMessages({"label.noWebPage": "No web page to display.", "dashlet.help": "<p>This dashlet shows the website of your choice. Click the edit icon on the dashlet to change the web address.</p><p>Clicking the dashlet title opens the website in a separate window.</p>", "label.header": "Web View"}); new Alfresco.widget.DashletResizer("page_x002e_component-1-2_x002e_site_x007e_site1_x007e_dashboard_x0023_default", "page.component-1-2.site~site1~dashboard#default"); new Alfresco.widget.DashletTitleBarActions("page_x002e_component-1-2_x002e_site_x007e_site1_x007e_dashboard_x0023_default").setOptions({"actions":[{"eventOnClick":editDashletEvent,"cssClass":"edit","tooltip":"dashlet.edit.tooltip"},{"bubbleOnClick":{"message":"dashlet.help"},"cssClass":"help","tooltip":"dashlet.help.tooltip"}]}); //]]></script> <script type="text/javascript">//<![CDATA[ editDashletEvent.subscribe(webView.onConfigWebViewClick, webView, true); //]]></script> 
   
```

Contained in the script for the `Alfresco.widget.DashletTitleBarActions` widget is the following call to the `.setOptions()` function:

```
.setOptions({ "actions": [{ "eventOnClick" : editDashletEvent, "cssClass" : "edit", "tooltip" : "dashlet.edit.tooltip" }, { "bubbleOnClick": { "message" : "dashlet.help" }, "cssClass" : "help", "tooltip" : "dashlet.help.tooltip" } ] });
```

Note that the `eventOnClick` attribute is being set as an object reference and not a String.

## Summary

This topic has explained how to address the issue of referencing JavaScript objects declared in the FreeMarker template in the widget instantiation metadata, and the reason for the "pre" and "post" `<@markup>` directives in the new boiler-plate template.

**Parent topic:**[Surf Pages](../concepts/dev-extensions-share-surf-pages.md)

