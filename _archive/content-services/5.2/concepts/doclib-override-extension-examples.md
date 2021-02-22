---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Override and extension examples

You configure new evaluators by using a web-extension/custom-slingshot-\*-context.xml file, taking the form of bean definitions.  

You can use any of the out-of-the-box evaluators as parents to template from. For example:

```

     
<bean id="evaluator.doclib.metadata.hasExposure"
      parent="evaluator.doclib.action.propertyNotNull">  
   <property name="property" value="exif:exposureTime"/>
</bean>


```

Client-side dependencies are specified in the share-config-custom.xml file using the `DocLibCustom` config section.

```


<config evaluator="string-compare" condition="DocLibCustom">   
   <dependencies>   
         <js src="/custom/exif.js" />   
   </dependencies> 
</config>
 
 
```

Extra status indicators are configured in the following way by using the share-config-custom.xml file.

```

      
<config evaluator="string-compare" condition="DocumentLibrary">
    <indicator id="my-custom"index="10">
        <evaluator>evaluator.doclib.indicator.myCustomEvaluator</evaluator>
        <labelParam index="0">{jsNode.properties.owner.displayName}</labelParam>
    </indicator>
</config>


```

Custom metadata templates are also specified in the share-config-custom.xml file, in the `DocumentLibrary` config section.

```

      
<config evaluator="string-compare" condition="DocumentLibrary">
<metadata-templates>
    <!-- Photos -->
    <template id="isPhoto">
       <evaluator>evaluator.doclib.metadata.hasExif</evaluator>
       <line index="10" id="date" view="detailed">{date}{size}</line>
       <line index="20" id="exposure" evaluator="evaluator.doclib.metadata.hasExposure">
         {exposure exif.label.exposure}
       </line>
       <line index="30" id="description" view="detailed">{description}</line>
       <line index="40" id="social" view="detailed">{social}</line>
   </template>
</metadata-templates></config>


```

New actions can be specified within the share-config-custom.xml file as follows.

```


<config evaluator="string-compare" condition="DocLibActions">
   <actions>
      <action id="document-preview-webasset" type="javascript"
              label="actions.wcmqs.preview-webasset">
           <param name="function">onActionPreviewWebAsset</param>
           <evaluator>wcmqs.evaluator.doclib.action.isPreviewable</evaluator>
      </action>
   </actions>
</config>


```

An action can be disabled across the whole application using the following configuration in a share-config-custom.xml file. For example the following config removes the "Upload New Version" action from users.

```

     
<config evaluator="string-compare" condition="DocLibActions">
   <actions>
      <action id="document-upload-new-version">
          <evaluator>evaluator.doclib.action.disableAction</evaluator>
      </action>
   </actions>
</config>


```

Add an evaluator, used on an out-of-the-box action:

```


<config evaluator="string-compare" condition="DocLibActions">
   <actions>
      <action id="document-publish">
          <evaluator negate="true">
             wcmqs.evaluator.doclib.action.isWebsiteContainerType
          </evaluator>
      </action>
   </actions>
</config>


```

**Parent topic:**[Extending the Alfresco Share Document Library](../concepts/Share-Doclib-Extend-Intro.md)

