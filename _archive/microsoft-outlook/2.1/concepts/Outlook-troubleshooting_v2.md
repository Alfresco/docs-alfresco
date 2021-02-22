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

In the Alfresco Outlook Client, if you copy a single file to a folder in Alfresco, and then decide to cancel the transfer, the file will still transfer into Alfresco. This is because unless the client-server connection is very slow or the file is very big, the file transfers too quickly to be cancelled. The Cancel action works best when transferring multiple files - the last transferred file will remain in Alfresco, however the other files will not be transferred.

**Unable to connect to Alfresco message**

In the Alfresco Outlook Client, you might see a message indicating that you cannot connect to Alfresco. This is either because your Alfresco repository is not running, or you have isses with your setup. From the Alfresco Client toolbar, check that your Alfresco credentials are correct in Configure \> Connection and click **Check connection**. You can also enable debugging in Configure \> Extended to gain more information on the problem. You will need to provide this log if you need Alfresco support to resolve your problem.

**Parent topic:**[Alfresco Outlook Integration 2.1](../concepts/Outlook-overview.md)

