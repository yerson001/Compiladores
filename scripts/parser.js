/*******************
 *      Parser     
 ******************/

var tokens = new Array();

function init(){
  tokens = tokenSorter();
  console.log("----init_start-----");
  listOftoken();
}


/**********************
 *     LIST_OF_TOKEN
 *********************/
function listOftoken(){
  var tokenList = lex();
  var tokenListt = lex();
  for(var i=0; i<tokens.length; ++i){
    tokenList[i] = tokens[i].Token;
    tokenListt[i] = tokens[i].Type;
//     print(tokenList[i] + tokenListt[i].Type + "\n");
  }
}
