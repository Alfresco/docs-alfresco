---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Install supporting tools

This topic describes the instructions used to prepare machine 1, the SSO server.

1.  Download the Sun JDK 1.6 rpm.bin from [http://java.sun.com](http://java.sun.com/) and run it to install Sun JDK 1.6.

2.  Download and extract the following under /opt.

    -   Apache Maven 2.2
    -   Apache Tomcat 6
3.  For authentication, we use the Apached HTTP Server rather than Tomcat, so in /opt/apache-tomcat-6.0.35/conf/server.xml, disable Tomcat authentication on the AJP 1.3 connector by setting `tomcatAuthentication=false`:

    ```
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" tomcatAuthentication="false"/> 
    ```

4.  Edit /root/.bashrc to set up your environment as shown below:

    ```
    export JAVA_OPTS="-Xmx1024M -XX:MaxPermSize=128M "
    export JAVA_HOME=/usr/java/latest
    export MVN_HOME=/opt/apache-maven-2.2.1
    export CATALINA_HOME=/opt/apache-tomcat-6.0.35
    
    export PATH=$JAVA_HOME/bin:$CATALINA_HOME/bin:$MVN_HOME/bin:$PATH  
    ```


**Parent topic:**[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)

