---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring a SQL Server database on Amazon RDS

This section describes how to configure a SQL Server database on Amazon RDS for use with Alfresco.

**Prerequisites:**

-   Setup Amazon RDS using the AWS Management Console. For more information, see the [AWS documentation](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).
-   Amazon EC2 instance

1.  Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    For Amazon Linux, the user name is `ec2-user`. For RHEL5, the user name is either `root` or `ec2-user`. For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`. 

2.  Execute `sudo su` to change to root.

3.  Download the Alfresco installer for Linux from the [Alfresco Support Portal](http://support.alfresco.com).

4.  Install the downloaded Alfresco installer using the following commands:

    ```
    chmod 777 alfresco-enterprise-5.0.x-installer-linux-x64.bin
    sudo ./alfresco-enterprise-5.0.x-installer-linux-x64.bin      
    ```

5.  Install the Microsoft SQL Server database connector. The database connector allows SQL Server database to talk to the Alfresco server.

    This release requires the Microsoft SQL Server JDBC Driver 4.0 for compatibility with the SQL Server database.

    1.  Download sqljdbc4.jar from the Microsoft SQL Server download site.

    2.  Copy the JDBC driver into the <TOMCAT\_HOME\>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS.

7.  Create a database named alfresco.

8.  Enable snapshot isolation mode with the following command:

    ```
    ALTER DATABASE alfresco SET ALLOW_SNAPSHOT_ISOLATION ON;
    ```

9.  Create a user named alfresco.

10. Set the new user's password to alfresco.

11. Open the <classpathRoot\>/alfresco-global.properties file.

12. Locate the following property:

    `dir.root=`

13. Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

14. Set and uncomment the database connection properties as shown below:

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=sql-alfresco.cw4mo3qj8qdu.us-east-1.rds.amazonaws.com
    db.port=1433
    db.pool.max=275
    db.txn.isolation=4096
    
    # SQL Server connection
    
    db.driver=com.microsoft.sqlserver.jdbc.SQLServerDriver
    db.url=jdbc:sqlserver://${db.host}:${db.port};databaseName=${db.name}
    ```

15. Save the file.

16. Restart the Alfresco server.


**Parent topic:**[Configuring Amazon RDS databases](../concepts/amazon-rds.md)

