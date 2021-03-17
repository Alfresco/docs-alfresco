---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
---

# Installing Linux libraries manually

Use this information to install Linux libraries manually on supported Linux distributions, such as Ubuntu, SUSE and RedHat.

LibreOffice requires the following libraries to be installed on your system:

-   libfontconfig
-   libSM
-   libICE
-   libXrender
-   libXext
-   libXinerama

On some Linux distributions, such as Ubuntu, SUSE, and RedHat, the Alfresco setup wizard will validate whether or not the required libraries are present. If the required libraries are missing, you will get a warning message. You can install them using your package manager from the command line. Also, the Linux libraries file names may vary by distribution.

If LibreOffice does not start up normally with Alfresco, test manually; for example, by running this startup script:

```
start ex.  
{installdir}/libreoffice/scripts/libreoffice_ctl.sh start 
status ex. {installdir} 
/libreoffice/scripts/libreoffice_ctl.sh status
```

If you receive errors that indicate that a library missing, work with your system administrator to add the missing library or its equivalent from your configured repositories.

**Parent topic:**[Installing Alfresco Enterprise on Linux](../tasks/simpleinstall-enterprise-lin.md)

