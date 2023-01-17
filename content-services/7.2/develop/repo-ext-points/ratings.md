---
title: Ratings Extension Point
---

Content Services supports rating of content according to different schemes, such as likes or five-star. 
It is also possible to implement custom rating schemes.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

Content Services provides an implementation of a Rating Service, which is intended to support application 
developers and third parties who wish to define Rating Schemes for their content. A rating scheme is a defined system 
of ratings for content which is identified by a unique name and which provides a minimum and maximum allowed rating.

The following rating schemes are available out-of-the-box:

* **likesRatingScheme** - This scheme is essentially a marker on a piece of content. User X likes content item Y. It has `minRating = 0` and `maxRating = 1`
* **fiveStarRatingScheme** - The scheme allows users to rate content on a scale from 1 to 5

The `likesRatingScheme` is the only one that is currently visible and usable from the Share user interface.

There are two different ways in which you probably would want to use the Rating service. To start with you might want 
to use one of the existing rating schemes and provide a user interface for it. If none of the existing rating schemes 
fit the bill, then you can implement a custom rating scheme.

Let's start with a sample that provides a user interface for the out-of-the-box `fiveStarRatingScheme`. We will add an 
action to the Share UI so we can rate a node with the Five Star rating scheme, it will look something like this:

![dev-extensions-repo-rating-share-ui]({% link content-services/images/dev-extensions-repo-rating-share-ui.png %})

In the node actions to the right we will add a document library action called "Rate Node". It will be available if the 
node has not been previously rated with the Five Star scheme by the user. The action will not be available if the node 
has been created by current user. This is because the Rating Service does not allow you to rate what you have created 
yourself.

When a node has been rated it will have a star indicator in the browse view as shown in the above screenshot for the 
`testacme.txt` file. The indicators will only be displayed for files rated by the user. So a file could be rated by 
another user and current user will not see an indicator. The user have to look at the node's properties to see rating 
information:

![dev-extensions-repo-rating-share-ui-props]({% link content-services/images/dev-extensions-repo-rating-share-ui-props.png %})

After a node has been rated the two rating properties will be updated, they show the number of users that have rated 
the node (that is, the count property) and the total sum of all rating values (so if 2 users selected 4 stars rating 
then it will show 8 as in above screenshot).

When a user clicks on the 'Rate Node' a pop-up form is displayed as follows:

![dev-extensions-repo-rating-share-ui-select]({% link content-services/images/dev-extensions-repo-rating-share-ui-select.png %})

The form has a drop down where the user can select the Five Star rating he or she wants to give the node. This user 
interface will be used to demonstrate how the Rating Service can be used, it is by no mean a complete Five Star rating 
user interface. Everyone will have different ideas around how it should look like, what widgets and icons to use etc.

Let's start by defining the [Document Library]({% link content-services/7.2/develop/share-ext-points/doclib.md %}) action 
(note that this is not a repository extension but should be part of a 
[Share JAR Module]({% link content-services/7.2/develop/sdk.md %}#workingshare)):

```xml
<config evaluator="string-compare" condition="DocLibActions">
     <actions>
         <action id="alfresco.tutorials.doclib.action.rateNode"
                 icon="rate"
                 type="javascript"
                 label="alfresco.tutorials.doclib.action.rateNode.label">
             <param name="function">onActionFormDialog</param>
             <param name="itemKind">action</param>
             <param name="itemId">rate-node</param><!-- Repository action id = Spring Bean id -->
             <param name="mode">create</param>
             <param name="destination">{node.nodeRef}</param>
             <param name="successMessage">alfresco.tutorials.doclib.action.rateNode.msg.success</param>
             <param name="failureMessage">alfresco.tutorials.doclib.action.rateNode.msg.failure</param>
             <evaluator negate="true">alfresco.tutorials.evaluator.isRatedFiveStar</evaluator>
         </action>
     </actions>
     <actionGroups>
         <actionGroup id="document-browse">
             <action index="410" id="alfresco.tutorials.doclib.action.rateNode"/>
         </actionGroup>
         <actionGroup id="document-details">
             <action index="410" id="alfresco.tutorials.doclib.action.rateNode"/>
         </actionGroup>
         <actionGroup id="folder-browse">
             <action index="410" id="alfresco.tutorials.doclib.action.rateNode"/>
         </actionGroup>
         <actionGroup id="folder-details">
             <action index="410" id="alfresco.tutorials.doclib.action.rateNode"/>
         </actionGroup>
     </actionGroups>
 </config>
```

This configuration defines the Rate Node Doc Lib action and makes it visible when browsing files and folders and 
when looking at details pages for files and folders. The `onActionFormDialog` is an out-of-the-box JavaScript 
`function` that can be used when you need a form to collect data that should be used by the action. And this the 
function will take this data and call the [Repo Action]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %}) 
that is specified with the `itemId` parameter.

The visibility of the Doc Lib action will be controlled by the evaluator with the id `alfresco.tutorials.evaluator.isRatedFiveStar`, 
we negate whatever result this evaluator gives, and if the end result is `true`, then we display the Doc Lib action.

The Doc Lib action uses a lot of labels that are specified in an i18n properties file as follows:

```text
# Rate Node doclib action labels and messages
alfresco.tutorials.doclib.action.rateNode.label=Rate Node
alfresco.tutorials.doclib.action.rateNode.msg.success='{0}' was successfully rated
alfresco.tutorials.doclib.action.rateNode.msg.failure=Could not rate '{0}'

# Rating Indicator label
alfresco.tutorials.indicator.isRated.label=Rated

# Rate Node Form
form.set.label.node.rating=Select rating for the node
alfresco.tutorials.doclib.action.rateNode.form.field.starRating=Star rating
```

While we are at it with the labels we include the ones we are going to need for the indicator and select form. 
The indicator and select form look like this:

```xml
<config evaluator="string-compare" condition="DocumentLibrary">
     <indicators>
         <indicator id="alfresco.tutorials.indicator.isRated"
                    icon="rated-16.png"
                    index="100"
                    label="alfresco.tutorials.indicator.isRated.label">
             <evaluator>alfresco.tutorials.evaluator.isRatedFiveStar</evaluator>
         </indicator>
     </indicators>
 </config>
 
  <config evaluator="string-compare"
         condition="rate-node"> <!-- ID for the Repository Action that this form is associated with -->
     <forms>
         <form>
             <field-visibility>
                 <show id="star_rating"/>
             </field-visibility>
             <appearance>
                 <set id="ratingSet" appearance="bordered-panel" label-id="form.set.label.node.rating"/>
                 <field id="star_rating"
                        label-id="alfresco.tutorials.doclib.action.rateNode.form.field.starRating"
                        set="ratingSet">
                     <control template="/org/alfresco/components/form/controls/selectone.ftl">
                         <control-param name="options">1|*,2|**,3|***,4|****,5|*****</control-param>
                     </control>
                 </field>
             </appearance>
         </form>
     </forms>
 </config>
 
 <config evaluator="aspect" condition="cm:fiveStarRatingSchemeRollups">
        <forms>
            <form>
                <field-visibility>
                    <!-- fields from my example aspect -->
                    <show id="cm:fiveStarRatingSchemeCount" />
                    <show id="cm:fiveStarRatingSchemeTotal" />
                </field-visibility>
            </form>
        </forms>
 </config>
```

The form for selecting the Five Star rating has been hard-coded with the options as we can see. The repository action 
(with id rate-node) will receive a parameter called `star_rating` with the selected rating value (that is, 1,2,3,4, or 5).

The above configuration also contains a form configuration for the `cm:fiveStarRatingSchemeRollups` aspect, which will 
be automatically applied to a node when it is rated for the first time, and updated every time somebody new rates the node.

The [Repository Action]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %}) implementation look 
like this (this should be contained in a [Repository JAR Module]({% link content-services/7.2/develop/sdk.md %}#workingplatform)):

```java
public class RateNodeActionExecuter extends ActionExecuterAbstractBase {
    private static Log LOG = LogFactory.getLog(RateNodeActionExecuter.class);

    private static final String FIVE_STAR_SCHEME_NAME = "fiveStarRatingScheme";
    private static final String PARAM_FIVESTAR_RATING_NAME = "star_rating";

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    @Override
    protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
        paramList.add(new ParameterDefinitionImpl(
                PARAM_FIVESTAR_RATING_NAME,
                DataTypeDefinition.TEXT,
                true,
                getParamDisplayLabel(PARAM_FIVESTAR_RATING_NAME)));
    }

    @Override
    protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
        if (serviceRegistry.getNodeService().exists(actionedUponNodeRef)) {
            Serializable nodeName = serviceRegistry.getNodeService().getProperty(
                    actionedUponNodeRef, ContentModel.PROP_NAME);

            // Get the rating property entered via Share Form
            String fiveStarRating = (String) action.getParameterValue(PARAM_FIVESTAR_RATING_NAME);
            Float rating = 0F;
            try {
                rating = Float.parseFloat(fiveStarRating);
            } catch (NumberFormatException nfe) {
                nfe.printStackTrace();
                throw new AlfrescoRuntimeException("Incorrect rating number: " + fiveStarRating +
                        " [err=" + nfe.getMessage() + "]");
            }

            // Create a five star rating based on passed in value and
            // the user that is currently authenticated
            try {
                serviceRegistry.getRatingService().applyRating(actionedUponNodeRef, rating, FIVE_STAR_SCHEME_NAME);
            } catch (RatingServiceException re) {
                LOG.error("Failed to apply rating [node=" + nodeName + "][rating=" + fiveStarRating + "]: " +
                        re.getMessage());
                return;
            }

            // Get and log rating
            Rating currentUserRating = serviceRegistry.getRatingService().getRatingByCurrentUser(
                    actionedUponNodeRef, FIVE_STAR_SCHEME_NAME);
            LOG.info("Successfully rated " + nodeName + " [by=" + currentUserRating.getAppliedBy() +
                    "][scheme=" + currentUserRating.getScheme() + "][score=" + currentUserRating.getScore() + "]");
        }
    }
}
```

The repository action first gets the rating value passed in via the `star_rating` parameter. Then the Service Registry 
is used to get to the Rating Service, which is then used to apply the Five Star rating value to the node that the action 
is executed on. The Rating Service can also be used to get rating information such as in the example above where the 
`getRatingByCurrentUser` method is used to get current users rating.

It is also possible to access rating information for a node via a REST API, which is used in the evaluator that is 
associated with both the indicator and the Doc Lib action:

```java
public class IsRatedEvaluator extends BaseEvaluator {
    private static final String PROP_NODEREF = "nodeRef";
    private static final String PROP_NODE_CREATOR = "cm:creator";
    private static final String PROP_NODE_CREATOR_USERNAME = "userName";
    private static final String PROP_RATING_CALL_RESPONSE_LIST = "list";
    private static final String PROP_RATING_CALL_RESPONSE_ENTRIES = "entries";
    private static final String PROP_RATING_CALL_RESPONSE_ENTRY = "entry";
    private static final String PROP_RATING_CALL_RESPONSE_MY_RATING = "myRating";
    private static final String PROP_RATING_CALL_RESPONSE_SCHEME_ID = "id";

    /**
     * The rating scheme that this evaluator will check for, for example 'fiveStar'.
     */
    private String ratingSchemeShortName;

    public void setRatingSchemeShortName(String ratingSchemeShortName) {
        this.ratingSchemeShortName = ratingSchemeShortName;
    }

    /**
     * If this is content not created by current user, then check if current user has rated with five star rating scheme.
     *
     * @param jsonObject all the information about the node being evaluated
     * @return true if evaluation succeeded (that is, has been rated with fiveStar), otherwise false
     */
    @Override
    public boolean evaluate(JSONObject jsonObject) {
        // Check if user is trying to rate content that he or she created
        JSONObject creator = (JSONObject)getProperty(jsonObject, PROP_NODE_CREATOR);
        String creatorUserName = (String)creator.get(PROP_NODE_CREATOR_USERNAME);
        if (getUserId().equals(creatorUserName)) {
            // You cannot rate your own content when using the fiveStar rating scheme
            return true;
        }

        // Get the ID for the node we are rating
        String nodeId = getNodeId(jsonObject.get(PROP_NODEREF));
        if (nodeId == null) {
            return false;
        }

        // Call Rating REST API to check if user has already rated node
        final RequestContext rc = ThreadLocalRequestContext.getRequestContext();
        final String userId = rc.getUserId();

        try {
            Connector conn = rc.getServiceRegistry().getConnectorService()
                    .getConnector("alfresco-api", userId, ServletUtil.getSession());

            Response response = conn.call(
                    "/-default-/public/alfresco/versions/1/nodes/" + nodeId + "/ratings");

            if (response.getStatus().getCode() == Status.STATUS_OK) {
                try {
                    // Use a different JSONObject class that can parse the JSON response String
                    org.json.JSONObject json = new org.json.JSONObject(response.getResponse());
                    org.json.JSONObject responseList = (org.json.JSONObject) json.get(PROP_RATING_CALL_RESPONSE_LIST);
                    org.json.JSONArray responseEntries = (org.json.JSONArray)
                            responseList.get(PROP_RATING_CALL_RESPONSE_ENTRIES);
                    if (responseEntries.length() > 0) {
                        for (int i = 0; i < responseEntries.length(); i++) {
                            org.json.JSONObject item = responseEntries.getJSONObject(i);
                            org.json.JSONObject entry = item.getJSONObject(PROP_RATING_CALL_RESPONSE_ENTRY);
                            if (entry.has(PROP_RATING_CALL_RESPONSE_MY_RATING)) {
                                String currentUserRating = entry.getString(PROP_RATING_CALL_RESPONSE_MY_RATING);
                                String ratingScheme = entry.getString(PROP_RATING_CALL_RESPONSE_SCHEME_ID);
                                if (ratingSchemeShortName.equals(ratingScheme) && currentUserRating != null) {
                                    // Current user has done a rating with the rating scheme that is associated with
                                    // this evaluator, so don't allow the user to rate again
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                } catch (JSONException je) {
                    je.printStackTrace();
                    return false;
                }
            } else {
                return false;
            }
        } catch (ConnectorServiceException cse) {
            cse.printStackTrace();
            return false;
        }

        return false;
    }

    private String getNodeId(Object nodeRefVal) {
        if (nodeRefVal == null) {
            return null;
        }
        String nodeRef = (String) nodeRefVal;
        int lastForwardSlash = nodeRef.lastIndexOf('/');
        if (lastForwardSlash == -1) {
            return null;
        }
        return nodeRef.substring(lastForwardSlash + 1);
    }
}
```

This evaluator uses the Rating REST API to make a call for all ratings made on a node. The URL and JSON response for this call looks like this:

```text
Call Example:
   http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/55e1cf8b-ac7a-4da5-9b3b-7ba8769923ab/ratings
 Response:
     {
     list: {
         pagination: {
                count: 2,
                hasMoreItems: false,
                totalItems: 2,
                skipCount: 0,
                maxItems: 100
        },
        entries: [
             {
                 entry: {
                     myRating: 4,
                     ratedAt: "2016-02-16T14:27:40.353+0000",
                     id: "fiveStar",
                     aggregate: {
                         numberOfRatings: 1,
                         average: 4
                     }
                 }
             },
             {
                 entry: {
                     id: "likes",
                         aggregate: {
                         numberOfRatings: 0
                     }
                 }
             }
         ]
         }
     }
```

This call is used to fetch all ratings made for a node with any scheme, such as `fiveStar` and `likes` in the above 
sample response. If current user has made a rating with one or more of the schemes then the `myRating` property will 
be set with the value.

Note that the scheme names are shorter variants of the ones used with the Java Rating Service (that is, `fiveStar` 
instead of `fiveStarRatingScheme`).

This sample has shown you how easy it is to start building a rating solution with the out-of-the-box rating schemes. 
Now, what would you have to do to use a custom rating scheme, such as a TV rating scheme that could be used to rate 
videos uploaded to Content Services.

Let's say you wanted to implement the US TV rating system as follows:

* (1) TV-Y
* (2) TV-Y7
* (3) TV-G
* (4) TV-PG
* (5) TV-14
* (6) TV-MA

New rating schemes can be added via spring injection. You simply need to define a bean that has `baseRatingScheme` as 
its parent bean, then add properties for `minRating` and `maxRating`, and the scheme will be automatically registered 
with the system on start-up:

```xml
<bean name="usTvRatingScheme" parent="baseRatingScheme" class="org.alfresco.repo.rating.RatingSchemeImpl">
    <property name="minRating" value="1"/>  <!-- TV-Y -->
    <property name="maxRating" value="6"/>  <!-- TV-MA -->
    <property name="selfRatingAllowed" value="true"/>
    <property name="modelPrefix" value="acmer"/>
    <property name="propertyRollups">
        <list>
            <bean class="org.alfresco.repo.rating.RatingCountRollupAlgorithm" parent="baseRollupAlgorithm">
                <property name="ratingSchemeName" value="usTvRatingScheme" />
            </bean>
            <bean class="org.alfresco.repo.rating.RatingTotalRollupAlgorithm" parent="baseRollupAlgorithm">
                <property name="ratingSchemeName" value="usTvRatingScheme" />
            </bean>
        </list>
    </property>
</bean>
```

This new Rating scheme will be registered under the bean `name`, which is `usTvRatingScheme`. When defining the new 
rating scheme we specify what the `min` and `max` rating value is for the scheme. The rating values are specified as 
float (or integers) and we would have to map those to a UI representation, similar to how we did it for the five star 
scheme above. We can specify if the scheme allows self rating or not with the `selfRatingAllowed` property, remember 
the `fiveStar` scheme, it did not allow self rating.

There is also a content model aspect that is needed to keep track of the scheme rollups. Where this aspect is defined 
is controlled by the Spring bean property `modelPrefix`, which in this case is set to a content model namespace prefix 
`acmer`.

The aspect basically keeps a count of the number of users that have rated a node with a scheme, and the total rating 
value for all ratings.

The US TV Scheme rollups aspect looks like this:

```xml
<model name="acmer:ratingModel" xmlns="http://www.alfresco.org/model/dictionary/1.0">

    <description>US TV Ratings Model</description>
    <author>Martin Bergljung</author>
    <version>1.0</version>

    <imports>
        <import uri="http://www.alfresco.org/model/dictionary/1.0" prefix="d"/>
        <import uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
        <import uri="http://www.alfresco.org/model/system/1.0" prefix="sys" />
    </imports>

    <namespaces>
        <namespace uri="http://www.acme.org/model/rating/1.0" prefix="acmer"/>
    </namespaces>

    <aspects>
        <aspect name="acmer:usTvRatingSchemeRollups">
            <title>US TV rating scheme rollups</title>
            <properties>
                <property name="acmer:usTvRatingSchemeCount">
                    <title>US TV Rating Scheme ratings count</title>
                    <type>d:int</type>
                    <index enabled="true">
                        <atomic>true</atomic>
                        <stored>true</stored>
                        <tokenised>false</tokenised>
                    </index>
                </property>
                <property name="acmer:usTvRatingSchemeTotal">
                    <title>US TV Rating Scheme ratings total</title>
                    <type>d:float</type>
                    <index enabled="true">
                        <atomic>true</atomic>
                        <stored>true</stored>
                        <tokenised>false</tokenised>
                    </index>
                </property>
            </properties>
        </aspect>
    </aspects>
</model>
```

The naming convention for the aspect is `<namespace specified with modelPrefix bean prop>:<bean name>Rollups`. The two 
aspect properties also have a similar naming convention.

To deploy the content model we use a dictionary bootstrap such as:

```xml
<bean id="org.alfresco.tutorial.add-rating.dictionaryBootstrap"
      parent="dictionaryModelBootstrap"
      depends-on="dictionaryBootstrap">
    <property name="models">
        <list>
            <value>alfresco/module/${project.artifactId}/model/content-model.xml</value>
        </list>
    </property>
</bean>
```

We could now start rating nodes with this custom theme in the same way we did it in the Repository action above, using 
the Java Rating Service. We just need to change `fiveStarRatingScheme` to `usTvRatingScheme`.

Now, for this custom rating theme to work with the new REST API, which was used in the Share evaluator above, we would 
have to add a Spring bean and a couple of classes. The bean will instantiate a class that maps the REST API's 
representation of the rating scheme to the Rating Service representation. Here is the class:

```java
import org.alfresco.rest.api.impl.node.ratings.AbstractRatingScheme;
import org.alfresco.rest.api.model.DocumentRatingSummary;
import org.alfresco.rest.framework.core.exceptions.InvalidArgumentException;
import org.alfresco.service.cmr.rating.RatingServiceException;
import org.alfresco.service.cmr.repository.NodeRef;

/**
 * The REST APIs representation of the 'US TV' rating scheme.
 *
 * @author martin.bergljung@alfresco.com
 */
public class UsTvRatingScheme extends AbstractRatingScheme {

    public UsTvRatingScheme() {
        super("usTv", "usTvRatingScheme");
    }

    public Float getRatingServiceRating(Object rating) {
        Float ratingToApply = null;

        if (rating instanceof Integer) {
            ratingToApply = ((Integer) rating).floatValue();
        } else {
            throw new InvalidArgumentException("Rating should be non-null and an integer for 'usTv' rating scheme.");
        }

        validateRating(ratingToApply);

        return ratingToApply;
    }

    public Object getApiRating(Float rating) {
        Object apiRating = Integer.valueOf(rating.intValue());
        return apiRating;
    }

    public DocumentRatingSummary getDocumentRatingSummary(NodeRef nodeRef) {
        return new UsTvRatingSummary(ratingService.getRatingsCount(nodeRef, ratingSchemeName),
                ratingService.getTotalRating(nodeRef, ratingSchemeName),
                ratingService.getAverageRating(nodeRef, ratingSchemeName));
    }

    @Override
    public void applyRating(NodeRef nodeRef, Object rating) {
        try {
            Float ratingServiceRating = getRatingServiceRating(rating);
            ratingService.applyRating(nodeRef, ratingServiceRating, getRatingServiceName());
        } catch (RatingServiceException e) {
            throw new InvalidArgumentException(e.getMessage());
        }
    }

    @Override
    public void removeRating(NodeRef nodeRef) {
        try {
            ratingService.removeRatingByCurrentUser(nodeRef, getRatingServiceName());
        } catch (RatingServiceException e) {
            throw new InvalidArgumentException(e.getMessage());
        }
    }
}
```

When defining the constructor for this class we map between the REST API name for the scheme and the original scheme 
name definition, that is, `usTv` -> `usTvRatingScheme`.

This class uses the `UsTvRatingSummary` class, which we also need to implement:

```java
import org.alfresco.rest.api.model.DocumentRatingSummary;

/**
 * Class representing the summary of all ratings with the US TV rating scheme.
 *
 * @author martin.bergljung@alfresco.com
 */
public class UsTvRatingSummary implements DocumentRatingSummary {
    private Integer numberOfRatings;
    private Float average;

    public UsTvRatingSummary(Integer numberOfRatings, Float ratingTotal, Float average) {
        super();
        this.numberOfRatings = numberOfRatings;
        this.average = (average == -1 ? null : average);
    }

    public Integer getNumberOfRatings() {
        return numberOfRatings;
    }

    public Float getAverage() {
        return average;
    }

    @Override
    public String toString() {
        return "UsTvRatingSummary [numberOfRatings=" + numberOfRatings + ", average=" + average + "]";
    }

}
```

This API Rating Scheme class is registered with the REST API as follows:

```xml
<bean id="apiUsTvRatingScheme" class="org.alfresco.tutorial.rating.scheme.UsTvRatingScheme">
    <property name="nodeService" ref="NodeService" />
    <property name="dictionaryService" ref="DictionaryService" />
    <property name="activityService" ref="activityService" />
    <property name="siteService" ref="SiteService" />
    <property name="ratingService" ref="RatingService" />
    <property name="nodeRatingSchemeRegistry" ref="nodeRatingSchemeRegistry" />
</bean>
```

If we now make a call to the rating rest API to get the ratings for a node 
(e.g. `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/591a3463-ca44-4c5e-ad28-eee72a9c4609/ratings`), 
we should see the following type of response:

```json
 {
 list: {
     pagination: {
            count: 3,
            hasMoreItems: false,
            totalItems: 3,
            skipCount: 0,
            maxItems: 100
    },
    entries: [
         {
             entry: {
                 myRating: 3,
                 ratedAt: "2016-02-18T11:12:12.526+0000",
                 id: "fiveStar",
                 aggregate: {
                     numberOfRatings: 1,
                     average: 3
                 }
             }
         },
         {
             entry: {
                 id: "likes",
                     aggregate: {
                     numberOfRatings: 0
                 }
             }
         },
         {
             entry: {
                 id: "usTv",
                     aggregate: {
                     numberOfRatings: 0
                 }
             }
         }             
     ]
     }
 }
```

Note the `entry` for the US TV Rating Scheme at the end.

## Deployment - App Server

* A lot of Java code is usually involved in implementing a Rating solution, so it is better to use repository and Share JARs for this.

## Deployment All-in-One SDK project

* **Share:**
* `aio/share-jar/src/main/resources/alfresco/web-extension` - Doc Lib actions, Properties, Indicators etc
* `aio/share-jar/src/main/resources/META-INF/resources/share-jar/components/documentlibrary/[indicators | actions]` - resources such as CSS, JS, Images
* `aio/share-jar/src/main/java/{custom package path}` - UI evaluators
* **Platform:**
* `aio/platform-jar/src/main/java/{custom package path}` - Rating related Java classes
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml` - Custom Rating Scheme Spring Bean definition, REST API Rating scheme beans, content model bootstrapping
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml` - repository Action Spring Bean definition

## Sample Code

* [FiveStar Rating sample and custom UsTv Rating sample](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-rating-repo){:target="_blank"}
* [FiveStar Rating UI sample](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-rating-share){:target="_blank"}
