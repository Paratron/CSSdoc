CSS Automatic Documentation
===========================

This is a draft to bring automatic documentation to CSS files, like its known for JavaScript and PHP files through 
CSSdoc Comments use the standard CSS block comments, but apply some commands directly after the comment opener.

    /*[*|!|demo]
    
    */

##### Tag Types
 * **!**    
     The exclamation mark defines a new module.
 * **\***    
    The asterisk defines a new element.
 * **demo**    
    The demo command defines a new code example.

Modules
-------

The CSS documentation is structured in modules and elements.
To indicate that something belongs to a certain module, use the @module parameter, like so:
    
    @module: my module name

A module itself is defined by using the exclamation mark as first character in the comment block:

    /*!
        My Module Headline
        Some module description which goes deeper and explains more.

        @module: mymodule
    */

The first line in the module definition is the modules headline.
The second, and any other following headline is considered as module description.
Finally use the @module parameter to indicate the belonging.

So what is considered as a module?
Well, everything you can pack together because it logically belongs to each other.
For example all button styles, all link styles, or all form styling.


Elements
--------

An Element in CSSdoc represents all CSS rules used on a single visual Element in HTML.
This can be a item in your shopping bag, or the shopping bag itself. Its up to your decision.

Introduce a new element like so:

    /**
        An example Element
        This is my explanation on the example element.

        @module: mymodule
    */

All CSS-Rules following the element definition are assigned to the element, until a new element definition is set, or the file ends.

---

Code Examples
-------------
To have visual representation of the CSS-Classes you can embed markup examples in the CSSdoc.
Introduce them like so:

    /*demo
        <a href="#" class="myclass">This is a example link</a>
    */

Code demos are assigned to the last introduced element.


Notes
-----
Every "normal" CSS comment you assign inside a CSS rule will be attached as a note to the rule.
For example:

    .myrule{
        color: #fff; /* Don't use this on white background! */
    }