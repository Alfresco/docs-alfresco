---
author: Alfresco Documentation
---

# Install Maven

The Alfresco SDK is now based around Maven \(formerly it used Ant\). To use the Alfresco SDK you need to have Maven installed.

To be able to use Maven you need to have a suitable JDK installed. For this version of the SDK you should have JDK 1.8 installed \(or IBM SDK 7.1 if on IBM WebSphere\).

To use the Alfresco SDK you need to have Maven installed. *The version required is 3.2.5 and above*.

1.  Check for the availability of Maven.
2.  First, check to see if you already have the correct version of Maven installed. On your command line enter the following command:

    ```
    mvn --version           
    ```

    If you get "command not found", or you have a version of Maven less than 3.2.5, you will need to install Maven or upgrade to 3.2.5 or above. In this case it is recommended you download the latest version of Maven \(3.2.5+\) from the official Maven website.

3.  Downloading Maven.
4.  Download Maven from the [Apache Maven project web site](http://maven.apache.org/download.cgi).

5.  Installing Maven.
6.  Carefully review the platform-specific installation instructions in the [Installing Maven](http://books.sonatype.com/mvnref-book/reference/installation-sect-maven-install.html) Sonatype documentation.

7.  Install Maven using the platform-specific instructions provided in the Maven documentation.

8.  Verifying Maven is correctly installed.
9.  Run the following command to verify Maven is correctly installed:

    ```
    mvn --version                   
    ```

    This will display information such as the following:

    ```
    Apache Maven 3.3.3 (7994120775791599e205a5524ec3e0dfe41d4a06; 2015-04-22T12:57:37+01:00)
    Maven home: /home/martin/apps/apache-maven-3.3.3
    Java version: 1.8.0_45, vendor: Oracle Corporation
    Java home: /usr/lib/jvm/java-8-oracle/jre
    Default locale: en_GB, platform encoding: UTF-8
    OS name: "linux", version: "3.13.0-58-generic", arch: "amd64", family: "unix"
    ```

    Check that the correct versions of Maven and the JDK are being used. If Maven is *not* using the correct version of the JDK, make sure you have set your `JAVA_HOME` environment variable, as described in the previous tutorial.


You have now installed Maven and verified that it is the correct version and is using the correct version of the JDK.

**Parent topic:**[Installing and configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md)

