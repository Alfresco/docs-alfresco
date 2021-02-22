---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [ImageMagick, tranformations]
---

# Installing ImageMagick

To enable image manipulation in Alfresco Content Services, you must install and configure ImageMagick. Alfresco Content Services uses ImageMagick to manipulate images for previewing.

1.  Verify that ImageMagick is already installed on your system.

    Use the ImageMagick convert command to check that you have the right software installed on your machine. This command is usually located in /usr/bin: `install Image`.

2.  If the ImageMagick software is not available on your system, download and install the appropriate package for your platform.

    To download ImageMagick, browse to [ImageMagick download website](http://www.imagemagick.org/script/download.php).

    **Note:** In next steps you will make changes to the Alfresco Content Services application configuration files to enable the manually installed ImageMagick application. These steps can only be performed after Alfresco Content Services has been installed.

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


**Parent topic:**[Installing additional software for Alfresco Content Services](../concepts/prereq-opt-install.md)

