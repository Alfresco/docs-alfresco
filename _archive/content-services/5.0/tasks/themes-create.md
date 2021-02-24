---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
option: Share themes
---

# Creating a new theme

Additional themes can be defined by creating a new theme directory containing the necessary files, as well as the corresponding XML file, whose name must match that of the theme's directory.

1.  Make a new directory within the webapps/share/themes directory.

    **Note:** Do not include spaces in the directory name.

2.  Copy the contents of an existing theme directory to the new theme directory.

    For example, copy the `greenTheme` directory to a newTheme.

3.  Open the following files:

    1.  presentation.css

    2.  yui/assets/skin.css

4.  Search for `.yui-skin-greenTheme` and change the `greenTheme` name with `.yui-skin-newName` where `newName` is the name of your new theme directory.

5.  Save the files.

6.  Create a new XML file in the <configRootShare\>/classes/alfresco/site-data/themes directory. For example, copy the <configRootShare\>/classes/alfresco/site-data/themes/greenTheme.xml file to create a newTheme.xml file.

7.  Open the new XML file, change all instances of `greenTheme` to `newTheme`, and then save the file.


The new theme is then available in the list of themes on the Application tool.

**Parent topic:**[Share themes](../concepts/themes-intro.md)

