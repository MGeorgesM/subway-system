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
        $user->location = 'Zgharta';
        $user->save();


        $user = new User();
        $user->first_name = 'Mohamad';
        $user->last_name = 'Harakeh';
        $user->email = 'mohamad@mail.com';
        $user->password = 'password';
        $user->location = 'Saida';
        $user->save();

        $user = new User();
        $user->first_name = 'Hussein';
        $user->last_name = 'Abou Zeinab';
        $user->email = 'hussein@mail.com';
        $user->password = 'password';
        $user->location = 'Beirut';
        $user->save();


        $user = new User();
        $user->first_name = 'Jad';
        $user->last_name = 'Mouawad';
        $user->email = 'jad@mail.com';
        $user->password = 'password';
        $user->role_id = Role::where('name', 'branch')->first()->id;
        $user->location = 'Beirut';
        $user->save();

        $user = new User();
        $user->first_name = 'Admin';
        $user->last_name = 'Admin';
        $user->email = 'admin@mail.com';
        $user->password = 'password';
        $user->role_id = Role::where('name', 'headquarter')->first()->id;
        $user->location = 'Beirut';
        $user->save();

    }
}
