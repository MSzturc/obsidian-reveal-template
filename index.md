---
title: "Obsidian Reveal Demo Template"

revealOptions:
  transition: 'slide'
---

#### Links

Link: [google](http://www.google.de)

---

#### Images

--

#### Markdown include

![Dog](images/dog.jpg)

--

#### Obsidian synthax absolute path

![[dog.jpg]]

--

#### Obsidian synthax with fragment

![[dog.jpg]] <!-- .element: class="fragment" -->

--

#### Obsidian synthax find image

![[cat.jpg]]

--
<!-- .slide: data-background="images/cat.jpg" data-background-opacity="0.5" -->

#### Slide with Background image

---

#### Markdown

--

#### Embed Markdown files with extension

![[Second Slide.md]]

--

#### Embed Markdown files without extension

![[Hallo.welt]]

![[Grütze]]

--

#### Embed Part of Markdown file

![[Meine Tiere#Hund]]

--

#### Embed Part of Markdown file

![[Meine Tiere#Only a Title]]

--

#### Wrong title

![[Meine Tiere#Wrong Title]]

---

#### Image with Size property

![Dog](images/dog.jpg) <!-- .element: style="height: 200px; width:300px" -->

--

#### Image with Size property 

![[dog.jpg]] <!-- .element: style="height: 200px; width:300px" -->

--

#### Image with Size property

![[dog.jpg|300x200]]

![[dog.jpg|300]]

--

#### Image with Size property and element comment

![[dog.jpg|300x200]] <!-- .element: class="resize" -->


---

#### Custom Stylesheet

<style>

	.red{
		background-color: red;
	}

</style>


## Red backgrounded Text <!-- .element: class="red" -->


---

<style>

	.block{
		border: 1px solid red;
	}

</style>

### Block Sections

::: block

#### Header
_and_
Paragraph content
*in same block*

:::

---

### Block Quotes

> Human beings face ever more complex and urgent problems, and their effectiveness in dealing with these problems is a matter that is critical to the stability and continued progress of society.

---

### Code Blocks

```js
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```

---

### Task list

- [x] #tags, [links](#/3), **formatting** supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item
- [ ] tasks can be clicked in Preview to be checked off


---

### Tables


First Header | Second Header
------------ | ------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column


---

### Footnotes

First Footnote[^1]

Here's a simple footnote,[^2] and here is another[^another].

[^1]: meaningful!

[^2]: second

[^another]: this is meaningful too!


---

# Internal Links

- This [[Problem]] is [[Complexity|complex]]
