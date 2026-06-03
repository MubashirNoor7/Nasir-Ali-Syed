<?php
// Strict origin verification - only allow requests from your domain
$allowedOrigins = [
    'https://nasiralisyed.com',
    'https://www.nasiralisyed.com',
    'http://localhost:5173', // Development
    'http://localhost:3000'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';

$isAllowed = false;
foreach ($allowedOrigins as $allowed) {
    if (strpos($origin, $allowed) === 0 || strpos($referer, $allowed) === 0) {
        $isAllowed = true;
        break;
    }
}

if (!$isAllowed && !empty($origin)) {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Origin not allowed"]);
    exit;
}

// CORS headers with specific origin if allowed
if ($isAllowed && !empty($origin)) {
    header("Access-Control-Allow-Origin: " . $origin);
} else {
    header("Access-Control-Allow-Origin: https://nasiralisyed.com");
}
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");

// Handle preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Rate limiting (simple implementation)
session_start();
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitKey = 'contact_' . $ip;
$now = time();

if (isset($_SESSION[$rateLimitKey])) {
    $lastRequest = $_SESSION[$rateLimitKey];
    if ($now - $lastRequest < 60) { // 1 minute between requests
        http_response_code(429);
        echo json_encode(["success" => false, "message" => "Too many requests. Please wait a minute."]);
        exit;
    }
}
$_SESSION[$rateLimitKey] = $now;

// Get and validate JSON input
$json = file_get_contents("php://input");
if (empty($json)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit;
}

$data = json_decode($json, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON"]);
    exit;
}

// Validate required fields
if (empty($data["name"]) || empty($data["email"]) || empty($data["message"])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name, email, and message are required"]);
    exit;
}

// Enhanced input sanitization
function sanitizeInput($input, $maxLength = 500) {
    $input = trim($input);
    $input = substr($input, 0, $maxLength);
    $input = preg_replace('/[\x00-\x08\x0b\x0c\x0e-\x1f]/', '', $input); // Remove control chars
    return $input;
}

$name = sanitizeInput($data["name"], 100);
$email = sanitizeInput($data["email"], 100);
$subject = !empty($data["subject"]) ? sanitizeInput($data["subject"], 200) : "New Contact Form Message";
$message = sanitizeInput($data["message"], 2000);

// Remove any HTML tags
$name = strip_tags($name);
$subject = strip_tags($subject);
$message = strip_tags($message);

// Validate email with additional checks
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email address"]);
    exit;
}

// Check for suspicious content (basic spam filter)
$suspiciousPatterns = ['http://', 'https://', 'www.', '.ru/', 'viagra', 'cialis', 'casino', 'lottery'];
$combinedText = strtolower($name . ' ' . $subject . ' ' . $message);
foreach ($suspiciousPatterns as $pattern) {
    if (strpos($combinedText, $pattern) !== false && $pattern !== 'http://' && $pattern !== 'https://') {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Message contains inappropriate content"]);
        exit;
    }
}

// Email configuration
$to = "nasiralisyed@gmail.com";
$emailSubject = "Website Contact: " . $subject;
$headers = "From: Website Contact <noreply@nasiralisyed.com>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Build email body
$emailBody = "Name: " . $name . "\n";
$emailBody .= "Email: " . $email . "\n";
$emailBody .= "Subject: " . $subject . "\n\n";
$emailBody .= "Message:\n" . $message . "\n\n";
$emailBody .= "---\n";
$emailBody .= "Sent from: " . ($referer ?: "Unknown") . "\n";
$emailBody .= "IP: " . $ip . "\n";
$emailBody .= "Time: " . date('Y-m-d H:i:s') . "\n";

// Send email
$mailSent = mail($to, $emailSubject, $emailBody, $headers);

if ($mailSent) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email. Please try again or contact directly."]);
}
?>
