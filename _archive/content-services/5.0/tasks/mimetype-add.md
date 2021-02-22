---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Adding a MIME type

Use this information to add a MIME type definition.

The MIME type default definitions are in the [mimetype-map.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/mimetype/mimetype-map.xml) file.

1.  Copy the default definition file and place it in a file called <extension\>/mimetype/mimetypes-extension-map.xml.

2.  Modify the inserted MIME type to match your requirements. For example:

    ```
    
    ﻿<alfresco-config area="mimetype-map">
    
       <config evaluator="string-compare" condition="Mimetype Map">
          <mimetypes>
    
             <mimetype mimetype="application/xxx" display="My Example Mimetype">
                <extension>ex</extension>
             </mimetype>
    
          </mimetypes>
       </config>
    
    </alfresco-config>          
            
    ```

    An example file is provided in <extension\>/mimetype/mimetypes-extension-map.xml.sample. You can include multiple files and each one is loaded automatically.

3.  Save the file.

4.  Restart Alfresco.


The MIME type is available in the repository.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

