---
layout: post
title: Customizing console log output
image: https://i.imgur.com/4rZrd18.png
image-width: 2170
image-height: 664
image-sizes: 100vw
image-alt: console.log text customization
---

<amp-img width="2170" height="664" sizes="100vw" src="https://i.imgur.com/4rZrd18.png" alt="console.log text customization"></amp-img>
<span class="image__byline-span">Example console output</span>

Open console and copy and paste the following:

{% highlight javascript %}
console.log(
	'%c ♥ %cweb %cdev%celop%cment%c:\)',
	'background: #ddd; color: red; font-weight: bold; font-size: x-large;',
	'background: #ddd; color: #f36f21; font-weight: bold; font-size: x-large;',
	'background: #ddd; color: #000; font-weight: bold; font-size: x-large;',
	'background: #ddd; color: #f36f21; font-weight: bold; font-size: x-large;',
	'background: #ddd; color: #000; font-weight: bold; font-size: x-large;',
	'background: #ddd; color: red; font-weight: bold; font-size: x-large;'
);
{% endhighlight %}

Or make rainbow text with the <a href="https://stackoverflow.com/questions/7505623/colors-in-javascript-console/21457293#21457293">example from StackOverflow</a>.