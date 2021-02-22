---
author: Alfresco Documentation
---

# Setting up the Centera environment on Windows

Create the environment on Windows for checking the Centera connection.

1.  Download and install the Microsoft Visual C++ 2005 Service Pack 1 Redistributable Package.

2.  Download and extract EMC Centera® SDK to a suitable directory, for example, C:\\centera.

    -   Centera\_SDK\_Windows\_2000-5.0-Win32Dev8.zip for 32-bit systems
    -   Centera\_SDK\_Windows\_2000-5.0-Win64Dev8.zip for 64-bit systems
    On 32-bit systems, the subdirectory structure of the C:\\centera directory includes the following directories:

    ```
    docs
    include
    lib
    lib32
    sdk_samples
    ```

    On 64-bit systems, the subdirectory structure of the C:\\centera directory includes the following directories:

    ```
    docs
    include
    lib
    lib64
    sdk_samples
    ```

3.  Download the Centera .pea file.

    For example, c2armtesting.pea.

4.  Move the c2armtesting.pea file to the Centera C:\\centera directory.

5.  Download and extract EMC Centera® SDK and Community Tools to any directory.


The structure of the C:\\centera directory is similar to the following example \(for 32-bit systems\):

```
10.01.2014  17:55    <DIR>          .
10.01.2014  17:55    <DIR>          ..
11.12.2013  16:25             2 470 c2armtesting.pea
10.01.2014  17:41    <DIR>          docs
10.01.2014  17:41    <DIR>          include
10.01.2014  17:41    <DIR>          lib
10.01.2014  17:41    <DIR>          lib32
10.01.2014  17:41    <DIR>          sdk_samples
               1 File(s)          2 470 bytes
               7 Dir(s)  49 088 593 920 bytes free
```

The structure of the C:\\centera directory is similar to the following example \(for 64-bit systems\):

```
10.01.2014  17:55    <DIR>          .
10.01.2014  17:55    <DIR>          ..
11.12.2013  16:25             2 470 c2armtesting.pea
10.01.2014  17:37    <DIR>          docs
10.01.2014  17:37    <DIR>          include
10.01.2014  17:37    <DIR>          lib
10.01.2014  17:37    <DIR>          lib64
10.01.2014  17:37    <DIR>          sdk_samples
               1 File(s)          2 470 bytes
               7 Dir(s)  49 088 593 920 bytes free
```

The structure of the C:\\centera\\lib32 directory is similar to the following example:

```
10.01.2014  17:41    <DIR>          .
10.01.2014  17:41    <DIR>          ..
29.08.2012  17:33           774 144 FPCore.dll
29.08.2012  17:33           610 304 FPLibrary.dll
29.08.2012  17:33           610 948 FPLibrary.lib
29.08.2012  17:33           323 584 fpos32.dll
29.08.2012  17:33         2 011 136 fpparser.dll
29.08.2012  17:33           184 320 FPStreams.dll
29.08.2012  17:33           438 272 FPUtils.dll
29.08.2012  17:33           184 320 FPXML.dll
10.01.2014  17:41    <DIR>          lib
29.08.2012  17:33           262 144 pai_module.dll
               9 File(s)      5 399 172 bytes
               3 Dir(s)  49 088 593 920 bytes free
```

The structure of the C:\\centera\\lib64 directory is similar to the following example:

```
10.01.2014  17:37    <DIR>          .
10.01.2014  17:37    <DIR>          ..
29.08.2012  17:34           983 552 FPCore.dll
29.08.2012  17:34           690 688 FPLibrary.dll
29.08.2012  17:34           616 178 FPLibrary.lib
29.08.2012  17:34           412 160 fpos64.dll
29.08.2012  17:34         2 919 424 fpparser.dll
29.08.2012  17:34           165 888 FPStreams.dll
29.08.2012  17:34           483 840 FPUtils.dll
29.08.2012  17:34           168 960 FPXML.dll
10.01.2014  17:37    <DIR>          lib
29.08.2012  17:34            63 488 pai_module.dll
               9 File(s)      6 504 178 bytes
               3 Dir(s)  49 088 593 920 bytes free
```

**Parent topic:**[Installing and configuring Centera Connector](../concepts/centera-intro.md)

