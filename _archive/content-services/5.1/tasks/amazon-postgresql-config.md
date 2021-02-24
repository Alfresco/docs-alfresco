---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# Configuring a PostgreSQL database on Amazon RDS

Use this information to configure a PostgreSQL database on Amazon RDS for use with Alfresco.

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

5.  Install the PostgreSQL database connector. The database connector allows PostgreSQL database to talk to the Alfresco server.

    1.  Download postgresql-9.X-xxxx.jdbc4.jar from the PostgreSQL download site: [http://www.postgresql.org/download/](http://jdbc.postgresql.org/download.html).

    2.  Copy the JAR file into the /lib directory.

        For example, for Tomcat, copy the JAR file into the <TOMCAT\_HOME\>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS Postgresql datasource. If Alfresco is installed as plain vanilla, `psql` from the Alfresco installation folder can be used.

7.  Create a database named alfresco.

8.  Create a user named alfresco.

    This user must have write permissions on all tables and sequences.

9.  Set the new user's password to alfresco.

10. Open the <classpathRoot\>/alfresco-global.properties file.

11. Locate the following line:

    `dir.root=./alf_data`

12. Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

13. Uncomment and set the database connection properties.

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=postgressql-alfresco.cw4mo3qj8qdu.us-east-1.rds.amazonaws.com
    db.port=5432
    db.pool.max=275
    
    # PostgreSQL connection (requires postgresql-8.2-504.jdbc3.jar or equivalent)
    #
    db.driver=org.postgresql.Driver
    db.url=jdbc:postgresql://${db.host}:${db.port}/${db.name}
    ```

    **Note:** Ensure that these database connection properties are not commented out.

14. Save the file.

15. Restart the Alfresco server.


**Parent topic:**[Configuring Amazon RDS databases](../concepts/amazon-rds.md)

