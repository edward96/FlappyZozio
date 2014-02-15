<?php 
$driver = 'mysql';
$host = 'localhost';
$dbname = 'games';
$username = 'root';
$password = 'root';

$dns = $driver . ':dbname=' . $dbname . ';host=' . $host;
$pdo = new \PDO($dns, $username, $password);

$stmt = $pdo->prepare("INSERT INTO flappyZozio (name, score) VALUES (:name, :score)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':score', $score);

// insertion d'une ligne
$name = $_POST['name'];
$score = intval($_POST['score']);
$stmt->execute();

header('Content-type: application/json');
echo json_encode($_POST);
die;
?>