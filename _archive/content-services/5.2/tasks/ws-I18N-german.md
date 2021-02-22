---
author: Alfresco Documentation
---

# Adding resource bundles for additional languages

Once you have created and registered your web script, you can add additional resource bundles for other languages.

This task adds another resource bundle for the German language.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click on the Repository link on the Share header.

3.  Navigate to **Data Dictionary \> Web Scripts Extensions \> org \> example**.

4.  Create a German resource bundle for your i18n sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name for the web script in the Name field: `i18n.get_de.properties`

    3.  Type the following in the content box:

        ```
        greeting=Guten Tag
        farewell=Auf Wiedersehen
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

5.  Re-register the i18n web script with Alfresco Content Services.

    1.  In a web browser, enter the URL: `http://localhost:8080/alfresco/service/index`

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click **Refresh Web Scripts**.

        This time you have created a resource bundle for the German language as identified by the locale of `de`. Locales are specified as follows: `<language>[_<country>][_<variant>]`

        The language argument is a valid ISO language code, which is a lowercase, two-letter code as defined by ISO-639. The optional country argument is a valid ISO country code, which is an uppercase, two-letter code as defined by ISO-3166. Finally, the optional variant argument is a vendor-or web browser–specific code.

6.  Test your response template to ensure it is rendering values from the German resource bundle by typing the following in your command line: `curl -H "Accept-Language: de" "http://localhost:8080/alfresco/service/i18n"`

    The response is: `Guten Tag. Auf Wiedersehen.`


A client specifies its preferred language through the HTTP header named `Accept-Language`, to which the Web Script Framework adheres.

**Parent topic:**[Internationalization \(i18n\)](../concepts/ws-I18N.md)

