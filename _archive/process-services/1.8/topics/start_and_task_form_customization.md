---
author: Alfresco Documentation
---

# Start and task form customization

The start and task forms that are part of a task view can be customized for specific requirements. The following JavaScript code example provides an overview of all the form and form field events that can be used to implement custom logic.

By default, a file name *render-form-extensions.js* in the *workflow/extensions* folder is present and loaded in the *index.html* file of the *workflow* folder. It has empty methods by default:

```
var ALFRESCO = ALFRESCO || {};

ALFRESCO.formExtensions = {

    // This method is invoked when the form field have been rendered
    formRendered:function(form, scope) {

    },

    // This method is invoked when input values change (ng-change function)
    formFieldValueChanged:function(form, field, scope) {

    },

    // This method is invoked when an input field gets focus (focus event with ng-focus function)
    formFieldFocus:function(form, field, scope) {

    },

    // This method is invoked when an input field has lost focus (blur event with ng-blur function)
    formFieldBlur:function(form, field, scope) {

    },

    // This method is invoked when a person has been selected in the people picker
    formFieldPersonSelected:function(form, field, scope) {

    },

    // This method is invoked when an email has been filled-in in the people picker
    formFieldPersonEmailSelected:function(form, field, scope) {

    },

    // This method is invoked when a person has been removed in the people picker
    formFieldPersonRemoved:function(form, field, scope) {

    },

    // This method is invoked when a group has been selected in the functional group picker
    formFieldGroupSelected:function(form, field, scope) {

    },

    // This method is invoked when a group has been removed in the functional group picker
    formFieldGroupRemoved:function(form, field, scope) {

    },

    // This method is invoked when content has been uploaded in the upload field
    formFieldContentUploaded:function(form, field, scope) {

    },

    // This method is invoked when content has been removed in the upload field
    formFieldContentRemoved:function(form, field, scope) {

    },

    // This method is invoked when the REST values or set in a dropdown, radio or typeahead field
    formFieldRestValuesSet:function(form, field, scope) {

    },

    // This method is invoked when the complete or an outcome button has been clicked and before the task is completed.
    formBeforeComplete:function(form, outcome, scope) {

    },

    // This method is invoked when input values change (ng-change function) in a dynamic table
    formTableFieldValueChanged:function(form, field, columnDefinition, editRow, scope) {

    },

    // This method is invoked when an input field gets focus (focus event with ng-focus function) in a dynamic table
    formTableFieldFocus:function(form, field, columnDefinition, editRow, scope) {

    },

    // This method is invoked when an input field has lost focus (blur event with ng-blur function) in a dynamic table
    formTableFieldBlur:function(form, field, columnDefinition, editRow, scope) {

    },

    // This method is invoked when the REST values or set in a dropdown field in a dynamic table
    formTableFieldRestValuesSet:function(form, field, columnDefinition, editRow, scope) {

    },

        // This method is invoked when the form fields have been rendered in the dynamic table popup
        formTableRendered:function(form, field, columnDefinitions, editRow, scope) {

        },

        // This method is invoked when the complete button has been clicked and before the dynamic table popup is completed.
        formTableBeforeComplete:function(form, field, editRow, scope) {

        },

        // This method is invoked when the cancel button has been clicked and before the dynamic table popup is cancelled.
        formTableBeforeCancel:function(form, field, editRow, scope) {

    },

        // This method is invoked when input values change (ng-change function) and will disable the complete buttons when false (boolean) is returned.
        formValidateFieldValueChanged:function(form, field, scope) {

        },

        // This method is invoked when the complete button has been clicked and will prevent the form completion when false (boolean) is returned.
        formValidateBeforeSubmit:function(form, outcome, scope) {

        },

        // This method is invoked when input values change (ng-change function) in a dynamic table and will disable the save button when false (boolean) is returned.
        formTableValidateFieldValueChanged:function(form, field, columnDefinition, editRow, scope) {

        },

        // This method is invoked when the complete button has been clicked and before the dynamic table popup is completed and prevent the form completion
        // when false (boolean) is returned.
        formTableValidateBeforeComplete:function(form, field, editRow, scope) {

        },

    // This method is invoked when a task is completed successfully
    taskCompleted:function(taskId, form, scope) {

    },

    // This method is invoked when a task is completed unsuccessfully
    taskCompletedError:function(taskId, errorResponse, form, scope) {

    },

    // This method is invoked when a task is saved successfully
    taskSaved:function(taskId, form, scope) {

    },

    // This method is invoked when a task is saved unsuccessfully
    taskSavedError:function(taskId, errorResponse, form, scope) {

    }
};
```

This file can be changed to add custom logic. Alternatively, it is also possible to add new JavaScript files and reference them in the *index.html* file \(do take those files in account when upgrading to newer versions of the application\) but it is also possible to load additional folders using the resource loader, see [Custom web resources](custom_web_resources.md).

In every event method the full form variable is passed as a parameter. This form variable contains the form identifier and name, but also the full set of form fields with type and other configuration information.

In addition the changed field is passed when applicable and the Angular scope of the form renderer is also included. This is a regular Angular directive \(that is, isolated\) scope, with all methods available.

For example, to get the current user:

```

    formRendered:function(form, scope) {
    var currentUser = scope.$root.account;
    console.log(currentUser);
}
```

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

