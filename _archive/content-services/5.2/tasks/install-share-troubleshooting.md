---
author: Alfresco Documentation
source: Documented during installation
publisher: Alfresco Software, Inc.
audience: 
---

# Troubleshooting the installation

Follow these tips if you see error messages when using the Alfresco Share Installer.

**Note:** The Alfresco Content Services Installer is recommended for most purposes. See [Installing on Linux using the Alfresco Content Services Installer](simpleinstall-enterprise-lin.md) for more information. These tips help troubleshoot problems found in Alfresco Share, when you have used the Alfresco Share Installer \(see [Installing on Linux using the Alfresco Share Installer](simpleinstall-enterprise-lin-share.md) for more information\). Use this installer only if you have a specific requirement for it.

1.  Start Alfresco Content Services and log on to Alfresco Share \(http://localhost:port/share\) as the `admin` user. Enter the password that you specified in [Installing on Linux using the Alfresco Share Installer](simpleinstall-enterprise-lin-share.md) in the Admin Password window.

2.  Check for error messages as you start Share.

3.  If you see the following message:

    *Alfresco Content Services is running without Share Services. See your System Administrator for more details*

    then check the Admin Console to determine which AMP files have been installed, and their versions. It might be that either you have not installed the Share Services AMP in the repository \(see [Installing on Linux using the Alfresco Share Installer](simpleinstall-enterprise-lin-share.md) or [Installing on Windows using the Alfresco Share Installer](simpleinstall-enterprise-win-share.md)\), or the version of the AMP that you have installed is not correct.

4.  If you see the following message:

    ```
    Invalid MANIFEST.MF: Share Specification-Version is missing, are you using the valid
          MANIFEST.MF supplied with the Share.war? 
    ```

    check that you have not deleted or changed the `MANIFEST.MF` file. The `MANIFEST.MF` file shipped with the Share.war is required for validation, and Alfresco Share will not work correctly if this cannot be read.

    If you are using a Maven WAR build, this will override the shipped `MANIFEST.MF` file. When you unpack your WAR file, you will need to specify `unpack-dependencies` explicitly, for example:

    ```
    <plugin> 
      <artifactId>maven-dependency-plugin</artifactId> 
      <executions> 
        <execution> 
          <id>unpack</id> 
          <phase>generate-sources</phase> 
          <goals> 
            <goal>unpack-dependencies</goal> 
          </goals> 
          <configuration> 
            <includeTypes>war</includeTypes> 
            <includeGroupIds>org.alfresco</includeGroupIds> 
            <includeArtifactIds>share</includeArtifactIds> 
            <includes>META-INF/MANIFEST.MF</includes> 
          </configuration> 
        </execution> 
      </executions> 
    </plugin> 
    
    <plugin> 
      <artifactId>maven-war-plugin</artifactId> 
      <configuration> 
        <archive> 
          <addMavenDescriptor>false</addMavenDescriptor> 
          <manifestFile>${project.build.directory}/dependency/META-INF/MANIFEST.MF</manifestFile> 
        </archive> 
        <webResources> 
        </webResources> 
      </configuration> 
    </plugin>
    ```


**Parent topic:**[Testing the installation](../concepts/testing-alfresco.md)

