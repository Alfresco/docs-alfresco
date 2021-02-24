---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: Forms
---

# Forms event sequence

When a request is made to a page containing the form component, the following sequence of events occurs.

1.  The form component looks up the form configuration for the item being requested.
2.  The form component retrieves the list of fields to display \(if any\) and requests a form definition for those fields and the item from the form service via its REST API.
3.  The form service looks for a form processor that can process the kind of item.
4.  The form processor is asked to generate a form definition.
5.  The form processor executes any registered filters before and after the main processing.
6.  The REST API takes the result from the form processor/form service and constructs the form definition JSON response.
7.  The form component receives the result from the form service and combines it with the form configuration to produce the form UI model.
8.  The form component Freemarker template iterates around the fields and includes the relevant controls.
9.  The form component Freemarker template instantiates the FormUI JavaScript component.
10. The FormUI JavaScript instantiates the forms runtime and registers all validation handlers.

For a description of the available form controls, refer to [Forms reference](forms-reference.md)

At this point, the form is ready for the user to interact. When the user interacts with the form, the forms runtime constantly checks the validation rules enabling and disabling the **Submit** button appropriately. When the user submits the form, the following sequence of events occurs.

1.  The browser submits the form by calling the REST API.
2.  The form service looks for a form processor that can process the kind of item.
3.  The form processor is asked to persist the form data.
4.  The form processor executes any registered filters before and after the main processing.
5.  The REST API takes the result from the form processor/form service and constructs the JSON response.
6.  The browser receives the response and processes it appropriately.

**Parent topic:**[Forms](../concepts/forms-intro.md)

