CSS Automatic Documentation
===========================

This is a draft to bring automatic documentation to CSS files, like its known for JavaScript and PHP files through JavaDoc/DocTags.    
CSSdoc Comments use the standard CSS block comments, but apply some commands directly after the comment opener.

    /*[!|-|=|demo]
        ...
    */

##### Block Types
 * **!**    
    The project indicator should be used for the first comment in your stylesheet.
 * **=**    
     The equal character defines a new module.
 * **-**    
    The minus character defines a new element.
 * **demo**    
    The demo command defines a new code example.

The Project
-----------
The project can be defined anywhere in your stylesheet files, but its best practice to define it in a comment at the very beginning of your main CSS file.    
Example:

    /*!
        Project Title/Headline
        A project description that can be
        multiple lines long. Just as you wish.

        @version 1
        @used http://example.com/
    */


Modules
-------
The CSS documentation is structured in modules and elements.    
To indicate that something belongs to a certain module, use the @module parameter, like so:
    
    @module: my module name

A module itself is defined by using the exclamation mark as first character in the comment block:

    /*=
        My Module Headline
        Some module description which goes deeper and explains more.

        @module mymodule
    */

The first line in the module definition is the modules headline.    
The second, and any other following headline is considered as module description.    
Finally use the @module parameter to indicate the belonging.    
To get a visual separation in your CSS file, you can repeat the "=" character at the beginning as many times as you want:

    /*====================================

So what is considered as a module?    
Well, everything you can pack together because it logically belongs to each other.    
For example all button styles, all link styles, or all form styling.


Elements
--------
An Element in CSSdoc represents all CSS rules used on a single visual Element in HTML.    
This can be a item in your shopping bag, or the shopping bag itself. Its up to your decision.

Introduce a new element like so:

    /*-
        An example Element
        This is my explanation on the example element.

        @module mymodule
    */

All CSS-Rules following the element definition are assigned to the element, until a new element definition is set, or the file ends.

To get a visual separation in your CSS file, you can repeat the "-" character at the beginning as many times as you want:

    /*------------------------------------

---

Code Examples
-------------
To have visual representation of the CSS-Classes you can embed markup examples in the CSSdoc.
Introduce them like so:

    /*demo
        <a href="#" class="myclass">This is a example link</a>
    */

Code demos are assigned to the last introduced element.


Additional parameters
---------------------
####@author
Use this tag to define an author for an element.
It can either be only the authors' name, or append a connection in <> brackets.
Example:

    @author Christian Engel <hello@wearekiss.com>

The following connections are recognized: URL (http://example.com), email (hello@example.com), Twitter handle (@example) 
The tag can be used multiple times.

####@version
Can be used on modules and elements to show the revision they are currently in.    
Example:

    @version 12

You may as well append a date after the version number.

    @version: 12 2011-10-26

####@since
Can be used on modules and elements to show in which revision they have been implemented.    
Example:

    @since 3

####@deprecated
This indicates that the following element is, or will be deprecated in the future. Define a upcoming version number to indicate that the element will be deprecated then.    
Example:

    @deprecated 18

Alternatively any string can be placed as well:

    @deprecated Will be used no more since 2011-11-13

####@example
Can be used on the project, modules and elements to link to a real world example where the styles are used.    
Example:

    @example http://example.com/contact.html

####@TODO
The TODO marker indicates if something has to be done on either projects, modules or elements.     
Example:

    @TODO Make layout responsive

####@license
This displays a hyperlink to a url for a license. Can be used in the project definition block. Its made of two parts - the URL and a title, separated by comma.    
Example:

    @license http://opensource.org/licenses/gpl-license.php GNU Public License

####@copyright
This tag is used to apply copyright information to the CSS document.    
It can be used on the project definition block.    
Example:

    @copyright Copyright (c) 2012, Kiss