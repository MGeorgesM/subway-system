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
            ['type' => 'toilets'],
            ['type' => 'restaurant'],
            ['type' => 'parking'],
            ['type' => 'wifi'],
            ['type' => 'atm'],
            ['type' => 'pharmacy'],
            ['type' => 'store'],
        ];

        Facility::insert($facilities);
    }
}
