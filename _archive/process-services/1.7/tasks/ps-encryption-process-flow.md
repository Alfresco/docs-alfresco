---
author: Alfresco Documentation
---

# Encrypting configuration properties

You can encrypt sensitive properties in the activiti-app.properties, activiti-admin.properties and activiti-ldap.properties configuration files.

1.  Download Jasypt [http://www.jasypt.org/download.html](http://www.jasypt.org/download.html).

2.  Extract the zip file and grant yourself full run permissions on its `bin` directory.

    You willl need to know what encryption algorithms are supported. If you’re using the JVM to which the application will be deployed you can do this using the listAlgorithms tool that Jasypt provides: [http://www.jasypt.org/cli.html](http://www.jasypt.org/cli.html)

    **Note:** Certain algorithms such as `SHA1 (PBEWITHSHA1ANDDESEDE)` and `MD5 (PBEWithMD5AndDES)` are available on most JVMs but more secure algorithms require modifications to the JRE policies.

3.  Choose an algorithm.

    If you do not specify an algorithm to Jasypt, then you effectively obtain the default of PBEWithMD5AndDES. Some algorithms may appear in the list but may not be usable as the JRE policy blocks them.

    If you want to increase your range of choices then you can modify the JRE policies: [https://www.ca.com/us/services-support/ca-support/ca-support-online/knowledge-base-articles.tec1698523.html](https://www.ca.com/us/services-support/ca-support/ca-support-online/knowledge-base-articles.tec1698523.html)There is an equivalent for the IBM JRE: [https://www-01.ibm.com/marketing/iwm/iwm/web/reg/pick.do?source=jcesdk.](https://www-01.ibm.com/marketing/iwm/iwm/web/reg/pick.do?source=jcesdk.)

    Algorithms using AES are generally considered most secure. TripleDES also passes security checks at present. You should consult your security department for advice specific to your organisation and the needs of your server.

4.  Use the Jasypt tools to encrypt the value.

    You can use the encrypt script that comes with Jasypt to encrypt the value against your chosen secret password. In addition to their documentation, see this guide: [http://www.programering.com/a/MjN1kTNwATg.html](http://www.programering.com/a/MjN1kTNwATg.html).

    We recommend to avoid using quotes. Also check that you can decrypt the value, preferably using the intended JRE.

5.  Deploy the application.

    See the application installation instructions.

6.  Set the value in the properties file.

    If the property is called datasource.password, remove the existing entry and put in a new entry of the form datasource.password=ENC\(<ENCRYPTEDPASSWORD\>\) where ENCRYPTEDPASSWORD is the value encrypted by Jasypt.

7.  Configure your application server to set the encryption algorithm and secret encryption password.

    If, for example, you are using Tomcat on Unix then you could include a shell script called setenv.sh in tomcat\_home/bin with the following content:

    ```
    export JAVA_OPTS="$JAVA_OPTS -Djasypt.encryptor.password=secretpassword -Djasypt.encryptor.algorithm=PBEWITHSHA1ANDDESEDE"
    ```

    This assumes that your password is ‘secretpassword’ and you are using the algorithm PBEWITHSHA1ANDDESEDE. The configuration could alternatively be done in startup.sh.

    If you then run using `catalina.sh` you will see the secret password in the logging on application startup. This is a Tomcat feature, which you can disable by removing `<Listener className="org.apache.catalina.startup.VersionLoggerListener" />` from your Tomcat's `server.xml` [https://stackoverflow.com/questions/35485826/turn-off-tomcat-logging-via-spring-boot-application](https://stackoverflow.com/questions/35485826/turn-off-tomcat-logging-via-spring-boot-application)You may initially, however, want to leave this on for diagnostic purposes until you’ve proven you’ve got encryption working. For an example of this, see [https://stackoverflow.com/questions/17019233/pass-user-defined-environment-variable-to-tomcat](https://stackoverflow.com/questions/17019233/pass-user-defined-environment-variable-to-tomcat)

    For other servers there will be other ways of setting environment/JVM variables. These values can be read as JVM parameters, environment variables or as property file entries \(though you would not want to put the secret encryption password in a property file\). Therefore, with WebSphere they could set using JVM parameter config [http://www-01.ibm.com/support/docview.wss?uid=swg21417365](http://www-01.ibm.com/support/docview.wss?uid=swg21417365) or environment variable config [https://www.ibm.com/support/knowledgecenter/en/SSAW57\_8.5.5/com.ibm.websphere.nd.doc/ae/welcvariables.html.](https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/welcvariables.html.)

8.  Start the application.

    The application should now start as normal. If it doesn’t, try without the encrypted values and without the encryption parameters to determine whether the problem is related to the encryption setup. Check that you are able to encrypt and decrypt with Jasypt to rule out any issues due to copy-paste errors. 

9.  Logging.

    Some property values \(though not sensitive ones\) are logged by Alfresco applications if the log level is set high. If you want to restrict this then reduce the log level in`log4j.properties`


**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

