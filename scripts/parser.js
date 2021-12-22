//INCLUDE a LEXER
//import{hello} from "./lexer.js";

/**************************
 * ******** MY_TREE *******
 * ************************/

const Table = require('cli-table');
var EPSILON = "ε";

var firstSets = {};
var followSets = {};
var terminals = [];
var nonTerminals = [];

function buildFirstSets(grammar) {
    firstSets = {};
    buildSet(firstOf);
}

function firstOf(symbol) {

    if (firstSets[symbol]) {
        return firstSets[symbol];
    }

    var first = firstSets[symbol] = {};
    if (isTerminal(symbol)) {
        first[symbol] = true;
        return firstSets[symbol];
    }

    var productionsForSymbol = getProductionsForSymbol(symbol);
    for (var k in productionsForSymbol) {
        var production = getRHS(productionsForSymbol[k]);

        for (var i = 0; i < production.length; i++) {
            var productionSymbol = production[i];
            if (productionSymbol === EPSILON) {
                first[EPSILON] = true;
                break;
            }

            var firstOfNonTerminal = firstOf(productionSymbol);

            if (!firstOfNonTerminal[EPSILON]) {
                merge(first, firstOfNonTerminal);
                break;
            }
            merge(first, firstOfNonTerminal, [EPSILON]);
        }
    }
    return first;
}

function getProductionsForSymbol(symbol) {
    var productionsForSymbol = {};
    for (var k in grammar) {
        if (grammar[k][0] === symbol) {
            productionsForSymbol[k] = grammar[k];
        }
    }
    return productionsForSymbol;
}

function getLHS(production) {
    return production.split('->')[0].replace(/\s+/g, '');
}

function getRHS(production) {
    return production.split('->')[1].replace(/\s+/g, '');
}

function buildFollowSets(grammar) {
    followSets = {};
    buildSet(followOf);
}

function followOf(symbol) {
    if (followSets[symbol]) {
        return followSets[symbol];
    }
    var follow = followSets[symbol] = {};

    if (symbol === START_SYMBOL) {
        follow['$'] = true;
    }

    var productionsWithSymbol = getProductionsWithSymbol(symbol);
    for (var k in productionsWithSymbol) {
        var production = productionsWithSymbol[k];
        var RHS = getRHS(production);

        var symbolIndex = RHS.indexOf(symbol);
        var followIndex = symbolIndex + 1;

        while (true) {

            if (followIndex === RHS.length) { // "$"
                var LHS = getLHS(production);
                if (LHS !== symbol) { // To avoid cases like: B -> aB
                    merge(follow, followOf(LHS));
                }
                break;
            }

            var followSymbol = RHS[followIndex];

            var firstOfFollow = firstOf(followSymbol);

            if (!firstOfFollow[EPSILON]) {
                merge(follow, firstOfFollow);
                break;
            }

            merge(follow, firstOfFollow, [EPSILON]);
            followIndex++;
        }
    }

    return follow;
}

function buildSet(builder) {
    for (var k in grammar) {
        builder(grammar[k][0]);
    }
}

function getProductionsWithSymbol(symbol) {
    var productionsWithSymbol = {};
    for (var k in grammar) {
        var production = grammar[k];
        var RHS = getRHS(production);
        if (RHS.indexOf(symbol) !== -1) {
            productionsWithSymbol[k] = production;
        }
    }
    return productionsWithSymbol;
}

function isTerminal(symbol) {
    return !/[A-Z]/.test(symbol);
}

function merge(to, from, exclude) {
    exclude || (exclude = []);
    for (var k in from) {
        if (exclude.indexOf(k) === -1) {
            to[k] = from[k];
        }
    }
}

function printGrammar(grammar) {
    console.log('Gramatica:\n');
    for (var k in grammar) {
        console.log('  ', grammar[k]);
    }
    console.log('');
}

function printSet(name, set) {
    console.log(name + ': \n');
    for (var k in set) {
        console.log('  ', k, ':', Object.keys(set[k]));
    }
    console.log('');
}

var grammar = {
  1: 'S->A',
  2: 'A->EB',
  3: 'A->ORJBU',
  4: 'A->CZTBM',
  5: 'A->YV=N;B',
  6: 'E->W(N);',
  7: 'W->L',
  8: 'W->F',
  9: 'W->R',
  10: 'B->ε',
  11: 'B->A',
  12: 'L->l',
  13: 'F->f',
  14: 'O->o',
  15: 'R->r',
  16: 'N->n',
  17: 'I->i',
  18: 'C->c',
  19: 'Y->y',
  20: 'V->v',
  21: 'R->(I:N)',
  22: 'Z->(I==I)',
  23: 'J->{',
  24: 'U->}',
  25: 'T->[',
  26: 'M->]',
}
var START_SYMBOL = 'S';
//var text = "l(n);";
//var text = "o(i:n){l(n);}";
//var text = "o(i:n){f(n);c(i==n)[r(n);]}l(n);f(n);"
var text = "c(i==n)[r(n);]";

startUp(grammar, text);


var parserTable;


function startUp(grammar, text) {
  printGrammar(grammar);
  buildFirstSets(grammar);
  buildFollowSets(grammar);
  printSet('Conjunto Primeros', firstSets);
  printSet('Conjunto Segundos', followSets);
  buildNonTerminals(grammar);
  buildTerminals(grammar);
  parserTable = buildParserTable(grammar);
  drawParsingTable(grammar);
  solve(text);
}

function drawParsingTable(grammar) {
  let ptable = parserTable;
  let table = new Table({
    head: ['', ...terminals, '$']
  });
  nonTerminals.map((nonTerminalItem) => {
    let arr = [];
    terminals.map((terminalItem) => {
      arr.push(ptable[nonTerminalItem][terminalItem] || '');
    });
    arr.push(ptable[nonTerminalItem]['$'] || '');

    // console.log(ptable[item]);
    table.push([nonTerminalItem, ...arr]);
  });
  console.log(table.toString());
}

function buildNonTerminals(grammar) {
  for(var k in grammar) {
    let temp = getLHS(grammar[k]);
    if(nonTerminals.indexOf(temp) == -1) {
        nonTerminals.push(temp);
    }
  }
  console.log("No Terminales: "+ nonTerminals);
}

function buildTerminals(grammar) {
  for (var k in grammar) {
    let temp = getRHS(grammar[k]);
    for (var i = 0; i < temp.length; i++) {
      if(nonTerminals.indexOf(temp[i]) == -1 && terminals.indexOf(temp[i]) == -1 ) {
        terminals.push(temp[i]);
      }
    }
  }
  console.log("Terminales: "+terminals);
}

function buildParserTable(grammar) {
  let ptable = {};


  // i in nonTerminals
  // j in terminals
  for (var k in grammar) {
    var itRHS = getRHS(grammar[k]);
    var itLHS = getLHS(grammar[k]);
    if(itRHS != EPSILON) {
      let tempTerminals = firstSets[itRHS[0]];
      for (termTemp in tempTerminals) {
          ptable[itLHS] = ptable[itLHS] || {};
          ptable[itLHS][termTemp]=k;
      }
    }
    else {
      let tempTerminals = followSets[itLHS];
      for (termTemp in tempTerminals) {
          ptable[itLHS] = ptable[itLHS] || {};
          ptable[itLHS][termTemp]=k;
      }
    }
  }
  return ptable;
}

function solve(input) {
    let log = [], reg=0;
    let consumedInput = "", remainInput = input+"$";
    let stack = ['$']; let action="nothing!";
    stack.push(START_SYMBOL);
    do {
      let top = stack[stack.length-1];
      if (stack.length == 1 && remainInput=="$")
        action = "Accept!";

      else if(isTerminal(top) && action!= EPSILON){
        action = "Matched!";
        stack.pop();
        consumedInput+=remainInput.slice(0,1);
        remainInput = remainInput.slice(1);
      }
      else if(top == EPSILON)
        stack.pop();
      else {
        let num = parserTable[top][remainInput[0]];
        if(!num) {
            stack.pop();
            reg = 1;
        }
        else{
          action = getRHS(grammar[num]);
          // console.log("stack111: ",stack);
          if(top != remainInput[0]) {
            stack.pop();
            action.split('').reverse().map((t)=>{stack.push(t)});
//             for(var i=0; i<action.length; i++){
//                 tree.add(action[i],top);
//                 console.log("FOR: "+action[i]+" <--- Top: "+top);
//             }
          }
        }
      }
      let tmp = {
        consumed: consumedInput,
        stack: stack.join(),
        top: stack[stack.length-1],
        remain: remainInput,
        action :action
      };
      log.push(tmp);
      if(action == "Accept!") break;
    } while (stack.length > 0);
    // console.log(parserTable[top][remainInput[0]]);
    let newTable = new Table({
        head: [ 'CONSUMEDINPUT', 'STACK', 'REMAIN', 'ACTION']
    });

    for(item in log) {
      arr = [] ;
      // console.log(log[item]);
      arr.push(log[item].consumed)
      arr.push(log[item].stack)
      arr.push(log[item].remain)
      arr.push(log[item].action)
      newTable.push(arr);
    }
    console.log(newTable.toString());
     //console.log(log);
     //console.log("stack: ",stack);
    console.log((reg)?"Ans: Tiene algunos errores":"Ans: Accept!");
}
