---
title: Install Salesforce Connector
---

You now have a choice of selecting your organization's user interface experience: Salesforce Classic UI or the new Salesforce Lightning UI.

The Lightning Experience offers a more streamlined user experience by providing tools to create components that are reusable across applications and devices.

To begin, [install the AMP files](#installamps) and then [install the app in Salesforce](#installapp). Depending on what's the best layout for your organization, choose one of the following UIs:

* [Install Salesforce Connector - Lightning Experience](#install-lightning)
* [Install Salesforce Connector - Classic](#installclassic)

## Prerequisites

There are a number of software requirements for using the Salesforce Connector.

### Alfresco requirements

* Alfresco Content Services 6.2.1 or later
* Identity Service 1.3 or later (if you plan to use Single Sign On (SSO))

### Salesforce requirements

Salesforce Group is the minimum requirement. See [Salesforce Connected Apps](https://help.salesforce.com/apex/HTViewHelpDoc?id=connected_app_overview.htm){:target="_blank"} for guidance on levels of Salesforce required with connected apps.

### Java requirements

* OpenJDK 11 and above.

### Other requirements

Your Salesforce and Alfresco instances must be on a shared network or otherwise accessible in order to share information.

## Step 1: Install AMP files {#installamps}

Download and install the AMP files to connect to Salesforce.

Make sure you are running the correct versions of operating system and software before you install the AMP files. See [Prerequisites for using Salesforce Connector](#prerequisites) for more information.

1. Stop the Alfresco server.

2. Browse to the [Alfresco Support Portal](https://support.alfresco.com/){:target="_blank"}, and download and unzip the Salesforce zip package.

3. Copy the provided AMP files to the Alfresco amps and amps_share directories.

    Copy this file to the `amps` directory:

    * `alfresco-content-connector-for-salesforce-repo-2.2.x.amp`

    Copy this file to the `amps_share` directory:

    * `alfresco-content-connector-for-salesforce-share-2.2.x.amp`

4. To install the AMP files, run the `apply_amps.bat` file from the Alfresco `bin` directory.

    Check the output from the script to ensure that the AMP files have installed successfully.

5. Restart the Alfresco server.

6. If you are running Alfresco One 5.1 or later, check for any `Aikau * Module Config.xml` files, and delete them.

    Use the Node Browser (`http://host:port/alfresco/s/enterprise/admin/admin-nodebrowser` for Alfresco One 5.0 and `http://host:port/alfresco/s/admin/admin-nodebrowser` for Alfresco One 5.1) using this `xpath`:

    ```text
    /app:company_home/st:sites/cm:surf-config/cm:module-deployments
    ```

7. Locate the `share-config-custom.xml.sample` file.

    This sample configuration file is shipped with in Salesforce zip file and shows the required rules (and properties) that need to be added to the `CSRFPolicy` to allow Salesforce logouts.

    1. If you are using Alfresco Share as your service provider, and you have custom `CSRFPolicy` configurations in your installation, copy and paste the `SALESFORCE SPECIFIC CONFIG` section of the sample file into your custom `CSRFPolicy` filter, and save.

    2. If you have a `share-config-custom.xml` file in your Alfresco Share installation, merge the contents of `share-config-custom.xml.sample` into your `share-config-custom.xml` file, and save.

    3. Alternatively, if you do not have a `share-config-custom.xml` in your Alfresco Share installation, rename `share-config-custom.xml.sample` to `share-config-custom.xml`.

    4. Review the details in the `CSRFPolicy` section for accuracy.

8. Test that the AMPs have been applied successfully.

    Using your administrator logon, go to:

    ```html
    http://localhost:8080/alfresco/s/enterprise/admin/admin-salesforce
    ```

    where `localhost` is your Alfresco host name, and `8080` is your port number. You'll see the Salesforce settings that you will need to link Alfresco to Salesforce.

9. Create a new site to hold your Salesforce content.

    Log on to Alfresco:

    ```html
    http://localhost:8080/share
    ```

    where `localhost` is your Alfresco host name, and `8080` is your port number. Follow these instructions: [Creating sites]({% link content-services/latest/using/sites/index.md %}#creating-a-site). You can use this as your default site for Salesforce.

## Step 2: Install the Salesforce connector app {#installapp}

The Alfresco Content Connector app is available on the Salesforce AppExchange.

This task assumes that you are installing the app through the AppExchange.

If you've been provided a URL to install the Salesforce Connector, log in to Salesforce, and paste the URL you've been given into your browser. Select the required security level option, click **Install**, and then click **Done** when the installation is complete.

1. Search for Alfresco Content Connector in the [Salesforce AppExchange](https://appexchange.salesforce.com/){:target="_blank"}, and download the app.

    >**Note:** You'll need to log in the AppExchange first.

2. Click **Get it Now** to download.

3. Confirm whether you want to **Install in production** or **Install in sandbox** environment.

    Selecting **Install in production** will install the Alfresco Content Connector to your live Salesforce environment.

4. Read the terms and conditions then click **Confirm and Install**.

    >**Note:** You might be prompted to re-enter your Salesforce login details.

    The Package Installation Details screen displays the package details, including the package name, version name, version number, the publisher name, description of the application, and the package components.

5. Click **Continue**.

6. Select the required security level option in the **Choose security level** screen.

    You have three options:

    * **Install for Admins Only**
    * **Install for All Users**
    * **Install for Specific Profiles...**

7. Click **Next**, then on the next screen click **Install**.

8. Click **Done** when the installation is complete.

    After a few seconds the Install Complete screen displays confirming that the Alfresco Content Connector is installed.

    From here you can choose to **View Components**, **View Dependencies**, or **Uninstall**.

Depending on what's the best layout for your organization, you can choose either to [Install the Salesforce Connector - Lightning Experience](#install-lightning) or [Install the Salesforce Connector - Classic](#installclassic).

## Install Salesforce Connector - Lightning Experience {#install-lightning}

Use this information to install the AMP files in Alfresco, and the Alfresco App in Salesforce with the Lightning Experience UI.

### Step 3: Configure app in Salesforce {#configappinsalesforce-lightning}

After you've installed the app, create a new connected app definition using the Salesforce Setup menu.

Make sure that you've downloaded the Alfresco Content Connector app, as described in [Step 2: Install the app in Salesforce](#installapp). In this task, you'll use the Setup menu in Salesforce to customize the install. You need administrator rights to make these changes.

1. In your Salesforce account, find Setup. This is accessible by clicking the gear icon, ![]({% link salesforce/images/gear.png %}){:height="18px" width="18px"}, from the top-right toolbar on the Salesforce page.

    See [Explore the Salesforce Setup Menu](https://help.salesforce.com/articleView?id=basics_nav_setup.htm&type=5){:target="_blank"} for more guidance on where to find this.

    Search for Apps in the Quick Find search bar, and click **App Manager** to see your installed apps.

2. Click **New Connected App** to create a new connected app.

    ![salesforce-connected-app]({% link salesforce/images/salesforce-connected-app.png %})

    This new app extends the standard connector to work for your organization. Use the following settings:

    1. **Connected App Name**: Name your app something memorable and unique; for example, `Alfresco On-Premise`
    2. **API Name**: Choose a meaningful name. This is the name used by the API and managed packages. The name must be less than or equal to 40 characters.

        >**Note:** A suggested name is `Alfresco_for_Salesforce`. You'll need to remember the API Name when you configure the Alfresco Setup tab.

        >**Note:** If this is not set up correctly, you'll see an error message. See [Troubleshooting]({% link salesforce/latest/using/troubleshoot.md %}) for guidance.

    3. **Contact Email**: Enter an administrator email address.
    4. Check **Enable OAuth Settings**.
    5. **Callback URL**: this field is not used, but does need to be completed. You can set this to `https://www.alfresco.com/dummy_callback`.
    6. In **Selected OAuth Scopes** add the following scopes:

        * `Full access (full)`
        * `Perform requests on your behalf at any time (refresh_token, offline_access)`

    7. Check **Force.com Canvas**.
    8. In **Canvas App URL**, enter a secure (https) URL that points to the Alfresco Share environment, that you have configured with the Alfresco Content Connector. You also need a suffix of `share/page/sfdc/canvas/signedrequest`. For example:

        ```html
        https://localhost:8443/share/page/sfdc/canvas/signedrequest
        ```

    9. **Access Method**: Select Signed Request (POST)
    10. Add these **Locations**:

        * `Chatter Tab`
        * `Layouts and Mobile Cards`
        * `Lightning Component`
        * `Visualforce Page`

        These are locations in Salesforce where the canvas app can be displayed.

    11. In **Lifecycle Class**, look up the options and select `AlfrescoCanvasLifeCycleHandler`.
    12. Click **Save** to save your settings.

    Next, you’ll need to manage the connected app that you've just created.

3. For the new connected app, click **Manage** to set permissions and accessibility.

4. In the OAuth policies section, enter these values:

    1. **Permitted Users**: Select `Admin approved users are pre-authorized`.
        Click **OK** to accept the Salesforce message.
    2. **IP Relaxation**: Select `Enforce IP restrictions`.
    3. **Refresh Token Policy**: Select the `Refresh token is valid until revoked` radio button.
    4. **Save** your settings.

5. In the Manage Profiles section, click **Manage Profiles**, check the required profiles, and **Save** your settings.

    For example, select `System Administrator` and `Standard User`. We'll now find the consumer secret ready to paste into Alfresco.

### Step 4: Enable Salesforce in the Admin Console

You'll need to copy the Salesforce consumer key and consumer secret from your connected app into the Alfresco Admin Console. These credentials prove that Alfresco has permission to be displayed in and communicate with Salesforce.

Make sure that you've applied your AMP files, downloaded the Alfresco Content Connector app, and created a connected app, as described in the previous sections. You need administrator rights to make these changes.

1. In your Salesforce account, click the gear icon ![]({% link salesforce/images/gear.png %}){:height="18px" width="18px"} from the top-right toolbar on the Salesforce page, and click **Setup Home**.

2. Under **PLATFORM TOOLS**, click **Apps > App Manager**.

3. On the **Lightning Experience App Manager** screen, click the down-arrow icon for the app that you created in [Step 3: Configure the app in Salesforce](#configappinsalesforce-lightning) and select View.

    ![sf-view]({% link salesforce/images/sf-view.png %})

    In the **API (Enable OAuth Settings)** section, you'll see entries for the consumer key and consumer secret.

4. Copy the code in the **Consumer Key** field.

5. In a separate browser window, log on to the Salesforce page of the Alfresco Admin Console with your administrator credentials:

    ```html
    http://localhost:8080/alfresco/service/enterprise/admin/admin-salesforce
    ```

    where `localhost:8080` is your Alfresco host name and port.

6. In the Admin Console window, paste your Salesforce consumer key into **Salesforce Consumer Token**.

7. In the Salesforce window, click **Click to reveal** to reveal the consumer secret, and copy the code.

    ![sf-consumerkey]({% link salesforce/images/sf-consumerkey.png %})

8. Paste your Salesforce consumer secret into **Salesforce Consumer Secret**.

    You can optionally hide the password when you have pasted it into the Admin Console.

9. Select the **Salesforce Environment Type** that Alfresco should use. There are two options: `Production (the default value)` and `Sandbox`.

    ![sf-adminconsole]({% link salesforce/images/sf-adminconsole.png %})

10. You can optionally change the list size of records that are displayed.

    Enter a number in **Recently Viewed Records List Size** to specify how many recent Salesforce records are displayed when you link an Alfresco file or folder with a record. The default setting is 20 records.

    >**Note:** Alternatively, you can set this in your `alfresco-global.properties` file using `sfdc.canvas.recordMruSize`. For example:
    >
    >```text
    >sfdc.canvas.recordMruSize=10
    >```

11. **Save** your settings.

### Step 5: Add an Alfresco site and map metadata in Salesforce

Configure the Alfresco site that you want to point to, and map your metadata.

Make sure that you've downloaded the Alfresco Content Connector app, as described in [Step 2:. Install the app in Salesforce](#installapp). You need administrator rights to make these changes.

1. In Salesforce, click **Alfresco Content Connector**. This is available from the **App Launcher**.

2. Click the **Alfresco Setup** tab and in **API Name**, enter the API name of the connected app definition you created in [Step 3: Configure the app in Salesforce](#configappinsalesforce-lightning).

    >**Note:** The API name must be less than or equal to 40 characters.

    If your API name appears as `Alfresco_Content_Connector_for_Salesforce`, then you must to change it to `Alfresco_for_Salesforce`.

    This sets the Alfresco site that you want to use for your content. If this isn't set up correctly, you'll see an error message. See [Troubleshooting]({% link salesforce/latest/using/troubleshoot.md %}) for guidance.

3. You'll see two tabs; **Site to Object Mapping** and **Metadata Mapping**. Select a tab and you'll see the Alfresco login screen. Log in to your connected Alfresco instance.

    This is a sample screen, before logging in:

    ![salesforce_admin_tab]({% link salesforce/images/salesforce_admin_tab.png %})

    The **Site to Object Mapping** and **Metadata Mapping** tabs set where Salesforce puts content in Alfresco.

    >**Note:** Metadata mapping is available with Alfresco One 5.1 and later versions only.

    It can take a little while for Alfresco to load the first time you log in, or after an Alfresco server restart.

4. In **Site to Object Mapping**:

    1. Click **Set Default Site** and choose the site that you want to set as the default entry point for your organization, and **Save**.

    2. Click **Add New Mapping** to specify where content of a specific Salesforce object type should be stored in Alfresco. Pick a site and an object type that maps to that site.

        For example, you can map documents with a Contracts object type to a site that contains only contracts in Alfresco, or you can map sensitive HR data to an HR object type. Your mappings are then displayed in a table.

5. In **Metadata Mapping**:

    1. Choose a Salesforce object and select from the list of associated properties.

        This defines what Salesforce properties or metadata that you want to share with Alfresco.

    2. Click **OK**.

        A new Salesforce object type is created, with a matching Alfresco model with an associated aspect, and the specified properties. This creates a new model in Alfresco.

    You can enable or disable an object model. If a model is:

    * `Enabled`: metadata is synchronized with the Alfresco object model.
    * `Disabled`: metadata can't be synchronized with the Alfresco object model.

    >**Note:** Models are inactive when they are added to Salesforce, and can be deleted while they're inactive. A model can be explicitly activated and deactivated. A model can be deleted only if it's deactivated and has not been used. If the model has been used and a user attempts to delete it, an error message is issued explaining that it can't be removed. See [Content modeling with Model Manager]({% link content-services/latest/config/models.md%}) for more.

    >**Note:** Do not edit the prefix of a Salesforce model, as this can make your model unusable. Also, do not update the model in the Model Manager in Share.

    Here is an example of a completed Alfresco Setup tab:

    ![site_and_metadata]({% link salesforce/images/site_and_metadata.png %})

### Step 6: Add the Alfresco app using a Salesforce Lightning Component {#addappusinglightningcomponent}

To allow the Alfresco Content Connector to appear in the Lightning experience view of Salesforce you need to add a Salesforce lightning component.

Make sure that you've downloaded the Alfresco Content Connector app, as described in [Step 2: Install the app in Salesforce](#installapp). You need administrator rights to make these changes. You also need to have a custom Salesforce domain that has been deployed and activated for your users, for more see [Configure SSO for Salesforce]({% link salesforce/latest/config/index.md %}#prereqs).

To create the Lightning Component follow these steps:

1. Login to Salesforce Lightning view with an administrator account.

2. Click the gear icon ![gear]({% link salesforce/images/gear.png %}){:height="18px" width="18px"} from the top-right toolbar on the Salesforce page and select **Developer Console**.

3. Go to **File > New > Lightning Component**.

    You will see the New Lightning Bundle window.

4. Enter a Name and a Description and click **Submit**.

    >**Note:** You do not need to select any of the check boxes.

5. Select the Component part of the bundle by clicking **COMPONENT** in the right hand pane.

6. Remove any code already in there, and copy and paste the following code snippet into the window.

    ```xml
    <aura:component implements="flexipage:availableForRecordHome,force:hasRecordId,force:hasSObjectName">
        <aura:attribute name="canvasParameters" type="string" />
        <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
        <force:canvasApp developerName="THE NAME OF YOUR CANVAS APP" height="450px" width="1300px" parameters="{!v.canvasParameters}"/>
    </aura:component>
    ```

7. Edit the code and add the name of your **Canvas App** as the value of the `developerName` property.

8. Select the Controller part of the bundle by clicking **CONTROLLER** in the right hand pane.

9. Remove any code already in there, and copy and paste the following code snippet into the window.

    ```json
    ({
        doInit : function(cmp, evt, helper) {
            var recordId = cmp.get("v.recordId");
            var sObjectName = cmp.get("v.sObjectName");
            cmp.set("v.canvasParameters", JSON.stringify({
                recordId: recordId,
                type: sObjectName
            }));
        }
    })
    ```

10. Click **File** and **Save All**.

11. Edit your Record page by clicking the gear icon ![gear]({% link salesforce/images/gear.png %}){:height="18px" width="18px"} and then clicking **Edit**.

12. Under the Custom heading in the left hand pane drag over and then drop the component into the desired location on the Activity tab of the Record page.

    >**Note:** If your Component is not visible you will see a message that will instruct you to deploy your domain.

13. Click the Activation button on the top right, to activate your change.

    Review the Activation Opportunity Record Page and assign the level you want for this component.

14. Click **Close**.

15. Click the **Save** button on the top right and then the Salesforce **Back** button directly above it.

    The component is now ready to use.

## Install Salesforce Connector - Classic {#installclassic}

Use this information to install the AMP files in Alfresco, and the Alfresco App in Salesforce with the Classic UI.

### Step 3: Configure app in Salesforce {#configappinsalesforce-classic}

After you've installed the app, create a new connected app definition using the Salesforce Setup menu.

Make sure that you've downloaded the Alfresco Content Connector app, as described in [Install the app in Salesforce](#installapp). In this task, you'll use the Setup menu in Salesforce to customize the install. You need administrator rights to make these changes.

1. In your Salesforce account, find **Setup**. This is often on the toolbar or under your name (see [Explore the Salesforce Setup Menu](https://help.salesforce.com/articleView?id=basics_nav_setup.htm&type=5){:target="_blank"} for more guidance on where to find this).

    Search for Apps in the Quick Find search bar, and in **App Setup** click **Create > Apps** to see your installed apps.

2. Scroll down to **Connected Apps** and click **New** to create a new connected app.

    ![salesforce_connected_apps]({% link salesforce/images/salesforce_connected_apps.png %})

    This new app extends the standard connector to work for your organization. Use the following settings:

    1. **Connected App Name**: Name your app something memorable and unique; for example, `Alfresco On-Premise`
    2. **API Name**: Choose a meaningful name. This is the name used by the API and managed packages. The name must be less than or equal to 40 characters.

        >**Note:** A suggested name is `Alfresco_for_Salesforce`. You'll need to remember the API Name when you configure the **Alfresco Setup** tab.

        >**Note:** If this is not set up correctly, you'll see an error message. See [Troubleshooting]({% link salesforce/latest/using/troubleshoot.md %}) for guidance.

    3. **Contact Email**: Enter an administrator email address.
    4. Check **Enable OAuth Settings**.
    5. **Callback URL**: this field is not used, but does need to be completed. You can set this to `https://www.alfresco.com/dummy_callback`.
    6. In **Selected OAuth Scopes** add the following scopes:
        * `Full access (full)`
        * `Perform requests on your behalf at any time (refresh_token, offline_access)`
    7. Check **Force.com Canvas**.
    8. In **Canvas App URL**, enter a secure (https) URL that points to the Alfresco Share environment, that you have configured with the Alfresco Content Connector. You also need a suffix of `share/page/sfdc/canvas/signedrequest`. For example:

        ```html
        https://localhost:8443/share/page/sfdc/canvas/signedrequest
        ```

    9. **Access Method**: Select `Signed Request (POST)`
    10. Add these **Locations**:

        * `Chatter Tab`
        * `Layouts and Mobile Cards`
        * `Visualforce Page`

        These are locations in Salesforce where the canvas app can be displayed.

    11. In **Lifecycle Class**, look up the options and select `AlfrescoCanvasLifeCycleHandler`.
    12. Click **Save** to save your settings.

    Next, you’ll need to manage the connected app that you have just created.

3. For the new connected app, click **Manage** to set permissions and accessibility.

4. In the **OAuth policies** section, enter these values:

    1. **Permitted Users**: Select `Admin approved users are pre-authorized`.
        Click **OK** to accept the Salesforce message.
    2. **IP Relaxation**: Select `Enforce IP restrictions`.
    3. **Refresh Token Policy**: Select the `Refresh token is valid until revoked` radio button.
    4. **Save** your settings.

5. In the **Manage Profiles** section, click **Manage Profiles**, check the required profiles, and **Save** your settings.

    For example, select **System Administrator** and **Standard User**. We will now find the consumer secret ready to paste into Alfresco.

### Step 4: Enable Salesforce in the Admin Console

You'll need to copy the Salesforce consumer key and consumer secret and from your connected app into the Alfresco Admin Console. These credentials prove that Alfresco has permission to be displayed in and communicate with Salesforce.

Make sure that you've applied your AMP files, downloaded the Alfresco Content Connector app, and created a connected app, as described in the previous topics. You need administrator rights to make these changes.

1. In your Salesforce Setup menu, click **Create > Apps**, and then the connected app name that you created in [Step 3: Configure the app in Salesforce](#configappinsalesforce-classic).

    In the **API (Enable OAuth Settings)** section, you'll see entries for the consumer key and consumer secret.

2. Copy the code in the **Consumer Key** field.

3. In a separate browser window, log on to the Salesforce page of the Alfresco Admin Console with your administrator credentials:

    ```html
    http://localhost:8080/alfresco/service/enterprise/admin/admin-salesforce
    ```

    where `localhost:8080` is your Alfresco host name and port.

4. In the Admin Console window, paste your Salesforce consumer key into **Salesforce Consumer Token**.

5. In the Salesforce window, click **Click to reveal** to reveal the consumer secret, and copy the code.

6. Paste your Salesforce consumer secret into **Salesforce Consumer Secret**.

    You can optionally hide the password when you have pasted it into the Admin Console.

7. Select the Salesforce Environment type that Alfresco should use. There are two options: **Production** (the default value) and **Sandbox**.

8. You can optionally change the list size of records that are displayed.

    Enter a number in **Recently Viewed Records List Size** to specify how many recent Salesforce records are displayed when you link an Alfresco file or folder with a record. The default setting is 20 records.

    >**Note:** Alternatively, you can set this in your `alfresco-global.properties` file using `sfdc.canvas.recordMruSize`. For example:
    >
    >```text
    >sfdc.canvas.recordMruSize=10
    >```

9. **Save** your settings.

### Step 5: Add an Alfresco site and map metadata in Salesforce

Configure the Alfresco site that you want to point to, and map your metadata.

Make sure that you've downloaded the Alfresco Content Connector app, as described in [Step 2: Install the app in Salesforce](#installapp). You need administrator rights to make these changes.

1. In Salesforce, click **Alfresco Content Connector**. This is available from the **Force.com** App Menu.

2. Click the **Alfresco Setup** tab and in **API Name**, enter the API name of the connected app definition you created in [Configure the app in Salesforce](#configappinsalesforce-classic).

    >**Note:** The API name must be less than or equal to 40 characters.

    If your API name appears as `Alfresco_Content_Connector_for_Salesforce` then you must to change it to `Alfresco_for_Salesforce`.

    This sets the Alfresco site that you want to use for Alfresco content. If this is not set up correctly, you'll see an error message. See [Troubleshooting]({% link salesforce/latest/using/troubleshoot.md %}) for guidance.

3. You'll see two tabs; **Site to Object Mapping** and **Metadata Mapping**. Select a tab and you'll see the Alfresco login screen. Log on to your connected Alfresco instance.

    This is a sample screen, before logging on to Alfresco:

    ![salesforce_admin_tab]({% link salesforce/images/salesforce_admin_tab.png %})

    The **Site to Object Mapping** and **Metadata Mapping** tabs set where Salesforce puts content in Alfresco.

    >**Note:** Metadata mapping is available with Alfresco One 5.1 and later versions only.

    It can take a little while for Alfresco to load the first time you first log in, or after an Alfresco server restart.

4. In **Site to Object Mapping**:

    1. Click **Set Default Site** and choose the site that you want to set as the default entry point for your organization, and **Save**.

    2. Click **Add New Mapping** to specify where content of a specific Salesforce object type should be stored in Alfresco. Pick a site and an object type that maps to that site.

        For example, you can map documents with a Contracts object type to a site that contains only contracts in Alfresco, or you can map sensitive HR data to an HR object type. Your mappings are then displayed in a table.

5. In **Metadata Mapping**, choose a Salesforce object and select from the list of associated properties.

    This defines what Salesforce properties or metadata that you want to share with Alfresco. Click OK and a new Salesforce object type is created, with a matching Alfresco model with an associated aspect, and the specified properties. This creates a new model in Alfresco.

    You can enable or disable an object model. If a model is:

    * `Enabled`: metadata is synchronized with the Alfresco object model.
    * `Disabled`: metadata can't be synchronized with the Alfresco object model.

    >**Note:** Models are inactive when they are added to Salesforce, and can be deleted while they are inactive. A model can be explicitly activated and deactivated. A model can be deleted only if it is deactivated and has not been used. If the model has been used and a user attempts to delete it, an error message is issued explaining that it can't removed. See [Content modeling with Model Manager]({% link content-services/latest/config/models.md %}) for more.

    >**Note:** Do not edit the prefix of a Salesforce model, as this can make your model unusable.

    Here is an example of a completed Alfresco Setup tab:

    ![site_and_metadata]({% link salesforce/images/site_and_metadata.png %})

### Step 6: Add the Alfresco app in Salesforce

There are two ways to add the Connector in Salesforce Classic: As a [Canvas Component](#configappinsalesforce-classic-cavnas) or as a [Visualforce Page](#configappinsalesforce-classic-visualforce)

#### Add the Alfresco app in Salesforce (Canvas Component) {#configappinsalesforce-classic-cavnas}

Lastly, you'll need to load the Alfresco canvas app for page layouts. You can add the app to any record type that supports layouts (for example; Accounts, Cases, and Opportunities). This is done by setting Alfresco for Salesforce example page layouts as the default for selected user profiles.

Make sure that you've downloaded the Alfresco Content Connector app, as described in [Step 2: Install the app in Salesforce](#installapp). You need administrator rights to make these changes.

1. In your Salesforce account, find **Setup**. This is often on the toolbar or under your name (see [Explore the Salesforce Setup Menu](https://help.salesforce.com/articleView?id=basics_nav_setup.htm&type=5){:target="_blank"} for more guidance on where to find this).

    Search for `Page Layouts` in the Quick Find search bar, and in **App Setup > Customize**, choose the page layout for your selected page type (for example, Accounts).

2. Click **Edit** next to the layout you want and add the Alfresco app to the layout:

    1. From the available components in the scrollable window, select **Canvas Apps**.

    2. You might need to add a new section, depending on your page layout.

        If you need to add a new section, set it to **1-Column** with a minimum height of 350 pixels (400 pixels is the recommended height). Click **OK**. Drag and drop the section onto your layout, and save the changes, before adding the new canvas app.

    3. Click the canvas app that matches the Alfresco Content Connector connected app that you created in [Step 3: Configure the app in Salesforce](#configappinsalesforce-classic), and drag it to where you want it on your page.

        You can add a canvas app only once to a page. If you've already added the app, Salesforce shows you where on the page it has been added.

        ![salesforce_canvas_app]({% link salesforce/images/salesforce_canvas_app.png %})

    4. Set the canvas app to display in **1-Column** with a minimum height of 350 pixels (400 pixels is the recommended height), and click **OK**.

        If the Alfresco widget is too small, you can't see all the buttons and elements. For instance, it is not possible to log in as the buttons are not visible.

    5. Save your changes.

        It can take a little while for the Alfresco widget to load for the first time.

    6. Open a record that has the new page layout. You should now be able to see an Alfresco section, with a **Files** tab. You can add files here by dragging and dropping them, or by using the **Upload** button.

        You can also add new folders with the **Create** button. Equally, any files added in Alfresco can be seen in this window. This content is stored directly in Alfresco and can be viewed either in Salesforce, or in your usual Alfresco site.
        
#### Adding the Alfresco app in Salesforce (Visualforce Page) {#configappinsalesforce-classic-visualforce}

Lastly, you'll need to load the Alfresco canvas app for page layouts. You can add the app to any record type that supports layouts (for example; Accounts, Cases, and Opportunities). This is done by setting Alfresco for Salesforce example page layouts as the default for selected user profiles.

Make sure that you've downloaded the Alfresco Content Connector app, as described in [Step 2: Install the app in Salesforce](#installapp). You need administrator rights to make these changes.

To create the Visualforce Pages for each object where you want the app to appear, follow these steps:

1. In your Salesforce account, find Setup. This is accessible by clicking the gear icon ![gear]({% link salesforce/images/gear.png %}){:height="18px" width="18px"} from the top-right toolbar on the Salesforce page. See [How to find Setup](https://help.salesforce.com/apex/HTViewHelpDoc?id=basics_nav_setup.htm){:target="_blank"} for more guidance.

    From Setup, enter Visualforce Pages in the Quick Find search bar and then select **Visualforce Pages**.

2. Click **New** to open the Visualforce Page editor.

    1. Enter a **Label** for the page. The label is displayed where the page appears in the page layout.

    2. Enter a **Name** for the page.

    3. Check **Available for Salesforce mobile apps and Lightning Pages**.

        ![sf-visualforce-page]({% link salesforce/images/sf-visualforce-page.png %})

    4. Copy and paste the following code in the **Visualforce Markup** editor:

        ```xml
        <apex:page standardController="{Your Object Name}">
            <apex:canvasApp id="AlfCanvas" applicationName="{Your Connected App API Name}" width="100%" height="450px" scrolling="auto"/>
        </apex:page>
        ```

        >**Note:** Replace `{Your Object Name}` with the `sObject` or `custom object API` name where you want the app to appear. For example, `Account`, `Lead`, `Asset`, or `training__c`.
        >**Note:** Replace the {`Your Connected App API Name}` with the API Name you set when creating the Connected App definition. For example, `Alfresco_Content_Connector_for_Salesforce`.

3. **Save** your settings.

    Repeat Step 2 and 3 for every object where you want the app to appear.

4. Now for each Salesforce object where you want the app to appear, you need to add the Visualforce page you just created in the Lightning page layout. To do so, follow these steps:

    1. For example, if the Salesforce object is `Account`, then on the Salesforce page, click **Accounts**.

        The ACCOUNTS screen appears listing all the accounts.

    2. Click the account where you want the Visualforce page to appear.

    3. Click the gear icon ![gear]({% link salesforce/images/gear.png %}){:height="18px" width="18px"} from the top-right toolbar on the Salesforce page.

    4. Click **Edit Page**.

    5. Select **Visualforce** from the **Standard** components list in the scrollable window.

        You can drag and place the component where you want it on the page.

    6. Specify a **Label** for the Visualforce page. If no label is specified, the default label of the Visualforce page is used.

    7. Select the Visualforce page you have created from the **Visualforce Page Name** drop-down list. This field is mandatory.

    8. Specify a minimum **Height** of 450 pixels.

    9. **Save** your settings.

        If you're editing the page for the first, you may need to activate the page if this is the first time you are editing the page.

        It can take a little while for the Alfresco widget to load for the first time.

5. Open a record that has the new page layout. You should now be able to see an Alfresco section, with a Files tab. You can add files here by dragging and dropping them, or by using the Upload button.

    You can also add new folders with the Create button. Equally, any files added in Alfresco can be seen in this window. This content is stored directly in Alfresco and can be viewed either in Salesforce, or in your usual Alfresco site.

## Uninstall the Salesforce app and AMP files

Remove the Alfresco package in Salesforce and then use the Module Management Tool (MMT) and remove the AMP files.

1. In your Salesforce account, find **Setup**. This is often on the toolbar or under your name (see [Explore the Salesforce Setup Menu](https://help.salesforce.com/articleView?id=basics_nav_setup.htm&type=5){:target="_blank"} for more guidance on where to find this).

    Search for `Installed` in the Quick Find search bar, and click **Installed Packages**.

2. Click **Uninstall** next to the Alfresco Content Connector package, and confirm that you want to uninstall the package.

    For more information about removing packages in Salesforce, see [Uninstalling a Package](https://help.salesforce.com/articleView?id=distribution_uninstalling_packages.htm&type=5){:target="_blank"}.

3. Stop the server.

4. Use the information in [Uninstalling an AMP file]({% link content-services/latest/install/zip/amp.md %}#uninstall-an-amp-file) to uninstall the AMP files for Salesforce.

5. Restart the server.
