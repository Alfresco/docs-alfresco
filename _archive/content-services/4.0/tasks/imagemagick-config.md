---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [ImageMagick, tranformations]
---

# Installing ImageMagick

To enable image manipulation in Alfresco, you must install and configure ImageMagick. Alfresco uses ImageMagick to manipulate images for previewing.

1.  Verify that ImageMagick, Ghostscript, and Ghostscript fonts are already installed on your system.

    Use the ImageMagick convert command to check that you have the right software installed on your machine. This command is usually located in /usr/bin.

    `install Image`

2.  If ImageMagick and Ghostscript software is not available on your system, download and install the appropriate package for your platform.

    To download ImageMagick, browse to [ImageMagick download website](http://www.imagemagick.org/script/download.php).

    To download Ghostscript, browse to [Ghostscript download website](http://www.ghostscript.com/download/).

3.  Browse to the <classpathRoot\> directory. See [System paths](../reuse/conv-syspaths.md) for more information.

4.  Open the alfresco-global.properties file.

5.  Modify the ImageMagick properties to point to the ImageMagick root directory.

    |Property|Description|
    |--------|-----------|
    |`img.root`|On Windows, set this property to img.root=/ImageMagick.On Linux, set this property to img.root=/ImageMagick.

**Note:** Do not include a slash \(`/`\) at the end of the path. For example, /ImageMagick/

|
    |`img.exe`|On Windows, set this property to img.exe=/\{img.root\}/convert.exe.On Linux, set this property to img.exe=/ImageMagick/bin/convert.exe.

|

    **Note:** Test that you are able to convert a PDF using the command `convert filename.pdf[0] filename.png`.


**Parent topic:**[Installing software required for Alfresco](../concepts/prereq-opt-install.md)

