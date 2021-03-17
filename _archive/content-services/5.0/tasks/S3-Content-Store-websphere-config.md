---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the Alfresco S3 Connector with WebSphere Application Server

If you are using WebSphere Application Server with the Alfresco S3 Connector, you must configure additional settings in the WAS Console.

Configure an isolated shared library for S3 to use to prevent errors when starting Alfresco with WebSphere Application Server.

1.  Create a folder for your shared library.

    For example, WAS\_installation\_directory/s3\_shared\_lib.

2.  Copy the following files from alfresco.war\\WEB-INF\\lib\\ to the new shared library folder:

    -   `httpclient-*<version\>*.jar`
    -   `httpcore-*<version\>*.jar`
    -   `jets3t-*<version\>*.jar`
    -   `commons-codec-*<version\>*.jar`
3.  Navigate to the WAS console: localhost:9060/ibm/console and select Environment \> Shared libraries.

4.  Select the Alfresco application and **Create new shared library**.

5.  Define the new shared library name, for example, s3\_shared\_lib, and for the classpath, choose the folder you created in step 1.

6.  Check **Use an isolated class loader for this shared library**.

7.  Click **Apply** and **Save**.

8.  Navigate to Applications \> Application Types \> WebSphere enterprise applications \> Alfresco \> References \> Shared library references, and check Alfresco module.

    Make sure you do not check Alfresco application.

9.  Click **Reference shared libraries** and add the new shared library name \(s3\_shared\_lib\) to the Selected column.

10. Click **OK** to save all changes.


**Parent topic:**[Configuring the Alfresco S3 Connector](../tasks/S3-Content-Store-connection-config.md)

