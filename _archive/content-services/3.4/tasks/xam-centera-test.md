---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [XAM Connector module, Extensions/Third Party]
keyword: [XAM, Connector, Centera]
---

# Setting up the Centera test environment

These steps describe how to set up the test environment for Centera to integrate with the Alfresco XAM Connector module.

1.  Download and extract Centera VIM and XAM into one of the following appropriate directories:

    -   \(Linux\) /opt/Centera
    -   \(Windows\) C:\\prog\\centera
    Create a subdirectory structure of the Centera directory to include the following directories:

    ```
    docs
    include
    lib
    lib32
    lib64
    ```

    The following files are also included:

    ```
    Centera_SDK_XAM_VIM_ReferenceGuide.pdf
    Centera_SDK_XAM_Windows_ReleaseNotes.pdf
    ReadMe.txt
    us2_armTest1.pea
    XAM_Arch.pdf
    XAM_C_API.pdf
    XAM_Java_API.pdf
    ```

2.  Move the libraries to the relevant /lib directory for your system.

    -   Choose /lib32 for 32-bit systems
    -   Choose /lib64 for 64-bit systems
3.  Download the Centera us2\_armTest1.pea file.

4.  Move the us2\_armTest1.pea file to the /opt/Centera or C:\\prog\\centera directory.

5.  Download and unzip the XAM tools to any location.


The structure of the directory will be similar to the following example \(for Windows\):

```
13/12/2010  16:03    <DIR>          .
13/12/2010  16:03    <DIR>          ..
09/12/2009  12:44         1,095,932 Centera_SDK_XAM_VIM_ReferenceGuide.pdf
09/12/2009  12:44           350,372 Centera_SDK_XAM_Windows_ReleaseNotes.pdf
13/12/2010  15:54    <DIR>          docs
13/12/2010  15:56    <DIR>          include
13/12/2010  15:56    <DIR>          lib
13/12/2010  15:56    <DIR>          lib32
13/12/2010  15:56    <DIR>          lib64
09/12/2009  12:44             2,344 ReadMe.txt
11/10/2010  12:20               294 us2_armTest1.pea
09/12/2009  12:44         1,402,087 XAM_Arch.pdf
09/12/2009  12:44         1,419,797 XAM_C_API.pdf
09/12/2009  12:44           881,682 XAM_Java_API.pdf
               7 File(s)      5,152,508 bytes
               7 Dir(s)  91,181,363,200 bytes free
```

The structure of the C:\\progs\\centera\\lib32 directory is similar to the following example:

```
13/12/2010  15:56    <DIR>          .
13/12/2010  15:56    <DIR>          ..
09/12/2009  12:44           839,680 centera_vim.dll
09/12/2009  12:44           831,488 FPCore.dll
09/12/2009  12:44           450,560 fpos32.dll
09/12/2009  12:44         2,011,136 fpparser.dll
09/12/2009  12:44           184,320 FPStreams.dll
09/12/2009  12:44           438,272 FPUtils.dll
09/12/2009  12:44           192,512 FPXML.dll
09/12/2009  12:44           262,144 pai_module.dll
09/12/2009  12:44           401,408 xam.dll
09/12/2009  12:44            64,114 xam.lib
09/12/2009  12:44            53,248 xam_toolkit.dll
09/12/2009  12:44             2,844 xam_toolkit.lib
              12 File(s)      5,731,726 bytes
               2 Dir(s)  91,162,980,352 bytes free
```

The structure of the C:\\progs\\centera\\lib64 directory is similar to the following example:

```
13/12/2010  15:56    <DIR>          .
13/12/2010  15:56    <DIR>          ..
09/12/2009  12:44           940,032 centera_vim.dll
09/12/2009  12:44         1,149,952 FPCore.dll
09/12/2009  12:44           634,368 fpos64.dll
09/12/2009  12:44         2,959,872 fpparser.dll
09/12/2009  12:44           239,616 FPStreams.dll
09/12/2009  12:44           565,760 FPUtils.dll
09/12/2009  12:44           244,224 FPXML.dll
09/12/2009  12:44           439,296 pai_module.dll
09/12/2009  12:44           390,656 xam.dll
09/12/2009  12:44            61,690 xam.lib
09/12/2009  12:44            11,776 xam_toolkit.dll
09/12/2009  12:44             2,826 xam_toolkit.lib
              12 File(s)      7,640,068 bytes
               2 Dir(s)  91,150,495,744 bytes free
```

**Parent topic:**[Installing and configuring Alfresco XAM Connector](../concepts/xam-intro.md)

