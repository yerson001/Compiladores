function init() {
  //print("..........start-traducir..........");
    console.log("-------init-------");
  //print(lex());
  tokens = tokenSorter();
  ListToken();
  //------parser--program
}
var token_traducer = new TokenObject();
var traducerCode = "";

function tokenSorter() {
  tokenArray = "fordware(10);right(90);left(90);int d = 0;FOR(n:5){if(d==i){fordware(5);left(90);}}";
  sortedTokenArray = new Array();
  typeArray = new Array();
  var currtoken = 0;
  for (currtoken = 0; currtoken < tokenArray.length; currtoken++) {

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


function IsNumber(numero) {
  if (Number.isInteger(numero)) {
    //console.log('La variable es entera');
    return true;
  }
  return false;
}

function tipo_token(i) {
  if (tokenArray[i] == "0" || tokenArray[i] == "1" || tokenArray[i] == "2" || tokenArray[i] == "3" ||
    tokenArray[i] == "4" || tokenArray[i] == "5" || tokenArray[i] == "6" || tokenArray[i] == "7" ||
    tokenArray[i] == "8" || tokenArray[i] == "9") {
    return "digit";
  }

  if (tokenArray[i] == "a" || tokenArray[i] == "b" || tokenArray[i] == "c" || tokenArray[i] == "d" ||
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
    tokenArray[i] == "W" || tokenArray[i] == "X" || tokenArray[i] == "Y" || tokenArray[i] == "Z") {
    return "char";
  }

  if (tokenArray[i] == "+" || tokenArray[i] == "-") {
    return "op";
  }

  if (tokenArray[i] + tokenArray[i + 1] + tokenArray[i + 2] == "-90" || tokenArray[i] + tokenArray[i + 1] == "90") {
    return "NUM";
  }

  if (tokenArray[i] == ";") {
    return "semicolon";
  }

  if (tokenArray[i] == "{") {
    return "leftCurlyBracket";
  }

  if (tokenArray[i] == "}") {
    return "rightCurlyBracket";
  }
  if (tokenArray[i] == "(") {
    return "leftDelim";
  }

  if (tokenArray[i] == ")") {
    return "rightdelim";
  }

  if (tokenArray[i] == "=") {
    return "assign";
  }
  if (tokenArray[i] + tokenArray[i + 1] == "==") {
    return "assign2";
  }

  if (tokenArray[i] == "\"") {
    return "quote";
  }

  if (tokenArray[i] == " ") {
    return "space";
  }
  if (tokenArray[i] == ":") {
    return "points";
  }
  else {
    print("Error!! caracter no valido: " + tokenArray[i]);
  }
}

function TokenObject() {
  this.Token = "";
  this.Type = "";
}


function finalTokens() {
  rpt = new Array();

  var endloop = tokens.length;
  var temp = "";
  var i = 0;
  var index = 0;

  function add(token, type, t_token) {
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

  function BEGverEND() {
    console.log(getNextToken());
  }
  var linea = 0;



  /*ciclo para el análisis de la entada
  */
  while (temp != "END" && tokens[i]) {
    //BEGverEND();
    temp += tokens[i].Token;
    /******************************************
                    DETECTAR  INT
     *****************************************/
    if (temp == "int") {
      //console.log("detect-> int");
      temp = "";
      add("int", "RESERVED", "y");
      var secuense = "";
      var variable = "";
      var j = i + 1;
      while (secuense != "=") {
        secuense = tokens[j].Token;
        variable += secuense;
        j++;
      }
      //console.log("variable : " + variable.substring(0, variable.length - 1));
      add(variable.substring(0, variable.length - 1), "ID", "v");
      var jump = variable.substring(0, variable.length - 1).length;
      i += jump;
    }
    /******************************************
                DETECTAR BEGIN
     *****************************************/
    else if (temp == "BEGIN") {
      linea += 1;
      //console.log("detect-> BEGIN and linea = " + linea);
      temp = "";
      add("BEGIN", "RESERVED", "1");
    }
    /******************************************
                DETECTAR FORDWARE
     *****************************************/
    else if (temp == "fordware") {
      //console.log("detect-> fordware");
      temp = "";
      add("fordware", "RESERVED", "f");
    }
    /******************************************
                     DETECTAR N-->90
    *****************************************/
    else if (temp == "90") {
      //console.log("detect-> 90");
      temp = "";
      add("90", "NUM", "n");
    }
    /******************************************
                    DETECTAR N->-90
    *****************************************/
    else if (temp == "-90") {
      //console.log("detect-> -90");
      temp = "";
      add("-90", "NUM", "n");
    }
    /****************************************
                  DETECTAR SUM  -> +
    *****************************************/
    else if (temp == "+") {
      //console.log("detect-> SUM");
      temp = "";
      add("+", "OP", "+");
    }
    /****************************************
                     DETECTAR SUM  -> -
    *****************************************/
    else if (temp == "-") {
      //console.log("detect-> RES");
      temp = "";
      add("-", "OP", "-");
    }
    /****************************************
                     DETECTAR  -> rigth
    *****************************************/
    else if (temp == "right") {
      //console.log("detect-> rigth");
      temp = "";
      add("rigth", "RESERVED", "r");
    }
    /****************************************
                     DETECTAR   -> left
    *****************************************/
    else if (temp == "left") {
      //console.log("detect-> left");
      temp = "";
      add("left", "RESERVED", "l");
    }
    /****************************************
                     DETECTAR SUM  -> FOR
    *****************************************/
    else if (temp == "FOR") {
      //console.log("detect-> FOR");
      temp = "";
      add("FOR", "RESERVED", "o");

    }
    /*******************************************
                     DETECTAR PARENTESIS
    *******************************************/
    //_-----------PARENTESIS EN NUMERO --------------------
    else if (temp == "(") {
      //console.log("detect-> ( " + tokens[i - 1].Token);
      temp = "";
      add("(", "DELIM", "(");
      // --------PRENTESIS EN FOR-----------
      if (tokens[i - 1].Token == "R") {
        //console.log("FOR--->detectado");
        var secuense = "";
        var numero = "";
        var j = i + 1;
        while (secuense != ")") {
          //console.log(tokens[j].Token);
          secuense = tokens[j].Token;
          numero += secuense;
          j++;
        }

        //*********DOS-PUNTOS-FOR**************
        if (numero.search(":")) {
          var iterador = numero.substring(0, numero.search(":"));
          //console.log("ITERADOR_xxxxxxxxxxxxxxxx_____"+iterador);

          add(iterador, "ID", "i");

          add(":", "OP", ":");

          var value = numero.substring(numero.search(":") + 1, numero.length - 1);
          //console.log("avlirooooo__xxxxxxxxxxxxxxxxxxxx____"+value);
          add(value, "NUM", "n");
          if (!isNaN(value)) {
            //console.log("IS number" + numero.substring(0, numero.length - 1));
            //add(numero.substring(0,numero.length-1),"NUM");
          } else {
            print("Error!! Valor FOR no valido: " + numero.substring(0, numero.length - 1));
            break;
          }
        }

        var jump = numero.substring(0, numero.length - 1).length;
        i += jump;
        //**********************************
      }
      //----------------------delimitador------------------------
      else if (tokens[i - 1].Token != "f" && tokens[i - 1].Token != "R" && tokens[i - 1].Token != "(") {
        //console.log("_______________________________DIFEREBTE_________________"+tokens[i-1].Token);
        var secuense = "";
        var numero = "";
        var j = i + 1;
        while (secuense != ")") {
          //console.log(tokens[j].Token);
          secuense = tokens[j].Token;
          numero += secuense;
          j++;
        }

        //console.log("número : " + numero.substring(0, numero.length - 1));



        if (!isNaN(numero.substring(0, numero.length - 1))) {
          //console.log("IS number" + numero.substring(0, numero.length - 1));
          //add(numero.substring(0,numero.length-1),"NUM");
        } else {
          print("Error!! Valor Int no valido: " + numero.substring(0, numero.length - 1));
          break;
        }
        if (numero.length != 0) {
          add(numero.substring(0, numero.length - 1), "NUM", "n");
        }

        var jump = numero.substring(0, numero.length - 1).length;
        i += jump;

      } else {
        /**************************************
                    PARENTESIS IF
        **************************************/
        //----------------------prentesis del if (con una condicion)----------------------
        var secuense = "";
        var value = "";
        var j = i + 1;
        while (secuense != ")") {
          secuense = tokens[j].Token;
          value += secuense;
          j++;
        }
        var str = value.substring(0, value.length - 1) + ")";
        var n = str.search("==");
        var firtValue = str.substring(0, n);
        var secondValue = str.substring(n + 2, str.length - 1);
        add(firtValue, "ID", "i");
        add("==", "OP", "==");
        console.log("this-> second value: " + IsNumber(secondValue));
        if (!isNaN(secondValue)) {
          add(secondValue, "NUM", "n");
        } else {
          add(secondValue, "ID", "i");
        }
        i += str.length - 1;
      }
    }
    else if (temp == ")") {
      //console.log("detect-> )");
      temp = "";
      add(")", "DELIM", ")");
    }

    // ----------------------end numeros en parentesis----------------
    else if (temp == "{") {
      //console.log("detect-> {");
      temp = "";
      add("{", "DELIM", "{");
    }
    else if (temp == "}") {
      //console.log("detect-> }");
      temp = "";
      add("}", "DELIM", "}");
    }
    else if (temp == "if") {
      //console.log("detect-> if");
      temp = "";
      add("if", "RESERVED", "c");

    }
    //-----------------------------------------------------------------
    else if (temp == "==") {
      //console.log("detect-> ==");
      temp = "";
      add("==", "OP", "==");
    }
    else if (temp == "=") {
      //console.log("detect-> =");
      temp = "";
      add("=", "OP", "=");
      var secuense = "";
      var numero = "";
      var j = i + 1;
      while (secuense != ";") {
        secuense = tokens[j].Token;
        numero += secuense;
        j++;
      }
      //console.log("numero : " + numero.substring(0, numero.length - 1));

      if (!isNaN(numero.substring(0, numero.length - 1))) {
        //console.log("IS number " + numero.substring(0, numero.length - 1));
      } else {
        print("Error!! Valor Int no valido: " + numero.substring(0, numero.length - 1));
      }

      add(numero.substring(0, numero.length - 1), "NUM", "n");
      var jump = numero.substring(0, numero.length - 1).length;
      i += jump;
    }
    else if (temp == ";") {
     // console.log("detect-> ;");
      temp = "";
      add(";", "ENDLINE", ";");
    }
    else if (temp == "END") {
      //console.log("detect-> end");
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
function ListToken() {
//   print("\n ListToken\n");

  ToKens = new Array();
  ToKens = finalTokens();

  for (var i = 0; i < ToKens.length; ++i) {
//      console.log(i + " " + ToKens[i].Token + " -> " + ToKens[i].Type);
    //print(i + " " + ToKens[i].Token + " -> " + ToKens[i].Type);
    traducerCode += token_traducer[i].Token;

    if(token_traducer[i].Type=='RESERVED' && 
    ( token_traducer[i].Token=='f' || 
      token_traducer[i].Token=='l'||
      token_traducer[i].Token=='r' )){
      console.log("TYPE->value "+  token_traducer[i].Token+ToKens[i+2].Token);
    }
    if(ToKens[i].Type == 'RESERVED' &&
      ToKens[i].Token=='FOR' 
    ){
      console.log("TYPE->value "+  ToKens[i].Token+ToKens[i+2].Token + ToKens[i+4].Token);
    }
  }
//   print("SourceCode->: " + traducerCode);
  var text = traducerCode;
//   document.getElementById('plane').innerHTML = text;
//   document.getElementById('plane2').innerHTML = compiler;
//   document.getElementById('msg').innerHTML = text;
//   startUp(grammar, text);
//   traducer();
console.log(traducerCode);

  traducerCode = "";
}


function compile(str,num){
 console.log(str+" "+num);
}

init();
