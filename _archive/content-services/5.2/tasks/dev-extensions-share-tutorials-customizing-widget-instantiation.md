---
author: Alfresco Documentation
---

# Customizing a Surf JavaScript Widget in the Document Library

|**Name**|Customizing a Surf JavaScript Widget in the Document Library|
|**Extension Point**|[Surf Widgets](../concepts/dev-extensions-share-surf-widgets.md) and [Surf Extension Modules](../concepts/dev-extensions-share-surf-extension-modules.md)|
|**Description**|This tutorial demonstrates how to customize an existing Surf JavaScript Widget by extending the out-of-the-box Documentlist widget so it shows a message every time a filter is changed. In previous versions of Alfresco Content Services it was only possible to customize JavaScript widgets by copying existing code, modifying it, and then copying it onto the web extensions path. This was not efficient as it created a maintenance burden as the code needed to be managed through changes to the original widget.

 Now logic and metadata about widget instantiation has been moved from the FreeMarker templates and moved into the JavaScript controller as this is easier to customize. The metadata is stored as a standardized object structure in the model, which is then processed by a new custom directive in the FreeMarker template to output the JavaScript code necessary to instantiate the specified widgets.

 Existing JavaScript controller extension capabilities can be used so that [Surf Extension Modules](../concepts/dev-extensions-share-surf-extension-modules.md) can modify the default metadata object\(s\) to change the following:

 -   The name of the JavaScript widget to be instantiated
-   The arguments passed when instantiating the widget
-   The variable that the instantiated widget is assigned to
-   Whether or not i18n messages are set for the widget
-   Whether or not additional options are applied to the widget
-   The additional options that should be applied to the widget

 FreeMarker templates use a common “boiler-plate” structure to ensure consistency across web script rendered components. Updated resource handling features in Surf are used to move all the CSS and JavaScript dependency requests into the template and remove the associated \*.head.ftl file. A consistent pattern of `<@markup>` directives is used throughout the template to further enhance customization options.

 The general take away from this tutorial is that most JavaScript Widget customizations that was previously done by changing out-of-the-box JavaScript code, can now be done via [Surf Extension Modules](../concepts/dev-extensions-share-surf-extension-modules.md) and JavaScript object extensions.

|
|**Implementation Steps**|Customizing the Documentlist Widget in the Document Library involves the following steps:1.  Generate/Use a Share JAR project \(either stand-alone or as part of an All-in-One project\)
2.  Create a Surf Extension Module containing the mapping between out-of-the-box widget and custom widget.
3.  Implement the custom Widget
4.  Override the documentlist-v2 web script to swap in the custom Widget
5.  Deploy the Surf Extension Module manually if it is not auto-deployed

|
|**Related Information**|This tutorial assumes that you are familiar with the Document Library in Share. If you are new to it, see [Share Document Library](../concepts/share-repodoclib.md) before starting this tutorial. Also, familiar yourself with how you can switch between different filters in the Document Library \(that is, the navigation menu to the left in the DocLib\).|

This tutorial assumes you have generated an [All-In-One SDK 3.0 Project](../concepts/sdk-getting-started.md).

Tutorial implementation steps:

1.  In the AIO project open up the file aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions/aio-share-jar-example-widgets.xml. This Surf Extension Module file is automatically generated when the AIO project is created.

2.  Add the following module configuration \(there is already a module defined, add this one after it\):

    ```
    <module>
    	<id>Custom DocumentList Widget</id>
    	<description>Instantiate a custom DocumentList widget</description>
    	<customizations>
    		<customization>
    			<targetPackageRoot>org.alfresco.components.documentlibrary</targetPackageRoot>
    			<sourcePackageRoot>org.alfresco.tutorials.customization</sourcePackageRoot>
    		</customization>
    	</customizations>
    </module>                    
    ```

3.  Create the following directory: aio/aio-share-jar/src/main/resources/META-INF/resources/aio-share-jar/doclib/extension.

4.  In the doclib/extension directory create the custom Document list JavaScript Widget in the file custom-documentlist.js:

    ```
    // Declare namespace
    if (typeof Tutorials == undefined || !Tutorials) { var Tutorials = {}; }
    if (!Tutorials.custom) { Tutorials.custom = {}; }
    (function()
    {
      // Define constructor
      Tutorials.custom.DocumentList = function CustomDocumentList_constructor(htmlId)
      {
        Tutorials.custom.DocumentList.superclass.constructor.call(this, htmlId);
        return this;
      };
    
      // Extend default DocumentList
      YAHOO.extend(Tutorials.custom.DocumentList, Alfresco.DocumentList,
      {
        onFilterChanged: function CustomDL_onFilterChanged(layer, args)
        {
          // Call super class method
          Tutorials.custom.DocumentList.superclass.onFilterChanged.call(this, layer,args);
    
          // Pop-up a message
          Alfresco.util.PopupManager.displayMessage({
            text: "Filter Changed!"
          });
        }
      });
    })();                    
    ```

5.  Create the following directory: aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-webscripts/org/alfresco/tutorials/customization.

6.  In the tutorials/customization directory create the file documentlist-v2.get.html.ftl with the following contents:

    ```
    <@markup id="custom-documentlist-dependencies" target="js" action="after" scope="global">
      <@script src="${url.context}/res/doclib/extension/custom-documentlist.js" group="documentlibrary"/>
    </@markup>                    
    ```

    This loads our custom JavaScript widget class after the out-of-the-box JavaScript files used by the Document List widget.

7.  In the same tutorials/customization directory create the file documentlist-v2.get.js with the following contents:

    ```
    // Find the default DocumentList widget and replace it with the custom widget
    for (var i=0; i<model.widgets.length; i++) {
      if (model.widgets[i].id == "DocumentList") {
        model.widgets[i].name = "Tutorials.custom.DocumentList";
      }
    }
    ```

    This code changes the widget that is instantiated.

8.  Run `/aio$ mvn clean install alfresco:run` to build and start up the customization.

9.  In Share, \(﻿http://localhost:8080/share/page/modules/deploy\) deploy the new module.

10. In Share, navigate to a Document Library within a Site. Changing the Document Filter \(for example changing the view\) will result in a pop up displaying the "Filter Changed!" message.


**Parent topic:**[Document Library](../concepts/dev-extensions-share-tutorials-document-library.md)

