<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = strip_tags(trim($_POST["name"]));
	$name = str_replace(array("\r","\n"),array(" "," "),$name);
	$company = trim($_POST["company"]);
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	$message = trim($_POST["message"]);

	if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
		http_response_code(400);
		echo "Lo sentimos, ha ocurido un error. Por favor intenta nuevamente.";
		exit;
	}

	$recipient = "alan.gutierrez@tribe.cx";

	$subject = "Alguien intenta contactarte en Tribe.cx";

	$email_content = "Nombre: $name\n";
	$email_content .= "Empresa: $company\n\n";
	$email_content .= "Email: $email\n\n";
	$email_content .= "Mensaje:\n$message\n";

	$email_headers = "De: $name <$email>";

	if (mail($recipient, $subject, $email_content, $email_headers)) {
		http_response_code(200);
		echo "¡Gracias! El equipo de Tribe te contactará pronto.";
	} else {
		http_response_code(500);
		echo "Lo sentimos, ha ocurido un error. Por favor intenta nuevamente.";
	}

} else {
	http_response_code(403);
	echo "Lo sentimos, ha ocurido un error. Por favor intenta nuevamente.";
}
?>
