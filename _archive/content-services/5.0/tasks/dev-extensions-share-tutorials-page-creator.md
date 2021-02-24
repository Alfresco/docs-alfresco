---
author: Alfresco Documentation
---

# Share Page Creator

The Share Page Creator allows you to create pages for Share using a graphical user interface.

You need to be using Alfresco 5.0 or above.

It is possible to create pages in Share using the Page Creator Tool. This is a drag- and-drop tool. The URL for the Share Page Creator tool is `http://<server>:<port>/share/page/hdp/ws/page-creator`

**Note:** A JSON editor for creating pages in Share is also available, however this is covered in another tutorial.

1.  In the first part of this tutorial you will create a suitable folder in which to store pages created by the Share Page Creator.
2.  Log into Share as admin.

3.  Select the **Repository** link.

4.  Click on the Data Dictionary folder.

5.  Create a new folder called ShareResources.

6.  Change into the ShareResources folder.

7.  Create a new folder called Pages.

    You have now created the folder to store pages created by the Share Page Creator tool.

8.  In the next part of the tutorial you will see how to create pages using the Share Page Creator Tool.
9.  Now go to the following URL in your browser: `http://<server>:<port>/share/page/hdp/ws/page-creator`

    The Share Page Creator interface will be displayed. You can then design your page graphically.

10. Once you have created and saved your page, you can access it via a URL such as the following:

    ```
    
                            
    http://localhost:8080/share/page/hrp/p/SamplePage                        
                            
                        
    ```

    Simply change `SamplePage` with the name of your newly created page.

11. Edit your previously saved page using a URL such as the following:

    ```
    
                            
    http://localhost:8080/share/page/hdp/ws/page-creator?page=SamplePage                        
                            
                        
    ```

    **Note:** Change `SamplePage` as required to the name of the previously saved page you want to edit.


**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

