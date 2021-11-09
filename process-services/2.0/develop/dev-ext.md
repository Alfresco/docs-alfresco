---
title: Develop extensions for Process Services
---

This guide describes how to develop extensions and customize Process Services.

Before beginning, you should read the [Installing]({% link process-services/2.0/install/index.md %}) and [Configuring]({% link process-services/2.0/config/index.md %}) sections to make sure you have an understanding of how Process Services is installed and configured.

## Embed Process Services in another application

The components of the Process Services app can be included in an existing or other application by referencing the
correct Maven dependencies and adding the necessary Spring configuration beans. To help you get started, an example application has been created, called `activiti-app-embedded-example`. If you don’t have this example project as part of the Process Services download, ask for a copy from your Alfresco account or sales representative.

The Maven `pom.xml` file in this example project can be used to get an overview of all necessary Maven dependencies. The example project also contains the Spring configuration beans that are needed by the Process Services components.

The `src/main/webapp` folder contains all the JavaScript sources of the Process Services app in minified format. In addition, you can have access to the full JavaScript source that’s provided in a separate bundle. If the context root of the application is changed, make sure to change the URI configuration in the `app-cfg.js` file in the `src/main/webapp/scripts` folder.

## Maven modules

When customizing, overriding, or creating new logic in Process Services, it is useful to be able to develop against the relevant Maven modules.

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

The start and task forms that are part of a task view can be customized for specific requirements. The following JavaScript code example provides an overview of all the form and form field events that can be used to implement custom logic.

By default, a file name `render-form-extensions.js` in the `workflow/extensions` folder is present and loaded in the `index.html` file of the `workflow` folder. It has empty methods by default:

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

This file can be changed to add custom logic. Alternatively, it is also possible to add new JavaScript files and reference them in the `index.html` file (do take those files in account when upgrading to newer versions of the application) but it is also possible to load additional folders using the resource loader, see [Custom web resources](#custom-web-resources).

In every event method the full form variable is passed as a parameter. This form variable contains the form identifier and name, but also the full set of form fields with type and other configuration information.

In addition the changed field is passed when applicable and the Angular scope of the form renderer is also included. This is a regular Angular directive (that is, isolated) scope, with all methods available.

For example, to get the current user:

```javascript
formRendered:function(form, scope) {
    var currentUser = scope.$root.account;
    console.log(currentUser);
}
```

## Custom form fields

Custom form field types can be added through custom *form stencils*. A form stencil is based on the default form stencil and can have default form field types removed, reordered, tweaked (changing the name, icon, and so on.) or have new form field types.

Form stencils are defined in the **Stencils** section of the App Designer. A new form field type consists of the following:

* An HTML template that is rendered when drag and dropping from the palette on the form canvas is the form builder.
* An HTML template that is rendered when the form is displayed at run-time.
* An optional custom AngularJS controller in case custom logic needs to be applied to the form field.
* An optional list of third party scripts that are needed when working with the form field at run-time.

**Static image custom form field:**

This is a very basic example of a custom form field type that simply displays a static image.

Create a new form stencil in the App Designer and click the **Add new item** link.

The **Form run-time template** (the HTML used when the form is rendered at run-time) and the **Form editor template** (the HTML used in the form builder) is the same here:

```html
<img src="http://activiti.org/images/activiti_logo.png"></img>
```

**Dynamic image custom form field:**

Create another new item for the form stencil, for example, create a configurable image. Unlike the static image of the previous example, the user building the form will be able to select the image that will be displayed.

The **Form runtime template** needs to show the image that the form builder has selected. Assume that a property `url` is set (see later on). Note the use of `ng-src` (see [AngularJs docs on ng-src](https://docs.angularjs.org/api/ng/directive/ngSrc){:target="_blank"} to have a dynamic image:

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

This example is more advanced then the previous two: it contains a simple list of number fields with a button at the bottom to add a new line item, while generating a pie chart on the right.

We’ll use the [Epoch library](https://github.com/fastly/epoch){:target="_blank"} as an example here. Download the following files from its Github site:

* [d3.min.js](https://raw.githubusercontent.com/mbostock/d3/v3.5.6/d3.min.js){:target="_blank"}
* [epoch.min.js](https://raw.githubusercontent.com/fastly/epoch/0.6.0/epoch.min.js){:target="_blank"}

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

If you want to add additional JavaScript functionality or override CSS rules, you can configure lists of additional web resources that are loaded by the browser for each Process Services app. You do this by configuring a new resource in the `tomcat/webapps/activiti-app` folder.

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

The `ACTIVITI.CONFIG.resources` object makes it possible to load different files for each of the Activiti applications using their names as key for a list of additional resources that shall be loaded, the different app names are: `landing`, `analytics`, `editor`, `idm` and `workflow`. The `*` key means that a default resource list will be used unless there is a specific config key for the app being loaded.

For example, if a user would enter the `editor` app, with the config above deployed, `custom/style.css` would be the
only custom resource that would be loaded. If a user would go to the `workflow` app, `custom/javascript.js` would be
the only custom resource that would be loaded. So if `workflow` also wants to load the `custom/style.css` that would
have to be specified again inside the *workflow* resource list.

>**Note:** Remember to modify the `v`-parameter when you have done changes to your files to avoid the browser from using a cached version of your custom logic.

## Document Templates

Use the **Generate Document** task to generate a PDF or Microsoft Word document based on a Word document template (.docx). You can insert process variables in the MS Word template that will be replaced with actual values during document transformation.

A document template can be:

* **Tenant wide**: Anyone can use this template in their processes. Useful for company templates.
* **Process model specific**: This template is uploaded while modeling the process model, and is bound to the lifecycle of the process model.

When exporting an App model, process model document templates are included by default and are uploaded again on import. Tenant document templates are not exported, however matched by the document template name as names are unique for tenant document templates.

In the `.docx` template, you can insert process variables using the following syntax:

```text
<<[myVariable]>>
```

Since the above method does not perform `null` checks, an exception will be thrown at run-time if the variable is `null`. Therefore, use the following method to prevent such errors:

```text
<<[variables.get("myVariable")]>>
```

If this variable is `null`, a default value will be inserted instead. You can also provide a default value:

```text
<<[variables.get("myVariable", "myDefaultValue")]>>
```

>**Note**: Form field types such as Dropdown, Radio button, and Typeahead use `myVariable_ID` for ID and `myVariable_LABEL` for label value. The ID is the actual value used by service tasks and are inserted by default. To display the label value in the generated document, use `myVariable_LABEL`.

The document generation method uses libraries provided by Aspose in the back-end.

When using the **Generate Document** task, make sure that you use the correct syntax for your variables and expressions. Surround your variables with `<<[..]>>` characters. For example:

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

It is also possible to have custom Spring bean that processes the process variables just before rendering the document, [Processing document generation variables](#processing-document-generation-variables).

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

Build a jar with this class, and add it to the classpath. In the Service task configuration, set the `class` property to using the fully qualified classname (in this case `my.company.MyJavaDelegate`).

### Spring Beans

Another option is to use a Spring bean. It is possible to use a `delegateExpression` on a service task that resolves
at run-time to an instance of `org.activiti.engine.delegate.JavaDelegate`. Alternatively, and probably more useful, is to use a general Spring bean. The application automatically scans all beans in the `com.activiti.extension.bean` package. For example:

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

Build a jar with this class, and add it to the classpath. To use this bean in a service task, set the `expression` property to `${helloWorldBean.sayHello(execution)}`.

It is possible to define custom configuration classes (using the Spring Java Config approach) if this is needed (for example when sharing dependencies between delegate beans, complex bean setup, etc.). The application automatically scans for configuration classes in the `package com.activiti.extension.conf;` package. For example:

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

By default, you can specify any Spring bean for use in an expression. While this provides ease of use (since any beans you develop will be automatically scanned for as described above), it also increases the possibilities of misuse and security threats. To help prevent these issues from happening, you can whitelist Spring beans by making the following changes:

1. Open the `<InstallLocation>/tomcat/lib/activiti-app.properties` file.
2. Locate and set `beans.whitelisting.enabled` to true.

    ```text
    beans.whitelisting.enabled=true
    ```

    >**Note:** If this property is missing from the `activiti-app.propertie`s file, beans whitelisting is disabled.

3. To whitelist Spring beans, use the following configuration setting:

    ```text
    activiti-app/WEB-INF/classes/activiti/beans-whitelist.conf
    ```

**Example usage of bean whitelisting:**

To use a `userCount` variable in a **Display Text** field, `${userCount}`, add the following line in the Expression
property within a Service Task:

```javascript
${execution.setVariable('userCount', userService.getUserCount())}
```

If `beans.whitelisting.enabled` is set to false or the property is missing, the process is completed and the **Display Text** field should show the value of the `usercount` variable.

To complete the process successfully using bean whitelisting, you must set `beans.whitelisting.enabled` to true and add the bean name to `beans-whitelist.conf`:

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

1. Open the `<InstallLocation>/tomcat/lib/activiti-app.properties` file.
2. Locate and set `service.task.class.whitelisting.enabled` to true.

    ```text
    class.whitelisting.enabled=true
    ```

    >**Note:** If this property is missing from the `activiti-app.properties` file, service task whitelisting is disabled.

3. **This step applies only to users of Process Services version 1.6.0 to 1.6.2 inclusive as well as apps published in these versions. Whitelisting for publish tasks is exempt from version 1.6.3.** To use Alfresco, Box or Google drive to publish tasks with service task whitelisting enabled, add the following entries to `activiti-app/WEB-INF/classes/activiti/whitelisted-classes.conf`:
    * `com.activiti.runtime.activiti.bean.BoxStepActivityBehavior`
    * `com.activiti.runtime.activiti.bean.GoogleDriveStepActivityBehavior`
    * `com.activiti.runtime.activiti.KickstartAlfrescoPublishDelegate`
    * `com.activiti.runtime.activiti.KickstartAlfrescoCloudPublishDelegate`

**Whitelisting Scripting Languages**

To whitelist scripting languages that, for example, might be used in script tasks such as JavaScript, juel and groovy, add the script types in `activiti-app/WEB-INF/classes/activiti/whitelisted-scripts.conf`:

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

You can also configure whitelisting for JavaScript classes that are available for use in JavaScript. The following steps show you how to do this. They are, however, only applicable where you have enabled secure scripting for JavaScript. This will be the case if you have set the property `javascript.secure-scripting.enabled` to true:

```text
javascript.secure-scripting.enabled=true
```

1. Open the `<InstallLocation>/tomcat/lib/activiti-app.properties` file.
2. Locate and set `javascript.secure-scripting.enable-class-whitelisting` to true.

    ```text
    javascript.secure-scripting.enable-class-whitelisting = true
    ```

3. To allow the execution of JavaScript classes, add them to `activiti-app/WEB-INF/classes/activiti/javascript-whitelist-classes.conf`:

    ```text
    java.lang.System
    java.util.ArrayList
    org.apache.tomcat.util.log.SystemLogHandler
    ```

>**Note:** The enablement of secure scripting for Java classes used in JavaScript is turned on when either the setting is missing from the properties file or commented out.

### Default Spring Beans

Use the following sections for information about the default spring beans in Process Services.

#### Audit Log Bean (auditLogBean)

The `auditLogBean` can be used to generate audit logs in `.pdf` format for a completed process instance or a completed task. The log will be saved as a field value for the process and the task (if a task audit log is generated).

>**Note:** Audit logs can only be used against a completed process instance or a completed task.

The following code can be used in the expression of a service task to generate a process instance audit log named *My first process instance audit log*. The third argument determines if the current date shall be appended to the file name. The pdf will be associated with the process field `myFieldName`.

```javascript
${auditLogBean.generateProcessInstancePdf(execution, 'My first process instance audit log', true, 'myFieldName')}
```

To create a task audit log named *My first task audit log* add the following expression to the "complete" event in a task listener. Again the third argument determines if the current date shall be appended to the file name. The pdf will be associated with the field `myFieldName`.

```javascript
${auditLogBean.generateTaskPdf(task, 'My first task audit log', true, 'myFieldName')}
```

You can view the audit logs from the My Tasks app by clicking the "Audit Log" link when viewing the details of a completed process or task. When doing so the following two rest calls are made.

Process instance audit log:

```bash
GET app/rest/process-instances/{process-instance-id}/audit
```

Task audit log:

```bash
GET app/rest/tasks/{task-id}/audit
```

#### Document Merge Bean (documentMergeBean)

The `documentMergeBean` can be used to merge the content of multiple documents (files of type `.doc` or `.docx`) from a process into a single document which will be become the value of a provided process variable. The file name of the new document will be set to the file name of the first field in the list followed by the string "_merged" and the suffix from the same field.

In the following example, the content of `myFirstField` and `mySecondField` will be merged into a new document with the field ID set to `myFirstField` and the filename set to:

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

To get general information about a user (the data that can be found in `com.activiti.domain.idm.User`), use the following expression where `userId` is the database ID of the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getUser(123, execution)}
```

To get the email of a user use the following expression where `123` is the database id of the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getEmail(123, execution)}
```

To get the first name of a user use the following expression where `123` is the database id of the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getFirstName(123, execution)}
```

To get the last name of a user use the following expression where `123` is the database id of the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getLastName(123, execution)}
```

To get both first name and last name of a user use the following expression where `123` is the database id of the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getFullName(123, execution)}
```

To get a user object representing the current user use the following expression where the returned value is an instance of `LightUserRepresentation` containing fields like `id`, `firstName`, `lastName`, `email`, `externalId`, `pictureId`:

```javascript
${userInfoBean.getCurrentUser()}
```

To get a user’s primary group name use the following expression where `123` is the database id of the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getPrimaryGroupName(123)}
```

To get a group object representing a user’s primary group use the following expression where the return value is an instance of `LightGroupRepresentation`, containing id, name, externalId and status, and where `123` is the database id of the user and can be supplied either as a `Long` or a `String`:

```javascript
${userInfoBean.getPrimaryGroup(123)}
```

### Hook points

A *hook point* is a place where custom logic can be added. Typically this is done by implementing a certain interface and putting the class implementing the interface on the classpath where it can be found by the classpath component scanning (package `com.activiti.extension.bean` for example).

#### Login/LogoutListener

**interface**: `com.activiti.api.security.LoginListener` and `com.activiti.api.security.LogoutListener`

**Maven module**: `activiti-app-logic`

An implementation of this class will get a callback when a user logs in or logs out.

Example:

```java
package com.activiti.extension.bean;

@Component
public class MyLoginListener implements LoginListener {
    private static final Logger logger = LoggerFactory.getLogger(GfkLoginListener.class);

    public void onLogin(User user) {
            logger.info("User " + user.getFullName() + " has logged in");
    }
}
```

#### Process engine configuration configurer

**interface**: `com.activiti.api.engine.ProcessEngineConfigurationConfigurer`

**Maven module**: `activiti-app-logic`

An implementation of this class will get called when the Activiti process engine configuration is initialized, but before the process engine is built. This allows for customization to the process engine configuration.

Example:

```java
@Component
public class MyProcessEngineCfgConfigurer implements ProcessEngineConfigurationConfigurer {
    public void processEngineConfigurationInitialized( SpringProcessEngineConfiguration springProcessEngineConfiguration) {
            ...​ // Tweaking the process engine configuration
    }
}
```

#### Rule engine configuration configurer

**interface**: `com.activiti.api.engine.DmnEngineConfigurationConfigurer`

**Maven module**: `activiti-app-logic`

An implementation of this class will get called when the Process Services rule engine configuration is initialized,
but before the process engine is built. This allows for customization to the rule engine configuration.

Example:

```java
@Component
public class MyDmnEngineCfgConfigurer implements DmnEngineConfigurationConfigurer {
    public void dmnEngineConfigurationInitialized(DmnEngineConfiguration dmnEngineConfiguration) {
            ... // Tweaking the rule engine configuration
    }
}
```

#### Process Engine event listeners

It is possible to listen to events fired by the Process Engine. By default (and if enabled) there is a listener that captures these events, processes them before sending them to Elasticsearch (which is used for analytics). If the event data should be going somewhere else, for example an external BI warehouse, the following interface should be implemented and can be used to execute any logic when the event is fired.

See the *example apps* folder that comes with Process Services. It has a *jdbc-event-listener* folder, in which a Maven project can be found that captures these events and stored them relationally in another database.

**interface**: `com.activiti.service.runtime.events.RuntimeEventListener`

**Maven module**: `activiti-app-logic`

All implementations exposing this interface will be injected into the process engine at run time.

Example:

```java
package com.activiti.extension.bean;

import com.activiti.service.runtime.events.RuntimeEventListener;
import org.activiti.engine.delegate.event.ActivitiEvent;

@Component
public class PostgresEventListener implements RuntimeEventListener {

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public void onEvent(ActivitiEvent activitiEvent) {
        // TODO: handle event here
    }

    @Override
    public boolean isFailOnException() {
        return false;
    }
}
```

#### Processing document generation variables

**interface**: `com.activiti.api.docgen.TemplateVariableProcessor`

**Maven module**: `activiti-app-logic`

This section describes the implementation of the document generation task for generating a document based on a MS Word docx template.

An implementation of this class will get called before the variable is passed to the template processor, making it possible to change the value that will be used as the variable name in the template.

Example:

```java
@Component
public class MyTemplateVariableProcessor implements TemplateVariableProcessor {
    public Object process(RuntimeDocumentTemplate runtimeDocumentTemplate, DelegateExecution execution, String variableName, Object value) {
            return value.toString() + "___" + "HELLO_WORLD";
    }
}
```

Using the above example, you can add *"HELLO_WORLD"* to all variable usages in the template. However, you can also add sophisticated implementations based on process definition lookup using the process definition ID from the execution and inject the `RepositoryService` in your bean.

In addition to the process definition, the `runtimeDocumentTemplate` is passed to distinguish for which process and template the variables are being prepared.

>**Note:** Only variables with the format `variables.get("myVariable")` in the .docx template will be passed to the `TemplateVariableProcessor` implementation.

#### Business Calendar

Use the business calendar when calculating due dates for tasks.

You can override the default business calendar implementation, for example, to include bank holidays, company holidays, and so on. To override the default implementation, add a Spring bean implementing the `com.activiti.api.calendar.BusinessCalendarService` to the classpath with the `@Primary` notation.

Check the Javadoc on the `BusinessCalendarService` for more information.

```java
@Primary
@Service
public class MyBusinessCalendarService implements BusinessCalendarService {

  ...

}
```

Below is an example implementation that takes weekend days into account when calculating due dates.

```java
@Primary
@Service
public class SkipWeekendsBusinessCalendar implements BusinessCalendarService {

    protected static final int DAYS_IN_WEEK = 7;
    protected List<Integer> weekendDayIndex;

    protected DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

    public SkipWeekendsBusinessCalendar() {

        // add Saturday and Sunday as weekend days
        weekendDayIndex.add(6);
        weekendDayIndex.add(7);
    }

    public Date addToDate(Date date, int years, int months, int days, int hours, int minutes, int seconds) {
        return calculateDate(new DateTime(date), years, months, days, hours, minutes, seconds, 1);
    }

    public Date subtractFromDate(Date date, int years, int months, int days, int hours, int minutes, int seconds) {
        return calculateDate(new DateTime(date), years, months, days, hours, minutes, seconds, -1);
    }

    protected Date calculateDate(DateTime relativeDate, int years, int months, int days, int hours, int minutes, int seconds, int step) {
        // if date is on a weekend skip to a working day
        relativeDate = skipWeekEnds(relativeDate, step);
        Period period = new Period(years, months, 0, days, hours, minutes, seconds, 0);

        // add weekends to period
        period = period.plusDays(countWeekEnds(relativeDate, period, step));

        // add/subtract period to get the final date, again if date is on a weekend skip to a working day
        return skipWeekEnds(addPeriod(relativeDate, period, step), step).toDate();
    }

    protected DateTime addPeriod(DateTime relativeDate, Period period, int step) {
        if (step < 0) {
            return relativeDate.minus(period);
        }
        return relativeDate.plus(period);
    }

    protected DateTime skipWeekEnds(DateTime relativeDate, int step) {
        while(weekendDayIndex.contains(relativeDate.getDayOfWeek())) {
            relativeDate = relativeDate.plusDays(step);
        }
        return relativeDate;
    }

    protected int countWeekEnds(DateTime relativeDate, Period period, int step) {
        // get number of days between two dates
        int days = Math.abs(Days.daysBetween(relativeDate, addPeriod(relativeDate, period, step)).getDays());
        int count = 0;

        for(int weekendDay : weekendDayIndex) {
            count+=countWeekDay(relativeDate, weekendDay, days, step);
        }
        return count;
    }

    protected int countWeekDay(DateTime relativeDate, int weekDay, int days, int step) {
        int count = 0;
        DateTime dt = relativeDate.toDateTime();

        // if date's day of week is not the target day of week
        // skip to target day of week
        if(weekDay != relativeDate.getDayOfWeek()) {
            int daysToSkip = 0;

            if (step > 0) {
                if (weekDay > relativeDate.getDayOfWeek()) {
                    daysToSkip = weekDay - relativeDate.getDayOfWeek();
                } else {
                    daysToSkip = weekDay - relativeDate.getDayOfWeek() + DAYS_IN_WEEK;
                }
            } else {
                if (weekDay > relativeDate.getDayOfWeek()) {
                    daysToSkip = Math.abs(weekDay - relativeDate.getDayOfWeek() - DAYS_IN_WEEK);
                } else {
                    daysToSkip = relativeDate.getDayOfWeek() - weekDay;
                }
            }

            // return if target day of week is beyond range of days
            if (daysToSkip > days) {
                return 0;
            }

            count++;
            dt = dt.plusDays(daysToSkip * step);
            days-=daysToSkip;
        }

        if (days>=DAYS_IN_WEEK) {
            dt = dt.plusDays(days * step);
            count+=(Weeks.weeksBetween(relativeDate, dt).getWeeks() * step);
        }

        return count;
    }

    @Override
    public DateFormat getStringVariableDateFormat() {
        return dateFormat;
    }
```

### Custom REST endpoints

It’s possible to add custom REST endpoints to the BPM Suite, both in the regular REST API (used by the BPM Suite html/javascript UI) and the *public* API (using basic authentication instead of cookies).

The REST API is built using Spring MVC. Please check the [Spring MVC documentation](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html){:target="_blank"} on how to create new Java beans to implement REST endpoints.

To build against the REST logic of Process Services and its specific dependencies, add following dependency to your Maven `pom.xml` file:

```xml
<dependencies>
    <dependency>
        <groupId>com.activiti</groupId>
        <artifactId>activiti-app-rest</artifactId>
        <version>${suite.version}</version>
    </dependency>
</dependencies>
```

A very simple example is shown below. Here, the Process Services `TaskService` is injected and a custom response is fabricated. Of course, this logic can be anything.

```java
package com.activiti.extension.rest;

import com.activiti.domain.idm.User;
import com.activiti.security.SecurityUtils;
import org.activiti.engine.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/my-rest-endpoint")
public class MyRestEndpoint {
    @Autowired
    private TaskService taskService;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public MyRestEndpointResponse executeCustonLogic() {
        User currentUser = SecurityUtils.getCurrentUserObject();
        long taskCount = taskService.createTaskQuery().taskAssignee(String.valueOf(currentUser.getId())).count();

        MyRestEndpointResponse myRestEndpointResponse = new MyRestEndpointResponse();
        myRestEndpointResponse.setFullName(currentUser.getFullName());
        myRestEndpointResponse.setTaskCount(taskCount);
        
        return myRestEndpointResponse;
    }

    private static final class MyRestEndpointResponse {
        private String fullName;
        private long taskCount;
        
        // Getters and setters
    }
}
```

>**Note.** The bean needs to be in the `com.activiti.extension.rest` package to be found.

Create a jar containing this class, and add it to the classpath.

A class like this in the `com.activiti.extension.rest` package will be added to the rest endpoints for the application (e.g. for use in the UI), which use the cookie approach to determine the user. **The url will be mapped under /app**. So, if logged in into the UI of the BPM Suite, one could go to `http://localhost:8080/activiti-app/app/rest/my-rest-endpoint` and see the result of the custom rest endpoint:

```json
{"fullName":" Administrator","taskCount":8}
```

To add a custom REST endpoint to the *public REST API*, protected by basic authentication, a similar class should be placed in the `com.activiti.extension.api package`:

```java
package com.activiti.extension.api;

import com.activiti.domain.idm.User;
import com.activiti.security.SecurityUtils;
import org.activiti.engine.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enterprise/my-api-endpoint")
public class MyApiEndpoint {
    @Autowired
    private TaskService taskService;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public MyRestEndpointResponse executeCustonLogic() {
        User currentUser = SecurityUtils.getCurrentUserObject();
        long taskCount = taskService.createTaskQuery().taskAssignee(String.valueOf(currentUser.getId())).count();

        MyRestEndpointResponse myRestEndpointResponse = new MyRestEndpointResponse();
        myRestEndpointResponse.setFullName(currentUser.getFullName());
        myRestEndpointResponse.setTaskCount(taskCount);
        
        return myRestEndpointResponse;
    }

    private static final class MyRestEndpointResponse {
        private String fullName;
        private long taskCount;

        // Getters and setters
    }
}
```

Note that the endpoint needs to have `/enterprise` as first element in the url, as this is configured in the `SecurityConfiguration` to be protected with basic authentication (more specific, the `api/enterprise/*` is).

Which can be accessed like the regular API:

```bash
curl -u admin@app.activiti.com:password http://localhost:8080/activiti-app/api/enterprise/my-api-endpoint

{"fullName":" Administrator","taskCount":8}
```

>**Note:** Due to classloading, it is currently not possible to put jars with these custom rest endpoints in the global or common classpath (for example `tomcat/lib` for Tomcat). They should be put in the web application classpath (for example `WEB-INF/lib`).

### Custom rule expression functions

The rule engine uses MVEL as an expression language. In addition to the built-in MVEL expression functions there are some additional custom expression functions provided. These are accessible through the structured expression editor within the decision table editor.

The provided custom methods can be overridden by your own custom expression functions or custom methods can be added. This is possible via a hook point in the rule engine configuration (see [Rule engine configuration configurer](#rule-engine-configuration-configurer)).

You can configure the Engine with additional expression functions by implementing `CustomExpressionFunctionRegistry`.

**interface**: `com.activiti.dmn.engine.impl.mvel.config.CustomExpressionFunctionRegistry`

**Maven module**: `activiti-dmn-engine`

Example:

```java
import com.activiti.dmn.engine.CustomExpressionFunctionRegistry;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

@Component
public class MyCustomExpressionFunctionsRegistry implements CustomExpressionFunctionRegistry {

    public Map<String, Method> getCustomExpressionMethods() {
        Map<String,Method> myCustomExpressionMethods = new HashMap<>();

        try {
            String expressionToken = "dosomething";
            Method customExpressionMethod = SomeClass.class.getMethod("someMethod", String.class);
            myCustomExpressionMethods.put(expressionToken, customExpressionMethod);
        } catch (NoSuchMethodException e) {
            // handle exception
        }

        return myCustomExpressionMethods;
    }
}
```

This registry must be provided to the rule engine configuration using the hook point (see [Rule engine configuration configurer](#rule-engine-configuration-configurer)).

This example adds the expression function from the example above to the default custom expression functions.

Example:

```java
import com.activiti.dmn.engine.DmnEngineConfiguration;
import org.springframework.beans.factory.annotation.Autowired;

public class MyDmnEngineCfgConfigurer implements DmnEngineConfigurationConfigurer {
    @Autowired
    MyCustomExpressionFunctionsRegistry myExpressionFunctionRegistry;

    public void dmnEngineConfigurationInitialized(DmnEngineConfiguration dmnEngineConfiguration) {
        dmnEngineConfiguration.setPostCustomExpressionFunctionRegistry(myExpressionFunctionRegistry);
    }
}
```

Overriding the default custom expression functions can be done by:

```java
dmnEngineConfiguration.setCustomExpressionFunctionRegistry(myExpressionFunctionRegistry);
```

## Custom Data Models

You can create Custom Data Models that connect to external sources and perform custom data operations when working with entity objects.

Implement `AlfrescoCustomDataModelService` to manage operations such as insert, update, and select data in Custom Data Models.

**interface**: `com.activiti.api.datamodel.AlfrescoCustomDataModelService`

**maven module**: `activiti-app-logic`

Follow these steps to implement the `AlfrescoCustomDataModelService` interface:

1. Create an external class named `AlfrescoCustomDataModelServiceImpl` and add it to the classpath.

    Note that it should be in a package that can be scanned, such as `com.activiti.extension.bean`.

2. Implement the class as follows:

    ```java
    package com.activiti.extension.bean;
    
    import java.util.List;
    
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    
    import com.activiti.api.datamodel.AlfrescoCustomDataModelService;
    import com.activiti.model.editor.datamodel.DataModelDefinitionRepresentation;
    import com.activiti.model.editor.datamodel.DataModelEntityRepresentation;
    import com.activiti.runtime.activiti.bean.datamodel.AttributeMappingWrapper;
    import com.activiti.variable.VariableEntityWrapper;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import com.fasterxml.jackson.databind.node.ObjectNode;
    
    @Service
    public class AlfrescoCustomDataModelServiceImpl implements AlfrescoCustomDataModelService {
    
        @Autowired
        protected ObjectMapper objectMapper;
    
        @Override
        public String storeEntity(List<AttributeMappingWrapper> attributeDefinitionsAndValues, DataModelEntityRepresentation entityDefinition,
                DataModelDefinitionRepresentation dataModel) {
            // save entity data and return entity id
        }
    
        @Override
        public ObjectNode getMappedValue(DataModelEntityRepresentation entityValue, String mappedName, Object variableValue) {
            // fetch entity data and return as an ObjectNode
        }
    
        @Override
        public VariableEntityWrapper getVariableEntity(String keyValue, String variableName, String processDefinitionId, DataModelEntityRepresentation entityValue) {
            // fetch entity data and return as a VariableEntityWrapper
        }
    
    }
    ```

This implementation of `AlfrescoCustomDataModelServiceImpl` class is called, for example, when a select, insert, or update operation on a custom data model is performed.

## Custom reports

There are a number of out-of-the-box reports in the Analytics app, which can be augmented with your own custom reports.

Custom reports have full access to the Elasticsearch indexes generated by Process Services when it is enabled.

See [Event processing for analytics]({% link process-services/2.0/config/external.md %}#event-processing-for-analytics) for details on how to configure events to be sent to Elasticsearch.

The following section assumes that you have a reasonable understanding of what Elasticsearch is and an understanding of indexes, types and type mappings. The [Elasticsearch Definitive Guide](https://www.elastic.co/guide/en/elasticsearch/guide/1.x/index.html){:target="_blank"} is a great learning resource if you are new to the engine and there is also a [Reference Guide](https://www.elastic.co/guide/en/elasticsearch/reference/1.7/index.html){:target="_blank"} which you should find helpful to refer to as you start using it directly yourself.

### Implementing custom reports

Assuming that you have started to see some data show up in the ElasticSearch store and therefore in the out-of-the-box reports, and you have used the Sense tool or cURL to develop some custom search queries of your own, you are ready to start implementing the custom Spring bean required in order to plug the report into the Process Services UI.

1. Basic concepts

    A custom report is a custom section available in the Analytics app and also within each published app, which shows one or more custom reports.

    Each report is implemented by a Spring bean which is responsible for two things:

    1. Perform an ElasticSearch search query using the Java client API.

    2. Convert the search results (hits or aggregations) into chart or table data and add this to the response.

    The UI will automatically display the correct widgets based on the data that your bean sends.

2. Bean implementation

    Your Spring bean will be discovered automatically via annotations but must be placed under the package `com.activiti.service.reporting`. Since this package is used for the out-of-the-box reports it is recommended that custom reports use the sub-package such as `com.activiti.service.reporting.custom`.

    The overall structure of the class will be as follows, for the full source please see the web link at the end of this section.

    ```java
    package com.activiti.service.reporting.custom;
    
    import com.activiti.domain.reporting.ParametersDefinition;
    import com.activiti.domain.reporting.ReportDataRepresentation;
    import com.activiti.service.api.UserCache;
    import com.activiti.service.reporting.AbstractReportGenerator;
    import org.activiti.engine.ProcessEngine;
    import org.elasticsearch.client.Client;
    import org.springframework.stereotype.Component;
    
    import java.util.Map;
    
    @Component(CustomVariablesReportGenerator.ID)
    public class CustomVariablesReportGenerator extends AbstractReportGenerator {
    
        public static final String ID = "report.generator.fruitorders";
        public static final String NAME = "Fruit orders overview";
    
        @Override
        public String getID() {
            return ID;
        }
    
        @Override
        public String getName() {
            return NAME;
        }
    
        @Override
        public ParametersDefinition getParameterDefinitions(Map<String, Object> parameterValues) {
            return new ParametersDefinition();
        }
    
        @Override
        public ReportDataRepresentation generateReportData(ProcessEngine processEngine,
                                                           Client elasticSearchClient, String indexName, UserCache userCache,
                                                           Map<String, Object> parameterMap) {
    
            ReportDataRepresentation reportData = new ReportDataRepresentation();
    
            // Perform queries and add report data here
    
            return reportData;
        }
    ```

    You must implement the `generateReportData()` method which is declared abstract in the superclass, and you can choose to override the `getParameterDefinitions()` method if you need to collect some user-selected parameters from the UI to use in your query.

3. Implementing `generateReportData()`

    The `generateReportData()` method of your bean is responsible for two things:

    * Perform one or more ElasticSearch queries to fetch report data

    * Populate chart/table data from the query results

    A protected helper method `executeSearch()` is provided which provides a concise syntax to execute an ElasticSearch search query given a query and optional aggregation, the implementation of which also provides logging of the query generated by the Java client API before it is sent. This can help with debugging your queries using Sense, or assist you in working out why the Java client is not generating the query you expect.

    ```java
    return executeSearch(elasticSearchClient,
                    indexName,
                    ElasticSearchConstants.TYPE_VARIABLES,
                    new FilteredQueryBuilder(
                            new MatchAllQueryBuilder(),
                            FilterBuilders.andFilter(
                                    new TermFilterBuilder("processDefinitionKey", PROCESS_DEFINITION_KEY),
                                    new TermFilterBuilder("name._exact_name", "customername")
                            )
                    ),
                    AggregationBuilders.terms("customerOrders").field("stringValue._exact_string_value")
            );
    ```

    The log4j configuration required to log queries being sent to ElasticSearch via `executeSearch()` is as follows

    ```text
    log4j.logger.com.activiti.service.reporting.AbstractReportGenerator=DEBUG
    ```

    Alternatively you can manually execute any custom query directly via the `Client` instance passed to the `generateReportData()` method, for example:

    ```java
    return elasticSearchClient
                    .prepareSearch(indexName)
                    .setTypes(ElasticSearchConstants.TYPE_PROCESS_INSTANCES)
                    .setQuery(new FilteredQueryBuilder(new MatchAllQueryBuilder(), applyStatusProcessFilter(status)))
                    .addAggregation(
                            new TermsBuilder(AGGREGATION_PROCESS_DEFINITIONS).field(EventFields.PROCESS_DEFINITION_ID)
                                    .subAggregation(new FilterAggregationBuilder(AGGREGATION_COMPLETED_PROCESS_INSTANCES)
                                            .filter(new ExistsFilterBuilder(EventFields.END_TIME))
                                            .subAggregation(new ExtendedStatsBuilder(AGGREGATION_STATISTICS).field(EventFields.DURATION))));
    ```

    Generating chart data from queries can be accomplished easily using the converters in the `com.activiti.service.reporting.converters` package. This avoids the need to iterate over returned query results in order to populate chart data items.

    Initially two converters `AggsToSimpleChartBasicConverter` and `AggsToMultiSeriesChartConverter` are provided to populate data for pie charts (which take a single series of data) and bar charts (which take multiple series) respectively. These two classes are responsible for iterating over the structure of the ES data, while the member classes of `com.activiti.service.reporting.converters.BucketExtractors` are responsible for extracting an actual value from the buckets returned in the data.

    ```java
    ReportDataRepresentation reportData = new ReportDataRepresentation();
    
    PieChartDataRepresentation pieChart = new PieChartDataRepresentation();
    pieChart.setTitle("No. of orders by customer");
    pieChart.setDescription("This chart shows the total number of orders placed by each customer");
    
    new AggsToSimpleChartBasicConverter(searchResponse, "customerOrders").setChartData(
            pieChart,
            new BucketExtractors.BucketKeyExtractor(),
            new BucketExtractors.BucketDocCountExtractor()
    );
    
    reportData.addReportDataElement(pieChart);
    
    SingleBarChartDataRepresentation chart = new SingleBarChartDataRepresentation();
    chart.setTitle("Total quantities ordered per month");
    chart.setDescription("This chart shows the total number of items that were ordered in each month");
    chart.setyAxisType("count");
    chart.setxAxisType("date_month");
    
    new AggsToMultiSeriesChartConverter(searchResponse, "ordersByMonth").setChartData(
            chart,
            new BucketExtractors.DateHistogramBucketExtractor(),
            new BucketExtractors.BucketAggValueExtractor("totalItems")
    );
    
    reportData.addReportDataElement(chart);
    ```

    For more details see the full source on the [activiti-custom-reports](https://github.com/Alfresco/activiti-custom-reports){:target="_blank"} GitHub project.

## Custom identity synchronization

Process Services needs user, group, and membership information in its database. The main reason is performance (for example quick user/group searches) and data consistency (for example models are linked to users through foreign keys). In the Process Services logic, this is typically referred to as Identity Management (IDM).

Out of the box, all IDM data is stored directly in the database. So when you create a user or group as a tenant administrator, the data ends up in the database tables.

However, typically, the users/groups of a company are managed in a centralized data store such as LDAP (or Active Directory). Process Services can be configured to connect to such a server and synchronize the IDM data to the database table.

See [External Identity Management]({% link process-services/2.0/config/authenticate.md %}#ldap-and-active-directory) for more information on how to set this up. The basic idea behind it is that the LDAP server will periodically be polled and the IDM data in the database tables will be synchronized: created, updated or deleted depending on what the LDAP server returns and what currently is in the database tables.

This section describes what is needed to have a similar synchronization of IDM data coming from another source. The `com.activiti.service.idm.LdapSyncService` responsible for synchronizing IDM data from an LDAP/Active Directory store, uses the same hook points as the ones described below and can thus be seen as an advanced example.

### Example implementation

Create a simple example synchronization service that demonstrates clearly the concepts and classes to be used. In this example, use a simple text file to represent our *external IDM source*. The `users.txt` looks as follows (each line is a user and user data is separated by semi-colons):

```text
jlennon;John;Lennon;john@beatles.com;johnpassword;10/10/2015
rstarr;Ringo;Starr;ringo@beatles.com;ringopassword;11/10/2015
gharrison;George;Harrison;george@beatles.com;georgepassword;12/10/2015
pmccartney;Paul;McCartney;paul@beatles.com;paulpassword;13/10/2015
```

The `groups.txt` file is similar (the group name followed by the member ids and a timestamp):

```text
beatles:jlennon;rstarr;gharrison;pmccartney:13/10/2015
singers:jlennon;pmccartney:17/10/2015
```

The application expects *one* instance implementing the `com.activiti.api.idm.ExternalIdmSourceSyncService` interface to be configured when synchronizing with an external IDM source. This interface requires a few methods to either synchronous or asynchronous do a full or differential sync. In a full sync, all data is looked at and compared. A differential sync only returns what has changed since a certain date. The latter is of course used for performance reasons. For example, the default settings for LDAP do a full sync every night and a differential sync every four hours.

You can also implement the `com.activiti.api.idm.ExternalIdmSourceSyncService` interface directly, but there is an easier way: all the logic to fetch data from the tables, compare, create, update or delete users, groups or membership is encapsulated in the `com.activiti.api.idm.AbstractExternalIdmSourceSyncService` class. It is advised to extend this class when creating a new external source synchronization service, as in that case the only logic that needs to be written is the actual fetching of the IDM data from the external source.

Create a `FileSyncService` class. Note the package, `com.activiti.extension.bean`, which is automatically component scanned. The class is annotated with `@Component` (`@Service` would also work).

```java
package com.activiti.extension.bean;

@Component
public class FileSyncService extends AbstractExternalIdmSourceSyncService {
  ...
}
```

The acom.activiti.api.idm.ExternalIdmSourceSyncServicea defines the different abstract methods that can be implemented. For example:

The `additionalPostConstruct()` method will be called after the bean is constructed and the dependencies are injected.

```java
protected void additionalPostConstruct() {
                // Nothing needed now
}
```

It’s the place to add additional post construction logic, like reading properties from the configuration file. Note the `env` variable is available for that, which is a standard `org.springframework.core.env.Environment` instance:

```java
protected void additionalPostConstruct() {
    myCustomConfig = env.getProperty("my.custom.property");
}
```

The `getIdmType()` method simply returns a `String` identifying the external source type. It is used in the logging
that is produced when the synchronization is happening.

```java
protected String getIdmType() {
  return "FILE";
}
```

The `isFullSyncEnabled(Long tenantId)` and `isDifferentialSyncEnabled(Long tenantId)` configures whether or not respectively the *full* and/or the *differential* synchronization is enabled.

```java
protected boolean isFullSyncEnabled(Long tenantId) {
  return true;
}

protected boolean isDifferentialSyncEnabled(Long tenantId) {
  return false;
}
```

>**Note** that the `tenantId` is passed here. In a non-multitenant setup, this parameter can simply be ignored. All methods of this superclass have the `tenantId` parameter. In a multi-tenant setup, one should write logic to loop over all the tenants in the system and call the sync methods for each of the tenants separately.

The following two methods will configure when the synchronizations will be scheduled (and executed asynchronously). The return value of these methods should be a (Spring-compatible) cron expression. Note that this typically will be configured in a configuration properties file rather than hardcoded. When `null` is returned, that particular synchronization won’t be scheduled.

```java
protected String getScheduledFullSyncCronExpression() {
    return "0 0 0 * * ?"; // midnight
}

protected String getScheduledDifferentialSyncCronExpression() {
    return null;
}
```

Now we get to the important part of the implementation: the actual fetching of users and groups. This is the method that is used during a *full synchronization*.

```java
protected ExternalIdmQueryResult getAllUsersAndGroupsWithResolvedMembers(Long tenantId) {
    try {
      List<ExternalIdmUserImpl> users = readUsers();
      List<ExternalIdmGroupImpl> groups = readGroups(users);
      return new ExternalIdmQueryResultImpl(users, groups);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
}
```

The return result, an instance of `com.activiti.domain.sync.ExternalIdmQueryResult`, which has a list of users in the form of `com.activiti.domain.sync.ExternalIdmUser` instances and a list of groups in the form of `com.activiti.domain.sync.ExternalIdmGroup` instances.

Note that each group has its members and child groups in it. Also note that these are all *interfaces*, so you are free to return any instance that implements these interfaces. By default there are simple POJO implementations of said interfaces: `com.activiti.domain.sync.ExternalIdmQueryResultImpl`, `com.activiti.domain.sync.ExternalIdmUserImpl` and `com.activiti.domain.sync.ExternalIdmGroupImpl`. These POJOs are also used in the example implementation above.

>**Important note**: the `ExternalIdmUser` interface also defines a `getPassword()` method. Only return the actual password here if you want the user to authenticate against the default tables. The returned password will be securely hashed and stored that way. Return `null` if the authentication is done against an external system (LDAP is such an example). See further down to learn more about custom authentication.

The `readUsers()` and `readGroups()` methods will read the `.txt` mentioned above from the classpath and create instances of user and groups classes using the information in those files. For example:

```java
protected List<ExternalIdmUserImpl> readUsers() throws IOException, ParseException {
    List<ExternalIdmUserImpl> users = new ArrayList<ExternalIdmUserImpl>();

    InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("users.txt");
    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
    String line = bufferedReader.readLine();
    while (line != null) {

        String[] parsedLine = line.split(";");

        ExternalIdmUserImpl user = new ExternalIdmUserImpl();
        user.setId(parsedLine[0]);
        user.setOriginalSrcId(parsedLine[0]);
        user.setFirstName(parsedLine[1]);
        user.setLastName(parsedLine[2]);
        user.setEmail(parsedLine[3]);
        user.setPassword(parsedLine[4]);
        user.setLastModifiedTimeStamp(dateFormat.parse(parsedLine[5]));

        users.add(user);
        line = bufferedReader.readLine();
    }

    inputStream.close();
    return users;
}

protected List<ExternalIdmGroupImpl> readGroups(List<ExternalIdmUserImpl> users) throws IOException, ParseException {

    List<ExternalIdmGroupImpl> groups = new ArrayList<ExternalIdmGroupImpl>();

    InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("groups.txt");
    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
    String line = bufferedReader.readLine();
    while (line != null) {

        String[] parsedLine = line.split(":");
        String groupId = parsedLine[0];

        ExternalIdmGroupImpl group = new ExternalIdmGroupImpl();
        group.setOriginalSrcId(groupId);
        group.setName(groupId);

        List<ExternalIdmUserImpl> members = new ArrayList<ExternalIdmUserImpl>();
        String[] memberIds = parsedLine[1].split(";");
        for (String memberId : memberIds) {
                for (ExternalIdmUserImpl user : users) {
                        if (user.getId().equals(memberId)) {
                                members.add(user);
                        }
                }
        }
        group.setUsers(members);

        group.setLastModifiedTimeStamp(dateFormat.parse(parsedLine[2]));

        groups.add(group);
        line = bufferedReader.readLine();
    }

    inputStream.close();
    return groups;
}
```

For the *differential synchronization* a similar implementation could be made. Note that now a timestamp is passed, which indicates that the method should only return user/groups that are changed since that timestamp.

```java
protected List<? extends ExternalIdmUser> getUsersModifiedSince(Date latestSyncDate, Long tenantId) {
...​
}

protected List<? extends ExternalIdmGroup> getGroupsModifiedSince(Date latestSyncDate, Long tenantId) {
....
}
```

The last two methods we need to implement are to indicate which users should become a tenant admin (or a tenant manager in a multi-tenant setup). This method should return an array of string with the *id used in the external IDM store*. More specifically, the strings in this array will be compared with the value in the `ExternalIdmUser.getOriginalSrcId()` method. Note that in practice these strings often will come from a configuration file rather than being hardcoded.

```java
protected String[] getTenantManagerIdentifiers(Long tenantId) {
return null; // No tenant manager
}

protected String[] getTenantAdminIdentifiers(Long tenantId) {
  return new String[] { "jlennon" };
}
```

That’s all there is to it. As shown, no actual synchronization logic needs to be written when extending from the `AbstractExternalIdmSourceSyncService` class. The implementation should only worry about configuration and the actual fetching of the user and group information.

### Synchronization on boot

On a first boot, all users/groups must sync for the first time, otherwise nobody would be able to log in. The LDAP synchronization logic does this automatically. When creating a custom synchronization service, a custom `BootstrapConfigurer` can be used to do the same thing:

```java
package com.activiti.extension.bean;

@Component
public class MyBootstrapConfigurer implements BootstrapConfigurer {

  @Autowired
  private FileSyncService fileSyncService;

  public void applicationContextInitialized(org.springframework.context.ApplicationContext applicationContext) {
    fileSyncService.asyncExecuteFullSynchronizationIfNeeded(null);
  }
}
```

This implements the `com.activiti.api.boot.BootstrapConfigurer` interface. If there is an instance implementing this interface on the classpath, it will be called when the application is booting up (more precisely: after the Spring application context has been initialized). Here, the class we created in the previous section, `FileSyncService` is injected. Note we add it to the component scanned package again and added the `@component` identifier.

Call the `asyncExecuteFullSynchronizationIfNeeded()` method. The `null` parameter means *the default tenant* (that is, this is a non-multitenant setup). This is a method from the `com.activiti.api.idm.ExternalIdmSourceSyncService` interface, which will do a full sync if no initial synchronization was done before.

As a side note, all synchronization logs are stored in a table `IDM_SYNC_LOG` in the database.

### Synchronization log entries

When a synchronization is executed, a log is kept. This log contains all information about the synchronization: users/groups that are created, updates of existing users/groups, membership additions/deletions and so on.

To access the log entries, an HTTP REST call can be done:

```bash
GET /api/enterprise/idm-sync-log-entries
```

Which returns a result like this (only an initial synchronization happened here):

```json
[{"id":1,"type":"initial-ldap-sync","timeStamp":"2015-10-16T22:00:00.000+0000"}]
```

This call uses the following url parameters:

* `tenantId`: Defaults to the `tenantId` of the users
* `start` and `size`: Used for getting paged results back instead of one (potentially large) list.

Note that this call can only be done by a *tenant administrator*, or *tenant manager* in a multi-tenant setup.

We can now get the detailed log for each sync log entry, by taking an id from the previous response:

```bash
GET /api/enterprise/idm-sync-log-entries/{id}/logfile
```

This returns a `.log` file that contains for our example implementation:

```text
created-user: created user John Lennon (email=john.lennon@thebeatles.com) (dn=jlennon)
added-capability: added capability tenant-mgmt to user jlennon
created-user: created user Ringo Starr (email=ringo.starr@thebeatles.com) (dn=rstarr)
created-user: created user George Harrison (email=george.harrison@beatles.com) (dn=gharrison)
created-user: created user Paul McCartney (email=paul.mccartney@beatles.com) (dn=pmccartney)
created-group: created group beatles
added-user-to-group: created group membership of user jlennon for group beatles
added-user-to-group: created group membership of user rstarr for group beatles
added-user-to-group: created group membership of user gharrison for group beatles
added-user-to-group: created group membership of user pmccartney for group beatles
created-group: created group singers
added-user-to-group: created group membership of user jlennon for group singers
added-user-to-group: created group membership of user pmccartney for group singers
```

### Custom authentication

When using a custom external IDM source, you may need to authenticate against that source (For example, LDAP).

See [Global security override](#global-security-override) for more information on how to use the `users.txt` file as an authentication mechanism.

## Security configuration overrides

Configure security with the `com.activiti.conf.SecurityConfiguration` class. It allows you to switch between database and LDAP/Active Directory authentication out of the box. It also configures REST endpoints under "/app" to be protected using a cookie-based approach with tokens and REST endpoints under "*/api*" to be protected by Basic Auth.

You can override these defaults, if the out-of-the-box options are not adequate for your environment. The following sections describe the different options.

All the *overrides* described in the following sections follow the same pattern of creating a Java class that implements a certain interface. This class needs to be annotated by `@Component` and must be found in a package that is component-scanned.

>**Note:** Webapp and API use the same Spring HTTP security for authentication. To distinguish the security configurations, you should specify the path that the configuration applies to. These use `/app` and `/api` by default. For example, API configuration should begin with the following:
>
>```java
>httpSecurity.antMatcher("/api/**")
>```

### Global security override

Global security override is the most important override. It allows you to replace the default authentication mechanism.

The interface to implement the global security override is called `com.activiti.api.security.AlfrescoSecurityConfigOverride`. It has one method `configureGlobal` which is called instead of the default logic. It sets up either database-backed or LDAP-backed authentication if an instance implementing this interface is found on the classpath.

Building further on the [Example implementation](#example-implementation), use the `users.txt` file, in combination with the `FileSyncService`, so that the application uses the user information in the file to execute authentication.

Spring Security (which is used as underlying framework for security) expects an implementation of the `org.springframework.security.authentication.AuthenticationProvider` to execute the actual authentication logic. What we have to do in the *configureGlobal* method is then instantiate our custom class:

```java
package com.activiti.extension.bean;

@Component
public class MySecurityOverride implements AlfrescoSecurityConfigOverride {

  public void configureGlobal(AuthenticationManagerBuilder auth, UserDetailsService userDetailsService) {
    MyAuthenticationProvider myAuthenticationProvider = new MyAuthenticationProvider();
    myAuthenticationProvider.setUserDetailsService(userDetailsService);
    auth.authenticationProvider(myAuthenticationProvider);
  }

}
```

Note how this example passed the default `UserDetailsService` to this authentication provider. This class is responsible for loading the user data (and its capabilities or *authorities* in Spring Security lingo) from the database tables. Since we synchronized the user data using the same source, we can just pass it to our custom class.

So the actual authentication is done in the `MyAuthenticationProvider` class here. In this simple example, we just have to compare the password value in the `users.txt` file for the user. To avoid having to do too much low-level Spring Security plumbing, we let the class extend from the `org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider` class.

```java
public static class MyAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

  protected Map<String, String> userToPasswordMapping = new HashMap<String, String>();

  protected UserDetailsService userDetailsService;

  public MyAuthenticationProvider() {

    // Read users.txt, and create a {userId, password} map
    try {
      InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("users.txt");
      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
      String line = bufferedReader.readLine();
      while (line != null) {
        String[] parsedLine = line.split(";");
        userToPasswordMapping.put(parsedLine[0], parsedLine[4]);
        line = bufferedReader.readLine();
      }

      inputStream.close();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }


  protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {

    // We simply compare the password in the token to the one in the users.txt file

    String presentedPassword = authentication.getCredentials().toString();
    String actualPassword = userToPasswordMapping.get(userDetails.getUsername());

    if (!StringUtils.equals(presentedPassword, actualPassword)) {
      throw new BadCredentialsException("Bad credentials");
    }
  }

  protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {

    // Here we simply defer the loading to the UserDetailsService that was passed to this instance

    UserDetails loadedUser = null;
    try {
      loadedUser = userDetailsService.loadUserByUsername(username);
    } catch (Exception e) {
      throw new AuthenticationServiceException(e.getMessage(), e);
    }
    return loadedUser;
  }

}
```

There’s one last bit to configure. By default, the application is configured to log in using the email address. Set the following property to switch that to the `externalId`, meaning the id coming from the external IDM source (`jlennon` in the `users.txt` file for example):

```text
security.authentication.use-externalid=true
```

Use the following property to configure case-sensitivity for logins:

```text
security.authentication.casesensitive=true
```

Alternatively, you can override the `AuthenticationProvider` that is used (instead of overriding the `configureGlobal`) by implementing the `com.activiti.api.security.AlfrescoAuthenticationProviderOverride` interface.

#### REST Endpoints security overrides

You can change the default security configuration of the REST API endpoints by implementing the `com.activiti.api.security.AlfrescoApiSecurityOverride` interface. By default, the REST API endpoints use the Basic Authentication method.

Similarly, you can override the default cookie+token based security configuration with the regular REST endpoints (those used by the UI) by implementing the `com.activiti.api.security.AlfrescoWebAppSecurityOverride` interface.

>**Note:** Webapp and API use the same Spring HTTP security for authentication. To distinguish the security configurations, you should specify the path that the configuration applies to. These use `/app` and `/api` by default. For example, API configuration should begin with the following:

```java
httpSecurity.antMatcher("/api/**")
```

#### UserDetailsService override

If the default `com.activiti.security.UserDetailsService` does not meet the requirement (although it should cover most use cases), you can override the implementation with the `com.activiti.api.security.AlfrescoUserDetailsServiceOverride` interface.

### PasswordEncoder override

By default, Process Services uses the `org.springframework.security.crypto.password.StandardPasswordEncoder` for encoding passwords in the database. Note that this is only relevant when using database-backed authentication (so does not hold LDAP/Active Directory). This is an encoder that uses SHA-256 with 1024 iterations and a random salt.

You can override the default setting by implementing the `com.activiti.api.security.AlfrescoPasswordEncoderOverride` interface.
