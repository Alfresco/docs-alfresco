---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: Share themes
---

# Creating a new theme

Additional themes may be defined by creating a new theme directory containing the necessary files, as well as the corresponding XML file, whose name must match that of the theme's directory.

1.  Make a new directory within the /themes directory.

    **Note:** Do not include spaces in the directory name.

2.  Copy the contents of an existing theme directory to the new theme directory.

    For example, copy the `greenTheme` directory.

3.  Open the following files:

    1.  base.css

    2.  ie6.css

    3.  ie7.css

    4.  presentation.css

    5.  yui/assets/skin.css

4.  Specify the new theme by searching for `.yui-skin-greenTheme` and replacing with `.yui-skin-XXX` where `XXX` is the name of the new theme directory.

5.  Save the files.


The new theme is then available in the list of themes on the Application tool.

**Parent topic:**[Share themes](../concepts/themes-intro.md)

