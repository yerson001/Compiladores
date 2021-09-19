var tokens = new Array();
var tokenIndex = 0;
var errorCount = 0;
var currentToken = "";
// tokens = "";
var EOF = new TokenObject();  //End of File Token Object
    EOF.Token = "$";
    EOF.Type = "EOF";

/*****************
 *      MAIN   
 ****************/

function init(){
  print("..........start..........");
  print(lex());
  tokens = tokenSorter();
  console.log(tokens.length);
 //   console.log(tokens[0].Token +" -> "+tokens[0].Type);
//   console.log("next->"+getNextToken().Type);
//   console.log("peek->"+peekAtToken(3).Token);

    //finalTokens();
    ListToken();
}

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

function print(msg){
  document.getElementById("Output").value +=msg +"\n"
}

/*********************************
 *          TOKEN OBJECT
 ********************************/
function TokenObject(){
  this.Token = "";
  this.Type = "";
}

/***************************
 *    SORTER FUNCTION 
 ***************************/

//TOKEN SORTER FUNCTION - stes the token object type.
function tokenSorter(){
  tokenArray = lex();
  sortedTokenArray = new Array();
  typeArray = new Array();
  var currtoken = 0;
  for (currtoken = 0; currtoken < tokenArray.length; currtoken++){

    var newtoken = new TokenObject();
    newtoken.Token = tokenArray[currtoken];
    newtoken.Type = tipo_token(currtoken);

    sortedTokenArray[currtoken] = newtoken;

  }
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
    tokenArray[i] == "y" || tokenArray[i] == "z" || tokenArray[i] == "F" || tokenArray[i] == "O" ||
    tokenArray[i] == "R")
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

  if(tokenArray[i] == "("){
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
}

/********************
 *   GET->NEXTTOken
 *******************/
// Devuelve el objeto
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
function finalTokens(){
  rpt = new Array();
  var endloop = tokens.length; 
  var temp = "";
  var i = 0;
  var index = 0;
      
  while(temp!="END"){

    temp+=tokens[i].Token;
    
    if(temp=="BEGIN"){
      console.log("detect-> BEGIN");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "BEGIN";
      newtoken.Type = "RESERVED";
      rpt[index] = newtoken;
      index++;
    }

    else if(temp == "fordware"){
      console.log("detect-> fordware");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "fordware";
      newtoken.Type = "RESERVED";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp == "90"){
      console.log("detect-> 90");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "90";
      newtoken.Type = "NUM";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp == "-90"){
      console.log("detect-> 90");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "-90";
      newtoken.Type = "NUM";
      rpt[index] = newtoken;
      index++;
    }

    else if(temp == "+"){
      console.log("detect-> SUM");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "+";
      newtoken.Type = "OP";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp == "-"){
      console.log("detect-> RES");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "-";
      newtoken.Type = "OP";
      rpt[index] = newtoken;
      index++;
    }


    else if(temp=="int"){
      console.log("detect-> int");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "int";
      newtoken.Type = "RESERVED";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="right"){
      console.log("detect-> rigth");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "rigth";
      newtoken.Type = "RESERVED";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="left"){
      console.log("detect-> left");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "left";
      newtoken.Type = "RESERVED";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="FOR"){
      console.log("detect-> FOR");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "FOR";
      newtoken.Type = "RESERVED";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="("){
      console.log("detect-> (");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "(";
      newtoken.Type = "DELIM";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp==")"){
      console.log("detect-> )");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = ")";
      newtoken.Type = "DELIM";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="{"){
      console.log("detect-> {");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "{";
      newtoken.Type = "DELIM";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="}"){
      console.log("detect-> }");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "}";
      newtoken.Type = "DELIM";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="if"){
      console.log("detect-> if");
      temp = "";
       var newtoken = new TokenObject();
      newtoken.Token = "if";
      newtoken.Type = "RESERVED";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="=="){
      console.log("detect-> ==");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "==";
      newtoken.Type = "OP";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="="){
      console.log("detect-> =");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = "=";
      newtoken.Type = "OP";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp==";"){
      console.log("detect-> ;");
      temp = "";
      var newtoken = new TokenObject();
      newtoken.Token = ";";
      newtoken.Type = "ENDLINE";
      rpt[index] = newtoken;
      index++;
    }
    else if(temp=="END"){
      console.log("detect-> end");
      var newtoken = new TokenObject();
      newtoken.Token = "END";
      newtoken.Type = "RESERVED";
      rpt[index] = newtoken;
    }
    i++;
  }

/*
BEGIN
fordware();
right();
left();
int ==
FOR(){
}
if(){
}
=
END
*/
  console.log("index "+index);
  console.log("rpt "+rpt.length);
  return rpt; 
}

//fordware
function ListToken(){
  ToKens = new Array();
  ToKens = finalTokens();
  for(var i=0; i<ToKens.length; ++i){
    print(i + " "+ToKens[i].Token+" -> "+ToKens[i].Type);
  }
}

