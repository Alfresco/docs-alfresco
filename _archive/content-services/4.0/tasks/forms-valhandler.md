---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: Forms
---

# Customizing the validation handler

A validation handler is a small JavaScript function that gets called by the forms runtime when a field value needs to be validated.

The interface for a validation handler is shown below.

```
/**
 * Validation handler for a field.
 * 
 * @param field {object} The element representing the field the validation is for
 * @param args {object} Object containing arguments for the handler
 * @param event {object} The event that caused this handler to be called, maybe null
 * @param form {object} The forms runtime class instance the field is being managed by
 * @param silent {boolean} Determines whether the user should be informed upon failure
 * @param message {string} Message to display when validation fails, maybe null
 * @static
 */
function handler-name(field, args, event, form, silent, message)
```

The definition of the built in "mandatory" validation handler is shown below.

```
Alfresco.forms.validation.mandatory = function mandatory(field, args, event, form, silent, message)
```

The `field` parameter is usually the HTML DOM element representing the field's value, which is normally an HTML input DOM element, so that the value property can be accessed. The structure of the `args` parameter is dependent on the handler being implemented. By default, these will be the parameters of the constraint defined on the field.

The handler is responsible for taking the value from the field and uses the `args` parameter to calculate whether the current value is valid or not, returning `true` if it is valid and `false` if it is not.

**Parent topic:**[Forms](../concepts/forms-intro.md)

