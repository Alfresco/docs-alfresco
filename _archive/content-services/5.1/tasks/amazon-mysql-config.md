---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the MySQL database on Amazon RDS

Use this information to configure a MySQL database on Amazon RDS for use with Alfresco.

**Prerequisites:**

-   Setup Amazon RDS using the AWS Management Console. For more information, see the [AWS documentation](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).
-   Amazon EC2 instance

1.  Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    For Amazon Linux, the user name is `ec2-user`. For RHEL5, the user name is either `root` or `ec2-user`. For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`. 

2.  Execute `sudo su` to change to root.

3.  Download the Alfresco installer for Linux from the [Alfresco Support Portal](http://support.alfresco.com).

4.  Install the downloaded Alfresco installer using the following commands:

    ```
    chmod 777 alfresco-enterprise-5.1.x-installer-linux-x64.bin
    sudo ./alfresco-enterprise-5.1.x-installer-linux-x64.bin      
    ```

5.  Install the MySQL database connector.

    The MySQL database connector is required when installing Alfresco with MySQL. The database connector allows MySQL database to talk to the Alfresco server.

    1.  Download mysql-connector-java-5.1.32.jar from the MySQL download site: [http://dev.mysql.com/](http://dev.mysql.com).

    2.  Copy the JAR file into the /lib directory.

        For example, for Tomcat, copy the JAR file into the <TOMCAT\_HOME\>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS.

7.  Create a database named alfresco.

8.  Create a user named alfresco.

9.  Set the new user's password to alfresco.

10. Open the <classpathRoot\>/alfresco-global.properties file.

11. Edit the following line with an absolute path to point to the directory in which you want to store Alfresco data.

    For example: `dir.root=C:/Alfresco/alf_data`

12. Set and uncomment the database connection properties as shown below:

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=alfqa-mysql5-6-19a.cw4mo3qj8qdu.us-east-1.rds.amazonaws.com
    db.port=3306
    db.pool.max=275
    
    # MySQL connection
    
    db.driver=org.gjt.mm.mysql.Driver
    db.url=jdbc:mysql://${db.host}:${db.port}/${db.name}?useUnicode=yes&characterEncoding=UTF-8
    ```

    **Note:** Ensure that these database connection properties are not commented out.

13. Save the file.

14. Restart the Alfresco server.


**Parent topic:**[Configuring Amazon RDS databases](../concepts/amazon-rds.md)

