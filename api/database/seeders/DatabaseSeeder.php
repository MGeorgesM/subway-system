<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            RolesTableSeeder::class,
            UsersTableSeeder::class,
            StationsTableSeeder::class,
            RidesTableSeeder::class,
            FacilitiesTableSeeder::class,
            TicketsTableSeeder::class,
            ReviewsTableSeeder::class,
            StationsFacilitiesSeeder::class,
        ]);
    }
}
