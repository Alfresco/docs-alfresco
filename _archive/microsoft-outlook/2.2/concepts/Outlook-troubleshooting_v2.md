# Troubleshooting Alfresco Outlook Integration

Use this information to help troubleshoot Alfresco Outlook.

**Error when using a hybrid workflow in Alfresco Outlook**

There is a known issue when using hybrid workflows in Alfresco Outlook \(`hybridworkflow.enabled=true`\). This function is currently not available in Alfresco Outlook Integration, and you will receive an error message when you attempt to start a new workflow in the Outlook Client:

```
An error has occurred in this dialog.
Message: 66
Unspecified error.
```

**File transfer is not cancelled when instructed**

In the Alfresco Outlook Client, if you copy a single file to a folder in Alfresco Share, and then decide to cancel the transfer, the file will still transfer into Share. This is because unless the client-server connection is very slow or the file is very big, the file transfers too quickly to be cancelled. The Cancel action works best when transferring multiple files - the last transferred file will remain in Share, however the other files will not be transferred.

**Unable to connect to Alfresco Share message**

In the Alfresco Outlook Client, you might see a message indicating that you can't connect to Share. This is either because your repository is not running, or you have issues with your setup. From the toolbar, check that your sign in details are correct in Configure \> Connection and click **Check connection**. You can also enable debugging in Configure \> Extended to get more information on the issue. You will need to provide this log if you need Alfresco Support to resolve your issue.

**Error on write access from Alfresco Outlook Client to Records Management site**

The Alfresco Outlook Client no longer permits direct write access to a Records Management site. All create and edit related actions in the context menu aren't visible for content in this site. However, the Alfresco Outlook Client still supports read access in the following cases:

-   Search content in the Records Management site from the Alfresco Outlook Client
-   Attach links or binaries from the Records Management site to email
-   Download content from the Records Management site

**Error when declaring a record from within Alfresco Outlook Client**

In the Alfresco Outlook Client, you might see a message stating that you can't declare a record from within the client. This action is no longer supported. However, you can declare content in a collaboration site as a record \(i.e. create an inline record\).

**Parent topic:**[Alfresco Outlook Integration 2.2](../concepts/Outlook-overview.md)

