---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: Forms
---

# Customizing forms controls

One of the most common customization is to add new controls. A control is the label for a field and the interface that the user interacts with for setting the value of the field.

A control is a Freemarker template snippet that includes the markup to define the control. The model for the template includes the field and form being generated, represented by a `field` and `form` object, respectively. The following snippet shows the structure of the `field` object, using the `cm:name` property as an example:

```
{
   kind : "field",
   id : "prop_cm_name",
   configName : "cm:name",
   name : "prop_cm_name",
   dataType : "d:text",
   type : "property",
   label : "Name",
   description : "Name",
   mandatory : true
   disabled : false,
   repeating : false,        
   dataKeyName : "prop_cm_name",
   value : "plain-content.txt",
   control:
   {
      params: {},
      template : "controls/textfield.ftl"
   }
}
```

Although the `id` property provides a unique identifier for the field, it is only scoped to the current form. If there are multiple forms on the page containing the same field, this identifier will not be unique. The model property `fieldHtmlId` should be used as the identifier for the control, as this is guaranteed to be unique for the page.

The state of the `disabled` property must always be adhered to when implementing controls as this is driven from the field definition returned from the FormService and from the `read-only` attribute in the form configuration. If the `disabled` property is set to true, the control should never allow the value to be edited.

The control is also responsible for rendering an appropriate UI representation for the mode the form is currently in. The form mode can be retrieved from the `form.mode` property. A pattern used by most the out-of-the-box controls is shown below.

```
<#if form.mode == "view">
   // view representation goes here...
<#else>
   // edit and create representation goes here...
</#if>

```

The final rule for controls is that they must supply the field current value in a DOM element that has a `value` property and the `id` property set to the value of `fieldHtmlId` Freemarker variable.

For advanced controls, that is, association, date, period, and so on, this usually requires a hidden `form` field.

**Parent topic:**[Forms](../concepts/forms-intro.md)

