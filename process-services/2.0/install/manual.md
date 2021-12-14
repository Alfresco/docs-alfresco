---
title: Install manually
---

There are two options for installing Process Services without using containers, depending on the environment you are deploying in:

* For trials, testing and development it's recommended to install using a setup wizard.
* For production environments it is recommended that you install manually.

## Install using setup wizards

There are setup wizards available for Linux, macOS and Windows operating systems.

> **Important**: The setup wizards are evaluation copies that are useful for trials and experimentation. The h2 database provided with them is not suitable for use in a production environment.

The setup wizards install their own Apache Tomcat container for Process Services, an h2 database and all prerequisite software for Process Services to run on your chosen operating system.

{% capture linux %}

Use these instructions to install Process Services on Linux.

1. Download the Linux setup wizard from your trial email.

2. Locate the bin you just downloaded and run the following command against it to update its permissions:

    ```bash
    chmod 777 <installer file name>
    ```

3. Run the setup wizard using the following command:

    ```bash
    ./<installer file name>
    ```

4. Read and accept the **License Agreement**.

5. Use the default **Installation Directory** or choose your own.

6. Select an **Installation Profile**.

7. Complete the installation.

    >**Note:** A message will appear displaying the default credentials and URL to use.

8. Navigate to your installation directory and run the following command to start the application:

    ```bash
    ./start-process-services.sh
    ```

    >**Note:** The default installation location is `/home/{user}/alfresco/process-services-{version}`

9. Enter `http://localhost:8080/activiti-app` into a browser once the application has started to begin using Process Services.

    >**Note:** Use the default credentials to log in. View the `process-services-readme.txt`, by default found in `/home/{user}/alfresco/process-services-{version}`, if you can't remember them.

10. Install the administrator application:

    1. Rename the file `activiti-admin.war.undeployed` found in `/home/{user}/alfresco/process-services-{version}/tomcat/webapps` to `activiti-admin.war`

    2. Stop and restart Tomcat.

    3. Navigate to `http://localhost:8080/activiti-admin` once the application has started back up.

{% endcapture %}
{% capture mac %}

Use these instructions to install Process Services on a Mac.

1. Download the Mac setup wizard from your trial email.

2. Locate the dmg you just downloaded using **Finder** and double click it.

3. Double click the Alfresco logo to launch the setup wizard.

    >**Note:** Click **Open** if you are prompted about opening files from the internet.

4. Read and accept the **License Agreement**.

5. Use the default **Installation Directory** or choose your own.

6. Select an **Installation Profile**.

7. Complete the installation.

    >**Note:** A message will appear displaying the default credentials and URL to use.

8. Navigate to your installation directory and double click the **StartProcessServices** application.

    >**Note:** The default installation location is `Applications\alfresco\process-services-{version}`

9. Enter `http://localhost:8080/activiti-app` into a browser once the application has started to begin using Process Services.

    >**Note:** Use the default credentials to log in. View the `process-services-readme.txt`, by default found in `Applications\alfresco\process-services-{version}`, if you can't remember them.

10. Install the administrator application:

    1. Rename the file `activiti-admin.war.undeployed` found in `Applications\alfresco\process-services-{version}\tomcat\webapps` to `activiti-admin.war`

    2. Stop and start Tomcat via the **Terminal** or by closing and re-opening the **StartProcessServices** application.

    3. Navigate to `http://localhost:8080/activiti-admin` once the application has started back up.

{% endcapture %}
{% capture windows-setup %}

Use these instructions to install Process Services on Windows.

1. Download the Windows setup wizard from your trial email.

2. Locate the exe you just downloaded and double click it to launch the setup wizard.

3. Read and accept the **License Agreement**.

4. Use the default **Installation Directory** or choose your own.

5. Select an **Installation Profile**.

6. Complete the installation.

    >**Note:** A message will appear displaying the default credentials and URL to use.

7. Navigate to your installation directory and double click the **StartProcessServices** application.

    >**Note:** The default installation location is `C:\Program Files\alfresco\process-services-{version}`

8. Enter `http://localhost:8080/activiti-app` into a browser once the application has started to begin using Process Services.

    >**Note:** Use the default credentials to log in. View the `process-services-readme.txt`, by default found in `C:\Program Files\alfresco\process-services-{version}`, if you can't remember them.

9. Install the administrator application:

    1. Rename the file `activiti-admin.war.undeployed` found in `C:\Program Files\alfresco\process-services-{version}\tomcat\webapps` to `activiti-admin.war`

    2. Stop and start Tomcat via the **Command Line** or by closing and re-opening the **StartProcessServices** application.

    3. Navigate to `http://localhost:8080/activiti-admin` once the application has started back up.

{% endcapture %}

{% include tabs.html tableid=setup opt1="Linux" content1=linux opt2="MacOS" content2=mac opt3="Windows" content3=windows-setup %}

After installing you will need to [apply a valid license file](#license) to your installation.

## Install manually

To install Process Services and the administrator application manually, download the relevant Web Application Archive (WAR) files.

It is recommended that you install the administrator application in a separate container to Process Services in a production environment. It is possible to install the two applications in the same web container, however separate containers allows them to be managed in isolation from one another.

The download files are available from the [support portal](https://support.alfresco.com){:target="_blank"}.

### Install Process Services

Use these instructions to install the Process Services application using the WAR file.

Ensure you have read the [supported platforms]({% link process-services/2.0/support/index.md %}) to confirm that your web container and database combination is supported before commencing with installation.

1. Install your web container and database.

    >**Note:** The following steps use Tomcat and MySQL for examples.

2. Create a schema for the `activiti-app` application. The default name is `activiti`

    In MySQL:

    ```sql
    CREATE DATABASE activiti DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
    ```

3. Create a user and password. This example will use `alfresco/alfresco`

    In MySQL:

    ```sql
    CREATE USER 'alfresco'@'localhost' IDENTIFIED BY 'alfresco';
    ```

4. Grant full privileges on the schema to this new user.

    In MySQL:

    ```sql
    GRANT ALL ON activiti.* TO 'alfresco'@'localhost';
    ```

5. Edit the `activiti-app.properties` file supplied with the WAR file.

    1. Uncomment the correct properties for the database you have installed.

    2. Update the values for the schema and credentials created in the previous steps and check that the `hibernate.dialect` property matches your chosen database type.

        For example:

        ```text
        com.mysql.cj.jdbc.Driver
        datasource.url=jdbc:mysql://127.0.0.1:3306/activiti?characterEncoding=UTF-8
        datasource.username=alfresco
        datasource.password=alfresco
        hibernate.dialect=org.hibernate.dialect.MySQLDialect
        ```

        >**Note:** Example syntax is provided in the `activiti-app.properties` file for other database types.

        > **Important:** Ensure that the driver for your database is on the classpath of the web application.

    3. Set a location for the file content to be at using `contentstorage.fs.rootFolder`.

    4. Set a location for the search and analytics indexes using `elastic-search.data.path`.

6. Ensure that the driver for your database is on the classpath of your web container.

    For Tomcat and MySQL:

    Copy the MySQL java connector jar to `<Tomcat install location>/lib`

7. Copy the `activiti-app.war` and `activiti-app.properties` files to your web container.

    For Tomcat:

    * `<Tomcat install location>/webapps/activiti-app.war`
    * `<Tomcat install location>/lib/activiti-app.properties`

8. Start up your web container.

    For Tomcat:

    * On Linux or MacOS run `<Tomcat install location>\\bin\\catalina.sh`
    * On Windows run `<Tomcat install location>/bin/catalina.bat`

9. Enter `http://localhost:8080/activiti-app` into a browser to begin using Process Services.

After installing you will need to [apply a valid license file](#license) to your installation.

### Install Process Services Administrator

Use these instructions to install Process Services Administrator using the WAR file.

Ensure you have read the [supported platforms]({% link process-services/2.0/support/index.md %}) to confirm that your web container and database combination is supported before commencing with installation.

1. Install your web container and database.

    >**Note:** The following steps use Tomcat and MySQL for examples.

2. Create a schema for the `activiti-admin` application. The default name is `activitiadmin`

    In MySQL:

    ```sql
    CREATE DATABASE activitiadmin DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
    ```

3. Create a user and password. This example will use `alfresco/alfresco`

    > **Important:** You do not need to complete this step if you use the same user you created when [installing Process Services](#install-process-services) and can skip to the next step.

    In MySQL:

    ```sql
    CREATE USER 'alfresco'@'localhost' IDENTIFIED BY 'alfresco';
    ```

4. Grant full privileges on the schema to this new user.

    In MySQL:

    ```sql
    GRANT ALL ON activitiadmin.* TO 'alfresco'@'localhost';
    ```

5. Edit the `activiti-admin.properties` file supplied with the main Process Services WAR file download.

    1. Uncomment the correct properties for the database you have installed.

    2. Update the values for the schema and credentials created in the previous steps and check that the `hibernate.dialect` property matches your chosen database type.

        For example:

        ```text
        com.mysql.cj.jdbc.Driver
        datasource.url=jdbc:mysql://127.0.0.1:3306/activitiadmin?characterEncoding=UTF-8
        datasource.username=alfresco
        datasource.password=alfresco
        hibernate.dialect=org.hibernate.dialect.MySQLDialect
        ```

        >**Note:** Example syntax is provided in the `activiti-admin.properties` file for other database types.

6. Copy the `activiti-admin.war` and `activiti-admin.properties` files to your web container.

    For Tomcat:

    * `<Tomcat install location>/webapps/activiti-admin.war`
    * `<Tomcat install location>/lib/activiti-admin.properties`

7. Start up your web container.

    For Tomcat:

    * On Linux or MacOS run `<Tomcat install location>\bin\catalina.sh`
    * On Windows run `<Tomcat install location>/bin/catalina.bat`

8. Enter `http://localhost:8080/activiti-admin` into a browser to begin using Process Services Administrator.

After installing you will need to [apply a valid license file](#install-license) to your installation.

### Install Process Workspace

You can install Process Workspace using a Web Application Archive (WAR) file or by deploying the files manually into your web container.

To install Process Workspace from a WAR file, visit the [support portal](https://support.alfresco.com){:target="_blank"} and download the latest version of `process-workspace.war`.

Move the `process-workspace.war` file into your web container and restart the server.

Using Tomcat as an example, this would be the `/webapps` folder.

Alternatively, you can manually deploy Process Workspace into your web container using the following steps:

1. Download the latest [supported version]({% link process-services/2.0/support/index.md %}) of Process Workspace from [artifacts.alfresco.com](https://artifacts.alfresco.com/nexus/){:target="_blank"}.

    >**Note:** Located in the `activiti-enterprise-releases` repository under `/com/alfresco/alfresco-process-services-workspace`.

2. Download and unzip the `.tgz` file.

3. Move the `dist` folder contained in the unzipped folder into your web container.

    >**Note:** For Tomcat this is the `/webapps` folder.

4. Restart your web server.

> **Important:** Note that the URL for Process Workspace will be generated from the name of the folder you deploy into your web container. To change this:
>
> 1. Rename the folder in your preferred development environment (IDE).
> 2. Restart your web server.
> 3. Navigate to Process Workspace in a browser using the format: `http://{host}:{port}/{folder-name}`
>
> For example, if you renamed the `dist` folder to `process-workspace` and deployed locally on port 8080 this would be: `http://localhost:8080/process-workspace`

## License

A valid license file is required to run Process Services.

A license file can be obtained from [support](https://support.alfresco.com){:target="_blank"} or a link is provided via email to download a temporary (30-day) license if you signed up for a free trial.

Logging into Process Services as an administrator will display a notification if a license is not currently valid.
Notifications are displayed when:

* No valid license file can be found
* A license file has expired or is not valid until a date in the future
* The current license file is close to expiring

There are two methods for uploading a license file to Process Services.

### Upload a license

To upload a license through the user interface:

1. Click the **UPLOAD LICENSE** button or use the top menu **Administrator** > **Upload license**

2. Browse to, or drag your `activiti.lic` file into the pop-up.

Alternatively, you can manually move the `activiti.lic` file into the web container.

For example using Tomcat: `<Tomcat install location>\lib\`
