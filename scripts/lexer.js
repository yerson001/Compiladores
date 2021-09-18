/**********************
 *       LEXER        
 **********************/

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
  currentToken = ' ';
  currentToken = getNextToken();
  console.log("current->ttpe: "+currentToken.Token);
  console.log("current->token: "+peekAtToken(0).Token);
  console.log("current->token: "+currentToken.Type);
  checkToken(currentToken.Type);
 //   console.log(tokens[0].Token +" -> "+tokens[0].Type);
//   console.log("next->"+getNextToken().Type);
//   console.log("peek->"+peekAtToken(3).Token);
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
//   print("NoWhiteSpacce -> " + sourceCodeNoWhiteSpace);
  // console -> show
//   console.log(sourceCode);
  //return->
//   tokens = tokenSorter();
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

  //Iterates through the array and specifies the token and the type in a token object and the replaces the token array with token objects
  for (currtoken = 0; currtoken < tokenArray.length; currtoken++){
    var newtoken = new TokenObject();
    newtoken.Token = tokenArray[currtoken];
    newtoken.Type = tipo_token(currtoken);
    sortedTokenArray[currtoken] = newtoken;
//     print(newtoken.Token + " -> " + newtoken.Type);
  }
//   console.log("end-token-sorted");
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
    tokenArray[i] == "y" || tokenArray[i] == "z" )
    {
      return "char";
    }

  if(tokenArray[i] == "+" || tokenArray[i] == "-"){
    return "op";
    }

  if(tokenArray[i] == "P"){
    return "P";
    }

  if(tokenArray[i] == "("){
    return "leftParen";
    }

  if(tokenArray[i] == ")"){
    return "rightParen";
    }


  if(tokenArray[i] == "{"){
    return "leftCurlyBracket";
    }

  if(tokenArray[i] == "}"){
    return "rightCurlyBracket";
    }

  if(tokenArray[i] == "="){
    return "assign";
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
  currentToken = getNextToken();
  
  lexicalProgram();
}


//*********************
function lexicalProgram(){
  parseStatement();
}


/*******************
 *   CHECK->TOKEN
 *******************/
function checkToken(expectedKind){
  //Check to valiudate that we have the expected type of token	
  switch(expectedKind){
    case "digit" : print("Expecting a digit");
      if(currentToken.Token == "0" || currentToken.Token == "1" || currentToken.Token == "2" || currentToken.Token == "3" ||
         currentToken.Token == "4" || currentToken.Token == "5" || currentToken.Token == "6" || currentToken.Token == "7" ||
         currentToken.Token == "8" || currentToken.Token == "9" )
      {
        print("Got a digit.");
      }
      else{
        errorCount++;
	print("Token is not a digit. \nError Position: " + tokenIndex + "." );
      }
      break;
 
    //For operations
    case "op" : print("Expecting an operator");
      if(currentToken.Token == "+" || currentToken.Token == "-" ){
	  print("Got an operator.");
      }
      else{
	  errorCount++;
	  print("Token is not an operator. \nError Position: " + tokenIndex + "." );
      }
      break;


    //For conditional operations
    case "condOp" : print("Expecting a conditional operator");
      if((currentToken.Token == "=" && peekAtToken(0).Token == "=" )){
	  currentToken = getNextToken();
	  print("Got a conditional operator.");
	}
      else{
	  errorCount++;
	  print("Token is not a conditional operator. \nError Position: " + tokenIndex + "." );
	}
      break;
 

    //For characters	
    case "char" : print("Expecting a character");
      if(currentToken.Token == "a" || currentToken.Token == "b" || currentToken.Token == "c" || currentToken.Token == "d" ||
	  currentToken.Token == "e" || currentToken.Token == "f" || currentToken.Token == "g" || currentToken.Token == "h" ||
	  currentToken.Token == "i" || currentToken.Token == "j" || currentToken.Token == "k" || currentToken.Token == "l" ||
	  currentToken.Token == "m" || currentToken.Token == "n" || currentToken.Token == "o" || currentToken.Token == "p" ||
	  currentToken.Token == "q" || currentToken.Token == "r" || currentToken.Token == "s" || currentToken.Token == "t" ||
	  currentToken.Token == "u" || currentToken.Token == "v" || currentToken.Token == "w" || currentToken.Token == "x" ||
	  currentToken.Token == "y" || currentToken.Token == "z" )
	{
	  print("Got a character.");
	}
	else{
          errorCount++;
	  print("Token is not a character. \nError Position: " + tokenIndex + "." );
	}
	break;
 
 
    //For ids
    case "id" : print("Expecting an ID");
      if(currentToken.Token == "a" || currentToken.Token == "b" || currentToken.Token == "c" || currentToken.Token == "d" ||
	 currentToken.Token == "e" || currentToken.Token == "f" || currentToken.Token == "g" || currentToken.Token == "h" ||
	 currentToken.Token == "i" || currentToken.Token == "j" || currentToken.Token == "k" || currentToken.Token == "l" ||
	 currentToken.Token == "m" || currentToken.Token == "n" || currentToken.Token == "o" || currentToken.Token == "p" ||
	 currentToken.Token == "q" || currentToken.Token == "r" || currentToken.Token == "s" || currentToken.Token == "t" ||
  	 currentToken.Token == "u" || currentToken.Token == "v" || currentToken.Token == "w" || currentToken.Token == "x" ||
	 currentToken.Token == "y" || currentToken.Token == "z" )
	{
	print("Got an ID.");
	}
      else{
        errorCount++;
	print("Token is not an ID. \nError Position: " + tokenIndex + "." );
      }
      break;
 
 
    //For print
    case "print" : print("Expecting a print");
      if(currentToken.Token == "p" && peekAtToken(0).Token == "r" && peekAtToken(1).Token == "i" && peekAtToken(2).Token == "n" && peekAtToken(3).Token == "t" ){
	  print("Got a print.");
	currentToken = getNextToken();
	currentToken = getNextToken();
	currentToken = getNextToken();
	currentToken = getNextToken();
	}
	else{
          errorCount++;
	  print("Character Sequence is not a print. \nError Position: " + tokenIndex + "." );
	}
	break;
    //For while
    case "while" : print("Expecting a while");
      if(currentToken.Token == "w" && peekAtToken(0).Token == "h" && peekAtToken(1).Token == "i" && peekAtToken(2).Token == "l" && peekAtToken(3).Token == "e" ){
	  print("Got a while.");
          currentToken = getNextToken();
	  currentToken = getNextToken();
	  currentToken = getNextToken();
	  currentToken = getNextToken();			    
      }
      else{
	  errorCount++;
	  print("Character Sequence is not a while. \nError Position: " + tokenIndex + "." );
	}
      break;



    //For if
    case "if" : print("Expecting an if");
      if(currentToken.Token == "i" && peekAtToken(0).Token == "f" ){
        print("Got an if.");
	currentToken = getNextToken();
      }
      else{
        errorCount++;
	print("Character Sequence is not an if. \nError Position: " + tokenIndex + "." );
	}
      break;
    //For left parenthesis
    case "leftParen" : print("Expecting a left parenthesis");
      if(currentToken.Token == "("){
	  print("Got a left parenthesis.");
	}
      else{
        errorCount++;
        print("Token is not a left parenthesis. \nError Position: " + tokenIndex + "." );
      }
      break;
    //For right parenthesis
    case "rightParen" : print("Expecting a right parenthesis");
      if(currentToken.Token == ")"){
	  print("Got a right parenthesis.");
	}
      else{
        errorCount++;
	print("Token is not a right parenthesis. \nError Position: " + tokenIndex + "." );
	}
	break;
    //For left curly bracket
    case "leftCurlyBracket" : print("Expecting a left curly bracket");
      if(currentToken.Token == "{"){
	  print("Got a left curly bracket.");
      }
      else{
	  errorCount++;
	  print("Token is not a left curly bracket. \nError Position: " + tokenIndex + "." );
	}
      break;
 
 
    //For right curly bracket
    case "rightCurlyBracket" : print("Expecting a right curly bracket");
      if(currentToken.Token == "}"){
	  print("Got a right curly bracket.");
      }
      else{
        errorCount++;
	print("Token is not a right curly bracket. \nError Position: " + tokenIndex + "." );
      }
      break;
 
 
    //For assignment operator
    case "assign" : print("Expecting an assignment operator.");
      if(currentToken.Token == "="){
        print("Got an assignment operator.");
      }
      else{
        errorCount++;
        print("Token is not an assignment operator. \nError Position: " + tokenIndex + "." );
      }
      break;
 
    //For quotation marks
    case "quote" : print("Expecting a quotation mark");
      if(currentToken.Token == "\""){
	  print("Got a quotation mark.");
      }
      else{
        errorCount++;
	print("Token is not a quotation mark. \nError Position: " + tokenIndex + "." );
      }
      break;

    //For space character
    case " " : print("Expecting a space character.");
      if(currentToken.Token == " "){
	  print("Got a space character.");
	}
      else{
        errorCount++;
        print("Token is not a space character. \nError Position: " + tokenIndex + "." );
      }
      break;
    }
  //After checking the current token, consume and asssigne the next token to the current token slot(variable)
  currentToken = getNextToken();
}
