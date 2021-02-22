---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Test it out

This topic describes the steps to ensure that CAS is authenticating Alfresco Explorer and Share applications properly.

1.  Start up the servers and check for errors in their logs.

    ```
    catalina.sh start
    /etc/init.d/httpd start       
    ```

2.  Browse to the CAS login page at [http://your.host.com/examples/jsp/snp/snoop.jsp](http://your.host.com/examples/jsp/snp/snoop.jsp).

    When you enter a valid LDAP username and password, you will be redirected back to the *Snoop JSP* sample. It should display the name of the user you logged in as in the Remote User field, among other attributes.

3.  To ensure that CAS is authenticating Alfresco Share's client certificate correctly, install `alfresco-system.p12` into your browser, delete all your cookies and then navigate to `snoop.jsp` again. This time, you should see alfresco-system  as the Remote User without even being prompted for a username and password.

4.  If you have successfully performed all the previous steps, try out the Alfresco Explorer and Share applications at [http://your.host.com/alfresco](http://your.host.com/alfresco) and [http://your.host.com/share](http://your.host.com/share).

    **Note:** Remember to remove the `alfresco-system` certificate from your browser before trying out the Alfresco Explorer and Share applications. If not, then carefully check all Apache HTTP Server and Tomcat log files, and set DEBUG logging in your CAS log4j.properties, if necessary.


**Parent topic:**[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)

