<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['name' => 'istrazivac', 'description' => 'Istraživač u laboratoriji'],
            ['name' => 'admin', 'description' => 'Tehničar koji podržava istraživače'], 
        ];

        DB::table('roles')->insert($roles);
    }
}
