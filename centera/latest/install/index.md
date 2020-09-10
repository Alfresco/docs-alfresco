---
title: Install Centera Connector
---
These steps describe how to install the Centera Connector module to an instance of Alfresco Content Services.

## Software prerequisites for the Centera Connector

To use the Centera Connector module, ensure that you have the prerequisite software installed on your machine.

Contact your EMC/Dell representative directly to access any downloads, for example:

* EMC Centera® SDK 3.3
* Server details and `.pea` files

## Setting up the Centera Connector environment

Create the environment for checking the EMC Centera connection.

{% capture windows %}

1. Download and install the Microsoft Visual C++ 2005 Service Pack 1 Redistributable Package.

2. Download and extract EMC Centera® SDK to a suitable directory, for example, `C:\centera`.

    * `Centera_SDK_Windows_2000-5.0-Win32Dev8.zip` for 32-bit systems
    * `Centera_SDK_Windows_2000-5.0-Win64Dev8.zip` for 64-bit systems
    On 32-bit systems, the subdirectory structure of the `C:\centera` directory includes the following directories:

    ```bash
    docs
    include
    lib
    lib32
    sdk_samples
    ```

    On 64-bit systems, the subdirectory structure of the `C:\centera` directory includes the following directories:

    ```bash
    docs
    include
    lib
    lib64
    sdk_samples
    ```

3. Download the Centera `.pea` file.

    For example, `c2armtesting.pea`.

4. Move the `c2armtesting.pea` file to the `C:\centera` directory.

5. Download and extract EMC Centera® SDK and Community Tools to any directory.

The structure of the `C:\centera` directory is similar to the following example (for 32-bit systems):

```bash
10.01.2014  17:55    <DIR>          .
10.01.2014  17:55    <DIR>          ..
11.12.2013  16:25             2 470 c2armtesting.pea
10.01.2014  17:41    <DIR>          docs
10.01.2014  17:41    <DIR>          include
10.01.2014  17:41    <DIR>          lib
10.01.2014  17:41    <DIR>          lib32
10.01.2014  17:41    <DIR>          sdk_samples
               1 File(s)          2 470 bytes
               7 Dir(s)  49 088 593 920 bytes free
```

The structure of the `C:\centera` directory is similar to the following example (for 64-bit systems):

```bash
10.01.2014  17:55    <DIR>          .
10.01.2014  17:55    <DIR>          ..
11.12.2013  16:25             2 470 c2armtesting.pea
10.01.2014  17:37    <DIR>          docs
10.01.2014  17:37    <DIR>          include
10.01.2014  17:37    <DIR>          lib
10.01.2014  17:37    <DIR>          lib64
10.01.2014  17:37    <DIR>          sdk_samples
               1 File(s)          2 470 bytes
               7 Dir(s)  49 088 593 920 bytes free
```

The structure of the `C:\centera\lib32` directory is similar to the following example:

```bash
10.01.2014  17:41    <DIR>          .
10.01.2014  17:41    <DIR>          ..
29.08.2012  17:33           774 144 FPCore.dll
29.08.2012  17:33           610 304 FPLibrary.dll
29.08.2012  17:33           610 948 FPLibrary.lib
29.08.2012  17:33           323 584 fpos32.dll
29.08.2012  17:33         2 011 136 fpparser.dll
29.08.2012  17:33           184 320 FPStreams.dll
29.08.2012  17:33           438 272 FPUtils.dll
29.08.2012  17:33           184 320 FPXML.dll
10.01.2014  17:41    <DIR>          lib
29.08.2012  17:33           262 144 pai_module.dll
               9 File(s)      5 399 172 bytes
               3 Dir(s)  49 088 593 920 bytes free
```

The structure of the `C:\centera\lib64` directory is similar to the following example:

```bash
10.01.2014  17:37    <DIR>          .
10.01.2014  17:37    <DIR>          ..
29.08.2012  17:34           983 552 FPCore.dll
29.08.2012  17:34           690 688 FPLibrary.dll
29.08.2012  17:34           616 178 FPLibrary.lib
29.08.2012  17:34           412 160 fpos64.dll
29.08.2012  17:34         2 919 424 fpparser.dll
29.08.2012  17:34           165 888 FPStreams.dll
29.08.2012  17:34           483 840 FPUtils.dll
29.08.2012  17:34           168 960 FPXML.dll
10.01.2014  17:37    <DIR>          lib
29.08.2012  17:34            63 488 pai_module.dll
               9 File(s)      6 504 178 bytes
               3 Dir(s)  49 088 593 920 bytes free
```

{% endcapture %}

{% capture linux %}

1. Download and extract EMC Centera® SDK (Centera_SDK_Linux-gcc3.3.tgz), for example, to `/opt`.

    A subdirectory structure of the `/opt/Centera_SDK` directory includes the following directories:

    ```bash
    total 20
    drwxr-xr-x.  4 root root 4096 Jan 10 21:32 docs
    drwxr-xr-x.  2 root root 4096 Jan 10 21:32 include
    drwxr-xr-x.  2 root root 4096 Aug 30  2012 install
    drwxr-xr-x.  2 root root 4096 Jan 10 21:32 lib
    drwxr-xr-x. 13 root root 4096 Sep 14  2006 sdk_samples
    ```

2. Install the EMC Centera® SDK using the following commands:

    ```bash
    cd /opt/Centera_SDK/install
    ./install
    ```

    The default installation directory is `/usr/local/Centera_SDK`.

3. Download the Centera `.pea` file.

    For example, `c2armtesting.pea`.

4. Move the `c2armtesting.pea` file to the Centera `/usr/local/Centera_SDK` directory.

5. Download and extract EMC Centera® SDK and Community Tools to any directory.

The structure of the `/usr/local/Centera_SDK` directory is similar to the following example:

```bash
total 12
-rw-r--r--. 1 root root 2470 Dec 11 16:25 c2armtesting.pea
drwxr-xr-x. 2 root root 4096 Dec 19 22:51 include
drwxr-xr-x. 4 root root 4096 Dec 19 22:51 lib
```

The structure of the `/usr/local/Centera_SDK/lib/32` directory is similar to the following example:

```bash
total 6316
lrwxrwxrwx. 1 root root      52 Dec 19 22:51 libFPCore32.so -> /usr/local/Centera_SDK/lib/32/libFPCore32.so.3.3.719
-rwxr-xr-x. 1 root root 1063484 Dec 19 22:51 libFPCore32.so.3.3.719
lrwxrwxrwx. 1 root root      44 Dec 19 22:51 libFPCore.so -> /usr/local/Centera_SDK/lib/32/libFPCore32.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPLibrary32.so -> /usr/local/Centera_SDK/lib/32/libFPLibrary32.so.3.3.719
-rwxr-xr-x. 1 root root  643603 Dec 19 22:51 libFPLibrary32.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPLibrary.so -> /usr/local/Centera_SDK/lib/32/libFPLibrary32.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPParser32.so -> /usr/local/Centera_SDK/lib/32/libFPParser32.so.3.3.50
-rwxr-xr-x. 1 root root 3800245 Dec 19 22:51 libFPParser32.so.3.3.50
lrwxrwxrwx. 1 root root      46 Dec 19 22:51 libFPParser.so -> /usr/local/Centera_SDK/lib/32/libFPParser32.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPStreams32.so -> /usr/local/Centera_SDK/lib/32/libFPStreams32.so.3.3.719
-rwxr-xr-x. 1 root root  121784 Dec 19 22:51 libFPStreams32.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPStreams.so -> /usr/local/Centera_SDK/lib/32/libFPStreams32.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPUtils32.so -> /usr/local/Centera_SDK/lib/32/libFPUtils32.so.3.3.719
-rwxr-xr-x. 1 root root  648376 Dec 19 22:51 libFPUtils32.so.3.3.719
lrwxrwxrwx. 1 root root      45 Dec 19 22:51 libFPUtils.so -> /usr/local/Centera_SDK/lib/32/libFPUtils32.so
lrwxrwxrwx. 1 root root      51 Dec 19 22:51 libFPXML32.so -> /usr/local/Centera_SDK/lib/32/libFPXML32.so.3.3.719
-rwxr-xr-x. 1 root root  129647 Dec 19 22:51 libFPXML32.so.3.3.719
lrwxrwxrwx. 1 root root      43 Dec 19 22:51 libFPXML.so -> /usr/local/Centera_SDK/lib/32/libFPXML32.so
lrwxrwxrwx. 1 root root      56 Dec 19 22:51 libPAI_module32.so -> /usr/local/Centera_SDK/lib/32/libPAI_module32.so.3.3.100
-rwxr-xr-x. 1 root root   49036 Dec 19 22:51 libPAI_module32.so.3.3.100
lrwxrwxrwx. 1 root root      48 Dec 19 22:51 libPAI_module.so -> /usr/local/Centera_SDK/lib/32/libPAI_module32.so
```

The structure of the `/usr/local/Centera_SDK/lib/64` directory is similar to the following example:

```bash
total 6736
lrwxrwxrwx. 1 root root      52 Dec 19 22:51 libFPCore64.so -> /usr/local/Centera_SDK/lib/64/libFPCore64.so.3.3.719
-rwxr-xr-x. 1 root root 1098829 Dec 19 22:51 libFPCore64.so.3.3.719
lrwxrwxrwx. 1 root root      44 Dec 19 22:51 libFPCore.so -> /usr/local/Centera_SDK/lib/64/libFPCore64.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPLibrary64.so -> /usr/local/Centera_SDK/lib/64/libFPLibrary64.so.3.3.719
-rwxr-xr-x. 1 root root  671881 Dec 19 22:51 libFPLibrary64.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPLibrary.so -> /usr/local/Centera_SDK/lib/64/libFPLibrary64.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPParser64.so -> /usr/local/Centera_SDK/lib/64/libFPParser64.so.3.3.50
-rwxr-xr-x. 1 root root 4061679 Dec 19 22:51 libFPParser64.so.3.3.50
lrwxrwxrwx. 1 root root      46 Dec 19 22:51 libFPParser.so -> /usr/local/Centera_SDK/lib/64/libFPParser64.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPStreams64.so -> /usr/local/Centera_SDK/lib/64/libFPStreams64.so.3.3.719
-rwxr-xr-x. 1 root root  134962 Dec 19 22:51 libFPStreams64.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPStreams.so -> /usr/local/Centera_SDK/lib/64/libFPStreams64.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPUtils64.so -> /usr/local/Centera_SDK/lib/64/libFPUtils64.so.3.3.719
-rwxr-xr-x. 1 root root  713762 Dec 19 22:51 libFPUtils64.so.3.3.719
lrwxrwxrwx. 1 root root      45 Dec 19 22:51 libFPUtils.so -> /usr/local/Centera_SDK/lib/64/libFPUtils64.so
lrwxrwxrwx. 1 root root      51 Dec 19 22:51 libFPXML64.so -> /usr/local/Centera_SDK/lib/64/libFPXML64.so.3.3.719
-rwxr-xr-x. 1 root root  151395 Dec 19 22:51 libFPXML64.so.3.3.719
lrwxrwxrwx. 1 root root      43 Dec 19 22:51 libFPXML.so -> /usr/local/Centera_SDK/lib/64/libFPXML64.so
lrwxrwxrwx. 1 root root      56 Dec 19 22:51 libPAI_module64.so -> /usr/local/Centera_SDK/lib/64/libPAI_module64.so.3.3.100
-rwxr-xr-x. 1 root root   52961 Dec 19 22:51 libPAI_module64.so.3.3.100
lrwxrwxrwx. 1 root root      48 Dec 19 22:51 libPAI_module.so -> /usr/local/Centera_SDK/lib/64/libPAI_module64.so
```

{% endcapture %}

{% include tabs.html tableid="centera" opt1="Windows" content1=windows opt2="Linux" content2=linux %}

## Install the Centera Connector AMP

The Centera Connector is packaged as an Alfresco Module Package (AMP) file.

1. Browse to the [Alfresco Support Portal](http://support.alfresco.com).

2. Download the `alfresco-centera-connector-2.2.x.amp` file.

3. Use the Module Management Tool (MMT) to install the AMP.

    `java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps\alfresco-centera-connector-2.2.x.amp <installLocation>\tomcat\webapps\alfresco.war`

    If your Alfresco Content Services installation is running within the Tomcat application server, you can use the `<installLocation>\bin\apply_amps` command to apply all AMP files that are located in the `<installLocation>\amps` directory.

4. Restart the Alfresco Content Services server.

## Test the Centera Connector

Test that the Centera Connector module is working correctly with Alfresco Content Services.

1. Enable `DEBUG` logging for the Centera Connector components.

    For example:

    ``` xml
    log4j.logger.org.alfresco.enterprise.repo.content.centera=DEBUG
    log4j.logger.org.alfresco.enterprise.repo.centera=DEBUG
    ```

2. Add the `xam:archived` aspect to the share-config-custom.xml file.

    For example:

    ```xml
    <alfresco-config>

       <config evaluator="node-type" condition="cm:content">

          <forms>
             <form>
                <!-- 2 column template -->

                <edit-form />

                <field-visibility>

                <!-- aspect: cm:storeSelector -->

                <show id="cm:storeName" />

                <!-- aspect: xam:archive -->
                <show id="xam:dateArchived" for-mode="view" />
                <show id="xam:retainUntil" for-mode="view" />
                <show id="cm:content" for-mode="view" />
                </field-visibility>

                <appearance>
                   <!-- Store Selector -->
                   <field id="cm:storeName" label="Store Name" description="Content Store Name" />
                   <set id="xam-archive" appearance="bordered-panel" label="XAM Archived" />
                   <field id="xam:dateArchived" label="XAM Date Archived" set="xam-archive" />
                   <field id="xam:retainUntil" label="XAM Retain Until Date" set="xam-archive" />
                </appearance>
             </form>
          </forms>
       </config>

    <config evaluator="string-compare" condition="DocumentLibrary">
       <aspects>
             <visible>
                <aspect name="xam:archive" label="XAM Archive" />
             </visible>
       </aspects>
    </config>
    </alfresco-config>
    ```

3. View the metadata for the document.

    The new store is shown as **xamArchive** and the **retainedUntil** date is set.

4. Copy the ClipID, and then open the C-Clip using the JCASScript tool.

    For example:

    ```bash
    CASScript>clipopen EQM2GC012MC77e72B24N2MMFU59G418ACSAIE70BAS340TN3E1JJL

    Clip Properties:

      Name:                untitled
      Creation Date:       2013.11.27 01:35:09 GMT
      Size:                13474
      Number of Tags:      1
      Number of Blobs:     1
      Retention Class:
      Retention Seconds:   86396
      Modified:            False
      EBR Enabled :        False
      Retention Hold:      False
    ```

    1. Check that the retention period was set.

        ```bash
        CASScript>clipattribs

        Number of attributes:  17

        Name:   creation.poolid        Value:   861673fa-1dd2-11b2-b535-b66ede9133c1-7
        Name:   retention.period       Value:   86396
        Name:   sdk.version            Value:   3.3.718
        Name:   modification.poolid    Value:   861673fa-1dd2-11b2-b535-b66ede9133c1-7
        Name:   type                   Value:   Standard
        Name:   name                   Value:   untitled
        Name:   creation.date          Value:   2013.11.27 13:35:09 GMT
        Name:   modification.date      Value:   2013.11.27 13:35:12 GMT
        Name:   creation.profile       Value:   armtesting
        Name:   modification.profile   Value:   armtesting
        Name:   numfiles               Value:   1
        Name:   totalsize              Value:   13474
        Name:   refid                  Value:   E5S2HABU8PRRBAS340TN3E1JJL
        Name:   clusterid              Value:   25c57a54-1dd2-11b2-b87c-ce625a7031f2
        Name:   prev.clip              Value:  
        Name:   clip.naming.scheme     Value:   MD5
        Name:   numtags                Value:   1
        ```

    2. Check that the node and application properties have been copied over.

        Select the first tag of the opened C-Clip. For example:

        ```bash
        CASScript>tagfirst

        CASTag Properties:

         Name:                com.alfresco.content
         Has Blob:            True
         Blob Size:           13474
         Number of Attributes:10
         Has Parent:          False
         Has Next Sibling:    False
         Has Child:           False
        ```

        Display all the attributes. For example:

        ```bash
        CASScript>tagattribs

        Number of attributes: 10

         Name: modified-date   Value: 1385553402696
         Name: com.alfresco.xam.archive.node.sys:ref        Value: workspace://SpacesStore/51bba786-184b-4d7b-8b2a-da90875e5b16
         Name: com.alfresco.xam.archive.app.name            Value: Main Repository
         Name: com.alfresco.xam.archive.node.cm:created     Value: 2013-11-27T15:56:27.011+04:00
         Name: com.alfresco.xam.archive.app.version         Value: 4.2.0 (28)
         Name: com.alfresco.xam.archive.app.db              Value: jdbc:mysql://localhost:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
         Name: com.alfresco.xam.archive.node.sys:path       Value: /app:company_home/st:sites/cm:test/cm:documentLibrary/cm: abc.txt
         Name: com.alfresco.xam.archive.node.cm:creator     Value: admin
         Name: com.alfresco.xam.archive.node.cm:name        Value: abc.txt
         Name: com.alfresco.xam.archive.app.vendor          Value: Alfresco Software
        ```

    3. Type `tagClose` to close curent tag.

    4. Type `clipClose` to close current C-Clip.

    5. Type `poolClose` to close current connection to EMC Centera pool.

5. Test the folder hierarchy.

    1. Create a folder containing several files and folders,

    2. Apply the `xam:archived` aspect to the top-level folder.

    3. Check that the aspect has been applied to the entire hierarchy.

    4. Choose one of the files in the hierarchy and check through for a single file from step 1.

## Setting up the CenteraContentStore as the main store

To set up the CenteraContentStore to be the main store, it is recommended that you also configure the primary store as a CachingContentStore.

See [Configuring CachingContentStore](LINK) for more information.

This setup relates to new content and cannot be applied retrospectively, unless all content is moved from the file system to Centera.

1. Create `xam-custom-context.xml` file in the `<extension>` directory.

    For example, `<installLocation>/tomcat/shared/classes/alfresco/extension`.

2. Copy the `org_alfresco_module_centera_centeraContentStore` bean from `<installLocation>/tomcat/webapps/alfresco/WEB-INF/classes/alfresco/module/org_alfresco_module_xamconnector/module-context.xml` file.

    For example:

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>

    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>

    <beans>

        <bean id="org_alfresco_module_centera_centeraContentStore" class="org.alfresco.enterprise.repo.content.centera.CenteraContentStore" init-method="init">

            <property name="readOnly" value="false" />
            <property name="centeraConnection" ref="org_alfresco_module_centera_centeraConnection"/>
            <property name="contentFieldName" value="${xam.archive.contentFieldName}"/>

        </bean>

    </beans>
    ```

3. Paste the bean in to the newly created `xam-custom-context.xml` file.

4. Change the bean id to `fileContentStore`.

    For example:

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>

    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>

    <beans>

        <bean id="fileContentStore" class="org.alfresco.enterprise.repo.content.centera.CenteraContentStore" init-method="init">

            <property name="readOnly" value="false" />
            <property name="centeraConnection" ref="org_alfresco_module_centera_centeraConnection"/>
            <property name="contentFieldName" value="${xam.archive.contentFieldName}"/>

        </bean>

    </beans>
    ```

5. Add the following property to `alfresco-global.properties` file.

    ```bash
    xam.archive.contentFieldName=com.alfresco.content
    ```

6. Disable the `contentstore.deleted` store by emptying the list of listeners in the `content-services-context.xml` file.

    For example:

    ```xml
    <bean id="deletedContentBackupListeners" class="java.util.ArrayList">
          <constructor-arg>
             <list>
                <!--
                <ref bean="deletedContentBackupListener" />
                -->
             </list>
          </constructor-arg>
       </bean>
    ```

7. Start Alfresco Content Services server.
