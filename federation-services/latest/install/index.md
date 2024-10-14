---
title: Install Federation Services
---

The Federation Services capability for Alfresco Content Services is delivered in a number of installation files.

## Prerequisites

Check the [supported platforms]({% link federation-services/latest/support/index.md %}) page for information on what you require before you start the installation.

> **Note:** A compatible version of Alfresco Governance Services is required if you plan to use the Manage in Place capabilities. For example, if you're using Alfresco Content Services 23.1, make sure that you install Alfresco Governance Services 23.1.

You can download the Federation Services software from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

### Software requirements

See [Supported platforms]({% link federation-services/latest/support/index.md %}) page for required versions.

* Java: Java JRE is required
* Application server: Apache Tomcat
  * Memory pool: 4GB required, 8GB recommended. This can be updated in the Java tab of your Apache Tomcat **Properties** window.

    > **Note:** A separate instance is recommended, where possible, instead of using the same one used by Alfresco Content Services.

    > **Note:** Federation Services runs on the Spring platform, which does not support Tomcat versions beyond 9.

* Database: MongoDB
* Operating systems: Linux or Windows

#### Client Access

The client uses a web browser to access Federation Services. The following browsers are supported:

* Chrome (latest)
* Firefox (latest)
* Safari (latest)

#### Create a MongoDB database

Create the Federation Services database and user in MongoDB by executing the following commands in the mongo shell:

```text
use simflofy
db.createUser({"user":"simflofy", "pwd":"password",
"roles":["clusterMonitor", "dbOwner"]});
```

### Hardware requirements

Federation Services performance is based on a number of factors:

* Number of CPUs and speed
* Network bandwidth and latency
* RAM assigned to the operating system and Federation Services (Tomcat) itself
* Hard drive disk speeds and latency

Federation Services uses a database for configuration, job state, and auditing data. Auditing data can also be configured to go to a log file.

Finally, Federation Services will be integrating 2 or more products. Performance will be determined by the above factors, but also by the performance of each system being integrated.

> **Note:** Federation Services is an I/O intensive application and therefore should be provisioned accordingly. Recommend SSD or NVMe based back end storage with enough capacity to index the entire contents of the source data.

## Install steps

These steps describe how to install Federation Services to an instance of Alfresco Content Services.

You can download the release files from [Hyland Community](https://community.hyland.com/){:target="_blank"}. Log in, select the **Support** tab, and then the **Alfresco Downloads** option under **Software Downloads**. Search for the required product version and navigate to the version page.

1. Download the files provided for the Federation Services release.

   This should include the following:

   * `AFS-federation.war`
   * `AFS-admin.war`

2. Copy the Federation Services Admin and discovery WAR files or expanded ZIP to the Tomcat installation directory, `/Tomcat/webapps`.
3. Start Tomcat.
4. Navigate to the `mongo-db.properties` file, `Tomcat/webapps/3Sixty/Admin/WEB-INF/classes/mongo-db.properties`.
5. Set the credentials for the user and the database connection details.

   Depending on what database you created the admin user in, you may have to append the database name to the end of the URI. This is the authenticating database.

   The following example configuration assumes you followed the previous steps exactly:

   ```text
   mongo.db.username=simflofy
   mongo.db.password=#whatever password you set during mongo user creation
   mongo.db.uri=mongodb://[[USER]]:[[PASS]]@localhost:27017/simflofy
   ```

6. In the same folder, open `simflofy-global.properties` and check if all of the 'initialize' properties are set to `true`. If not, set them to `true` and save the file. 

   See the section on [properties]({% link federation-services/latest/admin/admin-properties.md %}) for more information.

7. If you have a shared loader enabled in Tomcat, move the global properties files to the `shared/classes` folder. Now the properties files will persist after redeploying the WAR.
8. Restart Tomcat.
9. In `simflofy-global.properties` set initialize properties to `false`.
10. Copy and paste the following into your browser:

    ```text
    http://(servername):(port)/3sixty-admin
    ```

    The default Federation Services username/password is `admin/admin`.

11. Access the Admin app through your preferred browser to [configure]({% link federation-services/latest/config/index.md %}) your installation.

## Configure Tomcat for SSL

To finish the installation of Federation Services, you need to generate or install a certificate, enable SSL, and port 8443 or port 443 in `tomcat/conf/server.xml`. Go to the [Tomcat SSL documentation](https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html){:target="_blank"} for more information.
