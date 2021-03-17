---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: audit
---

# Example audit trail

Use this example audit trail to understand more about auditing.

User actions from Share:

1.  Create a new folder called **My Documents**.

2.  Upload a document \(The fox.odt\).

3.  Preview the document.

4.  Update the meta data.

5.  Upload a new version.

6.  Copy the document to a folder called **MyPictures**.

7.  Delete the copy of the document.

    In the example, the property values show "..." to indicate that they are truncated.

    ```
    1. /alfresco-access/transaction/action=CREATE
       /alfresco-access/transaction/aspects/add=[cm:titled]
       /alfresco-access/transaction/path=/app:company_home/st:sites/cm:mysite/cm:documentLibrary/cm:My Documents
       /alfresco-access/transaction/properties/add=...
       /alfresco-access/transaction/sub-actions=createNode updateNodeProperties addNodeAspect
       /alfresco-access/transaction/type=cm:folder
       /alfresco-access/transaction/user=admin
    
    2. /alfresco-access/transaction/action=CREATE
       /alfresco-access/transaction/aspects/add=[cm:titled, cm:author]
       /alfresco-access/transaction/path=/app:company_home/st:sites/cm:mysite/cm:documentLibrary/cm:My Documents/cm:The fox.odt
       /alfresco-access/transaction/properties/add=...
       /alfresco-access/transaction/sub-actions=createNode  updateNodeProperties readContent createContent updateContent  addNodeAspect
       /alfresco-access/transaction/type=cm:content
       /alfresco-access/transaction/user=admin
    
    3. /alfresco-access/transaction/action=READ
       /alfresco-access/transaction/path=/app:company_home/st:sites/cm:mysite/cm:documentLibrary/cm:My Documents/cm:The fox.odt
       /alfresco-access/transaction/sub-actions=readContent
       /alfresco-access/transaction/type=cm:content
       /alfresco-access/transaction/user=admin
    
    4. /alfresco-access/transaction/action=updateNodeProperties
       /alfresco-access/transaction/aspects/add=[cm:taggable]
       /alfresco-access/transaction/path=/app:company_home/st:sites/cm:mysite/cm:documentLibrary/cm:My Documents/cm:The fox.odt
       /alfresco-access/transaction/properties/add=...
       /alfresco-access/transaction/properties/from={cm:modified=Mon Jun 13 15:34:05 BST 2011}
       /alfresco-access/transaction/properties/to={cm:modified=Mon Jun 13 15:39:35 BST 2011}
       /alfresco-access/transaction/sub-actions=updateNodeProperties addNodeAspect readContent
       /alfresco-access/transaction/type=cm:content
       /alfresco-access/transaction/user=admin
    
    5. /alfresco-access/transaction/action=CHECK IN
       /alfresco-access/transaction/aspects/add=[cm:versionable]
       /alfresco-access/transaction/copy/from/path=/app:company_home/st:sites/cm:mysite/cm:documentLibrary/cm:My  Documents/cm:The fox (Working Copy).odt
       /alfresco-access/transaction/path=/app:company_home/st:sites/cm:mysite/cm:documentLibrary/cm:My Documents/cm:The fox.odt
       /alfresco-access/transaction/properties/add=...
       /alfresco-access/transaction/properties/from=...
       /alfresco-access/transaction/properties/to=...
       /alfresco-access/transaction/sub-actions=updateNodeProperties  addNodeAspect createVersion readContent deleteNodeAspect updateContent  copyNode checkIn
       /alfresco-access/transaction/type=cm:content
       /alfresco-access/transaction/user=admin
       /alfresco-access/transaction/version=2.0
    
    6. /alfresco-access/transaction/action=COPY
       /alfresco-access/transaction/aspects/add=[cm:titled, cm:copiedfrom, cm:author, cm:taggable]
       /alfresco-access/transaction/copy/from/path=/app:company_home/st:sites/cm:mysite/cm:documentLibrary/cm:My  Documents/cm:The fox.odt
       /alfresco-access/transaction/path=/app:company_home/st:sites/cm:mysite/cm:documentLibrary/cm:My Pictures/cm:The fox.odt
       /alfresco-access/transaction/properties/add=...
       /alfresco-access/transaction/sub-actions=createNode readContent createContent updateNodeProperties addNodeAspect copyNode
       /alfresco-access/transaction/type=cm:content
       /alfresco-access/transaction/user=admin
    
    7. /alfresco-access/transaction/action=DELETE
       /alfresco-access/transaction/path=/app:company_home/st:sites/cm:mysite/cm:documentLibrary/cm:My Pictures/cm:The fox.odt
       /alfresco-access/transaction/sub-actions=deleteNode
       /alfresco-access/transaction/type=cm:content
       /alfresco-access/transaction/user=admin
    ```


**Parent topic:**[Content auditing technical overview](../concepts/audit-content-techdesc.md)

