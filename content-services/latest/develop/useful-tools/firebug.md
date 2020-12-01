---
title: FireBug
---

Firebug is a debugging tool/plug-in for the Firefox web browser.

## Installation

Firefox does not come with Firebug installed by default, you need to install it manually. To do that navigate to this 
[page](https://addons.mozilla.org/en-US/firefox/addon/firebug-and-web-development/){:target="_blank"} with Firefox, and 
click on the **+Add to Firefox** button.

## Introduction

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

Here you will notice that all the Alfresco Content Services-related JavaScript files have big numbers in their file names. 
For example, the `my-sites.js` file is not just called that but instead something like `my-sites_0500545812b99c1ed156728185c19b24.js`. 
This is because the Spring Surf framework includes a checksum in the file name so it is more stable during upgrades of the software. 

## Finding out what Web Script(s) that is behind a page

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

## Debugging JavaScript files

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

