---
author: Alfresco Documentation
---

# Setting MAVEN\_OPTS

Before using the Maven Alfresco SDK, you need to set your `MAVEN_OPTS` environment variable to a suitable value using the correct mechanism for your system.

Setting the `MAVEN_OPTS` environment variable ensures that adequate memory is available to run Alfresco and your applications built with the Maven Alfresco SDK.

1.  On Mac OS X you can edit your .bash\_profile file and add the following:

    ```
    export MAVEN_OPTS="-Xms1024m -Xmx4096m -XX:PermSize=1024m"
    ```

    Restart the terminal session or run `source .bash_profile` to activate the environment variable.

2.  On Linux you can edit your .bashrc file and add the following:

    ```
    export MAVEN_OPTS="-Xms1024m -Xmx4096m -XX:PermSize=1024m"
    ```

    Restart the terminal session or run `source .bashrc` to activate the environment variable.

3.  On Windows, the exact procedure for setting environment variables varies depending on the version of Windows you are running. For example, the procedure for Windows XP can be found in the [Microsoft Knowledgebase](http://support.microsoft.com/kb/310519).


Your `MAVEN_OPTS` environment variable is now set. Feel free to increase the specified values if required, for example, if you get "out of memory" errors when running your projects.

**Parent topic:**[Maven Alfresco SDK](../concepts/dev-extensions-maven-sdk-intro.md)

