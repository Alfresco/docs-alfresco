---
author: Alfresco Documentation
---

# Simple form

This tutorial demonstrates creating a simple form.

This tutorial assumes you have completed the [previous tutorial](aikau-tutorials-horizontal-layout.md).

In this tutorial you will learn how to define a simple form containing a textbox for capturing an e-mail address and a checkbox that controls whether or not that text box is visible.

1.  In `simple-page.get.js` delete the existing code.

2.  Add the following code to `simple-page.get.js`:

    ```
    
                            
    var form = {
    	name : "alfresco/forms/Form",
    	config : {
    		showOkButton : true,
    		okButtonLabel : "Save",
    		showCancelButton : false,
    		cancelButtonLabel : "Doesn't Matter",
    		okButtonPublishTopic : "PUBLISH_TOPIC",
    		okButtonPublishGlobal : true,
    		widgets : []
    	}
    };
    
    var textBox = {
    	name : "alfresco/forms/controls/DojoValidationTextBox",
    	config : {
    		fieldId : "EMAIL",
    		name : "email",
    		label : "Contact",
    		description : "Your e-mail address",
    		placeHolder : "e-mail",
    		validationConfig : [ {
    			validation : "regex",
    			regex : "^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$",
    			errorMessage : "Valid E-mail Address Required"
    		} ]
    	}
    };
    form.config.widgets.push(textBox);
    
    var checkbox = {
    	name : "alfresco/forms/controls/DojoCheckBox",
    	config : {
    		fieldId : "SHOW",
    		name : "showEmail",
    		label : "Show E-mail",
    		description : "Uncheck to hide the e-mail field",
    		value : true
    	}
    };
    form.config.widgets.push(checkbox);
    
    textBox.config.visibilityConfig = {
    	initialValue : true,
    	rules : [ {
    		targetId : "SHOW",
    		is : [ true ]
    	} ]
    };
    
    model.jsonModel = {
    	widgets : [ form ]
    };                        
                            
                        
    ```

3.  Enter the following URL in your web browser:

    ```
    
    http://localhost:8081/share/page/dp/ws/simple-page                        
                        
    ```

    The form will be displayed. Test the checkbox by selecting and deselecting it.


The code will now be explained.

This code defines a form widget. Various attributes are shown, but if these are not included Aikau will use default values:

```

var form = {
  name: "alfresco/forms/Form",
  config: {
    showOkButton: true,
    okButtonLabel: "Save",
    showCancelButton: false,
    cancelButtonLabel: "Doesn't Matter",
    okButtonPublishTopic: "PUBLISH_TOPIC",
    okButtonPublishGlobal: true,
    widgets: []
  }
};            
        
```

The following code creates a text box. With the exception of the `placeHolder` attribute, all other attributes are applicable to any Aikau form control. All form controls inherit from the `alfresco/forms/controls/BaseFormControl` module which defines the structure of form controls, such as labels, options, validation, behavior and so on. This means that form widgets can easily be swapped without needing to rewrite the configuration:

```

var textBox = {
  name: "alfresco/forms/controls/DojoValidationTextBox",
  config: {
    fieldId: "EMAIL",
    name: "email",
    label: "Contact",
    description: "Your e-mail address",
    placeHolder: "e-mail",
    validationConfig: [
      {
        validation: "regex",
        regex: "^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$",
        errorMessage: "Valid E-mail Address Required"
      }
    ]
  }
};
form.config.widgets.push(textBox);                
            
```

This code defines a checkbox. Note the initial value is set to true, so that the checkbox is initially selected:

```

var checkbox = {
  name: "alfresco/forms/controls/DojoCheckBox",
  config: {
    fieldId: "SHOW",
    name: "showEmail",
    label: "Show E-mail",
    description: "Uncheck to hide the e-mail field",
    value: true
  }
};
form.config.widgets.push(checkbox);                
            
```

The code then defines a visibility rule. Whenever a form control changes value it will publish the change within the scope of the form and other widgets can define rules that trigger updates based on those changes. It is possible to set multiple rules and multiple `is` and `isNot` values to check against. It is also possible to use the same rule structure for `requirementConfig` and `disablementConfig`, whether or not the field is disabled. In this case the rule declares that if the form control with the `fieldId` of `SHOW` is set with the value `true`, then this form control should become visible, and should be hidden if set to any other value.

```

textBox.config.visibilityConfig = {
  initialValue: true,
  rules: [
    {
      targetId: "SHOW",
      is: [true]
    }
  ]
};                
            
```

Finally the page is created:

```

 model.jsonModel = {
  widgets: [
    form
  ]
};               
            
```

**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

