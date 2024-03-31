<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User();
        $user->first_name = 'Georges';
        $user->last_name = 'Mouawad';
        $user->email = 'georges@mail.com';
        $user->password = 'password';
        $user->lat = 34.4321; // Latitude for Zgharta
        $user->lng = 35.8665; // Longitude for Zgharta
        $user->save();


        $user = new User();
        $user->first_name = 'Mohamad';
        $user->last_name = 'Harakeh';
        $user->email = 'mohamad@mail.com';
        $user->password = 'password';
        $user->lat = 33.5635; // Latitude for Saida
        $user->lng = 35.3676; // Longitude for Saida
        $user->save();

        $user = new User();
        $user->first_name = 'Hussein';
        $user->last_name = 'Abou Zeinab';
        $user->email = 'hussein@mail.com';
        $user->password = 'password';
        $user->lat = 33.8938; // Latitude for Beirut
        $user->lng = 35.5018; // Longitude for Beirut
        $user->save();


        $user = new User();
        $user->first_name = 'Jad';
        $user->last_name = 'Mouawad';
        $user->email = 'jad@mail.com';
        $user->password = 'password';
        $user->role_id = Role::where('name', 'branch')->first()->id;
        $user->lat = 33.8938; // Latitude for Beirut
        $user->lng = 35.5018; // Longitude for Beirut
        $user->save();

        $user = new User();
        $user->first_name = 'Admin';
        $user->last_name = 'Admin';
        $user->email = 'admin@mail.com';
        $user->password = 'password';
        $user->role_id = Role::where('name', 'headquarter')->first()->id;
        $user->lat = 33.8938; // Latitude for Beirut
        $user->lng = 35.5018; // Longitude for Beirut
        $user->save();
    }
}
