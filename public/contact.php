<?php
/* ─────────────────────────────────────────────────────────────
 * QuionAi self-hosted form mailer.
 *
 * Ships with the static site and runs on Hostinger (PHP). No third-party
 * service, no signup, no limits. Receives contact / quote / newsletter
 * submissions and emails them to you.
 *
 * ► CHANGE THE RECIPIENT below to where you want leads delivered.
 *   For best deliverability on Hostinger, use a mailbox on your own domain.
 * ───────────────────────────────────────────────────────────── */

$TO       = 'services@quionai.com';                 // where leads are delivered
$FROM     = 'QuionAi Website <no-reply@quionai.com>'; // must be a @quionai.com address
$SITE     = 'QuionAi';

header('Content-Type: application/json; charset=utf-8');

// Preflight / method guard
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
  exit;
}

// Accept JSON body (from fetch) or classic form-encoded POST
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) { $data = $_POST; }

// Honeypot: bots fill this hidden field → accept silently, send nothing
if (!empty($data['botcheck'])) { echo json_encode(['success' => true]); exit; }

// Strip CR/LF to prevent email header injection
function clean($v) { return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', (string)$v)); }

$name    = clean($data['name']    ?? '');
$email   = clean($data['email']   ?? '');
$subject = clean($data['subject'] ?? ($SITE . ' website enquiry'));

// Minimal validation
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['success' => false, 'message' => 'A valid email address is required.']);
  exit;
}

// Build a readable body from every submitted field (except internal ones)
$skip = ['botcheck', 'subject', 'from_name', 'access_key'];
$lines = [];
foreach ($data as $key => $value) {
  if (in_array($key, $skip, true)) continue;
  if (is_array($value)) $value = implode(', ', $value);
  $label = ucwords(str_replace(['_', '-'], ' ', $key));
  $lines[] = $label . ': ' . clean($value);
}
$body  = "New submission from the {$SITE} website\n";
$body .= "----------------------------------------\n\n";
$body .= implode("\n", $lines);
$body .= "\n\n----------------------------------------\n";
$body .= "Sent " . date('D, d M Y H:i') . " from the website contact form.\n";

// Headers — Reply-To is the visitor so you can just hit "Reply"
$headers  = "From: {$FROM}\r\n";
$headers .= "Reply-To: " . ($name !== '' ? "{$name} <{$email}>" : $email) . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: QuionAi-Web\r\n";

$sent = @mail($TO, $subject, $body, $headers);

// ── Auto-reply to the visitor (confirmation) ──
if ($sent) {
  $firstName = $name !== '' ? strtok($name, ' ') : 'there';
  $replySubject = "Thanks for reaching out to {$SITE}";
  $replyBody  = "Hi {$firstName},\n\n";
  $replyBody .= "Thanks for contacting {$SITE} — we've received your message and a real person will get back to you within a few hours.\n\n";
  $replyBody .= "If it's urgent, message us on WhatsApp and we'll reply right away.\n\n";
  $replyBody .= "Talk soon,\nThe {$SITE} Team\n";
  $replyHeaders  = "From: {$FROM}\r\n";
  $replyHeaders .= "Reply-To: {$TO}\r\n";
  $replyHeaders .= "Content-Type: text/plain; charset=utf-8\r\n";
  @mail($email, $replySubject, $replyBody, $replyHeaders);
}

if ($sent) {
  echo json_encode(['success' => true]);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'The mail server could not send your message. Please email us directly.']);
}
