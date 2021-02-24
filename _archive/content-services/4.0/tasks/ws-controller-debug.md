---
author: Alfresco Documentation
---

# Debugging a controller script

When developing a web script, you may encounter an issue for which the solution is not obvious. In this case, it is useful to step through the controller script code line by line to pinpoint the cause of the issue.

The Alfresco content application server provides a built-in JavaScript Debugger that can be applied to web scripts. It is a useful tool for diagnosing the cause of issues and for stepping through the controller scripts of others to learn how they have implemented capabilities and used Alfresco services.

**Attention:** If you are running Alfresco on Microsoft Windows as a Service then the debugger may not display. A work around is to start Alfresco from the command line for debugging purposes.

1.  Log in:

    1.  In your browser, enter: http://localhost:8080/alfresco/service/index

    2.  If prompted, log in with the username admin and password admin.

2.  Enable the JavaScript Debugger:

    1.  Click **Refresh Web Scripts** on the Web Scripts Home page to ensure the Web Script Framework has cleared its caches.

    2.  Click **List Web Scripts.**

    3.  Click **Alfresco JavaScript Debugger**.

    4.  Click **Enable** to launch the JavaScript Debugger in a separate window.

3.  Invoke your web script:

    1.  In your browser, enter: http://localhost:8080/alfresco/service/dir/Company%20Home

    2.  Log in if required using username `admin` and password `admin`.

    3.  If you see your web script's controller script inside the JavaScript Debugger window, you are ready to debug.

4.  Debug the controller script:

    1.  Click **Step Over** in the JavaScript Debugger to execute the currently highlighted line.

    2.  Interrogate the value of the verbose variable by typing `verbose` in the Expression window of the JavaScript Debugger.

    3.  Interrogate the value of the `{folderpath}` token by typing url.templateArgs.folderpath in the Expression window of the JavaScript Debugger.

5.  Continue web script execution:

    1.  Click **Go** in the JavaScript Debugger.

    2.  If you see the output of your web script in the web browser, you have successfully used the JavaScript Debugger.


**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

