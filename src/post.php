<?php 
include_once 'connexion.php';

$stmt = $pdo->prepare("INSERT INTO flappyZozio (name, score) VALUES (:name, :score)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':score', $score);

// insertion d'une ligne
$name = $_POST['name'];
$score = intval($_POST['score']);
$stmt->execute();
?>