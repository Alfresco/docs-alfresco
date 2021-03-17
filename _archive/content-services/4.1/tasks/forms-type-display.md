---
author: Alfresco Documentation
---

# Displaying type metadata

The configuration to define the fields for the `cm:content` type exists in the system file called web-framework-config-commons.xml. You can configure the type metadata in the share-config-custom.xml file in <web-extension\>. It is also possible to deploy custom configurations via JARs or AMPs.

The following snippet shows the forms definition in the share-config-custom.xml file.

```


<config evaluator="node-type" condition="cm:content">
   <forms>
      <form>
         <field-visibility>
            <show id="cm:name" />
            <show id="cm:title" force="true" />
            <show id="cm:description" force="true" />
            <show id="mimetype" />
            <show id="cm:author" force="true" />
            <show id="size" for-mode="view" />
            <show id="cm:creator" for-mode="view" />
            <show id="cm:created" for-mode="view" />
            <show id="cm:modifier" for-mode="view" />
            <show id="cm:modified" for-mode="view" />
         </field-visibility>
      </form>
   </forms>
</config>


```

The configuration defines that the `cm:name` property is visible in all modes, whereas the `cm:creator`, `cm:created`, `cm:modifier`, and `cm:modified` properties are visible in view mode only.

The `mimetype` and `size` properties are known as transient properties because they do not exist as properties in the model. These properties are formed from the `cm:content` property. The `NodeFormProcessor` knows about these properties and generates a field definition to represent them so that they will appear in the forms.

The `force` attribute ensures that the `NodeFormProcessor` searches the entire Alfresco content model for the property or association definition before returning anything.

1.  Open the <web-extension\>/share-config-custom.xml file.

2.  Enter the configuration for custom types.

    The following example configuration shows the `my:text`, `my:dateTime` and `my:association` properties being configured for the custom `my:example` type.

    ```
    
    
    <config evaluator="node-type" condition="my:example">
       <forms>
          <form>
             <field-visibility>
                <show id="my:text" />
                <show id="my:dateTime" />
                <show id="my:association" />
             </field-visibility>
          </form>
       </forms>
    </config>
    
    
    ```

3.  Add more fields to the default configuration.

    The following example shows how to show the node's `DBID` property for all `cm:content` nodes.

    ```
    
              
    <config evaluator="node-type" condition="cm:content">
       <forms>
         <form>
            <appearance>
               <field id="cm:description">
                  <control>
                     <control-param name="rows">20</value>
                     <control-param name="columns">20</value>
                  </control>
               </field>
            </appearance>
         </form>
      </forms>
    </config>
    
    
    ```

    **Note:** The full prefix version of the type is required in the `condition` attribute.

    The `force` attribute forces the `NodeFormProcessor` to search the entire Alfresco content model for the property or association definition before returning anything.

4.  Save your file.


**Parent topic:**[Forms](../concepts/forms-intro.md)

