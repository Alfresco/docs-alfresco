---
author: Alfresco Documentation
---

# Custom Data Models

You can create Custom Data Models that connect to external sources and perform custom data operations when working with entity objects.

## Implementing the Custom Data Model service

Implement `AlfrescoCustomDataModelService` to manage operations such as insert, update, and select data in Custom Data Models.

**interface**: `com.activiti.api.datamodel.AlfrescoCustomDataModelService`

**maven module**: activiti-app-logic

**To implement the `AlfrescoCustomDataModelService` interface:**

1.  Create an external class named `AlfrescoCustomDataModelServiceImpl` and add it to the classpath.

    Note that it should be in a package that can be scanned, such as `com.activiti.extension.bean`.

2.  Implement the class as follows:

    ```
    package com.activiti.extension.bean;
    
    import java.util.List;
    
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    
    import com.activiti.api.datamodel.AlfrescoCustomDataModelService;
    import com.activiti.model.editor.datamodel.DataModelDefinitionRepresentation;
    import com.activiti.model.editor.datamodel.DataModelEntityRepresentation;
    import com.activiti.runtime.activiti.bean.datamodel.AttributeMappingWrapper;
    import com.activiti.variable.VariableEntityWrapper;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import com.fasterxml.jackson.databind.node.ObjectNode;
    
    @Service
    public class AlfrescoCustomDataModelServiceImpl implements AlfrescoCustomDataModelService {
    
        @Autowired
        protected ObjectMapper objectMapper;
    
        @Override
        public String storeEntity(List<AttributeMappingWrapper> attributeDefinitionsAndValues, DataModelEntityRepresentation entityDefinition,
                DataModelDefinitionRepresentation dataModel) {
            // save entity data and return entity id
        }
    
        @Override
        public ObjectNode getMappedValue(DataModelEntityRepresentation entityValue, String mappedName, Object variableValue) {
            // fetch entity data and return as an ObjectNode
        }
    
        @Override
        public VariableEntityWrapper getVariableEntity(String keyValue, String variableName, String processDefinitionId, DataModelEntityRepresentation entityValue) {
            // fetch entity data and return as a VariableEntityWrapper
        }
    
    }
    ```


This implementation of `AlfrescoCustomDataModelServiceImpl` class is called, for example, when a select, insert, or update operation on a custom data model is performed.

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

