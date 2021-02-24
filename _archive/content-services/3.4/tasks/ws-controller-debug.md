---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, debug]
---

# Debugging a controller script

When developing a web script, you may encounter an issue for which the solution is not obvious. In this case, it is useful to step through the controller script code line by line to pinpoint the cause of the issue.

The Alfresco content application server provides a built-in JavaScript Debugger that can be applied to web scripts. It is a useful tool for diagnosing the cause of issues and for stepping through the controller scripts of others to learn how they have implemented capabilities and used Alfresco services.

1.  Log in:

    1.  In your browser, enter: http://localhost:8080/alfresco/service/index

    2.  If prompted, log in with the user name admin and password admin.

2.  Enable the JavaScript Debugger:

    1.  Click **Refresh Web Scripts** on the Web Scripts Home page to ensure the Web Script Framework has cleared its caches.

    2.  Click **List Web Scripts.**

    3.  Click **Alfresco JavaScript Debugger**.

    4.  Click **Enable** to launch the JavaScript Debugger in a separate window.

3.  Invoke your web script:

    1.  In your browser, enter: http://localhost:8080/alfresco/service/dir/Company%20Home

    2.  If you see your web script's controller script inside the JavaScript Debugger window, you are ready to debug.

4.  Debug the controller script:

    1.  Click **Step Over** in the JavaScript Debugger to execute the currently highlighted line.

    2.  Interrogate the value of the verbose variable by typing `verbose` in the Expression window of the JavaScript Debugger.

    3.  Interrogate the value of the `{folderpath}` token by typing url.templateArgs.folderpath in the Expression window of the JavaScript Debugger.

5.  Continue web script execution:

    1.  Click **Go** in the JavaScript Debugger.

    2.  If you see the output of your web script in the web browser, you have successfully used the JavaScript Debugger.


**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

