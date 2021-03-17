---
author: Alfresco Documentation
---

# Module dynamic configuration

This topic describes how to dynamically configure modules.

Alfresco Share uses the Surf configuration service extensively to control its behaviour. This is usually achieved through the files ending with the suffix “-config.xml” in the webapps/share/WEB-INF/classes/alfresco directory. With these configuration files changes made to these files will not be picked up until then next server restart. However, it is posble to change configuration of a Share Extensibility Module by changing the module configuration file, and redeploying the module.

The following example demonstrates a module that replaces the Document Library's Flash enablement configuration for any site with the URL `noflash`:

```

<extension>
   <modules>
      <module>
         <id>Site_Conditional_Flash</id>
         <description>Applies config based on site id</description>
         <evaluator type="site.module.evaluator">
            <params>
               <sites>noflash</sites>
               <sitePresets>.*</sitePresets>
            </params>
         </evaluator>
         **<configurations\>
            <config evaluator="string-compare" condition="DocumentLibrary" replace="true"\>
               <file-upload\>
                  <adobe-flash-enabled\>false</adobe-flash-enabled\>
                  <in-memory-limit\>262144000</in-memory-limit\>
                  <maximum-file-size-limit\>0</maximum-file-size-limit\>
               </file-upload\>
            </config\>
         </configurations\>**
      </module>
   </modules>
</extension>         
      
```

The original configuration can be found in webapps/share/WEB-INF/classes/alfresco/share-documentlibrary-config.xml:

```


﻿      <!--
         File upload configuration
      -->
      <file-upload>
         <!--
            Adobe Flash???
            In certain environments, an HTTP request originating from Flash cannot be authenticated using an existing session.
            See: http://bugs.adobe.com/jira/browse/FP-4830
            For these cases, it is useful to disable the Flash-based uploader for Share Document Libraries.
         -->
         <adobe-flash-enabled>true</adobe-flash-enabled>
         
         <!--
            In order to support drag-and-drop file upload a browser must be able to support the HTML5 drag-and-drop events, however
            if the browser does not support the FormData type (that allows streamed multipart file uploads) then all files need to be
            loaded into the browser's memory before being uploaded to the server. In order to prevent potential memory related errors,
            a limit is set for the sum of all file sizes being uploaded in a single operation (specified in bytes).
            As of April 2011, the only known browser that requires this restriction is Firefox 3.6.
          -->
         <in-memory-limit>262144000</in-memory-limit>
         <!--
            The maximum number of bytes per file that Share will allow to be uploaded.
            A value of 0 means that any size is allowed.
         -->
         <maximum-file-size-limit>0</maximum-file-size-limit>
      </file-upload>

         
      
```

**Attention:** Note that when **replacing** configuration \(with the `replace` attribute\), it is important to preserve any of the original configuration \(from the `-config.xml` file\) you want to retain. In this case the memory limit and upload file size have been retained.

If `replace` is not used, then the configurations are “added” sequentially. For example:

```

   
<adobe-flash-enabled>true</adobe-flash-enabled>
<in-memory-limit>262144000</in-memory-limit>
<maximum-file-size-limit>0</maximum-file-size-limit>
<adobe-flash-enabled>false</adobe-flash-enabled>
<in-memory-limit>262144000</in-memory-limit>
<maximum-file-size-limit>0</maximum-file-size-limit>

```

In this case the second <adobe-flash-enabled\> element would be ignored as only the **first** occurrence would be used.

**Parent topic:**[Share extensions](../concepts/dev-extensions-share.md)

