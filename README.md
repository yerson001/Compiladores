# Analizador Léxico

![imh](https://github.com/yerson001/Compiladores/blob/main/img/Selecci%C3%B3n_003.png)

## Click aqui [DEMO](https://yerson001.github.io/Compiladores/index.html) 

## Click aqui [DOCUMENTO](https://docs.google.com/document/d/1EuZJ3zqq2_AnlcOfuZDhbMw45RhlynwMO6vKFlFqOqc/edit?usp=sharing)
## programa sin errores
~~~
BEGIN
fordware(10);
right(90);
left(90);
int d = 0; 
FOR(i:5){
  if(d==i){
    fordware(5);
    left(90);
 }
}
fordware(3);
right(90);
END
~~~

## programa con errores
### Si no corrige los errores, el pograma no podrá continuar
~~~
BEGIN#
fordware(1r);
right(90);
left(92g);
int d = 0; 
FOR(i:ty){
  if(d==i){
    fordware(5);
    left(90);
 }
}
fordware(3);
right(90);
END
~~~
