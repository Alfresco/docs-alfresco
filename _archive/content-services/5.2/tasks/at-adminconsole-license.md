---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Uploading a new license

The access and use of Alfresco Content Services is managed by your license. The license is a file that you upload, which sets limits on the maximum number of users and a maximum number of content objects that you can use. Your limitations are set when you purchase the license. To increase the limitations, contact Alfresco to obtain a new license.

You will receive an email confirming the purchase of your license, and a license file is attached to the email. The license file has a filename of <license-name\>.lic. You use this license file to upload the license restrictions into your system.

Before you upload a new license, ensure that Alfresco Content Services is running and that you can access the Admin Console. When you first run Alfresco Content Services, it defaults to using a 30-day trial license. You must upload your purchased license to run the server before the trial period has expired.

1.  Copy the license file to the directory in which Alfresco Content Services is installed.

    For example, on Windows, copy the file to the C:\\Alfresco directory; on Linux, copy the file to /opt/alfresco-x.x.x.

2.  Open the Admin Console.

3.  In the General section, click **License**.

4.  In the License Management section, choose from where you want to upload the license file.

    There are two options for storing the license:

    **Upload License** which allows you to locate a license file anywhere on your system.

    1.  Click **Upload License**.

        You can then locate and select the license file from the directory structure.

    2.  Select the file, and then click **Upload**.

        The new license will be applied to the repository. This will take precedence over license files on the file system. You might also need to restart the server to enable any features added in the new license.

    **Apply New License** which automatically applies a license file that is stored in the install directory.

    1.  Click **Apply New License**.

        This applies a new license that is stored on the file system. This option will not apply the license if the server has a license uploaded to the repository.


When you have uploaded your license, the .lic file is automatically renamed to <license-name\>.lic.installed.

When your license is about to expire, you must purchase a new license and upload it to your system. When you purchase further licenses, repeat the same steps using the new license file.

**Note:** A license is unique to a specific version. When you upgrade to a new version of Alfresco Content Services, you need to install a new license.

**Note:** In a cluster environment, you can apply the license to a single node and restart all the other nodes to ensure they pick up the changes. If you do not want to restart your nodes you can upload the license to the nodes individually via the Admin Console. The license is shared by all nodes of the cluster.

**Parent topic:**[Working with licenses](../concepts/license-process.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

