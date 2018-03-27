<?php
$name = $company = $email = $message = $for = $headers = $mail = NULL;

if (isset ($_POST['submit'])) {

	//Obtenemos los valores input del form
	$name = $_POST['name'];
	$company = $_POST['company'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$for = 'alan.gutierrez@tribe.cx';

	//Creamos cabecera.
	$headers = 'From' . " " . $email . "\r\n";
	$headers .= "Content-type: text/html; charset=utf-8";

	//Cuerpo del correo
	$mail = "Detalles formulario de contacto Tribe: ";
	$mail .= "\r\n";
	$mail .= "Nombre: " . $name;
	$mail .= "\r\n";
	$mail .= "Compañía: " . $company;
	$mail .= "\r\n";
	$mail .= "Email: " . $email;
	$mail .= "\r\n";
	$mail .= "Mensaje: " . $message;
	$mail .= "\r\n";

	if (mail($for, $subject, $mail, $headers)) {
		echo "<script language='javascript'>
		        alert('Mensaje enviado.');
		      </script>";
	} else {
		echo "<script language='javascript'>
		        alert('Ha ocurrido un problema.');
		      </script>";
	}
}
?>
