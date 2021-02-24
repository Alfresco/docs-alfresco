---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, internationalization]
---

# Adding resource bundles for additional languages

Once you have created and registered your web script, you can add additional resource bundles for other languages.

This task adds another resource bundle for the German language.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

3.  Create a German resource bundle for your I18N sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field as: i18n.get\_de.properties

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        greeting=Guten Tag

        farewell=Auf Wiedersehen

    6.  Click **Next**, click **Finish**, and then click **OK**.

4.  Re-register the I18N web script with Alfresco.

    1.  In a web browser, enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**.

        This time you have created a resource bundle for the German language as identified by the locale of `de`. Locales are specified as follows: `<language>[_<country>][_<variant>]`

        The language argument is a valid ISO language code, which is a lowercase, two-letter code as defined by ISO-639. The optional country argument is a valid ISO country code, which is an uppercase, two-letter code as defined by ISO-3166. Finally, the optional variant argument is a vendor-or web browser–specific code.

5.  Test your response template to ensure it is rendering values from the German resource bundle by typing the following in your command line: curl -H "Accept-Language: de" "http://localhost:8080/alfresco/service/i18n"

    The response is: `Guten Tag. Auf Wiedersehen.`


A client specifies its preferred language through the HTTP header named `Accept-Language`, to which the Web Script Framework adheres.

**Parent topic:**[Internationalization \(I18N\)](../concepts/ws-I18N.md)

