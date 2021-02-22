---
author: Alfresco Documentation
---

# Bootstrapping categories by using XML

Categories can be bootstrapped by using an XML file.

Your categories bootstrap XML file must contain only `cm:generalclassifiable` categories. An example of the XML file is provided as follows:

```
    
    
    <view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
      xmlns:sys="http://www.alfresco.org/model/system/1.0"
      xmlns:cm="http://www.alfresco.org/model/content/1.0">
      
      <cm:category>
        <cm:name>Your Root Category</cm:name>
        <cm:subcategories>
          <cm:category>
            <cm:name>Your Parent Category</cm:name>
            <cm:subcategories>
              <cm:category>
                <cm:name>Your Child Category</cm:name>
              </cm:category>
            </cm:subcategories>
          </cm:category>
        </cm:subcategories>
      </cm:category>
      
    </view:view>


```

**Parent topic:**[Bootstrap content](../references/dev-extension-points-bootstrap.md)

