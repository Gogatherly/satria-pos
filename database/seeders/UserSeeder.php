<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            "name" => "admin",
            "email" => "admin@gmail.com",
            "password" => Hash::make("admin"),
            "role" => "super_admin"
        ]);
        User::factory()->create([
            "name" => "kasir",
            "email" => "kasir@gmail.com",
            "password" => Hash::make("kasir"),
            "role" => "kasir"
        ]); User::factory()->create([
            "name" => "gudang",
            "email" => "gudang@gmail.com",
            "password" => Hash::make("gudang"),
            "role" => "admin_gudang"
        ]);
    }
}
