---
author: Alfresco Documentation
---

# json

A root object encapsulating posted JSON content.

If the content type of the POST is `application/json` then the Web Script Framework will detect this and parse the JSON into the helper object called `json`. This allows the developer to access the JSON data using properties with the get method, for example `json.get("field")`.

If a POST was submitted to `/somewebscripturl`, with the following JSON data:

```
        
{
  somevalue: "hello",
  morestuff: 123
}

```

Then in the web script JavaScript code it would be possible to access the value of the `somevalue` field using the JavaScript code:

```

  json.get("somevalue");

```

If the data posted is a JSON object, the `json` root object will be of type `JSONObject`. If the data posted is a JSON array the the `json` root object will be of type `JSONArray`.

Consider the following example script:

```

        
function abtest(){

    // Native JavaScript object                                                                                                                                            
    var myObj = {'name':'Test Object','size':100};

    // Convert native JS object to string                                                                                                                                  
    var myObjAsString = jsonUtils.toJSONString(myObj);
    model.myObjAsString = myObjAsString;

    // Convert string back to native object                                                                                                                                
    var tonyObject = jsonUtils.toObject(myObjAsString);

    // Get JSON data and load into model
    model.firstName = json.get("firstName");
    model.lastName = json.get("lastName");

}

function main(){
    abtest();
}

main();        
        
        
      
```

The script could be invoked using cURL as follows:

```

    
curl -uadmin:admin -H "Content-type: application/json" -X POST -d '{"firstName": "Fred", "lastName": "Bloggs"}' http://localhost:8080/alfresco/service/abtest    
    
  
```

The JSON data could then be processed by the controller script or simply added to the model before displaying by using the view:

```

        
<p>Hello ${firstName} ${lastName}</p>        
        
      
```

JSONObject methods

-   **`get(string name)`**

    Returns the value of the specified name from the JSON object


-   **`has(string name)`**

    Indicates whether the value of the specified name exists within the JSON object


-   **`isNull(string name)`**

    Indicates whether the value of the specified name is null within the JSON object


-   **`getJSONArray(string name)`**

    Returns a JSONArray object for the array of the specified name within the JSON object


JSONArray methods

-   **`length()`**

    \(Read-only integer\) Returns the length of the JSON array


-   **`getJSONObject(integer index)`**

    Returns the JSON object located in the JSON array at the specified index


**Parent topic:**[Root objects reference](../references/api-ws-root-ref.md)

