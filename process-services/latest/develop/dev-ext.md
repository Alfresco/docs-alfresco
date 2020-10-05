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

If you want to add additional JavaScript functionality or override CSS rules, you can configure lists of additional 
web resources that are loaded by the browser for each Process Services app. You do this by configuring a new resource 
in the `tomcat/webapps/activiti-app` folder.

Following is an example of a new resource section in the `app-cfg.js` file located in the 
`tomcat/webapps/activiti-app/scripts` folder:

```json
ACTIVITI.CONFIG.resources = {
    '*': [
        {
            'tag': 'link',
            'rel': 'stylesheet',
            'href': ACTIVITI.CONFIG.webContextRoot + '/custom/style.css?v=1.0'
        }
    ],
    'workflow': [
        {
            'tag': 'script',
            'type': 'text/javascript',
            'src': ACTIVITI.CONFIG.webContextRoot + '/custom/javascript.js?v=1.0'
        }
    ]
};
```

The `ACTIVITI.CONFIG.resources` object makes it possible to load different files for each of the Activiti applications 
using their names as key for a list of additional resources that shall be loaded, the different app names are: 
`landing`, `analytics`, `editor`, `idm` and `workflow`. The `*` key means that a default resource list will be used 
unless there is a specific config key for the app being loaded.

For example, if a user would enter the `editor` app, with the config above deployed, `custom/style.css` would be the 
only custom resource that would be loaded. If a user would go to the `workflow` app, `custom/javascript.js` would be 
the only custom resource that would be loaded. So if `workflow` also wants to load the `custom/style.css` that would 
have to be specified again inside the *workflow* resource list.

>**Note:** Remember to modify the `v`-parameter when you have done changes to your files to avoid the browser from using a cached version of your custom logic.

## Document Templates

Use the **Generate Document** task to generate a PDF or Microsoft Word document based on a Word document template (.docx). 
You can insert process variables in the MS Word template that will be replaced with actual values during document transformation.

A document template can be:

* **Tenant wide**: Anyone can use this template in their processes. Useful for company templates.
* **Process model specific**: This template is uploaded while modeling the process model, and is bound to the lifecycle of the process model.

When exporting an App model, process model document templates are included by default and are uploaded again on import. 
Tenant document templates are not exported, however matched by the document template name as names are unique for 
tenant document templates.

In the `.docx` template, you can insert process variables using the following syntax:

```text
<<[myVariable]>>
```

Since the above method does not perform `null` checks, an exception will be thrown at run-time if the variable is `null`. 
Therefore, use the following method to prevent such errors:

```text
<<[variables.get("myVariable")]>>
```

If this variable is `null`, a default value will be inserted instead. You can also provide a default value:

```text
<<[variables.get("myVariable", "myDefaultValue")]>>
```

>**Note**: Form field types such as Dropdown, Radio button, and Typeahead use `myVariable_ID` for ID and `myVariable_LABEL` for label value. The ID is the actual value used by service tasks and are inserted by default. To display the label value in the generated document, use `myVariable_LABEL`.

The document generation method uses libraries provided by Aspose in the back-end.

When using the **Generate Document** task, make sure that you use the correct syntax for your variables and expressions. 
Surround your variables with `<<[..]>>` characters. For example:

* `<<[variableid]>>`
* `<<[variables.get("variableid")]>>`
* `<<[variables.get("variableid","adefaultifnull")]>>`

Some more examples:

* If/else conditional blocks:
    * Text type: `<<if [textfield==day]>> AM, <<else>> PM \<</if>>`
    * Amount type: `<<if [annualsalary > $40000]>>, it is generous, <<else>> a standard starting salary \<</if>>`
    * Checkbox: `<<if [senstitiveflag=="true"]>>it is Confidential, <<else>> Not Confidential \<</if>>`
* Date type: `<<[datefield]>>`
* Format date type: `<<[datefield]>>:"yyyy.MM.dd">>`
* Number/amount: `<<[amountfield]>>`
* String Boolean: `<<[Genericcheckbox]>>`
* Radio button / Typehead / dropdown: Select `<<[Options_LABEL]>> with an ID <<[Options_ID]>>`

The audit log is also generated the same way.

For example, the following snippet from the template shows advanced constructs:

![doc-gen-template-example]({% link process-services/images/doc-gen-template-example.png %})

It is also possible to have custom Spring bean that processes the process variables just before rendering the document, 
[Processing document generation variables](TODO:processing_document_generation_variables.md).

## Custom Logic

Custom logic in a business process is often implemented using a `JavaDelegate` implementation or a Spring bean.

To build against a specific version of Process Services, add the following dependency to your Maven `pom.xml` file:

```xml
<dependencies>
    <dependency>
        <groupId>com.activiti</groupId>
        <artifactId>activiti-app-logic</artifactId>
        <version>${suite.version}</version>
    </dependency>
</dependencies>
```

### Java Delegates

The simplest option is to create a class that implements the `org.activiti.engine.delegate.JavaDelegate` interface.

```java
package my.company;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;

public class MyJavaDelegate implements JavaDelegate {

    public void execute(DelegateExecution execution) throws Exception {
        System.out.println("Hello from the class delegate");
        execution.setVariable("var1", "Hello from the class delegate");
    }

}
```

Build a jar with this class, and add it to the classpath. In the Service task configuration, set the `class` property 
to using the fully qualified classname (in this case `my.company.MyJavaDelegate`).

### Spring Beans

Another option is to use a Spring bean. It is possible to use a `delegateExpression` on a service task that resolves 
at run-time to an instance of `org.activiti.engine.delegate.JavaDelegate`. Alternatively, and probably more useful, 
is to use a general Spring bean. The application automatically scans all beans in the `com.activiti.extension.bean` 
package. For example:

```java
package com.activiti.extension.bean;

import org.activiti.engine.impl.pvm.delegate.ActivityExecution;
import org.springframework.stereotype.Component;

@Component("helloWorldBean")
public class HelloWorldBean {

        public void sayHello(ActivityExecution execution) {
                System.out.println("Hello from " + this);
                execution.setVariable("var3", " from the bean");
        }


}
```

Build a jar with this class, and add it to the classpath. To use this bean in a service task, set the `expression` property 
to `${helloWorldBean.sayHello(execution)}`.

It is possible to define custom configuration classes (using the Spring Java Config approach) if this is needed 
(for example when sharing dependencies between delegate beans, complex bean setup, etc.). The application automatically 
scans for configuration classes in the `package com.activiti.extension.conf;` package. For example:

```java
package com.activiti.extension.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomConfiguration {

        @Bean
        public SomeBean someBean() {
                return new SomeBean();
        }

}
```

Which can be injected in the bean that will be called in a service task:

```java
package com.activiti.extension.bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.activiti.extension.conf.SomeBean;

@Component("helloWorldBeanWithInjection")
public class HelloWorldBeanWithInjection {

        @Autowired
        private SomeBean someBean;

        public void sayHello() {
                System.out.println(someBean.getValue());
        }

}
```

To get the current user, it is possible to use the `com.activiti.common.security.SecurityUtils` helper class.

**Bean Whitelisting**

By default, you can specify any Spring bean for use in an expression. While this provides ease of use 
(since any beans you develop will be automatically scanned for as described above), it also increases the 
possibilities of misuse and security threats. To help prevent these issues from happening, you can whitelist 
Spring beans by making the following changes:

1.  Open the `<InstallLocation>/tomcat/lib/activiti-app.properties` file.
2.  Locate and set `beans.whitelisting.enabled` to true.

    ```text
    beans.whitelisting.enabled=true
    ```

    >**Note:** If this property is missing from the `activiti-app.propertie`s file, beans whitelisting is disabled.

3.  To whitelist Spring beans, use the following configuration setting:

    ```text
    activiti-app/WEB-INF/classes/activiti/beans-whitelist.conf
    ```

**Example usage of bean whitelisting:**

To use a `userCount` variable in a **Display Text** field, `${userCount}`, add the following line in the Expression 
property within a Service Task:

```javascript
${execution.setVariable('userCount', userService.getUserCount())}
```

If `beans.whitelisting.enabled` is set to false or the property is missing, the process is completed and the 
**Display Text** field should show the value of the `usercount` variable.

To complete the process successfully using bean whitelisting, you must set `beans.whitelisting.enabled` to true and 
add the bean name to `beans-whitelist.conf`:

```text
# list bean names that should be whitelisted
   userService
```

>**Note:** All beans declared in `com.activiti.extension.bean` are considered as whitelisted.

>**Note:** This note applies to users of Process Services version 1.6.0 to 1.6.2 inclusive as well as apps published in these versions. Whitelisting for publish tasks is exempt from version 1.6.3. If you wish to use tasks that publish to Box, Google Drive or Alfresco and have enabled bean whitelisting, the following beans need to be explicitly whitelisted in `beans-whitelist.conf`:
>
>* repositoryService
>* formRepository
>* objectMapper
>* relatedContentService
>* relatedContentProcessor
>* historyService
>* alfrescoMetadataProcessor

**Service Task Class Whitelisting**

This provides an alternative to bean whitelisting that enables more fine-grained control over what a developer can execute. 
For example, you can configure which patterns you allow to be executed using expressions.

You can also whitelist full class names or package patterns such as `com.activiti.*`.

To whitelist service task classes, do the following:

1.  Open the `<InstallLocation>/tomcat/lib/activiti-app.properties` file.
2.  Locate and set `service.task.class.whitelisting.enabled` to true.

    ```text
    class.whitelisting.enabled=true
    ```

    >**Note:** If this property is missing from the `activiti-app.properties` file, service task whitelisting is disabled.

3.  **This step applies only to users of Process Services version 1.6.0 to 1.6.2 inclusive as well as apps published in these versions. Whitelisting for publish tasks is exempt from version 1.6.3.** To use Alfresco, Box or Google drive to publish tasks with service task whitelisting enabled, add the following entries to `activiti-app/WEB-INF/classes/activiti/whitelisted-classes.conf`:
    * `com.activiti.runtime.activiti.bean.BoxStepActivityBehavior`
    * `com.activiti.runtime.activiti.bean.GoogleDriveStepActivityBehavior`
    * `com.activiti.runtime.activiti.KickstartAlfrescoPublishDelegate`
    * `com.activiti.runtime.activiti.KickstartAlfrescoCloudPublishDelegate`

**Whitelisting Scripting Languages**

To whitelist scripting languages that, for example, might be used in script tasks such as JavaScript, juel and groovy, 
add the script types in `activiti-app/WEB-INF/classes/activiti/whitelisted-scripts.conf`:

```text
#Here you can specify which script types are allowed to be executed
javascript
js
ecmascript
groovy
juel
```

>**Note:** Whitelisting configuration affects any type of script execution whether this involves script tasks or any other situation in which a script might be used. Also note that this is verified at runtime. If a scripting language is not whitelisted the related task or activity will not run.

**Class whitelisting in JavaScript**

You can also configure whitelisting for JavaScript classes that are available for use in JavaScript. The following steps 
show you how to do this. They are, however, only applicable where you have enabled secure scripting for JavaScript. 
This will be the case if you have set the property `javascript.secure-scripting.enabled` to true:

```text
javascript.secure-scripting.enabled=true
```

1.  Open the `<InstallLocation>/tomcat/lib/activiti-app.properties` file.
2.  Locate and set `javascript.secure-scripting.enable-class-whitelisting` to true.

    ```text
    javascript.secure-scripting.enable-class-whitelisting = true
    ```

3.  To allow the execution of JavaScript classes, add them to `activiti-app/WEB-INF/classes/activiti/javascript-whitelist-classes.conf`:

    ```text
    java.lang.System
    java.util.ArrayList
    org.apache.tomcat.util.log.SystemLogHandler
    ```

>**Note:** The enablement of secure scripting for Java classes used in JavaScript is turned on when either the setting is missing from the properties file or commented out.

### Default Spring Beans

Use the following sections for information about the default spring beans in Process Services.

#### Audit Log Bean (auditLogBean)

The `auditLogBean` can be used to generate audit logs in `.pdf` format for a completed process instance or a completed task. 
The log will be saved as a field value for the process and the task (if a task audit log is generated).

>**Note:** Audit logs can only be used against a completed process instance or a completed task.

The following code can be used in the expression of a service task to generate a process instance audit log named 
*My first process instance audit log*. The third argument determines if the current date shall be appended to the 
file name. The pdf will be associated with the process field `myFieldName`.

```javascript
${auditLogBean.generateProcessInstancePdf(execution, 'My first process instance audit log', true, 'myFieldName')}
```

To create a task audit log named *My first task audit log* add the following expression to the "complete" event in a 
task listener. Again the third argument determines if the current date shall be appended to the file name. 
The pdf will be associated with the field `myFieldName`.

```javascript
${auditLogBean.generateTaskPdf(task, 'My first task audit log', true, 'myFieldName')}
```

You can view the audit logs from the My Tasks app by clicking the "Audit Log" link when viewing the details of a 
completed process or task. When doing so the following two rest calls are made.

Process instance audit log:

```bash
GET app/rest/process-instances/{process-instance-id}/audit
```

Task audit log:

```bash
GET app/rest/tasks/{task-id}/audit
```

#### Document Merge Bean (documentMergeBean)

The `documentMergeBean` can be used to merge the content of multiple documents (files of type `.doc` or `.docx`) from a 
process into a single document which will be become the value of a provided process variable. The file name of the 
new document will be set to the file name of the first field in the list followed by the string "_merged" and the 
suffix from the same field.

In the following example, the content of `myFirstField` and `mySecondField` will be merged into a new document with 
the field ID set to `myFirstField` and the filename set to:

`<filename-from-myFirstField>_merged.<filenameSuffix-from-myFirstFields>`

The new document will become the value of a process variable named `myProcessVariable`.

```javascript
${documentMergeBean.mergeDocuments('myFirstField,mySecondField', 'myProcessVariable', execution)}
```

#### Email Bean (emailBean)

The `emailBean` can be used to retrieve the email of the current user or the process initiator.

To get the email of the current user use the following expression where `123` is the `userId`:

```javascript
${emailBean.getEmailByUserId(123, execution)}
```

To get the email of the process initiator use the following expression:

```javascript
${emailBean.getProcessInitiator(execution)}
```

#### User Info Bean (userInfoBean)

The `userInfoBean` makes it possible to get access to general information about a user or just the email of a user.

To get general information about a user (the data that can be found in `com.activiti.domain.idm.User`), use the 
following expression where `userId` is the database ID of the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getUser(123, execution)}
```

To get the email of a user use the following expression where `123` is the database id of the user and can be 
supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getEmail(123, execution)}
```

To get the first name of a user use the following expression where `123` is the database id of the user and can 
be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getFirstName(123, execution)}
```

To get the last name of a user use the following expression where `123` is the database id of the user and can 
be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getLastName(123, execution)}
```

To get both first name and last name of a user use the following expression where `123` is the database id of 
the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getFullName(123, execution)}
```

To get a user object representing the current user use the following expression where the returned value is 
an instance of `LightUserRepresentation` containing fields like `id`, `firstName`, `lastName`, `email`, `externalId`, `pictureId`:

```javascript
${userInfoBean.getCurrentUser()}
```

To get a user’s primary group name use the following expression where `123` is the database id of the user 
and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getPrimaryGroupName(123)}
```

To get a group object representing a user’s primary group use the following expression where the return value is 
an instance of `LightGroupRepresentation`, containing id, name, externalId and status, and where `123` is the database 
id of the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getPrimaryGroup(123)}
```

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
