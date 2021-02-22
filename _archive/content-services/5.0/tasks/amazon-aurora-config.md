---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring an Aurora database on Amazon RDS

This section describes how to configure an Aurora database on Amazon RDS for use with Alfresco. Amazon Aurora is a MySQL-compatible relational database management system.

**Prerequisites:**

-   Aurora support is only available when running in AWS.
-   Setup Amazon RDS using the AWS Management Console. For more information, see the [AWS documentation](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).
-   Alfresco is deployed on an Amazon EC2 instance

1.  Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    For Amazon Linux, the user name is `ec2-user`. For RHEL5, the user name is either `root` or `ec2-user`. For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`. 

2.  Execute `sudo su` to change to root.

3.  Download the Alfresco installer for Linux from the [Alfresco Support Portal](http://support.alfresco.com).

4.  Install the downloaded Alfresco installer using the following commands:

    ```
    chmod 777 alfresco-enterprise-5.0.x-installer-linux-x64.bin
    sudo ./alfresco-enterprise-5.0.x-installer-linux-x64.bin      
    ```

5.  Install the Aurora database connector.

    This release requires the MySQL JDBC driver 4.0 for compatibility with the MySQL database.

    1.  Download the mysql-connector driver from the MySQL JDBC driver download site.

    2.  Copy the JDBC driver into the <TOMCAT\_HOME\>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS.

7.  Create a database named alfresco.

8.  Create a user named alfresco.

9.  Set the new user's password to alfresco.

10. Open the <classpathRoot\>/alfresco-global.properties file.

11. Locate the following property:

    `dir.root=`

12. Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

13. Set and uncomment the database connection properties as shown below:

    ```
    db.name=alfresco2
    db.username=alfresco
    db.password=alfresco
    db.host=auroraqadb-cluster.cluster-clqevmd2v8y9.us-east-1.rds.amazonaws.com
    db.port=13306
    db.prefix=mysql
    db.pool.max=275
    
    # MySQL database connection
    
    db.driver=org.gjt.mm.mysql.Driver
    db.url=jdbc:mysql://${db.host}/${db.name}?${db.params} 
    OR
    db.url=jdbc:mysql://${db.host}:${db.port}/${db.name}?${db.params} 
    ```

14. Save the file.

15. Restart the Alfresco server.


**Parent topic:**[Configuring Amazon RDS databases](../concepts/amazon-rds.md)

