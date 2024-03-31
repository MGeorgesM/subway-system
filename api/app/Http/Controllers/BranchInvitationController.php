<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BranchInvitation;

class BranchInvitationController extends Controller
{
    public function invite(Request $request)
    {
        $request->validate([
            'branch_email' => 'required|email',
            'expires_at' => 'required|date',
        ]);

        $invitation = BranchInvitation::create([
            'branch_email' => $request->branch_email,
            'expires_at' => now()->addDays(7),
        ]);

        Mail::to($invitation->branch_email)->send(new InvitationEmail($invitation));

        return response()->json(['message' => 'Invitation sent successfully'], 200);
    }
}
