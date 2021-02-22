---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library, Repository]
---

# Configuring the Repository link

It is possible to control the visibility of the Repository link in Share through configuration. Note the Repository link is always visible to Administrators.

1.  Load the file tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml into your favorite editor \(assuming you are using the Tomcat application server\).

2.  Locate the `Repository Library config` section:

    ```
    
    
       <!-- Repository Library config section -->
       <config evaluator="string-compare" condition="RepositoryLibrary" replace="true">
          <!--
             Root nodeRef or xpath expression for top-level folder.
             e.g. alfresco://user/home, /app:company_home/st:sites/cm:site1
             If using an xpath expression, ensure it is properly ISO9075 encoded here.
          -->
          <root-node>alfresco://company/home</root-node>
    
          <tree>
             <!--
                Whether the folder Tree component should enumerate child folders or not.
                This is a relatively expensive operation, so should be set to "false" for Repositories with broad folder structures.
             -->
             <evaluate-child-folders>false</evaluate-child-folders>
             
             <!--
                Optionally limit the number of folders shown in treeview throughout Share.
             -->
             <maximum-folder-count>500</maximum-folder-count>
          </tree>
    
          <!--
             Whether the link to the Repository Library appears in the header component or not.
          -->
          <visible>true</visible>
       </config>
    
    ```

3.  The configuration that can make the Repository link visible or invisible for non-administrators is the following:

    ```
    
                  
      <visible>false</visible>                
                  
                
    ```

    Set to `true` to have the Repository link available to all users.

4.  Restart the Alfresco server.


**Parent topic:**[Share Document Library](../concepts/share-repodoclib.md)

