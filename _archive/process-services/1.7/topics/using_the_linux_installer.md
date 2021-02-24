# Using the Linux installer

To install Alfresco Process Services on Linux:

1.  Download the installer by clicking on the link in the Alfresco Process Services 30-day trial email.
2.  Download the license file.
3.  Using the command line, find the installer, and change the permissions on the file as follows:

    ```
    chmod 777 <installer-file-name>
    ```

4.  Run the installer from the command line.

    ```
    ./<installer-file-name>
    ```

5.  Follow the instructions in the installer dialogs.

    You can choose your own installation folder in the second dialog.

6.  Install the license file.

    Copy the `activiti.lic` file to the `<nstall>/tomcat/lib` folder.


**Important**: By default, the Alfresco Process Services installer does not deploy the activiti-admin app. Therefore, to get the activiti-admin app up and running, perform the following additional steps after installing:

-   Go to */tomcat/webapps* and rename the *activiti-admin.war.undeployed* file to *activiti-admin.war*.

-   Edit the *activiti-app.properties* file located in the *tomcat/lib* folder and locate the *\# Activiti cluster config* setting.

    -   Enable a cluster by changing the following settings to true:

        `cluster.enable=true`


**Parent topic:**[Installing using an installer](../topics/installing_using_an_installer.md)

