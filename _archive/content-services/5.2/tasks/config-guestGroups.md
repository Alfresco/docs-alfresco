---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Authentication and Security, Authentication, Administration]
---

# Configuring `guestGroups` and `adminGroups` properties

Use this information to configure the `guestGroups` and `adminGroups` properties.

1.  Download the [authority-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/authority-services-context.xml) file.

2.  Paste this file into the <extension\> directory.

3.  Open the authority-services-context.xml file.

    1.  To specify some groups as only guest users, add them to the `guestGroups` property list.

        ```
        <!-- A list of groups with guest rights.    -->
        <!--                                        -->
                <property name="guestGroups">
                    <set>
                    </set>
                </property>
        ```

    2.  To assign admin rights to some groups, add them to the `adminGroups` property list.

        ```
        <!-- A list of groups with admin rights.    -->
        <!--                                        -->
                <property name="adminGroups">
                    <set>
                        <value>ALFRESCO_ADMINISTRATORS</value>
                    </set>
                </property>
        ```

4.  Save the file and then restart the server.


**Parent topic:**[Using guestGroups and adminGroups properties](../concepts/guestGroups.md)

