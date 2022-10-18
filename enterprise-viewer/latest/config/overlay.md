---
title: Creating an Alfresco Enterprise Viewer Overlay
---

For custom OpenAnnotate functionality, it is important to create an overlay. An overlay may be created for machine, environment or client specific functionality. The overlay structure is broken into two main parts: custom properties and custom files.

### Custom Properties

Any overrides of the properties found in `defaults.properties` should be placed in your overlay (for more details of the available properties, see [OA Configuration Files](https://github.com/tsgrp/OpenAnnotate/wiki/OA-Configuration-Files)). To override properties, use the following steps:

1. Create a `WEB-INF/classes` directory structure inside your overlay.
1. Add an `override-placeholders.properties` file to the newly created `WEB-INF/classes` directory.

Any properties listed in the `override-placeholders.properties` file will override those found in `defaults.properties`. For example, if I wanted to specify a new logo to use for my instance of OpenAnnotate, I would need to override the `oaLogoPath` property. I would add the following line to my `override-placeholders.properties` file to accomplish this:

    oaLogoPath=images/myNewLogo.jpg

### Custom Files

Using an overlay, you are also able to add/override any core OpenAnnotate files. To add/override a file, simply mirror the structure found in the `src/main/webapp` directory and add your file as appropriate.

Using our new logo example from above, now that I've specified the path to my new logo, I have to also add the `myNewLogo.jpg` file. I would do the following steps to accomplish this:

1. Add an `images` folder to my overlay.
1. Place the `myNewLogo.jpg` file in the newly created `images` folder.

When I then build OA, the `myNewLogo.jpg` file will get added to the `images` directory in the OA war. If there already existed a `myNewLogo.jpg` file, the file in my overlay would override the existing one.
