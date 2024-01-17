---
title: Install Desktop Sync
---

Your Alfresco Administrator can give you a link or location to download the Desktop Sync installation files for Windows and Mac.

{% capture windows %}

If you want to use Desktop Sync on Windows, you'll need:

* Windows 10: 64-bit or 32-bit version
* Windows 7: 64-bit or 32-bit version

To install Desktop Sync, follow these steps.

1. Download the setup file:

    * Windows 64-bit: `Alfresco-Desktop-Sync-Setup-v1.17.x_64.exe`

2. Double-click the downloaded file to run it.

    A wizard will install Alfresco Desktop Sync for you at `C:\Program Files\Alfresco\Alfresco Desktop Sync`.

After the installation is over, the Desktop Sync login screen appears.

### Setting up Desktop Sync on Windows

The first time you open Desktop Sync you need to enter your login details to connect to Alfresco.

1. Open Desktop Sync just as you would any other program by double-clicking the icon on your desktop or opening it through Explorer.

    Speak to your IT team if you need any help.

2. Enter the Alfresco address supplied by your IT team.

    This is the address of the server - make sure the URL provided is the repository URL.

    This could be, for example, `https://alfresco.mycompany.com/alfresco`.

3. When prompted, log in using your user name and password.

4. Click **Sign In**.

    That's it. Your Desktop Sync account is now set.

The **Choose files and folders to sync** screen appears.

![Initial sync selection screen]({% link desktop-sync/images/setup-1.9.png %}){:height="555px" width="346px"}

All your favorite Alfresco content, My Files, Shared Files, and your Alfresco sites are displayed.

{% endcapture %}

{% capture mac %}

If you want to use Desktop Sync on Mac, you'll need:

* Mac OS version 10.13 or later

1. Download the Mac installation file: `Alfresco-Desktop-Sync-v1.17.x.dmg`

2. Double click the downloaded file to unpack the content.

3. Double click the PKG file to start the installation: `Alfresco-Desktop-Sync-v1.17.x.pkg`

    A wizard will install Alfresco Desktop Sync at `/Applications/Alfresco Desktop Sync`.

4. Click **Change Install Location** to choose another location.

    You may be asked to enter your Mac OS X password to complete the installation.

5. Click **Install Software** to continue.

6. Click **Close** to close the setup wizard.

    The Alfresco Desktop Sync icon is added automatically to your `/Applications` folder.

Now you're ready to log in to Desktop Sync and set up your account.

>**Note:** The Desktop Sync Finder Extension does not automatically start in Mac OS Mojave (10.14). To enable the Extension in Mojave, **Relaunch** Finder:
>
>1. Hold the ⌥ (alt/option) key on your keyboard.
>2. Right-click on the **Finder** icon in your Dock.
>3. Click **Relaunch**.

### Setting up Desktop Sync on Mac

The first time you open Desktop Sync you need to enter your login details to connect to Alfresco Content Services.

1. Open Desktop Sync from your **Applications**.

    The Alfresco Desktop Sync login dialog appears. Speak to your IT team if you need any help.

2. Enter the address supplied by your IT team.

    This is the address of the server - make sure the URL provided is the repository URL.

    This could be, for example, `https://alfresco.mycompany.com/alfresco`.

3. When prompted, log in using your user name and password.

4. Click **Sign In**.

    That's it. Your Desktop Sync account is now set.

The **Select sites and folders to sync** dialog appears.

![Initial sync selection screen]({% link desktop-sync/images/setup-mac-1.9.png %}){:height="382px" width="640px"}

All your Alfresco Content Services folders will be displayed from My Files, Shared Files, and your Sites.

### Uninstalling Desktop Sync on Mac

Before uninstalling Desktop Sync for Mac you should first remove your account then drag the application to the Trash. You can then perform a number of checks to verify that the content has been removed cleanly.

1. Click ![alfresco]({% link desktop-sync/images/ico-ds-alfresco.png %}){:height="18px" width="18px"} then ![settings]({% link desktop-sync/images/ds-ico-settings.png %}){:height="18px" width="18px"} to access **Settings**, and select **Remove Account**.

    This removes the content subscriptions, device registration, keychain, databases, etc.

2. Click Quit to shutdown Desktop Sync.

3. Drag the Desktop Sync application from the `Applications` folder to the Trash.

    This ensures that the application is removed cleanly.

4. In Finder, click on the **Go** menu and select **Go to Folder...**.

    A text field appears.

5. Paste the path `~/Library/Application Support` into the text field and click **Go**.

6. Delete the `Alfresco` folder.

    This removes the sync logs, database files, and configuration files.

7. Open `/<userHome>` and delete the `Alfresco` folder.

    This removes any remaining synced content, such as orphaned files, i.e. any content that was in conflict when you removed your account.

    > **Note:** You don't need to uninstall the Desktop Sync client before installing a new version. Simply run the new installer to update the application.

{% endcapture %}

{% include tabs.html tableid="install" opt1="Windows" content1=windows opt2="Mac" content2=mac %}
