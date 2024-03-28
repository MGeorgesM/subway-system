<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stations_facilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('station_id')->references('id')->on('stations')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('facility_id')->references('id')->on('facilities')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stations_facilities');
    }
};
