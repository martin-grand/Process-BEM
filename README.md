# Process-BEM
preprocess html class naming and compile it to bem syntax

##How it works?
Compile a template in JavaScript by using **ProcessBEM**


```js
var source = '<span class="button.icon(arrow)">',
    result = ProcessBEM(source);

// result: <span class="button__icon button__icon--arrow"></span>
```

## Explanation:


| Source        | Compiled  |
| ----------    | --------  |
| block                   | block 
| block.element           | block block__element 
| block.element.element   | block block__element__element 
| block.element(modifier) | block block__element block__element--modifier 
| block.e(m1,m2)          | block block__e block__e--m1 block__e--m2 
| block(modifier)         | block block--modifier 
| block(m1,m2)            | block block--m1 block--m2 

## Working example:

```html
<!-- Load ProcessBEM via cdn: -->
<script src="//cdn.rawgit.com/martin-grand/Process-BEM/master/process-bem.min.js"></script>

<!-- Define a source content: -->
<script type="text/x-template" id="source">
  <a class="button">
      <span class="button.text"></span>
      <span class="button.icon(arrow)"></span>
  </a>
  <a class="button(red)">
      <span class="button.text(uppercase,light,italic)"></span>
      <span class="button.icon(arrow, small)">
           <span class="button.icon.decor"></span>
      </span>
  </a>
  <a class="button(green, large, full-width, bottom)">
      <span class="button.text(bold)" id="text"></span>
      <span class='button.icon(arrow, large) custom-class'></span>
  </a>
</script>

<!-- The compiled result will be shown here: -->
<div id="result"></div>

<!-- And the magic: -->
<script>
  document.getElementById('result').innerHTML = ProcessBEM(document.getElementById('source').innerHTML);
</script>
```

### The `result` div will contains:

```html
<a class="button">
    <span class="button__text"></span>
    <span class="button__icon button__icon--arrow"></span>
</a>
<a class="button button--red">
    <span class="button__text button__text--uppercase button__text--light button__text--italic"></span>
    <span class="button__icon button__icon--arrow button__icon--small">
         <span class="button__icon__decor"></span>
    </span>
</a>
<a class="button button--green button--large button--full-width button--bottom">
    <span class="button__text button__text--bold" id="text"></span>
    <span class="button__icon button__icon--arrow button__icon--large custom-class"></span>
</a>
```

Sandbox & preview: http://codepen.io/martingrand/full/VjZdGe/
