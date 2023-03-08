---
title: Aikau Dashlets Extension Point
---

The Share web application has a special page called Dashboard, which contains windows of content called dashlets. 
Currently most of these dashlets are Spring Surf dashlets, but they will eventually be converted to Aikau dashlets.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

The preferred new way of adding custom Share dashlets is via the new Aikau UI development framework. An Aikau dashlet 
is defined via a Surf web script in the same way you define an Aikau page. The controller with the JSON model contains 
one widget referencing a dashlet widget, which in turn can use any other number of Aikau widgets to build up the 
dashlet content.

Let's say we wanted to implement a simple Hello World dashlet in Aikau that looks like this:

![dev-extension-points-aikau-dashlet-hello-world-dashlet]({% link content-services/images/dev-extension-points-aikau-dashlet-hello-world-dashlet.png %})

This dashlet contains the following [Aikau Widgets]({% link content-services/7.2/develop/share-ext-points/aikau-widgets.md %}): the dashlet itself, 
two toolbar widgets, a vertical layout widget, a logo widget, and a Hello widget. To implement it start with the 
[Surf Web Script]({% link content-services/7.2/develop/share-ext-points/web-scripts.md %}).

The web script controller is where we specify what Aikau Widget that is implementing the dashlet, it is called 
`acmedashlet/HelloDashlet` in this case. The controller will look something like this for the above Hello World dashlet:

```javascript
model.jsonModel = {
    rootNodeId: args.htmlid,
    pubSubScope: instance.object.id,
    /* Include Aikau services here, for example :
    services: [
        { name: "alfresco/services/ReportService" },
        { name: "alfresco/services/NavigationService" }
    ],*/
    widgets: [
        {
            id: "HELLO_DASHLET",
            name: "acmedashlets/HelloDashlet"
        }
    ]
};
```

Note that we can include service widgets here too if they are needed, in our case we are just showing a Hello World 
message so we don't need any services. The dashlet class `HelloDashlet.js` lives in a JavaScript package called `acmedashlets`. 
So for the AMD loader to actually find this class we need to configure a Surf extension module with this information as follows:

```xml
<extension>
    <modules>
        <module>
            <id>add-aikau-dashlet-share - ACME Dashlet and Widgets</id>
            <version>1.0</version>
            <auto-deploy>true</auto-deploy>
            <configurations>
                <config evaluator="string-compare" condition="WebFramework" replace="false">
                    <web-framework>
                        <dojo-pages>
                            <packages>
                                <package name="acmedashlets" location="js/tutorials/dashlets"/>
                                <package name="acmewidgets" location="js/tutorials/dashlets/widgets"/>
                            </packages>
                        </dojo-pages>
                    </web-framework>
                </config>
            </configurations>
        </module>
    </modules>
</extension>
```

Here we have also configured another package called `acmewidgets` for any other Aikau widgets that we will use as 
content in our dashlet. These packages points to physical locations in our produced artifact. So we need to put these 
widgets at specific paths in our AMP project. For example, the dashlet JavaScript file called `HelloDashlet.js` need to 
be located in the `share-jar/src/main/resources/META-INF/resources/share-jar/js/tutorials/dashlets` directory.

The Surf web script template will be very simple and the only thing it does is this process the JSON model defined 
in the controller:

```xml
<@markup id="widgets">
    <@processJsonModel group="share-dashlets" rootModule="alfresco/core/Page"/>
</@>

<@markup id="html">
    <div id="${args.htmlid?html}"></div>
</@>
```

To complete the Surf web script a descriptor is also needed:

```xml
<webscript>
    <shortname>Hello Dashlet</shortname>
    <description>A dashlet that displays an Alfresco logo and a Hello message</description>
    <family>dashlet</family>
    <url>/tutorials/dashlets/hello</url>
</webscript>
```

The web script `family` property has been set to `dashlet`, which means that this dashlet can be added to both user 
dashboards and site dashboards. Now we need to implement the actual Dashlet Widget code, it consists of a JavaScript 
file and i18n resource file. The dashlet JavaScript file, called `HelloDashlet.js` in this case, should extends the 
out-of-the-box `alfresco/dashlets/Dashlet` widget. Here is an example of how it might look like:

```javascript
define(["dojo/_base/declare",
        "alfresco/core/Core",
        "alfresco/core/I18nUtils",
        "alfresco/dashlets/Dashlet"],
    function(declare, AlfCore, I18nUtils, Dashlet) {

        return declare([Dashlet], {
            additionalCssClasses: "mediumpad",
            bodyHeight: 200,
            componentId: "component.hello-dashlet",
            i18nScope: "tutorials.dashlets.HelloDashlet",
            i18nRequirements: [{i18nFile: "./i18n/HelloDashlet.properties"}],

            widgetsForTitleBarActions: [
                {
                    id: "HELLO_DASHLET_ACTIONS",
                    name: "alfresco/html/Label",
                    config: {
                        label: "Title-bar actions"
                    }
                }
            ],

            widgetsForToolbar: [
                {
                    id: "HELLO_DASHLET_TOOLBAR",
                    name: "alfresco/html/Label",
                    config: {
                        label: "Toolbar"
                    }
                }
            ],

            widgetsForToolbar2: [
                {
                    id: "HELLO_DASHLET_TOOLBAR2",
                    name: "alfresco/html/Label",
                    config: {
                        label: "Toolbar2"
                    }
                }
            ],

            widgetsForBody: [
                {
                    id: "HELLO_DASHLET_VERTICAL_LAYOUT",
                    name: "alfresco/layout/VerticalWidgets",
                    config: {
                        widgetWidth: 50,
                        widgets: [
                            {
                                id: "HELLO_DASHLET_ALFRESCO_LOGO_WIDGET",
                                name: "alfresco/logo/Logo",
                                config: {
                                    logoClasses: "alfresco-logo-only"
                                }
                            },
                            {
                                id: "HELLO_DASHLET_HELLO_WIDGET",
                                name: "acmewidgets/HelloDashletWidget"
                            }
                        ]
                    }
                }
            ]

        });
    });
```

There are a number of properties here that are defined in the base dashlet class `alfresco/dashlets/Dashlet`, 
they can be used for the following:

* `additionalCssClasses` - Add padding to the body: `smallpad` (4px padding), `mediumpad` (10px padding - recommended) and `largepad` (16px padding).
* `bodyHeight` - Explicit height in pixels of the dashlet body.
* `componentId` - Identifier that will be used to store properties for this dashlet, such as the dashlet height when using the resizer.
* `i18nScope` - The i18n scope to use for this dashlet.
* `i18nRequirements` - An array of the i18n resource files to use with this dashlet.
* `widgetsForTitleBarActions` - The widgets to be acting as title bar actions.
* `widgetsForToolbar` - The widgets to be placed in the top toolbar.
* `widgetsForToolbar2` - The widgets to be placed in the second toolbar.
* `widgetsForBody` - The widgets to be placed in the body of the dashlet.

As we can see, implementing a dashlet is just a question of mixing and matching different Aikau widgets. In this case 
we have used almost exclusively out-of-the-box widgets (i.e. `alfresco/html/Label`, `alfresco/layout/VerticalWidgets`, 
and `alfresco/logo/Logo`), but there is one custom widget called `acmewidgets/HelloDashletWidget`. To implement this 
widget we need to create a JavaScript file called `HelloDashletWidget.js` and put it in the `/js/tutorials/dashlets/widgets` 
directory. The source code for the widget looks like this:

```javascript
define(["dojo/_base/declare",
    "dijit/_WidgetBase",
    "alfresco/core/Core",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/HelloDashletWidget.html"
],
function(declare, _Widget, Core, _Templated, template) {
    return declare([_Widget, Core, _Templated], {
        templateString: template,
        i18nRequirements: [ {i18nFile: "./i18n/HelloDashletWidget.properties"} ],
        cssRequirements: [{cssFile:"./css/HelloDashletWidget.css"}],

        buildRendering: function org_tutorials_dashlets_HelloDashletWidget__buildRendering() {
            this.greeting = this.message('hello-label');

            this.inherited(arguments);

        }
    });
});      
```

This widget is based on an HTML template defined in a file called `HelloDashletWidget.html`, this file should be placed 
in the `/templates` sub-directory: 

```xml
<div class="hello-dashlet-widget">${greeting}</div>
```

The dashlet widget uses a property called `hello-label` that needs to be available in a resource file called 
`HellodashletWidget.properties`, which should be located in the `/i18n` sub-directory: 

```text
hello-label=Hello Dashlet!
```

Finally the widget template uses a CSS style called `hello-dashlet-widget` that needs to be available in a resource file 
called `HelloDashletWidget.css`, located in the `/css` sub-directory: 

```text
.hello-dashlet-widget {
    border: 4px #000000 solid;
    padding: 1em;
    width: 100px;
}      
```

This widget will be loaded by the Dojo AMD loader as we defined the package for it in the beginning of this description.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/site-webscripts` (Untouched by re-deployments and upgrades)
* `tomcat/shared/classes/alfresco/web-extension/site-data/extensions` (Untouched by re-deployments and upgrades)
* `tomcat/webapps/share/js` (when web resources are included, such as Aikau Widgets, you need to put them directly into the exploded webapp, this is **NOT** recommended.)

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/alfresco/web-extension/site-webscripts` - Aikau dashlet web scripts
* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions` - Extension modules with Dojo package definitions
* `aio/share-jar/src/main/resources/META-INF/resources/share-jar/js/<dojo package>` - web resources, such as the dashlet Widget and other Aikau Widgets making up the content.

## More Information

* [Introduction to Aikau]({% link content-services/7.2/develop/reference/aikau-intro-ref.md %})
* [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/){:target="_blank"} - this is the place to look for widgets that you can use in your dashlets.

## Sample Code

* [Hello World dashlet implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-aikau-dashlet-share){:target="_blank"}

## Tutorials

* [Adding new AMD packages for Aikau Widgets]({% link content-services/7.2/tutorial/share/amd.md %})
* [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/tree/master/tutorial/chapters){:target="_blank"}

## Alfresco Developer Blogs

* [Aikau background and concepts](https://hub.alfresco.com/t5/alfresco-content-services-blog/latest-updates-to-share-and-surf/ba-p/289014){:target="_blank"}
* [Deep dive into Dojo, Dijit, and Aikau development.](https://docs.google.com/document/d/1q25jA5EQ5PRYekr8tpM3ELlwOQ8Ht3Ng6D4VWsKoZtY/pub){:target="_blank"}
