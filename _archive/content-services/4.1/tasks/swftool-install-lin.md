---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [SWF Linux, Extensions/Third Party Tools]
---

# Installing SWF Tools on Linux

This section describes the steps used to install the SWF Tools. Alfresco Share uses the features provided in the development snapshots of the tools. For Linux, there is no binary version, so you need to compile a development snapshot.

\(Linux\) Before you compile, ensure that the following packages are installed on your machine:

-   zlib-devel
-   libjpeg-devel
-   giflib-devel
-   freetype-devel
-   gcc
-   gcc-c++

You can download and install all of these packages using the following command:

```
yum install zlib-devel libjpeg-devel giflib-devel freetype-devel gcc gcc-c++
```

1.  Browse to the SWF Tools website.

2.  Download the latest version of the SWF Tools for your platform. The Unix version is designated with the suffix .tar.gz.

    **Note:** Download a version post 0.8.1 from 2007-02-28 because it does not support some functionalities Alfresco needs to render the preview. The following version has been tested and verified by Alfresco as being fully functional: http://www.swftools.org/swftools-2008-10-08-0802.tar.gz\(you may have to copy this URL and paste it into a download manager\).

3.  Unpack the tar.gz file.

    The install file contains detailed instructions on how to compile and install the SWF Tools.

4.  Change to the directory containing the source code.

5.  Type the following command to configure the package for your system:

    ./configure

    If you see a message on Red Hat Linux that states your operating system is unknown, then use the following setting: `./configure–build=x86_64-pc-linux-gnu`

    If you have an issue on Solaris with the lame libs, you can disable the making of portions of SWF Tools that use lame by using the following setting: `./configure -disable-lame`

6.  Type the following command to compile the package:

    make

    Optionally, you can run the make check command to run any self-tests that come with the package.

7.  Type the following command to install the programs, data files, and documentation:

    make install

    By default, the files are installed to the /usr/local/bin directory.

8.  Modify the `swf.exe=` property in the alfreso-global.properties file to point to the SWF Tools root directory, for example: `swf.exe=/usr/bin/pdf2swf`

    **Note:** Ensure that you do not include a slash \(`/`\) at the end of the path. For example, `/usr/bin/`


The SWF Tools are installed. For the most up-to-date instructions on installing the SWF Tools, refer to the SWF Tools website.

**Parent topic:**[Installing SWF Tools](../concepts/swftool-intro.md)

