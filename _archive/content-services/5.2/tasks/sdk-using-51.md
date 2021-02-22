---
author: Alfresco Documentation
---

# Switch to using Alfresco version 5.1.x

Starting from a newly created Alfresco SDK 3.0 project \(All-In-One, Platform JAR, or Share JAR\), let’s replace the two properties with the following ones.

1.  Open the `pom.xml` in your generated project.

2.  Replace the properties with the following:

    ```
    <alfresco.platform.version>5.1.e</alfresco.platform.version>
    <alfresco.share.version>5.1.e</alfresco.share.version>
    <alfresco.surf.version>6.3</alfresco.surf.version>
    ```

    **Note:** If you're using the Alfresco Share JAR archetype, don't specify the `alfresco.platform.version` property.

    In this example we have shown the switch to version `5.1.e`. Feel free to use the correct version for your project, paying attention to the compatible versions of Alfresco Content Services and Alfresco Share.

3.  If you are unclear about which [Alfresco Surf](../references/APISurfPlatform-intro.dita) version should be used, you can search for it in your installed Alfresco folder.

    1.  Search for `spring-surf-api-*.jar` and `spring-surf-*.jar` files in the WEB-INF/lib folder.

    2.  Find the correct version number to replace the asterisks \(i.e. `spring-surf-api-6.3.jar`\).

4.  After changing the versions, delete the `alf_data_dev` folder \(if it exists\).

5.  Restart the project using the `run.sh` script.

    **Note:** For All-In-One projects only: If you used this archetype to generate your project, you may see a warning message when you start Share and access the initial Dashboard. The message informs you that the Share services are not installed. This is a known bug and you can continue to use the project regularly.


**Parent topic:**[Switching Alfresco Content Services and Share versions](../concepts/sdk-switching.md)

