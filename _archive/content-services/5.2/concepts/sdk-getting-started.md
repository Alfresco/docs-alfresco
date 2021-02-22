---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Getting started with Alfresco Content Services SDK 3

Use these instructions to get started with using Alfresco SDK 3.

**Prerequisites**

There are a number of software requirements for using Alfresco Content Services SDK 3.

-   Java Development Kit \(JDK\) - Version 8
-   Maven - Version 3.3
-   JRebel \(optional\) for hot reloading of web resources, configuration, and classes
-   HotSwap Agent \(optional\) for hot reloading of web resources, configuration, and classes

You'll find more details about JRebel and HotSwap Agent in [Hot reloading](sdk-hot-reloading.md#).



**Java**

1.  Download [JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/index.html) and install by running the installer.
2.  Verify the installation for both JDK and JRE.

    ```
    $ javac -version
    javac 1.8.0_112
    $ java -version
    java version "1.8.0_112"
    Java(TM) SE Runtime Environment (build 1.8.0_112-b16)
    Java HotSpot(TM) 64-Bit Server VM (build 25.112-b16, mixed mode)
    ```

3.  Make sure `JAVA_HOME` is setup correctly, so other tools like Maven will use the correct version.

    ```
    $ env|grep JAVA_HOME
    JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_112.jdk/Contents/Home/jre
    ```


**Maven**

Alfresco recommends that you keep up-to-date with all the Maven releases. Linux distributions and package managers tend to bundle older releases and this is the most common pitfall.

Alfresco SDK 3 requires Maven 3.3.0+, but you are recommended to download the latest version.

1.  Download and install [Apache Maven](https://maven.apache.org/download.cgi) and make sure it is configured correctly on your path.
2.  Verify the installation.

    ```
    $ mvn -v
    Apache Maven 3.3.3 (7994120775791599e205a5524ec3e0dfe41d4a06; 2015-04-22T12:57:37+
    01:00)
    Maven home: /Users/Alfresco/apache-maven-3.3.3
    Java version: 1.8.0_112, vendor: Oracle Corporation
    Java home: /Library/Java/JavaVirtualMachines/jdk1.8.0_112.jdk/Contents/Home/jre
    Default locale: en_GB, platform encoding: UTF-8
    OS name: "mac os x", version: "10.12.3", arch: "x86_64", family: "mac"
    ```


**Generate your project from the archetypes**

1.  After you've successfully configured Java and Maven, it's time to generate your project.

    ```
     mvn archetype:generate -Dfilter=org.alfresco:
    ```

    **Note:** You'll be prompted to select the archetype you want. The previously available archetypes, `alfresco-amp-archetype` and `share-amp-archetype` will still show up as an option, however these archetypes are not part of Alfresco SDK 3.

    **Attention:** You'll need double quotes around the filter part if you are using Windows Powershell: `mvn archetype:generate "-Dfilter=org.alfresco:"` and

    The output looks something like this:

    ```
    [INFO] Generating project in Interactive mode
    [INFO] No archetype defined. Using maven-archetype-quickstart (org.apache.maven.ar
    chetypes:maven-archetype-quickstart:1.0)
    Choose archetype:
    1: remote -> org.alfresco.maven.archetype:alfresco-allinone-archetype (Sample mult
    i-module project for All-in-One development on the Alfresco plaftorm. Includes mod
    ules for: Repository WAR overlay, Repository AMP, Share WAR overlay, Solr configur
    ation, and embedded Tomcat runner)
    2: remote -> org.alfresco.maven.archetype:alfresco-amp-archetype (Sample project w
    ith full support for lifecycle and rapid development of Repository AMPs (Alfresco
    Module Packages))
    3: remote -> org.alfresco.maven.archetype:share-amp-archetype (Share project with
    full support for lifecycle and rapid development of AMPs (Alfresco Module Packages
    ))
    4: remote -> org.alfresco.maven.archetype:alfresco-platform-jar-archetype (Sample
    project with full support for lifecycle and rapid development of Platform/Reposito
    ry JARs and AMPs (Alfresco Module Packages))
    5: remote -> org.alfresco.maven.archetype:alfresco-share-jar-archetype (Share proj
    ect with full support for lifecycle and rapid development of JARs and AMPs (Alfres
    co Module Packages))
    6: remote -> org.alfresco.maven.archetype:activiti-jar-archetype (Sample project w
    ith full support for lifecycle and rapid development of Activiti JARs)
    Choose a number or apply filter (format: [groupId:]artifactId, case sensitive cont
    ains): :
    ```

2.  Select one of the following archetype:

    -   `org.alfresco.maven.archetype:alfresco-allinone-archetype`
    -   `org.alfresco.maven.archetype:alfresco-platform-jar-archetype`
    -   `org.alfresco.maven.archetype:alfresco-share-jar-archetype`
    **Note:** The numbers may vary from the output shown above due to the way Maven reads and filters the archetypes.

3.  Choose the latest version.

    ```
    Choose org.alfresco.maven.archetype:alfresco-allinone-archetype version:
    1: 2.0.0-beta-1
    2: 2.0.0-beta-2
    3: 2.0.0-beta-3
    4: 2.0.0-beta-4
    5: 2.0.0
    6: 2.1.0
    7: 2.1.1
    8: 2.2.0
    9: 3.0.0
    10: 3.0.1
    ```

    **Note:** Always use the latest version for the SDK, as it includes the most recently applied fixes.

4.  Next you will be prompted for additional values, like `groupId`, `artifactId`, and `package`, as shown below:

    ```
    Define value for property 'groupId':
    Define value for property 'artifactId':
    [INFO] Using property: version = 1.0-SNAPSHOT
    Define value for property 'package':
    ```

5.  After you have specified the information according to your project, a final confirmation will appear.

    ```
    Confirm properties configuration:
    groupId: com.acme
    artifactId: my-all-in-one
    version: 1.0-SNAPSHOT
    package: com.acme
    Y: :
    ```

6.  Press **Y** and then press **Enter**.

    If everything has been configured correctly, you should see something similar to this:

    ```
    [INFO] ---------------------------------------------------------------------------
    -
    [INFO] Using following parameters for creating project from Archetype: alfresco-al
    linone-archetype:3.0.0-SNAPSHOT
    [INFO] ---------------------------------------------------------------------------
    -
    [INFO] Parameter: groupId, Value: com.acme
    [INFO] Parameter: artifactId, Value: my-all-in-one
    [INFO] Parameter: version, Value: 1.0-SNAPSHOT
    [INFO] Parameter: package, Value: com.acme
    [INFO] Parameter: packageInPathFormat, Value: com/acme
    [INFO] Parameter: package, Value: com.acme
    [INFO] Parameter: version, Value: 1.0-SNAPSHOT
    [INFO] Parameter: groupId, Value: com.acme
    [INFO] Parameter: artifactId, Value: my-all-in-one
    [INFO] Parent element not overwritten in /Users/Alfresco/my-all-in-one/my-all-in-o
    ne-platform-jar/pom.xml
    [INFO] Parent element not overwritten in /Users/Alfresco/my-all-in-one/my-all-in-o
    ne-share-jar/pom.xml
    [INFO] Parent element not overwritten in /Users/Alfresco/my-all-in-one/integration
    -tests/pom.xml
    [INFO] project created from Archetype in dir: /Users/Alfresco/my-all-in-one
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time: 02:29 min
    [INFO] Finished at: 2017-03-28T15:44:17+01:00
    [INFO] Final Memory: 19M/316M
    [INFO] ------------------------------------------------------------------------
    ```

7.  You have successfully generated your first SDK 3 project.

    Inside the project, you will find the run.bat and run.sh scripts. These are convenience scripts for you to quickly run your project.

    In the terminal window, use:

    -   `sh run.sh` for Mac OS X or Linux
    -   `run.bat` for Windows
    **Note:** If this is the first time you are doing this, it will take a while for Maven to download all the required dependencies.


**Parent topic:**[Alfresco Content Services SDK 3](../concepts/sdk-intro.md)

