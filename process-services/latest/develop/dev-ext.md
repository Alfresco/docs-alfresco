---
title: Developing for Process Services
---

This guide describes how to develop extensions and customize Process Services.

Before beginning, you should read the [Installing]({% link process-services/latest/install/index.md %}) and 
[Configuring]({% link process-services/latest/config/index.md %}) sections to 
make sure you have an understanding of how Process Services is installed and configured.

## Embed Process Services in another application

The components of the Process Services app can be included in an existing or other application by referencing the 
correct Maven dependencies and adding the necessary Spring configuration beans. To help you get started, an example 
application has been created, called `activiti-app-embedded-example`. If you don’t have this example project as part of 
the Process Services download, ask for a copy from your Alfresco account or sales representative.

The Maven `pom.xml` file in this example project can be used to get an overview of all necessary Maven dependencies. 
The example project also contains the Spring configuration beans that are needed by the Process Services components.

The `src/main/webapp` folder contains all the JavaScript sources of the Process Services app in minified format. 
In addition, you can have access to the full JavaScript source that’s provided in a separate bundle. If the context 
root of the application is changed, make sure to change the URI configuration in the `app-cfg.js` file in 
the `src/main/webapp/scripts` folder.

## Maven modules

When customizing, overriding, or creating new logic in Process Services, it is useful to be able to develop against 
the relevant Maven modules.

The following Maven modules are the most important ones.

The diagram is structured in such a way that the lowest module is a dependency of the module one up higher (and so forth).

![maven_modules]({% link process-services/images/maven_modules.png %})

All Maven modules have `com.activiti` as Maven `groupId`. The version of the artifact is the release version of Process Services.

* `activiti-app-model` : Contains the *domain objects*, annotated with JPA annotations for persistency and various Spring repositories for executing the actual database operations. Also has the Java pojos of the JSON representations that are used for example as responses by the REST endpoints.
* `activiti-app-logic` : Contains the services and actual BPM Suite logic.
* `activiti-app-rest` : Contains the REST endpoints that are used by the UI and the public API.
* `activiti-app-dependencies` : Contains all the Process Services dependencies. It is also a convenient Maven module (packaging type is *pom*) for development.
* `activiti-app` : Contains configuration classes.
* `activiti-app-root`: Contains the root pom. **Do not use this for development.**

## Start and task form customization

The start and task forms that are part of a task view can be customized for specific requirements. The following 
JavaScript code example provides an overview of all the form and form field events that can be used to implement custom logic.

By default, a file name `render-form-extensions.js` in the `workflow/extensions` folder is present and loaded in 
the `index.html` file of the `workflow` folder. It has empty methods by default:

```javascript
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

This file can be changed to add custom logic. Alternatively, it is also possible to add new JavaScript files and 
reference them in the `index.html` file (do take those files in account when upgrading to newer versions of the 
application) but it is also possible to load additional folders using the resource loader, see 
[Custom web resources](TODO:custom_web_resources.md).

In every event method the full form variable is passed as a parameter. This form variable contains the form identifier 
and name, but also the full set of form fields with type and other configuration information.

In addition the changed field is passed when applicable and the Angular scope of the form renderer is also included. 
This is a regular Angular directive (that is, isolated) scope, with all methods available.

For example, to get the current user:

```javascript
formRendered:function(form, scope) {
    var currentUser = scope.$root.account;
    console.log(currentUser);
}
```

## Custom form fields

Custom form field types can be added through custom *form stencils*. A form stencil is based on the default form 
stencil and can have default form field types removed, reordered, tweaked (changing the name, icon, and so on.) 
or have new form field types.

Form stencils are defined in the **Stencils** section of the App Designer. A new form field type consists of the following:

* An HTML template that is rendered when drag and dropping from the palette on the form canvas is the form builder.
* An HTML template that is rendered when the form is displayed at run-time.
* An optional custom AngularJS controller in case custom logic needs to be applied to the form field.
* An optional list of third party scripts that are needed when working with the form field at run-time.

**Static image custom form field:**

This is a very basic example of a custom form field type that simply displays a static image.

Create a new form stencil in the App Designer and click the **Add new item** link.

The **Form run-time template** (the HTML used when the form is rendered at run-time) and the 
**Form editor template** (the HTML used in the form builder) is the same here:

```html
<img src="http://activiti.org/images/activiti_logo.png"></img>
```

**Dynamic image custom form field:**

Create another new item for the form stencil, for example, create a configurable image. Unlike the static image of the 
previous example, the user building the form will be able to select the image that will be displayed.

The **Form runtime template** needs to show the image that the form builder has selected. Assume that a property `url` is 
set (see later on). Note the use of `ng-src` (see [AngularJs docs on ng-src](https://docs.angularjs.org/api/ng/directive/ngSrc)) 
to have a dynamic image:

```html
<img ng-src="{{field.params.customProperties.url}}"></img>
```

Note the syntax **field.params.customProperties** to get access to the non-default properties of the form field.

The **Form editor template** simply needs to be a generic depiction of an image or even simpler like here, just a bit of text:

```html
<i>The custom image here</i>
```

Don’t forget to add a property `url` to this stencil item with the name `url` and type `text`.

**Dynamic pie chart custom form field:**

This example is more advanced then the previous two: it contains a simple list of number fields with a button at the 
bottom to add a new line item, while generating a pie chart on the right.

We’ll use the [Epoch library](https://github.com/fastly/epoch) as an example here. Download the following files from its Github site:

* [d3.min.js](https://raw.githubusercontent.com/mbostock/d3/v3.5.6/d3.min.js)
* [epoch.min.js](https://raw.githubusercontent.com/fastly/epoch/0.6.0/epoch.min.js)

Create a new form stencil item and name it "Chart". Scroll down to the **Script library imports** section, and upload 
the two libraries. At run-time, these third party libraries will be included when the form is rendered.

**Note**: The order in which the third party libraries are defined is important. Since the Epoch library depends on d3, d3 needs to be first in the table and epoch second (as that is the order in which they are loaded at run-time).

The **Form editor template** is the easy part. We could just use an image of a pie chart here.

```html
<img src="url_to_pie_chart_image.png"></img>
```

First define the controller for this form field type. The controller is an AngularJs controller, that does mainly three things:

* Keep a model of the line items
* Implement a callback for the button that can be clicked
* Store the value of the form field in the proper format of Process Services

```javascript
angular.module('activitiApp')
    .controller('MyController', ['$rootScope', '$scope', function ($rootScope, $scope) {

        console.log('MyController instantiated');

        // Items are empty on initialisation
        $scope.items = [];

        // The variable to store the piechart data (non angular)
        var pieChart;

        // Epoch can't use the Angular model, so we need to clean it
        // (remove hashkey etc, specific to Angular)
        var cleanItems = function(items) {
            var cleanedItems = [];
            items.forEach(function(item) {
               cleanedItems.push( { label: item.label, value: item.value} );
            });

            return cleanedItems;
        };

        // Callback for the button
        $scope.addItem = function() {

            // Update the model
            $scope.items.push({ label: 'label ' + ($scope.items.length + 1), value: 0 });

            // Update the values for the pie chart
            // Note: Epoch is not an angular lib so doesn't use the model directly
            if (pieChart === undefined) {

                pieChart = jQuery('.activiti-chart-' + $scope.field.id).epoch({
                    type: 'pie',
                    data: cleanItems($scope.items)
                });
                console.log('PieChart created');

            } else {

                $scope.refreshChart();

            }

        };


        // Callback when model value changes
        $scope.refreshChart = function() {
            pieChart.update(cleanItems($scope.items));
            console.log('PieChart updated');
        };


        // Register this controller to listen to the form extensions methods
        $scope.registerCustomFieldListener(this);

        // Deregister on form destroy
        $scope.$on("$destroy", function handleDestroyEvent() {
            console.log("destroy event");
            $scope.removeCustomFieldListener(this);
        });

        // Setting the value before completing the task so it's properly stored
        this.formBeforeComplete = function(form, outcome, scope) {
            console.log('Before form complete');
            $scope.field.value = JSON.stringify(cleanItems($scope.items));
        };

        // Needed when the completed form is rendered
        this.formRendered = function(form, scope) {
            console.log(form);
            form.fields.forEach(function(field) {
                if (field.type === 'readonly'
                      && $scope.field.id == field.id
                      && field.value
                      && field.value.length > 0) {

                    $scope.items = JSON.parse(field.value);
                    $scope.isDisabled = true;

                    pieChart = jQuery('.activiti-chart-' + $scope.field.id).epoch({
                        type: 'pie',
                        data: cleanItems($scope.items)
                    });

                }
            });
        };

}]);
```

The **Form runtime template** needs to reference this controller, use the model and link the callback for the button:

```javascript
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/epoch/0.6.0/epoch.min.css">

<div ng-controller="MyController" style="float:left;margin: 35px 20px 0 0;">
    <div ng-repeat="item in items">
          <input type="text" ng-model="item.label" style="width:200px; margin: 0 10px 10px 0;" ng-change="refreshChart()">
          <input type="number" ng-model="item.value" style="width: 80px; margin-bottom: 10px;" ng-change="refreshChart()">
    </div>

    <div>
        <button class="btn btn-default btn-sm" ng-click="addItem()" ng-disabled="isDisabled">
           Add item
        </button>
    </div>
</div>

<div class="epoch category10" ng-class="'activiti-chart-' + field.id" style="display:inline-block;width: 200px; height: 200px;"></div>
<div class="clearfix"></div>
```

At run-time, the following will be rendered:

![example-form-stencil]({% link process-services/images/example-form-stencil.png %})


## Custom web resources
## Document Templates
## Custom Logic
### Java Delegates
### Spring Beans
### Default Spring Beans
#### Audit Log Bean (auditLogBean)
#### Document Merge Bean (documentMergeBean)
#### Email Bean (emailBean)
#### User Info Bean (userInfoBean)
### Hook points
#### Login/LogoutListener
#### Process engine configuration configurer
#### Rule engine configuration configurer
#### Process Engine event listeners
#### Processing document generation variables
#### Business Calendar
### Custom REST endpoints
### Custom rule expression functions
## Custom Data Models
## Custom reports
### Implementing custom reports
## Cookie configuration
## Custom identity synchronization
### Example implementation
### Synchronization on boot
### Synchronization log entries
### Custom authentication
## Security configuration overrides
### Global security override
#### REST Endpoints security overrides
#### UserDetailsService override
### PasswordEncoder override
