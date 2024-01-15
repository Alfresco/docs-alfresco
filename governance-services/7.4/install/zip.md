---
title: Install using the distribution ZIP
---

Governance Services is installed by applying two AMP files to an existing Alfresco Content Services installation.

The Governance Services distribution zip file contains the following files:

|alfresco-governance-services-enterprise-repo-20.143.amp|Contains Governance Services functionality that's applied to an existing Alfresco Content Services installation.|
|alfresco-governance-services-enterprise-share-20.163.amp|Contains Governance Services functionality that's applied to an existing Alfresco Share installation.|

> **Note:** Install the AMPs manually using the Module Management Tool (MMT), rather than using the `apply_amps` tool.

1. Browse to [Hyland Community](https://community.hyland.com/){:target="_blank"} and download `alfresco-governance-services-enterprise-distribution-7.4.0.zip`.

2. Stop the Alfresco Content Services server.

3. Delete the `tomcat\webapps\alfresco` and `tomcat\webapps\share` folders in the Alfresco Content Services installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco Content Services is restarted.

    > **Note:** If you are using non-Windows systems, such as Mac OS X and Linux, you'll need to replace the backslashes by forward slashes in directory paths.

4. Copy the AMP files to the Alfresco `amps` and `amps_share` directories.

    * Copy the `alfresco-governance-services-enterprise-repo-20.143` file to the Alfresco `amps` directory.
    * Copy the `alfresco-governance-services-enterprise-share-20.163.amp` file to the Alfresco `amps_share` directory.

5. Change into the root of the Alfresco Content Services installation directory. Directories specified in the following procedures are relative to this directory.

6. Run the following commands to install the AMP files:

    ```bash
    java -jar bin\alfresco-mmt.jar install amps\alfresco-governance-services-enterprise-repo-20.143.amp tomcat\webapps\alfresco.war
    ```

    ```bash
    java -jar bin\alfresco-mmt.jar install amps_share\alfresco-governance-services-enterprise-share-20.163.amp tomcat\webapps\share.war
    ```

7. Start the Alfresco Content Services server.

8. Check the AMP files have been installed successfully, using these commands:

    ```bash
    java -jar bin\alfresco-mmt.jar list tomcat\webapps\alfresco.war
    ```

    and

    ```bash
    java -jar bin\alfresco-mmt.jar list tomcat\webapps\share.war
    ```

9. Start Share by browsing to:

    `http://<your-server-name>:<port number>/share`

    > **Note:** When you install Governance Services the Security Controls features are installed at the same time.

Final step before you can start with Records Management is to [create the Records Management site]({% link governance-services/7.4/install/create-rm-site.md %}).
