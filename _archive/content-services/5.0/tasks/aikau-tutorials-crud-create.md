---
author: Alfresco Documentation
---

# CRUD service - create

This tutorial shows you how to create items using the `CrudService`.

You need to have completed the [previous tutorial](aikau-tutorials-crud-update.md).

In this tutorial you learn how to add new data list items to your existing data lists.

1.  Data lists in Share are created within sites and each data list is a new node created within a container folder within the site. When creating a new Data List it is necessary to know the `nodeRef` of that container to include in the POST request to create the data list. Since the REST API does not support creation using site and container IDs it is necessary to obtain the container `nodeRef` in the web script. You can add the following code to that in simple-page-get.js:

    ```
    
    var alfDestination = null;
    var result = 
      remote.call("/slingshot/datalists/lists/site/test/dataLists");
    if (result.status.code == status.STATUS_OK)
    {
      alfDestination = JSON.parse(result).container;
    }                        
                        
    ```

2.  The next step is to create a form to capture the data required for the POST request to create the data list:

    ```
    
    var formControls = [
      {
        name: "alfresco/forms/controls/DojoValidationTextBox",
        config: {
          name: "alf_destination",
          value: alfDestination,
          visibilityConfig: {
            initialValue: false
          }
        }
      },
      {
        name: "alfresco/forms/controls/DojoValidationTextBox",
        config: {
          label: "Title",
          name: "prop_cm_title",
          requirementConfig: {
            initialValue: true
          }
        }
      },
      {
        name: "alfresco/forms/controls/DojoTextarea",
        config: {
          label: "Description",
          name: "prop_cm_description"
        }
      },
      {
        name: "alfresco/forms/controls/DojoSelect",
        config: {
          label: "List Type",
          name: "prop_dl_dataListItemType",
          value: "dl:event",
          optionsConfig: {
            publishTopic: "ALF_GET_FORM_CONTROL_OPTIONS",
            publishPayload: {
              url: url.context + "/proxy/alfresco/api/classes/dl_dataListItem/subclasses", 
              itemsAttribute: "",
              labelAttribute: "title",
              valueAttribute: "name"
            }
          }
        }
      }
    ];                        
                        
    ```

    In the `DojoSelect` widget, note the `optionsConfig` section, which defines how to retrieve and render the options that need to be presented to the user.

    The options service, `alfresco/services/OptionsService`, will be used to handle requests for options. This service is designed to return data in the structure that form controls require and allows you to specify the:

    -   `itemsAttribute` – a dot-notation property to look-up in the JSON response body that identifies an array of options \(setting as the empty string indicates that the entire response is an array\).
    -   `labelAttribute` – the dot-notation property to use in each option as the label.
    -   `valueAttribute` - the dot-notation property to use in each option as the value.
3.  Adding a dialog box.
4.  The next step is to add a button to the page that will popup a dialog containing a form. Dialogs can be created using the `alfresco/dialogs/AlfDialogService`:

    ```
    
    var button = {
      name: "alfresco/buttons/AlfButton",
      config: {
        label: "New List",
        additionalCssClasses: "call-to-action",
        publishTopic: "ALF_CREATE_FORM_DIALOG_REQUEST",
        publishPayloadType: "PROCESS",
        publishPayloadModifiers: ["processCurrentItemTokens"],
        publishPayload: {
          dialogTitle: "New List",
          dialogConfirmationButtonTitle: "Save",
          dialogCancellationButtonTitle: "Cancel",
          formSubmissionTopic: "ALF_CRUD_CREATE",
          formSubmissionPayloadMixin: {
            url: "api/type/dl%3AdataList/formprocessor"
          },
          fixedWidth: true,
          widgets: formControls
        }
      }
    };                        
                        
    ```

    When clicked, the `alfresco/buttons/AlfButton` widget will publish the configured payload on the specified topic.

    The `dialogTitle`, `dialogConfirmationButtonTitle` and `dialogCancellationButtonTitle` should hopefully be self-explanatory. The widgets are just the form controls that we have previously defined. It is not necessary to create the `alfresco/forms/Form` since the `DialogService` handles this.

    Whenever the confirmation button on the dialog is clicked the value of the form will be published on the `formSubmissionTopic` item, which in this case will be handled by `alfresco/services/CrudService`. Additional data can be mixed in via the `formSubmissionPayloadMixin` item - in this case the actual URL that the CrudService will POST to.

5.  These objects are then added to the page:

    ```
    
    model.jsonModel.services.push("alfresco/dialogs/AlfDialogService",
                                  "alfresco/services/OptionsService");
    model.jsonModel.widgets.splice(0, 0, button);                        
                        
    ```

6.  Access the following URL with your web browser:

    ```
    
     http://localhost:8080/share/page/dp/ws/simple-page
                        
    ```

    You will see there is now a **New List** button. Click the button and complete the form to create a new data list item.


You have seen how to create a new data list item using the `CrudService`.

**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

