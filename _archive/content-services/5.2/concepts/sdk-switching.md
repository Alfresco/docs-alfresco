---
author: Alfresco Documentation
---

# Switching Alfresco Content Services and Share versions

The latest version of the Alfresco SDK supports different versions for Alfresco Content Services and Alfresco Share. Since each product is no longer released under one common version number, ACS \(that is, `alfresco.war`\) and the Share UI \(`share.war`\) are now released with individual version numbers.

By default, SDK 3 is configured to generate projects using the most recent version of ACS and Share. You can easily change one \(or both\) versions by simply updating the `pom.xml` file in your project. The compatibility of these versions is up to you, however you should check in advance the right versions to use.

When editing `pom.xml` you will see a number of properties that define the Alfresco Content Services platform version and the Alfresco Share version, such as:

```
<alfresco.platform.version>5.2.e</alfresco.platform.version>
<alfresco.share.version>5.2.d</alfresco.share.version>
```

Note that if you used the Share JAR archetype you will only see the `alfresco.share.version` property. Otherwise, for the All-In-One and Platform JAR archetypes you will see both properties. So if you need to generate projects using different versions then these are the properties to modify.

**Important:** Before continuing, always remember to start from a newly generated SDK project before changing the version numbers. We do not recommend changing the versions using developed customizations or source code.

Use the links below to see more information on how to use the different supported versions.

-   **[Switch to using Alfresco version 5.1.x](../tasks/sdk-using-51.md)**  

-   **[Switch to using Alfresco version 5.0.x](../tasks/sdk-using-50.md)**  

-   **[Switch to using Alfresco version 4.2.x](../tasks/sdk-using-42.md)**  


**Parent topic:**[Advanced topics](../concepts/sdk-advanced-topics.md)

