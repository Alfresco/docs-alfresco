---
author: Alfresco Documentation
---

# Using the JSON callback

Creating a callback example simply involves creating an HTML page that invokes the Hello User web script with a callback that displays the JSON response in an alert box.

1.  Create the HTML page.

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

2.  Test the callback.

    1.  Open the file callback.html file in your web browser.

    2.  If prompted, log in with the user name admin and password admin.

    An alert box displaying the message hello adminindicates your callback is working.


**Note:** For security reasons, this mechanism is disabled by default. To enable it on any web scripts container, set the bean property: `allowCallbacks = true`. This change can be made in web-scripts-application-context.xml, or more conveniently outside of the Alfresco WAR file in tomcat/shared/classes/alfresco/extension/custom-web-context.xml.

```

  
<bean id="webscripts.container" class="org.alfresco.repo.web.scripts.RepositoryContainer" parent="webscripts.abstractcontainer">
   <property name="name"><value>Repository</value></property>
   <property name="allowCallbacks">
     <value>true</value>
   </property>
   ...
   

```

**Parent topic:**[Creating a Hello User web script with authentication](../tasks/ws-hello-user-create.md)

