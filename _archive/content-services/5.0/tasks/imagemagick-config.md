---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [ImageMagick, tranformations]
---

# Installing ImageMagick

To enable image manipulation in Alfresco, you must install and configure ImageMagick. Alfresco uses ImageMagick to manipulate images for previewing.

1.  Verify that ImageMagick, Ghostscript, and Ghostscript fonts are already installed on your system.

    Use the ImageMagick convert command to check that you have the right software installed on your machine. This command is usually located in /usr/bin: `install Image`.

2.  If the ImageMagick and Ghostscript software is not available on your system, download and install the appropriate package for your platform.

    To download ImageMagick, browse to [ImageMagick download website](http://www.imagemagick.org/script/download.php).

    To download Ghostscript, browse to [Ghostscript download website](http://www.ghostscript.com/download/).

    **Note:** In next steps you will make changes to the Alfresco application configuration files to enable the manually installed ImageMagick application. These steps can only be performed after Alfresco has been installed.

3.  Browse to the <classpathRoot\> directory. See [System paths](../reuse/conv-syspaths.md) for more information.

4.  Open the alfresco-global.properties file.

5.  Modify the ImageMagick properties to point to the ImageMagick root directory:

    |Property|Description|
    |--------|-----------|
    |`img.root`|On Windows, set this property to img.root=C:\\\\ImageMagickOn Linux, set this property to img.root=/ImageMagick

**Note:** Do not include a slash \(`/`\) at the end of the path. For example, /ImageMagick/

|
    |`img.dyn`|On Windows, set this property to img.dyn=$\{img.root\}\\\\libOn Linux, set this property to img.dyn=$\{img.root\}/lib

|
    |`img.exe`|On Windows, set this property to img.exe=$\{img.root\}\\\\convert.exeOn Linux, set this property to img.exe=$\{img.root\}/bin/convert

|
    |`img.coders`|On Windows, set this property to img.coders=$\{img.root\}\\\\modules\\\\codersOn Linux, set this property to img.coders=$\{img.root\}/modules/coders

|
    |`img.config`|On Windows, set this property to img.config=$\{img.root\}\\\\config On Linux, set this property to img.config=$\{img.root\}/config

|

    **Note:** Test that you are able to convert a PDF using the command `convert filename.pdf[0] filename.png`.


**Parent topic:**[Installing additional software for Alfresco](../concepts/prereq-opt-install.md)

