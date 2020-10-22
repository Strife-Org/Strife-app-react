import React from "react";
import SimpleMarkdown from "simple-markdown";

import Mention from "./Mention"

var tagRule = {
  // Specify the order in which this rule is to be run
  order: SimpleMarkdown.defaultRules.em.order - 0.5,

  // First we check whether a string matches
  match: function (source) {
    return /^@<([\s\S]+?)>/.exec(source);
  },

  // Then parse this string into a syntax node
  parse: function (capture, parse, state) {
    return {
      content: parse(capture[1], state),
    };
  },

  // Finally transform this syntax node into a
  // React element
  react: function (node, output) {
    return <Mention  key={`markdown${node.content[0].content}`} >{node.content}</Mention>;
  },

  // Or an html element:
  // (Note: you may only need to make one of `react:` or
  // `html:`, as long as you never ask for an outputter
  // for the other type.)
  html: function (node, output) {
    return "<u>" + output(node.content) + "</u>";
  },
};

var rules = {
  ...SimpleMarkdown.defaultRules,
  tag: tagRule,
};

var rawBuiltParser = SimpleMarkdown.parserFor(rules);
var parse = function(source) {
    var blockSource = source + "\n\n";
    return rawBuiltParser(blockSource, {inline: false});
};
// You probably only need one of these: choose depending on
// whether you want react nodes or an html string:
var reactOutput = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'));

export default function Markdown({ children }) {
  const tree = parse(children);
  const elements = reactOutput(tree);
  return <div>{elements}</div>;
}
