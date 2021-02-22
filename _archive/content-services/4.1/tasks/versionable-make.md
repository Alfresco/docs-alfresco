---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Document Management, Versioning]
option: extended services versions content
---

# Making all content versionable

This section describes enabling versioning for all content in the repository.

1.  Open the data dictionary <configRoot\>\\alfresco\\model\\contentModel.xml.

2.  Search for the `<type>`: `<type name="cm:content">`

3.  Immediately after the closing `</properties>` tag, insert the following lines:

    ```
    <type name="cm:content">
       <properties>
       ...
       </properties>
       <mandatory-aspects>
          <aspect>cm:versionable</aspect>
       </mandatory-aspects>
    </type> 
    ```

4.  Save the file.

5.  Restart the Alfresco server.


**Parent topic:**[About versioning](../concepts/versioning.md)

**Related information**  


[Versioning service](../concepts/serv-version-about.md)

