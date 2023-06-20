---
title: Install Alfresco Module Package
nav: false
---

An Alfresco Module Package (AMP) is a bundle of code, content model, content, and the directory structure that is used to distribute additional functionality for Content Services. Use the Module Management Tool (MMT) to install and manage AMP files. You can install an AMP in an Alfresco WAR using the MMT, or by using the `apply_amps` tool.

The MMT is available as a JAR file from the distribution zip (`alfresco-content-services-distribution-7.2.x.zip`), in the zip's `/bin` directory. Place the `/bin` directory and its contents in the same location where you extracted the Content Services distribution zip; for example `<installLocation>/bin`.

1. Browse to the `/bin` directory, for example:

    * (Windows) `C:\Alfresco\bin`
    * (Linux) `/opt/alfresco/bin`

2. Run the `apply_amps` application to apply all AMP files that are in the `amps` and `amps_share` directories:

    * For Windows, navigate to the bin directory and double click `apply_amps`.
    * For Linux, enter the command:

        ```bash
        bin/apply_amps.sh
        ```

3. Alternatively, to install individual AMP files, use the MMT:

    ```java
    java -jar alfresco-mmt.jar install <AMPFileLocation> <WARFileLocation> [options]
    ```

    where:

    | Option | Description |
    | ------ | ----------- |
    | AMPFileLocation| The location of the AMP file that you want to install. |
    | WARFileLocation | The location of the WAR file for your installation. |
    | -verbose | Install command option. Enables detailed output containing what is being updated and to where it is being copied. |
    | -directory | Install command option. Indicates that the AMP file location specified is a directory. All AMP files found in the directory and its sub directories are installed. |
    | -force | Install command option. Forces installation of AMP regardless of currently installed module version. |
    | -preview | Install command option. Previews installation of AMP without modifying WAR file. It reports the modifications that will occur on the WAR without making any physical changes, for example, the changes that will update existing files. It is good practice to use this option before installing the AMP. |
    | -nobackup | Indicates that the WAR will not be backed up before the AMP is installed. |

    This command installs the files found in the AMP into the Alfresco WAR. If the module represented by the AMP is already installed and the installing AMP is of a higher release version, then the files for the older version are removed from the WAR and replaced with the newer files.

    The following commands show examples of how to install the `example-amp.amp`, and assumes that the AMP file is in the same directory as the WAR file:

    ```java
    java -jar alfresco-mmt.jar install example-amp.amp alfresco.war -preview
    ```

    Review the installation preview to check how existing files in the WAR file will be updated, once you run the command without `-preview`.

    The following example installs the AMP file:

    ```java
    java -jar alfresco-mmt.jar install example-amp.amp alfresco.war -verbose
    ```

    The modified Alfresco WAR can then be redeployed back into your application server.

    On restarting the application server, the console will show that the custom class was initialized during startup.

4. Verify that the AMP is installed using the MMT list command. For example:

    ```java
    java -jar alfresco-mmt.jar list <WARFileLocation>
    ```

    This command provides a detailed listing of all the modules currently installed in the WAR file specified.

When the repository is next started, the installed module configuration will be detected, and the repository will be bootstrapped to include the new module functionality and data.

We don't recommended that you overwrite an existing file in an AMP, however it's sometimes necessary. The MMT makes a backup copy of the updated file and stores it in the WAR. When a module is updated, and the old files are removed, this backup is restored prior to the installation of the new files. Problems can occur if multiple installed modules modify the same existing file. In these cases, a manual restore might be necessary, if recovery to an existing state is required.

Some application servers (notably Tomcat) don't always fully clean up their temporary working files, and this can interfere with successful installation of an AMP file. To remedy this situation, it's recommended that you delete (or move) the Tomcat `work` and `temp` directories while Tomcat is shut down.

### Viewing module packages

AMPs are used to package customizations and extensions for deployment. Use the **Module Browser** page to view all the AMPs that have been applied to Content Services.

1. Start Content Services.
2. Click **Admin Tools** then **Module Browser**.

    The Module Browser page shows a list of all the module packages that are either pre-configured in an out-of-the-box installation or applied by the user, along with the description and version number.

    ![Module Browser page in Admin Tools]({% link content-services/images/amp.png %})

## Uninstall an AMP file

Use the Module Management Tool (MMT) to uninstall one or more AMP files.

The MMT program, `alfresco-mmt.jar`, is available in the `bin` directory of the installation. MMT uninstalls an AMP file by removing content from the `alfresco.war` and `share.war` files. See [Using the Module Management Tool (MMT)]({% link content-services/7.2/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) for more.

MMT is a command line tool. The syntax for uninstalling an AMP file using MMT is:

```java
java -jar bin/alfresco-mmt.jar uninstall <ModuleId> <WARFileLocation>
```

> **Note:** The `apply_amps` command does not uninstall AMP files (even if you remove the AMP files manually from the `amps` and `amps_share` directories). Use `apply_amps` to install AMP files only.

For each integration, there is always at least one AMP file to remove from the `alfresco.war` and `share.war` files. AMP files that are applied to `alfresco.war` usually reside in the `amps` directory, and AMP files that are applied to `share.war` usually reside in the `amps_share` directory.

1. Open a command prompt and change into the root directory of your installation.

2. Check for the presence of the module you wish to delete by typing in the following command:

    ```java
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
    ```

    for `alfresco.war` AMP files, and

    ```java
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war
    ```

    for `share.war` AMP files.

    This displays a list of installed modules. Make a note of the module ID of the module you wish to uninstall, for example, `org.alfresco.integrations.google.docs` in the `amps` directory, and `org.alfresco.integrations.share.google.docs` in the `amps_share` directory.

3. Uninstall the module by entering the following command:

    ```java
    java -jar bin/alfresco-mmt.jar uninstall org.alfresco.integrations.google.docs tomcat/webapps/alfresco.war
    ```

    and

    ```java
    java -jar bin/alfresco-mmt.jar uninstall org.alfresco.integrations.share.google.docs tomcat/webapps/share.war
    ```

4. You can check that the AMP files have been removed by rerunning the command:

    ```java
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
    ```

    and

    ```java
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war
    ```

5. Delete the `tomcat/webapps/alfresco` and `tomcat/webapps/share` folders in the installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

6. Restart Content Services to see your changes.
