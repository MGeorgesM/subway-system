<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Facility;

class FacilitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $facilities = [
            ['name' => 'toilets'],
            ['name' => 'restaurant'],
            ['name' => 'parking'],
            ['name' => 'wifi'],
            ['name' => 'atm'],
            ['name' => 'pharmacy'],
            ['name' => 'store'],
        ];

        Facility::insert($facilities);
    }
}
