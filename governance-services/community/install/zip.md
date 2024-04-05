---
title: Install using the distribution ZIP
---

Governance Services is installed by applying two AMP files to an existing Alfresco Community Edition installation.

Download the Alfresco Governance Services distribution from [Alfresco Nexus repository](https://nexus.alfresco.com/nexus/#nexus-search;gav~org.alfresco~alfresco-governance*~23.2.1~~){:target="_blank"}.

The Governance Services Community Edition distribution zip contains the following files:

|alfresco-governance-services-community-repo-23.2.x.xxx.amp|Contains Governance Services functionality that's applied to an existing Alfresco Community Edition installation.|
|alfresco-governance-services-community-share-23.2.x.xxx.amp|Contains Governance Services functionality that's applied to an existing Alfresco Share installation.|

> **Note:** Install the AMPs manually using the Module Management Tool (MMT), rather than using the `apply_amps` tool.

1. Stop the Alfresco Community Edition server.

2. Delete the `tomcat\webapps\alfresco` and `tomcat\webapps\share` folders in the Alfresco Community Edition installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco Community Edition is restarted.

    > **Note:** If you are using non-Windows systems, such as Mac OS X and Linux, you'll need to replace the backslashes by forward slashes in directory paths.

3. Copy the AMP files to the Alfresco `amps` and `amps_share` directories.

    * Copy the `alfresco-governance-services-community-repo-23.2.x.xxx.amp` file to the Alfresco `amps` directory.
    * Copy the `alfresco-governance-services-community-share-23.2.x.xxx.amp` file to the Alfresco `amps_share` directory.

4. Change into the root of the Alfresco Community Edition installation directory. Directories specified in the following procedures are relative to this directory.

5. Run the following commands to install the AMP files:

    ```bash
    java -jar bin\alfresco-mmt.jar install amps\alfresco-governance-services-community-repo-23.2.x.xxx.amp tomcat\webapps\alfresco.war
    ```

    ```bash
    java -jar bin\alfresco-mmt.jar install amps_share\alfresco-governance-services-community-share-23.2.x.xxx.amp tomcat\webapps\share.war
    ```

    Replace `x.xxx` with the exact versions provided in the Governance Services Community Edition distribution zip.

6. Start the Alfresco Community Edition server.

7. Check the AMP files have been installed successfully, using these commands:

    ```bash
    java -jar bin\alfresco-mmt.jar list tomcat\webapps\alfresco.war
    ```

    and

    ```bash
    java -jar bin\alfresco-mmt.jar list tomcat\webapps\share.war
    ```

8. Start Share by browsing to:

    `http://<your-server-name>:<port number>/share`

    > **Note:** When you install Governance Services the Security Controls features are installed at the same time.

Final step before you can start with Records Management is to [create the Records Management site]({% link governance-services/community/install/create-rm-site.md %}).
