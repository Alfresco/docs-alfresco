---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: Forms
---

# Providing a custom form control

If none of the out-of-the-box controls are sufficient, you can add new controls and reference them. Controls are Freemarker template snippets, therefore, they contain only the HTML markup required to represent the control. The templates need to be stored in the site-webscripts directory, which will usually be in the application server shared classpath.

-   The following example configuration shows a very simple custom text field control that always displays with a green background, white text, and 700 pixels wide. For a production system, use a CSS class; however, this example shows a hard coded style.

    ```
    <div class="form-field">
       <#if form.mode == "view">
          <div class="viewmode-field">
             <span class="viewmode-label">${field.label?html}:</span>
             <span class="viewmode-value">${field.value?html}</span>
          </div>
       <#else>
          <label for="${fieldHtmlId}">${field.label?html}:<#if field.mandatory><span class="mandatory-indicator">*</span></#if></label>
          <input id="${fieldHtmlId}" type="text" name="${field.name}" value="${field.value}" 
                       style="background-color: green; color: white; width: 700px;" <#if field.disabled>disabled="true"</#if> />
       </#if>
    </div>
    
    ```

-   The following example configuration shows this control being used for the `cm:name` property, with a file name of my-textfield.ftl.

    ```
    <config evaluator="node-type" condition="cm:content">
       <forms>
          <form>
             <appearance>
                <field id="cm:name">
                   <control template="/my-textfield.ftl" />
                </field>
             </appearance>
          </form>
       </forms>
    </config>
    
    ```


**Parent topic:**[Forms](../concepts/forms-intro.md)

