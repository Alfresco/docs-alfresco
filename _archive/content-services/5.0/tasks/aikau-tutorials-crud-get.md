---
author: Alfresco Documentation
---

# CRUD service - get

This tutorial looks at using the `CrudService` to retrieve data lists.

You need to create a site, `Test`, and add some Data Lists to it. Create two data lists with a few items for experimental purposes. You will write Aikau code to retrieve these lists.

This tutorial shows you how you can use the Repository REST API from Aikau. The example in this case gets a site's data lists and displays them. The `alfresco/services/CrudService` is used to retrieve a list of data lists from a site. The CRUD service provides a raw capability to work with the REST API.

1.  In `simple-page.get.js` delete the existing code.

2.  Add the following code. This specifies the CRUD service in the list of services:

    ```
    
    model.jsonModel = {
      services: [
        "alfresco/services/CrudService"
      ]
    };                        
                        
    ```

    The majority of services do not require any configuration, so can be added to the list as a string. However, it is also possible to add services into the array as objects with name/config attributes as is done with widgets.

3.  The simplest list in Aikau is the `alfresco/lists/AlfList` widget. It provides basic list capabilities, and is extended by the `alfresco/lists/AlfHashList` \(which allows requests to be manipulated by the URL hash fragment\) and the `alfresco/lists/AlfSortablePaginatedList` \(which provides support for sorting and pagination\) which is in turn extended by specialist lists such as the `alfresco/documentlibrary/AlfDocumentList` and `alfresco/documentlibrary/AlfSearchList`, and so on. For this example the basic capbilities of the `alfresco/lists/AlfList` widget is sufficient. Add the following code:

    ```
    
    var list = {
      name: "alfresco/lists/AlfList",
      config: {
        loadDataPublishTopic: "ALF_CRUD_GET_ALL",
        loadDataPublishPayload: {
          url: "slingshot/datalists/lists/site/test/dataLists"
        },
        itemsProperty: "datalists"
      }
    };
                        
    ```

    This example defines the data to work with. The `loadDataPublishTopic` defines the topic to publish to request data, and the `loadDataPublishPayload` defines the payload to send when requesting data. A topic is defined by the `CrudService` and is designed to work with the Alfresco Repository REST API so it is not necessary to include the full address, just the WebScript declared URL fragment.

    As not all the Alfresco REST API calls use a consistent attribute for the arrays of data that they return it is possible to specify that the AlfList should use a specific property in the response body to get the array from using the `itemsProperty` configuration attribute. This will also accept dot-notation values.

4.  The next step is to define a view. An `alfresco/lists/AlfList` widget \(and all its descendants\) can render multiple views of data. These are set as the `widgets` config attribute. In order to display any data an `AlfList` needs to have a least one view configured. It is possible to build almost any view and you can either re-use the existing view and data rendering widgets or build your own. In this case you will build a view of data as a list of rows, each containing a single cell with a single data renderer. Enter the following code:

    ```
    
    var views = [
      {
        name: "alfresco/documentlibrary/views/AlfDocumentListView",
          config: {
          widgets: [
            {
              id: "VIEW_ROW",
              name: "alfresco/documentlibrary/views/layouts/Row",
              config: {
                widgets: [
                  {
                    name: "alfresco/documentlibrary/views/layouts/Cell",
                    config: {
                    widgets: [
                      {
                        id: "DATA_LIST_TITLE",
                        name: "alfresco/renderers/Property",
                        config: {
                          propertyToRender: "title"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }];                        
                        
    ```

    View definitions can get quite long and if you define a view that you want to re-use then it makes sense to extend `alfresco/documentlibrary/views/AlfDocumentListView` and declare the widget model in your own subclass. See `alfresco/documentlibrary/views/AlfSimpleView` and `alfresco/documentlibrary/views/AlfDetailedView` as examples of this.

    The reason that a lot of the list and view modules are defined in the `alfresco/documentlibrary/` package is purely historical since most of the list and view code has been abstracted from Document Library specific use cases.

5.  Finally, pull all this together with the following code:

    ```
    
    list.config.widgets = views;
    model.jsonModel.widgets = [list]
                        
    ```

    The complete code listing is as follows:

    ```
    
    model.jsonModel = {
      services: [
        "alfresco/services/CrudService"
      ]
    };
    
    var list = {
      name: "alfresco/lists/AlfList",
      config: {
        loadDataPublishTopic: "ALF_CRUD_GET_ALL",
        loadDataPublishPayload: {
          url: "slingshot/datalists/lists/site/test/dataLists"
        },
        itemsProperty: "datalists"
      }
    };
    
    var views = [
      {
        name: "alfresco/documentlibrary/views/AlfDocumentListView",
          config: {
          widgets: [
            {
              id: "VIEW_ROW",
              name: "alfresco/documentlibrary/views/layouts/Row",
              config: {
                widgets: [
                  {
                    name: "alfresco/documentlibrary/views/layouts/Cell",
                    config: {
                    widgets: [
                      {
                        id: "DATA_LIST_TITLE",
                        name: "alfresco/renderers/Property",
                        config: {
                          propertyToRender: "title"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }];
    
    list.config.widgets = views;
    model.jsonModel.widgets = [list];
    
                        
    ```


In this tutorial you have seen how to retrieve data lists from a site using the `CrudService`.

**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

