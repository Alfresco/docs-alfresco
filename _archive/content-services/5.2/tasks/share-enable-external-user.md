---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Enabling External Users panel

The External Users panel is disabled by default in Alfresco Share. Use this information to enable this panel to add external users.

1.  Open the <web-extension\>/share-config-custom.xml file.

2.  Add the following section to the share-config-custom.xml file.

    ```
    <config evaluator="string-compare" condition="Users" replace="true">
       <enable-external-users-panel>true</enable-external-users-panel>
    </config>
    ```


This implementation enables the External Users panel in the Share user interface.

**Note:** External users are a way for users without Administrator permissions to add a user to Alfresco Content Services. When they accept the invite they will have the same access as a standard user, and will be counted against licensing.

**Parent topic:**[Configuring Alfresco Share](../concepts/share-configuring-intro.md)

