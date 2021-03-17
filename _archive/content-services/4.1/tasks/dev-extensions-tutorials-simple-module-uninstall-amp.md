---
author: Alfresco Documentation
---

# Uninstalling the AMP file

In this task you will learn how to uninstall your AMP file. The installed AMP can be uninstalled at any time using the MMT.

**Note:** The MMT is included in the Alfresco installers, and it is also available as a separate JAR file from the Alfresco Distribution zip \(alfresco-enterprise-4.1.10.zip\), in the zip's /bin directory. Place the /bin directory and its contents in the same location that is used by the Alfresco installer \(<installdir\>/bin\).

The syntax for uninstalling an AMP file using the MMT is:

```

java -jar bin/alfresco-mmt.jar ﻿uninstall <ModuleId> <WARFileLocation>
            
```

In this case the ModuleID is `﻿com_alfresco_tutorials_photo_search` and the WAR file location is tomcat/webapps/alfresco.

1.  Change into the root directory of your Alfresco installation.

2.  Check for the presence of the module you wish to delete by typing in the following command:

    ```
    
    ﻿ java -jar ./bin/alfresco-mmt.jar list tomcat/webapps/alfresco                        
                        
    ```

    This will display a list of installed modules. Make a note of the module ID of the module you wish to uninstall, in this case `﻿com_alfresco_tutorials_photo_search`.

3.  Now, to uninstall the module type the following command:

    ```
    
    java -jar ./bin/alfresco-mmt.jar uninstall com_alfresco_tutorials_photo_search tomcat/webapps/alfresco                       
                        
    ```

    You will see a list of files removed from the WAR.


You have now uninstalled your AMP file.

**Parent topic:**[Installing software required for Alfresco](../concepts/prereq-opt-install.md)

