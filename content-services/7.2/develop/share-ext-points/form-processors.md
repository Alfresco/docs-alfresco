---
title: Form Processors Extension Point
---

Custom Form Processor implementations can be implemented and integrated via a small amount of Spring configuration. 
Typically you will do this to support a new "kind" of form.

Architecture Information: 

>**Note**: The form processor is implemented on the platform side but invoked from the UI side.

[Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)
[Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

A form processor is a component that lives on the server side (that is, in the `alfresco.war`) even though it has to do 
with the user interface. It is responsible for persisting submitted form data and for generating the form template that 
is the basis for the form view.

The following figure illustrates:

![dev-extensions-repo-form-processor-with-filters]({% link content-services/images/dev-extensions-repo-form-processor-with-filters.png %})

A form processor is associated with a specific item, such as a node, type, task, action etc. The item does not necessarily 
need to be persisted into the repository. For example, the repository action item is associated with a form processor 
that will execute the action when the persist method is called.

When the persist and generate methods are called via web scripts then these calls can be intercepted by so called 
[Form Filters]({% link content-services/7.2/develop/share-ext-points/form-processor-filters.md %}). These can be used to for example alter the form data 
before it is persisted, add a form field before form generation etc.

Custom form processors can be implemented in Java with a small amount of Spring configuration. Typically you will do this 
to support a new type of item form. However, if you simply wish to add a few extra fields to a form, or want to support a 
new type of field, then you should probably consider using a [Form Filter]({% link content-services/7.2/develop/share-ext-points/form-processor-filters.md %}) 
or a Field Processor rather than implementing a new form processor.

Form processors have two primary functions:

* To **generate a form** representing an item of a certain kind. This is implemented through the `generate(Item, List<String>, List<String>, Map<String, Object>)` method.
* To **create or update an item** of a certain kind (for example, node, type, task) based on a form submission. This is implemented through the `persist(Item, FormData)` method.

The `org.alfresco.repo.forms.processor.FormProcessor` interface has two other methods that are required by the 
`org.alfresco.repo.forms.FormService`, which is used under the hood to get the form template and save the submitted form data:

* The `isApplicable(Item)` method is used to determine whether a `FormProcessor` is able to generate a form template and persist form data for a given item.
* The `isActive()` method is used to determine if a `FormProcessor` is currently active and available to generate or persist forms.

Several extensible `FormProcessor` implementations are provided out-of-the-box and can be used as the basis for new 
custom form processor implementations:

* `TaskFormProcessor` - extends `AbstractWorkflowFormProcessor`
* `WorkflowFormProcessor` - extends `AbstractWorkflowFormProcessor`
* `AbstractWorkflowFormProcessor` - extends `ContentModelFormProcessor`
* `TypeFormProcessor` - extends `ContentModelFormProcessor`
* `NodeFormProcessor` - extends `ContentModelFormProcessor`
* `ContentModelFormProcessor` - extends `FilteredFormProcessor`
* `ActionFormProcessor` - extends `FilteredFormProcessor`
* `FilteredFormProcessor` - extends `AbstractFormProcessor`
* `AbstractFormProcessor` - **note.** extending this form processor class does not give access to filters

As an example of a custom form processor we will implement one that can handle forms that manage global key-value attributes. To represent an attribute item in the form processor we will use the following new class:

```java
public class AttributeItem {
    public static final String TYPE = "attribute";

    private Serializable[] keys;
    private Serializable value;

    public Serializable[] getKeys() {
        return keys;
    }
    public void setKeys(Serializable[] keys) {
        this.keys = keys;
    }
    public Serializable getValue() {
        return value;
    }
    public void setValue(Serializable value) {
        this.value = value;
    }
}
```

This class can be used to store all three keys and the value. It also keeps a constant with the item type, which we 
have set up as "attribute". The item type is also known as the `itemKind` in the form processor world. Now when we got 
something representing the attribute item type we can define the new attribute form processor as follows:

```java
import org.alfresco.repo.forms.*;
import org.alfresco.repo.forms.processor.FilteredFormProcessor;
import org.alfresco.repo.forms.processor.FormCreationData;
import org.alfresco.repo.forms.processor.node.FormFieldConstants;
import org.alfresco.service.ServiceRegistry;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.Serializable;
import java.util.*;

/**
 * Attribute Form Processor that can handle global keys->value attributes.
 * These attributes are not associated with any content model neither
 * stored as nodes in the repository.
 *
 * @author martin.bergljung@alfresco.com
 */
public class AttributeFormProcessor extends FilteredFormProcessor<AttributeItem, AttributeItem> {
    private static final Log logger = LogFactory.getLog(AttributeFormProcessor.class);

    /**
     * Form field names
     */
    public static final String KEY1_FORM_FIELD = "attribute_key1";
    public static final String KEY2_FORM_FIELD = "attribute_key2";
    public static final String KEY3_FORM_FIELD = "attribute_key3";
    public static final String VALUE_FORM_FIELD = "attribute_value";

    /**
     * Access to all public Alfresco services
     */
    ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    /*
     * @see org.alfresco.repo.forms.processor.node.FilteredFormProcessor#getLogger()
     */
    @Override
    protected Log getLogger() {
        return logger;
    }

    /**
     * @param item the item.getId() will be the attribute keys as a comma separated string for the edit and view
     *             form modes, and "create_attribute" for create form mode.
     * @return the AttributeItem with the separate keys
     * @see org.alfresco.repo.forms.processor.FilteredFormProcessor#getTypedItem(org.alfresco.repo.forms.Item)
     */
    @Override
    protected AttributeItem getTypedItem(Item item) {
        AttributeItem attributeItem = new AttributeItem();

        final String attributeKeys = item.getId();

        if (StringUtils.isNotBlank(attributeKeys) && !attributeKeys.equals("create_attribute")) {
            String[] keys = attributeKeys.split(",");
            attributeItem.setKeys(keys);
        }

        return attributeItem;
    }

    /*
     * Return item type as "attribute"
     *
     * @see org.alfresco.repo.forms.processor.FilteredFormProcessor#getItemType(java.lang.Object)
     */
    @Override
    protected String getItemType(AttributeItem item) {
        return AttributeItem.TYPE;
    }

    /*
     * An attribute is not accessible via a URL so this method is not applicable.
     *
     * @see org.alfresco.repo.forms.processor.FilteredFormProcessor#getItemURI(java.lang.Object)
     */
    @Override
    protected String getItemURI(AttributeItem item) {
        return "";
    }

    /**
     * Creates a data object used by the FormProcessor and FieldProcessors to create {@link Field Fields}
     *
     * @return
     */
    @Override
    protected Object makeItemData(AttributeItem item) {
        if (item.getKeys() != null && item.getKeys().length > 0) {
            // Get the attribute value for key(s)
            Serializable attributeValue = serviceRegistry.getAttributeService().getAttribute(item.getKeys());
            item.setValue(attributeValue);
        }

        // Return the attribute item with optionally the value set
        return item;
    }

    /* Store the attribute and return the stored attribute data.
     * There is no special unique ID generated when we store an attribute so just return it as we stored it.
     *
     * @see org.alfresco.repo.forms.processor.FilteredFormProcessor#internalPersist(java.lang.Object, org.alfresco.repo.forms.FormData)
     */
    @Override
    protected AttributeItem internalPersist(AttributeItem item, FormData data) {
        if (logger.isDebugEnabled()) {
            logger.debug("Persisting form data for: [item=" + item + "][data=" + data + "]");
        }

        // We need to find the form field data for the attribute keys and value.
        // However the form service may have added "prop_", "assoc_", "_added" and "_removed"
        // prefixes/suffixes, which we are not interested in.
        Serializable key1Object = null;
        FormData.FieldData key1FieldData = data.getFieldData(FormFieldConstants.PROP_DATA_PREFIX + KEY1_FORM_FIELD);
        if (key1FieldData == null) {
            throw new FormException("Missing attribute form data: " + KEY1_FORM_FIELD +
                    " [item=" + item + "][data=" + data + "]");
        } else {
            if (key1FieldData.getValue() instanceof Serializable) {
                key1Object = (Serializable)key1FieldData.getValue();
            } else {
                throw new FormException("Value for attribute key1 is not Serializable: " +
                        " [item=" + item + "][data=" + data + "]");
            }
        }
        Serializable key2Object = null;
        Serializable key3Object = null;
        FormData.FieldData key2FieldData = data.getFieldData(FormFieldConstants.PROP_DATA_PREFIX + KEY2_FORM_FIELD);
        if (key2FieldData != null) {
            if (key2FieldData.getValue() instanceof Serializable) {
                key2Object = (Serializable)key2FieldData.getValue();
            } else {
                throw new FormException("Value for attribute key2 is not Serializable: " +
                        " [item=" + item + "][data=" + data + "]");
            }
            FormData.FieldData key3FieldData = data.getFieldData(FormFieldConstants.PROP_DATA_PREFIX + KEY3_FORM_FIELD);
            if (key3FieldData != null) {
                if (key3FieldData.getValue() instanceof Serializable) {
                    key3Object = (Serializable)key3FieldData.getValue();
                } else {
                    throw new FormException("Value for attribute key3 is not Serializable: " +
                            " [item=" + item + "][data=" + data + "]");
                }
            } else {
                // OK, only one key is needed
            }
        } else {
            // OK, only one key is needed
        }
        Serializable valueObject = null;
        FormData.FieldData valuefieldData = data.getFieldData(FormFieldConstants.PROP_DATA_PREFIX + VALUE_FORM_FIELD);
        if (valuefieldData != null && valuefieldData.getValue() != null) {
            if (valuefieldData.getValue() instanceof Serializable) {
                valueObject = (Serializable) valuefieldData.getValue();
            } else {
                throw new FormException("Value for attribute value is not Serializable: " +
                        " [item=" + item + "][data=" + data + "]");
            }
        } else {
            // OK, value can be null
        }

        Serializable[] keys = { key1Object, key2Object, key3Object };

        if (serviceRegistry.getAttributeService().exists(keys)) {
            // Update the attribute
            serviceRegistry.getAttributeService().setAttribute(valueObject, keys);
        } else {
            // Create the attribute
            serviceRegistry.getAttributeService().createAttribute(valueObject, keys);
        }

        return item;
    }

    /**
     * Generate default fields if there were none specified via a form configuration.
     * We know what fields are necessary for creating an attribute (key,key2,key3, and value).
     *
     * @param data
     * @param fieldsToIgnore
     * @return
     * @see org.alfresco.repo.forms.processor.FilteredFormProcessor#generateDefaultFields(org.alfresco.repo.forms.processor.FormCreationData, java.util.List)
     */
    protected List<Field> generateDefaultFields(FormCreationData data, List<String> fieldsToIgnore) {
        List<Field> fields = new ArrayList<Field>();

        // Add the four attribute fields that we need
        fields.add(new AttributeField(KEY1_FORM_FIELD, "Attribute key1 - mandatory", "Key1", true));
        fields.add(new AttributeField(KEY2_FORM_FIELD, "Attribute key2 - can be null", "Key2", false));
        fields.add(new AttributeField(KEY3_FORM_FIELD, "Attribute key3 - can be null", "Key2", false));
        fields.add(new AttributeField(VALUE_FORM_FIELD, "Attribute value - can be null", "Value", false));

        return fields;
    }

    /**
     * Check field definitions coming in from a share-config-custom.xml form configuration.
     * Might be less than four... as only key1 is necessary.
     *
     * @param requestedFields fields requested via form definition
     * @param data
     * @return
     */
    @Override
    protected List<Field> generateSelectedFields(List<String> requestedFields, FormCreationData data) {
        List<String> fieldsToIgnore = Collections.emptyList();

        // First just generate the four required fields (i.e. keys plus value)
        List<Field> fields = this.generateDefaultFields(data, fieldsToIgnore);

        List<Field> results = new ArrayList<Field>();

        for (Field f : fields) {
            if (f.getFieldName().equals(KEY1_FORM_FIELD)) {
                // Mandatory
                results.add(f);
            } else if (requestedFields.contains(f.getFieldName())) {
                // It was selected via form
                results.add(f);
            }
        }

        return results;
    }

    @Override
    protected List<String> getDefaultIgnoredFields() {
        return Collections.emptyList();
    }
}
```

The custom attribute form processor extends the out-of-the-box `FilteredFormProcessor`, which means that users of 
the `AttributeFormProcessor` could extend it with more processing via custom filters.

We then define four constants with the form field names that we will need, three keys and a value. These field names 
need to match what we use in the form configuration in `share-config-custom.xml`:

```xml
<config>
    <forms>
        <form id="attributeForm">
            <field-visibility>
                <show id="attribute_key1"/>
                <show id="attribute_key2"/>
                <show id="attribute_key3"/>
                <show id="attribute_value"/>
            </field-visibility>
            <appearance>
                <field id="attribute_key1" label-id="alfresco.tutorials.doclib.action.createAttribute.form.field.key1"
                       mandatory="true"/>
                <field id="attribute_key2" label-id="alfresco.tutorials.doclib.action.createAttribute.form.field.key2"/>
                <field id="attribute_key3" label-id="alfresco.tutorials.doclib.action.createAttribute.form.field.key3"/>
                <field id="attribute_value" label-id="alfresco.tutorials.doclib.action.createAttribute.form.field.value" />
            </appearance>
        </form>
    </forms>
</config>

```

This form configuration does not have an evaluator and condition so the form configuration will always be read and 
available. Note the form id, which is set to `attributeForm`, and will be used when we POST a call to generate the 
attribute form.

The significant methods in the custom form processor implementation starts with the `internalPersist` method that will 
fish out the values for each field in the submitted form field data and then either create a new attribute or update an 
existing attribute depending on if the key(s) exists or not.

Then we have the `generateDefaultFields` method that will set up the four fields that we need. A custom field class 
called `AttributeField` is used and it looks like this:

```java
public class AttributeField implements Field {
    private FieldDefinition fieldDef;
    private String name;

    public AttributeField(String name, String description, String displayLabel, boolean mandatory) {
        this.name = name;

        // All attribute fields are text input
        QName type = DataTypeDefinition.TEXT;

        // Re-use the content model property field definition
        PropertyFieldDefinition propDef = new PropertyFieldDefinition(this.name, type.getLocalName());
        propDef.setMandatory(mandatory);
        this.fieldDef = propDef;

        // Set form field display label
        this.fieldDef.setDescription(description);
        this.fieldDef.setLabel(displayLabel);
        this.fieldDef.setDataKeyName(this.name);
    }

    @Override
    public FieldDefinition getFieldDefinition() {
        return this.fieldDef;
    }

    @Override
    public String getFieldName() {
        return this.name;
    }

    @Override
    public Object getValue() {
        // Setting attribute forms fields to null, no edit support
        return null;
    }
}
```

As a field definition we reuse the out-of-the-box `PropertyFieldDefinition`. The `generateDefaultFields` method is also 
where we would set default values for the fields if we would generate a form in `edit` or `view` mode.

When we are finished with the custom form processor it need to be registered with the forms system. This is done via a 
Spring bean definition as follows:

```xml
<bean id="org.alfresco.tutorial.formprocessor.attributeFormProcessor"
	  class="org.alfresco.tutorial.formprocessor.AttributeFormProcessor"
	  init-method="register">
	<property name="processorRegistry" ref="formProcessorRegistry" />
	<property name="fieldProcessorRegistry" ref="fieldProcessorRegistry" />
	<property name="matchPattern">
		<value>attribute</value>
	</property>
	<property name="serviceRegistry" ref="ServiceRegistry" />
</bean>
```

Note here the `init-method` is set to `register` and we inject the `processorRegistry` bean to get the custom processor 
properly registered. It will be active for any form generation requires with `itemKind` that matches the `matchPattern` 
"attribute".

To kick off the attribute form a JavaScript based Document Library action will be used and it will look like this in Share:

![dev-extensions-repo-attribute-form-processor-create-form]({% link content-services/images/dev-extensions-repo-attribute-form-processor-create-form.png %})

When the **Create Attribute** action is clicked the form is displayed as above according to the form configuration. 
The JavaScript code that POST the call to generate the form looks like this:

```javascript
(function () {
    YAHOO.Bubbling.fire("registerAction",
        {
            actionName: "onCreateAttribute",
            fn: function org_alfresco_training_onCreateAttribute(file) {

                var elementId = this.id + "-createAttribute",
                    createAttributeDlg = new Alfresco.module.SimpleDialog(elementId);

                // This is a create scenario, attribute does not exist
                var keys = "create_attribute";

                // Create Attribute Dialog Form Template
                var templateUrl = YAHOO.lang.substitute(
                    Alfresco.constants.URL_SERVICECONTEXT +
                    "components/form?itemKind={itemKind}&itemId={itemId}&mode={mode}&submitType={submitType}&formId={formId}&showCancelButton=true",
                    {
                        itemKind: "attribute",
                        itemId: keys,
                        mode: "create",
                        submitType: "json",
                        formId: "attributeForm"
                    }
                );

                // Intercept before dialog show
                var doBeforeDialogShow = function org_alfresco_training_onCreateAttribute_doBeforeDialogShow(p_form, p_dialog) {
                    Dom.get(elementId + "-form-container_h").innerHTML =
                        this.msg("alfresco.tutorials.doclib.action.createAttribute.dialog.title");
                };

                // Set dialog options and show it
                createAttributeDlg.setOptions(
                    {
                        width: "33em",
                        templateUrl: templateUrl,
                        actionUrl: null,
                        destroyOnHide: true,
                        doBeforeDialogShow: {
                            fn: doBeforeDialogShow,
                            scope: this
                        },
                        onSuccess: {
                            fn: function org_alfresco_training_onCreateAttribute_success(response) {
                                Alfresco.util.PopupManager.displayMessage(
                                    {
                                        text: this.msg("alfresco.tutorials.doclib.action.createAttribute.msg.success")
                                    });
                            },
                            scope: this
                        },
                        onFailure: {
                            fn: function org_alfresco_training_onCreateAttribute_failure(response) {
                                Alfresco.util.PopupManager.displayMessage(
                                    {
                                        text: this.msg("alfresco.tutorials.doclib.action.createAttribute.msg.failure")
                                    });
                            },
                            scope: this
                        }
                    }
                ).show();
            }
        })
})();
```

The **components/form** web script call has the important properties `itemKind` and `formId` that will get the 
`AttributeFormProcessor` invoked and the form configuration that we defined used.

The document library action that calls the JavaScript function above is defined like this in `share-config-custom.xml`:

```xml
config evaluator="string-compare" condition="DocLibActions">
<actions>
   <action id="alfresco.tutorials.doclib.action.createAttribute"
           icon="attribute"
           type="javascript"
           label="alfresco.tutorials.doclib.action.createAttribute.label">
       <param name="function">onCreateAttribute</param>
   </action>
</actions>
```

Note the function parameter, which has to be set to the same name as `actionName` in the JavaScript code above.

For a full sample implementation of this `AttributeFormProcessor` see code links below.

## Deployment - App Server

A custom form processor is implemented in Java, which is not suitable for manual installation into an Content Services 
installation. Use a platform/repository JAR project instead.

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/java/{custom package path}` - Java form processor implementation, including supporting classes for field, item etc.
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml` - Form Processor Spring Bean definition

>**Note**. invocation of a form processor is done from the Share side, see sample code links below.

## More Information

* [Form Processor Filters]({% link content-services/7.2/develop/share-ext-points/form-processor-filters.md %})
* [Form Controls]({% link content-services/7.2/develop/share-ext-points/form-controls.md %})
* [Forms config]({% link content-services/7.2/develop/share-ext-points/share-config.md %}#shareformsconfig)

## Sample Code

* [Attribute Form Processor implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-form-processor-repo){:target="_blank"}
* [Share UI DocLib action implementation that displays form generated via the Attribute Form Processor.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-form-processor-share){:target="_blank"}
