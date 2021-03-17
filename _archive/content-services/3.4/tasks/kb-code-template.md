---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
keyword: knowledge base
---

# Adding the Alfresco Share form template

This copies in a template for a previously created form.

1.  Provide a two-column edit form for metadata in Alfresco Share as follows:

    Add the file 2-column-edit-form.ftl to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts

    2-column-edit-form.ftl

    ```
    <#import "/org/alfresco/components/form/form.lib.ftl" as formLib />
    
    <#if error?exists>
       <div class="error">${error}</div>
    <#elseif form?exists>
    
       <#assign formId=args.htmlid + "-form">
       <#assign formUI><#if args.formUI??>${args.formUI}<#else>true</#if></#assign>
    
       <#if formUI == "true">
          <@formLib.renderFormsRuntime formId=formId />
       </#if>
       
       <div id="${formId}-container" class="form-container">
          
          <#if form.showCaption?exists && form.showCaption>
             <div id="${formId}-caption" class="caption"><span class="mandatory-indicator">*</span>${msg("form.required.fields")}</div>
          </#if>
             
          <#if form.mode != "view">
             <form id="${formId}" method="${form.method}" accept-charset="utf-8" enctype="${form.enctype}" action="${form.submissionUrl}">
          </#if>
          
          <div id="${formId}-fields" class="form-fields"> 
            <#list form.structure as item>
                <#if item.kind == "set">
                   <@renderSetWithColumns set=item />
                <#else>
                   <@formLib.renderField field=form.fields[item.id] />
                </#if>
             </#list>
          </div>
             
          <#if form.mode != "view">
             <@formLib.renderFormButtons formId=formId />
             </form>
          </#if>
    
       </div>
    </#if>
    
    <#macro renderSetWithColumns set>
       <#if set.appearance?exists>
          <#if set.appearance == "fieldset">
             <fieldset><legend>${set.label}</legend>
          <#elseif set.appearance == "panel">
             <div class="form-panel">
                <div class="form-panel-heading">${set.label}</div>
                <div class="form-panel-body">
          </#if>
       </#if>
       
       <#list set.children as item>
          <#if item.kind == "set">
             <@renderSetWithColumns set=item />
          <#else>
             <#if (item_index % 2) == 0>
             <div class="yui-g"><div class="yui-u first">
             <#else>
             <div class="yui-u">
             </#if>
             <@formLib.renderField field=form.fields[item.id] />
             </div>
             <#if ((item_index % 2) != 0) || !item_has_next></div></#if>
          </#if>
       </#list>
       
       <#if set.appearance?exists>
          <#if set.appearance == "fieldset">
             </fieldset>
          <#elseif set.appearance == "panel">
                </div>
             </div>
          </#if>
       </#if>
    </#macro>
    ```

2.  If a file of the same name exists, overwrite it.


**Parent topic:**[Adding Alfresco Share customizations](../tasks/kb-code-share.md)

