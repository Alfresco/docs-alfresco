---
title: Client debug mode
---

Client Debug Mode allows you to debug JavaScript and CSS served to the client.

Enabling the Client Debug Mode can be done through editing `tomcat/webapps/share/WEB-INF/classes/alfresco/share-config.xml` 
or through editing `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml`. Editing this latter file is 
more convenient for your custom configurations, as it will survive re-explosions of the Content Services WAR 
(`alfresco.war`) file. You simply need to set the `client-debug` element to true, `<client-debug>true</client-debug>`.

Once this is set and the Tomcat server restarted you will see three changes:

1.  The underlying Surf platform will serve uncompressed JavaScript and CSS resources.
2.  A new `LoggingService` will be included in pages.
3.  A new Debug Menu will be displayed on the main header menu.

The Debug Menu menu item has the following sub-menu items:

|Menu item|Description|
|---------|-----------|
|Debug Logging|Toggle logging on and off|
|Show All Logs|Toggle full logging on and off|
|Show Warning Messages|Toggle just the warning messages on and off|
|Show Error Messages|Toggle just the error messages on and off|
|Update Logging Preferences|Configure the filter for messages|

1.  Load the file `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml` into your favorite editor.

2.  Set the `client-debug` element to true, `<client-debug>true</client-debug>`.

3.  Save the file.

4.  Restart the Tomcat (or other) application server.

5.  Log in to Share.

    You will now see that there is a **Debug Menu** item on the main menu.

6.  In the next part of the tutorial you will see how to use some of the main **Debug Menu** menu items.

7.  On the **Debug Menu** menu ensure that the **Debug Logging** and **Show All Logs** items are selected.

8.  Open a debug console. For example, in Firefox select **Tools > Web Developer > Web Console** to select a debug console.

9.  Refresh the Dashboard page and check the output in the debug console.

    Notice how each line of debug is prefixed, for example with `alfresco/core/Core[createWidget] >>`. The first part of the debug message prefix is the widget that has output the log message and the value between the square brackets is the function that output the log message. This information is obtained directly from the calling function (where the browser supports it) so long as the function has been declared according to the following standard:

    ```javascript
    createWidget: function alfresco_core_Core__createWidget(config, domNode, callback, callbackArgs) {                        
    ```

    Note the use of single and double underscores.

    The log requests are made as follows:

    ```javascript
    this.alfLog("log", "Creating widget: ",config);                        
    ```

    All logging is decoupled over a publication/subscription model, and calling `alfLog` function publishes on a specific log topic (`ALF_LOG_REQUEST`) to which the default logging service (`alfresco/services/LoggingService`) subscribes. The logging service inspects the calling function and attempts to determine the widget name and function name from the supplied data. The pattern it looks for is that the widget name and function are delimited by the last double underscore `__` and it converts single underscores into forward slashes.

    By providing the widget and function names it should be easier to get identify exactly in the source code where problems exist.

10. In the next part of the tutorial you will see how to use the logging filters facility.

11. On the **Debug Menu** item select **Update Logging Preferences**.

    You will be presented with a dialog that allows you to enter a filter, to limit the debug messages displayed. For example, you could enter `alfresco/menus/.*` to display only log messages related to menus. The filtering is implemented through use of regular expressions.

    >**Important:** Filter information is persisted to a user's preferences by default. This means that if you are debugging using different user accounts you will need to update the preferences for each user that you log in as.

