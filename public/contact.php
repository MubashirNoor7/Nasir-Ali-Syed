<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Get JSON input
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// Validate required fields
if (empty($data["name"]) || empty($data["email"]) || empty($data["message"])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name, email, and message are required"]);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars(trim($data["name"]));
$email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
$subject = !empty($data["subject"]) ? htmlspecialchars(trim($data["subject"])) : "New Contact Form Message";
$message = htmlspecialchars(trim($data["message"]));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email address"]);
    exit;
}

// Email configuration
$to = "nasiralisyed@gmail.com"; // Professor's email
$emailSubject = "Website Contact: " . $subject;
$headers = "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Build email body
$emailBody = "Name: " . $name . "\n";
$emailBody .= "Email: " . $email . "\n";
$emailBody .= "Subject: " . $subject . "\n\n";
$emailBody .= "Message:\n" . $message . "\n\n";
$emailBody .= "---\n";
$emailBody .= "Sent from: " . $_SERVER["HTTP_REFERER"] ?? "Unknown" . "\n";
$emailBody .= "IP: " . $_SERVER["REMOTE_ADDR"] ?? "Unknown" . "\n";

// Send email
$mailSent = mail($to, $emailSubject, $emailBody, $headers);

if ($mailSent) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email. Please try again or contact directly."]);
}
?>
