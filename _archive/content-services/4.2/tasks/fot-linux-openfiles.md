---
author: [Alfresco Documentation, Alfresco Documentation]
source: wiki
audience: 
category: Administration
option: file limits Linux
---

# Setting file limits for Linux

When running Alfresco on Red Hat Linux, if you encounter a "Too many open files" error message, you must increase the file limits setting.

These steps assumes that Alfresco is running as the alfresco user.

1.  Edit the following file:

    /etc/security/limits.conf

2.  Add the following settings:

    ```
    alfresco soft nofile 4096
    alfresco hard nofile 65536
    ```

    This sets the normal number of file handles available to the alfresco user to be 4096. This is known as the soft limit.

3.  As the alfresco user, set a system-level setting for Linux, up to the hard limit, using the following command:

    `ulimit -n 8192`


**Parent topic:**[Frequently occurring tasks](../concepts/fot.md)

