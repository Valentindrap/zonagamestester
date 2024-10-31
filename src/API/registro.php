<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "base_zonagames"; 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$contrasena = $data['contrasena'];

// Asegurarse de que la contraseña esté segura
$hashedPassword = password_hash($contrasena, PASSWORD_DEFAULT);

// Preparar la consulta
$sql = "INSERT INTO usuarios (email, contrasena) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $hashedPassword);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Registro exitoso"]);
} else {
    echo json_encode(["mensaje" => "Error: " . $stmt->error]);
}

// Cerrar conexión
$stmt->close();
$conn->close();
?>
