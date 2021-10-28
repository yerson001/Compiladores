var tokens = new Array();
var tokenIndex = 0;
var errorCount = 0;
var currentToken = "";
var EOF = new TokenObject();
    EOF.Token = "$";
    EOF.Type = "EOF";

/**************PARSERVARIBLES*****/
var START_SYMBOL = 'S';

var grammar = {
  1:'S->A',
  2:'A->EB',
  3:'A->ORJBU',
  4:'A->CZJBU',
  5:'A->YV=N;B',
  6:'E->W(N);',
  7:'W->L',
  8:'W->F',
  9:'W->R',
  10:'B->ε',
  11:'B->A',
  12:'L->l',
  13:'F->f',
  14:'O->o',
  15:'R->r',
  16:'N->n',
  17:'I->i',
  18:'C->c',
  19:'Y->y',
  20:'V->v',
  21:'R->(I:N)',
  22:'Z->(I==I)',
  23:'J->{',
  24:'U->}',
}



var token_traducer = new TokenObject();
// varible global para el code traducido
var traducerCode="";
/*****************
 *      MAIN
 ****************/
/*
La funcion init es la funcion principal que interactú con todos los demas
*/
function init(){
  print("..........start-traducir..........");
  //print(lex());
  tokens = tokenSorter();
  ListToken();
 //------parser--program

}

/*
Esta funcion toma la entrada del codigo y nos devuelve el codigo identificando
el tipo de caracter como char,int,op,(),{}
*/

function lex(){
  var sourceCode = document.getElementById("Main_Code").value;
  var inCharList = false;
  var inComment = false;
  var inComment2 = false;
  var firstQuote = 0;
  var sourceCodeNoWhiteSpace = new Array();
  souceCode = trim(sourceCode);

  for(var i=0; i<sourceCode.length; ++i){
    if(i==(sourceCode.length - 1)){
      firstQuote = sourceCode.length;
    }
   // sets flag when the lexer enters a character list
    if(sourceCode[i] == "\""){
      inCharList = true;
    }
    //sets flag when lexer enters a one-line commet
    if(sourceCode[i] == "/" && sourceCode[i+1] == "/"){
      inComment = true;
    }
    //sets flag when lexer enters a multi-line comment
    if(sourceCode[i]=="/" && sourceCode[i+1]=="*"){
      inComment2 = true;
    }

    //if IncharList flag is true, do not ignore white space
    while(inCharList == true){
      if(sourceCode[i] != "\n"){
        sourceCodeNoWhiteSpace += sourceCode[i];
      }
      i++;
      if(sourceCode[i] == "\""){
        inCharList = false;
      }
    }
    //IF the inComment (one-line comemnt) flag is true ignore everything on that line
    while(inComment == true){
      i+=1;
      if(sourceCode[i]=="\n"){
        inComment = false;
      }
    }
    //if the inComment2 (multi-line comment) is true ignore averything until the en of comment syntax
    while(inComment2==true){
      if(i==(sourceCode.length - 1)){
        break;
      }
      i+=1;
      if(sourceCode[i]=="*" && sourceCode[i+1] == "/"){
        i+=2;
        inComment2 = false;
      }
    }
    //ignore white space in every other situation
    if(sourceCode[i]!=" " && sourceCode[i]!="\n"){
      sourceCodeNoWhiteSpace += sourceCode[i];
    }
  }//end for
  // print -> output ->texarea
  return sourceCodeNoWhiteSpace;
}

/*
Esta funcion imprime un texto en la pantalla Output
*/
function print(msg){
  document.getElementById("Output").value +=msg +"\n"
}

/*********************************
 *          TOKEN OBJECT
 ********************************/
 /*Este es un objeto que contiene el tipo y el token de los caacteres*/
function TokenObject(){
  this.Token = "";
  this.Type = "";
}

/***************************
 *    SORTER FUNCTION
 ***************************/

//TOKEN SORTER FUNCTION - stes the token object type.
/*Esta funcion adjunta el caracter con el token*/
function tokenSorter(){
  tokenArray = lex();
  sortedTokenArray = new Array();
  typeArray = new Array();
  var currtoken = 0;
  for (currtoken = 0; currtoken < tokenArray.length; currtoken++){

    var newtoken = new TokenObject();
    newtoken.Token = tokenArray[currtoken];
    newtoken.Type = tipo_token(currtoken);

    //console.log( newtoken.Token + " --------->"+  newtoken.Type);

    sortedTokenArray[currtoken] = newtoken;

  }
  //var res = tipo_token(23);
  //console.log(res);
  return sortedTokenArray;
}


// DEVULEVE el tipo de cada token que necontremos
function tipo_token(i){
  if(tokenArray[i] == "0" || tokenArray[i] == "1" || tokenArray[i] == "2" || tokenArray[i] == "3" ||
    tokenArray[i] == "4" || tokenArray[i] == "5" || tokenArray[i] == "6" || tokenArray[i] == "7" ||
    tokenArray[i] == "8" || tokenArray[i] == "9" )
  {
    return "digit";
  }

  if(tokenArray[i] == "a" || tokenArray[i] == "b" || tokenArray[i] == "c" || tokenArray[i] == "d" ||
    tokenArray[i] == "e" || tokenArray[i] == "f" || tokenArray[i] == "g" || tokenArray[i] == "h" ||
    tokenArray[i] == "i" || tokenArray[i] == "j" || tokenArray[i] == "k" || tokenArray[i] == "l" ||
    tokenArray[i] == "m" || tokenArray[i] == "n" || tokenArray[i] == "o" || tokenArray[i] == "p" ||
    tokenArray[i] == "q" || tokenArray[i] == "r" || tokenArray[i] == "s" || tokenArray[i] == "t" ||
    tokenArray[i] == "u" || tokenArray[i] == "v" || tokenArray[i] == "w" || tokenArray[i] == "x" ||
    tokenArray[i] == "y" || tokenArray[i] == "z" || tokenArray[i] == "A" || tokenArray[i] == "B" ||
    tokenArray[i] == "C" || tokenArray[i] == "D" || tokenArray[i] == "E" || tokenArray[i] == "F" ||
    tokenArray[i] == "G" || tokenArray[i] == "H" || tokenArray[i] == "I" || tokenArray[i] == "J" ||
    tokenArray[i] == "K" || tokenArray[i] == "L" || tokenArray[i] == "M" || tokenArray[i] == "N" ||
    tokenArray[i] == "O" || tokenArray[i] == "P" || tokenArray[i] == "Q" || tokenArray[i] == "R" ||
    tokenArray[i] == "S" || tokenArray[i] == "T" || tokenArray[i] == "U" || tokenArray[i] == "V" ||
    tokenArray[i] == "W" || tokenArray[i] == "X" || tokenArray[i] == "Y" || tokenArray[i] == "Z" )
    {
      return "char";
    }

  if(tokenArray[i] == "+" || tokenArray[i] == "-"){
    return "op";
    }

  if(tokenArray[i]+tokenArray[i+1]+tokenArray[i+2] == "-90" || tokenArray[i]+tokenArray[i+1] == "90"){
    return "NUM";
    }

  if(tokenArray[i] == ";"){
    return "semicolon";
    }

  if(tokenArray[i] == "{"){
    return "leftCurlyBracket";
    }

  if(tokenArray[i] == "}"){
    return "rightCurlyBracket";
    }
  if(tokenArray[i] == "("){
    return "leftDelim";
    }

  if(tokenArray[i] == ")"){
    return "rightdelim";
    }

  if(tokenArray[i] == "="){
    return "assign";
    }
  if(tokenArray[i]+tokenArray[i+1] == "=="){
    return "assign2";
    }

  if(tokenArray[i] == "\""){
    return "quote";
  }

  if(tokenArray[i] == " "){
    return "space";
  }
  if(tokenArray[i] == ":"){
    return "points";
  }
  else{
    print("Error!! caracter no valido: " + tokenArray[i]);
  }
}

/********************
 *   GET->NEXTTOken
 *******************/
// Devuelve el objeto siguiente
function getNextToken(){
  var thisToken = EOF;
  if(tokenIndex < tokens.length){
    thisToken = tokens[tokenIndex];
//     console.log("current token: " + thisToken.Token);
  }
  tokenIndex++;
  return thisToken;
}

/**********************
 *    Peek->at->Token
 **********************/

function peekAtToken(peekNumber){
  var thatToken = EOF;
  if(tokenIndex < tokens.length){
    thatToken = tokens[tokenIndex+peekNumber];
  }
  return thatToken;
}

/********************
 *      produciones
 ********************/
 /**************
  *  se hace el analisis de la entrada
  *  consumiendo caacter a caaracter y fomar los token fianales
  * que al final lo devuelve en una arreglo
  * ************/
function finalTokens(){
  rpt = new Array();

  var endloop = tokens.length;
  var temp = "";
  var i = 0;
  var index = 0;

  function add(token,type,t_token){
    var newtoken = new TokenObject();
    newtoken.Token = token;
    newtoken.Type = type;
    rpt[index] = newtoken;

   var t_newtoken = new TokenObject();
   t_newtoken.Token = t_token;
   t_newtoken.Type = type;
   token_traducer[index] = t_newtoken;
   index++;
  }

  function BEGverEND(){
    console.log(getNextToken());
  }
 var linea = 0;


  function integer(){

  }
/*ciclo para el análisis de la entada
*/
  while(temp!="END" && tokens[i]){
    //BEGverEND();
    temp+=tokens[i].Token;
/******************************************
                DETECTAR  INT
 *****************************************/
    if(temp=="int"){
      console.log("detect-> int");
      temp = "";
      add("int","RESERVED","y");
      var secuense = "";
      var variable = "";
      var j=i+1;
      while(secuense!="="){
        secuense = tokens[j].Token;
        variable+=secuense;
        j++;
      }
      console.log("variable : "+variable.substring(0,variable.length-1));
      add(variable.substring(0,variable.length-1),"ID","v");
      var jump = variable.substring(0,variable.length-1).length;
      i+=jump;
    }
    /******************************************
                DETECTAR BEGIN
     *****************************************/
    else if(temp=="BEGIN"){
      linea+=1;
      console.log("detect-> BEGIN and linea = " + linea);
      temp = "";
      add("BEGIN","RESERVED","1");
    }
    /******************************************
                DETECTAR FORDWARE
     *****************************************/
    else if(temp == "fordware"){
      console.log("detect-> fordware");
      temp = "";
      add("fordware","RESERVED","f");
    }
    /******************************************
                     DETECTAR N-->90
    *****************************************/
    else if(temp == "90"){
      console.log("detect-> 90");
      temp = "";
      add("90","NUM","n");
    }
    /******************************************
                    DETECTAR N->-90
    *****************************************/
    else if(temp == "-90"){
      console.log("detect-> -90");
      temp = "";
      add("-90","NUM","n");
    }
    /****************************************
                  DETECTAR SUM  -> +
    *****************************************/
    else if(temp == "+"){
      console.log("detect-> SUM");
      temp = "";
      add("+","OP","+");
    }
     /****************************************
                      DETECTAR SUM  -> -
     *****************************************/
    else if(temp == "-"){
      console.log("detect-> RES");
      temp = "";
      add("-","OP","-");
    }
     /****************************************
                      DETECTAR  -> rigth
     *****************************************/
    else if(temp=="right"){
      console.log("detect-> rigth");
      temp = "";
      add("rigth","RESERVED","r");
    }
     /****************************************
                      DETECTAR   -> left
     *****************************************/
    else if(temp=="left"){
      console.log("detect-> left");
      temp = "";
      add("left","RESERVED","l");
    }
     /****************************************
                      DETECTAR SUM  -> FOR
     *****************************************/
    else if(temp=="FOR"){
      console.log("detect-> FOR");
      temp = "";
      add("FOR","RESERVED","o");

    }
   /*******************************************
                    DETECTAR PARENTESIS
   *******************************************/
    //_-----------PARENTESIS EN NUMERO --------------------
    else if(temp=="("){
      console.log("detect-> ( " + tokens[i-1].Token );
      temp = "";
      add("(","DELIM","(");
      // --------PRENTESIS EN FOR-----------
      if(tokens[i-1].Token=="R"){
        console.log("FOR--->detectado");
         var secuense = "";
        var numero = "";
        var j=i+1;
        while(secuense!=")"){
          //console.log(tokens[j].Token);
          secuense = tokens[j].Token;
          numero+=secuense;
          j++;
        }

      //*********DOS-PUNTOS-FOR**************
        if(numero.search(":")){
          var iterador = numero.substring(0,numero.search(":"));
          //console.log("ITERADOR_xxxxxxxxxxxxxxxx_____"+iterador);

        add(iterador,"ID","i");

        add(":","OP",":");

        var value =  numero.substring(numero.search(":")+1,numero.length-1);
        //console.log("avlirooooo__xxxxxxxxxxxxxxxxxxxx____"+value);
        add(value,"NUM","n");
        if(!isNaN(value)){
          console.log("IS number"+numero.substring(0,numero.length-1));
          //add(numero.substring(0,numero.length-1),"NUM");
        }else{
          print("Error!! Valor FOR no valido: " + numero.substring(0,numero.length-1));
          break;
      }
    }

        var jump = numero.substring(0,numero.length-1).length;
        i+=jump;
//**********************************
      }
      //----------------------delimitador------------------------
      else if(tokens[i-1].Token!="f" && tokens[i-1].Token!="R" && tokens[i-1].Token!="("){
        //console.log("_______________________________DIFEREBTE_________________"+tokens[i-1].Token);
        var secuense = "";
        var numero = "";
        var j=i+1;
        while(secuense!=")"){
          //console.log(tokens[j].Token);
          secuense = tokens[j].Token;
          numero+=secuense;
          j++;
        }

        console.log("número : "+numero.substring(0,numero.length-1));



        if(!isNaN(numero.substring(0,numero.length-1))){
          console.log("IS number"+numero.substring(0,numero.length-1));
          //add(numero.substring(0,numero.length-1),"NUM");
        }else{
          print("Error!! Valor Int no valido: " + numero.substring(0,numero.length-1));
          break;
        }
        if(numero.length!=0){
          add(numero.substring(0,numero.length-1),"NUM","n");
        }

        var jump = numero.substring(0,numero.length-1).length;
        i+=jump;

      }else{
      /**************************************
                  PARENTESIS IF
      **************************************/
        //----------------------prentesis del if (con una condicion)----------------------
        var secuense = "";
        var value = "";
        var j=i+1;
        while(secuense!=")"){
          secuense = tokens[j].Token;
          value+=secuense;
          j++;
        }
        var str = value.substring(0,value.length-1)+")";
        var n = str.search("==");
        var firtValue = str.substring(0,n);
        var secondValue = str.substring(n+2,str.length-1);
        add(firtValue,"ID","i");
        add("==","OP","==");
        console.log("this-> second value: "+IsNumber(secondValue));
        if(!isNaN(secondValue)){
          add(secondValue,"NUM","n");
        }else{
          add(secondValue,"ID","i");
        }
        i+=str.length-1;
      }
    }
    else if(temp==")"){
      console.log("detect-> )");
      temp = "";
      add(")","DELIM",")");
    }

    // ----------------------end numeros en parentesis----------------
    else if(temp=="{"){
      console.log("detect-> {");
      temp = "";
      add("{","DELIM","{");
    }
    else if(temp=="}"){
      console.log("detect-> }");
      temp = "";
       add("}","DELIM","}");
    }
    else if(temp=="if"){
      console.log("detect-> if");
      temp = "";
      add("if","RESERVED","c");

    }
    //-----------------------------------------------------------------
    else if(temp=="=="){
      console.log("detect-> ==");
      temp = "";
     add("==","OP","==");
    }
    else if(temp=="="){
      console.log("detect-> =");
      temp = "";
      add("=","OP","=");
      var secuense = "";
      var numero = "";
      var j=i+1;
      while(secuense!=";"){
        secuense = tokens[j].Token;
        numero+=secuense;
        j++;
      }
      console.log("numero : "+numero.substring(0,numero.length-1));

        if(!isNaN(numero.substring(0,numero.length-1))){
          console.log("IS number "+numero.substring(0,numero.length-1));
        }else{
          print("Error!! Valor Int no valido: " + numero.substring(0,numero.length-1));
        }

      add(numero.substring(0,numero.length-1),"NUM","n");
      var jump = numero.substring(0,numero.length-1).length;
      i+=jump;
    }
    else if(temp==";"){
      console.log("detect-> ;");
      temp = "";
       add(";","ENDLINE",";");
    }
    else if(temp=="END"){
      console.log("detect-> end");
      var newtoken = new TokenObject();
      newtoken.Token = "END";
      newtoken.Type = "RESERVED";
      rpt[index] = newtoken;
      print("SIN ERRORES");
    }
//     console.log(temp)
    i++;
  }
  return rpt;
}
/*
funcion pa verificar si es una variable de tipo estero o no
*/

function IsNumber(numero){
  if(Number.isInteger(numero)) {
    console.log('La variable es entera');
    return true;
  }
  return false;
}
/*
mostrar la lista de token que se obtuvieron
al ejecuta el programa
*/

function ListToken(){
  print("\n ListToken\n");
  ToKens = new Array();
  ToKens = finalTokens();
  for(var i=0; i<ToKens.length; ++i){
   console.log(i + " "+ToKens[i].Token+" -> "+ToKens[i].Type);
    print(i + " "+ToKens[i].Token+" -> "+ToKens[i].Type);
    traducerCode+=token_traducer[i].Token;
  }
  print("SourceCode: " + traducerCode);
  var text = traducerCode;
  startUp(grammar, text);
  traducerCode = "";
}



/****************************************************
**************      PARSER.JS     *******************
*****************************************************/

//INCLUDE a LEXER
//import{hello} from "./lexer.js";

//const Table = require('cli-table');
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
    console.log('Grammar:\n');
    print('Grammar:\n');
    for (var k in grammar) {
        console.log('  ', grammar[k]);
        print(" " + grammar[k]);
    }
    console.log('');
    print(" ");
}

function printSet(name, set) {
    console.log(name + ': \n');
    print(name + ": \n");
    for (var k in set) {
        console.log('  ', k, ':', Object.keys(set[k]));
        print(" "+ k + ":"+ Object.keys(set[k]));
    }
    console.log('');
    print('');
}



/*
var text = "f(n);r(n);l(n);yv=n;o(i:n){c(i==i){f(n);l(n);}}f(n);r(n);";

startUp(grammar, text);
*/

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
  solve(text);
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
          }
        }
      }
      if(action == "Accept!"){
        print("GRÁMATICA ACEPTADA");
        break;
      }
    } while (stack.length > 0);
    console.log((reg)?"Ans: Tiene algunos errores":"Ans: Accept!");
    print((reg)?"Ans: Tiene algunos errores":"Ans: Accept!");
}










