# piclive-js 1.0

Piclive.js is a small javacript module that allows you to display a live image from a URL entered in a text field.

Developed by **Thomas Gouveia**.

**Version 1.0**

## 1. Install the module

Download the file here : **SOON**

Add this line in your html file :
```html
<!-- The value in src="" is the path to your piclive.js file. -->
<script src="js/piclive.js" type="module"></script>
```

## 2. How to use

First, you have to create an html image element for display the image. Add to this element the id ```piclive-viewer```. This id is very important, else the piclive module cannot find your image element.

```html
<img id="piclive-viewer" src="" alt=""></img>
```

Secondly, you have to create an html input element for enter URL. Add to this element the id ```piclive-input```. This id is very important, else the piclive module cannot find your input.

```html
<input id="piclive-input" type="text"></input>
```

Finally, add to these elements an attribute ```piclive-tag``` to link the input with the viewer. **This tag must be unique**.

```html
<img id="piclive-viewer" piclive-tag="demo" src="" alt=""></img>
<input id="piclive-input" piclive-tag="demo" type="text"></input>
```

Normally, if you put an image URL in the textfield, when you exit focus on it the image appear.


