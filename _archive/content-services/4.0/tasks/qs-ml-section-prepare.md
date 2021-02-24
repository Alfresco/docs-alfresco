---
author: [Alfresco Documentation, you Alfresco Documentation]
audience: 
option: 
---

# Preparing a section for translation

To create separate editions of your website for different locales, you begin by making the top-level section translatable. Once you set the locale for the existing content you can create sections to hold the translated content.

In the Government sample site you see the section **en** directly beneath the **root** section. This is intended as the starting point for creating translations of your website. When working from a translatable section, Alfresco automatically reproduces the correct website structure as you go.

This task assumes you are in the Document Library page component of the Quick Start site \(Government sample site\) and that the **Show Folders** feature is enabled.

1.  Navigate to **Alfresco Quick Start \> Quick Start Editorial \> root**.

2.  Locate the section **en** and click **Manage Translations** in the associated action list.

    The Manage Translations page opens. A message on this page indicates that the section has not yet been enabled for translations.

3.  Click **Mark this as the English translation** in the Action column.

    This sets the locale of the entire section to English. You can now create a new section to hold your translated content.

4.  In the Action column click **Create** for the language to which you want to translate the content.

    The Create Content page appears.

5.  Type a name for this section.

    As an example, when creating a German translation you might name it de.

    The Name field does not support the following special characters: \* " < \> \\ / . ? : and \|. When the name contains a disallowed character, the **Create** button is disabled.

    **Note:** There is an exception regarding the period: the content name can include a period as long as it is not the last character. This allows you to add an extension \(for example, .txt, .html, or .xml\).Provide a title and description.

6.  Click **Create**.

    The details page for the new section is displayed.

7.  Click **Manage Translations** on this page to display the translation information. The table shows that the original section \(**en**\) and the new section are related to each other as translations.

    In the breadcrumb path click the section you just created. The root section in the library tree now displays two language branches. As with all new sections, an **index.html** file and **collections** folder were created automatically.


**Parent topic:**[Creating multi-lingual websites](../concepts/qs-ml-intro.md)

