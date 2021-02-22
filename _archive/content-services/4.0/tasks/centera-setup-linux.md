---
author: Alfresco Documentation
---

# Setting up the Centera environment on Linux

Create the environment on Linux for checking the Centera connection.

1.  Download and extract EMC Centera® SDK \(Centera\_SDK\_Linux-gcc3.3.tgz\), for example, to /opt.

    A subdirectory structure of the /opt/Centera\_SDK directory includes the following directories:

    ```
    total 20
    drwxr-xr-x.  4 root root 4096 Jan 10 21:32 docs
    drwxr-xr-x.  2 root root 4096 Jan 10 21:32 include
    drwxr-xr-x.  2 root root 4096 Aug 30  2012 install
    drwxr-xr-x.  2 root root 4096 Jan 10 21:32 lib
    drwxr-xr-x. 13 root root 4096 Sep 14  2006 sdk_samples
    ```

2.  Install the EMC Centera® SDK using the following commands:

    ```
    cd /opt/Centera_SDK/install
    ./install
    ```

    The default installation directory is /usr/local/Centera\_SDK.

3.  Download the Centera .pea file.

    For example, c2armtesting.pea.

4.  Move the c2armtesting.pea file to the Centera /usr/local/Centera\_SDK directory.

5.  Download and extract EMC Centera® SDK and Community Tools to any directory.


The structure of the /usr/local/Centera\_SDK directory is similar to the following example:

```
total 12
-rw-r--r--. 1 root root 2470 Dec 11 16:25 c2armtesting.pea
drwxr-xr-x. 2 root root 4096 Dec 19 22:51 include
drwxr-xr-x. 4 root root 4096 Dec 19 22:51 lib
```

The structure of the /usr/local/Centera\_SDK/lib/32 directory is similar to the following example:

```
total 6316
lrwxrwxrwx. 1 root root      52 Dec 19 22:51 libFPCore32.so -> /usr/local/Centera_SDK/lib/32/libFPCore32.so.3.3.719
-rwxr-xr-x. 1 root root 1063484 Dec 19 22:51 libFPCore32.so.3.3.719
lrwxrwxrwx. 1 root root      44 Dec 19 22:51 libFPCore.so -> /usr/local/Centera_SDK/lib/32/libFPCore32.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPLibrary32.so -> /usr/local/Centera_SDK/lib/32/libFPLibrary32.so.3.3.719
-rwxr-xr-x. 1 root root  643603 Dec 19 22:51 libFPLibrary32.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPLibrary.so -> /usr/local/Centera_SDK/lib/32/libFPLibrary32.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPParser32.so -> /usr/local/Centera_SDK/lib/32/libFPParser32.so.3.3.50
-rwxr-xr-x. 1 root root 3800245 Dec 19 22:51 libFPParser32.so.3.3.50
lrwxrwxrwx. 1 root root      46 Dec 19 22:51 libFPParser.so -> /usr/local/Centera_SDK/lib/32/libFPParser32.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPStreams32.so -> /usr/local/Centera_SDK/lib/32/libFPStreams32.so.3.3.719
-rwxr-xr-x. 1 root root  121784 Dec 19 22:51 libFPStreams32.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPStreams.so -> /usr/local/Centera_SDK/lib/32/libFPStreams32.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPUtils32.so -> /usr/local/Centera_SDK/lib/32/libFPUtils32.so.3.3.719
-rwxr-xr-x. 1 root root  648376 Dec 19 22:51 libFPUtils32.so.3.3.719
lrwxrwxrwx. 1 root root      45 Dec 19 22:51 libFPUtils.so -> /usr/local/Centera_SDK/lib/32/libFPUtils32.so
lrwxrwxrwx. 1 root root      51 Dec 19 22:51 libFPXML32.so -> /usr/local/Centera_SDK/lib/32/libFPXML32.so.3.3.719
-rwxr-xr-x. 1 root root  129647 Dec 19 22:51 libFPXML32.so.3.3.719
lrwxrwxrwx. 1 root root      43 Dec 19 22:51 libFPXML.so -> /usr/local/Centera_SDK/lib/32/libFPXML32.so
lrwxrwxrwx. 1 root root      56 Dec 19 22:51 libPAI_module32.so -> /usr/local/Centera_SDK/lib/32/libPAI_module32.so.3.3.100
-rwxr-xr-x. 1 root root   49036 Dec 19 22:51 libPAI_module32.so.3.3.100
lrwxrwxrwx. 1 root root      48 Dec 19 22:51 libPAI_module.so -> /usr/local/Centera_SDK/lib/32/libPAI_module32.so
```

The structure of the /usr/local/Centera\_SDK/lib/64 directory is similar to the following example:

```
total 6736
lrwxrwxrwx. 1 root root      52 Dec 19 22:51 libFPCore64.so -> /usr/local/Centera_SDK/lib/64/libFPCore64.so.3.3.719
-rwxr-xr-x. 1 root root 1098829 Dec 19 22:51 libFPCore64.so.3.3.719
lrwxrwxrwx. 1 root root      44 Dec 19 22:51 libFPCore.so -> /usr/local/Centera_SDK/lib/64/libFPCore64.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPLibrary64.so -> /usr/local/Centera_SDK/lib/64/libFPLibrary64.so.3.3.719
-rwxr-xr-x. 1 root root  671881 Dec 19 22:51 libFPLibrary64.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPLibrary.so -> /usr/local/Centera_SDK/lib/64/libFPLibrary64.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPParser64.so -> /usr/local/Centera_SDK/lib/64/libFPParser64.so.3.3.50
-rwxr-xr-x. 1 root root 4061679 Dec 19 22:51 libFPParser64.so.3.3.50
lrwxrwxrwx. 1 root root      46 Dec 19 22:51 libFPParser.so -> /usr/local/Centera_SDK/lib/64/libFPParser64.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPStreams64.so -> /usr/local/Centera_SDK/lib/64/libFPStreams64.so.3.3.719
-rwxr-xr-x. 1 root root  134962 Dec 19 22:51 libFPStreams64.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPStreams.so -> /usr/local/Centera_SDK/lib/64/libFPStreams64.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPUtils64.so -> /usr/local/Centera_SDK/lib/64/libFPUtils64.so.3.3.719
-rwxr-xr-x. 1 root root  713762 Dec 19 22:51 libFPUtils64.so.3.3.719
lrwxrwxrwx. 1 root root      45 Dec 19 22:51 libFPUtils.so -> /usr/local/Centera_SDK/lib/64/libFPUtils64.so
lrwxrwxrwx. 1 root root      51 Dec 19 22:51 libFPXML64.so -> /usr/local/Centera_SDK/lib/64/libFPXML64.so.3.3.719
-rwxr-xr-x. 1 root root  151395 Dec 19 22:51 libFPXML64.so.3.3.719
lrwxrwxrwx. 1 root root      43 Dec 19 22:51 libFPXML.so -> /usr/local/Centera_SDK/lib/64/libFPXML64.so
lrwxrwxrwx. 1 root root      56 Dec 19 22:51 libPAI_module64.so -> /usr/local/Centera_SDK/lib/64/libPAI_module64.so.3.3.100
-rwxr-xr-x. 1 root root   52961 Dec 19 22:51 libPAI_module64.so.3.3.100
lrwxrwxrwx. 1 root root      48 Dec 19 22:51 libPAI_module.so -> /usr/local/Centera_SDK/lib/64/libPAI_module64.so
```

**Parent topic:**[Installing and configuring Centera Connector](../concepts/centera-intro.md)

