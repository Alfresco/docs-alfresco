---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: [license, .lic, upload]
---

# Uploading a new license

This section describes how to upload a new license.

Before you upload a new license, ensure that Alfresco is running and that you can access the Admin Console. When you first run Alfresco, it defaults to using a 30-day trial license.

You will receive an email confirming the purchase of your license, and a license file is attached to the email. The license file has a filename of <license-name\>.lic. You use this license file to upload the license restrictions into your system.

1.  Copy the license file to the directory in which Alfresco is installed. For example, on Windows, copy the file to the C:\\Alfresco directory; on Linux, copy the file to /opt/alfresco-x.x.x. Alternatively, you can copy the license file to the <extension\_root\>\\license directory. For example, on Windows, copy the file to the C:\\Alfresco\\tomcat\\shared\\classes\\alfresco\\extension\\license directory; on Linux, copy the file to /opt/alfresco/tomcat/shared/classes/alfresco/extension/license directory. If the /license sub-directory does not exist, it will need to be created first.

2.  Open the Admin Console, and then click **License Descriptor**.

3.  On the License Descriptor page, click **Edit**.

    You'll see the Edit: License Descriptor page.

4.  Click **Load License**.

    This uploads the <license-name\>.lic license file that is in the install directory.

    When you have uploaded your license, the .lic file is automatically renamed to <license-name\>.lic.installed.


You can see the new license restrictions in the **License Descriptor** in the Admin Console.

When your license is about to expire, you must purchase a new license and upload it to your system. When you purchase further licenses, repeat the same steps using the new license file.

**Note:** A license key is unique to a specific version of Alfresco. Please note that when you upgrade to a new version of Alfresco, you will need to install a new license key.

**Parent topic:**[Managing your Alfresco license](../concepts/license-manage-intro.md)

