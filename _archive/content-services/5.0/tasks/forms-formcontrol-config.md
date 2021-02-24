---
author: Alfresco Documentation
---

# Configuring a form control

Most of the built in controls have parameters, which allow some basic customization.

1.  Open the <web-extension\>\\share-config-custom.xml file.

2.  Change the number of rows and columns used for the `textarea` control that the `cm:description` field uses by default.

    ```
    
    
    <config evaluator="node-type" condition="cm:content">
       <forms>
          <form>
             <appearance>
                <field id="cm:description">
                   <control>
                      <control-param name="rows">20</control-param>
                      <control-param name="columns">80</control-param>
                   </control>
                </field>
             </appearance>
          </form>
       </forms>
    </config>
    
    
    ```

3.  If all `textarea` controls in the application need to have these settings, configure the control in the `default-controls` element. For example:

    ```
    
              
    <config evaluator="node-type" condition="cm:content">
       <forms>
          <default-controls>
             <type name="d:mltext">
                <control-param name="rows">20</control-param>
                <control-param name="columns">80</control-param>
             </type>
          </default-controls>
       </forms>
    </config>
    
    ```

4.  Save the file.


**Parent topic:**[Share Forms](../concepts/forms-intro.md)

