---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
option: [web script, JSON callback]
---

# Using the JSON callback

Creating a callback example simply involves creating an HTML page that invokes the Hello User web script with a callback that displays the JSON response in an alert box.

1.  Create the HTML page.

    1.  Create a file named callback.html on your machine’s local file system.

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


**Parent topic:**[JSON callbacks](../concepts/ws-json-callbacks.md)

