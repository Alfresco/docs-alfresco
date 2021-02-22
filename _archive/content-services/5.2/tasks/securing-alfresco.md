---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: [Admin Console, open]
---

# Securing Alfresco Content Services components

After you have installed Alfresco Content Services 5.2.7, consider these best practices to secure the Tomcat web server, PostgreSQL database, and LibreOffice.

These instructions:

-   Are for out-of-the-box Alfresco Content Services 5.2.7 installation using the installer.
-   Assume that you have installed Alfresco Content Services 5.2.7 in a folder called alfresco-content-services.
-   Are for Linux operating system \(Ubuntu and Red Hat\).

To secure the Tomcat server, PostgreSQL database, and LibreOffice, you will:

1.  Create a user to run the PostgreSQL database, with limited permissions to the alfresco-content-services/postgresql/ and alfresco-content-services/alf\_data/postgresql/ folders. No other user\(s\) or group\(s\) should be allowed to write or execute code in these folders.
2.  Create two users, `tomcatusr` and `lofficeusr`, and add them to a group, `alfusrs`. The `tomcatusr` user will run the Tomcat web server and the `lofficeusr` user will run the LibreOffice process.
3.  Ensure that only `tomcatusr` is allowed to write in the important Alfresco folders.
4.  Make `lofficeusr` as the owner of the LibreOffice folder. This user will only be able to write in the /tomcat/temp folder because of the group ownership \(`alfusrs`\) over tomcat/temp and the setting of `setguid` feature on tomcat/temp.
5.  Start the LibreOffice process with the very limited `lofficeusr` by allowing the system to do a sudo from `tomcatusr` to `lofficeusr` without asking for a password.

**Parent topic:**[Installing using setup wizards](../concepts/installs-eval-intro.md)

## **Securing the PostgreSQL database**

To secure your PostgreSQL database, follow these steps:

1.  Create a new limited user.

    ```
    $ adduser psqlusr
    ```

2.  To display all the groups \(along with their uids\) associated with `psqlusr` use:

    ```
    $ id psqlusr
    ```

    Result:

    ```
    $ uid=1003(psqlusr) gid=1004(psqlusr) groups=1004(psqlusr)
    ```

3.  Move to the alfresco-content-services installation folder and change the user and group ownership to restrict the access to the database files only to `psqlusr`.

    ```
    ~/alfresco-content-services$ chown -R psqlusr postgresql/ alf_data/postgresql/
    ~/alfresco-content-services$ chgrp -R psqlusr postgresql/ alf_data/postgresql/
    ```

4.  To start the database, switch to the `psqlusr` user created above using any one of the following methods:

    -   ```
psqlusr > alfresco-content-services/postgresql/bin$ ./pg_ctl start -w -D {path to install folder}/alfresco-content-services/alf_data/postgresql
waiting for server to start.... done
server started
```

    -   ```
psqlusr > alfresco-content-services$ ./alfresco.sh start postgresql
waiting for server to start.... done
server started
```


## **Securing the Tomcat server**

To secure your Tomcat server, follow these steps:

1.  Create a new restricted user and a group to run the Tomcat web server and LibreOffice in a secure way.

    ```
    $ adduser tomcatusr
    $ groupadd alfusrs
    $ usermod -a -G alfusrs tomcatusr
    ```

2.  Assign the newly created user as the owner of the important folders from the installation folder:

    ```
    :~/alfresco-content-services$ chown -R tomcatusr tomcat/work/ tomcat/temp/ tomcat/logs/ tomcat/shared/
    alf_data/contentstore/ alf_data/contentstore.deleted/ alf_data/keystore/ alf_data/solr4/
    common/ libreoffice/ alf_data/oouser/
    ```

    Make sure you change the ownership of all the file/folder under the alf\_data folder, except for the postgresql folder that needs to be owned by the proper Postgres user.

3.  In addition, assign the new group as the owner of all these files/folders:

    ```
    :~/alfresco-content-services$ chgrp -R tomcatusr tomcat/work/ tomcat/temp/ tomcat/logs/ tomcat/shared/
    alf_data/contentstore alf_data/contentstore.deleted/ alf_data/keystore/ alf_data/solr4/
    common/ libreoffice/ alf_data/oouser/
    ```

4.  Go to <installLocation\>/tomcat/webapps/alfresco/WEB-INF/classes/log4j.properties and update the location of `alfresco.log` in the `log4j.appender.File.File` property.

    ```
    ###### File appender definition #######
    log4j.appender.File=org.apache.log4j.DailyRollingFileAppender
    log4j.appender.File.File=./tomcat/logs/alfresco.log
    ```

5.  Go to <installLocation\>/tomcat/webapps/share/WEB-INF/classes/log4j.properties and update the location of `share.log` in the `log4j.appender.File.File` property.

    ```
    ###### File appender definition #######
    log4j.appender.File=org.apache.log4j.DailyRollingFileAppender
    log4j.appender.File.File=./tomcat/logs/share.log
    ```

6.  Go to <installLocation\>/solr4/log4j-solr.properties and update the location of `solr.log` in the `log4j.appender.File.File` property.

    ```
    ###### File appender definition #######
    log4j.appender.File=org.apache.log4j.DailyRollingFileAppender
    log4j.appender.File.File=./tomcat/logs/solr.log
    ```

7.  To start Alfresco, switch to the `tomcatusr` user created above.

    ```
    tomcatusr > alfresco-content-services$ ./alfresco.sh start tomcat
    ```


When the Tomcat web server runs with a limited user, it is not allowed to bind to ports lower than 1024. If you need file sharing protocols through JLAN, see [Running SMB/CIFS from a normal user account](fileserv-CIFS-useracc.md) to set up proper ports and firewall rules/port forwarding.

## **Securing LibreOffice process**

To secure LibreOffice, follow these steps:

1.  Follow the steps to secure the Tomcat web server, as described above.

2.  Create a limited user, `lofficeusr`.

    ```
    $ adduser lofficeusr
    ```

    Only a limited user can run the LibreOffice process and is allowed to write files in the alfresco-content-services/tomcat/temp folder. The temp folder is used by the Alfresco process to communicate and request file transformations. LibreOffice will not able to write files in any other folder.

3.  Add the user to the group, `alfusr`.

    ```
    $ usermod -a -G alfusrs lofficeusr
    ```

4.  To display all the groups \(along with their uids\) associated with `tomcatusr` use:

    ```
    id tomcatusr
    ```

    Result:

    ```
    uid=1001(tomcatusr) gid=1001(tomcatusr) groups=1001(tomcatusr),1003(alfusrs)
    ```

5.  To display all the groups \(along with their uids\) associated with `lofficeusr` use:

    ```
    id lofficeusr
    ```

    Result:

    ```
    uid=1002(lofficeusr) gid=1002(lofficeusr) groups=1002(lofficeusr),1003(alfusrs)
    ```

6.  Set the owners of the libreoffice folder.

    ```
    chown -R lofficeusr libreoffice/
    chgrp -R alfusrs libreoffice/
    ```

7.  Delete all the files and folders \(including the hidden ones\) from the tomcat/temp folder.

8.  Allow the `loffice` user to write files in the tomcat/temp folder.

    ```
    chgrp -R alfusrs tomcat/temp/
    chmod g+w tomcat/temp/
    ```

9.  Set `setuid` to tomcat/temp so that all the files created in this folder \(or its subfolders\) will have `alfusrs` as the group owner.

    ```
    chmod g+s tomcat/temp
    ```

    The folder permission for the tomcat/temp folder would look like this:

    ```
    drwxrwsr-x  5 tomcatusr  alfusrs
    ```

    **Note:** The `setuid` and `setgid` feature may work differently on different Linux distributions. If the `setgid` feature is not enabled, JODConverter will not work.

10. Edit the soffice.bin file. This script is started by the JODConverter code from Alfresco.

    ```
    alfresco@alfresco-VB-U14:~/alfresco-content-services$ cat libreoffice/program/soffice.bin
    #!/bin/sh
    
    export LD_LIBRARY_PATH="" 
    
    #exec /home/alfresco/alfresco-content-services/libreoffice/program/.soffice.bin "$@"
    
    sudo -u lofficeusr /home/alfresco/alfresco-content-services/libreoffice/program/.soffice.bin "$@"
    ```

11. Instruct the Linux system that you trust `tomcatusr` to allow `lofficeusr` to run the LibreOffice executable under that role without asking for a password.

    ```
    $ visudo
    ```

    Add this in the sudoers file:

    ```
    tomcatusr ALL=(lofficeusr) NOPASSWD: /home/alfresco/alfresco-content-services/libreoffice/program/.soffice.bin
    ```

    Use the exact path to your /libreoffice/program/.soffice.bin file.


