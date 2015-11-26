---
layout: post
title: How to create a Safari Pinned Tab (SVG) for your website
---

With the new feature in Safari allows you to drag tabs to the left to create permanent tabs for those websites. This post shows you how to create your own pinned tab SVG image. Start by adding link tag to the `<head>` section of your site.

{% highlight html %}
<link rel="mask-icon" href="website_icon.svg" color="red">
{% endhighlight %}

![safari pinned tab](http://i.imgur.com/PxcsQeg.gif)

Next hit `Shift + Command + G` in the finder and paste in the following URL:

> ~/Library/Safari/Template Icons

Keep this open as this is the cache for Safari's icons. If you think it doesn't update after you've made changes, delete the contents in this folder and restart Safari.

According to the official documents for [icons on pinned tabs](https://developer.apple.com/library/prerelease/mac/releasenotes/General/WhatsNewInSafari/Articles/Safari_9.html#//apple_ref/doc/uid/TP40014305-CH9-SW20), we need an SVG image with a transparent background and 100% black for all vectors. With the color attribute from the "mask-icon" on top we can change the hover-over color for the icon. There can only be 1 color so choose wisely. In my case I chose a pink color.

If you have an existing favicon/logo, you can use [http://vectormagic.com/](http://vectormagic.com/) to turn it into a SVG file. It will replace your bitmap with vectors which you then can either edit yourself or inside their website. So I went ahead and created a SVG from my website [Mashnieuws.nl](http://mashnieuws.nl). It is the shape of a flower, which is easy to work with. Then you can use apps like Illustrator (paid) or Inkscape (free) to trace lines in the image and turn everything to the color black, which will act as the area for the color hover effect. Be sure that there is only 1 color in the document, black, and no background color. Not even white. The rest has to be transparent.

Below is the result for my tracing lines for the flower. As you will see, the black will turn into pink. Keep in mind that the icon in the tab is small, so don't care about small details. Aim for something recognizable.

![pinned safari mashnieuws comparison](http://i.imgur.com/MTJmpWS.png)

Then I adjusted the previously mentioned mask-icon link to the correct color #cc0066 and name:

{% highlight html %}
<link rel="mask-icon" href="mashnieuws.svg" color="#cc0066">
{% endhighlight %}

So the end result is that it works immediately, as seen in the GIF below. I also created a SVG for my blog, but as it's an image of a bear, it doesn't come out so well.

![pinned safari bear in action](http://i.imgur.com/gy2IhhV.gif)

Clear Safari's cache and restart the app if you've made adjustments.

Easy method that only takes about half an hour and it will further enrich your user experience, even if it's just for a few people.
