---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Installing Linux libraries manually

Use this information to install Linux libraries manually on supported Linux distributions, such as Ubuntu, SUSE and Red Hat.

LibreOffice requires the following libraries to be installed on your system:

-   libfontconfig
-   libICE
-   libSM
-   libXrender
-   libXext
-   libXinerama
-   libcups
-   libGLU
-   libcairo2
-   libgl1-mesa-glx

On some Linux distributions, such as Ubuntu, SUSE, and Red Hat, the Alfresco setup wizard will validate whether or not the required libraries are present. If the required libraries are missing, you will get a warning message. You can install them using your package manager from the command line. Also, the Linux libraries file names may vary by distribution.

If LibreOffice does not start up normally with Alfresco, test manually; for example, by running this startup script:

```
start ex.  
{installdir}/libreoffice/scripts/libreoffice_ctl.sh start 
status ex. {installdir} 
/libreoffice/scripts/libreoffice_ctl.sh status
```

If you receive errors that indicate that a library missing, work with your system administrator to add the missing library or its equivalent from your configured repositories.

**Parent topic:**[Installing Alfresco on Linux using the Alfresco One Installer](../tasks/simpleinstall-enterprise-lin.md)

