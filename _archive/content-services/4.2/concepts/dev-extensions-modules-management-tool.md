---
author: Alfresco Documentation
---

# Using the Module Management Tool \(MMT\)

The Module Management Tool \(MMT\) helps install and manage modules packaged as AMP \(Alfresco Module Package\) files. These AMP files are applied to a target WAR file, for example alfresco.war or share.war.

The MMT supports the following: installation of AMP files including upgrades to later versions, uninstallation of installed modules, and listing of currently installed modules.

Modules are packaged and installed as AMP files. An AMP File relates to a specific module and version. During the installation of an AMP file the module and version are taken into consideration.

The MMT program, alfresco-mmt.jar, is available in the bin directory of the Alfresco installation.

## Running the MMT

Run the following command:

```

    java -jar alfresco-mmt.jar [args]
    
```

It is compatible with WAR files v 2.0 and above.

Note that in some cases you must run $ALF\_HOME/scripts/setenv.sh before this command, and to set `$ALF_HOME` and `$CATALINA_HOME` \(as used in $ALF\_HOME/bin/apply\_amps.sh\) is also recommended. `$ALF_HOME` is the Alfresco installation directory. `$CATALINA_HOME` is the Tomcat installation directory.

MMT Commands

The MMT has a number of commands. Details of these are outlined below:

-   **install**

    ```
    
          
        usage: install <AMPFileLocation> <WARFileLocation> [options]
        
        
          valid options:
          
          -verbose   : enable verbose output
          -directory : indicates that the amp file location specified is a directory.
          All amp files found in the directory and its sub directories are installed.
          -force     : forces installation of AMP regardless of currently installed module version
          -preview   : previews installation of AMP without modifying WAR file
          -nobackup  : indicates that no backup should be made of the WAR
        
        
    ```

    Install installs the files found in the AMP file into the Alfresco WAR, updating it if an older version is already installed. If the module represented by the AMP is already installed and the installing AMP is of a higher release version, then the files relating to the older version will be removed from the WAR and replaced with the newer files.

    It is the responsibility of the module developer to provide the appropriate module components to bootstrap or patch any data as required when updated WAR is run.

    If the installing module version is less than or equal to the version already installed in the WAR then installation will be aborted unless the `-force` option is specified. In this case the installing AMP will always replace the currently installed version. This option is especially useful when developing an AMP.

    Before an AMP is installed into a WAR a copy of the original WAR is taken and placed in the same directory. Specifying the `-nobackup` option prevent this from occurring.

    Example:

    ```
    
          java -jar alfresco-mmt-2.1.0.jar install /root/alfresco-recordsmanagement-2.1.0.amp /usr/jboss-4.0.3SP1/server/default/deploy/alfresco.war 
          
    ```

-   **list**

    ```
    
            
          usage: list <warFile>
            
            
    ```

    Lists the details about all the modules currently installed in the WAR file specified. The output is directed to the console.

-   **disable Note: this command is not yet available.**

    ```
    
                  
                usage: disable <moduleId> <warFile>
                  
                
    ```

-   **enable Note: this command is not yet available.**

    ```
    
          
              usage: enable <moduleId> <warFile>      
          
        
    ```

-   **uninstall**

    ```
    
          
                usage: uninstall<moduleId> <warFile>      
          
        
    ```


## Best Practices

It is good practice to install modules using the `-preview` option prior to doing the install proper. This reports the modifications that will occur on the WAR without making any physical changes. The changes that are of most importance to note are those that are going to update existing files.

As a general rule it is considered bad practice to overwrite an existing file in the WAR, however it is sometimes necessary. The MMT makes a backup copy of the updated file and stores it in the WAR. When an update of the module occurs and the old files are removed, this backup will be restored prior to the installation of the new files. Problems may occur if multiple installed modules modify the same existing file. In these cases a manual restore may be necessary if recovery to an existing state is required.

**Note:** Note that some application servers, such as Tomcat, are sometimes ineffective at cleaning up their temporary working files, and this can interfere with successful installation of an AMP file. To remedy this situation, it is recommended to clean out these directories while Tomcat is shut down, using the clean\_tomcat.sh script in bin.

**Parent topic:**[Modules](../concepts/dev-extensions-modules-intro.md)

