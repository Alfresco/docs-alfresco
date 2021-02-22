---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: extended services content transformation
---

# Customizing content transformations

This task describes how to customize content transformations.

1.  Copy the following file:

    <configRoot\>/alfresco/content-services-context.xml

2.  Paste this file into the `<extension>` directory or in your preferred directory.

3.  Open the file. Transformers start below the comment:

    ```
    <!-- Content Transformations -->
    ```

4.  Locate the bean containing a transformer that is most similar to the transformer that you want to add. \(It is unlikely that you would want to *modify* an existing transformer.\)

5.  Delete every pair of `<bean> </bean>` tags except the pair containing the similar transformer.

6.  Rename and modify the bean.

7.  Save the file with a meaningful name.

    If you save the file in the `<extension>` directory, the filename must end with ‑context.xml.


**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

**Parent topic:**[Developing against the Alfresco repository](../reuse/gge-hdg-alfrescodevelopment.md)

