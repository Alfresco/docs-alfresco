---
author: Alfresco Documentation
---

# CRUD service - update

This tutorial shows you how to update items using the `CrudService`.

You need to have completed the [previous tutorial](aikau-tutorials-crud-delete.md).

In this tutorial you learn how to update items using the `CrudService`. This is done using a widget type that supports inline editing.

1.  Add the following code to the end of the code of the previous tutorial:

    ```
    
    var dataListTitle = widgetUtils.findObject(model.jsonModel.widgets, "id", "DATA_LIST_TITLE");
    dataListTitle.name = "alfresco/renderers/InlineEditProperty";
    dataListTitle.config = {
      propertyToRender: "title",
      postParam: "prop_cm_title",
      refreshCurrentItem: true,
      requirementConfig: {
        initialValue: true
      },
      publishTopic: "ALF_CRUD_CREATE",
      publishPayloadType: "PROCESS",
      publishPayloadModifiers: ["processCurrentItemTokens", "convertNodeRefToUrl"],
      publishPayloadItemMixin: false,
      publishPayload: {
        url: "api/node/{nodeRef}/formprocessor",
        noRefresh: true,
        successMessage: "Update success"
      }
    };                        
                        
    ```

    The `ALF_CRUD_CREATE` topic has been used to perform a POST request rather than an `ALF_CRUD_UPDATE` topic because the FormsProcessor does not support PUT. The other configuration attributes of note are `publishPayloadItemMixin` is set to `false` in order to prevent the default behaviour of including the `currentItem` object in the publication, as doing so would cause issues with the FormsProcessor. The attribute `noRefresh` is set to `true` in the payload to override the default behaviour of publishing a reload topic to refresh the list.

    The `alfresco/renderers/InlineEditProperty` widget allows inline editing of properties. This widget, like all Aikau widgets, has been written to be extendable. The `alfresco/renderers/InlineEditSelect` widget is an example of extending it. It uses an `alfresco/forms/Form` widget \(again – an example of how Aikau aims to re-use as much code as possible\) so that all the power of the forms handling widgets is leveraged. The main configuration settings to note are:

    -   `postParam` - is set when the `propertyToRender` does not match the expected request parameter on the REST API. If `postParam` is omitted then the request parameter name will be the configured `propertyToRender` value.
    -   `refreshCurrentItem` - when set to true it ensures that any changes are applied to any other widgets dependant upon the `currentItem` object. The `requirementConfig` is the same as is used in Aikau form widgets and this piece of configuration is delegated to the underlying form control, in this case an `alfresco/forms/controls/DojoValidationTextBox` widget.
2.  Access the following URL with your web browser:

    ```
    
     http://localhost:8081/share/page/dp/ws/simple-page
                        
    ```

    You will see you have the ability to update the data lists.


You have seen how a user interface control can be updated using the inline capability of widgets.

**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

