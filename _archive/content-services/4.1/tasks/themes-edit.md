---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: Share themes
---

# Editing a theme

A theme consists of some CSS files, an image directory, and a directory for assets for YUI. To create a new look, change the presentation.css file and, if required, replace or add images to the /images directory.

1.  Open the presentation.css file.

2.  Locate the properties at the end of the presentation.css file.

3.  Edit the following four properties:

    1.  `color`

    2.  `background`

    3.  `background-color`

    4.  `border`

    Any change to these properties will change the theme.

    ```
    / Theme colors /
    .theme-color-1,
    a.theme-color-1,
    a.theme-color-1:visited,
    a.theme-color-1:hover
    {
       color: #6CA5CE;
    }
    
    .theme-color-2,
    a.theme-color-2,
    a.theme-color-2:visited,
    a.theme-color-2:hover
    {
       color: #038603;
    }
    
    .theme-color-3,
    a.theme-color-3,
    a.theme-color-3:visited,
    a.theme-color-3:hover
    {
       color: #C7DBEB;
    }
    
    .theme-color-4,
    a.theme-color-4,
    a.theme-color-4:visited,
    a.theme-color-4:hover
    {
       color: #0D3B57;
    }
    
    / Theme background colors /
     .theme-bg-color-1,
    div.theme-bg-color-1
    {
       background-color: #6CA5CE;
    }
    
     .theme-bg-color-2,
    div.theme-bg-color-2
    {
       background-color: #fffbdd;
    }
    
     .theme-bg-color-3,
    div.theme-bg-color-3
    {
       background-color: #DEE8ED;
    }
    
     .theme-bg-color-4,
    div.theme-bg-color-4
    {
       background-color: #EBEFF1;
    }
    
    .theme-bg-color-5,
    div.theme-bg-color-5
    {
       background-color: #2B6EB5;
    }
    
     .theme-bg-1
    {
       / background-image: url(images/navbar-bg.png); /
    }
    
     .theme-bg-2
    {
       / background-image: url(images/navbar-bg-2.png); /
    }
    
     / Theme border type/colors /
     .theme-border-1
    {
       border-color: #457f63;
       border-style: dotted;
    }
    
     .theme-border-2
    {
       border-color: #2B6EB5;
    }
    ```

4.  Locate the `YUI Theme Changes` section.

    This section allows changes to the YUI components.

5.  Edit the properties in this section to change the theme.


**Parent topic:**[Share themes](../concepts/themes-intro.md)

