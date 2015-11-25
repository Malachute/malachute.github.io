---
layout: post
title: How to create a Safari Pinned Tab for your website
---

With the new feature in Safari allows you to drag tabs to the left to create permanent tabs for those websites. This post shows you how to create your own pinned tab SVG image. Start by adding link tag to the `<head>` section of your site.

{% highlight html %}
<link rel="mask-icon" href="website_icon.svg" color="red">
{% endhighlight %}

![safari pinned tab](http://i.imgur.com/u7uqLFg.gif "Safari Pinned Tab")

Next hit `Shift + Command + G` in the finder and paste in the following URL:

> ~/Library/Safari/Template Icons

Keep this open as this is the cache for Safari's icons. If you think it doesn't update after you've made changes, delete the contents in this folder and restart Safari.

According to the official documents for [icons on pinned tabs](https://developer.apple.com/library/prerelease/mac/releasenotes/General/WhatsNewInSafari/Articles/Safari_9.html#//apple_ref/doc/uid/TP40014305-CH9-SW20), we need an SVG image with a transparent background and 100% black for all vectors. With the color attribute from the "mask-icon" on top we can change th
e hover-over color for the icon. There can only be 1 color so choose wisely.

I used [http://vectormagic.com/](http://vectormagic.com/) to turn my favicon into a SVG file. Then you can use apps like Illustrator or Inkscape to trace black lines in the image, which will act as an outline for the hover effect. Most companies won't have to do this, as their logo's are usually letters/symbols.

Below is the result for my tracing lines for the bear.

![pinned safari bear comparison](http://i.imgur.com/lj4fsmV.png)

Then I adjusted the previously mentioned mask-icon link to the correct color brown as follows:

{% highlight html %}
<link rel="mask-icon" href="bear.svg" color="#654321">
{% endhighlight %}

So the end result is that it works immediately as seen in the GIF below. The bear is not really visible, but it should serve as a basis.

![pinned safari bear in action](http://i.imgur.com/kYluzfo.gif)

Clear Safari's cache if you need to make adjustments.

Easy method that took me about 1 hour to enrich your user experience even if it's just for a few people.
