---
title: Useful tools
---

There are a few tools that are useful to know about when developing customizations for the Share web application.

## FireBug

Firebug is a debugging tool/plug-in for the Firefox web browser.

### Installation

Firefox does not come with Firebug installed by default, you need to install it manually. To do that navigate to this 
[page](https://addons.mozilla.org/en-US/firefox/addon/firebug-and-web-development/){:target="_blank"} with Firefox, and 
click on the **+Add to Firefox** button.

### Introduction

Once the Firebug plug-in has been installed in Firefox we can activate and use it. To activate the plug-in click on the 
Firebug icon in the Add-ons toolbar in the upper right corner of the browser window. See the following picture:

![dev-extensions-share-tools-firebug-enable]({% link content-services/images/dev-extensions-share-tools-firebug-enable.png %})

When Firebug is enabled the browser window will be split into two sections, one for the web page we are working with, 
and one for the Firebug application. See the following picture:

![dev-extensions-share-tools-firebug-window]({% link content-services/images/dev-extensions-share-tools-firebug-window.png %})

Firebug will display the **Script** tab by default so you can directly list all the JavaScript files used by currently 
loaded web page. The following figure shows some of the scripts loaded by the Dashboard page (the list appears if you 
click on the dojo.js file name):

![dev-extensions-share-tools-firebug-scripts]({% link content-services/images/dev-extensions-share-tools-firebug-scripts.png %})

Here you will notice that all the Content Services-related JavaScript files have big numbers in their file names. 
For example, the `my-sites.js` file is not just called that but instead something like `my-sites_0500545812b99c1ed156728185c19b24.js`. 
This is because the Spring Surf framework includes a checksum in the file name so it is more stable during upgrades of the software. 

### Finding out which Web Script(s) are behind a page

One common task during Share extension development is to find out what web script that is used for a specific functionality 
in the user interface, such as file upload.

Instead of guessing for a while it is better to load the page that contains the functionality we are working with, and 
then inspect the JavaScript files that are loaded. Often you can deduct what web script that is used by looking at the 
names of the JavaScript files, as they are often similar to the web script file names.

Let's take the file upload as an example, how could we find the web script related to it? Start by navigating to a folder. 
From the User Dashboard click the **Repository** menu item in the top level menu. Then click on the **Guest Home** folder. 
You should now see the following window:

![dev-extensions-share-tools-firebug-folder-view]({% link content-services/images/dev-extensions-share-tools-firebug-folder-view.png %})

With Firebug enabled click on the **Upload** toolbar item. Firebug should now provide the list of script used by the 
upload page. See the following picture:

![dev-extensions-share-tools-firebug-file-upload-scripts]({% link content-services/images/dev-extensions-share-tools-firebug-file-upload-scripts.png %})

In this case I have scrolled down a bit in the script list until I came across JavaScript files called something related 
to file upload, such as `dnd-upload_xxx.js`, `file-upload_xxx.js`, `flash-upload_xxx.js`, and `html-upload_xxx.js`.

So if we are using Flash upload then we could start searching the file system for matching web script files. We would 
search the exploded webapps as follows:

```bash
martin@gravitonian:/opt/alfresco501/tomcat$ find . -name "flash-upload*.xml"
   ./webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/upload/flash-upload.get.desc.xml
```

The thinking here is that most of the functionality is using some client side JavaScript that we can use as entry point 
when searching. And then we can back track to the related Web Script files. Even better, we can search directly for the 
JavaScript file name and see if any Web Script file refers to it:

```bash
martin@gravitonian:/opt/alfresco501/tomcat$ find . -name "*.ftl"|xargs grep "flash-upload.js"
./webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/upload/flash-upload.get.html.ftl:   
    <@script type="text/javascript" src="${url.context}/res/components/upload/flash-upload.js" group="upload"/>          
```

So in this case it is quite clear that the Flash Upload functionality is managed by the `flash-upload.get` Web Script.

### Debugging JavaScript files

Another common task during Share extension development is to be able to debug out-of-the-box and custom JavaScript files.

This is quite easy to do with Firebug:

1.  Load the web page that refers to the JavaScript file.
2.  In the script list select the JavaScript file so the source for it is displayed.
3.  Set breakpoints in the JavaScript code (by clicking to the left of the line number)
4.  Refresh the web page so the debugger stops at first breakpoint

The following is an example of how to debug the `file-upload.js` file that is used by Share to check if Flash is installed 
or not, and then uses either the `FlashUpload` or `HtmlUpload` component:

![dev-extensions-share-tools-firebug-file-upload-debug]({% link content-services/images/dev-extensions-share-tools-firebug-file-upload-debug.png %})

In this case the `file-upload.js` file with the checksum name was selected from the script list. Then a breakpoint was set 
in the `show: function FU_show(config)` method. To start debugging we just needed to click on the Upload button in the 
toolbar. To step over a line use F10, to step into use F11, and to continue to next breakpoint use F8.

An important thing we can see here is that the actual Uploader component used is the `DNDUpload` (Drag-and-Drop) component, 
and not the `FlashUpload` that we might think. So it is important to debug into the source and see what is really going on.

## SurfBug

SurfBug is a debugging tool built into Spring Surf that displays a variety of information about the various components 
on a Surf page. If you are not up to speed on Surf, see [Surf framework]({% link content-services/7.2/develop/software-architecture.md %}#surf-framework).

### SurfBug introduction

SurfBug is used to identify the different components that make up a Surf page. For each component it provides a visual 
indication of location on the page, and information about the component, such as file names, properties, IDs, and 
sub-component details.

In Alfresco Share you can enable or disable SurfBug through the `SurfBugStatus` web script.

* To enable SurfBug and make the tool visible, click **Enable SurfBug** on the `http://domain:port/share/page/surfBugStatus` page.
* You can also check or change the SurfBug status in this page.
* If you are running the Content Services server locally, and are using the default port for Tomcat servers, then the URL would be `http://localhost:8080/share/page/surfBugStatus`.

![SurfBug-Toggle]({% link content-services/images/SurfBug-Toggle.png %})

Enabling SurfBug and refreshing a page will overlay red boxes on the screen indicating the location of the Components or 
Sub-Components on the page. When the mouse cursor hovers over a component, the red highlight will change to green to 
show the currently selected component. The information shown for a component is based upon the Surf application configuration 
– if the Component interfaces are being fulfilled by the `org.springframework.extension.surf.type.AdvancedComponentImpl` 
class (which is the default) then Sub-Component information will be shown. When you click on a highlighted area, a 
pop up will be displayed that provides information about the Sub-Component.

![SurfBug-Data]({% link content-services/images/SurfBug-Data.png %})

SurfBug is not guaranteed to show every Sub-Component on the page if the DOM elements for that page have been manipulated 
in certain ways. For example, you will not see highlights for the Sub-Components that make the pop up panels for site creation, 
file upload, and so on. Since the highlights are absolutely positioned on the page (to avoid affecting the DOM structure) 
they are not guaranteed to be in pixel perfect position. However, the approximate position of a highlight and the 
information contained in its pop up will provide enough information for most needs.

You should not attempt to drive an application's user interface with SurfBug enabled. To avoid doing this, first navigate 
to the page of interest, then toggle SurfBug on from another tab in your browser. At this point you can refresh the 
application page and SurfBug highlights will then be displayed. If you need to navigate to another page, disable SurfBug, 
reload the page to switch off highlights, navigate to the new page of interest, and then re-enable SurfBug.

Note that SurfBug is enabled for the entire application, not just for the user who enables it. SurfBug is intended to 
be used in development, not production. It requires administrative privileges to invoke, so regular users will not be 
able to switch it on, but if it gets enabled then every user will see the highlights until it is disabled.

### Information provided

The following table provides a breakdown of the information that SurfBug provides:

|Info|Description|
|-------|------------|
|Page ID|The ID of the Page being displayed|
|Template ID|The ID of the Template being displayed|
|Template Type|Typically this is the path of the FreeMarker template used to render the Surf Template referenced by the Page.|
|Component ID|The ID of the Component that the Sub-Component belongs to.|
|Component Definition Location|The runtime path of the file containing the configuration for the Component|
|**Component Details**| |
|GUID|Generated unique id of the component|
|Region-id|The id of the region the template into which the component has been bound|
|Source-id|The id of the object at which the component is defined (this will typically be a Page id, a Template id or will be “global”)|
|Scope|The scope at which the Component has been defined (this will typically be "global", "page" or "template").|
|URL|URL of the component|
|Custom Properties|Any custom properties that have been configured for the component. These are not used by Surf to perform any rendering, but may be used by the Component itself if it is parameterized in any way (this may be the case for Components backed by JSPs, WebScripts or FreeMarker).|
|Height|Height of the component in pixels|
|**Sub-Component Details**| |
|ID|The id of the Sub-Component – this is always prefixed by the parent Component id and a "#" indicates the start of Sub-Component's identification|
|Contributing Paths|The runtime paths of all the files that have provided input into this Sub-Component (a Sub-Components property, index and evaluation configuration can all be updated by zero or more extension modules). If no extensions have been applied then this will only contain a single path.|
|Index|The specifically set index of the Sub-Component within the Component. This is the final index after all extensions have been applied. If nothing is shown it means that the default is being used.|
|Processor|The processor that has been used to render the Sub-Component. If this Sub-Component has been generated from legacy configuration then this could be either WebScript, WebTemplate or JSP (or some custom processor) – but AdvancedComponents only currently support web script processors and if the Sub-Component is not legacy generated then this will be blank.|
|Evaluated URI|The URI used to render the Sub-Component. This is the URI that is generated as a result of processing all Evaluations across all extensions – so is not necessarily the value configured in the source configuration file.|
|Evaluated By|This is the id of the first successful Evaluation and therefore the one that returned the “Evaluated URI” field. If this is blank it means that no Evaluations were performed on the Sub-Component.|
|WebScript Location|If the Sub-Component was rendered by a WebScript then this will show the runtime path of the WebScript descriptor file. The other WebScript files (template, controller, etc) will be co-located.|
|WebScript Details|This provides a link to the WebScript information which will be opened in a new tab/window.|
|Evaluated Properties|The properties for the Sub-Component as returned by a successful Evaluation. Properties can be overridden by Evaluations to change how a Sub-Component is rendered.|
|Extensibility Directives|A list of the extensibility directives that have been applied to the Sub-Component.|
