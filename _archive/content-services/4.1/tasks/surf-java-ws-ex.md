---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Webscript, API/Script]
keyword: [java-backed web script, Folder Listing]
---

# Creating a reusable Java-backed web script

You can build a page using an annotated controller to fetch information for the rendering page. The FreeMarker template consults the model to build the markup, for example, of hotel listings. This is a good approach to have the hotel information loaded ahead of the page actually rendering. The penalty of retrieving the information is done ahead of anything on the page even rendering. If multiple components on the page need that information, this avoids the cost of potentially loading it more than one time.

To move some of this logic into the individual components on the page so that the individual web scripts on the page have their own Java-backed controllers, you can use a Java-backed web script. A Java-backed web script has a Java bean that executes ahead of the web script’s view. You can use them as one way to implement web script specific Java controllers.

1.  In your template, use a region tag to bind a web script into the template.

    For example:

    ```
    <html>
       <body>
          <@region id=”hotels” scope=”page” />
       </body>
    </html>
    ```

    This declares a page-scoped region with the name “hotels”. You can develop a Java-backed web script to retrieve the hotel list and place the result into the model. The Java code would look something like this:

    ```
    public class HotelListingWebScript extends DeclarativeWebScript
    {
       privateTravelServicetravelService;
    
       public void setTravelService(TravelServicetravelService)
       {
          this.travelService = travelService;
       }
    
       @Override
       protected Map<String, Object>executeImpl(WebScriptRequestreq, Status status)
       {
          Map<String, Object> model = new HashMap<String, Object>(7, 1.0f);
          model.put("hotelList",  travelService.findHotels());
          return model;
       }
    }
    ```

2.  Use Spring configuration to wire this into place by declaring the web script descriptor and view template files.

    For example:

    Web script descriptor in hotellisting.get.desc.xml:

    ```
    <webscript>
       <shortname>Hotel Listing</shortname>
       <url>/hotel/listing</url>
       <format default="html">argument</format>
       <authentication>none</authentication>
       <transaction>required</transaction>
    </webscript>
    ```

    View template \(in FreeMarker\) in hotellisting.get.html.ftl:

    ```
    
    <table>
        <#if hotelList?size == 0>
        <tr>
            <td colspan="2">No hotels</td>
        </tr>
        <#else>
        <#list hotelList as hotel>
        <tr>
            <td>${hotel.name}</td>
            <td>${hotel.address}</td>
        </tr>
        </#list>
        </#if>
    </table>
    
    ```


You now have a reusable Java-backed web script. All that remains is an empty page-scoped region called “hotels” on your template. You can plug in your new web script by adding a component binding. Since the region tag defines a region in the page scope, you add a page-scoped component definition as follows:

```
<?xml version='1.0' encoding='UTF-8'?>
<component>
   <source-id>hotels</source-id>
   <scope>page</scope>
   <region-id>hotels</region-id>
   <url>/hotel/listing</url>
</component>
```

This approach gives you a reusable web script that you can place into multiple locations in your website. It could appear on different pages, in different regions, and in different scopes. The advantage is that the controller is only hit when the web script is on the page. The disadvantage is that the Java-backed controller is not portable as the rest of the web script files. Moving it from one Surf application to another would require a server restart.

-   **[Modifying a web script using the Surf Remote API](../tasks/surf-java-ws-ex-adjust.md)**  
This example uses the Surf Remote API to enhance the hotel listing example. It adjusts the Java-backed web script example to use a scriptable controller to access the remote service. This removes the need for Java code and makes the code much more portable.

**Parent topic:**[Programming with Surf](../concepts/surf-fwork-intro.md)

