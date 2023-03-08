---
title: Aikau Widgets Extension Point
---

Aikau pages are built up of widgets. There are two types of widgets, presentation widgets and service widgets. These 
JavaScript widgets are Dojo classes. A widget can have its own CSS, HTML, and Properties.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

Aikau menus, pages, and dashlets are all using Aikau widgets to build their user interface. An Aikau Widget contains 
both JavaScript, HTML, CSS, and resource properties to form a self contained component. Aikau widgets are implemented as 
Dojo classes and uses classes from the Dijit widget library. Alfresco Share comes with a lot of Aikau widgets out of 
the box such as for example:

* Charts
* Dialogs
* Document Library Menu, List, Views, Filter, Toolbar
* Document Pickers, Preview, Upload
* Editors
* Event Publish/Subscribe
* Forms with controls - button, text fields, labels, drop downs, date, pickers, radio, etc
* Header
* Layouts - classic window, vertical, horizontal, etc
* Lists
* Menu
* Navigation - links, tree
* Reports
* Search
* Services such as Action Service, Content Service, Navigation Service, Tag Service, etc

For a full list of widgets, and documentation, see [Aikau Widget Library](http://dev.alfresco.com/resource/docs/aikau-jsdoc/){:target="_blank"}. 
If there is no widget here that fits your needs then you implement your own custom Aikau widget. Let's take an example 
of a simple page with a custom HelloWorld widget, the page JSON looks like this:

```javascript
model.jsonModel = {
    widgets: [
        {
            id: "SET_PAGE_TITLE",
            name: "alfresco/header/SetTitle",
            config: {
                title: "Hello World"
            }
        },
        {
            id: "DEMO_SIMPLE_MSG",
            name: "example/widgets/HelloWorldTextWidget"
        }
    ]
};      
```

Here we got a custom widget called `HelloWorldTextWidget` in the Dojo AMD package `exmaple/widgets`. To implement this 
widget we need to create a JavaScript file called `HelloWorldTextWidget.js` and put it in the `/js/example/widgets` directory. 
The implementation of the widget looks like this:

```javascript
define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "dijit/_TemplatedMixin",
        "dojo/text!./HelloWorldTextWidget.html"
    ],
    function(declare, _Widget, Core, _Templated, template) {
        return declare([_Widget, Core, _Templated], {
            templateString: template,
            i18nRequirements: [ {i18nFile: "./HelloWorldTextWidget.properties"} ],
            cssRequirements: [{cssFile:"./HelloWorldTextWidget.css"}],
            
            buildRendering: function example_widgets_HelloWorldTextWidget__buildRendering() {
                this.helloWorldMsg = this.message('hello.world');
                this.inherited(arguments);

            }
        });
});      
```

This widget is based on an HTML template defined in a file called `HelloWorldTextWidget.html`, this file should be 
placed in the same place as the Widget class: 

```xml
<div class="helloWorldMsgStyle">${helloWorldMsg}</div>
```

The widget also uses a property called `hello.world` that needs to be available in a resource file called 
`HelloWorldTextWidget.properties`, it also needs to be located in the same place as the Widget class: 

```text
hello.world=This is just a test page. Hello World! (Aikau)
```

Finally the widget template uses a CSS style called `helloWorldMsgStyle` that needs to be available in a resource file 
called `HelloWorldTextWidget.css`, located in the same place as the Widget class: 

```text
.helloWorldMsgStyle {
    border: 1px #000000 solid;
    padding: 1em;
    width: 100px;
    background-color:lightgrey;
}      
```

Before this widget can be loaded by the Dojo AMD loader the package that it is located in must be registered. This is 
done via a Surf Extension Module as follows: 

```xml
<extension>
  <modules>
    <module>
      <id>Example Aikau Widgets</id>
      <version>1.0</version>
      <auto-deploy>true</auto-deploy>
      <configurations>
        <config evaluator="string-compare" condition="WebFramework" replace="false">
          <web-framework>
            <dojo-pages>
              <packages>
                <package name="example" location="js/example"/>
              </packages>
            </dojo-pages>
          </web-framework>
        </config>
      </configurations>
    </module>
  </modules>
</extension>
```
## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/site-webscripts` (Untouched by re-deployments and upgrades)

Best practice is to put the file in a directory that explains what the file is for, such as for example:

* tomcat/shared/classes/alfresco/web-extension/site-webscripts/org/alfresco/training/components/form/controls

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions` - Extension modules with Dojo package definitions (i.e. the JavaScript packages where the Widgets live)
* `aio/share-jar/src/main/resources/META-INF/resources/share-jar/js/<dojo package>` - web resources, such as Aikau Widgets

## More Information

* [Introduction to Aikau]({% link content-services/7.2/develop/reference/aikau-intro-ref.md %})
* [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/){:target="_blank"} - Look here before you start creating widgets, one might exist that does what you want.

## Tutorials

* [Adding new AMD packages for Aikau Widgets]({% link content-services/7.2/tutorial/share/amd.md %})
* [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/tree/master/tutorial/chapters){:target="_blank"}

## Developer Blogs

* [Aikau background and concepts](https://hub.alfresco.com/t5/alfresco-content-services-blog/latest-updates-to-share-and-surf/ba-p/289014){:target="_blank"}
* [Creating custom Aikau Widgets](https://hub.alfresco.com/t5/alfresco-content-services-blog/creating-custom-share-widgets/ba-p/289040){:target="_blank"}
* [Deep dive into Dojo, Dijit, and Aikau development.](https://docs.google.com/document/d/1q25jA5EQ5PRYekr8tpM3ELlwOQ8Ht3Ng6D4VWsKoZtY/pub){:target="_blank"} - lots of information around creating Aikau widgets
* [Aikau Tutorial](http://ohej.github.io/alfresco-tutorials/tutorial/aikau/tutorial.html){:target="_blank"}
