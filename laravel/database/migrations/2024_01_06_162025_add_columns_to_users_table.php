<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->string('profile_photo')->nullable()->after('password');
            $table->text('bio')->nullable();
            $table->timestamp('last_login_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
          
            $table->dropForeign(['role_id']);
            
         
            $table->dropColumn('profile_photo');
            $table->dropColumn('bio');
            $table->dropColumn('last_login_at');
            
            
            $table->dropColumn('role_id');
        });
    }
};
