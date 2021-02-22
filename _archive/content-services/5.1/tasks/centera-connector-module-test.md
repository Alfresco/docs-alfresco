---
author: Alfresco Documentation
---

# Working with the Alfresco EMC Centera Connector module

Test that the Alfresco EMC Centera Connector module is working correctly with Alfresco.

1.  Enable `DEBUG` logging for the Alfresco EMC Centera Connector components.

    For example:

    ```
    log4j.logger.org.alfresco.enterprise.repo.content.centera=DEBUG
    log4j.logger.org.alfresco.enterprise.repo.centera=DEBUG
    ```

2.  Add the `xam:archived` aspect to the share-config-custom.xml file.

    For example:

    ```
    <alfresco-config>
    
       <config evaluator="node-type" condition="cm:content">
    
          <forms>
             <form>
                <!-- 2 column template -->
    
                <edit-form />
     
                <field-visibility>
    
                <!-- aspect: cm:storeSelector -->
    
                <show id="cm:storeName" />
    
                <!-- aspect: xam:archive -->
                <show id="xam:dateArchived" for-mode="view" />
                <show id="xam:retainUntil" for-mode="view" />
                <show id="cm:content" for-mode="view" />
                </field-visibility>
    
                <appearance>
                   <!-- Store Selector -->
                   <field id="cm:storeName" label="Store Name" description="Content Store Name" />
                   <set id="xam-archive" appearance="bordered-panel" label="XAM Archived" />
                   <field id="xam:dateArchived" label="XAM Date Archived" set="xam-archive" />
                   <field id="xam:retainUntil" label="XAM Retain Until Date" set="xam-archive" />
                </appearance>
             </form>
          </forms>
       </config>
    
    <config evaluator="string-compare" condition="DocumentLibrary">
       <aspects>
             <visible>
                <aspect name="xam:archive" label="XAM Archive" />
             </visible>
       </aspects>
    </config>
    </alfresco-config>
    ```

3.  View the metadata for the document.

    The new store is shown as **xamArchive** and the **retainedUntil** date is set.

4.  Copy the ClipID, and then open the C-Clip using the JCASScript tool.

    For example:

    ```
    CASScript>clipopen EQM2GC012MC77e72B24N2MMFU59G418ACSAIE70BAS340TN3E1JJL
    
    Clip Properties:
    
      Name:                untitled
      Creation Date:       2013.11.27 01:35:09 GMT
      Size:                13474
      Number of Tags:      1
      Number of Blobs:     1
      Retention Class:    
      Retention Seconds:   86396
      Modified:            False
      EBR Enabled :        False
      Retention Hold:      False
    ```

    1.  Check that the retention period was set.

        ```
        CASScript>clipattribs
        
        Number of attributes:  17
        
        Name:   creation.poolid           Value:   861673fa-1dd2-11b2-b535-b66ede9133c1-7
        Name:   retention.period          Value:   86396
        Name:   sdk.version               Value:   3.3.718
        Name:   modification.poolid       Value:   861673fa-1dd2-11b2-b535-b66ede9133c1-7
        Name:   type                       Value:   Standard
        Name:   name                       Value:   untitled
        Name:   creation.date             Value:   2013.11.27 13:35:09 GMT
        Name:   modification.date         Value:   2013.11.27 13:35:12 GMT
        Name:   creation.profile          Value:   armtesting
        Name:   modification.profile      Value:   armtesting
        Name:   numfiles                  Value:   1
        Name:   totalsize                 Value:   13474
        Name:   refid                     Value:   E5S2HABU8PRRBAS340TN3E1JJL
        Name:   clusterid                 Value:   25c57a54-1dd2-11b2-b87c-ce625a7031f2
        Name:   prev.clip                 Value:  
        Name:   clip.naming.scheme         Value:   MD5
        Name:   numtags                   Value:   1
        ```

    2.  Check that the node and application properties have been copied over.

        Select the first tag of the opened C-Clip. For example:

        ```
        CASScript>tagfirst
        
        CASTag Properties:
        
         Name:                com.alfresco.content
         Has Blob:            True
         Blob Size:           13474
         Number of Attributes:10
         Has Parent:          False
         Has Next Sibling:    False
         Has Child:           False
        ```

        Display all the attributes. For example:

        ```
        CASScript>tagattribs
        
        Number of attributes: 10
        
         Name: modified-date   Value: 1385553402696
         Name: com.alfresco.xam.archive.node.sys:ref         Value: workspace://SpacesStore/51bba786-184b-4d7b-8b2a-da90875e5b16
         Name: com.alfresco.xam.archive.app.name             Value: Main Repository
         Name: com.alfresco.xam.archive.node.cm:created       Value: 2013-11-27T15:56:27.011+04:00
         Name: com.alfresco.xam.archive.app.version           Value: 4.2.0 (28)
         Name: com.alfresco.xam.archive.app.db                Value: jdbc:mysql://localhost:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
         Name: com.alfresco.xam.archive.node.sys:path         Value: /app:company_home/st:sites/cm:test/cm:documentLibrary/cm: abc.txt
         Name: com.alfresco.xam.archive.node.cm:creator       Value: admin
         Name: com.alfresco.xam.archive.node.cm:name         Value: abc.txt
         Name: com.alfresco.xam.archive.app.vendor           Value: Alfresco Software
        ```

    3.  Type `tagClose` to close curent tag.

    4.  Type `clipClose` to close current C-Clip.

    5.  Type `poolClose` to close current connection to EMC Centera pool.

5.  Test the folder hierarchy.

    1.  Create a folder containing several files and folders,

    2.  Apply the `xam:archived` aspect to the top-level folder.

    3.  Check that the aspect has been applied to the entire hierarchy.

    4.  Choose one of the files in the hierarchy and check through for a single file from step 1.


**Parent topic:**[Installing and configuring the Alfresco EMC Centera Connector](../concepts/centera-intro.md)

