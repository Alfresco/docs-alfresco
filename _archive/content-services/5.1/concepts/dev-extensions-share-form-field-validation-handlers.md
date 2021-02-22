---
author: Alfresco Documentation
---

# Form Field Validation Handlers

A validation handler is a small JavaScript function that gets called by the forms runtime when a field value needs to be validated.

|Extension Point|Form Field Validation Handlers|
|---------------|------------------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|The JavaScript function signature for a validation handler looks like this:

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

 The built in "mandatory" validation handler is defined as follows:

 ```
Alfresco.forms.validation.mandatory = function mandatory(field, args, event, form, silent, message)
```

 The `field` parameter is usually the HTML DOM element representing the field's value, which is normally an HTML input DOM element, so that the value property can be accessed. The structure of the `args` parameter is dependent on the handler being implemented. By default, these will be the parameters of the constraint defined on the field.

The handler is responsible for taking the value from the field and uses the `args` parameter to calculate whether the current value is valid or not, returning `true` if it is valid and `false` if it is not.

 Now, to implement a validation handler you would need to first create a JavaScript function that does the validation. Let's say we want to do email address validation via RegExp, then it could look something like this:

 ```
if (typeof MyCustomNamespace == "undefined" || !MyCustomNamespace) {
    var MyCustomNamespace = {};
}

MyCustomNamespace.forms.validation.checkEmailValidity =
    function checkEmailValidity(field, args, event, form, silent, message) {
    var valid = true;

    valid = YAHOO.lang.trim(field.value).length !== 0;
    if (valid) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        valid = re.test(field.value);
    }

    return valid;
}   
```

 After this we have to make sure the JavaScript file is loaded when the form is loaded, we can do that as follows in share-config-custom.xml when defining the form:

 ```
<config>
    <forms>
        <dependencies>
            <js src="/js/email-form-field-validation-handler.js"/>
        </dependencies>
    </forms>
</config>
```

 Then we can use the field value validation handler as follows in the form definition:

 ```
<config><forms><form>
  ...
  <appearance>
    <field id="acme:emailAddress">
     <constraint-handlers>
       <constraint type="MANDATORY" validation-handler="MyCustomNamespace.forms.validation.checkEmailValidity" event="keyup"/>
     </constraint-handlers>
    </field>
```

|
|Deployment - App Server|Deploying field validation handlers directly into and Application server is not recommended as you would have to put files directly under tomcat/webapps/share/, and these files would then be gone as soon as the webapp is re-deployed or upgraded. It is better to use a [Share AMP project](../tasks/alfresco-sdk-tutorials-share-amp-archetype.md).|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-share-amp-archetype.md)|-   share-amp/src/main/resources/js/ - validation handler JavaScript files
-   share-amp/src/main/resources/META-INF/share-config-custom.xml - form definitions with validation handlers

|
|More Information|-   [Forms Reference](../references/forms-reference.md): see the `constraint-handlers` description
-   [Forms](forms-intro.md)

|
|Tutorials| |
|Alfresco Developer Blogs| |

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

