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
    1: 'S->A',
    2: 'A->EB',
    3: 'A->ORJBU',
    4: 'A->CZQBX',
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
    25: 'Q->[',
    26: 'X->]',
}



var token_traducer = new TokenObject();
// varible global para el code traducido
var traducerCode = "";
var FinalInput = "";
/*****************
 *      MAIN
 ****************/
/*
La funcion init es la funcion principal que interactú con todos los demas
*/
function init() {
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

function lex() {
    var sourceCode = document.getElementById("Main_Code").value;
    var inCharList = false;
    var inComment = false;
    var inComment2 = false;
    var firstQuote = 0;
    var sourceCodeNoWhiteSpace = new Array();
    souceCode = trim(sourceCode);

    for (var i = 0; i < sourceCode.length; ++i) {
        if (i == (sourceCode.length - 1)) {
            firstQuote = sourceCode.length;
        }
        // sets flag when the lexer enters a character list
        if (sourceCode[i] == "\"") {
            inCharList = true;
        }
        //sets flag when lexer enters a one-line commet
        if (sourceCode[i] == "/" && sourceCode[i + 1] == "/") {
            inComment = true;
        }
        //sets flag when lexer enters a multi-line comment
        if (sourceCode[i] == "/" && sourceCode[i + 1] == "*") {
            inComment2 = true;
        }

        //if IncharList flag is true, do not ignore white space
        while (inCharList == true) {
            if (sourceCode[i] != "\n") {
                sourceCodeNoWhiteSpace += sourceCode[i];
            }
            i++;
            if (sourceCode[i] == "\"") {
                inCharList = false;
            }
        }
        //IF the inComment (one-line comemnt) flag is true ignore everything on that line
        while (inComment == true) {
            i += 1;
            if (sourceCode[i] == "\n") {
                inComment = false;
            }
        }
        //if the inComment2 (multi-line comment) is true ignore averything until the en of comment syntax
        while (inComment2 == true) {
            if (i == (sourceCode.length - 1)) {
                break;
            }
            i += 1;
            if (sourceCode[i] == "*" && sourceCode[i + 1] == "/") {
                i += 2;
                inComment2 = false;
            }
        }
        //ignore white space in every other situation
        if (sourceCode[i] != " " && sourceCode[i] != "\n") {
            sourceCodeNoWhiteSpace += sourceCode[i];
        }
    } //end for
    // print -> output ->texarea
    return sourceCodeNoWhiteSpace;
}

/*
Esta funcion imprime un texto en la pantalla Output
*/
function print(msg) {
    document.getElementById("Output").value += msg + "\n"
}

/*********************************
 *          TOKEN OBJECT
 ********************************/
/*Este es un objeto que contiene el tipo y el token de los caacteres*/
function TokenObject() {
    this.Token = "";
    this.Type = "";
}

/***************************
 *    SORTER FUNCTION
 ***************************/

//TOKEN SORTER FUNCTION - stes the token object type.
/*Esta funcion adjunta el caracter con el token*/
function tokenSorter() {
    tokenArray = lex();
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


// DEVULEVE el tipo de cada token que necontremos
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

    if (tokenArray[i] == "[") {
        return "leftCurlyBracket";
    }

    if (tokenArray[i] == "]") {
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
    } else {
        print("Error!! caracter no valido: " + tokenArray[i]);
    }
}

/********************
 *   GET->NEXTTOken
 *******************/
// Devuelve el objeto siguiente
function getNextToken() {
    var thisToken = EOF;
    if (tokenIndex < tokens.length) {
        thisToken = tokens[tokenIndex];
        //     console.log("current token: " + thisToken.Token);
    }
    tokenIndex++;
    return thisToken;
}

/**********************
 *    Peek->at->Token
 **********************/

function peekAtToken(peekNumber) {
    var thatToken = EOF;
    if (tokenIndex < tokens.length) {
        thatToken = tokens[tokenIndex + peekNumber];
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
        } else if (temp == ")") {
            //console.log("detect-> )");
            temp = "";
            add(")", "DELIM", ")");
        }

        // ----------------------end numeros en parentesis----------------
        else if (temp == "{") {
            //console.log("detect-> {");
            temp = "";
            add("{", "DELIM", "{");
        } else if (temp == "}") {
            //console.log("detect-> }");
            temp = "";
            add("}", "DELIM", "}");
        }

        //******************************************* */
        else if (temp == "[") {
            //console.log("detect-> {");
            temp = "";
            add("[", "DELIM", "[");
        } else if (temp == "]") {
            //console.log("detect-> }");
            temp = "";
            add("]", "DELIM", "]");
        }
        //************************************************ */
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
        } else if (temp == "=") {
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
        } else if (temp == ";") {
            // console.log("detect-> ;");
            temp = "";
            add(";", "ENDLINE", ";");
        } else if (temp == "END") {
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
/*
funcion pa verificar si es una variable de tipo estero o no
*/

function IsNumber(numero) {
    if (Number.isInteger(numero)) {
        //console.log('La variable es entera');
        return true;
    }
    return false;
}
/*
mostrar la lista de token que se obtuvieron
al ejecuta el programa
*/
/****************************************************************
 * pass my source code to traduce a real instruction
 * 
 * *************************************************************/
function ListToken() {
  var FinalInput = "";
    print("\n ListToken\n");
    ToKens = new Array();
    ToKens = finalTokens();
    var compiler = "";

    for (var m = 0; m < ToKens.length; m++) {traducerCode += token_traducer[m].Token;}
    /*if(startUp(grammar, text)){
      console.log("NICE----JOB");
    }*/

    for (var i = 0; i < ToKens.length; i++) {
        console.log(i + " -> " + ToKens[i].Token + " -> " + ToKens[i].Type);
        //console.log(i + "t " + token_traducer[i].Token + " -> " + token_traducer[i].Type);
        //print(i + " " + ToKens[i].Token + " -> " + ToKens[i].Type);
        //traducerCode += token_traducer[i].Token;

        if (token_traducer[i].Type == 'RESERVED' &&
            (token_traducer[i].Token == 'f' ||
                token_traducer[i].Token == 'l' ||
                token_traducer[i].Token == 'r')) {
            //console.log("TYPE->value "+  token_traducer[i].Token+ToKens[i+2].Token);
            move_(token_traducer[i].Token, ToKens[i + 2].Token);
        }
        if (ToKens[i].Type == 'RESERVED' && ToKens[i].Token == 'FOR') {
            console.log("ESTE ES EL VALOR DE I::::::", i)
            console.log("TYPE->value " + ToKens[i].Token + " it->" + ToKens[i + 2].Token + " n->" + ToKens[i + 4].Token);
            var startfor = i + 6;
            console.log("INICIO FOR: ", startfor);
            var my_code = string_code();


            var startif = my_code.indexOf("c");
            var endif = my_code.indexOf("]");
            var igual_igual = my_code.indexOf("==");

            console.log("IF POSOTION: " + startif + " " + endif + "== " + igual_igual);

            var contif = endif - startif;
            /*
                        if (startif != -1) {
                            console.log("HAY UN IF EN EL CODIGO:: ", startif);
                        } else {*/
            var endfor = my_code.indexOf("}");
            console.log("CONDIGO FUENTE: ", my_code);
            console.log("FINAL FOR: ", endfor);
            console.log("CONTENIDOFOR: ", my_code.substring(startfor, endfor));
            console.log("CONTENIDO_IF: ", my_code.substring(startif, endif));

            for (var k = 0; k < ToKens[i + 4].Token; k++) {
                for (var f = startfor + 1; f < endfor - 1; f++) {

                    if (ToKens[igual_igual + 1].Token == k) {
                        console.log("CREO QUE ES EL IF", token_traducer[f].Token + ToKens[f + 1].Token + token_traducer[f + 2].Token + ToKens[f + 3].Token + token_traducer[f + 4].Token + ToKens[f + 5].Token);
                        console.log("************************************************");
                        for (var q = startif; q < endif - 1; q++) {
                            //console.log(token_traducer[q].Token, ToKens[q + 2].Token);
                            move_(token_traducer[q].Token, ToKens[q + 2].Token);
                        }
                        f += contif;
                    }
                    move_(token_traducer[f].Token, ToKens[f + 2].Token);
                    console.log(f + " EN EL FOR-:: " + ToKens[f].Token + " -> " + ToKens[f].Type);
                    //console.log(token_traducer[f].Token, ToKens[f + 2].Token);

                    f += contif;
                }
            }
            //}
            i += endfor - startfor + 1;
            console.log("END FOR:-> ", i);
            console.log("END token lenght:-> ", ToKens.length);
        }

    }
    print("SourceCode->: " + traducerCode);
    var text = traducerCode;
    document.getElementById('plane').innerHTML = FinalInput;
    //document.getElementById('plane2').innerHTML = FinalInput;
    document.getElementById('msg').innerHTML = text;
    console.log("[[[[[[[  "+text+" ]]]]]]]]]");
    console.log(startUp(grammar, text));
    traducerCode = "";
    console.log("FINALINPUT-> ", FinalInput);
}

function string_code() {
    var str = "";
    var secuense = "";
    for (var i = 0; i < ToKens.length; ++i) {
        str += token_traducer[i].Token;
    }
    //console.log("THIS IS INTO: ", str);
    return str;
}

function move_(str, num) {
    console.log("move argument: " + str + " " + num, " ");
    //if (it == 0) {
    if (str == 'f') {
        for (var i = 0; i < num; i++) { FinalInput += str; }
    }
    if (str == 'r' || str == 'l') {
        for (var i = 0; i < num / 30; i++) { FinalInput += str; }
    }
    return FinalInput;
}
/**************************************************************
 * TRADUCE CODE  -> to compile
 ****************************************************************/
/****************************************************
 *******************  my_tree ************************
 *****************************************************/




function Node(data) {
    this.data = data;
    this.children = [];
}

class Tree {
    constructor() {
        this.root = null;
    }

    add(data, toNodeData) {
        const node = new Node(data);
        const parent = toNodeData ? this.findBFS(toNodeData) : null;
        if (parent) {
            parent.children.push(node)
        } else {
            if (!this.root)
                this.root = node;
            else
                return "nodo existe"
        }
    }

    findBFS(data) {
        const queue = [this.root];
        let _node = null;
        this.traverseBFS((node) => {
            if (node.data === data) {
                _node = node;
            }
        })

        return _node;
    }

    traverseBFS(cb) {
        const queue = [this.root];

        if (cb)
            while (queue.length) {
                const node = queue.shift();
                cb(node)
                for (const child of node.children) {
                    queue.push(child);
                }
            }
    }

    _preOrder(node, fn) {
        if (node) {
            if (fn) {
                fn(node);
            }
            for (let i = 0; i < node.children.length; i++) {
                this._preOrder(node.children[i], fn);
            }
        }
    }
    traverseDFS(fn, method) {
        const current = this.root;
        if (method) {
            this[`_${method}`](current, fn);
        } else {
            this._preOrder(current, fn);
        }
    }



}
let tree = new Tree()


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
    console.log('Gramatica:\n');
    print('Gramatica:\n');
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
        print(" " + k + ":" + Object.keys(set[k]));
    }
    console.log('');
    print('');
}



/*
var text = "f(n);r(n);l(n);yv=n;o(i:n){c(i==i){f(n);l(n);}}f(n);r(n);";
startUp(grammar, text);
*/

var parserTable;

/*************************************
 *           PRINT-->ELEMTS
 ***********************************/
function startUp(grammar, text) {
    //printGrammar(grammar);
    buildFirstSets(grammar);
    buildFollowSets(grammar);
    //printSet('Conjunto Primeros', firstSets);
    //printSet('Conjunto Segundos', followSets);
    buildNonTerminals(grammar);
    buildTerminals(grammar);
    parserTable = buildParserTable(grammar);
    return solve(text);
    //tree.traverseBFS((node) => { console.log(node) })

}

function buildNonTerminals(grammar) {
    for (var k in grammar) {
        let temp = getLHS(grammar[k]);
        if (nonTerminals.indexOf(temp) == -1) {
            nonTerminals.push(temp);
        }
    }
    //console.log("No Terminales: " + nonTerminals);
}

function buildTerminals(grammar) {
    for (var k in grammar) {
        let temp = getRHS(grammar[k]);
        for (var i = 0; i < temp.length; i++) {
            if (nonTerminals.indexOf(temp[i]) == -1 && terminals.indexOf(temp[i]) == -1) {
                terminals.push(temp[i]);
            }
        }
    }
    //console.log("Terminales: " + terminals);
}

function buildParserTable(grammar) {
    let ptable = {};

    for (var k in grammar) {
        var itRHS = getRHS(grammar[k]);
        var itLHS = getLHS(grammar[k]);
        if (itRHS != EPSILON) {
            let tempTerminals = firstSets[itRHS[0]];
            for (termTemp in tempTerminals) {
                ptable[itLHS] = ptable[itLHS] || {};
                ptable[itLHS][termTemp] = k;
            }
        } else {
            let tempTerminals = followSets[itLHS];
            for (termTemp in tempTerminals) {
                ptable[itLHS] = ptable[itLHS] || {};
                ptable[itLHS][termTemp] = k;
            }
        }
    }
    return ptable;
}

function solve(input) {
    let log = [],
        reg = 0;
    let consumedInput = "",
        remainInput = input + "$";
    let stack = ['$'];
    let action = "nothing!";
    stack.push(START_SYMBOL);

    var root = stack[stack.length - 1];
    //console.log("INICIAL-->" + root);
    tree.add(root);
    do {
        let top = stack[stack.length - 1];
        if (stack.length == 1 && remainInput == "$")
            action = "Accept!";

        else if (isTerminal(top) && action != EPSILON) {
            action = "Matched!";
            stack.pop();
            consumedInput += remainInput.slice(0, 1);
            remainInput = remainInput.slice(1);
        } else if (top == EPSILON)
            stack.pop();
        else {
            let num = parserTable[top][remainInput[0]];
            if (!num) {
                stack.pop();
                reg = 1;
            } else {
                action = getRHS(grammar[num]);
                if (top != remainInput[0]) {
                    stack.pop();
                    action.split('').reverse().map((t) => { stack.push(t) });
                    //_______________________TREE:_______________________
                    //console.log("stack: ", stack);
                    //console.log("Action: " + action + " size: " + action.length + " <--- Top: " + top);
                    for (var i = 0; i < action.length; i++) {
                        tree.add(action[i], top);
                        //console.log("FOR: " + action[i] + " <--- Top: " + top);
                    }
                }
            }
        }
        if (action == "Accept!") {
            print("GRÁMATICA ACEPTADA");
            return true;
            break;
        }
    } while (stack.length > 0);
    console.log((reg) ? "Ans: Tiene algunos errores" : "Ans: Accept!");
    print((reg) ? "Ans: Tiene algunos errores" : "Ans: Accept!");
    /*console.log("-----------BFS---------");
  tree.traverseBFS(node => { console.log(node.data); });
  console.log("-----------DFS----------");
  tree.traverseDFS(node => { console.log(node.data); });
*/
}


/**************************************************
 * ******************************GAME**************
 */
var myGamePiece;
let walls = [];
var trofeo1;
var trofeo2;
var trofeo3;
var trofeo4;

function letsGo(img, posx, posy, n, p) {
    var it = 0;
    var sum = 20;
    for (var i = 0; i < n; i++) {
        if (p == "v") {
            elen = new component(30 + sum, 30 + sum, "scripts/" + img, posx, posy + it, "image");
        } else {
            elen = new component(30 + sum, 30 + sum, "scripts/" + img, posx + it, posy, "image");
        }
        walls.push(elen);
        it += 50;
    }
}

function startGame() {
    myGamePiece = new component(35, 40, "red", 75, 70, );

    trofeo1 = new component(35, 40, "purple", 275, 73, );
    trofeo2 = new component(40, 40, "yellow",126,226, );
    trofeo3 = new component(40, 40, "orange", 478,175, );
    trofeo4 = new component(40, 40, "blue", 780,322, );

    myGamePiece.moveAngle = 90;

    letsGo("two.png", 0, 0, 9, "v"); //el de abajo pero izquierda
    letsGo("two.png", 1050, 0, 9, "v"); //el derecha abajo
    letsGo("two.png", 0, 0, 34, "h"); //primero horizontal
    letsGo("two.png", 0, 450, 34, "h"); //el de abajo
    // <----------------end walls complete ---------------->
    //letsGo("two.png",0,60,17,"h");

    
    letsGo("pasto.jpg", 50, 100, 3, "v");
    letsGo("pasto.jpg", 150, 100, 2, "v");
    letsGo("two.png", 200, 100, 2, "v");
    letsGo("pasto.jpg", 50, 250, 4, "h");
    letsGo("pasto.jpg", 150, 350, 2, "h");
    letsGo("pasto.jpg", 150, 400, 1, "h");
    letsGo("pasto.jpg", 300, 50, 15, "h");
    letsGo("pasto.jpg", 300, 100, 3, "h");
    letsGo("pasto.jpg", 600, 100, 7, "h");
    letsGo("pasto.jpg", 650, 150, 5, "h");
    letsGo("pasto.jpg", 700, 200, 3, "h");
    letsGo("pasto.jpg", 750, 250, 1, "h");
    letsGo("pasto.jpg", 300, 200, 4, "h");
    letsGo("pasto.jpg", 300, 250, 1, "h");
    letsGo("two.png", 300, 350, 4, "h");
    letsGo("pasto.jpg", 400, 300, 2, "h");
    letsGo("pasto.jpg", 550, 300, 3, "h");
    letsGo("pasto.jpg", 550, 250, 2, "h");
    letsGo("pasto.jpg", 550, 200, 1, "h");
    letsGo("pasto.jpg", 550, 400, 1, "h");
    letsGo("pasto.jpg", 650, 350, 1, "h");
    letsGo("pasto.jpg", 800, 400, 1, "h");
    letsGo("pasto.jpg", 750, 350, 5, "h");
    letsGo("pasto.jpg", 850, 300, 3, "h");
    letsGo("pasto.jpg", 900, 250, 2, "h");
    letsGo("pasto.jpg", 950, 200, 1, "h");

    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1100;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {

    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx = myGameArea.context;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            ctx.restore();
        }
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    myGamePiece.update();

    trofeo1.newPos();
    trofeo1.update();

    trofeo2.newPos();
    trofeo2.update();

    trofeo3.newPos();
    trofeo3.update();

    trofeo4.newPos();
    trofeo4.update();


    for (var i = 0; i < walls.length; i++) {
        walls[i].newPos();
        walls[i].update();
    }
    /*
    for (var i = 0; i < walls.length; i++) {
      if (myGamePiece.crashWith(walls[i])) {
        console.log("chocaste");
      }
    }*/
    if (myGamePiece.crashWith(trofeo1)){console.log("chocaste");
      trofeo1.speed = 3000;
    }
    if (myGamePiece.crashWith(trofeo2)){console.log("chocaste");
    trofeo2.speed = 3000;
  }
  if (myGamePiece.crashWith(trofeo3)){console.log("chocaste");
  trofeo3.speed = 3000;
}
if (myGamePiece.crashWith(trofeo4)){console.log("chocaste");
trofeo4.speed = 3000;
}

}
var index = 0;

function move(dir) {
    //msg = document.getElementById('msg').value;
    msg = FinalInput;
    console.log("EN MOVER--->MAIN ", msg);
    //myGamePiece.image.src = "scripts/two.png";
    //if (dir == "u" || msg[index] == "u") { myGamePiece.speedY = -5; }

    if (dir == "r" || msg[index] == "r") {
        myGamePiece.moveAngle = 30;
    }
    if (dir == "l" || msg[index] == "l") {
        myGamePiece.moveAngle = -30;
    }
    if (dir == "f" || msg[index] == "f") {
        myGamePiece.speed = 50;
    }
    if (dir == "b" || msg[index] == "b") {
        myGamePiece.speed = -50;
    }
    index += 1;
}

function clearmove() {
    //myGamePiece.image.src = "img/one.png";
    //myGamePiece.speed = 0;
    //myGamePiece.speed = 0;
}