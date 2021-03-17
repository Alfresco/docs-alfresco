---
author: Alfresco Documentation
---

# Adding a MIME type

This section describes how to add a MIME type definition.

There are two files that contain MIME type default definitions:

-   <configRoot\>/classes/mimetype/mimetype-map.xml
-   <configRoot\>/classes/mimetype/mimetype-map-openoffice.xml

Do not edit these files directly. Instead, override the `mimetypeConfigService` bean in an extension file.

1.  Open the <classpathRoot\>/alfresco/extension/mimetype/mimetypes-extension-map.xml.sample file.

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

3.  Save the file without the .sample extension.

4.  Edit the file ﻿./tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/form/controls/mimetype.ftl. Add details for your mimetype:

    ```
    
          
    ...
    ﻿<@mimetypeOption mt="image/x-xwindowdump" />
    <@mimetypeOption mt="application/x-compress" />
    <@mimetypeOption mt="application/zip" />
    <@mimetypeOption mt="application/xxx" />
    ...
    ﻿   <#elseif mt=="image/x-xwindowdump">
          <#return "XWindow Dump">
       <#elseif mt=="application/x-compress">
          <#return "Z Compress">
       <#elseif mt=="application/xxx">
          <#return "My Example Mimetype">
    
        
    ```

5.  Restart Alfresco.


To see additional information on this configuration, and web client configuration, please refer to the [Adding a mimetype article](https://wiki.alfresco.com/wiki/Adding_a_Mime_Type) in the Wiki.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

