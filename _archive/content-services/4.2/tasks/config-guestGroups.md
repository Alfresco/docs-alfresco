---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configuring `guestGroups` and `adminGroups` properties

This topic describes how to configure the `guestGroups` and `adminGroups` properties.

1.  Copy the following file:

    <configRoot\>/classes/alfresco/authority-services-context.xml

2.  Paste this file into the <extension\> directory.

3.  Open the authority-services-context.xml file.

    1.  To specify some groups as only guest users in Alfresco, add them to the `guestGroups` property list.

        ```
        <!-- A list of groups with guest rights.    -->
        <!--                                        -->
                <property name="guestGroups">
                    <set>
                    </set>
                </property>
        ```

    2.  To assign admin rights to some groups in Alfresco, add them to the `adminGroups` property list.

        ```
        <!-- A list of groups with admin rights.    -->
        <!--                                        -->
                <property name="adminGroups">
                    <set>
                        <value>ALFRESCO_ADMINISTRATORS</value>
                    </set>
                </property>
        ```


**Parent topic:**[Using guestGroups and adminGroups properties](../concepts/guestGroups.md)

