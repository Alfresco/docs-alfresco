---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring an Oracle database on Amazon RDS

Use this information to configure an Oracle database on Amazon RDS for use with Alfresco Content Services.

**Prerequisites:**

-   Setup Amazon RDS using the AWS Management Console. For more information, see the [AWS documentation](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).
-   Amazon EC2 instance

The Oracle database is case sensitive, so any configuration setting that you add into the alfresco-global.properties file must match the case used in Oracle.

1.  Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    For Amazon Linux, the user name is `ec2-user`. For RHEL5, the user name is either `root` or `ec2-user`. For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`. 

2.  Execute `sudo su` to change to root.

3.  Download the Alfresco Content Services installer for Linux from the [Support Portal](http://support.alfresco.com).

4.  Install the downloaded installer using the following commands:

    ```
    chmod 777 alfresco-enterprise-5.1.x-installer-linux-x64.bin
    sudo ./alfresco-enterprise-5.1.x-installer-linux-x64.bin
    ```

5.  Install the Oracle database connector. The database connector allows Oracle database to talk to the server.

    1.  Download ojdbc7.jar from the [Oracle download site](http://www.oracle.com/technetwork/database/features/jdbc/index-091264.html).

        Use the ojdbc7.jar in the Oracle Database 12c Release 1 \(12.1.0.1\) drivers.

    2.  Copy the JAR file into the /lib directory.

        For example, for Tomcat, copy the JAR file into the <TOMCAT\_HOME\>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS.

7.  Increase the available connections.

    1.  In the SQL\*Plus Console, run these commands:

        ```
        alter system set processes=275 scope=spfile sid='*';
        alter system set sessions=305 scope=spfile sid='*';
        alter system set transactions=330 scope=spfile sid='*';
        ```

    2.  Restart the database.

8.  Create a database named alfresco.

9.  Create a user named alfresco.

10. Set the new user's password to alfresco.

11. Open the <classpathRoot\>/alfresco-global.properties.sample file.

12. Edit the following line with an absolute path to point to the directory in which you want to store Alfresco Content Services data.

    For example: `dir.root=C:/Alfresco/alf_data`

13. Set and uncomment the database connection properties as shown below:

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=alfrescoora12.cw4mo3qj8qdu.us-east-1.rds.amazonaws.com
    db.port=1433
    db.pool.max=275
    db.txn.isolation=4096
    
    # Oracle database connection
    
    db.driver=oracle.jdbc.OracleDriver
    db.url=jdbc:oracle:thin:@${db.host}:${db.port}:${db.name}
    ```

    **Note:** Ensure that these database connection properties are not commented out.

14. Save the file without the .sample extension.

15. Restart the Alfresco Content Services server.


**Parent topic:**[Configuring Amazon RDS databases](../concepts/amazon-rds.md)

