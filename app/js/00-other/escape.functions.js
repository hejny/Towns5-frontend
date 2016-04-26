//todo headers



//todo refactor: (extend markdown with this)? or (create escaping static object)? or (put this to String prototype)?
//todo jsdoc
function markdownEscape(string){

    [
        '\\',//backslash
        '`',//backtick
        '*',//asterisk
        '_',//underscore
        '{',//curly braces
        '}',
        '[',//square brackets
        ']',
        '(',//parentheses
        ')',
        '#',//hash mark
        '+',//plus sign
        '-',//minus sign (hyphen)
        '.',//dot
        '!'
    ].forEach(function(char){

        string = string.split(char).join('\\'+char);

    });

    return(string);

}
