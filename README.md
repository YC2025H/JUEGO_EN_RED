<p align="center">
  <img src="/public/assets/img/LOGOTYPE/logotype.png" alt="Logotipo de Empresa" width="400">
</p>


# JUEGO_EN_RED


# KIKO Y KIKA


**Juegos en Red · Grado en Diseño y Desarrollo de Videojuegos · URJC · Curso 2026/27**<br>
**Grupo C**


## Descripción de la temática


Kiko y Kika es un juego colaborativo de plataformas en 2D que trata sobre dos ratas cocineras que se ayudan mutuamente para llegar a los diferentes ingredientes que les hacen falta para superar el nivel hasta la meta.


## Equipo de desarrollo


| Nombre y apellidos | Correo URJC | GitHub |
| :--- | :--- | :--- |
| Yi Chen | y.chen2.2024@alumnos.urjc.es | `YC2025H` |
| Sofía García de Vinuesa Castaño | s.garciaca.2024@alumnos.urjc.es | `estrellavinuesa` |
| Luisa Baeza Rodríguez | l.baeza.2024@alumnos.urjc.es | `Luluss2` |
| Mireya Vargas Sánchez | m.vargas.2024@alumnos.urjc.es | `MireyaaVargas.com` |


**Repositorio:** `https://github.com/YC2025H/JUEGO_EN_RED.git`


**Licencia:** [Apache 2.0](LICENSE)


---


## Game Design Document


📄 El documento de diseño completo está en **[GDD.md](GDD.md)**.


Apartados principales:


- [Introducción](GDD.md#1-introducción)
- [Especificaciones básicas](GDD.md#2-especificaciones-básicas)
- [Mecánicas](GDD.md#3-mecánicas)
- [Narrativa](GDD.md#4-narrativa)
- [Sonido](GDD.md#5-sonido)
- [Interfaz y diagrama de flujo](GDD.md#6-interfaz-y-diagrama-de-flujo)
- [Comunicación y marketing](GDD.md#7-comunicación-y-marketing)
- [Referencias](GDD.md#8-referencias)


---


## Fases del proyecto


| Fase | Contenido | Estado |
| :--- | :--- | :--- |
| Fase 1 | Equipo, temática y GDD | ✅ Entregada (tag `fase-1`) |
| Fase 2 | Juego en local | ✅ Entregada (tag `fase-2`)|
| Fase 3 | API REST | ⏳ Pendiente |
| Fase 4 | WebSockets | ⏳ Pendiente |


### Fase 2: 
Pequeño resumen de lo realizado en esta fase

### Menú principal


Se ha hecho un menú principal con tres botones, uno para iniciar el juego, el de los créditos y el botón de opciones.
En cuanto a la ayuda/tutorial se han añadido varias escenas tras darle a jugar, donde se narra un poco la historia del juego además de indicar los controles de cada personaje.


### Mecánicas de juego


En cuanto a las mecánicas, los personajes se mueven con AWD y las flechas según lo dicho en el gdd. A parte, siguiendo el gdd se ha añadido una olla final para finalizar el juego, los dos personajes tendrán que llegar y estar juntos para terminarlo. Y para perder el nivel, tienen un temporizador de 50 segundos.


### Sistema de escenas


Hemos implementado diez escenas para poder llevar a cabo el juego con todas las funcionalidades necesarias.


### Gestión de recursos


En cuanto al apartado audiovisual, se ha creado una clase AssetsPreloader.js para poder insertar en el juego todas las imágenes, audios y tipografías necesarias.


### Interfaz de usuario


En cuanto a nuestras interfaces, la mayoría de botones al pasar el ratón se hacen más grandes para visualizar mejor el botón dado. Además de usar una tipografía comprensible al igual que un buen tamaño de texto.


### Sistema de controles


En cuanto a los controles, el movimiento de los personajes se hace con teclado y los demás botones se clican con el ratón.


### Sistema de puntuación


La puntuación obtenida es en función del tiempo restante, puesto que el tiempo multiplicado por 100.
