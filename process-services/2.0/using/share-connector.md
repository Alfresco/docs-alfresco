---
title: Using the Share Connector
---

The Share Connector enables you to start and run processes and and tasks in an Alfresco Share environment. You can create process definitions in Process Services, and deploy them to Share.

>**Important:** The Share Connector is deprecated and [no longer supported](https://hub.alfresco.com/t5/alfresco-content-services-blog/architecture-changes-for-alfresco-content-services-version-6-0/ba-p/288930){:target="_blank"} in Alfresco Content Services 6.0. Existing deployments are supported throughout the life cycle of Alfresco Content Services 5.x. Deployments should now use the [Application Development Framework](https://www.alfresco.com/ecm-software/application-development-framework){:target="_blank"}.

Installing Share Connector changes the standard workflow and task management to access the processes and tasks by default, however you can still use the standard Share workflow capabilities.

After you have installed the Share Connector on an Alfresco Content Services system, the following new features are available:

* The Process Services user interface for working with processes and tasks embedded in Share.
* A Review Process app displayed in the Process Services user interface that includes the following pre-defined process definitions:

    * Ad hoc Task
    * Group ad hoc task
    * Review and Approve - Group
    * Review and Approve - Single person

    >**Note**: The four processes are already deployed to Share. When you start a workflow in Alfresco Content Services, you can choose from any of the pre-defined processes.

* Capability to add native Share users when selecting people and documents in a workflow.
* A new option in Share to add a new My Tasks dashlet to your home dashboard. This dashlet shows tasks created using the Share Connector. You can filter the tasks shown by: Active Tasks, Completed Tasks, Tasks Due Today, Tasks Assigned to Me, Unassigned (Pooled Tasks), and Overdue Tasks.
* Options to create workflows when initiating a workflow on a document in Share, or from the My Tasks dashlet.
* The old Alfresco My Tasks dashlet, so you can still see the old internal workflows and receive new site invitations.
* The old Alfresco My Tasks page by clicking **My Workflow Tasks** on the new My Tasks page, so you can still work with your old internal tasks.
* The old My Workflows page by clicking **Workflows I’ve started** on the new Processes page, so you can still work with your old internal workflows.
* The Workflows panel on the Document details page listing both internal and external workflows.

## Share Connector features

The Share Connector has the following features:

* **Integrated UI** - The Process Services user interface for working with processes and tasks is embedded into the Share user interface exposing processes called *Review Processes*. When selecting people and documents, the native Share components are used.
* **Review Processes** - This is available from within Share, and includes four processes: *Ad hoc Task*, *Group ad hoc task*, *Review and Approve - Group* and *Review and Approve - Single person*.
* **Site Specific Processes** - You can change the default process for a site to display a specific process app by adding an aspect included in the Share Connector to the site's *documentLibrary* folder. For detailed steps, see [Changing the default process for a site](#changing-the-default-process-for-a-site).
* **My Activiti Tasks** dashlet - Lists new tasks created using the Share Connector. You can filter tasks by: *Active Tasks, Completed Tasks, Tasks Due Today, Tasks Assigned to Me, Unassigned (Pooled Tasks), Overdue Tasks*.
* **Starting processes** - *Start workflow* in the *Document Library*, *Document details page*, and *My Activiti Tasks* creates new external processes instead of the old internal workflows in Share.
* **Activiti Task list view** - *My Tasks* page lists new external tasks using the Process Services user interface.
* **Activiti Process list view** - *Processes* page lists new external processes using the Process Services user interface.
* **Customized Share header** - The Share header menu links point to new Process Services pages for processes and tasks instead of the old pages. A link to the Process Services user interface is also available in the same menu.
* You can still reach your old internal workflows and create new ones:
    * The original *My Tasks* dashlet is still available, making it possible to list old internal workflows but also receive new site invitations.
    * The original *My Tasks* page can still be accessed by clicking the *Internal Tasks* link on the new Activiti *My Tasks* page, making it possible to continue working with the internal workflows.
    * The original *My Workflows* page can still be accessed by clicking the *Internal Workflows* link on the new Activiti *Processes* page, making it possible to continue working with the internal workflows.
    * The original *Start Workflow* page can still be accessed by clicking the *Start Workflow* link on the new Activiti *Start Process* page, making it possible to continue creating new internal workflows.
    * The *Workflows* panel on the *Document details* page will list both internal and external workflows.

## Set up the Share Connector

This section describes how to install the Share Connector in a production environment.

To set up the Share Connector, you need to configure an LDAP user database for common use between Alfresco Content Services and Process Services. This allows both systems to sync their user database against a single LDAP server. If you do not use the same LDAP user database, the Share Connector will not work.

>**Note:** If you want to get the Share Connector up and running as quickly as possible but not in a production environment, then you can use [Setting up the Share Connector Demo](#setting-up-the-share-connector-demo).

### Alfresco Content Services configuration

Alfresco Content Services can be used to:

* Upload or link related content (for example, for a task)
* Upload or link content in a form

The connection for an Alfresco Content Services installation is created by an administrator through the user interface. Accounts for connecting to an Alfresco Content Services installation are created by the users themselves.

Passwords are stored encrypted in the database. An `init` vector and secret key are used for the encryption. These keys can be changed from the default values as follows:

```text
# Passwords for non-OAuth services (eg. on-premise alfresco) are encrypted using AES/CBC/PKCS5PADDING
# It needs a 128-bit initialization vector (http://en.wikipedia.org/wiki/Initialization_vector) and a 128-bit secret key
# represented as 16 ascii characters below
security.encryption.ivspec=9kje56fqwX8lk1Z0
security.encryption.secret=wTy53pl09aN4iOkL
```

>**Note:** When the connector installed on your Alfresco Content Services server you will be able to use the Task application from Share.

#### LDAP settings in Alfresco Content Services

You must set up LDAP in Alfresco Content Services.

Detailed instructions are available in [configure LDAP]({% link content-services/latest/admin/auth-sync.md %}#configure-ldap).

For a working example of an LDAP subsystem, check the LDAP demo provided in the `activiti-share-connector.zip`. The demo amp file contains sample LDAP configuration files for getting Alfresco Content Services setup up with an LDAP (it contains no Share Connector files) configuration.

For example:

1. Unzip the `activiti.alfresco.repo-demo-ldap-X.X.X.amp` file by renaming it from `.amp` to `.zip`. You'll see some files marked with ACTIVITI SHARE CONNECTOR DEMO in the `ldap-authentication.properties` file.
2. Configure the `ldap-authentication.properties` file to match your LDAP settings, and then zip the files again and rename it back to `.amp` before dropping into the amps folder.

>**Note:** When zipping the files, follow the same structure as the original .amp file and make sure that no new root folders are introduced to the new .zip file.

#### Deploying AMPs

The Share Connector is applied to an installation using two AMP files.

From `activiti-share-connector-x.x.x.zip`, copy the AMPs to the correct amps folder in the Alfresco Content Services 
installation. For example:

* Copy the `<zip>/alfresco/amps/alfresco-connector-repo-x.x.x.amp` AMP to `<alfresco-dir>/amps`
* Copy the `<zip>/alfresco/amps_share/alfresco-connector-share-x.x.x.amp` AMP to `<alfresco-dir>/amps_share`

Install the AMPs by running the following command on a terminal from within theAlfresco Content Services installation directory, 
and then follow the instructions:

```bash
bin/apply_amps.sh
```

#### Modifying the default settings

You can modify the default settings by changing either the port or the repository configuration.

#### Process Services port

The default settings assume that Process Services is running on `http://127.0.0.1:8080/`. If so, you don’t have to do anything.

If you have Process Services running on another domain or port (that is, 9090), you can override the default setting by adding the following line at the bottom of the `<alfresco-tomcat>/shared/classes/alfresco-global.properties` file in Tomcat, where the repository is located:

```text
activiti.domain=http://127.0.0.1:9090
```

#### Alfresco Content Services repository configuration

The following steps explain how to configure the repository settings.

**Modify the default integration name**

You can modify the default Alfresco Content Services integration name by setting the value of 
`activiti.alfrescoRepositoryName`. This value must correspond to an Alfresco Content Services repository 
configured in Activiti. The default name for the integration is `alfresco-1`, however you can modify it, if required

1. Locate the alfresco-global.properties` file located at `<alfresco-tomcat>/shared/classes>`:

    ```text
    activiti.alfrescoRepositoryName=alfresco-1
    ```

2. Modify the value after the hyphen (`-`) with a number that matches the `Id` of the repository. The `repository Id` is available as a column in the **Activiti app > Identity Management app > Tenants > Alfresco Repositories** list.

**Modify the Activiti app name**

You can modify the Activiti app name to display the same app name in Share by modifying the following value in the `alfresco-global.properties` file:

```text
activiti.appDefinitionName=Some Custom App
```

**Set the secret key**

When Alfresco Content Services communicates with Process Services, it sends a secret token and user name and switches 
it for user specific Process Services token.

To override the default secret token, specify an `activiti.secret` property in the `alfresco-global.properties` file.

```text
activiti.secret=my-custom-secret
```

The secret token must match the `Repository secret` field for the repository in the Identity Management app.

The secret token appears in clear text, therefore, to avoid saving it like that:

1. Override the value (and all other properties) using Alfresco Content Services subsystems and JMX.
2. To connect to an Alfresco Content Services server using JMX, see:

    [Using a JMX client to change settings dynamically]({% link content-services/latest/config/index.md %}#using-jmx-client-to-change-settings-dynamically).

3. Once connected, navigate to `/Alfresco/Configuration/Activiti/default/Attributes` and modify the value for `activiti.secret`.

### Process Services configuration

Login to the Process Services landing page to set up the configuration for the Share Connector.

#### Configuring LDAP settings

You can find the LDAP settings for Process Services in the `activiti-ldap.properties` file located here:

```text
webapps/activiti-app/WEB-INF/classes/META-INF/activiti-app/activiti-ldap.properties
```

The default configuration works with the sample LDAP settings provided with the installation bundle, however you can easily override them by creating a new file called `<InstallLocation>/lib/activiti-ldap.properties`, and override the properties that requires changing.

For further details about configuring LDAP for Process Services, see [External Identity Management (LDAP/Active Directory)]({% link process-services/2.0/config/authenticate.md %}#ldap-and-active-directory).

#### Alfresco Content Services settings

To configure Alfresco Content Services settings in Process Services, you must perform the following steps:

* Enable Share Connector
* Add a repository

##### Enable Share Connector

By default, the bundled *Review Processes* app is not created. To create one, add the following file into the 
`<InstallLocation>/lib/activiti-app.properties`.

```text
# Enable the Share Connector process app
app.review-workflows.enabled=true
```

Restart Process Services for it to take effect.

##### Add a repository

You can add a repository from the Identity Management app.

1. Start the Process Services server and log in as administrator.

2. Open the **Profile Management (Identity Management)** app, and click **Tenants** tab > **Alfresco Repositories**.

3. In **Alfresco Repositories**, create a repository pointing to the Alfresco Content Services server and Share Connector. The following is an example of the form, assuming you are running Alfresco Content Services on the same machine and on port 8080:

|Field|Value|
|-----|-----|
|Name|Acme’s Server|
|Alfresco tenant|Tenant name to use in Alfresco. When left blank, it uses the default tenant (-default-).|
|Repository base URL|[http://127.0.0.1:8080/alfresco/](http://127.0.0.1:8080/alfresco/)|
|Share base URL|[http://127.0.0.1:8080/share/](http://127.0.0.1:8080/share/)|
|Alfresco Share connector|(enabled)|
|Secret|activiti-share-connector-secret|

Once the repository is created, you can see your new repository in the **Alfresco Repositories** list. If the ID is setto 1, you are good to go and all default values are fine. However, if it is set to something else, for example, `1002`, you must stop the server and make sure your Id appears as `alfresco-1002` in the following files, and then restart your servers:

* In the Alfresco Content Services `tomcat/shared/classes/alfresco-global.properties` - Override the default by adding a new line with `activiti.alfrescoRepositoryName=alfresco-1002`
* In the Process Services `tomcat/lib/activiti-app.properties` - The property named `integration.login.alfresco-1.secret` should be named `integration.login.alfresco-1002.secret`

In addition, to make this repository work for features such as **Publish to Alfresco** or browse Alfresco for documents from Process Services, verify that a user has a user account for the repository.

#### Change the default process for a site

You can change the default process name for a site to the exact same name as the Process App name.

The easiest way to do this is to follow these steps:

1. From the **Repository** view in Alfresco Content Services, navigate to a site’s **Document Library** folder.
2. From the **Site Details** page, click **More > Manage Aspects** and add the **Activiti Process App** aspect.
3. Edit the folder properties and enter the name of the Process App in the **Process App Definition Name** field.

Where:

Aspect Id = `abs:activitiProcessApp`
Property = `abs:appDefinitionName`

#### Troubleshooting the Share Connector

**To see debug messages from Share Connector:**

1. Rename the `custom-log4j.properties.sample` file in the following location:

    ```text
    tomcat/shared/classes/alfresco/extension/
    ```

2. Remove the `.sample` suffix, and add the following line:

    ```text
    log4j.logger.com.activiti.alfresco=debug
    ```

## Set up the Share Connector demo

This section describes how to set up the Share Connector demo.

### Install Alfresco Content Services

1. Install Alfresco Content Services using the installer in Advanced mode. For Tomcat Port configuration, make sure you bump up each port by 10, for example, 8080 to 8090 and so on.
2. After the installation is complete, start Alfresco Content Services using the Application Manager app located in the home folder.
3. Verify if Alfresco Content Services works on `http://127.0.0.1:8090/share/`, log out, and stop just the *Tomcat Server* in the Application Manager app.
4. Copy the following files from the `activiti-share-connector.zip` to their corresponding folders inside the Alfresco Content Services installation directory:
    * `<zip>/alfresco/amps/activiti.alfresco.repo-X.X.X.amp` to `<alfresco-dir>/amps`
    * `<zip>/alfresco/amps_share/activiti.alfresco.share-X.X.X.amp` to `<alfresco-dir>/amps_share`
    * `<zip>/alfresco/tomcat/webapps-ldap` (copy the folder) to `<alfresco-dir>/tomcat`
        The `webapps-ldap` folder is maintained separately to ensure that it boots up before Alfresco Content Services and becomes available when it tries syncing its database against the LDAP server.

5. To configure the `webapps-ldap` folder to get picked up and run before *webapps* by Tomcat, copy the xml snippet in `<zip>/alfresco/tomcat/conf/server-ldap-snippet.xml` into your `<alfresco-dir>/tomcat/conf/server.xml` and make sure it’s placed above the existing `<Service>` element.
6. Open the `alfresco-global-properties` file and add the following configuration setting:

    ```text
    authentication.chain=ldap1:ldap
    ```

7. Copy the folder `alfresco/extension/subsystems/Authentication/ldap/ldap1/ldap-authentication.properties` from the `activiti-share-connector.zip` to `tomcat/webapps/alfresco/WEB-INF/classes/alfresco/extension/subsystems/Authentication/ldap/ldap1/ldap-authentication.properties`
8. Install the amps into Alfresco Content Services by running the following command on a terminal from your installation directory, and then follow the instructions:

    ```bash
    bin/apply_amps.sh
    ```

    >**Note:** With the standard installs you are likely to have `OutOfMemoryExceptions` due to Perm Gen space issues if you run Java 1.6 or 1.7. To prevent this, edit `tomcat/bin/setenv.sh` or equivalent and make sure to set `XX:MaxPermSize` to 512M as follows:

    ```text
    JAVA_OPTS="-XX:MaxPermSize=512M -Xms512M -Xmx8192M $JAVA_OPTS"
    ```

### Install the Share Connector

Follow these steps to install the Share Connector:

1. Install Process Services using the installer.

2. Verify the database configuration. By default, the demo H2 database is used, therefore you might want to configure Process Services to use the same database as your Alfresco Content Services installation.
    * Typically, you should create a new database schema for Process Services to use, and then configure it as described in [Database configuration]({% link process-services/2.0/config/database.md %}).

3. Make sure your Process Services app has a license installed. You can add a license file manually to the `tomcat/lib` directory, or load it through the user interface.

    To load a license file from the UI, see [uploading_a_license_from_the_user_interface]({% link process-services/2.0/install/manual.md %}#license) Make sure you sign out from Process Services and stop the server.

4. To use the same demo LDAP server, copy the following file from `activiti-share-connector.zip` into its corresponding folder in the Process Services installation directory:

    ```text
    <zip>/activiti/tomcat/lib/activiti-ldap.properties_ to _<activiti-dir>/tomcat/lib
    ```

5. Uncomment or add the following lines at the bottom of the `tomcat/lib/activiti-app.properties` file inside the installation folder.

    ```text
    # Enable the Alfresco Share Connector app
    app.review-workflows.enabled=true
    ```

### Start the servers for Share Connector

1. From the Application Manager, restart Alfresco Content Services to restart the Tomcat server. To ensure that the Alfresco Content Services server has fully started, check the application log and wait for the `INFO: Server startup in XXXX ms` message.
2. After the Alfresco Content Services server and the demo LDAP server have started, run Process Services as instructed by the installer and navigate to the **Identity Management** app [http://127.0.0.1:8080/activiti-app/idm/](http://127.0.0.1:8080/activiti-app/idm/).
3. Log in with admin/password defined in the demo LDAP.
4. Go to the **Tenants** page > **Alfresco Repositories** tab, and add a repository pointing to your Alfresco Content Services server:

|Field|Value|
|-----|-----|
|Name|My server name|
|Alfresco tenant|Tenant name to use in Alfresco Content Services. When left blank, it uses the default tenant (`-default-`).|
|Repository base url|[http://127.0.0.1:8090/alfresco/](http://127.0.0.1:8090/alfresco/)|
|Share base url|[http://127.0.0.1:8090/share/](http://127.0.0.1:8090/share/)|
|Alfresco Share connector|(enabled)|
|Secret|`activiti-share-connector-secret`|

**Notes**:

* The default secret is the text `activiti-share-connector-secret`, which can be changed to a different value in the Alfresco Content Services alfresco-global.properties by the property `activiti.secret`.
* After the repository is created, you can see your new repository in the **Alfresco Repositories** list. If the ID is set to 1, then all default values are fine. However, if it is set to something else, for example, `1002`, you must stop your servers and make sure your ID appears as `alfresco-1002` in the following files and then restart your servers:
* In the `alfresco-global.properties` file, override the default setting by adding a new line, substituting the ID as appropriate:

    ```text
    activiti.alfrescoRepositoryName=alfresco-1002
    ```

### Use the Share Connector

This section describes how to get started with using the Share Connector.

>**Note:** Make sure that LDAP is running before you start Alfresco Content Services and Process Services so they can sync their user databases against the LDAP server.

1. View Alfresco Share on `http://127.0.0.1:8090/share/` and Process Services on `http://127.0.0.1:8080/activiti-app/`
2. Login as a user that exist in the demo LDAP system:

    |Username|Password|Process Services role|Alfresco Content Services role|
    |--------|--------|---------------------|------------------------------|
    |jluc|password|tenant manager|user|
    |kirk|password|tenant admin|user|
    |wesley|password|user|user|
    |admin|password|admin|admin|

    >**Note:** The password for the admin user is `password` instead of the credentials used for installing Alfresco Content Services. This is because the password set in the demo LDAP server is applicable for users.

3. On the Alfresco Content Services personal dashboard page, click **Tools** and add the *My Activiti Tasks* dashlet.

When logging into Process Services as an *admin*, you can view the process definitions and *Review Processes* app inside the App Designer application by selecting the *Shared with Me* filter.

### Process Services Administrator application

You can use the Process Services Administrator application with the [Setting up the Share Connector Demo](#setting-up-the-share-connector-demo), however you must first update the endpoint in the Administrator application.

To update the Process Services endpoint:

1. Sign in to the Process Services app with the default admin/admin credentials:

    [http://127.0.0.1:8080/activiti-admin/](http://127.0.0.1:8080/activiti-admin/)

    A message appears indicating that an error occurred while getting data from the server.

2. Click **Edit Activiti REST endpoint** and set the **Username** to `admin` and **Password** to `password`, then click **Save**.

    A confirmation message appears confirming that the endpoints were successfully updated.

## Using the Share Connector demo

Follow these steps to start creating and running processes in Alfresco Share.

>**Note:** The LDAP demo server installed with the demo includes four fixed users. The password for each user is password. The following four users are set up so you can try out various groups and user scenarios.

* *jluc* is a tenant manager in Process Services, a user in Alfresco Content Services, and in the groups engineering and marketing.
* *kirk* is a tenant admin in Process Services, a user in Alfresco Content Services, and in the group engineering.
* *wesley* is a user in Process Services and a user in Alfresco Content Services. He is not a member of any group.
* *admin* is an admin in Process Services and an admin in Alfresco Content Services. This is the only user who has the ability to deploy process definitions from Process Services to Share.

1. Go to the installed Alfresco Share system at [http://localhost:8090/share](http://localhost:8090/share) and login with the following user credentials:

    *userid*: `admin`
    *password*: `password`

    Share Connector installs a demo LDAP system which provides several fixed userid/password pairs. The admin user Id provides permissions to start tasks and processes on Share, and to create and deploy processes and apps on the embedded Process Services. On your personal dashboard, click the **Tools** icon on the top-right and add the **My Activiti Tasks** dashlet.

    This dashlet is now displayed as well as the original My Tasks dashlet. Use the new dashlet to control processes and tasks inside Alfresco Share.

2. Go to [http://localhost:8080/activiti-app/](http://localhost:8080/activiti-app/), and log in with the userid `admin` and the password `password`.

    In the embedded app, you can create process definitions and deploy them to Alfresco Share.

### Start a workflow on a file

In your site’s document library in Alfresco Share, you can start a workflow on one or more files. The following steps
describe how to initiate a workflow using one of the pre-defined processes on two files.

**Prerequisite**: You must create your own site in Alfresco Share and have some files and folders added to it.

1. Find the file(s) you want to start the workflow on and click **Selected Items > Start Workflow** in the menu bar.

    The **Start Workflow** page appears.

2. Select the **Ad hoc Task** predefined process from the list of processes.

    The start form for the process is displayed.

    Note that the two files selected are already shown in the upload field of the form. When you start a workflow on a file or files, the selected content items are always associated with the first upload field in the process definition.

3. Fill in the start form, assigning the process to yourself, and click **Start Process**.

    The process is initiated, and the first task appears active.

You have successfully started an process on the selected files in an site.

### Start a workflow in Alfresco Share

This tutorial walks you through the steps required to run your first process as a workflow from Alfresco Share using the **My Activiti Tasks** dashlet.

All process definitions that you deploy to Apps in Process Services are available to you in Alfresco Share. This section assumes that you have deployed the first process workflow using the app-creating-process tutorial described in [Getting Started]({% link process-services/2.0/using/getting-started.md %}). If not, follow the tutorial to deploy the workflow.

1. Go to the Alfresco Share dashboard, `http://localhost:8090/share`.

    You run a process as a workflow.

2. In your **My Workflow Tasks** dashlet, click **Start Workflow**.

    The Start Workflow dialog appears.

    Note that the alphabetical list of process definitions includes your first process.

3. Select your **First Process**.

    The workflow is initiated and the page now displays the form for the start task in this workflow, just like it does in Process Services.

4. Fill in the form.

    Note that when you click **Select a file** for the project files, a dialog to choose a file for Share appears to select files from the Alfresco Content Services repository.

5. Click **Start process** to start the workflow.

    The My Workflow page now displays the active and completed tasks in your workflow.

6. Click the **Review project** task.

    The My tasks page is displayed.

7. Add a review comment and click **Accept** to continue with the next step in the workflow, and continue until you have completed all tasks in the workflow.

You have run a process definition as a workflow in Share. My tasks, My workflows pages, and the associated Process Services for this Share site can all be accessed from the **Tasks** menu.

### Create rules

You can create rules to manage folders in a process. There are two ways to create rules in the Share Connector:

* **[Create your own rules]({% link content-services/latest/using/content/rules.md %})** for creating new set of rules for a folder
* **[Link to an existing rules set]({% link content-services/latest/using/content/rules.md %}#linking-to-an-existing-rule-set)** to reuse the existing set of rules defined for another folder

The options are listed under **Perform Actions**. Follow the steps until you reach the Process Services specific actions (under More Actions), and then continue as follows.

**To create rules for processes**:

1. Create a rule or link to an existing rules set.
2. From **New Rules > Perform Actions**, select **Start Activiti Process** to initiate a process from Process Services.
3. Click **Start Activiti Process**.
4. Customize the rule with the following options:
    * **Process Definition** - Select from the predefined process definitions based on where you want to apply the rule to.
    * **Process Name** - Enter a process name for your rule.
    * **Content form field** - Select content for attaching a content type field in the form.
    * **Additional form fields** - Select additional criteria for the rule such as Assignee, Due Date, Task Description, Message, and add their values. To select more than one criteria, click **+** (plus icon).
5. You can also select from the following **Other Options**:
    * **Disable rule** - Turns off any existing rules.
    * **Run applies to subfolders** - Applies the rule to this folder and all its subfolders.
    * **Run rule in the background** - Runs the rule in the background. You can also select an action to run if an error occurs with the rule. These actions are set up by your Administrator.
6. Click **Create** or **Create and Create Another** to save this rule and start creating another one.

The rule is applied to the selected folder and displayed on the **Rules** page. Once a rule is added, the following options become available:

* **Inherit Rules** - Use for applying rules to inherit from a parent folder. You can turn the rule on and off by clicking on it.
* **New Rule** - Click to add more rules to a folder as you need in the same way as you would add new rules.
* **Run Rules** - Click to manually run the rules on existing folder items or subfolders at any time.

## Integrate Process Services with Alfresco Content Services

When Process Services is integrated with an Alfresco Content Services server, the following types of communication are supported:

* Browse sites and their documents within the Process Services UI
* Publish documents to Alfresco Content Services
* Download documents from Alfresco Content Services
* Preview of downloaded document in the Process Services UI

This section provides details to achieve the integration between the two applications.

### Communication between Process Services and Alfresco Content Services

Process Services uses the CMIS REST bindings available in Alfresco Content Services and the *OpenCMIS* client library to communicate.

When connecting to Alfresco Content Services, it uses the `org.apache.chemistry.opencmis.client.runtime.SessionFactory.createSession(Map<String, String> parameters)` method.

Use the following parameters for user credentials:

```javascript
parameters.put(SessionParameter.USER, username);
parameters.put(SessionParameter.PASSWORD, password);
```

If a user account for the repository is already defined inside the Process Services Identity Management app, then the user name and password of that user account will be used.

However, if there is no user account defined and the repository configuration in the Identity Management app is configured to use the Share Connector, then Process Services will pass a secret key with the user name to Alfresco Content Services to create a ticket. The username is defined in the `EXTERNAL_ID` column of the `USERS` database table.

The secret key can be retrieved by calling a REST service (web script) in Alfresco Content Services, which was deployed when installing the Share Connector module in the repository, using the following HTTP call:

```bash
POST http://alfrescoserver.com/alfresco/service/activiti/sso/alfresco-ticket
{
    "secret": "activiti-share-connector-secret",
    "username": "kermit"
}
```

which will return 200 with the following response body:

```json
{
    "ticket": "abc123"
}
```

When Process Services receives this ticket, it will use the string `"ROLE_STRING"` (instead of using a "real" username) as the user parameter and the ticket as the password parameter:

```javascript
parameters.put(SessionParameter.USER, "ROLE_TICKET");
parameters.put(SessionParameter.PASSWORD, ticket);
```

In addition, Process Services uses the Public API (for example, when listing sites for a user) and regular HTTP calls with `basic auth`. For an existing user account, the user name and password are specified in the same way. However, if the Share Connector is configured for the repository, use the constant `ROLE_TICKET` as the user name and the ticket received from Alfresco Content Services as password with basic authentication.
