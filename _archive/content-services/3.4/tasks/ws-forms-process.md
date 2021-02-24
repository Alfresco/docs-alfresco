---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, forms]
---

# Processing multipart forms

This task demonstrates how to handle multipart/form-data form submits by creating two web scripts for the following functions:

-   Present a form that allows the selection of a file along with title and description
-   Upload the selected file into the Alfresco content repository

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the following URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

3.  Create a folder to represent the top-level package structure \(skip this step if the **org** space already exists\):

    1.  In the Create menu, click **Create Space**.

    2.  Enter the name for the folder in the Name field, such as: org

    3.  Click **Create Space**.

4.  Create a sub-package \(skip this step if the **example** space already exists\):

    1.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org**.

    2.  In the Create menu, click **Create Space**.

    3.  Enter the name for the folder in the Name field, such as: example

    4.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

5.  Create a web script description document for your form:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field as: multipart.get.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript>
          <shortname>File Upload Sample</shortname>
          <description>Form to upload file.</description>
          <url>/multipart</url>
          <authentication>user</authentication>
        </webscript>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

6.  Create an HTML response template for your form:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: multipart.get.html.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <html\>
        <body\>
          <form action="$\{url.service\}" method="post" enctype="multipart/form-data"\>
            File: <input type="file" name="file"\><br\>
            Title: <input name="title"\><br\>
            Description: <input name="description"\><br\>
            <input type="submit" name="submit" value="Upload"\>
          </form\>
        </body\>
        </html\>
        ```

7.  Create a web script description document for your upload web script:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: multipart.post.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript\>
          <shortname\>File Upload Sample</shortname\>
          <description\>Handling of multipart/form-data requests.</description\>
          <url\>/multipart</url\>
          <authentication\>user</authentication\>
        </webscript\>
        ```

8.  Create a controller script for your upload web script:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: multipart.post.js

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        // extract file attributes
        var title = args.title;
        var description = args.description;
        
        // extract file
        var file = null;
        for each \(field in formdata.fields\)
        \{
        if \(field.name == "file" && field.isFile\)
        \{
        file = field;
        \}
        \}
        
        // ensure file has been uploaded
        if \(file.filename == ""\)
        \{
        status.code = 400;
        status.message = "Uploaded file cannot be located";
        status.redirect = true;
        \}
        else
        \{
        
        // create document in company home from uploaded file
        upload = companyhome.createFile\(file.filename\) ;
        upload.properties.content.guessMimetype\(file.filename\);
        upload.properties.content.write\(file.content\);
        upload.properties.title = title;
        upload.properties.description = description;
        upload.save\(\);
        // setup model for response template
        model.upload = upload;
        \}
        ```

9.  Create a response template for your upload web script:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: multipart.post.html.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <html\>
        <body\>
          Uploaded $\{upload.name\} of size $\{upload.properties.content.size\}.
        </body\>
        </html\>
        ```

10. Register the web scripts with Alfresco.

    1.  In a web browser, enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**.

    A message indicates there are two additional web scripts.


Your sample form consists of only three input fields, where one is of type `file`. The form posts its content to the action URI as identified by the root object `url.service`, which for this sample is `/multipart` and specifies the `multipart/form-data` content type.

```
... 
<form action="${url.service}" method="post" enctype="multipart/form-data"> 
...
```

Your two web scripts are mapped to the same URI. However, the form is attached to the HTTP GET method and the upload is attached to the HTTP POST method, which allows your form to post to the same URI as the form itself.

When `multipart/form-data` is posted to a web script, the Web Script Framework provides a special root object named `formdata` that allows access to the posted request through a simple API, hiding the complexities of parsing the request directly. The API provides access to each form field, including its name and value. For form fields of type `file`, the content of the uploaded file is also provided. To simplify even further, all fields other than those of type file are also added to the root objects `args` and `argsM`. Your upload web script extracts the form title and description fields from the `args` root object and locates the uploaded file through the `formdata` root object.

```
...
var title = args.title;
var description = args.description;
var file = null;
for each (field in formdata.fields)
{
  if (field.name == "file" && field.isFile)
  {
    file = field;
  }
}
...
```

If a file has been uploaded, the upload web script creates a new document within the Alfresco content repository under the Company Home folder. The document is named after the file name of the uploaded file and its content is taken from the file content.

```
...
upload = companyhome.createFile(file.filename) ;
upload.properties.content.guessMimetype(file.filename);
upload.properties.content.write(file.content);
...
```

The created document is placed into the web script model, allowing the upload response template to render a message confirming the name and size of the uploaded file.

```
...
model.upload = upload;
...
```

**Parent topic:**[Forms and web scripts](../concepts/ws-forms-about.md)

