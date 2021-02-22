---
author: Alfresco Documentation
---

# Building a simple service

This example describes how to build a new service showing the high level interfaces for each tier of the service.

This is a new content application service built on the content repository services. It provides a counter with methods for creating, listing, incrementing, decrementing, and resetting integer counter instances and their values. The counter can be used to persist how many times a particular event has occurred. For example, to generate a unique reference number for a document, the counter can generate an integer for use as the basis of the reference number.

The service uses a three-tier approach. Java provides the underlying methods in Tier 1; the JavaScript API is used for Tier 2 to provide higher level methods allowing the counter to be called via repository actions and is also exposed via Tier 3 as the new RESTful counter API.

**Note:** Full details of some of the methods are not shown for simplification.

**Parent topic:**[Building Alfresco services](../concepts/serv-building-about.md)

## Building Tier 1 – Java Service Layer

The Java Service Layer outline implements the low-level Java methods for the counter. It includes methods for creating counters, getting counters by ID, updating counter values, and resetting counter values. These methods use other services from the internal Java API to create the underlying repository objects used to persist the counters.

-   The following code outline shows Tier 1 of the Counter service:

    ```
          public interface CounterService
    // Low level services for creating and updating counters.
    {
         public enum CounterOperation { INC, DEC };
    
         // Create a counter and set the initial value.
         // Returns the counter id.
         String createCounter(int initialValue);
    
         // Get the value of a counter.
         int getCounterValue(counterId);
    
         // Update the counter value by a given step.  The counter operation
         // is provided.
         int updateCounterValue(String counterId, CounterOperation operation, int step);
    
         // Delete the counter.
         int deleteCounter();
    }
    ```


## Building Tier 2 – Javascript API

To allow the Java service to be used outside of Java, such as for a repository action or as a RESTful API, access is provided via Tier 2, the JavaScript API layer. The createCounter script outline implements higher level methods on top of the Tier 1 Java service. It includes a function to get instances of a counter by ID and functions to increment, decrement, and reset the counter value. This script will be callable via the Tier 3 RESTful API.

-   The following code outline shows Tier 2 of the Counter service:

    ```
       // Create counter.  Initial value and default step are optional parameters.
    // Returns the created counter object
    function createCounter(initialValue=1, defaultStep=1);
    
    // Get counter.
    // Returns the counter object
    function getCounter(counterId);
    
    Counter
    {
       var id;
       var defaultStep;
       var value;
    
       function increment(value=0);
    
       function decrement(value=0);
    
       function delete();
    }
    ```


## Building Tier 3 – RESTful API

The service layer exposes the script layer as two resource URIs working against counter collections and counter instances. The first resource returns a counter collection, which a list of all the available counters and is also used to create new counter instances. The second resource is counter, which is used to manipulate the value of a particular counter instance.

1.  Call the counter collection resource using an HTTP GET method against the /alfresco/counters URI.

    For example:

    ```
    Method: GET /alfresco/counters
       Description: Returns a list of counters
    
       Example output:
    
       {
          "counters":
          {
             "counter0":
             {
                "id" : "counter0",
                "value" : 12,
                "url" : "/counters/counter0"
             },
    
     "counter1":
             {
                "id" : "counter1",
                "value" : 3,
                "url" : "/counters/counter1"
             }
          }
       }
    ```

    This provides a platform and language independent interface to get a list of counters. The response is formatted using JSON and the calling application can parse the JSON response to get the list of counters as appropriate.

2.  Call the counter collection resource using an HTTP POST method to create a new counter instance.

    ```
          Method: POST /alfresco/counters
       Description: Creates a new counter
    
       Example input:
       {
          "id" : "counter2",
          "initialValue" : 0,
          "defaultStep" : 1
       }
    
       Example output:
    
       {
          "id" : "counter2",
          "value" : 0,
          "url" : "/counters/counter2"
       }
    ```

    The body of the post method uses a JSON formatted payload that includes the ID for the new counter, the `initialValue`, and also the default value \(`defaultStep`\) used to increment or decrement the counter.

3.  Call the URI using an HTTP GET to return the current value as a JSON response for the counter-ID identified at the end of the URI request.

    ```
         Method: GET /alfresco/counters/{counter-id}
       Description: Gets the current value for a counter
    
       Example output:
    
       {
          "id" : "counter2",
          "value" : 0,
          "url" : "/counters/counter2"
       }
    ```

    The counter resource reads and updates the values for a particular counter. As with the counter collection, the behavior is based on the HTTP request method used to call the resource.

4.  Call the counter resource with POST to increment or decrement the counter according to the step value passed in via the request BODY. If no BODY is provided, the default step value is used.

    ```
        Method - POST /alfresco/counters/{counter-id}
       Description: Increments or decrements a counter’s value according to the passed in step value.
    
       Example input:
    
       {
          "step" : 1
       }
    
       Example output where existing value is 11:
    
       {
          "id" : "counter0",
          "value" : 12,
          "url" : "/counters/counter0"
       }
    ```

    This returns a JSON response including the new counter value.

5.  Call the counter with an HTTP DELETE method to delete the counter.

    ```
             Method - DELETE /alfresco/counters/{counter-id}
       Description: Deletes the counter
    ```

    **Note:** In this case, there is no response in the HTTP body. A 204 status code would be returned in the HTTP header to indicate the delete had been successful.


You now have a set of RESTful APIs that provide simple, URI addressable, and platform independent services to manage and inspect your counters.

