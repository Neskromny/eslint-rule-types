"use strict";

module.exports = {
    meta: {
        docs: {
            description: "check DW type space",
            category: "Stylistic Issues",
            recommended: true
        },
        fixable: "whitespace",
        schema: []
    },

    create: function (context) {

        const sourceCode = context.getSourceCode();
        function report(mainNode) {
            context.report({
                node: mainNode,

                message: "space required after DW type assignment operator : ",
                fix(fixer) {
                    return fixer.insertTextAfter(mainNode, " ");
                }
            });
        }

        function checkFunc(node) {
            const maybecolon = sourceCode.getTokenBefore(node.returnDWType, 0);

            if (maybecolon &&
                maybecolon.type === "Punctuator") {
                const idt = sourceCode.getTokenAfter(maybecolon, 0);

                if (idt && idt.type === "Identifier") {
                    const hasSpacetail = sourceCode.isSpaceBetweenTokens(maybecolon, idt);
                    if (!hasSpacetail) {
                        report(maybecolon);
                    }
                }
            }
        }
        function checkIdt(node) {

            const maybecolon = sourceCode.getTokenAfter(node, 0);

            if (maybecolon &&
                maybecolon.type === "Punctuator") {
                const leadToken = sourceCode.getTokenBefore(maybecolon);
                const tailToken = sourceCode.getTokenAfter(maybecolon);
                const hasSpacelead = sourceCode.isSpaceBetweenTokens(leadToken, maybecolon);
                const hasSpacetail = sourceCode.isSpaceBetweenTokens(maybecolon, tailToken);

                if (!hasSpacetail) {
                    report(maybecolon);
                }
            }
        }
        function checkVar(node) {
            const maybecolon = sourceCode.getTokenBefore(node.returnDWType, 0);

            if (maybecolon &&
                maybecolon.type === "Punctuator") {
                const leadToken = sourceCode.getTokenBefore(maybecolon);
                const tailToken = sourceCode.getTokenAfter(maybecolon);
                const hasSpacelead = sourceCode.isSpaceBetweenTokens(leadToken, maybecolon);
                const hasSpacetail = sourceCode.isSpaceBetweenTokens(maybecolon, tailToken);

                if (!hasSpacetail) {
                    report(maybecolon);
                }
            }
        }
        function checkSpace(node) {
            if (node.returnDWType) {
                switch (node.type) {
                case "FunctionDeclaration":
                    checkFunc(node);
                    break;
                case "Identifier":
                    checkIdt(node);
                    break;
                case "VariableDeclarator":
                    checkVar(node);
                    break;
                default:
                    return;
                }

            }

        }

        return {
            Identifier: checkSpace,
            FunctionDeclaration: checkSpace,
            VariableDeclarator: checkSpace
        };

    }
};
