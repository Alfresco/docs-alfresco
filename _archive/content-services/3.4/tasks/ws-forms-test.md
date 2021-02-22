---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, forms]
---

# Testing the upload web script

This task demonstrates how to test an upload web script.

1.  Launch the upload form:

    1.  Open a web browser and enter the following URL: `http://localhost:8080/alfresco/service/multipart`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Fill in the file, title, and description fields of the form.

    4.  Click **Upload**.

    If you see a confirmation message detailing the name and size of the uploaded file, your web script is working.

2.  Locate the created document in the Alfresco content repository.

    1.  Open a web browser and enter the following URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Navigate to the **Company Home** folder and locate the document whose name matches the uploaded file name.

    4.  Examine the properties and content of the created document.


**Parent topic:**[Forms and web scripts](../concepts/ws-forms-about.md)

