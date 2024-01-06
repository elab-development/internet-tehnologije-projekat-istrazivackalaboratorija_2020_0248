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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('image_path')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->softDeletes();

            /*U Laravelu, $table->softDeletes(); dodaje kolonu deleted_at u tabelu, što omogućava "meko brisanje" zapisa. Kada meko obrišete zapis, on se zapravo ne uklanja iz baze podataka. Umesto toga, Laravel postavlja datum i vreme u deleted_at kolonu, označavajući zapis kao obrisani. Takvi zapisi se automatski isključuju iz rezultata upita, što znači da kada tražite podatke, Laravel vam vraća samo zapise koji nisu meko obrisani. Ako želite da vratite obrisani zapis, možete koristiti funkciju restore(), a za trajno brisanje, koristite forceDelete(). Ovo je korisno kada želite da zadržite obrisane zapise iz određenih razloga, kao što su čuvanje istorijskih podataka ili mogućnost njihovog vraćanja kasnije. */
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
