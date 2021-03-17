---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
option: knowledge base
---

# Wizards and icons

Alfresco Explorer features a number of configurable wizards to which you can plug in your Knowledge Base assets.

1.  Inform Alfresco Explorer to let you create spaces of type `kb:space`.

    For example:

    ```
    <config evaluator="string-compare" condition="Space Wizards">
       <folder-types>
        <type name="kb:space" icon="/images/icons/space-icon-pen.gif" />
       </folder-types>
    </config>
    ```

2.  Include the `kb:article` aspect as one of the available options in the Action wizard.

    For example:

    ```
    <config evaluator="string-compare" condition="Action Wizard">
       <aspects>
          <aspect name="kb:article"/>
       </aspects>
    </config>
    ```

3.  Adjust how Knowledge Base spaces appear in the Alfresco Explorer navigator by setting up a custom icon for the `kb:space` content type.

    For example:

    ```
    <config evaluator="string-compare" condition="kb:space icons">
       <icons>
          <icon name="space-icon-pen" path="/images/icons/space-icon-pen.gif" />
       </icons>
    </config>
    ```

    This displays your `kb:space` spaces with a different icon \(a folder superimposed with a pen\) to help users find the Knowledge Base space. You could also make additional customizations to the Alfresco Explorer configuration file.


**Parent topic:**[Configuring Alfresco Explorer extensions](../concepts/kb-explorer-ext.md)

