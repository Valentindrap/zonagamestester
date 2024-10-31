<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "base_zonagames"; 

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
if ($data === null) {
    echo json_encode(["mensaje" => "Datos no válidos"]);
    exit();
}

$email = $data['email'] ?? null; 
$contrasena = $data['contrasena'] ?? null;

if (is_null($email) || is_null($contrasena)) {
    echo json_encode(["mensaje" => "Email o contraseña faltantes"]);
    exit();
}

$sql = "SELECT * FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $userData = $result->fetch_assoc();
    if (password_verify($contrasena, $userData['contrasena'])) {
        // Generar un token
        $token = bin2hex(random_bytes(32)); // Generar un token aleatorio

        // Insertar el token en la base de datos
        $sql = "INSERT INTO tokens (user_id, token) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("is", $userData['id'], $token);
        $stmt->execute();

        echo json_encode(["mensaje" => "Inicio de sesión exitoso", "token" => $token]);
    } else {
        echo json_encode(["mensaje" => "Contraseña incorrecta"]);
    }    
} else {
    echo json_encode(["mensaje" => "El usuario no existe"]);
}

$stmt->close();
$conn->close();
?>
