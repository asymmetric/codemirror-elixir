CodeMirror.defineSimpleMode("elixir", {
  // The start state contains the rules that are intially used
  start: [
    // The regex matches the token, the token property contains the type
    // {regex: /"(?:[^\\]|\\.)*?"/, token: "string"},
    {regex: /".*"/, token: "string"},
    {regex: /'.*'/, token: "string-2"},
    // You can match multiple tokens at once. Note that the captured
    // groups must span the whole string in this case
    {regex: /(def(?:p|module)?)(\s)([\w]*)/,
     token: ["keyword", null, "variable-2"]},
    // Rules are matched in the order in which they appear, so there is
    // no ambiguity between this one and the one above
    {regex: /(?:def|defp|defmodule|defmacro|defmacrop|case|when|cond|for|if|unless|try|receive|send|exit|raise|throw|after|rescue|catch|else|quote|unquote|super|spawn|spawn_link|spawn_monitor|fn|import|require)\b/,
     token: "keyword"},
    {regex: /[A-Z][a-z]*/, token: "qualifier"},
    {regex: /true|false|nil/, token: "builtin"},
    {regex: /:(?:"[\w\s]*"|'[\w\s]*'|\w*)/, token: "atom"},
    {regex: /0x[a-f\d]+|[-+]?(?:0o)?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
     token: "number"},
    {regex: /#.*/, token: "comment"},
    {regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
    // A next property will cause the mode to move to a different state
    // {regex: /\/\*/, token: "comment", next: "comment"},
    // indent and dedent properties guide autoindentation
    {regex: /[{\[\(]|%{|do|->/, indent: true},
    {regex: /[\}\]\)]|end/, dedent: true},
    {regex: /[-+*=<>!]+/, token: "operator"},
    {regex: /[a-z][\w]*/, token: "variable"},
    // underscored variables
    {regex: /_\w*/, token: "comment"},
    // sigils
    {regex: /(~[rRwWcCsS]["'/_\[{(])(.*?)(["'/_\]})][acs]?)/, token: ["comment", "string", "comment"]},
    // You can embed other modes with the mode property. This rule
    // causes all code between << and >> to be highlighted with the XML
    // mode.
    {regex: /<</, token: "meta", mode: {spec: "xml", end: />>/}}
  ],
  // The multi-line comment state.
  comment: [
    {regex: /.*?\*\//, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"}
  ],
  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "#",
    electricInput: /^\s*end$/
  }
});
