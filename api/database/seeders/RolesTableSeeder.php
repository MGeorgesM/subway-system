<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = new Role();
        $role->name = 'user';
        $role->save();

        $role = new Role();
        $role->name = 'branch';
        $role->save();

        $role = new Role();
        $role->name = 'headquarter';
        $role->save();
    }
}
