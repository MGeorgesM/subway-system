<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\HelloMail;

// Define a route that triggers the email sending logic
Route::get('/send-email', function () {
    // Send email using the HelloMail Mailable class
    Mail::to('mohamad.harakeh2001@gmail.com')->send(new HelloMail());
    
    // Optionally, return a response indicating that the email has been sent
    return 'Email sent successfully';
});

