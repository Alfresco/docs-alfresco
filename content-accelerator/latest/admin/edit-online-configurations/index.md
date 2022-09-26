---
title: Edit Online Configurations
---

ACA has the capability to edit documents online leveraging either the Google Drive or Microsoft OneDrive cloud solutions. In order to enable this functionality, you must have the **checkoutToCloudService** and **checkinFromCloudService** document actions configured in your trac's DocViewer stage actions.

The configs for these actions will require you to specify either Google Drive or OneDrive as your cloud solution of choice.

Once your cloud solution has been chosen, the following steps must be completed in order to integrate your selected cloud solution with ACA:

## Microsoft OneDrive
1. Navigate to the [Azure Portal](https://portal.azure.com) and login.
1. Search for `App registrations`
1. Create a new App Registration
1. Make sure the audience is set to `Accounts in any organizational directory and personal Microsoft accounts`
1. Select the Authentication section
    - Set up Redirect url(s) (example: https://my.organization.com/ocms/dummy/path).
      - Note that for development, a redirect URL starting with `http://localhost` is acceptable.  All other URLs must start with `https://`.
      - All Hyland demo environments are configured as well as `http://localhost:8080/ocms/dummy/path`
    - Under 'Implicit grant', ensure the `Access tokens` and `ID tokens` checkboxes are checked
1. Select the API Permissions section.  Ensure the following permissions are granted:
    - Microsoft Graph: `user.read, Files.ReadWrite.All, Files.ReadWrite.AppFolder, Files.ReadWrite.Selected, offline_access, openid, Sites.ReadWrite.All`
    - Admin Consent Required - no for all
1. After saving all changes, navigate back to the Overview page and copy the `Application (client) ID`.  This will be needed in the ACA admin (see below).

### SSL Cert Settings
Follow these steps if your version of Java runs into issues with the SSL Certificate, usually manifesting in `PKIX` errors in the log files:

1. Download and install OpenSSL
1. Ensure you are on the same network as the target server
    - For edge/release servers, this just means you need to be on the TSG network (i.e. - on TSG VPN or at the office)
1. From a command prompt, run this command:
    - `openssl s_client -showcerts -host graph.microsoft.com -port 443`
1. For the first certificate returned (there are usually 2), mark the lines starting with `-----BEGIN CERTIFICATE-----` up to `-----END CERTIFICATE-----` and copy them into a text editor and save to a file on the Alfresco server.
1. Run this command on the Alfresco server to add the certificate to the Java keystore:
    - `<ALFRESCO_HOME>\java\bin\keytool.exe -import -trustcacerts -alias <give the certificate an alias> -file <path to file from the previous step> -keystore <ALFRESCO_HOME>\java\lib\security\cacerts`
    - The alias can be anything as long as it's unique
1. When prompted, enter the default keystore password
1. When prompted, type yes to trust the certificate
1. Restart Alfresco

## Google Drive

Reference: https://developers.google.com/identity/protocols/OAuth2UserAgent

1. Create a Google Project:
     * Access the following link: https://console.developers.google.com/apis/dashboard
     * If not already, sign-in to your Google Drive account associated with your ACA application.
     * Click on 'Select a Project' and create a new project from the menu that appears.
2. Enable Drive within your newly created Google Project:
     * Navigate back to the Google API Library
     * From the list of Google APIs, choose 'Google Drive API.'
     * Click 'Enable' on the menu screen that appears.
3. Create a Client ID:
     * Click on the Credentials tab from the Google API Library home.
     * Click on 'Create Credentials' and select 'OAuth client ID' from the dropdown that appears.
     * Select 'Web Application' as the Application Type.
     * In the 'Authorized JavaScript Origin' sections that appears, input the domain origin of your ACA application.
     * Click 'Create' and Google should present you with a Client ID and Client Secret.
4. Copy the Client ID in to ACA to authorize the application access to Google Drive:
     * Navigate to ACA Admin > Views > Stage > {YOUR TRAC} and select DocViewer from the Configure Stage Modules dropdown.
     * In the Available Actions section, select checkinFromCloudService and select 'Google Drive' as your cloud service to Edit online with.
     * Input the Client ID that you generated in the previous step in to the config for this action.
     * Once finished, select checkoutFromCloudService and input the Client ID in to the config for this action.
     * Lastly, select the cancelCheckout action from the list of available action, choose Google Drive as the Cloud Service and input the Client ID in to the GoogleDrive Client ID field.
     * Save the config.

## Configure Action in ACA
### (CheckoutToCloudService, CheckinFromCloudService, CancelCheckout)
1. Select the action.
1. In the `Edit Online With` slider, choose "Office Online" or "Google Drive"
1. For Office online, Enter the Client ID and the Redirect URL from the newly registered Application.
    - Set OneDrive checkout location to `Personal or Organization`. The default is the user's personal OneDrive.
    - Set 'Give Edit Ability' Slider depending on whether you want Share Permissions in OneDrive to be automatically sent to any users with Write Permission on that Document.
    - If Give Edit Ability Slider is set to true, there will be another slider setting whether to send an email to all users with Write permission on the document any time it is checked out to OneDrive. If set to false, the document will simply show up in those users' Shared Folder on OneDrive.
1. For Google Drive, enter the Application ID and choose "Alfresco".  Other repositories can be supported upon client request.
1. Click Save Config.


 