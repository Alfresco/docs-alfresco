---
title: Form Processor Filters Extension Point
---

Form Processor filters can be used to modify submitted form data before and after persistence. They can also be used to 
manage form fields before and after form generation.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

Form Processor filters are typically used to add custom processing to a form processor. If you are new to how forms are 
persisted and generated, and how filters plays into that, then read the 
[Form Processors]({% link content-services/7.2/develop/share-ext-points/form-processors.md %}) extension point docs before proceeding.

Here are a number of use-cases for form processor filters:

* Adding fields before the form is generated.
* Adding calculated fields after the default set of fields have been processed.
* Generating a unique identifier for a field before it's stored in the database.
* Generate XML rendition of the metadata after the form data is stored in the database.
* Check field values before they are stored in the database.

A filter registry is associated with each [Form Processor]({% link content-services/7.2/develop/share-ext-points/form-processors.md %}) 
implementation that extends the `FilteredFormProcessor` class, each registered `Filter` is then called 
(within the same transaction) for each request processed by the `FormProcessor`.

It is the responsibility of the `Filter` to determine whether it is applicable for the request. The order in which the 
Filters are executed is not guaranteed.

Implementing a form processor filter requires a bit of Java programming. The following is an example of a filter that 
adds a property called `prop_dueDateReadOnly`, which is then used in a custom [Form Control]({% link content-services/7.2/develop/share-ext-points/form-controls.md %}) 
to determine if a Due Date should be read-only or not:

```java
public class TaskFormFilter extends AbstractFilter<WorkflowTask, WorkflowTask> {
    public static final String DUEDATE_READONLY_PROP_NAME = "prop_dueDateReadOnly";

    @Override
    public void beforeGenerate(WorkflowTask workflowTask, List<String> fields, List<String> forcedFields,
                               Form form, Map<String, Object> context) {
        if (workflowTask != null) {
            boolean dueDateReadOnly = false;

            final FieldDefinition dueDateReadOnlyFieldDef = new PropertyFieldDefinition("dueDateReadOnly", "d:boolean");
            dueDateReadOnlyFieldDef.setDataKeyName(DUEDATE_READONLY_PROP_NAME);
            dueDateReadOnlyFieldDef.setProtectedField(true);
            dueDateReadOnlyFieldDef.setLabel("Due Date Read-only");
            form.addFieldDefinition(dueDateReadOnlyFieldDef);
            form.addData(DUEDATE_READONLY_PROP_NAME, dueDateReadOnly);
        }
    }

    @Override
    public void afterGenerate(WorkflowTask workflowTask, List<String> fields, List<String> forcedFields,
                              Form form, Map<String, Object> context) {}

    @Override
    public void beforePersist(WorkflowTask workflowTask, FormData fieldDatas) {}

    @Override
    public void afterPersist(WorkflowTask workflowTask, FormData fieldDatas, WorkflowTask workflowTask1) {}
}
```

By extending the `AbstractFilter` class the filter gets automatically registered with the form processor. The form filter 
class is parametrized so we can specialize the data type that the form is for upfront: `Filter<ItemType, PersistType>`. 
The above filter has been created assuming the form is for a Workflow Task: `AbstractFilter<WorkflowTask, WorkflowTask>`

After the filter class has been implemented we need to define a Spring Bean for it and at the same time specify which 
form processor we want to use:

```xml
<bean id="org.alfresco.training.repo.form.filter.taskFormFilter"
      class="org.alfresco.training.repo.forms.processor.TaskFormFilter" parent="baseFormFilter">
    <property name="filterRegistry" ref="taskFilterRegistry" />
</bean>
```

In this case we are using the `taskFilterRegistry` as we are dealing with a Workflow Task forms that are processed by 
the `TaskFormProcessor`. There are other filter registries that you need to use for form filters that deal with objects 
from content models:

* `NodeFormProcessor`: use the `nodeFilterRegistry`
* `TypeFormProcessor`: use the `typeFilterRegistry`

Defining a filter for a content model item and form looks something like this:

```java
public class ContentItemFormFilter extends AbstractFilter<Object, NodeRef> {
    @Override public void beforeGenerate(Object item, List<String> fields, List forcedFields,
                                         Form form, Map<String, Object> context) {}
    @Override public void afterGenerate(Object item, List<String> fields, List forcedFields,
                                        Form form, Map<String, Object> context) {}
    @Override public void beforePersist(Object item, FormData data) {}
    @Override public void afterPersist(Object item, FormData data, NodeRef persistedObject) {}
}
```

This filter would be registered via the following Spring bean definition:

```xml
<bean id="org.alfresco.training.repo.form.filter.contentItemFormFilterEdit"
      class="org.alfresco.training.repo.forms.processor.ContentItemFormFilter" parent="baseFormFilter">
    <property name="filterRegistry" ref="nodeFilterRegistry" />
</bean>
```

This filter will actually only be invoked when you edit the content item (Node), if you want to also have the filter to 
be invoked when creating a content item (Node), then you have to also register it as follows:

```xml
<bean id="org.alfresco.training.repo.form.filter.contentItemFormFilterCreate"
      class="org.alfresco.training.repo.forms.processor.ContentItemFormFilter" parent="baseFormFilter">
    <property name="filterRegistry" ref="typeFilterRegistry" />
</bean>
```

>**Note**: You can't use the `nodeFilterRegistry` or `typeFilterRegistry` for Document Library Actions - they are only there for node creation, view and edit.

The different methods that can be overridden, such as `beforeGenerate`, gives you the possibility to hook into the 
forms processing. They have the following meaning:

* `beforeGenerate`: Callback invoked before the form is generated/created. This is the place to add properties that should be used by for example form controls.
* `afterGenerate`: Callback invoked after the form has been generated for the given items and fields.
* `beforePersist`: Callback invoked before the form data is stored in the database. This method can be used to for example check the form fields.
* `afterPersist`: Callback invoked after the form data is stored in the database.

## Deployment - App Server

Form filter implementations does not lend themselves very well to be manually installed in an application server.
Build a Repository JAR instead.

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/java/{custom package path}` - put the Form Filter class somewhere under this directory
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml` - put the Form Filter Spring bean here.

## More Information

* [Form Processors]({% link content-services/7.2/develop/share-ext-points/form-processors.md %})
* [Form Controls]({% link content-services/7.2/develop/share-ext-points/form-controls.md %})
* [Forms config]({% link content-services/7.2/develop/share-ext-points/share-config.md %}#shareformsconfig)