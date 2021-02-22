---
author: Alfresco Documentation
---

# Custom form fields

Custom form field types can be added through custom *form stencils*. A form stencil is based on the default form stencil and can have default form field types removed, reordered, tweaked \(changing the name, icon, and so on.\) or have new form field types.

Form stencils are defined in the *Stencils* section of the App Designer. A new form field type consists of the following:

-   An HTML template that is rendered when drag and dropping from the palette on the form canvas is the form builder.

-   An HTML template that is rendered when the form is displayed at run-time.

-   An optional custom AngularJS controller in case custom logic needs to be applied to the form field.

-   An optional list of third party scripts that are needed when working with the form field at run-time.


-   **[Example 1: Static image](../topics/example_1_static_image.md)**  

-   **[Example 2: Dynamic image](../topics/example_2_dynamic_image.md)**  
Create another new item for the form stencil, for example, create a configurable image. Unlike the static image of the previous example, the user building the form will be able to select the image that will be displayed.
-   **[Example 3: Dynamic pie chart](../topics/example_3_dynamic_pie_chart.md)**  
This example is more advanced then the previous two: is contains a simple list of number fields with a button at the bottom to add a new line item, while generating a pie chart on the right.

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

