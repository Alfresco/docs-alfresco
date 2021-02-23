---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: Forms
---

# Forms

Alfresco Share presents data view and entry forms throughout its user interface, which are built on the Surf framework. This framework provides a convention for implementing forms.

Both DM \(Document Management\) and WCM \(Web Content Management\) forms use the same services, meaning that Alfresco uses only one configuration syntax and one set of UI controls for forms.

-   **[Use of forms in Share](../concepts/forms-use.md)**  
Forms are used in the View Metadata and Edit Metadata pages within Share.
-   **[Forms architecture](../concepts/forms-mechanism.md)**  
The forms engine consists of four major parts:
-   **[Forms event sequence](../concepts/forms-evensequ.md)**  
When a request is made to a page containing the form component, the following sequence of events occurs.
-   **[Configuring forms](../tasks/forms-config.md)**  
The default forms configuration is specified in the <configRootShare\>/classes/alfresco/share-form-config.xml file. This file contains all the default controls and constraint handlers for the Alfresco content model and the form configuration for the `cm:content`and `cm:folder` types. This file also contains an example of configuring the `cm:content` type.
-   **[Customizing forms controls](../tasks/forms-controls-custom.md)**  
One of the most common customization is to add new controls. A control is the label for a field and the interface that the user interacts with for setting the value of the field.
-   **[Customizing the validation handler](../tasks/forms-valhandler.md)**  
A validation handler is a small JavaScript function that gets called by the forms runtime when a field value needs to be validated.
-   **[Displaying type metadata](../tasks/forms-type-display.md)**  
You can configure the type metadata in the share-config-custom.xml file in <web-extension\>. It is also possible to deploy custom configurations via JARs or AMPs.
-   **[Displaying aspect metadata](../tasks/forms-aspect-display.md)**  
Add the properties and associations defined on aspects by adding them to the list of fields to show for a type. The aspects that appear can be defined on a type by type basis, and you can control the ordering of the fields.
-   **[Configuring a form control](../tasks/forms-formcontrol-config.md)**  
Most of the built in controls have parameters, which allow some basic customization.
-   **[Grouping fields](../tasks/forms-grouping-fields.md)**  
For longer forms, you can group fields together in logical grouped or nested sections.
-   **[Changing the default set label](../tasks/forms-setlabel-change.md)**  
Fields that do not specify a set belong to the implicit `default` set. They are rendered together, by default, but without any visual grouping.
-   **[Providing a custom form control](../tasks/forms-custom-formcontrol.md)**  
If none of the out-of-the-box controls are sufficient, you can add new controls and reference them. Controls are Freemarker template snippets, therefore, they contain only the HTML markup required to represent the control. The templates need to be stored in the site-webscripts directory, which will usually be in the application server shared classpath.
-   **[Changing the field label position](../tasks/forms-fieldlable-change.md)**  
By default, forms are rendered with the field labels positioned above the input control.
-   **[Providing a custom form template](../tasks/forms-custom-formtemplate.md)**  
The default template that renders the form UI generates one column of fields. There are scenarios where more control may be required over the layout. To enable these scenarios, it is possible to replace the default template with a custom template. A different template can be provided for each form mode.
-   **[Forms reference](../concepts/forms-reference.md)**  
This reference contains detailed information for forms controls and the configuration syntax.

**Parent topic:**[Customizing Alfresco Share](../concepts/share-customizing-intro.md)

