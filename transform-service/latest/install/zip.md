---
title: Install with zip
---

Use these instructions to install Transform Service using the distribution zip to an instance of Alfresco Content Services.

The Transform Service distribution zip file includes all the files required to provide the Transform Service capabilities. Ensure that you've installed the prerequisites before continuing, for more see [Install Transform Service]({% link transform-service/latest/install/index.md %}).

1. Download `alfresco-transform-service-distribution-1.3.x.zip` from the [Alfresco Support Portal](https://support.alfresco.com/){:target="_blank"}.

2. Extract the zip file into a system directory; for example, `<installLocation>/`.

    In this directory you'll see the following content including three runnable JAR files:

* alfresco-shared-file-store-controller-x.y.z.jar
* alfresco-transform-core-aio-boot-x.y.z.jar
* alfresco-transform-router-1.3.x.jar
* README.md

3. Start Active MQ.

    For example, run the following command from the ActiveMQ installation directory:

    ```bash
    bin/activemq start
    ```

    For more information on installing and configuring ActiveMQ, see [Configuring ActiveMQ](LINK).

    Check the output to ensure that it starts successfully.

    Make a note of the TCP URL, with example format `tcp://server:port`, where server is the host name of the server where ActiveMQ is installed. This is used in later steps.

    Alfresco Content Services uses ActiveMQ for message queuing with various products, including the Transform Service.

4. Start the Shared File Store controller:

    ```java
    java -DfileStorePath=/path/to/your/AlfrescoFileStore
     -jar alfresco-shared-file-store-controller-x.y.z.jar
    ```

    Check the output to ensure that it starts successfully.

    By default, files are stored in `fileStorePath=/tmp/Alfresco`. This can be modified using the `fileStorePath` parameter as shown in the above example.

    The Shared File Store allows components such as the repository, and the Transform Service to share a common place to store and retrieve files, for example, to enable transforms from an input source file to an output target file.

5. Start the all-in-one Transform Core Engine Spring Boot app:

    ```java
    java -DPDFRENDERER_EXE="<alfresco-pdf-renderer_installation_dir>/alfresco-pdf-renderer" 
     -DLIBREOFFICE_HOME="<libreoffice_installation_dir>" 
     -DIMAGEMAGICK_ROOT="<imagemagick_installation_dir>" 
     -DIMAGEMAGICK_DYN="<imagemagick_installation_dir>/lib" 
     -DIMAGEMAGICK_EXE="<imagemagick_installation_dir>/bin/convert" 
     -DACTIVEMQ_URL=failover:(tcp://server:61616)?timeout=3000
     -DFILE_STORE_URL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file
     -jar alfresco-transform-core-aio-boot-x.y.z.jar
    ```

    > **Note:** You may need to change the paths depending on your operating system.

    Check the output to ensure that it starts successfully.

    The all-in-one core T-Engine combines the five T-Engines (i.e. LibreOffice, ImageMagick, Alfresco PDF Renderer, Tika, and Misc) into one single engine. All functionality that's available in the five T-Engines is available in the all-in-one core T-Engine. The command-line options provide the paths to the installation locations and the URL of the messaging broker.

6. Start the Transform Router Spring Boot app:

    ```java
    java -DCORE_AIO_URL=http://localhost:8090 
     -DCORE_AIO_QUEUE=org.alfresco.transform.engine.aio.acs 
     -DACTIVEMQ_URL=failover:(tcp://server:61616)?timeout=3000 
     -DFILE_STORE_URL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file
     -jar alfresco-transform-router-1.3.x.jar
    ```

    Check the output to ensure that it starts successfully.

    The Transform Router allows simple (single-step) and pipeline (multi-step) transforms that are passed to the Transform Engines. The command-line options provide the router with the required data for T-Engines, queuing, and file-store URL.

7. Set the following properties in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

    ```bash
    # ActiveMQ properties:
    messaging.broker.url=failover:(tcp://server:61616)?timeout=3000
    messaging.broker.username=$MQUSER
    messaging.broker.password=$MQPASS
  
    # Shared File Store properties:
    sfs.url=http://localhost:8099
    sfs.endpoint=${sfs.url}/alfresco/api/-default-/private/sfs/versions/1/file
  
    # Transform Router property:
    transform.service.url=http://localhost:8095/
  
    # Transform Core properties:
    localTransform.core-aio.url=http://transform-core-aio:8090/
    alfresco-pdf-renderer.url=http://transform-core-aio:8090/
    jodconverter.url=http://transform-core-aio:8090/
    img.url=http://transform-core-aio:8090/
    tika.url=http://transform-core-aio:8090/
    transform.misc.url=http://transform-core-aio:8090/
    ```

    This overrides the default properties provided by Alfresco Content Services.

    > **Note:** Any changes to `alfresco-global.properties` require you to restart Alfresco Content Services to apply the updates. See the Alfresco Content Services documentation [Using the alfresco-global.properties file](LINK) for more.

8. Check that the [configuration]({% link transform-service/latest/config/index.md %}) is set up correctly for your environment.

9. Restart Alfresco Content Services.

10. Ensure that the environment is up and running:

    1.Check the logs for Alfresco Content Services startup.

    2.Monitor ActiveMQ by accessing the Web Console, e.g. `http://localhost:8161/admin/`.

    3.Temporarily enable `TransformDebug` in the repository if you want to see detailed debug log entries.

    4.Navigate to Digital Workspace or Share, and upload a file (such as a `.jpg`, `.png`, `.docx` etc.).

* Check the logs to see the metadata and work performed for the uploaded file. These should be available in the Spring Boot apps:
    * `alfresco-transform-router`
    * `alfresco-transform-core-aio`

Files should also be available in the specified path for the `alfresco-shared-file-store`. However, these files will only temporarily appear in the Shared File Store until explicitly deleted by the repository and/or expired and cleaned up.
