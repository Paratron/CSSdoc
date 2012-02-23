/**
 * CSSdoc parser
 * This script can parse CSS sourcecode to a suitable CSSdoc object tree, which can be passed to a CSSdoc template.
 *
 * @author Christian Engel <hello@wearekiss.com>
 * @version 1 2012-02-23
 */
var CSSdoc = (function(){
    var element_regex = /((\/\*(!|=|-|demo)([\s\S]+?)\*\/)|(.+?){([\s\S]+?)})/mg;

    var parseCSS = function(source){
        var parts = source.match(element_regex),
            result = {
                title: 'CSSdoc',
                description: '',
                modules: {
                    'default': {
                        title: 'Default stylings',
                        description: 'This stylings aren\'t assigned to any module',
                        elements: []
                    }
                }
            },
            current_module = 'default',
            current_element = null,
            module_increment = 0;

        var i = 0,
            len = parts.length,
            block,
            lines,
            baseline,
            lastline,
            content,
            tags,
            obj,
            parseBody = function(lines){
                var returning = {
                    headline: lines.shift().replace(/^\s+|\s+$/g,""),
                    body: ''
                };
                var line,
                    i = 0,
                    len = lines.length;
                for(;i<len;i+=1){
                    line = lines[i].replace(/^\s+|\s+$/g,"");
                    if(!line) continue;
                    if(line.substr(0, 1) != '@'){
                        returning.body += line + '\n';
                    }
                }
                returning.body = returning.body.substr(0,returning.body.length - 1);
                return returning;
            };

        for(;i < len;i+=1){
            block = parts[i];
            lines = block.split('\n');
            baseline = lines.shift();
            lastline = lines.pop();

            switch(baseline.substr(0, 3)){
                case '/*!':
                    //Project
                    content = parseBody(lines);
                    result.title = content.headline;
                    result.description = content.body;
                break;
                case '/*=':
                    //Module
                    content = parseBody(lines);
                    current_module = module_increment;
                    module_increment++;
                    current_element = null;
                    var obj = {
                        title: content.headline,
                        description: content.body,
                        elements: []
                    }
                    result.modules[current_module] = obj;
                break;
                case '/*-':
                    //Element
                    content = parseBody(lines);
                    var obj = {
                        title: content.headline,
                        description: content.body,
                        content: []
                    };
                    result.modules[current_module].elements.push(obj);
                    current_element = result.modules[current_module].elements.length-1;
                break;
                case '/*d':
                    //Demo
                    var obj = {
                        type: 'demo',
                        source: lines.join('\n').replace(/^\s+|\s+$/g,"")
                    }
                    result.modules[current_module].elements[current_element].content.push(obj);
                break;
                default:
                    //Anything else.

                    //Dealing with CSS?
                    content = String(baseline+lines.join('\n')+lastline).replace(/^\s+|\s+$/g,"");
                    if(content.substr(-1, 1) == '}'){
                        //CSS!
                        var obj = {
                            type: 'css',
                            selector: content.match('^[^{]+')[0].replace(/^\s+|\s+$/g,""),
                            content: String(content.match(/\{([\s\S]+?)\}/mg)).replace(/{|}|\n/g, "").replace(/  +/g, ' ').replace(/^\s+|\s+$/g,"")
                        }
                        result.modules[current_module].elements[current_element].content.push(obj);
                    }
            }
        }

        return result;
    }

    return {
        parse: function(source){
            return parseCSS(source);
        },
        template: function(template, data){
            
        }
    }
})();