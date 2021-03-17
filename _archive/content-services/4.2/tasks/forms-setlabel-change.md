---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: Forms
---

# Changing the default set label

Fields that do not specify a set belong to the implicit `default` set. They are rendered together, by default, but without any visual grouping.

1.  Open the <web-extension\>\\share-config-custom.xml file.

2.  Enter the configurations for the set label.

    The appearance of the default set can be controlled in the same way as other sets, for example, using an identifier of an empty string.

    ```
    <set id="" appearance="panel" />
    ```

    This will render a panel around all the fields with a label of **Default**.

    To specify a different label, add the `label` attribute. For example, the following label will be **General**.

    ```
    <set id="" appearance="panel" label="General" />
    ```

    You can also use a message bundle key.

    ```
    <set id="" appearance="panel" label-id="form.set.general" />
    ```

3.  Save the file.


**Parent topic:**[Forms](../concepts/forms-intro.md)

