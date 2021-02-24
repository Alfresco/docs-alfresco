---
author: Alfresco Documentation
---

# Setting JAVA\_HOME

Before using the Alfresco SDK, you need to set your `JAVA_HOME` environment variable to a suitable value, using the correct mechanism for your operating system.

Setting the `JAVA_HOME` environment variable ensures that the correct JDK is accessed. This is especially important where you have multiple JDKs installed on your system.

1.  On Mac OS X you can edit your .bash\_profile file and add something similar to the following \(the exact version you are using may vary\):

    ```
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_45.jdk/Contents/Home
    ```

    Restart the terminal session or run `source .bash_profile` to activate the environment variable.

    **Attention:** Note that the actual value you specify here will depend on which JDK you have installed, and the resultant directory name.

2.  On Linux you can edit your .bashrc file and add something similar to the following:

    ```
    export JAVA_HOME=/usr/lib/jvm/java-8-oracle
    ```

    Restart the terminal session or run `source .bashrc` to activate the environment variable.

    **Attention:** Note that the actual value you specify here will depend on which JDK you have installed, and the resultant directory name.

3.  On Windows, the exact procedure for setting environment variables varies depending on the version of Windows you are running. For example, the procedure for Windows XP can be found in the [Microsoft Knowledgebase](http://support.microsoft.com/kb/310519).

    **Attention:** Note that the actual value you specify here will depend on which JDK you have installed, and the resultant directory name.

4.  Ensure that the `JAVA_HOME` environment variable is set correctly, using a method suitable for your system. For example, on Mac OS X and Linux you can enter the following command:

    ```
    $ env |grep JAVA_HOME
    JAVA_HOME=/usr/lib/jvm/java-8-oracle                   
    ```

    You will see the value that `JAVA_HOME` has been set to.

    Ensure that the result matches the value you specified in your shell configuration file \(such as `.bashrc`\).

    If you are on Windows you can use a command such as `SET J` to display environment variables starting with 'J'.


Your `JAVA_HOME` environment variable is now set, and you have verified it is reflected in your environment.

**Parent topic:**[Installing and configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md)

