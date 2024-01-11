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
            ['name' => 'Naučni istraživač', 'description' => 'Istraživač u laboratoriji'],
            ['name' => 'Laboratorijski tehničar', 'description' => 'Tehničar koji podržava istraživače'],
            ['name' => 'Asistent', 'description' => 'Pomoćnik u laboratorijskim radovima'],
        ];

        DB::table('roles')->insert($roles);
    }
}
