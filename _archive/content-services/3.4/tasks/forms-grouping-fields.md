---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: Forms
---

# Grouping fields

For longer forms, you can group fields together in logical grouped or nested sections.

1.  Open the <web-extension\>\\share-config-custom.xml file.

2.  Enter the configuration for custom types.

    The following example configuration shows how to group some fields from an imaginary custom `my:example` type.

    ```
    <config evaluator="model-type" condition="my:example">
       <forms>
          <form>
             <field-visibility>
                <show id="cm:name" />
                <show id="my:text" />
                <show id="my:mltext" />
                <show id="my:boolean" />
                <show id="my:int" />
                <show id="my:long" />
                <show id="my:double" />
                <show id="my:float" />
                <show id="my:status" />
                <show id="my:restricted-string" />
                <show id="my:date" />
                <show id="my:dateTime" />
             </field-visibility>
             <appearance>
                <set id="text" appearance="fieldset" label="Text Fields" />
                <set id="number" appearance="panel" label="Number Fields" />
                <set id="date" appearance="fieldset" label="Date Fields" />
                   
                <field id="cm:name" set="text" />
                <field id="my:text" set="text" />
                <field id="my:mltext" set="text" />
                <field id="my:boolean" set="text" />
                   
                <field id="my:int" set="number" />
                <field id="my:long" set="number" />
                <field id="my:double" set="number" />
                <field id="my:float" set="number" />
                   
                <field id="my:date" set="date" />
                <field id="my:dateTime" set="date" />
             </appearance>
          </form>
       </forms>
    </config>
    ```

    Nested sets are also supported. Use the `parent` attribute in the `set` element. The following example configuration shows the fields of the `my:example` type in a nested set.

    ```
    <config evaluator="model-type" condition="my:example">
       <forms>
          <form>
             <field-visibility>
                <show id="cm:name" />
                <show id="my:text" />
                <show id="my:mltext" />
                <show id="my:boolean" />
                <show id="my:int" />
                <show id="my:long" />
                <show id="my:double" />
                <show id="my:float" />
             </field-visibility>
             <appearance>
                <set id="builtin" appearance="fieldset" label="Built In" />
                <set id="custom" appearance="fieldset" label="Custom Data" />
                <set id="text" parent="custom" appearance="panel" label="Text" />
                <set id="number" parent="custom" appearance="panel" label="Numbers" />
                   
                <field id="cm:name" set="builtin" />
                   
                <field id="my:text" set="text" />
                <field id="my:mltext" set="text" />
                <field id="my:boolean" set="text" />
                   
                <field id="my:int" set="number" />
                <field id="my:long" set="number" />
                <field id="my:double" set="number" />
                <field id="my:float" set="number" />
             </appearance>
          </form>
       </forms>
    </config>
    
    ```

3.  Save the file.


**Parent topic:**[Forms](../concepts/forms-intro.md)

