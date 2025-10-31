<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['send'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Save form data in session
    $_SESSION['form_data'] = [
        'name' => $name,
        'email' => $email,
        'number' => $number,
        'subject' => $subject,
        'message' => $message
    ];

    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'tarunbusinessmail@gmail.com';
        $mail->Password   = 'xncgnexcbkynnmwm';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('tarunbusinessmail@gmail.com', 'Contact Us');
        $mail->addAddress('tarunbusinessmail@gmail.com', 'Recipient');

        $mail->isHTML(true);
        $mail->Subject = "Cutomer Inquery - $subject";
        $mail->Body    = "Sender Name - $name <br>Sender Phone Number - $number <br>Sender Email - $email <br> Message - $message";

        $mail->send();

        // Now safe to redirect because no HTML sent yet
        header('Location: thank-you.html');
        exit();
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
