# tpfinal
trabajo final curso NodeJS
                          ##################################################################
                          
Employee Wiki

Introducción
El ejercicio consiste en construir un sitio que sirva para encontrar información sobre los empleados de una empresa. Para esto debe contar con un administrador de contenidos, en el cual se puedan realizar las altas, bajas y modificaciones de empleados. Y por otro lado un portal público donde se pueda buscar y consultar información sobre los mismos.


Requerimientos
1. La aplicación debe ser construida utilizando Express y correr en el puerto 3200
2. La aplicación cuenta con una base de datos Mongo y se recomienda usar MongooseODM
3. Panel de ingreso al administrador (url: /admin)

![alt tag](http://i68.tinypic.com/25yyhqc.png)

3.1 Deberá dar acceso al sistema al usuario que presente las siguientes credenciales
	Email: admin@admin.com
	Password: 123456
3.2 Se recomienda usar Passport para construir la capa de autenticación
3.3 Una vez autenticado deberá redirigir a la url /panel, es necesario securizar todas las urls del panel para no permitir el acceso a terceros.


4. Alta de nuevos empleados (url: /panel/employees/new)



4.1 Consiste en un formulario, donde debe validarse el email ingresado y la selección de un password el cual deberá ser ingresado por duplicado en los últimos dos campos
4.2 Luego de haber insertado el nuevo empleado de forma correcta deberá redirigir a la url /panel/employees


5. Listado de empleados (url: /panel/employees)

5.1 Debera permitir la edición y el borrado usando las siguientes urls:

Edición
/panel/employees/edit/:id
Borrado
/panel/employees/delete/:id

6. Edición de empleados


6.1 A diferencia del formulario de inserción sólo deberá contar con 3 campos Nombre, Apellido y Email
6.2 Luego de haber editado los datos del empleado de forma correcta deberá redirigir a la url /panel/employees

7. Buscador


En el raiz del sitio debe existir un buscador, cuyo valor de entrada sea utilizado para encontrar los empleados por nombre y apellido, para esto se solicita:

7.1 Crear un Servicio AJAX que devuelva un JSON con los usuarios buscados (url: /employee/search/:keyword) Ejemplo de respuesta esperada (note que el campo password no es devuelto)

$ curl http://127.0.0.1:3200/employee/search/cr
[
  {
    "idEmployee": 2,
    "nombre": "Cristian",
    "apellido": "Cortez",
    "email": "cortez.cristian@gmail.com"
  },
  {
    "idEmployee": 3,
    "nombre": "John Cris",
    "apellido": "Doe",
    "email": "sample@sample.com"
  }
]

7.2 Implementar un typeahead que permita mostrar los resultados en pantalla


Opcional
1. Se podrá usar el siguiente framework para completar el ejercicio:
https://github.com/cortezcristian/anyandgo
2. Se valorará como puntos extra la inclusión de buenas prácticas como TDD, test suite, headless y la utilización de flash messages con express.

Material
1. Material de referencia
https://github.com/cortezcristian/express4crud
https://github.com/cortezcristian/express4passport-local


La modalidad de entrega es a través un repositorio git preferentemente en github, que deberá ser enviado a la siguiente dirección de correo: cortez.cristian@gmail.com, con el título: [Polo-Tecno] Curso NodeJS 2015: TP Final <Nombre del alumno>
