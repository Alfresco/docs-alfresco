---
author: Alfresco Documentation
---

# Install JDK

The Alfresco SDK is based on Maven, which requires the JDK to be installed. This topic steps you through installing the JDK and verifying its installation.

There are no pre-requisites for this installation.

To use the Alfresco SDK most effectively, and to align with what JDK is used by the default Alfresco versions in the SDK, you need to have Oracle JDK 1.8 installed \(or IBM SDK 7.1 if on IBM WebSphere\). [Maven requires that the JDK be installed - the Java run-time alone is not sufficient](http://maven.apache.org/download.cgi#Maven_Documentation).

1.  Checking for the availability of the JDK.
2.  Check if you have the JDK already installed. Go to your command line and type the following command:

    ```
    javac -version    
    ```

    You will see a message such as the following, if you have the JDK installed:

    ```
    javac 1.8.0_45                    
    ```

    **Important:** Make sure you use `javac` when you test if JDK is installed and not `java`, which tests if JRE is installed.

    If you get "command not found" you need to install the JDK. Also if you have a version of the JDK prior to 1.8 you will need to install 1.8 or above \(or IBM SDK 7.1 if on IBM WebSphere\). It is possible to have multiple versions of the JDK installed \(and multiple Java run-times\). You will later see how you can configure your `JAVA_HOME` variable so that Maven uses the correct version of the JDK.

3.  Downloading the JDK.
4.  Download the JDK from the [Oracle JDK site](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

5.  Installing the JDK.
6.  Carefully review the [Oracle JDK 8 installation guide](http://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html) as appropriate for your system.

7.  Install the JDK, following the Oracle instructions.

8.  Verifying the JDK is successfully installed.
9.  Go to your command line and type the following command:

    ```
    javac -version
    ```

    This will display information such as the following:

    ```
    javac 1.8.0_45                    
    ```

    To be extra sure you should also check your Java run-time by entering the following command:

    ```
    java -version                    
    ```

    This will display information such as the following:

    ```
    java -version
    java version "1.8.0_45"
    Java(TM) SE Runtime Environment (build 1.8.0_45-b14)
    Java HotSpot(TM) 64-Bit Server VM (build 25.45-b02, mixed mode)                    
    ```

    Double check that the version of Java installed is correct \(1.8\).


You now have JDK 1.8 installed and you have verified that you are running the correct version of Java.

**Parent topic:**[Installing and configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md)

