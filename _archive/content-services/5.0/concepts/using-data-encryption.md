---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Using encrypted node properties

Node properties can be encrypted in the repository by setting their type to `d:encrypted` in the model.

By default, the node service will not automatically encrypt and decrypt these properties as they pass in and out of the node service. Encryption and decryption should be handled by the trusted custom code \(that uses the `metadataEncryptor`\) running in the repository. Clients, such as Alfresco Share will not automatically be able to decrypt and display encrypted property values.

**Note:** The encrypted node properties will not available in Alfresco Share without the code.

The `org.alfresco.repo.node.encryption.MetadataEncryptor` class \(defined as the Alfresco Spring bean with name `metadataEncryptor`\) provides an interface to encrypt and decrypt encryptable properties. The repository's node integrity checking will ensure that encryptable properties are actually encrypted \(by the `MetaDataEncryptor`\) when the transaction commits. If they are not encrypted, an integrity violation exception is raised.

For example, given the model:

```
<model name="test:encryptedPropModel" xmlns="http://www.alfresco.org/model/dictionary/1.0">
   <description>Alfresco Content Model</description>
   <author>Alfresco</author>
   <published>2005-05-30</published>
   <version>1.0</version>
  
   <imports>
       <import uri="http://www.alfresco.org/model/dictionary/1.0" prefix="d"/>
       <import uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
   </imports>
  
   <namespaces>
       <namespace uri="http://www.alfresco.org/test/encryptedPropModel/1.0" prefix="test"/>
   </namespaces>
  
   <constraints>
   </constraints>
  
........................................................................................................
 
   <types>
     
      <type name="test:encrypted">
         <title>Encrypted</title>
         <description>The Base Type</description>
         <parent>cm:content</parent>
        
         <properties>
            <property name="test:prop1">
               <type>d:encrypted</type>
               <protected>true</protected>
               <default></default>
               <constraints>
               </constraints>
            </property>
         </properties>
        
         <associations>
         </associations>
        
         <mandatory-aspects>
         </mandatory-aspects>
      </type>
     
   </types>
</model>
```

the following code creates a node of type `test:encrypted` using `MetadataEncryptor` to encrypt the property.

```
MetadataEncryptor metadataEncryptor = (MetadataEncryptor)ctx.getBean("metadataEncryptor");

.....................................................................................................

  Map<QName, Serializable> allProperties = new PropertyMap();
  allProperties.put(ENCRYPTED_PROP_QNAME, "ABC");
  allProperties = metadataEncryptor.encrypt(allProperties);
               
  try
   {
     // Create a node using the thread's locale
      NodeRef nodeRef2 = nodeService.createNode(
      nodeRef1,
      ContentModel.ASSOC_CONTAINS,
      QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, getName()),
      ENCRYPTED_TYPE_QNAME, allProperties).getChildRef();
```

The property can be decrypted as follows:

```
Serializable encryptedPropertyValue = nodeService.getProperty(nodeRef2, ENCRYPTED_PROP_QNAME);
Serializable decryptedPropertyValue = metadataEncryptor.decrypt(ENCRYPTED_PROP_QNAME, encryptedPropertyValue);
assertEquals("ABC", decryptedPropertyValue);
```

**Parent topic:**[Encrypted Node Properties](../concepts/encrypted-node-properties.md)

