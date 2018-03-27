<?php  
$nombre = $company = $email = $mensaje = $para = $headers = $msjCorreo = NULL;

if (isset ($_POST['submit'])) {

	//Obtenemos los valores input del form
	$nombre = $_POST['name'];
	$company = $_POST['company'];
	$email = $_POST['email'];
	$mensaje = $_POST['message'];
	$para = 'jdiaz4@ucol.mx';

	//Creamos cabecera.
    $headers = 'From' . " " . $email . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8";

    //Cuerpo del correo
    $msjCorreo = "Detalles formulario de contacto Tribe: ";
    $msjCorreo .= "\r\n";
    $msjCorreo .= "Nombre: " . $nombre;
    $msjCorreo .= "\r\n";
    $msjCorreo .= "Compañía: " . $company;
    $msjCorreo .= "\r\n";
	$msjCorreo .= "Email: " . $email;
    $msjCorreo .= "\r\n";
    $msjCorreo .= "Mensaje: " . $mensaje;
    $msjCorreo .= "\r\n";

    if (mail($para, $subject, $msjCorreo, $headers)) {
         echo "<script language='javascript'>
            alert('Mensaje enviado, muchas gracias.');
         </script>";
    } else {
         echo "<script language='javascript'>
            alert('fallado');
         </script>";
    }
}
?>