---
title: Install Federation Services
---

The Federation Services capability for Alfresco Content Services is delivered in a number of installation files.

## Prerequisites

Check the [supported platforms]({% link federation-services/latest/support/index.md %}) for information on what you require before you start the installation.

> **Note:** A compatible version of Alfresco Governance Services (if you plan to use the Manage in Place capabilities) is required, for example: if using Alfresco Content Services 23.1, make sure that you install Alfresco Governance Services 23.1.

You can download the Federation Services software from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

### Software requirements

* Java JRE 17+
* Tomcat 9
  * Memory pool: 4GB required, 8GB recommended. This can be updated in the Java tab of your Apache Tomcat Properties window.

    > **Note:** We recommend using a separate instance, where possible, instead of using the same one used by Alfresco Content Services.

    > **Note:** Federation Services runs on the Spring platform, which does not support Tomcat versions beyond 9.

* MongoDB 6.x
* Linux or Windows

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

Finally, Federation Services will be integrating 2 or more products. Performance will be determined by the above factors, but also by the performance of each system being integrated. Note: Federation Services is an I/O intensive application and therefore should be provisioned accordingly. Recommend SSD or NVMe based back end storage with enough capacity to index the entire contents of the source data.

## Install steps

These steps describe how to install Federation Services to an instance of Alfresco Content Services.
All files necessary for install are available from [Hyland Community](https://community.hyland.com/){:target="_blank"}. Sign in, select **Support > Alfresco Downloads**, and search for the product you require.

1. Download the files provided for the Federation Services release.

    This should include the following:

    * `AFS-federation.war`
    * `AFS-admin.war`

2. Copy the Federation Services Admin and discovery WAR files or expanded zip to **Tomcat Installation** `Directory/webapps` directory.
3. Start Tomcat.
4. Navigate to the `mongo-db.properties` file `Tomcat/Webapps/3Sixty/Admin/WEB-INF/classes/mongo-db.properties`.
5. Set the credentials for the user and the database connection details.
6. Depending on what database you created the admin user in, you may have to append the database name to the end of the uri. This is the authenticating database. The following example config assumes you followed the previous steps exactly.

    ```text
    mongo.db.username=simflofy
    mongo.db.password=#whatever password you set during mongo user creation
    mongo.db.uri=mongodb://[[USER]]:[[PASS]]@localhost:27017/simflofy
    ```

7. In the same folder, open `simflofy-global.properties` and check if all of the 'initialize' properties are set to true. If not, set them to `true` and save. See the section on properties for more information.
8. If you have a shared loader enabled in Tomcat, move the global properties files to the `shared/classes` folder. Now the properties files will persist after redeploying the WAR.
9. Restart Tomcat.
10. In `simflofy-global.properties` set initialize properties to false.
11. Copy and paste the following into your browser: `http://(servername):(port)/3sixty-admin`. The default Federation Services Username/Password is admin/admin.
12. Access the Admin app through your preferred browser to [configure]({% link federation-services/latest/config/index.md %}) your installation.

## Configure Tomcat for SSL

In order to finish the installation of Federation Services, you need to generate or install a certificate and enable SSL and and Port 8443 or port 443 in `tomcat/conf/server.xml`. Go to [Tomcat SSL documentation](https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html){:target="_blank"} for more information.
