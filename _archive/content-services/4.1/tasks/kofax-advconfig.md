---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Kofax Release Script Installation and Configuration Guide \(Beta\)
audience: 
category: Installation
option: Kofax Release script
---

# Advanced configuration: custom types, aspects, and properties

By default, the Release Setup web script \(\\service\\kofax\\releasesetup\) displays all types, aspects, and their associated properties available in your Alfresco repository.

The Release script can be configured to limit this list to only show only those values that are applicable to your use case. A web script configuration file is used to define the items to be displayed.

The Release script configuration file uses a structure similar to that used by the model definitions themselves. Add the types and/or aspects and the relevant properties to the releasescript.get.config.xml file to define the options you want available. See the sample configuration provided for examples.

**Note:** For information on defining your own model for types and aspects, refer to the Alfresco Wiki page Data Dictionary Guide.

1.  Locate the releasesetup.get.config.xml.sample file. For Tomcat this will be located at:

    tomcat\\WEBINF\\classes\\alfresco\\templates\\webscripts\\com\\microstrat\\kofax\\releasesetup.get.config.xml.sample

    **Note:** This is the default location used by the Tomcat application server. The location of the file may vary depending on the application server used by your Alfresco installation.

2.  Rename releasesetup.get.config.xml.sample to releasesetup.get.config.xml.

3.  Reload your web script using the Web Script Index page as follows:

    1.  Go to http://YOURHOST:8080/alfresco/service/index.

    2.  Click **Refresh Web Scripts**.

4.  Open the Release Script Index tab.

    This will now only allow selection of types, aspects, and properties as defined in the configuration file.


If an aspect exists with properties and these properties are to be mapped from Kofax to Alfresco, then all properties for this aspect must be populated in the batch process. If certain properties are omitted from the mapping within the release script set up, then when documents are released, the unmapped properties are overwritten with empty strings.

For example, you have an aspect with properties assigned to the default content model and have a document with this aspect assigned. When using Kofax integration, when the document exists `version` option is set, all aspect properties must be mapped and populated in the batch process, otherwise all unmapped properties are overwritten with empty strings \(blanked out\). This is because in the document exists case, the `version` option uses checkout/check in functionality, which means that the aspect as a whole is repopulated with empty strings if they are unmapped.

The workarounds are:

-   Map all properties in the batch process
-   Split out your aspects so that unmapped properties are part of different aspects

**Parent topic:**[Installing and configuring Alfresco Kofax Release script](../concepts/kofax-intro.md)

