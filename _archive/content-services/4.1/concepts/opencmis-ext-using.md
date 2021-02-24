---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# Using the Alfresco OpenCMIS Extension

The Alfresco OpenCMIS Extension depends on the Apache Chemistry OpenCMIS libraries.

You can download the latest OpenCMIS client libraries from the [Apache Chemistry](http://chemistry.apache.org/java/download.html) website. Then download the latest ["Alfresco OpenCMIS Extension" package](http://code.google.com/a/apache-extras.org/p/alfresco-opencmis-extension/downloads/list) and add the jars to your classpath.

If you are using Maven, follow the instructions in [Building the Alfresco OpenCMIS Extension with maven](opencmis-ext-maven.md).

You do not need to be modify OpenCMIS in order to use a different object factory. You just set an additional session parameter to change the object factory class, as shown in the following code fragment:-

```

Map<String, String> parameter = new HashMap<String, String>();

// user credentials
parameter.put(SessionParameter.USER, "admin");
parameter.put(SessionParameter.PASSWORD, "admin");

// connection settings
parameter.put(SessionParameter.ATOMPUB_URL, "http://localhost:8080/alfresco/cmisatom");
parameter.put(SessionParameter.BINDING_TYPE, BindingType.ATOMPUB.value());

// set the alfresco object factory
parameter.put(SessionParameter.OBJECT_FACTORY_CLASS, "org.alfresco.cmis.client.impl.AlfrescoObjectFactoryImpl");

// create session
SessionFactory factory = SessionFactoryImpl.newInstance();
Session session = factory.getRepositories(parameter).get(0).createSession();

```

Now your code can access and update all aspect properties through the standard OpenCMIS interfaces.

-   **[Building the Alfresco OpenCMIS Extension with maven](../concepts/opencmis-ext-maven.md)**  
 To use the extension with Maven, you need update your project's pom.xml file to use a maven repository that contains the extension, and to specify that it has a dependency on the Alfresco OpenCMIS extension.

**Parent topic:**[The Alfresco OpenCMIS Extension](../concepts/opencmis-ext-intro.md)

