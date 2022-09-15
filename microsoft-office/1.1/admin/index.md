---
title: Troubleshoot Alfresco Office Services
---

Use this information to troubleshoot common Alfresco Office Services issues.

## Issue with Online Editing

There is a known issue where Online Editing is not available using the 64-bit version of Internet Explorer. See [Plan browser support (SharePoint Server 2010)](https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-server-2010/cc263526(v=office.14)?redirectedfrom=MSDN){:target="_blank"} for more information.

## Error message: "The address is not valid" when connecting to `http://server:port/alfresco/aos`

If you have installed Alfresco manually or upgraded from a previous version of Alfresco, you might not have installed the Alfresco Office Services AMP file. If that is the case, you will receive an error message "The address is not valid" when you try to connect and authenticate with the address: `http://server:port/alfresco/aos`. You will also see the following error message in the server log:

```text
Blocked a directory listing request from MS-Office. This indicates a broken MS-Office
deployment. Please check that the `ROOT` and the `_vti_bin` webapps are deployed properly and
reachable from the outside!
```

To fix this problem, ensure that you have installed the Alfresco Office Services AMP file, which deploys the `_vti_bin.war` file that is required for AOS to work correctly.

## Error or blank screen when accessing web server

If you have not enabled SSL, you might encounter the following error message:

```text
Access to this web server is disabled by default because it is controlled by basic authentication and does not use Secure Socket Layer (SSL).
```

If you are running an old version of Office, you might see nothing after entering the URL in the Office file dialog.

To rectify this problem, we strongly recommend that you activate SSL when using Alfresco Office Services. For more information, see [Configuring SSL]({% link content-services/6.0/config/repository.md %}#ssl-repo).

## Missing version history and check in/ check out options in Office

If you cannot see certain fields in the Document Panel in your Microsoft Office applications; for example, version history, check out and check in history, or you cannot see a directory listing for a file, it might be that your ROOT and `_vti_bin` files have not been deployed properly, or you have not applied the Alfresco Office Services AMP file, if you have installed Alfresco manually.

To check whether this is the case, try to open the ROOT and `_vti_bin` files from a browser. In these examples, replace `server:port` with your server and port details.

If you type:`http://server:port/`, you will see a message **Welcome to Alfresco!**.

If you type: `http://server:port/_vti_inf.html`, you will see a blank page. Select Show page source in the browser to see `_vti_bin` ScriptUrl information.

If you type: `http://server:port/_vti_bin/`, you will see a message Welcome to Alfresco! This is the `/_vti_bin` application. This application does not provide a web interface in the browser..

If these files and messages are not available from the browser, then AOS has not been deployed properly.

See [Install Alfresco WARs]({% link content-services/6.0/install/zip/tomcat.md %}#install-alfresco-wars) for information on where the deployed `ROOT` and `_vti_bin` WAR files need to be located. If `_vti_bin.war` does not exist, you'll need to reinstall the Alfresco Office Services AMP.

## Extra files created when mounting AOS using WebDAV and Mac Finder

Do not mount the AOS repository root (`alfresco/aos` or any sub folder) as a WebDAV folder with Mac Finder. Otherwise you might see extraneous files in Alfresco Share; for example, files prefixed with the characters `._`.

## Microsoft path length limitation

Microsoft Office has a general path length limitation of 250 characters. This affects any external application interacting with Office, not just AOS. Office can handle more than 250 characters in many cases, but Microsoft does not provide official support in these circumstances. These are problems that you might encounter if you use long paths:

* Office reports that a document cannot be registered and OLE linking is deactivated (due to the path length limitation in OLE)
* The browser plug-in does not open a document

Avoid deep folder structures and path lengths over 250 characters, or if you must use long path lengths, test extensively with Office before deploying to a production environment.

## File dialog in Microsoft Office shows file listing instead of graphical view

For untrusted servers, Microsoft Office blocks the graphical web view of files and instead shows the files as a list.

To solve this problem, either:

* On each client machine, in Internet Options or Internet Accounts, add the server in the list of trusted sites
* On your local intranet, modify the rules used to identify servers to include your server

## Check in failure

There is a known problem if property mapping is activated and, in a single MS Office session, you create a new file with the **Save As** option, then check it out and check it back in. The check in will fail in this situation.

To avoid this problem, upgrade to Alfresco, or exclude read-only mandatory properties from the property mapping.

The problem is caused when some mandatory fields are not filled out, but are declared as read-only. This is typically caused by system properties (for example, Creator or Modifier) that come with some system aspects. You can avoid this by overwriting the includedAspectsPatterns configuration to include specific custom aspects only.

## Property mapping failure with Office 2013 and Windows

If you are using Office 2013 and are working with an OLE file (for example, `.doc`, `.xls`, or `.ppt` files), and the Protected View is activated for the document, then property mapping can fail even after switching into Editing Mode.

To resolve this problem, you need to prevent the Protected View in Office by adding the repository server to the list of trusted sites.

## Values of date fields in OLE documents not stored

Values of `Date` and `DateTime` fields are not set in OLE documents (for example, `.doc`, `.xls`, or `.ppt` files) if the time zone of the client machine is greater than UTC+1. If these `Date` or `DateTime` fields are declared as mandatory, then you will not be able to save document changes.

To resolve this problem, you need to either set `Date` and `DateTime` as optional fields, or ensure that the time zone is not greater than UTC+1.

## Problems deploying AOS on JBoss

If you use the JBoss application server, you must customize the web.xml file in the Alfresco ROOT.war, `_vti_bin.war` and `share.war` files to include this code fragment:

```xml
<context-param>
   <param-name>
      org.jboss.jbossfaces.WAR_BUNDLES_JSF_IMPL
   </param-name>
   <param-value>true</param-value>
</context-param>
```

This ensures that the JSF deployer in JBoss uses its own bundled JSF version.

## Fixing 'Edit in Microsoft Office' Issue with AOS when SSO is enabled

### Problem:

After installing AOS module (amp), when user clicks on 'Edit in Microsoft Office Action' (Inline Edit) from 'document-browse' action menu or 'document-details' action menu, following behavior has been noticed:

 - User will see a blank Office application (Word or Excel application without content being displayed)
 - User might be able to open document but will see an error popping-up saying 'Cannot download requested content'

### Cause of the issue:

When user tried to open a document, Microsoft Office Application (AOS) tries to establish a connection from client machine to the alfresco repository server and tries to validates the client certificate that matches with alfresco repository server. This uses Crypto API calls to match certificate using certificate fingerprint.

### Solutions:

Follow the steps outlined below to fix the aforementioned issue:

#### Generating the PKCS12 certificate using JKS certificate:

   - Download certificate from server which is used to configure SSL in tomcat (If certificate has a password then get the password for the root certificate from your certificate provider).
   - Execute command given below to generate the PKCS12 format (.p12) which needs to be imported into client personal certificates:

      ```
      keytool -importkeystore -srckeystore {path_to_JKS_cert} -destkeystore {desired_path_for .p12} -srcstoretype JKS -deststoretype PKCS12 -deststorepass {your_password}
      ```
      1. During the course of the process, you will be prompted to provide the root certificate password (only for the first time). Please provide the root certificate password.
      2. Secondly, you will be prompted to provide a password for `.p12 certificate` (that is being generated). Provide a desired password as per your password policy.
      3. Certificate will be generated and saved to the location of your choice. Keep the newly generated .p12 certificate handy for next steps.


#### Installing the certificate:
   
   1. Use `.p12 certificate` that was generated in previous steps to import into the client machine.
   2. Search for Run Application in your system or press `windows + r` to open run manager.
   3. Enter command `certmgr.msc` and press OK/Enter. You will see certificate manager dialog. See screenshots below.

      
      ![AOS Certificate Fix]({% link microsoft-office/images/run-command-dialog.png %})


      ![AOS Certificate Fix]({% link microsoft-office/images/certificate-manager-dialog.png %})


   4. Click on `Personal` -> `Certificates`
   5. Right click on `Certificates` -> `All Tasks` -> `Import` , To open the certificate import wizard.


      ![AOS Certificate Fix]({% link microsoft-office/images/import-personal-cert-dialog.png %})


   6. Select `.p12 certificate` from your computer and click on `Next`. See screenshots below.

      
      ![AOS Certificate Fix]({% link microsoft-office/images/import-personal-cert-select-dialog.png %})


      ![AOS Certificate Fix]({% link microsoft-office/images/import-personal-cert-selected-dialog.png %})


   7. At this step, you will be see an option to provide a password in certificate import wizard. Provide the password you choose during the PKCS12 certificate generation step (see 2nd point in the generate certificate section) and click `Next`.


      ![AOS Certificate Fix]({% link microsoft-office/images/personal-cert-pass-prompt.png %})


   8. Keep the selection as is to place the certificate in Personal store. 

      ![AOS Certificate Fix]({% link microsoft-office/images/import-personal-cert-saveas-personal.png %})


   9. At this step, the dialog will show the selected `.p12 certificate` path and  `Personal` store as you selected above. Click `Finish` to complete the import process and then Click `OK` to close the prompt. See screenshots below.


      ![AOS Certificate Fix]({% link microsoft-office/images/import-personal-cert-finish.png %})


      ![AOS Certificate Fix]({% link microsoft-office/images/import-personal-cert-finalized.png %})


   10. You should be seeing the "The import was successful" message and newly imported Certificate will be visible in the certificate manager.

   11. Test the 'Edit in Microsoft Office' and it should be working again.
