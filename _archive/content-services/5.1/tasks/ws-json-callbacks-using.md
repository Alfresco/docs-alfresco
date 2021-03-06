---
author: Alfresco Documentation
---

# Using the JSON callback

Creating a callback example involves creating an HTML page that invokes the Hello User web script with a callback that displays the JSON response in an alert box.

**Note:** For security reasons, this mechanism is disabled by default. To enable it on any web scripts container, set the bean property: `allowCallbacks = true`. This change can be made in web-scripts-application-context.xml, or more conveniently outside of the Alfresco WAR file in tomcat/shared/classes/alfresco/extension/custom-web-context.xml.

1.  Create a custom-web-context.xml file in the extension directory \(tomcat/shared/classes/alfresco/extension\).

2.  Copy the complete bean `bean id="webscripts.container` from the web-scripts-application-context.xml file located \(v5.1\) in the ./alfresco/WEB-INF/lib/alfresco-remote-api-5.1.jar/alfresco/web-scripts-application-context.xml into the custom context file.

3.  Add the property `<property name="allowCallbacks">` to the bean \(see example below\):

    ```
             
              <bean id="webscripts.container" class="org.alfresco.repo.web.scripts.TenantRepositoryContainer" parent="baseAlfrescoRepositoryContainer" init-method="setup">
                <property name="configService" ref="webscripts.config" />
                <property name="name"><value>Repository</value></property>
                <property name="allowCallbacks"><value>true</value></property>
                <property name="scriptObjects">
                  <map merge="true">
                    <entry key="paging">
                      <ref bean="webscripts.js.paging"/>
                    </entry>
                  </map>
                </property>
                <property name="webScriptsRegistryCache" ref="webScriptsRegistryCache"/>
                <!-- Use the time-limited transaction helper to keep request times to an acceptable duration -->
                <property name="transactionService" ref="transactionService" />
                <!-- The transaction helper used to generate error responses must be unlimited -->
                <property name="fallbackTransactionHelper" ref="retryingTransactionHelper" />
                <property name="authorityService" ref="AuthorityService" />
                <property name="repository" ref="repositoryHelper" />
                <property name="repositoryImageResolver" ref="webscripts.repo.imageresolver" />
                <property name="templateProcessorRegistry" ref="webscripts.repo.registry.templateprocessor" />
                <property name="scriptProcessorRegistry" ref="webscripts.repo.registry.scriptprocessor" />
                <property name="descriptorService" ref="DescriptorService" />
                <property name="tenantAdminService" ref="tenantAdminService" />
                <property name="encryptTempFiles" value="${webscripts.encryptTempFiles}"/>
                <property name="tempDirectoryName" value="${webscripts.tempDirectoryName}"/>
                <property name="memoryThreshold" value="${webscripts.memoryThreshold}"/>
                <property name="maxContentSize" value="${webscripts.setMaxContentSize}"/>
              </bean>
              
     
    ```

4.  Restart application server.

5.  Create the HTML page.

    1.  Create a file named callback.html on your machine's local file system.

    2.  Edit the file and add the following HTML:

        ```
        
          
        <html>
        <body>
        <script>
        // callback function to display greeting
        function showGreeting(res) {alert(res.greeting + ' ' + res.user);}
        // invoke web script hello user web script
        var script = document.createElement('SCRIPT');
        script.type = 'text/javascript';
        script.src = 'http://localhost:8080/alfresco/s/hellouser.json?alf_callback=showGreeting';
        document.body.appendChild(script);
        </script>
        </body>
        </html>
        
        
        ```

6.  Test the callback.

    1.  Open the file callback.html file in your web browser.

    2.  If prompted, log in with the user name `admin` and password `admin`.

    An alert box displaying the message hello adminindicates your callback is working.


**Parent topic:**[Creating a Hello User web script with authentication](../tasks/ws-hello-user-create.md)

