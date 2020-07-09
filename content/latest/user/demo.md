---
title: Docs demo
layout: docs
---

## Note

{% include note.html note="Be aware when processing this file" %}


## Picture

{% include media.html image="/assets/img/tear-blue.png" caption="The file to process" %}

##  Tabs


{% capture my1 %}

Windows sux.

{% endcapture %}

{% capture my2 %}

Mac is a little bit better.

{% endcapture %}

{% capture my3 %}

Linux gets a dudey penguin.

{% endcapture %}

The following tabs explain how to use the properties in different operating systems: 

{% include tabs.html opt1="Kermit and" content1=my1 opt2="iOSy" content2=my2 opt3="linux" content3=my3 %}


[internal links]({% link content/latest/user/blocks.md %})


{% capture kermit %}

Kermit is the de facto leader of the Muppets.

{% endcapture %}

{% capture cookie %}

coooooookies

{% endcapture %}

{% capture animal %}

An animal

{% endcapture %}

{% include tabs.html opt1="Kermit the Frog" content1=kermit opt2="Cookie Monster" content2=cookie opt3="Animal" content3=animal %}







