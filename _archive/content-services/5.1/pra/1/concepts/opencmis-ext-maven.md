---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# Building the Alfresco OpenCMIS Extension with Maven

To use the extension with Maven, you need update your project's pom.xml file to use a Maven repository that contains the extension, and to specify that it has a dependency on the Alfresco OpenCMIS extension.

To specify the Alfresco maven repository, add the following fragment to your pom.xml file:

```

<repositories>
    <repository>
         <id>maven.alfresco.com</id>
         <name>Alfresco Maven Repository</name>
         <url>http://maven.alfresco.com/nexus/content/groups/public/</url>
    </repository>
</repositories>
```

If your pom.xml file already contains a repositories element, just add the specified repository element to that.

To specify the dependency on the Alfresco OpenCMIS extension, add the following fragment to your pom.xml file :-

```

<dependencies>
    <dependency>
        <groupId>org.apache.chemistry.opencmis</groupId>
        <artifactId>chemistry-opencmis-client-impl</artifactId>
        <version>0.13.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

If your pom.xml file already contains a dependencies element, just add the specified dependency element to that.

**Parent topic:**[Using the Alfresco OpenCMIS Extension](../../../pra/1/concepts/opencmis-ext-using.md)

