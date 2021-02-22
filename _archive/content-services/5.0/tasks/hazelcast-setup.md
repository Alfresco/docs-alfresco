---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Setting up Hazelcast dashboard \(mancenter\)

The Hazelcast Management Center \(mancenter\) enables you to monitor and manage your servers running hazelcast. Additionally, mancenter enables you to monitor the overall state of your clusters, and analyze and browse your data structures in detail. This topic describes the instructions for setting up a Hazelcast dashboard \(mancenter\).

The Hazelcast diagnostics and reporting application is a useful addition to an Alfresco repository cluster. It can be installed on any servlet container.

**Note:** The Hazelcast 2.4.1 Management Center does not work with Java version greater than 7. The Management Center can only log useful information from Alfresco One running Java 7.

1.  Install a servlet container, for example Tomcat. See [Installing Tomcat application server](configfiles-change-path.md) for more information.

2.  Deploy the `mancenter.war` file to the servlet container.

3.  Specify the location of the data directory by setting the java property, `hazelcast.mancenter.home`. To do so, add the following property to CATALINA\_OPTS environment variable.

    ```
    -Dhazelcast.mancenter.home=/home/tomcat7/mancenter_data
    ```

    The data directory where the servlet container is running must be writeable by the user.

4.  Set the repository property to enable mancenter use.

    ```
    alfresco.hazelcast.mancenter.enabled=true
    ```

5.  Set the repository property, `alfresco.hazelcast.mancenter.url` to point to the mancenter web application.

    ```
    alfresco.hazelcast.mancenter.url=http://mancenter.example.com:8080/mancenter
    ```

6.  Ensure that the repository servers are able to access the mancenter server at the URL specified in Step 5. The cluster members will push any cluster information updates to this URL. Remember to configure appropriate firewall rules.


**Parent topic:**[Setting up repository server cluster](../concepts/cluster-overview.md)

