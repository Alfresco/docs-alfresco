---
author: Alfresco Documentation
---

# Setting JAVA\_HOME

Before using the Maven Alfresco SDK, you need to set your `JAVA_HOME` environment variable to a suitable value, using the correct mechanism for your system.

Setting the `JAVA_HOME` environment variable ensures that the correct Java run-time is called, this is especially important where you have multiple run times or JDKs installed on your system.

1.  On Mac OS X you can edit your .bash\_profile file and add something similar to the following:

    ```
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_12.jdk/Contents/Home
    ```

    Restart the terminal session or run `source .bash_profile` to activate the environment variable.

    **Attention:** Note that the actual value you specify here will depend on which JDK or run-time you have installed, and the exact location.

2.  On Linux you can edit your .bashrc file and add something similar to the following:

    ```
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_12.jdk/Contents/Home
    ```

    Restart the terminal session or run `source .bashrc` to activate the environment variable.

    **Attention:** Note that the actual value you specify here will depend on which JDK or run-time you have installed, and the exact location.

3.  On Windows, the exact procedure for setting environment variables varies depending on the version of Windows you are running. For example, the procedure for Windows XP can be found in the [Microsoft Knowledgebase](http://support.microsoft.com/kb/310519).

    **Attention:** Note that the actual value you specify here will depend on which JDK or run-time you have installed, and the exact location.

4.  Check your configuration by running the command `mvn --version`. This will display information similar to the following:

    ```
    
                        
    Apache Maven 3.0.5 (r01de14724cdef164cd33c7c8c2fe155faf9602da; 2013-02-19 13:51:28+0000)
    Maven home: /Users/tbedford/maven-3.0.5
    Java version: 1.7.0_12-ea, vendor: Oracle Corporation
    Java home: /Library/Java/JavaVirtualMachines/jdk1.7.0_12.jdk/Contents/Home/jre
    Default locale: en_US, platform encoding: UTF-8
    OS name: "mac os x", version: "10.9.2", arch: "x86_64", family: "mac"                    
                        
                    
    ```

    Confirm that the version of Java being used is the required one.

5.  Check the version of Java invoked by default by running the following command `java -version`. This will display information similar to the following:

    ```
    
                            
    java version "1.7.0_12-ea"
    Java(TM) SE Runtime Environment (build 1.7.0_12-ea-b08)
    Java HotSpot(TM) 64-Bit Server VM (build 24.0-b28, mixed mode)                        
                            
                        
    ```

    This should match the version being used by Maven.


Your `JAVA_HOME` environment variable is now set.

**Parent topic:**[Maven Alfresco SDK](../concepts/dev-extensions-maven-sdk-intro.md)

