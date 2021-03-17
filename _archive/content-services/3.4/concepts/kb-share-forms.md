---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share, API/Script]
option: [knowledge base, forms]
---

# Configuring forms in Alfresco Share

The Alfresco Forms engine lets you define and customize interactive forms to create, display, and edit content objects using XML configuration.

The share-config-custom.xml file lets you override everything from a form definition for a particular content type to all aspects of the form presentation system. If the Forms engine is asked to render an edit-form for your Knowledge Base article, it looks for a configuration block appropriate for your article that defines the template to use for the form and all the controls.

In the Knowledge Base example, the `kb:status` property from the Knowledge Base content model is an internal property indicating the lifecycle state of the document. Consumers may be interested to see it, however, editors should not be allowed to edit it. The value of the `kb:status` property should be entirely managed by the rules and workflow in your Knowledge Base space.

-   Modify the file share-config-custom.xml to provide your form for `cm:content` \(the base content type within Alfresco\) as follows:

```
<config evaluator="node-type" condition="cm:content">
   <forms>
      <default-controls>
         <type name="text" 
               template="/org/alfresco/components/form/controls/textfield.ftl" />
      </default-controls>
      <form>
         <edit-form template="/2-column-edit-form.ftl" />
         <field-visibility>
            <show id="kb:articletype" />
            <show id="kb:status" for-mode="view" />
         </field-visibility>
         <appearance>
            <field id="kb:articletype" label="Article Type" 
                   description="Knowledge Base Article Type" />
            <field id="kb:status" label="Status" description="Approval Status" />
         </appearance>
      </form>
   </forms>
</config>
```

The Forms engine gathers all the configuration blocks when asked to render an edit-form for a content object of type `cm:content`. The configuration block instructs the Forms engine to:

-   Override the form template to use the FreeMarker template file described by the path /2-column-edit-form.ftl.
-   Specify the `kb:articletype` field is visible.
-   Specify the `kb:status` field is visible only when the view-form is being shown.
-   Specify the `kb:articletype` field has the label “Article Type” and the description “Knowledge Base Article Type”.
-   Specify the `kb:status` field has the label “Status” and the description “Approval Status”.

The Forms engine looks to the `<edit-form>` element’s template attribute to determine which FreeMarker file to use for the form layout. If this is not provided, it uses the default form layout. The Forms engine then walks through the properties of the content object. For each property, it must determine which control to use as well as look to the configuration to inform the control about what appearance settings to use.

For the `kb:status` property of type `d:text`, the Forms engine must determine what kind of control to render to the screen for this field. It has a number of default controls set up out of the box for the Data Dictionary types \(such as `d:text`\). However, you can also override the default controls as shown in the previous `<default-controls>` element. You have indicated that text fields should use a specific FreeMarker template for the text field. This overrides the out-of-the-box settings. You can also provide form-specific overrides for the view-form.

The Forms engine renders all the controls onto the screen by invoking the FreeMarker for all the individual controls. The FreeMarker files are located in the share.war file but you can also override them or implement your own by placing your templates under the /web-extension/templates directory.

**Parent topic:**[Customizing Alfresco Share \(advanced\)](../concepts/kb-share-customize-adv.md)

