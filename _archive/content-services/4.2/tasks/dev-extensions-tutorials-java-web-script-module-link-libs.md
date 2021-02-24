---
author: Alfresco Documentation
---

# Link the library files

In this task you link in the required libraries. The web script Java controller code needs to link against certain library files in order to compile. The main libraries to link against are the Alfresco library files and the Spring Framework library files.

You should have the Alfresco SDK downloaded and also the Spring Framework. Your application needs to link against the various JAR files contained in those downloads.

In Eclipse you will link in the necessary libraries so that your Java class compiles correctly.

1.  In the Package Explorer, right-click the main `FolderListingModule` project folder and select **Build** \> **Configure Build Path**.

2.  Click the **Add JARS...** button.

3.  In the JAR selection dialog browse to the SDK AlfrescoEmbedded folder and select all the JAR files and then click **OK**.

4.  Click the **Add External JARS...** button.

5.  Browse to the folder where you have the Spring Framework installed and open the libs folder.

6.  Select all the JAR files in the libs folder and click **OK**.


You have now linked all necessary libraries and as a result there will no longer be any compile errors showing in Eclipse. In the next task you will create an Ant build script that will allow you to build your module and install it from within Eclipse.

**Parent topic:**[Creating a Java-backed web script module with Ant](../tasks/dev-extensions-tutorials-java-web-script-module.md)

