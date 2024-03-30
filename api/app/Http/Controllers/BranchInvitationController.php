<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BranchInvitation;
use App\Mail\InvitationEmail;
use Illuminate\Support\Facades\Mail;

class BranchInvitationController extends Controller
{

    private function sendInvitationEmail($recipient, $expires_at)
    {

        Mail::to($recipient)->send(new InvitationEmail($expires_at));

        return true;
    }


    public function invite(Request $request)
    {
        $request->validate([
            'branch_email' => 'required|email',
            'expires_at' => 'required|date',
        ]);


        $invitation = BranchInvitation::create([
            'branch_email' => $request->branch_email,
            'expires_at' => $request->expires_at,
        ]);


        if ($this->sendInvitationEmail($invitation->branch_email, $invitation->expires_at)) {
            return response()->json(['message' => 'Invitation sent successfully'], 200);
        } else {

            return response()->json(['message' => 'Failed to send invitation email'], 500);
        }
    }
}
