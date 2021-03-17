---
author: Alfresco Documentation
---

# Displaying aspect metadata

Add the properties and associations defined on aspects by adding them to the list of fields to show for a type. The aspects that appear can be defined on a type by type basis, and you can control the ordering of the fields.

1.  Open the <web-extension\>\\share-config-custom.xml file.

    **Attention:** Note that rather than editing the share-config-custom.xml file directly, you can alternatively create a configuration that you place in a JAR file, or deploy your customization via an AMP file.

2.  Enter the configuration for custom types.

    The following example configuration shows the `cm:from` and `cm:to` properties for the `cm:effectivity` aspect.

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
    
                <!-- cm:effectivity aspect -->
                <show id="cm:from"/>
                <show id="cm:to"/>
             </field-visibility>
          </form>
       </forms>
    </config>
    
    ```

3.  Add custom aspects to the default configuration by overriding the configuration.

    The following example shows how to add the fields of an example aspect to all forms for the `cm:content` type.

    ```
     <config evaluator="node-type" condition="cm:content">
       <forms>
          <form>
             <field-visibility>
                <!-- fields from my example aspect -->
                <show id="my:aspectProperty" />
                <show id="my:aspectAssociation" />
             </field-visibility>
          </form>
       </forms>
    </config>
    
    ```

4.  Save the file.


**Parent topic:**[Forms](../concepts/forms-intro.md)

[AMP files](https://wiki.alfresco.com/wiki/AMP_Files)

[Customizing Share](share-customize.md)

