---
author: Alfresco Documentation
---

# Verify install

Before proceeding to use the Alfresco SDK, you should do one final check of your system to ensure you have the prerequisites correctly installed.

Check you have the JDK and Maven correctly installed, and the correct versions of both, and that Maven is configured to use the correct version of the JDK.

1.  Check your configuration by running the command `mvn --version` and listing Maven environment. This will display information similar to the following:

    ```
    $ mvn --version
    Apache Maven 3.3.3 (7994120775791599e205a5524ec3e0dfe41d4a06; 2015-04-22T12:57:37+01:00)
    Maven home: /home/martin/apps/apache-maven-3.3.3
    Java version: 1.8.0_45, vendor: Oracle Corporation
    Java home: /usr/lib/jvm/java-8-oracle/jre
    Default locale: en_GB, platform encoding: UTF-8
    OS name: "linux", version: "3.13.0-58-generic", arch: "amd64", family: "unix"
    
    $ env|egrep "M2|MAV"
    MAVEN_OPTS=-Xms256m -Xmx1G -javaagent:/home/martin/libs/springloaded-1.2.5.RELEASE.jar -noverify
    M2_HOME=/home/martin/apps/apache-maven-3.3.3
    ```

    Make sure that the correct version of Maven is installed \(3.2.5+\) and that the correct version of the JDK is installed \(1.8+ or IBM SDK 7.1 if on IBM WebSphere\). If you have multiple JDKs installed double check that Maven is using the correct version of the JDK. If you do not see this kind of output, and your operating system cannot find the `mvn` command, make sure that your `PATH` environment variable and `M2_HOME` environment variable have been properly set.


You are now ready to start using the Alfresco SDK.

**Parent topic:**[Installing and configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md)

