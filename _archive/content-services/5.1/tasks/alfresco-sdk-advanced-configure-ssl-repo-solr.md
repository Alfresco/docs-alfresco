---
author: Alfresco Documentation
---

# Configure SSL between Repository and Solr in an AIO project

The SDK ships with SSL turned off between the Alfresco Repository and the Solr 4 search server. This article explains how to set that up when running an All-in-One \(AIO\) project.

You should have completed [Installing and Configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md) and generated [an AIO project](alfresco-sdk-tutorials-all-in-one-archetype.md). You will also need access to an Alfresco 5 installation as we need to copy the keystore and Tomcat users file from it.

You will learn how to setup a secure connection \(SSL\) between the Alfresco Repository web application \(alfresco.war\) and the Apache Solr 4 web application \(alfresco-solr4.war\). This is the normal configuration after you have installed Alfresco with a package installer. In the following instructions `ALFRESCO_INSTALL_DIR` is the directory path to where you installed Alfresco 5 with the package installer \(for example /opt/alfresco5\). And `AIO_PARENT_DIR` points to where the parent project directory is for the All-in-One \(AIO\) project \(for example /home/martin/src/all-in-one\).

1.  Stop the embedded Tomcat instance, if it is running.

2.  Copy the Repository keystore to the AIO project.

    Execute the following command to copy the keystore into the runner project:

    ```
    {ALFRESCO_INSTALL_DIR}/alf_data$ cp -R keystore/ {AIO_PARENT_DIR}/runner/
    ```

    We can now configure the embedded Tomcat instace to use this keystore.

3.  Copy Tomcat users definition to the AIO project.

    Execute the following command to copy the tomcat users file into the runner project:

    ```
    {AIO_PARENT_DIR}/runner/tomcat$ mkdir conf
    {ALFRESCO_INSTALL_DIR}/tomcat/conf$ cp tomcat-users.xml {AIO_PARENT_DIR}/runner/tomcat/conf/
    ```

    What we do here is first create a directory to hold the tomcat users file. And then we copy the tomcat users file from the Alfresco installation to this new directory in the runner project. This file contains identities for the Repository and Solr applications when setting up SSL connections.

4.  Turn on SSL for Repository.

    Open up the alfresco-global.properties file located in the \{AIO\_PARENT\_DIR\}/repo/src/main/properties/local directory. Then update the section about Solr configuration:

    ```
    index.subsystem.name=solr4
    dir.keystore={AIO_PARENT_DIR}/runner/keystore
    solr.host=localhost
    solr.port=8080
    solr.port.ssl=8443
    #solr.secureComms=none
    ```

    Note. You have to change \{AIO\_PARENT\_DIR\} to whatever the parent directory is for your AIO project.

5.  Update the `tomcat7-maven-plugin` with keystore, port, and Tomcat users

    Open up the pom.xml file located in the \{AIO\_PARENT\_DIR\}/runner directory. Then update the plugin configuration as follows:

    ```
    <plugin>
       <groupId>org.apache.tomcat.maven</groupId>
       <artifactId>tomcat7-maven-plugin</artifactId>
       <executions>
           <execution>
               <id>run-wars</id>
               <goals>
                   <goal>run</goal>
               </goals>
               <phase>pre-integration-test</phase>
           </execution>
       </executions>
       <configuration>
           <httpsPort>8443</httpsPort>
           <keystoreFile>${project.basedir}/keystore/ssl.keystore</keystoreFile>
           <keystorePass>kT9X6oe68t</keystorePass>
           <keystoreType>JCEKS</keystoreType>
           <truststoreFile>${project.basedir}/keystore/ssl.truststore</truststoreFile>
           <truststorePass>kT9X6oe68t</truststorePass>
           <truststoreType>JCEKS</truststoreType>
           <tomcatUsers>${project.basedir}/tomcat/conf/tomcat-users.xml</tomcatUsers>
    ```

6.  Change Solr 4 configuration package to the one that has SSL enabled.

    Open up the pom.xml file located in the \{AIO\_PARENT\_DIR\}/solr-config directory. Then update the dependency and plugin configuration as follows:

    ```
    <dependencies>
       <dependency>
           <groupId>org.alfresco</groupId>
           <artifactId>alfresco-solr4</artifactId>
           <version>${alfresco.version}</version>
           <classifier>config-ssl</classifier>
           <type>zip</type>
       </dependency>
    </dependencies>
    
    <build>
       <plugins>
           <plugin>
               <groupId>org.apache.maven.plugins</groupId>
               <artifactId>maven-dependency-plugin</artifactId>
               <executions>
                   <execution>
                       <id>unpack-alfresco-config</id>
                       <goals>
                           <goal>unpack</goal>
                       </goals>
                       <phase>generate-resources</phase>
                       <configuration>
                           <outputDirectory>${alfresco.solr.home.dir}</outputDirectory>
                           <artifactItems>
                               <artifactItem>
                                   <groupId>org.alfresco</groupId>
                                   <artifactId>alfresco-solr4</artifactId>
                                   <version>${alfresco.version}</version>
                                   <classifier>config-ssl</classifier>
                                   <type>zip</type>
                               </artifactItem>
                           </artifactItems>
    ```

    This Solr 4 configuration comes preconfigured with SSL enabled, keystore and truststore, including the keystores themselves.

7.  Delete previous "no-ssl" configuration directory.

    ```
    {AIO_PARENT_DIR}/alf_data_dev/solr4$ rm -rf config/
    ```

    This is so the new SSL enabled configuration is downloaded and installed correctly under alf\_data\_dev.

8.  Make sure that the Alfresco Repository \(alfresco.war\) web application is using SSL.

    Open up the pom.xml file located in the \{AIO\_PARENT\_DIR\}/repo directory. Then update the `maven-war-plugin` configuration as follows:

    ```
    <plugin>
       <artifactId>maven-war-plugin</artifactId>
       <executions>
           <execution>
               <id>prepare-exploded-war</id>
               <goals>
                   <goal>exploded</goal>
               </goals>
               <phase>prepare-package</phase>
           </execution>
           <execution>
               <id>default-war</id>
              <!-- <configuration>
                    <webXml>${project.build.directory}/${project.build.finalName}-nossl/WEB-INF/web.xml</webXml>
               </configuration>-->
           </execution>
       </executions>
    ```

    What we do here is just commenting out the web.xml file that we normally use when we don't want to use SSL.

9.  Start it up and make sure it works.

    You should see something like this in the logs:

    ```
    {AIO_PARENT_DIR}$ mvn clean install -Prun
    ...
    Jun 05, 2015 10:56:33 AM org.apache.coyote.AbstractProtocol start
    INFO: Starting ProtocolHandler ["http-bio-8080"]
    Jun 05, 2015 10:56:33 AM org.apache.coyote.AbstractProtocol start
    INFO: Starting ProtocolHandler ["http-bio-8443"]
    ```

    Try accessing Share securely: `https://localhost:8443/share`. Make sure search works by adding a text file with a unique word, then search for it. Then access Solr 4 securely: `https://localhost:8443/solr4`.


You have now setup SSL between the Alfresco Repository and the Solr 4 server.

**Parent topic:**[Advanced Topics](../concepts/alfresco-sdk-advanced-topics.md)

