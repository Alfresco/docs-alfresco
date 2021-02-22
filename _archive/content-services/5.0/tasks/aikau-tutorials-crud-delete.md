---
author: Alfresco Documentation
---

# CRUD service - delete

This tutorial shows you how to delete a data list using an action item.

You need to have completed the [previous tutorial](aikau-tutorials-crud-get.md).

This tutorial shows you how to create an action item to delete a data list. This is achieved through using the `alfresco/renderers/PublishAction` widget.

1.  Add the following code after the code you entered in the previous tutorial:

    ```
    
    var deleteCell = {
    	name : "alfresco/documentlibrary/views/layouts/Cell",
    	config : {
    		widgets : [ {
    			name : "alfresco/renderers/PublishAction",
    			config : {
    				iconClass : "delete-16",
    				propertyToRender : "title",
    				altText : "Delete {0}",
    				publishTopic : "ALF_CRUD_DELETE",
    				publishPayloadType : "PROCESS",
    				publishPayload : {
    					requiresConfirmation : true,
    					url : "slingshot/datalists/list/node/{nodeRef}",
    					confirmationTitle : "Delete Data List",
    					confirmationPrompt : "Are you sure you want to delete '{title}'?",
    					successMessage : "Successfully deleted '{title}'"
    				},
    				publishPayloadModifiers : [ "processCurrentItemTokens",
    						"convertNodeRefToUrl" ]
    			}
    		} ]
    	}
    };
    
    var viewRow = widgetUtils.findObject(model.jsonModel.widgets, "id", "VIEW_ROW");
    viewRow.config.widgets.push(deleteCell);                        
                        
    ```

    Looking at the configuration, the code will publish on the `ALF_CRUD_DELETE` topic to which the alfresco/service/CrudService subscribes. It is also necessary to identify the specific item to be deleted.

    When defining a publication payload you can optionally select a number of different payload types and in this case the `publishPayloadType` attribute is being set to `PROCESS`. This indicates that we want to perform some processing on the payload.

    A number of processors have been included in Aikau and two are specified in the `publishPayloadModifiers` array:

    -   `processCurrentItemTokens` - looks for all string data wrapped in braces. For example, `{nodeRef}` in the string `slingshot/datalists/list/node/{nodeRef}`, is converted into the matching entry in the `currentItem`.
    -   `convertNodeRefToUrl` - replaces any occurrence of "://" with "/" to make NodeRef data URL friendly.
    The CrudService recognizes that DELETE actions may require a confirmation, so the requiresConfirmation attribute is included in the payload, as well as the messages to use on the confirmation dialog title, confirmation dialog body, and the subsequent success message. Note that `currentItem` can be included in the message strings because it is always included in the publication to the service.

    In the final part of the configuration the icon to use is specfified via the `iconClass` attribute, and the `altText` for the icon is also specified. The `propertyToRender` attribute is available for use as a message token in the alt text, so a meaningful text can be provided for the action.

2.  Access the following URL with your web browser:

    ```
    
     http://localhost:8081/share/page/dp/ws/simple-page
                        
    ```

    You will see you are able to delete a data list. On deletion you will be prompted with a confirmation dialog box.


In this tutorial you have seen how to delete a data list using an action item.

**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

