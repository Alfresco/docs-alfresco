---
author: Alfresco Documentation
---

# Horizontal layout

This tutorial demonstrates horizontal layout of widgets.

This tutorial assumes you have completed the [previous tutorial](aikau-tutorials-visibility.md).

In this tutorial you will experiment with laying out widgets horizontally.

1.  In `simple-aikau-project` delete the code in simple-page.get.js.

2.  Add the following code to simple-page.get.js:

    ```
    
                            
    var fixedWidth = {
    	name : "alfresco/layout/ClassicWindow",
    	widthPx : "300",
    	config : {
    		title : "Always 300px"
    	}
    };
    
    var dynamicWidth = {
    	name : "alfresco/layout/ClassicWindow",
    	widthPc : "50",
    	config : {
    		title : "50% after fixed deductions"
    	}
    };
    
    var auto1 = {
    	name : "alfresco/layout/ClassicWindow",
    	config : {
    		title : "Share remainder"
    	}
    };
    var auto2 = {
    	name : "alfresco/layout/ClassicWindow",
    	config : {
    		title : "Share remainder"
    	}
    };
    
    model.jsonModel = {
    	widgets : [ {
    		name : "alfresco/layout/HorizontalWidgets",
    		config : {
    			widgetMarginLeft : "5",
    			widgetMarginRight : "5",
    			widgets : [ fixedWidth, dynamicWidth, auto1, auto2 ]
    		}
    	} ]
    };                        
                            
                        
    ```

3.  Point your web browser at:

    ```
    
                
    http://localhost:8081/share/page/dp/ws/simple-page            
                
            
    ```

    You will see four windows displayed horizontally across the full width of the browser window.

4.  Resize the browser window and watch the layout reflow.

    Notice how the first window remains a fixed size. The second window takes 50% of remaining space after other widgets have been allowed for \(such as the fixed window\). The last two windows share \(equally\) the remainder of the left over space.


The code will now be explained.

```

                
var fixedWidth = {
  name: "alfresco/layout/ClassicWindow",
  widthPx: "300",
  config: {
    title: "Always 300px"
  }
};                
                
            
```

This code defines a window with a width fixed at 300 pixels. Note that this size is a parameter of the layout manager, and not the window object itself.

```

                
var dynamicWidth = {
  name: "alfresco/layout/ClassicWindow",
  widthPc: "50",
  config: {
    title: "50% after fixed deductions"
  }
};                
                
            
```

The previous code defines a variable width window. It is set to be 50% of horizontal space **after** all fixed widgets and widget margins have been taken into account - it is **not** a percentage of the browser window, or parent object width.

```

                
var auto1 = {
  name: "alfresco/layout/ClassicWindow",
  config: {
    title: "Share remainder"
  }
};

var auto2 = {
  name: "alfresco/layout/ClassicWindow",
  config: {
    title: "Share remainder"
  }
};                
                
            
```

This code defines two widgets whose width will automatically adjust. They are assigned the width by the layout manager based on remaining space after other widgets have been allowed for.

```

                
model.jsonModel = {
  widgets: [
    {
      name: "alfresco/layout/HorizontalWidgets",
      config: {
        widgetMarginLeft: "5",
        widgetMarginRight: "5",
        widgets: [ fixedWidth, dynamicWidth, auto1, auto2 ]
      }
    }
  ]
};                
                
            
```

This final piece of code adds the widgets into the layout manager and requests a widget margin of 5 pixels. You may notice on running the application that the windows do not touch - this is because of the widget margin.

**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

