---
author: Alfresco Documentation
---

# Form Controls

When defining a form the form controls for each field controls how the field is displayed and handled.

|Extension Point|Form Controls|
|---------------|-------------|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|Share comes with form controls for most of the field types that is used in a form, such as integers, dates, text etc. However, sometimes it is necessary to define and implement a custom form control. A form control is implemented as a FreeMarker template, here is the one for a standard Text Field \(textfield.ftl\):

 ```
<div class="form-field">
   <#if form.mode == "view">
      <div class="viewmode-field">
         <#if field.mandatory && !(field.value?is_number) && field.value == "">
            <span class="incomplete-warning"><img src="${url.context}/res/components/form/images/warning-16.png" title="${msg("form.field.incomplete")}" /><span>
         </#if>
         <span class="viewmode-label">${field.label?html}:</span>
         <#if field.control.params.activateLinks?? && field.control.params.activateLinks == "true">
            <#assign fieldValue=field.value?html?replace("((http|ftp|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?\\^=%&:\\/~\\+#]*[\\w\\-\\@?\\^=%&\\/~\\+#])?)", "<a href=\"$1\" target=\"_blank\">$1</a>", "r")>
         <#else>
            <#if field.value?is_number>
               <#assign fieldValue=field.value?c>
            <#else>
               <#assign fieldValue=field.value?html>
            </#if>
         </#if>
         <span class="viewmode-value"><#if fieldValue == "">${msg("form.control.novalue")}<#else>${fieldValue}</#if></span>
      </div>
   <#else>
      <label for="${fieldHtmlId}">${field.label?html}:<#if field.mandatory><span class="mandatory-indicator">${msg("form.required.fields.marker")}</span></#if></label>
      <input id="${fieldHtmlId}" name="${field.name}" tabindex="0"
             <#if field.control.params.password??>type="password"<#else>type="text"</#if>
             <#if field.control.params.styleClass??>class="${field.control.params.styleClass}"</#if>
             <#if field.control.params.style??>style="${field.control.params.style}"</#if>
             <#if field.value?is_number>value="${field.value?c}"<#else>value="${field.value?html}"</#if>
             <#if field.description??>title="${field.description}"</#if>
             <#if field.control.params.maxLength??>maxlength="${field.control.params.maxLength}"<#else>maxlength="1024"</#if> 
             <#if field.control.params.size??>size="${field.control.params.size}"</#if> 
             <#if field.disabled && !(field.control.params.forceEditable?? && field.control.params.forceEditable == "true")>disabled="true"</#if> />
      <@formLib.renderFieldHelp field=field />
   </#if>
</div>
```

These standard form control implementations can be found in the tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/form/controls directory. The two FreeMarker root objects that contain most of the information that we need when implementing the control is the `form` object and the `field` object. These objects get their data from the form and field definitions. And you can also implement [Form Filters](dev-extensions-share-form-filters.md) to add extra properties that can be used in the form control implementation.

 The following form definition shows the use of the Text Field form control:

 ```
<config evaluator="node-type" condition="cm:content">
      <forms>
         <!-- Default form configuration for the cm:content type -->
         <form>
            <field-visibility>
               <show id="cm:name" />
               <show id="cm:title" force="true" />
               ...               
            </field-visibility>
            <appearance>
               <field id="cm:name">
                 <control>
                    <control-param name="maxLength">255</control-param>
                 </control>
               </field>
               <field id="cm:title">
                  <control template="/org/alfresco/components/form/controls/textfield.ftl" />
               </field>
               ...               
            </appearance>
         </form>
```

The field `cm:title` is using the textfield.ftl form control. You can also leave out the form control specification, like is shown here for the `cm:name` field, and let the forms engine select a matching form control based on field data type.

 Implementing a custom form control is as easy as creating a new FreeMarker template file and putting it somewhere under the alfresco/web-extension/site-webscripts/ directory. Here is an example of a custom form control for a Due Date field that should be editable sometimes and read-only sometimes, it is stored in org/alfresco/training/components/form/controls/duedate.ftl:

 ```
<#-- This Date control implementation checks a property that is set up in a Form Filter to see
     if the due date should be displayed as read-only or not -->
<#if form.data['prop_dueDateReadOnly'] == true>
    <#-- Bring in standard info.ftl -->
    <#include "/org/alfresco/components/form/controls/info.ftl" />
<#else>
    <#-- Bring in standard date.ftl -->
    <#include "/org/alfresco/components/form/controls/date.ftl" />
</#if>
```

 This custom form control uses a custom property called `prop_dueDateReadOnly` that would need to be set up in a [Form Filters](dev-extensions-share-form-filters.md). This form control would then be used as follows:

 ```
<config evaluator="node-type" condition="acme:document">
      <forms>
        <form>
          <field-visibility>
            ...
            <show id="acme:dueDate" />
          </field-visibility>
          <appearance>
            ...
            <field id="acme:dueDate" set="info" label-id="acme.due.date">
                <control template="/org/alfresco/training/components/form/controls/duedate.ftl" />
            </field>
          </appearance>
        </form>
      </forms>
    </config>
```

 Here we are defining a form for a custom type called `acme:document`, which contains a property called `acme:dueDate` that should use the new form control.|
|Deployment - App Server|tomcat/shared/classes/alfresco/web-extension/site-webscripts/ \(Untouched by re-depolyments and upgrades\)Best practice is to put the file in a directory that explains what the file is for, such as for example:

tomcat/shared/classes/alfresco/web-extension/site-webscripts/org/alfresco/training/components/form/controls

|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-share-amp-archetype.md)|share-amp/src/main/amp/config/alfresco/web-extension/site-webscripts|
|More Information|-   [Customizing Form Controls](../tasks/forms-controls-custom.md)
-   [Form Control Reference](forms-reference.md)
-   [Forms](forms-intro.md)

|
|Tutorials|-   [Adding a custom Form Control](../tasks/forms-custom-formcontrol.md)
-   [Configuring a Form Control](../tasks/forms-formcontrol-config.md)

|
|Alfresco Developer Blogs| |

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

