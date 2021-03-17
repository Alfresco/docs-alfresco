---
author: Alfresco Documentation
---

# Example 2: Dynamic image

Create another new item for the form stencil, for example, create a configurable image. Unlike the static image of the previous example, the user building the form will be able to select the image that will be displayed.

The *Form runtime template* needs to show the image that the form builder has selected. Assume that a property *url* is set \(see later on\). Note the use of *ng-src* \(see [AngularJs docs on ng-src](https://docs.angularjs.org/api/ng/directive/ngSrc)\) to have a dynamic image:

```
<img ng-src="{{field.params.customProperties.url}}"></img>
```

Note the syntax **field.params.customProperties** to get access to the non-default properties of the form field.

The *Form editor template* simply needs to be a generic depiction of an image or even simpler like here, just a bit of text

```
<i>The custom image here</i>
```

Don’t forget to add a property *url* to this stencil item with the name *url* and type *text*.

**Parent topic:**[Custom form fields](../topics/custom_form_fields.md)

