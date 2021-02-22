---
author: Alfresco Documentation
---

# Widget visibility

This tutorial demonstrates visibility.

This tutorial assumes you have completed the [previous tutorial](aikau-tutorials-project.md).

In this tutorial you will create an Aikau page that displays a logo and some link text. You will then toggle between this logo and another logo by clicking on the text.

1.  In Eclipse Package Explorer, expand the `simple-aikau-project` and navigate to the following folder:

    ```
    
                            
    src/main/amp/config/alfresco/web-extension/site-webscripts/com/example/pages/                        
                            
                        
    ```

    There are three files of interest in this folder:

    -   simple-page.get.desc.xml - the web script description file for the Aikau page.
    -   simple-page.get.html.ftl - the FreeMarker template for the page.
    -   simple-page.get.js - the JavaScript model describing the page.
2.  Delete the existing JSON model code in simple-page.get.js

3.  Add the following code to the simple-page.get.js file:

    ```
    
                            
    var toggleTopic = "TOPIC";
    
    var showSurfLogoRules = {
      initialValue: false,
      rules: [
        {
          topic: toggleTopic,
          attribute: "show",
          is: [true],
          isNot: [false]
        }
      ]
    };
    
    var showAlfrescoLogoRules = {
      initialValue: true,
      rules: [
        {
          topic: toggleTopic,
          attribute: "show",
          is: [false],
          isNot: [true]
        }
      ]
    };
    
    var showAlfrescoLogo = {
      name: "alfresco/renderers/PropertyLink",
      config: {
        visibilityConfig: showAlfrescoLogoRules,
        currentItem: {
          label: "Show Alfresco Logo"
        },
        propertyToRender: "label",
        useCurrentItemAsPayload: false,
        publishTopic: toggleTopic,
        publishPayloadType: "CONFIGURED",
        publishPayload: {
          show: true
        }
      }
    };
    var showSurfLogo = {
      name: "alfresco/renderers/PropertyLink",
      config: {
        visibilityConfig: showSurfLogoRules,
        currentItem: {
          label: "Show Surf Logo"
        },
        propertyToRender: "label",
        useCurrentItemAsPayload: false,
        publishTopic: toggleTopic,
        publishPayloadType: "CONFIGURED",
        publishPayload: {
          show: false
        }
      }
    };
    
    var alfrescoLogo = {
      name: "alfresco/logo/Logo",
      config: {
        logoClasses: "alfresco-logo-large",
        visibilityConfig: showSurfLogoRules
      }
    };
    var surfLogo = {
      name: "alfresco/logo/Logo",
      config: {
        logoClasses: "surf-logo-large",
        visibilityConfig: showAlfrescoLogoRules
      }
    };
    
    model.jsonModel = {
      widgets: [
        {
          name: "alfresco/layout/VerticalWidgets",
          config: {
            widgets: [
              showAlfrescoLogo,
              showSurfLogo,
              alfrescoLogo,
              surfLogo
            ]
          }
        }
      ]
    };
                        
    ```

4.  Point your web browser at the following location:

    ```
    
                            
    http://localhost:8081/share/page/dp/ws/simple-page                        
                            
                        
    ```

    You will see the text "Show Alfresco Logo" and the Surf logo displayed.

5.  Click the text **Show Alfresco Logo**.

    The Alfresco logo will be displayed, and the text will change to "Show Surf Logo". Toggle between the two logos by clicking the text.


Each section of code will now be explained.

```

                     
var toggleTopic = "TOPIC";                     
                     
                 
```

This creates a variable to contain topic visibility.

```

                        
var showSurfLogoRules = {
  initialValue: false,
  rules: [
    {
      topic: toggleTopic,
      attribute: "show",
      is: [true],
      isNot: [false]
    }
  ]
};

var showAlfrescoLogoRules = {
  initialValue: true,
  rules: [
    {
      topic: toggleTopic,
      attribute: "show",
      is: [false],
      isNot: [true]
    }
  ]
};                        
                        
                    
```

This code creates two JavaScript objects that represent the visibility configurations for each toggle state. The variable `showSurfLogoRules` has an `initialValue` attribute of `true` and the `showAlfrescoLogoRules` has an `initialValue` attribute of `false`. This ensures that widgets are initialized in the correct visibility state. Initially, the Surf logo will be displayed.

Both configurations contain a single rule that subscribe to the same topic \(defined earlier as the `toggleTopic` variable\) and both identify the same attribute, `show` in any payload published on that topic. The difference is that the `showSurfLogoRules` rule looks for the attribute to be `true` and not `false`, and the `showAlfrescoLogoRules` rule looks for the attribute to be `false` and not `true`.

```

                        
var showAlfrescoLogo = {
  name: "alfresco/renderers/PropertyLink",
  config: {
    visibilityConfig: showAlfrescoLogoRules,
    currentItem: {
      label: "Show Alfresco Logo"
    },
    propertyToRender: "label",
    useCurrentItemAsPayload: false,
    publishTopic: toggleTopic,
    publishPayloadType: "CONFIGURED",
    publishPayload: {
      show: true
    }
  }
};
var showSurfLogo = {
  name: "alfresco/renderers/PropertyLink",
  config: {
    visibilityConfig: showSurfLogoRules,
    currentItem: {
      label: "Show Surf Logo"
    },
    propertyToRender: "label",
    useCurrentItemAsPayload: false,
    publishTopic: toggleTopic,
    publishPayloadType: "CONFIGURED",
    publishPayload: {
      show: false
    }
  }
};                        
                        
                    
```

This code defines a JSON model for two `alfresco/renderers/PropertyLink` widgets. A `PropertyLink` widget is normally used within a list to provide links to perform actions \(such as navigating to a page or opening a dialog\) and would automatically be assigned a `currentItem` attribute for each item iterated over.

In this case the code defines a custom `currentItem` object containing a `label` attribute and then configure that attribute to be rendered by mapping it in the `propertyToRender` attribute. The `showAlfrescoLogo` link is assigned the `showAlfrescoLogoRules` visibility configuration and the `showSurfLogo` link is assigned the `showSurfLogoRules` visibility configuration so that they effectively hide themselves, but reveal the other PropertyLink when clicked.

Typically a `PropertyLink` will publish its `currentItem` object when clicked so this is overridden by setting the `useCurrentItemAsPayload` attribute to false and a new publication is configured to publish a payload containing a `show` attribute with the appropriate boolean value for the link.

```

                        
var alfrescoLogo = {
  name: "alfresco/logo/Logo",
  config: {
    logoClasses: "alfresco-logo-large",
    visibilityConfig: showSurfLogoRules
  }
};
var surfLogo = {
  name: "alfresco/logo/Logo",
  config: {
    logoClasses: "surf-logo-large",
    visibilityConfig: showAlfrescoLogoRules
  }
};                        
                        
                    
```

The previous code defines the `alfresco/logo/Logo` widgets to toggle between when using the links.

```

                        
model.jsonModel = {
  widgets: [
    {
      name: "alfresco/layout/VerticalWidgets",
      config: {
        widgets: [
          showAlfrescoLogo,
          showSurfLogo,
          alfrescoLogo,
          surfLogo
        ]
      }
    }
  ]
};                        

                    
```

Finally, the code adds all the widgets into the JSON model to be rendered.

**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

