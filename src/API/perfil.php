<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$token = $_GET['token'] ?? null; // Obtener el token de la URL

if (is_null($token)) {
    echo json_encode(["mensaje" => "Token faltante"]);
    exit();
}

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "base_zonagames"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT usuarios.* FROM tokens JOIN usuarios ON tokens.user_id = usuarios.id WHERE tokens.token = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $userData = $result->fetch_assoc();
    echo json_encode($userData);
} else {
    echo json_encode(["mensaje" => "No estás autenticado"]);
}

$stmt->close();
$conn->close();
?>
