---
author: Alfresco Documentation
---

# Data List - 1

This tutorial shows you how to enhance a data list view using a custom Aikau widget.

You need to have completed the [previous tutorial](aikau-tutorials-crud-update.md).

In this tutorial you learn how to display a data list using a custom widget. The widget to be extended will be `alfresco/lists/AlfList`.

1.  Create com/example/DataList.js

    ```
    
                            
    define(["dojo/_base/declare",
            "alfresco/lists/AlfList",
            "dojo/_base/lang"],
            function(declare, AlfList, lang) {
    
       return declare([AlfList], {
    
          /**
           * Extend this Dojo widget lifecycle function to create a new subscription for handling Data List
           * selections.
           *
           * @instance
           */
          postMixInProperties: function tutorials_DataList__postMixInProperties() {
             this.inherited(arguments);
             this.alfSubscribe("TUTORIALS_LOAD_DATA_LIST", lang.hitch(this, this.loadDataList))
          },
    
          /**
           * This is the variable that will be used to determine what the next Data List to load will be.
           *
           * @instance
           * @type {object}
           * @default null
           */
          dataListToLoad: null,
    
          /**
           * Set the appropriate view, set the Data List to load and load the data for it.
           *
           * @instance
           * @param {object} payload The payload containing the details of the Data List to load
           */
          loadDataList: function tutorials_DataList__loadDataList(payload) {
             this.dataListToLoad = payload;
             this.onViewSelected({
                value: payload.itemType
             });
             this.loadData();
          },
    
          /**
           * Only load data when there is a Data List to load.
           *
           * @instance
           */
          loadData: function alfresco_lists_AlfList__loadData() {
             if (this.dataListToLoad != null)
             {
                this.inherited(arguments);
             }
          },
    
          /**
           * Update the payload used to load data to set the specific Data List URL
           *
           * @instance
           * @param {object} payload The payload containing the details of the Data List to load
           */
          updateLoadDataPayload: function tutorials_DataList__updateLoadDataPayload(payload) {
             if (this.dataListToLoad != null)
             {
                payload.url = "slingshot/datalists/data/node/" + this.dataListToLoad.nodeRef.replace("://", "/");
             }
          }
       });
    });                        
                            
                        
    ```

2.  Enter the following code into simple-page.get.js:

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
             url: "slingshot/datalists/lists/site/datalistexample/dataLists"
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
       }
    ];
    list.config.widgets = views;
    model.jsonModel.widgets = [list]
    
    var deleteCell = {
       name: "alfresco/documentlibrary/views/layouts/Cell",
       config: {
          widgets: [
             {
                name: "alfresco/renderers/PublishAction",
                config: {
                   iconClass: "delete-16",
                   propertyToRender: "title",
                   altText: "Delete {0}",
                   publishTopic: "ALF_CRUD_DELETE",
                   publishPayloadType: "PROCESS",
                   publishPayload: {
                      requiresConfirmation: true,
                      url: "slingshot/datalists/list/node/{nodeRef}",
                      confirmationTitle: "Delete Data List",
                      confirmationPrompt: "Are you sure you want to delete '{title}'?",
                      successMessage: "Successfully deleted '{title}'"
                   },
                   publishPayloadModifiers: ["processCurrentItemTokens", "convertNodeRefToUrl"]
                }
             }
          ]
       }
    };
    
    var viewRow = widgetUtils.findObject(model.jsonModel.widgets, "id", "VIEW_ROW");
    viewRow.config.widgets.push(deleteCell);
    
    var dataListTitle = widgetUtils.findObject(model.jsonModel.widgets, "id", "DATA_LIST_TITLE");
    dataListTitle.name = "alfresco/renderers/InlineEditProperty";
    dataListTitle.config = {
       propertyToRender: "title",
       postParam: "prop_cm_title",
       refreshCurrentItem: true,
       requirementConfig: {
          initialValue: true
       },
       publishTopic: "ALF_CRUD_CREATE",
       publishPayloadType: "PROCESS",
       publishPayloadModifiers: ["processCurrentItemTokens", "convertNodeRefToUrl"],
       publishPayloadItemMixin: false,
       publishPayload: {
          url: "api/node/{nodeRef}/formprocessor",
          noRefresh: true,
          successMessage: "Update success"
       }
    };
    
    // We need to get the nodeRef for the data list container, the easiest way is just to make
    // a REST call to the Repository to get it...
    var alfDestination = null;
    var result = remote.call("/slingshot/datalists/lists/site/datalistexample/dataLists");
    if (result.status.code == status.STATUS_OK)
    {
       alfDestination = JSON.parse(result).container;
    }
    
    var formControls = [
       {
          name: "alfresco/forms/controls/DojoValidationTextBox",
          config: {
             name: "alf_destination",
             value: alfDestination,
             visibilityConfig: {
                initialValue: false
             }
          }
       },
       {
          name: "alfresco/forms/controls/DojoValidationTextBox",
          config: {
             label: "Title",
             name: "prop_cm_title",
             requirementConfig: {
                initialValue: true
             }
          }
       },
       {
          name: "alfresco/forms/controls/DojoTextarea",
          config: {
             label: "Description",
             name: "prop_cm_description"
          }
       },
       {
          name: "alfresco/forms/controls/DojoSelect",
          config: {
             label: "List Type",
             name: "prop_dl_dataListItemType",
             value: "dl:event",
             optionsConfig: {
                publishTopic: "ALF_GET_FORM_CONTROL_OPTIONS",
                publishPayload: {
                   url: url.context + "/proxy/alfresco/api/classes/dl_dataListItem/subclasses",
                   itemsAttribute: "",
                   labelAttribute: "title",
                   valueAttribute: "name"
                }
             }
          }
       }
    ];
    
    
    var button = {
       name: "alfresco/buttons/AlfButton",
       config: {
          label: "New List",
          additionalCssClasses: "call-to-action",
          publishTopic: "ALF_CREATE_FORM_DIALOG_REQUEST",
          publishPayloadType: "PROCESS",
          publishPayloadModifiers: ["processCurrentItemTokens"],
          publishPayload: {
             dialogTitle: "New List",
             dialogConfirmationButtonTitle: "Save",
             dialogCancellationButtonTitle: "Cancel",
             formSubmissionTopic: "ALF_CRUD_CREATE",
             formSubmissionPayloadMixin: {
                url: "api/type/dl%3AdataList/formprocessor"
             },
             fixedWidth: true,
             widgets: formControls
          }
       }
    };
    
    
    model.jsonModel.services.push("alfresco/dialogs/AlfDialogService",
                                  "alfresco/services/OptionsService");
    model.jsonModel.widgets.splice(0, 0, button);
    
    
    function buildViews() {
    
       var views = [];
    
       // Get all the data list types...
       var dataListTypes = null;
       var result = remote.call("/api/classes/dl_dataListItem/subclasses");
       if (result.status.code == status.STATUS_OK)
       {
          // Iterate over each data list type and get its properties...
          dataListTypes = JSON.parse(result);
          for (var i = 0; i < dataListTypes.length; i++)
          {
             var widgetsForHeader = [];
             var rowWidgets = [];
    
             var currentView = {
                name: "alfresco/documentlibrary/views/AlfDocumentListView",
                config: {
                   viewSelectionConfig: {
                      label: dataListTypes[i].title,
                      value: dataListTypes[i].name
                   },
                   additionalCssClasses: "bordered",
                   widgetsForHeader: widgetsForHeader,
                   widgets: [
                      {
                         name: "alfresco/documentlibrary/views/layouts/Row",
                         config: {
                            widgets: rowWidgets
                         }
                      }
                   ]
                }
             };
             views.push(currentView);
    
             // Iterate over the view properties...
             properties = dataListTypes[i].properties;
             for (var key in properties)
             {
                if (key.indexOf("dl:") === 0)
                {
                   // Only add DataList namespaced properties...
                   var property = properties[key];
    
                   widgetsForHeader.push({
                      name: "alfresco/documentlibrary/views/layouts/HeaderCell",
                      config: {
                         label: property.title,
                         sortable: false
                      }
                   });
    
                   rowWidgets.push({
                      name: "alfresco/documentlibrary/views/layouts/Cell",
                      config: {
                         additionalCssClasses: "siteName mediumpad",
                         widgets: [
                            {
                               name: "alfresco/renderers/Property",
                               config: {
                                  propertyToRender: "itemData.prop_" + property.name.replace("dl:", "dl_") + ".displayValue"
                               }
                            }
                         ]
                      }
                   });
                }
             }
          }
       }
    
       return views;
    };
    
    
    var pubSubScope = "DATA_LIST_SCOPE";
    
    var dataList = {
       name: "com/example/DataList",
       config: {
          pubSubScope: pubSubScope,
          loadDataPublishTopic: "ALF_CRUD_CREATE",
          itemsProperty: "items",
          widgets: buildViews()
       }
    };
    
    model.jsonModel.widgets.push(dataList);
    
    dataListTitle.name = "alfresco/renderers/InlineEditPropertyLink";
    dataListTitle.config.linkPublishTopic = pubSubScope + "BLOG_LOAD_DATA_LIST";
    dataListTitle.config.linkPublishPayloadType = "CURRENT_ITEM";
    
                            
                            
                        
    ```


You have seen how to ...

**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

