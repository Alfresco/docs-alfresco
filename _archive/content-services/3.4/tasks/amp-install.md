---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Extensions/Third Party Tools, Installation, Administration]
keyword: [AMP, AMP Module Package MMT Module Management Tool, install, Extensions/Third Party Tools]
---

# Installing an Alfresco Module Package

An Alfresco Module Package \(AMP\) is a bundle of code, content model, content, and the directory structure that is used to distribute additional functionality for Alfresco. Use the Module Management Tool \(MMT\) to install and manage AMP files. This section describes how to install an AMP in an Alfresco WAR using the MMT.

The MMT is included in the Alfresco installers, and it is also available as a separate JAR file from the Alfresco WAR file bundle \(alfresco-enterprise-3.4.14.zip\).

**Note:** For Tomcat, alternatively, run the `apply_amps` command in the Alfresco \\bin directory, which applies all the AMP files that are located in the amps and amps\_share directories.

1.  Browse to the /bin directory:

    -   \(Windows\) C:\\Alfresco\\bin
    -   \(Linux\) /opt/alfresco/bin
2.  Run the following command:

    `java -jar alfresco-mmt.jar install <AMPFileLocation> <WARFileLocation> [options]`

    Where:

    |Option|Description|
    |------|-----------|
    |`<AMPFileLocation>`|The location of the AMP file that you want to install.|
    |`<WARFileLocation>`|The location of the WAR file for your Alfresco installation.|
    |`-verbose`|Install command \[options\]. Enables detailed output containing what is being updated and to where it is being copied.

|
    |`-directory`|Install command \[options\]. Indicates that the AMP file location specified is a directory. All AMP files found in the directory and its sub directories are installed.|
    |`-force`|Install command \[options\]. Forces installation of AMP regardless of currently installed module version.|
    |`-preview`|Install command \[options\]. Previews installation of AMP without modifying WAR file. It reports the modifications that will occur on the WAR without making any physical changes, for example, the changes that will update existing files. It is good practice to use this option before installing the AMP.|
    |`-nobackup`|Indicates that the WAR will not be backed up before the AMP is installed.|

    This command installs the files found in the AMP into the Alfresco WAR. If the module represented by the AMP is already installed and the installing AMP is of a higher release version, then the files for the older version are removed from the WAR and replaced with the newer files.

    The following commands show examples of how to install the `example-amp.amp`, and assumes that the AMP file is in the same directory as the WAR file:

    ```
    java -jar alfresco-mmt.jar install example-amp.amp alfresco.war -preview
    ```

    Review the modification to check the changes that will update any existing files.

    The following example will install the AMP file:

    ```
    java -jar alfresco-mmt.jar install example-amp.amp alfresco.war -verbose
    ```

    The modified Alfresco WAR can then be redeployed back into your application server.

    On restarting the application server, the console will show that the custom class was initialized during startup.

3.  Verify that the AMP is installed using the MMT list command. For example:

    ```
    java -jar alfresco-mmt.jar list <WARFileLocation>
    ```

    This command provides a detailed listing of all the modules currently installed in the WAR file specified.


When the repository is next started, the installed module configuration will be detected, and the repository will be bootstrapped to include the new module functionality and data.

It is not recommended that you overwrite an existing file in an AMP, however it is sometimes necessary. The MMT makes a backup copy of the updated file and stores it in the WAR. When an update of the module occurs and the old files are removed, this backup will be restored prior to the installation of the new files. Problems may occur if multiple installed modules modify the same existing file. In these cases, a manual restore may be necessary if recovery to an existing state is required.

Some application servers \(notably Tomcat\) do not always fully clean up their temporary working files, and this can interfere with successful installation of an AMP file. To remedy this situation, it is recommended that you delete \(or move\) the Tomcat work and temp directories while Tomcat is shut down.

**Parent topic:**[Installing software required for Alfresco](../concepts/prereq-opt-install.md)

**Related information**  


[Changing the default shell \(Unix/Linux/Solaris\) for shell scripts](fot-change-shell.md)

