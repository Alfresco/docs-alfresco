---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Configuration, WQS]
option: Web Quick Start
---

# Manually installing Web Quick Start

If you have an existing Alfresco installation and prefer to install Web Quick Start manually, you can apply the relevant AMP files to your application. This method is suitable for customized or integrated Alfresco installations.

This procedure describes how to copy the AMP files into their appropriate AMP directories and uses the apply\_amps.bat or .sh file to apply them. Alternatively, use the Module Management Tool \(MMT\) to apply the AMP file.

1.  Download the Web Quick Start zip bundle file:

    alfresco-enterprise-wcmqs-3.4.14.zip

2.  Locate your Alfresco installation directory.

3.  Copy the AMP files into the relevant amps directories for Alfresco and Share:

    1.  Copy the alfresco-enterprise-wcmqs-3.4.14.amp file to the amps directory.

    2.  Copy the alfresco-enterprise-wcmqs-share-3.4.14.amp file to the amps-share directory.

4.  Apply the AMP files using the apply\_amps command for the Tomcat application server, or, alternatively, use the Module Management Tool \(MMT\).

5.  Copy the website WAR \(wcmqs.war\) into the webapps directory of your existing Alfresco installation.

    For example, on Windows with a Tomcat application server, this is C:\\Alfresco\\tomcat\\webapps.

6.  Copy the Alfresco Web Editor file \(awe.war\) into the webapps directory to replace the existing awe.war file.

7.  Delete the existing alfresco and share directories.

8.  Restart the Alfresco server.


**Parent topic:**[Web Quick Start](../concepts/WQS-intro.md)

