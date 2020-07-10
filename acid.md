---
title: Acid test
layout: docs
---

## Anchors

## Bold

**Bold** content should be emphasized but not be mistaken for a heading.

## Callouts

{% include note.html note="Animal is a beast on drums" %}

{% include note.html note="The Cookie Monster likes choc chips" %}

## Code

Code blocks and inline code should be easily distinguishable from regular text.

### Blocks

Code blocks should be highlighted in the language they are declared in.

```json
    "mappings": {
        "EndEvent_0ss2fp3": {
            "inputs": {
                "name": {
                    "type": "variable",
                    "value": "username"
                },
```

The spacing between blocks should be continuous.

```xml
<bpmn2:endEvent id="EndEvent_1">
	<bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
	<bpmn2:messageEventDefinition messageRef="Message_1hxecs2" activiti:correlationKey="${userId}"</bpmn2:messageEventDefinition>
</bpmn2:endEvent>
```

### Inline

Using `properties` within a sentence should be obvious that it is a formatted.

## GIF

{% include media.html image="/assets/img/animal.gif" caption="Animated GIF of Animal playing the drums" %}

## Headers

## Images

{% include media.html image="/assets/img/logo.png" caption="The Alfresco Logo" %}

## Italic

Use of *italics* should still be legible in all browsers.

## Links

Links should be clearly visible and not be broken.

### Internal

If [internal links]({% link about.markdown %}) are implemented properly the site will not build if they are broken.

### External

[External links](https://en.wikipedia.org/wiki/The_Muppets){:target="_blank"} should always open in a new tab.

## Lists

Lists should display correctly whether they are ordered or unordered. Three levels of nesting should be supported. 

### Ordered

1. Arcu dictum varius duis at.
    * Turpis egestas.
    * In egestas erat.
2. Et netus et malesuada fames.
3. Mauris a diam maecenas sed.
    1. Consectetur adipiscing elit.
    2. Eu fugiat nulla pariatur.
        1. In voluptate velit.
        2. Vitae sapien.
    3. Faucibus interdum posuere.

### Unordered

* Arcu dictum varius duis at.
    * Turpis egestas.
    * In egestas erat.
* Et netus et malesuada fames.
* Mauris a diam maecenas sed.
    * Consectetur adipiscing elit.
    * Eu fugiat nulla pariatur.
        * In voluptate velit.
        * Vitae sapien.
    * Faucibus interdum posuere.
        1. Minim veniam.
        2. Adipiscing elit.

The spacing after a list should be continuous.

## Paragraphs

Paragraphs should have the correct spacing between any level of header and another paragraph.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Turpis egestas integer eget aliquet nibh praesent. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Non quam lacus suspendisse faucibus interdum posuere. Enim nec dui nunc mattis enim ut tellus. Adipiscing elit ut aliquam purus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Mauris cursus mattis molestie a iaculis at erat pellentesque. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Ornare suspendisse sed nisi lacus sed viverra tellus. In egestas erat imperdiet sed euismod nisi.

## Tabs

Tabs should operate correctly in all browsers.

{% capture kermit %}

Kermit is the de facto leader of the Muppets.

{% endcapture %}

{% capture cookie %}

| Item | Description |
| ---- | ----------- |
| Cookie | Delicious |
| Cookie | Delicious |
| `Cookie` | Delicious |

{% endcapture %}

{% capture animal %}

```bash
!@lkadfjfk@'';ksda##dsl'
```

{% endcapture %}

{% include tabs.html opt1="Kermit the Frog" content1=kermit opt2="Cookie Monster" content2=cookie opt3="Animal" content3=animal %}

The spacing after a set of tabs should be continuous.

## Table of contents

## Tables

{% capture properties %}

| Parameter | Description | Type | Required? |
| --------  | ----------- | ---- | --------- |
| `nodeId` | *Required.* ID *of* the file to sign from Alfresco Content Services | String | `*` | 
| `uri` | *Required.* The URI of the file to sign | String | `*` |
| `files` | *Required.* A [file](../../files.md) uploaded in a process and set as a process variable or uploaded as part of a form or another connector to sign | File | `*` |
| `recipientEmail` | *Required.* The email address to send the file to for signing | String | Yes |
| `recipientName` | *Required.* The name of the email recipient | String | No |
| `emailSubject` | *Required.* The subject line of the email | String | No | 
| `documentId` | *Optional.* A document ID for the Docusign API to use. The value must be positive integer | Integer | No | 
| `nodeFormat` | *Optional.* The document format for the Docusign API. The default value is `pdf` | String | No |
| `signHerePage` | *Optional.* The label for the `Sign Here` box in the document | String | No | 
| `signHereX` | *Optional.*  {% include tooltip.html word="community" text="Alfresco Community Edition" %} The X position of the `Sign Here` box in the document | String | No |


{% endcapture %}

{% include table.html table=properties %}

Space between.



## Tooltips

Tooltips should display the term they are describing underneath the word. For example when discussing {% include tooltip.html word="community" text="Alfresco Community Edition" %} the description will expand left of the word. 

## Videos

Videos should be embedded within the page rather than linking out to an external site. They should be responsive and never have autoplay enabled.

{% include media.html video="https://www.youtube.com/embed/tgbNymZ7vqY" %}

The spacing after a video should be continuous.