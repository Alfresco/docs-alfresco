---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: Web Editor AWE
---

# Configuring the tag library

This section describes the tag library configuration.

The tag library comprises the following tags:

-   `startTemplate`
-   `markContent`
-   `endTemplate`

1.  The `startTemplate` tag bootstraps the WEF using a script element that executes a web script. Place this tag in the `head` section of your page.

    The `startTemplate` tag has only one optional attribute.

    -   **toolbarLocation**

        Controls the initial location of the tool bar. The valid values are: `top`, `left`, and `right`. The default is `top`.

    The following shows an example of how to use the `startTemplate` tag:

    ```
    <awe:startTemplate toolbarLocation="top" />
    ```

2.  Use the `markContent` tag to indicate an editable area of the page.

    The tag renders an edit icon that, when clicked, displays a form for editing the corresponding Alfresco content and properties, or both.

    The `markContent` tag has two mandatory attributes and two optional attributes.

    -   **id**

        The mandatory identifier attribute specifies the NodeRef of the Alfresco node to be edited.

    -   **title**

        The mandatory title attribute defines a descriptive title for the editable area being marked. The title used is used in the quick edit drop down menu of editable items, as the title of the form edit popup/dialog and the alt text and tool tip text of the edit icon.

    -   **formId**

        This is an optional attribute that specifies which form will be used when the marked area is edited.

    -   **nestedMarker**

        This is an optional attribute, which defines whether the editable area is nested within another HTML tag that represents the content being edited. If it is set to true, the whole parent element is highlighted when the area is selected in the quick edit drop down menu. If set to "false" only the edit icon is highlighted.

    An example use of the markContent tag is shown below.

    ```
    <awe:markContent id="<%=subTextNodeRef%>" formId="description" title="Edit Description" nestedMarker="true" />
    ```

3.  The `endTemplate` tag initializes the Web Editor with details of all the marked content areas on the page. It also renders a script element that executes the WEF resources web script, which starts the process of downloading all the assets required to render and display the tool bar and all configured plugins. Place this tag just before the closing body element.

    The `endTemplate` tag does not have any attributes.

    The following shows an example of how to use the `endTemplate` tag:

    ```
    <awe:endTemplate />
    ```


**Parent topic:**[Configuring Alfresco Web Editor](../concepts/awe-config.md)

