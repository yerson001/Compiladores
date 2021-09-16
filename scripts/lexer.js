/**********************
 *       LEXER        
 **********************/

var tokens = new Array();
tokens = "";

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
  //print("NoWhiteSpacce -> " + sourceCodeNoWhiteSpace);
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
    print(newtoken.Token + " -> " + newtoken.Type);
  }
  console.log("end-token-sorted");
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





