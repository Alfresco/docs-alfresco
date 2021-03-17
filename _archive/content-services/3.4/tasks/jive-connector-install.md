---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Jive Toolkit, Extensions/Third Party]
keyword: [Jive, Toolkit]
---

# Installing the Jive Toolkit on Alfresco

These steps describe how to install the Jive Toolkit on Alfresco.

**Important:** Before you install the Jive Toolkit, you must install the Java Cryptography Extension \(JCE\) Unlimited Strength Jurisdiction Policy Files 6 JSSE library. The Jive Toolkit requires the security level that is provided in this version of the JVM. If you do not install this library, you will see an error about mismatched shared passwords, and an exception is also written to the Alfresco log.

Extract the JCE libraries to the Java directory. For example, if you have installed Alfresco using the setup wizard, use the <AlfrescoInstallLocation\>/java/jre/lib/security/ directory. 

The Jive Toolkit is supported with Alfresco Enterprise Versions 3.4.3 and above.

The Jive Toolkit zip file contains two Alfresco Module Package \(AMP\) files for Alfresco: one for the repository and one for Share.

To install the Jive Toolkit, apply the AMP files to an existing Alfresco Enterprise installation.

1.  Expand Jive Toolkit zip file.

    The expanded zip file contains the following two AMP files:

    ```
    alfresco-jivetoolkit-repo-1.0.6.amp
    alfresco-jivetoolkit-share-1.0.6.amp
    ```

2.  Apply the AMPs to your Alfresco installation using the Module Management Tool \(MMT\).

    1.  Ensure that you know the location of the expanded Jive Toolkit AMP files.

    2.  Ensure that you know the path to the Alfresco WAR and Share WAR for your Alfresco installation.

    3.  Apply the two separate AMP file by running the following commands:

        `java -jar alfresco-mmt.jar install <AMPFileLocation>/alfresco-jivetoolkit-repo-1.0.6.amp <WARFileLocation>`

        `java -jar alfresco-mmt.jar install <AMPFileLocation>/alfresco-jivetoolkit-share-1.0.6.amp <WARFileLocation>`

        Alternatively, when Alfresco is running in a Tomcat application server, you can use the <AlfrescoInstallLocation\>/bin/apply\_amps script, which applies all the AMPs in amps and amps\_share to the alfresco.war and share.war files. Ensure that you move the repository AMP to the amp directory, and the Share AMP file to the amps\_share directory before running the script.

3.  Configure Alfresco for the Jive Toolkit.

    The configuration steps require you to specify in Alfresco where the Jive instance is located.

4.  Open the <AlfrescoInstallLocation\>/tomcat/shared/classes/alfresco-global.properties file.

5.  Add the following properties to specify the Jive instance.

    |Property|Description|
    |--------|-----------|
    |`jivetoolkit.jive.url=`|Specifies the base URL of the Jive instance. The format of the URL should include the port number and the application context \(if any\).|
    |`jivetoolkit.jive.user=`|Specifies the system user name of the user that will be used by Alfresco to authenticate calls to the Jive instance. The user should have privileges.|
    |`jivetoolkit.jive.password=`|Specifies the password of the system user defined in the `jivetoolkit.jive.user=` property.|
    |`jivetoolkit.shared.password=`|Specifies a password that will be used to secure communication between Alfresco and Jive. The password that you specify here must be the same in the Jive configuration.

**Important:** Do not leave this property empty or blank. You must enter a value for this password, otherwise Alfresco will not start.

Also, if the passwords in Alfresco and Jive are different, the communication will fail and you see a message saying **Failed to connect to Jive. Please try again shortly. If the error persist please contact your system administrator.**.

|

    The following example shows how you can set the Jive Toolkit configuration in the alfresco-global.properties file.

    ```
    * jivetoolkit.jive.url=http://jiveserver.acme.com
    * jivetoolkit.jive.user=admin
    * jivetoolkit.jive.password=admin
    * jivetoolkit.shared.password=CHANGEME!
    ```

6.  Save the alfresco-global.properties file.

7.  Restart the Alfresco server.


When you have finished configuring Alfresco, ensure that you use the same shared password on Jive.

**Parent topic:**[Alfresco Jive Toolkit installation](../concepts/jive-install-artifact.md)

