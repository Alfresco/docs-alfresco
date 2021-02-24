---
author: Alfresco Documentation
---

# Uploading a new license

When you first run Alfresco, it defaults to using a 30-day trial license. This section describes how to upload your own Alfresco Enterprise license file. The license file sets the capabilities of your Alfresco system.

You will receive an email confirming your access to the [Support Portal](http://support.alfresco.com), where you can retrieve your specific Enterprise license key. For more information on downloading your license key, see the Knowledge Base article in the Support Portal: How can I download my Alfresco Enterprise License File/key?.

The license file has a filename of <license-name\>.lic.

There are two different methods that you can use to upload you license file.

**Parent topic:**[Managing your Alfresco license](../concepts/license-manage-intro.md)

## Uploading your license using the Alfresco Admin Console

Before you start, ensure that Alfresco is running and that you can access the Admin Console.

1.  Copy the license file to the directory in which Alfresco is installed.

    The license file has an extension of .lic.

    For example, on Windows, copy the file to the C:\\Alfresco directory; on Linux, copy the file to /opt/alfresco-x.x.x.

2.  Open the Admin Console, and then click **License Descriptor**.

3.  On the License Descriptor page, click **Edit**.

    You'll see the Edit: License Descriptor page.

4.  Click **Load License**.

    This uploads the <license-name\>.lic license file that is in the install directory.


You have installed your Alfresco license and you can see the new license restrictions in the **License Descriptor** in the Admin Console. Alfresco renames the file to <license-name\>.lic.installed.

## Uploading your license manually

This section is an alternative method of installing the license for Alfresco Enterprise.

This method of installing your license uses a license directory within the installed product. Before you start, ensure that the Alfresco server is not running.

1.  Copy the license file to your machine.

    The license file has an extension of .lic.

2.  Ensure that the Alfresco server is not running.

3.  From your Alfresco installation directory, browse to the <extension\> directory.

    For example, for Tomcat on Windows, this is:

    ```
    C:\Alfresco\tomcat\shared\classes\alfresco\extension
    ```

4.  Create a new directory called license.

5.  Move the .lic file into the new license directory.

6.  Start the Alfresco server.


You have installed the Alfresco license file.

When you run Alfresco, the server detects the existence of the .lic file and installs your license. Alfresco renames the file to <license-name\>.lic.installed.

**Note:** If you are installing Alfresco manually, you may need to add the `dir.license.external` property and directory location in the alfresco-global.properties file. For example, for Tomcat on Windows, add:

```
dir.license.external=C:\Alfresco\tomcat\shared\classes\alfresco\extension\license
```

When your license is about to expire, you must purchase a new license and upload it to your system. When you purchase further licenses, repeat the steps using the new license file.

**Note:** A license key is unique to a specific version of Alfresco. Note that when you upgrade to a new version of Alfresco, you will need to install a new license key.

