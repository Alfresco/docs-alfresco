---
author: Alfresco Documentation
---

# Setting MAVEN\_OPTS & M2\_HOME

Before using the Alfresco SDK, you need to set your `MAVEN_OPTS` and `M2_HOME` environment variables to suitable values using the correct mechanism for your operating system.

Setting `M2_HOME` specifies the home of Maven and is used by the script `mvn` \(or `mvn.bat` on Windows\). `MAVEN_OPTS` is used to configure a bit of extra memory for Maven as it will run an embedded Apache Tomcat application server with Alfresco Repo, Share, and Solr web applications deployed. It also sets the Spring Loaded Java Agent so it is available during Rapid Application Development \(RAD\).

1.  Setting Variables.
2.  On **Mac** OS X you can edit your .bash\_profile file and add the following:

    ```
    export M2_HOME=/home/martin/apps/apache-maven-3.3.3
    export MAVEN_OPTS="-Xms1024m -Xmx1G -XX:PermSize=1024m -noverify"
    ```

    **Important:** Spring Loaded ONLY works with the [Share AMP archetype](../concepts/alfresco-sdk-archetypes-share-amp.md) at the moment. If you are configuring `MAVEN_OPTS` to run a Share AMP project set `MAVEN_OPTS="-Xms1024m -Xmx1G -XX:PermSize=1024m -javaagent:/home/martin/libs/springloaded-1.2.5.RELEASE.jar -noverify"`

    **Important:** Remove `-XX:PermSize=1024m` if you are using JDK 8, it is only needed for JDK 7.

    **Important:** Refer to previous installation sections for in what directory Maven was installed and in what directory Spring Loaded was installed.

    Restart the terminal session or run `source .bash_profile` to activate the environment variables.

3.  On **Linux** you can edit your .bashrc file and add the following:

    See step 1 for Mac OS, do the same thing for Linux.

    Restart the terminal session or run `source .bashrc` to activate the environment variable.

4.  On **Windows**, the exact procedure for setting environment variables varies depending on the version of Windows you are running. For example, the procedure for Windows XP can be found in the [Microsoft Knowledgebase](http://support.microsoft.com/kb/310519).

    ```
    set M2_HOME=C:\Tools\apache-maven-3.3.1
    set MAVEN_OPTS=-Xms256m -Xmx1G -XX:PermSize=1024m -noverify
    ```

    **Important:** Spring Loaded ONLY works with the [Share AMP archetype](../concepts/alfresco-sdk-archetypes-share-amp.md) at the moment. If you are configuring `MAVEN_OPTS` to run a Share AMP project set `MAVEN_OPTS=-Xms256m -Xmx1G -XX:PermSize=1024m -javaagent:C:\Tools\spring-loaded\springloaded-1.2.5.RELEASE.jar -noverify`

    **Important:** Remove `-XX:PermSize=1024m`.

    **Important:** If the path to the Spring Loaded JAR contains spaces, then you might need to double quote it like `-javaagent:"C:\My Tools\spring-loaded\springloaded-1.2.5.RELEASE.jar"`. Refer to previous installation sections for in what directory Maven was installed and in what directory Spring Loaded was installed.

    Restart the Windows terminal/console session.

5.  Verifying Variables.
6.  Ensure that the `MAVEN_OPTS` and `M2_HOME` environment variables are set correctly, using a method suitable for your system. For example, on Mac OS X and Linux you can enter the following command:

    ```
    $ env|egrep "M2|MAV"
    MAVEN_OPTS=-Xms256m -Xmx1G -XX:PermSize=1024m -noverify
    M2_HOME=/home/martin/apps/apache-maven-3.3.3
    ```

    Ensure that the result matches the value you specified in your shell configuration file \(such as `.bashrc`\).

    If you are on Windows you can use a command such as `set M` to display environment variables starting with 'M'.

    ```
    C:\Users\mbergljung>set M
    M2_HOME=C:\Tools\apache-maven-3.3.1
    MAVEN_OPTS=-Xms256m -Xmx1G -XX:PermSize=1024m -noverify
    ```


Your `MAVEN_OPTS` and `M2_HOME` environment variables are now set. Feel free to increase the specified memory settings if required, for example, if you get "out of memory" errors when running your projects.

**Parent topic:**[Installing and configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md)

