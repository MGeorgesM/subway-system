<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    public function getUsers(Request $request)
    {
        $id = $request->id;

        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token_user_id = auth()->user()->id;
        $user = User::find($token_user_id);

        if ($user->role_id === 3) {
            $users = User::all();
            return response()->json([
                'user' => $user,
                'users' => $users
            ]);
        } else if ($token_user_id === $id) {
            return response()->json($user);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'image_base64' => 'string',
            'first_name' => 'string',
            'last_name' => 'string',
            'email' => 'string|email',
            'lat' => 'numeric',
            'lng' => 'numeric',
        ]);

        $user_id = auth()->user()->id;

        if (!$user_id) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($request->image_base64) {
            $image = $request->image_base64;
            $imageData = base64_decode($image);
            $fileName = 'user_' . $user->id . '.png';
            $filePath = public_path('images/' . $fileName);
            file_put_contents($filePath, $imageData);

            $user->image_url = $filePath;
        }

        if ($request->first_name) {
            $user->first_name = $request->first_name;
        }

        if ($request->last_name) {
            $user->last_name = $request->last_name;
        }

        if ($request->email) {
            $user->email = $request->email;
        }

        if ($request->lat) {
            $user->lat = $request->lat;
            $user->lng = $request->lng;
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    public function shutDownBranch($id)
    {
        $branch = User::find($id);

        if (!$branch) {
            return response()->json(['message' => 'Branch not found'], 404);
        }

        $branch->active = 0;
        $branch->save();

        return response()->json(['message' => 'Branch shut down successfully', 'branch' => $branch]);
    }

    public function activateBranch($id)
    {
        $branch = User::find($id);

        if (!$branch) {
            return response()->json(['message' => 'Branch not found'], 404);
        }

        $branch->active = 1;
        $branch->save();

        return response()->json(['message' => 'Branch activate successfully', 'branch' => $branch]);
    }

    public function deleteBranch($id)
{
    $branch = User::find($id);

    if (!$branch) {
        return response()->json(['message' => 'Branch not found'], 404);
    }

    $branch->delete();

    return response()->json(['message' => 'Branch deleted successfully']);
}
}
