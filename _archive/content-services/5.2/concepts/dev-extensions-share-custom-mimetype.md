---
author: Alfresco Documentation
---

# Adding Custom MIME types

You can add custom MIME types to Share.

When you edit the properties of a document, it is possible to select a MIME types from a drop-down list. You can add custom MIME types to this list.

Custom MIME types are added to a configuration file. An example file is provided - ./tomcat/shared/classes/alfresco/extension/mimetype/mimetypes-extension-map.xml.sample. You can rename this file to ./tomcat/shared/classes/alfresco/extension/mimetype/mimetypes-extension-map.xml. It will be processed when Alfresco Content Services is restarted.

The content of the example file is as follows:

```

         
<alfresco-config area="mimetype-map">
   
   <config evaluator="string-compare" condition="Mimetype Map">
      <mimetypes>

         <mimetype mimetype="application/XXX" display="Example mimetype">
            <extension>ex</extension>
         </mimetype>

      </mimetypes>
   </config>
   
</alfresco-config>         
         
      
```

You can add custom MIME types as required to this file, or create your own configuration file located on the classpath.

**Parent topic:**[Configuring Alfresco Share](../concepts/share-configuring-intro.md)

