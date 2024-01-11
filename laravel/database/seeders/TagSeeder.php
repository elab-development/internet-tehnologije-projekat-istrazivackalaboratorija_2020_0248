<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            ['name' => 'Biologija'],
            ['name' => 'Hemija'],
            ['name' => 'Fizika'],
            ['name' => 'Medicina'],
            ['name' => 'Informatika'],
        ];

        DB::table('tags')->insert($tags);
    }
}
